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
    ['healer','Healer','magic','Body, recovery, and consequence','craft'],
    ['artificer','Artificer','stealth','Tools, seals, and field devices','craft'],
    ['engineer','Engineer','combat','Systems repair and route works','craft'],
    ['tactician','Tactician','combat','Formation logic and command','lore'],
    ['alchemist','Alchemist','magic','Compounds, antidotes, solvents','craft'],
    ['saint','Saint','magic','Mercy, witness, and costly resolve','persuasion'],
    ['warden','Warden','combat','Custody and boundary enforcement','combat'],
    ['warlord','Warlord','combat','Field command and morale pressure','persuasion'],
    ['death_knight','Death Knight','combat','Terrible oath and ruinous force','combat'],
    ['oracle','Oracle','magic','Omens, patterns, and dread certainty','lore'],
    ['bard','Bard','stealth','Voice, memory, and public sway','persuasion']
  ].map(([id,name,group,desc,focus])=>({id,name,group,desc,focus}));

  const KEY_LOCALITIES = {
    panim_haven: {
      id:'panim_haven', name:'Panim Haven', polity:'House Panim', safeZone:'Memorial Waystation',
      summary:'Afterlife-service and divine mediation metropolis of ledgers, shrines, offerings, and memorial traffic.',
      economicRole:'afterlife preparations, offerings, mediation', lawFeel:'sacrificial and mediation decorum; offering-failure is a civil matter',
      pressures:['divine balance obligations','processional strain','seal dispute','mediation backlog'],
      greetings:['ritual seriousness and respectful petition at thresholds','soft acknowledgements before shrine approach'],
      rituals:['afterlife preparations before ledger work','offerings set at mediation courts','divine-balance invocations at processional entries'],
      hazards:['processional_crush','ledger_fog'], creatures:['veil_moth','gravewater_hound']
    },
    sunspire_haven: {
      id:'sunspire_haven', name:'Sunspire Haven', polity:'Soreheim Alliance', safeZone:'Convoy Rest Yard',
      summary:'Rural crossroads market town where tools, grain contracts, and labor obligations move through workshop syndicates and patron-families.',
      economicRole:'tools, textiles, market exchange, grain routing, labor brokerage', lawFeel:'communal ownership norms enforced through regional decrees, syndicate records, and family obligation',
      pressures:['predators','water system vulnerabilities','storage disputes','family favor feuds'],
      greetings:['contribute and trade fairly at the syndicate yard','show respect to the family controlling the yard you stand in','carry sealed papers when moving labor or grain'],
      rituals:['harvest and unity rites beside practical oath-rituals for contracts','route prayers at convoy departure'],
      hazards:['predator_breach','water_line_break'], creatures:['pack_raider','frost_scavenger']
    },
    aurora_crown_commune: {
      id:'aurora_crown_commune', name:'Aurora Crown Commune', polity:'Sheresh Communes', safeZone:'Dome Relief Cell',
      summary:'Largest Sheresh dome commune where survival administration, celestial study, and public endurance ritual converge.',
      economicRole:'protective craftwork, calibration tools, celestial research support', lawFeel:'containment law, resource triage, mandatory repair rotations',
      pressures:['dome stress','contamination seepage','ration balancing'],
      greetings:['respect dome protocols at every threshold','report cracks and supply irregularities immediately'],
      rituals:['aurora and survival observance communal rather than triumphal','mandatory repair rotation acknowledgements at shift end'],
      hazards:['dome_breach','contamination_seepage'], creatures:['aurora_leech','dome_lurker']
    },
    shelkopolis: {
      id:'shelkopolis', name:'Shelkopolis', polity:'Principality of Shelk', safeZone:'Roadwarden Annex Ward',
      summary:'Largest metropolis of the Principalities, defined by fashion, trade, refined civic order, and visible devotional plurality.',
      economicRole:'fashion production, enchanted tailoring, merchant exchange, craft education, Roadwarden support industry', lawFeel:'fashion and decorum law intensify in noble spaces; intellectual property law is serious in elite and archival sites',
      pressures:['glyph corruption beyond the city','trade security obligations','noble rivalry','festival traffic'],
      greetings:['observe site-specific decorum','respect local fashion and craft traditions','follow Roadwarden road and market order','treat shrines and archives with reverence'],
      rituals:['visible offerings for Compassion and renewal at district shrines','observance bands intensify noble and artisan gatherings'],
      hazards:['glyph_surge','stampede_front'], creatures:['quay_thief','watch_hound']
    },
    harvest_circle: {
      id:'harvest_circle', name:'Harvest Circle', polity:'Soreheim Alliance', safeZone:'Threshing Shelter',
      summary:'Cultural and market town where harvest patron-families, quota clerks, and festival brokers turn field output into alliance redistribution.',
      economicRole:'grain redistribution, festival trade, storage, convoy assembly', lawFeel:'market peace enforced through communal law, clerk records, and family responsibility',
      pressures:['spoilage','price pressure','favor feuds','route congestion'],
      greetings:['declare loads honestly at stalls','respect family-controlled stalls and convoy order','treat festival exchange as civic duty as well as profit'],
      rituals:['unity and harvest rites public and crowded','festival exchange resets debts, favors, and work pledges'],
      hazards:['spoilage_break','route_choke'], creatures:['field_maw','granary_ratking']
    },
    glasswake_commune: {
      id:'glasswake_commune', name:'Glasswake Commune', polity:'Sheresh Communes', safeZone:'Research Quarantine Nook',
      summary:'Sheresh research commune devoted to contamination measurement, cold-light study, and shield experimentation.',
      economicRole:'testing instruments, ward maintenance, data exchange', lawFeel:'quarantine law, research containment protocol; violation is a communal emergency',
      pressures:['exposure incidents','quarantine fatigue','instrument failure'],
      greetings:['submit to scanning at every checkpoint','treat every breach as real until cleared'],
      rituals:['ritual life subdued and tied to survival timing','sample protocols observed before major work runs'],
      hazards:['exposure_breach','instrument_failure'], creatures:['glasswake_mite','choir_lurker']
    },
    fairhaven: {
      id:'fairhaven', name:'Fairhaven', polity:'Principality of Shelk', safeZone:'Market Chapel Cellar',
      summary:'Agricultural and artisanal town supporting Shelkopolis while sitting near active glyph-cave pressure.',
      economicRole:'food supply, alchemical ingredients, enchanted tools, minor arms and textiles', lawFeel:'standard Shelk road and market law; increased concern for dangerous magic near glyph anomalies',
      pressures:['glyph corruption','celestial creatures at Watchers Perch','suspicious travelers in taverns'],
      greetings:['respect local purification rites at chapel approaches','heed warnings about celestial creatures and cave anomalies'],
      rituals:['Felujitas and Cyfoes visible through chapel and fountain worship','lamp-trim at threshold shrines'],
      hazards:['glyph_surge','celestial_breach'], creatures:['celestial_enforcer','cave_lurk']
    },
    mimolot_academy: {
      id:'mimolot_academy', name:'Mimolot Academy', polity:'House Mimolot', safeZone:'Archive Convalescence Alcove',
      summary:'Center for noble education and magical schooling where knowledge tariffs are enforced and scholarly decorum is mandatory.',
      economicRole:'education, knowledge tariffs, magic items', lawFeel:'book tariff and magical conduct law; unauthorized copying is criminal',
      pressures:['tariff tensions','faculty privilege disputes','tutor magistrate enforcement','knowledge access disputes'],
      greetings:['scholarly decorum at all lecture and archive approaches','rank-conscious acknowledgements','quiet citation-first exchanges'],
      rituals:['ink-touch before lecture entries','candle rites in memory halls','knowledge tariff verification before archive access'],
      hazards:['tariff_dispute','archive_lock'], creatures:['ink_wisp','catalog_biter']
    },
    soreheim_proper: {
      id:'soreheim_proper', name:'Soreheim Proper', polity:'Soreheim Alliance', safeZone:'Forge Rest Gallery',
      summary:'Harsh hierarchical tower-centered production core where alliance governance, foreign affairs, war output, and high-order manufacturing converge across Titan Towers.',
      economicRole:'high-order manufacturing, war production, refinement, distribution, foreign trade oversight', lawFeel:'communal ownership and restorative justice enforced through central tower review; domestic patronage never supersedes Soreheim Proper decree',
      pressures:['quota demands','political rivalry','foreign pressure','industrial accidents','tower maintenance strain'],
      greetings:['meet quotas and declare work status at tower gates','respect tower rank in all encounters','treat decrees, seals, and work assignments as binding'],
      rituals:['ambition and merit judgment public at tower oath displays','spark-offerings at forge altars before shift bells'],
      hazards:['tower_shear','industrial_break'], creatures:['slag_hound','quarry_coloss']
    },
    shirshal: {
      id:'shirshal', name:'Shirshal', polity:'House Shirsh', safeZone:'Witness Court Side Hall',
      summary:'Investigative magical-law center where Magi Magistratus enforces magical compliance and investigation is formal economic activity.',
      economicRole:'investigation, magical research, case archiving', lawFeel:'magical compliance law saturates public life; arcane scrutiny at every threshold',
      pressures:['magical law violations','witness backlog','arcane scrutiny pressure','custody delay'],
      greetings:['cooperate with inquiries at every checkpoint','measured witness greetings','formal truth-invocations at court doors'],
      rituals:['water-touch before testimony','quiet oath phrases in queue','arcane compliance checks before chamber entry'],
      hazards:['arcane_discharge','seal_feedback'], creatures:['court_leech','record_hunter']
    },
    ithtananalor: {
      id:'ithtananalor', name:'Ithtananalor', polity:'Principality of Roaz', safeZone:'Enforcement Checkpoint Ward',
      summary:'Fortified administrative heart of Roaz where legal identity, anti-magic law, prison labor, and enforcement culture visibly merge.',
      economicRole:'ore control, legal infrastructure, technology, prison labor logistics', lawFeel:'Roazian antimagic and order law saturate public life; compliance is non-negotiable',
      pressures:['illicit magic','smuggling','public accountability for harsh enforcement'],
      greetings:['comply promptly at checkpoints','accept inspection without resistance','treat law as public culture rather than negotiable custom'],
      rituals:['document verification before entry','seal inspection at all gates','justice-aligned civic order at public symbolism points'],
      hazards:['enforcement_raid','containment_breach'], creatures:['ore_hound','guard_construct']
    },
    guildheart_hub: {
      id:'guildheart_hub', name:'Guildheart Hub', polity:'The Union', safeZone:'Guild Hall Archive Chamber',
      summary:'Dense industrial-urban nerve center of the Union where guild rank supersedes noble birth and contract legitimacy is public law.',
      economicRole:'arbitration, tariff mediation, warehouse registration, trade sanctioning', lawFeel:'contract and sanction logic are publicly legible; failure to register goods attracts rapid administrative consequences',
      pressures:['legacy Mal claims','smuggling','Red Hood rumor presence','imperial oversight'],
      greetings:['declare business plainly at guild gates','observe queue and hearing order','produce records when challenged','respect sanction notices'],
      rituals:['sanction notice reading at market opening','contract seal verification before freight release'],
      hazards:['warehouse_collapse','fire_break'], creatures:['guild_enforcer','contract_bound']
    },
    cosmoria: {
      id:'cosmoria', name:'Cosmoria', polity:'House Cosmouth', safeZone:'Maritime Archive Hall',
      summary:'Floating intellectual and shipwright metropolis where archives, maritime etiquette, and shipwright economy define access and status.',
      economicRole:'shipwright industry, archives, maritime trade', lawFeel:'archive and tax discipline; maritime etiquette failures are social and legal liabilities',
      pressures:['storm weather','trade vulnerability'],
      greetings:['respect archives and maritime administration at all landings','sea communion etiquette before major passages'],
      rituals:['maritime blessing before passage','noble retreat and sea communion culture in upper tiers'],
      hazards:['storm_surge','deck_collapse'], creatures:['sea_leech','floating_scavenger']
    },
    craftspire: {
      id:'craftspire', name:'Craftspire', polity:'The Union', safeZone:'Workshop Quarter Alcove',
      summary:'Highly urbanized production district where artisan output, book-copy bureaucracy, and licensed knowledge trade converge into industrial economic authority.',
      economicRole:'book copying, regulated magical trade, artisan showcase production, warehouse integration', lawFeel:'book-tax and copy-right law; unauthorized reproduction is criminally prosecuted',
      pressures:['copy theft','intellectual property disputes','material shortages','sabotage'],
      greetings:['respect queue and workshop boundaries','do not touch commissioned work','observe tariff marking rules'],
      rituals:['practical devotion in workshop alcoves','opening rites before major work runs'],
      hazards:['fire_break','sabotage_strike'], creatures:['guild_enforcer','workshop_raider']
    },
    unity_square: {
      id:'unity_square', name:'Unity Square', polity:'The Union', safeZone:'Exchange Quarter Holding Room',
      summary:'High-density urban exchange quarter where negotiated trade replaces inherited privilege as the public language of status, procedure, and access.',
      economicRole:'market mediation, spot trade, inspection fees, transport matching', lawFeel:'market fraud and sanction breaches draw immediate official response; guild colors are operative facts',
      pressures:['price shocks','cargo theft','route closures','public rumor flareups'],
      greetings:['state terms clearly at exchange gates','observe inspection lines','treat posted rates and guild colors as operative facts'],
      rituals:['market rhythm dominates','small shrines at exchange edges for opening rites'],
      hazards:['cargo_theft','route_choke'], creatures:['exchange_raider','rumor_runner']
    },
    ironhold_quarry: {
      id:'ironhold_quarry', name:'Ironhold Quarry', polity:'Principality of Roaz', safeZone:'Quarry Overseer Station',
      summary:'Major Roazian extraction site linked to law, labor discipline, and strategic infrastructure supply.',
      economicRole:'ore, stone, strategic construction resources', lawFeel:'high enforcement visibility; labor zone violations treated as direct Roazian authority challenges',
      pressures:['labor harshness','resource theft','border competition'],
      greetings:['obey labor zones and guard instructions at all entry points'],
      rituals:['low-ornament discipline at shift starts','civic necessity observed before extraction work'],
      hazards:['quarry_collapse','labor_break'], creatures:['ore_hound','quarry_coloss']
    },
    plumes_end_outpost: {
      id:'plumes_end_outpost', name:"Plume's End Outpost", polity:'Principality of Shelk', safeZone:'Caravan Rest Post',
      summary:'Northern road outpost guarding and servicing caravans between Shelkopolis and Fairhaven.',
      economicRole:'caravan staging, route security, hazard reading, shrine services', lawFeel:'Shelk road and patrol law; shrine etiquette violations treated as omens requiring correction',
      pressures:['caravan disruption rumors','celestial enforcer sightings'],
      greetings:['submit to route order at the post gate','respect shrine etiquette','state business clearly to patrol leaders'],
      rituals:['Shrine of Cysur safe-journey offerings before northward departure'],
      hazards:['celestial_breach','caravan_attack'], creatures:['celestial_enforcer','road_predator']
    },
    whitebridge_commune: {
      id:'whitebridge_commune', name:'Whitebridge Commune', polity:'Sheresh Communes', safeZone:'Crossing Shelter Hall',
      summary:'Sheresh crossing commune that keeps frozen route traffic, emergency shelter, and arbitration moving between domes.',
      economicRole:'shelter service, route maps, crossing support', lawFeel:'crossing declaration law, shared emergency supply rules; concealment during emergencies is a communal crime',
      pressures:['bridge icing','refugee surges','missing expeditions'],
      greetings:['declare route intent at crossing registration','share hazard knowledge before departure'],
      rituals:['survival storytelling binds the community in evening cycles','crossing acknowledgements before hazardous bridge transit'],
      hazards:['bridge_ice','storm_surge'], creatures:['frost_scavenger','refuge_raider']
    }
  };

  // ── LOCALITY SCENE DATA ──────────────────────────────────
  // Sensory content model for the narration UI rewrite.
  // Each entry maps a locality id to observable scene details.
  window.LOCALITY_SCENE_DATA = {
    panim_haven: {
      sensory:{
        sight:['incense smoke rising from shallow offering bowls on ledge rows','petitioners in careful dress waiting at threshold markers','ledger seals placed face-down on mediation tables'],
        sound:['low petition exchanges near entry thresholds','a formal debt recitation murmured by a waiting clerk','one bell struck at long irregular intervals'],
        smell:['incense and dried flower water','old parchment and offering ash','faint stone-cold air from the deeper shrine halls']
      },
      movement:['petitioners stand behind floor-stone markers and do not move until acknowledged','nobody approaches an active mediation table without invitation'],
      greetings:['open palms shown at the threshold','name and dispute-type stated before any question at the desk'],
      rituals:['small coin offering set on the nearest ledge before entering any negotiation room','hands touched to the basin water before signing any mediation document'],
      microInteractions:{
        warm:['A mediation clerk corrects a petitioner\'s procedure quietly before it becomes a recorded error.'],
        cautious:['A shrine attendant waits through an entire offering cycle before speaking.'],
        fatigued:['Two mediation clerks sort documents in silence with a system that took weeks to develop.'],
        humorous:['A petitioner places a grief offering instead of a debt offering. The attendant explains the difference without expression.']
      },
      archetypeNotices:{
        combat:['The threshold markers create fixed distance between petitioners and officials — nobody closes that gap without a signal.'],
        magic:['The incense bowls show layered residue from at least three different smoke types, each associated with a different ceremony.'],
        stealth:['The offering room\'s stone layout creates a corner where conversation cannot be heard from the entrance.'],
        support:['The petition backlog visible on the clerk\'s table represents months of unresolved cases and no one is adding staff.']
      }
    },
    sunspire_haven: {
      sensory:{
        sight:['sealed workshop gates marked with syndicate symbols','grain carts parked in strict rotation order along the holding yard','cloth quality samples hung at stall edges for comparison'],
        sound:['weight measures striking balance in the open stalls','a family name called across the yard at each new transaction','draft animals shifting in the holding pen'],
        smell:['fresh sawdust and tool-grade oil','grain hulls and field dust','sun-warmed wood from the cart racks']
      },
      movement:['syndicate workers stay in their family\'s lane and do not cross into another','sealed papers are visible on anyone moving grain or labor between posts'],
      greetings:['sealed paper held up before any labor question','family name acknowledged before any price is discussed'],
      rituals:['route prayer spoken quietly over convoy loads before departure','brief oath-touch on a contract before any major seal is pressed'],
      microInteractions:{
        warm:['A syndicate worker orients a newcomer to the lane system without being asked and without making it formal.'],
        cautious:['A stall keeper reads the sealed papers through twice before replying.'],
        fatigued:['Two convoy workers have given up speaking and direct each other entirely by gesture.'],
        humorous:['A route prayer runs long enough that the animals in the convoy visibly lose interest.']
      },
      archetypeNotices:{
        combat:['The holding yard creates a blind between the main road and the syndicate gates — the gap is not covered.'],
        magic:['The syndicate marks burned into workshop gates include protective forms that are more than identification.'],
        stealth:['The lane discipline creates consistent unmonitored angles behind the grain cart row along the east wall.'],
        support:['Two families are sharing a scale that needs repair. Neither has reported it because neither wants to be seen needing it.']
      }
    },
    aurora_crown_commune: {
      sensory:{
        sight:['dome repair patches visible overhead in the upper arc','communal notice boards packed with rotation assignments and maintenance updates','personnel moving in coordinated maintenance pairs throughout the corridors'],
        sound:['dome resonance testing tones through the walls','morning ration count broadcasts from the central post','containment-checked materials being shifted with deliberate care'],
        smell:['recycled air with a thin metallic edge','maintenance sealant and cold stone','communal kitchen grain and pressed water']
      },
      movement:['everyone moves with awareness of the overhead dome condition — eyes go up regularly','work pairs move in coordinated step without discussing it'],
      greetings:['dome section number stated before personal name at checkpoints','protocol compliance acknowledged before any request is made'],
      rituals:['communal dome-dawn aurora observation at the start of each cycle','mandatory repair rotation acknowledgement read aloud at every shift start'],
      microInteractions:{
        warm:['A maintenance pair helps a newcomer learn dome protocol without making it a formal correction.'],
        cautious:['A dome inspector checks a ceiling seal twice before answering a question.'],
        fatigued:['Two ration workers complete their handover in thirty seconds of practiced silence.'],
        humorous:['The communal broadcast makes an announcement error. The correction plays three times.']
      },
      archetypeNotices:{
        combat:['The maintenance corridor layout creates unavoidable single-file passages between dome sections — chokepoints are structural.'],
        magic:['Dome-edge seal marks show the pattern of previous breaches. The newest marks are recent.'],
        stealth:['The ration broadcast schedule is regular enough to use as a timing clock.'],
        support:['Three maintenance pairs are covering assignments designed for five. The rotation board shows it and no one has flagged it yet.']
      }
    },
    shelkopolis: {
      sensory:{
        sight:['embroidered coats and trade house banners visible down the main avenue','Roadwarden chevron patrols rotating between district posts','small shrine offerings pressed into the windowsill ledges of every second building'],
        sound:['cart wheels on polished cobblestone','a tailor calling measurements to an apprentice across a narrow lane','shrine bells marking district edges at irregular intervals'],
        smell:['pressed cloth and beeswax polish','perfumed lamp oil from the archival quarter','fresh-cut leather near the southern market']
      },
      movement:['people clear a lane for Roadwarden patrols without stopping their own movement','strangers\' clothing is read at a glance before eye contact is offered'],
      greetings:['brief nod with hand held at chest height','name and district offered before any business is stated'],
      rituals:['small offering set on the nearest shrine ledge before a negotiation begins','hem of formal clothing touched before entering a noble estate'],
      microInteractions:{
        warm:['A tailor waves an apprentice forward to fix a stranger\'s loose button. No charge is discussed.'],
        cautious:['A merchant glances over both shoulders before answering a question about inventory.'],
        fatigued:['Two apprentices pass a heavy bolt of cloth between them in complete silence, six times.'],
        humorous:['A Roadwarden pauses to study an unusual hat. The wearer nods approval. The Roadwarden moves on.']
      },
      archetypeNotices:{
        combat:['The patrol rotation has a gap near the south market at shift change. It is predictable and approximately forty seconds wide.'],
        magic:['Shrine marks around archway lintels are worn smooth from repeated touch. The amber fountain shows faint residue around the base.'],
        stealth:['Awning canvas and stall structure break the patrol sightlines every thirty paces along Verdant Row.'],
        support:['The apprentices doing street maintenance are sharing one set of tools between four workers. No replacement tools are visible.']
      }
    },
    harvest_circle: {
      sensory:{
        sight:['oxcarts stacked with grain sacks in rotating lot order','chalk tallies marked on stall posts in family-specific hands','festival banners sun-bleached from months of hanging'],
        sound:['weight measures clinking against stall hooks','lot numbers called across the market floor','draft animals shifting in the main lane'],
        smell:['grain dust and fermented mash','sun-baked wood from the stall frames','field soil from incoming carts']
      },
      movement:['people step wide around loaded carts without being directed','patron-family members walk the center of the lane and are given it'],
      greetings:['chin-raise and stated weight before any transaction opens','patron-family members acknowledged by name at every stall they pass'],
      rituals:['a pinch of grain tipped from hand to ground at the day\'s first sale','route blessings spoken over convoy loads before departure'],
      microInteractions:{
        warm:['A stall keeper adjusts the weights for an elder who lost count and says nothing about it.'],
        cautious:['A clerk reads a document completely through before answering even a simple question.'],
        fatigued:['Two convoy workers share a water skin passed without looking at each other.'],
        humorous:['A goat gets into a grain stall. The entire market lane stops to watch before anyone acts.']
      },
      archetypeNotices:{
        combat:['The patron-family lane down the center is clear by social force. No one tests it. The margins are where disputes happen.'],
        magic:['The grain blessings at convoy departure include a hand gesture that doesn\'t appear in any standard ritual guide.'],
        stealth:['The stall arrangement creates a natural dead angle between the ox lanes and the east wall.'],
        support:['Three stalls are sharing one scale and the queue behind it is backing up. The solution is obvious and no one has implemented it.']
      }
    },
    glasswake_commune: {
      sensory:{
        sight:['personnel in layered linen wraps marked with containment clearance levels','green-marked equipment crates stacked in precise numbered order','patched dome panels visible in the upper section of every room'],
        sound:['instrument calibration tones through closed lab doors','soft counting in corridors near quarantine boundaries','the intermittent hiss of a pressure test behind a sealed wall'],
        smell:['cold stone and chemical astringent','a faint burnt trace near the instrument rooms','preserved air with the sharpness of recent decontamination']
      },
      movement:['everyone keeps arms in when passing through any doorway','no one moves quickly near equipment tables'],
      greetings:['hand held flat at chest height — palm out','protocol clearance number stated before name at any checkpoint'],
      rituals:['equipment touched to a standard reference before use','three slow counted breaths before entering any quarantine zone'],
      microInteractions:{
        warm:['A senior researcher shares calibration notes without being asked.'],
        cautious:['A checkpoint guard reads every line of a permit before looking up.'],
        fatigued:['Two researchers finish each other\'s sentences during shift handover. They\'ve stopped noticing they do it.'],
        humorous:['A containment alarm triggers near someone eating. The most experienced person present doesn\'t move.']
      },
      archetypeNotices:{
        combat:['The checkpoint arrangement creates natural chokepoints at every equipment room door. Movement between sections requires passing through at least one.'],
        magic:['Ward marks on quarantine thresholds have been reapplied recently. The original chalk lines show through the new layer.'],
        stealth:['The calibration schedule creates predictable quiet windows in the instrument corridors.'],
        support:['Four people are visibly working with equipment that needs maintenance. No maintenance request is visible on any board.']
      }
    },
    fairhaven: {
      sensory:{
        sight:['shrine flags tied to market stall posts in pairs','lamp-trimming residue left in small clay dishes beside thresholds','road dust still on travelers entering from the eastern gate'],
        sound:['market criers calling fresh lots','chapel bells at uneven intervals','the creak of the north gate patrol post in wind'],
        smell:['lamp oil and turned earth from the cart track','something sweet from the chapel direction','hay and livestock from the south yard']
      },
      movement:['travelers pause at the fountain before entering the market — it is expected','locals use the east alley to bypass the Roadwarden checkpoint without discussion'],
      greetings:['two-finger press at the inside of the wrist','a nod toward shrine flags before opening price discussion'],
      rituals:['lamp oil added to the threshold dish at dawn and again at dusk','a circuit around the fountain before making any large purchase'],
      microInteractions:{
        warm:['A stall keeper wraps extra cloth around an elder\'s vegetables without being asked.'],
        cautious:['A traveler checks the north gate position before asking anything.'],
        fatigued:['A market porter sits down in the middle of unloading. No one says anything.'],
        humorous:['A chapel bell rings during a heated negotiation. Both sides pause and laugh before resuming.']
      },
      archetypeNotices:{
        combat:['The Roadwarden checkpoint covers all main entry. The east alley and the south yard fence are not watched.'],
        magic:['The lamp dishes at thresholds are freshly filled — the ritual is active and someone is maintaining it consistently.'],
        stealth:['The fountain blind spot and the east alley angle create a gap that neither the checkpoint nor the chapel observation covers.'],
        support:['The market has more vendors than buyers today. The stall keepers are not discussing it but the atmosphere carries it.']
      }
    },
    mimolot_academy: {
      sensory:{
        sight:['candlelit alcoves visible through archive windows at all hours','sealed courier packets stacked at the tariff desk in submission order','robed figures moving between buildings with both hands occupied by documents'],
        sound:['low scholarly exchange in doorways','the scratch of copy-work through half-open windows','the tariff desk seal pressed down at metered intervals'],
        smell:['lamp oil and fine paper dust','preservation wax with a faint sweetness','stone floors cleaned with something slightly herbal']
      },
      movement:['scholars yield right-of-way to sealed document carriers without discussion','rank is read from robe trim at a glance before any exchange opens'],
      greetings:['slight bow with sponsoring house cited first','citation of house rank before any business question'],
      rituals:['ink touched to the writing thumb before a lecture begins','candle placed in the memorial alcove before accessing restricted archive sections'],
      microInteractions:{
        warm:['An archivist corrects a citation error in a visitor\'s document and returns it without comment.'],
        cautious:['A scholar waits for the corridor to clear before discussing anything near a tariff clerk.'],
        fatigued:['Two copy-workers have developed a hand signal system. They no longer speak during shifts.'],
        humorous:['A candle placement for the memorial alcove is done incorrectly. Two scholars spend several minutes debating the proper procedure.']
      },
      archetypeNotices:{
        combat:['The archive layout and single main access point create a natural bottleneck at the entrance. Anyone controlling that door controls the building.'],
        magic:['The preservation wax on sealed documents carries a secondary trace compound not listed on any notice.'],
        stealth:['The copy-work rotation creates empty corridors during the transition period between sessions.'],
        support:['At least two scholars are working past sustainable capacity. The archive access queue shows it.']
      }
    },
    soreheim_proper: {
      sensory:{
        sight:['Titan Tower plumes visible above every roofline from any point in the city','quota boards at every main intersection updated with fresh chalk each morning','forge-crew workers moving in ranked column formation near tower gates'],
        sound:['shift-change horns from multiple towers in overlapping sequence','hammer work through stone walls at every hour','decree readings broadcast from tower gate posts at intervals'],
        smell:['slag and machine grease','grain mash from the worker canteen sections','hot metal cooling in the outer foundry yards']
      },
      movement:['workers move in column formation near tower gates — individual movement outside of formation attracts notice','lower-ranked workers step aside for tower-rank holders without breaking stride'],
      greetings:['status assignment number stated at gate posts','spark-offering acknowledged with a raised fist at forge altars before approach'],
      rituals:['spark set at forge altars before every shift start','merit statement spoken aloud at public tower oath displays'],
      microInteractions:{
        warm:['A senior worker absorbs a junior\'s quota error before the clerk records it.'],
        cautious:['A worker recites their assignment number before answering any question from a stranger.'],
        fatigued:['Two forge-hands share a meal in complete silence, passing the container without eye contact.'],
        humorous:['A decree reading runs so long that the assembled workers start finishing the sentences.']
      },
      archetypeNotices:{
        combat:['The ranked formation movement makes individual threat assessment immediate. The gap between formation leaders is where authority breaks down.'],
        magic:['The forge altars show spark-offering residue from thousands of ceremonies. The accumulation is thick and old and still carries charge.'],
        stealth:['The shift-change horn covers all ambient sound for approximately forty seconds. It is predictable.'],
        support:['Three quota boards show discrepancies that have not been corrected. No one has flagged them to the clerks yet.']
      }
    },
    shirshal: {
      sensory:{
        sight:['Magi Magistratus compliance seals on every doorframe and threshold','witness queue extending from the court building into the street','arcane compliance runes cut into the pavement at every chamber approach'],
        sound:['formal truth-invocation phrases murmured by witnesses in the queue','the contained sound of arcane discharge from a sealed chamber wall','the court clerk reading procedure aloud at a measured pace'],
        smell:['stone and ozone','a thin metallic trace near compliance threshold runes','the faint charge of sealed arcane work behind closed doors']
      },
      movement:['everyone in queue stays behind the floor markers without being directed','no one speaks above a murmur within range of a chamber door'],
      greetings:['formal truth-invocation spoken before each exchange','compliance seal touched before entering any proceeding chamber'],
      rituals:['hand touched to the water basin before testimony','oath phrase repeated three times consecutively while waiting in the witness queue'],
      microInteractions:{
        warm:['A court clerk quietly corrects a visitor\'s procedure before it becomes a citation on the record.'],
        cautious:['A witness refuses to answer until their compliance seal is physically verified by the clerk.'],
        fatigued:['Two witnesses have been in the queue long enough to know each other\'s cases. They no longer discuss them.'],
        humorous:['A compliance rune activates on someone eating near a chamber door. The procedure for this is lengthy.']
      },
      archetypeNotices:{
        combat:['The chamber arrangement controls who can move freely. The Magi Magistratus always has at least one clear exit path that visitors are not shown.'],
        magic:['The compliance runes in the pavement are active. The residue shows they have been triggered recently.'],
        stealth:['The witness queue provides natural cover for the archive building\'s side entry, which is not monitored during peak queue hours.'],
        support:['The witness queue has been waiting for a proceeding that has not opened. No one will say why.']
      }
    },
    ithtananalor: {
      sensory:{
        sight:['enforcement checkpoint barriers at every main entry point with guards in Roazian compliance markings','prison labor crews moving in visible work columns through the outer ward','anti-magic suppression symbols burned into public building facades'],
        sound:['checkpoint announcement calls at every entry','labor column march count spoken aloud','the low murmur of compliance processing from the documentation desks'],
        smell:['stone dust and suppression ward oil','enforcement-grade lamp fuel','the thin metallic presence of active containment fields near the central administrative buildings']
      },
      movement:['all pedestrian movement follows marked lane discipline — deviation is noticed immediately','eye contact with enforcement officers is managed: acknowledged but not held'],
      greetings:['document held open before approaching any checkpoint','formal compliance phrase spoken before any commercial transaction'],
      rituals:['document verification repeated three times before any major passage','seal inspection spoken aloud at every gate post'],
      microInteractions:{
        warm:['An enforcement officer waves through a known local without the full protocol check.'],
        cautious:['A laborer gives an answer only after checking over both shoulders.'],
        fatigued:['Two checkpoint guards swap positions at an unmarked interval that has no official basis. They\'ve been doing it for months.'],
        humorous:['A stray dog navigates the checkpoint lane successfully. A labor crew watches with visible appreciation.']
      },
      archetypeNotices:{
        combat:['The lane discipline makes everyone\'s movement predictable. The enforcement officer positions show exactly where authority concentrates and where it doesn\'t.'],
        magic:['The suppression ward markings are renewed on a regular schedule. The newest applications are visible by color difference from the older layers.'],
        stealth:['The enforcement checkpoint creates sightline focus on the main lanes. The maintenance corridors running parallel are unmonitored.'],
        support:['Three of the visible labor crews are working without adequate water in the current heat. No supply run is scheduled.']
      }
    },
    guildheart_hub: {
      sensory:{
        sight:['guild sanction notices posted in vertical columns on every major wall','freight exchange boards with morning chalk assignments still drying','inspection crews moving between warehouse doors in practiced sequence'],
        sound:['arbitration proceedings audible through open windows on the upper floor','freight assignment calls from the exchange floor','the constant low scratch of ledger work from the counting house'],
        smell:['chalk dust and warehouse timber','ink and dry paper from the counting house vents','the particular smell of compressed freight documentation']
      },
      movement:['guild-ranked individuals walk with papers visible — rank is communicated before it is spoken','disputes stop when inspection crews pass and resume after'],
      greetings:['guild colors noted before name','relevant record produced before questions are asked at any official desk'],
      rituals:['sanction notice read aloud at market open by the exchange caller','contract seal verification spoken with both parties\' hands on the document'],
      microInteractions:{
        warm:['A senior guild member countersigns a minor clerk\'s form without requiring a second review.'],
        cautious:['A freight broker won\'t answer until they\'ve confirmed the questioner\'s guild affiliation.'],
        fatigued:['Two ledger clerks are passing the same work back and forth. A growing error in the count has gone unaddressed.'],
        humorous:['An arbitration hearing pauses when both parties realize they filed identical evidence.']
      },
      archetypeNotices:{
        combat:['The warehouse loading area creates a choke near the freight exchange. Inspection crews move on a predictable circuit and the gaps are visible.'],
        magic:['The sanction notice ink carries a trace compound that indicates which notices are currently active and which have quietly lapsed.'],
        stealth:['The freight exchange floor traffic provides enough movement cover that the north-to-east exit route goes unmonitored during peak hours.'],
        support:['The arbitration waiting area has no seating. The queue is several hours long. This is not unusual.']
      }
    },
    cosmoria: {
      sensory:{
        sight:['rigging visible above the roofline from every street in the lower district','archive banners hanging from upper-tier windows with house identifiers','dock-level crews working the edges of floating platform sections in coordinated lines'],
        sound:['water against hull-timber beneath the boarding walkways','archive clerks exchanging document references in the upper colonnade','the creak of upper-tier walkways under wind load'],
        smell:['salt water and tar','archive seal wax warming in the upper sun','wood that has never fully dried']
      },
      movement:['dock-level workers move in tight formation around rigging lines','upper-tier visitors keep clear of platform edges without being directed — it is understood'],
      greetings:['sea-acknowledgment gesture made before any significant conversation begins','archive citation offered before asking about any specific record'],
      rituals:['maritime blessing spoken before the first boarding of each day','sea communion exchange between upper-tier residents at the first clear view of open water'],
      microInteractions:{
        warm:['An archive clerk retrieves a document that wasn\'t asked for because the need was obvious.'],
        cautious:['A dock worker checks the watermark on a visiting permit before confirming any cargo detail.'],
        fatigued:['Two rigging crew members have developed a nonverbal handover system. It takes four seconds.'],
        humorous:['An upper-tier noble performs the sea blessing facing the wrong direction. A dock worker gently turns them.']
      },
      archetypeNotices:{
        combat:['The dock-level rigging creates overhead cover and a reliable threat boundary at the platform edge.'],
        magic:['Archive seals show faint luminescence on documents sealed within the last two weeks. It is not advertised.'],
        stealth:['The lower boarding sections generate consistent sound cover from the upper tier. The archive colonnade has reliable blind angles.'],
        support:['Three dock-level crews are visibly short-handed, running roles designed for twice as many people.']
      }
    },
    craftspire: {
      sensory:{
        sight:['book-copy distribution stacks visible through every open workshop door','tariff verification marks chalked on packages waiting for release','artisan guild colors displayed at every stall in the showcase section'],
        sound:['copy presses running in the inner workshops','tariff clerks calling lot numbers for release','the particular scrape of a book-binding press resetting'],
        smell:['fresh ink and binding paste','lamp oil from copy-room vents','cut paper and wood sizing']
      },
      movement:['queue discipline at tariff counters is rigidly observed — anyone skipping is confronted by the line, not officials','commissioned work is never touched by non-owners'],
      greetings:['tariff mark shown before any question about a package','guild color acknowledged before production discussion'],
      rituals:['brief workshop invocation before a major press run','opening examination of tools before any commissioned work begins'],
      microInteractions:{
        warm:['A copy-worker covers a binding error for a newer colleague before the quality check reaches it.'],
        cautious:['A tariff clerk reads both sides of a mark before releasing any package.'],
        fatigued:['Two press operators have synchronized their movements so completely they no longer speak during a run.'],
        humorous:['A binding press sticks on a particularly thick volume. Four workers offer a solution. None are the same.']
      },
      archetypeNotices:{
        combat:['The workshop arrangement and single tariff exit create a natural single-point constraint on movement through the district.'],
        magic:['The preservation compound used on high-value manuscripts has a secondary detection property not listed in the tariff codes.'],
        stealth:['The press noise during a major run covers conversation and movement through adjacent corridors.'],
        support:['The queue at the tariff counter is backed up past the building entrance. The clerk count has not changed.']
      }
    },
    unity_square: {
      sensory:{
        sight:['guild colors worn visibly as working identification on jackets and arm bands','inspection crews moving through stall rows with chalked boards','shrine edges at the market perimeter with small offerings from the morning'],
        sound:['posted rates called aloud at exchange gates','inspection challenges at stall rows','the particular ambient of a high-density market: overlapping voices, no silence'],
        smell:['chalk dust and crowd-warmth','cargo transit oil from the exchange dock section','the faint sweetness of the market edge shrines']
      },
      movement:['guild colors signal right-of-way at exchange gates — it is read and acted on without discussion','inspection lines are joined without being directed'],
      greetings:['terms stated plainly at exchange gates before any question','guild color acknowledged before price discussion'],
      rituals:['brief opening invocation at the exchange desk shrines before the day\'s first transaction','posted rates reviewed and acknowledged aloud before the market opens'],
      microInteractions:{
        warm:['A senior exchange worker holds a gate for a younger one carrying a heavy lot without comment.'],
        cautious:['A stall holder confirms a questioner\'s guild color before giving a real answer.'],
        fatigued:['Two inspection crew members are running the same stall row twice without realizing it.'],
        humorous:['Two stalls posting contradictory rates for the same commodity are adjacent. Both have queues.']
      },
      archetypeNotices:{
        combat:['The exchange gate creates a natural single-entry constraint. Guild color determines who passes quickly.'],
        magic:['The shrine offerings at the market edges are not purely ceremonial. The specific items left correspond to known ward-maintenance materials.'],
        stealth:['The market density creates consistent crowd-cover between the south stall rows and the exchange dock section.'],
        support:['Two inspection crews are covering a route that requires three. The backlog is visible in the stall-hold markers.']
      }
    },
    ironhold_quarry: {
      sensory:{
        sight:['labor zone markers staked at every work site perimeter','ore carts on fixed rail lines moving at regulated intervals','Roazian authority emblems on every overseer post and entry gate'],
        sound:['extraction work carried through stone — felt as much as heard','overseer count calls at labor zone transitions','the clank of ore carts on rails above the ambient noise'],
        smell:['rock dust and stone cold','machine lubricant from the cart rails','the sharp mineral smell of freshly broken ore']
      },
      movement:['all movement follows labor zone boundaries — crossing them without authorization is a Roazian authority matter','overseer instructions are carried out without visible hesitation'],
      greetings:['assignment number stated at every entry post','labor zone compliance acknowledged before any conversation with an overseer'],
      rituals:['low-ceremony shift acknowledgement at start — no ornament, just statement of readiness','civic necessity affirmation before extraction work begins'],
      microInteractions:{
        warm:['An overseer approves a water break without waiting for the scheduled time.'],
        cautious:['A worker states their assignment number before answering any question from an unfamiliar face.'],
        fatigued:['Two rail operators move carts without speaking. The communication is entirely positional.'],
        humorous:['An ore cart jams at an intersection. The official fix procedure is twelve steps and everyone knows the actual fix is two.']
      },
      archetypeNotices:{
        combat:['Labor zone markers define movement corridors. Authority is concentrated at zone transitions. The rail intersections are where gaps appear.'],
        magic:['The suppression wards at zone boundaries are maintained on a cycle. The oldest marks show where compliance is most assumed.'],
        stealth:['The noise from extraction work covers movement in the tunnel sections below the main rail lines.'],
        support:['Water distribution at the south zone is running two hours behind schedule. The workers there know it and so do the overseers.']
      }
    },
    plumes_end_outpost: {
      sensory:{
        sight:['Cysur shrine offerings fresh on the roadside post','caravan staging markers chalked on the northern ground','patrol leader at the gate with route record open'],
        sound:['caravan equipment being checked and counted','patrol report exchange at the gate post','wind through the outpost timbers carrying sound from the northern road'],
        smell:['road dust from the north','shrine incense on the wind','caravan livestock and leather']
      },
      movement:['caravans form staging order before the gate post — no one proceeds without route acknowledgement','shrine approach is done on foot regardless of how the traveler arrived'],
      greetings:['route intent stated at the gate post before entry','shrine approach acknowledged with a low head before the offering stand'],
      rituals:['safe-journey offering placed at the Cysur shrine before northward departure','route acknowledgement read back by the patrol leader before the caravan moves'],
      microInteractions:{
        warm:['A patrol leader adds a recent hazard note to a traveler\'s route record without being asked.'],
        cautious:['A stall keeper at the caravan rest post won\'t confirm supply availability until they\'ve seen the route papers.'],
        fatigued:['Two caravan workers are doing the loading check together in the specific kind of silence that means neither slept.'],
        humorous:['A shrine offering rolls off the stand. The traveler replaces it. The patrol leader pretends not to have seen.']
      },
      archetypeNotices:{
        combat:['The gate post and shrine position create a natural double-check on movement through the outpost. No one clears both without intent.'],
        magic:['The Cysur shrine shows burn marks from offerings that go back further than the current outpost structure.'],
        stealth:['The caravan staging area is observed from the gate post but the eastern perimeter is watched only at marked intervals.'],
        support:['The supply situation at the rest post is tighter than posted. The stall keeper is rationing without saying so.']
      }
    },
    whitebridge_commune: {
      sensory:{
        sight:['bridge surface marked with recent ice warning chalk at the crossing approach','commune notice boards layered with hazard reports and departure declarations','crossing shelter smoke visible from the main road'],
        sound:['departure briefings given at the crossing registration table','survival stories told in the evening shelter — audible from the main hall','the specific creak of bridge timbers under temperature change'],
        smell:['cold river air at the crossing approach','wood smoke from the shelter','wet wool and trail gear from travelers in the rest area']
      },
      movement:['all crossing movement is declared at registration first — departures without declaration are a communal matter','hazard knowledge is shared before departures, not after'],
      greetings:['route intent declared at crossing registration','hazard acknowledgement stated before the bridge approach'],
      rituals:['crossing acknowledgement spoken at the bridge approach before setting foot on it','evening survival storytelling in the shelter — attendance is customary'],
      microInteractions:{
        warm:['A commune member adds a known hazard to a traveler\'s route notes without being asked.'],
        cautious:['A registration clerk asks for confirmation of route intent before issuing a crossing acknowledgement.'],
        fatigued:['Two shelter workers complete the evening preparation without speaking. The sequence is established.'],
        humorous:['A survival story in the evening shelter goes considerably longer than expected. No one leaves.']
      },
      archetypeNotices:{
        combat:['The bridge approach is single-file and the registration table creates a natural control point. Anyone who knows the commune structure knows this.'],
        magic:['The crossing acknowledgement ritual uses a form that predates the current commune structure by a significant margin.'],
        stealth:['The crossing registration creates a record of all declared crossings. Undeclared movement through the river requires going well upstream.'],
        support:['The shelter is at capacity and the supply estimation for the next three days assumes less traffic than is present.']
      }
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
    aurora_crown_commune:['glasswake_commune','sunspire_haven','whitebridge_commune'],
    shelkopolis:['fairhaven','panim_haven','shirshal','plumes_end_outpost'],
    harvest_circle:['sunspire_haven','soreheim_proper'],
    glasswake_commune:['aurora_crown_commune','sunspire_haven'],
    fairhaven:['shelkopolis','sunspire_haven','panim_haven'],
    mimolot_academy:['fairhaven','shirshal'],
    soreheim_proper:['harvest_circle','sunspire_haven','ironhold_quarry'],
    shirshal:['panim_haven','shelkopolis','mimolot_academy'],
    ithtananalor:['shelkopolis','shirshal','ironhold_quarry'],
    guildheart_hub:['fairhaven','shirshal','craftspire','unity_square'],
    cosmoria:['guildheart_hub','fairhaven'],
    craftspire:['guildheart_hub','unity_square'],
    unity_square:['guildheart_hub','craftspire'],
    ironhold_quarry:['ithtananalor','soreheim_proper'],
    plumes_end_outpost:['shelkopolis','fairhaven'],
    whitebridge_commune:['aurora_crown_commune','glasswake_commune']
  };

  // V33_0 canonical NPC placements — sourced from 02_CANON_BASELINE/named_npcs/
  const NPC_PLACEMENTS = {
    panim_haven:[
      {id:'elior_sepulcher',office:'Mediation Hall',role:'Mediator Cleric'},
      {id:'merev_sepulcher',office:'Memorial Inn',role:'Innkeeper'},
      {id:'saryna_sepulcher',office:'Offering Market Stall',role:'Market Clerk'},
      {id:'velune_sepulcher',office:'Shrine of Divine Balance',role:'Shrine Attendant'},
      {id:'ithren_sepulcher',office:'Processional Gate',role:'Porter'}
    ],
    sunspire_haven:[
      {id:'elyra_mossbane',office:'Commune Patron Office',role:'Patron of Forests and Plains'},
      {id:'kael_emberthrone',office:'Tool and Works Overseer Office',role:'Machinery Overseer'},
      {id:'orvak_strone',office:'Trade Adjudication Counter',role:'Unauthorized Trade Adjudicator'},
      {id:'jorva_helmrune',office:'Communal Responsibility Office',role:'Communal Responsibility Enforcer'},
      {id:'taldan_veyst',office:'Knowledge Registry',role:'Magical Knowledge Overseer'}
    ],
    aurora_crown_commune:[
      {id:'warden_sera_whiteglass',office:'Dome Administration Center',role:'Dome Stabilizer Marshal'},
      {id:'mariel_sealwater',office:'Dome Rest Inn',role:'Innkeeper'},
      {id:'cadrin_sealwater',office:'Supply Ledger Counter',role:'Market Clerk'},
      {id:'liora_sealwater',office:'Survival Shrine Alcove',role:'Shrine Attendant'},
      {id:'theron_sealwater',office:'Dome Transit Yard',role:'Porter'}
    ],
    shelkopolis:[
      {id:'lady_isabella_shelk',office:'House Shelk Estate',role:'Matriarch of House Shelk'},
      {id:'lady_elowen_shelk',office:'Guild Chairwoman Office',role:'Fashion Icon and Guild Chairwoman'},
      {id:'captain_thalion_windrider',office:'Roadwarden Central Command',role:'Roadwarden Leader'},
      {id:'high_priestess_lyara_dawnlight',office:'Aurora Light Cathedral',role:'High Priestess'},
      {id:'aelra_velvetmere',office:'Noble District Inn',role:'Innkeeper'}
    ],
    harvest_circle:[
      {id:'elyra_mossbane',office:'Harvest Circle Market Stalls',role:'Patron-Family Broker'},
      {id:'farlan_inkshade',office:'Quota Clerk Office',role:'Academic Recordkeeper'},
      {id:'jorva_helmrune',office:'Communal Responsibility Office',role:'Communal Responsibility Enforcer'},
      {id:'velrik_durnshade',office:'Guild Dispute Hall',role:'Guild Dispute Mediator'},
      {id:'valen_crestmark',office:'Harvest Assessment Office',role:'Harvest Assessor'}
    ],
    glasswake_commune:[
      {id:'researcher_toman_iceveil',office:'Contamination Research Wing',role:'Contamination Research Lead'},
      {id:'lenna_bannerhold',office:'Commune Research Office',role:'Commune Research Clerk'}
    ],
    fairhaven:[
      {id:'naevys_sunweave',office:'Chapel Market Stalls',role:'Retired Artisan'},
      {id:'serin_sunweave',office:'Felujitas Chapel',role:'Local Cleric'},
      {id:'thalen_sunweave',office:'Alchemist Workshop',role:'Alchemist'},
      {id:'vaelis_sunweave',office:'Market Inn',role:'Innkeeper'},
      {id:'maris_sunweave',office:'Fairhaven Market Exchange',role:'Market Clerk'}
    ],
    mimolot_academy:[
      {id:'quenra_quillfire',office:'Lecture Hall',role:'Tutor-Magistrate'},
      {id:'ilys_quillfire',office:'Academy Inn',role:'Innkeeper'},
      {id:'sarith_quillfire',office:'Knowledge Tariff Counter',role:'Market Clerk'},
      {id:'velis_quillfire',office:'Memory Hall Shrine',role:'Shrine Attendant'},
      {id:'myra_quillfire',office:'Archive Loading Bay',role:'Porter'}
    ],
    soreheim_proper:[
      {id:'roth_udenine',office:'Northern Council Tower',role:'Councillor — Northern Ambition'},
      {id:'cron_udenine',office:'Arbiter Tower',role:'Councillor — Arbiter of Justice'},
      {id:'vorgul_oxtend',office:'Shield Council Tower',role:'Councillor — Shield of the Alliance'},
      {id:'mordoth_valinheim',office:'Progress Council Tower',role:'Councillor — Architect of Progress'},
      {id:'decon_von_reckshem',office:'Relic Strategy Wing',role:'Wizard Advisor and Relic Strategist'}
    ],
    shirshal:[
      {id:'tazren_coilspire',office:'Investigation Bureau',role:'Senior Investigator'},
      {id:'mirae_coilspire',office:'Coilspire Inn',role:'Innkeeper'},
      {id:'khalis_coilspire',office:'Arcane Market Counter',role:'Market Clerk'},
      {id:'sivren_coilspire',office:'Compliance Shrine',role:'Shrine Attendant'},
      {id:'luneth_coilspire',office:'Evidence Transfer Hall',role:'Porter'}
    ],
    ithtananalor:[
      {id:'captain_darian_roaz',office:'ORE Supreme Command',role:'Supreme Commander of ORE'},
      {id:'sir_velden_ironspike',office:'Shadowhands Command Wing',role:'Commander of Shadowhands'},
      {id:'harlan_ironspike',office:'Enforcement Quarter Inn',role:'Innkeeper'},
      {id:'ivena_ironspike',office:'Licensed Goods Counter',role:'Market Clerk'},
      {id:'brenn_ironspike',office:'Justice Shrine',role:'Shrine Attendant'}
    ],
    guildheart_hub:[
      {id:'cala_ledgermere',office:'Guild Quarter Inn',role:'Innkeeper'},
      {id:'derris_ledgermere',office:'Tariff Exchange Counter',role:'Market Clerk'},
      {id:'nyra_ledgermere',office:'Guild Shrine Alcove',role:'Shrine Attendant'},
      {id:'luthen_ledgermere',office:'Freight Transit Yard',role:'Porter'},
      {id:'sable_ledgermere',office:'Archive Scribing Hall',role:'Scribe'}
    ],
    cosmoria:[
      {id:'coralyn_tideglass',office:'Maritime Archive Hall',role:'Archivist'},
      {id:'marrow_tideglass',office:'Harbor Captain Office',role:'Ship Captain'},
      {id:'selka_tideglass',office:'Cosmouth Dockside Inn',role:'Innkeeper'},
      {id:'tavian_tideglass',office:'Floating Market Exchange',role:'Market Clerk'},
      {id:'nerissa_tideglass',office:'Sea Communion Shrine',role:'Shrine Attendant'}
    ],
    craftspire:[
      {id:'jorin_ledgermere',office:'Material Ledger Office',role:'Ledger Officer'},
      {id:'tess_ledgermere',office:'Night Lantern Circuit',role:'Night-Lantern Inspector'},
      {id:'copy_warden',office:'Book-Copy Bureau',role:'Copy Legitimacy Warden'}
    ],
    unity_square:[
      {id:'vale_brokerwell',office:'Arrival Registry',role:'Clerk of Arrivals'},
      {id:'vale_ledgermere',office:'Ward Mediation Hall',role:'Ward Mediator'},
      {id:'vale_tinmarch',office:'Medical Station',role:'Street Physician'}
    ],
    ironhold_quarry:[
      {id:'darian_ironspike',office:'Quarry Gate Command',role:'Ore Officer'},
      {id:'velka_ironspike',office:'Labor Zone Command',role:'Quarry Overseer'}
    ],
    plumes_end_outpost:[
      {id:'patrol_leader',office:'Outpost Gate',role:'Patrol Leader'},
      {id:'shrine_keeper_cysur',office:'Shrine of Cysur',role:'Shrine Keeper'},
      {id:'letha_dawnsilk',office:'Northern Road Hazard Station',role:'Hazard Reader'}
    ],
    whitebridge_commune:[
      {id:'arbiter_nyra_thawmark',office:'Crossing Arbitration Hall',role:'Communal Arbiter of Loss Claims'},
      {id:'cadrin_crownmere',office:'Bridge Crossing Office',role:'Bridge Clerk'},
      {id:'aster_starice',office:'Night Lantern Circuit',role:'Night-Lantern Inspector'},
      {id:'thora_snowveil',office:'Grain and Supply Ledger',role:'Grain Measurer'}
    ]
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
    shirshal:{rescuer:'witness guards and side-hall clerks', aftermath:'A formal account is demanded before anything moves again.', safeZone:'Witness Court Side Hall'},
    ithtananalor:{rescuer:'enforcement checkpoint wardens', aftermath:'A formal incident report is filed and scrutiny follows you into the next jurisdiction.', safeZone:'Enforcement Checkpoint Ward'},
    guildheart_hub:{rescuer:'guild brokers and tariff runners', aftermath:'The rescue becomes a debt in the ledger and someone will collect.', safeZone:'Guild Hall Archive Chamber'},
    cosmoria:{rescuer:'maritime hands and archive runners', aftermath:'The recovery is noted in the ship log and the scholarly community knows your business.', safeZone:'Maritime Archive Hall'}
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
    },
    ithtananalor:{
      recovery:{name:'Enforcement Checkpoint Ward',text:'Supervised rest under Roazian authority comes with medical care and an open file.'},
      equipment:{name:'Iron Accord Armory',text:'Heavy enforcement gear, cuffs, seals, containment tools, and industrial-grade weapons.'},
      info:{name:'Enforcement Records Office',text:'Incident logs and permit trails show where the system is leaking before it admits it.'},
      progression:{name:'Inspection Yard',text:'Interrogation posture, containment holds, enforcement law, and checkpoint discipline are drilled here.'},
      flavor:{name:'Gate Seal Walk',text:'Document checks and formal acknowledgements turn every passage into a small performance of order.'},
      secret:{name:'Confiscation Vault Annex',text:'A sealed room where confiscated goods and buried complaints share the same shelf.'}
    },
    guildheart_hub:{
      recovery:{name:'Guild Hall Archive Chamber',text:'A guarded recovery space where healing and paperwork happen at the same time.'},
      equipment:{name:'Tariff Row Outfitters',text:'Contract tools, freight leathers, cargo hooks, locked ledgers, and discreet trade-road weapons.'},
      info:{name:'Sanction Board Counter',text:'Trade disputes and missing manifests reveal more than anyone filing them intended.'},
      progression:{name:'Broker Drill Floor',text:'Contract reading, freight defense, negotiation pressure, and route authority are sharpened here.'},
      flavor:{name:'Sanction Notice Board',text:'Printed citations and verified seals turn civic authority into visible text.'},
      secret:{name:'Legacy Claim Repository',text:'Old Mal-era documents and unresolved union debts sit in an unreachable corner of institutional memory.'}
    },
    cosmoria:{
      recovery:{name:'Maritime Archive Hall',text:'Maritime hands and archivists keep the injured stable with sea-remedy and scholarly calm.'},
      equipment:{name:'Shipwright Dock Supply',text:'Rigging tools, salt-treated leathers, navigation instruments, archival bindings, and deck weapons.'},
      info:{name:'Grand Archive Reading Room',text:'Maritime records and scholarly correspondence trace routes and relationships nobody officially acknowledges.'},
      progression:{name:'Deck Drill Yard',text:'Shipboard footing, nautical navigation, archive protocol, and weather reading are practiced here.'},
      flavor:{name:'Harbor Blessing Pier',text:'Maritime rites and sea-scholars share the same dock language between tides.'},
      secret:{name:'Submerged Annex Passage',text:'A flooded lower archive where suppressed maritime histories and dangerous charts are stored.'}
    },
    craftspire:{
      recovery:{name:'Workshop Quarter Alcove',text:'Copy-floor medics and material hands hold the injured together between production shifts.'},
      equipment:{name:'Licensed Supply Cage',text:'Copy tools, binding materials, arcane reagents, work leathers, and licensed implements.'},
      info:{name:'Copy Bureau Counter',text:'Registration logs and tariff stamps reveal which names move which materials without scrutiny.'},
      progression:{name:'Workshop Drill Floor',text:'Copy discipline, material handling, enchantment protocol, and tariff law are sharpened here.'},
      flavor:{name:'Opening Rite Alcove',text:'Practical devotion and pre-run rites keep the workshop rhythm steady.'},
      secret:{name:'Unlicensed Stack',text:'A hidden shelf where unlicensed copies and contraband tariff stamps coexist.'}
    },
    unity_square:{
      recovery:{name:'Exchange Quarter Holding Room',text:'Neutral ground where injured traders and neutral hands rest under guild truce.'},
      equipment:{name:'Spot Trade Outfitters',text:'Light armor, concealed blades, inspection tools, contract satchels, and market-road gear.'},
      info:{name:'Posted Rate Board',text:'Guild colors and inspection lines tell the real story of who controls which lane.'},
      progression:{name:'Arbitration Yard',text:'Contract reading, spot negotiation, market defense, and fraud detection are practiced here.'},
      flavor:{name:'Exchange Edge Shrines',text:'Small opening rites at market edges keep the rhythm of trade ceremonially grounded.'},
      secret:{name:'Back Counter Room',text:'An off-ledger exchange room where rates and names diverge from what the board shows.'}
    },
    ironhold_quarry:{
      recovery:{name:'Quarry Overseer Station',text:'Roazian medical discipline keeps labor moving under strict supervised recovery.'},
      equipment:{name:'Iron Accord Extraction Stores',text:'Heavy tools, reinforced boots, containment harness, quarry leathers, and enforcement-grade weapons.'},
      info:{name:'Labor Zone Records',text:'Quota logs and incident reports show where enforcement pressure becomes violence before anyone files a report.'},
      progression:{name:'Labor Drill Ground',text:'Load discipline, checkpoint procedure, enforcement authority, and extraction safety are drilled here.'},
      flavor:{name:'Civic Necessity Marker',text:'Low-ornament rites at shift markers keep labor discipline visible and collectively acknowledged.'},
      secret:{name:'Spent Material Shaft',text:'A disused shaft where confiscated goods and buried labor disputes share sealed space.'}
    },
    plumes_end_outpost:{
      recovery:{name:'Caravan Rest Post',text:'Outpost hands and shrine volunteers hold the injured stable under patrol supervision.'},
      equipment:{name:'Northern Road Supplies',text:'Weather gear, caravan tools, patrol weapons, ward charms, and shrine-blessed travel kits.'},
      info:{name:'Patrol Report Board',text:'Hazard logs and sighting records name what the official route map will not.'},
      progression:{name:'Patrol Drill Ring',text:'Route reading, hazard identification, caravan escort, and shrine procedure are practiced here.'},
      flavor:{name:'Shrine of Cysur',text:'Safe-journey offerings and low prayers mark every northward departure.'},
      secret:{name:'Closed Route Marker',text:'A hidden route marker where abandoned caravan routes and unofficial hazard bypasses are scratched into stone.'}
    },
    whitebridge_commune:{
      recovery:{name:'Crossing Shelter Hall',text:'Communal hands and shared warmth hold the cold-struck and expedition-worn together.'},
      equipment:{name:'Bridge Supply Cache',text:'Crossing ropes, insulated wraps, survival tools, emergency rations, and cold-weather weapons.'},
      info:{name:'Crossing Registration Desk',text:'Route declarations and hazard reports surface what expeditions carry back but will not announce.'},
      progression:{name:'Survival Circle',text:'Bridge crossing technique, cold survival, hazard navigation, and communal emergency procedure are practiced here.'},
      flavor:{name:'Evening Story Circle',text:'Survival storytelling binds the commune in shared memory and acknowledged consequence.'},
      secret:{name:'Missing Expedition Archive',text:'Records of expeditions that declared intent but never returned sit in a quietly maintained unmarked file.'}
    }
  };

  const ARCHETYPE_GROUP_SIGNALS = {
    combat:{primary:'Stance',secondary:'Guard',tertiary:'Armor Readiness'},
    magic:{primary:'Arcana',secondary:'Ward',tertiary:'Reagents'},
    stealth:{primary:'Concealment',secondary:'Suspicion',tertiary:'Tools'}
  };

  const STARTING_LOADOUT_BY_GROUP = {
    combat:['worn weapon','field armor','travel shield'],
    magic:['focus implement','ward chalk','reagent satchel'],
    stealth:['concealed blade','soft boots','entry tools']
  };

  // Player-facing group display names
  const ARCHETYPE_GROUP_LABELS = {
    combat:'Classic Combat',
    magic:'Magic and Spellcasting',
    stealth:'Stealth and Precision'
  };
  window.ARCHETYPE_GROUP_LABELS = ARCHETYPE_GROUP_LABELS;



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
  shirshal:['Human','Courtfolk','Witness-Blooded'],
  ithtananalor:['Human','Roazian-Born','Enforcement-Blooded'],
  guildheart_hub:['Human','Guild-Born','Contract-Marked'],
  cosmoria:['Human','Maritime-Born','Archive-Touched']
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
  },
  ithtananalor:{
    combat:[{id:'iron_accord_baton',name:'Iron Accord Baton',slot:'weapon',cost:9,bonus:{attack:1,contain:1},text:'Standard enforcement tool that communicates authority before violence.'}],
    stealth:[{id:'permit_forger_kit',name:'Permit Forger Kit',slot:'kit',cost:10,bonus:{stealth:1,person:1},text:'Tools for generating documents that pass checkpoint inspection.'}]
  },
  guildheart_hub:{
    support:[{id:'tariff_ledger_rig',name:'Tariff Ledger Rig',slot:'belt',cost:9,bonus:{info:1,person:1,coordination:1},text:'A fast-write contract board with official-looking stamps and seal tabs.'}],
    stealth:[{id:'freight_runner_cloak',name:'Freight Runner Cloak',slot:'armor',cost:8,bonus:{concealment:1,route:1},text:'Nondescript cargo-worker wear that vanishes into loading dock crowds.'}]
  },
  cosmoria:{
    magic:[{id:'tide_focus',name:'Tide Focus',slot:'focus',cost:10,bonus:{arcana:1,ward:1},text:'A salt-glass implement that channels maritime elemental patterns.'}],
    support:[{id:'archive_seal_kit',name:'Archive Seal Kit',slot:'kit',cost:8,bonus:{craft:1,info:1},text:'Scholarly tools for document authentication, archival access, and record repair.'}]
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
    localityServiceOverrideCount: Object.keys(LOCALITY_SERVICE_ITEM_OVERRIDES).length,
    localityStartingPOICount: Object.keys(SETTLEMENT_POIS).length
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

  const ARCHETYPE_ORIGIN_LOCALITIES = {
    warrior:     ['shelkopolis','soreheim_proper','ithtananalor'],
    knight:      ['shelkopolis','ithtananalor','panim_haven'],
    ranger:      ['fairhaven','soreheim_proper','aurora_crown_commune'],
    paladin:     ['shelkopolis','ithtananalor','mimolot_academy'],
    archer:      ['shelkopolis','sunspire_haven','guildheart_hub'],
    berserker:   ['soreheim_proper','sunspire_haven','cosmoria'],
    wizard:      ['mimolot_academy','shelkopolis','soreheim_proper'],
    cleric:      ['shelkopolis','ithtananalor','guildheart_hub'],
    priest:      ['panim_haven','fairhaven','soreheim_proper'],
    necromancer: ['panim_haven','mimolot_academy','aurora_crown_commune'],
    illusionist: ['shelkopolis','guildheart_hub','shirshal'],
    inquisitor:  ['shirshal','mimolot_academy','guildheart_hub'],
    elementalist:['sunspire_haven','aurora_crown_commune','mimolot_academy'],
    rogue:       ['shelkopolis','guildheart_hub','fairhaven'],
    assassin:    ['shelkopolis','shelkopolis','shirshal'],
    spellthief:  ['mimolot_academy','shelkopolis','guildheart_hub'],
    scout:       ['soreheim_proper','mimolot_academy','fairhaven'],
    thief:       ['shelkopolis','guildheart_hub','shirshal'],
    trickster:   ['shelkopolis','guildheart_hub','panim_haven'],
    beastmaster: ['soreheim_proper','aurora_crown_commune','fairhaven'],
    healer:      ['shelkopolis','panim_haven','mimolot_academy'],
    artificer:   ['shelkopolis','soreheim_proper','guildheart_hub'],
    engineer:    ['soreheim_proper','aurora_crown_commune','guildheart_hub'],
    tactician:   ['shelkopolis','panim_haven','mimolot_academy'],
    alchemist:   ['shelkopolis','mimolot_academy','guildheart_hub'],
    saint:       ['shelkopolis','panim_haven','guildheart_hub'],
    warden:      ['shelkopolis','ithtananalor','guildheart_hub'],
    warlord:     ['shelkopolis','soreheim_proper','ithtananalor'],
    death_knight:['panim_haven','ithtananalor','shirshal'],
    oracle:      ['shelkopolis','panim_haven','mimolot_academy'],
    bard:        ['shelkopolis','guildheart_hub','panim_haven']
  };

  const STAGE1_BACKGROUND_CONTENT = {
    warrior: {
      civic: {
        theme: 'public discipline and visible duty',
        contradiction: 'garrison orders contradict what the street admits is happening',
        objective: 'Trace the eastern route closure to its real authority and find who authorized the silence.',
        narrative: 'The garrison in Shelkopolis holds its lines with practiced precision. Orders flow through the command structure with military clarity, but something underneath has cracked.'
      },
      frontier: {
        theme: 'route discipline and survival priority',
        contradiction: 'the supply line shortage is worse than the official reports allow',
        objective: 'Find where the eastern route was truly blocked and by what hand.',
        narrative: 'Soreheim Proper moves to the rhythm of industrial quotas. Warriors are valued here as keepers of the line, but the line itself has broken somewhere upstream.'
      },
      occult: {
        theme: 'discipline wielded against hidden threats',
        contradiction: 'enforcement checkpoints are watching something they will not name',
        objective: 'Discover what creature or force the enforcement apparatus is actually containing.',
        narrative: 'Ithtananalor runs on procedure and authority. The Iron Accord maintains order through visible strength, but underground something moves that requires their full attention.'
      }
    },
    knight: {
      civic: {
        theme: 'oath-bound service and institutional loyalty',
        contradiction: 'House Shelk promises and House Shelk actions have diverged sharply',
        objective: 'Find what House Shelk is protecting by closing the eastern route.',
        narrative: 'Shelkopolis breathes ritual and ceremony. Knights serve the houses and houses serve procedure, but one house has broken its own rules for reasons nobody will state.'
      },
      frontier: {
        theme: 'oath to survival against larger forces',
        contradiction: 'the Iron Accord is lying about why the route was closed',
        objective: 'Extract the real reason from the Roazian enforcement hierarchy.',
        narrative: 'Ithtananalor operates on power and protocol. Knights recognize authority here, but the authority itself is fractured and hiding something significant.'
      },
      occult: {
        theme: 'oath tested against sacred knowledge',
        contradiction: 'the memorial pattern shows deaths that the records do not account for',
        objective: 'Connect the hidden deaths to the route closure and learn what caused them.',
        narrative: 'Panim Haven speaks in the language of ritual and registry. Death is business here, but something recent has broken the careful accounting and no one will admit the failure.'
      }
    },
    ranger: {
      civic: {
        theme: 'route knowledge and waypoint navigation',
        contradiction: 'the official route charts have been deliberately altered',
        objective: 'Find the original waypoint and learn what it was closed to contain.',
        narrative: 'Fairhaven trades in movement and passage. Rangers read routes for a living, but someone has redrawn this one and the alteration does not feel like routine maintenance.'
      },
      frontier: {
        theme: 'axis knowledge and corridor mapping',
        contradiction: 'the allocation board shows coordinated changes that should not be coordinated',
        objective: 'Discover what central authority orchestrated the supply route shift.',
        narrative: 'The frontier operates on individual survival, but Soreheim Proper moves on quotas and centralized control. The supply corridor changes were orchestrated from above.'
      },
      occult: {
        theme: 'containment reading and breach detection',
        contradiction: 'the axis data shows inversion that the officials deny',
        objective: 'Prove that a creature breach forced the containment response.',
        narrative: 'Aurora Crown Commune lives in terror of contamination. Rangers understand trade routes but they also read the signs that others miss. Something crossed a boundary here.'
      }
    },
    paladin: {
      civic: {
        theme: 'sacred witness to community pressure',
        contradiction: 'memorial filings show vanished people that civic records claim never existed',
        objective: 'Connect the memorial spike to the route closure and find where the vanished ones are.',
        narrative: 'Shelkopolis holds ceremony and memorial service in high regard. Paladins serve community bonds, but the memorials accumulating for the vanished are being processed in an oddly deliberate silence.'
      },
      frontier: {
        theme: 'oath to survival when systems fail',
        contradiction: 'two names appear in records suggesting institutional coordination across polities',
        objective: 'Trace those administrators and learn what coordination happened.',
        narrative: 'Ithtananalor runs on enforcement and order. Paladins recognize when that order is being bent toward specific purpose. Two officials coordinating between jurisdictions suggests something intentional.'
      },
      occult: {
        theme: 'sacred response to forbidden knowledge',
        contradiction: 'forbidden practices appear in the records if one knows where to look',
        objective: 'Learn what forbidden practice was being used and whether it caused or contained the crisis.',
        narrative: 'Mimolot Academy pursues knowledge carefully. Paladins serve sacred purposes but this place keeps dangerous texts. Something is happening that the careful cataloging cannot quite hide.'
      }
    },
    archer: {
      civic: {
        theme: 'precision distance and careful sight lines',
        contradiction: 'permit stamps do not match actual passage timelines',
        objective: 'Find the hand operating outside the official permit system.',
        narrative: 'Shelkopolis operates on visible order and documented passage. Archers understand distance and sight lines. Something is moving through the city outside the normal channels.'
      },
      frontier: {
        theme: 'survival through disciplined ranged approach',
        contradiction: 'the eastern route obstruction is not natural or official',
        objective: 'Discover who placed the physical blockade and why.',
        narrative: 'Sunspire Haven moves freight through weather and pressure. Archers survive through discipline and accuracy. The obstruction on the eastern route was placed deliberately by human hands.'
      },
      occult: {
        theme: 'ranged power against hidden threats',
        contradiction: 'guild contract changes suggest foreknowledge of the route closure',
        objective: 'Find which guild houses knew about the closure in advance.',
        narrative: 'Guildheart Hub operates on contracts and forward knowledge. Archers understand that power often lies in seeing problems before they arrive. The guild shifted its routes before the crisis was public.'
      }
    },
    berserker: {
      civic: {
        theme: 'aggressive pressure and the breaking point',
        contradiction: 'visible aggression in official handling is worse than the underlying crisis',
        objective: 'Push through the artificial barriers and find the real threat underneath.',
        narrative: 'Soreheim Proper moves on force and production. Berserkers understand aggression and its uses. The enforcement around the closure is disproportionate, hiding something worse than the crisis itself.'
      },
      frontier: {
        theme: 'violence answering hidden violence',
        contradiction: 'the creatures sighted near the closure are more dangerous than reported',
        objective: 'Find the creature and learn what it has actually done.',
        narrative: 'Sunspire Haven survives through rough adaptation. Berserkers know that violence in the frontier is honest. The creature threat is real but authorities are underselling exactly how lethal it has become.'
      },
      occult: {
        theme: 'fury against things that move in darkness',
        contradiction: 'binding magic is being used to keep something contained rather than killed',
        objective: 'Determine whether the containment is holding or if something is breaking free.',
        narrative: 'Cosmoria sits on maritime knowledge and scholarly record. Berserkers rage at obstacles. The creature is bound by magic, not dead, which means the magic could fail at any moment.'
      }
    },
    warden: {
      civic: {
        theme: 'boundary enforcement and custody authority',
        contradiction: 'the checkpoint is holding something inside rather than protecting outside',
        objective: 'Determine what authority ordered the inward containment.',
        narrative: 'Shelkopolis runs on order and permission. Wardens enforce boundaries carefully. This checkpoint is a containment mechanism, not a protection mechanism, and someone above gave that order.'
      },
      frontier: {
        theme: 'custody of harsh territory and rough discipline',
        contradiction: 'the enforcement presence is maintaining a perimeter rather than protecting a route',
        objective: 'Learn what is at the center of the perimeter being maintained.',
        narrative: 'Ithtananalor runs through inspection and control. Wardens understand containment. The enforcement around the closure is not stopping people from leaving, it is stopping something from escaping.'
      },
      occult: {
        theme: 'custody of dangerous knowledge and sealed practices',
        contradiction: 'guild records show authority protocols for creature containment and binding',
        objective: 'Access those protocols and learn what creature is being held.',
        narrative: 'Guildheart Hub moves contracts and goods, but also knowledge. Wardens know custody. The guild has procedures for this kind of containment, which means this has happened before.'
      }
    },
    warlord: {
      civic: {
        theme: 'command authority and civic power projection',
        contradiction: 'the closure demonstrates military command overriding civic authority',
        objective: 'Identify which military authority made the closure decision.',
        narrative: 'Shelkopolis maintains ceremony and order, but beneath it runs real power. Warlords understand command. The closure was not a civic decision, it was military, and that shift in authority matters.'
      },
      frontier: {
        theme: 'field command and morale pressure under crisis',
        contradiction: 'military supply records show emergency positioning rather than standard operations',
        objective: 'Learn what military threat prompted emergency positioning.',
        narrative: 'Soreheim Proper runs on production and order. Warlords lead through presence and decisiveness. The military position around the closure is defensive, concentrated, ready for something specific.'
      },
      occult: {
        theme: 'command against supernatural force and hidden threat',
        contradiction: 'enforcement records describe magical containment and binding operations',
        objective: 'Understand the scale and nature of what is being magically contained.',
        narrative: 'Ithtananalor speaks law and procedure. Warlords recognize that some threats require coordinated magical response. The containment here is military-grade magical binding.'
      }
    },
    death_knight: {
      civic: {
        theme: 'terrible oath and ruinous response to death',
        contradiction: 'death records have been edited to hide the scale of recent casualties',
        objective: 'Restore the true death count and learn what caused it.',
        narrative: 'Panim Haven serves death and remembrance. Death Knights take oaths that lead to ruin. The recent deaths here were significant enough to warrant editing the very records of the dead.'
      },
      frontier: {
        theme: 'death as path and grave-marking',
        contradiction: 'frontier graves are being hidden or relocated outside normal process',
        objective: 'Find the hidden graves and learn who was buried in secret.',
        narrative: 'Ithtananalor runs on order and record. Death Knights serve death itself. Graves from the closure are being moved off the books, which means powerful people are erasing evidence.'
      },
      occult: {
        theme: 'death oath and binding magic against dissolution',
        contradiction: 'occult death-binding practices are being used in the containment operation',
        objective: 'Determine if the death-binding is holding or if resurrection waits.',
        narrative: 'Shirshal operates on testimony and sealed records. Death Knights swear terrible oaths. The creature or force is not merely contained, it is death-bound, which suggests it was never supposed to be seen in this world again.'
      }
    },
    wizard: {
      civic: {
        theme: 'arcane scholarship trapped in institutional silence',
        contradiction: 'the academy has sealed restricted archives and refuses to explain the failure of protections',
        objective: 'Investigate the sealed archives and learn what knowledge triggered the security lockdown.',
        narrative: 'Mimolot Academy holds itself as the center of careful knowledge. Wizards understand that power lives in understanding. The archives have been sealed and the official explanation does not account for the urgency.'
      },
      frontier: {
        theme: 'ritual knowledge versus civic order',
        contradiction: 'officials claim routine route closure but wizards sense deep magical disturbance',
        objective: 'Cast ritual diagnostics and discover what magical event prompted the closure.',
        narrative: 'Shelkopolis runs on order and ceremony. Wizards know ritual shapes reality. The route closure feels wrong in ways the official story cannot explain.'
      },
      occult: {
        theme: 'structured arcane understanding against chaos',
        contradiction: 'industrial contamination is behaving according to patterns that suggest deliberate magical guidance',
        objective: 'Determine if the contamination spread is natural or if it is being deliberately shaped by magic.',
        narrative: 'Soreheim Proper moves on quota and output. Wizards parse the patterns beneath surface chaos. The contamination patterns follow mathematical progressions that industrial accident cannot explain.'
      }
    },
    cleric: {
      civic: {
        theme: 'divine doctrine and institutional healing power',
        contradiction: 'the shrine is barring priests from sections of the sanctuary and the blessing rites have changed',
        objective: 'Access the restricted sanctuary areas and learn what the priesthood is hiding.',
        narrative: 'Shelkopolis breathes ritual and ceremony. Clerics serve institutional doctrine and healing. The shrine has compartmentalized itself and something about the new blessing rites feels wrong to sacred senses.'
      },
      frontier: {
        theme: 'divine authority invoked against enforcement power',
        contradiction: 'the Iron Accord is preventing clergy from ministering to prisoners and the route closure is cutting off supply to shrine networks',
        objective: 'Restore clerical access and determine what the Accord is trying to prevent.',
        narrative: 'Ithtananalor runs on power and control. Clerics answer to divine mandate. The enforcement hierarchy has isolated their ability to minister, which suggests they fear what clergy might discover.'
      },
      occult: {
        theme: 'healing power corrupted by hidden damage',
        contradiction: 'guild healers report cases they cannot treat and symptoms that persist despite blessed intervention',
        objective: 'Find what damage or curse is evading normal healing and determine its source.',
        narrative: 'Guildheart Hub runs on contracts and mutual obligation. Clerics heal through divine power but some wounds resist blessing. The healers are encountering something that sacred arts cannot reach.'
      }
    },
    priest: {
      civic: {
        theme: 'ritual authority as social anchor',
        contradiction: 'the memorial processionals are being restricted and priests are forbidden from visiting certain areas',
        objective: 'Discover what the authorities fear the processionals will reveal.',
        narrative: 'Panim Haven speaks in ritual and remembrance. Priests bind community through public rite. The authorities are preventing access to areas where ritual might be performed, which means they fear what witness might occur.'
      },
      frontier: {
        theme: 'portable faith and community protection through ritual',
        contradiction: 'traveling shrine caravans are being turned back and blessed road stations have been sealed',
        objective: 'Reopen the shrine network and learn why the route was closed to faith.',
        narrative: 'Fairhaven trades in movement and passage. Priests carry ritual into the frontier spaces. The closure has isolated the shrine network, which suggests powerful people do not want blessing or witness on that road.'
      },
      occult: {
        theme: 'ritual counter-pressure against industrial corruption',
        contradiction: 'forge workers report that benediction rites are failing and protective marks are darkening',
        objective: 'Investigate the spiritual corruption of protective rites and its source.',
        narrative: 'Soreheim Proper moves on force and quotas. Priests invoke ritual authority against chaos. The protective marks that should shield workers are failing, which suggests something powerful is actively corrupting blessings.'
      }
    },
    necromancer: {
      civic: {
        theme: 'death knowledge and forbidden records',
        contradiction: 'the memorial ledgers show edited entries and some death records have been physically removed',
        objective: 'Reconstruct the removed records and learn what deaths are being hidden.',
        narrative: 'Panim Haven serves death and memorial registry. Necromancers understand death as knowledge. The death records have been edited and pages have been removed, which means someone wants the dead forgotten.'
      },
      frontier: {
        theme: 'grave knowledge and unquiet spirits',
        contradiction: 'academy necrologists report unusual spirit activity near the sealed areas',
        objective: 'Speak with spirits that others cannot hear and learn what they witnessed.',
        narrative: 'Mimolot Academy pursues knowledge carefully. Necromancers walk the boundary between death and knowledge. Scholars have sensed spirit activity that their normal tools cannot explain.'
      },
      occult: {
        theme: 'death magic as containment leverage',
        contradiction: 'the dome communities are reporting seal failures that appear to correlate with death of complex creatures',
        objective: 'Determine if death-binding magic is keeping something contained and if that magic is failing.',
        narrative: 'Aurora Crown Commune lives in fear of contamination. Necromancers know that binding the dead can contain the living. The seal failures correlate too closely to creature death to be coincidence.'
      }
    },
    illusionist: {
      civic: {
        theme: 'perception as truth and visible deception',
        contradiction: 'the civic record keepers are maintaining two versions of important documents and contradictions are showing',
        objective: 'Expose which record version is false and who benefits from the deception.',
        narrative: 'Shelkopolis operates on visible order and official truth. Illusionists understand that perception shapes reality. There are two versions of important records and they cannot both be true.'
      },
      frontier: {
        theme: 'hidden routes and displaced sight lines',
        contradiction: 'guild maps show routes that do not match what travelers actually navigate',
        objective: 'Map the true routes beneath the false guild knowledge and learn who diverted the traffic.',
        narrative: 'Guildheart Hub operates on contracts and documented passage. Illusionists read what others miss seeing. The guild maps are incomplete or deliberately misleading about how traffic actually flows.'
      },
      occult: {
        theme: 'illusion magic and hidden truth in sealed records',
        contradiction: 'witness testimony records show contradictions that suggest false testimony or magical influence on memory',
        objective: 'Separate true witness account from magical distortion and identify who shaped the testimony.',
        narrative: 'Shirshal operates on witness testimony and sealed records. Illusionists know that perception can be shaped. The witness records contain contradictions that suggest magical influence on the very memory of events.'
      }
    },
    inquisitor: {
      civic: {
        theme: 'doctrinal truth and interrogatory pressure',
        contradiction: 'court officials are reluctant to discuss certain cases and testimony has been officially restricted',
        objective: 'Access the restricted testimony and learn what doctrine it violates.',
        narrative: 'Shirshal operates through testimony and judgment. Inquisitors pursue truth through pressure and doctrine. Official testimony has been restricted, which means they fear what truth might emerge.'
      },
      frontier: {
        theme: 'truth extracted through judgment authority',
        contradiction: 'academy investigation records were sealed and students who asked questions have been dismissed',
        objective: 'Investigate the sealed records and learn what truth the academy wanted hidden.',
        narrative: 'Mimolot Academy pursues knowledge through careful channels. Inquisitors know that truth often lies behind restriction. Students were dismissed for asking questions and records were sealed to prevent answers.'
      },
      occult: {
        theme: 'judgment authority enforced against deception',
        contradiction: 'guild contracts show deceptions that break doctrinal law and high guild officials are avoiding questioning',
        objective: 'Force the guild officials to face judgment for the deceptions in their contracts.',
        narrative: 'Guildheart Hub operates on contracts and mutual obligation. Inquisitors know that judgment is the final authority. The contracts contain clear deceptions yet high officials are avoiding official scrutiny.'
      }
    },
    elementalist: {
      civic: {
        theme: 'elemental force channeled through industrial systems',
        contradiction: 'the cargo network shows elemental damage that does not match reported incidents',
        objective: 'Trace elemental damage to its source and learn what force is moving through the convoys.',
        narrative: 'Sunspire Haven moves freight through quota and pressure. Elementalists understand that force shapes the world. The cargo damage patterns suggest elemental power is being channeled somewhere deliberately.'
      },
      frontier: {
        theme: 'environmental transformation and barrier breaking',
        contradiction: 'dome seals are weakening in ways that suggest external elemental pressure rather than internal failure',
        objective: 'Determine if natural forces or deliberate magical pressure is threatening the dome.',
        narrative: 'Aurora Crown Commune fears contamination. Elementalists know that forces can be shaped and directed. The seal weakening feels driven by external pressure rather than random failure.'
      },
      occult: {
        theme: 'ritual channeling of elements against order',
        contradiction: 'academy scholars report rituals that channel raw element in ways forbidden by doctrine',
        objective: 'Learn what forbidden element ritual is being performed and why doctrine forbids it.',
        narrative: 'Mimolot Academy pursues knowledge carefully. Elementalists know forbidden power. Scholars are secretly channeling raw element in direct violation of academy doctrine.'
      }
    },
    oracle: {
      civic: {
        theme: 'prophecy and fated vision made public',
        contradiction: 'prophetic warnings were circulated through the shrine network and the route was closed the next day',
        objective: 'Learn what the prophecies foretold and whether the closure was preparation or cover.',
        narrative: 'Shelkopolis holds ceremony and order. Oracles see what others cannot perceive. Prophecies warning of danger were shared, then the route closed immediately. The connection is too direct to ignore.'
      },
      frontier: {
        theme: 'prophecy written in death and memorial',
        contradiction: 'memorial surge follows an oracle prophecy by exactly three days with precise timing',
        objective: 'Determine if the oracle prophecy caused the deaths or merely foretold them.',
        narrative: 'Panim Haven speaks in death and registry. Oracles see futures as certainly as past. An oracle prophecy was shared, and three days later the memorial spike arrived with mathematical precision.'
      },
      occult: {
        theme: 'divination as revealed fate and academic truth',
        contradiction: 'sealed academy divination records predict specific dates that correlate with the closure and aftermath',
        objective: 'Access the sealed divination texts and learn what fate was foretold.',
        narrative: 'Mimolot Academy pursues knowledge and careful study. Oracles see paths that others cannot choose. The sealed divination records contain predictions that proved accurate, which means the future is not open but written.'
      }
    },
    healer: {
      civic: {
        theme: 'body knowledge and trauma pattern recognition',
        contradiction: 'intake logs show a cluster of creature-wound injuries being recorded under vague trauma categories',
        objective: 'Trace the wound pattern to its source and learn what caused the injuries on the eastern approach.',
        narrative: 'Shelkopolis runs on civic order and careful record. Healers read the body as evidence. Injury records from the eastern approach are being miscategorized, which means someone wants the wound type hidden.'
      },
      frontier: {
        theme: 'pilgrimage medicine and road trauma response',
        contradiction: 'Panim Haven pilgrimage healers report treating injuries they were told not to document',
        objective: 'Find the undocumented cases and learn what is injuring people on the closed route.',
        narrative: 'Panim Haven serves death and memorial. Healers who walk the pilgrimage roads treat what they find. Injuries from the closure zone are going unrecorded at the instruction of officials who fear the pattern.'
      },
      occult: {
        theme: 'arcane wound treatment and restricted ward access',
        contradiction: 'Mimolot Academy ward healers have been barred from treating specific injury categories now appearing in the corridor',
        objective: 'Access the restricted ward records and learn what wound category is being suppressed.',
        narrative: 'Mimolot Academy pursues knowledge under careful hierarchy. Healers who work the restricted wards know what the institution wants hidden. The ward restriction is new and corresponds precisely to the closure date.'
      }
    },
    artificer: {
      civic: {
        theme: 'craft permits and sealed device inventory',
        contradiction: 'craft license records show devices checked out of civic storage that were never returned and the checkout dates match the closure',
        objective: 'Trace the missing devices and learn what they were deployed to do.',
        narrative: 'Shelkopolis maintains careful records of sealed devices and licensed tools. Artificers know what each device does. The missing inventory from the closure week points to a deliberate deployment.'
      },
      frontier: {
        theme: 'industrial deployment records and field modifications',
        contradiction: 'Soreheim maintenance logs show unauthorized device modifications before the eastern route incident',
        objective: 'Find the modified devices and learn what they were changed to accomplish.',
        narrative: 'Soreheim Proper runs on specification and quota. Artificers who work the industrial systems know when modifications break the specification. The unauthorized changes are directly connected to the closure.'
      },
      occult: {
        theme: 'arcane mechanism and guild device certification',
        contradiction: 'Guildheart Hub certification records show devices licensed for one purpose that were deployed for another',
        objective: 'Find the misdeployed devices and determine what they were actually used for on the eastern route.',
        narrative: 'Guildheart Hub runs on contract and certified practice. Artificers know the difference between a device as certified and a device as deployed. The certification records have been falsified to cover a different purpose entirely.'
      }
    },
    engineer: {
      civic: {
        theme: 'infrastructure audit and route works knowledge',
        contradiction: 'Soreheim construction records show maintenance completed on the eastern approach that does not match the actual state of the route',
        objective: 'Find what actually happened to the route infrastructure and why the records were falsified.',
        narrative: 'Soreheim Proper runs on industrial specification and record. Engineers audit what was built against what was documented. The maintenance records are false and the discrepancy is significant enough to explain the closure.'
      },
      frontier: {
        theme: 'dome infrastructure and containment system pressure',
        contradiction: 'Aurora Crown Commune engineering logs show containment system strain that was logged then deleted',
        objective: 'Recover the deleted containment logs and determine what was contained and whether it held.',
        narrative: 'Aurora Crown Commune lives by its containment systems. Engineers know what the logs show when they are honest. The deleted records from the closure week describe something the dome leadership did not want preserved.'
      },
      occult: {
        theme: 'guild infrastructure and authorized route modification',
        contradiction: 'Guildheart Hub route engineering records show modifications to the eastern approach that were never submitted for sanction',
        objective: 'Establish what route modifications were made and whether they were intended to block or to hide.',
        narrative: 'Guildheart Hub routes are modified through formal sanction. Engineers who bypass the sanction board are covering something. The unsanctioned modifications predate the official closure announcement by four days.'
      }
    },
    tactician: {
      civic: {
        theme: 'formation logic and garrison command authority',
        contradiction: 'garrison tactical logs show order changes that overrode standing defensive protocols without standard command authorization',
        objective: 'Find who issued the override orders and what they were actually protecting.',
        narrative: 'Shelkopolis maintains garrison order through documented command chains. Tacticians read formations and authority. The protocol overrides came from outside the standard chain and the timing aligns exactly with the closure.'
      },
      frontier: {
        theme: 'field command and tactical response documentation',
        contradiction: 'Panim Haven tactical records show a force deployment that was never officially acknowledged and has been removed from the active logs',
        objective: 'Reconstruct the erased deployment and determine what force was committed to the eastern approach.',
        narrative: 'Panim Haven coordinates memorial and civic authority. Tacticians who read deployment records know when a force was committed and then forgotten. The erased deployment used real resources and left real evidence.'
      },
      occult: {
        theme: 'arcane threat assessment and doctrinal command structure',
        contradiction: 'Mimolot Academy threat assessment reports were requisitioned by an external command authority and never returned',
        objective: 'Recover or reconstruct the threat assessments and learn what danger they documented.',
        narrative: 'Mimolot Academy produces careful threat analysis. Tacticians know that when assessments are requisitioned and never returned, the information was used for something not authorized by the academy hierarchy.'
      }
    },
    alchemist: {
      civic: {
        theme: 'compound inventory and reagent supply chain',
        contradiction: 'Shelkopolis alchemical supply records show a large reagent requisition linked to the eastern approach that was classified immediately after processing',
        objective: 'Uncover what the classified requisition contained and what it was intended to accomplish.',
        narrative: 'Shelkopolis runs on civic order and careful license. Alchemists who track reagent supply know when a compound movement is classified above its routine importance. The classification happened hours after the route closure.'
      },
      frontier: {
        theme: 'field compound application and containment reagents',
        contradiction: 'Mimolot Academy field operations logs show unusual compound deployment on the eastern approach without standard safety protocols',
        objective: 'Determine what compounds were deployed and what they were used to contain or treat.',
        narrative: 'Mimolot Academy uses field compounds under careful protocol. Alchemists who bypass safety procedure in deployment are dealing with something that cannot wait for proper process. The bypass implies extreme urgency.'
      },
      occult: {
        theme: 'occult reagent sourcing and forbidden compound work',
        contradiction: 'Guildheart Hub reagent certification records show compounds sourced from banned suppliers in the period before the closure',
        objective: 'Identify the banned compounds and determine what occult application they serve.',
        narrative: 'Guildheart Hub certifies reagent legitimacy. Alchemists who source from banned suppliers are working with compounds that certified channels will not provide. The banned sourcing happened in the week before the route closed.'
      }
    },
    saint: {
      civic: {
        theme: 'mercy witness and public grief acknowledgment',
        contradiction: 'public grief for the eastern route dead has been systematically redirected away from official memorial channels',
        objective: 'Find the families being redirected and learn what truth the officials want kept from public witness.',
        narrative: 'Shelkopolis runs on civic ceremony and public order. Saints bear witness where others look away. Grief that should flow through public memorial is being quietly redirected, which means the deaths carry a truth the city does not want witnessed.'
      },
      frontier: {
        theme: 'pilgrimage witness and costly community presence',
        contradiction: 'Panim Haven pilgrimage communities report that survivors from the eastern approach were moved before they could be properly witnessed',
        objective: 'Find the moved survivors and provide the witness that official process is denying them.',
        narrative: 'Panim Haven serves death and memorial through community and rite. Saints know that witness costs something and that denial of witness is its own violence. The survivors were moved specifically to prevent the witness that is their right.'
      },
      occult: {
        theme: 'spiritual witness against guild contractual silence',
        contradiction: 'Guildheart Hub workers who witnessed the eastern approach incident have signed silence contracts they cannot legally refuse',
        objective: 'Find a path around the silence contracts and give the workers a form of witness they can bear.',
        narrative: 'Guildheart Hub operates on contract and obligation. Saints know that contractual silence can itself be a form of harm. Workers who witnessed something significant have been legally silenced, which is both permitted and unjust.'
      }
    },
    bard: {
      civic: {
        theme: 'voice and public story as access and leverage',
        contradiction: 'Shelkopolis story networks that normally carry rumor quickly have gone quiet about the eastern approach in an unnatural way',
        objective: 'Find what silenced the story networks and recover the suppressed account.',
        narrative: 'Shelkopolis breathes story and public sway. Bards know when silence is imposed rather than natural. Every city rumor channel has gone quiet on the same subject at the same time, which means someone paid or threatened the voices.'
      },
      frontier: {
        theme: 'trading floor story and freight rumor as intelligence',
        contradiction: 'Guildheart Hub trading floor stories about the eastern approach contradict the official account in specific and consistent ways',
        objective: 'Compile the trading floor accounts and find the consistent truth beneath the official story.',
        narrative: 'Guildheart Hub runs on contract and commerce. Bards who work trading floors know that merchants tell their own truth. The floor accounts differ from the official story in the same direction every time, which means the merchants know something.'
      },
      occult: {
        theme: 'memorial song and encoded witness as record',
        contradiction: 'Panim Haven memorial songs from the closure period contain encoded witness accounts that diverge sharply from official casualty records',
        objective: 'Decode the memorial songs and recover the witness accounts they were designed to preserve.',
        narrative: 'Panim Haven speaks in death and remembrance. Bards who know memorial tradition understand that songs preserve what records erase. The closure period songs carry encoded witness, which means the community knew the records would be falsified.'
      }
    },
    rogue: {
      civic: {
        theme: 'quiet entry and civic record leverage',
        contradiction: 'permit records from the closure week show freight movements that do not match official loading dock logs',
        objective: 'Reconcile the permit discrepancy and find what freight bypassed the official record.',
        narrative: 'Shelkopolis tracks freight and permits through careful civic infrastructure. Rogues read the gaps between records. The discrepancy is large enough to represent significant movement and someone closed the official log gap before it was noticed.'
      },
      frontier: {
        theme: 'opportunism and cargo intelligence',
        contradiction: 'Guildheart Hub cargo floor shows ghost freight movements that match no recorded contract',
        objective: 'Trace the ghost movements and learn what was moved without documentation.',
        narrative: 'Guildheart Hub runs on contract and certified movement. Rogues who work the cargo floors know that ghost movement means someone paid for invisibility. The volumes are too large for ordinary contraband.'
      },
      occult: {
        theme: 'quiet access and tollway gap exploitation',
        contradiction: 'Fairhaven tollway records show access permits issued to identities that do not exist in civic registration',
        objective: 'Trace the phantom permits and learn who used false identity to move through the tollway.',
        narrative: 'Fairhaven trades in movement and legitimate passage. Rogues know that phantom permits mean professional-grade false identity. The permits were processed correctly by someone who knew the system, which means insider access.'
      }
    },
    assassin: {
      civic: {
        theme: 'commitment to decisive elimination and contract silence',
        contradiction: 'civic assassination contract records from the closure period have been expunged with the expungement itself visible in the archive audit trail',
        objective: 'Reconstruct the expunged contract and learn what elimination was authorized before the closure.',
        narrative: 'Shelkopolis maintains civic order through careful official process. Assassins know that expungement requires authorization from above ordinary record-keeping. The audit trail shows the deletion and the deletion shows a covered action.'
      },
      frontier: {
        theme: 'elimination pressure and elimination contract timing',
        contradiction: 'a second expunged contract set in the Shelkopolis civic archives shows repeat use of the same authorization sequence within the closure window',
        objective: 'Identify the second elimination target and determine if the targets share a connection to the route closure.',
        narrative: 'Shelkopolis runs on order and civic legitimacy. Two expunged contracts in the same window point to a sustained operation, not a single authorized action. The pattern is deliberate and the targets almost certainly knew something dangerous.'
      },
      occult: {
        theme: 'cold precision against institutional deception',
        contradiction: 'Shirshal sealed-case records show a witness death during the closure window classified as natural cause despite injuries inconsistent with the classification',
        objective: 'Establish the actual cause of the witness death and learn what testimony was silenced.',
        narrative: 'Shirshal operates on testimony and the sanctity of witness. The death classification is professionally false and the injuries suggest professional action. Someone with access to sealed case classification ensured the record would not support inquiry.'
      }
    },
    spellthief: {
      civic: {
        theme: 'arcane theft and institutional ward disruption',
        contradiction: 'Mimolot Academy ward integrity logs show a breach that was classified immediately and removed from public record within six hours',
        objective: 'Recover the breach record and learn what was taken from the ward it protected.',
        narrative: 'Mimolot Academy maintains careful ward records. Spellthieves know what a professional breach looks like. The breach classification timeline is too fast for ordinary institutional process, which means someone with authority wanted the record gone before inquiry started.'
      },
      frontier: {
        theme: 'arcane disruption and civic ward exploitation',
        contradiction: 'Shelkopolis civic ward monitoring logs show disruption patterns from the closure window that have been misattributed to routine maintenance',
        objective: 'Recover the true disruption data and learn what the ward was protecting when it was disrupted.',
        narrative: 'Shelkopolis maintains civic wards as a matter of institutional order. Spellthieves read disruption signatures. The maintenance misattribution is professional but not perfect, and the disruption patterns are inconsistent with any maintenance procedure.'
      },
      occult: {
        theme: 'guild arcane access and contract theft under authority',
        contradiction: 'Guildheart Hub arcane contract records show a clause inserted post-signature that altered the terms of a major freight authorization',
        objective: 'Identify who inserted the post-signature clause and what authority they used to do it.',
        narrative: 'Guildheart Hub treats signed contracts as inviolable. Spellthieves know that arcane contract modification requires both skill and official access. The clause insertion was technically skilled and used real guild authority, which means an insider who could also cast.'
      }
    },
    scout: {
      civic: {
        theme: 'reconnaissance of institutional silence and route pressure',
        contradiction: 'Soreheim Proper industrial output records show a dropped quota in the eastern corridor that preceded the official route closure announcement by two days',
        objective: 'Establish what Soreheim management knew before the official closure and when they knew it.',
        narrative: 'Soreheim Proper runs on quota and production discipline. Scouts who read output records know that a quota drop before an official closure means advance knowledge. Someone in Soreheim management saw the problem coming and said nothing to the workers.'
      },
      frontier: {
        theme: 'field mapping and route truth beneath official claim',
        contradiction: 'Mimolot Academy waypoint records show route markers that were moved before the closure, not after it',
        objective: 'Find the moved markers and learn what the original waypoints were protecting.',
        narrative: 'Mimolot Academy tracks academic routes with careful waypoint records. Scouts who read waypoint displacement know that pre-closure movement means preparation. The route was being changed before the stated emergency, which means the emergency was expected.'
      },
      occult: {
        theme: 'evasion and field intelligence from closed corridors',
        contradiction: 'Fairhaven tollway scouting reports show creature sign on the eastern approach that predates the official route closure by four days',
        objective: 'Confirm the creature sign timeline and establish whether the closure was a response to creature presence or a cover for it.',
        narrative: 'Fairhaven trades in movement and passage. Scouts who work the tollway approaches leave records. Creature sign from before the closure means the threat was visible to field operators before any official acknowledgment.'
      }
    },
    thief: {
      civic: {
        theme: 'urban extraction and freight leverage in civic infrastructure',
        contradiction: 'Shelkopolis freight permit records show a cluster of misdirection orders issued before the route closed that diverted goods away from the eastern approach',
        objective: 'Trace the misdirection orders and learn who pre-positioned freight before the closure was announced.',
        narrative: 'Shelkopolis maintains freight permits and cargo routing through civic infrastructure. Thieves who read permit clusters know that pre-closure diversion means advance knowledge. Someone moved their goods before the announcement because they knew the announcement was coming.'
      },
      frontier: {
        theme: 'domeway leverage and sanction record extraction',
        contradiction: 'Guildheart Hub domeway sanction records show a closure category used for the eastern approach that has never appeared in previous administrative history',
        objective: 'Establish what the new closure category means and who authorized its use.',
        narrative: 'Guildheart Hub routes freight through documented sanction procedure. Thieves who know the domeway know that new administrative categories are created to cover new situations. The category was authored and used within the same week, which means it was purpose-built.'
      },
      occult: {
        theme: 'broken-seal knowledge and guild road extraction',
        contradiction: 'Shirshal broken-seal archive shows a sealing operation on the eastern approach with a creature containment classification that had never been used in this jurisdiction',
        objective: 'Verify the creature containment classification and learn what was sealed and whether the seal is holding.',
        narrative: 'Shirshal operates on testimony and procedural record. Thieves who work the broken-seal archive know what containment classifications normally look like. A new classification in an active operation means the creature or force is outside established procedure.'
      }
    },
    trickster: {
      civic: {
        theme: 'social disruption and information baiting',
        contradiction: 'Shelkopolis rumor networks show deliberate false information about the eastern route that was planted by someone who knew the official story in advance',
        objective: 'Identify the source of the planted disinformation and learn what the true information was they were covering.',
        narrative: 'Shelkopolis moves on social networks and visible status. Tricksters who work rumor flows know that planted disinformation requires knowing the truth first. Someone with advance knowledge seeded false stories precisely so that inquiry would chase the wrong explanation.'
      },
      frontier: {
        theme: 'misdirection and cargo bait operation',
        contradiction: 'Guildheart Hub trading floor shows that false freight manifests were distributed before the closure through channels only accessible to senior guild members',
        objective: 'Trace who distributed the false manifests and what they were diverting attention from.',
        narrative: 'Guildheart Hub operates on contract and documented freight. False manifests circulating through senior guild channels before the closure means a coordinated misdirection operation. The operation is too sophisticated for a single actor.'
      },
      occult: {
        theme: 'identity displacement and grief misdirection',
        contradiction: 'Panim Haven memorial records show multiple recently-submitted grief claims where the identified deceased cannot be confirmed in any civic record',
        objective: 'Establish whether the unconfirmable deceased are false identities or whether their records have been erased.',
        narrative: 'Panim Haven is the center of death record and memorial legitimacy. Grief claims for unverifiable dead are either fraud or evidence of record erasure. Either answer points to a deliberate operation using the memorial system.'
      }
    },
    beastmaster: {
      civic: {
        theme: 'animal reading and industrial creature management',
        contradiction: 'Soreheim Proper beast handling logs show creature agitation in the eastern corridor that was not reported to the route authorities before the closure',
        objective: 'Establish what the creatures were responding to and whether that response was suppressed deliberately.',
        narrative: 'Soreheim Proper manages industrial creatures and extraction animals under careful protocol. Beastmasters read creature behavior as evidence. The agitation was logged at the handler level and then blocked from upward reporting, which means management wanted the signal suppressed.'
      },
      frontier: {
        theme: 'wild creature behavior and dome perimeter reading',
        contradiction: 'Aurora Crown Commune perimeter logs show unusual creature movement patterns on the eastern approach that the dome authority classified as equipment error',
        objective: 'Confirm the creature movement pattern was real and establish what the creatures were responding to.',
        narrative: 'Aurora Crown Commune monitors its dome perimeter carefully. Beastmasters who read perimeter data know the difference between equipment error and animal response to genuine threat. The classification was applied after the pattern was logged, not before.'
      },
      occult: {
        theme: 'field creature tracking and tollway creature pressure',
        contradiction: 'Fairhaven tollway beast handlers report creature avoidance of the eastern approach that began before the official closure and was not included in any official report',
        objective: 'Document the creature avoidance timeline and learn what was present on the approach before the closure.',
        narrative: 'Fairhaven manages livestock and beast traffic through its tollways. Beastmasters who work the tollway approaches know creature avoidance as a reliable early signal. The avoidance predates the closure, which means the threat existed before any official acknowledgment.'
      }
    }
  };

  const BACKGROUNDS = {};
  const BACKGROUND_ROUTE_SIGNATURES = {};

  ARCHETYPES.forEach((a, ai)=>{
    const localitySet = ARCHETYPE_ORIGIN_LOCALITIES[a.id] || ['shelkopolis','shelkopolis','shelkopolis'];
    const familyCycle = STAGE_FAMILIES.stage2;
    const baseIndex = ai % familyCycle.length;
    const stage1Content = STAGE1_BACKGROUND_CONTENT[a.id] || {};
    const backgrounds = [
      {id:`${a.id}_civic`,name:'Civic Hand',type:'civic'},
      {id:`${a.id}_frontier`,name:'Frontier Hand',type:'frontier'},
      {id:`${a.id}_occult`,name:'Occult Hand',type:'occult'}
    ].map((b, bi)=>{
      const s1 = stage1Content[b.type] || {theme:'local pressure and adaptation',contradiction:'something is wrong and getting worse',objective:'Find the hidden hand behind the pressure.',narrative:'Something has broken here.'};
      return {
        ...b,
        theme: s1.theme,
        originLocality: localitySet[bi],
        firstNpc: (NPC_PLACEMENTS[localitySet[bi]]||[])[0]?.id || null,
        firstSafeZone: KEY_LOCALITIES[localitySet[bi]].safeZone,
        firstContradiction: s1.contradiction,
        firstObjective: s1.objective,
        firstFailure: `A failed push hands time and visibility to whoever benefits from the present confusion.`,
        stage1Narrative: s1.narrative,
        bonus: a.focus
      };
    });
    BACKGROUNDS[a.id] = backgrounds;
    backgrounds.forEach((b, bi)=>{
      BACKGROUND_ROUTE_SIGNATURES[b.id] = {
        backgroundId:b.id,
        originLocality:b.originLocality,
        stage1Plot:b.type,
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
  // ── V33_1 CANON DATA ─────────────────────────────────────
  const MAGIC_SYSTEM = [
    {polity:"Shelk",identity:"artistic, ceremonial, socially legible magic",expressions:["enchanted fashion and textile work","estate and cathedral wards","archive- and glyph-adjacent scholarship"],socialReading:"Magic in Shelk is read through refinement, cultural legitimacy, craft quality, and controlled public presentation rather than brute force alone.",localities:["shelkopolis","fairhaven","plumes_end_outpost"]},
    {polity:"Roaz",identity:"regulated, punitive, antimagic-conscious practice",expressions:["detection, suppression, and evidence work","state-cleared engineering at bastions and secure facilities","forensic or legal magical procedure"],socialReading:"The central question is not whether magic exists, but who may use it, under what supervision, and how quickly it can be recorded and constrained.",localities:["ithtananalor","ironhold_quarry"]},
    {polity:"Mimolot",identity:"scholastic, archival, and tariff-mediated magic",expressions:["academy study","artifact research","licensed teaching and inscription"],socialReading:"Magic is treated as disciplined knowledge infrastructure with political and economic consequences.",localities:["mimolot_academy"]},
    {polity:"Panim",identity:"ritual and funerary mediation",expressions:["afterlife preparation","sacred rites","custody of bodies, offerings, and sanctioned transitions"],socialReading:"Magic is inseparable from sanctity, duty, and the managed relation between mortal life and divine judgment.",localities:["panim_haven"]},
    {polity:"Sheresh Communes",identity:"survival-critical civic magic under contamination pressure",expressions:["arcane domes","containment work","research and experimental magical craft"],socialReading:"Magic is daily civic infrastructure before it is spectacle. Failure is communal, not private.",localities:["aurora_crown_commune","glasswake_commune","whitebridge_commune"]},
    {polity:"Soreheim Alliance",identity:"rare strategic magic under communal oversight",expressions:["relic strategy","industrial and agricultural integration where approved","wizard-advisor and long-horizon planning work"],socialReading:"Magic is respected less as personal expression than as a controlled strategic asset that must justify its burden to the collective.",localities:["soreheim_proper","sunspire_haven","harvest_circle"]},
    {polity:"Nomdara Caravan",identity:"mobile mixed-practice pragmatism",expressions:["trade-safe warding","portable relic custody","cross-jurisdiction ritual adaptation"],socialReading:"Nomdara practice must remain flexible enough to cross legal cultures without assuming one doctrine is valid everywhere.",localities:[]},
  ];

  const LOCALITY_RUMORS = {
    panim_haven:["Something in Panim Haven has grown more tense than the officials admit.","The last busy cycle left someone unpaid or publicly embarrassed.","A respected local figure is said to be protecting someone they should have exposed."],
    sunspire_haven:["Something in Sunspire Haven has grown more tense than the officials admit.","The last busy cycle left someone unpaid or publicly embarrassed.","A respected local figure is said to be protecting someone they should have exposed."],
    aurora_crown_commune:["Something in Aurora Crown Commune has grown more tense than the officials admit.","The last busy cycle left someone unpaid or publicly embarrassed.","A respected local figure is said to be protecting someone they should have exposed."],
    shelkopolis:["Something in Shelkopolis has grown more tense than the officials admit.","The last busy cycle left someone unpaid or publicly embarrassed.","A respected local figure is said to be protecting someone they should have exposed."],
    harvest_circle:["A quota dispute is drawing attention at the market stalls.","Festival prices are being manipulated by someone with access to the early tallies."],
    glasswake_commune:["A contamination reading does not match the official record.","Someone moved samples through the checkpoint without clearance."],
    fairhaven:["Something in Fairhaven has grown more tense than the officials admit.","The last busy cycle left someone unpaid or publicly embarrassed.","A respected local figure is said to be protecting someone they should have exposed."],
    mimolot_academy:["Something in Mimolot Academy has grown more tense than the officials admit.","The last busy cycle left someone unpaid or publicly embarrassed.","A respected local figure is said to be protecting someone they should have exposed."],
    soreheim_proper:["Something in Soreheim Proper has grown more tense than the officials admit.","The last busy cycle left someone unpaid or publicly embarrassed.","A respected local figure is said to be protecting someone they should have exposed."],
    shirshal:["Something in Shirshal has grown more tense than the officials admit.","The last busy cycle left someone unpaid or publicly embarrassed.","A respected local figure is said to be protecting someone they should have exposed."],
    ithtananalor:["Something in Ithtananalor has grown more tense than the officials admit.","The last busy cycle left someone unpaid or publicly embarrassed.","A respected local figure is said to be protecting someone they should have exposed."],
    guildheart_hub:["Something in Guildheart Hub has grown more tense than the officials admit.","The last busy cycle left someone unpaid or publicly embarrassed.","A respected local figure is said to be protecting someone they should have exposed."],
    cosmoria:["Something in Cosmoria has grown more tense than the officials admit.","The last busy cycle left someone unpaid or publicly embarrassed.","A respected local figure is said to be protecting someone they should have exposed."],
    craftspire:["A copy theft is being investigated without full disclosure.","Materials appeared at a licensed station without tariff marks."],
    unity_square:["A price shock is disrupting a major cargo transfer.","Someone is operating without affiliation in a clearly affiliated zone."],
    ironhold_quarry:["An ore discrepancy at the quarry gate is not adding up.","An enforcement sweep is coming that not everyone has been told about."],
    plumes_end_outpost:["A hazard report from the northward route is being handled quietly.","A caravan delayed too long at the post is starting to draw questions."],
    whitebridge_commune:["Bridge conditions are being reported as better than they are.","A missing expedition party is overdue and the commune is divided on response."],
  };

  const LOCALITY_HOOKS = {
    panim_haven:{conflictSurfaces:["faith versus secrecy","grief versus cost","ritual dignity versus opportunistic trade"],senseOfPlace:"The air carries salt, incense, wax, cedar, linen, and low voices. Public spaces feel watched by memory, accountancy, and doctrine.",dailyLife:"Daily life turns on records, mediation, offering preparation, grief traffic, and the steady movement of family duty through sacred administration.",suspiciousBehavior:["false lineage claims","tampering with offering records","desperate attempts to bypass ritual cost"],taboos:["cheap jokes about death","public bargaining over memorial worth in crude terms"],firstContact:"Panim Haven Innkeeper",visibleFactions:["House Panim","Panim Afterlife Registry"],sceneStarters:["overheard dispute at a public threshold","public ceremony under pressure","missing person or missing ledger concern","funeral procession or shrine petition","bureaucratic friction with real stakes"]},
    sunspire_haven:{conflictSurfaces:["ambition versus communal obligation","progress versus tradition","resource demand versus local survival"],senseOfPlace:"Air carries slag, grain mash, machine grease, smoke, wet stone, and cooked communal meals. Sounds are horns, hammers, rolling freight, and shouted shift orders.",dailyLife:"Shifts, quotas, repair cycles, hauling, planning, and ritualized contribution define ordinary life from quarries to towers to farm zones.",suspiciousBehavior:["unaccounted stockpiles","sabotage signs","illicit magic or relic handling"],taboos:["open contempt for communal ownership","boasting about selfish accumulation"],firstContact:"Sunspire Haven Innkeeper",visibleFactions:["Giant Council","Engineers' Consortium","Miners' Assembly","Agricultural Syndicate"],sceneStarters:["quota dispute at the convoy yard","labor stoppage or delayed shipment","sabotage sign in a production zone","faction test of loyalty or usefulness"]},
    aurora_crown_commune:{conflictSurfaces:["survival versus curiosity","innovation versus containment","shared shelter versus personal secrecy"],senseOfPlace:"Air smells of ozone, lamp oil, snow-wet cloth, boiled broth, resin, and metal warmed too near heat sources. Quieter and more careful than temperate polities.",dailyLife:"Heat management, repair, research, route timing, preserved food routines, and aurora or containment watch shape daily existence.",suspiciousBehavior:["tampering with dome systems","moving between communes with unexplained residue or devices"],taboos:["mocking mutation scars or dome necessity"],firstContact:"Aurora Crown Commune Innkeeper",visibleFactions:["Sheresh Dome Stewards","Sheresh Containment Research Concord","Sheresh Route Warden Compacts"],sceneStarters:["dome stress event requiring communal response","quarantine breach at checkpoint","research result that contradicts official record"]},
    shelkopolis:{conflictSurfaces:["trade versus dignity","refinement versus necessity","public harmony versus covert rivalry"],senseOfPlace:"Markets smell of dyes, pressed flowers, wool, metal polish, and cooked street food. Roads carry bells, hooves, clipped commands, and bright plume movement. Shrines feel orderly rather than ecstatic.",dailyLife:"Daily life turns on tailoring, road policing, market exchange, scholarly browsing, and layered public performance where refinement and utility are expected to coexist.",suspiciousBehavior:["lingering near route offices without business","copying patterns or ceremonial designs","moving through elite districts in obvious disguise"],taboos:["publicly humiliating a host over dress or refinement","dismissive treatment of House obligations"],firstContact:"Amber Fountain Innkeeper",visibleFactions:["Roadwardens Order","Fashion Artisans Collective","House Shelk"],sceneStarters:["overheard dispute at a public threshold","public ceremony under pressure","missing person or missing ledger concern","trade dispute with witnesses","faction test of loyalty or usefulness"]},
    harvest_circle:{conflictSurfaces:["quota versus hunger","family favor versus fair trade","festival mood versus spoilage pressure"],senseOfPlace:"Grain dust, festival smoke, animal labor, and fresh bread. Noise is communal, crowded, seasonal.",dailyLife:"Harvest, quota reporting, market trading, and festival preparation move in rounds tied to the growing cycle.",suspiciousBehavior:["undeclared loads at stalls","price manipulation before festival exchange"],taboos:["wasting grain publicly","undercutting family-controlled stalls without syndicate approval"],firstContact:"Threshing Shelter Keeper",visibleFactions:["Soreheim Alliance Agricultural Syndicate","Patron-Family Brokers"],sceneStarters:["quota dispute at market stalls","festival opening ceremony under pressure","spoilage incident affecting multiple families"]},
    glasswake_commune:{conflictSurfaces:["research curiosity versus containment rules","shared risk versus personal exposure","secrecy versus communal transparency"],senseOfPlace:"Cold, ozone-heavy air. Glass and metal instruments, quarantine seals, quiet alert sounds. Spaces feel clinical and pressurized.",dailyLife:"Contamination measurement, research protocols, quarantine routines, instrument calibration, and cold-light study fill every shift.",suspiciousBehavior:["entering without scan clearance","unexplained sample transport","discussing results without authorization"],taboos:["treating breach protocols as optional","bringing uncleared materials into research zones"],firstContact:"Research Quarantine Nook Keeper",visibleFactions:["Sheresh Containment Research Concord","Sheresh Dome Stewards"],sceneStarters:["instrument failure mid-research","quarantine dispute at checkpoint","contamination reading that does not match the official record"]},
    fairhaven:{conflictSurfaces:["trade versus dignity","refinement versus necessity","public harmony versus covert rivalry"],senseOfPlace:"Markets smell of dyes, pressed flowers, wool, metal polish, and cooked street food. Bright Roadwarden plumes on the road north. Shrines feel orderly, close.",dailyLife:"Daily life turns on food supply, alchemical craft, market exchange, and shrine observance near the glyph-cave edge.",suspiciousBehavior:["lingering near glyph cave approaches without business","copying ceremonial designs","unlicensed alchemical handling"],taboos:["publicly humiliating a host over dress or refinement","dismissive treatment of House obligations"],firstContact:"The Gilded Plough Innkeeper",visibleFactions:["Roadwardens Order","Fashion Artisans Collective","House Shelk"],sceneStarters:["overheard dispute at a public threshold","celestial creature sighting requiring shrine response","glyph anomaly report near the market edge"]},
    mimolot_academy:{conflictSurfaces:["knowledge versus access","scholarship versus privilege","precision versus curiosity"],senseOfPlace:"Paper dust, lamp oil, polished desks, muttered debate, and courier traffic carrying sealed packets.",dailyLife:"Instruction, copying, catalog review, tariff administration, debate, and magical training dominate the rhythm of Mimolot life.",suspiciousBehavior:["copying restricted diagrams","smuggling books","appearing in archive spaces without proper chain of access"],taboos:["public dismissal of education as wasteful","openly trafficking forbidden texts"],firstContact:"Mimolot Academy Innkeeper",visibleFactions:["House Mimolot","Mimolot Book Tariff Office"],sceneStarters:["overheard dispute at a public threshold","tariff dispute blocking archive access","restricted text found in circulation"]},
    soreheim_proper:{conflictSurfaces:["ambition versus communal obligation","progress versus tradition","resource demand versus local survival"],senseOfPlace:"Air carries slag, grain mash, machine grease, smoke, wet stone, and cooked communal meals. Sounds are horns, hammers, rolling freight, and shouted shift orders.",dailyLife:"Shifts, quotas, repair cycles, hauling, planning, and ritualized contribution define ordinary life from quarries to towers to farm zones.",suspiciousBehavior:["unaccounted stockpiles","sabotage signs","illicit magic or relic handling"],taboos:["open contempt for communal ownership","boasting about selfish accumulation"],firstContact:"Soreheim Proper Innkeeper",visibleFactions:["Giant Council","Engineers' Consortium","Miners' Assembly","Agricultural Syndicate","Artificers' Guild"],sceneStarters:["quota dispute at tower gate","industrial accident with contested blame","foreign pressure at trade review"]},
    shirshal:{conflictSurfaces:["truth versus convenience","safety versus secrecy","jurisdiction versus private power"],senseOfPlace:"People speak in lowered voices around cases. Ink, metal seals, burnt warding materials, and rain-damp stone shape the atmosphere.",dailyLife:"The everyday tempo is built from casework, witness traffic, evidence handling, magical anomaly review, and investigative rumor.",suspiciousBehavior:["contradictory testimony","ward tampering","unexplained residue or arcane symptoms"],taboos:["boasting about unsanctioned magical tricks in public"],firstContact:"Shirshal Innkeeper",visibleFactions:["House Shirsh","Magi Magistratus"],sceneStarters:["witness dispute with arcane evidence","case blocking movement through the ward","magical anomaly report requiring immediate response"]},
    ithtananalor:{conflictSurfaces:["law versus survival","security versus privacy","innovation versus containment"],senseOfPlace:"Air carries coal, oil, hot iron, damp paper, and ration kitchens. Streets sound like boots, carts, hammers, whistles, and ordered commands.",dailyLife:"Daily life is shaped by shifts, inspections, filings, quarry traffic, foundry schedules, and legal process.",suspiciousBehavior:["evading checkpoints","unlicensed artifacts","unaccounted cargo or notes"],taboos:["open praise of unlawful magic","casual discussion of covert enforcement methods"],firstContact:"Ithtananalor Innkeeper",visibleFactions:["Office of Roazian Enforcement","Iron Accord","House Roaz"],sceneStarters:["checkpoint incident with legal consequences","smuggling report with enforcement sweep incoming","legal identity dispute at a gate"]},
    guildheart_hub:{conflictSurfaces:["trade versus dignity","arbitration versus coercion","successor legitimacy versus expediency"],senseOfPlace:"The air is full of chalk dust, ink, rope, cooking oil, hot metal, wet crates, and argument. Streets feel loud, useful, and perpetually provisional.",dailyLife:"Union life is crowded with arbitration, freight movement, guild disputes, workshops, changing obligations, and public notice culture.",suspiciousBehavior:["price manipulation without cover","stolen seals","appearing at freight yards without affiliation or purpose"],taboos:["casual claims over Mal succession rights without standing","public accusations without ledger backing"],firstContact:"Guildheart Hub Innkeeper",visibleFactions:["The Union","Union Trade Arbitration Guild","Union Sanction Board","House Mal Remnant Claimants"],sceneStarters:["overheard dispute at a public threshold","sanction dispute with witnesses","cargo theft with route closure implications"]},
    cosmoria:{conflictSurfaces:["trade versus safety","record truth versus profit","shore authority versus floating custom"],senseOfPlace:"Salt, rope tar, wet wood, fish, ink, kelp, and hammered fittings define the sensory field. Voices rise and fall with loading calls and weather alarms.",dailyLife:"Life turns on tides, docking, repairs, recordkeeping, tax or treasury duty, and the constant trade between shore and floating civic space.",suspiciousBehavior:["unmanifested cargo","interest in ledgers without cause","lingering near treasury or shipwright controls"],taboos:["careless talk that jeopardizes shipping security or treasury trust"],firstContact:"Cosmoria Innkeeper",visibleFactions:["House Cosmouth","Cosmouth Archives and Treasury"],sceneStarters:["cargo dispute at a maritime ledger point","storm disruption to docking schedule","treasury record discrepancy drawing attention"]},
    craftspire:{conflictSurfaces:["intellectual property versus open knowledge","production pressure versus craft quality","guild authority versus worker independence"],senseOfPlace:"Ink, sawdust, press oil, binding glue, workshop smoke, and the rhythmic sound of presses and cutting tools.",dailyLife:"Copying, binding, press operation, tariff filing, commission work, and quality inspection rotate through workshop shifts.",suspiciousBehavior:["unauthorized copying near restricted presses","materials without tariff marks","non-guild workers at licensed stations"],taboos:["bypassing book-tax records","reproducing commission work for personal profit"],firstContact:"Workshop Quarter Alcove Keeper",visibleFactions:["The Union","Union Copy-Right Enforcement","Guild Artisan Collective"],sceneStarters:["copy theft discovered mid-shift","tariff dispute blocking a commissioned order","sabotage at a major production run"]},
    unity_square:{conflictSurfaces:["arbitration versus coercion","posted rates versus private deals","guild color legitimacy versus market chaos"],senseOfPlace:"Chalk dust, ink, rope, loud voices, freight movement, and the smell of cooked food from market edge vendors.",dailyLife:"Trade negotiation, inspection queue waiting, freight matching, rate checking, and sanction notice reading fill exchange hours.",suspiciousBehavior:["price manipulation at posted rates","stolen guild color seals","operating without affiliation in a clearly affiliated zone"],taboos:["bypassing inspection lines openly","disputing sanction notices without registered standing"],firstContact:"Exchange Quarter Holding Room Clerk",visibleFactions:["The Union","Union Trade Arbitration Guild","Union Sanction Board"],sceneStarters:["price shock disrupting a major cargo transfer","sanction dispute with witnesses","cargo theft with route closure implications"]},
    ironhold_quarry:{conflictSurfaces:["labor discipline versus survival","resource access versus border authority","enforcement presence versus worker autonomy"],senseOfPlace:"Stone dust, iron smell, damp earth, torch smoke, the sound of drills and quarry signals. Authority is visible and physical.",dailyLife:"Extraction shifts, labor zone assignments, overseer rounds, resource tallying, and enforcement presence define every working day.",suspiciousBehavior:["unauthorized zone entry","unaccounted ore samples","contact with non-quarry personnel without clearance"],taboos:["defying labor zone instructions openly","theft of Roazian strategic resources"],firstContact:"Quarry Overseer Station Clerk",visibleFactions:["Office of Roazian Enforcement","Iron Accord","Quarry Labor Oversight"],sceneStarters:["labor zone incident with legal consequences","resource theft investigation","enforcement sweep disrupting normal extraction"]},
    plumes_end_outpost:{conflictSurfaces:["route safety versus speed","shrine authority versus military command","caravan interest versus patrol control"],senseOfPlace:"Road dust, horse sweat, shrine incense, cook fire smoke. A critical stopping point. Sounds are patrol orders and caravan signals.",dailyLife:"Route reporting, caravan staging, shrine observance, hazard reading, and patrol rotation hold the outpost rhythm.",suspiciousBehavior:["moving without route declaration","ignoring shrine protocol before northward departure","evading patrol inspection"],taboos:["skipping shrine rite before hazardous northern passage","bypassing outpost gate without route statement"],firstContact:"Caravan Rest Post Keeper",visibleFactions:["Roadwardens Order","House Shelk Patrol Authority"],sceneStarters:["hazard report from northward route","caravan disruption at the outpost gate","celestial enforcer sighting requiring shrine response"]},
    whitebridge_commune:{conflictSurfaces:["emergency sharing versus private supply","crossing authority versus urgency","winter survival versus route schedule"],senseOfPlace:"Cold, wind-cut, ice smell, woodsmoke, and the sound of crossing signals and bridge monitoring. Survival urgency underlies everything.",dailyLife:"Bridge maintenance, crossing registration, emergency shelter rotation, hazard monitoring, and route arbitration define communal time.",suspiciousBehavior:["concealing hazard knowledge at crossing registration","unauthorized bridge use in dangerous conditions","hoarding emergency supplies during shared crisis"],taboos:["concealing hazard information before crossing","refusing communal sharing during declared emergency"],firstContact:"Crossing Shelter Hall Keeper",visibleFactions:["Sheresh Route Warden Compacts","Sheresh Dome Stewards"],sceneStarters:["bridge icing incident blocking inter-dome traffic","refugee surge at the crossing shelter","missing expedition triggering communal search"]},
  };

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
  window.LOCALITY_SERVICE_ITEM_OVERRIDES = LOCALITY_SERVICE_ITEM_OVERRIDES;
  window.STAGE2_DESTINATION_CONTENT = STAGE2_DESTINATION_CONTENT;
  window.BUILD_VERIFICATION = BUILD_VERIFICATION;
  window.MAGIC_SYSTEM = MAGIC_SYSTEM;
  window.LOCALITY_RUMORS = LOCALITY_RUMORS;
  window.LOCALITY_HOOKS = LOCALITY_HOOKS;
  window.CANON_VERSION = 'V33_1';
})();
