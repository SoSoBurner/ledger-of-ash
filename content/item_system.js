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
  if (!def || !def.effect) return 0;
  return type === 'atk' ? (def.effect.atk_bonus || 0) : (def.effect.def_bonus || 0);
}

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
