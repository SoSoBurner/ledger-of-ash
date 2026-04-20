// Item System — definitions, shop inventories, combat drops, equip logic, UI rendering

(function(){

  // ── SLOT DISPLAY NAMES ──────────────────────────────────────────────────────
  const SLOT_LABELS = {
    weapon:'Weapon', offhand:'Off-hand', armor:'Armor', helmet:'Helmet',
    boots:'Boots', accessory:'Accessory', arcane_focus:'Arcane Focus',
    holy_symbol:'Holy Symbol', signet:'Signet', kit:'Kit', belt:'Belt', focus:'Focus'
  };

  // ── STAT DISPLAY ────────────────────────────────────────────────────────────
  const STAT_LABELS = {might:'Might',finesse:'Finesse',vigor:'Vigor',wits:'Wits',spirit:'Spirit',charm:'Charm'};

  // ── ITEM DEFINITIONS ────────────────────────────────────────────────────────
  // type: combat|stealth|survival|arcane|religious|social
  // statBonus: {might,finesse,vigor,wits,spirit,charm}
  // bonus: legacy gear bonus keys (for gearBonus() compat)

  const ITEM_DEFS = [
    // ── COMMON (cost 6-12) ──────────────────────────────────────────────────
    {id:'worn_blade',name:'Worn Blade',slot:'weapon',tier:'Common',type:'combat',cost:6,
      statBonus:{might:1},bonus:{attack:0},
      desc:'A serviceable edge that has seen real use. Might +1.'},
    {id:'field_cloak',name:'Field Cloak',slot:'armor',tier:'Common',type:'survival',cost:7,
      statBonus:{vigor:1},bonus:{brace:0},
      desc:'Thick weave that absorbs minor blows. Vigor +1.'},
    {id:'soft_boots',name:'Soft Boots',slot:'boots',tier:'Common',type:'stealth',cost:6,
      statBonus:{finesse:1},bonus:{concealment:1},
      desc:'Near-silent soles. Finesse +1, concealment +1.'},
    {id:'study_lantern',name:'Study Lantern',slot:'kit',tier:'Common',type:'arcane',cost:7,
      statBonus:{wits:1},bonus:{lore:0},
      desc:'Focused light for detailed reading under pressure. Wits +1.'},
    {id:'shrine_token',name:'Shrine Token',slot:'accessory',tier:'Common',type:'religious',cost:6,
      statBonus:{spirit:1},bonus:{ritual:0},
      desc:'A minor house blessing that steadies ritual procedure. Spirit +1.'},
    {id:'road_signet',name:'Road Signet',slot:'signet',tier:'Common',type:'social',cost:7,
      statBonus:{charm:1},bonus:{person:0},
      desc:'Marks affiliation with a recognized house or guild. Charm +1.'},
    {id:'travel_shield',name:'Travel Shield',slot:'offhand',tier:'Common',type:'survival',cost:8,
      statBonus:{vigor:1},bonus:{guard:1,brace:1},
      desc:'Durable road protection. Vigor +1, guard +1.'},
    {id:'entry_tools',name:'Entry Tools',slot:'kit',tier:'Common',type:'stealth',cost:9,
      statBonus:{finesse:1},bonus:{tools:1},
      desc:'Basic lock and seal tools. Finesse +1, tools +1.'},
    {id:'field_helm',name:'Field Helm',slot:'helmet',tier:'Common',type:'survival',cost:8,
      statBonus:{vigor:1},bonus:{brace:0},
      desc:'Simple iron helmet. Vigor +1.'},

    // ── UNCOMMON (cost 13-22) ────────────────────────────────────────────────
    {id:'iron_shortsword',name:'Iron Shortsword',slot:'weapon',tier:'Uncommon',type:'combat',cost:15,
      statBonus:{might:1},bonus:{attack:1},
      desc:'Reliable infantry blade with good balance. Might +1, attack +1.'},
    {id:'chain_vest',name:'Chain Vest',slot:'armor',tier:'Uncommon',type:'survival',cost:16,
      statBonus:{vigor:2},bonus:{brace:1,guard:0},
      desc:'Interlocked rings that stop cuts and spread impact. Vigor +2.'},
    {id:'shadow_wrap',name:'Shadow Wrap',slot:'armor',tier:'Uncommon',type:'stealth',cost:14,
      statBonus:{finesse:1},bonus:{concealment:1,vanish:1},
      desc:'Dark cloth that absorbs light and muffles movement. Finesse +1.'},
    {id:'focus_rod',name:'Focus Rod',slot:'arcane_focus',tier:'Uncommon',type:'arcane',cost:15,
      statBonus:{wits:2},bonus:{arcana:1},
      desc:'A tuned implement for directed arcane output. Wits +2, arcana +1.'},
    {id:'iron_accord_seal',name:'Iron Accord Seal',slot:'accessory',tier:'Uncommon',type:'social',cost:13,
      statBonus:{charm:1},bonus:{person:1,coordination:0},
      desc:'Official seal recognizable to enforcers and administrators. Charm +1.'},
    {id:'devotion_cord',name:'Devotion Cord',slot:'holy_symbol',tier:'Uncommon',type:'religious',cost:14,
      statBonus:{spirit:2},bonus:{ritual:1},
      desc:'Knotted prayer cord blessed by a shrine attendant. Spirit +2, ritual +1.'},
    {id:'composite_bow',name:'Composite Bow',slot:'weapon',tier:'Uncommon',type:'combat',cost:18,
      statBonus:{might:1,finesse:1},bonus:{attack:1,route:0},
      desc:'A layered bow suited for both range and close press. Might +1, Finesse +1.'},
    {id:'climbing_tools',name:'Climbing Tools',slot:'kit',tier:'Uncommon',type:'stealth',cost:13,
      statBonus:{finesse:1},bonus:{tools:1,route:1},
      desc:'Compact hooks and soft-grip wrap. Finesse +1.'},
    {id:'reinforced_buckler',name:'Reinforced Buckler',slot:'offhand',tier:'Uncommon',type:'survival',cost:16,
      statBonus:{vigor:1},bonus:{guard:2},
      desc:'A tight shield with hardened boss. Vigor +1, guard +2.'},
    {id:'guild_charter',name:'Guild Charter',slot:'belt',tier:'Uncommon',type:'social',cost:15,
      statBonus:{charm:1},bonus:{info:1,person:1},
      desc:'Authenticated membership in a recognized trade guild. Charm +1.'},
    {id:'warded_gloves',name:'Warded Gloves',slot:'accessory',tier:'Uncommon',type:'arcane',cost:16,
      statBonus:{wits:1},bonus:{ward:1},
      desc:'Inscribed leather that buffers arcane blowback. Wits +1, ward +1.'},
    {id:'ironhold_boots',name:'Ironhold Boots',slot:'boots',tier:'Uncommon',type:'survival',cost:14,
      statBonus:{vigor:1},bonus:{brace:1},
      desc:'Forge-district heavy boots with steel toecap. Vigor +1.'},

    // ── RARE (cost 23-40) ────────────────────────────────────────────────────
    {id:'dueling_blade',name:'Dueling Blade',slot:'weapon',tier:'Rare',type:'combat',cost:30,
      statBonus:{might:2},bonus:{attack:1},
      desc:'A precision-forged weapon for serious engagements. Might +2, attack +1.'},
    {id:'hardened_plate',name:'Hardened Plate',slot:'armor',tier:'Rare',type:'survival',cost:35,
      statBonus:{vigor:2},bonus:{brace:2,protect:1},
      desc:'Full torso plate with reinforced pauldrons. Vigor +2.'},
    {id:'phantom_suit',name:'Phantom Suit',slot:'armor',tier:'Rare',type:'stealth',cost:28,
      statBonus:{finesse:2},bonus:{concealment:2,vanish:1},
      desc:'Densely layered shadow-cloth with noise-damping wiring. Finesse +2.'},
    {id:'resonant_focus',name:'Resonant Focus',slot:'arcane_focus',tier:'Rare',type:'arcane',cost:32,
      statBonus:{wits:2},bonus:{arcana:2,ward:1},
      desc:'A high-frequency implement that amplifies directed thought. Wits +2.'},
    {id:'reliquary_fragment',name:'Reliquary Fragment',slot:'holy_symbol',tier:'Rare',type:'religious',cost:29,
      statBonus:{spirit:2},bonus:{ritual:2},
      desc:'A shard from a confirmed historical shrine. Spirit +2, ritual +2.'},
    {id:'shelk_signet',name:'Shelk Signet Ring',slot:'signet',tier:'Rare',type:'social',cost:30,
      statBonus:{charm:2},bonus:{person:2,info:1},
      desc:'House Shelk authentication ring. Recognized at every noble threshold. Charm +2.'},
    {id:'assault_spear',name:'Assault Spear',slot:'weapon',tier:'Rare',type:'combat',cost:26,
      statBonus:{might:2},bonus:{attack:1,protect:1},
      desc:'Heavy shaft with reinforced tip for sustained engagements. Might +2.'},
    {id:'lockwarden_tools',name:'Lockwarden Tools',slot:'kit',tier:'Rare',type:'stealth',cost:25,
      statBonus:{finesse:2},bonus:{tools:2,route:1},
      desc:'Professional-grade entry kit with silent picks and seam cutters. Finesse +2.'},
    {id:'ward_lattice',name:'Ward Lattice',slot:'accessory',tier:'Rare',type:'arcane',cost:34,
      statBonus:{wits:2},bonus:{ward:2},
      desc:'Inscribed silver lattice that deflects hostile arcane channeling. Wits +2.'},
    {id:'command_pendant',name:'Command Pendant',slot:'accessory',tier:'Rare',type:'social',cost:28,
      statBonus:{charm:2},bonus:{coordination:1,command:1},
      desc:'Issued by Roadwarden command — recognized as authority sigil. Charm +2.'},

    // ── VERY RARE (cost 41-70) ───────────────────────────────────────────────
    {id:'wardens_blade',name:"Warden's Blade",slot:'weapon',tier:'Very Rare',type:'combat',cost:55,
      statBonus:{might:3},bonus:{attack:2,protect:1},
      desc:'An Iron Accord officer weapon of genuine provenance. Might +3, attack +2.'},
    {id:'aspect_plate',name:'Aspect Plate',slot:'armor',tier:'Very Rare',type:'survival',cost:60,
      statBonus:{vigor:3},bonus:{brace:2,protect:2},
      desc:'Named armor set from a remembered campaign. Vigor +3.'},
    {id:'deepveil_coat',name:'Deepveil Coat',slot:'armor',tier:'Very Rare',type:'stealth',cost:52,
      statBonus:{finesse:3},bonus:{concealment:3,vanish:2},
      desc:'Shadowhands field coat, unregistered. Finesse +3.'},
    {id:'primordial_focus',name:'Primordial Focus',slot:'arcane_focus',tier:'Very Rare',type:'arcane',cost:58,
      statBonus:{wits:3},bonus:{arcana:3,ward:1},
      desc:'A pre-institutional implement tuned to primordial arcane frequency. Wits +3.'},
    {id:'sanctified_relic',name:'Sanctified Relic',slot:'holy_symbol',tier:'Very Rare',type:'religious',cost:50,
      statBonus:{spirit:3},bonus:{ritual:3},
      desc:'A confirmed major shrine artifact with verified lineage. Spirit +3.'},
    {id:'house_authority_ring',name:'House Authority Ring',slot:'signet',tier:'Very Rare',type:'social',cost:48,
      statBonus:{charm:3},bonus:{person:2,coordination:1,info:1},
      desc:'A polity-recognized authority signet. Opens sealed chambers and closed conversations. Charm +3.'},
    {id:'paired_daggers',name:'Paired Daggers',slot:'weapon',tier:'Very Rare',type:'stealth',cost:44,
      statBonus:{might:2,finesse:2},bonus:{attack:2,stealth:1},
      desc:'Matched blades balanced for ambush and close precision. Might +2, Finesse +2.'},
    {id:'resonant_helm',name:'Resonant Helm',slot:'helmet',tier:'Very Rare',type:'arcane',cost:46,
      statBonus:{wits:2},bonus:{arcana:1,ward:2},
      desc:'Inscribed helmet that amplifies arcane awareness. Wits +2.'},

    // ── LEGENDARY (cost 71-120) ──────────────────────────────────────────────
    {id:'axiom_blade',name:'Axiom Blade',slot:'weapon',tier:'Legendary',type:'combat',cost:100,
      statBonus:{might:4},bonus:{attack:3,protect:1},
      desc:'One of the canonical weapons of the Iron Accord founding. Might +4.'},
    {id:'godmetal_plate',name:'Godmetal Plate',slot:'armor',tier:'Legendary',type:'survival',cost:110,
      statBonus:{vigor:4},bonus:{brace:3,protect:3},
      desc:'Alloy armor from the forge-belt volcanic islands. Vigor +4.'},
    {id:'null_coat',name:'Null Coat',slot:'armor',tier:'Legendary',type:'stealth',cost:90,
      statBonus:{finesse:4},bonus:{concealment:4,vanish:3},
      desc:'Zero-signature field coat. Finesse +4.'},
    {id:'world_focus',name:'World Focus',slot:'arcane_focus',tier:'Legendary',type:'arcane',cost:105,
      statBonus:{wits:4},bonus:{arcana:4,ward:2},
      desc:'A planetary-scale arcane implement of unknown institutional origin. Wits +4.'},
    {id:'divine_mandate',name:'Divine Mandate',slot:'holy_symbol',tier:'Legendary',type:'religious',cost:95,
      statBonus:{spirit:4},bonus:{ritual:4},
      desc:'An authenticated divine mandate recognized across all polities. Spirit +4.'},
    {id:'domain_signet',name:'Domain Signet',slot:'signet',tier:'Legendary',type:'social',cost:85,
      statBonus:{charm:4},bonus:{person:3,coordination:2,command:2},
      desc:'A polity-founding signet with continent-wide recognition. Charm +4.'},
  ];

  // ── SHOP INVENTORIES ────────────────────────────────────────────────────────
  // Each locality gets a curated pool seeded by locality identity.
  // Also includes relevant entries from SERVICE_ITEM_POOLS (converted).

  const SHOP_POOLS = {
    shelkopolis:   ['iron_shortsword','chain_vest','road_signet','shelk_signet','field_cloak','guild_charter','command_pendant'],
    panim_haven:   ['shrine_token','devotion_cord','field_cloak','study_lantern','reliquary_fragment','road_signet','field_helm'],
    guildheart_hub:['guild_charter','iron_accord_seal','reinforced_buckler','iron_shortsword','composite_bow','warded_gloves','command_pendant'],
    fairhaven:     ['soft_boots','entry_tools','road_signet','guild_charter','climbing_tools','shadow_wrap','field_cloak'],
    sunspire_haven:['travel_shield','field_helm','composite_bow','ironhold_boots','iron_shortsword','field_cloak','chain_vest'],
    harvest_circle:['travel_shield','field_cloak','shrine_token','field_helm','soft_boots','worn_blade','ironhold_boots'],
    mimolot_academy:['study_lantern','focus_rod','warded_gloves','resonant_focus','ward_lattice','reliquary_fragment','devotion_cord'],
    aurora_crown_commune:['study_lantern','warded_gloves','focus_rod','field_cloak','shrine_token','devotion_cord','field_helm'],
    glasswake_commune:['focus_rod','warded_gloves','study_lantern','soft_boots','shadow_wrap','shrine_token','ward_lattice'],
    soreheim_proper:['ironhold_boots','hardened_plate','assault_spear','chain_vest','field_helm','reinforced_buckler','iron_shortsword'],
    shirshal:      ['iron_accord_seal','guild_charter','road_signet','command_pendant','field_cloak','soft_boots','shelk_signet'],
    ithtananalor:  ['iron_accord_seal','iron_shortsword','chain_vest','field_helm','entry_tools','ironhold_boots','climbing_tools'],
    cosmoria:      ['iron_accord_seal','guild_charter','focus_rod','resonant_focus','composite_bow','climbing_tools','warded_gloves','shadow_wrap'],
    craftspire:    ['entry_tools','climbing_tools','lockwarden_tools','shadow_wrap','guild_charter','iron_accord_seal','warded_gloves'],
    unity_square:  ['guild_charter','command_pendant','road_signet','iron_accord_seal','shrine_token','devotion_cord','field_cloak'],
    ironhold_quarry:['ironhold_boots','hardened_plate','assault_spear','field_helm','chain_vest','worn_blade','travel_shield'],
    plumes_end_outpost:['field_cloak','travel_shield','soft_boots','worn_blade','field_helm','shrine_token','entry_tools'],
    whitebridge_commune:['shrine_token','devotion_cord','field_cloak','study_lantern','road_signet','soft_boots','field_helm'],
  };

  // Cosmic locality shops
  const COSMIC_SHOP_POOLS = {
    fire_ascent:['axiom_blade','godmetal_plate','primordial_focus','resonant_focus','assault_spear'],
    umbral_shore:['null_coat','deepveil_coat','phantom_suit','lockwarden_tools','paired_daggers'],
    mother_storm_threshold:['resonant_focus','primordial_focus','world_focus','resonant_helm','warded_gloves'],
    ashgate_crossing:['iron_accord_seal','command_pendant','guild_charter','house_authority_ring','domain_signet'],
    limbo_edge:['deepveil_coat','paired_daggers','lockwarden_tools','phantom_suit','null_coat'],
    astral_divide:['world_focus','primordial_focus','resonant_helm','ward_lattice','warded_gloves'],
    stellar_remnant:['divine_mandate','sanctified_relic','devotion_cord','reliquary_fragment','house_authority_ring'],
  };

  // ── COMBAT DROP TABLES ──────────────────────────────────────────────────────

  const COMBAT_DROPS = {
    standard: {
      chance: 0.20,
      pool: ['worn_blade','field_cloak','soft_boots','entry_tools','shrine_token','road_signet','study_lantern','travel_shield','field_helm']
    },
    elite: {
      chance: 0.35,
      pool: ['iron_shortsword','chain_vest','shadow_wrap','focus_rod','devotion_cord','iron_accord_seal','composite_bow','reinforced_buckler','climbing_tools']
    },
    boss: {
      chance: 0.60,
      pool: ['dueling_blade','hardened_plate','phantom_suit','resonant_focus','reliquary_fragment','shelk_signet','assault_spear','lockwarden_tools','ward_lattice','command_pendant']
    }
  };

  // ── EQUIP / UNEQUIP ─────────────────────────────────────────────────────────

  function equipItem(G, item){
    if(!G.equipment) G.equipment = {};
    if(!G.inventory) G.inventory = [];
    const slot = item.slot || 'kit';
    if(G.equipment[slot] && G.equipment[slot].id !== item.id){
      G.inventory.push(G.equipment[slot]);
    }
    G.equipment[slot] = item;
    const idx = G.inventory.findIndex(i => (i.id && i.id === item.id) || i.name === item.name);
    if(idx >= 0) G.inventory.splice(idx, 1);
  }

  function unequipItem(G, slot){
    if(!G.equipment || !G.equipment[slot]) return;
    if(!G.inventory) G.inventory = [];
    G.inventory.push(G.equipment[slot]);
    delete G.equipment[slot];
  }

  // ── BONUS CALCULATORS ───────────────────────────────────────────────────────

  function getEquipmentStatBonus(G, statKey){
    let total = 0;
    Object.values(G.equipment || {}).forEach(item => {
      if(item && item.statBonus && item.statBonus[statKey]) total += item.statBonus[statKey];
    });
    return total;
  }

  function getEquippedBonusSummary(G){
    const stats = {might:0,finesse:0,vigor:0,wits:0,spirit:0,charm:0};
    const legacy = {};
    Object.values(G.equipment || {}).forEach(item => {
      if(!item) return;
      if(item.statBonus) Object.entries(item.statBonus).forEach(([k,v]) => { if(k in stats) stats[k] += v; });
      if(item.bonus) Object.entries(item.bonus).forEach(([k,v]) => { if(v) legacy[k] = (legacy[k]||0) + v; });
    });
    return {stats, legacy};
  }

  // ── COMBAT DROP RESOLUTION ──────────────────────────────────────────────────

  function rollCombatDrop(G, tier){
    const table = COMBAT_DROPS[tier] || COMBAT_DROPS.standard;
    if(Math.random() > table.chance) return null;
    const pool = table.pool;
    const id = pool[Math.floor(Math.random() * pool.length)];
    const def = ITEM_DEFS.find(i => i.id === id);
    if(!def) return null;
    if(!G.inventory) G.inventory = [];
    const already = G.inventory.some(i => i.id === def.id) || Object.values(G.equipment||{}).some(i => i && i.id === def.id);
    if(already) return null;
    G.inventory.push({...def});
    G.inventory = G.inventory.slice(0, 30);
    return def;
  }

  // ── SHOP LOOKUP ─────────────────────────────────────────────────────────────

  function getShopItems(locationId, G){
    const cosmic = (window.COSMIC_IDS||[]).includes(locationId);
    const pool = cosmic
      ? (COSMIC_SHOP_POOLS[locationId] || [])
      : (SHOP_POOLS[locationId] || []);

    // Stage-tier gate: filter by level/stage
    const stage = G.stage || 1;
    const tierFilter = stage <= 1 ? ['Common'] :
                       stage <= 2 ? ['Common','Uncommon'] :
                       stage <= 3 ? ['Common','Uncommon','Rare'] :
                       stage <= 4 ? ['Common','Uncommon','Rare','Very Rare'] :
                                    ['Common','Uncommon','Rare','Very Rare','Legendary'];

    // Also pull from locality service item overrides (existing system)
    const archGroup = (window.ARCHETYPES||[]).find(a => a.id === (G.archetype||'warrior'))?.group || 'combat';
    const basePool = ((window.SERVICE_ITEM_POOLS||{})[archGroup]||[]);
    const localPool = (((window.LOCALITY_SERVICE_ITEM_OVERRIDES||{})[locationId])||{})[archGroup]||[];
    const serviceItems = [...localPool, ...basePool].map(item => ({
      ...item,
      tier:'Common',
      type:'service',
      statBonus: item.statBonus || {}
    }));

    const itemsFromDefs = pool
      .map(id => ITEM_DEFS.find(i => i.id === id))
      .filter(Boolean)
      .filter(i => tierFilter.includes(i.tier));

    // Deduplicate by name
    const seen = new Set();
    return [...itemsFromDefs, ...serviceItems].filter(i => {
      if(seen.has(i.name)) return false;
      seen.add(i.name);
      return true;
    }).slice(0, 8);
  }

  // ── ITEM BONUS TOOLTIP HTML ─────────────────────────────────────────────────

  function itemBonusTooltip(item){
    const lines = [];
    if(item.statBonus) Object.entries(item.statBonus).forEach(([k,v]) => { if(v) lines.push(`${STAT_LABELS[k]||k} +${v}`); });
    if(item.bonus) Object.entries(item.bonus).forEach(([k,v]) => { if(v) lines.push(`${k} +${v}`); });
    return lines.length ? lines.join(', ') : 'No stat bonuses';
  }

  // ── RENDER: EQUIPPED TAB ────────────────────────────────────────────────────

  function renderEquippedTab(G){
    const eq = G.equipment || {};
    const summary = getEquippedBonusSummary(G);

    // Total bonus display
    const statLines = Object.entries(summary.stats)
      .filter(([,v]) => v > 0)
      .map(([k,v]) => `<span class='eqStatPill'>${STAT_LABELS[k]} +${v}</span>`).join('');
    const legacyLines = Object.entries(summary.legacy)
      .filter(([,v]) => v > 0)
      .map(([k,v]) => `<span class='eqStatPill eqLegacy'>${k} +${v}</span>`).join('');

    const totalSection = (statLines||legacyLines)
      ? `<div class='eqTotalCard'><div class='eqTotalLabel'>Total Equipped Bonuses</div><div class='eqStatPills'>${statLines}${legacyLines}</div></div>`
      : `<div class='eqTotalCard'><div class='eqTotalLabel muted'>No equipped bonuses</div></div>`;

    // Per-slot cards
    const allSlots = ['weapon','offhand','armor','helmet','boots','accessory','arcane_focus','holy_symbol','signet','kit','belt','focus'];
    const slotCards = allSlots.map(slot => {
      const item = eq[slot];
      if(!item) return `<div class='eqSlotCard eqEmpty'><span class='eqSlotLabel'>${SLOT_LABELS[slot]||slot}</span><span class='eqSlotEmpty'>—</span></div>`;
      const bonuses = itemBonusTooltip(item);
      return `<div class='eqSlotCard'>
        <span class='eqSlotLabel'>${SLOT_LABELS[slot]||slot}</span>
        <div class='eqItemName'>${item.name} <span class='eqTier eqTier${(item.tier||'Common').replace(' ','')}'>${item.tier||''}</span></div>
        <div class='eqItemBonuses'>${bonuses}</div>
        <button class='eqUnequipBtn' onclick='window._unequipItem("${slot}")'>Unequip</button>
      </div>`;
    }).join('');

    return `${totalSection}<div class='eqSlotGrid'>${slotCards}</div>`;
  }

  // ── RENDER: INVENTORY TAB ───────────────────────────────────────────────────

  function renderInventoryTab(G){
    const inv = G.inventory || [];
    if(!inv.length) return `<div class='invEmpty'>Your inventory is empty.</div>`;

    return inv.map((item, idx) => {
      const bonuses = itemBonusTooltip(item);
      const slotLabel = SLOT_LABELS[item.slot] || item.slot || 'misc';
      const alreadyEquipped = Object.values(G.equipment||{}).some(e => e && e.name === item.name);
      return `<div class='invCard'>
        <div class='invCardHeader'>
          <span class='invItemName'>${item.name}</span>
          <span class='invTier invTier${(item.tier||'Common').replace(' ','')}'>${item.tier||'Common'}</span>
          <span class='invSlotTag'>${slotLabel}</span>
        </div>
        <div class='invItemDesc'>${item.desc||item.text||''}</div>
        <div class='invBonusLine'>${bonuses}</div>
        <div class='invActions'>
          ${!alreadyEquipped ? `<button class='invEquipBtn' onclick='window._equipItem(${idx})'>Equip</button>` : `<span class='invEquippedTag'>Equipped</span>`}
          <button class='invDropBtn' onclick='window._dropItem(${idx})'>Drop</button>
        </div>
      </div>`;
    }).join('');
  }

  // ── RENDER: SHOP SECTION (for world/NPC panel) ──────────────────────────────

  function renderShopsSection(G){
    const items = getShopItems(G.location, G);
    if(!items.length) return '';

    const itemCards = items.map((item, idx) => {
      const bonuses = itemBonusTooltip(item);
      const owned = (G.inventory||[]).some(i => i.name === item.name) || Object.values(G.equipment||{}).some(e => e && e.name === item.name);
      const canAfford = G.gold >= (item.cost||0);
      const slotLabel = SLOT_LABELS[item.slot] || item.slot || 'misc';
      return `<div class='shopCard'>
        <div class='shopCardHeader'>
          <span class='shopItemName'>${item.name}</span>
          <span class='shopTier shopTier${(item.tier||'Common').replace(' ','')}'>${item.tier||'Common'}</span>
          <span class='shopSlotTag'>${slotLabel}</span>
          <span class='shopCost'>${item.cost||0}g</span>
        </div>
        <div class='shopItemDesc'>${item.desc||item.text||''}</div>
        <div class='shopBonusLine'>${bonuses}</div>
        ${owned
          ? `<span class='shopOwned'>Already owned</span>`
          : `<button class='shopBuyBtn${canAfford?'':' shopDisabled'}' onclick='window._shopBuyItem(${idx})'>Buy — ${item.cost}g</button>`
        }
      </div>`;
    }).join('');

    return `<div class='card'><div class='sectionTitle'>Shops &amp; Services</div><div class='shopGrid'>${itemCards}</div></div>`;
  }

  // ── GLOBAL CALLBACKS (wired from engine.js) ─────────────────────────────────

  window._equipItem = function(idx){
    const G = window._itemsEngineG;
    if(!G) return;
    const item = (G.inventory||[])[idx];
    if(!item) return;
    equipItem(G, item);
    if(window._itemsRender) window._itemsRender();
  };

  window._unequipItem = function(slot){
    const G = window._itemsEngineG;
    if(!G) return;
    unequipItem(G, slot);
    if(window._itemsRender) window._itemsRender();
  };

  window._dropItem = function(idx){
    const G = window._itemsEngineG;
    if(!G || !G.inventory) return;
    G.inventory.splice(idx, 1);
    if(window._itemsRender) window._itemsRender();
  };

  window._shopBuyItem = function(idx){
    const G = window._itemsEngineG;
    if(!G) return;
    const items = getShopItems(G.location, G);
    const item = items[idx];
    if(!item) return;
    if(G.gold < (item.cost||0)){
      if(window._itemsAddNotice) window._itemsAddNotice(`Not enough gold for ${item.name}. Need ${item.cost}g, have ${G.gold}g.`);
      if(window._itemsRender) window._itemsRender();
      return;
    }
    G.gold -= (item.cost||0);
    if(!G.inventory) G.inventory = [];
    G.inventory.unshift({...item});
    G.inventory = G.inventory.slice(0, 30);
    if(window._itemsAddNotice) window._itemsAddNotice(`Bought ${item.name} for ${item.cost}g.`);
    if(window._itemsRender) window._itemsRender();
  };

  // ── EXPORTS ─────────────────────────────────────────────────────────────────

  window.ITEM_DEFS = ITEM_DEFS;
  window.SLOT_LABELS = SLOT_LABELS;
  window.equipItem = equipItem;
  window.unequipItem = unequipItem;
  window.getEquipmentStatBonus = getEquipmentStatBonus;
  window.getEquippedBonusSummary = getEquippedBonusSummary;
  window.rollCombatDrop = rollCombatDrop;
  window.getShopItems = getShopItems;
  window.itemBonusTooltip = itemBonusTooltip;
  window.renderEquippedTab = renderEquippedTab;
  window.renderInventoryTab = renderInventoryTab;
  window.renderShopsSection = renderShopsSection;

})();
