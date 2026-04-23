// ═══════════════════════════════════════════════════════
// CONSEQUENCES — Story resolution database
// TEXT RULE: No apostrophes. Use full words only.
// Each entry: { success:{text,xp,effects,next}, failure:{...}, partial:{...}? }
// effects: array of {type, ...args}  (processed by engine)
// next: function returning choice array — stored as choice id strings
// ═══════════════════════════════════════════════════════

const C = {

  inn_arrival:{
    success:{
      text:'The Amber Fountain Inn is warm and occupied. A sharp-eyed innkeeper takes your coin without ceremony and points you toward a corner table where two travelers are arguing in lowered voices about a locked supply depot somewhere east of Fairhaven.',
      xp:5, effects:[{type:'journal',msg:'Arrived at the Amber Fountain. Heard about a locked supply depot east of Fairhaven.'},{type:'quest',msg:'Investigate the supply depot east of Fairhaven.'}],
      next:[
        {text:'Move closer to listen. The argument sounds like it matters.', skill:'stealth', tag:'risky', align:'neutral', cid:'overhear_travelers'},
        {text:'The innkeeper has been watching this room for twelve years.', skill:'persuasion', tag:'safe', align:'neutral', cid:'innkeeper_intel'},
        {text:'Stay put. Eat and rest. Let the information come to you.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    },
    failure:{
      text:'The inn is full. The innkeeper tells you the only available space is the stable loft — three silver a night. Someone has paid a premium to keep the front rooms locked.',
      xp:0, effects:[{type:'gold',n:-3},{type:'journal',msg:'Forced into stable loft. Someone bought out the Amber Fountain front rooms.'}],
      next:[
        {text:'Buying out a full inn is either wealth or paranoia.', skill:'lore', tag:'risky', align:'neutral', cid:'investigate_rooms'},
        {text:'The stable loft is fine. A low profile costs nothing yet.', skill:'survival', tag:'safe', align:'neutral', cid:'rest_recover'},
        {text:'Ironspool Ward runs later and asks fewer questions.', skill:'survival', tag:'safe', align:'neutral', cid:'ironspool_intel'}
      ]
    }
  },

  market_intel:{
    success:{
      text:'Verdant Row hums with restrained urgency. Between textile stalls and spice merchants you catch real news: the Roadwardens have doubled checkpoint frequency on the eastern routes this week, citing unspecified concerns. Caravan captains are eating the delay costs without public complaint, which means someone told them to.',
      xp:5, effects:[{type:'journal',msg:'Verdant Row: Roadwardens doubled eastern checkpoint frequency. Caravan captains silent under instruction.'},{type:'faction',id:'roadwardens',n:-5}],
      next:[
        {text:'Checkpoint doubles without announcement means either a threat or a power demonstration.', skill:'persuasion', tag:'risky', align:'lawful', cid:'find_roadwarden'},
        {text:'The caravan captains were told by someone with enough leverage to make silence profitable.', skill:'lore', tag:'bold', align:'neutral', cid:'trace_caravan_order'},
        {text:'Log it and move on. Information without context is noise.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    },
    partial:{
      text:'The market tells you the usual things: prices are stable, Roadwardens have been seen near the eastern gate more frequently, and two stalls in the specialty section are empty without explanation.',
      xp:2, effects:[{type:'journal',msg:'Verdant Row: increased Roadwarden presence near eastern gate. Two stalls empty.'}],
      next:[
        {text:'The empty stalls. What was there and why did it leave?', skill:'lore', tag:'safe', align:'neutral', cid:'investigate_stalls'},
        {text:'Eastern gate. See the Roadwarden presence yourself.', skill:'stealth', tag:'risky', align:'neutral', cid:'gate_travelers'},
        {text:'Paid work opens doors that idle strangers cannot reach.', skill:'combat', tag:'safe', align:'neutral', cid:'find_work'}
      ]
    },
    failure:{
      text:'The market is busy and closed to you. Nobody is unfriendly, but nobody is forthcoming. You are an unknown face in a city that runs on recognition.',
      xp:0, effects:[{type:'journal',msg:'Verdant Row: failed to gather intelligence. A city of known faces.'}],
      next:[
        {text:'The inn first. Build a face before building a network.', skill:'persuasion', tag:'safe', align:'neutral', cid:'inn_arrival'},
        {text:'The shrine. Neutral ground. People talk more freely where faith handles the social obligation.', skill:'persuasion', tag:'safe', align:'lawful', cid:'shrine_contact'},
        {text:'The freight lanes. Less conversation, more observation.', skill:'stealth', tag:'safe', align:'neutral', cid:'ironspool_intel'}
      ]
    }
  },

  garrison_contact:{
    success:{
      text:'The duty sergeant at Roadwardens Central Command recognizes your background — garrison work carries a specific posture. He does not offer anything classified, but he tells you that three private work orders were posted this morning for individuals with route security experience. He leans slightly on the word private.',
      xp:8, effects:[{type:'journal',msg:'Roadwardens Central: three private work orders for route security. Classified origin.'},{type:'faction',id:'roadwardens',n:5},{type:'quest',msg:'Investigate private route security work orders at the Roadwardens.'}],
      next:[
        {text:'Private means House Shelk does not want its name on it. Take one of the work orders.', skill:'combat', tag:'bold', align:'neutral', cid:'take_private_contract'},
        {text:'The name behind private orders is more useful than the work itself.', skill:'persuasion', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:'Log it and leave. Private contracts come back around.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    },
    failure:{
      text:'The checkpoint clerk is new and unenthused. She checks your papers with the careful attention of someone recently warned against informal contact. You get nothing useful except confirmation that something official has changed — she is too careful to be operating normally.',
      xp:0, effects:[{type:'journal',msg:'Roadwardens front gate: new clerk, overcautious. Recent protocol change confirmed.'}],
      next:[
        {text:'The overcautious clerk is following a directive someone off-duty might not be bound by.', skill:'stealth', tag:'risky', align:'lawful', cid:'find_roadwarden'},
        {text:'The overcautious clerk is working from a recent directive. Try to find it.', skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'},
        {text:'Abandon this line. The market has less surveillance.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'}
      ]
    }
  },

  ironspool_intel:{
    success:{
      text:'Ironspool Ward smells like hot metal and rope tar. A tired laborer named Dav tells you, without prompting, that a sealed cart came through the ward two nights ago and nobody was allowed to see what was offloaded.',
      xp:6, effects:[{type:'journal',msg:'Ironspool Ward: sealed cart offloaded two nights ago, no witnesses permitted.'},{type:'quest',msg:'Find out what was offloaded in Ironspool Ward two nights ago.'}],
      next:[
        {text:'Nobody allowed to see is either evidence protection or theft. The depot logs will know which.', skill:'lore', tag:'bold', align:'neutral', cid:'depot_logs'},
        {text:'Sealed deliveries have paperwork even when the cargo does not.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_cart_driver'},
        {text:'Thank Dav and keep walking.', skill:'persuasion', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    },
    failure:{
      text:'Ironspool Ward is working at capacity and has no interest in strangers. A foreman waves you out of the depot yard.',
      xp:0, effects:[{type:'journal',msg:'Ironspool Ward: heavy shift, no contact made.'}],
      next:[
        {text:'Evening crews say more than morning ones.', skill:'survival', tag:'safe', align:'neutral', cid:'rest_recover'},
        {text:'The market. Different labor, different information.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'},
        {text:'The inn. Tomorrow exists.', skill:'persuasion', tag:'safe', align:'neutral', cid:'inn_arrival'}
      ]
    }
  },

  rest_recover:{
    success:{
      text:'You rest well. When you wake, a note has been slipped under the door. It is unsigned. It says only: The eastern depot is the right question.',
      xp:3,
      effects:[{type:'heal',pct:0.6},{type:'journal',msg:'Rested. Unsigned note received: "The eastern depot is the right question."'},{type:'quest',msg:'Follow the lead on the eastern depot.'}],
      next:[
        {text:'Someone is watching you and chose to help. Go east.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road'},
        {text:'An unsigned note could be a trap. Verify the depot before moving.', skill:'lore', tag:'safe', align:'neutral', cid:'depot_logs'},
        {text:'The source matters more than the information.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_note_sender'}
      ]
    },
    failure:{
      text:'The sleep is shallow and broken. When you are up before proper Dawnrise, you feel the toll — still tired, slightly unwell, and the stable smells precisely as bad as advertised.',
      xp:0, effects:[{type:'damage',n:2},{type:'journal',msg:'Poor rest. HP reduced.'}],
      next:[
        {text:'Push through it. Dawnrise market is early and good for sourcing a proper room.', skill:'survival', tag:'safe', align:'neutral', cid:'inn_arrival'},
        {text:'Eat before anything else. The inn kitchen opens at Dawnrise.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'},
        {text:'Ironspool Ward hires day workers. Tired is fine for labor.', skill:'combat', tag:'safe', align:'neutral', cid:'find_work'}
      ]
    }
  },

  passive_intel:{
    partial:{
      text:'You catch fragments. A name mentioned twice. A merchant who averted their eyes. Not enough to act on yet, but the city is not entirely closed.',
      xp:2, effects:[{type:'journal',msg:'Partial intel: recurring name overheard, one avoidant merchant noted. Needs follow-up.'}],
      next:[
        {text:'The partial lead is enough to move on.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:'More is coming if you stay patient.', skill:'stealth', tag:'safe', align:'neutral', cid:'market_intel'}
      ]
    },
    success:{
      text:'You sit, watch, and let the city wash over you. Over two hours you collect three fragments: a Roadwarden captain argued with a merchant in a way that ended with the merchant leaving faster than was polite; a broadsheet was distributed and then collected again within an hour; and someone described a route checkpoint as closed until further notice.',
      xp:4, effects:[{type:'journal',msg:'Passive observation: Roadwarden-merchant confrontation, suppressed broadsheet, unnamed checkpoint closure.'}],
      next:[
        {text:'The broadsheet. Something was printed that someone paid to unsprint.', skill:'lore', tag:'risky', align:'chaotic', cid:'find_broadsheet'},
        {text:'The Roadwarden captain. A public argument is unusual for a corps that values presentation.', skill:'persuasion', tag:'risky', align:'lawful', cid:'find_roadwarden'},
        {text:'The closed checkpoint. Routes define the city. A closed one changes everything behind it.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road'}
      ]
    },
    failure:{
      text:'The afternoon passes without giving you anything useful. You are still an unknown quantity in a city that runs on known quantities.',
      xp:0, effects:[{type:'tick',n:1},{type:'journal',msg:'Hours passed without intelligence gained.'}],
      next:[
        {text:'Passive time is over. Someone specific, something direct.', skill:'persuasion', tag:'risky', align:'lawful', cid:'garrison_contact'},
        {text:'Change location. Ironspool Ward has different people.', skill:'lore', tag:'safe', align:'neutral', cid:'ironspool_intel'},
        {text:'A hired hand has access an idle stranger does not.', skill:'combat', tag:'safe', align:'neutral', cid:'find_work'}
      ]
    }
  },

  find_work:{
    success:{
      text:'The Roadwardens assignment board has a posting: escort work, one day, eastern route, good pay for no questions. Beside it, a private note in a merchant hand: warehouse inventory count needed, no official standing required.',
      xp:4, effects:[{type:'journal',msg:'Found two work options: Roadwarden eastern escort (high pay, no questions) and private warehouse inventory.'},{type:'quest',msg:'Take a work contract.'}],
      next:[
        {text:'The Roadwarden escort. High pay for a reason, but the reason is where the interest is.', skill:'combat', tag:'bold', align:'neutral', cid:'take_private_contract'},
        {text:'The warehouse inventory. Quieter, lower risk, but someone skipping official channels has a reason.', skill:'lore', tag:'risky', align:'neutral', cid:'warehouse_job'},
        {text:'The eastern route keeps coming up too often to be coincidence. That is the direction.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road'}
      ]
    },
    failure:{
      text:'No work is posted that fits your background today. The boards are picked clean or the postings are for standing contracts you cannot access as an unknown.',
      xp:0, effects:[{type:'journal',msg:'Assignment board: nothing available. City closed to unknowns.'}],
      next:[
        {text:'The inn first. Unknown faces do not get work here.', skill:'persuasion', tag:'safe', align:'neutral', cid:'inn_arrival'},
        {text:'Ironspool Ward takes day labor regardless of reputation.', skill:'combat', tag:'safe', align:'neutral', cid:'ironspool_intel'},
        {text:'The Roadwardens take capable people who walk in and say so.', skill:'persuasion', tag:'risky', align:'lawful', cid:'garrison_contact'}
      ]
    }
  },

  shrine_contact:{
    success:{
      text:'The Aurora Light Cathedral attendant, a measured woman named Sera, offers water and quiet without asking anything first. After a long moment she says the shrine has been receiving unusual numbers of private memorial requests this week — the kind families make when they expect not to find someone through official channels.',
      xp:6, effects:[{type:'journal',msg:'Aurora Light Cathedral: unusual volume of private memorial requests — families expecting someone gone.'},{type:'quest',msg:'Investigate why families are filing unofficial memorials this week in Shelkopolis.'}],
      next:[
        {text:'Sera has seen the faces behind these requests and remembers them.', skill:'persuasion', tag:'risky', align:'neutral', cid:'trace_missing_persons'},
        {text:'A memorial week means something happened somewhere east. The route closures connect.', skill:'lore', tag:'safe', align:'neutral', cid:'east_road'},
        {text:'The shrine talks to useful people. Be one.', skill:'craft', tag:'safe', align:'neutral', cid:'shrine_service'}
      ]
    },
    failure:{
      text:'The cathedral is occupied with a formal service. The attendant tells you kindly that the shrine is unavailable for informal conversation today. Come back at Nightwatch.',
      xp:0, effects:[{type:'tick',n:1},{type:'journal',msg:'Aurora Light Cathedral: formal service, no contact until Nightwatch.'}],
      next:[
        {text:'Nightwatch will be different.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'},
        {text:'The market is less picky about timing.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'},
        {text:'Waiting until Nightwatch is time that could be spent elsewhere.', skill:'survival', tag:'safe', align:'neutral', cid:'find_work'}
      ]
    }
  },

  east_road:{
    success:{
      text:'The eastern gate passes you through. One hour out, you find it: a supply depot with a Roadwarden seal broken from the outside. The tracks around it are from boots, not animals, and they lead further east.',
      xp:8, effects:[{type:'travel',dest:'fairhaven'},{type:'journal',msg:'Eastern route: sealed depot with broken Roadwarden lock. Boot tracks heading further east.'},{type:'quest',msg:'Follow the tracks from the broken eastern depot.'},{type:'faction',id:'roadwardens',n:-5}],
      next:[
        {text:'The tracks are fresh. That window closes.', skill:'survival', tag:'bold', align:'neutral', cid:'follow_tracks'},
        {text:'Physical evidence is the part that holds up.', skill:'lore', tag:'safe', align:'neutral', cid:'document_depot'},
        {text:'This is bigger than one morning.', skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'}
      ]
    },
    failure:{
      text:'The eastern gate has a new restriction — no exit without Roadwarden clearance. The guard is apologetic but firm. The route is closed and they are not saying why.',
      xp:0, effects:[{type:'journal',msg:'Eastern gate: closed to non-Roadwardens. Restriction effective today.'},{type:'faction',id:'roadwardens',n:-3}],
      next:[
        {text:'A full gate closure requires a name on a signed order.', skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'},
        {text:'There are other routes east. The Roadwardens cannot watch all of them.', skill:'survival', tag:'bold', align:'chaotic', cid:'alternate_route'},
        {text:'The closure will not hold forever.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    }
  },

  follow_tracks:{
    success:{
      text:'The tracks lead to a small abandoned camp. You find a broken cartwheel pin, three empty supply crates marked with the Union trade seal, and a scrap of paper with partial numbers that look like inventory counts. Someone moved supply stock through a Shelk-sealed depot using a Union manifest.',
      xp:8, effects:[{type:'journal',msg:'Abandoned camp: Union manifest, Shelk depot. Cross-polity smuggling confirmed.'},{type:'quest',msg:'Find who orchestrated the Union-manifest Shelk-depot operation.'},{type:'faction',id:'the_union',n:5}],
      next:[
        {text:'The Union has a presence in Shelkopolis. Bring this to their representative.', skill:'persuasion', tag:'risky', align:'neutral', cid:'union_contact'},
        {text:'The Roadwardens need to know their depot was used. Carefully.', skill:'persuasion', tag:'bold', align:'lawful', cid:'find_roadwarden'},
        {text:'Keep the partial inventory list. It is leverage before it is evidence.', skill:'stealth', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    },
    failure:{
      text:'You follow the tracks for two hours before they disperse in a rocky streambed. Whatever moved through here knew how to lose a follower. You return to the road empty-handed but certain that something organized happened here.',
      xp:0, effects:[{type:'damage',n:3},{type:'tick',n:2},{type:'journal',msg:'Lost the tracks in the streambed. Organized evasion, not random.'}],
      next:[
        {text:'The depot reads differently with what you know now.', skill:'lore', tag:'safe', align:'neutral', cid:'document_depot'},
        {text:'What you have is reportable. Use it.', skill:'survival', tag:'safe', align:'lawful', cid:'report_findings'},
        {text:'They will move again. The area is the right place to be.', skill:'survival', tag:'risky', align:'neutral', cid:'wilderness_wait'}
      ]
    }
  },

  union_contact:{
    success:{
      text:'The Union representative in Shelkopolis is a precise man named Garrin who operates from a counting house on the commercial row. He listens to what you have found, says nothing for a long moment, and then says: The Union did not authorize those manifests. He pauses. Which means someone in the Union did. Those are very different problems.',
      xp:8, effects:[{type:'journal',msg:'Union Rep Garrin: unauthorized Union manifests. Internal breach confirmed.'},{type:'faction',id:'the_union',n:10},{type:'quest',msg:'Find who within the Union authorized the unauthorized eastern depot manifests.'}],
      next:[
        {text:'Work with Garrin to identify the insider.', skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'},
        {text:'Keep the Union out of it. Internal processes protect insiders.', skill:'lore', tag:'risky', align:'neutral', cid:'passive_intel'},
        {text:'Bring this to House Shelk. Their depot was compromised.', skill:'persuasion', tag:'bold', align:'lawful', cid:'house_shelk_meeting'}
      ]
    },
    failure:{
      text:'The Union counting house door is locked and the shutters are drawn. A standard closed for internal audit notice. An audit. Today. The timing is unlikely to be coincidental.',
      xp:0, effects:[{type:'journal',msg:'Union counting house closed for audit — same day as the depot evidence.'}],
      next:[
        {text:'The audit is defensive. Someone inside knows you are asking questions.', skill:'lore', tag:'risky', align:'neutral', cid:'passive_intel'},
        {text:'Garrin is in this city somewhere and an audit does not move him.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_cart_driver'},
        {text:'House Shelk has more reason than anyone to want this answered.', skill:'persuasion', tag:'safe', align:'lawful', cid:'house_shelk_meeting'}
      ]
    }
  },

  house_shelk_meeting:{
    success:{
      text:'The House Shelk receiving office clerk Pentha is excellent at appearing not to listen. After a careful framing of what you have found she excuses herself and returns with an offer: an informal meeting, tomorrow, Midlight, with a Shelk operations officer. No record. Your discretion expected.',
      xp:8, effects:[{type:'order',n:5},{type:'journal',msg:'House Shelk: informal meeting arranged with operations officer. Off-record.'},{type:'faction',id:'house_shelk',n:15},{type:'quest',msg:'Attend informal meeting with House Shelk operations officer.'}],
      next:[
        {text:'A Shelk meeting unprepared is worse than no meeting.', skill:'lore', tag:'safe', align:'neutral', cid:'study_packet'},
        {text:'Walking into a Shelk meeting uninformed is its own kind of liability.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_cart_driver'},
        {text:'Off-record Shelk operations require a clear head.', skill:'survival', tag:'safe', align:'neutral', cid:'rest_recover'}
      ]
    },
    failure:{
      text:'The House Shelk receiving office is professionally unhelpful. Unknown individuals bringing unverified claims are politely redirected to the official complaint process, which requires documentation, a Shelk notary, and three weeks.',
      xp:0, effects:[{type:'journal',msg:'House Shelk receiving: redirected to official complaint process.'}],
      next:[
        {text:'The Roadwardens are more direct.', skill:'persuasion', tag:'safe', align:'lawful', cid:'find_roadwarden'},
        {text:'Shelk doors open for names. You do not have one here yet.', skill:'persuasion', tag:'safe', align:'neutral', cid:'market_intel'},
        {text:'Official channels are closed. Unofficial channels exist for a reason.', skill:'stealth', tag:'risky', align:'chaotic', cid:'shadowhands_contact'}
      ]
    }
  },

  find_roadwarden:{
    success:{
      text:'Off-duty Roadwarden Captain Bren Holst is having dinner at the Amber Fountain. He agrees to a conversation when you name what you found on the eastern route. His face does not change but his hands stop moving.',
      xp:8, effects:[{type:'journal',msg:'Off-duty Captain Holst: confirmed knowledge of eastern depot incident.'},{type:'faction',id:'roadwardens',n:5},{type:'quest',msg:'Follow up with Captain Holst.'}],
      next:[
        {text:'You knew already. Make it a statement, not a question.', skill:'persuasion', tag:'bold', align:'neutral', cid:'probe_order_origin'},
        {text:'What are you going to do about it? See if the Roadwardens are positioned to move.', skill:'lore', tag:'safe', align:'neutral', cid:'take_private_contract'},
        {text:'Silence is the better play here.', skill:'stealth', tag:'risky', align:'neutral', cid:'passive_intel'}
      ]
    },
    failure:{
      text:'Every Roadwarden you find off-duty is either unresponsive or actively avoiding the topic of eastern routes. Something was communicated to them — a clear instruction not to engage with outside inquiries.',
      xp:0, effects:[{type:'journal',msg:'Roadwardens off-duty: coordinated non-engagement on eastern route topics.'},{type:'faction',id:'roadwardens',n:-5}],
      next:[
        {text:'Institutional silence means a directive from above Shelkopolis command.', skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'},
        {text:'The silence confirms something serious happened. The east is where it happened.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road'},
        {text:'House Shelk directly — bypassing the corps.', skill:'persuasion', tag:'bold', align:'lawful', cid:'house_shelk_meeting'}
      ]
    }
  },

  report_findings:{
    success:{
      text:'You have moved through Shelkopolis for a full cycle and gathered something real: a compromised depot, unauthorized Union manifests, institutional Roadwarden silence, and a House Shelk clerk who now knows your name. None of it is conclusive. All of it points at a single operation running through the eastern route.',
      xp:8, effects:[{type:'journal',msg:'End of first cycle: eastern route operation confirmed. Multiple powers implicated.'},{type:'renown',n:1},{type:'order',n:5},{type:'morality',n:5}],
      next:[
        {text:'The answers are on the road, not in the city.', skill:'survival', tag:'bold', align:'neutral', cid:'follow_tracks'},
        {text:'Build position in the city first. Information without leverage is noise.', skill:'persuasion', tag:'safe', align:'neutral', cid:'find_work'},
        {text:'Follow the money and you find who is running it.', skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'}
      ]
    },
    failure:{
      text:'You review what you have. It is fragments. Each piece is real but the connection requires an inference you cannot yet prove. You are credible to yourself and not yet to anyone else.',
      xp:0, effects:[{type:'journal',msg:'First cycle complete: fragments confirmed, no provable connection yet.'}],
      next:[
        {text:'One more day of evidence before moving.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'},
        {text:'Waiting has costs. What you have is enough to move.', skill:'combat', tag:'risky', align:'neutral', cid:'east_road'},
        {text:'Someone outside the current circle can confirm what you cannot.', skill:'persuasion', tag:'safe', align:'lawful', cid:'shrine_contact'}
      ]
    }
  },

  // ── Additional consequence nodes ──

  investigate_rooms:{
    success:{
      text:'The bought-out rooms belong to a commission of inspectors from the Magi Magistratus — the magical practice oversight body. They are in Shelkopolis on an unannounced audit. The specific target is not public information.',
      xp:8, effects:[{type:'journal',msg:'Inn front rooms: Magi Magistratus inspectors, unannounced audit.'},{type:'quest',msg:'Find out what the Magi Magistratus is auditing in Shelkopolis.'}],
      next:[
        {text:'The Magistratus audit and the eastern operation are probably connected.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:'The shrine will know if the Magistratus presence relates to magical practice concerns.', skill:'persuasion', tag:'safe', align:'lawful', cid:'shrine_contact'},
        {text:'Magistratus inspectors off-duty say different things than their paperwork does.', skill:'persuasion', tag:'bold', align:'lawful', cid:'find_roadwarden'}
      ]
    },
    failure:{
      text:'The room purchase is anonymous. The innkeeper is not saying more.',
      xp:0, effects:[],
      next:[
        {text:'The stable loft is fine. There are bigger questions.', skill:'survival', tag:'safe', align:'neutral', cid:'rest_recover'},
        {text:'The innkeeper is not the only one who saw who came through.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_cart_driver'}
      ]
    }
  },

  overhear_travelers:{
    success:{
      text:'The travelers are arguing about a supply count discrepancy in the Fairhaven eastern depot. One insists the count was off before the Roadwardens locked it. The implication: the lock happened after something was removed, not to protect what was inside.',
      xp:8, effects:[{type:'journal',msg:'Overheard: Fairhaven eastern depot count was off before the Roadwarden lock — lock may be cover, not security.'}],
      next:[
        {text:'They already have the conversation half-started.', skill:'persuasion', tag:'bold', align:'lawful', cid:'find_roadwarden'},
        {text:'There is more here if you are quiet.', skill:'stealth', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    },
    failure:{
      text:'You move too close and one traveler notices. The conversation ends.',
      xp:0, effects:[],
      next:[
        {text:'The conversation is not over just because they noticed.', skill:'persuasion', tag:'risky', align:'neutral', cid:'inn_arrival'},
        {text:'This was a mistake. Walk away.', skill:'stealth', tag:'safe', align:'neutral', cid:'rest_recover'}
      ]
    }
  },

  innkeeper_intel:{
    success:{
      text:'The innkeeper Bereth has been running the Amber Fountain for twelve years. She tells you the eastern depot situation is not the first time, and that the last time, a factor from House Mal showed up asking questions three days before the Roadwardens did.',
      xp:7, effects:[{type:'journal',msg:'Innkeeper Bereth: historical precedent — House Mal connected to previous eastern depot incident.'}],
      next:[
        {text:'House Mal is a fallen house. A Mal factor here is historical debt showing up.', skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'},
        {text:'The Roadwardens came after the Mal factor last time. The pattern is not new.', skill:'persuasion', tag:'safe', align:'lawful', cid:'find_roadwarden'}
      ]
    },
    failure:{
      text:'Bereth is polite and uninformative.',
      xp:0, effects:[],
      next:[{text:'Someone else in this room saw who came through.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'}]
    }
  },

  document_depot:{
    success:{
      text:'You catalog the broken seal, the track patterns, the disturbed ground. Three hours of careful work. What you have now is evidence that would hold up to scrutiny — if you can find someone with authority to scrutinize it.',
      xp:8, effects:[{type:'journal',msg:'Documented eastern depot: broken seal, boot tracks, disturbed inventory area. Admissible evidence.'}],
      next:[
        {text:'Bring it to the Roadwardens.', skill:'persuasion', tag:'bold', align:'lawful', cid:'find_roadwarden'},
        {text:'Bring it to House Shelk directly.', skill:'persuasion', tag:'risky', align:'lawful', cid:'house_shelk_meeting'},
        {text:'The Union has a stake in this — their seal was on that manifest.', skill:'stealth', tag:'safe', align:'neutral', cid:'union_contact'}
      ]
    },
    failure:{
      text:'Your documentation efforts are interrupted by a Roadwarden patrol. They do not stop you, but they note you.',
      xp:0, effects:[{type:'faction',id:'roadwardens',n:-5},{type:'journal',msg:'Roadwarden patrol observed you documenting the eastern depot.'}],
      next:[
        {text:'Continue. Being noted is not being stopped.', skill:'combat', tag:'risky', align:'neutral', cid:'east_road'},
        {text:'Leave. Being noted is a countdown.', skill:'stealth', tag:'safe', align:'neutral', cid:'market_intel'}
      ]
    }
  },

  take_private_contract:{
    success:{
      text:'The contract is sealed and simple: escort a covered cart from the eastern gate to a waystation north of Fairhaven. No questions about contents. Pay is three times standard rate. The Roadwarden officer who hands it over does not meet your eyes once.',
      xp:8, effects:[{type:'gold',n:30},{type:'journal',msg:'Took private eastern contract: covered cart to Fairhaven waystation, triple pay.'},{type:'quest',msg:'Complete the eastern contract and decide what to do with what you find.'}],
      next:[
        {text:'Take the contract and do the job honestly.', skill:'combat', tag:'safe', align:'neutral', cid:'east_road'},
        {text:'Take the contract. Check what is in the cart before you leave.', skill:'stealth', tag:'risky', align:'neutral', cid:'document_depot'},
        {text:'Take the contract. This is the operation you have been finding.', skill:'lore', tag:'bold', align:'neutral', cid:'follow_tracks'}
      ]
    },
    failure:{
      text:'The contract is already taken. Whoever got it moved fast.',
      xp:0, effects:[{type:'journal',msg:'Private eastern contract taken before you could claim it.'}],
      next:[
        {text:'Whoever moved fast enough to take it is already in this operation.', skill:'lore', tag:'risky', align:'neutral', cid:'find_cart_driver'},
        {text:'The board is picked clean but not every posting is on the board.', skill:'combat', tag:'safe', align:'neutral', cid:'find_work'}
      ]
    }
  },

  probe_order_origin:{
    success:{
      text:'Careful pressure yields a name: Selwyn Coth, a mid-tier Shelk logistics administrator who has been authorizing route closures without citing a primary officer above him. That is irregular. Mid-tier administrators do not close routes alone.',
      xp:8, effects:[{type:'journal',msg:'Logistics administrator Selwyn Coth authorizing route closures alone — irregular. Possible cut-out.'},{type:'quest',msg:'Find Selwyn Coth and establish who is above him in this operation.'}],
      next:[
        {text:'He is the operational link.', skill:'stealth', tag:'bold', align:'neutral', cid:'find_cart_driver'},
        {text:'A cut-out administrator means someone senior is insulated.', skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'},
        {text:'Bring Coth name to House Shelk and see how they react.', skill:'persuasion', tag:'risky', align:'lawful', cid:'house_shelk_meeting'}
      ]
    },
    failure:{
      text:'The trail goes cold at a specific level, which is itself an answer about where authority sits.',
      xp:0, effects:[{type:'journal',msg:'Order origin investigation: coordinated silence above mid-tier Shelk administration.'}],
      next:[
        {text:'The physical evidence is more reliable than the paper trail.', skill:'lore', tag:'safe', align:'neutral', cid:'east_road'},
        {text:'Someone outside the structure will not be running the same silence.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_cart_driver'}
      ]
    }
  },

  trace_directive:{
    success:{
      text:'The directive restricting eastern gate access traces to a single signed order — Shelk Operations, stamped three days ago. The name on the stamp reads: Coth. The same name that came up at the route closures.',
      xp:8, effects:[{type:'journal',msg:'Gate restriction directive: signed Coth, three days ago. Consistent with route closure pattern.'}],
      next:[
        {text:'Coth is now connected to both the eastern operations and the gate closure.', skill:'stealth', tag:'bold', align:'neutral', cid:'find_cart_driver'},
        {text:'The Roadwarden captain wants this. He just does not know he has it.', skill:'persuasion', tag:'safe', align:'lawful', cid:'find_roadwarden'},
        {text:'House Shelk would want to know an administrator is issuing orders above their station.', skill:'persuasion', tag:'bold', align:'lawful', cid:'house_shelk_meeting'}
      ]
    },
    failure:{
      text:'The directive is above your current access level.',
      xp:0, effects:[{type:'journal',msg:'Gate directive: access level insufficient.'}],
      next:[
        {text:'The Roadwardens respond to people who have already done something useful.', skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
        {text:'Someone inside the administration already knows what you are looking at.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_cart_driver'}
      ]
    }
  },

  find_cart_driver:{
    success:{
      text:'The cart driver from the eastern operation is still in Shelkopolis. His name is Wes and he is sleeping in the stable of the Amber Fountain. He has not been paid yet. That is leverage.',
      xp:8, effects:[{type:'journal',msg:'Cart driver Wes: still unpaid, located at Amber Fountain stable. Leverage established.'},{type:'quest',msg:'Use Wes to trace the full eastern operation chain.'}],
      next:[
        {text:'You delivered something and have not been paid. What did you deliver? — Direct.', skill:'persuasion', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:'I can get you paid, but I need to understand the route. — Softer.', skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'},
        {text:'Wes is not the only one watching Wes.', skill:'stealth', tag:'bold', align:'neutral', cid:'follow_tracks'}
      ]
    },
    failure:{
      text:'The cart driver is gone. Either paid and moving or moved before you arrived.',
      xp:0, effects:[{type:'journal',msg:'Cart driver: departed. Window closed.'}],
      next:[
        {text:'The money trail still exists. Find Coth.', skill:'lore', tag:'safe', align:'neutral', cid:'trace_directive'},
        {text:'The route east is still open.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road'}
      ]
    }
  },

  alternate_route:{
    success:{
      text:'The freight access lane bypasses the main eastern gate entirely. You are through before the guards realize the lane is supposed to be closed.',
      xp:6, effects:[{type:'faction',id:'roadwardens',n:-5},{type:'journal',msg:'Used freight lane bypass to exit through closed eastern gate. Roadwarden gate protocols are porous.'}],
      next:[
        {text:'The bypass closes behind you if you are slow.', skill:'survival', tag:'bold', align:'neutral', cid:'follow_tracks'},
        {text:'Careful pace. Do not give them reason to follow.', skill:'stealth', tag:'safe', align:'neutral', cid:'document_depot'}
      ]
    },
    failure:{
      text:'The freight lane is also closed. Whatever is happening on the eastern route, it is contained on all sides.',
      xp:0, effects:[{type:'faction',id:'roadwardens',n:-3},{type:'journal',msg:'Freight bypass also closed. Full eastern perimeter sealed.'}],
      next:[
        {text:'The closure itself is the story. Find who authorized a full perimeter.', skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'},
        {text:'This lifts eventually.', skill:'survival', tag:'safe', align:'neutral', cid:'rest_recover'}
      ]
    }
  },

  find_note_sender:{
    success:{
      text:'A young woman in Roadwarden-adjacent clothing has been stationed near the inn since Dawnrise. She walks toward you first. Captain Holst says to ask you what you found before you ask anyone else.',
      xp:8, effects:[{type:'journal',msg:'Unsigned note traced to a Holst informant. The Roadwarden captain is managing this from a distance.'}],
      next:[
        {text:'Tonight. Holst set this meeting for a reason.', skill:'persuasion', tag:'safe', align:'lawful', cid:'find_roadwarden'},
        {text:'Tell Holst I will share what I have when he shares what he knows. Set terms.', skill:'persuasion', tag:'bold', align:'neutral', cid:'probe_order_origin'},
        {text:'Holst having informants this active means the Roadwardens are more involved than they are showing.', skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'}
      ]
    },
    failure:{
      text:'Three hours of watching produced nothing. Whoever left the note is either not watching or better at it than you.',
      xp:0, effects:[{type:'tick',n:2},{type:'journal',msg:'Note origin surveillance: failed. Three hours lost.'}],
      next:[
        {text:'Accept the note at face value. Go east.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road'},
        {text:'The note sender will contact again if it matters.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    }
  },

  wilderness_wait:{
    success:{
      text:'Around Nightwatch, movement. Two figures with a cart, no lantern, moving east through the scrub parallel to the road. You let them pass and follow at distance.',
      xp:8, effects:[{type:'damage',n:2},{type:'tick',n:3},{type:'journal',msg:'Wilderness wait: observed two figures with cart at Nightwatch, no lantern, east-bound. Following.'}],
      next:[
        {text:'Cargo count matters more than identity right now.', skill:'stealth', tag:'risky', align:'neutral', cid:'follow_tracks'},
        {text:'Direction is enough. The city is where this gets acted on.', skill:'survival', tag:'safe', align:'lawful', cid:'report_findings'}
      ]
    },
    failure:{
      text:'You fall asleep. When you wake it is Dawnrise, something bit you through your coat, and the tracks are gone.',
      xp:0, effects:[{type:'damage',n:5},{type:'tick',n:4},{type:'journal',msg:'Fell asleep on wilderness watch. Woke at Dawnrise, tracks gone.'}],
      next:[
        {text:'Back to Shelkopolis immediately.', skill:'survival', tag:'safe', align:'lawful', cid:'report_findings'},
        {text:'One more day. You have the area even if not the trail.', skill:'survival', tag:'risky', align:'neutral', cid:'document_depot'}
      ]
    }
  },

  shadowhands_contact:{
    success:{
      text:'The Shadowhands have a presence in Ironspool Ward. You find a contact point. Someone leaves a response within two hours: We know about the eastern depot. We are not involved. Yet.',
      xp:8, effects:[{type:'order',n:-5},{type:'faction',id:'shadowhands',n:10},{type:'journal',msg:'Shadowhands: aware of eastern depot, not involved — for now.'}],
      next:[
        {text:'Someone responded. That is already more than expected.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_cart_driver'},
        {text:'Shadowhands non-involvement is its own kind of information.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    },
    failure:{
      text:'No contact found. Either the Shadowhands are not here or they chose not to respond.',
      xp:0, effects:[{type:'journal',msg:'Shadowhands: no contact established.'}],
      next:[
        {text:'The legitimate channels have more to offer right now.', skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
        {text:'The window is not fully closed.', skill:'stealth', tag:'safe', align:'neutral', cid:'rest_recover'}
      ]
    }
  },

  depot_logs:{
    success:{
      text:'The depot logs show an irregular entry: cargo received under provisional manifest, no destination recorded, authorization by a mid-tier clerk whose name does not appear on any other log entry.',
      xp:8, effects:[{type:'journal',msg:'Depot logs: irregular provisional manifest, anonymous clerk authorization. Single use identity.'},{type:'quest',msg:'Identify the anonymous clerk who authorized the provisional depot manifest.'}],
      next:[
        {text:'A single-use clerk identity is a cover for something upstream.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:'The provisional manifest destination was left blank deliberately. It went east.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road'}
      ]
    },
    failure:{
      text:'The depot logs are locked behind Roadwarden administrative access.',
      xp:0, effects:[{type:'journal',msg:'Depot logs: Roadwarden access required.'}],
      next:[
        {text:'The Roadwardens hold the access — they are the only way into those logs.', skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
        {text:'The physical evidence at the depot itself tells you more than the paperwork.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road'}
      ]
    }
  },

  warehouse_job:{
    success:{
      text:'The warehouse inventory job is legitimate — a merchant named Torbin needs an independent count to dispute a customs assessment. Two hours of honest work, and Torbin pays well and mentions, unprompted, that he has been using the eastern routes for three years and something changed eight days ago.',
      xp:8, effects:[{type:'gold',n:15},{type:'journal',msg:'Warehouse inventory for Torbin: eight days ago eastern routes changed. Independent confirmation.'}],
      next:[
        {text:'Torbin has been running these routes for three years. He knows what changed.', skill:'persuasion', tag:'safe', align:'neutral', cid:'innkeeper_intel'},
        {text:'Eight days ago is a specific anchor. Pull every thread from that date.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'}
      ]
    },
    failure:{
      text:'The inventory is more complex than posted. Torbin pays you half.',
      xp:0, effects:[{type:'gold',n:5},{type:'journal',msg:'Warehouse inventory: underpaid. Job was misrepresented.'}],
      next:[
        {text:'Challenge the half-pay.', skill:'persuasion', tag:'risky', align:'lawful', cid:'find_roadwarden'},
        {text:'Accept it and move on.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'}
      ]
    }
  },

  sell_intel:{
    success:{
      text:'The Gilded Archives buys documents. The tariff list from your packet gets you fourteen gold from an archivist who examines it for three minutes and tells you it corroborates something they have been tracking for a season.',
      xp:6, effects:[{type:'order',n:-3},{type:'gold',n:14},{type:'journal',msg:'Sold Mimolot tariff list to Gilded Archives. Archivists confirmed it corroborates ongoing tracking.'}],
      next:[
        {text:'The Archives are tracking the same thing. That thread is worth following.', skill:'lore', tag:'risky', align:'neutral', cid:'gilded_archives'},
        {text:'The money and the contact are enough for now.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    },
    failure:{
      text:'The archive buyer passes. Mimolot tariffs are public record. You leave with the packet.',
      xp:0, effects:[{type:'journal',msg:'Gilded Archives declined the tariff list — public record. Need the non-public materials.'}],
      next:[
        {text:'The schedule in the packet. That is the non-public part.', skill:'lore', tag:'safe', align:'neutral', cid:'study_packet'},
        {text:'The public part is worthless. The private part of this packet is what has value.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_cart_driver'}
      ]
    }
  },

  study_packet:{
    success:{
      text:'You read the packet again, slowly, against everything you have learned today. The schedule is not faculty appointments. It is a transfer schedule — specific dates, specific cargo descriptions in academic language, moving through Mimolot access on academic clearance. Three entries correspond exactly to dates the eastern Shelk route was closed.',
      xp:8, effects:[{type:'journal',msg:'Packet schedule cross-referenced: three Mimolot academic transfers match eastern route closure dates.'},{type:'quest',msg:'Find what academic cargo moved through Mimolot on the closure dates.'}],
      next:[
        {text:'Mimolot is in play. Contact the Mimolot representative in Shelkopolis.', skill:'lore', tag:'bold', align:'neutral', cid:'tariff_contact'},
        {text:'The Shelk operation uses academic cover. Someone in Mimolot signed the clearances.', skill:'lore', tag:'risky', align:'neutral', cid:'follow_circled_name'},
        {text:'Bring the full packet to House Shelk.', skill:'persuasion', tag:'risky', align:'lawful', cid:'house_shelk_meeting'}
      ]
    },
    failure:{
      text:'The schedule is encoded in a cataloging system you can only partially read.',
      xp:0, effects:[{type:'journal',msg:'Packet schedule: partially encoded in Mimolot catalog system. Need trained contact to decode.'}],
      next:[
        {text:'The Gilded Archives will have someone who reads Mimolot catalog code.', skill:'lore', tag:'risky', align:'neutral', cid:'gilded_archives'},
        {text:'The Mimolot representative will decode it if you frame the ask correctly.', skill:'persuasion', tag:'safe', align:'neutral', cid:'tariff_contact'}
      ]
    }
  },

  gilded_archives:{
    success:{
      text:'The senior archivist, a careful elf named Qael, confirms that Shelkopolis received an increase in academic material transit eight days ago. The authorization came from someone using a Mimolot institutional seal — from an institution that does not officially operate in Shelkopolis.',
      xp:8, effects:[{type:'journal',msg:'Gilded Archives, Archivist Qael: Mimolot-sealed material transit eight days ago from an institution that should not be in Shelkopolis.'},{type:'quest',msg:'Identify the unauthorized Mimolot institution operating in Shelkopolis.'}],
      next:[
        {text:'Unauthorized Mimolot presence using institutional seals — faculty rivalry gone operational.', skill:'lore', tag:'risky', align:'neutral', cid:'tariff_contact'},
        {text:'Qael might know more. Come back when you have something to offer.', skill:'persuasion', tag:'safe', align:'neutral', cid:'passive_intel'},
        {text:'Bring this to House Shelk.', skill:'persuasion', tag:'bold', align:'lawful', cid:'house_shelk_meeting'}
      ]
    },
    failure:{
      text:'The archives are closed to non-members for material research. Qael offers you tea and a reading room pamphlet.',
      xp:0, effects:[{type:'journal',msg:'Gilded Archives: non-member access refused.'}],
      next:[
        {text:'The shrine knows everyone. A proper introduction opens more than credentials.', skill:'persuasion', tag:'safe', align:'lawful', cid:'shrine_contact'},
        {text:'The material you need might be held elsewhere.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'}
      ]
    }
  },

  follow_circled_name:{
    success:{
      text:'The circled name is Veth Caul — a junior cataloger who resigned from Mimolot six weeks ago. Three different people describe his exit differently: dismissed, vanished, transferred. You find an address: he is in Shelkopolis, employed by a private scholarly collection that does not advertise.',
      xp:8, effects:[{type:'journal',msg:'Veth Caul: former Mimolot cataloger, transferred under disputed circumstances, now in Shelkopolis with private collection.'},{type:'quest',msg:'Find and speak with Veth Caul about what he saw at the Mimolot archive.'}],
      next:[
        {text:'Go to the private collection and find Caul.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_cart_driver'},
        {text:'What does a cataloger know that gets them transferred to a private collection in another polity?', skill:'lore', tag:'safe', align:'neutral', cid:'study_packet'},
        {text:'The private collection is the unauthorized Mimolot institution Qael mentioned.', skill:'lore', tag:'bold', align:'neutral', cid:'gilded_archives'}
      ]
    },
    failure:{
      text:'The circled name leads nowhere immediate. Either the name is a dead end or it is protected.',
      xp:0, effects:[{type:'journal',msg:'Circled name: traced and lost. Either a dead end or actively protected.'}],
      next:[
        {text:'Try a different angle on the packet.', skill:'lore', tag:'safe', align:'neutral', cid:'study_packet'},
        {text:'The market will have heard something.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'}
      ]
    }
  },

  tariff_contact:{
    success:{
      text:'The Mimolot Book Tariff Office representative, a precise gnome named Tella, tells you there is a formal query outstanding against three academic transit authorizations that came through Shelkopolis eight days ago. The query was filed by her office. Nobody has responded.',
      xp:8, effects:[{type:'faction',id:'house_mimolot',n:10},{type:'journal',msg:'Mimolot tariff office: formal query open against three transit authorizations. No response received.'},{type:'quest',msg:'Find out why no one has responded to the Mimolot tariff query.'}],
      next:[
        {text:'Offer to help trace the non-response.', skill:'persuasion', tag:'safe', align:'neutral', cid:'probe_order_origin'},
        {text:'Who authorized the transits? Work from Tella file.', skill:'lore', tag:'risky', align:'neutral', cid:'follow_circled_name'},
        {text:'The non-response is because the authorizing party does not want to be found.', skill:'lore', tag:'bold', align:'lawful', cid:'report_findings'}
      ]
    },
    failure:{
      text:'The tariff office is in the middle of a filing cycle and Tella has no time for informal inquiries.',
      xp:0, effects:[{type:'journal',msg:'Mimolot tariff office: filing cycle, no informal access.'}],
      next:[
        {text:'Return when the cycle ends.', skill:'lore', tag:'safe', align:'neutral', cid:'rest_recover'},
        {text:'Find Caul instead.', skill:'stealth', tag:'risky', align:'neutral', cid:'follow_circled_name'}
      ]
    }
  },

  read_notices:{
    success:{
      text:'The Roadwardens public board has three unusual entries this week: a route closure with no stated return date, a labor reassignment to an eastern support operation, and a compensation notice for involuntary schedule adjustment — payment offered to workers displaced eight days ago.',
      xp:7, effects:[{type:'journal',msg:'Public board: labor reassigned to eastern support, compensation for eight-day-ago involuntary displacement.'}],
      next:[
        {text:'Involuntary schedule adjustment is euphemism for something that moved fast. Find displaced workers.', skill:'persuasion', tag:'safe', align:'neutral', cid:'ironspool_intel'},
        {text:'The labor reassignment notice lists a reporting officer. Find them.', skill:'persuasion', tag:'risky', align:'lawful', cid:'find_roadwarden'},
        {text:'Connect these notices to the transit authorizations.', skill:'lore', tag:'bold', align:'neutral', cid:'trace_directive'}
      ]
    },
    failure:{
      text:'The board is current but unremarkable. Standard route notices, standard postings.',
      xp:0, effects:[{type:'journal',msg:'Public board: nothing unusual visible.'}],
      next:[
        {text:'Check the board at Nightwatch instead. Posted content rotates.', skill:'lore', tag:'safe', align:'neutral', cid:'rest_recover'},
        {text:'The market has the same information, less filtered.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'}
      ]
    }
  },

  trade_registry:{
    success:{
      text:'The trade registry shows a clear anomaly: outgoing manifests increased by forty percent eight days ago, but incoming receipts from the same period have not arrived at their logged destinations. Cargo moved east and was never confirmed on the other end.',
      xp:8, effects:[{type:'journal',msg:'Trade registry: 40% manifest increase eight days ago, zero destination confirmation. Cargo lost or diverted.'},{type:'quest',msg:'Find where the forty percent manifest increase actually went.'}],
      next:[
        {text:'Follow the missing cargo east.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road'},
        {text:'Bring the registry data to the Roadwardens.', skill:'persuasion', tag:'safe', align:'lawful', cid:'find_roadwarden'},
        {text:'Identify the shippers on the forty-percent manifests.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'}
      ]
    },
    failure:{
      text:'The trade registry requires certified merchant credentials to access historical data.',
      xp:0, effects:[{type:'journal',msg:'Trade registry: credentials required for historical data access.'}],
      next:[
        {text:'Find someone with credentials.', skill:'persuasion', tag:'safe', align:'neutral', cid:'union_contact'},
        {text:'The visible current data tells you enough about today.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'}
      ]
    }
  },

  zootia_contact:{
    success:{
      text:'A House Zootia factor named Bress reads your field findings and sits very still. The axis inversion data affecting Zootia harvest cycles — if this is accurate, it is not natural variation. Something is drawing the inversion off-cycle. He says this like he has known it and did not want to say it out loud.',
      xp:8, effects:[{type:'journal',msg:'Zootia factor Bress: axis inversion affecting harvests may not be natural. Something drawing it off-cycle.'},{type:'quest',msg:'Investigate the off-cycle axis inversion affecting Zootia harvest routes.'}],
      next:[
        {text:'What draws an inversion? Make Bress say what he knows.', skill:'persuasion', tag:'bold', align:'neutral', cid:'probe_order_origin'},
        {text:'The axis data connects to the eastern route operation.', skill:'lore', tag:'risky', align:'neutral', cid:'east_road'},
        {text:'Bring this to someone who studies the axis formally.', skill:'lore', tag:'safe', align:'neutral', cid:'gilded_archives'}
      ]
    },
    failure:{
      text:'Bress listens, thanks you, and excuses himself. He does not want to be connected to a report that contradicts official harvest accounting.',
      xp:0, effects:[{type:'journal',msg:'Zootia factor Bress: politely declined to engage. Official accounting is the line.'}],
      next:[
        {text:'The official accounting is the problem, not the solution.', skill:'lore', tag:'safe', align:'lawful', cid:'trade_registry'},
        {text:'Find someone else in Zootia network.', skill:'persuasion', tag:'risky', align:'neutral', cid:'market_intel'}
      ]
    }
  },

  map_office:{
    success:{
      text:'Roadwardens map office duty officer Res shows you the official axis travel corridor updates. One corridor was closed eight days ago for atmospheric safety. She adds, without being asked: We did not close it. That order came from outside our chain.',
      xp:8, effects:[{type:'faction',id:'roadwardens',n:5},{type:'journal',msg:'Roadwardens map office, Officer Res: corridor closed eight days ago by order from outside Roadwarden chain.'},{type:'quest',msg:'Find the external authority that closed the corridor over Roadwarden objection.'}],
      next:[
        {text:'Outside your chain — from where, House Shelk or further?', skill:'persuasion', tag:'bold', align:'neutral', cid:'probe_order_origin'},
        {text:'Get a copy of the closure order.', skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'},
        {text:'Thank Res and move fast before the conversation gets flagged.', skill:'stealth', tag:'safe', align:'neutral', cid:'east_road'}
      ]
    },
    failure:{
      text:'The map office is locked to non-Roadwarden personnel this week. Standard restricted ops status.',
      xp:0, effects:[{type:'journal',msg:'Roadwardens map office: restricted ops status, no access.'}],
      next:[
        {text:'Find a Roadwarden contact who can access it.', skill:'persuasion', tag:'safe', align:'lawful', cid:'find_roadwarden'},
        {text:'Civilian transit data might show the same pattern.', skill:'lore', tag:'safe', align:'lawful', cid:'trade_registry'}
      ]
    }
  },

  gate_travelers:{
    success:{
      text:'Two merchants from the Soreheim road compare notes: both lost significant cargo to what they call the eastern anomaly — goods that left Shelkopolis eight days ago and stopped sending confirmations. One says the insurance assessors are already calling it force majeure.',
      xp:8, effects:[{type:'journal',msg:'South gate: two Soreheim merchants confirm eastern cargo loss eight days ago. Insurance flagging force majeure.'}],
      next:[
        {text:'Force majeure from an insurer means the event was unusual enough to be unpredictable. This was not routine.', skill:'lore', tag:'safe', align:'lawful', cid:'report_findings'},
        {text:'Ask the merchants what cargo specifically they lost.', skill:'persuasion', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:'Insurance assessors will have case files. Find them.', skill:'lore', tag:'bold', align:'neutral', cid:'trace_directive'}
      ]
    },
    failure:{
      text:'The gate is busy and nobody has time for strangers asking questions about eastern routes.',
      xp:0, effects:[],
      next:[
        {text:'Early morning is quieter.', skill:'survival', tag:'safe', align:'neutral', cid:'rest_recover'},
        {text:'The inn is a better place to find travelers.', skill:'persuasion', tag:'safe', align:'neutral', cid:'inn_arrival'}
      ]
    }
  },

  sell_map_data:{
    success:{
      text:'The trade registry corridor assessment desk pays twenty-two gold for your accurate route corrections. The registry clerk, while processing, mentions that the corridor you corrected was flagged for anomaly three weeks before you submitted. Someone else has been tracking the same issue.',
      xp:8, effects:[{type:'gold',n:22},{type:'journal',msg:'Sold route corrections to trade registry for 22 gold. Registry already flagged same corridor — parallel investigation.'},{type:'quest',msg:'Find who is running the parallel eastern corridor investigation.'}],
      next:[
        {text:'Ask the clerk who flagged it.', skill:'persuasion', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:'Someone else is working the same thread. Find who is furthest ahead.', skill:'lore', tag:'bold', align:'neutral', cid:'union_contact'},
        {text:'You are now on record as an expert on this route. That is either good or dangerous.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    },
    failure:{
      text:'The desk clerk flags your submission for review — your certification lapsed when you did not re-file this season.',
      xp:0, effects:[{type:'journal',msg:'Map submission flagged: certification lapsed. Submission held for review.'}],
      next:[
        {text:'Renew the certification.', skill:'craft', tag:'safe', align:'neutral', cid:'rest_recover'},
        {text:'Withdraw the submission and find a different buyer.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_cart_driver'}
      ]
    }
  },

  find_family:{
    success:{
      text:'The family in the Panim registry record is in Shelkopolis — a merchant household named Ceth. The eldest son answers the door. When you show him the registry entry without stating what it contains, his face tells you he already knows what is in it.',
      xp:8, effects:[{type:'journal',msg:'Panim registry: Ceth family recognized their own entry immediately. They know what is in it.'},{type:'quest',msg:'Establish what the Ceth family is concealing in the Panim afterlife registry.'}],
      next:[
        {text:'What are you trying to protect, and from whom?', skill:'persuasion', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:'I am not here to expose this. Tell me who is.', skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'},
        {text:'Say nothing. Let the silence pull.', skill:'lore', tag:'bold', align:'neutral', cid:'passive_intel'}
      ]
    },
    failure:{
      text:'The family address in your notes is six months out of date. They have moved.',
      xp:0, effects:[{type:'journal',msg:'Ceth family address outdated. Registry data valid at filing, not present.'}],
      next:[
        {text:'Find their current address.', skill:'lore', tag:'risky', align:'neutral', cid:'find_cart_driver'},
        {text:'The registry entry is still useful. Use it differently.', skill:'lore', tag:'safe', align:'neutral', cid:'study_packet'}
      ]
    }
  },

  record_memory:{
    success:{
      text:'You write out the Panim name and its associated entries. Three names cross-reference to a commercial house in Shelkopolis — House Ceth, a minor merchant family. All three were filed the same day, by the same notary, for deaths that occurred on different dates.',
      xp:8, effects:[{type:'journal',msg:'Written recall: three Panim registry cross-references filed same-day by same notary for different-date deaths. Unusual consolidation.'},{type:'quest',msg:'Identify the notary who consolidated three death filings into one day.'}],
      next:[
        {text:'Find the notary.', skill:'lore', tag:'risky', align:'neutral', cid:'find_cart_driver'},
        {text:'The commercial house Ceth has three deaths in the registry. Find the family.', skill:'persuasion', tag:'safe', align:'neutral', cid:'find_family'},
        {text:'Same-day filing is either administrative convenience or cover.', skill:'lore', tag:'bold', align:'neutral', cid:'trace_directive'}
      ]
    },
    failure:{
      text:'Memory alone is not sufficient. The details blur without the document in hand.',
      xp:0, effects:[{type:'journal',msg:'Written recall: insufficient without original document.'}],
      next:[
        {text:'The Cysur shrine keeps records of memorial requests. Start there.', skill:'lore', tag:'safe', align:'lawful', cid:'shrine_contact'},
        {text:'Find the packet.', skill:'stealth', tag:'safe', align:'neutral', cid:'study_packet'}
      ]
    }
  },

  panim_contact:{
    success:{
      text:'The Panim Haven representative in Shelkopolis, a controlled man named Drath, reviews the registry entry you describe. He says: That notary has not filed from Shelkopolis. They operate from the eastern corridor.',
      xp:8, effects:[{type:'journal',msg:'Panim Rep Drath: consolidating notary operates from eastern corridor, not Shelkopolis. Eastern operation again.'},{type:'quest',msg:'Find the Panim notary operating from the eastern corridor.'}],
      next:[
        {text:'The eastern corridor is the center of everything. Go there.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road'},
        {text:'A notary operating under false geographic registration is in breach of Panim Registry protocol. Drath can act on that.', skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'},
        {text:'The notary is a node. Find what they are connecting.', skill:'lore', tag:'risky', align:'neutral', cid:'follow_circled_name'}
      ]
    },
    failure:{
      text:'Drath receives you formally and refers you to the official registry complaint process.',
      xp:0, effects:[],
      next:[
        {text:'The shrine attendant may be more approachable.', skill:'persuasion', tag:'safe', align:'lawful', cid:'shrine_contact'},
        {text:'The registry entry has to work without official support.', skill:'lore', tag:'safe', align:'neutral', cid:'study_packet'}
      ]
    }
  },

  armory_offer:{
    success:{
      text:'The Roadwardens armory master stares at your sample repair work for a long moment. This is better than our current supplier. She does not offer a contract on the spot but adds your name to a standing inquiry list and mentions that the eastern support operation needs field equipment maintenance. Travel required.',
      xp:8, effects:[{type:'gold',n:10},{type:'journal',msg:'Roadwardens armory: superior work confirmed. Eastern support operation needs field maintenance.'},{type:'quest',msg:'Accept the armory eastern field maintenance role.'}],
      next:[
        {text:'Accept the eastern field maintenance position. Best access you have found.', skill:'craft', tag:'bold', align:'neutral', cid:'take_private_contract'},
        {text:'Ask what the eastern support operation is before committing.', skill:'persuasion', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:'Keep the contact and look for less entangling work first.', skill:'craft', tag:'safe', align:'neutral', cid:'find_work'}
      ]
    },
    failure:{
      text:'The armory master takes your sample and says she will evaluate it. We have a current supplier.',
      xp:0, effects:[],
      next:[
        {text:'The workshop district may be more receptive.', skill:'craft', tag:'safe', align:'neutral', cid:'workshop_survey'},
        {text:'Find out who the current supplier is.', skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'}
      ]
    }
  },

  workshop_survey:{
    success:{
      text:'You identify your level quickly: you are the best metalwork craftsperson on the street, not by a small margin. A neighboring workshop owner named Kel notices and offers bench space for a percentage — and mentions a recent large commission that walked out of a competitor shop unsatisfied.',
      xp:8, effects:[{type:'journal',msg:'Workshop district: identified as top metalwork quality. Dissatisfied large commission available.'},{type:'quest',msg:'Pursue the unsatisfied large commission that left the workshop district.'}],
      next:[
        {text:'Find the dissatisfied commission. Unhappy clients with money are opportunities.', skill:'persuasion', tag:'bold', align:'lawful', cid:'house_shelk_meeting'},
        {text:'Take Kel bench space. Build a local reputation before chasing the big commission.', skill:'craft', tag:'safe', align:'neutral', cid:'find_work'},
        {text:'The commission walked out unsatisfied for a reason. Find out what the job actually required.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'}
      ]
    },
    failure:{
      text:'The district is competitive and cold to new arrivals. Nobody is unfriendly, but the bench-space conversations end when you ask about rates.',
      xp:0, effects:[],
      next:[
        {text:'The armory offer may still be open.', skill:'craft', tag:'safe', align:'neutral', cid:'armory_offer'},
        {text:'Build reputation through public work.', skill:'craft', tag:'safe', align:'neutral', cid:'find_work'}
      ]
    }
  },

  workshop_reputation:{
    success:{
      text:'Three separate workshops know your repair work by name and outcome. The senior owner Tareth says he has a commission waiting for someone who does not need to be told how to think.',
      xp:8, effects:[{type:'gold',n:20},{type:'journal',msg:'Workshop district: recognized by reputation. Tareth holds an unusual commission.'},{type:'quest',msg:'Hear Tareth commission and decide whether to take it.'}],
      next:[
        {text:'Hear the commission.', skill:'craft', tag:'safe', align:'neutral', cid:'warehouse_job'},
        {text:'What makes it unusual?', skill:'persuasion', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:'Establish presence before taking unusual work.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    },
    failure:{
      text:'Your reputation preceded you but the name association got scrambled. They expected someone else.',
      xp:0, effects:[{type:'journal',msg:'Workshop district: name association scrambled, mistaken identity.'}],
      next:[
        {text:'Clear the confusion.', skill:'persuasion', tag:'safe', align:'neutral', cid:'inn_arrival'},
        {text:'Work anonymously. Let the quality speak.', skill:'craft', tag:'bold', align:'neutral', cid:'armory_offer'}
      ]
    }
  },

  bridge_survey:{
    success:{
      text:'The Roadwardens engineering office has three reports on the bridge you built. The third was filed eight days ago: Structural deviation noted in central span, cause undetermined. Eight days ago. Everything connects to eight days ago.',
      xp:8, effects:[{type:'journal',msg:'Bridge survey report: structural deviation filed eight days ago. Same window as all other events.'},{type:'quest',msg:'Determine if the bridge structural deviation is coincidence or part of the eastern operation.'}],
      next:[
        {text:'Go inspect the bridge yourself. You built it — you will know if the deviation is structural or introduced.', skill:'craft', tag:'bold', align:'neutral', cid:'east_road'},
        {text:'The deviation and the eastern events have the same date. This is not coincidence.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:'Bring your builder knowledge to the engineering office formally.', skill:'craft', tag:'safe', align:'lawful', cid:'find_roadwarden'}
      ]
    },
    failure:{
      text:'The engineering office files are restricted to current contract holders.',
      xp:0, effects:[],
      next:[
        {text:'Establish current contract standing.', skill:'craft', tag:'safe', align:'neutral', cid:'find_work'},
        {text:'The bridge can be inspected without the file.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road'}
      ]
    }
  },

  market_rep:{
    success:{
      text:'A wool merchant who traded in Ashforge for three seasons tells you that a Psanan forgemaster recently arrived in Shelkopolis on extended business — unusual because Psanan forgemasters do not travel.',
      xp:8, effects:[{type:'journal',msg:'Craft quarter: Psanan forgemaster in Shelkopolis on extended business. Unprecedented.'},{type:'quest',msg:'Find the Psanan forgemaster and establish why they left Ashforge.'}],
      next:[
        {text:'Find the forgemaster. A Psanan of that rank in Shelkopolis means something serious happened.', skill:'combat', tag:'bold', align:'lawful', cid:'find_roadwarden'},
        {text:'Learn the forge district before approaching someone senior.', skill:'craft', tag:'safe', align:'neutral', cid:'workshop_survey'},
        {text:'Extended business is diplomatic framing. Find out who the forgemaster is meeting.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_cart_driver'}
      ]
    },
    failure:{
      text:'A Psanan name in Shelkopolis reads as foreign before it reads as impressive. Polite disengagement.',
      xp:0, effects:[],
      next:[
        {text:'The craft quarters are more hospitable to Psanan backgrounds.', skill:'craft', tag:'safe', align:'neutral', cid:'workshop_survey'},
        {text:'Introduce yourself by what you can do, not where you are from.', skill:'persuasion', tag:'safe', align:'neutral', cid:'inn_arrival'}
      ]
    }
  },

  find_pits:{
    success:{
      text:'Ironspool Ward has fighting work — a regular sparring circuit among off-duty garrison workers who bet on outcomes. A garrison sergeant named Holden says: Psanan. We heard a Psanan was in the city.',
      xp:8, effects:[{type:'journal',msg:'Found garrison sparring circuit. Sergeant Holden confirms Psanan arrival was noted by Roadwardens.'}],
      next:[
        {text:'Heard from who? Faster information path than you expected.', skill:'persuasion', tag:'risky', align:'lawful', cid:'garrison_contact'},
        {text:'Fight first, ask later. Holden will be more forthcoming if you win.', skill:'combat', tag:'bold', align:'neutral', cid:'take_private_contract'},
        {text:'Smile and say nothing. Let Holden figure out you already know he is tracking you.', skill:'stealth', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    },
    failure:{
      text:'The ward is working-class and not interested in a Psanan stranger looking for fight work.',
      xp:0, effects:[],
      next:[
        {text:'The craft shops are more open to Psanan background.', skill:'craft', tag:'safe', align:'neutral', cid:'workshop_survey'},
        {text:'Try the inn approach. Reputation is built from hospitality nodes outward.', skill:'persuasion', tag:'safe', align:'neutral', cid:'inn_arrival'}
      ]
    }
  },

  shelk_summons:{
    success:{
      text:'The House Shelk operations analyst introduces herself as Maret and says, before you can ask: The broadsheet you buried. We need to know who asked you to bury it.',
      xp:8, effects:[{type:'faction',id:'house_shelk',n:15},{type:'journal',msg:'House Shelk analyst Maret: asking about the buried broadsheet. Shelk investigating Union press interference.'},{type:'quest',msg:'Decide how much to tell Maret and what to ask for in return.'}],
      next:[
        {text:'Tell her everything. If Shelk is working the same thread, alignment makes sense.', skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'},
        {text:'I will tell you who gave the order if you tell me what they were covering.', skill:'persuasion', tag:'bold', align:'neutral', cid:'probe_order_origin'},
        {text:'Say nothing until you understand what Maret involvement actually is.', skill:'lore', tag:'risky', align:'neutral', cid:'passive_intel'}
      ]
    },
    failure:{
      text:'Nobody is at the address. Either the summons was wrong about the time or you are being tested.',
      xp:0, effects:[],
      next:[
        {text:'Wait.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'},
        {text:'Someone is watching to see if you follow up.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_note_sender'}
      ]
    }
  },

  press_check:{
    success:{
      text:'Route Record editor Sim tells you that the last three issues had material pulled before printing — not by him. By someone above the Union publishing sanction board who has not identified themselves through proper channels.',
      xp:8, effects:[{type:'faction',id:'the_union',n:-5},{type:'journal',msg:'Route Record editor Sim: three issues censored from above Union sanction board by unidentified authority.'},{type:'quest',msg:'Find the unidentified authority censoring the Route Record above Union level.'}],
      next:[
        {text:'What was pulled? Ask Sim directly.', skill:'persuasion', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:'Above the Union sanction board means either a larger Union interest or an external power.', skill:'lore', tag:'safe', align:'neutral', cid:'trace_directive'},
        {text:'House Shelk is the most likely external actor with motive to censor Union press.', skill:'persuasion', tag:'bold', align:'lawful', cid:'house_shelk_meeting'}
      ]
    },
    failure:{
      text:'The Route Record has a closed editorial room. Sim is not seeing anyone today.',
      xp:0, effects:[],
      next:[
        {text:'Come back at Nightwatch.', skill:'lore', tag:'safe', align:'neutral', cid:'rest_recover'},
        {text:'Find another press source.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'}
      ]
    }
  },

  rival_envoy:{
    success:{
      text:'The representative named Voss says: Shelk has not responded because they cannot respond without admitting the east corridor situation exists. He is testing whether you know about it.',
      xp:8, effects:[{type:'journal',msg:'Rival envoy Voss: confirmed Shelk non-response is due to east corridor situation. He knows you are investigating.'},{type:'quest',msg:'Establish what Voss knows about the east corridor and whether his house is involved.'}],
      next:[
        {text:'Yes, I know about the east corridor. What does your house want from it?', skill:'persuasion', tag:'bold', align:'neutral', cid:'probe_order_origin'},
        {text:'Do not confirm or deny. Let Voss keep talking.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'},
        {text:'The east corridor is why I am here. Are you here for the same reason?', skill:'persuasion', tag:'risky', align:'lawful', cid:'report_findings'}
      ]
    },
    failure:{
      text:'Voss is well-staffed and you are flagged before you reach his floor. A polite message: the representative is not receiving unscheduled visitors.',
      xp:0, effects:[],
      next:[
        {text:'Find a legitimate introduction.', skill:'persuasion', tag:'safe', align:'lawful', cid:'house_shelk_meeting'},
        {text:'Find another way to learn what Voss is doing here.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_note_sender'}
      ]
    }
  },

  shrine_service:{
    success:{
      text:'Two hours helping Sera with practical shrine maintenance. By the end she says: The families filing private memorials this week — they all have someone who was on the eastern route when it closed. None of them believe the official communication.',
      xp:8, effects:[{type:'faction',id:'house_shelk',n:-5},{type:'journal',msg:'Shrine service: all this week private memorial families connected to eastern route closure. None believe the official communication.'},{type:'quest',msg:'Find out what the official communication said and what actually happened.'}],
      next:[
        {text:'Get a copy of the official communication.', skill:'lore', tag:'safe', align:'lawful', cid:'read_notices'},
        {text:'Find one of the families and ask what they were told.', skill:'persuasion', tag:'safe', align:'neutral', cid:'find_family'},
        {text:'Go east. Whatever happened there is what they need to know.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road'}
      ]
    },
    failure:{
      text:'The shrine work takes longer than expected and Sera is called away before you can continue the conversation.',
      xp:0, effects:[{type:'tick',n:2}],
      next:[
        {text:'Come back when Sera is free.', skill:'lore', tag:'safe', align:'neutral', cid:'rest_recover'},
        {text:'Continue without the shrine contact.', skill:'survival', tag:'safe', align:'neutral', cid:'market_intel'}
      ]
    }
  },

  check_drop:{
    success:{
      text:'The old drop site has something in it: not a message, but an erased message. Someone cleaned the chalk mark in the last twelve hours. That means someone knows it is your drop site, knew you would check, and chose to send absence as the message.',
      xp:6, effects:[{type:'journal',msg:'Drop site: cleaned in last twelve hours. Message via absence — still watched or being tested.'}],
      next:[
        {text:'Leave a new mark. Signal back.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_note_sender'},
        {text:'Treat this as live and operate accordingly.', skill:'stealth', tag:'safe', align:'neutral', cid:'passive_intel'},
        {text:'The drop site management is more sophisticated than you remember.', skill:'lore', tag:'bold', align:'chaotic', cid:'shadowhands_contact'}
      ]
    },
    failure:{
      text:'The drop site has been repurposed — painted over, the alcove converted to a merchant display.',
      xp:0, effects:[{type:'journal',msg:'Drop site: repurposed. Three months of urban change erased it.'}],
      next:[
        {text:'Find who took it over.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_cart_driver'},
        {text:'Re-establish from scratch.', skill:'stealth', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    }
  },

  wait_observe:{
    success:{
      text:'Patience. You do nothing for six hours. By Duskcall, a quiet man sits near you for twenty minutes before saying, without looking at you: You are the one asking about the eastern route.',
      xp:8, effects:[{type:'journal',msg:'Passive wait: contacted by someone who knows you have been asking about the eastern route.'}],
      next:[
        {text:'Turn and engage. Who is asking?', skill:'persuasion', tag:'bold', align:'neutral', cid:'probe_order_origin'},
        {text:'Let him leave and follow.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_note_sender'},
        {text:'Acknowledge nothing. See if he comes back.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    },
    failure:{
      text:'Nobody contacts you. A full day of patience generates nothing.',
      xp:0, effects:[{type:'tick',n:2}],
      next:[
        {text:'Active approach. Time has cost.', skill:'persuasion', tag:'risky', align:'lawful', cid:'garrison_contact'},
        {text:'Try a new location.', skill:'survival', tag:'safe', align:'neutral', cid:'ironspool_intel'}
      ]
    }
  },

  investigate_stalls:{
    success:{
      text:'The two empty stalls were occupied by a cartographer and a natural philosophy supplier. Both left within the same hour, three days ago, after a conversation with a Roadwarden officer.',
      xp:8, effects:[{type:'journal',msg:'Empty stalls: cartographer and natural philosophy supplier, left after Roadwarden conversation three days ago.'}],
      next:[
        {text:'A cartographer and a natural philosopher both connected to eastern route research.', skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'},
        {text:'Find where they went.', skill:'stealth', tag:'bold', align:'neutral', cid:'find_cart_driver'},
        {text:'The Roadwarden officer who spoke with them is the link.', skill:'persuasion', tag:'safe', align:'lawful', cid:'find_roadwarden'}
      ]
    },
    failure:{
      text:'The stall neighbors remember the departure but not the details.',
      xp:0, effects:[],
      next:[{text:'Move on.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'}]
    }
  },

  find_broadsheet:{
    success:{
      text:'One copy of the suppressed broadsheet exists. A man named Fen has it folded inside a maintenance report he has been carrying for three days. The headline reads: Eastern Corridor Closure: Third Incident in Eighteen Months. The date on the closure described: eight days ago.',
      xp:8, effects:[{type:'journal',msg:'Suppressed broadsheet: eastern corridor closures are serial — third in eighteen months. Not unprecedented.'},{type:'quest',msg:'Find records of the two previous eastern corridor closures and establish the pattern.'}],
      next:[
        {text:'The pattern is the story. Find the first closure records.', skill:'lore', tag:'risky', align:'neutral', cid:'gilded_archives'},
        {text:'The broadsheet was suppressed because it named the serial nature. Who benefits from that being hidden?', skill:'persuasion', tag:'bold', align:'neutral', cid:'probe_order_origin'},
        {text:'Fen has been carrying this for three days. He is deciding to act. Decide with him.', skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'}
      ]
    },
    failure:{
      text:'The broadsheet is gone — all copies collected or distributed before recovery.',
      xp:0, effects:[],
      next:[
        {text:'Someone collected them. Find who.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_cart_driver'},
        {text:'Fen might still have one.', skill:'persuasion', tag:'safe', align:'neutral', cid:'inn_arrival'}
      ]
    }
  },

  trace_caravan_order:{
    success:{
      text:'The caravan captains were told by a House Shelk factors office to absorb the delay and file no public complaint. The instruction went out the same day the eastern restrictions were imposed.',
      xp:8, effects:[{type:'faction',id:'house_shelk',n:-5},{type:'journal',msg:'Caravan silence order traced to House Shelk factors office — same day as eastern restrictions.'}],
      next:[
        {text:'House Shelk is managing the information perimeter around this actively.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:'Bring this to the Roadwardens. If Shelk is supressing route incident reports, the corps should know.', skill:'persuasion', tag:'bold', align:'lawful', cid:'find_roadwarden'},
        {text:'The factors office is the civilian face of whatever operation is running. Find who runs it.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_cart_driver'}
      ]
    },
    failure:{
      text:'The caravan captains will not say who told them to stay quiet. Whoever it was has enough leverage to hold their silence.',
      xp:0, effects:[],
      next:[
        {text:'Find leverage of your own.', skill:'stealth', tag:'risky', align:'chaotic', cid:'shadowhands_contact'},
        {text:'The market will have a different angle.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'}
      ]
    }
  },

  trace_missing_persons:{
    success:{
      text:'Sera gives you the name on the most recent private memorial request: a laborer from Ironspool Ward whose family has not heard from him since the eastern route closure. He was contracted to the eastern support operation. He never came back.',
      xp:8, effects:[{type:'journal',msg:'Shrine: Ironspool laborer on eastern support operation has not returned since the closure. Family filed private memorial.'},{type:'quest',msg:'Find out what happened to the missing Ironspool laborer on the eastern support operation.'}],
      next:[
        {text:'The laborer family may know what operation he was contracted to.', skill:'persuasion', tag:'safe', align:'neutral', cid:'find_family'},
        {text:'A laborer who does not return from an eastern operation is evidence, not just a missing person.', skill:'lore', tag:'bold', align:'neutral', cid:'east_road'},
        {text:'Talk to Ironspool Ward. If he was from there, someone knows more.', skill:'persuasion', tag:'safe', align:'neutral', cid:'ironspool_intel'}
      ]
    },
    failure:{
      text:'Sera will not give out names. Shrine confidentiality.',
      xp:0, effects:[],
      next:[
        {text:'Offer to help the shrine in exchange for the contact.', skill:'craft', tag:'safe', align:'neutral', cid:'shrine_service'},
        {text:'The families will come to the shrine. Wait here.', skill:'lore', tag:'risky', align:'neutral', cid:'passive_intel'}
      ]
    }
  }

,

  do_combat_patrol:{
    success:{
      text:'You intercept a Roadwarden patrol and force a confrontation. The sergeant, faced with your direct challenge, reveals that the eastern closure order came from a civilian administrator, not from Roadwarden command. This was not their call. They resent that.',
      xp:8, effects:[{type:'journal',msg:'Combat confrontation with patrol: closure order was civilian origin, not Roadwarden command. They resent the order.'},{type:'faction',id:'roadwardens',n:8},{type:'order',n:-8},{type:'morality',n:-5}],
      next:[
        {text:'This is useful. Thank the sergeant and leave before this becomes official.', skill:'persuasion', tag:'safe', align:'neutral', cid:'garrison_contact'},
        {text:'The civilian administrator is Coth. Press the sergeant for his location.', skill:'persuasion', tag:'risky', align:'chaotic', cid:'probe_order_origin'},
        {text:'Leave quietly. You have what you need.', skill:'stealth', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    },
    failure:{
      text:'The patrol does not respond well to a direct challenge. You are briefly detained, questioned, and released with a formal warning. Your face is now on record at Roadwarden Central Command.',
      xp:0, effects:[{type:'damage',n:4},{type:'journal',msg:'Detained by Roadwarden patrol. Face on record at Central Command.'},{type:'faction',id:'roadwardens',n:-10},{type:'order',n:-10}],
      next:[
        {text:'Back off. The record is a problem but a solvable one.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'},
        {text:'The Shadowhands can clear a Roadwarden record for the right price.', skill:'stealth', tag:'risky', align:'evil', cid:'shadowhands_contact'},
        {text:'Find Coth before the Roadwardens find you.', skill:'stealth', tag:'bold', align:'chaotic', cid:'find_cart_driver'}
      ]
    }
  },

  confront_coth:{
    success:{
      text:'Selwyn Coth is exactly where he should not be: in the sealed part of the eastern depot after hours. He is not armed but he is not alone. His associate bolts when you appear. Coth does not. He looks at you with the specific calm of someone who expected this and prepared for it. He says one word: Arrangement.',
      xp:8, effects:[{type:'journal',msg:'Confronted Coth at the eastern depot. His associate fled. He said: Arrangement. This has a buyer above him.'},{type:'quest',msg:'Find the arrangement above Coth.'},{type:'renown',n:1},{type:'order',n:-5}],
      next:[
        {text:'"Who arranged this? Name them." Stay in his space.', skill:'combat', tag:'bold', align:'chaotic', cid:'probe_order_origin'},
        {text:'"You are going to walk me out of here and explain the arrangement." Control the exit.', skill:'persuasion', tag:'risky', align:'lawful', cid:'take_private_contract'},
        {text:'Say nothing. Let him fill the silence. People always do.', skill:'lore', tag:'safe', align:'neutral', cid:'report_findings'}
      ]
    },
    failure:{
      text:'Coth is gone by the time you get there. His office has been cleared. Someone tipped him off. You were followed to get here. You take a blow from a watcher left behind.',
      xp:0, effects:[{type:'damage',n:4},{type:'journal',msg:'Coth cleared his office. Tipped off from inside. Information security is compromised.'},{type:'faction',id:'house_shelk',n:-5}],
      next:[
        {text:'The Union representative is the only clean contact left.', skill:'persuasion', tag:'safe', align:'neutral', cid:'union_contact'},
        {text:'The Shadowhands did not tip him. Find out who did.', skill:'stealth', tag:'risky', align:'chaotic', cid:'find_note_sender'},
        {text:'Follow the cleared office evidence. He left in a hurry.', skill:'lore', tag:'bold', align:'neutral', cid:'follow_tracks'}
      ]
    }
  },

  fight_for_access:{
    success:{
      text:'The men blocking the freight lane were not Roadwardens. They were private security in Roadwarden adjacent gear. The distinction matters. You defeated two and the third ran. In their pockets: a sealed note with a House Shelk crest and a number. The number matches no official filing you know of.',
      xp:8, effects:[{type:'damage',n:3},{type:'gold',n:10},{type:'journal',msg:'Defeated private security posing as Roadwardens. Found sealed Shelk crest note with unknown filing number.'},{type:'morality',n:-5},{type:'order',n:-5}],
      next:[
        {text:'The filing number is the key. Find what it references.', skill:'lore', tag:'risky', align:'neutral', cid:'study_packet'},
        {text:'Bring the note to House Shelk directly.', skill:'persuasion', tag:'bold', align:'lawful', cid:'house_shelk_meeting'},
        {text:'Sell the note to the Shadowhands. They will know its value.', skill:'stealth', tag:'risky', align:'evil', cid:'shadowhands_contact'}
      ]
    },
    failure:{
      text:'There were more of them than you expected. You retreated. The freight lane is now sealed with an official Roadwarden lock that was not there before. The response time was too fast. Someone was watching you.',
      xp:0, effects:[{type:'damage',n:6},{type:'journal',msg:'Fought through freight lane, retreated. Lane sealed immediately after. Under surveillance.'},{type:'morality',n:-5}],
      next:[
        {text:'Rest and recover before your next move.', skill:'survival', tag:'safe', align:'neutral', cid:'rest_recover'},
        {text:'Find out who placed the surveillance.', skill:'stealth', tag:'risky', align:'chaotic', cid:'find_note_sender'},
        {text:'Change approach entirely. Direct force is drawing attention.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    }
  }

,

  // ── ARCHETYPE-FAMILY CONSEQUENCE BRANCHES ─────────────
  combat_approach:{
    success:{
      text:'Your training shows before you say a word. The duty sergeant assesses you quickly. He gives you five minutes. Combat-trained people understand each other without the social overhead.',
      xp:5, effects:[{type:'journal',msg:'Combat background opened direct access. Roadwarden cooperation established.'},{type:'faction',id:'roadwardens',n:8}],
      next:[
        {text:'Ask about the eastern corridor. What has been coming through?', skill:'combat', tag:'safe', align:'neutral', cid:'east_road'},
        {text:'Offer your services for the private contract work.', skill:'combat', tag:'bold', align:'neutral', cid:'take_private_contract'},
        {text:'Ask who else has been asking questions about the same operation.', skill:'lore', tag:'risky', align:'neutral', cid:'find_roadwarden'}
      ]
    },
    failure:{
      text:'The sergeant is not impressed by physical capability alone. Credentials and mandate open doors here. You are turned back.',
      xp:1, effects:[{type:'order',n:-3}],
      next:[
        {text:'Find another approach to the Roadwardens.', skill:'persuasion', tag:'safe', align:'neutral', cid:'garrison_contact'},
        {text:'Try the direct route instead of going through channels.', skill:'survival', tag:'risky', align:'neutral', cid:'east_road'}
      ]
    }
  },
  combat_evidence:{
    success:{
      text:'You read the scene the way you were trained. The physical evidence tells a story: multiple parties, coordinated timing, someone who knew the patrol schedule. This was planned.',
      xp:6, effects:[{type:'journal',msg:'Combat read of eastern depot: coordinated operation, patrol knowledge used.'},{type:'quest',msg:'Identify who has access to Roadwarden patrol schedules.'}],
      next:[
        {text:'Follow the patrol schedule breach back to its source.', skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'},
        {text:'Confront whoever had access to that information.', skill:'combat', tag:'bold', align:'chaotic', cid:'confront_coth'},
        {text:'Report the pattern to the Roadwardens.', skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'}
      ]
    },
    failure:{
      text:'The scene is days old. Physical evidence has been trampled. You get the broad strokes but nothing actionable.',
      xp:2, effects:[{type:'tick',n:1}],
      next:[
        {text:'Fall back to intelligence work.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'},
        {text:'Find someone who was there.', skill:'persuasion', tag:'risky', align:'neutral', cid:'find_cart_driver'}
      ]
    }
  },
  combat_interrogate:{
    success:{
      text:'The suspect understands very clearly that you can make this difficult. They talk. Names, a location, a timetable fragment.',
      xp:7, effects:[{type:'journal',msg:'Pressure interrogation yielded: names, location, timetable fragment.'},{type:'morality',n:-5},{type:'quest',msg:'Follow the timetable fragment.'}],
      next:[
        {text:'Act on the timetable immediately.', skill:'combat', tag:'bold', align:'chaotic', cid:'east_road'},
        {text:'Verify what you were told before committing.', skill:'lore', tag:'safe', align:'neutral', cid:'study_packet'},
        {text:'Report what you extracted to the Roadwardens.', skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'}
      ]
    },
    failure:{
      text:'They call your bluff. Or they are more afraid of whoever hired them than of you. You get nothing and now they know you are asking.',
      xp:1, effects:[{type:'damage',n:3},{type:'faction',id:'roadwardens',n:-5}],
      next:[
        {text:'Extract yourself before the situation escalates further.', skill:'stealth', tag:'risky', align:'chaotic', cid:'rest_recover'},
        {text:'Escalate anyway.', skill:'combat', tag:'bold', align:'evil', cid:'do_combat_patrol'}
      ]
    }
  },
  magic_read:{
    success:{
      text:'The administrative record reads like a standard transit manifest on the surface. But the encoding tells a different story. Someone used a Principalities archive format that predates the current system by forty years. A scholar or a very well-connected clerk.',
      xp:6, effects:[{type:'journal',msg:'Manifest encoding: pre-standard Principalities archive format. Scholarly source.'},{type:'quest',msg:'Identify who has access to pre-standard archive formats.'}],
      next:[
        {text:'Cross-reference with current Mimolot archive access lists.', skill:'lore', tag:'risky', align:'neutral', cid:'gilded_archives'},
        {text:'Find who taught this encoding format in the last thirty years.', skill:'lore', tag:'safe', align:'neutral', cid:'study_packet'},
        {text:'Bring the encoding anomaly to the Shirsh garrison.', skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'}
      ]
    },
    failure:{
      text:'The encoding is sophisticated enough that you cannot crack it without tools you do not have here. You understand the mechanism but not the content.',
      xp:2, effects:[{type:'tick',n:1}],
      next:[
        {text:'Find the right archive to decrypt it.', skill:'lore', tag:'safe', align:'neutral', cid:'gilded_archives'},
        {text:'Find someone who can decrypt it for you.', skill:'persuasion', tag:'risky', align:'neutral', cid:'tariff_contact'}
      ]
    }
  },
  magic_divination:{
    success:{
      text:'The pattern is visible if you know where to look. The axis anomaly, the route closure timing, the memorial volume — they share a spatial relationship. Whatever moved through the eastern corridor moved during the pre-inversion window when detection is degraded. Deliberate.',
      xp:7, effects:[{type:'journal',msg:'Pattern: route closures timed to axis pre-inversion window. Deliberate exploitation.'},{type:'renown',n:1}],
      next:[
        {text:'Predict the next window and be in position for it.', skill:'lore', tag:'bold', align:'neutral', cid:'east_road'},
        {text:'Report the pattern to the Roadwardens who can act on it.', skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'},
        {text:'Follow the spatial relationship to its source.', skill:'survival', tag:'risky', align:'neutral', cid:'follow_tracks'}
      ]
    },
    failure:{
      text:'The pattern almost resolves. You are missing one data point — probably the axis records from two cycles back.',
      xp:3, effects:[{type:'tick',n:1}],
      next:[
        {text:'Find the missing axis records.', skill:'lore', tag:'safe', align:'neutral', cid:'gilded_archives'},
        {text:'Try the pattern without the missing data.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'}
      ]
    }
  },
  magic_compel:{
    success:{
      text:'You apply what you know. The official answers your questions with more specificity than they intended. One senior House Shelk clerk, one Roadwarden with access, one unverified manifest originator.',
      xp:6, effects:[{type:'journal',msg:'Compelled testimony: one Shelk clerk, one Roadwarden with access, one unverified manifest source.'},{type:'morality',n:-5},{type:'quest',msg:'Identify the three principals.'}],
      next:[
        {text:'Identify the Shelk clerk.', skill:'persuasion', tag:'risky', align:'neutral', cid:'house_shelk_meeting'},
        {text:'Find the Roadwarden with manifest access.', skill:'lore', tag:'risky', align:'neutral', cid:'find_roadwarden'},
        {text:'Trace the manifest originator.', skill:'stealth', tag:'risky', align:'neutral', cid:'trace_directive'}
      ]
    },
    failure:{
      text:'The official breaks contact. They recognized the technique — or were trained to resist it. They report you to their superior.',
      xp:1, effects:[{type:'faction',id:'house_shelk',n:-10},{type:'morality',n:-5}],
      next:[
        {text:'Disappear before the report reaches anyone who can act on it.', skill:'stealth', tag:'risky', align:'chaotic', cid:'rest_recover'},
        {text:'Get ahead of the report by going to the Roadwardens first.', skill:'persuasion', tag:'bold', align:'lawful', cid:'garrison_contact'}
      ]
    }
  },
  stealth_surveillance:{
    success:{
      text:'Three hours from a position they cannot see. The eastern depot has a second shift that does not appear in any official record. Different faces, different equipment, working midnight to Dawnrise. Whatever moves through moves then.',
      xp:7, effects:[{type:'journal',msg:'Surveillance: undocumented second shift at eastern depot. Midnight to Dawnrise.'},{type:'quest',msg:'Access the depot during the undocumented shift.'}],
      next:[
        {text:'Access the depot during the undocumented shift.', skill:'stealth', tag:'bold', align:'chaotic', cid:'depot_logs'},
        {text:'Identify the faces in the second shift.', skill:'lore', tag:'risky', align:'neutral', cid:'find_cart_driver'},
        {text:'Report what you observed.', skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'}
      ]
    },
    failure:{
      text:'You are made. Not caught — they did not get close enough — but someone noticed the observation position. The shift pattern changes within the hour.',
      xp:2, effects:[{type:'damage',n:2},{type:'tick',n:1}],
      next:[
        {text:'Find a new observation position.', skill:'stealth', tag:'risky', align:'neutral', cid:'passive_intel'},
        {text:'Try direct access instead.', skill:'stealth', tag:'bold', align:'chaotic', cid:'depot_logs'}
      ]
    }
  },
  stealth_infiltration:{
    success:{
      text:'The restricted records office is better secured than the rest of the depot but not as well as it should be. You find three things: a manifest with no originating party, a payment record in House Shelk administrative format, and a note with a date three days from now.',
      xp:8, effects:[{type:'journal',msg:'Records office: unsigned manifest, Shelk payment record, date three days out.'},{type:'quest',msg:'Determine what happens in three days.'},{type:'renown',n:1}],
      next:[
        {text:'Identify what is scheduled for three days from now.', skill:'lore', tag:'risky', align:'neutral', cid:'study_packet'},
        {text:'Bring the documents to the Roadwardens before the date arrives.', skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'},
        {text:'Be at the eastern depot three days from now.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road'}
      ]
    },
    failure:{
      text:'The records office runs a secondary lock you did not account for. You get the outer room but not the inner archive. Fragments only.',
      xp:3, effects:[{type:'tick',n:1}],
      next:[
        {text:'Get the access credentials legitimately.', skill:'persuasion', tag:'risky', align:'lawful', cid:'tariff_contact'},
        {text:'Try again at a different time.', skill:'stealth', tag:'bold', align:'chaotic', cid:'depot_logs'}
      ]
    }
  },
  stealth_network:{
    success:{
      text:'The shadow economy knows about the eastern operation. Three shipments. The third went somewhere it should not have. Someone in the Fashion Artisans Collective was paid not to ask about it.',
      xp:6, effects:[{type:'journal',msg:'Shadow network: three shipments, third to undisclosed destination. Fashion Collective paid for silence.'},{type:'faction',id:'shadowhands',n:5}],
      next:[
        {text:'Find the Fashion Collective contact who was paid.', skill:'stealth', tag:'risky', align:'neutral', cid:'find_note_sender'},
        {text:'Find the third shipment destination.', skill:'lore', tag:'risky', align:'neutral', cid:'follow_tracks'},
        {text:'Sell this information to the right buyer.', skill:'persuasion', tag:'risky', align:'evil', cid:'sell_intel'}
      ]
    },
    failure:{
      text:'The network goes quiet when you ask. Either you asked the wrong person or word moved faster than you did.',
      xp:2, effects:[{type:'faction',id:'shadowhands',n:-5}],
      next:[
        {text:'Change your approach and try official channels.', skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
        {text:'Wait for the network to relax before asking again.', skill:'stealth', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    }
  },
  support_analysis:{
    success:{
      text:'The equipment modification is technically interesting. Whoever did this work understood the Roadwarden specification well enough to alter it without triggering inspection protocols. It is a sensor bypass — not a weapon. Something moving through the corridor would otherwise trigger standard detectors.',
      xp:6, effects:[{type:'journal',msg:'Equipment: sensor bypass modification. Something triggers standard detection systems.'},{type:'quest',msg:'Identify what substance triggers standard detection.'}],
      next:[
        {text:'Identify what the detectors would normally catch.', skill:'craft', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:'Find who did the modification — the technique has a signature.', skill:'craft', tag:'safe', align:'neutral', cid:'workshop_survey'},
        {text:'Report the bypass to the Roadwardens armory master.', skill:'persuasion', tag:'safe', align:'lawful', cid:'armory_offer'}
      ]
    },
    failure:{
      text:'The modification is too sophisticated for field analysis. You can see that something was done but not what. This required specialized knowledge you do not have here.',
      xp:2, effects:[{type:'tick',n:1}],
      next:[
        {text:'Find someone with the right knowledge.', skill:'persuasion', tag:'safe', align:'neutral', cid:'workshop_survey'},
        {text:'Take the equipment to a proper workshop.', skill:'craft', tag:'risky', align:'neutral', cid:'armory_offer'}
      ]
    }
  },
  support_community:{
    success:{
      text:'You listen. The settlement has been watching this for weeks and nobody in official capacity has asked them. Three fragments assemble: the bread market woman saw the carts, the canal worker noted the timing, the shrine attendant knows three families waiting for someone who did not come back.',
      xp:7, effects:[{type:'journal',msg:'Community: carts sighted, timing noted, three families with missing persons.'},{type:'faction',id:'the_union',n:5},{type:'renown',n:1}],
      next:[
        {text:'Speak to the three families directly.', skill:'persuasion', tag:'safe', align:'good', cid:'trace_missing_persons'},
        {text:'Take the community testimony to the Roadwardens.', skill:'persuasion', tag:'safe', align:'lawful', cid:'find_roadwarden'},
        {text:'Use the cart sightings to trace the route.', skill:'survival', tag:'risky', align:'neutral', cid:'follow_tracks'}
      ]
    },
    failure:{
      text:'People are willing to talk but nobody has seen enough to matter. The operation was careful about who it exposed itself to.',
      xp:2, effects:[],
      next:[
        {text:'Ask more specific questions.', skill:'persuasion', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:'Try the official record instead.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'}
      ]
    }
  },
  support_craft_solve:{
    success:{
      text:'You build the solution. A modified version of your own equipment, calibrated to detect the anomaly, placed at the right waypoint. It costs materials and a full day. The result fills the gap in the official record: the cargo bypassed the main checkpoint and took the service route — which has no inspector because it officially carries only agricultural freight.',
      xp:8, effects:[{type:'gold',n:-8},{type:'journal',msg:'Crafted detection: cargo used agricultural service route, bypassed main checkpoint.'},{type:'quest',msg:'Investigate the agricultural service route.'},{type:'renown',n:1}],
      next:[
        {text:'Follow the service route to its endpoint.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road'},
        {text:'Report the agricultural route breach to the Roadwardens.', skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'},
        {text:'Set up observation at the service route endpoint.', skill:'stealth', tag:'risky', align:'neutral', cid:'follow_tracks'}
      ]
    },
    failure:{
      text:'The materials are not quite right and the result does not work. A day and your supplies spent without getting what you need.',
      xp:2, effects:[{type:'gold',n:-5},{type:'tick',n:1}],
      next:[
        {text:'Source better materials.', skill:'craft', tag:'safe', align:'neutral', cid:'find_work'},
        {text:'Try a different approach.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    }
  }

,

  // ── ARCHER: FRONTIER RANGING COMPANY ─────────────────
  // Sunspire Haven / Frontier terrain / scouting approach
  archer_frontier_read:{
    success:{
      text:"You take the high ground before doing anything else. Old habit. From the ridge above Sunspire Haven you count three patrol routes, two that aren't on any Frontier Company chart you've seen, and one that terminates at a waypoint someone built without filing a survey. The eastern corridor doesn't officially exist. But it does exist, and someone is using it.",
      xp:7, effects:[{type:'journal',msg:'Archer read from high ground: three patrol routes, two undocumented. Eastern waypoint built without survey.',category:'fact',dedupeKey:'archer_frontier_ridge_read'},{type:'quest',msg:'Find who built the undocumented eastern waypoint.'}],
      next:[
        {text:"Track the undocumented waypoint. It leads somewhere.", skill:'survival', tag:'bold', align:'neutral', cid:'archer_frontier_track'},
        {text:"Report what you found to the Frontier Company office first.", skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
        {text:"Set up a concealed observation point and wait for the waypoint to be used.", skill:'stealth', tag:'risky', align:'neutral', cid:'stealth_surveillance'}
      ]
    },
    failure:{
      text:"The ridge is too exposed. You make it halfway up before a Frontier Hammer patrol flags you for trespassing on a survey-restricted zone. You didn't know it was restricted. Neither, apparently, did anyone who filed a public map.",
      xp:2, effects:[{type:'damage',n:0},{type:'faction',id:'frontier_hammer_companies',n:-5}],
      next:[
        {text:"Apologize and comply. Find another approach.", skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
        {text:"Ask why this ridge is survey-restricted when it isn't on any list.", skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'}
      ]
    }
  },
  archer_frontier_track:{
    success:{
      text:"The waypoint is a stone cache, professionally built. Inside: three unmarked containers, a schedule written in shorthand that matches the Frontier Company's internal notation, and a signature stamp from a posting that was officially decommissioned eighteen months ago. Someone is using dead infrastructure. That is deliberate.",
      xp:8, effects:[{type:'journal',msg:'Frontier cache: unmarked containers, internal FC shorthand, decommissioned posting stamp. Dead infrastructure being actively used.',category:'fact',dedupeKey:'archer_frontier_cache'},{type:'quest',msg:'Identify the decommissioned posting that issued the stamp.'},{type:'renown',n:1}],
      next:[
        {text:"Take the containers as evidence and move before anyone returns.", skill:'stealth', tag:'bold', align:'chaotic', cid:'depot_logs'},
        {text:"Leave everything in place. Set up to observe who comes back.", skill:'stealth', tag:'risky', align:'neutral', cid:'stealth_surveillance'},
        {text:"Take the schedule to Elyra Mossbane. She'll know what posting that stamp belongs to.", skill:'survival', tag:'safe', align:'neutral', cid:'archer_frontier_ally'}
      ]
    },
    failure:{
      text:"You track the route to a dead end — the waypoint has been cleared. Within the last twelve hours. You arrived one cycle too late. What's left is the impression of where containers sat and bootprints that don't match Frontier Company standard issue.",
      xp:3, effects:[{type:'tick',n:1}],
      next:[
        {text:"Follow the bootprints. Someone moved these containers.", skill:'survival', tag:'bold', align:'neutral', cid:'follow_tracks'},
        {text:"The timing is significant. Find out who knew to clear this before I arrived.", skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'}
      ]
    }
  },
  archer_frontier_ally:{
    success:{
      text:"Elyra looks at the stamp for three seconds and hands it back. 'That's a Duneshade Outpost stamp. Duneshade was decommissioned after the route realignment. Officially.' She emphasizes the word. 'But the personnel files were never transferred. And I've seen that stamp on goods moving through the southern waypoint twice in the last month.' She's been watching this too. Just didn't have anyone to tell.",
      xp:7, effects:[{type:'journal',msg:'Duneshade Outpost stamp: decommissioned but active. Elyra confirms southern waypoint sightings.',category:'fact',dedupeKey:'duneshade_stamp_confirmed'},{type:'npcmem',npc:'Elyra Mossbane',change:{trust:8,note:'confirmed Duneshade activity, southern waypoint'}}],
      next:[
        {text:"Ask Elyra to join you. She knows this terrain better than anyone.", skill:'persuasion', tag:'safe', align:'good', cid:'__recruit__elyra_mossbane__join'},
        {text:"Get the Duneshade personnel files before anything else.", skill:'lore', tag:'risky', align:'neutral', cid:'study_packet'},
        {text:"Go to the southern waypoint now.", skill:'survival', tag:'bold', align:'neutral', cid:'east_road'}
      ]
    },
    failure:{
      text:"Elyra knows the stamp but won't say where from. 'That's Frontier Company internal. I'm not authorized to share it.' She's protecting something — probably someone. Not hostile. Conflicted.",
      xp:3, effects:[{type:'npcmem',npc:'Elyra Mossbane',change:{trust:3,note:'withheld stamp ID, conflicted'}}],
      next:[
        {text:"Tell her what you've found. All of it. See if that changes things.", skill:'persuasion', tag:'risky', align:'good', cid:'archer_frontier_ally'},
        {text:"Find the Duneshade records another way.", skill:'lore', tag:'safe', align:'neutral', cid:'study_packet'}
      ]
    }
  },

  // ── HEALER: PANIM RECOVERY SPECIALIST ─────────────────
  // Panim Haven / Registry access / medical evidence approach
  healer_panim_read:{
    success:{
      text:"The injury patterns tell you something the registry does not. Three of the seven 'missing' from the eastern route came through Panim Haven's medical intake. They were registered as recovered and discharged. But the injuries Toriel documented don't match accidental exposure — they match controlled restraint followed by physical pressure. Someone hurt these people deliberately. And someone signed off on 'accidental.'",
      xp:7, effects:[{type:'journal',msg:'Medical evidence: three eastern route missing came through Panim intake. Injuries indicate deliberate restraint, not accident. Official records say accidental.',category:'fact',dedupeKey:'healer_panim_injury_pattern'},{type:'quest',msg:'Identify who signed off on the false injury classifications.'}],
      next:[
        {text:"Find who authorized the false classifications in the registry.", skill:'lore', tag:'risky', align:'lawful', cid:'healer_panim_registry'},
        {text:"Speak to the three survivors directly. They may be willing to talk now.", skill:'persuasion', tag:'safe', align:'good', cid:'trace_missing_persons'},
        {text:"Bring this to Toriel Palevow. He'll know if this is a systemic pattern.", skill:'persuasion', tag:'safe', align:'lawful', cid:'healer_panim_ally'}
      ]
    },
    failure:{
      text:"The intake records have been amended. Not deleted — amended. The original injury classifications are still visible in the margin, crossed out and overwritten. Someone knew to cover their tracks but didn't know how the registry's amendment system works.",
      xp:3, effects:[{type:'tick',n:1}],
      next:[
        {text:"The margin notes are still readable. Document them before they disappear.", skill:'craft', tag:'risky', align:'neutral', cid:'depot_logs'},
        {text:"Find who has amendment authority for Panim intake records.", skill:'lore', tag:'safe', align:'neutral', cid:'panim_contact'}
      ]
    }
  },
  healer_panim_registry:{
    success:{
      text:"The amendment trail leads to a clerk named Celis Lanthorn. Not a medical official — a grief mediation administrator who should not have registry amendment access at all. She was granted temporary access six weeks ago by an official with House Panim standing. The access was never revoked. Celis Lanthorn was not making medical judgments. She was correcting a record she was told to correct.",
      xp:8, effects:[{type:'journal',msg:'Registry amendment: Celis Lanthorn granted non-standard access 6 weeks ago by House Panim official. Access never revoked. Record correction was instructed.',category:'fact',dedupeKey:'panim_celis_amendment'},{type:'quest',msg:'Identify the House Panim official who granted Celis registry access.'},{type:'renown',n:1}],
      next:[
        {text:"Find Celis Lanthorn. She didn't do this voluntarily.", skill:'persuasion', tag:'safe', align:'good', cid:'probe_order_origin'},
        {text:"Identify the House Panim official first. That's the real source.", skill:'lore', tag:'risky', align:'neutral', cid:'house_shelk_meeting'},
        {text:"Bring this to the Panim civil authority before it goes further.", skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'}
      ]
    },
    failure:{
      text:"The amendment trail is sealed under a legal protection order. You cannot access it without a formal Panim civil review request, which takes three days and notifies the party who filed the protection. You'd be announcing yourself.",
      xp:2, effects:[],
      next:[
        {text:"File the review anyway. Three days and announced is better than never.", skill:'persuasion', tag:'bold', align:'lawful', cid:'garrison_contact'},
        {text:"Find someone with override authority.", skill:'lore', tag:'risky', align:'neutral', cid:'panim_contact'}
      ]
    }
  },
  healer_panim_ally:{
    success:{
      text:"Toriel reads the injury documentation slowly. When he looks up his expression is controlled but not calm. 'I flagged these three cases. My flags were overridden by administrative review.' He opens a drawer and removes a folder. 'I kept copies. I always keep copies.' He sets the folder on the table between you. 'I've been waiting for someone who wasn't going to tell me the review was sufficient.'",
      xp:7, effects:[{type:'journal',msg:'Toriel Palevow has documentation of three flagged cases, overridden by administrative review. Has retained copies.',category:'fact',dedupeKey:'toriel_flagged_cases'},{type:'npcmem',npc:'Toriel Palevow',change:{trust:8,note:'holds override-suppressed flag documentation'}}],
      next:[
        {text:"Ask Toriel to come with you. A medical witness changes what this becomes.", skill:'persuasion', tag:'safe', align:'good', cid:'__recruit__toriel_palevow__join'},
        {text:"Take the folder and move. You have what you need.", skill:'lore', tag:'safe', align:'neutral', cid:'study_packet'},
        {text:"Ask him who filed the administrative override.", skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'}
      ]
    },
    failure:{
      text:"Toriel is careful. 'I submitted my reports through the proper channels. What happens to them after that isn't my authority.' He's not hiding the truth — he's protecting himself while still telling it. The information is there. He just won't hand it to you directly.",
      xp:3, effects:[{type:'npcmem',npc:'Toriel Palevow',change:{trust:3,note:'careful, protecting himself, has information'}}],
      next:[
        {text:"Build trust first. Come back after you've shown him what you're doing.", skill:'persuasion', tag:'safe', align:'neutral', cid:'trace_missing_persons'},
        {text:"Ask the registry directly for the flagged case files.", skill:'lore', tag:'risky', align:'lawful', cid:'panim_contact'}
      ]
    }
  },

  // ── ELEMENTALIST/SHERESH: AURORA CROWN COMMUNE ────────
  // Aurora Crown Commune / Axis anomaly / technical evidence
  elementalist_aurora_read:{
    success:{
      text:"The dome sensors have been recording the anomaly for six weeks. You pull the historical data and run the pattern against the axis baseline. Three things are immediately wrong: the anomaly follows a predictable curve, not random variation; the curve peaks during transit windows; and someone has been resetting the sensor log flags to clear the alert queue. This is not natural. It is engineered.",
      xp:8, effects:[{type:'journal',msg:'Aurora sensor data: axis anomaly follows predictable curve, peaks at transit windows, alert flags being manually cleared. Engineered, not natural.',category:'fact',dedupeKey:'aurora_axis_engineered'},{type:'quest',msg:'Identify who has log-flag reset access at Aurora Crown Commune.'},{type:'renown',n:1}],
      next:[
        {text:"Find who has sensor log access. This requires an inside operator.", skill:'lore', tag:'risky', align:'neutral', cid:'elementalist_aurora_suspect'},
        {text:"Document the full pattern before it's reset again.", skill:'craft', tag:'safe', align:'neutral', cid:'study_packet'},
        {text:"Bring this to Warden Whiteglass. She should know her systems are being manipulated.", skill:'persuasion', tag:'bold', align:'lawful', cid:'elementalist_aurora_ally'}
      ]
    },
    failure:{
      text:"The historical data requires elevated access — Containment Research Concord clearance. You have none. Neren can pull fragments but not the full pattern. You see enough to know the anomaly exists and is wrong. Not enough to prove it is engineered.",
      xp:3, effects:[{type:'tick',n:1}],
      next:[
        {text:"Get Containment Research Concord clearance. There must be a process.", skill:'persuasion', tag:'risky', align:'lawful', cid:'garrison_contact'},
        {text:"Work with what Neren can access informally.", skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    }
  },
  elementalist_aurora_suspect:{
    success:{
      text:"Log-flag reset access is restricted to four accounts: Warden Whiteglass, Researcher Iceveil, and two accounts registered to Containment Research Concord remote stations — one of which has been inactive for three months. But the resets are coming from the inactive station's credentials. Someone is using a dead account. The credentials weren't revoked when the station went quiet.",
      xp:7, effects:[{type:'journal',msg:'Log resets from inactive CRC station credentials. Account not revoked. Someone using dead access to suppress axis anomaly flags.',category:'fact',dedupeKey:'aurora_dead_account_resets'},{type:'quest',msg:'Identify who has physical access to the deactivated CRC station.'}],
      next:[
        {text:"Go to the deactivated station. Find what's there physically.", skill:'survival', tag:'bold', align:'neutral', cid:'east_road'},
        {text:"Tell Researcher Iceveil. He'll understand what this means.", skill:'lore', tag:'risky', align:'neutral', cid:'elementalist_aurora_ally'},
        {text:"Bring this to Warden Whiteglass before anyone can reset the evidence.", skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'}
      ]
    },
    failure:{
      text:"The access logs themselves have been partially cleared. You can see the reset events but not the account IDs that executed them. Three minutes of data, deliberately deleted.",
      xp:2, effects:[{type:'damage',n:0}],
      next:[
        {text:"The deletion itself is evidence. Document when it happened and what it correlates to.", skill:'craft', tag:'safe', align:'neutral', cid:'study_packet'},
        {text:"Someone deleted this recently. Find who was at the terminal at that time.", skill:'stealth', tag:'risky', align:'neutral', cid:'stealth_surveillance'}
      ]
    }
  },
  elementalist_aurora_ally:{
    success:{
      text:"Neren was already drawing the same conclusions. He hands you the physical correlation chart he has been building without authorization for two weeks. 'I knew I needed someone with formal elemental credentials to validate this or it reads as speculation.' He straightens. 'With your sign-off, this becomes a technical finding. A finding requires action.'",
      xp:7, effects:[{type:'journal',msg:'Neren Rimebridge has been building unauthorized correlation charts. Joint technical finding will require formal response.',category:'companion',dedupeKey:'neren_correlation_charts'},{type:'npcmem',npc:'Neren Rimebridge',change:{trust:8,note:'unauthorized technical documentation ready, needs formal validation'}}],
      next:[
        {text:"Ask Neren to come with you. A joint technical finding carries more weight.", skill:'persuasion', tag:'safe', align:'good', cid:'__recruit__neren_rimebridge__join'},
        {text:"Formalize the finding immediately. File it before anyone can interfere.", skill:'lore', tag:'bold', align:'lawful', cid:'report_findings'},
        {text:"Validate and take the finding to Researcher Iceveil for additional authority.", skill:'lore', tag:'safe', align:'neutral', cid:'probe_order_origin'}
      ]
    },
    failure:{
      text:"Neren is more cautious than you expected. 'My position here depends on institutional trust. If I attach my name to something the Warden hasn't authorized, I lose that trust.' He won't move without official backing.",
      xp:2, effects:[{type:'npcmem',npc:'Neren Rimebridge',change:{trust:3,note:'cautious, needs institutional cover'}}],
      next:[
        {text:"Get Warden Whiteglass's authorization first.", skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
        {text:"Build the case through other channels and come back when it's undeniable.", skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    }
  },

  // ── WARRIOR: GARRISON SOLDIER ─────────────────────────
  // Shelkopolis / Military channels / Direct access
  warrior_garrison_read:{
    success:{
      text:"You read the garrison the way you were trained: staffing patterns, supply requisitions, the invisible pressure of who's doing double shifts without authorization. The eastern corridor unit is understaffed and the remaining personnel are running a modified patrol route. Not a shortened one — a redirected one. They're avoiding something. Specifically: the depot access road from Duskcall to Dawnrise.",
      xp:7, effects:[{type:'journal',msg:'Garrison read: eastern corridor unit understaffed, patrol route deliberately redirected away from depot access road at night. Purposeful.',category:'fact',dedupeKey:'warrior_garrison_patrol_read'},{type:'quest',msg:'Find out what the eastern corridor unit is avoiding.'},{type:'faction',id:'roadwardens',n:5}],
      next:[
        {text:"Talk to the garrison sergeant directly. You speak the same language.", skill:'combat', tag:'safe', align:'lawful', cid:'warrior_garrison_contact'},
        {text:"Walk the redirected patrol route yourself. Find what they're avoiding.", skill:'survival', tag:'bold', align:'neutral', cid:'warrior_garrison_track'},
        {text:"Check the supply requisitions. What's being requisitioned for a unit that's running reduced patrols?", skill:'lore', tag:'risky', align:'neutral', cid:'study_packet'}
      ]
    },
    failure:{
      text:"The garrison runs a closed shop when they don't know you. Your old Roadwarden credentials are expired. The duty officer turns you away without hostility but without information.",
      xp:1, effects:[{type:'order',n:-3}],
      next:[
        {text:"Find a way to establish current credentials.", skill:'persuasion', tag:'risky', align:'lawful', cid:'garrison_contact'},
        {text:"The back door. Find someone from your unit still serving here.", skill:'persuasion', tag:'safe', align:'neutral', cid:'warrior_garrison_contact'}
      ]
    }
  },
  warrior_garrison_contact:{
    success:{
      text:"Sergeant Holst recognizes your service history from the records and relaxes one degree. 'I can't tell you what's in the official file. But I can tell you the unit that was reassigned off the eastern corridor route was not reassigned because of performance.' He pauses. 'They were reassigned because someone with standing wanted them off that corridor. The order came through legitimate channels. The reason did not.'",
      xp:7, effects:[{type:'journal',msg:'Holst confirmation: eastern corridor unit reassigned by order-with-standing, reason not legitimate. Order came through proper channels.',category:'fact',dedupeKey:'warrior_holst_reassignment'},{type:'npcmem',npc:'Captain Thalion Windrider',change:{trust:5,note:'Holst is cooperative, Windrider approachable'}},{type:'faction',id:'roadwardens',n:8}],
      next:[
        {text:"Ask him who has the standing to reassign a patrol unit.", skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'},
        {text:"Ask if there's a way to see the original order without formal request.", skill:'stealth', tag:'risky', align:'chaotic', cid:'depot_logs'},
        {text:"Ask to speak directly with Captain Windrider.", skill:'persuasion', tag:'bold', align:'lawful', cid:'find_roadwarden'}
      ]
    },
    failure:{
      text:"Holst listens but won't commit. 'What you're describing sounds like a command issue. Command issues go through command.' He's not blocking you — he's protecting his position while someone more senior decides what to say.",
      xp:2, effects:[],
      next:[
        {text:"Go directly to Captain Windrider.", skill:'persuasion', tag:'bold', align:'lawful', cid:'find_roadwarden'},
        {text:"Find the paper trail Holst won't touch verbally.", skill:'lore', tag:'risky', align:'neutral', cid:'study_packet'}
      ]
    }
  },
  warrior_garrison_track:{
    success:{
      text:"The redirected route takes you to the edge of a clean zone: a quarter-kilometer of eastern approach road where the patrols stop and, apparently, nothing official happens. In that quarter-kilometer you find: one set of vehicle tracks that don't match any registered Roadwarden transport, a canvas fragment with a marking you don't recognize, and the remains of a meal prepared by someone who knew how to leave no fire trace. Military training.",
      xp:8, effects:[{type:'journal',msg:'Clean zone on eastern approach: unregistered vehicle tracks, unknown canvas marking, fire-free meal remains. Military-trained operation.',category:'fact',dedupeKey:'warrior_cleanzone_evidence'},{type:'quest',msg:'Identify the canvas marking and the unregistered vehicle.'},{type:'renown',n:1}],
      next:[
        {text:"The canvas marking is a unit identifier. Find the unit registry.", skill:'lore', tag:'risky', align:'neutral', cid:'study_packet'},
        {text:"The vehicle tracks are distinctive. Track them forward.", skill:'survival', tag:'bold', align:'neutral', cid:'follow_tracks'},
        {text:"Take what you found to Holst. He'll know what military-trained means here.", skill:'persuasion', tag:'safe', align:'lawful', cid:'warrior_garrison_contact'}
      ]
    },
    failure:{
      text:"The redirected route terminates at a sealed maintenance access with a House Shelk administrative lock. You cannot access it without House Shelk authorization and requesting that authorization announces your interest to the wrong people.",
      xp:2, effects:[{type:'tick',n:1}],
      next:[
        {text:"Find another way into the maintenance access.", skill:'craft', tag:'risky', align:'chaotic', cid:'depot_logs'},
        {text:"Track back and find what the unit is avoiding from the other direction.", skill:'survival', tag:'safe', align:'neutral', cid:'east_road'}
      ]
    }
  }

,

  rogue_shelk_read:{
    success:{
      text:"You don't read the city. You let the city read you back. Three hours in the Ironspool Ward watching who watches whom, and you've identified four assets running active surveillance on a five-block radius around the eastern freight depot. Two are Shadowhands. One is independent. One you don't recognize — new face, clean equipment, professional movement. Someone other than Shadowhands is running surveillance on the same operation.",
      xp:7, effects:[{type:'journal',msg:'Ironspool Ward: four active surveillance assets on eastern depot. Two Shadowhands, one independent, one unidentified.',category:'fact',dedupeKey:'rogue_shelk_surveillance_read'},{type:'quest',msg:"Identify the unrecognized surveillance asset."}],
      next:[
        {text:"Approach one of the Shadowhands assets. You know how to make contact.", skill:'stealth', tag:'safe', align:'neutral', cid:'rogue_shelk_contact'},
        {text:"Follow the unidentified asset. That's the interesting thread.", skill:'stealth', tag:'bold', align:'neutral', cid:'rogue_shelk_track'},
        {text:"Report what you've seen to a Shadowhands handler. See if they acknowledge it.", skill:'persuasion', tag:'risky', align:'neutral', cid:'shadowhands_contact'}
      ]
    },
    failure:{
      text:"You're made within the first hour. Not by a Roadwarden — by a thin man in a tailor's coat who walks past you twice and doesn't look at you either time. Counter-surveillance. Someone is running a clean operation.",
      xp:2, effects:[{type:'faction',id:'shadowhands',n:-5}],
      next:[
        {text:"Break contact and reset.", skill:'stealth', tag:'risky', align:'neutral', cid:'passive_intel'},
        {text:"Lean into being seen. If you're identified, use it.", skill:'persuasion', tag:'bold', align:'chaotic', cid:'probe_order_origin'}
      ]
    }
  },
  rogue_shelk_contact:{
    success:{
      text:"The Shadowhands asset talks, briefly. 'The depot job wasn't sanctioned. Someone used a dead cell's authorization to move cargo. We're cleaning up the trail. You're not part of the cleanup — which means you're either very late or very early.' They leave before you can ask which.",
      xp:8, effects:[{type:'journal',msg:"Shadowhands asset: depot job used dead cell's authorization — unsanctioned. They're running cleanup, not the operation.",category:'fact',dedupeKey:'rogue_shelk_shadowhands_unsanctioned'},{type:'faction',id:'shadowhands',n:5},{type:'renown',n:1}],
      next:[
        {text:"Find the dead cell whose authorization was used.", skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'},
        {text:"Get to the depot records before the cleanup does.", skill:'stealth', tag:'bold', align:'chaotic', cid:'depot_logs'},
        {text:"Find the unidentified asset. Someone else is running parallel.", skill:'stealth', tag:'risky', align:'neutral', cid:'rogue_shelk_track'}
      ]
    },
    failure:{
      text:"The Shadowhands asset doesn't talk. They walk. You get nothing except confirmation they're active.",
      xp:2, effects:[{type:'faction',id:'shadowhands',n:-3}],
      next:[
        {text:"Find the unidentified asset instead.", skill:'stealth', tag:'risky', align:'neutral', cid:'rogue_shelk_track'},
        {text:"Go to the depot directly.", skill:'stealth', tag:'bold', align:'chaotic', cid:'depot_logs'}
      ]
    }
  },
  rogue_shelk_track:{
    success:{
      text:"The unidentified asset leads you to a counting house off Verdant Row. Inside, visible through a ground-floor window, someone with House Shelk institutional authority is reviewing documents with a posture too deliberate for a clerk. Someone is running their own intelligence operation on the eastern route — independent of Shadowhands and official channels.",
      xp:8, effects:[{type:'journal',msg:'Unidentified asset base: Verdant Row counting house. Internal Shelk-standing operator reviewing documents. Independent intelligence operation on eastern route.',category:'fact',dedupeKey:'rogue_shelk_counting_house'},{type:'quest',msg:'Identify the independent intelligence operator in the Verdant Row counting house.'}],
      next:[
        {text:"Get into the counting house and read those documents.", skill:'stealth', tag:'bold', align:'chaotic', cid:'depot_logs'},
        {text:"Identify the operator. Who in House Shelk is running unauthorized intelligence?", skill:'lore', tag:'risky', align:'neutral', cid:'house_shelk_meeting'},
        {text:"Report the independent operation to the Shadowhands.", skill:'persuasion', tag:'risky', align:'neutral', cid:'shadowhands_contact'}
      ]
    },
    failure:{
      text:"You lose the asset in Verdant Row. They know the district better than you do.",
      xp:2, effects:[{type:'tick',n:1}],
      next:[
        {text:"Work the Shadowhands contact instead.", skill:'stealth', tag:'safe', align:'neutral', cid:'rogue_shelk_contact'},
        {text:"Try the depot directly.", skill:'stealth', tag:'bold', align:'chaotic', cid:'depot_logs'}
      ]
    }
  },
  inquisitor_shirsh_read:{
    success:{
      text:"Evidence first, theory second. Cross-reference eastern route incident register, manifest discrepancy file, and eastern depot personnel access log. Result: seven discrepancy events, four personnel with access at more than one event, one access log entry that doesn't match any registered credential. That last one is your thread.",
      xp:7, effects:[{type:'journal',msg:'Shirsh cross-reference: seven discrepancy events, four multi-event personnel, one unregistered credential in access log.',category:'fact',dedupeKey:'inquisitor_shirsh_case_structure'},{type:'quest',msg:'Identify the unregistered credential in the eastern depot access log.'}],
      next:[
        {text:"Pull the full access log and isolate the unregistered credential.", skill:'lore', tag:'safe', align:'lawful', cid:'inquisitor_shirsh_log'},
        {text:"Formally open a case file. This evidence needs official protection.", skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
        {text:"Find the four multi-event personnel before they know you have their names.", skill:'stealth', tag:'risky', align:'neutral', cid:'inquisitor_shirsh_subjects'}
      ]
    },
    failure:{
      text:"The incident register is partially sealed under an administrative hold filed by an office with House Shelk standing. You need override authority or a different entry point.",
      xp:2, effects:[],
      next:[
        {text:"Find Shirsh authority to issue override access.", skill:'persuasion', tag:'risky', align:'lawful', cid:'garrison_contact'},
        {text:"Work from the unsealed four events.", skill:'lore', tag:'safe', align:'neutral', cid:'study_packet'}
      ]
    }
  },
  inquisitor_shirsh_log:{
    success:{
      text:"The unregistered credential resolves to a deactivated account — a Roazian enforcement liaison posted to Shelkopolis eight months ago. Posting ended, account never deactivated. Used three times in the last month to access eastern depot records. Most recently two days ago.",
      xp:8, effects:[{type:'journal',msg:'Unregistered credential: deactivated Roazian liaison account used three times in last month. Someone is using dead ORE credentials.',category:'fact',dedupeKey:'inquisitor_shirsh_ore_credential'},{type:'quest',msg:'Identify who is using the deactivated Roazian liaison account.'},{type:'renown',n:1}],
      next:[
        {text:"Cross-reference usage timestamps with Ithtananalor personnel records.", skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:"Report to the Magi Magistratus. This is a jurisdictional issue.", skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'},
        {text:"Go to the eastern depot and wait. If the account is used again, you'll see who.", skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'}
      ]
    },
    failure:{
      text:"The access log records events but not the full credential chain. You can prove something was used. Not what.",
      xp:3, effects:[{type:'tick',n:1}],
      next:[
        {text:"Find someone with deeper access to the credential system.", skill:'persuasion', tag:'risky', align:'lawful', cid:'garrison_contact'},
        {text:"Work from the usage pattern instead. Three accesses — when, how long, what was queried.", skill:'lore', tag:'safe', align:'neutral', cid:'study_packet'}
      ]
    }
  },
  inquisitor_shirsh_subjects:{
    success:{
      text:"You observe all four before they know it. Two are genuinely uninvolved. One has been reassigned off-site and is inaccessible. The fourth — a depot access administrator named Wren Colmath — has changed their routine in the last two weeks. New route to work. Avoiding certain colleagues. Carrying a sealed document case that doesn't go to their official office.",
      xp:7, effects:[{type:'journal',msg:'Four multi-event personnel: two incidental, one inaccessible, one behavioral change — Wren Colmath, access admin, new routine and sealed case.',category:'fact',dedupeKey:'inquisitor_shirsh_colmath'},{type:'quest',msg:"Determine what Wren Colmath is carrying in the sealed case."}],
      next:[
        {text:"Approach Colmath directly. A formal Shirsh interview.", skill:'lore', tag:'bold', align:'lawful', cid:'probe_order_origin'},
        {text:"Follow Colmath's new route. The deviation is the data.", skill:'stealth', tag:'risky', align:'neutral', cid:'stealth_surveillance'},
        {text:"The sealed case first. What's in it drives what kind of conversation to have.", skill:'stealth', tag:'bold', align:'chaotic', cid:'depot_logs'}
      ]
    },
    failure:{
      text:"You get to three of the four before word spreads. The fourth has made themselves scarce. The disappearance itself is evidence — they had enough warning to react.",
      xp:3, effects:[],
      next:[
        {text:"Find who warned them. The warning is the chain.", skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'},
        {text:"Build from the three you did reach.", skill:'lore', tag:'safe', align:'neutral', cid:'study_packet'}
      ]
    }
  },
  necromancer_panim_read:{
    success:{
      text:"Death records are the most honest documents a settlement produces. Three cases stand out in the Panim registry: the causes read as plausible but the recovery locations are inconsistent with how people move in the last hours of life. Someone moved these bodies after death. Or during.",
      xp:7, effects:[{type:'journal',msg:'Panim registry: three cases with impossible recovery locations. Bodies moved post-mortem or near-mortem — geographically inconsistent filings.',category:'fact',dedupeKey:'necromancer_panim_registry_read'},{type:'quest',msg:'Identify who moved the three bodies and from where.'}],
      next:[
        {text:"Map the impossible geography. Where would someone have to be to be found where they were found?", skill:'lore', tag:'safe', align:'neutral', cid:'necromancer_panim_map'},
        {text:"Find the filing officials. Same person for all three?", skill:'lore', tag:'risky', align:'neutral', cid:'healer_panim_registry'},
        {text:"Read the bodies directly in the mortuary halls. They carry what the registry suppressed.", skill:'lore', tag:'bold', align:'neutral', cid:'necromancer_mortuary_read'}
      ]
    },
    failure:{
      text:"Registry access requires formal academic or institutional standing. Your credentials don't match the Panim registry format.",
      xp:2, effects:[],
      next:[
        {text:"Find Toriel Palevow. He has registry access.", skill:'persuasion', tag:'safe', align:'neutral', cid:'healer_panim_ally'},
        {text:"Get the Mimolot certification recognized through formal channels.", skill:'persuasion', tag:'risky', align:'lawful', cid:'garrison_contact'}
      ]
    }
  },
  necromancer_panim_map:{
    success:{
      text:"The geometry is clear once you map it. The three recovery locations form a triangle with the eastern freight route through the center. The bodies were moved away from the route to where they'd be found quickly. Someone wanted these deaths registered and closed before anyone noticed the route connection.",
      xp:8, effects:[{type:'journal',msg:'Body location geometry: triangle around eastern freight route. Bodies moved from route proximity to fast-registration sites. Deliberate, infrastructure-knowledgeable.',category:'fact',dedupeKey:'necromancer_panim_body_geometry'},{type:'quest',msg:'Find who has both local death-routing knowledge and eastern freight infrastructure access.'},{type:'renown',n:1}],
      next:[
        {text:"Who moves through the route regularly with body-handling capability?", skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:"Bring this map to Toriel Palevow. He'll understand the medical implications.", skill:'persuasion', tag:'safe', align:'neutral', cid:'healer_panim_ally'},
        {text:"Find where the route passes near each recovery point. Physical reconnaissance.", skill:'survival', tag:'bold', align:'neutral', cid:'follow_tracks'}
      ]
    },
    failure:{
      text:"One of three registry entries has a corrupted location field. You have a direction from two confirmed points, not a definite geometry.",
      xp:3, effects:[],
      next:[
        {text:"Get the original intake report to reconstruct the location.", skill:'lore', tag:'risky', align:'neutral', cid:'healer_panim_registry'},
        {text:"Work from two confirmed points.", skill:'lore', tag:'safe', align:'neutral', cid:'study_packet'}
      ]
    }
  },
  necromancer_mortuary_read:{
    success:{
      text:"The mortuary has all three still in residence. The bodies carry what the registry suppressed: ligature marks under the official cause-of-death notation, tissue damage from hours of immobility, and trace mineral deposits from a geological layer that doesn't exist in Panim Haven. They were brought here.",
      xp:8, effects:[{type:'journal',msg:'Mortuary examination: ligature marks, immobility damage, geological minerals inconsistent with Panim Haven origin. Victims transported from elsewhere.',category:'fact',dedupeKey:'necromancer_panim_mortuary_read'},{type:'quest',msg:'Identify the geological origin of the mineral traces.'},{type:'morality',n:5},{type:'renown',n:1}],
      next:[
        {text:"Match the mineral deposits to a geological layer on the route maps.", skill:'lore', tag:'risky', align:'neutral', cid:'study_packet'},
        {text:"Document everything and bring it to the formal registry. This is now a murder case.", skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'},
        {text:"Find who had access to bodies in transit along the eastern route.", skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'}
      ]
    },
    failure:{
      text:"The mortuary has restricted access for examination beyond visual review. You can see something is wrong but you cannot read the bodies properly without formal medical authority.",
      xp:2, effects:[],
      next:[
        {text:"Get Toriel Palevow. He has the authority and the skill.", skill:'persuasion', tag:'safe', align:'neutral', cid:'healer_panim_ally'},
        {text:"Work from the visual evidence only.", skill:'lore', tag:'safe', align:'neutral', cid:'necromancer_panim_map'}
      ]
    }
  },
  saint_cysur_read:{
    success:{
      text:"Thirty-one private memorials filed this month. The normal rate for a quiet month is eight. The families filing these aren't grieving in a normal pattern. They're reporting something. They just don't have anyone to report it to.",
      xp:7, effects:[{type:'journal',msg:"Cysur memorial audit: thirty-one private memorials vs normal eight. Families are reporting, not simply grieving.",category:'fact',dedupeKey:'saint_cysur_memorial_audit'},{type:'quest',msg:'Speak to the families behind the abnormal memorial filings.'}],
      next:[
        {text:"Speak to every family. Document what they're reporting.", skill:'persuasion', tag:'safe', align:'good', cid:'saint_cysur_witness'},
        {text:"Bring the memorial count to the Roadwardens as formal evidence.", skill:'persuasion', tag:'bold', align:'lawful', cid:'garrison_contact'},
        {text:"Find what the Aurora Light Cathedral pastoral records have heard.", skill:'lore', tag:'risky', align:'neutral', cid:'shrine_contact'}
      ]
    },
    failure:{
      text:"Memorial files are protected by Panim privacy protocol. You can see the count but not the content without investigative standing.",
      xp:2, effects:[],
      next:[
        {text:"Approach families at the memorial sites directly.", skill:'persuasion', tag:'safe', align:'good', cid:'trace_missing_persons'},
        {text:"Get a formal Cysur mandate. It carries weight here.", skill:'persuasion', tag:'risky', align:'lawful', cid:'garrison_contact'}
      ]
    }
  },
  saint_cysur_witness:{
    success:{
      text:"Fourteen families over two days. Four elements in common: sent someone east on cargo work, arranged through an intermediary they can't now locate, person didn't return, official response was 'transit delay' then silence. Fourteen families. Four elements. Not coincidence.",
      xp:8, effects:[{type:'journal',msg:"Fourteen testimonies: east on cargo work, unlocatable intermediary, no return, official 'transit delay' then silence — consistent pattern.",category:'fact',dedupeKey:'saint_cysur_family_testimonies'},{type:'faction',id:'house_shelk',n:-5},{type:'faction',id:'the_union',n:5},{type:'renown',n:1}],
      next:[
        {text:"Find the intermediary. That's the operational contact point.", skill:'lore', tag:'risky', align:'neutral', cid:'find_cart_driver'},
        {text:"Take the fourteen testimonies to the Roadwardens as a formal complaint.", skill:'persuasion', tag:'safe', align:'lawful', cid:'find_roadwarden'},
        {text:"Publish the pattern. Fourteen families together is harder to suppress than one.", skill:'persuasion', tag:'bold', align:'good', cid:'find_broadsheet'}
      ]
    },
    failure:{
      text:"Three families will speak. Eleven won't — too frightened or too hopeful. Three testimonies are real but not enough to hold under scrutiny.",
      xp:3, effects:[],
      next:[
        {text:"Start with the three. Build from what you have.", skill:'persuasion', tag:'safe', align:'good', cid:'trace_missing_persons'},
        {text:"Find the Aurora Light Cathedral pastoral records.", skill:'lore', tag:'safe', align:'lawful', cid:'shrine_contact'}
      ]
    }
  },
  saint_cysur_mandate:{
    success:{
      text:"High Priestess Dawnlight listened without interrupting. When you finish she sets down her pen. 'Thirty-one memorials. I've been counting too.' She removes a document. 'The Cathedral holds a formal right of inquiry when civilian death reaches three times baseline. We've crossed that threshold. I'm issuing a Cathedral inquiry.' She signs it. 'You're the named witness. The inquiry is yours to conduct.'",
      xp:8, effects:[{type:'journal',msg:'Dawnlight issues formal Cysur Cathedral inquiry. Named witness status granted. Civilian death at three times baseline — prosecution authority active.',category:'companion',dedupeKey:'saint_cysur_cathedral_inquiry'},{type:'faction',id:'house_shelk',n:5},{type:'renown',n:2}],
      next:[
        {text:"Accept the mandate and begin the formal inquiry.", skill:'lore', tag:'safe', align:'lawful', cid:'probe_order_origin'},
        {text:"Ask Dawnlight to issue a public statement first.", skill:'persuasion', tag:'bold', align:'good', cid:'find_broadsheet'},
        {text:"Use the inquiry mandate to access the sealed memorial files.", skill:'lore', tag:'risky', align:'lawful', cid:'gilded_archives'}
      ]
    },
    failure:{
      text:"'A Cathedral inquiry carries significant consequence. I won't issue one on preliminary evidence.' She's not refusing — she's asking for more.",
      xp:3, effects:[],
      next:[
        {text:"Build the evidence base and come back.", skill:'persuasion', tag:'safe', align:'neutral', cid:'saint_cysur_witness'},
        {text:"Find another institutional path that doesn't require the Cathedral.", skill:'lore', tag:'risky', align:'neutral', cid:'garrison_contact'}
      ]
    }
  },
  tactician_soreheim_read:{
    success:{
      text:"You map the operation before doing anything else — as a commander, not an investigator. Three phases: route closure (1), cargo movement (2), aftermath management (3, currently active). The cleanup is underway. You're inside the operational window. The exploitable seam right now is the transition between phases two and three — the cargo has moved, but the documentation hasn't caught up.",
      xp:7, effects:[{type:'journal',msg:'Operational map: three-phase operation. Route closure, cargo movement, aftermath management (active). Documentation gap between phases 2 and 3 is current exploitable seam.',category:'fact',dedupeKey:'tactician_soreheim_operation_map'},{type:'quest',msg:'Find and exploit the documentation gap between cargo movement and cleanup.'}],
      next:[
        {text:"Hit the documentation gap before it closes.", skill:'lore', tag:'bold', align:'neutral', cid:'tactician_soreheim_gap'},
        {text:"Identify who's running phase three. That's the center of gravity.", skill:'lore', tag:'risky', align:'neutral', cid:'tactician_soreheim_cog'},
        {text:"Find out what the cargo was. That drives everything else.", skill:'craft', tag:'risky', align:'neutral', cid:'probe_order_origin'}
      ]
    },
    failure:{
      text:"Your operational map is missing too many data points to prioritize. You need more raw intelligence before analysis is useful.",
      xp:2, effects:[],
      next:[
        {text:"Gather raw intelligence first.", skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'},
        {text:"The Roadwardens will have operational data you don't.", skill:'persuasion', tag:'risky', align:'neutral', cid:'garrison_contact'}
      ]
    }
  },
  tactician_soreheim_gap:{
    success:{
      text:"The gap is exactly where you predicted. Three transit record versions covering the same period, different authorizing signatures, inconsistent cargo descriptions. Someone generated multiple versions without realizing all three would eventually be cross-referenced. The discrepancy is sitting in the administrative archive, unflagged.",
      xp:8, effects:[{type:'journal',msg:'Documentation gap confirmed: three transit record versions, same period, different signatures, inconsistent cargo — unflagged in administrative archive, all three documented.',category:'fact',dedupeKey:'tactician_soreheim_transit_gap'},{type:'renown',n:1}],
      next:[
        {text:"Cross-reference the three versions to identify what was actually moved.", skill:'lore', tag:'risky', align:'neutral', cid:'study_packet'},
        {text:"Identify which authorizing signature appears in only one version — that's the unauthorized one.", skill:'lore', tag:'safe', align:'neutral', cid:'trace_directive'},
        {text:"Take the three versions to the Roadwardens immediately.", skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'}
      ]
    },
    failure:{
      text:"Archive access requires a specific credential that expired this morning. Routine rotation, poorly timed. Six hours through official channels.",
      xp:2, effects:[{type:'tick',n:1}],
      next:[
        {text:"Get the renewed credential through official channels.", skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
        {text:"Find an unofficial way into the archive.", skill:'stealth', tag:'bold', align:'chaotic', cid:'depot_logs'}
      ]
    }
  },
  tactician_soreheim_cog:{
    success:{
      text:"The center of gravity for phase three: a logistics coordinator named Selwyn Coth. His name appears in route records, cargo authorization, and aftermath communication — all three phases. Mid-level, most vulnerable position: too exposed to deny, not senior enough to have protection.",
      xp:7, effects:[{type:'journal',msg:"Phase three CoG: Selwyn Coth, logistics coordinator — all three phases. Mid-level, exposed without senior protection.",category:'fact',dedupeKey:'tactician_soreheim_coth_identified'},{type:'quest',msg:'Find Coth before phase three cleanup is complete.'}],
      next:[
        {text:"Find Coth now, before phase three is complete.", skill:'lore', tag:'bold', align:'neutral', cid:'confront_coth'},
        {text:"Map Coth's chain upward first. Who is he reporting to?", skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'},
        {text:"Build the evidence first, then make Coth an offer from a position of strength.", skill:'persuasion', tag:'risky', align:'lawful', cid:'probe_order_origin'}
      ]
    },
    failure:{
      text:"Three names appear across all three phases, not one. You've narrowed it but can't isolate the actual hub without more specifics.",
      xp:3, effects:[],
      next:[
        {text:"Profile all three. Behavior pattern will identify the hub.", skill:'lore', tag:'risky', align:'neutral', cid:'passive_intel'},
        {text:"Build the documentation evidence first, then use it to pressure the right person.", skill:'lore', tag:'safe', align:'neutral', cid:'tactician_soreheim_gap'}
      ]
    }
  }

,

  // ── LOCALITY: SOREHEIM PROPER ─────────────────────────
  soreheim_allocation_read:{
    success:{
      text:"The allocation board tells you everything the official record won't. Soreheim runs on quotas — inputs and outputs, tabulated by cycle. Three cycles ago the eastern freight input line dropped by thirty percent while the official manifest showed normal throughput. The board administrator filed the discrepancy as 'measurement variance.' That's not a measurement variance. That's cargo that arrived and wasn't counted.",
      xp:7, effects:[{type:'journal',msg:"Soreheim allocation: 30% eastern freight input gap over three cycles, filed as 'measurement variance.' Cargo arrived uncounted.",category:'fact',dedupeKey:'soreheim_allocation_gap'},{type:'quest',msg:'Find where the uncounted eastern freight went.'}],
      next:[
        {text:"Talk to the board administrator. They know the difference between variance and disappearance.", skill:'persuasion', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:"The uncounted cargo went somewhere. Find the internal transfer records.", skill:'lore', tag:'safe', align:'neutral', cid:'study_packet'},
        {text:"Take this to the Miners' Assembly. If quota inputs are being gamed, they feel it directly.", skill:'persuasion', tag:'safe', align:'lawful', cid:'union_contact'}
      ]
    },
    failure:{
      text:"The allocation board requires Giant Council authorization to access historical cycle data. Standard request processing takes four days. You don't have four days before the data retention window rolls over.",
      xp:2, effects:[{type:'tick',n:1}],
      next:[
        {text:"Find a Giant Council representative who can expedite.", skill:'persuasion', tag:'risky', align:'lawful', cid:'garrison_contact'},
        {text:"Access the allocation data through an informal channel.", skill:'stealth', tag:'bold', align:'chaotic', cid:'depot_logs'}
      ]
    }
  },
  soreheim_worker_read:{
    success:{
      text:"You find them at the end of a twelve-hour extraction shift — tired, forthcoming in the way that tired people are when someone actually asks them something. Three workers saw the eastern cargo. One helped transfer it. They describe a sealed container type they didn't recognize from any standard Soreheim specification, a transfer that happened during a shift overlap that wasn't on the official schedule, and a foreman who told them afterward it was 'a Shelk contract' and left it at that. 'A Shelk contract' doesn't explain an off-schedule transfer in an unmarked container.",
      xp:8, effects:[{type:'journal',msg:"Three workers witnessed eastern cargo transfer: unrecognized container type, off-schedule shift overlap, foreman cited 'Shelk contract.' None of it matches standard spec.",category:'fact',dedupeKey:'soreheim_worker_testimony'},{type:'faction',id:'miners_assembly',n:5},{type:'renown',n:1}],
      next:[
        {text:"Find the foreman. 'Shelk contract' is a name they were given, not an explanation.", skill:'persuasion', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:"Get the off-schedule shift overlap on record. That's a procedural violation with documentation.", skill:'lore', tag:'safe', align:'lawful', cid:'report_findings'},
        {text:"Find the container type specification. Soreheim tracks every container standard.", skill:'craft', tag:'risky', align:'neutral', cid:'study_packet'}
      ]
    },
    failure:{
      text:"Workers in Soreheim don't talk to strangers about shift work without a good reason to trust you. You get polite deflection and a suggestion to file a formal inquiry.",
      xp:2, effects:[],
      next:[
        {text:"Build trust first. Work a shift. Show you're not a liability.", skill:'craft', tag:'risky', align:'neutral', cid:'find_work'},
        {text:"Find the allocation board approach instead.", skill:'lore', tag:'safe', align:'neutral', cid:'soreheim_allocation_read'}
      ]
    }
  },

  // ── LOCALITY: COSMORIA (HOUSE COSMOUTH) ──────────────
  cosmoria_harbor_read:{
    success:{
      text:"Harbor records are specific in the way that maritime law requires — not because the maritime community is honest, but because disputes at sea get people killed and specificity prevents disputes. The eastern route cargo logged through Cosmouth harbor three weeks ago under a transit authorization that should have required countersignature from two House Cosmouth officials. It has one. The missing countersignature belongs to an official who was out of the city on those dates. Someone signed for them.",
      xp:7, effects:[{type:'journal',msg:"Cosmouth harbor: eastern cargo logged under transit auth with forged countersignature. Missing official was out of city — someone signed in their name.",category:'fact',dedupeKey:'cosmoria_harbor_signature'},{type:'quest',msg:"Identify who signed for the absent Cosmouth official."}],
      next:[
        {text:"Find the official whose signature was forged. They need to know and they can act.", skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
        {text:"Find who was physically in the office on those dates and had access to the countersignature stamp.", skill:'lore', tag:'risky', align:'neutral', cid:'inquisitor_shirsh_subjects'},
        {text:"The cargo transit itself — where did it go after Cosmouth harbor?", skill:'survival', tag:'risky', align:'neutral', cid:'follow_tracks'}
      ]
    },
    failure:{
      text:"Maritime records are protected under House Cosmouth commercial confidentiality provisions. You can see the existence of the transit record but not its contents without a commercial dispute filing — which requires you to be a party to the relevant transaction.",
      xp:2, effects:[],
      next:[
        {text:"Find a House Cosmouth commercial entity that is a party to the transaction.", skill:'persuasion', tag:'risky', align:'chaotic', cid:'probe_order_origin'},
        {text:"The harbor clerk who processed the transit might talk informally.", skill:'stealth', tag:'risky', align:'neutral', cid:'passive_intel'}
      ]
    }
  },
  cosmoria_floating_read:{
    success:{
      text:"Cosmoria doesn't have fixed geography the way settlements on land do — it adjusts. People adjust with it. The particular adjustment you're watching is the movement of three warehouse barges that repositioned three weeks ago, just before the eastern route irregularities became officially visible. Barges don't reposition without reason. The new positions put these three barges in line-of-sight of the main harbor entrance during all transit windows. They've been watching the harbor.",
      xp:8, effects:[{type:'journal',msg:"Cosmoria: three warehouse barges repositioned immediately before route irregularities became visible. New positions provide line-of-sight surveillance of main harbor during all transit windows.",category:'fact',dedupeKey:'cosmoria_barge_reposition'},{type:'quest',msg:"Identify who repositioned the barges and why they're surveilling the harbor."}],
      next:[
        {text:"Approach one of the barges directly. Understand who's running the surveillance.", skill:'persuasion', tag:'risky', align:'neutral', cid:'shadowhands_contact'},
        {text:"Find out who registered the repositioning with harbor control.", skill:'lore', tag:'safe', align:'neutral', cid:'trade_registry'},
        {text:"Observe the barges observing. What are they watching for?", skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'}
      ]
    },
    failure:{
      text:"You can see the repositioned barges from the harbor walk. You can't access them without marine transit authorization, and authorization requires a documented reason for the visit.",
      xp:2, effects:[{type:'tick',n:1}],
      next:[
        {text:"Get marine transit authorization through official channels.", skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
        {text:"Work from the harbor records to identify who authorized the reposition.", skill:'lore', tag:'safe', align:'neutral', cid:'cosmoria_harbor_read'}
      ]
    }
  },

  // ── LOCALITY: SHIRSHAL (HOUSE SHIRSH) ─────────────────
  shirshal_evidence_read:{
    success:{
      text:"The Shirsh evidence vault holds everything that was collected and never prosecuted. You're looking for something specific: any investigation touching the eastern corridor that was opened and then closed without outcome. You find four. Three are old — ten years or more, administrative. The fourth was opened eight months ago, collected seventeen items of physical evidence, and was closed six weeks ago with a single notation: 'Superseded by administrative review.' Seventeen items of evidence don't get superseded by administrative review. They get suppressed.",
      xp:7, effects:[{type:'journal',msg:"Shirsh vault: four eastern corridor investigations, one recent — opened 8 months ago, 17 evidence items, closed 6 weeks ago: 'superseded by administrative review.' Evidence suppression.",category:'fact',dedupeKey:'shirshal_vault_suppressed_case'},{type:'quest',msg:"Access the seventeen suppressed evidence items from the closed investigation."}],
      next:[
        {text:"Request access to the closed case through formal Shirsh inquiry channels.", skill:'lore', tag:'safe', align:'lawful', cid:'garrison_contact'},
        {text:"Find who filed the 'superseded by administrative review' notation — that's the suppression point.", skill:'lore', tag:'risky', align:'neutral', cid:'inquisitor_shirsh_log'},
        {text:"The evidence is still in the vault. Find a way to access it before it's transferred out.", skill:'stealth', tag:'bold', align:'chaotic', cid:'depot_logs'}
      ]
    },
    failure:{
      text:"Closed investigation files in the Shirsh vault require Magi Magistratus authorization to access. Processing time: three business days. The vault clerk notes this without expression.",
      xp:2, effects:[],
      next:[
        {text:"Get Magi Magistratus authorization. Three days is workable.", skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
        {text:"Find the Inquisitor who ran this case. They may have kept personal copies.", skill:'lore', tag:'risky', align:'neutral', cid:'inquisitor_shirsh_subjects'}
      ]
    }
  },
  shirshal_inquiry_read:{
    success:{
      text:"The Inquiry Hall calendar shows twelve formal proceedings in the last month. Standard Shirsh volume is six to eight. The additional four proceedings are all described under the same notation: 'Interlocutory review — eastern corridor matters.' Interlocutory means they're responding to something in progress. Twelve proceedings in one month means something is actively escalating through the Shirsh legal system, and whoever is escalating it is using formal channels — which means the evidence is being built into a record.",
      xp:8, effects:[{type:'journal',msg:"Shirshal Inquiry Hall: 12 proceedings this month vs normal 6-8. Four described as 'interlocutory review — eastern corridor.' Evidence actively being built into formal Shirsh record.",category:'fact',dedupeKey:'shirshal_inquiry_escalation'},{type:'quest',msg:"Identify which party is escalating the eastern corridor matter through Shirsh proceedings."}],
      next:[
        {text:"Access the interlocutory proceedings calendar and find the filing party.", skill:'lore', tag:'safe', align:'lawful', cid:'garrison_contact'},
        {text:"Find Veyn Veilthorn at the Inquiry Hall. They record everything.", skill:'persuasion', tag:'safe', align:'neutral', cid:'find_roadwarden'},
        {text:"Join the proceedings as an additional filing party. Add your evidence to the formal record.", skill:'persuasion', tag:'bold', align:'lawful', cid:'report_findings'}
      ]
    },
    failure:{
      text:"The Inquiry Hall proceedings calendar is public but the proceeding contents aren't. You know how many are running. You can't know what they contain without formal party status.",
      xp:2, effects:[],
      next:[
        {text:"Get formal party status in one of the interlocutory proceedings.", skill:'persuasion', tag:'risky', align:'lawful', cid:'garrison_contact'},
        {text:"Find the Shirsh evidence vault approach instead.", skill:'lore', tag:'safe', align:'neutral', cid:'shirshal_evidence_read'}
      ]
    }
  },

  // ── LOCALITY: MIMOLOT ACADEMY ─────────────────────────
  mimolot_archive_read:{
    success:{
      text:"The Mimolot archive holds every transit pattern analysis the Academy has published in the last fifty years. You're not looking for published work — you're looking for the unpublished submissions that were received and not published. There's a specific category for these: 'Held for institutional review.' Fourteen submissions in the last year carry that notation. Three of them are specifically about the eastern route. All three were submitted in the six months before the route irregularities became visible.",
      xp:7, effects:[{type:'journal',msg:"Mimolot archive: 14 submissions 'held for institutional review' this year, three specifically about eastern route — all submitted 6 months before irregularities became visible.",category:'fact',dedupeKey:'mimolot_held_submissions'},{type:'quest',msg:"Access the three suppressed eastern route analyses."}],
      next:[
        {text:"Find the submission authors. Their work was suppressed — they'll want to know why.", skill:'persuasion', tag:'safe', align:'neutral', cid:'probe_order_origin'},
        {text:"Find who holds institutional review authority for transit pattern submissions.", skill:'lore', tag:'risky', align:'neutral', cid:'inquisitor_shirsh_log'},
        {text:"Access the submissions through an informal archive channel.", skill:'stealth', tag:'bold', align:'chaotic', cid:'depot_logs'}
      ]
    },
    failure:{
      text:"The unpublished submissions section requires a research fellowship credential or faculty sponsorship. You have neither.",
      xp:2, effects:[],
      next:[
        {text:"Get faculty sponsorship. Quillan Quillmark manages academy access.", skill:'persuasion', tag:'risky', align:'lawful', cid:'garrison_contact'},
        {text:"Find one of the submission authors directly. The work is theirs even if the academy holds it.", skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'}
      ]
    }
  },
  mimolot_scholar_read:{
    success:{
      text:"The scholars in the commons talk more freely than the official academy positions do. Over two hours of careful listening — framed as academic interest, not investigation — you identify a specific tension: a cluster of pattern-analysis scholars who stopped publishing together about eight months ago. Before that, they co-authored three papers per cycle. Since then: nothing. The informal explanation going around the commons is that they 'had a disagreement about methodology.' The timing and the subject of their last paper — eastern route freight analysis — suggests otherwise.",
      xp:8, effects:[{type:'journal',msg:"Mimolot commons: pattern-analysis scholars stopped co-publishing 8 months ago. Last paper: eastern route freight analysis. Informal story is 'methodology disagreement,' timing suggests pressure.",category:'fact',dedupeKey:'mimolot_scholar_silence'},{type:'renown',n:1}],
      next:[
        {text:"Find the scholars individually. The disagreement story is cover — find what they were told.", skill:'persuasion', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:"Get their last paper. If it was published before they were silenced, it's on the record.", skill:'lore', tag:'safe', align:'neutral', cid:'gilded_archives'},
        {text:"The person who pressured them is still at the academy. Find them.", skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'}
      ]
    },
    failure:{
      text:"Academic commons conversation requires patience and access you don't currently have. People are polite but closed.",
      xp:2, effects:[],
      next:[
        {text:"Try the archive approach instead.", skill:'lore', tag:'safe', align:'neutral', cid:'mimolot_archive_read'},
        {text:"Find a faculty member who's less cautious.", skill:'persuasion', tag:'risky', align:'neutral', cid:'passive_intel'}
      ]
    }
  },

  // ── LOCALITY: GUILDHEART HUB (THE UNION) ──────────────
  guildheart_manifest_read:{
    success:{
      text:"The Union keeps the most comprehensive freight manifest records in the known polities — not because they're honest but because their arbitration system requires evidentiary specificity. You're looking for the eastern route manifests from the last three months. They're all there. The inconsistency is in what's not there: the return manifests. Freight moved east in significant volume. Almost none of it appears in the corresponding return records. Either it didn't come back, or it came back without being logged.",
      xp:7, effects:[{type:'journal',msg:"Guildheart manifest records: eastern freight outbound volume normal, return manifests almost absent. Freight either didn't return or returned without logging.",category:'fact',dedupeKey:'guildheart_return_manifest_gap'},{type:'quest',msg:"Determine whether the eastern freight returned unlisted or didn't return at all."}],
      next:[
        {text:"Find Union arbitration records for eastern route disputes — someone filed a complaint about missing returns.", skill:'lore', tag:'safe', align:'neutral', cid:'union_contact'},
        {text:"Check the freight destination records against the return gaps. Where was it supposed to go?", skill:'lore', tag:'risky', align:'neutral', cid:'trade_registry'},
        {text:"Find a Ledgermere who processed these manifests. They'll remember.", skill:'persuasion', tag:'safe', align:'neutral', cid:'find_cart_driver'}
      ]
    },
    failure:{
      text:"Freight manifest records at Guildheart Hub require a merchant credential or arbitration party status to access. You have neither.",
      xp:2, effects:[],
      next:[
        {text:"Get a temporary merchant credential through the Guild Sanction Board.", skill:'persuasion', tag:'risky', align:'lawful', cid:'garrison_contact'},
        {text:"Find a Union trader willing to request records on your behalf.", skill:'persuasion', tag:'safe', align:'neutral', cid:'union_contact'}
      ]
    }
  },
  guildheart_arbitration_read:{
    success:{
      text:"The arbitration queue at Guildheart Hub is backlogged — not unusual. What's unusual is that six of the current active arbitrations are described as 'pending additional party identification.' That means someone filed a complaint but the responding party hasn't been formally identified yet. All six were filed in the last five weeks. All six cite eastern route freight irregularities as the basis. Someone organized six parties to file simultaneously — that's not coincidence, that's a campaign.",
      xp:8, effects:[{type:'journal',msg:"Guildheart arbitration: six active cases citing eastern route freight irregularities, all filed in last five weeks, all pending party identification. Coordinated filing campaign.",category:'fact',dedupeKey:'guildheart_coordinated_filing'},{type:'faction',id:'the_union',n:5},{type:'renown',n:1}],
      next:[
        {text:"Find who coordinated the filing campaign. They have the same evidence you're looking for.", skill:'persuasion', tag:'risky', align:'neutral', cid:'union_contact'},
        {text:"Join one of the six arbitrations as an additional party. Your evidence strengthens the record.", skill:'persuasion', tag:'bold', align:'lawful', cid:'report_findings'},
        {text:"Find the 'pending party' — the unnamed respondent — before the arbitrations force them to identify themselves.", skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'}
      ]
    },
    failure:{
      text:"Arbitration records are party-confidential until proceedings are formalized. You can see the case descriptions but not the party identities or evidence.",
      xp:2, effects:[],
      next:[
        {text:"Find the manifest approach instead.", skill:'lore', tag:'safe', align:'neutral', cid:'guildheart_manifest_read'},
        {text:"Find a Union mediator who'll tell you more than the formal record does.", skill:'persuasion', tag:'risky', align:'neutral', cid:'passive_intel'}
      ]
    }
  },

  // ── LOCALITY: FAIRHAVEN ───────────────────────────────
  fairhaven_market_read:{
    success:{
      text:"Fairhaven's market isn't the size of Shelkopolis or Guildheart but it's on the route, which means it sees what passes through. You spend a morning with the traders who handle eastern freight forwarding — the ones whose livelihood depends on knowing exactly what's moving. Three weeks ago they stopped receiving advance notices for eastern shipments. Before that: regular weekly notifications. The notices stopped without explanation, and when they asked the forwarding agent, they were told the eastern route had been 'operationally restructured.' That's not a phrase anyone in Fairhaven freight forwarding has encountered before.",
      xp:6, effects:[{type:'journal',msg:"Fairhaven: eastern freight forwarding advance notices stopped three weeks ago without explanation. Forwarding agent cited 'operational restructuring' — phrase unknown in local trade.",category:'fact',dedupeKey:'fairhaven_forwarding_gap'},{type:'quest',msg:"Find the forwarding agent who cited 'operational restructuring.'"}],
      next:[
        {text:"Find the forwarding agent. That phrase came from somewhere specific.", skill:'persuasion', tag:'risky', align:'neutral', cid:'find_cart_driver'},
        {text:"Check the Roadwarden post. Route restructuring requires authorization they'd have on record.", skill:'lore', tag:'safe', align:'lawful', cid:'garrison_contact'},
        {text:"Work backward from the last advance notice. What was the final shipment before the restructuring?", skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'}
      ]
    },
    failure:{
      text:"Market traders are cautious with strangers asking about freight specifics. You get general complaints about the eastern route slowdown but nothing specific.",
      xp:2, effects:[],
      next:[
        {text:"Establish yourself as a trader first. Spend a day working the market.", skill:'craft', tag:'risky', align:'neutral', cid:'find_work'},
        {text:"Try the Roadwarden post approach instead.", skill:'lore', tag:'safe', align:'neutral', cid:'garrison_contact'}
      ]
    }
  },
  fairhaven_roadwarden_read:{
    success:{
      text:"The Fairhaven Roadwarden post runs a smaller operation than Shelkopolis Central but the records are the same format. You ask to see the eastern route authorization log — a routine request for anyone traveling the route. The duty officer shows it to you. Three weeks ago the standard authorization protocol was replaced with a new one: eastern route transit now requires pre-clearance from Shelkopolis Central rather than the standard local authorization. That change was filed as an administrative update. It means that from three weeks ago, every eastern route movement is being centrally controlled from Shelkopolis.",
      xp:7, effects:[{type:'journal',msg:"Fairhaven Roadwarden: eastern route authorization centralized to Shelkopolis 3 weeks ago. Pre-clearance requirement filed as administrative update. All eastern movement now centrally controlled.",category:'fact',dedupeKey:'fairhaven_centralized_auth'},{type:'faction',id:'roadwardens',n:5},{type:'renown',n:1}],
      next:[
        {text:"Find who filed the centralization change in Shelkopolis Central.", skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'},
        {text:"Apply for pre-clearance through the new system. The process will reveal who controls it.", skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact'},
        {text:"The change was filed three weeks ago — same time as everything else. Find the pattern.", skill:'lore', tag:'safe', align:'neutral', cid:'probe_order_origin'}
      ]
    },
    failure:{
      text:"The duty officer is cooperative but the authorization log requires a signed request from a party with route business. You don't currently qualify.",
      xp:2, effects:[],
      next:[
        {text:"Get route business credentials.", skill:'persuasion', tag:'risky', align:'lawful', cid:'find_work'},
        {text:"Try the market approach.", skill:'lore', tag:'safe', align:'neutral', cid:'fairhaven_market_read'}
      ]
    }
  }

,

  // ── BARD: PERFORMER & CHRONICLER MID-SPINE ────────────
  bard_network_read:{
    success:{
      text:"You find a performer who worked Shelkopolis three weeks ago — right when the eastern route went quiet. She isn't talking professionally. She's talking because she's frightened. What she saw: a House Shelk administrative official attending a private performance booking and staying after the other guests left to speak with someone she didn't recognize. The conversation was brief. The official left looking like they had been given an instruction, not a request. The stranger left without being logged by the venue.",
      xp:7, effects:[{type:'journal',msg:"Performer witness: House Shelk official received private instruction from unlogged stranger during eastern route closure window. The instruction was given, not negotiated.",category:'fact',dedupeKey:'bard_shelk_instruction_witness'},{type:'quest',msg:"Identify the unlogged stranger who instructed the House Shelk official."}],
      next:[
        {text:"Find the House Shelk official the performer identified. They received an order — find what it was.", skill:'persuasion', tag:'risky', align:'neutral', cid:'house_shelk_meeting'},
        {text:"Find the venue booking records. The stranger left no log but the booking did.", skill:'lore', tag:'safe', align:'neutral', cid:'probe_order_origin'},
        {text:"The performer is frightened. Ask her what she heard, not just what she saw.", skill:'persuasion', tag:'safe', align:'good', cid:'find_note_sender'}
      ]
    },
    failure:{
      text:"The performer circuit goes quiet when you ask about that week. Word has traveled that someone is asking, and people who trade in information know when to stop trading.",
      xp:2, effects:[{type:'tick',n:1}],
      next:[
        {text:"Change your approach. Come as an audience member, not a name they have flagged.", skill:'stealth', tag:'risky', align:'neutral', cid:'passive_intel'},
        {text:"Try the official record instead of the informal circuit.", skill:'lore', tag:'safe', align:'neutral', cid:'probe_order_origin'}
      ]
    }
  },
  bard_memorial_read:{
    success:{
      text:"You've sung thirty-one memorials this month. You've also listened to thirty-one families describe the same thing in different words: someone they sent east on what seemed like honest work did not come back, and the official response was a form letter followed by silence. You have thirty-one testimonies. Written down, consistent, credible. That's more than an investigation — that's a public record. A chronicle. The question is what you do with it.",
      xp:8, effects:[{type:'journal',msg:"Memorial chronicle: 31 consistent family testimonies — east on cargo work, unlocatable intermediary, no return, form letter then silence. Sufficient for public record.",category:'fact',dedupeKey:'bard_memorial_chronicle'},{type:'quest',msg:"Determine where to publish the chronicle for maximum effect."},{type:'renown',n:1}],
      next:[
        {text:"Publish through the performer circuit. It reaches more people faster than any broadsheet.", skill:'persuasion', tag:'bold', align:'good', cid:'find_broadsheet'},
        {text:"Submit it to the Magi Magistratus as formal testimony. Give it legal weight.", skill:'lore', tag:'safe', align:'lawful', cid:'report_findings'},
        {text:"Find the intermediary first. Publishing puts them underground — catch them before they know you have the chronicle.", skill:'stealth', tag:'risky', align:'neutral', cid:'find_cart_driver'}
      ]
    },
    failure:{
      text:"Three families will go on record. Twenty-eight won't — too afraid, too hopeful, or too deep in the official process to risk it. Three testimonies aren't enough to call a chronicle.",
      xp:3, effects:[],
      next:[
        {text:"Build trust over time. Come back to each family with more of what you've found.", skill:'persuasion', tag:'safe', align:'good', cid:'trace_missing_persons'},
        {text:"Publish what you have. Three credible testimonies is enough to start.", skill:'persuasion', tag:'bold', align:'good', cid:'find_broadsheet'}
      ]
    }
  },

  // ── ORACLE: SEER & PATTERN READER MID-SPINE ───────────
  oracle_pattern_map:{
    success:{
      text:"You map every data point you have against the timeline. The result is cleaner than you expected: the eastern route irregularities, the suppressed analyses, the memorial spike, the authorization changes — they're all downstream of a single upstream event that happened approximately ten months ago. Something changed ten months ago that set the rest in motion. You don't know what it was yet. But you know when.",
      xp:7, effects:[{type:'journal',msg:"Oracle pattern map: all visible irregularities downstream of a single upstream event approximately 10 months ago. The origin event is the key.",category:'fact',dedupeKey:'oracle_timeline_origin'},{type:'quest',msg:"Find what happened approximately 10 months ago that set the eastern route operation in motion."}],
      next:[
        {text:"Find what happened in the administrative record ten months ago.", skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:"The axis data from ten months ago — the dome sensors would have recorded any anomaly.", skill:'lore', tag:'safe', align:'neutral', cid:'elementalist_aurora_read'},
        {text:"Find who was positioned ten months ago to authorize something at that scale.", skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'}
      ]
    },
    failure:{
      text:"The pattern is there but too many data points are missing. You can see the shape but not the origin. You need more raw data before the map resolves.",
      xp:2, effects:[{type:'tick',n:1}],
      next:[
        {text:"Gather more data. The allocation records, the memorial filings, the manifests.", skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'},
        {text:"Find someone who was in a position to observe ten months ago.", skill:'persuasion', tag:'risky', align:'neutral', cid:'passive_intel'}
      ]
    }
  },
  oracle_predict_next:{
    success:{
      text:"Your model says the operation has one more phase. The cleanup running now is phase three. Phase four is when whoever authorized this decides the cleanup was insufficient and initiates direct suppression of anyone actively investigating. Based on the timeline and the rate of escalation, phase four begins in approximately six days. You have six days before the operation stops being investigable from outside.",
      xp:8, effects:[{type:'journal',msg:"Oracle prediction: phase four — active investigator suppression — begins in approximately 6 days based on escalation rate. Investigation window is closing.",category:'fact',dedupeKey:'oracle_phase_four_prediction'},{type:'quest',msg:"Complete the core investigation before phase four begins."},{type:'renown',n:1}],
      next:[
        {text:"Move immediately. Six days is short — prioritize the highest-value evidence.", skill:'lore', tag:'bold', align:'neutral', cid:'study_packet'},
        {text:"Warn the others before phase four begins. They may not know the window is closing.", skill:'persuasion', tag:'safe', align:'good', cid:'report_findings'},
        {text:"Position yourself to observe when phase four starts rather than running from it.", skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'}
      ]
    },
    failure:{
      text:"The escalation rate is too variable to set a reliable timeline. You know phase four is coming. You can't predict when with enough precision to act on.",
      xp:3, effects:[],
      next:[
        {text:"Build more data points to tighten the timeline.", skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'},
        {text:"Act as if the window is closing regardless. Better to move early than wait.", skill:'lore', tag:'bold', align:'neutral', cid:'probe_order_origin'}
      ]
    }
  },

  // ── WARDEN: GUARDIAN & PROTECTOR MID-SPINE ────────────
  warden_threat_read:{
    success:{
      text:"You read the threat the way you were trained: by what it's protecting. The eastern route operation isn't protecting cargo — the cargo is incidental. It's protecting a process. Whatever authorization structure made this possible needs to stay functional for future use. That means the people who could disrupt the authorization structure are the real targets. You can see who's most at risk: the investigators, the witnesses, the filing clerks who handled the records. Someone needs to stand between them and what's coming.",
      xp:7, effects:[{type:'journal',msg:"Warden threat assessment: operation is protecting authorization infrastructure, not cargo. Investigators, witnesses, and key filing clerks are primary targets of phase three suppression.",category:'fact',dedupeKey:'warden_threat_read'},{type:'quest',msg:"Identify and protect the three most at-risk witnesses before phase three reaches them."}],
      next:[
        {text:"Find the most vulnerable witness first. The filing clerk who processed the authorization.", skill:'persuasion', tag:'safe', align:'good', cid:'trace_missing_persons'},
        {text:"Position yourself where you can intercept phase three before it reaches the witnesses.", skill:'survival', tag:'bold', align:'lawful', cid:'east_road'},
        {text:"Document who's at risk and get the documentation to someone who can act on it officially.", skill:'lore', tag:'safe', align:'lawful', cid:'report_findings'}
      ]
    },
    failure:{
      text:"You can see there's a threat but you can't isolate who it's directed at specifically. Too many people are in the frame without enough specificity to know which to protect first.",
      xp:2, effects:[],
      next:[
        {text:"Narrow the threat assessment. Find the most recent suppression target.", skill:'lore', tag:'risky', align:'neutral', cid:'passive_intel'},
        {text:"Protect all of them provisionally. Better to overprotect than to get the prioritization wrong.", skill:'persuasion', tag:'bold', align:'good', cid:'garrison_contact'}
      ]
    }
  },
  warden_position:{
    success:{
      text:"You choose your position the way you've always chosen positions: by what you're protecting and what's coming. The eastern depot access road, between Duskcall and Dawnrise, is where the next phase three action will happen — you can read it from the patrol changes, the timing pattern, and the fact that two witnesses you've been watching were both seen near the depot today. You are at the depot. You are between them and what's coming.",
      xp:8, effects:[{type:'journal',msg:"Warden positioned at eastern depot access road during phase three window. Two witnesses in the area. Protective stance established.",category:'fact',dedupeKey:'warden_depot_position'},{type:'renown',n:1}],
      next:[
        {text:"Hold the position. Let what's coming arrive and see what you're dealing with.", skill:'combat', tag:'bold', align:'lawful', cid:'do_combat_patrol'},
        {text:"Document the position and the witnesses before anything happens. Get it on record.", skill:'lore', tag:'safe', align:'lawful', cid:'report_findings'},
        {text:"Move the witnesses before the window opens. Remove the target.", skill:'stealth', tag:'risky', align:'chaotic', cid:'rest_recover'}
      ]
    },
    failure:{
      text:"You read the position wrong. The phase three action happens at a different location — by the time you realize, it's already in progress elsewhere.",
      xp:2, effects:[{type:'damage',n:3}],
      next:[
        {text:"Move to the actual location. It's not too late to intercept.", skill:'combat', tag:'bold', align:'lawful', cid:'do_combat_patrol'},
        {text:"Assess the damage. Find what happened and who was affected.", skill:'lore', tag:'safe', align:'neutral', cid:'probe_order_origin'}
      ]
    }
  },

  // ── WARLORD: COMMANDER & STRATEGIST MID-SPINE ─────────
  warlord_operation_map:{
    success:{
      text:"You map the operation as a three-dimensional problem: adversary capability, terrain, and timeline. Adversary: institutional authority with enforcement access but limited operational flexibility — they can suppress but can't act overtly. Terrain: the administrative and record infrastructure of four polities. Timeline: three weeks from first irregularity to current cleanup phase. Your assessment: the operation is more brittle than it looks. One simultaneous action across three evidentiary nodes — records, witnesses, and authorization chain — will fracture it before the cleanup completes.",
      xp:8, effects:[{type:'journal',msg:"Warlord operational map: adversary has institutional authority but limited overt flexibility. Operation brittle — simultaneous action across records, witnesses, and authorization chain will fracture it.",category:'fact',dedupeKey:'warlord_operation_brittle'},{type:'quest',msg:"Identify the three simultaneous action points to fracture the operation."},{type:'renown',n:1}],
      next:[
        {text:"Identify the records node. Which records are most critical to the authorization chain?", skill:'lore', tag:'risky', align:'neutral', cid:'study_packet'},
        {text:"Identify the witness node. Who has testimony that can't be suppressed once it's public?", skill:'persuasion', tag:'safe', align:'good', cid:'trace_missing_persons'},
        {text:"Find the authorization chain source. Cut it there and the rest collapses.", skill:'lore', tag:'bold', align:'neutral', cid:'trace_directive'}
      ]
    },
    failure:{
      text:"The operational map has too many variables without enough data points to reduce. You can see the shape of the problem but not the specific nodes to hit.",
      xp:2, effects:[],
      next:[
        {text:"Gather more intelligence before committing to a plan.", skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'},
        {text:"Build the plan from the data you have and adjust as you go.", skill:'lore', tag:'bold', align:'neutral', cid:'probe_order_origin'}
      ]
    }
  },
  warlord_coordinate:{
    success:{
      text:"You find three people already working this problem independently: an investigator from Shirsh running the evidence vault approach, a Union representative tracking the manifest gaps, and a physician in Panim with suppressed medical documentation. None of them know about the others. You coordinate. Within six hours you have a shared intelligence picture that none of them had individually, a planned simultaneous filing across three jurisdictions, and a timeline that hits the authorization chain before phase four begins.",
      xp:9, effects:[{type:'journal',msg:"Warlord coordination: three independent investigators unified. Joint intelligence picture established. Simultaneous multi-jurisdiction filing planned before phase four.",category:'faction',dedupeKey:'warlord_coordination_success'},{type:'faction',id:'the_union',n:5},{type:'faction',id:'roadwardens',n:5},{type:'renown',n:2}],
      next:[
        {text:"Execute the simultaneous filing. Hit all three nodes at once.", skill:'persuasion', tag:'bold', align:'lawful', cid:'report_findings'},
        {text:"Wait one more day to ensure all three nodes are ready.", skill:'lore', tag:'safe', align:'neutral', cid:'study_packet'},
        {text:"Move the timeline up. Phase four may start sooner than predicted.", skill:'combat', tag:'bold', align:'lawful', cid:'east_road'}
      ]
    },
    failure:{
      text:"One of the three won't coordinate. The physician in Panim is too cautious — they won't file without more institutional protection than you can offer. Two out of three isn't a simultaneous action; it's a sequential action with warning time built in.",
      xp:3, effects:[],
      next:[
        {text:"Get the institutional protection the physician needs.", skill:'persuasion', tag:'risky', align:'lawful', cid:'garrison_contact'},
        {text:"Move without them. Two nodes is better than waiting.", skill:'lore', tag:'bold', align:'chaotic', cid:'report_findings'}
      ]
    }
  },

  // ── DEATH KNIGHT: FALLEN CHAMPION MID-SPINE ───────────
  death_knight_memory:{
    success:{
      text:"You remember more than you thought you did. The enforcement unit's investigation was getting close to a specific name — not Selwyn Coth, not the logistics coordinator. Someone above Coth. Someone with enough institutional standing to authorize the original operation and enough reach to order the unit dissolved when it got close. The name is almost there. You piece it together from what you remember: the document classification level required for the authorization, the specific House Shelk administrative format used, the routing through Guildheart that shouldn't have been necessary. The name resolves.",
      xp:8, effects:[{type:'journal',msg:"Death Knight recovered memory: original authorization required elevated House Shelk classification, specific administrative format, unnecessary Guildheart routing. Points to a specific senior official.",category:'fact',dedupeKey:'dk_recovered_name'},{type:'quest',msg:"Identify the senior official whose authorization signature matches the recovered pattern."},{type:'renown',n:1}],
      next:[
        {text:"Find the authorization document with that signature in the current records.", skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'},
        {text:"Find Selwyn Coth and use what you know about the name above him to pressure him.", skill:'persuasion', tag:'bold', align:'chaotic', cid:'confront_coth'},
        {text:"Take what you've recovered to the Roadwardens. It's enough to reopen the case formally.", skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'}
      ]
    },
    failure:{
      text:"The name almost resolves. You have the shape of it but not the specific. The dissolution of the unit was too long ago and the details have softened in the gap.",
      xp:3, effects:[],
      next:[
        {text:"Find the enforcement unit's original records. If they exist, they'll fill the gap.", skill:'lore', tag:'risky', align:'lawful', cid:'depot_logs'},
        {text:"Work forward from Coth instead of backward from the name. Find him and follow the chain up.", skill:'lore', tag:'safe', align:'neutral', cid:'confront_coth'}
      ]
    }
  },
  death_knight_unbroken:{
    success:{
      text:"They've tried to close this before. Dissolved the unit, issued the pension, sent the message that what you found was over. You didn't stop then because stopping wasn't available to you — you just delayed. The operation is still running the same suppression playbook. The person who ordered the dissolution is still in position. The authorization structure that made all of it possible is still intact. You stopped once. You're not stopping again.",
      xp:7, effects:[{type:'journal',msg:"Death Knight: operation is running the same suppression playbook. The person who ordered the dissolution is still in position. Authorization structure intact. Second investigation begins.",category:'fact',dedupeKey:'dk_second_investigation'},{type:'morality',n:5},{type:'renown',n:1}],
      next:[
        {text:"Hit the authorization structure directly. That's what they're protecting.", skill:'lore', tag:'bold', align:'lawful', cid:'trace_directive'},
        {text:"Find the person who ordered the dissolution. They're the central target.", skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:"Build the evidence base first. This time it needs to be prosecutable.", skill:'lore', tag:'safe', align:'lawful', cid:'study_packet'}
      ]
    },
    failure:{
      text:"You're back in the same position the unit was in — close enough to threaten but not close enough to act. The pressure builds.",
      xp:2, effects:[{type:'damage',n:2}],
      next:[
        {text:"Find the gap in the defense. There's always a gap.", skill:'lore', tag:'risky', align:'neutral', cid:'passive_intel'},
        {text:"Accept the pressure and keep moving. Stopping is worse.", skill:'combat', tag:'bold', align:'chaotic', cid:'east_road'}
      ]
    }
  },

  // ── BEASTMASTER: TRACKER & WILDERNESS READER MID-SPINE ─
  beastmaster_track:{
    success:{
      text:"You follow the movement pattern backward from the waypoint. The stressor — whatever is using the eastern corridor regularly enough to disturb the local fauna — isn't moving randomly. It's moving on a schedule that matches the axis pre-inversion window. Three hours before each inversion, something moves through the corridor. The animals know the schedule because they've adapted to it. Six weeks of adaptation means six weeks of regular use. The operation started approximately six weeks ago.",
      xp:7, effects:[{type:'journal',msg:"Beastmaster track: corridor stressor follows axis pre-inversion schedule. Fauna adapted over 6 weeks. Operation has been running approximately 6 weeks with clock-regular timing.",category:'fact',dedupeKey:'beastmaster_schedule_found'},{type:'quest',msg:"Be at the eastern corridor during the next pre-inversion window."}],
      next:[
        {text:"Be at the corridor during the next window. Three hours before inversion.", skill:'survival', tag:'bold', align:'neutral', cid:'east_road'},
        {text:"Find who has dome-level knowledge of the pre-inversion window timing.", skill:'lore', tag:'risky', align:'neutral', cid:'elementalist_aurora_suspect'},
        {text:"Document the schedule and bring it to the Roadwardens as actionable intelligence.", skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'}
      ]
    },
    failure:{
      text:"The fauna pattern is disrupted — something spooked the local population in the last 48 hours. You can see the disturbance but not the original schedule underneath it.",
      xp:2, effects:[{type:'tick',n:1}],
      next:[
        {text:"Wait for the fauna to resettle and read the pattern again.", skill:'survival', tag:'safe', align:'neutral', cid:'passive_intel'},
        {text:"The disturbance itself is evidence. Find what caused it.", skill:'survival', tag:'bold', align:'neutral', cid:'east_road'}
      ]
    }
  },
  beastmaster_structure:{
    success:{
      text:"The structure you found in the eastern territory is a way station. Not an official one — the construction method is too deliberate to be improvised, but the materials are unregistered and the foundation technique avoids the standard survey markers. Whoever built this knew the survey system well enough to build around it. The structure has been used recently — you can read the biological evidence: disturbed soil patterns, food waste at a level suggesting regular occupation, and a trail in and out that matches heavy-load transit, not foot traffic.",
      xp:8, effects:[{type:'journal',msg:"Eastern way station: deliberate unregistered construction, avoids survey markers. Recent regular occupation — heavy-load transit trail in and out. Built by someone who knows the survey system.",category:'fact',dedupeKey:'beastmaster_waystation_read'},{type:'quest',msg:"Identify who built the unregistered way station and what is being moved through it."},{type:'renown',n:1}],
      next:[
        {text:"Wait at the structure. The heavy-load transit trail means it will be used again.", skill:'stealth', tag:'bold', align:'neutral', cid:'stealth_surveillance'},
        {text:"Find who in the engineering or survey apparatus has the knowledge to build around the markers.", skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin'},
        {text:"Document the structure completely and bring it to the Roadwardens before it's cleared.", skill:'persuasion', tag:'safe', align:'lawful', cid:'report_findings'}
      ]
    },
    failure:{
      text:"The structure has been cleared in the last 24 hours. Thoroughly — you can read the effort that went into removing the evidence. Someone knew you were coming, or knew someone was.",
      xp:3, effects:[{type:'tick',n:1}],
      next:[
        {text:"The clearing itself is evidence. Document what's missing.", skill:'craft', tag:'safe', align:'neutral', cid:'study_packet'},
        {text:"Find who knew to clear it — the warning came from somewhere.", skill:'lore', tag:'risky', align:'neutral', cid:'trace_directive'}
      ]
    }
  }

};