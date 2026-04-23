const MATERIAL_DEFS = {
  iron_shard: {
    id: 'iron_shard',
    name: 'Iron Shard',
    desc: 'A fragment of worked iron, salvaged from broken gear.',
    sources: ['frontier_militia', 'iron_accord_enforcer', 'travel_industrial']
  },
  shadow_residue: {
    id: 'shadow_residue',
    name: 'Shadow Residue',
    desc: 'A dark compound that clings to cloth and skin, smelling faintly of hide glue.',
    sources: ['shadowhands_watcher', 'red_hood_operative', 'travel_urban']
  },
  patrol_insignia: {
    id: 'patrol_insignia',
    name: 'Patrol Insignia',
    desc: 'A brass disc stamped with a ward mark, worn smooth at the edges.',
    sources: ['patrol_guard', 'private_security']
  },
  contract_fragment: {
    id: 'contract_fragment',
    name: 'Contract Fragment',
    desc: 'Torn edge of a binding document, the seal still legible.',
    sources: ['red_hood_operative', 'travel_long']
  },
  road_dust: {
    id: 'road_dust',
    name: 'Road Dust',
    desc: 'Fine grit collected from well-traveled paths, carrying trace mineral content.',
    sources: ['travel_any']
  },
  carved_seal: {
    id: 'carved_seal',
    name: 'Carved Seal Fragment',
    desc: 'A chip of stamped stone, likely from a registry or checkpoint marker.',
    sources: ['travel_settlement', 'patrol_guard']
  },
  ash_compound: {
    id: 'ash_compound',
    name: 'Ash Compound',
    desc: 'Gray-black powder with a chemical smell, used in industrial processing.',
    sources: ['travel_industrial', 'travel_soreheim', 'hostile_debtor']
  },
  veil_moth_wing: {
    id: 'veil_moth_wing',
    name: 'Veil Moth Wing',
    desc: 'Iridescent wing membrane from a nocturnal insect common near arcane sites.',
    sources: ['travel_arcane', 'travel_long']
  },
  frontier_fiber: {
    id: 'frontier_fiber',
    name: 'Frontier Fiber',
    desc: 'Coarse plant fiber from frontier growth, tough and rot-resistant.',
    sources: ['frontier_militia', 'travel_wilderness']
  },
  enforcement_resin: {
    id: 'enforcement_resin',
    name: 'Enforcement Resin',
    desc: 'A hardened sealant compound used in civic infrastructure.',
    sources: ['iron_accord_enforcer']
  },
  debt_ledger_scraps: {
    id: 'debt_ledger_scraps',
    name: 'Debt Ledger Scraps',
    desc: 'Torn pages from a debt registry, still legible in parts.',
    sources: ['hostile_debtor', 'travel_any']
  },
  house_crest_brass: {
    id: 'house_crest_brass',
    name: 'House Crest Brass',
    desc: 'A small brass casting from a dissolved house seal.',
    sources: ['private_security', 'shop_shelkopolis']
  },
  archive_chalk: {
    id: 'archive_chalk',
    name: 'Archive Chalk',
    desc: 'Chalk used in archival and lore work, finely milled.',
    sources: ['travel_lore', 'travel_mimolot']
  },
  ritual_wax: {
    id: 'ritual_wax',
    name: 'Ritual Wax',
    desc: 'Dense wax used in commune sealing rites, faintly scented.',
    sources: ['travel_commune', 'shop_glasswake', 'shop_harvest_circle']
  },
  tensile_cord: {
    id: 'tensile_cord',
    name: 'Tensile Cord',
    desc: 'Braided cord of synthetic and natural fibers, used in Soreheim engineering.',
    sources: ['travel_medium_plus', 'shop_soreheim']
  },
  stamped_paper: {
    id: 'stamped_paper',
    name: 'Stamped Paper',
    desc: 'Official-weight paper with a partial registry stamp.',
    sources: ['patrol_guard', 'private_security', 'shop_multiple']
  }
};

const ITEM_DEFS = {
  field_repair_kit: {
    id: 'field_repair_kit',
    name: 'Field Repair Kit',
    type: 'tool',
    rarity: 'common',
    desc: 'A compact set of repair tools assembled from scavenged parts.',
    effect: { skillBonus: 'combat', bonus: 1 },
    uses: null
  },
  road_rations: {
    id: 'road_rations',
    name: 'Road Rations',
    type: 'consumable',
    rarity: 'common',
    desc: 'Pressed travel cakes made from dried grain and rendered fat.',
    effect: { skillBonus: 'survival', bonus: 1, healHp: 2 },
    uses: 1
  },
  smoke_pouch: {
    id: 'smoke_pouch',
    name: 'Smoke Pouch',
    type: 'consumable',
    rarity: 'common',
    desc: 'A cloth pouch of ash compound that produces a thick gray cloud when struck.',
    effect: { skillBonus: 'stealth', bonus: 1, encounterAdvantage: true },
    uses: 1
  },
  crude_lock_shim: {
    id: 'crude_lock_shim',
    name: 'Crude Lock Shim',
    type: 'tool',
    rarity: 'common',
    desc: 'A flat iron strip bent to work basic pin mechanisms.',
    effect: { skillBonus: 'stealth', bonus: 1 },
    uses: null
  },
  stamped_pass_copy: {
    id: 'stamped_pass_copy',
    name: 'Stamped Pass Copy',
    type: 'access',
    rarity: 'common',
    desc: 'A hand-copied transit pass with a partial registry mark.',
    effect: { skillBonus: 'persuasion', bonus: 1, context: 'checkpoint' },
    uses: 1
  },
  wax_seal: {
    id: 'wax_seal',
    name: 'Wax Seal',
    type: 'access',
    rarity: 'common',
    desc: 'A carved-stone impression pressed into cooled ritual wax.',
    effect: { skillBonus: 'persuasion', bonus: 1, unlocksForgery: true },
    uses: 1
  },
  warded_lock_pick: {
    id: 'warded_lock_pick',
    name: 'Warded Lock Pick',
    type: 'tool',
    rarity: 'uncommon',
    desc: 'A precision pick treated with shadow residue to reduce magnetic drag.',
    effect: { skillBonus: 'stealth', bonus: 2 },
    uses: 3
  },
  forged_credentials: {
    id: 'forged_credentials',
    name: 'Forged Credentials',
    type: 'access',
    rarity: 'uncommon',
    desc: 'Official-weight documents bearing a stolen patrol insignia.',
    effect: { skillBonus: 'persuasion', bonus: 2, context: 'bureaucratic' },
    uses: 1
  },
  alchemists_draught: {
    id: 'alchemists_draught',
    name: "Alchemist's Draught",
    type: 'consumable',
    rarity: 'uncommon',
    desc: 'A small flask of processed ash compound that accelerates tissue repair.',
    effect: { healHp: 6 },
    uses: 1
  },
  shadow_wrap: {
    id: 'shadow_wrap',
    name: 'Shadow Wrap',
    type: 'armor',
    rarity: 'uncommon',
    desc: 'Strips of frontier fiber treated with shadow residue, worn close to the body.',
    effect: { skillBonus: 'stealth', bonus: 1, def_bonus: 1 },
    uses: null
  },
  reinforced_blade: {
    id: 'reinforced_blade',
    name: 'Reinforced Blade',
    type: 'weapon',
    rarity: 'uncommon',
    desc: 'A short iron blade with a cord-wrapped spine for added leverage.',
    effect: { skillBonus: 'combat', bonus: 1, atk_bonus: 1 },
    uses: null
  },
  evidence_binder: {
    id: 'evidence_binder',
    name: 'Evidence Binder',
    type: 'tool',
    rarity: 'uncommon',
    desc: 'A chalk-marked folio with carved seal tabs for organizing field documents.',
    effect: { skillBonus: 'lore', bonus: 2, journalIntelBonus: true },
    uses: null
  },
  cipher_key: {
    id: 'cipher_key',
    name: 'Cipher Key',
    type: 'access',
    rarity: 'rare',
    desc: 'A compact brass device etched with shifting ward notation.',
    effect: { unlocksNpcTier: true, tierLevel: 2 },
    uses: 1
  },
  warded_blade: {
    id: 'warded_blade',
    name: 'Warded Blade',
    type: 'weapon',
    rarity: 'rare',
    desc: 'A long iron blade with veil moth wing laminate fused into the fuller.',
    effect: { atk_bonus: 2, magicalAttack: true },
    uses: null
  },
  ritual_compass: {
    id: 'ritual_compass',
    name: 'Ritual Compass',
    type: 'tool',
    rarity: 'rare',
    desc: 'A wax-sealed instrument that responds to ley alignments along established routes.',
    effect: { skillBonus: 'lore', bonus: 2, revealsRoutes: true },
    uses: null
  },
  enforcement_resin_armor: {
    id: 'enforcement_resin_armor',
    name: 'Enforcement Resin Armor',
    type: 'armor',
    rarity: 'rare',
    desc: 'Iron plates bonded with civic sealant resin, resistant to blunt force dispersal.',
    effect: { def_bonus: 2, immuneToHammerDown: true },
    uses: null
  },
  unmarked_ledger_facsimile: {
    id: 'unmarked_ledger_facsimile',
    name: 'Unmarked Ledger Facsimile',
    type: 'access',
    rarity: 'rare',
    desc: 'A hand-produced copy of a suppressed registry document, the original house crest barely legible.',
    effect: { triggersUnmarkedLedgerPath: true },
    uses: 1
  },
  veil_moth_cloak: {
    id: 'veil_moth_cloak',
    name: 'Veil Moth Cloak',
    type: 'armor',
    rarity: 'rare',
    desc: 'A layered cloak of moth wing and frontier fiber that bends ambient light at its edges.',
    effect: { skillBonus: 'stealth', bonus: 1, def_bonus: 1, stealthAdvantage: true },
    uses: null
  }
};

const CRAFT_RECIPES = [
  {
    id: 'field_repair_kit',
    name: 'Field Repair Kit',
    output: 'field_repair_kit',
    tier: 'common',
    dc: 8,
    levelReq: 2,
    materials: [{ id: 'iron_shard', qty: 1 }]
  },
  {
    id: 'road_rations',
    name: 'Road Rations',
    output: 'road_rations',
    tier: 'common',
    dc: 8,
    levelReq: 2,
    materials: [{ id: 'road_dust', qty: 2 }]
  },
  {
    id: 'smoke_pouch',
    name: 'Smoke Pouch',
    output: 'smoke_pouch',
    tier: 'common',
    dc: 8,
    levelReq: 2,
    materials: [{ id: 'ash_compound', qty: 1 }]
  },
  {
    id: 'crude_lock_shim',
    name: 'Crude Lock Shim',
    output: 'crude_lock_shim',
    tier: 'common',
    dc: 8,
    levelReq: 2,
    materials: [{ id: 'iron_shard', qty: 1 }, { id: 'debt_ledger_scraps', qty: 1 }]
  },
  {
    id: 'stamped_pass_copy',
    name: 'Stamped Pass Copy',
    output: 'stamped_pass_copy',
    tier: 'common',
    dc: 8,
    levelReq: 2,
    materials: [{ id: 'stamped_paper', qty: 2 }]
  },
  {
    id: 'wax_seal',
    name: 'Wax Seal',
    output: 'wax_seal',
    tier: 'common',
    dc: 8,
    levelReq: 2,
    materials: [{ id: 'ritual_wax', qty: 1 }, { id: 'carved_seal', qty: 1 }]
  },
  {
    id: 'warded_lock_pick',
    name: 'Warded Lock Pick',
    output: 'warded_lock_pick',
    tier: 'uncommon',
    dc: 12,
    levelReq: 4,
    materials: [{ id: 'shadow_residue', qty: 1 }, { id: 'iron_shard', qty: 1 }]
  },
  {
    id: 'forged_credentials',
    name: 'Forged Credentials',
    output: 'forged_credentials',
    tier: 'uncommon',
    dc: 12,
    levelReq: 4,
    materials: [{ id: 'patrol_insignia', qty: 1 }, { id: 'stamped_paper', qty: 2 }]
  },
  {
    id: 'alchemists_draught',
    name: "Alchemist's Draught",
    output: 'alchemists_draught',
    tier: 'uncommon',
    dc: 12,
    levelReq: 4,
    materials: [{ id: 'ash_compound', qty: 2 }]
  },
  {
    id: 'shadow_wrap',
    name: 'Shadow Wrap',
    output: 'shadow_wrap',
    tier: 'uncommon',
    dc: 12,
    levelReq: 4,
    materials: [{ id: 'shadow_residue', qty: 2 }, { id: 'frontier_fiber', qty: 1 }]
  },
  {
    id: 'reinforced_blade',
    name: 'Reinforced Blade',
    output: 'reinforced_blade',
    tier: 'uncommon',
    dc: 12,
    levelReq: 4,
    materials: [{ id: 'iron_shard', qty: 2 }, { id: 'tensile_cord', qty: 1 }]
  },
  {
    id: 'evidence_binder',
    name: 'Evidence Binder',
    output: 'evidence_binder',
    tier: 'uncommon',
    dc: 12,
    levelReq: 4,
    materials: [{ id: 'archive_chalk', qty: 1 }, { id: 'carved_seal', qty: 1 }]
  },
  {
    id: 'cipher_key',
    name: 'Cipher Key',
    output: 'cipher_key',
    tier: 'rare',
    dc: 16,
    levelReq: 7,
    materials: [{ id: 'shadow_residue', qty: 2 }, { id: 'contract_fragment', qty: 2 }]
  },
  {
    id: 'warded_blade',
    name: 'Warded Blade',
    output: 'warded_blade',
    tier: 'rare',
    dc: 16,
    levelReq: 7,
    materials: [{ id: 'iron_shard', qty: 3 }, { id: 'veil_moth_wing', qty: 1 }]
  },
  {
    id: 'ritual_compass',
    name: 'Ritual Compass',
    output: 'ritual_compass',
    tier: 'rare',
    dc: 16,
    levelReq: 7,
    materials: [{ id: 'ritual_wax', qty: 2 }, { id: 'archive_chalk', qty: 2 }]
  },
  {
    id: 'enforcement_resin_armor',
    name: 'Enforcement Resin Armor',
    output: 'enforcement_resin_armor',
    tier: 'rare',
    dc: 16,
    levelReq: 7,
    materials: [{ id: 'enforcement_resin', qty: 3 }, { id: 'iron_shard', qty: 2 }]
  },
  {
    id: 'unmarked_ledger_facsimile',
    name: 'Unmarked Ledger Facsimile',
    output: 'unmarked_ledger_facsimile',
    tier: 'rare',
    dc: 16,
    levelReq: 7,
    materials: [{ id: 'archive_chalk', qty: 2 }, { id: 'stamped_paper', qty: 3 }, { id: 'house_crest_brass', qty: 1 }]
  },
  {
    id: 'veil_moth_cloak',
    name: 'Veil Moth Cloak',
    output: 'veil_moth_cloak',
    tier: 'rare',
    dc: 16,
    levelReq: 7,
    materials: [{ id: 'veil_moth_wing', qty: 2 }, { id: 'shadow_residue', qty: 2 }, { id: 'frontier_fiber', qty: 2 }]
  }
];

function addMaterial(id, qty) {
  if (typeof G === 'undefined') return;
  if (!G.materials) G.materials = {};
  G.materials[id] = (G.materials[id] || 0) + qty;
  const mat = MATERIAL_DEFS[id];
  if (mat) showToast('Found: ' + mat.name + (qty > 1 ? ' \xd7' + qty : ''));
}

function removeMaterial(id, qty) {
  if (typeof G === 'undefined') return;
  if (!G.materials) return;
  G.materials[id] = Math.max(0, (G.materials[id] || 0) - qty);
}

function hasMaterials(recipe) {
  if (!G.materials) return false;
  return recipe.materials.every(function(m) { return (G.materials[m.id] || 0) >= m.qty; });
}

function consumeMaterials(recipe) {
  recipe.materials.forEach(function(m) { removeMaterial(m.id, m.qty); });
}

function consumeHalfMaterials(recipe) {
  recipe.materials.forEach(function(m) { removeMaterial(m.id, Math.ceil(m.qty / 2)); });
}

function getCraftableRecipes() {
  if (typeof G === 'undefined') return [];
  return CRAFT_RECIPES.filter(function(r) { return hasMaterials(r) && (G.level || 1) >= r.levelReq; });
}

function getAllRecipes() {
  return CRAFT_RECIPES;
}

function getEquippedBonus(type) {
  if (!G.equipped) return 0;
  const slot = type === 'atk' ? G.equipped.weapon : G.equipped.armor;
  if (!slot) return 0;
  const def = ITEM_DEFS[slot.id];
  if (type === 'atk') return def?.effect?.atk_bonus ?? slot.effect?.atk_bonus ?? slot.atk_bonus ?? 0;
  return def?.effect?.def_bonus ?? slot.effect?.def_bonus ?? slot.def_bonus ?? 0;
}

// ─── Block H: Stage I Item Expansion — 240 items (4 families × 3 slots × 4 chains × 5 levels) ───
Object.assign(ITEM_DEFS, {

  // ════════════════════════════════════════════════════════════════
  // COMBAT FAMILY — WEAPON
  // ════════════════════════════════════════════════════════════════

  // Chain A — Heavy (iron/steel, atk + combat)
  combat_weapon_a_1: { id: 'combat_weapon_a_1', name: 'Frontier Iron Blade', type: 'weapon', family: 'combat', chain: 'a', level: 1, rarity: 'common', effect: { atk_bonus: 1, skillBonus: 'combat', bonus: 1 } },
  combat_weapon_a_2: { id: 'combat_weapon_a_2', name: 'Road-Tempered Blade', type: 'weapon', family: 'combat', chain: 'a', level: 2, rarity: 'common', effect: { atk_bonus: 1, skillBonus: 'combat', bonus: 1 } },
  combat_weapon_a_3: { id: 'combat_weapon_a_3', name: 'Union-Stamped Sword', type: 'weapon', family: 'combat', chain: 'a', level: 3, rarity: 'uncommon', effect: { atk_bonus: 2, skillBonus: 'combat', bonus: 1 } },
  combat_weapon_a_4: { id: 'combat_weapon_a_4', name: 'Iron Accord Blade', type: 'weapon', family: 'combat', chain: 'a', level: 4, rarity: 'uncommon', effect: { atk_bonus: 2, skillBonus: 'combat', bonus: 2 } },
  combat_weapon_a_5: { id: 'combat_weapon_a_5', name: 'Garrison War Blade', type: 'weapon', family: 'combat', chain: 'a', level: 5, rarity: 'rare', effect: { atk_bonus: 3, skillBonus: 'combat', bonus: 2 } },

  // Chain B — Speed (light blades, atk + stealth)
  combat_weapon_b_1: { id: 'combat_weapon_b_1', name: 'Shiv', type: 'weapon', family: 'combat', chain: 'b', level: 1, rarity: 'common', effect: { atk_bonus: 1, skillBonus: 'stealth', bonus: 1 } },
  combat_weapon_b_2: { id: 'combat_weapon_b_2', name: 'Verdant Row Knife', type: 'weapon', family: 'combat', chain: 'b', level: 2, rarity: 'common', effect: { atk_bonus: 1, skillBonus: 'stealth', bonus: 1 } },
  combat_weapon_b_3: { id: 'combat_weapon_b_3', name: 'Shadowhands Blade', type: 'weapon', family: 'combat', chain: 'b', level: 3, rarity: 'uncommon', effect: { atk_bonus: 2, skillBonus: 'stealth', bonus: 1 } },
  combat_weapon_b_4: { id: 'combat_weapon_b_4', name: 'Quick-Draw Knife', type: 'weapon', family: 'combat', chain: 'b', level: 4, rarity: 'uncommon', effect: { atk_bonus: 2, skillBonus: 'stealth', bonus: 2 } },
  combat_weapon_b_5: { id: 'combat_weapon_b_5', name: 'Precision Strike Blade', type: 'weapon', family: 'combat', chain: 'b', level: 5, rarity: 'rare', effect: { atk_bonus: 3, skillBonus: 'stealth', bonus: 2 } },

  // Chain C — Technique (warden, atk + survival)
  combat_weapon_c_1: { id: 'combat_weapon_c_1', name: 'Warden Short Blade', type: 'weapon', family: 'combat', chain: 'c', level: 1, rarity: 'common', effect: { atk_bonus: 1, skillBonus: 'survival', bonus: 1 } },
  combat_weapon_c_2: { id: 'combat_weapon_c_2', name: 'Route Patrol Blade', type: 'weapon', family: 'combat', chain: 'c', level: 2, rarity: 'common', effect: { atk_bonus: 1, skillBonus: 'survival', bonus: 1 } },
  combat_weapon_c_3: { id: 'combat_weapon_c_3', name: 'Roadwarden Standard', type: 'weapon', family: 'combat', chain: 'c', level: 3, rarity: 'uncommon', effect: { atk_bonus: 2, skillBonus: 'survival', bonus: 1 } },
  combat_weapon_c_4: { id: 'combat_weapon_c_4', name: 'Warden Officer Blade', type: 'weapon', family: 'combat', chain: 'c', level: 4, rarity: 'uncommon', effect: { atk_bonus: 2, skillBonus: 'survival', bonus: 2 } },
  combat_weapon_c_5: { id: 'combat_weapon_c_5', name: 'Elite Warden Blade', type: 'weapon', family: 'combat', chain: 'c', level: 5, rarity: 'rare', effect: { atk_bonus: 3, skillBonus: 'survival', bonus: 2 } },

  // Chain D — Ceremonial (house-marked, atk + persuasion)
  combat_weapon_d_1: { id: 'combat_weapon_d_1', name: 'House-Marked Blade', type: 'weapon', family: 'combat', chain: 'd', level: 1, rarity: 'common', effect: { atk_bonus: 1, skillBonus: 'persuasion', bonus: 1 } },
  combat_weapon_d_2: { id: 'combat_weapon_d_2', name: 'Shelk Court Blade', type: 'weapon', family: 'combat', chain: 'd', level: 2, rarity: 'common', effect: { atk_bonus: 1, skillBonus: 'persuasion', bonus: 1 } },
  combat_weapon_d_3: { id: 'combat_weapon_d_3', name: 'Noble Presentation Sword', type: 'weapon', family: 'combat', chain: 'd', level: 3, rarity: 'uncommon', effect: { atk_bonus: 2, skillBonus: 'persuasion', bonus: 1 } },
  combat_weapon_d_4: { id: 'combat_weapon_d_4', name: 'House Shelk Ceremonial', type: 'weapon', family: 'combat', chain: 'd', level: 4, rarity: 'uncommon', effect: { atk_bonus: 2, skillBonus: 'persuasion', bonus: 2 } },
  combat_weapon_d_5: { id: 'combat_weapon_d_5', name: 'Principality Dress Sword', type: 'weapon', family: 'combat', chain: 'd', level: 5, rarity: 'rare', effect: { atk_bonus: 3, skillBonus: 'persuasion', bonus: 2 } },

  // ════════════════════════════════════════════════════════════════
  // COMBAT FAMILY — ARMOR
  // ════════════════════════════════════════════════════════════════

  // Chain A — Heavy plate (def focused)
  combat_armor_a_1: { id: 'combat_armor_a_1', name: 'Iron Plates', type: 'armor', family: 'combat', chain: 'a', level: 1, rarity: 'common', effect: { def_bonus: 1 } },
  combat_armor_a_2: { id: 'combat_armor_a_2', name: 'Riveted Iron', type: 'armor', family: 'combat', chain: 'a', level: 2, rarity: 'common', effect: { def_bonus: 1 } },
  combat_armor_a_3: { id: 'combat_armor_a_3', name: 'Garrison Plate', type: 'armor', family: 'combat', chain: 'a', level: 3, rarity: 'uncommon', effect: { def_bonus: 2 } },
  combat_armor_a_4: { id: 'combat_armor_a_4', name: 'Accord Plate', type: 'armor', family: 'combat', chain: 'a', level: 4, rarity: 'uncommon', effect: { def_bonus: 2 } },
  combat_armor_a_5: { id: 'combat_armor_a_5', name: 'Iron Accord Full Plate', type: 'armor', family: 'combat', chain: 'a', level: 5, rarity: 'rare', effect: { def_bonus: 3 } },

  // Chain B — Chain (def + survival)
  combat_armor_b_1: { id: 'combat_armor_b_1', name: 'Ring Mail', type: 'armor', family: 'combat', chain: 'b', level: 1, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'survival', bonus: 1 } },
  combat_armor_b_2: { id: 'combat_armor_b_2', name: 'Route Mail', type: 'armor', family: 'combat', chain: 'b', level: 2, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'survival', bonus: 1 } },
  combat_armor_b_3: { id: 'combat_armor_b_3', name: 'Roadwarden Mail', type: 'armor', family: 'combat', chain: 'b', level: 3, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'survival', bonus: 1 } },
  combat_armor_b_4: { id: 'combat_armor_b_4', name: 'Warden Chain', type: 'armor', family: 'combat', chain: 'b', level: 4, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'survival', bonus: 2 } },
  combat_armor_b_5: { id: 'combat_armor_b_5', name: 'Elite Warden Mail', type: 'armor', family: 'combat', chain: 'b', level: 5, rarity: 'rare', effect: { def_bonus: 3, skillBonus: 'survival', bonus: 2 } },

  // Chain C — Reinforced (def + combat)
  combat_armor_c_1: { id: 'combat_armor_c_1', name: 'Reinforced Leather', type: 'armor', family: 'combat', chain: 'c', level: 1, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'combat', bonus: 1 } },
  combat_armor_c_2: { id: 'combat_armor_c_2', name: 'Studded Leather', type: 'armor', family: 'combat', chain: 'c', level: 2, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'combat', bonus: 1 } },
  combat_armor_c_3: { id: 'combat_armor_c_3', name: 'Iron-Studded Vest', type: 'armor', family: 'combat', chain: 'c', level: 3, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'combat', bonus: 1 } },
  combat_armor_c_4: { id: 'combat_armor_c_4', name: 'Battle-Hardened Vest', type: 'armor', family: 'combat', chain: 'c', level: 4, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'combat', bonus: 2 } },
  combat_armor_c_5: { id: 'combat_armor_c_5', name: 'Combat-Grade Vest', type: 'armor', family: 'combat', chain: 'c', level: 5, rarity: 'rare', effect: { def_bonus: 3, skillBonus: 'combat', bonus: 2 } },

  // Chain D — Formal (def + persuasion)
  combat_armor_d_1: { id: 'combat_armor_d_1', name: 'House-Seal Doublet', type: 'armor', family: 'combat', chain: 'd', level: 1, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'persuasion', bonus: 1 } },
  combat_armor_d_2: { id: 'combat_armor_d_2', name: 'Court Reinforced Doublet', type: 'armor', family: 'combat', chain: 'd', level: 2, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'persuasion', bonus: 1 } },
  combat_armor_d_3: { id: 'combat_armor_d_3', name: 'Noble Guard Coat', type: 'armor', family: 'combat', chain: 'd', level: 3, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'persuasion', bonus: 1 } },
  combat_armor_d_4: { id: 'combat_armor_d_4', name: 'House Shelk Livery', type: 'armor', family: 'combat', chain: 'd', level: 4, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'persuasion', bonus: 2 } },
  combat_armor_d_5: { id: 'combat_armor_d_5', name: 'Principality Dress Guard', type: 'armor', family: 'combat', chain: 'd', level: 5, rarity: 'rare', effect: { def_bonus: 3, skillBonus: 'persuasion', bonus: 2 } },

  // ════════════════════════════════════════════════════════════════
  // COMBAT FAMILY — TOOL
  // ════════════════════════════════════════════════════════════════

  // Chain A — Combat (combat skillBonus focused)
  combat_tool_a_1: { id: 'combat_tool_a_1', name: 'Whetstone', type: 'tool', family: 'combat', chain: 'a', level: 1, rarity: 'common', effect: { skillBonus: 'combat', bonus: 1 } },
  combat_tool_a_2: { id: 'combat_tool_a_2', name: 'Route Whetstone', type: 'tool', family: 'combat', chain: 'a', level: 2, rarity: 'common', effect: { skillBonus: 'combat', bonus: 1 } },
  combat_tool_a_3: { id: 'combat_tool_a_3', name: 'Garrison Whetstone', type: 'tool', family: 'combat', chain: 'a', level: 3, rarity: 'uncommon', effect: { skillBonus: 'combat', bonus: 1 } },
  combat_tool_a_4: { id: 'combat_tool_a_4', name: 'Warden-Grade Whetstone', type: 'tool', family: 'combat', chain: 'a', level: 4, rarity: 'uncommon', effect: { skillBonus: 'combat', bonus: 2 } },
  combat_tool_a_5: { id: 'combat_tool_a_5', name: 'Elite Combat Stone', type: 'tool', family: 'combat', chain: 'a', level: 5, rarity: 'rare', effect: { skillBonus: 'combat', bonus: 2 } },

  // Chain B — Tactics (lore + combat)
  combat_tool_b_1: { id: 'combat_tool_b_1', name: 'Route Map', type: 'tool', family: 'combat', chain: 'b', level: 1, rarity: 'common', effect: { skillBonus: 'lore', bonus: 1 } },
  combat_tool_b_2: { id: 'combat_tool_b_2', name: 'Patrol Chart', type: 'tool', family: 'combat', chain: 'b', level: 2, rarity: 'common', effect: { skillBonus: 'lore', bonus: 1 } },
  combat_tool_b_3: { id: 'combat_tool_b_3', name: 'Roadwarden Intelligence Map', type: 'tool', family: 'combat', chain: 'b', level: 3, rarity: 'uncommon', effect: { skillBonus: 'lore', bonus: 1, skillBonus2: 'combat', bonus2: 1 } },
  combat_tool_b_4: { id: 'combat_tool_b_4', name: 'Warden Strategic Map', type: 'tool', family: 'combat', chain: 'b', level: 4, rarity: 'uncommon', effect: { skillBonus: 'lore', bonus: 2, skillBonus2: 'combat', bonus2: 2 } },
  combat_tool_b_5: { id: 'combat_tool_b_5', name: 'Military Intelligence Folio', type: 'tool', family: 'combat', chain: 'b', level: 5, rarity: 'rare', effect: { skillBonus: 'lore', bonus: 2, skillBonus2: 'combat', bonus2: 2 } },

  // Chain C — Supply (survival + combat)
  combat_tool_c_1: { id: 'combat_tool_c_1', name: 'Field Rations (Standard)', type: 'tool', family: 'combat', chain: 'c', level: 1, rarity: 'common', effect: { skillBonus: 'survival', bonus: 1 } },
  combat_tool_c_2: { id: 'combat_tool_c_2', name: 'Route Rations', type: 'tool', family: 'combat', chain: 'c', level: 2, rarity: 'common', effect: { skillBonus: 'survival', bonus: 1 } },
  combat_tool_c_3: { id: 'combat_tool_c_3', name: 'Garrison Rations', type: 'tool', family: 'combat', chain: 'c', level: 3, rarity: 'uncommon', effect: { skillBonus: 'survival', bonus: 1, skillBonus2: 'combat', bonus2: 1 } },
  combat_tool_c_4: { id: 'combat_tool_c_4', name: 'Extended Campaign Rations', type: 'tool', family: 'combat', chain: 'c', level: 4, rarity: 'uncommon', effect: { skillBonus: 'survival', bonus: 2, skillBonus2: 'combat', bonus2: 2 } },
  combat_tool_c_5: { id: 'combat_tool_c_5', name: 'Elite Field Kit', type: 'tool', family: 'combat', chain: 'c', level: 5, rarity: 'rare', effect: { skillBonus: 'survival', bonus: 2, skillBonus2: 'combat', bonus2: 2 } },

  // Chain D — Authority (persuasion)
  combat_tool_d_1: { id: 'combat_tool_d_1', name: 'Letter of Introduction', type: 'tool', family: 'combat', chain: 'd', level: 1, rarity: 'common', effect: { skillBonus: 'persuasion', bonus: 1 } },
  combat_tool_d_2: { id: 'combat_tool_d_2', name: 'House Shelk Papers', type: 'tool', family: 'combat', chain: 'd', level: 2, rarity: 'common', effect: { skillBonus: 'persuasion', bonus: 1 } },
  combat_tool_d_3: { id: 'combat_tool_d_3', name: 'Roadwarden Credentials', type: 'tool', family: 'combat', chain: 'd', level: 3, rarity: 'uncommon', effect: { skillBonus: 'persuasion', bonus: 1 } },
  combat_tool_d_4: { id: 'combat_tool_d_4', name: 'Warden Officer Seal', type: 'tool', family: 'combat', chain: 'd', level: 4, rarity: 'uncommon', effect: { skillBonus: 'persuasion', bonus: 2 } },
  combat_tool_d_5: { id: 'combat_tool_d_5', name: 'Principality Authorization', type: 'tool', family: 'combat', chain: 'd', level: 5, rarity: 'rare', effect: { skillBonus: 'persuasion', bonus: 2 } },

  // ════════════════════════════════════════════════════════════════
  // MAGIC FAMILY — WEAPON (implements/foci)
  // ════════════════════════════════════════════════════════════════

  // Chain A — Codex (lore focused)
  magic_weapon_a_1: { id: 'magic_weapon_a_1', name: 'Study Notes', type: 'weapon', family: 'magic', chain: 'a', level: 1, rarity: 'common', effect: { skillBonus: 'lore', bonus: 1 } },
  magic_weapon_a_2: { id: 'magic_weapon_a_2', name: 'Annotated Codex', type: 'weapon', family: 'magic', chain: 'a', level: 2, rarity: 'common', effect: { skillBonus: 'lore', bonus: 1 } },
  magic_weapon_a_3: { id: 'magic_weapon_a_3', name: 'Mimolot Scholar Text', type: 'weapon', family: 'magic', chain: 'a', level: 3, rarity: 'uncommon', effect: { skillBonus: 'lore', bonus: 1 } },
  magic_weapon_a_4: { id: 'magic_weapon_a_4', name: 'Restricted Archive Volume', type: 'weapon', family: 'magic', chain: 'a', level: 4, rarity: 'uncommon', effect: { skillBonus: 'lore', bonus: 2 } },
  magic_weapon_a_5: { id: 'magic_weapon_a_5', name: 'Tariff-Exempt Research Text', type: 'weapon', family: 'magic', chain: 'a', level: 5, rarity: 'rare', effect: { skillBonus: 'lore', bonus: 2 } },

  // Chain B — Runed (lore + atk_bonus)
  magic_weapon_b_1: { id: 'magic_weapon_b_1', name: 'Runed Rod', type: 'weapon', family: 'magic', chain: 'b', level: 1, rarity: 'common', effect: { atk_bonus: 1, skillBonus: 'lore', bonus: 1 } },
  magic_weapon_b_2: { id: 'magic_weapon_b_2', name: 'Inscribed Rod', type: 'weapon', family: 'magic', chain: 'b', level: 2, rarity: 'common', effect: { atk_bonus: 1, skillBonus: 'lore', bonus: 1 } },
  magic_weapon_b_3: { id: 'magic_weapon_b_3', name: 'Mimolot Inscribed Focus', type: 'weapon', family: 'magic', chain: 'b', level: 3, rarity: 'uncommon', effect: { atk_bonus: 2, skillBonus: 'lore', bonus: 1 } },
  magic_weapon_b_4: { id: 'magic_weapon_b_4', name: 'Archive-Runed Focus', type: 'weapon', family: 'magic', chain: 'b', level: 4, rarity: 'uncommon', effect: { atk_bonus: 2, skillBonus: 'lore', bonus: 2 } },
  magic_weapon_b_5: { id: 'magic_weapon_b_5', name: 'Tariff-Exempt Focus', type: 'weapon', family: 'magic', chain: 'b', level: 5, rarity: 'rare', effect: { atk_bonus: 3, skillBonus: 'lore', bonus: 2 } },

  // Chain C — Omen (survival + lore)
  magic_weapon_c_1: { id: 'magic_weapon_c_1', name: 'Axis Reading Stone', type: 'weapon', family: 'magic', chain: 'c', level: 1, rarity: 'common', effect: { skillBonus: 'survival', bonus: 1 } },
  magic_weapon_c_2: { id: 'magic_weapon_c_2', name: 'Dome Survey Crystal', type: 'weapon', family: 'magic', chain: 'c', level: 2, rarity: 'common', effect: { skillBonus: 'survival', bonus: 1 } },
  magic_weapon_c_3: { id: 'magic_weapon_c_3', name: 'Inversion Reading Focus', type: 'weapon', family: 'magic', chain: 'c', level: 3, rarity: 'uncommon', effect: { skillBonus: 'survival', bonus: 1, skillBonus2: 'lore', bonus2: 1 } },
  magic_weapon_c_4: { id: 'magic_weapon_c_4', name: 'Axis Data Crystal', type: 'weapon', family: 'magic', chain: 'c', level: 4, rarity: 'uncommon', effect: { skillBonus: 'survival', bonus: 2, skillBonus2: 'lore', bonus2: 2 } },
  magic_weapon_c_5: { id: 'magic_weapon_c_5', name: 'Sheresh Inversion Stone', type: 'weapon', family: 'magic', chain: 'c', level: 5, rarity: 'rare', effect: { skillBonus: 'survival', bonus: 2, skillBonus2: 'lore', bonus2: 2 } },

  // Chain D — Bound (lore + persuasion)
  magic_weapon_d_1: { id: 'magic_weapon_d_1', name: 'Covenant Token', type: 'weapon', family: 'magic', chain: 'd', level: 1, rarity: 'common', effect: { skillBonus: 'lore', bonus: 1 } },
  magic_weapon_d_2: { id: 'magic_weapon_d_2', name: 'Temple Inscription Token', type: 'weapon', family: 'magic', chain: 'd', level: 2, rarity: 'common', effect: { skillBonus: 'lore', bonus: 1 } },
  magic_weapon_d_3: { id: 'magic_weapon_d_3', name: 'Order Covenant Focus', type: 'weapon', family: 'magic', chain: 'd', level: 3, rarity: 'uncommon', effect: { skillBonus: 'lore', bonus: 1, skillBonus2: 'persuasion', bonus2: 1 } },
  magic_weapon_d_4: { id: 'magic_weapon_d_4', name: 'Divine Mandate Token', type: 'weapon', family: 'magic', chain: 'd', level: 4, rarity: 'uncommon', effect: { skillBonus: 'lore', bonus: 2, skillBonus2: 'persuasion', bonus2: 2 } },
  magic_weapon_d_5: { id: 'magic_weapon_d_5', name: 'Sacred Order Inscription', type: 'weapon', family: 'magic', chain: 'd', level: 5, rarity: 'rare', effect: { skillBonus: 'lore', bonus: 2, skillBonus2: 'persuasion', bonus2: 2 } },

  // ════════════════════════════════════════════════════════════════
  // MAGIC FAMILY — ARMOR
  // ════════════════════════════════════════════════════════════════

  // Chain A — Scholar robes (def + lore)
  magic_armor_a_1: { id: 'magic_armor_a_1', name: 'Mimolot Student Robes', type: 'armor', family: 'magic', chain: 'a', level: 1, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'lore', bonus: 1 } },
  magic_armor_a_2: { id: 'magic_armor_a_2', name: 'Scholar Robes', type: 'armor', family: 'magic', chain: 'a', level: 2, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'lore', bonus: 1 } },
  magic_armor_a_3: { id: 'magic_armor_a_3', name: 'Academy Robes', type: 'armor', family: 'magic', chain: 'a', level: 3, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'lore', bonus: 1 } },
  magic_armor_a_4: { id: 'magic_armor_a_4', name: 'Restricted Section Pass', type: 'armor', family: 'magic', chain: 'a', level: 4, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'lore', bonus: 2 } },
  magic_armor_a_5: { id: 'magic_armor_a_5', name: 'Senior Mimolot Robes', type: 'armor', family: 'magic', chain: 'a', level: 5, rarity: 'rare', effect: { def_bonus: 3, skillBonus: 'lore', bonus: 2 } },

  // Chain B — Warded (def + lore)
  magic_armor_b_1: { id: 'magic_armor_b_1', name: 'Warded Coat', type: 'armor', family: 'magic', chain: 'b', level: 1, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'lore', bonus: 1 } },
  magic_armor_b_2: { id: 'magic_armor_b_2', name: 'Inscribed Coat', type: 'armor', family: 'magic', chain: 'b', level: 2, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'lore', bonus: 1 } },
  magic_armor_b_3: { id: 'magic_armor_b_3', name: 'Archive Warded Coat', type: 'armor', family: 'magic', chain: 'b', level: 3, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'lore', bonus: 1 } },
  magic_armor_b_4: { id: 'magic_armor_b_4', name: 'Mimolot Warded Mantle', type: 'armor', family: 'magic', chain: 'b', level: 4, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'lore', bonus: 2 } },
  magic_armor_b_5: { id: 'magic_armor_b_5', name: 'Fully-Warded Robes', type: 'armor', family: 'magic', chain: 'b', level: 5, rarity: 'rare', effect: { def_bonus: 3, skillBonus: 'lore', bonus: 2 } },

  // Chain C — Commune (def + survival)
  magic_armor_c_1: { id: 'magic_armor_c_1', name: 'Commune Wool Wrap', type: 'armor', family: 'magic', chain: 'c', level: 1, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'survival', bonus: 1 } },
  magic_armor_c_2: { id: 'magic_armor_c_2', name: 'Sheresh Wool Coat', type: 'armor', family: 'magic', chain: 'c', level: 2, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'survival', bonus: 1 } },
  magic_armor_c_3: { id: 'magic_armor_c_3', name: 'Dome Commune Wrap', type: 'armor', family: 'magic', chain: 'c', level: 3, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'survival', bonus: 1 } },
  magic_armor_c_4: { id: 'magic_armor_c_4', name: 'Dome Environmental Coat', type: 'armor', family: 'magic', chain: 'c', level: 4, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'survival', bonus: 2 } },
  magic_armor_c_5: { id: 'magic_armor_c_5', name: 'Axis-Sealed Mantle', type: 'armor', family: 'magic', chain: 'c', level: 5, rarity: 'rare', effect: { def_bonus: 3, skillBonus: 'survival', bonus: 2 } },

  // Chain D — Ceremonial (def + persuasion)
  magic_armor_d_1: { id: 'magic_armor_d_1', name: 'Temple Vestment', type: 'armor', family: 'magic', chain: 'd', level: 1, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'persuasion', bonus: 1 } },
  magic_armor_d_2: { id: 'magic_armor_d_2', name: 'Order Vestment', type: 'armor', family: 'magic', chain: 'd', level: 2, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'persuasion', bonus: 1 } },
  magic_armor_d_3: { id: 'magic_armor_d_3', name: 'Panim Vestment', type: 'armor', family: 'magic', chain: 'd', level: 3, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'persuasion', bonus: 1 } },
  magic_armor_d_4: { id: 'magic_armor_d_4', name: 'Gwybodaeth Order Robe', type: 'armor', family: 'magic', chain: 'd', level: 4, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'persuasion', bonus: 2 } },
  magic_armor_d_5: { id: 'magic_armor_d_5', name: 'Sacred Archive Vestment', type: 'armor', family: 'magic', chain: 'd', level: 5, rarity: 'rare', effect: { def_bonus: 3, skillBonus: 'persuasion', bonus: 2 } },

  // ════════════════════════════════════════════════════════════════
  // MAGIC FAMILY — TOOL
  // ════════════════════════════════════════════════════════════════

  // Chain A — Research (lore focused)
  magic_tool_a_1: { id: 'magic_tool_a_1', name: 'Field Notes', type: 'tool', family: 'magic', chain: 'a', level: 1, rarity: 'common', effect: { skillBonus: 'lore', bonus: 1 } },
  magic_tool_a_2: { id: 'magic_tool_a_2', name: 'Annotated Field Notes', type: 'tool', family: 'magic', chain: 'a', level: 2, rarity: 'common', effect: { skillBonus: 'lore', bonus: 1 } },
  magic_tool_a_3: { id: 'magic_tool_a_3', name: 'Mimolot Research Summary', type: 'tool', family: 'magic', chain: 'a', level: 3, rarity: 'uncommon', effect: { skillBonus: 'lore', bonus: 1 } },
  magic_tool_a_4: { id: 'magic_tool_a_4', name: 'Classified Research Summary', type: 'tool', family: 'magic', chain: 'a', level: 4, rarity: 'uncommon', effect: { skillBonus: 'lore', bonus: 2 } },
  magic_tool_a_5: { id: 'magic_tool_a_5', name: 'Restricted Archive Summary', type: 'tool', family: 'magic', chain: 'a', level: 5, rarity: 'rare', effect: { skillBonus: 'lore', bonus: 2 } },

  // Chain B — Components (craft + lore)
  magic_tool_b_1: { id: 'magic_tool_b_1', name: 'Reagent Pouch', type: 'tool', family: 'magic', chain: 'b', level: 1, rarity: 'common', effect: { skillBonus: 'craft', bonus: 1 } },
  magic_tool_b_2: { id: 'magic_tool_b_2', name: 'Labeled Reagent Pouch', type: 'tool', family: 'magic', chain: 'b', level: 2, rarity: 'common', effect: { skillBonus: 'craft', bonus: 1 } },
  magic_tool_b_3: { id: 'magic_tool_b_3', name: 'Mimolot Reagent Set', type: 'tool', family: 'magic', chain: 'b', level: 3, rarity: 'uncommon', effect: { skillBonus: 'craft', bonus: 1, skillBonus2: 'lore', bonus2: 1 } },
  magic_tool_b_4: { id: 'magic_tool_b_4', name: 'Tariff-Exempt Reagents', type: 'tool', family: 'magic', chain: 'b', level: 4, rarity: 'uncommon', effect: { skillBonus: 'craft', bonus: 2, skillBonus2: 'lore', bonus2: 2 } },
  magic_tool_b_5: { id: 'magic_tool_b_5', name: 'Archive-Grade Reagents', type: 'tool', family: 'magic', chain: 'b', level: 5, rarity: 'rare', effect: { skillBonus: 'craft', bonus: 2, skillBonus2: 'lore', bonus2: 2 } },

  // Chain C — Divination (lore + survival)
  magic_tool_c_1: { id: 'magic_tool_c_1', name: 'Axis Barometer', type: 'tool', family: 'magic', chain: 'c', level: 1, rarity: 'common', effect: { skillBonus: 'lore', bonus: 1 } },
  magic_tool_c_2: { id: 'magic_tool_c_2', name: 'Inversion Barometer', type: 'tool', family: 'magic', chain: 'c', level: 2, rarity: 'common', effect: { skillBonus: 'lore', bonus: 1 } },
  magic_tool_c_3: { id: 'magic_tool_c_3', name: 'Dome Data Instrument', type: 'tool', family: 'magic', chain: 'c', level: 3, rarity: 'uncommon', effect: { skillBonus: 'lore', bonus: 1, skillBonus2: 'survival', bonus2: 1 } },
  magic_tool_c_4: { id: 'magic_tool_c_4', name: 'Certified Axis Instrument', type: 'tool', family: 'magic', chain: 'c', level: 4, rarity: 'uncommon', effect: { skillBonus: 'lore', bonus: 2, skillBonus2: 'survival', bonus2: 2 } },
  magic_tool_c_5: { id: 'magic_tool_c_5', name: 'Sheresh Calibrated Instrument', type: 'tool', family: 'magic', chain: 'c', level: 5, rarity: 'rare', effect: { skillBonus: 'lore', bonus: 2, skillBonus2: 'survival', bonus2: 2 } },

  // Chain D — Ritual (persuasion + lore)
  magic_tool_d_1: { id: 'magic_tool_d_1', name: 'Shrine Token', type: 'tool', family: 'magic', chain: 'd', level: 1, rarity: 'common', effect: { skillBonus: 'persuasion', bonus: 1 } },
  magic_tool_d_2: { id: 'magic_tool_d_2', name: 'Temple Offering Token', type: 'tool', family: 'magic', chain: 'd', level: 2, rarity: 'common', effect: { skillBonus: 'persuasion', bonus: 1 } },
  magic_tool_d_3: { id: 'magic_tool_d_3', name: 'Order Ritual Token', type: 'tool', family: 'magic', chain: 'd', level: 3, rarity: 'uncommon', effect: { skillBonus: 'persuasion', bonus: 1, skillBonus2: 'lore', bonus2: 1 } },
  magic_tool_d_4: { id: 'magic_tool_d_4', name: 'Panim Rite Token', type: 'tool', family: 'magic', chain: 'd', level: 4, rarity: 'uncommon', effect: { skillBonus: 'persuasion', bonus: 2, skillBonus2: 'lore', bonus2: 2 } },
  magic_tool_d_5: { id: 'magic_tool_d_5', name: 'Sacred Order Covenant Token', type: 'tool', family: 'magic', chain: 'd', level: 5, rarity: 'rare', effect: { skillBonus: 'persuasion', bonus: 2, skillBonus2: 'lore', bonus2: 2 } },

  // ════════════════════════════════════════════════════════════════
  // STEALTH FAMILY — WEAPON
  // ════════════════════════════════════════════════════════════════

  // Chain A — Shadow (stealth + atk)
  stealth_weapon_a_1: { id: 'stealth_weapon_a_1', name: 'Short Blade', type: 'weapon', family: 'stealth', chain: 'a', level: 1, rarity: 'common', effect: { atk_bonus: 1, skillBonus: 'stealth', bonus: 1 } },
  stealth_weapon_a_2: { id: 'stealth_weapon_a_2', name: 'Shadow Blade', type: 'weapon', family: 'stealth', chain: 'a', level: 2, rarity: 'common', effect: { atk_bonus: 1, skillBonus: 'stealth', bonus: 1 } },
  stealth_weapon_a_3: { id: 'stealth_weapon_a_3', name: 'Shadowhands Field Blade', type: 'weapon', family: 'stealth', chain: 'a', level: 3, rarity: 'uncommon', effect: { atk_bonus: 2, skillBonus: 'stealth', bonus: 1 } },
  stealth_weapon_a_4: { id: 'stealth_weapon_a_4', name: 'Red Hood Blade', type: 'weapon', family: 'stealth', chain: 'a', level: 4, rarity: 'uncommon', effect: { atk_bonus: 2, skillBonus: 'stealth', bonus: 2 } },
  stealth_weapon_a_5: { id: 'stealth_weapon_a_5', name: 'Red Hood Master Blade', type: 'weapon', family: 'stealth', chain: 'a', level: 5, rarity: 'rare', effect: { atk_bonus: 3, skillBonus: 'stealth', bonus: 2 } },

  // Chain B — Precision (stealth + atk)
  stealth_weapon_b_1: { id: 'stealth_weapon_b_1', name: 'Throwing Knife (3)', type: 'weapon', family: 'stealth', chain: 'b', level: 1, rarity: 'common', effect: { atk_bonus: 1, skillBonus: 'stealth', bonus: 1 } },
  stealth_weapon_b_2: { id: 'stealth_weapon_b_2', name: 'Balanced Throwing Knife', type: 'weapon', family: 'stealth', chain: 'b', level: 2, rarity: 'common', effect: { atk_bonus: 1, skillBonus: 'stealth', bonus: 1 } },
  stealth_weapon_b_3: { id: 'stealth_weapon_b_3', name: 'Red Hood Throwing Set', type: 'weapon', family: 'stealth', chain: 'b', level: 3, rarity: 'uncommon', effect: { atk_bonus: 2, skillBonus: 'stealth', bonus: 1 } },
  stealth_weapon_b_4: { id: 'stealth_weapon_b_4', name: 'Shadowhands Precision Blades', type: 'weapon', family: 'stealth', chain: 'b', level: 4, rarity: 'uncommon', effect: { atk_bonus: 2, skillBonus: 'stealth', bonus: 2 } },
  stealth_weapon_b_5: { id: 'stealth_weapon_b_5', name: 'Master Precision Set', type: 'weapon', family: 'stealth', chain: 'b', level: 5, rarity: 'rare', effect: { atk_bonus: 3, skillBonus: 'stealth', bonus: 2 } },

  // Chain C — Tool-blade (stealth + survival)
  stealth_weapon_c_1: { id: 'stealth_weapon_c_1', name: 'Boot Knife', type: 'weapon', family: 'stealth', chain: 'c', level: 1, rarity: 'common', effect: { atk_bonus: 1, skillBonus: 'stealth', bonus: 1 } },
  stealth_weapon_c_2: { id: 'stealth_weapon_c_2', name: 'Route Boot Knife', type: 'weapon', family: 'stealth', chain: 'c', level: 2, rarity: 'common', effect: { atk_bonus: 1, skillBonus: 'stealth', bonus: 1 } },
  stealth_weapon_c_3: { id: 'stealth_weapon_c_3', name: 'Caravan Boot Knife', type: 'weapon', family: 'stealth', chain: 'c', level: 3, rarity: 'uncommon', effect: { atk_bonus: 2, skillBonus: 'stealth', bonus: 1, skillBonus2: 'survival', bonus2: 1 } },
  stealth_weapon_c_4: { id: 'stealth_weapon_c_4', name: 'Frontier Tool-Blade', type: 'weapon', family: 'stealth', chain: 'c', level: 4, rarity: 'uncommon', effect: { atk_bonus: 2, skillBonus: 'stealth', bonus: 2, skillBonus2: 'survival', bonus2: 2 } },
  stealth_weapon_c_5: { id: 'stealth_weapon_c_5', name: 'Master Tool-Blade', type: 'weapon', family: 'stealth', chain: 'c', level: 5, rarity: 'rare', effect: { atk_bonus: 3, skillBonus: 'stealth', bonus: 2, skillBonus2: 'survival', bonus2: 2 } },

  // Chain D — Marked (stealth + persuasion)
  stealth_weapon_d_1: { id: 'stealth_weapon_d_1', name: 'Forgery Seal Blade', type: 'weapon', family: 'stealth', chain: 'd', level: 1, rarity: 'common', effect: { atk_bonus: 1, skillBonus: 'stealth', bonus: 1 } },
  stealth_weapon_d_2: { id: 'stealth_weapon_d_2', name: 'Notary Blade', type: 'weapon', family: 'stealth', chain: 'd', level: 2, rarity: 'common', effect: { atk_bonus: 1, skillBonus: 'stealth', bonus: 1 } },
  stealth_weapon_d_3: { id: 'stealth_weapon_d_3', name: 'Court Acquisition Blade', type: 'weapon', family: 'stealth', chain: 'd', level: 3, rarity: 'uncommon', effect: { atk_bonus: 2, skillBonus: 'stealth', bonus: 1, skillBonus2: 'persuasion', bonus2: 1 } },
  stealth_weapon_d_4: { id: 'stealth_weapon_d_4', name: 'Magi Magistratus Blade', type: 'weapon', family: 'stealth', chain: 'd', level: 4, rarity: 'uncommon', effect: { atk_bonus: 2, skillBonus: 'stealth', bonus: 2, skillBonus2: 'persuasion', bonus2: 2 } },
  stealth_weapon_d_5: { id: 'stealth_weapon_d_5', name: 'Intelligence Asset Blade', type: 'weapon', family: 'stealth', chain: 'd', level: 5, rarity: 'rare', effect: { atk_bonus: 3, skillBonus: 'stealth', bonus: 2, skillBonus2: 'persuasion', bonus2: 2 } },

  // ════════════════════════════════════════════════════════════════
  // STEALTH FAMILY — ARMOR
  // ════════════════════════════════════════════════════════════════

  // Chain A — Shadow cloth (def + stealth)
  stealth_armor_a_1: { id: 'stealth_armor_a_1', name: 'Dark Wrap', type: 'armor', family: 'stealth', chain: 'a', level: 1, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'stealth', bonus: 1 } },
  stealth_armor_a_2: { id: 'stealth_armor_a_2', name: 'Shadowhands Wrap', type: 'armor', family: 'stealth', chain: 'a', level: 2, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'stealth', bonus: 1 } },
  stealth_armor_a_3: { id: 'stealth_armor_a_3', name: 'Field Operative Wrap', type: 'armor', family: 'stealth', chain: 'a', level: 3, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'stealth', bonus: 1 } },
  stealth_armor_a_4: { id: 'stealth_armor_a_4', name: 'Red Hood Wrap', type: 'armor', family: 'stealth', chain: 'a', level: 4, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'stealth', bonus: 2 } },
  stealth_armor_a_5: { id: 'stealth_armor_a_5', name: 'Red Hood Infiltration Suit', type: 'armor', family: 'stealth', chain: 'a', level: 5, rarity: 'rare', effect: { def_bonus: 3, skillBonus: 'stealth', bonus: 2 } },

  // Chain B — Practical (def + survival)
  stealth_armor_b_1: { id: 'stealth_armor_b_1', name: 'Caravan Leather', type: 'armor', family: 'stealth', chain: 'b', level: 1, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'survival', bonus: 1 } },
  stealth_armor_b_2: { id: 'stealth_armor_b_2', name: 'Road Leather', type: 'armor', family: 'stealth', chain: 'b', level: 2, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'survival', bonus: 1 } },
  stealth_armor_b_3: { id: 'stealth_armor_b_3', name: 'Nomdara Travel Coat', type: 'armor', family: 'stealth', chain: 'b', level: 3, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'survival', bonus: 1 } },
  stealth_armor_b_4: { id: 'stealth_armor_b_4', name: 'Cross-Polity Travel Coat', type: 'armor', family: 'stealth', chain: 'b', level: 4, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'survival', bonus: 2 } },
  stealth_armor_b_5: { id: 'stealth_armor_b_5', name: 'Frontier Travel Armor', type: 'armor', family: 'stealth', chain: 'b', level: 5, rarity: 'rare', effect: { def_bonus: 3, skillBonus: 'survival', bonus: 2 } },

  // Chain C — Disguise (def + persuasion)
  stealth_armor_c_1: { id: 'stealth_armor_c_1', name: 'Merchant Coat', type: 'armor', family: 'stealth', chain: 'c', level: 1, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'persuasion', bonus: 1 } },
  stealth_armor_c_2: { id: 'stealth_armor_c_2', name: 'Guild Exchange Coat', type: 'armor', family: 'stealth', chain: 'c', level: 2, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'persuasion', bonus: 1 } },
  stealth_armor_c_3: { id: 'stealth_armor_c_3', name: 'Union Trader Coat', type: 'armor', family: 'stealth', chain: 'c', level: 3, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'persuasion', bonus: 1 } },
  stealth_armor_c_4: { id: 'stealth_armor_c_4', name: 'Senior Trader Coat', type: 'armor', family: 'stealth', chain: 'c', level: 4, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'persuasion', bonus: 2 } },
  stealth_armor_c_5: { id: 'stealth_armor_c_5', name: 'Guild Master Coat', type: 'armor', family: 'stealth', chain: 'c', level: 5, rarity: 'rare', effect: { def_bonus: 3, skillBonus: 'persuasion', bonus: 2 } },

  // Chain D — Infiltration (def + stealth)
  stealth_armor_d_1: { id: 'stealth_armor_d_1', name: 'Infiltration Harness', type: 'armor', family: 'stealth', chain: 'd', level: 1, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'stealth', bonus: 1 } },
  stealth_armor_d_2: { id: 'stealth_armor_d_2', name: 'Operative Harness', type: 'armor', family: 'stealth', chain: 'd', level: 2, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'stealth', bonus: 1 } },
  stealth_armor_d_3: { id: 'stealth_armor_d_3', name: 'Shadowhands Harness', type: 'armor', family: 'stealth', chain: 'd', level: 3, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'stealth', bonus: 1 } },
  stealth_armor_d_4: { id: 'stealth_armor_d_4', name: 'Red Hood Harness', type: 'armor', family: 'stealth', chain: 'd', level: 4, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'stealth', bonus: 2 } },
  stealth_armor_d_5: { id: 'stealth_armor_d_5', name: 'Master Infiltration Harness', type: 'armor', family: 'stealth', chain: 'd', level: 5, rarity: 'rare', effect: { def_bonus: 3, skillBonus: 'stealth', bonus: 2 } },

  // ════════════════════════════════════════════════════════════════
  // STEALTH FAMILY — TOOL
  // ════════════════════════════════════════════════════════════════

  // Chain A — Lock (stealth focused)
  stealth_tool_a_1: { id: 'stealth_tool_a_1', name: 'Pick Set (Basic)', type: 'tool', family: 'stealth', chain: 'a', level: 1, rarity: 'common', effect: { skillBonus: 'stealth', bonus: 1 } },
  stealth_tool_a_2: { id: 'stealth_tool_a_2', name: 'Shadowhands Pick Set', type: 'tool', family: 'stealth', chain: 'a', level: 2, rarity: 'common', effect: { skillBonus: 'stealth', bonus: 1 } },
  stealth_tool_a_3: { id: 'stealth_tool_a_3', name: 'Red Hood Pick Set', type: 'tool', family: 'stealth', chain: 'a', level: 3, rarity: 'uncommon', effect: { skillBonus: 'stealth', bonus: 1 } },
  stealth_tool_a_4: { id: 'stealth_tool_a_4', name: 'Precision Pick Set', type: 'tool', family: 'stealth', chain: 'a', level: 4, rarity: 'uncommon', effect: { skillBonus: 'stealth', bonus: 2 } },
  stealth_tool_a_5: { id: 'stealth_tool_a_5', name: 'Master Lock Kit', type: 'tool', family: 'stealth', chain: 'a', level: 5, rarity: 'rare', effect: { skillBonus: 'stealth', bonus: 2 } },

  // Chain B — Forgery (lore + stealth)
  stealth_tool_b_1: { id: 'stealth_tool_b_1', name: 'Blank Seal', type: 'tool', family: 'stealth', chain: 'b', level: 1, rarity: 'common', effect: { skillBonus: 'lore', bonus: 1 } },
  stealth_tool_b_2: { id: 'stealth_tool_b_2', name: 'Copy Seal', type: 'tool', family: 'stealth', chain: 'b', level: 2, rarity: 'common', effect: { skillBonus: 'lore', bonus: 1 } },
  stealth_tool_b_3: { id: 'stealth_tool_b_3', name: 'Archive Copy Seal', type: 'tool', family: 'stealth', chain: 'b', level: 3, rarity: 'uncommon', effect: { skillBonus: 'lore', bonus: 1, skillBonus2: 'stealth', bonus2: 1 } },
  stealth_tool_b_4: { id: 'stealth_tool_b_4', name: 'Tariff Office Seal Copy', type: 'tool', family: 'stealth', chain: 'b', level: 4, rarity: 'uncommon', effect: { skillBonus: 'lore', bonus: 2, skillBonus2: 'stealth', bonus2: 2 } },
  stealth_tool_b_5: { id: 'stealth_tool_b_5', name: 'Master Forgery Kit', type: 'tool', family: 'stealth', chain: 'b', level: 5, rarity: 'rare', effect: { skillBonus: 'lore', bonus: 2, skillBonus2: 'stealth', bonus2: 2 } },

  // Chain C — Scouting (survival + stealth)
  stealth_tool_c_1: { id: 'stealth_tool_c_1', name: 'Chalk Route Markers', type: 'tool', family: 'stealth', chain: 'c', level: 1, rarity: 'common', effect: { skillBonus: 'survival', bonus: 1 } },
  stealth_tool_c_2: { id: 'stealth_tool_c_2', name: 'Shadowhands Route Kit', type: 'tool', family: 'stealth', chain: 'c', level: 2, rarity: 'common', effect: { skillBonus: 'survival', bonus: 1 } },
  stealth_tool_c_3: { id: 'stealth_tool_c_3', name: 'Red Hood Scout Kit', type: 'tool', family: 'stealth', chain: 'c', level: 3, rarity: 'uncommon', effect: { skillBonus: 'survival', bonus: 1, skillBonus2: 'stealth', bonus2: 1 } },
  stealth_tool_c_4: { id: 'stealth_tool_c_4', name: 'Frontier Scout Kit', type: 'tool', family: 'stealth', chain: 'c', level: 4, rarity: 'uncommon', effect: { skillBonus: 'survival', bonus: 2, skillBonus2: 'stealth', bonus2: 2 } },
  stealth_tool_c_5: { id: 'stealth_tool_c_5', name: 'Master Scout Kit', type: 'tool', family: 'stealth', chain: 'c', level: 5, rarity: 'rare', effect: { skillBonus: 'survival', bonus: 2, skillBonus2: 'stealth', bonus2: 2 } },

  // Chain D — Social (persuasion + stealth)
  stealth_tool_d_1: { id: 'stealth_tool_d_1', name: 'False Identity Papers', type: 'tool', family: 'stealth', chain: 'd', level: 1, rarity: 'common', effect: { skillBonus: 'persuasion', bonus: 1 } },
  stealth_tool_d_2: { id: 'stealth_tool_d_2', name: 'Nomdara Travel Papers', type: 'tool', family: 'stealth', chain: 'd', level: 2, rarity: 'common', effect: { skillBonus: 'persuasion', bonus: 1 } },
  stealth_tool_d_3: { id: 'stealth_tool_d_3', name: 'Union Merchant Papers', type: 'tool', family: 'stealth', chain: 'd', level: 3, rarity: 'uncommon', effect: { skillBonus: 'persuasion', bonus: 1, skillBonus2: 'stealth', bonus2: 1 } },
  stealth_tool_d_4: { id: 'stealth_tool_d_4', name: 'Cross-Polity Cover Papers', type: 'tool', family: 'stealth', chain: 'd', level: 4, rarity: 'uncommon', effect: { skillBonus: 'persuasion', bonus: 2, skillBonus2: 'stealth', bonus2: 2 } },
  stealth_tool_d_5: { id: 'stealth_tool_d_5', name: 'Master Cover Identity', type: 'tool', family: 'stealth', chain: 'd', level: 5, rarity: 'rare', effect: { skillBonus: 'persuasion', bonus: 2, skillBonus2: 'stealth', bonus2: 2 } },

  // ════════════════════════════════════════════════════════════════
  // SUPPORT FAMILY — WEAPON (implements/tools used as primary)
  // ════════════════════════════════════════════════════════════════

  // Chain A — Medic (survival + craft)
  support_weapon_a_1: { id: 'support_weapon_a_1', name: 'Field Dressing Kit', type: 'weapon', family: 'support', chain: 'a', level: 1, rarity: 'common', effect: { skillBonus: 'survival', bonus: 1 } },
  support_weapon_a_2: { id: 'support_weapon_a_2', name: 'Roadwarden Medic Kit', type: 'weapon', family: 'support', chain: 'a', level: 2, rarity: 'common', effect: { skillBonus: 'survival', bonus: 1 } },
  support_weapon_a_3: { id: 'support_weapon_a_3', name: 'Allocation Hall Kit', type: 'weapon', family: 'support', chain: 'a', level: 3, rarity: 'uncommon', effect: { skillBonus: 'survival', bonus: 1, skillBonus2: 'craft', bonus2: 1 } },
  support_weapon_a_4: { id: 'support_weapon_a_4', name: 'Recovery Specialist Kit', type: 'weapon', family: 'support', chain: 'a', level: 4, rarity: 'uncommon', effect: { skillBonus: 'survival', bonus: 2, skillBonus2: 'craft', bonus2: 2 } },
  support_weapon_a_5: { id: 'support_weapon_a_5', name: 'Panim Recovery Kit', type: 'weapon', family: 'support', chain: 'a', level: 5, rarity: 'rare', effect: { skillBonus: 'survival', bonus: 2, skillBonus2: 'craft', bonus2: 2 } },

  // Chain B — Engineered (craft + lore)
  support_weapon_b_1: { id: 'support_weapon_b_1', name: 'Survey Instrument', type: 'weapon', family: 'support', chain: 'b', level: 1, rarity: 'common', effect: { skillBonus: 'craft', bonus: 1 } },
  support_weapon_b_2: { id: 'support_weapon_b_2', name: 'Soreheim Survey Tool', type: 'weapon', family: 'support', chain: 'b', level: 2, rarity: 'common', effect: { skillBonus: 'craft', bonus: 1 } },
  support_weapon_b_3: { id: 'support_weapon_b_3', name: 'Engineers Corps Tool', type: 'weapon', family: 'support', chain: 'b', level: 3, rarity: 'uncommon', effect: { skillBonus: 'craft', bonus: 1, skillBonus2: 'lore', bonus2: 1 } },
  support_weapon_b_4: { id: 'support_weapon_b_4', name: 'Consortium Grade Instrument', type: 'weapon', family: 'support', chain: 'b', level: 4, rarity: 'uncommon', effect: { skillBonus: 'craft', bonus: 2, skillBonus2: 'lore', bonus2: 2 } },
  support_weapon_b_5: { id: 'support_weapon_b_5', name: 'Senior Consortium Instrument', type: 'weapon', family: 'support', chain: 'b', level: 5, rarity: 'rare', effect: { skillBonus: 'craft', bonus: 2, skillBonus2: 'lore', bonus2: 2 } },

  // Chain C — Bard (persuasion + lore)
  support_weapon_c_1: { id: 'support_weapon_c_1', name: 'Performance Notes', type: 'weapon', family: 'support', chain: 'c', level: 1, rarity: 'common', effect: { skillBonus: 'persuasion', bonus: 1 } },
  support_weapon_c_2: { id: 'support_weapon_c_2', name: 'Polity Circuit Notes', type: 'weapon', family: 'support', chain: 'c', level: 2, rarity: 'common', effect: { skillBonus: 'persuasion', bonus: 1 } },
  support_weapon_c_3: { id: 'support_weapon_c_3', name: 'Trade Fair Performance Book', type: 'weapon', family: 'support', chain: 'c', level: 3, rarity: 'uncommon', effect: { skillBonus: 'persuasion', bonus: 1, skillBonus2: 'lore', bonus2: 1 } },
  support_weapon_c_4: { id: 'support_weapon_c_4', name: 'Multi-Polity Performance Folio', type: 'weapon', family: 'support', chain: 'c', level: 4, rarity: 'uncommon', effect: { skillBonus: 'persuasion', bonus: 2, skillBonus2: 'lore', bonus2: 2 } },
  support_weapon_c_5: { id: 'support_weapon_c_5', name: 'Master Performer Archive', type: 'weapon', family: 'support', chain: 'c', level: 5, rarity: 'rare', effect: { skillBonus: 'persuasion', bonus: 2, skillBonus2: 'lore', bonus2: 2 } },

  // Chain D — Sacred (persuasion + craft)
  support_weapon_d_1: { id: 'support_weapon_d_1', name: 'Shrine Blessing Token', type: 'weapon', family: 'support', chain: 'd', level: 1, rarity: 'common', effect: { skillBonus: 'persuasion', bonus: 1 } },
  support_weapon_d_2: { id: 'support_weapon_d_2', name: 'Temple Blessing Token', type: 'weapon', family: 'support', chain: 'd', level: 2, rarity: 'common', effect: { skillBonus: 'persuasion', bonus: 1 } },
  support_weapon_d_3: { id: 'support_weapon_d_3', name: 'Order Blessing Token', type: 'weapon', family: 'support', chain: 'd', level: 3, rarity: 'uncommon', effect: { skillBonus: 'persuasion', bonus: 1, skillBonus2: 'craft', bonus2: 1 } },
  support_weapon_d_4: { id: 'support_weapon_d_4', name: 'Panim Sacred Token', type: 'weapon', family: 'support', chain: 'd', level: 4, rarity: 'uncommon', effect: { skillBonus: 'persuasion', bonus: 2, skillBonus2: 'craft', bonus2: 2 } },
  support_weapon_d_5: { id: 'support_weapon_d_5', name: 'Divine Mandate Blessing', type: 'weapon', family: 'support', chain: 'd', level: 5, rarity: 'rare', effect: { skillBonus: 'persuasion', bonus: 2, skillBonus2: 'craft', bonus2: 2 } },

  // ════════════════════════════════════════════════════════════════
  // SUPPORT FAMILY — ARMOR
  // ════════════════════════════════════════════════════════════════

  // Chain A — Healer (def + survival)
  support_armor_a_1: { id: 'support_armor_a_1', name: 'Medic Tabard', type: 'armor', family: 'support', chain: 'a', level: 1, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'survival', bonus: 1 } },
  support_armor_a_2: { id: 'support_armor_a_2', name: 'Field Medic Coat', type: 'armor', family: 'support', chain: 'a', level: 2, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'survival', bonus: 1 } },
  support_armor_a_3: { id: 'support_armor_a_3', name: 'Roadwarden Medic Vest', type: 'armor', family: 'support', chain: 'a', level: 3, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'survival', bonus: 1 } },
  support_armor_a_4: { id: 'support_armor_a_4', name: 'Senior Medic Coat', type: 'armor', family: 'support', chain: 'a', level: 4, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'survival', bonus: 2 } },
  support_armor_a_5: { id: 'support_armor_a_5', name: 'Elite Medic Vest', type: 'armor', family: 'support', chain: 'a', level: 5, rarity: 'rare', effect: { def_bonus: 3, skillBonus: 'survival', bonus: 2 } },

  // Chain B — Artisan (def + craft)
  support_armor_b_1: { id: 'support_armor_b_1', name: 'Artisan Apron', type: 'armor', family: 'support', chain: 'b', level: 1, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'craft', bonus: 1 } },
  support_armor_b_2: { id: 'support_armor_b_2', name: 'Guild Artisan Coat', type: 'armor', family: 'support', chain: 'b', level: 2, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'craft', bonus: 1 } },
  support_armor_b_3: { id: 'support_armor_b_3', name: 'Artificers Guild Vest', type: 'armor', family: 'support', chain: 'b', level: 3, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'craft', bonus: 1 } },
  support_armor_b_4: { id: 'support_armor_b_4', name: 'Senior Guild Vest', type: 'armor', family: 'support', chain: 'b', level: 4, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'craft', bonus: 2 } },
  support_armor_b_5: { id: 'support_armor_b_5', name: 'Master Artisan Coat', type: 'armor', family: 'support', chain: 'b', level: 5, rarity: 'rare', effect: { def_bonus: 3, skillBonus: 'craft', bonus: 2 } },

  // Chain C — Performer (def + persuasion)
  support_armor_c_1: { id: 'support_armor_c_1', name: 'Performance Costume', type: 'armor', family: 'support', chain: 'c', level: 1, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'persuasion', bonus: 1 } },
  support_armor_c_2: { id: 'support_armor_c_2', name: 'Circuit Performer Costume', type: 'armor', family: 'support', chain: 'c', level: 2, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'persuasion', bonus: 1 } },
  support_armor_c_3: { id: 'support_armor_c_3', name: 'Trade Fair Costume', type: 'armor', family: 'support', chain: 'c', level: 3, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'persuasion', bonus: 1 } },
  support_armor_c_4: { id: 'support_armor_c_4', name: 'Polity Performer Suit', type: 'armor', family: 'support', chain: 'c', level: 4, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'persuasion', bonus: 2 } },
  support_armor_c_5: { id: 'support_armor_c_5', name: 'Senior Performer Costume', type: 'armor', family: 'support', chain: 'c', level: 5, rarity: 'rare', effect: { def_bonus: 3, skillBonus: 'persuasion', bonus: 2 } },

  // Chain D — Sanctuary (def + lore)
  support_armor_d_1: { id: 'support_armor_d_1', name: 'Temple Robe', type: 'armor', family: 'support', chain: 'd', level: 1, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'lore', bonus: 1 } },
  support_armor_d_2: { id: 'support_armor_d_2', name: 'Order Robe', type: 'armor', family: 'support', chain: 'd', level: 2, rarity: 'common', effect: { def_bonus: 1, skillBonus: 'lore', bonus: 1 } },
  support_armor_d_3: { id: 'support_armor_d_3', name: 'Cysur Temple Robe', type: 'armor', family: 'support', chain: 'd', level: 3, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'lore', bonus: 1 } },
  support_armor_d_4: { id: 'support_armor_d_4', name: 'Senior Temple Robe', type: 'armor', family: 'support', chain: 'd', level: 4, rarity: 'uncommon', effect: { def_bonus: 2, skillBonus: 'lore', bonus: 2 } },
  support_armor_d_5: { id: 'support_armor_d_5', name: 'High Order Robe', type: 'armor', family: 'support', chain: 'd', level: 5, rarity: 'rare', effect: { def_bonus: 3, skillBonus: 'lore', bonus: 2 } },

  // ════════════════════════════════════════════════════════════════
  // SUPPORT FAMILY — TOOL
  // ════════════════════════════════════════════════════════════════

  // Chain A — Medical (survival focused)
  support_tool_a_1: { id: 'support_tool_a_1', name: 'Bandage Roll', type: 'tool', family: 'support', chain: 'a', level: 1, rarity: 'common', effect: { skillBonus: 'survival', bonus: 1 } },
  support_tool_a_2: { id: 'support_tool_a_2', name: 'Medic Bandage Kit', type: 'tool', family: 'support', chain: 'a', level: 2, rarity: 'common', effect: { skillBonus: 'survival', bonus: 1 } },
  support_tool_a_3: { id: 'support_tool_a_3', name: 'Allocation Hall Medic Kit', type: 'tool', family: 'support', chain: 'a', level: 3, rarity: 'uncommon', effect: { skillBonus: 'survival', bonus: 1 } },
  support_tool_a_4: { id: 'support_tool_a_4', name: 'Senior Medic Kit', type: 'tool', family: 'support', chain: 'a', level: 4, rarity: 'uncommon', effect: { skillBonus: 'survival', bonus: 2 } },
  support_tool_a_5: { id: 'support_tool_a_5', name: 'Elite Recovery Kit', type: 'tool', family: 'support', chain: 'a', level: 5, rarity: 'rare', effect: { skillBonus: 'survival', bonus: 2 } },

  // Chain B — Engineering (craft focused)
  support_tool_b_1: { id: 'support_tool_b_1', name: 'Repair Tools (Basic)', type: 'tool', family: 'support', chain: 'b', level: 1, rarity: 'common', effect: { skillBonus: 'craft', bonus: 1 } },
  support_tool_b_2: { id: 'support_tool_b_2', name: 'Guild Repair Kit', type: 'tool', family: 'support', chain: 'b', level: 2, rarity: 'common', effect: { skillBonus: 'craft', bonus: 1 } },
  support_tool_b_3: { id: 'support_tool_b_3', name: 'Artificers Kit', type: 'tool', family: 'support', chain: 'b', level: 3, rarity: 'uncommon', effect: { skillBonus: 'craft', bonus: 1 } },
  support_tool_b_4: { id: 'support_tool_b_4', name: 'Senior Artificers Kit', type: 'tool', family: 'support', chain: 'b', level: 4, rarity: 'uncommon', effect: { skillBonus: 'craft', bonus: 2 } },
  support_tool_b_5: { id: 'support_tool_b_5', name: 'Consortium Master Kit', type: 'tool', family: 'support', chain: 'b', level: 5, rarity: 'rare', effect: { skillBonus: 'craft', bonus: 2 } },

  // Chain C — Performance (persuasion focused)
  support_tool_c_1: { id: 'support_tool_c_1', name: 'Instrument (Basic)', type: 'tool', family: 'support', chain: 'c', level: 1, rarity: 'common', effect: { skillBonus: 'persuasion', bonus: 1 } },
  support_tool_c_2: { id: 'support_tool_c_2', name: 'Circuit Instrument', type: 'tool', family: 'support', chain: 'c', level: 2, rarity: 'common', effect: { skillBonus: 'persuasion', bonus: 1 } },
  support_tool_c_3: { id: 'support_tool_c_3', name: 'Fair Performance Instrument', type: 'tool', family: 'support', chain: 'c', level: 3, rarity: 'uncommon', effect: { skillBonus: 'persuasion', bonus: 1 } },
  support_tool_c_4: { id: 'support_tool_c_4', name: 'Trade Fair Showcase Instrument', type: 'tool', family: 'support', chain: 'c', level: 4, rarity: 'uncommon', effect: { skillBonus: 'persuasion', bonus: 2 } },
  support_tool_c_5: { id: 'support_tool_c_5', name: 'Master Performance Instrument', type: 'tool', family: 'support', chain: 'c', level: 5, rarity: 'rare', effect: { skillBonus: 'persuasion', bonus: 2 } },

  // Chain D — Archive (lore focused)
  support_tool_d_1: { id: 'support_tool_d_1', name: 'Reference Pamphlet', type: 'tool', family: 'support', chain: 'd', level: 1, rarity: 'common', effect: { skillBonus: 'lore', bonus: 1 } },
  support_tool_d_2: { id: 'support_tool_d_2', name: 'Study Pamphlet', type: 'tool', family: 'support', chain: 'd', level: 2, rarity: 'common', effect: { skillBonus: 'lore', bonus: 1 } },
  support_tool_d_3: { id: 'support_tool_d_3', name: 'Academy Reference Set', type: 'tool', family: 'support', chain: 'd', level: 3, rarity: 'uncommon', effect: { skillBonus: 'lore', bonus: 1 } },
  support_tool_d_4: { id: 'support_tool_d_4', name: 'Archive Reference Collection', type: 'tool', family: 'support', chain: 'd', level: 4, rarity: 'uncommon', effect: { skillBonus: 'lore', bonus: 2 } },
  support_tool_d_5: { id: 'support_tool_d_5', name: 'Restricted Reference Archive', type: 'tool', family: 'support', chain: 'd', level: 5, rarity: 'rare', effect: { skillBonus: 'lore', bonus: 2 } }

});

window.MATERIAL_DEFS = MATERIAL_DEFS;
window.ITEM_DEFS = ITEM_DEFS;
window.CRAFT_RECIPES = CRAFT_RECIPES;
window.addMaterial = addMaterial;
window.removeMaterial = removeMaterial;
window.hasMaterials = hasMaterials;
window.consumeMaterials = consumeMaterials;
window.consumeHalfMaterials = consumeHalfMaterials;
window.getCraftableRecipes = getCraftableRecipes;
window.getAllRecipes = getAllRecipes;
window.getEquippedBonus = getEquippedBonus;
