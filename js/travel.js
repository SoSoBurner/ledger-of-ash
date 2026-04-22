// Travel System — route_matrix-driven travel with district sub-navigation and Nomdara overlay

(function(){

  function _esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  const COSMIC_LOCALITIES = [
    {id:'fire_ascent', name:'Fire Ascent', polity:'Elemental Dominion of Ash', safeZone:'Ember Threshold Sanctuary', economicRole:'Elemental forge-site', lawFeel:'Raw elemental authority'},
    {id:'umbral_shore', name:'Umbral Shore', polity:'Court of Umbra', safeZone:'Shadow Tide Refuge', economicRole:'Umbral trade nexus', lawFeel:'Shadow court law'},
    {id:'mother_storm_threshold', name:"Mother Storm Threshold", polity:'Stormborn Collective', safeZone:"Eye of the Storm Waystation", economicRole:'Storm-channeling platform', lawFeel:'Collective consensus'},
    {id:'ashgate_crossing', name:'Ashgate Crossing', polity:'Ashgate Transit Authority', safeZone:'Crossing Waystation', economicRole:'Dimensional transit hub', lawFeel:'Transit code enforcement'},
    {id:'limbo_edge', name:"Limbo's Edge", polity:'The Unanchored', safeZone:'Anchor Point Station', economicRole:'Salvage and drift trade', lawFeel:'No fixed law — personal compact'},
    {id:'astral_divide', name:'Astral Divide', polity:'Astral Navigation Guild', safeZone:'Divide Waystation', economicRole:'Navigational services', lawFeel:'Guild charter law'},
    {id:'stellar_remnant', name:'Stellar Remnant', polity:'Order of the Remnant', safeZone:'Remnant Keep', economicRole:'Relic recovery and study', lawFeel:'Order of the Remnant doctrine'}
  ];

  const COSMIC_IDS = COSMIC_LOCALITIES.map(l=>l.id);

  const COSMIC_ADJACENCY = {
    fire_ascent:      ['umbral_shore','mother_storm_threshold','ashgate_crossing'],
    umbral_shore:     ['fire_ascent','limbo_edge'],
    mother_storm_threshold: ['fire_ascent','astral_divide'],
    ashgate_crossing: ['fire_ascent','stellar_remnant'],
    limbo_edge:       ['umbral_shore','astral_divide'],
    astral_divide:    ['mother_storm_threshold','limbo_edge','stellar_remnant'],
    stellar_remnant:  ['ashgate_crossing','astral_divide']
  };

  window.PRINCIPALITIES_ROUTE = [
    { id:'crossing_the_brinelands', name:'The Brinelands Crossing',
      narration:'The Brinelands stretch flat and salt-white under a pale sky. Caravans move in loose clusters here, wary of the open ground. The far shore is a brown smear against the horizon — the Principality of Shelk beginning its slow rise. A merchant argues with her cart driver about weight limits. Nobody agrees on anything out here except the direction of travel.',
      encounterChance:0.25, enemyPool:['brinelands_bandit','desperate_traveler'] },
    { id:'shelk_border_approach', name:'Shelk Border Road',
      narration:'The road narrows and the stone changes character — quarried, deliberate, laid by a civilization that planned ahead. Iron Accord checkpoints appear at intervals: a gatepost, a ledger, a bored clerk with a stamp. The smell of the city reaches you before it comes into view. Something burning. Something cooking. Something old.',
      encounterChance:0.15, enemyPool:['toll_collector','patrol_guard'] },
    { id:'shelkopolis_gates', name:'The Gates of Shelkopolis',
      narration:'The city announces itself with noise before architecture: vendors, quarrels, the creak of loaded carts on ancient paving stones. The gates are iron and old, half-decorative now, flanked by city wardens who watch without urgency. A letter of introduction helps. A convincing face helps more. You step through.',
      encounterChance:0, destination:'shelkopolis' }
  ];

  const PORT_LOCALITIES = ['cosmoria','panim_haven','guildheart_hub','plumes_end_outpost'];
  const AIRSHIP_LOCALITIES = {cosmoria:3, guildheart_hub:4};

  const STABLE_LOCALITIES = [
    'shelkopolis','soreheim_proper','guildheart_hub','fairhaven',
    'panim_haven','mimolot_academy','sunspire_haven','harvest_circle',
    'shirshal','ithtananalor'
  ];

  const HORSE_COSTS = {
    shelkopolis:18, soreheim_proper:20, guildheart_hub:22,
    fairhaven:16, panim_haven:15, mimolot_academy:25,
    sunspire_haven:17, harvest_circle:15, shirshal:16, ithtananalor:20
  };

  // ── Helpers ────────────────────────────────────────────────────────────────

  function getLM(){ return window.LOCALITY_MATRIX || null; }
  function getRM(){ return window.ROUTE_MATRIX || null; }

  // Return the effective settlement ID (handles districts → parent)
  function getSettlementId(locId){
    const lm = getLM();
    if(!lm) return locId;
    const entry = lm[locId];
    if(entry && entry.locality_class === 'district') return entry.parent_settlement_id || locId;
    return locId;
  }

  // Return district children of a settlement
  function getLocalDistricts(locId){
    const lm = getLM();
    if(!lm) return [];
    const entry = lm[locId];
    if(!entry || !entry.children || !entry.children.length) return [];
    return entry.children.map(id => lm[id]).filter(Boolean);
  }

  // Find route edge in ROUTE_MATRIX between two settlement IDs
  function findRoute(fromId, toId){
    const rm = getRM();
    if(!rm) return null;
    return rm.find(r =>
      (r.from_locality_id === fromId && r.to_locality_id === toId) ||
      (r.directionality === 'bidirectional' && r.from_locality_id === toId && r.to_locality_id === fromId)
    ) || null;
  }

  // BFS over ADJACENCY (fallback when ROUTE_MATRIX unavailable or for cosmic)
  function computeDistances(fromId, stage){
    const adj = Object.assign({}, window.ADJACENCY||{});
    if(stage>=5){
      adj['shelkopolis'] = [...(adj['shelkopolis']||[]), 'ashgate_crossing'];
      Object.assign(adj, COSMIC_ADJACENCY);
    }
    const dist = {[fromId]:0};
    const queue = [fromId];
    while(queue.length){
      const cur = queue.shift();
      for(const n of (adj[cur]||[])){
        if(dist[n]===undefined){ dist[n]=dist[cur]+1; queue.push(n); }
      }
    }
    return dist;
  }

  function distanceLabel(d){
    if(d===1) return 'Adjacent';
    if(d===2) return 'Near';
    if(d<=4)  return 'Far';
    return 'Very Far';
  }

  // ── Destinations ───────────────────────────────────────────────────────────

  const ADJACENT_POLITIES = {
    'principality_of_shelk': ['principality_of_cosmoria', 'principality_of_fairhaven'],
    'principality_of_cosmoria': ['principality_of_shelk', 'soreheim_western_reaches'],
    'principality_of_fairhaven': ['principality_of_shelk', 'sheresh_northern_communes'],
    'soreheim_western_reaches': ['principality_of_cosmoria', 'soreheim_central_range'],
    'soreheim_central_range': ['soreheim_western_reaches', 'soreheim_eastern_reaches'],
    'soreheim_eastern_reaches': ['soreheim_central_range'],
    'sheresh_northern_communes': ['principality_of_fairhaven', 'sheresh_coastal_communes'],
    'sheresh_coastal_communes': ['sheresh_northern_communes']
  };

  function _stageNum(G) {
    if (!G || !G.stage) return 1;
    if (typeof G.stage === 'number') return G.stage;
    var m = String(G.stage).match(/(\d+)/);
    return m ? parseInt(m[1], 10) : 1;
  }

  function _canTravelByPolity(destId, G) {
    var stageN = _stageNum(G);
    if (stageN >= 3) return true;
    var lm = getLM() || {};
    var dest = lm[destId];
    if (!dest) return false;
    var startId = G.startingLocality || G.location || 'shelkopolis';
    var start = lm[startId];
    if (!start) return false;
    var destParent = dest.parent_polity && dest.parent_polity.normalized_key;
    var startParent = start.parent_polity && start.parent_polity.normalized_key;
    var destUmbrella = dest.umbrella_polity && dest.umbrella_polity.normalized_key;
    // Stage I: same parent polity only
    if (stageN === 1) return destParent === startParent;
    // Stage II: same parent, adjacent, or Principalities route unlocked
    if (stageN === 2) {
      if (destParent === startParent) return true;
      var adj = ADJACENT_POLITIES[startParent] || [];
      if (adj.indexOf(destParent) !== -1) return true;
      if (G.flags && G.flags.principalities_route_unlocked && destUmbrella === 'the_principalities') return true;
      return false;
    }
    return true;
  }

  function getAvailableDestinations(G){
    const stageN = _stageNum(G);
    const stage = stageN;
    // If in a district, travel departs from parent settlement
    const travelFrom = getSettlementId(G.location);
    const rm = getRM();

    let destinations = [];

    if(rm){
      // Route-matrix driven
      const edges = rm.filter(r =>
        r.from_locality_id === travelFrom ||
        (r.directionality === 'bidirectional' && r.to_locality_id === travelFrom)
      );
      const lm = getLM() || {};
      const kl = window.KEY_LOCALITIES || {};
      const seen = new Set();
      for(const r of edges){
        const toId = r.from_locality_id === travelFrom ? r.to_locality_id : r.from_locality_id;
        if(seen.has(toId)) continue;
        seen.add(toId);
        const locData = lm[toId] || kl[toId] || {id:toId, name:toId};
        destinations.push({
          ...locData,
          id: toId,
          distance: r.distance_units || 1,
          _route: r,
        });
      }
      // Add cosmic at stage 5
      if(stage>=5){
        const cosmicDist = computeDistances('ashgate_crossing', stage);
        COSMIC_LOCALITIES.forEach(loc=>{
          if(!seen.has(loc.id)){
            destinations.push({...loc, distance: (cosmicDist[loc.id]||1)+1, _route: null});
          }
        });
      }
    } else {
      // BFS fallback
      const dist = computeDistances(travelFrom, stage);
      const mortalLocs = Object.values(window.KEY_LOCALITIES||{});
      const all = stage>=5 ? [...mortalLocs, ...COSMIC_LOCALITIES] : mortalLocs;
      destinations = all
        .filter(loc => loc.id !== travelFrom)
        .map(loc => ({...loc, distance: dist[loc.id]!==undefined ? dist[loc.id] : 999, _route:null}))
        .filter(loc => loc.distance !== 999);
    }

    // Stage gate filtering (polity-hierarchy based)
    destinations = destinations.filter(loc => _canTravelByPolity(loc.id, G));

    // Exclude current location (important when coming from district)
    destinations = destinations.filter(loc => loc.id !== G.location && loc.id !== travelFrom);

    return destinations.sort((a,b)=>a.distance-b.distance||(a.name<b.name?-1:1));
  }

  // ── Travel modes ───────────────────────────────────────────────────────────

  function getTravelModes(loc, G){
    const isCosmic = COSMIC_IDS.includes(loc.id);
    const modes = [];

    if(isCosmic){
      modes.push({id:'cosmic_passage', label:'Cosmic Passage', timeCost:1, goldCost:15,
        desc:'Dimensional transit through the Ashgate rift.'});
      if(G.horse){
        modes.push({id:'cosmic_mounted', label:'Mounted Rift Transit', timeCost:1, goldCost:8,
          desc:'Your horse navigates the dimensional threshold with you.'});
      }
      return modes;
    }

    const route = loc._route;
    const d = loc.distance || 1;

    // Foot
    const footTime = route ? (route.travel_time_by_mode.foot || (d*2)) : (d===1?2:d===2?3:4);
    modes.push({id:'foot', label:'On Foot', timeCost:footTime, goldCost:0,
      desc:`${footTime} time units. No cost.`});

    // Hired passage (always available, costs gold, faster than foot)
    const hireGold = d===1 ? 2 : d===2 ? 3 : 5;
    const hireTime = d<=2 ? 1 : 2;
    modes.push({id:'hired', label:'Hired Passage', timeCost:hireTime, goldCost:hireGold,
      desc:`${hireGold} gold \u00b7 ${hireTime} time unit${hireTime>1?'s':''}.`});

    // Horse
    if(G.horse){
      const horseTime = route ? (route.travel_time_by_mode.horse || (d<=3?1:2)) : (d<=3?1:2);
      modes.push({id:'horse', label:'Ride (Your Horse)', timeCost:horseTime, goldCost:0,
        desc:`${horseTime} time unit${horseTime>1?'s':''}. Fastest land option.`});
    }

    // Boat — only on explicit route edges that include boat, or port-to-port
    const travelFrom = getSettlementId(G.location);
    const hasBoatRoute = route
      ? route.allowed_travel_modes.includes('boat')
      : (PORT_LOCALITIES.includes(travelFrom) && PORT_LOCALITIES.includes(loc.id));
    if(hasBoatRoute){
      const boatTime = route ? (route.travel_time_by_mode.boat || 1) : (d<=2?1:2);
      const boatGold = d===1?3:d===2?5:d<=4?8:12;
      modes.push({id:'boat', label:'Sea Passage', timeCost:boatTime, goldCost:boatGold,
        desc:`${boatGold} gold \u00b7 ${boatTime} time unit${boatTime>1?'s':''}. Faster on port routes.`});
    }

    // Airship — explicit infrastructure, stage-gated
    const airshipStageMin = AIRSHIP_LOCALITIES[travelFrom];
    if(airshipStageMin !== undefined && _stageNum(G) >= airshipStageMin){
      const airGold = 25 + Math.floor(d*2);
      modes.push({id:'airship', label:'Airship Passage', timeCost:1, goldCost:airGold,
        desc:`${airGold} gold \u00b7 1 time unit. Magical airship.`});
    }

    return modes;
  }

  function travelEncounterChance(stage){
    return [0, 0.15, 0.25, 0.35, 0.40, 0.30][stage]||0.20;
  }

  // ── Execute travel ─────────────────────────────────────────────────────────

  function executeTravelTo(destId, modeId){
    const G = window._travelEngineG;
    if(!G) return;

    const dest = getAvailableDestinations(G).find(d=>d.id===destId);
    if(!dest){ window._travelAddNotice && window._travelAddNotice('Destination not found.'); return; }

    const modes = getTravelModes(dest, G);
    const mode = modes.find(m=>m.id===modeId);
    if(!mode){ window._travelAddNotice && window._travelAddNotice('Travel mode not found.'); return; }

    if(mode.goldCost > G.gold){
      window._travelAddNotice && window._travelAddNotice(
        `Not enough gold. ${mode.label} costs ${mode.goldCost} gold; you have ${G.gold}.`);
      window._travelRender && window._travelRender();
      return;
    }

    G.gold -= mode.goldCost;
    G.travelMode = false;

    if(window._travelAdvanceTime){
      for(let i=0; i<mode.timeCost; i++) window._travelAdvanceTime(1);
    }

    const chance = travelEncounterChance(_stageNum(G));
    if(Math.random() < chance){
      window._travelAddNotice && window._travelAddNotice(`Trouble on the road to ${dest.name}.`);
      window._travelStartEncounter && window._travelStartEncounter('road');
    }

    if(window._travelCoreTravelTo) window._travelCoreTravelTo(destId);

    // Fog of war: mark visited
    const G2 = window._travelEngineG;
    if(G2){
      G2.discoveredLocalities = G2.discoveredLocalities || {};
      G2.discoveredLocalities[destId] = 'visited';
      // First-visit narration
      const narr = (window.LOCALITY_NARRATIONS || {})[destId];
      if(narr){
        if(typeof updateEnvDesc === 'function') updateEnvDesc(narr);
        if(!G2.flags['visited_' + destId]){
          G2.flags['visited_' + destId] = true;
          if(typeof addNarration === 'function') addNarration('Arriving', narr);
        }
      }
    }

    window._travelRender && window._travelRender();
  }

  function executeEnterDistrict(distId){
    const G = window._travelEngineG;
    if(!G) return;
    G.travelMode = false;
    if(window._travelAdvanceTime) window._travelAdvanceTime(1);
    if(window._travelCoreTravelTo) window._travelCoreTravelTo(distId);

    // Fog of war: mark district as visited
    if(G && G.discoveredLocalities !== undefined) {
      G.discoveredLocalities[distId] = 'visited';
    }

    // First-visit narration for districts
    const narr = (window.LOCALITY_NARRATIONS || {})[distId];
    if(narr){
      if(typeof updateEnvDesc === 'function') updateEnvDesc(narr);
      if(!G.flags['visited_' + distId]){
        G.flags['visited_' + distId] = true;
        if(typeof addNarration === 'function') addNarration('Arriving', narr);
      }
    }

    window._travelRender && window._travelRender();
  }

  function executeReturnToSettlement(){
    const G = window._travelEngineG;
    if(!G) return;
    const parentId = getSettlementId(G.location);
    if(!parentId || parentId === G.location) return;
    G.travelMode = false;
    if(window._travelAdvanceTime) window._travelAdvanceTime(1);
    if(window._travelCoreTravelTo) window._travelCoreTravelTo(parentId);
    window._travelRender && window._travelRender();
  }

  function executeEnterNomdara(){
    const G = window._travelEngineG;
    if(!G) return;
    G.travelMode = false;
    if(window._travelAdvanceTime) window._travelAdvanceTime(1);
    if(window._travelCoreTravelTo) window._travelCoreTravelTo('nomdara_caravan');
    G.nomdara_visited = true;
    window._travelRender && window._travelRender();
  }

  function executeBuyHorse(){
    const G = window._travelEngineG;
    if(!G) return;
    const stableLoc = getSettlementId(G.location);
    if(!STABLE_LOCALITIES.includes(stableLoc)){
      window._travelAddNotice && window._travelAddNotice('No stable at this location.');
      window._travelRender && window._travelRender();
      return;
    }
    const cost = HORSE_COSTS[stableLoc]||20;
    if(G.gold < cost){
      window._travelAddNotice && window._travelAddNotice(`Need ${cost} gold for a horse. You have ${G.gold}.`);
      window._travelRender && window._travelRender();
      return;
    }
    G.gold -= cost;
    G.horse = {name:'Trail Horse', locality:stableLoc, purchaseDay:G.dayCount};
    const locName = (window.KEY_LOCALITIES||{})[stableLoc]?.name || stableLoc;
    window._travelAddNotice && window._travelAddNotice(
      `Horse purchased for ${cost} gold at ${locName}. Ride at any time.`);
    window._travelRender && window._travelRender();
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  function renderTravelUI(G){
    // Target action-content panel (new split layout), fallback to legacy choices div
    const el = document.getElementById('action-content') ||
               document.getElementById('choices') ||
               document.getElementById('narrative-content');
    if(!el) return;

    const lm = getLM() || {};
    const kl = window.KEY_LOCALITIES || {};
    const locEntry = lm[G.location] || kl[G.location] || {};
    const isDistrict = locEntry.locality_class === 'district';
    const settlementId = getSettlementId(G.location);
    const stableLoc = settlementId;
    const stableHere = STABLE_LOCALITIES.includes(stableLoc);
    const horseCost = HORSE_COSTS[stableLoc]||20;

    let html = `<div class='travelPanel'>`;
    html += `<div class='travelHeader'><span class='travelTitle'>Travel Routes</span>`;
    html += `<button class='travelClose' onclick='window._closeTravelUI()'>Close</button></div>`;

    // ── District breadcrumb ──────────────────────────────────────────────────
    if(isDistrict){
      const parentName = (lm[settlementId] || kl[settlementId] || {}).name || settlementId;
      html += `<div class='travelDistrictBar'>`;
      html += `<span class='travelDistrictParent'>${_esc(parentName)}</span>`;
      html += ` <span class='travelDistrictSep'>\u203a</span> `;
      html += `<span class='travelDistrictCurrent'>${_esc(locEntry.display_name_raw || locEntry.name || G.location)}</span>`;
      html += `<button class='travelReturnBtn' onclick='window._returnToSettlement()'>Return to ${_esc(parentName)}</button>`;
      html += `</div>`;
    }

    // ── Horse section ────────────────────────────────────────────────────────
    if(!G.horse){
      if(stableHere){
        const canBuy = G.gold >= horseCost;
        html += `<div class='travelHorseCard'>`;
        html += `<div class='travelHorseLabel'>Stable available here</div>`;
        html += `<div class='travelHorseDesc'>A horse cuts travel time to 1 unit for most journeys.</div>`;
        html += `<button class='travelBuyBtn${canBuy?'':' travelDisabled'}' onclick='window._buyHorse()'>`;
        html += `Buy Trail Horse \u2014 ${horseCost} gold (you have ${G.gold})</button>`;
        html += `</div>`;
      }
    } else {
      const acquiredName = (lm[G.horse.locality] || kl[G.horse.locality] || {}).name || G.horse.locality || 'unknown';
      html += `<div class='travelHorseCard travelHorseOwned'>`;
      html += `<b>${G.horse.name}</b> \u2014 Ready to ride. Acquired at ${acquiredName}.`;
      html += `</div>`;
    }

    // ── Nomdara overlay ──────────────────────────────────────────────────────
    const nomdara = window.NOMDARA_OVERLAY;
    if(nomdara){
      const nomAttached = nomdara.attached_locality_id;
      const showNomdara = nomAttached === settlementId ||
        (window.ADJACENCY && (window.ADJACENCY[settlementId]||[]).includes(nomAttached));
      if(showNomdara && !isDistrict){
        const nearText = nomAttached === settlementId ? 'camped here' : 'camped nearby';
        html += `<div class='travelNomdaraCard'>`;
        html += `<div class='travelNomdaraLabel'>Nomdara Caravan \u2014 <span class='travelNomdaraNear'>${nearText}</span></div>`;
        html += `<div class='travelNomdaraDesc'>${nomdara.mobile_flavor_profile}</div>`;
        html += `<button class='travelModeBtn' onclick='window._enterNomdara()'>`;
        html += `<span class='travelModeName'>Visit Caravan</span>`;
        html += `<span class='travelModeCost'>Free \u00b7 1 time</span></button>`;
        html += `</div>`;
      }
    }

    // ── Local districts ──────────────────────────────────────────────────────
    if(!isDistrict){
      const localDists = getLocalDistricts(G.location);
      if(localDists.length){
        html += `<div class='travelGroupHeader'>Districts</div>`;
        for(const dist of localDists){
          html += `<div class='travelDestCard travelDistrictCard'>`;
          html += `<div class='travelDestName'>${_esc(dist.display_name_raw || dist.name)}`;
          html += ` <span class='travelDistrictTag'>${dist.is_synthetic?'district':'district'}</span></div>`;
          if(dist.identity) html += `<div class='travelDestPolity' style='font-style:italic'>${_esc(dist.identity)}</div>`;
          html += `<div class='travelModeBtns'>`;
          html += `<button class='travelModeBtn' onclick='window._enterDistrict("${_esc(dist.locality_id)}")'>`;
          html += `<span class='travelModeName'>Enter District</span>`;
          html += `<span class='travelModeCost'>Free \u00b7 1 time</span></button>`;
          html += `</div></div>`;
        }
      }
    } else {
      // In a district: show sibling districts
      const parentEntry = lm[settlementId] || {};
      const siblings = (parentEntry.children||[])
        .filter(id => id !== G.location)
        .map(id => lm[id]).filter(Boolean);
      if(siblings.length){
        html += `<div class='travelGroupHeader'>Other Districts</div>`;
        for(const sib of siblings){
          html += `<div class='travelDestCard travelDistrictCard'>`;
          html += `<div class='travelDestName'>${_esc(sib.display_name_raw || sib.name)}</div>`;
          if(sib.identity) html += `<div class='travelDestPolity' style='font-style:italic'>${_esc(sib.identity)}</div>`;
          html += `<div class='travelModeBtns'>`;
          html += `<button class='travelModeBtn' onclick='window._enterDistrict("${_esc(sib.locality_id)}")'>`;
          html += `<span class='travelModeName'>Enter District</span>`;
          html += `<span class='travelModeCost'>Free \u00b7 1 time</span></button>`;
          html += `</div></div>`;
        }
      }
    }

    // ── Long-distance destinations ───────────────────────────────────────────
    // Only from settlements (not while in a district)
    if(!isDistrict){
      // Principalities route button (Stage II, non-Principalities player, route unlocked)
      if(G.flags && G.flags.principalities_route_unlocked && !G.flags.principalities_route_complete){
        const lmEntry = lm[G.startingLocality || G.location] || {};
        const startPolity = lmEntry.parent_polity && lmEntry.parent_polity.normalized_key;
        if(startPolity && startPolity !== 'principality_of_shelk'){
          html += `<div class='travelGroupHeader'>The Long Road</div>`;
          html += `<div class='travelDestCard' style='border-color:var(--gold,#c9a227)'>`;
          html += `<div class='travelDestName'>Journey to the Principalities</div>`;
          html += `<div class='travelDestPolity' style='font-style:italic'>A three-day road. Encounters possible.</div>`;
          html += `<div class='travelModeBtns'><button class='travelModeBtn' onclick='window.startPrincipalitiesRoute()'>`;
          html += `<span class='travelModeName'>Begin the Journey</span>`;
          html += `<span class='travelModeCost'>Free \u00b7 3 days</span></button></div></div>`;
        }
      }
      const dest = getAvailableDestinations(G);
      html += `<div class='travelDestList'>`;
      if(dest.length===0){
        html += `<div class='travelEmpty'>No destinations available at Stage ${G.stage}.</div>`;
      } else {
        const groups = {};
        dest.forEach(d=>{ const k=distanceLabel(d.distance); (groups[k]=groups[k]||[]).push(d); });
        for(const gk of ['Adjacent','Near','Far','Very Far']){
          if(!groups[gk]) continue;
          html += `<div class='travelGroupHeader'>${gk}</div>`;
          for(const loc of groups[gk]){
            const modes = getTravelModes(loc, G);
            const disc = (G.discoveredLocalities || {})[loc.id];
            const dispName = !disc ? '[Unknown]' : (disc === 'rumor' ? _esc(loc.name) + ' <span class="travelRumorTag">heard of</span>' : _esc(loc.name));
            html += `<div class='travelDestCard${!disc ? ' travelDestUnknown' : ''}'>`;
            html += `<div class='travelDestName'>${dispName}`;
            if(COSMIC_IDS.includes(loc.id)) html += ` <span class='travelCosmicTag'>Cosmic</span>`;
            html += `</div>`;
            const polityRaw = loc.parent_polity?.raw_value || loc.polity || '';
            if(polityRaw) html += `<div class='travelDestPolity'>${_esc(polityRaw)}</div>`;
            html += `<div class='travelModeBtns'>`;
            for(const mode of modes){
              const canAfford = G.gold >= mode.goldCost;
              html += `<button class='travelModeBtn${canAfford?'':' travelDisabled'}' `;
              html += `onclick='window._travelTo("${_esc(loc.id)}","${_esc(mode.id)}")'>`;
              html += `<span class='travelModeName'>${mode.label}</span>`;
              html += `<span class='travelModeCost'>${mode.goldCost>0?mode.goldCost+' gold \u00b7 ':'Free \u00b7 '}${mode.timeCost} time</span>`;
              html += `</button>`;
            }
            html += `</div></div>`;
          }
        }
      }
      html += `</div>`;
    }

    html += `</div>`;
    el.innerHTML = html;
  }

  // ── Principalities leg-by-leg route ────────────────────────────────────────

  function startPrincipalitiesRoute(){
    const G = window._travelEngineG || window.G;
    if(!G || !G.flags || !G.flags.principalities_route_unlocked) return;
    if(G.flags.principalities_route_in_progress) return;
    G.flags.principalities_route_in_progress = true;
    if(G.flags.principalities_route_complete){ executeTravelTo('shelkopolis','foot'); return; }
    G._routeProgress = G._routeProgress || 0;
    advancePrincipalitiesLeg();
  }

  function advancePrincipalitiesLeg(){
    const G = window._travelEngineG || window.G;
    const route = window.PRINCIPALITIES_ROUTE;
    const leg = route[G._routeProgress || 0];
    if(!leg){ G.flags.principalities_route_complete = true; executeTravelTo('shelkopolis','foot'); return; }
    if(typeof updateEnvDesc === 'function') updateEnvDesc(leg.narration);
    if(typeof addNarration === 'function') addNarration(leg.name, leg.narration);
    if(leg.encounterChance > 0 && Math.random() < leg.encounterChance){
      const enemy = leg.enemyPool[Math.floor(Math.random()*leg.enemyPool.length)];
      if(typeof addNarration === 'function') addNarration('Encounter','The road is not empty.');
      setTimeout(function(){
        if(typeof startCombat === 'function') startCombat(enemy, {routeLeg:leg.id});
        else advancePrincipalitiesLeg();
      }, 600);
      return;
    }
    G._routeProgress = (G._routeProgress || 0) + 1;
    if(leg.destination){ G.flags.principalities_route_in_progress = false; executeTravelTo(leg.destination,'foot'); return; }
    const legId = leg.id;
    window.renderChoices && window.renderChoices([{
      id:'route_continue_'+legId, text:'Continue toward Shelkopolis.', sandbox:true,
      action: function(){ advancePrincipalitiesLeg(); }
    }]);
  }

  window.startPrincipalitiesRoute = startPrincipalitiesRoute;

  // ── Public API ─────────────────────────────────────────────────────────────

  window.PORT_LOCALITIES      = PORT_LOCALITIES;
  window.AIRSHIP_LOCALITIES   = AIRSHIP_LOCALITIES;
  window.COSMIC_LOCALITIES    = COSMIC_LOCALITIES;
  window.COSMIC_IDS           = COSMIC_IDS;
  window.COSMIC_ADJACENCY     = COSMIC_ADJACENCY;
  window.STABLE_LOCALITIES    = STABLE_LOCALITIES;
  window.HORSE_COSTS          = HORSE_COSTS;
  window.renderTravelUI       = renderTravelUI;
  window.getAvailableDestinations = getAvailableDestinations;
  window.getTravelModes       = getTravelModes;
  window.getLocalDistricts    = getLocalDistricts;
  window.getSettlementId      = getSettlementId;

  window._travelTo             = function(destId, modeId){ executeTravelTo(destId, modeId); };
  window._enterDistrict        = function(distId){ executeEnterDistrict(distId); };
  window._returnToSettlement   = function(){ executeReturnToSettlement(); };
  window._enterNomdara         = function(){ executeEnterNomdara(); };
  window._buyHorse             = function(){ executeBuyHorse(); };
  window._closeTravelUI        = function(){
    const G = window._travelEngineG;
    if(G) G.travelMode = false;
    window._travelRender && window._travelRender();
  };

})();
