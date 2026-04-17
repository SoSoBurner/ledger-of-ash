(function(){
  const ARCHETYPES = [
    ['warrior','Warrior','combat','Battle-tested discipline','combat'],
    ['knight','Knight','combat','Oath-bound heavy pressure','persuasion'],
    ['ranger','Ranger','combat','Route-wise ranged pursuit','survival'],
    ['paladin','Paladin','combat','Sacred resolve under pressure','lore'],
    ['archer','Archer','combat','Precise distance control','stealth'],
    ['berserker','Berserker','combat','Shock violence and endurance','combat'],
    ['wizard','Wizard','magic','Structured arcane reasoning','lore'],
    ['cleric','Cleric','magic','Doctrine, rites, and recovery','persuasion'],
    ['priest','Priest','magic','Public ritual and faith leverage','persuasion'],
    ['necromancer','Necromancer','magic','Death-lore and forbidden command','lore'],
    ['illusionist','Illusionist','magic','Misdirection and perception control','stealth'],
    ['inquisitor','Inquisitor','magic','Interrogation and doctrinal pressure','persuasion'],
    ['elementalist','Elementalist','magic','Environmental force shaping','craft'],
    ['rogue','Rogue','stealth','Quiet entry and opportunism','stealth'],
    ['assassin','Assassin','stealth','Commitment to decisive elimination','stealth'],
    ['spellthief','Spellthief','stealth','Arcane theft and disruption','lore'],
    ['scout','Scout','stealth','Reconnaissance and evasion','survival'],
    ['thief','Thief','stealth','Urban extraction and leverage','stealth'],
    ['trickster','Trickster','stealth','Social disruption and baiting','persuasion'],
    ['beastmaster','Beastmaster','stealth','Animal reading and field control','survival'],
    ['healer','Healer','support','Body, recovery, and consequence','craft'],
    ['artificer','Artificer','support','Tools, seals, and field devices','craft'],
    ['engineer','Engineer','support','Systems repair and route works','craft'],
    ['tactician','Tactician','support','Formation logic and command','lore'],
    ['alchemist','Alchemist','support','Compounds, antidotes, solvents','craft'],
    ['saint','Saint','support','Mercy, witness, and costly resolve','persuasion'],
    ['warden','Warden','combat','Custody and boundary enforcement','combat'],
    ['warlord','Warlord','combat','Field command and morale pressure','persuasion'],
    ['death_knight','Death Knight','combat','Terrible oath and ruinous force','combat'],
    ['oracle','Oracle','magic','Omens, patterns, and dread certainty','lore'],
    ['bard','Bard','support','Voice, memory, and public sway','persuasion']
  ].map(([id,name,group,desc,focus])=>({id,name,group,desc,focus}));

  const KEY_LOCALITIES = {
    panim_haven: {
      id:'panim_haven', name:'Panim Haven', polity:'Principality of Panim', safeZone:'Memorial Waystation',
      summary:'Afterlife-service metropolis of ledgers, shrines, mediation courts, and memorial traffic.',
      pressures:['memorial backlog','assessment dispute','processional strain','seal tampering'],
      greetings:['soft palm-to-heart acknowledgements','low-voiced condolences at thresholds'],
      rituals:['incense tracing before ledgers','small offerings set beside name-stones'],
      hazards:['ledger_fog','processional_crush'], creatures:['veil_moth','gravewater_hound']
    },
    sunspire_haven: {
      id:'sunspire_haven', name:'Sunspire Haven', polity:'Soreheim Alliance', safeZone:'Convoy Rest Yard',
      summary:'Rural crossroads town under quota, storage, convoy, and syndicate pressure.',
      pressures:['convoy scarcity','quota inspection','warehouse theft','labor stoppage'],
      greetings:['short nods over freight straps','work-first greetings at loading bays'],
      rituals:['coin pressed to beam-wards before departure','route prayers spoken over axle grease'],
      hazards:['ice_rut','supply_fire'], creatures:['pack_raider','frost_scavenger']
    },
    aurora_crown_commune: {
      id:'aurora_crown_commune', name:'Aurora Crown Commune', polity:'Sheresh Communes', safeZone:'Dome Relief Cell',
      summary:'Major dome commune shaped by contamination, rationing, repair, and aurora study.',
      pressures:['filter failure','ration strain','repair backlog','containment rumor'],
      greetings:['gloved forearm taps in sealed halls','measured check-ins at decontam doors'],
      rituals:['mask-touch before entering clean zones','communal lantern checks at shift end'],
      hazards:['glassmire_leak','heat_debt'], creatures:['aurora_leech','dome_lurker']
    },
    shelkopolis: {
      id:'shelkopolis', name:'Shelkopolis', polity:'Principality of Shelk', safeZone:'Roadwarden Annex Ward',
      summary:'Refined civic metropolis of decorum, Roadwardens, shrines, guildwork, and visible noble power.',
      pressures:['roadwarden clampdown','guild rivalry','permit bottleneck','noble spectacle'],
      greetings:['formal hand-bows at crossings','careful honorifics in market lanes'],
      rituals:['small thread offerings at district shrines','public pause during bell prayers'],
      hazards:['stampede_front','ink_fume_break'], creatures:['quay_thief','watch_hound']
    },
    harvest_circle: {
      id:'harvest_circle', name:'Harvest Circle', polity:'Soreheim Alliance', safeZone:'Threshing Shelter',
      summary:'Rural production settlement where storage, contracts, and overseers define the day.',
      pressures:['grain custody','tool scarcity','tenant dispute','wagon requisition'],
      greetings:['work-call greetings across fields','brief hat-lifts at tally boards'],
      rituals:['first-sheaf blessings','shared bread set on communal posts'],
      hazards:['thresher_break','dust_choke'], creatures:['field_maw','granary_ratking']
    },
    glasswake_commune: {
      id:'glasswake_commune', name:'Glasswake Commune', polity:'Sheresh Communes', safeZone:'Research Quarantine Nook',
      summary:'Research-leaning commune of sealed corridors, shardlight, and careful contamination protocol.',
      pressures:['study embargo','sample breach','escort shortage','shardlight outage'],
      greetings:['measured visor nods','numbered shift calls through filtered masks'],
      rituals:['sample blessing at lit braziers','contamination check hymns'],
      hazards:['shardflare','coolant_burst'], creatures:['glasswake_mite','choir_lurker']
    },
    fairhaven: {
      id:'fairhaven', name:'Fairhaven', polity:'Principality of Shelk', safeZone:'Market Chapel Cellar',
      summary:'Trade-facing node where permits, gossip, carriage flow, and subtle status games dominate.',
      pressures:['toll surge','permit checks','stall dispute','escort scarcity'],
      greetings:['brisk courtesy between stalls','calculated warmth toward known buyers'],
      rituals:['coin-kiss to market saints','lamp-trim at threshold shrines'],
      hazards:['market_surge','oil_slick_break'], creatures:['stall_raider','bridge_skulk']
    },
    mimolot_academy: {
      id:'mimolot_academy', name:'Mimolot Academy', polity:'Principality of Mimolot', safeZone:'Archive Convalescence Alcove',
      summary:'Scholastic city-space of archives, experiments, and carefully ranked instruction.',
      pressures:['archive lock','faculty feud','lab breach','student unrest'],
      greetings:['rank-conscious academic bows','quiet citation-first acknowledgements'],
      rituals:['ink-touch before lecture','candle rites in memory halls'],
      hazards:['lab_surge','archive_collapse'], creatures:['ink_wisp','catalog_biter']
    },
    soreheim_proper: {
      id:'soreheim_proper', name:'Soreheim Proper', polity:'Soreheim Alliance', safeZone:'Forge Rest Gallery',
      summary:'Tower-industrial heartland of giant-scale production, lifts, quotas, and heat.',
      pressures:['lift stoppage','alloy shortage','quota panic','foreman intrigue'],
      greetings:['work-signs over furnace roar','short formal acknowledgements on catwalks'],
      rituals:['spark-offerings at forge altars','hammer taps before shift bells'],
      hazards:['quench_burst','lift_shear'], creatures:['slag_hound','quarry_coloss']
    },
    shirshal: {
      id:'shirshal', name:'Shirshal', polity:'Principality of Shirsh', safeZone:'Witness Court Side Hall',
      summary:'Investigative and procedural center where witness handling and public order intertwine.',
      pressures:['witness backlog','seal dispute','custody delay','court scrutiny'],
      greetings:['measured witness greetings','formal truth-invocations at doors'],
      rituals:['water-touch before testimony','quiet oath phrases in queue'],
      hazards:['seal_feedback','crowd_break'], creatures:['court_leech','record_hunter']
    },
    ithtananalor: {
      id:'ithtananalor', name:'Ithtananalor', polity:'Principality of Roaz', safeZone:'Enforcement Checkpoint Ward',
      summary:'Fortified administrative heart where legal identity, industry, and enforcement culture visibly merge.',
      pressures:['illicit magic detection','smuggling routes','enforcement accountability','inspection intensity'],
      greetings:['brief formal acknowledgements at checkpoints','work-ready nods between guards'],
      rituals:['document verification before entry','seal inspection at gates'],
      hazards:['enforcement_raid','containment_breach'], creatures:['ore_hound','guard_construct']
    },
    guildheart_hub: {
      id:'guildheart_hub', name:'Guildheart Hub', polity:'The Union', safeZone:'Guild Hall Archive Chamber',
      summary:'Dense industrial nerve center of the Union where contract legitimacy, tariff politics, and freight administration dominate.',
      pressures:['tariff disputes','Red Hood rumor presence','legacy Mal claims','imperial oversight'],
      greetings:['merchant queue courtesies','cargo manifest discussions'],
      rituals:['sanction notice reading','contract seal verification'],
      hazards:['warehouse_collapse','fire_break'], creatures:['guild_enforcer','contract_bound']
    },
    cosmoria: {
      id:'cosmoria', name:'Cosmoria', polity:'House Cosmouth', safeZone:'Maritime Archive Hall',
      summary:'Floating intellectual and shipwright metropolis where archives, scholarship, and maritime trade interweave.',
      pressures:['storm weather','trade vulnerability','archive access disputes','cargo timing'],
      greetings:['sea-blessed nods between mariners','scholarly courtesy at archival doors'],
      rituals:['maritime blessing before passage','archive respect protocols'],
      hazards:['storm_surge','deck_collapse'], creatures:['sea_leech','floating_scavenger']
    }
  };

  const LOCALITY_IDS = Object.keys(KEY_LOCALITIES);

  const STAGES = [
    {id:1,label:'Stage I — Grass Roots',levelMin:1,levelMax:4},
    {id:2,label:'Stage II — Adjacent Inter-Polity',levelMin:5,levelMax:8},
    {id:3,label:'Stage III — Wider World',levelMin:9,levelMax:12},
    {id:4,label:'Stage IV — Legendary Impact',levelMin:13,levelMax:16},
    {id:5,label:'Stage V — Paragon / Axis',levelMin:17,levelMax:20}
  ];

  const FAMILY_TITLES = {
    convoy:'Convoy Custody Spiral',
    memorial:'Memorial Ledger Fracture',
    contamination:'Containment Breach Chain',
    guild:'Guild Pressure Machine',
    archive:'Archive Exposure Spiral',
    forge:'Forge Quota Break',
    witness:'Witness Court Rupture',
    shrine:'Shrine Authority Contest'
  };

  const ROUTE_NAMES = {
    memorial_road:'Memorial Road',
    convoy_lane:'Convoy Lane',
    domeway:'Domeway',
    guild_road:'Guild Road',
    archive_walk:'Archive Walk',
    forge_lift:'Forge Lift',
    witness_lane:'Witness Lane',
    shrine_path:'Shrine Path'
  };

  const ADJACENCY = {
    panim_haven:['shelkopolis','shirshal','fairhaven'],
    sunspire_haven:['harvest_circle','soreheim_proper','fairhaven'],
    aurora_crown_commune:['glasswake_commune','sunspire_haven'],
    shelkopolis:['fairhaven','panim_haven','shirshal'],
    harvest_circle:['sunspire_haven','soreheim_proper'],
    glasswake_commune:['aurora_crown_commune','sunspire_haven'],
    fairhaven:['shelkopolis','sunspire_haven','panim_haven'],
    mimolot_academy:['fairhaven','shirshal'],
    soreheim_proper:['harvest_circle','sunspire_haven'],
    shirshal:['panim_haven','shelkopolis','mimolot_academy'],
    ithtananalor:['shelkopolis','shirshal'],
    guildheart_hub:['fairhaven','shirshal'],
    cosmoria:['guildheart_hub','fairhaven']
  };

  const NPC_PLACEMENTS = {
    panim_haven:[{id:'teller_vara_senn',office:'Memorial Counter',role:'ledger clerk'},{id:'mournkeeper_els',office:'River Shrine',role:'ritual attendant'}],
    sunspire_haven:[{id:'dockman_hedric',office:'Convoy Yard',role:'yard foreman'},{id:'ledger_broker_iont',office:'Storage Row',role:'quota broker'}],
    aurora_crown_commune:[{id:'commune_marshal_sere',office:'Filter Gate',role:'containment marshal'}],
    shelkopolis:[{id:'neren_rimebridge',office:'Roadwarden Office',role:'roadwarden'}],
    harvest_circle:[{id:'jorva_helmrune',office:'Harvest Circle granary ledgers',role:'field quartermaster'}],
    glasswake_commune:[{id:'toman_iceveil',office:'Glasswake commune study wing',role:'researcher'}],
    fairhaven:[{id:'steward_mel',office:'Market Permit Hall',role:'permit steward'}],
    mimolot_academy:[{id:'scribe_tel',office:'Lower Archive',role:'catalog scribe'}],
    soreheim_proper:[{id:'foreman_bras',office:'Lift Quarter',role:'foreman'}],
    shirshal:[{id:'witness_clerk_anrel',office:'Witness Court',role:'clerk'}],
    ithtananalor:[{id:'captain_darian_roaz',office:'Enforcement Headquarters',role:'enforcement captain'},{id:'sir_velden_ironspike',office:'Iron Accord Hall',role:'knight inspector'}],
    guildheart_hub:[{id:'auditor_kelm',office:'Guild Sanction Board',role:'trade auditor'}],
    cosmoria:[{id:'archivist_tel',office:'Grand Archive',role:'senior archivist'},{id:'captain_harrow',office:'Shipwright Dock',role:'ship captain'}]
  };

  const COMPANION_CANDIDATES = {
    panim_haven:{id:'mourning_mediator',name:'Mourning Mediator',bonus:'persuasion'},
    sunspire_haven:{id:'route_hauler',name:'Route Hauler',bonus:'survival'},
    aurora_crown_commune:{id:'filter_keeper',name:'Filter Keeper',bonus:'craft'},
    shelkopolis:{id:'roadwarden_defector',name:'Roadwarden Defector',bonus:'combat'},
    harvest_circle:{id:'field_tallyhand',name:'Field Tallyhand',bonus:'craft'},
    glasswake_commune:{id:'shard_tech',name:'Shard Technician',bonus:'lore'},
    fairhaven:{id:'market_runner',name:'Market Runner',bonus:'stealth'},
    mimolot_academy:{id:'archive_adjunct',name:'Archive Adjunct',bonus:'lore'},
    soreheim_proper:{id:'catwalk_guide',name:'Catwalk Guide',bonus:'combat'},
    shirshal:{id:'witness_guard',name:'Witness Guard',bonus:'persuasion'},
    ithtananalor:{id:'enforcement_scout',name:'Enforcement Scout',bonus:'combat'},
    guildheart_hub:{id:'merchant_broker',name:'Merchant Broker',bonus:'persuasion'},
    cosmoria:{id:'shipwright_hand',name:'Shipwright Hand',bonus:'craft'}
  };

  const BESTIARY = {
    veil_moth:{hp:10,attack:3,text:'Pale wings gather around the memorial smoke.',weakness:'light'},
    gravewater_hound:{hp:14,attack:4,text:'A wet-jawed scavenger hugs the processional edge.',weakness:'noise'},
    pack_raider:{hp:12,attack:4,text:'Lean figures break from freight shadows.',weakness:'formation'},
    frost_scavenger:{hp:13,attack:5,text:'A cold-gnawed beast tests the line.',weakness:'heat'},
    aurora_leech:{hp:12,attack:4,text:'A shimmering parasite clings to cracked seals.',weakness:'salt'},
    dome_lurker:{hp:16,attack:5,text:'Something patient works the dark between support ribs.',weakness:'exposure'},
    quay_thief:{hp:11,attack:4,text:'A quick-handed alley predator commits too far.',weakness:'balance'},
    watch_hound:{hp:15,attack:5,text:'A trained hound locks onto the first weak line.',weakness:'command'},
    field_maw:{hp:13,attack:4,text:'A low predator cuts through crop lanes.',weakness:'distance'},
    granary_ratking:{hp:16,attack:5,text:'A knot of vermin moves with one ugly purpose.',weakness:'fire'},
    glasswake_mite:{hp:11,attack:4,text:'Shard-fed mites skitter through failed seams.',weakness:'cold'},
    choir_lurker:{hp:17,attack:6,text:'A shape waits beneath the hymn of machinery.',weakness:'cadence'},
    stall_raider:{hp:12,attack:4,text:'A market predator thinks this lane is soft.',weakness:'crowd'},
    bridge_skulk:{hp:14,attack:5,text:'A bridge-side shadow breaks cover too late.',weakness:'height'},
    ink_wisp:{hp:10,attack:4,text:'A living blot twists between archive lamps.',weakness:'breath'},
    catalog_biter:{hp:13,attack:5,text:'A gnawing nuisance with too much memory.',weakness:'binding'},
    slag_hound:{hp:15,attack:5,text:'A furnace-scored beast lunges through the heat.',weakness:'quench'},
    quarry_coloss:{hp:20,attack:6,text:'A massive labor-haunt turns its bulk into a threat.',weakness:'joints'},
    court_leech:{hp:12,attack:4,text:'A whisper-fed parasite blooms under false testimony.',weakness:'truth'},
    record_hunter:{hp:15,attack:5,text:'A procedural predator tears after sealed knowledge.',weakness:'paper'},
    ore_hound:{hp:16,attack:5,text:'An extraction beast wreathed in stone dust and rage.',weakness:'impact'},
    guard_construct:{hp:18,attack:6,text:'An enforcer-built construct moves with mechanical purpose.',weakness:'disruption'},
    guild_enforcer:{hp:14,attack:5,text:'A tariff collector turned predator guards the shipment.',weakness:'witness'},
    contract_bound:{hp:12,attack:4,text:'A creature enslaved by Guild seals struggles in binding.',weakness:'seal_breaking'},
    sea_leech:{hp:13,attack:4,text:'A brine-bloated parasite clings to floating wood.',weakness:'fresh_water'},
    floating_scavenger:{hp:15,attack:5,text:'A storm-born predator circles the floating platforms.',weakness:'grounding'}
  };

  const HAZARDS = {
    ledger_fog:{severity:2,text:'Sweet incense smoke thickens into a blinding ledger haze.',weakness:'airflow'},
    processional_crush:{severity:2,text:'Bodies and biers turn one lane into a compression wall.',weakness:'order'},
    ice_rut:{severity:2,text:'Frozen axle scars threaten to flip the line.',weakness:'timing'},
    supply_fire:{severity:3,text:'A freight fire jumps crate to crate.',weakness:'sand'},
    glassmire_leak:{severity:3,text:'Contamination seeps through cracked seams.',weakness:'seal'},
    heat_debt:{severity:2,text:'The dome bleeds heat into the wrong channels.',weakness:'valves'},
    stampede_front:{severity:2,text:'A sudden civic rush breaks lane discipline.',weakness:'command'},
    ink_fume_break:{severity:2,text:'A black chemical bite creeps through the air.',weakness:'cloth'},
    thresher_break:{severity:2,text:'A labor machine bites loose from safe rhythm.',weakness:'brace'},
    dust_choke:{severity:2,text:'Storage dust turns breath into rationed effort.',weakness:'cover'},
    shardflare:{severity:3,text:'Glasswake light blooms into cutting brilliance.',weakness:'shade'},
    coolant_burst:{severity:2,text:'A line ruptures and burns cold.',weakness:'clamp'},
    market_surge:{severity:2,text:'A packed lane becomes dangerous all at once.',weakness:'routing'},
    oil_slick_break:{severity:2,text:'Lamp oil turns stone into a trap.',weakness:'grit'},
    lab_surge:{severity:3,text:'Arcane pressure folds the room into danger.',weakness:'grounding'},
    archive_collapse:{severity:2,text:'Shelving and knowledge begin to fall together.',weakness:'supports'},
    quench_burst:{severity:3,text:'Steam and slag erupt where the line should hold.',weakness:'distance'},
    lift_shear:{severity:3,text:'A vertical line threatens to tear itself apart.',weakness:'load'},
    seal_feedback:{severity:2,text:'Court seals begin arguing with each other.',weakness:'sequence'},
    crowd_break:{severity:2,text:'Civic pressure outruns the room meant to hold it.',weakness:'space'},
    enforcement_raid:{severity:3,text:'Roazian enforcement sweeps through with checkpoints and seizures.',weakness:'anonymity'},
    containment_breach:{severity:3,text:'Sealed systems give way and something escapes.',weakness:'procedure'},
    warehouse_collapse:{severity:3,text:'Stacked crates and tariffs come down all at once.',weakness:'bracing'},
    fire_break:{severity:3,text:'A trade-house fire spreads through dense wooden blocks.',weakness:'water'},
    storm_surge:{severity:3,text:'Sea weather threatens floating structures.',weakness:'ballast'},
    deck_collapse:{severity:2,text:'Floating platforms strain under storm and cargo weight.',weakness:'reinforcement'}
  };

  const STAGE_FAMILIES = {
    stage2:['convoy','memorial','contamination','guild','archive','forge','witness','shrine'],
    stage3:['convoy','memorial','contamination','guild','archive','forge','witness','shrine'],
    stage4:['convoy','memorial','contamination','guild','archive','forge','witness','shrine'],
    stage5:['convoy','memorial','contamination','guild','archive','forge','witness','shrine']
  };

  const FAMILY_OBJECTIVES = {
    convoy:{title:'Convoy Custody Spiral',stage2:'Decide who owns the lane under pressure.',stage3:'Break the convoy spiral before rival hands set the price.',stage4:'Turn convoy control into public leverage.',stage5:'Choose whether the great transit lines break, bend, or survive.'},
    memorial:{title:'Memorial Ledger Fracture',stage2:'Find what the road is hiding from the ledgers.',stage3:'Expose or redirect the fracture between memory and custody.',stage4:'Force a reckoning between death administration and power.',stage5:'Decide what the dead are allowed to mean at world scale.'},
    contamination:{title:'Containment Breach Chain',stage2:'Learn what crossed the safe boundary.',stage3:'Stop the breach chain before it becomes the region’s habit.',stage4:'Choose who controls survival truth.',stage5:'Determine whether containment becomes doctrine, lie, or sacrifice.'},
    guild:{title:'Guild Pressure Machine',stage2:'Identify the hand on the civic machine.',stage3:'Break the machine or claim it.',stage4:'Turn civic economy into legend-scale leverage.',stage5:'Choose whether craft power is captured, exposed, or remade.'},
    archive:{title:'Archive Exposure Spiral',stage2:'Reach the records that should not be moving.',stage3:'Use the archive spiral before it uses you.',stage4:'Make knowledge itself a weapon or sanctuary.',stage5:'Decide what truths survive the endgame.'},
    forge:{title:'Forge Quota Break',stage2:'Trace where production pressure becomes violence.',stage3:'Break or redirect the quota engine.',stage4:'Turn industrial scale into world impact.',stage5:'Decide what the works are ultimately for.'},
    witness:{title:'Witness Court Rupture',stage2:'Protect or exploit what the court cannot absorb.',stage3:'Turn witness fracture into advantage before rivals do.',stage4:'Force procedure to answer to legend.',stage5:'Choose whether truth survives power.'},
    shrine:{title:'Shrine Authority Contest',stage2:'Find which devotion is being used as a lever.',stage3:'Unseat or bind the contested shrine network.',stage4:'Turn faith surface into regional consequence.',stage5:'Choose what devotion is allowed to rule.'}
  };


  const ROUTE_ATLAS = {
    memorial_road:{style:'solemn procession route', risk:'custody strain', note:'Traffic, grief, and ritual obligation collide here.'},
    convoy_lane:{style:'freight and escort lane', risk:'theft and quota pressure', note:'Ownership of movement is always being tested.'},
    domeway:{style:'sealed commune connector', risk:'containment instability', note:'Safety depends on disciplined procedure.'},
    guild_road:{style:'civic market artery', risk:'permit choke points', note:'Influence shows up as who gets to move first.'},
    archive_walk:{style:'records and witness corridor', risk:'exposure and seizure', note:'The route remembers what should not travel openly.'},
    forge_lift:{style:'industrial vertical transit', risk:'lift shear and quota panic', note:'Scale itself becomes a hazard.'},
    witness_lane:{style:'court and testimony approach', risk:'seal conflict', note:'Procedure fails loudly when it fails at all.'},
    shrine_path:{style:'ritual and devotion path', risk:'faith contests and crowd pressure', note:'Every pause carries public meaning.'}
  };

  const RESCUE_PROFILES = {
    panim_haven:{rescuer:'memorial attendants and a ledger runner', aftermath:'A delayed processional and offended clerks make the cost visible.', safeZone:'Memorial Waystation'},
    sunspire_haven:{rescuer:'convoy hands dragging the line clear', aftermath:'Freight is lost and somebody now wants repayment.', safeZone:'Convoy Rest Yard'},
    aurora_crown_commune:{rescuer:'filter crews in sealed gear', aftermath:'Recovery burns scarce clean-room time and trust.', safeZone:'Dome Relief Cell'},
    shelkopolis:{rescuer:'Roadwarden annex orderlies', aftermath:'The rescue creates an official record and a new scrutiny burden.', safeZone:'Roadwarden Annex Ward'},
    harvest_circle:{rescuer:'field crews and tallyhands', aftermath:'The rescue costs labor, reputation, and daylight.', safeZone:'Threshing Shelter'},
    glasswake_commune:{rescuer:'quarantine ward technicians', aftermath:'Containment protocol tightens around everyone involved.', safeZone:'Research Quarantine Nook'},
    fairhaven:{rescuer:'stallholders and chapel volunteers', aftermath:'Market rumor outruns the facts almost immediately.', safeZone:'Market Chapel Cellar'},
    mimolot_academy:{rescuer:'archive adjutants and lamp-bearers', aftermath:'Access changes while faculty decide who is to blame.', safeZone:'Archive Convalescence Alcove'},
    soreheim_proper:{rescuer:'lift crews and forge wardens', aftermath:'Production time is lost and the ledger of fault stays open.', safeZone:'Forge Rest Gallery'},
    shirshal:{rescuer:'witness guards and side-hall clerks', aftermath:'A formal account is demanded before anything moves again.', safeZone:'Witness Court Side Hall'}
  };

  const STAGE2_FAMILY_CONTENT = {
    memorial_road:[
      {label:'Compare memorial tallies against road custody marks', mode:'records', skill:'lore', success:'The memorial road stops agreeing with its own record of the dead.', fail:'The custody line notices the inquiry and begins closing ranks.'},
      {label:'Follow a quiet processional break to its real keeper', mode:'person', skill:'persuasion', success:'A keeper on the edge of grief gives up the real chain of handling.', fail:'The wrong mourner is pressured and the lane hardens.'},
      {label:'Read the route itself for missing ritual traces', mode:'route', skill:'survival', success:'The road shows what the ledgers tried to bury.', fail:'The route consumes time and offers only suspicion.'}
    ],
    convoy_lane:[
      {label:'Work the freight line for mismatched cargo claims', mode:'records', skill:'craft', success:'The convoy books reveal two owners for one moving truth.', fail:'The freight masters tighten access before the answer is usable.'},
      {label:'Lean on a hauler who knows which wagons never get checked', mode:'person', skill:'persuasion', success:'A tired hauler points at the real pressure point in the convoy.', fail:'Word runs ahead and the line re-forms.'},
      {label:'Scout wheel ruts and axle breaks beyond the checkpoint', mode:'route', skill:'survival', success:'The lane itself admits where pressure turned into violence.', fail:'The trail fragments and the rival line gains ground.'}
    ],
    domeway:[
      {label:'Check decontam records against what the domeway physically shows', mode:'records', skill:'lore', success:'Procedure and physical truth split wide enough to matter.', fail:'The archive shutters before the contradiction can be fixed in place.'},
      {label:'Read failed seals and maintenance patchwork in sequence', mode:'place', skill:'craft', success:'The domeway tells a cleaner story than the officials do.', fail:'The inspection is noticed and the safe route narrows.'},
      {label:'Use commune rumor to find where the clean boundary first failed', mode:'person', skill:'persuasion', success:'A worker finally names the place nobody wants blamed.', fail:'Fear outruns candor and the answer slips away.'}
    ],
    guild_road:[
      {label:'Trace permits, toll stamps, and missing signatures together', mode:'records', skill:'lore', success:'The civic machine exposes the hand that keeps profiting from friction.', fail:'The paperwork is re-sorted before the chain can be proved.'},
      {label:'Pressure a lesser broker who cannot afford public notice', mode:'person', skill:'persuasion', success:'The broker folds and hands over the real channel of pressure.', fail:'The broker survives long enough to warn the line.'},
      {label:'Watch which lane gets cleared first when traffic spikes', mode:'place', skill:'stealth', success:'Priority itself becomes the evidence.', fail:'The watchers notice the pattern of attention.'}
    ],
    archive_walk:[
      {label:'Rebuild the order of sealed transfers from scattered scraps', mode:'records', skill:'lore', success:'A hidden archive flow becomes visible enough to act on.', fail:'The fragments point in too many directions and time is lost.'},
      {label:'Shadow the runner who never carries the same case twice', mode:'stealth', skill:'stealth', success:'The route to the truth opens behind a practiced routine.', fail:'The tail is spotted and the route deadens.'},
      {label:'Use witness language to make a clerk choose accuracy over safety', mode:'person', skill:'persuasion', success:'A clerk chooses the dangerous truth.', fail:'Procedure wins and the account locks down.'}
    ],
    forge_lift:[
      {label:'Read the production choke point where quota became injury', mode:'place', skill:'craft', success:'The works show exactly where strain was converted into harm.', fail:'Noise and heat hide the usable pattern.'},
      {label:'Push a foreman to explain a line nobody wants inspected', mode:'person', skill:'combat', success:'Fear of failure outruns discipline and the answer slips loose.', fail:'The foreman rallies the line and shuts the gap.'},
      {label:'Track lift rhythm and stoppage timing from the catwalks', mode:'route', skill:'survival', success:'The lift schedule betrays the hidden arrangement.', fail:'The pattern is almost there, but not enough to prove.'}
    ],
    witness_lane:[
      {label:'Compare testimony order to seal order and find the break', mode:'records', skill:'lore', success:'The court’s own process reveals where truth was diverted.', fail:'The seals reassert themselves before the contradiction can spread.'},
      {label:'Work the waiting line for the person who is too frightened to leave', mode:'person', skill:'persuasion', success:'A witness chooses survival through truth.', fail:'Fear wins and the line goes silent.'},
      {label:'Watch which side hall receives the unmarked traffic', mode:'place', skill:'stealth', success:'The hidden lane is no longer hidden.', fail:'The court notices the pattern of attention.'}
    ],
    shrine_path:[
      {label:'Read offerings, ash, and foot traffic where devotion is being steered', mode:'place', skill:'lore', success:'The path shows which faith surface is being used as leverage.', fail:'Piety and theater blur together and the reading stays partial.'},
      {label:'Press a devotee whose ritual duty keeps crossing politics', mode:'person', skill:'persuasion', success:'Devotion gives up the practical truth beneath it.', fail:'Reverence closes the mouth before the truth comes clear.'},
      {label:'Use ritual sequence to expose a forged sacred claim', mode:'ritual', skill:'craft', success:'The false sanctity tears in public.', fail:'The rite holds long enough to keep the lie useful.'}
    ]
  };

  const FAMILY_EDGE_REWARDS = {
    convoy:{stage3:{label:'Route-Cutter Instinct',action:'route',bonus:2},stage4:{label:'Escort Command',action:'protect',bonus:2},stage5:{label:'Transit Dominion',action:'command',bonus:3}},
    memorial:{stage3:{label:'Ledger Scent',action:'records',bonus:2},stage4:{label:'Rite Override',action:'ritual',bonus:2},stage5:{label:'Death-Custody Authority',action:'contain',bonus:3}},
    contamination:{stage3:{label:'Leak Reading',action:'place',bonus:2},stage4:{label:'Seal Discipline',action:'contain',bonus:2},stage5:{label:'Containment Mastery',action:'redirect',bonus:3}},
    guild:{stage3:{label:'Permit Pressure',action:'person',bonus:2},stage4:{label:'Machine Intimidation',action:'force',bonus:2},stage5:{label:'Civic Override',action:'command',bonus:3}},
    archive:{stage3:{label:'Scrap Collation',action:'records',bonus:2},stage4:{label:'Witness Threading',action:'stealth',bonus:2},stage5:{label:'Truth Seizure',action:'exploit',bonus:3}},
    forge:{stage3:{label:'Quota Reading',action:'place',bonus:2},stage4:{label:'Linebreak Violence',action:'force',bonus:2},stage5:{label:'Industrial Supremacy',action:'attack',bonus:3}},
    witness:{stage3:{label:'Seal Sequence',action:'records',bonus:2},stage4:{label:'Court Pressure',action:'person',bonus:2},stage5:{label:'Verdict Command',action:'command',bonus:3}},
    shrine:{stage3:{label:'Ash Patterning',action:'ritual',bonus:2},stage4:{label:'Devotional Sway',action:'person',bonus:2},stage5:{label:'Sanctified Control',action:'protect',bonus:3}}
  };



  const SETTLEMENT_POIS = {
    panim_haven:{
      recovery:{name:'Rite-Surge Hospice',text:'Clerks of grief and recovery steady the living after the dead have been counted.'},
      equipment:{name:'Ash Ledger Outfitters',text:'Satchels, banding cloth, seal tools, quiet blades, and memorial road harness.'},
      info:{name:'Memorial Counter',text:'The counter hears what the ledgers refuse to say in public.'},
      progression:{name:'Mediator Hall',text:'Technique, oath-work, warding, and public bearing are refined here.'},
      flavor:{name:'Lantern Court',text:'Slow processions and low-voiced rites shape the district mood.'},
      secret:{name:'Undertally Cellar',text:'A hidden cellar where names, ash, and obligation stop matching.'}
    },
    sunspire_haven:{
      recovery:{name:'Convoy Rest Yard',text:'Warm broth, axle heat, and practical hands hold damaged people together.'},
      equipment:{name:'Strap and Spur',text:'Travel tools, bows, shields, freight knives, weather gear, and climbing kit.'},
      info:{name:'Storage Row Tallyhouse',text:'Numbers reveal what haulers will not admit in daylight.'},
      progression:{name:'Route Drill Ring',text:'Escort drills, scouting lines, and survival craft are sharpened here.'},
      flavor:{name:'Loading Green',text:'Freight songs and shouted timings turn work into rhythm.'},
      secret:{name:'Cold Axle Shed',text:'A hidden yard where seized goods vanish between manifests.'}
    },
    aurora_crown_commune:{
      recovery:{name:'Dome Relief Cell',text:'Filtered air, decontam routines, and rationed warmth restore the shaken.'},
      equipment:{name:'Sealworks Cage',text:'Mask seals, insulated gloves, reagent canisters, and salvage tools are traded here.'},
      info:{name:'Repair Desk 4',text:'Maintenance records say more than official reassurance ever does.'},
      progression:{name:'Filter Hall',text:'Containment drills, shard-reading, and ward procedures are practiced here.'},
      flavor:{name:'Common Lantern Walk',text:'Shift bells and shared mask-checks keep ordinary life moving.'},
      secret:{name:'Bypass Sluice',text:'A forbidden service cut where safe routes and dead routes nearly touch.'}
    },
    shelkopolis:{
      recovery:{name:'Roadwarden Annex Ward',text:'A formal ward where rest comes with questions and written record.'},
      equipment:{name:'Ribbon and Steel',text:'Refined armor, civic sidearms, discreet tools, seal cord, and officer-grade travel gear.'},
      info:{name:'Permit Hall',text:'Every denial, delay, and signature carries a trace of the real pressure.'},
      progression:{name:'Roadwarden Yard',text:'Shield lines, command voice, formal dueling steps, and pursuit drills are refined here.'},
      flavor:{name:'Bell Silk Square',text:'Shrine bells and calculated courtesies make status visible without a raised voice.'},
      secret:{name:'Inkkeeper Vault Stair',text:'A hidden stair where confiscated papers are copied before vanishing.'}
    },
    harvest_circle:{
      recovery:{name:'Threshing Shelter',text:'Work-worn hands keep the injured moving long enough to matter.'},
      equipment:{name:'Granary Smithy',text:'Polearms, repair spikes, slings, grain hooks, and field leathers.'},
      info:{name:'Granary Ledgers',text:'Stored weight and missing weight rarely tell the same story twice.'},
      progression:{name:'Harvest Post Ring',text:'Bow drills, watch rotations, and field survival lessons run here.'},
      flavor:{name:'Shared Table Lane',text:'Bread, dust, and practical talk settle over dusk meals.'},
      secret:{name:'Buried Silo Mouth',text:'An old storage mouth where vanished tallies still have teeth.'}
    },
    glasswake_commune:{
      recovery:{name:'Research Quarantine Nook',text:'Recovery here tastes of metal, incense, and cautious measurement.'},
      equipment:{name:'Shard Cabinet',text:'Focus glass, ward clips, insulated wraps, and sample kits line the cabinets.'},
      info:{name:'Study Wing Index',text:'Research order and omission reveal more than the public summaries.'},
      progression:{name:'Sample Hall',text:'Spellcraft discipline, containment timing, and artifact procedure are refined here.'},
      flavor:{name:'Lantern Gallery',text:'Muted hymns drift between lit chambers and sealed doors.'},
      secret:{name:'Discard Channel',text:'A hidden disposal line where the commune’s worst secrets still glitter.'}
    },
    fairhaven:{
      recovery:{name:'Market Chapel Cellar',text:'Crowd-worn helpers and quiet prayers steady those pulled from the lane.'},
      equipment:{name:'Stallwright Row',text:'Compact armor, thief tools, travel wraps, bows, dyes, and merchant-grade concealment gear.'},
      info:{name:'Permit Hall Annex',text:'One clerk with the right fear can reorder a whole market truth.'},
      progression:{name:'Bridge Yard',text:'Footwork, crowd-reading, escape lines, and pick discipline are sharpened here.'},
      flavor:{name:'Lamp Market',text:'Coin-kissed rituals and bargaining voices hold the square together.'},
      secret:{name:'Tally Drain',text:'A narrow route under the market where stolen traffic moves unseen.'}
    },
    mimolot_academy:{
      recovery:{name:'Archive Convalescence Alcove',text:'A scholarly recovery space lined with blankets, candles, and quiet supervision.'},
      equipment:{name:'Scholarium Stores',text:'Scroll cases, inks, foci, reagents, reference chains, and field satchels.'},
      info:{name:'Lower Archive',text:'Catalog order is truth until someone changes what survives indexing.'},
      progression:{name:'Lecture Court',text:'Ritual control, ward layering, rhetoric, and tactical theory are refined here.'},
      flavor:{name:'Ink Lantern Hall',text:'Citations drift through the air as naturally as greetings.'},
      secret:{name:'Restricted Stack Nine',text:'A chained archive spine that remembers people more than subjects.'}
    },
    soreheim_proper:{
      recovery:{name:'Forge Rest Gallery',text:'Rest arrives through heat, mineral broth, and hard supervision.'},
      equipment:{name:'Lift Quarter Armory',text:'Heavy shields, chain, striking tools, rigging, and industrial field gear.'},
      info:{name:'Quota Board Office',text:'The boards tell you where violence begins long before anyone confesses it.'},
      progression:{name:'Catwalk Ring',text:'Guard posture, intercept timing, reach control, and line endurance are forged here.'},
      flavor:{name:'Hammer Gallery',text:'Shift bells and spark offerings turn labor into public ritual.'},
      secret:{name:'Spent Quench Shaft',text:'A forgotten shaft where broken quotas become hidden disposal.'}
    },
    shirshal:{
      recovery:{name:'Witness Court Side Hall',text:'Recovery here feels procedural, supervised, and impossible to keep private.'},
      equipment:{name:'Sealwright Stall',text:'Bindings, cloaks, witness tags, stilettos, quiet kits, and court-safe tools.'},
      info:{name:'Witness Queue Desk',text:'Order of testimony exposes power when read correctly.'},
      progression:{name:'Procedure Yard',text:'Questioning craft, patience, route reading, and controlled force are drilled here.'},
      flavor:{name:'Oath Fountain Walk',text:'Measured greetings and water-touch rituals make emotion visible without chaos.'},
      secret:{name:'Broken Seal Archive',text:'A side repository where invalid truth is stored instead of destroyed.'}
    }
  };

  const ARCHETYPE_GROUP_SIGNALS = {
    combat:{primary:'Stance',secondary:'Guard',tertiary:'Armor Readiness'},
    magic:{primary:'Arcana',secondary:'Ward',tertiary:'Reagents'},
    stealth:{primary:'Concealment',secondary:'Suspicion',tertiary:'Tools'},
    support:{primary:'Kits',secondary:'Resolve',tertiary:'Coordination'}
  };

  const STARTING_LOADOUT_BY_GROUP = {
    combat:['worn weapon','field armor','travel shield'],
    magic:['focus implement','ward chalk','reagent satchel'],
    stealth:['concealed blade','soft boots','entry tools'],
    support:['med kit','utility satchel','field ledger']
  };



const LOCALITY_LINEAGES = {
  panim_haven:['Human','Ashbound','River-Touched'],
  sunspire_haven:['Human','Hillfolk','Road-Blooded'],
  aurora_crown_commune:['Human','Commune-Born','Shard-Touched'],
  shelkopolis:['Human','Silk-City Born','Roadborn'],
  harvest_circle:['Human','Fieldfolk','Cart-Wright Kin'],
  glasswake_commune:['Human','Glasswake Born','Lantern-Blooded'],
  fairhaven:['Human','Bridgefolk','Market-Born'],
  mimolot_academy:['Human','Scholarium-Born','Ink-Blooded'],
  soreheim_proper:['Human','Towerfolk','Forge-Blooded'],
  shirshal:['Human','Courtfolk','Witness-Blooded']
};

const SERVICE_ITEM_POOLS = {
  combat:[
    {id:'shield_strap',name:'Shield Strap',slot:'offhand',cost:7,bonus:{guard:1,protect:1},text:'A reinforced grip that keeps the shield where it belongs.'},
    {id:'weighted_spear',name:'Weighted Spear',slot:'weapon',cost:9,bonus:{attack:1,route:1},text:'Balanced for distance control and disciplined thrusts.'},
    {id:'brigandine_patch',name:'Brigandine Patch',slot:'armor',cost:8,bonus:{brace:1,combat:1},text:'A hard-worn repair that turns a glancing hit aside.'}
  ],
  magic:[
    {id:'ward_chalk_set',name:'Ward Chalk Set',slot:'focus',cost:7,bonus:{ward:1,ritual:1},text:'Dense chalks used to close a line before it breaks.'},
    {id:'charged_focus',name:'Charged Focus',slot:'focus',cost:10,bonus:{arcana:1,exploit:1},text:'A tuned implement that sharpens directed casting.'},
    {id:'reagent_case',name:'Reagent Case',slot:'kit',cost:8,bonus:{reagents:1,contain:1},text:'Organized capsules for ritual procedure and emergency response.'}
  ],
  stealth:[
    {id:'softstep_wraps',name:'Softstep Wraps',slot:'boots',cost:7,bonus:{concealment:1,stealth:1},text:'Wrapped soles that turn noise into discretion.'},
    {id:'hooked_tools',name:'Hooked Tools',slot:'kit',cost:9,bonus:{tools:1,route:1},text:'Compact entry tools built for locks, seams, and fast exits.'},
    {id:'smoke_vial',name:'Smoke Vial',slot:'belt',cost:6,bonus:{vanish:1,retreat:1},text:'A dense charge for breaking sightlines at the right moment.'}
  ],
  support:[
    {id:'field_kit_plus',name:'Field Kit+',slot:'kit',cost:8,bonus:{kits:1,recovery:1},text:'A careful assortment of bandage, tonic, and fixings.'},
    {id:'coordination_whistle',name:'Coordination Whistle',slot:'focus',cost:7,bonus:{coordination:1,command:1},text:'A small tool for turning panic into direction.'},
    {id:'ledger_rig',name:'Ledger Rig',slot:'belt',cost:9,bonus:{info:1,person:1},text:'A compact write-board with hidden slips and seal tabs.'}
  ]
};


const LOCALITY_SERVICE_ITEM_OVERRIDES = {
  panim_haven:{
    magic:[{id:'mourning_salt',name:'Mourning Salt',slot:'kit',cost:9,bonus:{ritual:1,contain:1},text:'Funerary salt that steadies rites and hostile residue.'}],
    support:[{id:'ledger_bandage_roll',name:'Ledger Bandage Roll',slot:'kit',cost:8,bonus:{recovery:1,person:1},text:'Marked wraps used by attendants who work grief and triage together.'}]
  },
  sunspire_haven:{
    combat:[{id:'convoy_hook_spear',name:'Convoy Hook Spear',slot:'weapon',cost:10,bonus:{attack:1,route:1,protect:1},text:'A freight-lane spear built to catch riders and keep the line together.'}],
    stealth:[{id:'yard_runner_cloak',name:'Yard Runner Cloak',slot:'armor',cost:8,bonus:{concealment:1,route:1},text:'Dust-masked cloth that disappears easily between freight stacks.'}]
  },
  aurora_crown_commune:{
    magic:[{id:'filter_glass_focus',name:'Filter Glass Focus',slot:'focus',cost:10,bonus:{arcana:1,ward:1},text:'A sealed focus that helps turn contamination pressure into readable structure.'}],
    support:[{id:'decontam_kit',name:'Decontam Kit',slot:'kit',cost:9,bonus:{contain:1,recovery:1},text:'Clamps, cloth, solvent, and tags for emergency clean-zone work.'}]
  },
  shelkopolis:{
    combat:[{id:'annex_tower_shield',name:'Annex Tower Shield',slot:'offhand',cost:10,bonus:{guard:1,brace:1,protect:1},text:'A Roadwarden-style shield meant to hold lanes and people in place.'}],
    stealth:[{id:'permit_falseback',name:'Permit Falseback',slot:'belt',cost:8,bonus:{person:1,stealth:1},text:'A slim rig for hiding seals, slips, and one dangerous document.'}]
  },
  harvest_circle:{
    support:[{id:'granary_fix_kit',name:'Granary Fix Kit',slot:'kit',cost:8,bonus:{kits:1,craft:1},text:'Cloth, twine, wedges, and hooks for keeping field work from becoming a casualty.'}],
    combat:[{id:'field_board_shield',name:'Field Board Shield',slot:'offhand',cost:7,bonus:{guard:1,brace:1},text:'Improvised but honest protection from a place that cannot wait for elegance.'}]
  },
  glasswake_commune:{
    magic:[{id:'shard_veil_relay',name:'Shard Veil Relay',slot:'focus',cost:10,bonus:{ward:1,exploit:1},text:'A bright relay that bends shardlight into controlled procedure.'}],
    stealth:[{id:'sealed_softstep',name:'Sealed Softstep Wraps',slot:'boots',cost:9,bonus:{concealment:1,vanish:1},text:'Quiet wraps designed for risky movement through monitored corridors.'}]
  },
  fairhaven:{
    stealth:[{id:'bridgehook_line',name:'Bridgehook Line',slot:'kit',cost:8,bonus:{tools:1,route:1,retreat:1},text:'A compact line and hook for market roofs, bridge undersides, and fast exits.'}],
    support:[{id:'market_tally_board',name:'Market Tally Board',slot:'belt',cost:7,bonus:{info:1,person:1},text:'A fast-write rig that turns rumor and price into leverage.'}]
  },
  mimolot_academy:{
    magic:[{id:'index_chain_focus',name:'Index Chain Focus',slot:'focus',cost:9,bonus:{arcana:1,lore:1},text:'A citation-linked focus that rewards disciplined reading over brute force.'}],
    support:[{id:'archive_repair_roll',name:'Archive Repair Roll',slot:'kit',cost:8,bonus:{craft:1,contain:1},text:'Binding cloths, pressure clips, and seal gum for scholarly disasters.'}]
  },
  soreheim_proper:{
    combat:[{id:'catwalk_pike',name:'Catwalk Pike',slot:'weapon',cost:11,bonus:{attack:1,protect:1,command:1},text:'A long industrial pike built for narrow lanes and vertical pressure.'}],
    support:[{id:'quench_valve_key',name:'Quench Valve Key',slot:'kit',cost:9,bonus:{contain:1,redirect:1},text:'A hard-forged tool for stopping industrial hazards before they own the floor.'}]
  },
  shirshal:{
    stealth:[{id:'quiet_oath_blade',name:'Quiet Oath Blade',slot:'weapon',cost:8,bonus:{stealth:1,person:1},text:'A narrow blade meant for controlled presence, not spectacle.'}],
    support:[{id:'seal_test_kit',name:'Seal Test Kit',slot:'kit',cost:8,bonus:{lore:1,craft:1},text:'Tools for reading false seals, procedural tampering, and brittle truths.'}]
  }
};

const STAGE2_DESTINATION_CONTENT = {
  panim_haven:[
    {label:'Enter the memorial quarter in plain sight and test who yields first', mode:'person', skill:'persuasion', success:'Panim’s public grief space names the pressure without meaning to.', fail:'The quarter closes ranks behind ritual courtesy.'},
    {label:'Read shrine residue for what the official rites skipped', mode:'ritual', skill:'lore', success:'Ritual gaps point at the missing hand behind the road.', fail:'The residue is too carefully scrubbed to resolve quickly.'}
  ],
  sunspire_haven:[
    {label:'Work the yard edge until the real freight panic shows itself', mode:'place', skill:'survival', success:'Sunspire’s loading rhythm exposes who is profiting from delay.', fail:'The yard hardens into noise and dust without a clean answer.'},
    {label:'Compare warehouse marks to what the line claims it moved', mode:'records', skill:'craft', success:'The storage line breaks into usable contradiction.', fail:'The wrong storehouse is watched and access disappears.'}
  ],
  aurora_crown_commune:[
    {label:'Walk the sealed corridor timings for the point where safety becomes theater', mode:'place', skill:'craft', success:'Aurora’s safety pattern names the exact hinge where truth split from procedure.', fail:'The corridor lock shifts before the pattern can be fixed.'},
    {label:'Question a relief worker who has seen too many filter failures to lie well', mode:'person', skill:'persuasion', success:'A relief worker names the chain of compromise behind the breach.', fail:'Fear wins and the answer retreats behind protocol.'}
  ],
  shelkopolis:[
    {label:'Pressure a minor permit desk until decorum becomes admission', mode:'person', skill:'persuasion', success:'A small official crack opens a much larger civic machine.', fail:'Courtesy becomes a wall and witnesses begin taking interest.'},
    {label:'Shadow the district bells and see which lane receives forced order first', mode:'stealth', skill:'stealth', success:'Shelk’s order reveals its preferred victims by timing alone.', fail:'The watchers notice the pattern of attention.'}
  ],
  harvest_circle:[
    {label:'Read the grain route for where loss became intentional', mode:'route', skill:'survival', success:'The field lanes admit who turned shortage into leverage.', fail:'Dust, distance, and tired workers blur the line.'},
    {label:'Lean on a tallyhand who knows which numbers were buried', mode:'person', skill:'persuasion', success:'The tallyhand gives up the buried count that changes the dispute.', fail:'The hand goes silent before the truth is usable.'}
  ],
  glasswake_commune:[
    {label:'Trace the shardlight cycle until the hidden shutdown pattern appears', mode:'lore', skill:'lore', success:'The commune’s light rhythm names the protected lie beneath it.', fail:'The cycle breaks before the sequence can be proven.'},
    {label:'Follow decontam waste to the place procedure stops making sense', mode:'route', skill:'craft', success:'The disposal line exposes the real contamination history.', fail:'The disposal path is rerouted mid-read.'}
  ],
  fairhaven:[
    {label:'Let the market crowd reveal who can move without being stopped', mode:'stealth', skill:'stealth', success:'Privilege becomes visible in movement alone.', fail:'The market turns noisy but unhelpful.'},
    {label:'Question a bridge-toll helper who hates the current order', mode:'person', skill:'persuasion', success:'A resentful helper maps the toll chain clearly enough to hurt it.', fail:'The helper loses nerve once the wrong badge appears.'}
  ],
  mimolot_academy:[
    {label:'Reconstruct a restricted transfer from ink ghosts and shelf gaps', mode:'records', skill:'lore', success:'The academy’s archive betrays what it tried to hide.', fail:'The fragments remain suggestive but incomplete.'},
    {label:'Use lecture traffic to locate where the dangerous text actually moved', mode:'place', skill:'stealth', success:'Movement, not catalog order, reveals the real route of knowledge.', fail:'Too many watchers make the path unusable.'}
  ],
  soreheim_proper:[
    {label:'Read the catwalk line for where command became panic', mode:'place', skill:'combat', success:'Soreheim’s industrial body shows where control truly failed.', fail:'The line is too loud and violent to read cleanly.'},
    {label:'Check quota boards against what the crews are physically moving', mode:'records', skill:'craft', success:'Production truth tears the official board open.', fail:'The board is corrected before the contradiction can spread.'}
  ],
  shirshal:[
    {label:'Question the witness queue until procedure starts contradicting itself', mode:'person', skill:'persuasion', success:'The court’s own order of handling exposes the pressure point.', fail:'The line turns formal and useless.'},
    {label:'Read broken seal cadence in the side halls', mode:'ritual', skill:'lore', success:'The seals point at the deliberate breach, not the alleged one.', fail:'The pattern almost resolves, then collapses into noise.'}
  ]
};

  const BUILD_VERIFICATION = {
    archetypeCount: ARCHETYPES.length,
    backgroundCount: ARCHETYPES.length * 3,
    routeSignatureCount: ARCHETYPES.length * 3,
    localityProjectionCount: LOCALITY_IDS.length,
    familyRegistryCount: Object.keys(FAMILY_OBJECTIVES).length,
    routeAtlasCount: Object.keys(ROUTE_ATLAS).length,
    stage2FamilyContentCount: Object.keys(STAGE2_FAMILY_CONTENT).length,
    familyEdgeRewardCount: Object.keys(FAMILY_EDGE_REWARDS).length,
    stage2DestinationContentCount: Object.keys(STAGE2_DESTINATION_CONTENT).length,
    localityServiceOverrideCount: Object.keys(LOCALITY_SERVICE_ITEM_OVERRIDES).length
  };

  const FAMILY_NAMES = {
    combat:['Warrior','Knight','Ranger','Paladin','Archer','Berserker','Warden','Warlord','Death Knight'],
    magic:['Wizard','Cleric','Priest','Necromancer','Illusionist','Inquisitor','Elementalist','Oracle'],
    stealth:['Rogue','Assassin','Spellthief','Scout','Thief','Trickster','Beastmaster'],
    support:['Healer','Artificer','Engineer','Tactician','Alchemist','Saint','Bard']
  };

  function familyForArch(id){
    const a = ARCHETYPES.find(x=>x.id===id);
    return a ? a.group : 'combat';
  }

  function stage1LocalityForGroup(group, idx){
    const map = {
      combat:['shelkopolis','sunspire_haven','soreheim_proper'],
      magic:['aurora_crown_commune','glasswake_commune','mimolot_academy'],
      stealth:['fairhaven','shirshal','harvest_circle'],
      support:['panim_haven','sunspire_haven','shelkopolis']
    };
    const arr = map[group] || LOCALITY_IDS;
    return arr[idx % arr.length];
  }

  const BACKGROUNDS = {};
  const BACKGROUND_ROUTE_SIGNATURES = {};

  ARCHETYPES.forEach((a, ai)=>{
    const origin = stage1LocalityForGroup(a.group, ai);
    const familyCycle = STAGE_FAMILIES.stage2;
    const baseIndex = ai % familyCycle.length;
    const backgrounds = [
      {id:`${a.id}_civic`,name:'Civic Hand',theme:'public procedure and obligation',stage1Plot:'local_contradiction',bonus:'persuasion'},
      {id:`${a.id}_frontier`,name:'Frontier Hand',theme:'route pressure and rough adaptation',stage1Plot:'route_pressure',bonus:'survival'},
      {id:`${a.id}_occult`,name:'Occult Hand',theme:'hidden rites and dangerous knowledge',stage1Plot:'hidden_rite',bonus:'lore'}
    ].map((b, bi)=>({
      ...b,
      originLocality: origin,
      firstNpc: (NPC_PLACEMENTS[origin]||[])[0]?.id || null,
      firstSafeZone: KEY_LOCALITIES[origin].safeZone,
      firstContradiction: `${KEY_LOCALITIES[origin].pressures[bi % KEY_LOCALITIES[origin].pressures.length]} is worse than locals will say aloud.`,
      firstObjective: `Find the true hand behind ${KEY_LOCALITIES[origin].pressures[(bi+1) % KEY_LOCALITIES[origin].pressures.length]}.`,
      firstFailure: `A failed push hands time and visibility to whoever benefits from the present confusion.`
    }));
    BACKGROUNDS[a.id] = backgrounds;
    backgrounds.forEach((b, bi)=>{
      BACKGROUND_ROUTE_SIGNATURES[b.id] = {
        backgroundId:b.id,
        originLocality:b.originLocality,
        stage1Plot:b.stage1Plot,
        stage2Vector:Object.keys(ROUTE_NAMES)[(baseIndex+bi) % Object.keys(ROUTE_NAMES).length],
        stage3Family:familyCycle[(baseIndex+bi)%familyCycle.length],
        stage4Family:familyCycle[(baseIndex+bi+2)%familyCycle.length],
        stage5Family:familyCycle[(baseIndex+bi+4)%familyCycle.length],
        legendaryTags:[a.name,b.name,KEY_LOCALITIES[b.originLocality].name]
      };
    });
  });

  window.ARCHETYPES = ARCHETYPES;
  window.BACKGROUNDS = BACKGROUNDS;
  window.KEY_LOCALITIES = KEY_LOCALITIES;
  window.STAGES = STAGES;
  window.ROUTE_NAMES = ROUTE_NAMES;
  window.ADJACENCY = ADJACENCY;
  window.NPC_PLACEMENTS = NPC_PLACEMENTS;
  window.COMPANION_CANDIDATES = COMPANION_CANDIDATES;
  window.BESTIARY = BESTIARY;
  window.HAZARDS = HAZARDS;
  window.FAMILY_OBJECTIVES = FAMILY_OBJECTIVES;
  window.ROUTE_ATLAS = ROUTE_ATLAS;
  window.RESCUE_PROFILES = RESCUE_PROFILES;
  window.STAGE2_FAMILY_CONTENT = STAGE2_FAMILY_CONTENT;
  window.FAMILY_EDGE_REWARDS = FAMILY_EDGE_REWARDS;
  window.SETTLEMENT_POIS = SETTLEMENT_POIS;
  window.ARCHETYPE_GROUP_SIGNALS = ARCHETYPE_GROUP_SIGNALS;
  window.STARTING_LOADOUT_BY_GROUP = STARTING_LOADOUT_BY_GROUP;
  window.BACKGROUND_ROUTE_SIGNATURES = BACKGROUND_ROUTE_SIGNATURES;
  window.LOCALITY_LINEAGES = LOCALITY_LINEAGES;
  window.SERVICE_ITEM_POOLS = SERVICE_ITEM_POOLS;
  window.BUILD_VERIFICATION = BUILD_VERIFICATION;
})();
