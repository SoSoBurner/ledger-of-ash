import json, os

BASE = "C:/Users/CEO/ledger-of-ash/V33_1_extracted/V33_1_DnD_World_Repository"
TRP_DIR = os.path.join(BASE, "03_LOCALITY_ENGINE/text_rpg_packets")
LOC_PACKETS = os.path.join(BASE, "03_LOCALITY_ENGINE/locality_packets")
MAGIC_FILE = os.path.join(BASE, "02_CANON_BASELINE/magic/magic_practice_by_polity.json")

GAME_LOCS = ["panim_haven","sunspire_haven","aurora_crown_commune","shelkopolis",
             "harvest_circle","glasswake_commune","fairhaven","mimolot_academy",
             "soreheim_proper","shirshal","ithtananalor","guildheart_hub",
             "cosmoria","craftspire","unity_square","ironhold_quarry",
             "plumes_end_outpost","whitebridge_commune"]

FALLBACKS = {
    'harvest_circle': {
        'conflictSurfaces': ['quota versus hunger','family favor versus fair trade','festival mood versus spoilage pressure'],
        'senseOfPlace': 'Grain dust, festival smoke, animal labor, and fresh bread. Noise is communal, crowded, seasonal.',
        'dailyLife': 'Harvest, quota reporting, market trading, and festival preparation move in rounds tied to the growing cycle.',
        'suspiciousBehavior': ['undeclared loads at stalls','price manipulation before festival exchange'],
        'taboos': ['wasting grain publicly','undercutting family-controlled stalls without syndicate approval'],
        'firstContact': 'Threshing Shelter Keeper',
        'visibleFactions': ['Soreheim Alliance Agricultural Syndicate','Patron-Family Brokers'],
        'sceneStarters': ['quota dispute at market stalls','festival opening ceremony under pressure','spoilage incident affecting multiple families'],
    },
    'glasswake_commune': {
        'conflictSurfaces': ['research curiosity versus containment rules','shared risk versus personal exposure','secrecy versus communal transparency'],
        'senseOfPlace': 'Cold, ozone-heavy air. Glass and metal instruments, quarantine seals, quiet alert sounds. Spaces feel clinical and pressurized.',
        'dailyLife': 'Contamination measurement, research protocols, quarantine routines, instrument calibration, and cold-light study fill every shift.',
        'suspiciousBehavior': ['entering without scan clearance','unexplained sample transport','discussing results without authorization'],
        'taboos': ['treating breach protocols as optional','bringing uncleared materials into research zones'],
        'firstContact': 'Research Quarantine Nook Keeper',
        'visibleFactions': ['Sheresh Containment Research Concord','Sheresh Dome Stewards'],
        'sceneStarters': ['instrument failure mid-research','quarantine dispute at checkpoint','contamination reading that does not match the official record'],
    },
    'craftspire': {
        'conflictSurfaces': ['intellectual property versus open knowledge','production pressure versus craft quality','guild authority versus worker independence'],
        'senseOfPlace': 'Ink, sawdust, press oil, binding glue, workshop smoke, and the rhythmic sound of presses and cutting tools.',
        'dailyLife': 'Copying, binding, press operation, tariff filing, commission work, and quality inspection rotate through workshop shifts.',
        'suspiciousBehavior': ['unauthorized copying near restricted presses','materials without tariff marks','non-guild workers at licensed stations'],
        'taboos': ['bypassing book-tax records','reproducing commission work for personal profit'],
        'firstContact': 'Workshop Quarter Alcove Keeper',
        'visibleFactions': ['The Union','Union Copy-Right Enforcement','Guild Artisan Collective'],
        'sceneStarters': ['copy theft discovered mid-shift','tariff dispute blocking a commissioned order','sabotage at a major production run'],
    },
    'unity_square': {
        'conflictSurfaces': ['arbitration versus coercion','posted rates versus private deals','guild color legitimacy versus market chaos'],
        'senseOfPlace': 'Chalk dust, ink, rope, loud voices, freight movement, and the smell of cooked food from market edge vendors.',
        'dailyLife': 'Trade negotiation, inspection queue waiting, freight matching, rate checking, and sanction notice reading fill exchange hours.',
        'suspiciousBehavior': ['price manipulation at posted rates','stolen guild color seals','operating without affiliation in a clearly affiliated zone'],
        'taboos': ['bypassing inspection lines openly','disputing sanction notices without registered standing'],
        'firstContact': 'Exchange Quarter Holding Room Clerk',
        'visibleFactions': ['The Union','Union Trade Arbitration Guild','Union Sanction Board'],
        'sceneStarters': ['price shock disrupting a major cargo transfer','sanction dispute with witnesses','cargo theft with route closure implications'],
    },
    'ironhold_quarry': {
        'conflictSurfaces': ['labor discipline versus survival','resource access versus border authority','enforcement presence versus worker autonomy'],
        'senseOfPlace': 'Stone dust, iron smell, damp earth, torch smoke, the sound of drills and quarry signals. Authority is visible and physical.',
        'dailyLife': 'Extraction shifts, labor zone assignments, overseer rounds, resource tallying, and enforcement presence define every working day.',
        'suspiciousBehavior': ['unauthorized zone entry','unaccounted ore samples','contact with non-quarry personnel without clearance'],
        'taboos': ['defying labor zone instructions openly','theft of Roazian strategic resources'],
        'firstContact': 'Quarry Overseer Station Clerk',
        'visibleFactions': ['Office of Roazian Enforcement','Iron Accord','Quarry Labor Oversight'],
        'sceneStarters': ['labor zone incident with legal consequences','resource theft investigation','enforcement sweep disrupting normal extraction'],
    },
    'plumes_end_outpost': {
        'conflictSurfaces': ['route safety versus speed','shrine authority versus military command','caravan interest versus patrol control'],
        'senseOfPlace': 'Road dust, horse sweat, shrine incense, cook fire smoke. A critical stopping point. Sounds are patrol orders and caravan signals.',
        'dailyLife': 'Route reporting, caravan staging, shrine observance, hazard reading, and patrol rotation hold the outpost rhythm.',
        'suspiciousBehavior': ['moving without route declaration','ignoring shrine protocol before northward departure','evading patrol inspection'],
        'taboos': ['skipping shrine rite before hazardous northern passage','bypassing outpost gate without route statement'],
        'firstContact': 'Caravan Rest Post Keeper',
        'visibleFactions': ['Roadwardens Order','House Shelk Patrol Authority'],
        'sceneStarters': ['hazard report from northward route','caravan disruption at the outpost gate','celestial enforcer sighting requiring shrine response'],
    },
    'whitebridge_commune': {
        'conflictSurfaces': ['emergency sharing versus private supply','crossing authority versus urgency','winter survival versus route schedule'],
        'senseOfPlace': 'Cold, wind-cut, ice smell, woodsmoke, and the sound of crossing signals and bridge monitoring. Survival urgency underlies everything.',
        'dailyLife': 'Bridge maintenance, crossing registration, emergency shelter rotation, hazard monitoring, and route arbitration define communal time.',
        'suspiciousBehavior': ['concealing hazard knowledge at crossing registration','unauthorized bridge use in dangerous conditions','hoarding emergency supplies during shared crisis'],
        'taboos': ['concealing hazard information before crossing','refusing communal sharing during declared emergency'],
        'firstContact': 'Crossing Shelter Hall Keeper',
        'visibleFactions': ['Sheresh Route Warden Compacts','Sheresh Dome Stewards'],
        'sceneStarters': ['bridge icing incident blocking inter-dome traffic','refugee surge at the crossing shelter','missing expedition triggering communal search'],
    },
}

enrichment = {}
for lid in GAME_LOCS:
    e = {}
    lp_f = os.path.join(LOC_PACKETS, f"{lid}.json")
    if os.path.exists(lp_f):
        with open(lp_f, encoding='utf-8') as f:
            lp = json.load(f)
        e['pressures_v2'] = lp.get('pressure', [])
    else:
        e['pressures_v2'] = []

    trp_f = os.path.join(TRP_DIR, f"{lid}_text_rpg.json")
    if os.path.exists(trp_f):
        with open(trp_f, encoding='utf-8') as f:
            trp = json.load(f)
        sns = trp.get('social_norm_surface', {})
        ol = trp.get('ordinary_life_surface', {})
        hooks = trp.get('text_rpg_ready_locality_hooks', {})
        cs = trp.get('conflict_surfaces', [])
        rp = trp.get('rumor_pool', {})
        fp = trp.get('street_level_faction_presence', {})
        fabric = trp.get('ordinary_npc_fabric', [])
        e['conflictSurfaces'] = cs if isinstance(cs, list) else []
        e['senseOfPlace'] = ol.get('what_places_feel_like', '')
        e['dailyLife'] = ol.get('what_people_do_all_day', '')
        e['suspiciousBehavior'] = sns.get('suspicious_behavior', [])
        e['taboos'] = sns.get('taboo_topics', [])
        e['firstContact'] = hooks.get('who_you_talk_to_first', '')
        e['visibleFactions'] = fp.get('visible_factions', [])
        e['sceneStarters'] = trp.get('scene_starter_inventory', [])[:5]
        if isinstance(rp, dict):
            e['rumors'] = (rp.get('public_rumors', []) + rp.get('half_true_rumors', []))[:3]
        else:
            e['rumors'] = []
        e['npcVenues'] = {n.get('ref',''): n.get('display_name','') for n in fabric if isinstance(n, dict)}
    else:
        fb = FALLBACKS.get(lid, {})
        e.update(fb)
        e.setdefault('rumors', [])
        e.setdefault('npcVenues', {})

    enrichment[lid] = e

with open(MAGIC_FILE, encoding='utf-8') as f:
    magic_raw = json.load(f)

polity_to_loc = {
    'Shelk': ['shelkopolis','fairhaven','plumes_end_outpost'],
    'Roaz': ['ithtananalor','ironhold_quarry'],
    'Mimolot': ['mimolot_academy'],
    'Panim': ['panim_haven'],
    'Sheresh Communes': ['aurora_crown_commune','glasswake_commune','whitebridge_commune'],
    'Soreheim Alliance': ['soreheim_proper','sunspire_haven','harvest_circle'],
    'Nomdara Caravan': [],
}

magic_entries = []
for p in magic_raw.get('polities', []):
    identity = p.get('identity','')
    if not identity:
        continue
    magic_entries.append({
        'polity': p.get('polity',''),
        'identity': identity,
        'expressions': p.get('expressions',[])[:3],
        'socialReading': p.get('social_reading',''),
        'localities': polity_to_loc.get(p.get('polity',''), [])
    })

out = []
out.append("  const MAGIC_SYSTEM = [")
for e in magic_entries:
    out.append(f"    {{polity:{json.dumps(e['polity'])},identity:{json.dumps(e['identity'])},expressions:{json.dumps(e['expressions'])},socialReading:{json.dumps(e['socialReading'])},localities:{json.dumps(e['localities'])}}},")
out.append("  ];")
out.append("")
out.append("  const LOCALITY_RUMORS = {")
for lid in GAME_LOCS:
    rumors = enrichment[lid].get('rumors', [])
    out.append(f"    {lid}:{json.dumps(rumors, ensure_ascii=False)},")
out.append("  };")
out.append("")
out.append("  const LOCALITY_HOOKS = {")
for lid in GAME_LOCS:
    e = enrichment[lid]
    obj = {
        'conflictSurfaces': e.get('conflictSurfaces', []),
        'senseOfPlace': e.get('senseOfPlace', ''),
        'dailyLife': e.get('dailyLife', ''),
        'suspiciousBehavior': e.get('suspiciousBehavior', []),
        'taboos': e.get('taboos', []),
        'firstContact': e.get('firstContact', ''),
        'visibleFactions': e.get('visibleFactions', []),
        'sceneStarters': e.get('sceneStarters', []),
    }
    out.append(f"    {lid}:{json.dumps(obj, ensure_ascii=False)},")
out.append("  };")

result = "\n".join(out)
with open('C:/Users/CEO/ledger-of-ash/V33_1_new_constants.js', 'w', encoding='utf-8') as f:
    f.write(result)
print("Done. Length:", len(result))

print("\n--- Updated pressures ---")
for lid in GAME_LOCS:
    pv2 = enrichment[lid].get('pressures_v2', [])
    if pv2:
        print(f"{lid}: {pv2}")
