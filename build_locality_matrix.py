#!/usr/bin/env python3
"""
build_locality_matrix.py
Locality Matrix Backbone Build — merges V33_1 source data + KEY_LOCALITIES
into spec-compliant runtime JS data files under data/

Run: python build_locality_matrix.py
"""
import json, os, re
from pathlib import Path

ROOT = Path(__file__).parent
DIST_DIR = ROOT / 'data'
DISTRICTS_DIR = (ROOT / 'V33_1_extracted' / 'V33_1_DnD_World_Repository'
                 / '02_CANON_BASELINE' / 'districts')
TRAVEL_NETWORK_FILE = ROOT / '07_WORLD_GRAPH' / 'locality_travel_network.json'

# ── Polity hierarchy ─────────────────────────────────────────────────────────

POLITY_CROSSWALK = {
    'Principality of Shelk':  'principality_of_shelk',
    'House Panim':            'house_panim',
    'House Mimolot':          'house_mimolot',
    'House Shirsh':           'house_shirsh',
    'Principality of Roaz':   'principality_of_roaz',
    'House Cosmouth':         'house_cosmouth',
    'Principality of Zootia': 'principality_of_zootia',
    'The Union':              'the_union',
    'Soreheim Alliance':      'soreheim_alliance',
    'Sheresh Communes':       'sheresh_communes',
    'Psanan':                 'psanan',
}

UMBRELLA = {
    'principality_of_shelk':  ('the_principalities', 'The Principalities'),
    'house_panim':            ('the_principalities', 'The Principalities'),
    'house_mimolot':          ('the_principalities', 'The Principalities'),
    'house_shirsh':           ('the_principalities', 'The Principalities'),
    'principality_of_roaz':   ('the_principalities', 'The Principalities'),
    'house_cosmouth':         ('the_principalities', 'The Principalities'),
    'principality_of_zootia': ('the_principalities', 'The Principalities'),
    'the_union':              ('the_principalities', 'The Principalities'),
    'soreheim_alliance':      ('soreheim_alliance', 'Soreheim Alliance'),
    'sheresh_communes':       ('sheresh_communes',   'Sheresh Communes'),
    'psanan':                 ('psanan',             'Psanan'),
}

def nkey(s):
    return re.sub(r'[^a-z0-9]+', '_', s.lower()).strip('_')

def polity_block(raw):
    pk = POLITY_CROSSWALK.get(raw, nkey(raw))
    uk, ur = UMBRELLA.get(pk, (pk, raw))
    return {
        'parent_polity':  {'raw_value': raw, 'normalized_key': pk,
                           'source_field': 'polity', 'source_file_class': 'localities'},
        'umbrella_polity': {'raw_value': ur, 'normalized_key': uk,
                            'source_field': 'umbrella_polity', 'source_file_class': 'derived'},
    }

# ── Environment profiles ─────────────────────────────────────────────────────

ENV_PROFILES = {
    'aurora_meadows_volcanic_coast': {
        'primary_environment_label_raw': 'Aurora Meadows / Volcanic Coast',
        'primary_environment_label_key': 'aurora_meadows_volcanic_coast',
        'environment_components': ['aurora_meadows', 'volcanic_coast'],
        'surface_role_raw': 'Volcanic coastal lowland with glyph interference',
        'surface_role_key': 'volcanic_coast',
        'environment_assignment_method': 'region_group',
        'environment_assignment_confidence': 'direct',
    },
    'polar_dome_environment': {
        'primary_environment_label_raw': 'Polar Dome Environment',
        'primary_environment_label_key': 'polar_dome_environment',
        'environment_components': ['arctic', 'dome_habitat', 'contamination_zone'],
        'surface_role_raw': 'Arctic survival commune under containment dome',
        'surface_role_key': 'arctic_dome',
        'environment_assignment_method': 'region_group',
        'environment_assignment_confidence': 'direct',
    },
    'memorial_lowlands': {
        'primary_environment_label_raw': 'Memorial Lowlands',
        'primary_environment_label_key': 'memorial_lowlands',
        'environment_components': ['lowland', 'shrine_district', 'processional_routes'],
        'surface_role_raw': 'Lowland memorial and shrine district',
        'surface_role_key': 'memorial_lowlands',
        'environment_assignment_method': 'region_group',
        'environment_assignment_confidence': 'direct',
    },
    'roazian_highland': {
        'primary_environment_label_raw': 'Roazian Highland',
        'primary_environment_label_key': 'roazian_highland',
        'environment_components': ['highland', 'industrial_zone', 'enforcement_corridor'],
        'surface_role_raw': 'Highland extraction and enforcement zone',
        'surface_role_key': 'industrial_highland',
        'environment_assignment_method': 'region_group',
        'environment_assignment_confidence': 'direct',
    },
    'soreheim_plains_frontier': {
        'primary_environment_label_raw': 'Soreheim Plains / Frontier',
        'primary_environment_label_key': 'soreheim_plains_frontier',
        'environment_components': ['plains', 'frontier_zone', 'industrial_core'],
        'surface_role_raw': 'Alliance plains and frontier production zone',
        'surface_role_key': 'plains_frontier',
        'environment_assignment_method': 'region_group',
        'environment_assignment_confidence': 'direct',
    },
    'coastal_maritime': {
        'primary_environment_label_raw': 'Coastal Maritime',
        'primary_environment_label_key': 'coastal_maritime',
        'environment_components': ['coastal', 'maritime', 'floating_city'],
        'surface_role_raw': 'Coastal maritime and floating city infrastructure',
        'surface_role_key': 'coastal_maritime',
        'environment_assignment_method': 'region_group',
        'environment_assignment_confidence': 'direct',
    },
    'union_industrial_coast': {
        'primary_environment_label_raw': 'Union Industrial Coast',
        'primary_environment_label_key': 'union_industrial_coast',
        'environment_components': ['coastal', 'industrial', 'guild_network'],
        'surface_role_raw': 'Coastal guild-industrial network',
        'surface_role_key': 'industrial_coast',
        'environment_assignment_method': 'region_group',
        'environment_assignment_confidence': 'direct',
    },
    'principality_highland': {
        'primary_environment_label_raw': 'Principality Highland',
        'primary_environment_label_key': 'principality_highland',
        'environment_components': ['highland', 'academic', 'principality_territory'],
        'surface_role_raw': 'Highland principality academic territory',
        'surface_role_key': 'highland',
        'environment_assignment_method': 'region_group',
        'environment_assignment_confidence': 'direct',
    },
}

LOC_ENV_MAP = {
    'shelkopolis':          'aurora_meadows_volcanic_coast',
    'fairhaven':            'aurora_meadows_volcanic_coast',
    'plumes_end_outpost':   'aurora_meadows_volcanic_coast',
    'shirshal':             'aurora_meadows_volcanic_coast',
    'aurora_crown_commune': 'polar_dome_environment',
    'glasswake_commune':    'polar_dome_environment',
    'whitebridge_commune':  'polar_dome_environment',
    'panim_haven':          'memorial_lowlands',
    'ithtananalor':         'roazian_highland',
    'ironhold_quarry':      'roazian_highland',
    'soreheim_proper':      'soreheim_plains_frontier',
    'harvest_circle':       'soreheim_plains_frontier',
    'sunspire_haven':       'soreheim_plains_frontier',
    'harvest_keep':         'soreheim_plains_frontier',
    'cosmoria':             'coastal_maritime',
    'guildheart_hub':       'union_industrial_coast',
    'craftspire':           'union_industrial_coast',
    'unity_square':         'union_industrial_coast',
    'mimolot_academy':      'principality_highland',
}

# ── KEY_LOCALITIES ───────────────────────────────────────────────────────────

KEY_LOCALITIES = {
  'panim_haven': {
    'id':'panim_haven','name':'Panim Haven','polity':'House Panim','safeZone':'Memorial Waystation',
    'summary':'Afterlife-service and divine mediation metropolis of ledgers, shrines, offerings, and memorial traffic.',
    'economicRole':'afterlife preparations, offerings, mediation',
    'lawFeel':'sacrificial and mediation decorum; offering-failure is a civil matter',
    'pressures':['divine balance obligations','processional strain','seal dispute','mediation backlog'],
    'greetings':['ritual seriousness and respectful petition at thresholds','soft acknowledgements before shrine approach'],
    'rituals':['afterlife preparations before ledger work','offerings set at mediation courts'],
    'hazards':['processional_crush','ledger_fog'],'creatures':['veil_moth','gravewater_hound'],
    'settlement_type':'metropolis',
  },
  'sunspire_haven': {
    'id':'sunspire_haven','name':'Sunspire Haven','polity':'Soreheim Alliance','safeZone':'Convoy Rest Yard',
    'summary':'Rural crossroads market town where tools, grain contracts, and labor obligations move through workshop syndicates and patron-families.',
    'economicRole':'tools, textiles, market exchange, grain routing, labor brokerage',
    'lawFeel':'communal ownership norms enforced through regional decrees, syndicate records, and family obligation',
    'pressures':['predators','water system vulnerabilities','storage disputes','family favor feuds'],
    'greetings':['contribute and trade fairly at the syndicate yard','show respect to the family controlling the yard'],
    'rituals':['harvest and unity rites beside practical oath-rituals for contracts','route prayers at convoy departure'],
    'hazards':['predator_breach','water_line_break'],'creatures':['pack_raider','frost_scavenger'],
    'settlement_type':'town',
  },
  'aurora_crown_commune': {
    'id':'aurora_crown_commune','name':'Aurora Crown Commune','polity':'Sheresh Communes','safeZone':'Dome Relief Cell',
    'summary':'Largest Sheresh dome commune where survival administration, celestial study, and public endurance ritual converge.',
    'economicRole':'protective craftwork, calibration tools, celestial research support',
    'lawFeel':'containment law, resource triage, mandatory repair rotations',
    'pressures':['dome stress','contamination seepage','ration balancing'],
    'greetings':['respect dome protocols at every threshold','report cracks and supply irregularities immediately'],
    'rituals':['aurora and survival observance communal rather than triumphal','mandatory repair rotation acknowledgements'],
    'hazards':['dome_breach','contamination_seepage'],'creatures':['aurora_leech','dome_lurker'],
    'settlement_type':'commune',
  },
  'shelkopolis': {
    'id':'shelkopolis','name':'Shelkopolis','polity':'Principality of Shelk','safeZone':'Roadwarden Annex Ward',
    'summary':'Largest metropolis of the Principalities, defined by fashion, trade, refined civic order, and visible devotional plurality.',
    'economicRole':'fashion production, enchanted tailoring, merchant exchange, craft education, Roadwarden support industry',
    'lawFeel':'fashion and decorum law intensify in noble spaces; intellectual property law is serious in elite and archival sites',
    'pressures':['glyph corruption beyond the city','trade security obligations','noble rivalry','festival traffic'],
    'greetings':['observe site-specific decorum','respect local fashion and craft traditions'],
    'rituals':['visible offerings for Compassion and renewal at district shrines'],
    'hazards':['glyph_surge','stampede_front'],'creatures':['quay_thief','watch_hound'],
    'settlement_type':'metropolis',
  },
  'harvest_circle': {
    'id':'harvest_circle','name':'Harvest Circle','polity':'Soreheim Alliance','safeZone':'Threshing Shelter',
    'summary':'Cultural and market town where harvest patron-families, quota clerks, and festival brokers turn field output into alliance redistribution.',
    'economicRole':'grain redistribution, festival trade, storage, convoy assembly',
    'lawFeel':'market peace enforced through communal law, clerk records, and family responsibility',
    'pressures':['spoilage','price pressure','favor feuds','route congestion'],
    'greetings':['declare loads honestly at stalls','respect family-controlled stalls and convoy order'],
    'rituals':['unity and harvest rites public and crowded','festival exchange resets debts, favors, and work pledges'],
    'hazards':['spoilage_break','route_choke'],'creatures':['field_maw','granary_ratking'],
    'settlement_type':'town',
  },
  'glasswake_commune': {
    'id':'glasswake_commune','name':'Glasswake Commune','polity':'Sheresh Communes','safeZone':'Research Quarantine Nook',
    'summary':'Sheresh research commune devoted to contamination measurement, cold-light study, and shield experimentation.',
    'economicRole':'testing instruments, ward maintenance, data exchange',
    'lawFeel':'quarantine law, research containment protocol; violation is a communal emergency',
    'pressures':['exposure incidents','quarantine fatigue','instrument failure'],
    'greetings':['submit to scanning at every checkpoint','treat every breach as real until cleared'],
    'rituals':['ritual life subdued and tied to survival timing','sample protocols observed before major work runs'],
    'hazards':['exposure_breach','instrument_failure'],'creatures':['glasswake_mite','choir_lurker'],
    'settlement_type':'commune',
  },
  'fairhaven': {
    'id':'fairhaven','name':'Fairhaven','polity':'Principality of Shelk','safeZone':'Market Chapel Cellar',
    'summary':'Agricultural and artisanal town supporting Shelkopolis while sitting near active glyph-cave pressure.',
    'economicRole':'food supply, alchemical ingredients, enchanted tools, minor arms and textiles',
    'lawFeel':'standard Shelk road and market law; increased concern for dangerous magic near glyph anomalies',
    'pressures':['glyph corruption','celestial creatures at Watchers Perch','suspicious travelers in taverns'],
    'greetings':['respect local purification rites at chapel approaches'],
    'rituals':['Felujitas and Cyfoes visible through chapel and fountain worship','lamp-trim at threshold shrines'],
    'hazards':['glyph_surge','celestial_breach'],'creatures':['celestial_enforcer','cave_lurk'],
    'settlement_type':'town',
  },
  'mimolot_academy': {
    'id':'mimolot_academy','name':'Mimolot Academy','polity':'House Mimolot','safeZone':'Archive Convalescence Alcove',
    'summary':'Center for noble education and magical schooling where knowledge tariffs are enforced and scholarly decorum is mandatory.',
    'economicRole':'education, knowledge tariffs, magic items',
    'lawFeel':'book tariff and magical conduct law; unauthorized copying is criminal',
    'pressures':['tariff tensions','faculty privilege disputes','tutor magistrate enforcement'],
    'greetings':['scholarly decorum at all lecture and archive approaches','rank-conscious acknowledgements'],
    'rituals':['ink-touch before lecture entries','candle rites in memory halls'],
    'hazards':['tariff_dispute','archive_lock'],'creatures':['ink_wisp','catalog_biter'],
    'settlement_type':'city',
  },
  'soreheim_proper': {
    'id':'soreheim_proper','name':'Soreheim Proper','polity':'Soreheim Alliance','safeZone':'Forge Rest Gallery',
    'summary':'Harsh hierarchical tower-centered production core where alliance governance, foreign affairs, war output, and high-order manufacturing converge across Titan Towers.',
    'economicRole':'high-order manufacturing, war production, refinement, distribution, foreign trade oversight',
    'lawFeel':'communal ownership and restorative justice enforced through central tower review',
    'pressures':['quota demands','political rivalry','foreign pressure','industrial accidents'],
    'greetings':['meet quotas and declare work status at tower gates','respect tower rank in all encounters'],
    'rituals':['ambition and merit judgment public at tower oath displays','spark-offerings at forge altars'],
    'hazards':['tower_shear','industrial_break'],'creatures':['slag_hound','quarry_coloss'],
    'settlement_type':'metropolis',
  },
  'shirshal': {
    'id':'shirshal','name':'Shirshal','polity':'House Shirsh','safeZone':'Witness Court Side Hall',
    'summary':'Investigative magical-law center where Magi Magistratus enforces magical compliance and investigation is formal economic activity.',
    'economicRole':'investigation, magical research, case archiving',
    'lawFeel':'magical compliance law saturates public life; arcane scrutiny at every threshold',
    'pressures':['magical law violations','witness backlog','arcane scrutiny pressure'],
    'greetings':['cooperate with inquiries at every checkpoint','measured witness greetings'],
    'rituals':['water-touch before testimony','quiet oath phrases in queue'],
    'hazards':['arcane_discharge','seal_feedback'],'creatures':['court_leech','record_hunter'],
    'settlement_type':'city',
  },
  'ithtananalor': {
    'id':'ithtananalor','name':'Ithtananalor','polity':'Principality of Roaz','safeZone':'Enforcement Checkpoint Ward',
    'summary':'Fortified administrative heart of Roaz where legal identity, anti-magic law, prison labor, and enforcement culture visibly merge.',
    'economicRole':'ore control, legal infrastructure, technology, prison labor logistics',
    'lawFeel':'Roazian antimagic and order law saturate public life; compliance is non-negotiable',
    'pressures':['illicit magic','smuggling','public accountability for harsh enforcement'],
    'greetings':['comply promptly at checkpoints','accept inspection without resistance'],
    'rituals':['document verification before entry','seal inspection at all gates'],
    'hazards':['enforcement_raid','containment_breach'],'creatures':['ore_hound','guard_construct'],
    'settlement_type':'city',
  },
  'guildheart_hub': {
    'id':'guildheart_hub','name':'Guildheart Hub','polity':'The Union','safeZone':'Guild Hall Archive Chamber',
    'summary':'Dense industrial-urban nerve center of the Union where guild rank supersedes noble birth and contract legitimacy is public law.',
    'economicRole':'arbitration, tariff mediation, warehouse registration, trade sanctioning',
    'lawFeel':'contract and sanction logic are publicly legible; failure to register goods attracts rapid administrative consequences',
    'pressures':['legacy Mal claims','smuggling','Red Hood rumor presence','imperial oversight'],
    'greetings':['declare business plainly at guild gates','produce records when challenged'],
    'rituals':['sanction notice reading at market opening','contract seal verification before freight release'],
    'hazards':['warehouse_collapse','fire_break'],'creatures':['guild_enforcer','contract_bound'],
    'settlement_type':'city',
  },
  'cosmoria': {
    'id':'cosmoria','name':'Cosmoria','polity':'House Cosmouth','safeZone':'Maritime Archive Hall',
    'summary':'Floating intellectual and shipwright metropolis where archives, maritime etiquette, and shipwright economy define access and status.',
    'economicRole':'shipwright industry, archives, maritime trade',
    'lawFeel':'archive and tax discipline; maritime etiquette failures are social and legal liabilities',
    'pressures':['storm weather','trade vulnerability'],
    'greetings':['respect archives and maritime administration at all landings'],
    'rituals':['maritime blessing before passage','noble retreat and sea communion culture in upper tiers'],
    'hazards':['storm_surge','deck_collapse'],'creatures':['sea_leech','floating_scavenger'],
    'settlement_type':'floating metropolis',
  },
  'craftspire': {
    'id':'craftspire','name':'Craftspire','polity':'The Union','safeZone':'Workshop Quarter Alcove',
    'summary':'Highly urbanized production district where artisan output, book-copy bureaucracy, and licensed knowledge trade converge into industrial economic authority.',
    'economicRole':'book copying, regulated magical trade, artisan showcase production',
    'lawFeel':'book-tax and copy-right law; unauthorized reproduction is criminally prosecuted',
    'pressures':['copy theft','intellectual property disputes','material shortages'],
    'greetings':['respect queue and workshop boundaries','observe tariff marking rules'],
    'rituals':['practical devotion in workshop alcoves','opening rites before major work runs'],
    'hazards':['fire_break','sabotage_strike'],'creatures':['guild_enforcer','workshop_raider'],
    'settlement_type':'city',
  },
  'unity_square': {
    'id':'unity_square','name':'Unity Square','polity':'The Union','safeZone':'Exchange Quarter Holding Room',
    'summary':'High-density urban exchange quarter where negotiated trade replaces inherited privilege as the public language of status.',
    'economicRole':'market mediation, spot trade, inspection fees, transport matching',
    'lawFeel':'market fraud and sanction breaches draw immediate official response',
    'pressures':['price shocks','cargo theft','route closures'],
    'greetings':['state terms clearly at exchange gates','observe inspection lines'],
    'rituals':['market rhythm dominates','small shrines at exchange edges for opening rites'],
    'hazards':['cargo_theft','route_choke'],'creatures':['exchange_raider','rumor_runner'],
    'settlement_type':'city',
  },
  'ironhold_quarry': {
    'id':'ironhold_quarry','name':'Ironhold Quarry','polity':'Principality of Roaz','safeZone':'Quarry Overseer Station',
    'summary':'Major Roazian extraction site linked to law, labor discipline, and strategic infrastructure supply.',
    'economicRole':'ore, stone, strategic construction resources',
    'lawFeel':'high enforcement visibility; labor zone violations treated as direct Roazian authority challenges',
    'pressures':['labor harshness','resource theft','border competition'],
    'greetings':['obey labor zones and guard instructions at all entry points'],
    'rituals':['low-ornament discipline at shift starts','civic necessity observed before extraction work'],
    'hazards':['quarry_collapse','labor_break'],'creatures':['ore_hound','quarry_coloss'],
    'settlement_type':'operational_anchor',
  },
  'plumes_end_outpost': {
    'id':'plumes_end_outpost','name':"Plume's End Outpost",'polity':'Principality of Shelk','safeZone':'Caravan Rest Post',
    'summary':'Northern road outpost guarding and servicing caravans between Shelkopolis and Fairhaven.',
    'economicRole':'caravan staging, route security, hazard reading, shrine services',
    'lawFeel':'Shelk road and patrol law; shrine etiquette violations treated as omens requiring correction',
    'pressures':['caravan disruption rumors','celestial enforcer sightings'],
    'greetings':['submit to route order at the post gate','state business clearly to patrol leaders'],
    'rituals':["Shrine of Cysur safe-journey offerings before northward departure"],
    'hazards':['celestial_breach','caravan_attack'],'creatures':['celestial_enforcer','road_predator'],
    'settlement_type':'operational_anchor',
  },
  'whitebridge_commune': {
    'id':'whitebridge_commune','name':'Whitebridge Commune','polity':'Sheresh Communes','safeZone':'Crossing Shelter Hall',
    'summary':'Sheresh crossing commune that keeps frozen route traffic, emergency shelter, and arbitration moving between domes.',
    'economicRole':'shelter service, route maps, crossing support',
    'lawFeel':'crossing declaration law, shared emergency supply rules; concealment during emergencies is a communal crime',
    'pressures':['bridge icing','refugee surges','missing expeditions'],
    'greetings':['declare route intent at crossing registration','share hazard knowledge before departure'],
    'rituals':['survival storytelling binds the community in evening cycles'],
    'hazards':['bridge_ice','storm_surge'],'creatures':['frost_scavenger','refuge_raider'],
    'settlement_type':'commune',
  },
}

# ── Adjacency graph ──────────────────────────────────────────────────────────

ADJACENCY = {
  'panim_haven':          ['shelkopolis','shirshal','fairhaven'],
  'sunspire_haven':       ['harvest_circle','soreheim_proper','fairhaven'],
  'aurora_crown_commune': ['glasswake_commune','sunspire_haven','whitebridge_commune','soreheim_proper'],
  'shelkopolis':          ['fairhaven','panim_haven','shirshal','plumes_end_outpost','cosmoria'],
  'harvest_circle':       ['sunspire_haven','soreheim_proper'],
  'glasswake_commune':    ['aurora_crown_commune','sunspire_haven'],
  'fairhaven':            ['shelkopolis','sunspire_haven','panim_haven','mimolot_academy'],
  'mimolot_academy':      ['fairhaven','shirshal'],
  'soreheim_proper':      ['harvest_circle','sunspire_haven','ironhold_quarry','aurora_crown_commune'],
  'shirshal':             ['panim_haven','shelkopolis','mimolot_academy','panim_haven'],
  'ithtananalor':         ['shelkopolis','shirshal','ironhold_quarry','guildheart_hub'],
  'guildheart_hub':       ['fairhaven','shirshal','craftspire','unity_square','ithtananalor'],
  'cosmoria':             ['guildheart_hub','fairhaven','shelkopolis'],
  'craftspire':           ['guildheart_hub','unity_square'],
  'unity_square':         ['guildheart_hub','craftspire'],
  'ironhold_quarry':      ['ithtananalor','soreheim_proper'],
  'plumes_end_outpost':   ['shelkopolis','fairhaven'],
  'whitebridge_commune':  ['aurora_crown_commune','glasswake_commune'],
}

# New routes added (5 strategic inter-settlement connections):
# 1. shelkopolis <-> cosmoria  (coastal airship lane)
# 2. soreheim_proper <-> aurora_crown_commune  (northern highland path)
# 3. ithtananalor <-> guildheart_hub  (trade road)
# 4. panim_haven <-> shirshal  (coastal route — already in adjacency via panim_haven)
# 5. mimolot_academy <-> fairhaven  (scholar pilgrimage path — added above)

PORT_LOCALITIES = {'cosmoria','panim_haven','guildheart_hub','plumes_end_outpost'}
LARGE_SETTLEMENT_TYPES = {'metropolis','city','floating metropolis','macro-capital core'}

# ── Combat encounter tables ──────────────────────────────────────────────────

ENCOUNTER_TABLES = {
  'shelkopolis':          ['patrol_guard','private_security','red_hood_operative'],
  'fairhaven':            ['patrol_guard','private_security','red_hood_operative'],
  'plumes_end_outpost':   ['patrol_guard','frontier_militia'],
  'shirshal':             ['iron_accord_enforcer','patrol_guard','shadowhands_watcher'],
  'panim_haven':          ['patrol_guard','hostile_debtor'],
  'ithtananalor':         ['iron_accord_enforcer','patrol_guard'],
  'ironhold_quarry':      ['iron_accord_enforcer','frontier_militia'],
  'soreheim_proper':      ['iron_accord_enforcer','frontier_militia'],
  'harvest_circle':       ['frontier_militia','hostile_debtor'],
  'harvest_keep':         ['frontier_militia','hostile_debtor'],
  'sunspire_haven':       ['frontier_militia','patrol_guard'],
  'aurora_crown_commune': ['frontier_militia','patrol_guard'],
  'glasswake_commune':    ['frontier_militia','patrol_guard'],
  'whitebridge_commune':  ['frontier_militia','hostile_debtor'],
  'mimolot_academy':      ['patrol_guard','private_security','shadowhands_watcher'],
  'guildheart_hub':       ['private_security','iron_accord_enforcer','hostile_debtor'],
  'craftspire':           ['private_security','iron_accord_enforcer'],
  'unity_square':         ['private_security','hostile_debtor'],
  'cosmoria':             ['hostile_debtor','private_security'],
}

# ── Synthetic district templates ─────────────────────────────────────────────

SYNTH_TEMPLATES = [
  {
    'suffix':'high_quarter','display':'High Quarter',
    'district_type_raw':'upper district','district_type_key':'upper_district',
    'identity_tmpl':'{name} High Quarter — formal institutions, administrative offices, and upper-class services.',
    'approach_tmpl':'Formal facades and maintained approaches mark the administrative heart of {name}.',
    'inside_tmpl':'Orderly and watched. Rank is visible and movement is read.',
    'who_belongs':['officials','ranking citizens','institutional workers'],
    'visible_power':['local authority','senior administrators'],
    'economy':['administrative services','formal institutions'],
    'enc_table':['patrol_guard','private_security'],
  },
  {
    'suffix':'common_quarter','display':'Common Quarter',
    'district_type_raw':'common district','district_type_key':'common_district',
    'identity_tmpl':'{name} Common Quarter — markets, inns, workshops, and everyday traffic.',
    'approach_tmpl':'Market noise and workshop smoke mark the living center of {name}.',
    'inside_tmpl':'Busy and pragmatic. Business conducted openly; relationships tracked by reputation.',
    'who_belongs':['traders','artisans','travelers','workers'],
    'visible_power':['market wardens','guild representatives'],
    'economy':['trade','craft services','hospitality'],
    'enc_table':['patrol_guard','hostile_debtor','private_security'],
  },
  {
    'suffix':'low_ward','display':'Low Ward',
    'district_type_raw':'lower ward','district_type_key':'lower_ward',
    'identity_tmpl':'{name} Low Ward — labor quarters, repair yards, and off-record services.',
    'approach_tmpl':'Rougher edges and utilitarian infrastructure define the working base of {name}.',
    'inside_tmpl':'Labor-heavy, watchful, and self-managing. Strangers are noted quickly.',
    'who_belongs':['laborers','repair workers','low-cost traders'],
    'visible_power':['local fixers','ward wardens'],
    'economy':['repair services','labor','low-cost goods'],
    'enc_table':['frontier_militia','hostile_debtor','red_hood_operative'],
  },
]

def make_synthetic(loc_id, loc_name, tmpl):
    dist_id = f"{loc_id}_{tmpl['suffix']}"
    return {
        'record_kind': 'locality',
        'locality_id': dist_id,
        'display_name_raw': f"{loc_name} \u2014 {tmpl['display']}",
        'display_name_key': dist_id,
        'locality_class': 'district',
        'district_type_raw': tmpl['district_type_raw'],
        'district_type_key': tmpl['district_type_key'],
        'parent_settlement_id': loc_id,
        'is_synthetic': True,
        'synthetic_generation_rule': 'class_based_city_partition',
        'synthetic_basis': 'settlement_type',
        'name': f"{loc_name} \u2014 {tmpl['display']}",
        'identity': tmpl['identity_tmpl'].format(name=loc_name),
        'approach': tmpl['approach_tmpl'].format(name=loc_name),
        'inside': tmpl['inside_tmpl'],
        'who_belongs': tmpl['who_belongs'],
        'who_is_out_of_place': [],
        'expected_behavior': [],
        'visible_power': tmpl['visible_power'],
        'economy': tmpl['economy'],
        'faith': '',
        'pressure': [],
        'npc_interfaces': [],
        'law_context': [],
        'differentiator': '',
        '_enc_table': tmpl['enc_table'],
    }

# ── Narrative helpers ────────────────────────────────────────────────────────

def narrative_from_loc(loc):
    return {
        'opening_image':          loc.get('summary',''),
        'terrain_material_feel':  loc.get('economicRole',''),
        'ambient_activity':       (loc.get('rituals') or [''])[0],
        'visible_power_structure':loc.get('lawFeel',''),
        'outsider_friction':      (loc.get('greetings') or [''])[0],
        'local_threat_pressure':  ', '.join((loc.get('pressures') or [])[:2]),
        'beast_ecology_pressure': ', '.join(loc.get('creatures',[])),
    }

def narrative_from_district(d):
    return {
        'opening_image':           d.get('approach',''),
        'terrain_material_feel':   d.get('inside',''),
        'ambient_activity':        ', '.join(d.get('who_belongs',[])),
        'visible_power_structure': ', '.join(d.get('visible_power',[])),
        'outsider_friction':       ', '.join(d.get('who_is_out_of_place', d.get('expected_behavior',[]))),
        'local_threat_pressure':   ', '.join(d.get('pressure',[])),
        'district_poi_differentiator': d.get('differentiator',''),
        'encounter_rhythm':        d.get('encounter_rhythm',''),
    }

# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    DIST_DIR.mkdir(exist_ok=True)
    errors, warnings = [], []

    # 1. Travel network
    travel_times = {}
    if TRAVEL_NETWORK_FILE.exists():
        with open(TRAVEL_NETWORK_FILE, encoding='utf-8') as f:
            tn = json.load(f)
        for edge in tn.get('edges',[]):
            ok = nkey(edge['origin'])
            dk = nkey(edge['destination'])
            tt = edge.get('travel_times_days_est',{})
            travel_times[(ok,dk)] = tt
            travel_times[(dk,ok)] = tt

    # 2. Load V33_1 districts
    canon_districts = []
    if DISTRICTS_DIR.exists():
        for fp in sorted(DISTRICTS_DIR.glob('*.json')):
            with open(fp, encoding='utf-8') as f:
                canon_districts.append(json.load(f))
    else:
        warnings.append('Districts directory not found')

    # 3. Build settlement entries
    locality_matrix = {}
    for loc_id, loc in KEY_LOCALITIES.items():
        pb = polity_block(loc['polity'])
        env_key = LOC_ENV_MAP.get(loc_id, 'aurora_meadows_volcanic_coast')
        st = loc.get('settlement_type','settlement')
        lclass = 'operational_anchor' if st == 'operational_anchor' else 'settlement'
        entry = {
            'record_kind': 'locality',
            'locality_id': loc_id,
            'display_name_raw': loc['name'],
            'display_name_key': loc_id,
            'locality_class': lclass,
            'settlement_type_raw': st,
            'settlement_type_key': nkey(st),
            'parent_polity':  pb['parent_polity'],
            'umbrella_polity': pb['umbrella_polity'],
            'macroregion_environment_profile': ENV_PROFILES[env_key],
            'children': [],
        }
        # Preserve all KEY_LOCALITIES fields (except 'id' already in locality_id)
        for k, v in loc.items():
            if k not in ('id', 'settlement_type'):
                entry[k] = v
        locality_matrix[loc_id] = entry

    # Add Harvest Keep (V33_1 source, not in KEY_LOCALITIES)
    pb_hk = polity_block('Principality of Zootia')
    locality_matrix['harvest_keep'] = {
        'record_kind':'locality','locality_id':'harvest_keep',
        'display_name_raw':'Harvest Keep','display_name_key':'harvest_keep',
        'locality_class':'settlement','settlement_type_raw':'city','settlement_type_key':'city',
        'parent_polity': pb_hk['parent_polity'],'umbrella_polity': pb_hk['umbrella_polity'],
        'macroregion_environment_profile': ENV_PROFILES['soreheim_plains_frontier'],
        'children':[],'name':'Harvest Keep','polity':'Principality of Zootia',
        'safeZone':'Granary Steps Shelter',
        'summary':'Zootian city of grain storage, weight measures, and reserve politics.',
        'economicRole':'storage, weighing, reserve allocation','lawFeel':'reserve seal law, measure disputes',
        'pressures':['mold panic','reserve disputes'],'greetings':['wait for weighing','do not break seal marks'],
        'rituals':['blessing marks on bins read as stewardship'],
        'hazards':['storage_rot','reserve_breach'],'creatures':['granary_ratking','field_maw'],
        'assignment_method':'v33_1_district_parent_inference',
        'assignment_confidence':'conservative_inference',
    }

    # 4. Attach canon districts
    name_to_id = {v['display_name_raw'].lower(): k for k, v in locality_matrix.items()}
    name_to_id['harvest keep'] = 'harvest_keep'  # explicit crosswalk

    for dist in canon_districts:
        parent_name = (dist.get('parent') or dist.get('parent_settlement') or '').lower()
        parent_id = name_to_id.get(parent_name)
        if not parent_id:
            warnings.append(f"District '{dist.get('name')}' parent '{parent_name}' not resolved")
            continue
        dist_id = f"{parent_id}_{nkey(dist['name'])}"
        env_key = LOC_ENV_MAP.get(parent_id, 'aurora_meadows_volcanic_coast')
        pb = polity_block(dist.get('parent_polity') or locality_matrix[parent_id]['polity'])
        dist_entry = {
            'record_kind':'locality','locality_id':dist_id,
            'display_name_raw': dist['name'],'display_name_key': dist_id,
            'locality_class':'district',
            'district_type_raw': dist.get('type','district'),
            'district_type_key': nkey(dist.get('type','district')),
            'parent_settlement_id': parent_id,'is_synthetic': False,
            'parent_polity': pb['parent_polity'],'umbrella_polity': pb['umbrella_polity'],
            'macroregion_environment_profile': ENV_PROFILES[env_key],
            'name': dist['name'],
            'identity':          dist.get('identity',''),
            'approach':          dist.get('approach',''),
            'inside':            dist.get('inside',''),
            'who_belongs':       dist.get('who_belongs',[]),
            'who_is_out_of_place': dist.get('who_is_out_of_place',[]),
            'expected_behavior': dist.get('expected_behavior',[]),
            'visible_power':     dist.get('visible_power',[]),
            'economy':           dist.get('economy',[]),
            'faith':             dist.get('faith',''),
            'seasonal_change':   dist.get('seasonal_change',''),
            'pressure':          dist.get('pressure',[]),
            'npc_interfaces':    dist.get('npc_interfaces',[]),
            'law_context':       dist.get('law_context',[]),
            'differentiator':    dist.get('differentiator',''),
            'encounter_rhythm':  dist.get('encounter_rhythm',''),
        }
        locality_matrix[dist_id] = dist_entry
        locality_matrix[parent_id]['children'].append(dist_id)

    # 5. Synthetic districts for large settlements with no canon districts
    for loc_id, entry in list(locality_matrix.items()):
        st = entry.get('settlement_type_raw','')
        if st not in LARGE_SETTLEMENT_TYPES or entry['children']:
            continue
        for tmpl in SYNTH_TEMPLATES:
            d = make_synthetic(loc_id, entry['display_name_raw'], tmpl)
            d['parent_polity']  = entry['parent_polity']
            d['umbrella_polity'] = entry['umbrella_polity']
            d['macroregion_environment_profile'] = entry['macroregion_environment_profile']
            locality_matrix[d['locality_id']] = d
            entry['children'].append(d['locality_id'])

    # 6. Route matrix
    ROUTE_NARRATIVES = {
        frozenset(['shelkopolis','fairhaven']): 'The Verdant Road runs south from the city gates through farmland that turns to glyph-disturbed scrub near the Watchers Perch approach.',
        frozenset(['shelkopolis','panim_haven']): 'The Memorial Road is wide and processional, lined with stone markers for the dead that accumulate denser the closer you get to Panim Haven.',
        frozenset(['shelkopolis','shirshal']): 'The Compliance Corridor is an inspection-heavy road. Checkpoints appear without warning. Documents are examined with patience and purpose.',
        frozenset(['shelkopolis','plumes_end_outpost']): 'The Northern Post Road narrows into caravan lanes past the city wall, thinning further through cedar brush and open sky.',
        frozenset(['shelkopolis','cosmoria']): 'The coastal airship lane between Shelkopolis and Cosmoria passes over volcanic sea cliffs. From the deck, you can see where the glyph interference distorts the water surface.',
        frozenset(['fairhaven','sunspire_haven']): 'The Syndicate Trail is packed dirt through open fields. Every five miles a patron-family marker confirms whose territory the road crosses.',
        frozenset(['fairhaven','panim_haven']): 'This road is busy with grief. Travelers carry offerings and move with the particular silence of people who have recently lost someone.',
        frozenset(['fairhaven','mimolot_academy']): 'The Scholar Pilgrimage Path is unmarked and narrow. It is maintained entirely by students who know no other road to the Academy.',
        frozenset(['panim_haven','shirshal']): 'The coastal route between these two investigative cities is a short sail in fair weather. Both cities watch the water for different reasons.',
        frozenset(['sunspire_haven','harvest_circle']): 'The Quota Road sees constant grain cart traffic. The conversation on this road is always about weight, price, and weather.',
        frozenset(['sunspire_haven','soreheim_proper']): 'The Alliance Spine is a heavy freight road. Quotas are visible in the cargo markings. Nobody travels this road for pleasure.',
        frozenset(['sunspire_haven','fairhaven']): 'Rolling farm country with the occasional syndicate checkpoint where sealed papers are expected and verified without apology.',
        frozenset(['aurora_crown_commune','glasswake_commune']): 'The Dome Corridor is a pressurized maintenance path between two survival communes. Every third person traveling it is on a repair rotation.',
        frozenset(['aurora_crown_commune','whitebridge_commune']): 'A crossing road that gets iced in bad weather. Travelers check the bridge condition before committing to the route.',
        frozenset(['aurora_crown_commune','soreheim_proper']): 'The new northern highland path cuts through terrain the Alliance clans have used for generations. The footing is certain for those who follow the cairns.',
        frozenset(['soreheim_proper','harvest_circle']): 'The Forgemaster Road carries redistribution loads in both directions. The carts are heavy and the drivers tired.',
        frozenset(['soreheim_proper','ironhold_quarry']): 'An industrial access road with enforcement checkpoints. No unnecessary conversation is expected and none is offered.',
        frozenset(['shirshal','mimolot_academy']): 'The Inquiry Road connects two cities built on knowing things. Travelers on it tend to be either investigators or scholars. Sometimes both.',
        frozenset(['ithtananalor','shelkopolis']): 'The Enforcement Corridor is where Roazian law meets Shelk commercial culture and neither concedes ground. Travel is fast and documented.',
        frozenset(['ithtananalor','shirshal']): 'Two investigative regimes, two roads between them. The route is shorter than it looks on maps and more watched than it appears in person.',
        frozenset(['ithtananalor','ironhold_quarry']): 'A quarry access road that sees labor transports. The carts going out are empty. The carts coming back carry ore and something heavier.',
        frozenset(['ithtananalor','guildheart_hub']): 'The new trade road between Roaz enforcement culture and Union contract culture runs through a stretch of contested warehouse territory.',
        frozenset(['guildheart_hub','fairhaven']): 'The Union road south to Shelk country. Cargo tariff notices are posted at every waystation. Reading them tells you what is in dispute this season.',
        frozenset(['guildheart_hub','shirshal']): 'A legal-commercial corridor with a reputation for arbitration disputes happening on the road itself, before anyone reaches a court.',
        frozenset(['guildheart_hub','craftspire']): 'Industrial freight between two Union production centers. The carts are heavy and the tolls are current.',
        frozenset(['guildheart_hub','unity_square']): 'An internal Union commercial artery. The road is clean, maintained, and posted with market hours.',
        frozenset(['cosmoria','guildheart_hub']): 'The maritime approach to Guildheart Hub. Goods are offloaded at Cosmoria\'s harbor and arrive at Union territory with documentation already in order.',
        frozenset(['craftspire','unity_square']): 'A short internal Union connector. Cargo moves between these two districts faster than news does.',
        frozenset(['ironhold_quarry','soreheim_proper']): 'A loading road for raw materials. The weight of what passes through it is visible in the road surface.',
        frozenset(['glasswake_commune','sunspire_haven']): 'Research commune to farming commune. The travelers going one way carry instruments. The travelers going the other carry food.',
        frozenset(['whitebridge_commune','glasswake_commune']): 'The coldest crossing on any regular route in the region. Nobody lingers at the midpoint.',
        frozenset(['plumes_end_outpost','fairhaven']): 'The outpost connector is a patrol road. Shrine markers line it at half-mile intervals and are maintained with unusual care.',
    }
    route_matrix = []
    seen = set()
    for from_id, neighbors in ADJACENCY.items():
        for to_id in neighbors:
            ek = tuple(sorted([from_id, to_id]))
            if ek in seen: continue
            seen.add(ek)
            modes = ['foot','horse','cart']
            if from_id in PORT_LOCALITIES and to_id in PORT_LOCALITIES:
                modes.append('boat')
            # Coastal airship lane: shelkopolis <-> cosmoria (both have explicit docking)
            AIRSHIP_ROUTES = {frozenset(['shelkopolis','cosmoria'])}
            if frozenset([from_id, to_id]) in AIRSHIP_ROUTES:
                modes.append('airship')
            ttm = {'foot':2,'horse':1,'cart':3}
            if 'boat' in modes: ttm['boat'] = 1
            if 'airship' in modes: ttm['airship'] = 1
            dest_loc = KEY_LOCALITIES.get(to_id, {})
            rkey = frozenset([from_id, to_id])
            route = {
                'record_kind':'route',
                'route_id': f"{from_id}_to_{to_id}_01",
                'from_locality_id': from_id,'to_locality_id': to_id,
                'directionality':'bidirectional',
                'allowed_travel_modes': modes,
                'distance_units': 1,
                'travel_time_by_mode': ttm,
                'hazard_tags_keys': dest_loc.get('hazards',[]),
                'route_type_key':'road',
                'travel_narrative_raw': ROUTE_NARRATIVES.get(rkey, ''),
                'assignment_method':'adjacency_plus_travel_network',
                'assignment_confidence':'direct',
            }
            tn_data = travel_times.get((from_id,to_id)) or travel_times.get((to_id,from_id))
            if tn_data and tn_data.get('foot_days'):
                route['distance_miles_est'] = round(tn_data['foot_days'] * 24.0, 1)
            route_matrix.append(route)

    # 7. Nomdara overlay — expanded with drift rotation, core NPCs, and rumors
    nomdara = {
        'overlay_kind':'mobile_locality_packet',
        'overlay_name_raw':'Nomdara Caravan','overlay_name_key':'nomdara_caravan',
        'attached_locality_id':'shelkopolis',
        'attachment_method':'nearest_geographic_node','attachment_confidence':'direct',
        'drift_interval_time_units': 10,
        'rotation_schedule': [
            # High-population settlements (weight 3)
            {'locality_id':'shelkopolis',        'weight':3},
            {'locality_id':'guildheart_hub',      'weight':3},
            {'locality_id':'soreheim_proper',     'weight':3},
            {'locality_id':'cosmoria',            'weight':3},
            {'locality_id':'panim_haven',         'weight':2},
            # Mid-size settlements (weight 2)
            {'locality_id':'ithtananalor',        'weight':2},
            {'locality_id':'mimolot_academy',     'weight':2},
            {'locality_id':'harvest_circle',      'weight':2},
            {'locality_id':'unity_square',        'weight':2},
            {'locality_id':'craftspire',          'weight':2},
            # Wilderness / outpost nodes (weight 2 — rare opportunity feel)
            {'locality_id':'fairhaven',           'weight':2},
            {'locality_id':'plumes_end_outpost',  'weight':2},
            {'locality_id':'sunspire_haven',      'weight':1},
            {'locality_id':'shirshal',            'weight':1},
        ],
        'mobile_services':['rare item trade','esoteric skill training','wound and curse removal','information purchase'],
        'mobile_flavor_profile':'A traveling caravan of no fixed origin, present without announcement and gone without farewell. They have what settlements cannot offer and know more than they show.',
        'core_npcs': [
            {'id':'nomdara_sable','name':'Sable','role':'Caravan Matriarch','flavor':'She does not explain the route. She only confirms it was correct afterward.'},
            {'id':'nomdara_lorn', 'name':'Lorn', 'role':'Trade Arbiter',   'flavor':'Prices are not negotiable. Barter is. The distinction matters more than you think.'},
            {'id':'nomdara_wren', 'name':'Wren', 'role':'Route Shaman',    'flavor':'She reads ash deposits and road distances the same way — as things that tell you where you have already been.'},
        ],
        'plot_adjacent_rumors': [
            'Word reached the caravan that ash-scribe records in the northern districts have been quiet — too quiet for this time of cycle.',
            'A sealed courier passed through three days ago heading south. They paid double the toll and would not say their house.',
            'Someone has been asking the same questions you are asking. At three separate waypoints. With similar phrasing.',
            'The pressure clocks in Shelkopolis have been ticking faster than the public boards admit. The caravan tracks these things.',
            'A faction envoy declined a standard cargo contract last week — the first time in four years. The reason given was vague.',
        ],
        'world_color_rumors': [
            'The forge bells in Soreheim have been ringing off-schedule. Labor dispute, the official word says. The caravan believes otherwise.',
            'Dome inspection teams in Glasswake turned away a trade delegation last month with no explanation on record.',
            'Three roadwarden posts along the northern corridor have new personnel. Transfers are routine. Three at once is not.',
            'The sea-shrine traffic in Cosmoria is up. When merchants pray more, the caravan listens.',
            'A guild arbitration in Guildheart was sealed before the ruling was read. No sealed arbitration has been opened since.',
            'The night-lantern circuits in Craftspire were repaired ahead of schedule. Someone wanted visibility there.',
            'Pilgrim traffic through Mimolot Academy is down this season. Scholars who stay home are scholars who know something is wrong.',
        ],
        'temporary_route_effects':[],
        'locality_id':'nomdara_caravan','display_name_raw':'Nomdara Caravan',
        'display_name_key':'nomdara_caravan','locality_class':'operational_anchor',
        'name':'Nomdara Caravan',
        'identity':'Mobile caravan of traders with no fixed home.',
        'greetings':['approach with trade-intent clearly visible'],
        'rituals':['evening fire circle before major transactions'],
        'hazards':['caravan_rivalry','waylay'],'creatures':['road_predator'],
    }

    # 8. Narrative lookup
    narrative_lookup = {}
    for loc_id, entry in locality_matrix.items():
        if entry['locality_class'] == 'district':
            narrative_lookup[loc_id] = narrative_from_district(entry)
        else:
            narrative_lookup[loc_id] = narrative_from_loc(entry)

    # 9. Bestiary lookup
    bestiary_lookup = {}
    for loc_id, entry in locality_matrix.items():
        env_key = entry.get('macroregion_environment_profile',{}).get('primary_environment_label_key','')
        if entry['locality_class'] == 'district':
            parent_id = entry.get('parent_settlement_id','')
            parent = locality_matrix.get(parent_id,{})
            creatures = parent.get('creatures',[])
            enc_table = entry.get('_enc_table', ENCOUNTER_TABLES.get(parent_id,['patrol_guard']))
        else:
            creatures = entry.get('creatures',[])
            enc_table = ENCOUNTER_TABLES.get(loc_id,['patrol_guard','frontier_militia'])
        bestiary_lookup[loc_id] = {
            'creatures': creatures,
            'encounter_table': enc_table,
            'environment_key': env_key,
        }

    # 10. Validation
    for loc_id, entry in locality_matrix.items():
        if not entry.get('parent_polity',{}).get('normalized_key'):
            errors.append(f'HIERARCHY: {loc_id} missing parent_polity')
        if not entry.get('umbrella_polity',{}).get('normalized_key'):
            errors.append(f'HIERARCHY: {loc_id} missing umbrella_polity')
        if not entry.get('macroregion_environment_profile',{}).get('primary_environment_label_key'):
            errors.append(f'ENV: {loc_id} missing environment profile')
        if entry['locality_class'] == 'district' and not entry.get('parent_settlement_id'):
            errors.append(f'DISTRICT: {loc_id} missing parent_settlement_id')
    for r in route_matrix:
        if not r.get('allowed_travel_modes'):
            errors.append(f"ROUTE: {r['route_id']} no travel modes")

    # 11. Write output
    def write_js(fname, varname, data):
        # Strip internal-only keys before writing
        def clean(obj):
            if isinstance(obj, dict):
                return {k: clean(v) for k, v in obj.items() if not k.startswith('_')}
            if isinstance(obj, list):
                return [clean(i) for i in obj]
            return obj
        path = DIST_DIR / fname
        with open(path, 'w', encoding='utf-8') as f:
            f.write('// Auto-generated by build_locality_matrix.py — do not edit manually\n')
            f.write(f'window.{varname} = ')
            json.dump(clean(data), f, indent=2, ensure_ascii=False)
            f.write(';\n')
        print(f'  Wrote {fname} ({os.path.getsize(path):,} bytes)')

    write_js('locality_matrix.js',  'LOCALITY_MATRIX',  locality_matrix)
    write_js('route_matrix.js',     'ROUTE_MATRIX',     route_matrix)
    write_js('narrative_lookup.js', 'NARRATIVE_LOOKUP', narrative_lookup)
    write_js('bestiary_lookup.js',  'BESTIARY_LOOKUP',  bestiary_lookup)
    write_js('nomdara_overlay.js',  'NOMDARA_OVERLAY',  nomdara)

    # Validation report
    settlements = [v for v in locality_matrix.values() if v['locality_class'] != 'district']
    districts   = [v for v in locality_matrix.values() if v['locality_class'] == 'district']
    canon_d     = [v for v in districts if not v.get('is_synthetic')]
    synth_d     = [v for v in districts if v.get('is_synthetic')]
    report = {
        'status': 'PASS' if not errors else 'FAIL',
        'settlements': len(settlements),
        'districts_total': len(districts),
        'districts_canon': len(canon_d),
        'districts_synthetic': len(synth_d),
        'routes': len(route_matrix),
        'errors': errors,
        'warnings': warnings,
    }
    with open(DIST_DIR / 'validation_report.json', 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2)

    status = 'PASS' if not errors else f"FAIL ({len(errors)} errors)"
    print(f'\nLocality Matrix build: {status}')
    print(f'  {len(settlements)} settlements, {len(districts)} districts '
          f'({len(canon_d)} canon, {len(synth_d)} synthetic), {len(route_matrix)} routes')
    if errors:
        for e in errors[:10]: print(f'  ERROR: {e}')
    if warnings:
        for w in warnings[:5]: print(f'  WARN: {w}')

if __name__ == '__main__':
    main()
