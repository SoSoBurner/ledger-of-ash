// Travel System — node-to-node travel with mode options, horse acquisition, stage gates, and encounters

(function(){

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

  // Localities with sea port access
  const PORT_LOCALITIES = ['cosmoria','panim_haven','guildheart_hub','plumes_end_outpost'];

  // Localities with airship dock (stage minimum required)
  const AIRSHIP_LOCALITIES = {cosmoria:3, guildheart_hub:4};

  // Localities with active stables
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

  // BFS shortest-path distances from a source locality
  function computeDistances(fromId, stage){
    const adj = Object.assign({}, window.ADJACENCY||{});
    if(stage>=5){
      // Connect mortal world to cosmic via ashgate_crossing (nearest mortal: shelkopolis)
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

  function getAvailableDestinations(G){
    const stage = G.stage||1;
    const dist = computeDistances(G.location, stage);

    const mortalLocs = Object.values(window.KEY_LOCALITIES||{});
    const all = stage>=5 ? [...mortalLocs, ...COSMIC_LOCALITIES] : mortalLocs;

    return all
      .filter(loc => loc.id !== G.location)
      .map(loc => ({...loc, distance: dist[loc.id] !== undefined ? dist[loc.id] : 999}))
      .filter(loc => {
        if(loc.distance===999) return false;
        if(stage===1) return loc.distance===1;
        if(stage===2) return loc.distance<=2;
        return true; // stage 3/4/5: all reachable
      })
      .sort((a,b)=>a.distance-b.distance||(a.name<b.name?-1:1));
  }

  function distanceLabel(d){
    if(d===1) return 'Adjacent';
    if(d===2) return 'Near';
    if(d<=4)  return 'Far';
    return 'Very Far';
  }

  function getTravelModes(loc, G){
    const d = loc.distance||1;
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

    const footTime = d===1 ? 2 : d===2 ? 3 : 4;
    modes.push({id:'foot', label:'On Foot', timeCost:footTime, goldCost:0,
      desc:`${footTime} time units. No cost.`});

    const hireGold = d===1 ? 2 : d===2 ? 3 : 5;
    const hireTime = d<=2 ? 1 : 2;
    modes.push({id:'hired', label:'Hired Passage', timeCost:hireTime, goldCost:hireGold,
      desc:`${hireGold} gold · ${hireTime} time unit${hireTime>1?'s':''}.`});

    if(G.horse){
      const horseTime = d<=3 ? 1 : 2;
      modes.push({id:'horse', label:'Ride (Your Horse)', timeCost:horseTime, goldCost:0,
        desc:`${horseTime} time unit${horseTime>1?'s':''}. Fastest land option.`});
    }

    // Boat: both localities must be ports
    if(PORT_LOCALITIES.includes(G.location) && PORT_LOCALITIES.includes(loc.id)){
      const boatGold = d===1 ? 3 : d===2 ? 5 : d<=4 ? 8 : 12;
      const boatTime = d<=2 ? 1 : 2;
      modes.push({id:'boat', label:'Sea Passage', timeCost:boatTime, goldCost:boatGold,
        desc:`${boatGold} gold · ${boatTime} time unit${boatTime>1?'s':''}. Faster than foot on port routes.`});
    }

    // Airship: available from airship localities, stage-gated
    const airshipStageMin = AIRSHIP_LOCALITIES[G.location];
    if(airshipStageMin !== undefined && (G.stage||1) >= airshipStageMin){
      const airGold = 25 + Math.floor(d * 2);
      modes.push({id:'airship', label:'Airship Passage', timeCost:1, goldCost:airGold,
        desc:`${airGold} gold · 1 time unit. Magical airship — available from ${(window.KEY_LOCALITIES||{})[G.location]?.name||G.location}.`});
    }

    return modes;
  }

  function travelEncounterChance(stage){
    return [0, 0.15, 0.25, 0.35, 0.40, 0.30][stage]||0.20;
  }

  // Called from engine.js when a mode button is clicked
  function executeTravelTo(destId, modeId){
    const G = window._travelEngineG;
    if(!G) return;

    const dest = getAvailableDestinations(G).find(d=>d.id===destId);
    if(!dest){ window._travelAddNotice && window._travelAddNotice('Destination not found.'); return; }

    const modes = getTravelModes(dest, G);
    const mode = modes.find(m=>m.id===modeId);
    if(!mode){ window._travelAddNotice && window._travelAddNotice('Travel mode not found.'); return; }

    if(mode.goldCost > G.gold){
      window._travelAddNotice && window._travelAddNotice(`Not enough gold. ${mode.label} costs ${mode.goldCost} gold; you have ${G.gold}.`);
      window._travelRender && window._travelRender();
      return;
    }

    G.gold -= mode.goldCost;
    G.travelMode = false;

    // Advance time per mode cost
    if(window._travelAdvanceTime){
      for(let i=0;i<mode.timeCost;i++) window._travelAdvanceTime(1);
    }

    // Travel encounter check (not on adjacent foot travel in stage 1)
    const chance = travelEncounterChance(G.stage);
    if(Math.random() < chance){
      window._travelAddNotice && window._travelAddNotice(`Trouble on the road to ${dest.name}.`);
      window._travelStartEncounter && window._travelStartEncounter('road');
    }

    // Execute core travel logic
    if(window._travelCoreTravelTo){
      window._travelCoreTravelTo(destId);
    }

    window._travelRender && window._travelRender();
  }

  function executeBuyHorse(){
    const G = window._travelEngineG;
    if(!G) return;

    if(!STABLE_LOCALITIES.includes(G.location)){
      window._travelAddNotice && window._travelAddNotice('No stable at this location.');
      window._travelRender && window._travelRender();
      return;
    }
    const cost = HORSE_COSTS[G.location]||20;
    if(G.gold < cost){
      window._travelAddNotice && window._travelAddNotice(`Need ${cost} gold for a horse. You have ${G.gold}.`);
      window._travelRender && window._travelRender();
      return;
    }
    G.gold -= cost;
    G.horse = {name:'Trail Horse', locality:G.location, purchaseDay:G.dayCount};
    window._travelAddNotice && window._travelAddNotice(`Horse purchased for ${cost} gold at ${(window.KEY_LOCALITIES||{})[G.location]?.name||G.location}. Ride at any time.`);
    window._travelRender && window._travelRender();
  }

  function renderTravelUI(G){
    const el = document.getElementById('choices');
    if(!el) return;

    const dest = getAvailableDestinations(G);
    const stableHere = STABLE_LOCALITIES.includes(G.location);
    const horseCost = HORSE_COSTS[G.location]||20;

    let html = `<div class='travelPanel'>`;
    html += `<div class='travelHeader'><span class='travelTitle'>Travel Routes</span><button class='travelClose' onclick='window._closeTravelUI()'>Close</button></div>`;

    // Horse section
    if(!G.horse){
      if(stableHere){
        const canBuy = G.gold >= horseCost;
        html += `<div class='travelHorseCard'>`;
        html += `<div class='travelHorseLabel'>Stable available here</div>`;
        html += `<div class='travelHorseDesc'>A horse cuts travel time to 1 unit for most journeys and is yours permanently until lost in a rescue.</div>`;
        html += `<button class='travelBuyBtn${canBuy?'':' travelDisabled'}' onclick='window._buyHorse()'>Buy Trail Horse — ${horseCost} gold (you have ${G.gold})</button>`;
        html += `</div>`;
      }
    } else {
      html += `<div class='travelHorseCard travelHorseOwned'><b>${G.horse.name}</b> — Ready to ride. Acquired at ${G.horse.locality ? ((window.KEY_LOCALITIES||{})[G.horse.locality]?.name||G.horse.locality) : 'unknown'}.</div>`;
    }

    html += `<div class='travelDestList'>`;
    if(dest.length===0){
      html += `<div class='travelEmpty'>No destinations available at Stage ${G.stage}. Advance your stage to unlock more routes.</div>`;
    } else {
      // Group by distance
      const groups = {};
      dest.forEach(d=>{ const k=distanceLabel(d.distance); (groups[k]=groups[k]||[]).push(d); });
      const groupOrder = ['Adjacent','Near','Far','Very Far'];
      for(const gk of groupOrder){
        if(!groups[gk]) continue;
        html += `<div class='travelGroupHeader'>${gk}</div>`;
        for(const loc of groups[gk]){
          const modes = getTravelModes(loc, G);
          html += `<div class='travelDestCard'>`;
          html += `<div class='travelDestName'>${loc.name}`;
          if(COSMIC_IDS.includes(loc.id)) html += ` <span class='travelCosmicTag'>Cosmic</span>`;
          html += `</div>`;
          if(loc.polity) html += `<div class='travelDestPolity'>${loc.polity}</div>`;
          html += `<div class='travelModeBtns'>`;
          for(const mode of modes){
            const canAfford = G.gold >= mode.goldCost;
            html += `<button class='travelModeBtn${canAfford?'':' travelDisabled'}' onclick='window._travelTo("${loc.id}","${mode.id}")'>`;
            html += `<span class='travelModeName'>${mode.label}</span>`;
            html += `<span class='travelModeCost'>${mode.goldCost>0?mode.goldCost+' gold · ':'Free · '}${mode.timeCost} time</span>`;
            html += `</button>`;
          }
          html += `</div></div>`;
        }
      }
    }
    html += `</div></div>`;

    el.innerHTML = html;
  }

  // Public API
  window.PORT_LOCALITIES = PORT_LOCALITIES;
  window.AIRSHIP_LOCALITIES = AIRSHIP_LOCALITIES;
  window.COSMIC_LOCALITIES = COSMIC_LOCALITIES;
  window.COSMIC_IDS = COSMIC_IDS;
  window.COSMIC_ADJACENCY = COSMIC_ADJACENCY;
  window.STABLE_LOCALITIES = STABLE_LOCALITIES;
  window.HORSE_COSTS = HORSE_COSTS;
  window.renderTravelUI = renderTravelUI;
  window.getAvailableDestinations = getAvailableDestinations;
  window.getTravelModes = getTravelModes;

  // Button callbacks (set by engine.js via window._travelTo etc.)
  window._travelTo = function(destId, modeId){ executeTravelTo(destId, modeId); };
  window._buyHorse = function(){ executeBuyHorse(); };
  window._closeTravelUI = function(){
    const G = window._travelEngineG;
    if(G) G.travelMode = false;
    window._travelRender && window._travelRender();
  };

})();
