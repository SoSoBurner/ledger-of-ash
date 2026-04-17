const TIME_NAMES = ['Dawnrise','Midlight','Duskcall','Nightwatch'];
const STAGES = [
  { id:1, label:'Stage I — Grass Roots', levelMin:1, levelMax:4 },
  { id:2, label:'Stage II — Adjacent Inter-Polity', levelMin:5, levelMax:8 },
  { id:3, label:'Stage III — Wider Inter-Polity', levelMin:9, levelMax:12 },
  { id:4, label:'Stage IV — Legendary World Impact', levelMin:13, levelMax:17 },
  { id:5, label:'Stage V — Paragon Axis', levelMin:18, levelMax:20 }
];
const SKILLS = ['combat','survival','persuasion','lore','stealth','craft'];
const ARCHETYPES = {
  warrior:{ name:'Warrior', family:'Classic Combat', focus:'combat', ability:'Shield Rush', empowerText:'The line folds under the pressure you now carry.' },
  archer:{ name:'Archer', family:'Classic Combat', focus:'survival', ability:'Patient Shot', empowerText:'Distance, timing, and nerve all belong to you now.' },
  healer:{ name:'Healer', family:'Support & Leadership', focus:'craft', ability:'Cleansing Bind', empowerText:'Where panic once spread, your hands now impose order.' },
  elementalist:{ name:'Elementalist', family:'Magic & Spellcasting', focus:'lore', ability:'Axis Spark', empowerText:'People stop mistaking your presence for theory.' },
  rogue:{ name:'Rogue', family:'Stealth & Precision', focus:'stealth', ability:'Shadow Step', empowerText:'The room realizes too late how much control you already had.' },
  priest:{ name:'Priest', family:'Magic & Spellcasting', focus:'persuasion', ability:'Rite of Ward', empowerText:'Faith and authority settle around you with new weight.' },
  tactician:{ name:'Tactician', family:'Support & Leadership', focus:'persuasion', ability:'Command Pivot', empowerText:'The field shifts because you decide where pressure goes.' },
  ranger:{ name:'Ranger', family:'Stealth & Precision', focus:'survival', ability:'Trail Split', empowerText:'Routes that once threatened you now reveal their weakness first.' }
};

const LOCALITIES = {
  panim_haven: {
    name:'Panim Haven', polity:'Principality of Panim', region:'Principality of Panim',
    identity:'Afterlife-service metropolis of memorial roads, registry pressure, rites, and grieving commerce.',
    approach:'High walls, lantern scaffolds, incense plumes, and procession lanes hold the city in orderly grief.',
    inside:'Ledger houses, shrine courts, couriers, and mourners move with practiced purpose through broad stone avenues.',
    whoBelongs:['priests','clerks','mourners','couriers'], whoOut:['grave thieves','careless traders'],
    expected:['quiet decorum near memorial traffic','respect for offerings and registry order'],
    power:['House Panim clergy','registry authorities'], economy:['offerings','memorial work','afterlife mediation'],
    faith:'rites to death-aligned and passage-guiding deities shape daily rhythm.',
    pressure:['registry discrepancy','missing offerings','body-line confusion'],
    greetings:['two-finger brow touch near memorial traffic','quiet formal blessing between workers'],
    rituals:['lamp circles before ledgers open','salt and ash laid at threshold stones'],
    locals:['priests','clerks','mourners'], safeZone:'Registry hospice ward',
    adjacent:['sanctum_sands_memorial_road','river_archive_causeway'],
    hazards:['ritual crush','grief riots','offering theft panic'], creatures:['grave-lean scavengers','ossuary shades'],
    companion:{ id:'sela_ashvow', name:'Sela Ashvow', role:'memorial courier', recruitAt:'stage1' }
  },
  sunspire_haven: {
    name:'Sunspire Haven', polity:'Soreheim Alliance', region:'Soreheim Alliance',
    identity:'Crossroads market town of freight yards, convoy timing, guild pressure, and hard practical reputation.',
    approach:'Granaries, cranes, wagon ruts, yard bells, and low markets crowd the entry roads before the town proper begins.',
    inside:'Freight yards, tally houses, cheap beds, and contract boards knot around a stubborn commercial core.',
    whoBelongs:['handlers','drivers','yard clerks','deal brokers'], whoOut:['idle drifters','unlicensed saboteurs'],
    expected:['work first','do not waste lane time'],
    power:['convoy factors','yard bosses'], economy:['grain','timber','freight storage','escort contracts'],
    faith:'small shrines compete with practical labor altars and guarded route blessings.',
    pressure:['missing waybills','water gate sabotage','predator losses'],
    greetings:['chin dip over ledgers','quick palm tap before a contract closes'],
    rituals:['chalk route marks renewed at dawn','cheap ribbon knots tied to convoy poles'],
    locals:['handlers','drivers','yard clerks'], safeZone:'Freight office recovery cot',
    adjacent:['harvest_circle_road','ironroot_crossing_freight_lane'],
    hazards:['cart crush','water gate failure','grain dust flare'], creatures:['route predators','yard vermin swarms'],
    companion:{ id:'hallen_pike', name:'Hallen Pike', role:'freight scout', recruitAt:'stage1' }
  },
  aurora_crown_commune: {
    name:'Aurora Crown Commune', polity:'Sheresh Communes', region:'Sheresh Communes',
    identity:'Major survival commune under a dome canopy shaped by contamination fear, heat discipline, and aurora study.',
    approach:'The dome glow carries blue-white across packed snow while intake towers and repair ribs rise against the dark.',
    inside:'Heat lanes, ration counters, repair gantries, and sealed shrines hold together a disciplined civic rhythm.',
    whoBelongs:['stewards','repairers','ration keepers','research aides'], whoOut:['careless smugglers','unsealed visitors'],
    expected:['respect containment markings','do not break line order'],
    power:['commune stewards','containment offices'], economy:['repair labor','ration exchange','salvage','aurora study'],
    faith:'protective rites fold into survival routine and boundary maintenance.',
    pressure:['containment breach signs','reactor reading dispute','ration diversion'],
    greetings:['gloved touch to chest seal','measured count-off acknowledgment'],
    rituals:['heat lamps ringed before shift change','containment chalk renewed at gate seams'],
    locals:['stewards','repairers','ration keepers'], safeZone:'Dome steward recovery berth',
    adjacent:['whitebridge_domeway','glasswake_corridor'],
    hazards:['cold exposure','containment flare','ration unrest'], creatures:['whiteout stalkers','frost-cracked lurkers'],
    companion:{ id:'toriel_palevow', name:'Toriel Palevow', role:'containment runner', recruitAt:'stage1' }
  },
  shelkopolis: {
    name:'Shelkopolis', polity:'Principality of Shelk', region:'Principality of Shelk',
    identity:'Refined metropolis of banners, shrines, Roadwarden order, fashion wealth, and disciplined public manners.',
    approach:'Flower-lined roads, pale stone, bright plumes, and colored glass signal wealth before the inner districts open.',
    inside:'Smooth curving streets link workshop wards, noble avenues, shrine courts, and carefully watched market flow.',
    whoBelongs:['artisans','merchants','Roadwardens','nobles'], whoOut:['open wreckers','careless brawlers'],
    expected:['site-specific decorum','measured voice near shrines and noble lanes'],
    power:['House Shelk','Roadwardens'], economy:['fashion work','guild production','merchant exchange'],
    faith:'thread offerings and candle bowls stand beside civic order rather than apart from it.',
    pressure:['roadwarden irregularity','guild pressure dispute','estate smuggling whispers'],
    greetings:['formal nod below banners','careful hand sign near shrines'],
    rituals:['thread offerings at dawn shrines','quiet candle bowls before archive alcoves'],
    locals:['tailors','Roadwardens','clerks'], safeZone:'Guildhall infirmary loft',
    adjacent:['fairhaven_road','plumes_end_northern_road'],
    hazards:['crowd surge','glyph runoff','festival bottleneck'], creatures:['glyph-scarred hounds','archive bats'],
    companion:{ id:'neren_rimebridge', name:'Neren Rimebridge', role:'market archivist', recruitAt:'stage1' }
  },
  fairhaven: {
    name:'Fairhaven', polity:'Principality of Shelk', region:'Principality of Shelk',
    identity:'Roadward port-adjacent township where traders, inspectors, ferries, and anxious caravans overlap.',
    approach:'Warehouses, ferry posts, wind-torn banners, and inspection tables collect at the edge of a restless harbor road.',
    inside:'Small inns, bonded yards, customs alcoves, and muddy side lanes cut the settlement into practical zones.',
    whoBelongs:['inspectors','ferry clerks','carters','route agents'], whoOut:['smugglers caught in daylight','open grafters'],
    expected:['show papers quickly','do not obstruct bonded lanes'],
    power:['custom inspectors','route brokers'], economy:['ferry exchange','bonded storage','short-haul trade'],
    faith:'portable shrines travel with sailors and caravan hands more than they dominate the streets.',
    pressure:['bonded ledger tampering','ferry queue extortion','harbor undercount'],
    greetings:['short nod over paperwork','quick palm sign between carters'],
    rituals:['coin taps at ferry rails','salt flicked from pocket shrines'],
    locals:['inspectors','carters','innkeepers'], safeZone:'Harbor rest loft',
    adjacent:['fairhaven_road','plumes_end_northern_road'],
    hazards:['dock crush','rope snap','tar fire'], creatures:['marsh biters','pier rats'],
    companion:{ id:'vesh_taln', name:'Vesh Taln', role:'ferry fixer', recruitAt:'stage1' }
  },
  harvest_circle: {
    name:'Harvest Circle', polity:'Soreheim Alliance', region:'Soreheim Alliance',
    identity:'Agrarian logistics ring where storage, field quotas, and convoy coordination meet blunt local authority.',
    approach:'Mills, grain towers, field walls, and broad turning lanes make the settlement legible from a long way off.',
    inside:'Quota boards, meal sheds, wagon courts, and grain tally houses keep the place moving by schedule and pressure.',
    whoBelongs:['foremen','field hands','weigh clerks','route guards'], whoOut:['idlers','uncounted buyers'],
    expected:['respect work order','do not interfere with counted loads'],
    power:['quota wardens','storehouse foremen'], economy:['grain','field labor','wagon contracts'],
    faith:'harvest offerings are practical and public, tied to work and weather more than ornament.',
    pressure:['quota falsification','field sabotage','grain theft reprisals'],
    greetings:['wrist tap over grain dust','quick count repeated before work starts'],
    rituals:['bundle knots at dawn','small beer pour before first load leaves'],
    locals:['foremen','field hands','weigh clerks'], safeZone:'Storehouse loft recovery bed',
    adjacent:['harvest_circle_road','ironroot_crossing_freight_lane'],
    hazards:['thresher maim','field fire','stampede churn'], creatures:['burrow gnashers','lane carrion kites'],
    companion:{ id:'jorva_helmrune', name:'Jorva Helmrune', role:'field marshal courier', recruitAt:'stage1' }
  },
  glasswake_commune: {
    name:'Glasswake Commune', polity:'Sheresh Communes', region:'Sheresh Communes',
    identity:'Cold-bright commune of research halls, sealed observatories, and brittle public patience under watchful procedure.',
    approach:'Glassy ice walls, sealed towers, and measured traffic lines make the commune feel precise even from outside the dome line.',
    inside:'Observation halls, ration courts, insulated passages, and research alcoves divide life into sanctioned compartments.',
    whoBelongs:['researchers','ward stewards','scriveners','maintenance teams'], whoOut:['unsealed petitioners','reckless smugglers'],
    expected:['respect lab boundaries','observe heat discipline'],
    power:['research offices','containment committees'], economy:['research allotments','repair labor','ration exchange'],
    faith:'private warding and survival rites sit beside public research protocol.',
    pressure:['lab omission coverup','sealed archive dispute','sensor ghost readings'],
    greetings:['short seal-sign near lab doors','quiet nod below heat lamps'],
    rituals:['warming braziers circled before entry','chalk ward threads renewed at hinges'],
    locals:['researchers','scriveners','maintenance teams'], safeZone:'Observatory infirmary niche',
    adjacent:['glasswake_corridor','whitebridge_domeway'],
    hazards:['glass frost fracture','reactor echo','seal failure'], creatures:['ice-veiled watchers','frost mites'],
    companion:{ id:'toman_iceveil', name:'Researcher Toman Iceveil', role:'field researcher', recruitAt:'stage1' }
  },
  plumes_end: {
    name:"Plume's End", polity:'Principality of Shelk', region:'Principality of Shelk',
    identity:'Northern route settlement where patrol roads, toll houses, and smaller noble interests meet practical danger.',
    approach:'Watchposts, toll poles, way shrines, and wagon smoke mark the settlement before its clustered roofs emerge.',
    inside:'Patrol lodgings, tack shops, shrines, and road inns sit close to one another under a brisk protective order.',
    whoBelongs:['patrol riders','inn staff','route traders','stable hands'], whoOut:['wild looters','unlicensed hunters'],
    expected:['respect patrol precedence','speak plainly about road trouble'],
    power:['patrol captains','minor nobles'], economy:['road service','tack trade','inn traffic'],
    faith:'roadside shrines and vow ribbons hold more public weight than courtly show.',
    pressure:['patrol corruption','missing riders','northern toll abuse'],
    greetings:['brisk rider nod','strap-tap between patrol hands'],
    rituals:['ribbon ties at road shrines','small lamp lines before departure'],
    locals:['patrol riders','innkeepers','stable hands'], safeZone:'Patrol house recovery room',
    adjacent:['plumes_end_northern_road','fairhaven_road'],
    hazards:['bridge drop','road washout','horse panic'], creatures:['road stalk cats','ditch lurkers'],
    companion:{ id:'maelin_dusktrack', name:'Maelin Dusktrack', role:'route watcher', recruitAt:'stage1' }
  }
};

const ROUTE_NAMES = {
  sanctum_sands_memorial_road:'Sanctum Sands Memorial Road',
  river_archive_causeway:'River Archive Causeway',
  harvest_circle_road:'Harvest Circle Road',
  ironroot_crossing_freight_lane:'Ironroot Crossing Freight Lane',
  whitebridge_domeway:'Whitebridge Domeway',
  glasswake_corridor:'Glasswake Corridor',
  fairhaven_road:'Fairhaven Road',
  plumes_end_northern_road:"Plume's End Northern Road"
};

const BESTIARY = {
  'grave-lean scavengers': { hp:8, attack:2, text:'Carrion-drawn scavengers skulk near offering carts and poorly watched deadweight.' },
  'ossuary shades': { hp:10, attack:3, text:'Thin drifting dead-things gather where rites and loss have been mishandled.' },
  'route predators': { hp:9, attack:3, text:'Lean route predators test convoy edges and livestock lanes.' },
  'yard vermin swarms': { hp:7, attack:2, text:'Storehouse vermin boil up where grain is poorly sealed.' },
  'whiteout stalkers': { hp:11, attack:4, text:'Pale silhouettes drift just beyond practical sight in blowing frost.' },
  'frost-cracked lurkers': { hp:12, attack:4, text:'Cracked pale bodies move only when the eye commits elsewhere.' },
  'glyph-scarred hounds': { hp:10, attack:4, text:'Warp-marked hounds circle where runoff or corruption stains the road.' },
  'archive bats': { hp:8, attack:2, text:'Dusty bite-wings burst from rafters when disturbed too hard.' },
  'marsh biters': { hp:9, attack:3, text:'Low wetland jaws test the unwary near rotting pilings.' },
  'pier rats': { hp:7, attack:2, text:'Harbor rats grow bold where tar and grain waste feed them.' },
  'burrow gnashers': { hp:10, attack:3, text:'Field burrowers rise under wheels and ankles where the ground is soft.' },
  'lane carrion kites': { hp:8, attack:2, text:'Road kites flock to panic and spooked animals.' },
  'ice-veiled watchers': { hp:11, attack:4, text:'Cold-hushed figures stay just within reflection and glare.' },
  'frost mites': { hp:7, attack:2, text:'Tiny biting cold-bodies spread from bad seams and failing stores.' },
  'road stalk cats': { hp:10, attack:3, text:'Lean northern cats test the road edge and choose the weak.' },
  'ditch lurkers': { hp:9, attack:3, text:'Mud-dark things lunge from the drainage edge under low light.' }
};

const HAZARDS = {
  'ritual crush': { severity:1, text:'Ceremony crowds close so tightly that footing and breathing become a problem.' },
  'grief riots': { severity:2, text:'Public sorrow turns volatile when price and dignity collide.' },
  'offering theft panic': { severity:1, text:'One missing tray can turn orderly petition into a hard-edged surge.' },
  'cart crush': { severity:1, text:'Tight yards, loaded axles, and hurried beasts make every corner dangerous.' },
  'water gate failure': { severity:2, text:'A failed gate turns utility into civic threat within moments.' },
  'grain dust flare': { severity:2, text:'Suspended grain dust turns a careless spark into a blinding rush of fire.' },
  'cold exposure': { severity:2, text:'A brief mistake in Sheresh cold becomes a physical argument immediately.' },
  'containment flare': { severity:3, text:'Failed containment lights the air with painful static and wrong color.' },
  'ration unrest': { severity:1, text:'Small ration corrections can harden into communal panic.' },
  'crowd surge': { severity:1, text:'Elegant traffic becomes its own weapon when pressure moves through it.' },
  'glyph runoff': { severity:3, text:'Corruption residue turns the ground and nearby air into a living problem.' },
  'festival bottleneck': { severity:1, text:'Beauty and devotion can still trap a body in the wrong lane.' },
  'dock crush': { severity:1, text:'Wet planks, tight cargo, and bad shouting turn the dock into a trap.' },
  'rope snap': { severity:2, text:'Strained rope can cut, whip, and kill before anyone names the danger.' },
  'tar fire': { severity:2, text:'A poor spark among tarred goods becomes a black fast heat.' },
  'thresher maim': { severity:2, text:'Field machinery and tired hands fail together.' },
  'field fire': { severity:2, text:'Wind makes small flame into harvest disaster.' },
  'stampede churn': { severity:2, text:'Panicked beasts turn lanes into meat-grinding motion.' },
  'glass frost fracture': { severity:2, text:'A cracked pane or wall section can become lethal in one breath.' },
  'reactor echo': { severity:3, text:'Wrong readings become wrong reality when enough equipment agrees.' },
  'seal failure': { severity:3, text:'A failed seal turns ordinary air into a wager.' },
  'bridge drop': { severity:2, text:'A bad crossing becomes a sudden absence of road.' },
  'road washout': { severity:2, text:'Whole sections of the lane simply stop being trustworthy ground.' },
  'horse panic': { severity:1, text:'One frightened mount can collapse a whole departure line.' }
};

const PLOT_FAMILIES = {
  roadwarden_irregularity:{ title:'Roadwarden Irregularity', objective:'Determine why order now serves a private instruction stream.', stage2:'fairhaven_road' },
  guild_pressure_dispute:{ title:'Guild Pressure Dispute', objective:'Decide whether to expose, settle, or weaponize the trade pressure.', stage2:'fairhaven_road' },
  estate_smuggling_whispers:{ title:'Estate Smuggling Whispers', objective:'Trace a noble-adjacent flow before it disappears into a private road.', stage2:'plumes_end_northern_road' },
  grain_route_predators:{ title:'Grain Route Predators', objective:'Stop losses on the lane without handing the route to worse people.', stage2:'harvest_circle_road' },
  missing_waybill_chain:{ title:'Missing Waybill Chain', objective:'Follow missing papers through yard hands, clerks, and convoy pressure.', stage2:'ironroot_crossing_freight_lane' },
  sabotaged_water_gate:{ title:'Sabotaged Water Gate', objective:'Prove whether the break was need, greed, or deliberate disruption.', stage2:'harvest_circle_road' },
  registry_discrepancy:{ title:'Registry Discrepancy', objective:'Find whose dead or missing are being quietly displaced in the ledger.', stage2:'sanctum_sands_memorial_road' },
  missing_offering_line:{ title:'Missing Offering Line', objective:'Resolve who siphons ritual goods and who profits from the loss.', stage2:'river_archive_causeway' },
  procession_body_swap:{ title:'Procession Body Swap', objective:'Untangle a body exchange before dignity and trade both collapse.', stage2:'sanctum_sands_memorial_road' },
  containment_breach_signs:{ title:'Containment Breach Signs', objective:'Contain the spread and decide who should know the truth first.', stage2:'whitebridge_domeway' },
  reactor_reading_dispute:{ title:'Reactor Reading Dispute', objective:'Determine whether the wrong readings are error, cover, or sabotage.', stage2:'glasswake_corridor' },
  ration_diversion:{ title:'Ration Diversion', objective:'Stop a theft chain without collapsing trust in the line itself.', stage2:'whitebridge_domeway' },
  bonded_ledger_tampering:{ title:'Bonded Ledger Tampering', objective:'Find who is changing bonded counts before the loss becomes political.', stage2:'fairhaven_road' },
  ferry_queue_extortion:{ title:'Ferry Queue Extortion', objective:'Break the extortion ring without freezing the harbor line.', stage2:'fairhaven_road' },
  harbor_undercount:{ title:'Harbor Undercount', objective:'Trace why declared loads and real loads no longer match.', stage2:'plumes_end_northern_road' },
  quota_falsification:{ title:'Quota Falsification', objective:'Decide who benefits when shortage is staged on paper first.', stage2:'harvest_circle_road' },
  field_sabotage:{ title:'Field Sabotage', objective:'Stop the damage before reprisal tears the work crews apart.', stage2:'ironroot_crossing_freight_lane' },
  grain_theft_reprisals:{ title:'Grain Theft Reprisals', objective:'Prevent reprisal logic from becoming a wider route war.', stage2:'harvest_circle_road' },
  lab_omission_coverup:{ title:'Lab Omission Coverup', objective:'Determine who cut out key findings before public risk follows.', stage2:'glasswake_corridor' },
  sealed_archive_dispute:{ title:'Sealed Archive Dispute', objective:'Break the silence around a restricted record without killing access entirely.', stage2:'whitebridge_domeway' },
  sensor_ghost_readings:{ title:'Sensor Ghost Readings', objective:'Separate false fear from the danger that is actually real.', stage2:'glasswake_corridor' },
  patrol_corruption:{ title:'Patrol Corruption', objective:'Decide which rider line can still be trusted.', stage2:'plumes_end_northern_road' },
  missing_riders:{ title:'Missing Riders', objective:'Find whether the missing are dead, bought, or turned.', stage2:'plumes_end_northern_road' },
  northern_toll_abuse:{ title:'Northern Toll Abuse', objective:'Break the toll abuse before it becomes accepted order.', stage2:'fairhaven_road' }
};

const BACKGROUNDS = {
  warrior:[
    { id:'garrison_soldier', name:'Garrison Soldier', locality:'shelkopolis', stage1Plot:'roadwarden_irregularity', theme:'service before comfort' },
    { id:'dueling_house_retainer', name:'Dueling House Retainer', locality:'shelkopolis', stage1Plot:'estate_smuggling_whispers', theme:'discipline under noble scrutiny' },
    { id:'festival_guard', name:'Festival Guard', locality:'shelkopolis', stage1Plot:'guild_pressure_dispute', theme:'public order under show and strain' }
  ],
  archer:[
    { id:'frontier_ranging_company', name:'Frontier Ranging Company', locality:'sunspire_haven', stage1Plot:'grain_route_predators', theme:'distance, patience, and lane survival' },
    { id:'yard_overwatch', name:'Yard Overwatch', locality:'sunspire_haven', stage1Plot:'missing_waybill_chain', theme:'spot what others miss before the price comes due' },
    { id:'river_gate_watch', name:'River Gate Watch', locality:'sunspire_haven', stage1Plot:'sabotaged_water_gate', theme:'hold the line before water or panic wins' }
  ],
  healer:[
    { id:'recovery_specialist', name:'Recovery Specialist', locality:'panim_haven', stage1Plot:'registry_discrepancy', theme:'restore dignity where ledgers fail it' },
    { id:'offering_ward_tender', name:'Offering Ward Tender', locality:'panim_haven', stage1Plot:'missing_offering_line', theme:'keep rites honest without breaking the living' },
    { id:'procession_mender', name:'Procession Mender', locality:'panim_haven', stage1Plot:'procession_body_swap', theme:'repair the human cost of public order' }
  ],
  elementalist:[
    { id:'containment_apprentice', name:'Containment Apprentice', locality:'aurora_crown_commune', stage1Plot:'containment_breach_signs', theme:'read danger before it becomes public ruin' },
    { id:'reactor_reader', name:'Reactor Reader', locality:'aurora_crown_commune', stage1Plot:'reactor_reading_dispute', theme:'numbers become law when heat fails' },
    { id:'ration_flare_keeper', name:'Ration Flare Keeper', locality:'aurora_crown_commune', stage1Plot:'ration_diversion', theme:'survival is logistics made personal' }
  ],
  rogue:[
    { id:'bonded_yard_rat', name:'Bonded Yard Rat', locality:'fairhaven', stage1Plot:'bonded_ledger_tampering', theme:'see the lie behind the count' },
    { id:'ferry_queue_runner', name:'Ferry Queue Runner', locality:'fairhaven', stage1Plot:'ferry_queue_extortion', theme:'move fast where the official line drags' },
    { id:'harbor_shadow', name:'Harbor Shadow', locality:'fairhaven', stage1Plot:'harbor_undercount', theme:'truth lives in what never gets declared' }
  ],
  tactician:[
    { id:'quota_table_keeper', name:'Quota Table Keeper', locality:'harvest_circle', stage1Plot:'quota_falsification', theme:'pressure lives in what the board says is true' },
    { id:'field_order_officer', name:'Field Order Officer', locality:'harvest_circle', stage1Plot:'field_sabotage', theme:'hold people together while the work comes apart' },
    { id:'grain_claim_mediator', name:'Grain Claim Mediator', locality:'harvest_circle', stage1Plot:'grain_theft_reprisals', theme:'prevent arithmetic from becoming violence' }
  ],
  priest:[
    { id:'ward_rite_scrivener', name:'Ward Rite Scrivener', locality:'glasswake_commune', stage1Plot:'lab_omission_coverup', theme:'faith and procedure meet in cold rooms' },
    { id:'sealed_record_adept', name:'Sealed Record Adept', locality:'glasswake_commune', stage1Plot:'sealed_archive_dispute', theme:'truth must survive restriction' },
    { id:'sensor_chapel_keeper', name:'Sensor Chapel Keeper', locality:'glasswake_commune', stage1Plot:'sensor_ghost_readings', theme:'wrong signs still shape real fear' }
  ],
  ranger:[
    { id:'northern_patrol_scout', name:'Northern Patrol Scout', locality:'plumes_end', stage1Plot:'patrol_corruption', theme:'the road remembers what men try to hide' },
    { id:'missing_rider_finder', name:'Missing Rider Finder', locality:'plumes_end', stage1Plot:'missing_riders', theme:'stay with the trail after other people stop looking' },
    { id:'toll_lane_hunter', name:'Toll Lane Hunter', locality:'plumes_end', stage1Plot:'northern_toll_abuse', theme:'strip power from petty choke points' }
  ]
};

const ROUTE_FAMILIES = {
  harvest_circle_road:{ stage3:'supply_war', stage4:'grain_hegemony' },
  ironroot_crossing_freight_lane:{ stage3:'convoy_break', stage4:'freight_capture' },
  sanctum_sands_memorial_road:{ stage3:'mortuary_politics', stage4:'death_ledger_exposure' },
  river_archive_causeway:{ stage3:'sacred_records', stage4:'river_of_names' },
  whitebridge_domeway:{ stage3:'commune_containment', stage4:'sheresh_survival_crisis' },
  glasswake_corridor:{ stage3:'research_schism', stage4:'cold_light_revelation' },
  fairhaven_road:{ stage3:'customs_capture', stage4:'shelk_trade_shock' },
  plumes_end_northern_road:{ stage3:'patrol_break', stage4:'northern_road_power' }
};

const BACKGROUND_ROUTE_SIGNATURES = {};
for (const [arch, list] of Object.entries(BACKGROUNDS)) {
  for (const bg of list) {
    BACKGROUND_ROUTE_SIGNATURES[bg.id] = {
      backgroundId: bg.id,
      originLocality: bg.locality,
      stage1PlotId: bg.stage1Plot,
      stage2Vector: PLOT_FAMILIES[bg.stage1Plot].stage2,
      stage3Family: ROUTE_FAMILIES[PLOT_FAMILIES[bg.stage1Plot].stage2].stage3,
      stage4Family: ROUTE_FAMILIES[PLOT_FAMILIES[bg.stage1Plot].stage2].stage4,
      stage5Family: 'axis_trial',
      failureTheme: bg.theme,
      legendaryTags:[bg.locality, arch, bg.theme]
    };
  }
}


// ----- Batch 3 expansion -----
ARCHETYPES.knight = { name:'Knight', family:'Classic Combat', focus:'combat', ability:'Banner Break', empowerText:'Authority that once resisted you now calculates what resistance will cost.' };
ARCHETYPES.wizard = { name:'Wizard', family:'Magic & Spellcasting', focus:'lore', ability:'Measured Unbinding', empowerText:'Theory leaves the archive and starts changing the terms of the room.' };
ARCHETYPES.scout = { name:'Scout', family:'Stealth & Precision', focus:'stealth', ability:'Slip the Perimeter', empowerText:'Boundaries stop feeling like walls and start looking like decisions.' };
ARCHETYPES.alchemist = { name:'Alchemist', family:'Support & Leadership', focus:'craft', ability:'Pressure Distillate', empowerText:'What once looked like danger now starts to look like material.' };

LOCALITIES.ashforge_citadel = {
  name:'Ashforge Citadel', polity:'Soreheim Alliance', region:'Soreheim Alliance',
  identity:'Volcanic forgehold of allocation quotas, blast rhythm, and iron authority built for output before comfort.',
  approach:'Heat shimmer, slag trenches, chain lifts, and ringing anvils announce the citadel long before walls become detail.',
  inside:'Forge galleries, ore lifts, barracks tiers, and quota ledgers make labor feel architected into stone itself.',
  power:['forge captains','allotment clerks'], economy:['arms','ore allotment','blast furnaces','heavy fittings'],
  faith:'Smith-rites and endurance vows are folded directly into shift changes and furnace openings.',
  pressure:['allotment fraud','slag diversion','forge sabotage'],
  greetings:['hammer-knuckle touch','short forearm clasp under soot'], rituals:['three sparks at furnace start','slag traced beside quota boards'],
  locals:['smiths','ore crews','allotment clerks'], safeZone:'Forge infirmary grate-room',
  adjacent:['ashforge_supply_lift','guildheart_causeway'], hazards:['slag burst','chain failure','furnace backwash'], creatures:['cinder lizards','slag mites'],
  companion:{ id:'varra_coalvow', name:'Varra Coalvow', role:'blast foreman', recruitAt:'stage1' }
};
LOCALITIES.guildheart_hub = {
  name:'Guildheart Hub', polity:'The Union', region:'The Union',
  identity:'Trade-switch center where bonded traffic, arbitration language, and fee logic decide who moves and who stalls.',
  approach:'Wayfinding poles, bonded halls, counting balconies, and queue lanes make the place feel built out of agreements.',
  inside:'Broker tables, sealed offices, bonded courtyards, and switch yards turn every errand into leverage for someone.',
  power:['trade arbiters','bonded guilds'], economy:['relay trade','bonded storage','fee extraction','switch contracts'],
  faith:'Portable mercantile shrines appear in alcoves and desks more than in grand central temples.',
  pressure:['relay falsification','guild sabotage','arbitration capture'],
  greetings:['contract-finger tap','ledger nod over seals'], rituals:['seal wax pressed before bargains','counted coin rotated at threshold desks'],
  locals:['brokers','clerks','carriers'], safeZone:'Broker hospice room',
  adjacent:['guildheart_causeway','cosmoria_sealane'], hazards:['crowd surge','ledger panic','cart wedge'], creatures:['storehouse gnawers','scent-tracking debt hounds'],
  companion:{ id:'helia_mark', name:'Helia Mark', role:'bonded broker', recruitAt:'stage1' }
};
LOCALITIES.mimolot_academy = {
  name:'Mimolot Academy', polity:'Principality of Mimolot', region:'Principality of Mimolot',
  identity:'Tariff-schooled academy city where sanctioned knowledge, archive ranking, and sealed study shape public life.',
  approach:'Lecture towers, toll archives, and papered courts rise in ordered layers before the academy gates properly close around the road.',
  inside:'Archive halls, supervised courtyards, tariff rooms, and ranked dormitories bind curiosity to discipline.',
  power:['academy chancellery','tariff archives'], economy:['licensed study','copying','scholastic fees'],
  faith:'Study vows and ordered devotions keep company with stricter archive ritual.',
  pressure:['tariff leak','sealed syllabus dispute','restricted proof circulation'],
  greetings:['two-finger page tap','measured incline in hallways'], rituals:['ink blessing before lectures','lamp trim before archive opening'],
  locals:['students','copy clerks','archive guards'], safeZone:'Academy convalescent study room',
  adjacent:['mimolot_toll_road','cosmoria_sealane'], hazards:['archive smoke','shelf collapse','ink flare'], creatures:['paper nests','vault moths'],
  companion:{ id:'iraen_fold', name:'Iraen Fold', role:'tariff copyist', recruitAt:'stage1' }
};
LOCALITIES.cosmoria = {
  name:'Cosmoria', polity:'Principality of Cosmouth', region:'Principality of Cosmouth',
  identity:'Maritime archive city of shipwright memory, tide-ledgers, and old records hidden inside working docks.',
  approach:'Masts, bell towers, archive stacks, and salt-dark stone rise together until sea trade and record keeping feel inseparable.',
  inside:'Slipways, archive quays, rope markets, and tide rooms make the city read like a shipwright ledger in motion.',
  power:['shipwright houses','quay archivists'], economy:['ship fitting','marine archive labor','quay trade'],
  faith:'Harbor devotions and record offerings share space with tide-keeping rites.',
  pressure:['manifest ghosting','quay archive theft','bellhouse coverup'],
  greetings:['rope-knot sign between crews','palm to rail near archive stairs'], rituals:['salt line at dawn tide tables','bell touch before departure ledgering'],
  locals:['dock clerks','rope crews','quay archivists'], safeZone:'Quay infirmary bunk',
  adjacent:['cosmoria_sealane','river_archive_causeway'], hazards:['dock crush','tide undertow','bellhouse fall'], creatures:['brine scavengers','mast roost predators'],
  companion:{ id:'serit_wake', name:'Serit Wake', role:'quay ledger diver', recruitAt:'stage1' }
};
ROUTE_NAMES.ashforge_supply_lift = 'Ashforge Supply Lift';
ROUTE_NAMES.guildheart_causeway = 'Guildheart Causeway';
ROUTE_NAMES.mimolot_toll_road = 'Mimolot Toll Road';
ROUTE_NAMES.cosmoria_sealane = 'Cosmoria Sealane';
BESTIARY['cinder lizards'] = { hp:15, attack:5 };
BESTIARY['slag mites'] = { hp:9, attack:3 };
BESTIARY['storehouse gnawers'] = { hp:10, attack:3 };
BESTIARY['scent-tracking debt hounds'] = { hp:15, attack:5 };
BESTIARY['paper nests'] = { hp:8, attack:2 };
BESTIARY['vault moths'] = { hp:11, attack:3 };
BESTIARY['brine scavengers'] = { hp:12, attack:4 };
BESTIARY['mast roost predators'] = { hp:14, attack:4 };
HAZARDS['slag burst'] = { severity:3, text:'Molten waste stops being background and becomes immediate fate.' };
HAZARDS['chain failure'] = { severity:2, text:'Heavy industry stores disaster above your head.' };
HAZARDS['furnace backwash'] = { severity:3, text:'Heat finds the wrong direction all at once.' };
HAZARDS['ledger panic'] = { severity:1, text:'A crowded agreement hall can turn brittle faster than expected.' };
HAZARDS['cart wedge'] = { severity:1, text:'One blocked lane starts multiplying bad options.' };
HAZARDS['archive smoke'] = { severity:2, text:'Knowledge and breath become hard to separate.' };
HAZARDS['shelf collapse'] = { severity:2, text:'Stored order becomes blunt falling weight.' };
HAZARDS['ink flare'] = { severity:1, text:'The tools of study can still make a mess worth fearing.' };
HAZARDS['tide undertow'] = { severity:3, text:'The quay edge only looks stable until the water decides otherwise.' };
HAZARDS['bellhouse fall'] = { severity:2, text:'Public warning structures still fail like any other built thing.' };
PLOT_FAMILIES.allotment_fraud = { title:'Allotment Fraud', objective:'Find who profits when heat, metal, and duty no longer match the record.', stage2:'ashforge_supply_lift' };
PLOT_FAMILIES.slag_diversion = { title:'Slag Diversion', objective:'Trace what is being siphoned from forge waste and who needs it hidden.', stage2:'guildheart_causeway' };
PLOT_FAMILIES.forge_sabotage = { title:'Forge Sabotage', objective:'Stop a break that could be accident, politics, or planned scarcity.', stage2:'ashforge_supply_lift' };
PLOT_FAMILIES.relay_falsification = { title:'Relay Falsification', objective:'Expose who is redirecting value through contract language before the loss hardens into precedent.', stage2:'guildheart_causeway' };
PLOT_FAMILIES.guild_sabotage = { title:'Guild Sabotage', objective:'Work out whether the missing relay capacity is theft, pressure, or a controlled choke point.', stage2:'cosmoria_sealane' };
PLOT_FAMILIES.arbitration_capture = { title:'Arbitration Capture', objective:'Stop a dispute bench from becoming a private weapon.', stage2:'guildheart_causeway' };
PLOT_FAMILIES.tariff_leak = { title:'Tariff Leak', objective:'Decide whether dangerous knowledge should stay priced, hidden, or free.', stage2:'mimolot_toll_road' };
PLOT_FAMILIES.sealed_syllabus_dispute = { title:'Sealed Syllabus Dispute', objective:'Find who altered the teaching line before the wrong minds build the wrong tool.', stage2:'mimolot_toll_road' };
PLOT_FAMILIES.restricted_proof_circulation = { title:'Restricted Proof Circulation', objective:'Stop a proof chain from turning scholarship into leverage and panic.', stage2:'cosmoria_sealane' };
PLOT_FAMILIES.manifest_ghosting = { title:'Manifest Ghosting', objective:'Track loads that exist in ledgers but not on the visible quay.', stage2:'cosmoria_sealane' };
PLOT_FAMILIES.quay_archive_theft = { title:'Quay Archive Theft', objective:'Recover what was taken before tide and trade hide the trail.', stage2:'river_archive_causeway' };
PLOT_FAMILIES.bellhouse_coverup = { title:'Bellhouse Coverup', objective:'Learn who silenced the warning structure and why the silence was worth the risk.', stage2:'cosmoria_sealane' };
ROUTE_FAMILIES.ashforge_supply_lift = { stage3:'forge_pressure_chain', stage4:'allotment_collapse' };
ROUTE_FAMILIES.guildheart_causeway = { stage3:'contract_capture', stage4:'union_switch_crisis' };
ROUTE_FAMILIES.mimolot_toll_road = { stage3:'scholar_tariff_conflict', stage4:'knowledge_lockbreak' };
ROUTE_FAMILIES.cosmoria_sealane = { stage3:'manifest_war', stage4:'quay_archive_shock' };
BACKGROUNDS.knight = [
  { id:'forge_oath_guard', name:'Forge Oath Guard', locality:'ashforge_citadel', stage1Plot:'allotment_fraud', theme:'duty under heat and oath' },
  { id:'slag_wall_keeper', name:'Slag Wall Keeper', locality:'ashforge_citadel', stage1Plot:'slag_diversion', theme:'hold the line where waste becomes leverage' },
  { id:'blast_gate_defender', name:'Blast Gate Defender', locality:'ashforge_citadel', stage1Plot:'forge_sabotage', theme:'discipline under industrial violence' }
];
BACKGROUNDS.wizard = [
  { id:'licensed_analytician', name:'Licensed Analytician', locality:'mimolot_academy', stage1Plot:'tariff_leak', theme:'knowledge priced and watched' },
  { id:'sealed_curriculum_reader', name:'Sealed Curriculum Reader', locality:'mimolot_academy', stage1Plot:'sealed_syllabus_dispute', theme:'study under restriction' },
  { id:'proof_chain_auditor', name:'Proof Chain Auditor', locality:'mimolot_academy', stage1Plot:'restricted_proof_circulation', theme:'danger hidden in elegant logic' }
];
BACKGROUNDS.scout = [
  { id:'relay_lane_runner', name:'Relay Lane Runner', locality:'guildheart_hub', stage1Plot:'relay_falsification', theme:'speed through agreements and choke points' },
  { id:'switchyard_shadow', name:'Switchyard Shadow', locality:'guildheart_hub', stage1Plot:'guild_sabotage', theme:'what moves matters more than who talks' },
  { id:'bench_watch_interceptor', name:'Bench Watch Interceptor', locality:'guildheart_hub', stage1Plot:'arbitration_capture', theme:'catch the turn before law becomes a private weapon' }
];
BACKGROUNDS.alchemist = [
  { id:'manifest_salter', name:'Manifest Salter', locality:'cosmoria', stage1Plot:'manifest_ghosting', theme:'material truth hidden in working docks' },
  { id:'quay_archive_restorer', name:'Quay Archive Restorer', locality:'cosmoria', stage1Plot:'quay_archive_theft', theme:'salvage what salt and trade would erase' },
  { id:'bellhouse_compound_keeper', name:'Bellhouse Compound Keeper', locality:'cosmoria', stage1Plot:'bellhouse_coverup', theme:'warning systems are chemistry with consequences' }
];
['knight','wizard','scout','alchemist'].forEach(arch => {
  BACKGROUNDS[arch].forEach(bg => {
    BACKGROUND_ROUTE_SIGNATURES[bg.id] = {
      backgroundId:bg.id,
      originLocality:bg.locality,
      stage1PlotId:bg.stage1Plot,
      stage2Vector:PLOT_FAMILIES[bg.stage1Plot].stage2,
      stage3Family:ROUTE_FAMILIES[PLOT_FAMILIES[bg.stage1Plot].stage2].stage3,
      stage4Family:ROUTE_FAMILIES[PLOT_FAMILIES[bg.stage1Plot].stage2].stage4,
      stage5Family:(arch === 'wizard' ? 'axis_trial' : 'world_scar'),
      failureTheme:bg.theme,
      legendaryTags:[bg.locality,arch,bg.theme]
    };
  });
});


// ----- Batch 4 expansion -----
ARCHETYPES.paladin = { name:'Paladin', family:'Classic Combat', focus:'persuasion', ability:'Judgment Line', empowerText:'The threat hesitates when conviction arrives wearing armor instead of argument.' };
ARCHETYPES.illusionist = { name:'Illusionist', family:'Magic & Spellcasting', focus:'stealth', ability:'Veil Thread', empowerText:'Attention bends around the shape you choose and people only realize it after the choice is over.' };
ARCHETYPES.thief = { name:'Thief', family:'Stealth & Precision', focus:'stealth', ability:'Quick Lift', empowerText:'Locks, ledgers, and guarded habits stop looking secure once your hands understand their rhythm.' };
ARCHETYPES.engineer = { name:'Engineer', family:'Support & Leadership', focus:'craft', ability:'Load Bearing Insight', empowerText:'Strain, structure, and failure all start announcing themselves before other people see the danger.' };

LOCALITIES.ithtananalor = {
  name:'Ithtananalor', polity:'Principality of Roaz', region:'Principality of Roaz',
  identity:'Austere Roaz city of law, foundries, tribunal logic, prison labor systems, and hard administrative command.',
  approach:'Austere walls, disciplined checkpoints, industrial silhouettes, and stern tower forms announce a city built for law and production.',
  inside:'Fortresses, foundries, tribunal rooms, prison-labor systems, ration kitchens, and command offices set the civic rhythm.',
  whoBelongs:['inspectors','foundry crews','clerks','tribunal staff'], whoOut:['aimless petitioners','unsealed smugglers'],
  expected:['direct acknowledgment and role-first introductions','respect for civic-religious spaces without spectacle'],
  power:['tribunal authorities','foundry command'], economy:['foundry output','quarry traffic','filing and inspection work'],
  faith:'quiet respect in civic shrines matters, but discipline carries more public weight than display.',
  pressure:['movement restriction order','foundry allotment discrepancy','detention ledger omission'],
  greetings:['direct role-first acknowledgement','short nod once rank or duty is clear'],
  rituals:['small oil lights near shift shrines','brief silent respect before tribunal thresholds'],
  locals:['inspectors','market clerks','shrine attendants'], safeZone:'Tribunal infirmary annex',
  adjacent:['ithtananalor_ironhold_quarry_road','ithtananalor_silent_haven_convoy_lane'],
  hazards:['foundry vent burst','quarry chain snap','checkpoint crush'], creatures:['ash kennel hounds','slag-fed tunnel gnashers'],
  companion:{ id:'serro_vane', name:'Serro Vane', role:'tribunal field clerk', recruitAt:'stage1' }
};
LOCALITIES.shirshal = {
  name:'Shirshal', polity:'House Shirsh', region:'House Shirsh',
  identity:'Investigative city of cases, witness courts, magical anomaly review, and guarded civic curiosity.',
  approach:'Arcane scrutiny and guarded curiosity meet the road before the first proper threshold opens into the city.',
  inside:'Witness courts, evidence vaults, sealed case halls, metal stamps, ward ash, and rain-dark stone drive the everyday tempo.',
  whoBelongs:['case clerks','witness handlers','investigators','wardens'], whoOut:['evasive drifters','reckless spell peddlers'],
  expected:['polite but probing introductions','compliance with truth-seeking procedure in public spaces'],
  power:['witness courts','magi-magistratus offices'], economy:['case review','evidence handling','licensed anomaly work'],
  faith:'public ritual gives way to procedure quickly, though shrine observance persists at the edges of official work.',
  pressure:['evidence seal breach','witness disappearance','anomaly report suppression'],
  greetings:['polite but probing introductions','measured pause before names are accepted'],
  rituals:['inked seals renewed at dawn','ward ash lines checked before vault doors open'],
  locals:['market clerks','shrine attendants','innkeepers'], safeZone:'Witness court recovery room',
  adjacent:['shirshal_crystal_grove_route'],
  hazards:['ward burnback','evidence vault spill','crowd panic around a public accusation'], creatures:['case-fed shades','crystal grove stalkers'],
  companion:{ id:'oris_quill', name:'Oris Quill', role:'witness courier', recruitAt:'stage1' }
};
LOCALITIES.soreheim_proper = {
  name:'Soreheim Proper', polity:'Soreheim Alliance', region:'Soreheim Alliance',
  identity:'Titan-tower metropolis of volcanic industry, quotas, workshops, arsenals, delegations, and contribution-ranked life.',
  approach:'Multiple colossal Titan Towers rise across volcanic industry, bridged by heat-hazed logistics and treaty traffic.',
  inside:'Tower-bases burn with magma forges, mid-levels pulse with workshops and arsenals, and upper crowns hold governance chambers, observatories, archives, and foreign delegations.',
  whoBelongs:['haulers','planners','forge crews','delegation staff'], whoOut:['idle drifters','unassigned opportunists'],
  expected:['status established through contribution and assignment','rites tied to work, unity, and retribution rather than ornament'],
  power:['tower councils','industrial planning offices'], economy:['magma forging','freight allocation','repair cycles','quota labor'],
  faith:'rites of work, ambition, unity, and retribution ride alongside practical contribution culture.',
  pressure:['tower quota dispute','freight route undercount','planning office omission'],
  greetings:['status-first contribution greeting','assignment repeated before ease'],
  rituals:['communal meal rites before shifts','small industrial blessing marks at tool cages'],
  locals:['market clerks','shrine attendants','innkeepers'], safeZone:'Tower-base communal infirmary',
  adjacent:['soreheim_proper_eternal_lands_freight_route','soreheim_proper_ironroot_crossing'],
  hazards:['magma vent surge','freight lift failure','arsenal flashback'], creatures:['slag carrion wolves','tower scavenger drakes'],
  companion:{ id:'dren_vol', name:'Dren Vol', role:'tower maintenance runner', recruitAt:'stage1' }
};
LOCALITIES.zootian_expanse = {
  name:'Zootian Expanse', polity:'House Zootia', region:'House Zootia',
  identity:'Open agrarian expanse of herding, grain tallies, animal welfare, roadside shrines, and season-bound export pressure.',
  approach:'Wide lanes, fenced pasture, wagon dust, grain towers, and roadside shrines stretch under practical weather-reading eyes.',
  inside:'Farm courts, shearing sheds, tally boards, stable heat, and repair yards keep daily life moving by season and shipment.',
  whoBelongs:['herders','tally clerks','wagon hands','stable workers'], whoOut:['wasteful brokers','violent raiders'],
  expected:['work and weather as first topics','practical gratitude at roadside shrines'],
  power:['harvest measures board','large family holdings'], economy:['herding','grain','wool','raw goods export'],
  faith:'renewal customs matter in household and roadside shrines more than ornate public display.',
  pressure:['yield shortfall whisper','shipment priority dispute','herd sickness rumor'],
  greetings:['weather-first greeting','brief nod once labor is understood'],
  rituals:['grain pinch at shrine stones','short thanks before first herd movement'],
  locals:['innkeepers','clerks','shrine attendants'], safeZone:'Roadhouse loft infirmary',
  adjacent:[],
  hazards:['stampede break','granary dust flare','mud road collapse'], creatures:['field tuskers','long-limbed herd stalkers'],
  companion:{ id:'sael_turn', name:'Sael Turn', role:'wagon tally runner', recruitAt:'stage1' }
};
ROUTE_NAMES.ithtananalor_ironhold_quarry_road = 'Ithtananalor Ironhold Quarry Road';
ROUTE_NAMES.ithtananalor_silent_haven_convoy_lane = 'Ithtananalor Silent Haven Convoy Lane';
ROUTE_NAMES.shirshal_crystal_grove_route = 'Shirshal Crystal Grove Route';
ROUTE_NAMES.soreheim_proper_eternal_lands_freight_route = 'Soreheim Proper Eternal Lands Freight Route';
ROUTE_NAMES.soreheim_proper_ironroot_crossing = 'Soreheim Proper Ironroot Crossing';
BESTIARY['ash kennel hounds'] = { hp:13, attack:4, text:'Roaz hounds bred to track ash, oil, and fear along controlled lanes.' };
BESTIARY['slag-fed tunnel gnashers'] = { hp:14, attack:4, text:'Burrowing foundry scavengers that rise where heat and waste collect.' };
BESTIARY['case-fed shades'] = { hp:12, attack:4, text:'Thin anomaly-adjacent shades drawn to sealed evidence and public fear.' };
BESTIARY['crystal grove stalkers'] = { hp:14, attack:4, text:'Sharp-moving route predators whose presence haunts witness roads.' };
BESTIARY['slag carrion wolves'] = { hp:15, attack:5, text:'Hard-muscled scavengers that survive at the margins of industrial plenty.' };
BESTIARY['tower scavenger drakes'] = { hp:16, attack:5, text:'Lean drakes that test freight heights and exposed lift lines.' };
BESTIARY['field tuskers'] = { hp:13, attack:4, text:'Heavy-bodied wild stock-breakers that smash weak lanes and frightened herds.' };
BESTIARY['long-limbed herd stalkers'] = { hp:14, attack:4, text:'Night-lane hunters that shadow vulnerable livestock movement.' };
HAZARDS['foundry vent burst'] = { severity:2, text:'Heat, ash, and metal breath out where control slips for a second.' };
HAZARDS['quarry chain snap'] = { severity:2, text:'Load and gravity stop negotiating all at once.' };
HAZARDS['checkpoint crush'] = { severity:1, text:'Crowded control points make bodies part of the machinery.' };
HAZARDS['ward burnback'] = { severity:2, text:'Protective work turns on the people who trusted it.' };
HAZARDS['evidence vault spill'] = { severity:2, text:'Stored danger escapes classification and becomes public risk.' };
HAZARDS['crowd panic around a public accusation'] = { severity:1, text:'A spoken charge can become a civic hazard before proof arrives.' };
HAZARDS['magma vent surge'] = { severity:3, text:'The ground below industrial order remembers that it is alive.' };
HAZARDS['freight lift failure'] = { severity:2, text:'Vertical logistics become a falling argument.' };
HAZARDS['arsenal flashback'] = { severity:3, text:'Stored war-material proves it still wants to behave like war.' };
HAZARDS['stampede break'] = { severity:2, text:'Mass and panic choose direction faster than people do.' };
HAZARDS['granary dust flare'] = { severity:2, text:'Dry plenty becomes instant threat when heat meets carelessness.' };
HAZARDS['mud road collapse'] = { severity:1, text:'The road simply stops agreeing to be a road.' };
PLOT_FAMILIES.tribunal_motion_order = { title:'Tribunal Motion Order', objective:'Discover who benefits when movement restriction quietly changes the law on the street.', stage2:'ithtananalor_ironhold_quarry_road' };
PLOT_FAMILIES.foundry_allotment_discrepancy = { title:'Foundry Allotment Discrepancy', objective:'Prove who is stealing heat, metal, or duty from the count before the shortage becomes doctrine.', stage2:'ithtananalor_silent_haven_convoy_lane' };
PLOT_FAMILIES.detention_ledger_omission = { title:'Detention Ledger Omission', objective:'Find who vanished from the official line and why the omission had institutional protection.', stage2:'ithtananalor_silent_haven_convoy_lane' };
PLOT_FAMILIES.evidence_seal_breach = { title:'Evidence Seal Breach', objective:'Work out what was altered in custody before the case itself changes shape.', stage2:'shirshal_crystal_grove_route' };
PLOT_FAMILIES.witness_disappearance = { title:'Witness Disappearance', objective:'Follow the silence around a missing witness before rumor becomes verdict.', stage2:'shirshal_crystal_grove_route' };
PLOT_FAMILIES.anomaly_report_suppression = { title:'Anomaly Report Suppression', objective:'Decide whether the hidden report protects the public or only the people already in power.', stage2:'shirshal_crystal_grove_route' };
PLOT_FAMILIES.tower_quota_dispute = { title:'Tower Quota Dispute', objective:'Settle whose contribution counts when the tower asks more than survival can spare.', stage2:'soreheim_proper_eternal_lands_freight_route' };
PLOT_FAMILIES.freight_route_undercount = { title:'Freight Route Undercount', objective:'Trace which loads are being thinned from the tally before the wrong districts pay the price.', stage2:'soreheim_proper_ironroot_crossing' };
PLOT_FAMILIES.planning_office_omission = { title:'Planning Office Omission', objective:'Expose the plan hidden inside a missing line of paperwork before it hardens into policy.', stage2:'soreheim_proper_eternal_lands_freight_route' };
ROUTE_FAMILIES.ithtananalor_ironhold_quarry_road = { stage3:'quarry_jurisdiction', stage4:'roaz_iron_decree' };
ROUTE_FAMILIES.ithtananalor_silent_haven_convoy_lane = { stage3:'convoy_blackbook', stage4:'detention_state_exposure' };
ROUTE_FAMILIES.shirshal_crystal_grove_route = { stage3:'anomaly_chain', stage4:'witness_truth_reckoning' };
ROUTE_FAMILIES.soreheim_proper_eternal_lands_freight_route = { stage3:'titan_supply_fracture', stage4:'contribution_crisis' };
ROUTE_FAMILIES.soreheim_proper_ironroot_crossing = { stage3:'treaty_lane_pressure', stage4:'alliance_heat_war' };
BACKGROUNDS.paladin = [
  { id:'tribunal_vow_warden', name:'Tribunal Vow Warden', locality:'ithtananalor', stage1Plot:'tribunal_motion_order', theme:'law must remain legible under pressure' },
  { id:'allotment_oath_keeper', name:'Allotment Oath Keeper', locality:'ithtananalor', stage1Plot:'foundry_allotment_discrepancy', theme:'duty means correcting the count before force decides it' },
  { id:'ledger_mercy_guard', name:'Ledger Mercy Guard', locality:'ithtananalor', stage1Plot:'detention_ledger_omission', theme:'order without memory becomes sanctioned harm' }
];
BACKGROUNDS.illusionist = [
  { id:'sealed_testimony_adept', name:'Sealed Testimony Adept', locality:'shirshal', stage1Plot:'evidence_seal_breach', theme:'truth shifts where appearance is trusted too easily' },
  { id:'witness_shadow_reader', name:'Witness Shadow Reader', locality:'shirshal', stage1Plot:'witness_disappearance', theme:'absence can be staged as carefully as presence' },
  { id:'anomaly_mask_keeper', name:'Anomaly Mask Keeper', locality:'shirshal', stage1Plot:'anomaly_report_suppression', theme:'the right lie can look like procedure until someone tests it' }
];
BACKGROUNDS.thief = [
  { id:'casefile_lifter', name:'Casefile Lifter', locality:'shirshal', stage1Plot:'evidence_seal_breach', theme:'what the vault hides can still be moved by careful hands' },
  { id:'witness_lane_picker', name:'Witness Lane Picker', locality:'shirshal', stage1Plot:'witness_disappearance', theme:'routes to people are easier to steal than the people themselves' },
  { id:'report_runner', name:'Report Runner', locality:'shirshal', stage1Plot:'anomaly_report_suppression', theme:'bad news moves quietly until profit decides otherwise' }
];
BACKGROUNDS.engineer = [
  { id:'tower_load_auditor', name:'Tower Load Auditor', locality:'soreheim_proper', stage1Plot:'tower_quota_dispute', theme:'pressure is just hidden structure made visible' },
  { id:'freight_lift_mechanist', name:'Freight Lift Mechanist', locality:'soreheim_proper', stage1Plot:'freight_route_undercount', theme:'every missing load teaches where the machine is lying' },
  { id:'planning_grid_repairer', name:'Planning Grid Repairer', locality:'soreheim_proper', stage1Plot:'planning_office_omission', theme:'systems fail twice when the plan and the tool disagree' }
];
['paladin','illusionist','thief','engineer'].forEach(arch => {
  BACKGROUNDS[arch].forEach(bg => {
    BACKGROUND_ROUTE_SIGNATURES[bg.id] = {
      backgroundId:bg.id,
      originLocality:bg.locality,
      stage1PlotId:bg.stage1Plot,
      stage2Vector:PLOT_FAMILIES[bg.stage1Plot].stage2,
      stage3Family:ROUTE_FAMILIES[PLOT_FAMILIES[bg.stage1Plot].stage2].stage3,
      stage4Family:ROUTE_FAMILIES[PLOT_FAMILIES[bg.stage1Plot].stage2].stage4,
      stage5Family:(arch === 'paladin' ? 'containment' : arch === 'illusionist' ? 'axis_trial' : arch === 'engineer' ? 'world_scar' : 'exposure'),
      failureTheme:bg.theme,
      legendaryTags:[bg.locality,arch,bg.theme]
    };
  });
});


// ----- Batch 5 expansion -----
ARCHETYPES.berserker = { name:'Berserker', family:'Classic Combat', focus:'combat', ability:'Red Wake', empowerText:'What used to be a desperate surge now lands like deliberate dominance.' };
ARCHETYPES.cleric = { name:'Cleric', family:'Magic & Spellcasting', focus:'persuasion', ability:'Grave Ward', empowerText:'Ritual authority now arrives with enough force to quiet panic and opposition alike.' };
ARCHETYPES.spellthief = { name:'Spellthief', family:'Stealth & Precision', focus:'stealth', ability:'Borrowed Sigil', empowerText:'Protected work and sealed craft no longer feel untouchable once your hands enter the problem.' };
ARCHETYPES.saint = { name:'Saint', family:'Support & Leadership', focus:'persuasion', ability:'Mercy Standard', empowerText:'People stop hearing hope as softness once they have seen what it can command.' };

LOCALITIES.ironroot_crossing = {
  name:'Ironroot Crossing', polity:'Soreheim Alliance', region:'Soreheim Alliance',
  identity:'A hard freight junction where treaty lanes, tower allotments, repair crews, and armed haulers grind against one another.',
  approach:'Freight gantries, slag-dark ballast, chained liftposts, and the endless noise of redirected loads turn the approach into a warning before it becomes an address.',
  inside:'Switchyards, ration kettles, brake crews, axle sheds, and treaty counters divide the place into working claims rather than pleasant streets.',
  whoBelongs:['haulers','switch clerks','repair crews','treaty officers'], whoOut:['idle drifters','unassigned loiterers'],
  expected:['declare purpose quickly','do not block freight decisions with ornament'],
  power:['junction foremen','treaty counters'], economy:['freight transfer','axle repair','quota routing','heavy storage'],
  faith:'small rites of endurance and work cling to gantries and tool lockers rather than formal plazas.',
  pressure:['switch sabotage','missing brake allotment','treaty-lane extortion'],
  greetings:['assignment-first greeting','jaw tilt once load and purpose are clear'],
  rituals:['oil marks on brake housings before shift','shared heat-cup pause before dangerous transfer work'],
  locals:['haulers','switch clerks','repairers'], safeZone:'Junction aid berth',
  adjacent:['ironroot_crossing_blackhaul_lane','soreheim_proper_ironroot_crossing'],
  hazards:['runaway freight sled','gantry cable whip','axle fire'], creatures:['yard maulers','cable-climb drakes'],
  companion:{ id:'maro_steelvein', name:'Maro Steelvein', role:'junction brake runner', recruitAt:'stage1' }
};
LOCALITIES.sanctum_sands = {
  name:'Sanctum Sands', polity:'Principality of Panim', region:'Principality of Panim',
  identity:'A memorial-road settlement of shrine halts, body caravans, ash courtyards, and rites that hold grief in public order.',
  approach:'Wind-worn markers, ash basins, lamp racks, and carriage tracks announce a place built to receive the dead without losing the living to disorder.',
  inside:'Procession courts, body-rest houses, memorial stalls, ledger alcoves, and priestly thresholds create a civic hush broken only by labor and lament.',
  whoBelongs:['memorial couriers','ash clerks','procession guards','rite keepers'], whoOut:['grave opportunists','disruptive traders'],
  expected:['respect movement of the dead','do not interrupt spoken names or counted offerings'],
  power:['memorial houses','procession offices'], economy:['burial traffic','ash goods','lamp trade','ritual labor'],
  faith:'the place runs on repeated acts of passage, naming, release, and supervised remembrance.',
  pressure:['missing body seal','lamp line theft','false mourning extortion'],
  greetings:['quiet brow touch near body lines','soft blessing passed between workers in motion'],
  rituals:['sand circles renewed at threshold stones','ash poured in measured lines before processions restart'],
  locals:['couriers','clerks','rite keepers'], safeZone:'Memorial ward chamber',
  adjacent:['sanctum_sands_lantern_road','sanctum_sands_memorial_road'],
  hazards:['procession crush','ash lung flare','lamp oil slipfire'], creatures:['gravewind feeders','lament shades'],
  companion:{ id:'isha_namebearer', name:'Isha Namebearer', role:'procession registrar', recruitAt:'stage1' }
};
LOCALITIES.whitebridge_threshold = {
  name:'Whitebridge Threshold', polity:'Sheresh Communes', region:'Sheresh Communes',
  identity:'A sealed threshold settlement where domeway control, containment rites, weather reading, and passing identities are all treated as survival concerns.',
  approach:'Bridge ribs, seal lights, frost-lashed intake towers, and warning glyphs make the threshold feel more like a decision than a town.',
  inside:'Seal checks, passage benches, ration windows, repair cages, and ward posts keep the settlement alive by refusing carelessness.',
  whoBelongs:['seal wardens','bridge crews','ration clerks','weather readers'], whoOut:['unsealed wanderers','reckless traders'],
  expected:['respect seal procedure','do not treat containment marks as decoration'],
  power:['threshold wardens','bridge steward office'], economy:['passage control','repair work','ration issue','weather report trade'],
  faith:'protective observance and survival ritual overlap until neither can be separated from routine.',
  pressure:['seal fraud','weather report tampering','crossing denial bribery'],
  greetings:['gloved seal-touch at the chest','counted acknowledgment before names are exchanged'],
  rituals:['bridge glyphs checked before shift release','heat stones circled before nightwatch takes over'],
  locals:['wardens','bridge crews','ration clerks'], safeZone:'Threshold recovery berth',
  adjacent:['whitebridge_threshold_sealway','whitebridge_domeway'],
  hazards:['bridge icing collapse','seal flareback','frost queue crush'], creatures:['whitebridge lurkers','seal-eating skimmers'],
  companion:{ id:'elen_frostmark', name:'Elen Frostmark', role:'sealway runner', recruitAt:'stage1' }
};
LOCALITIES.river_archive_causeway = {
  name:'River Archive Causeway', polity:'Principality of Cosmouth', region:'Principality of Cosmouth',
  identity:'A layered causeway of water-led archives, cargo records, toll craft, and shrine alcoves where memory moves with trade.',
  approach:'Stone quays, rope towers, archive shutters, low shrine lights, and waterlogged record houses line the causeway before the inner offices open.',
  inside:'Causeway counters, quay ledgers, sealed alcoves, archive barges, toll piers, and record baths divide the place into moving memory and priced passage.',
  whoBelongs:['quay archivists','barge clerks','toll readers','seal keepers'], whoOut:['careless smugglers','record vandals'],
  expected:['keep hands visible near ledgers','respect water rites and record custody'],
  power:['archive factors','toll seal houses'], economy:['record custody','sealane tolls','barge traffic','archival recovery'],
  faith:'small river rites, memory offerings, and passage customs are visible at nearly every turn without dominating the work.',
  pressure:['manifest washout','barge undercount','archive seal dispute'],
  greetings:['short ledger salute','two-finger knock near sealed counters'],
  rituals:['water drops touched to archive lintels','brief spoken names before damaged records are opened'],
  locals:['archivists','barge clerks','toll readers'], safeZone:'Causeway record infirmary',
  adjacent:['river_archive_causeway_eastwater_route','river_archive_causeway'],
  hazards:['quay slick plunge','archive mold flare','barge rope snap'], creatures:['waterline scavengers','ledger eels'],
  companion:{ id:'pel_orrin', name:'Pel Orrin', role:'quay record runner', recruitAt:'stage1' }
};
ROUTE_NAMES.ironroot_crossing_blackhaul_lane = 'Ironroot Crossing Blackhaul Lane';
ROUTE_NAMES.sanctum_sands_lantern_road = 'Sanctum Sands Lantern Road';
ROUTE_NAMES.whitebridge_threshold_sealway = 'Whitebridge Threshold Sealway';
ROUTE_NAMES.river_archive_causeway_eastwater_route = 'River Archive Causeway Eastwater Route';
BESTIARY['yard maulers'] = { hp:15, attack:5, text:'Heavy scavengers drawn to meat, oil, and weakened freight lines.' };
BESTIARY['cable-climb drakes'] = { hp:16, attack:5, text:'Lean junction predators that use gantries and cable runs like hunting paths.' };
BESTIARY['gravewind feeders'] = { hp:14, attack:4, text:'Sand-blown carrion feeders that follow memorial traffic and exposed ash.' };
BESTIARY['lament shades'] = { hp:13, attack:4, text:'Thin, grief-fed shades that gather where passage rites are broken or delayed.' };
BESTIARY['whitebridge lurkers'] = { hp:15, attack:5, text:'Cold-adapted threshold predators that test seal edges and panicked queues.' };
BESTIARY['seal-eating skimmers'] = { hp:14, attack:4, text:'Restless edge-creatures drawn to unstable wards and warming seams.' };
BESTIARY['waterline scavengers'] = { hp:13, attack:4, text:'Causeway scavengers that surface where record waste and food scraps meet.' };
BESTIARY['ledger eels'] = { hp:12, attack:4, text:'Slim biting things that infest flooded record baths and rotting quay hollows.' };
HAZARDS['runaway freight sled'] = { severity:2, text:'Momentum and cargo agree to stop listening to human judgment.' };
HAZARDS['gantry cable whip'] = { severity:2, text:'A single failure turns suspended weight into a blind striking line.' };
HAZARDS['axle fire'] = { severity:2, text:'Friction becomes flame faster than workers can clear the lane.' };
HAZARDS['procession crush'] = { severity:2, text:'Respectful order becomes lethal compression when passage narrows at the wrong moment.' };
HAZARDS['ash lung flare'] = { severity:1, text:'Ritual dust and careless wind turn breath into weakness.' };
HAZARDS['lamp oil slipfire'] = { severity:2, text:'Spilled memorial oil turns reverence into immediate danger.' };
HAZARDS['bridge icing collapse'] = { severity:2, text:'The threshold gives way where cold, load, and hurry agree.' };
HAZARDS['seal flareback'] = { severity:2, text:'Protective work lashes the wrong body when stress outruns care.' };
HAZARDS['frost queue crush'] = { severity:1, text:'Fear and exposure compress bodies into hazard before the crossing even begins.' };
HAZARDS['quay slick plunge'] = { severity:1, text:'One bad step and the causeway decides whether you return at all.' };
HAZARDS['archive mold flare'] = { severity:2, text:'Wet decay turns records, lungs, and visibility against each other.' };
HAZARDS['barge rope snap'] = { severity:2, text:'Tension stored in wet fiber becomes a striking line of chaos.' };
PLOT_FAMILIES.switch_sabotage = { title:'Switch Sabotage', objective:'Find who wants the crossing to fail before freight violence becomes accepted cost.', stage2:'ironroot_crossing_blackhaul_lane' };
PLOT_FAMILIES.missing_brake_allotment = { title:'Missing Brake Allotment', objective:'Trace where the missing safety allotment went before the next convoy pays in bodies.', stage2:'ironroot_crossing_blackhaul_lane' };
PLOT_FAMILIES.treaty_lane_extortion = { title:'Treaty Lane Extortion', objective:'Break the quiet extortion before official scarcity makes it legitimate.', stage2:'soreheim_proper_ironroot_crossing' };
PLOT_FAMILIES.missing_body_seal = { title:'Missing Body Seal', objective:'Recover the missing seal before dignity, custody, and trade all collapse together.', stage2:'sanctum_sands_lantern_road' };
PLOT_FAMILIES.lamp_line_theft = { title:'Lamp Line Theft', objective:'Stop the theft chain without darkening the memorial road itself.', stage2:'sanctum_sands_memorial_road' };
PLOT_FAMILIES.false_mourning_extortion = { title:'False Mourning Extortion', objective:'Expose the exploit before grief becomes a tax on the powerless.', stage2:'sanctum_sands_lantern_road' };
PLOT_FAMILIES.seal_fraud = { title:'Seal Fraud', objective:'Prove which crossing marks are false before the threshold starts killing on trust alone.', stage2:'whitebridge_threshold_sealway' };
PLOT_FAMILIES.weather_report_tampering = { title:'Weather Report Tampering', objective:'Find who profits when the wrong weather becomes public truth.', stage2:'whitebridge_threshold_sealway' };
PLOT_FAMILIES.crossing_denial_bribery = { title:'Crossing Denial Bribery', objective:'Untangle which people are being kept out and who profits from the delay.', stage2:'whitebridge_domeway' };
PLOT_FAMILIES.manifest_washout = { title:'Manifest Washout', objective:'Decide whether the lost record was accident, weather, or profit-driven erasure.', stage2:'river_archive_causeway_eastwater_route' };
PLOT_FAMILIES.barge_undercount = { title:'Barge Undercount', objective:'Follow the mismatch between counted cargo and moving cargo before the loss becomes custom.', stage2:'river_archive_causeway_eastwater_route' };
PLOT_FAMILIES.archive_seal_dispute = { title:'Archive Seal Dispute', objective:'Determine whether the wrong seal protects the public or only protects the thief.', stage2:'river_archive_causeway' };
ROUTE_FAMILIES.ironroot_crossing_blackhaul_lane = { stage3:'junction_blackmarket', stage4:'freight_break_state' };
ROUTE_FAMILIES.sanctum_sands_lantern_road = { stage3:'memorial_tithe_shadow', stage4:'panim_passage_reckoning' };
ROUTE_FAMILIES.whitebridge_threshold_sealway = { stage3:'sealway_schism', stage4:'commune_boundary_crisis' };
ROUTE_FAMILIES.river_archive_causeway_eastwater_route = { stage3:'record_current_war', stage4:'cosmouth_memory_shock' };
BACKGROUNDS.berserker = [
  { id:'blackhaul_breaker', name:'Blackhaul Breaker', locality:'ironroot_crossing', stage1Plot:'switch_sabotage', theme:'force earns meaning only when it keeps the lane alive' },
  { id:'brake_line_enforcer', name:'Brake Line Enforcer', locality:'ironroot_crossing', stage1Plot:'missing_brake_allotment', theme:'rage becomes discipline when lives depend on it' },
  { id:'treaty_chain_smasher', name:'Treaty Chain Smasher', locality:'ironroot_crossing', stage1Plot:'treaty_lane_extortion', theme:'fear respects strength once strength chooses a side' }
];
BACKGROUNDS.cleric = [
  { id:'seal_chamber_cleric', name:'Seal Chamber Cleric', locality:'sanctum_sands', stage1Plot:'missing_body_seal', theme:'sacred custody fails the living when procedure forgets mercy' },
  { id:'lantern_rite_cleric', name:'Lantern Rite Cleric', locality:'sanctum_sands', stage1Plot:'lamp_line_theft', theme:'light and passage both demand honest hands' },
  { id:'mourning_due_cleric', name:'Mourning Due Cleric', locality:'sanctum_sands', stage1Plot:'false_mourning_extortion', theme:'comfort turned into profit must be broken in public' }
];
BACKGROUNDS.spellthief = [
  { id:'sealway_sigil_lifter', name:'Sealway Sigil Lifter', locality:'whitebridge_threshold', stage1Plot:'seal_fraud', theme:'protected marks matter less once their pattern is known' },
  { id:'forecast_cipher_cutter', name:'Forecast Cipher Cutter', locality:'whitebridge_threshold', stage1Plot:'weather_report_tampering', theme:'truth stolen from the cold still cuts like weather' },
  { id:'crossing_mark_thief', name:'Crossing Mark Thief', locality:'whitebridge_threshold', stage1Plot:'crossing_denial_bribery', theme:'permission is just another lock until someone learns its teeth' }
];
BACKGROUNDS.saint = [
  { id:'causeway_mercy_bearer', name:'Causeway Mercy Bearer', locality:'river_archive_causeway', stage1Plot:'manifest_washout', theme:'memory and mercy both fail when loss becomes ordinary' },
  { id:'eastwater_record_saint', name:'Eastwater Record Saint', locality:'river_archive_causeway', stage1Plot:'barge_undercount', theme:'the weak pay first when counts become fiction' },
  { id:'sealhouse_peacemaker', name:'Sealhouse Peacemaker', locality:'river_archive_causeway', stage1Plot:'archive_seal_dispute', theme:'peace must sometimes be forced through truth before it can heal anyone' }
];
['berserker','cleric','spellthief','saint'].forEach(arch => {
  BACKGROUNDS[arch].forEach(bg => {
    BACKGROUND_ROUTE_SIGNATURES[bg.id] = {
      backgroundId:bg.id,
      originLocality:bg.locality,
      stage1PlotId:bg.stage1Plot,
      stage2Vector:PLOT_FAMILIES[bg.stage1Plot].stage2,
      stage3Family:ROUTE_FAMILIES[PLOT_FAMILIES[bg.stage1Plot].stage2].stage3,
      stage4Family:ROUTE_FAMILIES[PLOT_FAMILIES[bg.stage1Plot].stage2].stage4,
      stage5Family:(arch === 'cleric' ? 'containment' : arch === 'saint' ? 'sacrificial_stabilization' : arch === 'spellthief' ? 'exposure' : 'world_scar'),
      failureTheme:bg.theme,
      legendaryTags:[bg.locality,arch,bg.theme]
    };
  });
});

// ----- Batch 6 expansion -----
ARCHETYPES.necromancer = { name:'Necromancer', family:'Magic & Spellcasting', focus:'lore', ability:'Bone Quiet', empowerText:'The dead stop being rumor and start answering the shape of your will.' };
ARCHETYPES.inquisitor = { name:'Inquisitor', family:'Magic & Spellcasting', focus:'persuasion', ability:'Oath Pressure', empowerText:'The guilty discover that certainty can hit harder than steel.' };
ARCHETYPES.assassin = { name:'Assassin', family:'Stealth & Precision', focus:'stealth', ability:'Silent Mark', empowerText:'By the time fear knows your name, the choice is already over.' };
ARCHETYPES.artificer = { name:'Artificer', family:'Support & Leadership', focus:'craft', ability:'Latchwork Override', empowerText:'The machine stops belonging to the people who thought they owned it.' };

LOCALITIES.zootian_expanse = {
  name:'Zootian Expanse', polity:'Principality of Zootia', region:'Principality of Zootia',
  identity:'Open herd-country of wagon camps, grain boards, burial mounds, weather signs, and practical seasonal piety.',
  approach:'Fence lines, shrine stones, herding whistles, and wide wind-bent grass make the road feel exposed long before any proper yard appears.',
  inside:'Pasture lanes, tally sheds, shearing circles, wagon fires, and storm-roped grain towers hold daily life together by habit and weather sense.',
  whoBelongs:['herders','grain clerks','wagon hands','stable keepers'], whoOut:['wasteful brokers','careless raiders'],
  expected:['talk weather and work first','respect cairns, herd paths, and roadside offerings'],
  power:['harvest measures board','big family holdings'], economy:['herding','grain','wool','seasonal export'],
  faith:'small roadside rites to renewal, weather, and safe passage are woven into chores rather than separated from them.',
  pressure:['herd death undercount','grave-marker tampering','blight pit leak'],
  greetings:['weather-first greeting','brief wrist touch after labor is understood'], rituals:['grain pinched at shrine stones','short thanks before herd movement'],
  locals:['herders','stable keepers','tally clerks'], safeZone:'Roadhouse loft infirmary',
  adjacent:['zootian_border_herd_road'], hazards:['stampede break','granary dust flare','mud road collapse'], creatures:['field tuskers','long-limbed herd stalkers'],
  companion:{ id:'meren_fallow', name:'Meren Fallow', role:'grave-field runner', recruitAt:'stage1' }
};
LOCALITIES.silent_haven = {
  name:'Silent Haven', polity:'Principality of Roaz', region:'Principality of Roaz',
  identity:'Convoy-rest fortress and detention transfer post where quiet authority, convoy law, and sealed custody weigh on every exchange.',
  approach:'Walled courtyards, chain gates, convoy pens, and stern watchfires make the road feel judged before the first question is spoken.',
  inside:'Convoy bays, custody alcoves, ration queues, tack rooms, and hard chapel cells divide the place into disciplined functions.',
  whoBelongs:['convoy wardens','transfer clerks','stable crews','detention guards'], whoOut:['loose petitioners','unsealed meddlers'],
  expected:['state role clearly','do not interrupt convoy order or sealed transfers'],
  power:['convoy command','transfer office'], economy:['convoy staging','detention transfer','road security'],
  faith:'hard-edged vow rites and brief ward prayers appear at gates, cells, and departure lines.',
  pressure:['convoy oath breach','missing prisoner transfer','blackbook burn order'],
  greetings:['rank-first acknowledgment','short fist tap under guard watch'], rituals:['oil line drawn at transfer doors','ward prayer before night dispatch'],
  locals:['wardens','stable crews','transfer clerks'], safeZone:'Convoy chapel recovery bunk',
  adjacent:['silent_haven_convoy_lane'], hazards:['gate crush','chain snap','ration flare'], creatures:['ash kennel hounds','road stalk cats'],
  companion:{ id:'karst_ved', name:'Karst Ved', role:'convoy warrant runner', recruitAt:'stage1' }
};
LOCALITIES.eastwater_quay = {
  name:'Eastwater Quay', polity:'Principality of Cosmouth', region:'Principality of Cosmouth',
  identity:'Tide-cut dock quarter of lamp ropes, sealed holds, night manifests, and quiet maritime crimes hiding inside orderly trade.',
  approach:'Wet pilings, mast silhouettes, rope lanterns, and the smell of brine and pitch announce the quay before the first ledger house comes into view.',
  inside:'Night counters, hold stairs, rope bridges, sealed lockers, and tide-marked alleys keep the place moving on quiet timing and private knowledge.',
  whoBelongs:['dock clerks','night loaders','rope hands','seal readers'], whoOut:['loud thieves','panicked strangers'],
  expected:['keep pace with the working tide','do not obstruct marked holds or rope paths'],
  power:['quay factors','seal readers'], economy:['night loading','sealane transfer','hold storage','manifest handling'],
  faith:'small harbor candles and whispered water rites cling to rails, ladders, and locker doors.',
  pressure:['dockside kill contract','sealane passage extortion','night manifest erasure'],
  greetings:['short rail tap','low nod beside marked holds'], rituals:['coin flicked to black water','brief lamp cover before departure'],
  locals:['loaders','dock clerks','seal readers'], safeZone:'Quay loft recovery room',
  adjacent:['eastwater_quay_sealane'], hazards:['dock crush','rope snap','tar fire'], creatures:['waterline scavengers','pier rats'],
  companion:{ id:'sel_vor', name:'Sel Vor', role:'night manifest reader', recruitAt:'stage1' }
};
LOCALITIES.eternal_lands_exchange = {
  name:'Eternal Lands Exchange', polity:'Soreheim Alliance', region:'Soreheim Alliance',
  identity:'Industrial exchange district where alloy schedules, tower freight, precision fittings, and contribution bargains grind against one another.',
  approach:'Heat haze, counting gantries, alloy yards, and freight bells make the exchange feel like a machine with no room for hesitation.',
  inside:'Alloy racks, mechanism courts, broker sheds, lift towers, and repair pits set a relentless rhythm of measured output.',
  whoBelongs:['fitters','alloy clerks','lift crews','schedule brokers'], whoOut:['idle speculators','careless vandals'],
  expected:['speak in measures and timings','do not obstruct assigned work lanes'],
  power:['exchange planners','alloy foremen'], economy:['alloy schedules','precision fittings','freight mechanisms','tower supply deals'],
  faith:'work-blessings and measured tool rites matter more than decorative public devotion.',
  pressure:['alloy schedule fraud','heat lattice crack','freight mechanism sabotage'],
  greetings:['tool-hand knock','timing call before agreement'], rituals:['three-tap tool blessing','chalk mark at heat lattice housings'],
  locals:['fitters','alloy clerks','lift crews'], safeZone:'Exchange infirmary mezzanine',
  adjacent:['eternal_lands_exchange_route'], hazards:['magma vent surge','freight lift failure','arsenal flashback'], creatures:['slag carrion wolves','tower scavenger drakes'],
  companion:{ id:'iva_torq', name:'Iva Torq', role:'mechanism binder', recruitAt:'stage1' }
};

ROUTE_NAMES.zootian_border_herd_road = 'Zootian Border Herd Road';
ROUTE_NAMES.silent_haven_convoy_lane = 'Silent Haven Convoy Lane';
ROUTE_NAMES.eastwater_quay_sealane = 'Eastwater Quay Sealane';
ROUTE_NAMES.eternal_lands_exchange_route = 'Eternal Lands Exchange Route';

BESTIARY['grave-field crows'] = { hp:11, attack:3, text:'Black carrion birds that gather where herd death and bad burial practice leave easy work.' };
BESTIARY['pit-bloom crawlers'] = { hp:12, attack:4, text:'Blight-fed things that drag themselves up from spoiled pits after dark rain.' };
BESTIARY['cell hounds'] = { hp:13, attack:4, text:'Lean custody hounds trained to panic the weak and chase the desperate.' };
BESTIARY['convoy ditch lurkers'] = { hp:12, attack:4, text:'Roadside predators that learn transfer lanes faster than guards expect.' };
BESTIARY['hold-knife skulkers'] = { hp:12, attack:4, text:'Dockside killers and half-feral scavengers move with the same patience in tight quay shadows.' };
BESTIARY['tide-rope biters'] = { hp:11, attack:3, text:'Wet, fast things that swarm rope lines and boarding ladders at the wrong tide.' };
BESTIARY['lattice sparkshades'] = { hp:14, attack:4, text:'Heat-born afterimages that cling to cracked industrial structure until they can strike.' };
BESTIARY['gear-mire scavengers'] = { hp:13, attack:4, text:'Scavengers that nest in discarded machine grease and emerge where fittings fail.' };

HAZARDS['grave pit spill'] = { severity:2, text:'Bad burial ground and wet ground agree to bring the wrong things back to the surface.' };
HAZARDS['herd route collapse'] = { severity:2, text:'A soft lane gives way under living weight and panic.' };
HAZARDS['storm lantern blowout'] = { severity:1, text:'Weather strips visibility from a route just as fear decides to spread.' };
HAZARDS['gate crush'] = { severity:1, text:'Guarded movement turns bodies into another piece of the mechanism.' };
HAZARDS['chain snap transfer'] = { severity:2, text:'Restraint and load fail together in the worst possible instant.' };
HAZARDS['ration flare'] = { severity:1, text:'Shortage and rumor turn order brittle fast.' };
HAZARDS['night quay plunge'] = { severity:2, text:'A wrong step beside black water becomes a silence problem before it becomes a rescue problem.' };
HAZARDS['hold lantern flare'] = { severity:2, text:'Tar, rope, and poor air decide they would rather be fire.' };
HAZARDS['tide surge slam'] = { severity:1, text:'A sudden swell makes wood, rope, and bone argue in public.' };
HAZARDS['heat lattice rupture'] = { severity:3, text:'Industrial discipline loses the argument and the structure answers with violence.' };
HAZARDS['brokered overload'] = { severity:2, text:'Someone sold more capacity than the machine could survive.' };
HAZARDS['tool cage burst'] = { severity:1, text:'Stored strain and careless timing throw sharp metal into the lane.' };

PLOT_FAMILIES.herd_bone_tithe = { title:'Herd Bone Tithe', objective:'Find who profits when the dead herd is counted twice and honored once.', stage2:'zootian_border_herd_road' };
PLOT_FAMILIES.blight_pit_leak = { title:'Blight Pit Leak', objective:'Contain the spoil before field fear becomes seasonal law.', stage2:'zootian_border_herd_road' };
PLOT_FAMILIES.cairn_marker_tampering = { title:'Cairn Marker Tampering', objective:'Learn who moved the markers and why the dead were made part of the route dispute.', stage2:'zootian_border_herd_road' };
PLOT_FAMILIES.convoy_oath_breach = { title:'Convoy Oath Breach', objective:'Decide who broke protected transport vows and whether the line can still be trusted.', stage2:'silent_haven_convoy_lane' };
PLOT_FAMILIES.missing_prisoner_transfer = { title:'Missing Prisoner Transfer', objective:'Find out whether the missing transfer vanished by corruption, mercy, or order from above.', stage2:'silent_haven_convoy_lane' };
PLOT_FAMILIES.blackbook_burn_order = { title:'Blackbook Burn Order', objective:'Stop the destruction of convoy truth before the road forgets on purpose.', stage2:'silent_haven_convoy_lane' };
PLOT_FAMILIES.dockside_kill_contract = { title:'Dockside Kill Contract', objective:'Trace a quiet killing order before it turns the quay into a private graveyard.', stage2:'eastwater_quay_sealane' };
PLOT_FAMILIES.sealane_passage_extortion = { title:'Sealane Passage Extortion', objective:'Break the passage racket before every honest hold starts paying fear as tax.', stage2:'eastwater_quay_sealane' };
PLOT_FAMILIES.night_manifest_erasure = { title:'Night Manifest Erasure', objective:'Recover what the night shift tried to erase before it becomes accepted cargo truth.', stage2:'eastwater_quay_sealane' };
PLOT_FAMILIES.alloy_schedule_fraud = { title:'Alloy Schedule Fraud', objective:'Prove who is falsifying metal timing before the wrong towers go hungry.', stage2:'eternal_lands_exchange_route' };
PLOT_FAMILIES.heat_lattice_crack = { title:'Heat Lattice Crack', objective:'Stabilize the failing structure before planners turn danger into paperwork.', stage2:'eternal_lands_exchange_route' };
PLOT_FAMILIES.freight_mechanism_sabotage = { title:'Freight Mechanism Sabotage', objective:'Identify who wants the exchange machinery to fail and who profits from the halt.', stage2:'eternal_lands_exchange_route' };

ROUTE_FAMILIES.zootian_border_herd_road = { stage3:'seasonal_border_stress', stage4:'zootian_harvest_reckoning' };
ROUTE_FAMILIES.silent_haven_convoy_lane = { stage3:'convoy_truth_war', stage4:'roaz_transfer_state' };
ROUTE_FAMILIES.eastwater_quay_sealane = { stage3:'quay_shadow_trade', stage4:'cosmouth_night_water_shock' };
ROUTE_FAMILIES.eternal_lands_exchange_route = { stage3:'alloy_priority_conflict', stage4:'soreheim_exchange_collapse' };

BACKGROUNDS.necromancer = [
  { id:'herd_grave_tender', name:'Herd Grave Tender', locality:'zootian_expanse', stage1Plot:'herd_bone_tithe', theme:'death becomes a route problem faster than anyone admits' },
  { id:'blight_pit_reader', name:'Blight Pit Reader', locality:'zootian_expanse', stage1Plot:'blight_pit_leak', theme:'rot and fear both tell the truth if someone listens properly' },
  { id:'boundary_cairn_keeper', name:'Boundary Cairn Keeper', locality:'zootian_expanse', stage1Plot:'cairn_marker_tampering', theme:'the dead remember boundary crimes long after the living rename them' }
];
BACKGROUNDS.inquisitor = [
  { id:'convoy_oath_examiner', name:'Convoy Oath Examiner', locality:'silent_haven', stage1Plot:'convoy_oath_breach', theme:'authority means naming the break before the lie becomes routine' },
  { id:'silent_cell_interrogator', name:'Silent Cell Interrogator', locality:'silent_haven', stage1Plot:'missing_prisoner_transfer', theme:'custody without truth is just disappearance with paperwork' },
  { id:'blackbook_warrant_bearer', name:'Blackbook Warrant Bearer', locality:'silent_haven', stage1Plot:'blackbook_burn_order', theme:'order deserves to survive its own secrets only if someone makes it' }
];
BACKGROUNDS.assassin = [
  { id:'eastwater_dock_ghost', name:'Eastwater Dock Ghost', locality:'eastwater_quay', stage1Plot:'dockside_kill_contract', theme:'quiet death leaves louder politics than most people notice' },
  { id:'sealane_knife_courier', name:'Sealane Knife Courier', locality:'eastwater_quay', stage1Plot:'sealane_passage_extortion', theme:'fear moves faster by water when the right hands feed it' },
  { id:'night_ledger_eraser', name:'Night Ledger Eraser', locality:'eastwater_quay', stage1Plot:'night_manifest_erasure', theme:'vanishing the record is easier than vanishing the consequence' }
];
BACKGROUNDS.artificer = [
  { id:'alloy_schedule_keeper', name:'Alloy Schedule Keeper', locality:'eternal_lands_exchange', stage1Plot:'alloy_schedule_fraud', theme:'good craft starts by refusing to let the count lie' },
  { id:'heat_lattice_repairer', name:'Heat Lattice Repairer', locality:'eternal_lands_exchange', stage1Plot:'heat_lattice_crack', theme:'structure only looks silent until it starts screaming' },
  { id:'freight_mechanism_binder', name:'Freight Mechanism Binder', locality:'eternal_lands_exchange', stage1Plot:'freight_mechanism_sabotage', theme:'every machine has a politics hidden in its failure points' }
];
['necromancer','inquisitor','assassin','artificer'].forEach(arch => {
  BACKGROUNDS[arch].forEach(bg => {
    BACKGROUND_ROUTE_SIGNATURES[bg.id] = {
      backgroundId:bg.id,
      originLocality:bg.locality,
      stage1PlotId:bg.stage1Plot,
      stage2Vector:PLOT_FAMILIES[bg.stage1Plot].stage2,
      stage3Family:ROUTE_FAMILIES[PLOT_FAMILIES[bg.stage1Plot].stage2].stage3,
      stage4Family:ROUTE_FAMILIES[PLOT_FAMILIES[bg.stage1Plot].stage2].stage4,
      stage5Family:(arch === 'necromancer' ? 'sacrificial_stabilization' : arch === 'inquisitor' ? 'containment' : arch === 'assassin' ? 'exposure' : 'world_scar'),
      failureTheme:bg.theme,
      legendaryTags:[bg.locality,arch,bg.theme]
    };
  });
});


// ----- Batch 7 expansion -----
ARCHETYPES.trickster = { name:'Trickster', family:'Stealth & Precision', focus:'persuasion', ability:'Borrowed Face', empowerText:'People realize too late that the scene was always moving on your timing.' };
ARCHETYPES.druid = { name:'Druid', family:'Magic & Spellcasting', focus:'survival', ability:'Weather Bind', empowerText:'What once looked like climate now answers as pattern, warning, and weapon.' };
ARCHETYPES.marshal = { name:'Marshal', family:'Support & Leadership', focus:'combat', ability:'Line Authority', empowerText:'Crowds and hard men alike start measuring themselves against the order you carry.' };
ARCHETYPES.savant = { name:'Savant', family:'Magic & Spellcasting', focus:'lore', ability:'Pattern Recall', empowerText:'Systems that once hid their shape now open under your attention like solved locks.' };

LOCALITIES.craftspire = {
  name:'Craftspire', polity:'The Union', region:'The Union',
  identity:'Highly urbanized production district where artisan output, book-copy bureaucracy, and licensed knowledge trade converge into industrial economic authority.',
  approach:'Tall workhouses, copy towers, materials yards, ledger balconies, and cart-choked service lanes rise around a district where skilled labor and regulated output become visible prestige.',
  inside:'The district hums with cutters, binders, copyists, enchanters, inspectors, and porters moving through dense multi-level production spaces tied directly to storage and dispatch systems.',
  whoBelongs:['artisans','copyists','licensed enchanters','materials brokers','inspectors'], whoOut:['anti-intellectual raiders','careless fire-users'],
  expected:['respect queue and workshop boundaries','do not touch commissioned work','observe tariff marking rules'],
  power:['The Union','copying offices','licensed guild houses'], economy:['book copying','regulated magical trade','artisan showcase production','warehouse integration'],
  faith:'Practical devotion survives in workshop alcoves and opening rites before major work runs.',
  pressure:['copy theft','intellectual property disputes','material shortages','sabotage'],
  greetings:['ink-stained wrist tap','quiet nod before handing over sealed work'], rituals:['tool blessing before first cut','short lamp prayer beside copy desks'],
  locals:['artisans','copyists','inspectors'], safeZone:'Workshop infirmary loft',
  adjacent:['guildheart_hub_craftspire_workshop_corridor'],
  hazards:['press crush','varnish flare','copy tower fall'], creatures:['ink moth swarms','paper-cut imps'],
  companion:{ id:'halen_quillbind', name:'Halen Quillbind', role:'licensed copy auditor', recruitAt:'stage1' }
};
LOCALITIES.unity_square = {
  name:'Unity Square', polity:'The Union', region:'The Union',
  identity:'High-density urban exchange quarter where negotiated trade replaces inherited privilege as the public language of status, procedure, and access.',
  approach:'Paved exchange courts, stacked counting houses, covered loading lanes, tally towers, and color-coded guild awnings make the square feel like a civic market machine rendered in stone, wood, and cloth.',
  inside:'Voices overlap across a managed density of bargaining floors, inspection sheds, carrier lanes, vendor rows, and sanctioned dispute corners surrounded by constant urban movement.',
  whoBelongs:['traders','haulers','market stewards','auditors','food vendors'], whoOut:['those who expect secrecy in public negotiation','violent extortionists'],
  expected:['state terms clearly','observe inspection lines','treat posted rates and guild colors as operative facts'],
  power:['Union market stewards','arbitration runners','licensed guild delegates'], economy:['market mediation','spot trade','inspection fees','transport matching'],
  faith:'Small shrines exist at the edges, but market rhythm dominates the center.',
  pressure:['price shocks','cargo theft','route closures','public rumor flareups'],
  greetings:['open-palm rate sign','short call-and-response between carriers and stewards'], rituals:['coin tapped to threshold shrines','brief cloth cover over scales before opening'],
  locals:['traders','haulers','auditors'], safeZone:'Exchange steward rest room',
  adjacent:['guildheart_hub_unity_square_bargaining_road'],
  hazards:['crowd crush','scale collapse','panic surge'], creatures:['ledger gnats','stallback skulkers'],
  companion:{ id:'vari_silt', name:'Vari Silt', role:'market arbitration runner', recruitAt:'stage1' }
};
LOCALITIES.hearthcoil_commune = {
  name:'Hearthcoil Commune', polity:'Sheresh Communes', region:'Sheresh Communes',
  identity:'A marginal Sheresh commune surviving around unstable heat coils and strict ration discipline.',
  approach:'Steam plumes and patched outer shell plates suggest a place held together by labor and necessity.',
  inside:'Warmth is uneven, storage is precious, and every room reflects compromise.',
  whoBelongs:['repair crews','ration clerks','families under heat quotas'], whoOut:['luxury-minded visitors','unauthorized scavengers'],
  expected:['waste nothing','do not obstruct heat distribution teams'],
  power:['Communal Ration Allocators'], economy:['repair salvage','heat exchange','survival craft'],
  faith:'Quiet endurance rituals replace spectacle.',
  pressure:['coil failure','ration conflict','out-migration'],
  greetings:['gloved knuckle to heat line','short ration-count acknowledgment'], rituals:['coil-thrum counting before shift','steam offered at survival shrines'],
  locals:['repair crews','ration clerks','families'], safeZone:'Coil ward recovery bay',
  adjacent:['hearthcoil_whitebridge_relief_line'],
  hazards:['coil surge','steam blister wave','supply frost lock'], creatures:['heat-sick scuttlers','white-seam lurkers'],
  companion:{ id:'esker_thaw', name:'Esker Thaw', role:'coil repair runner', recruitAt:'stage1' }
};
LOCALITIES.duneshade_outpost = {
  name:'Duneshade Outpost', polity:'Soreheim Alliance', region:'Soreheim Alliance',
  identity:'Fortified hot-edge outpost where route captains, water-ration families, and predator-watch crews hold the desertward lanes of the Unternal supply belt.',
  approach:'Low walls, shade sails, cistern towers, and signal posts mark a settlement built to survive heat, scarcity, and sudden attack.',
  inside:'Barracks, cistern courts, beast pens, relay sheds, and ration offices dominate a hard practical interior.',
  whoBelongs:['route guards','water crews','beast handlers','heat scouts','ration families'], whoOut:['wastrels','the underprepared'],
  expected:['report hazards quickly','respect ration order','show deference to shelter-lane control'],
  power:['route captains','rationing families','frontier stewards'], economy:['route defense','water control','desert-edge extraction','convoy support'],
  faith:'Hardy frontier observances focus on endurance, safe passage, and bringing people and cargo home alive.',
  pressure:['water scarcity','subterranean predators','convoy delay','desert raids and sabotage'],
  greetings:['water-sign over chest','captain-first lane acknowledgment'], rituals:['cup poured at shade stones','sun-mark chalk before departure'],
  locals:['route guards','water crews','beast handlers'], safeZone:'Cistern ward bunker',
  adjacent:['duneshade_sunspire_supply_lane'],
  hazards:['water riot','shade collapse','sandglass whiteout'], creatures:['dune burrowers','cinder jackals'],
  companion:{ id:'tamar_drywell', name:'Tamar Drywell', role:'water ledger scout', recruitAt:'stage1' }
};

ROUTE_NAMES.guildheart_hub_craftspire_workshop_corridor = 'Guildheart Hub → Craftspire Workshop Corridor';
ROUTE_NAMES.guildheart_hub_unity_square_bargaining_road = 'Guildheart Hub → Unity Square Bargaining Road';
ROUTE_NAMES.hearthcoil_whitebridge_relief_line = 'Hearthcoil → Whitebridge Relief Line';
ROUTE_NAMES.duneshade_sunspire_supply_lane = 'Duneshade → Sunspire Supply Lane';

BESTIARY['ink moth swarms'] = { hp:11, attack:3, text:'Soot-dark moth swarms burst from spoiled stock and lacquer fumes, ruining work and sight alike.' };
BESTIARY['paper-cut imps'] = { hp:12, attack:4, text:'Small spiteful cutter-things slip between stacked work and strike exposed hands and faces.' };
BESTIARY['ledger gnats'] = { hp:10, attack:3, text:'Tiny stinging swarms gather where grain dust, sweat, and spoiled tally cloth accumulate.' };
BESTIARY['stallback skulkers'] = { hp:12, attack:4, text:'Mean opportunists and half-feral thieves move under stall backs and bargain tables with practiced patience.' };
BESTIARY['heat-sick scuttlers'] = { hp:13, attack:4, text:'Pale fast things breed in coil-shadow and lash out where warmth and waste stay trapped together.' };
BESTIARY['white-seam lurkers'] = { hp:14, attack:4, text:'Cold-loving shapes wait at seal seams and storage breaks for the first mistake in routine.' };
BESTIARY['dune burrowers'] = { hp:14, attack:5, text:'Subterranean predators that test cistern walls, tether lines, and sleeping ground from below.' };
BESTIARY['cinder jackals'] = { hp:13, attack:4, text:'Lean heat-shimmer hunters circle the outpost edge where thirst and carrion meet.' };

HAZARDS['press crush'] = { severity:1, text:'Bad timing around heavy presswork turns production into blunt force in a heartbeat.' };
HAZARDS['varnish flare'] = { severity:2, text:'A spark in a badly watched finish room makes smoke and panic outrun common sense.' };
HAZARDS['copy tower fall'] = { severity:2, text:'Too much weight and bad maintenance turn vertical storage into a public collapse.' };
HAZARDS['crowd crush'] = { severity:1, text:'A rate shock or shouted theft can fold a market lane into pure body pressure.' };
HAZARDS['scale collapse'] = { severity:1, text:'Overloaded rigging and bad floor practice turn weighing space into falling wood and metal.' };
HAZARDS['panic surge'] = { severity:2, text:'Public rumor moves faster than proof and tramples both.' };
HAZARDS['coil surge'] = { severity:2, text:'A heat coil spits unstable force through a lane that was already too crowded.' };
HAZARDS['steam blister wave'] = { severity:2, text:'Pressure release turns visibility, breath, and skin into immediate concerns.' };
HAZARDS['supply frost lock'] = { severity:1, text:'A failed seal freezes critical stores and turns ration order brittle in minutes.' };
HAZARDS['water riot'] = { severity:2, text:'Scarcity turns procedure into open challenge fast when the line decides it no longer trusts the count.' };
HAZARDS['shade collapse'] = { severity:1, text:'Fabric, timber, and desperate shelter all fail at once under heat and strain.' };
HAZARDS['sandglass whiteout'] = { severity:2, text:'Wind and grit erase lanes, signals, and the difference between travel and exposure.' };

PLOT_FAMILIES.copy_theft_ring = { title:'Copy Theft Ring', objective:'Find who is stealing high-value copywork and why official buyers keep receiving the wrong texts on time.', stage2:'guildheart_hub_craftspire_workshop_corridor' };
PLOT_FAMILIES.licensed_trade_breach = { title:'Licensed Trade Breach', objective:'Stop restricted magical stock from walking out under the protection of legal paperwork.', stage2:'guildheart_hub_craftspire_workshop_corridor' };
PLOT_FAMILIES.material_shortfall_cover = { title:'Material Shortfall Cover', objective:'Expose who is hiding a shortage before sabotage becomes the excuse for broader control.', stage2:'guildheart_hub_craftspire_workshop_corridor' };
PLOT_FAMILIES.market_rate_shock = { title:'Market Rate Shock', objective:'Learn who engineered the shock before panic pricing becomes accepted fact.', stage2:'guildheart_hub_unity_square_bargaining_road' };
PLOT_FAMILIES.cargo_theft_flare = { title:'Cargo Theft Flare', objective:'Break the theft pattern before public trust in the square collapses into retaliation.', stage2:'guildheart_hub_unity_square_bargaining_road' };
PLOT_FAMILIES.guild_color_fraud = { title:'Guild Color Fraud', objective:'Prove who is using false colors and posted terms to steal authority in plain sight.', stage2:'guildheart_hub_unity_square_bargaining_road' };
PLOT_FAMILIES.coil_failure_chain = { title:'Coil Failure Chain', objective:'Stabilize the failing heat chain before ration order breaks around it.', stage2:'hearthcoil_whitebridge_relief_line' };
PLOT_FAMILIES.ration_book_mutiny = { title:'Ration Book Mutiny', objective:'Decide who is pushing the commune toward open refusal and what truth they are using to do it.', stage2:'hearthcoil_whitebridge_relief_line' };
PLOT_FAMILIES.salvage_assignment_sabotage = { title:'Salvage Assignment Sabotage', objective:'Find who is corrupting salvage order before the commune runs out of trust before it runs out of parts.', stage2:'hearthcoil_whitebridge_relief_line' };
PLOT_FAMILIES.water_ledger_breach = { title:'Water Ledger Breach', objective:'Trace the missing water before the cistern count turns into armed accusation.', stage2:'duneshade_sunspire_supply_lane' };
PLOT_FAMILIES.predator_corridor = { title:'Predator Corridor', objective:'Learn why the burrowers now favor the supply lane and who gains from the fear it causes.', stage2:'duneshade_sunspire_supply_lane' };
PLOT_FAMILIES.shade_rights_dispute = { title:'Shade Rights Dispute', objective:'Prevent shelter law from turning convoy protection into private extortion.', stage2:'duneshade_sunspire_supply_lane' };

ROUTE_FAMILIES.guildheart_hub_craftspire_workshop_corridor = { stage3:'union_copy_war', stage4:'licensed_knowledge_hegemony' };
ROUTE_FAMILIES.guildheart_hub_unity_square_bargaining_road = { stage3:'market_confidence_crisis', stage4:'union_exchange_capture' };
ROUTE_FAMILIES.hearthcoil_whitebridge_relief_line = { stage3:'commune_heat_collapse', stage4:'sheresh_relay_survival' };
ROUTE_FAMILIES.duneshade_sunspire_supply_lane = { stage3:'waterline_command_struggle', stage4:'unternal_lane_reckoning' };

BACKGROUNDS.trickster = [
  { id:'market_color_runner', name:'Market Color Runner', locality:'unity_square', stage1Plot:'guild_color_fraud', theme:'public truth can be bent faster than private lies' },
  { id:'rate_whisper_broker', name:'Rate Whisper Broker', locality:'unity_square', stage1Plot:'market_rate_shock', theme:'price is just fear wearing numbers until someone names the trick' },
  { id:'cargo_lane_lurer', name:'Cargo Lane Lurer', locality:'unity_square', stage1Plot:'cargo_theft_flare', theme:'a crowd is easiest to steer when everyone thinks they chose their pace' }
];
BACKGROUNDS.druid = [
  { id:'coil_ward_listener', name:'Coil Ward Listener', locality:'hearthcoil_commune', stage1Plot:'coil_failure_chain', theme:'survival starts where the machine and the weather stop pretending they are separate' },
  { id:'ration_frost_keeper', name:'Ration Frost Keeper', locality:'hearthcoil_commune', stage1Plot:'ration_book_mutiny', theme:'the body knows when the line is lying before the ledger does' },
  { id:'seal-moss salvage hand', name:'Seal-Moss Salvage Hand', locality:'hearthcoil_commune', stage1Plot:'salvage_assignment_sabotage', theme:'small living things remember system failure better than proud officials do' }
];
BACKGROUNDS.marshal = [
  { id:'water_lane_enforcer', name:'Water Lane Enforcer', locality:'duneshade_outpost', stage1Plot:'water_ledger_breach', theme:'authority means the line holds when thirst says it should not' },
  { id:'predator_watch_sergeant', name:'Predator Watch Sergeant', locality:'duneshade_outpost', stage1Plot:'predator_corridor', theme:'fear becomes a route tax unless someone teaches it discipline' },
  { id:'shade_claim_bailiff', name:'Shade Claim Bailiff', locality:'duneshade_outpost', stage1Plot:'shade_rights_dispute', theme:'law matters most where shelter can decide who lives through noon' }
];
BACKGROUNDS.savant = [
  { id:'licensed_copy_examiner', name:'Licensed Copy Examiner', locality:'craftspire', stage1Plot:'copy_theft_ring', theme:'knowledge loses value the moment everyone trusts the wrong copy' },
  { id:'tariff_ward_theorist', name:'Tariff Ward Theorist', locality:'craftspire', stage1Plot:'licensed_trade_breach', theme:'procedure is only neutral until someone learns how to weaponize its blind spots' },
  { id:'materials_ledger_analyst', name:'Materials Ledger Analyst', locality:'craftspire', stage1Plot:'material_shortfall_cover', theme:'shortage is a story someone writes before it becomes a crisis someone else must survive' }
];
['trickster','druid','marshal','savant'].forEach(arch => {
  BACKGROUNDS[arch].forEach(bg => {
    BACKGROUND_ROUTE_SIGNATURES[bg.id] = {
      backgroundId:bg.id,
      originLocality:bg.locality,
      stage1PlotId:bg.stage1Plot,
      stage2Vector:PLOT_FAMILIES[bg.stage1Plot].stage2,
      stage3Family:ROUTE_FAMILIES[PLOT_FAMILIES[bg.stage1Plot].stage2].stage3,
      stage4Family:ROUTE_FAMILIES[PLOT_FAMILIES[bg.stage1Plot].stage2].stage4,
      stage5Family:(arch === 'trickster' ? 'exposure' : arch === 'druid' ? 'containment' : arch === 'marshal' ? 'world_scar' : 'divine_rerouting'),
      failureTheme:bg.theme,
      legendaryTags:[bg.locality,arch,bg.theme]
    };
  });
});


// ----- Batch 8 expansion -----
ARCHETYPES.monk = { name:'Monk', family:'Classic Combat', focus:'combat', ability:'Stillwater Strike', empowerText:'Disorder breaks itself against the calm force you now carry into close quarters.' };
ARCHETYPES.oracle = { name:'Oracle', family:'Magic & Spellcasting', focus:'lore', ability:'Vein of Omen', empowerText:'What once felt like warning now lands as command; the hidden pattern arrives before doubt can answer it.' };
ARCHETYPES.beastmaster = { name:'Beastmaster', family:'Stealth & Precision', focus:'survival', ability:'Pack Signal', empowerText:'Predators, handlers, and frightened crowds all start reading the field by your lead rather than their fear.' };

LOCALITIES.moonvault_cloister = {
  name:'Moonvault Cloister', polity:'Principality of Cosmouth', region:'Principality of Cosmouth',
  identity:'High quiet observatory-cloister where tide charts, omen records, and night rites shape civic decisions downstream.',
  approach:'Terraced stone, silver bowls, bell cords, and moon mirrors gather along the climb before the cloister walls show their full height.',
  inside:'Chart rooms, narrow courts, prayer ledges, still pools, and sealed archive stairs make the place feel equal parts watchtower and sanctuary.',
  whoBelongs:['omen readers','chart clerks','night priests','licensed petitioners'], whoOut:['reckless speculators','loud gawkers'],
  expected:['speak softly near reading pools','do not cross bell lines without leave'],
  power:['omen abbots','chart custodians'], economy:['navigation readings','omen licensing','night archives'],
  faith:'Night observance, reflected light, and tide-linked devotions structure the public rhythm.',
  pressure:['tampered omen rolls','suppressed harbor warning','stolen tide charts'],
  greetings:['palm to brow below the lantern line','quiet tide-count acknowledgment'],
  rituals:['mirror bowls turned at dusk','inked silver marks renewed before the first bell'],
  locals:['omen readers','chart clerks','night priests'], safeZone:'Moonvault infirmary gallery',
  adjacent:['moonvault_quay_descent','moonvault_pilgrim_stair'],
  hazards:['mirror flash disorientation','stair slip','bell panic'], creatures:['night gull swarms','pool wraiths'],
  companion:{ id:'laseh_mirrorwake', name:'Laseh Mirrorwake', role:'chart reader', recruitAt:'stage1' }
};
LOCALITIES.brasswake_depot = {
  name:'Brasswake Depot', polity:'The Union', region:'The Union',
  identity:'Industrial transfer depot of cranes, bonded wagons, maintenance pits, and round-the-clock relay discipline.',
  approach:'Signal masts, loading towers, brass piping, brake screams, and relay smoke define the depot long before the first yard gate.',
  inside:'Lift lanes, bonded cages, wheel pits, engine sheds, and relay desks keep the whole place in strained mechanical motion.',
  whoBelongs:['yard riggers','relay hands','maintenance crews','bond clerks'], whoOut:['idle spectators','unlicensed scavengers'],
  expected:['do not stall a live lane','declare cargo purpose fast'],
  power:['relay masters','bond clerks'], economy:['relay freight','equipment repair','bonded transfer'],
  faith:'Practical machine-blessings and threshold charms matter more than grand display.',
  pressure:['relay brake sabotage','cargo drift fraud','maintenance record forgery'],
  greetings:['two-knuckle tap on rail or crate','short lane-clear call back'],
  rituals:['oil line marked before start shift','small copper charms tied to first departing loads'],
  locals:['riggers','relay hands','clerks'], safeZone:'Brakehouse recovery cot',
  adjacent:['brasswake_unity_relay_road','brasswake_craftspire_maintenance_lane'],
  hazards:['gear shear','lift drop','steam burst'], creatures:['cable gnawers','boiler mites'],
  companion:{ id:'oren_clasp', name:'Oren Clasp', role:'relay rigger', recruitAt:'stage1' }
};
LOCALITIES.pilgrim_scarp = {
  name:'Pilgrim Scarp', polity:'Principality of Panim', region:'Principality of Panim',
  identity:'Wind-cut memorial escarpment where pilgrim roads, guide shrines, grave terraces, and weather-hardened hospitality meet.',
  approach:'Stone steps, shrine niches, prayer ribbons, and exposed terraces rise out of dust and wind as the road narrows toward the height.',
  inside:'Guest cells, terrace markets, rope rails, ash shrines, and guide houses cling to the scarp in patient ordered layers.',
  whoBelongs:['guides','pilgrims','terrace clerks','weather wardens'], whoOut:['grave robbers','disruptive thrill-seekers'],
  expected:['show respect at terrace shrines','yield the stair to funeral passage'],
  power:['guide houses','terrace wardens'], economy:['pilgrim lodging','memorial trade','guide service'],
  faith:'Passage rites, ash offerings, and spoken names in the wind are part of ordinary public life.',
  pressure:['guide extortion','lost pilgrim chain','terrace offering theft'],
  greetings:['ash-touch to shoulder cloth','quiet name-blessing between guides'],
  rituals:['names spoken into wind cups','ash poured at stair breaks before dawn'],
  locals:['guides','pilgrims','terrace clerks'], safeZone:'Terrace guest ward',
  adjacent:['pilgrim_scarp_memorial_drop','pilgrim_scarp_causeway_return'],
  hazards:['stair fall','wind lash','terrace crush'], creatures:['grave kites','dust-lurking mourners'],
  companion:{ id:'miri_votive', name:'Miri Votive', role:'pilgrim guide', recruitAt:'stage1' }
};

ROUTE_NAMES.moonvault_quay_descent = 'Moonvault → Quay Descent';
ROUTE_NAMES.moonvault_pilgrim_stair = 'Moonvault → Pilgrim Stair';
ROUTE_NAMES.brasswake_unity_relay_road = 'Brasswake → Unity Relay Road';
ROUTE_NAMES.brasswake_craftspire_maintenance_lane = 'Brasswake → Craftspire Maintenance Lane';
ROUTE_NAMES.pilgrim_scarp_memorial_drop = 'Pilgrim Scarp → Memorial Drop';
ROUTE_NAMES.pilgrim_scarp_causeway_return = 'Pilgrim Scarp → Causeway Return';

BESTIARY['night gull swarms'] = { hp:12, attack:3, text:'Harsh-voiced wing swarms descend on light, exposed food, and panicked movement near cliffside ledges.' };
BESTIARY['pool wraiths'] = { hp:15, attack:5, text:'Thin reflective dead-things gather in still basins where omen work and grief have curdled together.' };
BESTIARY['cable gnawers'] = { hp:13, attack:4, text:'Metal-toothed vermin nest around tension lines and chew through safety for heat and grease.' };
BESTIARY['boiler mites'] = { hp:12, attack:3, text:'Scald-happy pests burst from old housings and feed on residue and panic.' };
BESTIARY['grave kites'] = { hp:13, attack:4, text:'Lean high-wind scavengers drop hard on exposed offerings and staggering pilgrims.' };
BESTIARY['dust-lurking mourners'] = { hp:14, attack:4, text:'Half-seen shapes keep close to terraces where names were spoken badly or not at all.' };

HAZARDS['mirror flash disorientation'] = { severity:1, text:'Reflected moonlight and polished surfaces steal depth and footing at the wrong moment.' };
HAZARDS['stair slip'] = { severity:1, text:'Worn stone and bad weather turn one mistaken step into a long hard consequence.' };
HAZARDS['bell panic'] = { severity:2, text:'A wrong bell or a false alarm collapses orderly movement into rushing bodies and bad decisions.' };
HAZARDS['gear shear'] = { severity:2, text:'Stress and bad upkeep make the depot machinery fail fast and violently.' };
HAZARDS['lift drop'] = { severity:2, text:'A live hoist loses trust before it loses height.' };
HAZARDS['steam burst'] = { severity:2, text:'A ruptured line fills a lane with heat, noise, and instant confusion.' };
HAZARDS['wind lash'] = { severity:1, text:'A sudden high gust steals breath, balance, and anything not tied down.' };
HAZARDS['terrace crush'] = { severity:2, text:'A crowded memorial lane under weather pressure becomes a grinding press of bodies and stone.' };

PLOT_FAMILIES.tampered_omen_rolls = { title:'Tampered Omen Rolls', objective:'Find who altered the readings before wrong certainty steers a whole stretch of coast and court.', stage2:'moonvault_quay_descent' };
PLOT_FAMILIES.suppressed_harbor_warning = { title:'Suppressed Harbor Warning', objective:'Prove why a warning was quieted before the quay bears the cost in bodies and blamed labor.', stage2:'moonvault_quay_descent' };
PLOT_FAMILIES.stolen_tide_charts = { title:'Stolen Tide Charts', objective:'Recover the stolen charts before private hands start selling survival back at a premium.', stage2:'moonvault_pilgrim_stair' };
PLOT_FAMILIES.relay_brake_sabotage = { title:'Relay Brake Sabotage', objective:'Stop the sabotage before transfer lanes start killing people and someone profits from the blame.', stage2:'brasswake_unity_relay_road' };
PLOT_FAMILIES.cargo_drift_fraud = { title:'Cargo Drift Fraud', objective:'Trace how declared losses are being manufactured across the relay chain.', stage2:'brasswake_craftspire_maintenance_lane' };
PLOT_FAMILIES.maintenance_record_forgery = { title:'Maintenance Record Forgery', objective:'Catch the false maintenance chain before bad paper becomes dead crews and seized traffic.', stage2:'brasswake_craftspire_maintenance_lane' };
PLOT_FAMILIES.guide_extortion = { title:'Guide Extortion', objective:'Break the extortion ring before the scarp turns grief and danger into private tolls.', stage2:'pilgrim_scarp_memorial_drop' };
PLOT_FAMILIES.lost_pilgrim_chain = { title:'Lost Pilgrim Chain', objective:'Find why pilgrims are vanishing between terraces before rumor becomes holy panic.', stage2:'pilgrim_scarp_memorial_drop' };
PLOT_FAMILIES.terrace_offering_theft = { title:'Terrace Offering Theft', objective:'Resolve who is stripping the terraces and what larger shortage or scheme sits behind it.', stage2:'pilgrim_scarp_causeway_return' };

ROUTE_FAMILIES.moonvault_quay_descent = { stage3:'cosmouth_omen_capture', stage4:'tide_prophecy_reckoning' };
ROUTE_FAMILIES.moonvault_pilgrim_stair = { stage3:'pilgrim_record_war', stage4:'names_in_the_tide' };
ROUTE_FAMILIES.brasswake_unity_relay_road = { stage3:'union_relay_break', stage4:'relay_hegemony_crisis' };
ROUTE_FAMILIES.brasswake_craftspire_maintenance_lane = { stage3:'maintenance_blackbook', stage4:'industrial_trust_collapse' };
ROUTE_FAMILIES.pilgrim_scarp_memorial_drop = { stage3:'panim_passage_racket', stage4:'memorial_route_reckoning' };
ROUTE_FAMILIES.pilgrim_scarp_causeway_return = { stage3:'offering_chain_exposure', stage4:'house_panim_public_shame' };

BACKGROUNDS.monk = [
  { id:'bellline_disciple', name:'Bellline Disciple', locality:'moonvault_cloister', stage1Plot:'tampered_omen_rolls', theme:'discipline means keeping balance when certainty is for sale' },
  { id:'quay_step_mediator', name:'Quay Step Mediator', locality:'moonvault_cloister', stage1Plot:'suppressed_harbor_warning', theme:'a calm body in the right place can stop panic becoming policy' },
  { id:'pilgrim_stair_warden', name:'Pilgrim Stair Warden', locality:'moonvault_cloister', stage1Plot:'stolen_tide_charts', theme:'every step matters when the fall is social as well as physical' }
];
BACKGROUNDS.oracle = [
  { id:'night_chart_reader', name:'Night Chart Reader', locality:'moonvault_cloister', stage1Plot:'tampered_omen_rolls', theme:'omens matter most when someone with power needs them wrong' },
  { id:'harbor_warning_keeper', name:'Harbor Warning Keeper', locality:'moonvault_cloister', stage1Plot:'suppressed_harbor_warning', theme:'the future is useless if fear edits the message before dawn' },
  { id:'silver_tide_adept', name:'Silver Tide Adept', locality:'moonvault_cloister', stage1Plot:'stolen_tide_charts', theme:'prediction turns political the moment survival depends on trust' }
];
BACKGROUNDS.beastmaster = [
  { id:'yard_hound_handler', name:'Yard Hound Handler', locality:'brasswake_depot', stage1Plot:'relay_brake_sabotage', theme:'the first to hear danger is often the thing nobody official wanted to count' },
  { id:'cable_vermin_runner', name:'Cable Vermin Runner', locality:'brasswake_depot', stage1Plot:'cargo_drift_fraud', theme:'small mouths and bad systems both leave tracks if you know where to look' },
  { id:'terrace_guide_keeper', name:'Terrace Guide Keeper', locality:'pilgrim_scarp', stage1Plot:'lost_pilgrim_chain', theme:'creatures feel route fear before people find the words for it' }
];
['monk','oracle','beastmaster'].forEach(arch => {
  BACKGROUNDS[arch].forEach(bg => {
    BACKGROUND_ROUTE_SIGNATURES[bg.id] = {
      backgroundId:bg.id,
      originLocality:bg.locality,
      stage1PlotId:bg.stage1Plot,
      stage2Vector:PLOT_FAMILIES[bg.stage1Plot].stage2,
      stage3Family:ROUTE_FAMILIES[PLOT_FAMILIES[bg.stage1Plot].stage2].stage3,
      stage4Family:ROUTE_FAMILIES[PLOT_FAMILIES[bg.stage1Plot].stage2].stage4,
      stage5Family:(arch === 'oracle' ? 'divine_rerouting' : arch === 'monk' ? 'containment' : 'world_scar'),
      failureTheme:bg.theme,
      legendaryTags:[bg.locality,arch,bg.theme]
    };
  });
});


// ----- Batch 9 route and canon audit scaffolding -----
const NAMED_NPC_PLACEMENT = {
  jorva_helmrune: { locality:'harvest_circle', office:'field marshal courier' },
  toman_iceveil: { locality:'glasswake_commune', office:'field researcher' }
};

const ROUTE_DESTINATIONS = {
  sanctum_sands_memorial_road:'sanctum_sands',
  river_archive_causeway:'river_archive_causeway',
  harvest_circle_road:'harvest_circle',
  ironroot_crossing_freight_lane:'ironroot_crossing',
  whitebridge_domeway:'whitebridge_threshold',
  glasswake_corridor:'glasswake_commune',
  fairhaven_road:'fairhaven',
  plumes_end_northern_road:'plumes_end',
  ashforge_supply_lift:'ashforge_citadel',
  guildheart_causeway:'guildheart_hub',
  mimolot_toll_road:'mimolot_academy',
  cosmoria_sealane:'cosmoria',
  ithtananalor_ironhold_quarry_road:'ithtananalor',
  ithtananalor_silent_haven_convoy_lane:'silent_haven',
  shirshal_crystal_grove_route:'shirshal',
  soreheim_proper_eternal_lands_freight_route:'eternal_lands_exchange',
  soreheim_proper_ironroot_crossing:'ironroot_crossing',
  ironroot_crossing_blackhaul_lane:'ironroot_crossing',
  sanctum_sands_lantern_road:'sanctum_sands',
  whitebridge_threshold_sealway:'whitebridge_threshold',
  river_archive_causeway_eastwater_route:'eastwater_quay',
  zootian_border_herd_road:'zootian_expanse',
  silent_haven_convoy_lane:'silent_haven',
  eastwater_quay_sealane:'eastwater_quay',
  eternal_lands_exchange_route:'eternal_lands_exchange',
  guildheart_hub_craftspire_workshop_corridor:'craftspire',
  guildheart_hub_unity_square_bargaining_road:'unity_square',
  hearthcoil_whitebridge_relief_line:'hearthcoil_commune',
  duneshade_sunspire_supply_lane:'duneshade_outpost'
};

const SAFE_ZONE_RECOVERY = {
  panim_haven: { locality:'sanctum_sands', safeZone:'Lantern hospice court' },
  sunspire_haven: { locality:'harvest_circle', safeZone:'Field infirmary lean-to' },
  aurora_crown_commune: { locality:'glasswake_commune', safeZone:'Sealed observation recovery room' },
  shelkopolis: { locality:'fairhaven', safeZone:'Bonded loft infirmary' },
  fairhaven: { locality:'shelkopolis', safeZone:'Guildhall infirmary loft' },
  harvest_circle: { locality:'sunspire_haven', safeZone:'Freight office recovery cot' },
  glasswake_commune: { locality:'aurora_crown_commune', safeZone:'Dome steward recovery berth' },
  plumes_end: { locality:'fairhaven', safeZone:'Harbor rest loft' }
};

// ----- Batch 10 family content and endgame scaffolding -----
NAMED_NPC_PLACEMENT.namira_vell = { locality:'moonvault_cloister', office:'omen registrar' };
NAMED_NPC_PLACEMENT.dren_hollowquill = { locality:'craftspire', office:'licensed copy examiner' };
NAMED_NPC_PLACEMENT.miri_votive = { locality:'pilgrim_scarp', office:'pilgrim guide house' };
NAMED_NPC_PLACEMENT.vesh_taln = { locality:'fairhaven', office:'ferry access desk' };
NAMED_NPC_PLACEMENT.sela_ashvow = { locality:'panim_haven', office:'memorial courier line' };
NAMED_NPC_PLACEMENT.neren_rimebridge = { locality:'shelkopolis', office:'market archive loft' };
NAMED_NPC_PLACEMENT.hallen_pike = { locality:'sunspire_haven', office:'freight scout shed' };


const LOCALITY_NAMED_SURFACES = {
  panim_haven:['miri_votive'],
  sunspire_haven:['jorva_helmrune'],
  aurora_crown_commune:['toman_iceveil'],
  shelkopolis:['dren_hollowquill'],
  fairhaven:['namira_vell'],
  moonvault_cloister:['namira_vell'],
  brasswake_depot:['dren_hollowquill'],
  pilgrim_scarp:['miri_votive']
};

const ROUTE_SCOUTING = {
  fairhaven_road:'Inspection tables, bonded counts, and ferry talk turn this line into a place where small discrepancies become public trouble.',
  plumes_end_northern_road:'The northern lane rewards nerve and punishes hesitation; rumor runs ahead of carts and patrols alike.',
  harvest_circle_road:'Quota traffic and grain pressure make this road feel heavy long before anything openly breaks.',
  ironroot_crossing_freight_lane:'Axle weight, contractual timing, and freight authority make every delay politically meaningful.',
  sanctum_sands_memorial_road:'Pilgrims, mourners, and registry discipline keep this road emotionally charged and easy to destabilize.',
  river_archive_causeway:'Records, memorial freight, and river moisture turn this line into a place where loss can hide inside paperwork.',
  whitebridge_domeway:'Containment etiquette and cold discipline make every misstep visible here.',
  glasswake_corridor:'Research traffic and sealed movement produce a corridor where silence itself starts looking deliberate.'
};

BESTIARY['Axis-Bent Hierophant'] = { hp:24, attack:8, intent:'break morale', text:'A final-pressure figure warped by belief, authority, and axis strain rather than simple brute malice.' };
BESTIARY['Ledger Maw Devourer'] = { hp:26, attack:9, intent:'consume route truth', text:'A route-ending devourer that turns record, witness, and warning into one hunger.' };
BESTIARY['Crowned Glass Stalker'] = { hp:25, attack:8, intent:'pierce lines', text:'A cold-lit predator that moves like a ritual error wearing teeth and confidence.' };
BESTIARY['Titan Relay Breaker'] = { hp:28, attack:10, intent:'crush the lane', text:'A late-stage engine-wrecker that treats built order as something meant to fail under force.' };

HAZARDS['Axis Breach Spiral'] = { severity:4, text:'Reality, weather, ritual residue, and route pressure begin to twist together into a self-worsening threat.' };
HAZARDS['Cathedral Ledger Collapse'] = { severity:4, text:'Sacred record, institutional legitimacy, and public order all threaten to fail at once.' };
HAZARDS['Frozen Dome Cascade'] = { severity:4, text:'Containment, heat, and public confidence begin collapsing in linked sequence.' };
HAZARDS['Relay Crown Fire'] = { severity:4, text:'Load, speed, and mechanical overstrain turn a vital corridor into a staged inferno.' };

const STAGE3_FAMILY_CONTENT = {
  supply_war:{ title:'Supply War', actions:[
    { label:'Seize the cleaner supply picture before rival tallies harden into law', result:'A cleaner picture of scarcity emerges, and several smaller lies stop being able to hide behind the same shortage.' },
    { label:'Break the confidence of a mid-tier route broker before they can freeze the lane', result:'A broker who counted on passive fear loses face publicly, and several side-players begin hedging toward you instead.' }
  ]},
  convoy_break:{ title:'Convoy Break', actions:[
    { label:'Shadow the split lane and prove who benefits when the convoy fails in fragments', result:'The convoy pattern stops reading like bad luck and starts reading like intention with signatures on it.' },
    { label:'Pressure the escort line into choosing between wage safety and route truth', result:'The escort layer cracks; some choose coin, some choose survival, and none leave with clean hands.' }
  ]},
  mortuary_politics:{ title:'Mortuary Politics', actions:[
    { label:'Expose which rite-house is turning grief into leverage', result:'A grief-fed pressure chain becomes visible enough that neutral silence is no longer easy.' },
    { label:'Pull a rival memorial ledger into daylight before the houses can align their story', result:'A record that was supposed to remain sacred and sealed begins changing who can deny what.' }
  ]},
  sacred_records:{ title:'Sacred Records', actions:[
    { label:'Trace the missing names through the river files before sanctity becomes camouflage', result:'The sacred record starts pointing at the living power structure that wanted it blurred.' },
    { label:'Win the trust of record-keepers who know the archive is being used as a shield', result:'Archive stewards start giving you the kind of truth that cannot be requested through polite forms.' }
  ]},
  commune_containment:{ title:'Commune Containment', actions:[
    { label:'Separate real containment need from deliberate panic management', result:'The commune stops looking merely afraid and starts revealing who profits when fear stays shapeless.' },
    { label:'Test the emergency boundary where procedure and survival no longer agree', result:'Boundary failure becomes political, not just technical, and several quiet factions are forced into view.' }
  ]},
  research_schism:{ title:'Research Schism', actions:[
    { label:'Split the false consensus before doctrine hardens into unsafe policy', result:'What passed as scientific unity fractures into camps with incompatible truths and incompatible loyalties.' },
    { label:'Recover restricted findings before the wrong office decides what counts as evidence', result:'Suppressed evidence begins to move faster than authority can comfortably contain it.' }
  ]},
  customs_capture:{ title:'Customs Capture', actions:[
    { label:'Break the bonded fiction holding the customs wall together', result:'A revenue machine starts sounding more like extortion when its hidden assumptions are dragged into daylight.' },
    { label:'Force the queue captains to choose a side while the harbor still functions', result:'Traffic does not stop, but loyalty starts costing more than silence.' }
  ]},
  patrol_break:{ title:'Patrol Break', actions:[
    { label:'Hunt the missing discipline in the rider line before private force replaces public safety', result:'The road starts naming the people who broke it, even if they still wear the right colors.' },
    { label:'Turn northern rumor into targeted route pressure', result:'Loose fear becomes useful leverage once it stops running in every direction at once.' }
  ]}
};

const STAGE4_FAMILY_CONTENT = {
  grain_hegemony:{ title:'Grain Hegemony', actions:[
    { label:'Decide who gets to claim stewardship over scarcity at region scale', result:'Control over hunger begins shifting from private boards to names that will be remembered.' },
    { label:'Break a false scarcity ritual in front of the people forced to live under it', result:'A legendary humiliation lands on those who built order out of managed shortage.' }
  ]},
  freight_capture:{ title:'Freight Capture', actions:[
    { label:'Seize the freight spine before every smaller oath is priced against it', result:'The whole corridor starts bending around your momentum rather than around inherited contracts.' },
    { label:'Outmaneuver the lane barons in their own timing window', result:'A class of local tyrant discovers the route no longer belongs to them by default.' }
  ]},
  death_ledger_exposure:{ title:'Death Ledger Exposure', actions:[
    { label:'Expose the sacred-accounting lie that made private profit out of public passage', result:'The ledger itself becomes a weapon against the people who thought reverence made them untouchable.' },
    { label:'Protect the names before the houses burn the evidence and call it purification', result:'What survives can now damn the powerful more effectively than outrage ever could.' }
  ]},
  river_of_names:{ title:'River of Names', actions:[
    { label:'Turn the archive back against those who reduced names to leverage', result:'The archive begins acting like memory with teeth.' },
    { label:'Hold the record line while rival claimants try to drown it in sanctified procedure', result:'A line that once served obedience becomes the beginning of judgment.' }
  ]},
  sheresh_survival_crisis:{ title:'Sheresh Survival Crisis', actions:[
    { label:'Hold the commune lattice together while multiple domes fail in overlapping sequence', result:'Survival stops being local engineering and becomes a matter of public legitimacy.' },
    { label:'Force a choice between truth and orderly panic at the edge of collapse', result:'The whole commune learns who preferred control to survival when the choice could no longer be hidden.' }
  ]},
  cold_light_revelation:{ title:'Cold Light Revelation', actions:[
    { label:'Reveal the final research truth before sealed institutions can bury it again', result:'A revelation built for rooms of experts finally acquires the power to change the street.' },
    { label:'Make the hidden pattern visible where denial costs the most', result:'People who depended on ignorance lose the shelter of abstraction all at once.' }
  ]},
  shelk_trade_shock:{ title:'Shelk Trade Shock', actions:[
    { label:'Break the polished certainty that hid route abuse behind elegance', result:'The principality still looks beautiful, but now the beauty reads like a cover story.' },
    { label:'Force civic order to answer for the costs it pushed north and outward', result:'The city has to look at the labor and fear it called external.' }
  ]},
  northern_road_power:{ title:'Northern Road Power', actions:[
    { label:'Take the road back from those who taught it to obey intimidation', result:'A whole stretch of the north starts breathing differently once fear loses its monopoly.' },
    { label:'Demonstrate command of the line in front of lesser powers that once ruled it', result:'People who lived by roadside coercion learn they are no longer operating at your scale.' }
  ]}
};

const STAGE5_FAMILY_CONTENT = {
  axis_trial:{ title:'Axis Trial', finalBoss:'Axis-Bent Hierophant', finalHazard:'Axis Breach Spiral', creatureOutcome:'success', hazardOutcome:'containment', actions:[
    { label:'Stabilize the final axis pressure before the whole route logic tears wide', result:'The last conflict stops pretending to be local. Everything now bends around whether the world can still be kept coherent.' },
    { label:'Choose what kind of legend can survive the truth of the axis', result:'The final approach becomes less about winning cleanly and more about deciding what the world is allowed to remain.' }
  ]},
  exposure:{ title:'Grand Exposure', finalBoss:'Ledger Maw Devourer', finalHazard:'Cathedral Ledger Collapse', creatureOutcome:'exposure', hazardOutcome:'sacrificial_stabilization', actions:[
    { label:'Force the hidden structure into public sight before the record itself is destroyed', result:'The truth is now large enough that concealment must become violence if it wants to keep winning.' },
    { label:'Hold the surviving witness chain together under terminal pressure', result:'Exposure ceases to be an idea and becomes a thing people may have to bleed to preserve.' }
  ]},
  containment:{ title:'Last Containment', finalBoss:'Crowned Glass Stalker', finalHazard:'Frozen Dome Cascade', creatureOutcome:'containment', hazardOutcome:'containment', actions:[
    { label:'Fix the final boundary long enough to save what still can be saved', result:'Containment becomes a heroic act instead of an administrative word.' },
    { label:'Choose which line breaks and which line must not', result:'Every surviving structure now depends on decisions too large to feel personal and too costly not to be.' }
  ]},
  world_scar:{ title:'World Scar', finalBoss:'Titan Relay Breaker', finalHazard:'Relay Crown Fire', creatureOutcome:'world_scar', hazardOutcome:'world_scar', actions:[
    { label:'Force the endgame through damage that cannot be fully undone', result:'Victory begins to look possible only in forms the world will still be carrying generations later.' },
    { label:'Decide what wound the world can survive and what wound it cannot', result:'The final calculus stops being about comfort and becomes one of endurance, memory, and price.' }
  ]},
  divine_rerouting:{ title:'Divine Rerouting', finalBoss:'Axis-Bent Hierophant', finalHazard:'Cathedral Ledger Collapse', creatureOutcome:'divine_rerouting', hazardOutcome:'divine_rerouting', actions:[
    { label:'Redirect the sacred pressure before divine legitimacy and public order collapse together', result:'The old path to certainty is gone; what remains is a perilous chance to route meaning itself somewhere survivable.' },
    { label:'Risk a sacred correction no lesser office would ever sanction', result:'What counts as lawful, holy, and possible begins to split under the weight of your decision.' }
  ]}
};



function enrichFamilyActions(bank, stageLabel) {
  Object.keys(bank).forEach(key => {
    const family = bank[key];
    if (!family.actions) family.actions = [];
    if (family.actions.length < 3) {
      family.actions.push({
        label:`Exploit a weakness inside ${family.title.toLowerCase()} before the field can correct itself`,
        result:`A hidden weakness inside ${family.title.toLowerCase()} is pulled into the open. What looked stable now has a visible seam, and people start acting like they know it.`
      });
    }
    if (family.actions.length < 4 && stageLabel !== 'V') {
      family.actions.push({
        label:`Use reputation and route history to force a public decision inside ${family.title.toLowerCase()}`,
        result:`Prior victories, scars, and witnesses change the exchange. What once required permission now begins moving because your name is already in the room.`
      });
    }
  });
}

enrichFamilyActions(STAGE3_FAMILY_CONTENT, 'III');
enrichFamilyActions(STAGE4_FAMILY_CONTENT, 'IV');
enrichFamilyActions(STAGE5_FAMILY_CONTENT, 'V');

Object.assign(BESTIARY, {
  'Mercury-Rib Pursuer': { hp:18, attack:6, intent:'harry the line', text:'A fast route-hunter that treats hesitation as an opening.', weakness:'coordinated pressure', moves:['rush','flank','harry'], pack:2 },
  'Witness-Eater Shade': { hp:17, attack:6, intent:'erase proof', text:'A proof-hating shade that blooms where fear and omission already prepared the ground.', weakness:'ritual light', moves:['lunge','smother','scatter'], pack:1 },
  'Ironback Toll Beast': { hp:20, attack:7, intent:'hold the choke', text:'A lane-holding brute that makes every crossing feel taxed in blood as well as coin.', weakness:'mobility', moves:['slam','brace','roar'], pack:1 }
});
Object.assign(HAZARDS, {
  'Lane Shear Collapse': { severity:3, text:'An overused route gives way in layers, turning order, footing, and timing into a single problem.', weakness:'fast control' },
  'Witness Stampede': { severity:2, text:'Crowd fear and shouted certainty become one moving hazard that punishes delay.', weakness:'clear command' },
  'Ritual Backwash': { severity:3, text:'Protective work rebounds through the wrong bodies when procedure and panic collide.', weakness:'measured containment' }
});

function getStageFamilyContent(stage, family) {
  const bank = stage === 3 ? STAGE3_FAMILY_CONTENT : stage === 4 ? STAGE4_FAMILY_CONTENT : STAGE5_FAMILY_CONTENT;
  return bank[family] || {
    title: family.replace(/_/g,' '),
    actions: [
      { label:`Press ${family.replace(/_/g,' ')} through a sharper angle`, result:'The current route family hardens into something more public, more costly, and harder to reverse.' },
      { label:`Turn the pressure in ${family.replace(/_/g,' ')} against its owner`, result:'A hidden advantage becomes visible enough that the field begins reorganizing around it.' }
    ],
    finalBoss:'Axis-Bent Hierophant',
    finalHazard:'Axis Breach Spiral',
    creatureOutcome:'success',
    hazardOutcome:'containment'
  };
}


function currentNamedPlacements(localityId) {
  const ids = LOCALITY_NAMED_SURFACES[localityId] || [];
  return ids.map(id => ({ id, ...NAMED_NPC_PLACEMENT[id] })).filter(x => x.locality);
}


// ----- Batch 13 route atlas and placement expansion -----
Object.assign(NAMED_NPC_PLACEMENT, {
  elsa_forgeward:{ locality:'ashforge_citadel', office:'smelter ward office' },
  quill_sere:{ locality:'mimolot_academy', office:'licensed inquiry annex' },
  poran_wake:{ locality:'cosmoria', office:'tidal records berth' },
  iyra_stonewrit:{ locality:'ithtananalor', office:'quarry covenant desk' },
  mael_shardglass:{ locality:'shirshal', office:'evidence balcony' },
  torren_guildveil:{ locality:'guildheart_hub', office:'freight dues alcove' },
  vale_redash:{ locality:'brasswake_depot', office:'relay maintenance bay' },
  oris_paleflame:{ locality:'moonvault_cloister', office:'omen lantern archive' },
  siva_cairnhand:{ locality:'sanctum_sands', office:'lantern procession ward' },
  doro_linekeeper:{ locality:'unity_square', office:'market arbitration rail' }
});
Object.assign(LOCALITY_NAMED_SURFACES, {
  ashforge_citadel:['elsa_forgeward'],
  mimolot_academy:['quill_sere'],
  cosmoria:['poran_wake'],
  ithtananalor:['iyra_stonewrit'],
  shirshal:['mael_shardglass'],
  guildheart_hub:['torren_guildveil'],
  brasswake_depot:['vale_redash'],
  moonvault_cloister:['oris_paleflame'],
  sanctum_sands:['siva_cairnhand'],
  unity_square:['doro_linekeeper']
});
const ROUTE_ATLAS = {
  fairhaven_road:{risk:'moderate', style:'bonded civic road', safeFallback:'Bonded loft infirmary', note:'Traffic is observable and shame can become leverage quickly.'},
  harvest_circle_road:{risk:'moderate', style:'quota grain lane', safeFallback:'Field infirmary lean-to', note:'Labor, grain, and timing make small delays politically visible.'},
  glasswake_corridor:{risk:'high', style:'sealed research corridor', safeFallback:'Sealed observation recovery room', note:'Containment etiquette turns silence into a tactical signal.'},
  sanctum_sands_memorial_road:{risk:'moderate', style:'pilgrim and memorial road', safeFallback:'Lantern hospice court', note:'Grief and sacred procedure make every disruption socially loud.'},
  ironroot_crossing_freight_lane:{risk:'high', style:'freight-pressure lane', safeFallback:'Freight office recovery cot', note:'Weight, timing, and authority all stack on the same route.'},
  river_archive_causeway:{risk:'moderate', style:'archive causeway', safeFallback:'River ledger rest chamber', note:'Moisture, records, and witness loss make truth easy to damage.'},
  guildheart_hub_craftspire_workshop_corridor:{risk:'moderate', style:'workshop corridor', safeFallback:'Workshop bunk alcove', note:'Copy, craft, and dues pressure travel faster than courtesy.'},
  soreheim_proper_eternal_lands_freight_route:{risk:'high', style:'alloy freight route', safeFallback:'Exchange infirmary berth', note:'Allocation pressure and industrial timing create harsh failure states.'},
  zootian_border_herd_road:{risk:'moderate', style:'herd-border road', safeFallback:'Windbreak herd shelter', note:'Movement is open but never undefended for long.'},
  eastwater_quay_sealane:{risk:'high', style:'night-water sealane', safeFallback:'Quay rope loft', note:'Water, darkness, and cargo secrecy align badly here.'}
};
Object.assign(ROUTE_SCOUTING, {
  guildheart_hub_craftspire_workshop_corridor:'Workshop dues, copied patterns, and labor timing make this corridor read like a machine for turning skill into obligation.',
  guildheart_hub_unity_square_bargaining_road:'Bargaining becomes public theater here; hesitation costs almost as much as open weakness.',
  soreheim_proper_eternal_lands_freight_route:'Allocation pressure and alloy freight discipline make every interruption feel like a test of who matters.',
  zootian_border_herd_road:'Open land does not mean open safety; herd motion and border nerves turn distance into a pressure surface.',
  eastwater_quay_sealane:'Tide, manifests, and night-water silence make this line ideal for truths that want to stay unspoken.'
});


// ----- Batch 14 authored expansion, route-risk, and placement pass -----
Object.assign(NAMED_NPC_PLACEMENT, {
  ren_saltledger:{ locality:'river_archive_causeway', office:'river ledger rest chamber' },
  tal_meshrunner:{ locality:'ironroot_crossing', office:'freight triage rail' },
  cera_hushline:{ locality:'whitebridge_threshold', office:'sealway watch alcove' },
  ova_rimecord:{ locality:'hearthcoil_commune', office:'relief-line infirmary rack' },
  kir_dunewake:{ locality:'duneshade_outpost', office:'water tally shade' },
  len_varquay:{ locality:'eastwater_quay', office:'night manifest loft' },
  aster_reedmark:{ locality:'silent_haven', office:'convoy custody rail' },
  pel_ironmeasure:{ locality:'eternal_lands_exchange', office:'alloy arbitration booth' }
});
Object.assign(LOCALITY_NAMED_SURFACES, {
  river_archive_causeway:['ren_saltledger'],
  ironroot_crossing:['tal_meshrunner'],
  whitebridge_threshold:['cera_hushline'],
  hearthcoil_commune:['ova_rimecord'],
  duneshade_outpost:['kir_dunewake'],
  eastwater_quay:['len_varquay'],
  silent_haven:['aster_reedmark'],
  eternal_lands_exchange:['pel_ironmeasure']
});
Object.assign(ROUTE_ATLAS, {
  river_archive_causeway:{risk:'moderate', style:'memorial archive causeway', safeFallback:'River ledger rest chamber', note:'Wet stone, missing names, and witness drift make the line fragile in bureaucratic ways that still bleed.'},
  whitebridge_domeway:{risk:'high', style:'cold-sealed domeway', safeFallback:'Sealway watch alcove', note:'Containment discipline and cold shock punish sloppy movement immediately.'},
  plumes_end_northern_road:{risk:'moderate', style:'northern patrol road', safeFallback:'Patrol house recovery room', note:'Rumor outruns patrols here; what people fear becomes half the encounter.'},
  ironroot_crossing_freight_lane:{risk:'high', style:'industrial freight lane', safeFallback:'Freight triage rail', note:'Weight, sparks, and timing stack together until a small error becomes a public event.'},
  ashforge_supply_lift:{risk:'high', style:'vertical supply lift', safeFallback:'Smelter ward office', note:'Heat, depth, and quota pressure make every stoppage look intentional.'},
  guildheart_causeway:{risk:'moderate', style:'guild dues causeway', safeFallback:'Freight dues alcove', note:'Every passing load is counted by someone who expects to profit from hesitation.'},
  mimolot_toll_road:{risk:'moderate', style:'scholarly toll road', safeFallback:'Licensed inquiry annex', note:'Questions cost nearly as much as passage here.'},
  cosmoria_sealane:{risk:'high', style:'tidal sealane', safeFallback:'Tidal records berth', note:'Water, darkness, and archive cargo turn delay into genuine danger.'},
  ithtananalor_ironhold_quarry_road:{risk:'high', style:'quarry burden road', safeFallback:'Quarry covenant desk', note:'Stone weight and enforcement pride make collapse both physical and political.'},
  shirshal_crystal_grove_route:{risk:'moderate', style:'evidence-grove route', safeFallback:'Evidence balcony', note:'Truth is watched here almost as closely as movement.'}
});
Object.assign(ROUTE_SCOUTING, {
  ashforge_supply_lift:'Quota strain and lift timing make this route feel like a test of who is allowed to interrupt industry without being crushed by it.',
  guildheart_causeway:'Dues, witnesses, and guild memory make every bargain here linger longer than the speaker would like.',
  mimolot_toll_road:'Scholar traffic and tariff law turn curiosity into a measurable risk.',
  cosmoria_sealane:'Night water, archive cargo, and tide timing mean loss can disappear before dawn if no one acts quickly.',
  ithtananalor_ironhold_quarry_road:'Stone, labor, and covenant pride make this lane sturdy until it very suddenly is not.',
  shirshal_crystal_grove_route:'Evidence moves with ritual care here, and panic tends to arrive disguised as procedure.'
});
Object.assign(BESTIARY, {
  'Memorial Jackal Pack': { hp:14, attack:5, intent:'split the line', text:'Lean scavengers drawn to grief traffic and ritual waste.', weakness:'firm formation', moves:['snap','dart','scatter'], pack:3 },
  'Sealway Hunger Shade': { hp:16, attack:6, intent:'drain warmth', text:'A cold-fed thing that appears wherever containment etiquette gets sloppy.', weakness:'heat discipline', moves:['drain','rush','linger'], pack:1 },
  'Quarry Bone Ram': { hp:19, attack:7, intent:'break footing', text:'A brutal lane beast that treats narrow stone as a weapon.', weakness:'side pressure', moves:['ram','brace','trample'], pack:1 },
  'Tide-Lantern Gulper': { hp:18, attack:6, intent:'drag the witness down', text:'A quay predator that strikes when sound is masked by water and cargo noise.', weakness:'elevated ground', moves:['lunge','pull','sink'], pack:1 },
  'Guildhall Scrap Swarm': { hp:13, attack:5, intent:'overwhelm by number', text:'Metal-edged vermin thriving where dues and waste pile up together.', weakness:'clean fire', moves:['swarm','bite','scatter'], pack:4 }
});
Object.assign(HAZARDS, {
  'Procession Stampede': { severity:2, text:'Grief traffic, noise, and ritual timing collapse into a single moving crush.', weakness:'clear command' },
  'Sealway Whiteout': { severity:3, text:'Cold glare and blowing frost erase line, distance, and confidence at once.', weakness:'anchored guidance' },
  'Lift Chain Snap': { severity:3, text:'A stressed industrial line fails all at once, turning labor rhythm into impact and falling heat.', weakness:'fast bracing' },
  'Quarry Slipfall': { severity:2, text:'Loose stone and burden weight turn a work road into a cascading break zone.', weakness:'measured withdrawal' },
  'Quay Undertow Pull': { severity:3, text:'Dark water and cargo wash drag the unwary toward lethal angles.', weakness:'rope discipline' }
});

// expand family action banks with more authored verbs
[STAGE3_FAMILY_CONTENT, STAGE4_FAMILY_CONTENT].forEach(bank => {
  Object.values(bank).forEach(fam => {
    if (fam.actions.length < 5) {
      fam.actions.push({
        label: `Exploit local witness pressure inside ${fam.title.toLowerCase()} before a cleaner story can replace it`,
        result: `The local witness chain hardens around ${fam.title.toLowerCase()}, and several safer lies lose room to breathe.`
      });
    }
  });
});
Object.values(STAGE5_FAMILY_CONTENT).forEach(fam => {
  if (fam.actions.length < 4) {
    fam.actions.push({
      label: `Risk a final overreach inside ${fam.title.toLowerCase()} while the field is still unstable`,
      result: `The endgame bends further open. What remains now is no longer whether the pressure is real, but what form survival is still allowed to take.`
    });
  }
});

const STAGE_BALANCE_TARGETS = {
  3:{ expectedSkill:4, expectedParty:1, threatBias:1, note:'Stage III should feel wider, riskier, and more interconnected than Stage II.' },
  4:{ expectedSkill:6, expectedParty:1, threatBias:2, note:'Stage IV should feel high-pressure and public, with failures that move institutions.' },
  5:{ expectedSkill:8, expectedParty:2, threatBias:4, note:'Stage V should feel final, difficult, and survivable only through preparation and strong choices.' }
};

// ----- Batch 17 tangible progress: family-authored threat profiles, richer late-stage support -----
Object.assign(BESTIARY, {
  'Choir-Riven Penitent': { hp:19, attack:6, intent:'break formation', text:'A rite-broken zealot who moves like conviction turned into a weapon.', weakness:'public witness', moves:['rush','break line','howl'], pack:1 },
  'Quarry Lash Coloss': { hp:22, attack:7, intent:'crush the lane', text:'A quarry-grown brute that treats chains, stone, and bodies as the same obstacle.', weakness:'mobility', moves:['smash','brace','heave'], pack:1 },
  'Tide Ledger Leech': { hp:18, attack:6, intent:'consume proof', text:'A brine-thin thing that appears where records and bodies both go missing near the waterline.', weakness:'ritual light', moves:['drain','lunge','retreat'], pack:2 },
  'Dome Choir Lurker': { hp:20, attack:7, intent:'split the calm', text:'A cold-bent predator that hunts the edge between public order and panic.', weakness:'containment procedure', moves:['harry','feint','surge'], pack:1 },
  'Relay Pike Swarm': { hp:17, attack:6, intent:'overwhelm the weak flank', text:'Fast scavengers that turn route confusion into a coordinated rush.', weakness:'formation break', moves:['swarm','scatter','circle'], pack:3 }
});
Object.assign(HAZARDS, {
  'Witness Court Surge': { severity:3, text:'Testimony, accusation, and fear compress into a single public danger.', weakness:'clear command' },
  'Foundry Quench Burst': { severity:3, text:'Heat, steam, and overstrain explode together where the line was already failing.', weakness:'fast venting' },
  'Quay Undertow Break': { severity:3, text:'The waterline becomes a trap the moment weight and timing disagree.', weakness:'anchored discipline' },
  'Commune Heat Debt': { severity:3, text:'A survival network starts collapsing because too much heat has already been promised elsewhere.', weakness:'load shedding' },
  'Relay Stampede Front': { severity:3, text:'Bodies, carts, and panic become one moving wall in a chokepoint lane.', weakness:'lane splitting' }
});

const FAMILY_THREAT_PROFILES = {
  supply_war: {
    creatures:['Mercury-Rib Pursuer','Ironback Toll Beast','lane carrion kites'],
    hazards:['Lane Shear Collapse','field fire','Witness Stampede'],
    note:'Supply pressure now produces open lane violence and visible hunger-management force.'
  },
  convoy_break: {
    creatures:['Relay Pike Swarm','route predators','burrow gnashers'],
    hazards:['Relay Stampede Front','cart crush','road washout'],
    note:'Broken convoy logic turns every moving lane into a test of nerve, timing, and flank control.'
  },
  mortuary_politics: {
    creatures:['Witness-Eater Shade','ossuary shades','grave-lean scavengers'],
    hazards:['ritual crush','grief riots','Cathedral Ledger Collapse'],
    note:'Public passage rites begin failing into open political and spiritual danger.'
  },
  sacred_records: {
    creatures:['Witness-Eater Shade','archive bats','Tide Ledger Leech'],
    hazards:['Ritual Backwash','Cathedral Ledger Collapse','dock crush'],
    note:'The archive stops being neutral and starts defending itself through fear, denial, and collapse.'
  },
  commune_containment: {
    creatures:['Dome Choir Lurker','whiteout stalkers','frost-cracked lurkers'],
    hazards:['Commune Heat Debt','containment flare','Frozen Dome Cascade'],
    note:'Containment pressure becomes public survival pressure instead of a sealed technical problem.'
  },
  research_schism: {
    creatures:['Dome Choir Lurker','ice-veiled watchers','vault moths'],
    hazards:['seal failure','reactor echo','Ritual Backwash'],
    note:'Research conflict spills into the street as procedure, danger, and truth split apart.'
  },
  customs_capture: {
    creatures:['Mercury-Rib Pursuer','pier rats','marsh biters'],
    hazards:['dock crush','rope snap','Relay Stampede Front'],
    note:'Customs pressure turns traffic and fear into a weaponized queue.'
  },
  patrol_break: {
    creatures:['road stalk cats','ditch lurkers','Ironback Toll Beast'],
    hazards:['bridge drop','horse panic','Witness Court Surge'],
    note:'The road starts testing whether public force still deserves obedience.'
  },
  grain_hegemony: {
    creatures:['Quarry Lash Coloss','Relay Pike Swarm','lane carrion kites'],
    hazards:['field fire','stampede churn','Lane Shear Collapse'],
    note:'Regional grain control now produces mass coercion, panic, and predatory enforcement.'
  },
  freight_capture: {
    creatures:['Titan Relay Breaker','Relay Pike Swarm','Mercury-Rib Pursuer'],
    hazards:['Relay Crown Fire','chain failure','road washout'],
    note:'Freight capture threatens the corridor itself, not just the people using it.'
  },
  death_ledger_exposure: {
    creatures:['Ledger Maw Devourer','Witness-Eater Shade','Choir-Riven Penitent'],
    hazards:['Cathedral Ledger Collapse','ritual crush','Ritual Backwash'],
    note:'Exposure threatens both sacred legitimacy and the bodies keeping it in place.'
  },
  river_of_names: {
    creatures:['Tide Ledger Leech','Witness-Eater Shade','brine scavengers'],
    hazards:['Quay Undertow Break','Cathedral Ledger Collapse','dock crush'],
    note:'Memory, water, and recordkeeping all become hostile terrain when the names start mattering again.'
  },
  sheresh_survival_crisis: {
    creatures:['Crowned Glass Stalker','Dome Choir Lurker','whiteout stalkers'],
    hazards:['Frozen Dome Cascade','Commune Heat Debt','containment flare'],
    note:'Sheresh survival pressure becomes a region-scale legitimacy crisis.'
  },
  cold_light_revelation: {
    creatures:['Crowned Glass Stalker','ice-veiled watchers','Dome Choir Lurker'],
    hazards:['Axis Breach Spiral','reactor echo','seal failure'],
    note:'Cold-light truth stops being theoretical and begins warping real decisions at public scale.'
  },
  shelk_trade_shock: {
    creatures:['glyph-scarred hounds','Mercury-Rib Pursuer','archive bats'],
    hazards:['glyph runoff','festival bottleneck','Witness Court Surge'],
    note:'Trade panic and elegant civic order begin colliding in public view.'
  },
  northern_road_power: {
    creatures:['Ironback Toll Beast','road stalk cats','ditch lurkers'],
    hazards:['bridge drop','road washout','horse panic'],
    note:'Road power now belongs to whoever can hold the line under open pressure.'
  },
  axis_trial: {
    creatures:['Axis-Bent Hierophant','Crowned Glass Stalker'],
    hazards:['Axis Breach Spiral','Frozen Dome Cascade'],
    note:'Axis-scale pressure changes what counts as survivable reality.'
  },
  exposure: {
    creatures:['Ledger Maw Devourer','Witness-Eater Shade'],
    hazards:['Cathedral Ledger Collapse','Ritual Backwash'],
    note:'The final struggle is over whether truth can survive public collapse.'
  },
  containment: {
    creatures:['Crowned Glass Stalker','Dome Choir Lurker'],
    hazards:['Frozen Dome Cascade','Axis Breach Spiral'],
    note:'Containment is no longer policy. It is the last line holding reality together.'
  },
  world_scar: {
    creatures:['Titan Relay Breaker','Quarry Lash Coloss'],
    hazards:['Relay Crown Fire','Foundry Quench Burst'],
    note:'Endurance, infrastructure, and sacrifice define the shape of survival.'
  },
  divine_rerouting: {
    creatures:['Axis-Bent Hierophant','Choir-Riven Penitent'],
    hazards:['Cathedral Ledger Collapse','Axis Breach Spiral'],
    note:'Sacred rerouting forces a final choice between order, legitimacy, and survival.'
  }
};

function getFamilyThreatProfile(stage, family) {
  const profile = FAMILY_THREAT_PROFILES[family];
  if (profile) return profile;
  return { creatures:['Mercury-Rib Pursuer'], hazards:['Lane Shear Collapse'], note:`${family.replace(/_/g,' ')} now creates its own pressure surface.` };
}


// ----- Batch 18 tangible progress: family milestones, climax actions, and boss behavior registry -----
const FAMILY_MILESTONES = (() => {
  const out = {3:{},4:{},5:{}};
  const banks = {3: STAGE3_FAMILY_CONTENT, 4: STAGE4_FAMILY_CONTENT, 5: STAGE5_FAMILY_CONTENT};
  Object.entries(banks).forEach(([stage, bank]) => {
    Object.entries(bank).forEach(([family, content]) => {
      const actions = content.actions || [];
      out[stage][family] = actions.slice(0, 3).map((a, idx) => ({
        id: `${family}-m${idx+1}`,
        title: a.label,
        payoff: a.result
      }));
    });
  });
  return out;
})();

function getFamilyMilestones(stage, family) {
  return (FAMILY_MILESTONES[stage] && FAMILY_MILESTONES[stage][family]) || [
    { id:`${family}-m1`, title:`Press ${family.replace(/_/g,' ')}`, payoff:'A clear seam appears inside the pressure.' },
    { id:`${family}-m2`, title:`Turn ${family.replace(/_/g,' ')} against itself`, payoff:'Witnesses and pressure begin helping more than hindering.' },
    { id:`${family}-m3`, title:`Force the field to choose`, payoff:'The family is ready for a decisive break.' }
  ];
}

function getFamilyClimax(stage, family) {
  const title = family.replace(/_/g,' ');
  if (stage === 3) return {
    label: `Force a regional break inside ${title}`,
    result: `A regional version of ${title} stops hiding behind local confusion. Rival hands, witnesses, and institutions all have to answer the shift now.`
  };
  if (stage === 4) return {
    label: `Turn ${title} into public leverage`,
    result: `What was once a dangerous pattern becomes a legendary demonstration of command. Lesser powers are forced to react in public and under pressure.`
  };
  return {
    label: `Commit the final break inside ${title}`,
    result: `The endgame stops waiting for safer conditions. Every remaining power now has to answer what you have made unavoidable.`
  };
}

const BOSS_BEHAVIORS = {
  'Axis-Bent Hierophant': {
    opening:'The air around the figure bends authority, fear, and ritual expectation into the same suffocating shape.',
    phase2:'The Hierophant stops probing and begins imposing a sacred rhythm that punishes hesitation.',
    phase3:'The final phase feels less like a duel and more like a verdict trying to close around the whole field.',
    moves:['decree','surge','rend the line']
  },
  'Ledger Maw Devourer': {
    opening:'The thing advances like a missing archive given hunger and direction.',
    phase2:'Its movement becomes faster now that the first protections are gone, and every exposed truth feels edible to it.',
    phase3:'The final rush threatens witness, proof, and body all at once.',
    moves:['consume proof','lunge','tear the witness chain']
  },
  'Crowned Glass Stalker': {
    opening:'Cold light tracks every weakness in the line before the first strike even lands.',
    phase2:'The Stalker begins using the field as though it already belongs to it.',
    phase3:'Every surviving edge turns sharp, bright, and briefly impossible to ignore.',
    moves:['pierce','refract','whiteout rush']
  },
  'Titan Relay Breaker': {
    opening:'The corridor starts sounding damaged before the full weight even arrives.',
    phase2:'The Breaker begins destroying the ground logic around the fight rather than only the bodies in it.',
    phase3:'The final phase feels like infrastructure itself trying to fail in the creature’s favor.',
    moves:['crush relay','heave','break the lane']
  }
};

function getBossBehavior(name) {
  return BOSS_BEHAVIORS[name] || {
    opening:'The confrontation arrives with more pressure than any ordinary exchange can comfortably hold.',
    phase2:'The threat reveals a second shape once the first line of control is broken.',
    phase3:'The final phase leaves very little room for safe or ordinary play.',
    moves:['surge','break','close in']
  };
}

const FAMILY_INCIDENT_KEYWORDS = [
  ['ledger',['ledger','record','archive','names','witness']],
  ['convoy',['convoy','freight','supply','transfer','passage']],
  ['containment',['containment','commune','heat','cold','boundary','relay']],
  ['trade',['trade','market','exchange','tariff','confidence','alloy']],
  ['quarry',['quarry','forge','foundry','industrial','titan']],
  ['omen',['omen','night_water','prophecy','memory','tide','sealway']],
  ['pilgrimage',['memorial','pilgrim','sacred','death','divine']],
  ['patrol',['patrol','road','junction','customs','blackbook']]
];

const FAMILY_INCIDENT_TEMPLATES = {
  ledger:{
    nouns:['ledger vault','witness chain','record line'],
    labels:['crack the hidden custody around the {noun}','keep the {noun} intact while pressure closes in','turn the {noun} against the people hiding behind it'],
    results:['The {noun} stops behaving like neutral procedure and starts acting like a live weapon in the field.','The {noun} survives the exchange, but only because someone finally treated it as worth bleeding for.','What was supposed to disappear in the {noun} now survives long enough to damage people who expected immunity.']
  },
  convoy:{
    nouns:['convoy spine','freight column','passage line'],
    labels:['break the private grip on the {noun}','re-route the {noun} before rival hands harden the choke','hold the {noun} long enough for allies to arrive'],
    results:['The {noun} bends away from inherited control and starts answering to the run instead.','A moving line that once belonged to pressure and price now carries your mark across it.','The {noun} remains dangerous, but no longer belongs entirely to the people who priced fear into it.']
  },
  containment:{
    nouns:['containment seam','heat debt lattice','relay ward'],
    labels:['stabilize the failing {noun} before panic sets the terms','force the {noun} into public sight where denial hurts','buy time on the {noun} with a measured breach'],
    results:['The {noun} holds, but everyone nearby now knows how thin the line really was.','The {noun} becomes visible enough that sealed authority can no longer hide inside it.','A dangerous correction keeps the {noun} from collapsing outright, though the price shows on every face nearby.']
  },
  trade:{
    nouns:['market confidence lane','exchange book','tariff gate'],
    labels:['cut the people gaming the {noun} out of their window','force the {noun} to answer to public loss','turn the {noun} into leverage against its hidden owners'],
    results:['The {noun} stops acting like a private instrument and starts behaving like a public liability.','People who profited quietly from the {noun} now have to survive being seen doing it.','The {noun} still moves, but now it moves through fear that points in the other direction.']
  },
  quarry:{
    nouns:['industrial lift','quarry right','foundry channel'],
    labels:['take the {noun} before brute force locks it shut','force a weaker power off the {noun}','keep the {noun} moving under direct pressure'],
    results:['The {noun} keeps moving because you made a harder form of order than the old one.','What once felt like raw weight and metal now answers to judgment as well as force.','The {noun} is no longer safe, but it is no longer captive either.']
  },
  omen:{
    nouns:['omen line','night-water sign','sealway warning'],
    labels:['read the {noun} before fear reads it for everyone else','anchor the {noun} to witnesses who will not look away','force the {noun} into a survivable interpretation'],
    results:['The {noun} stops behaving like a rumor and starts acting like a shared fact.','People who wanted the {noun} buried now have to stand inside what it means.','The {noun} still terrifies, but it no longer terrifies on someone else\'s terms.']
  },
  pilgrimage:{
    nouns:['memorial procession','pilgrim route','sacred passage'],
    labels:['protect the {noun} without letting it become a shield for theft','turn the {noun} into judgment instead of reverence theater','carry the {noun} through pressure that should have broken it'],
    results:['The {noun} emerges intact enough to indict the people who profited from its silence.','A sacred line becomes an accusing one once enough people survive to remember it together.','The {noun} endures, but not in the harmless form its keepers expected.']
  },
  patrol:{
    nouns:['road command line','customs hold','junction file'],
    labels:['take the {noun} away from men who mistook it for private rule','make the {noun} answer to the people it was supposed to protect','split the {noun} before rival force can consolidate it'],
    results:['The {noun} breaks open and smaller tyrants realize they were never operating at your scale.','What once passed for order on the {noun} now reads like evidence instead.','The {noun} remains dangerous, but it is no longer unquestioned.']
  },
  default:{
    nouns:['pressure line','public seam','route hinge'],
    labels:['force the {noun} into the open','hold the {noun} until the field reorders','turn the {noun} against its owners'],
    results:['The {noun} stops being hidden enough to stay comfortable.','The {noun} holds only because someone finally treated it as worth the cost.','The {noun} becomes leverage in the hands of the run rather than the hands already profiting from it.']
  }
};

function familyIncidentProfile(family) {
  const lower = String(family || '').toLowerCase();
  for (const [key, words] of FAMILY_INCIDENT_KEYWORDS) {
    if (words.some(w => lower.includes(w))) return FAMILY_INCIDENT_TEMPLATES[key];
  }
  return FAMILY_INCIDENT_TEMPLATES.default;
}

function getFamilyIncident(stage, family, step=0) {
  const profile = familyIncidentProfile(family);
  const noun = profile.nouns[Math.abs(step) % profile.nouns.length];
  const actions = profile.labels.map((label, i) => ({
    label: label.replace(/\{noun\}/g, noun),
    result: profile.results[i % profile.results.length].replace(/\{noun\}/g, noun)
  }));
  return {
    key: `${stage}:${family}:${Math.abs(step) % profile.nouns.length}`,
    title: `${family.replace(/_/g,' ')} incident`,
    noun,
    actions
  };
}

// ----- Batch 19 tangible progress: route-atlas expansion, stage II family-content, build verification support -----
(function expandRouteAtlas(){
  Object.entries(LOCALITIES).forEach(([locId, loc]) => {
    (loc.adjacent || []).forEach(routeNode => {
      if (!ROUTE_ATLAS[routeNode]) {
        const destId = ROUTE_DESTINATIONS[routeNode] || locId;
        const dest = LOCALITIES[destId] || loc;
        ROUTE_ATLAS[routeNode] = {
          risk: loc.region === dest.region ? 'guarded' : 'contested',
          style: `${loc.polity} to ${dest.polity}`,
          note: `${loc.name} opens toward ${dest.name} through a lane shaped by ${([loc.pressure?.[0], dest.pressure?.[0], loc.hazards?.[0], dest.hazards?.[0]].filter(Boolean)[0]) || 'changing route pressure'}.`
        };
      }
    });
  });
})();

const STAGE2_FAMILY_CONTENT = {
  supply_war: {
    title:'supply war pressure',
    actions:[
      { label:'count the hungry lane', result:'The lane stops looking like traffic and starts reading like rationed desperation. Whoever owns the count owns the next argument.' },
      { label:'lean on storehouse witnesses', result:'Storehouse witnesses stop pretending the undercount is accidental. The route is now politically charged.' },
      { label:'split the load schedule', result:'A shifted load schedule exposes who profits from the strain and who will cut first when the lane hardens.' }
    ]
  },
  convoy_break: {
    title:'convoy break pressure',
    actions:[
      { label:'shadow the weak axle', result:'The convoy reveals its weak axle and its weakest oath in the same hour.' },
      { label:'turn escort fear outward', result:'Escort fear starts working for the run instead of against it.' },
      { label:'pressure the relay margin', result:'The relay margin narrows until every delayed cart becomes evidence.' }
    ]
  },
  mortuary_politics: {
    title:'mortuary politics',
    actions:[
      { label:'follow the body ledger', result:'The body ledger does not stay sacred when enough names fail to line up.' },
      { label:'pressure the petition line', result:'The petition line becomes a living measure of grief, price, and suppressed anger.' },
      { label:'split rite from revenue', result:'Separating rite from revenue exposes who has been feeding on the overlap.' }
    ]
  },
  sacred_records: {
    title:'sacred records pressure',
    actions:[
      { label:'test the archive seal', result:'The archive seal gives just enough to reveal who fears a complete reading.' },
      { label:'carry witness memory forward', result:'Witness memory starts outrunning the official record.' },
      { label:'stress the record chain', result:'A strained record chain stops behaving like neutral procedure.' }
    ]
  },
  commune_containment: {
    title:'commune containment strain',
    actions:[
      { label:'read the heat debt', result:'Heat debt turns into public truth once enough bodies start living the shortfall.' },
      { label:'test the sealed corridor', result:'The sealed corridor exposes what procedure is hiding and what it can no longer hold.' },
      { label:'force a repair choice', result:'Repair triage becomes political the moment not everyone can be saved at once.' }
    ]
  },
  research_schism: {
    title:'research schism',
    actions:[
      { label:'split public study from hidden study', result:'The line between sanctioned study and concealed study becomes thin enough to weaponize.' },
      { label:'turn procedure into leverage', result:'Procedure starts cutting both ways once enough people have seen its cost.' },
      { label:'trace the false clean room', result:'The clean room was never clean. It was only defended.' }
    ]
  },
  customs_capture: {
    title:'customs capture',
    actions:[
      { label:'watch the bonded queue', result:'The bonded queue becomes a public anatomy of privilege, fear, and selective enforcement.' },
      { label:'lean on the ferry clerks', result:'The clerks know where the pressure bends because they survive inside it.' },
      { label:'split storage from clearance', result:'Storage and clearance stop moving together, and the gap becomes useful.' }
    ]
  },
  patrol_break: {
    title:'patrol break pressure',
    actions:[
      { label:'watch the rider discipline crack', result:'Rider discipline cracks first in the eyes and only later in the line.' },
      { label:'force the toll story open', result:'The toll story stops sounding official once enough versions exist at once.' },
      { label:'separate road fear from road law', result:'Road fear and road law stop traveling together.' }
    ]
  },
  default: {
    title:'adjacent inter-polity pressure',
    actions:[
      { label:'read the route strain', result:'The route strain becomes legible enough to exploit.' },
      { label:'lean on local witnesses', result:'Local witnesses stop treating the pressure as something that can be ignored.' },
      { label:'turn access into leverage', result:'Access starts behaving like a weapon instead of a privilege.' }
    ]
  }
};

function getStage2FamilyContent(routeNode){
  const fam = (ROUTE_FAMILIES[routeNode] && ROUTE_FAMILIES[routeNode].stage3) || null;
  return STAGE2_FAMILY_CONTENT[fam] || STAGE2_FAMILY_CONTENT.default;
}


const FAMILY_REWARDS = {
  3: {
    supply_war:{ title:'Lane Marshal Edge', skillBonuses:{combat:1,survival:1}, actionBonuses:{scout:1}, text:'Long lane pressure now reads like a pattern instead of a threat cloud.' },
    convoy_break:{ title:'Convoy Splitter Edge', skillBonuses:{survival:1,stealth:1}, actionBonuses:{retreat:1,formation:1}, text:'Moving pressure breaks apart earlier and with less cost to the run.' },
    mortuary_politics:{ title:'Mourner-Court Edge', skillBonuses:{persuasion:1,lore:1}, actionBonuses:{ritual:1,rescue:1}, text:'Grief, testimony, and rite now give up leverage instead of only risk.' },
    sacred_records:{ title:'Archive Breach Edge', skillBonuses:{lore:1,craft:1}, actionBonuses:{study:1,exploit:1}, text:'Record pressure becomes easier to read and harder for others to hide behind.' },
    commune_containment:{ title:'Containment Hand Edge', skillBonuses:{craft:1,survival:1}, actionBonuses:{contain:1,seal:1}, text:'Cold procedure and broken seal logic no longer arrive as unreadable panic.' },
    research_schism:{ title:'Procedure Split Edge', skillBonuses:{lore:1,persuasion:1}, actionBonuses:{study:1,ritual:1}, text:'Research conflict yields seams that would once have stayed hidden.' },
    customs_capture:{ title:'Bonded Queue Edge', skillBonuses:{persuasion:1,stealth:1}, actionBonuses:{background:1,command:1}, text:'Traffic, waiting, and selective enforcement now betray themselves more quickly.' },
    patrol_break:{ title:'Roadline Edge', skillBonuses:{combat:1,persuasion:1}, actionBonuses:{intimidate:1,scout:1}, text:'Road force stops feeling inevitable once its weak discipline is visible.' }
  },
  4: {
    grain_hegemony:{ title:'Harvest Shock Edge', skillBonuses:{combat:1,persuasion:1}, actionBonuses:{command:1,formation:1}, text:'Mass pressure now breaks faster when you force the line to declare itself.' },
    freight_capture:{ title:'Corridor Breaker Edge', skillBonuses:{combat:1,craft:1}, actionBonuses:{environment:1,seal:1}, text:'Industrial lanes start giving way under prepared pressure instead of only under brute force.' },
    death_ledger_exposure:{ title:'Witness Ledger Edge', skillBonuses:{lore:1,persuasion:1}, actionBonuses:{ritual:1,background:1}, text:'Exposure now harms hostile lies more than it harms you.' },
    river_of_names:{ title:'Name-Current Edge', skillBonuses:{lore:1,survival:1}, actionBonuses:{contain:1,redirect:1}, text:'Water, memory, and route-risk stop acting like separate problems.' },
    sheresh_survival_crisis:{ title:'Heatline Edge', skillBonuses:{craft:1,survival:1}, actionBonuses:{contain:1,protect:1}, text:'Survival pressure can be shaped instead of merely endured.' },
    cold_light_revelation:{ title:'Aurora Fracture Edge', skillBonuses:{lore:1,stealth:1}, actionBonuses:{study:1,exploit:1}, text:'Cold-light truth gives the run sharper openings inside unstable conditions.' },
    shelk_trade_shock:{ title:'Civic Panic Edge', skillBonuses:{persuasion:1,combat:1}, actionBonuses:{command:1,intimidate:1}, text:'Refined order now breaks in predictable ways once enough pressure lands publicly.' },
    northern_road_power:{ title:'Northern Hold Edge', skillBonuses:{combat:1,survival:1}, actionBonuses:{formation:1,scout:1}, text:'Road power becomes easier to seize and harder for lesser forces to contest.' }
  },
  5: {
    axis_trial:{ title:'Axis Trial Edge', skillBonuses:{combat:1,lore:1}, actionBonuses:{exploit:2}, text:'Axis-scale pressure no longer feels wholly beyond preparation.' },
    exposure:{ title:'World-Witness Edge', skillBonuses:{persuasion:1,lore:1}, actionBonuses:{command:2}, text:'Public truth now arrives with force instead of only danger.' },
    containment:{ title:'Last-Seal Edge', skillBonuses:{craft:1,survival:1}, actionBonuses:{contain:2,seal:2}, text:'Containment work at world scale becomes difficult but no longer hopeless.' },
    world_scar:{ title:'Scar-Bearer Edge', skillBonuses:{combat:1,craft:1}, actionBonuses:{protect:2,environment:1}, text:'Infrastructure collapse can be survived and redirected through hard-earned field mastery.' },
    divine_rerouting:{ title:'Rerouting Edge', skillBonuses:{lore:1,persuasion:1}, actionBonuses:{ritual:2,background:1}, text:'Divine pressure can now be met with more than desperation.' }
  }
};

function getFamilyReward(stage, family) {
  return (FAMILY_REWARDS[stage] && FAMILY_REWARDS[stage][family]) || {
    title: `${family.replace(/_/g,' ')} edge`,
    skillBonuses:{},
    actionBonuses:{},
    text:'The family leaves behind a usable advantage once enough pressure has been mastered.'
  };
}

const BUILD_VERIFICATION = {
  batch: 21,
  archetypes: Object.keys(ARCHETYPES).length,
  backgrounds: Object.values(BACKGROUNDS).reduce((n, arr) => n + arr.length, 0),
  routeSignatures: Object.keys(BACKGROUND_ROUTE_SIGNATURES).length,
  localities: Object.keys(LOCALITIES).length,
  routeAtlasEntries: Object.keys(ROUTE_ATLAS).length,
  namedPlacements: Object.keys(NAMED_NPC_PLACEMENT).length,
  stage3Families: Object.keys(STAGE3_FAMILY_CONTENT).length,
  stage4Families: Object.keys(STAGE4_FAMILY_CONTENT).length,
  stage5Families: Object.keys(STAGE5_FAMILY_CONTENT).length,
  rewardFamilies: Object.values(FAMILY_REWARDS).reduce((n, bank) => n + Object.keys(bank).length, 0)
};


// ----- Batch 22 tangible progress: objective webs, exact placement repairs, and missing adjacency fixes -----
Object.assign(ROUTE_DESTINATIONS, {
  moonvault_quay_descent:'eastwater_quay',
  moonvault_pilgrim_stair:'pilgrim_scarp',
  brasswake_unity_relay_road:'unity_square',
  brasswake_craftspire_maintenance_lane:'craftspire',
  pilgrim_scarp_memorial_drop:'sanctum_sands',
  pilgrim_scarp_causeway_return:'river_archive_causeway'
});

Object.assign(ROUTE_ATLAS, {
  moonvault_quay_descent:{risk:'moderate', style:'cloister descent', safeFallback:'Night manifest loft', note:'Prayer traffic thins into quay secrecy and omen-watch tension.'},
  moonvault_pilgrim_stair:{risk:'moderate', style:'pilgrim stair', safeFallback:'Pilgrim guide house', note:'Devotional movement and height both punish hesitation.'},
  brasswake_unity_relay_road:{risk:'moderate', style:'relay market road', safeFallback:'Market arbitration rail', note:'Maintenance pressure becomes bargaining pressure the moment the road clogs.'},
  brasswake_craftspire_maintenance_lane:{risk:'high', style:'maintenance lane', safeFallback:'Licensed copy examiner', note:'Repair crews, hot metal, and delivery timing make small errors loud.'},
  pilgrim_scarp_memorial_drop:{risk:'moderate', style:'memorial descent', safeFallback:'Lantern hospice court', note:'Pilgrimage grief and steep footing turn disruption into ritual danger.'},
  pilgrim_scarp_causeway_return:{risk:'moderate', style:'archive return lane', safeFallback:'River ledger rest chamber', note:'Records, witnesses, and memorial traffic all meet in one brittle corridor.'}
});

Object.assign(ROUTE_SCOUTING, {
  moonvault_quay_descent:'The cloister descent hides where omen traffic becomes quay secrecy and night manifest bargaining.',
  moonvault_pilgrim_stair:'The stair is devotional until pressure hits it; then every pause becomes public meaning.',
  brasswake_unity_relay_road:'Relay wear and bargaining pressure share this line, making every stoppage politically useful to someone.',
  brasswake_craftspire_maintenance_lane:'Maintenance and workshop timings overlap here until metal, schedule, and blame become one problem.',
  pilgrim_scarp_memorial_drop:'The memorial descent amplifies grief, fatigue, and witness pressure all at once.',
  pilgrim_scarp_causeway_return:'The return lane gathers pilgrims, records, and unresolved names into one narrow public seam.'
});

const OBJECTIVE_WEB_LIBRARY = {
  person: {
    tags:['Safe'],
    verb:'Turn a key person',
    make:(family,title)=>({
      label:`Turn a key person inside ${title}`,
      result:`A pressure-bearing figure inside ${title.toLowerCase()} stops behaving like background authority and starts making choices under your influence.`
    })
  },
  place: {
    tags:['Risky'],
    verb:'Enter the place that matters',
    make:(family,title)=>({
      label:`Enter the critical place inside ${title}`,
      result:`The important place inside ${title.toLowerCase()} stops being rumor and becomes a terrain problem you can finally shape.`
    })
  },
  records: {
    tags:['Safe'],
    verb:'Pull the records seam',
    make:(family,title)=>({
      label:`Pull the records seam inside ${title}`,
      result:`A records seam inside ${title.toLowerCase()} starts naming who benefited when the public story stayed blurred.`
    })
  },
  stealth: {
    tags:['Bold'],
    verb:'Infiltrate the hidden angle',
    make:(family,title)=>({
      label:`Infiltrate the hidden angle inside ${title}`,
      result:`What was protected by timing and silence inside ${title.toLowerCase()} now has a witness chain attached to it.`
    })
  },
  force: {
    tags:['Bold','Risky'],
    verb:'Force the line',
    make:(family,title)=>({
      label:`Force the line inside ${title}`,
      result:`The pressure in ${title.toLowerCase()} stops assuming consent once you make resistance more expensive than concession.`
    })
  },
  ritual: {
    tags:['Safe'],
    verb:'Use ritual procedure',
    make:(family,title)=>({
      label:`Use ritual procedure inside ${title}`,
      result:`Procedure, rite, and remembered limits turn ${title.toLowerCase()} into something survivable long enough to exploit.`
    })
  },
  route: {
    tags:['Risky'],
    verb:'Split the route pressure',
    make:(family,title)=>({
      label:`Split the route pressure inside ${title}`,
      result:`The route pressure feeding ${title.toLowerCase()} loses its clean direction and starts exposing who cannot adapt.`
    })
  }
};

const FAMILY_WEB_MODES = {
  supply_war:['records','person','route','force','place','ritual'],
  convoy_break:['route','stealth','person','place','force','records'],
  mortuary_politics:['records','ritual','person','place','force','stealth'],
  sacred_records:['records','stealth','ritual','person','place','route'],
  commune_containment:['ritual','place','records','person','route','force'],
  research_schism:['records','person','stealth','ritual','place','force'],
  customs_capture:['person','records','place','route','force','stealth'],
  patrol_break:['route','person','force','place','records','stealth'],
  grain_hegemony:['route','person','force','records','place','ritual'],
  freight_capture:['route','force','place','person','stealth','records'],
  death_ledger_exposure:['records','ritual','person','stealth','place','force'],
  river_of_names:['records','route','ritual','person','place','stealth'],
  sheresh_survival_crisis:['ritual','route','place','person','force','records'],
  cold_light_revelation:['records','ritual','stealth','place','person','force'],
  shelk_trade_shock:['person','route','records','place','force','stealth'],
  northern_road_power:['route','force','person','place','records','stealth'],
  axis_trial:['ritual','force','records','route','place','person'],
  exposure:['records','stealth','person','force','place','route'],
  containment:['ritual','place','force','route','records','person'],
  world_scar:['force','route','place','person','records','ritual'],
  divine_rerouting:['ritual','records','person','route','place','force']
};

function getFamilyObjectiveWeb(stage, family) {
  const title = getStageFamilyContent(stage, family).title;
  const modes = FAMILY_WEB_MODES[family] || ['person','place','records','stealth','force','ritual'];
  return modes.map((mode, idx) => {
    const maker = OBJECTIVE_WEB_LIBRARY[mode] || OBJECTIVE_WEB_LIBRARY.person;
    const built = maker.make(family, title);
    return {
      mode,
      key:`${stage}:${family}:${mode}:${idx}`,
      tags: maker.tags || ['Safe'],
      label: built.label,
      result: built.result
    };
  });
}
