/**
 * ARCHETYPE SKILLS DATABASE
 * 31 archetypes × 60 skills/traits each — 3 options per level across 20 levels
 * Tier scaling: Levels 1–4 Common, 5–8 Uncommon, 9–12 Rare, 13–16 Very Rare, 17–20 Legendary
 * Canon-safe: faction names, locality names, and NPC offices drawn from V33_1
 *
 * Entry shape:
 *   id, name, level (1–20), stage (1–5), type ('skill'|'trait'|'passive'),
 *   desc (player-facing one-line), effect (object with mechanical keys)
 *
 * effect keys used:
 *   skillBonus: {skill, bonus}           — permanent +N to skill
 *   statBonus: {stat, bonus}             — permanent +N to stat
 *   rollBonus: {skill, bonus, condition} — conditional roll bonus
 *   combatBonus: {type, value}           — passive_atk / passive_def / atk_bonus
 *   unlock: 'string'                     — signals new choice or ability access
 *   passive: 'description'               — non-numeric passive flag
 */

(function(){

// ─────────────────────────────────────────────────────────────────────────────
// WARRIOR
// Classic Combat — force, discipline, battlefield command, weapon mastery
// ─────────────────────────────────────────────────────────────────────────────
const warrior = [
  // LEVEL 1 — Common
  {id:'war_iron_stance',name:'Iron Stance',level:1,stage:1,type:'passive',desc:'Planted position reduces incoming force — +1 defense when stationary.',effect:{combatBonus:{type:'passive_def',value:1,condition:'player_stationary'}}},
  {id:'war_weapon_drill',name:'Weapon Drill',level:1,stage:1,type:'skill',desc:'Repetition sharpens the edge — +1 to combat skill.',effect:{skillBonus:{skill:'combat',bonus:1}}},
  {id:'war_field_read',name:'Field Read',level:1,stage:1,type:'passive',desc:'Read enemy posture before engaging — Wits bonus applies to first-round defense.',effect:{passive:'wits_first_round_defense'}},

  // LEVEL 2 — Common
  {id:'war_shield_grip',name:'Shield Grip',level:2,stage:1,type:'passive',desc:'Practiced guard — +1 combat roll when defending with shield.',effect:{combatBonus:{type:'passive_def',value:1}}},
  {id:'war_force_open',name:'Force Opening',level:2,stage:1,type:'skill',desc:'Drive through resistance — push_enemy effects cost no action bonus.',effect:{passive:'push_no_bonus_cost'}},
  {id:'war_endure',name:'Endure',level:2,stage:1,type:'passive',desc:'Absorb a wound without flinching — first wound each combat deals 1 less damage.',effect:{passive:'first_wound_minus1'}},

  // LEVEL 3 — Common
  {id:'war_pressure_line',name:'Pressure Line',level:3,stage:1,type:'skill',desc:'Hold the advance — +1 to combat when enemy is at close range.',effect:{rollBonus:{skill:'combat',bonus:1,condition:'distance_close'}}},
  {id:'war_roadwarden_drill',name:'Roadwarden Drill',level:3,stage:1,type:'passive',desc:'Patrol-trained — +1 survival when navigating hostile routes.',effect:{skillBonus:{skill:'survival',bonus:1}}},
  {id:'war_body_check',name:'Body Check',level:3,stage:1,type:'skill',desc:'Slam through a defensive stance — push_enemy always succeeds against standard enemies.',effect:{passive:'push_guaranteed_standard'}},

  // LEVEL 4 — Common
  {id:'war_grip_break',name:'Grip Break',level:4,stage:1,type:'passive',desc:'Wrist knowledge — disarm effects apply on successful hit without separate action.',effect:{passive:'disarm_on_hit'}},
  {id:'war_iron_will',name:'Iron Will',level:4,stage:1,type:'passive',desc:'Sustained discipline — +1 to all combat rolls in rounds 3 and beyond.',effect:{rollBonus:{skill:'combat',bonus:1,condition:'round_3plus'}}},
  {id:'war_march_pace',name:'March Pace',level:4,stage:2,type:'skill',desc:'Military march training — travel costs 1 less time unit on foot.',effect:{passive:'foot_travel_minus1_time'}},

  // LEVEL 5 — Uncommon
  {id:'war_battle_form',name:'Battle Form',level:5,stage:2,type:'passive',desc:'Optimized fighting stance — Might bonus applies to combat rolls at full value.',effect:{passive:'might_full_combat'}},
  {id:'war_intercept',name:'Intercept',level:5,stage:2,type:'skill',desc:'Step into the attack line — reaction ability: redirect one enemy attack to yourself this round.',effect:{unlock:'intercept_reaction'}},
  {id:'war_fortified',name:'Fortified',level:5,stage:2,type:'passive',desc:'Armor familiarity — +2 defense in rounds you have not moved.',effect:{combatBonus:{type:'passive_def',value:2,condition:'player_stationary'}}},

  // LEVEL 6 — Uncommon
  {id:'war_strike_rhythm',name:'Strike Rhythm',level:6,stage:2,type:'skill',desc:'Consistent tempo — each consecutive successful attack grants +1 to the next, up to +3.',effect:{passive:'consecutive_hit_chain'}},
  {id:'war_rally_nerve',name:'Rally Nerve',level:6,stage:2,type:'passive',desc:'Steady the line — companion defense +1 when you use a defense ability.',effect:{passive:'companion_def_bonus_on_defend'}},
  {id:'war_controlled_fury',name:'Controlled Fury',level:6,stage:2,type:'skill',desc:'Channel aggression deliberately — +2 attack when wounded.',effect:{combatBonus:{type:'passive_atk',value:2,condition:'player_wounded'}}},

  // LEVEL 7 — Uncommon
  {id:'war_shelk_road',name:'Shelk Road Discipline',level:7,stage:2,type:'passive',desc:'House Shelk patrol experience — +1 persuasion when dealing with House Shelk or Roadwardens.',effect:{rollBonus:{skill:'persuasion',bonus:1,condition:'faction_shelk_roadwarden'}}},
  {id:'war_steel_patience',name:'Steel Patience',level:7,stage:2,type:'passive',desc:'Wait for the right moment — +2 attack in rounds you delayed action.',effect:{passive:'delayed_action_atk_bonus'}},
  {id:'war_break_morale',name:'Break Morale',level:7,stage:2,type:'skill',desc:'Visible force of will — morale check against standard enemies triggers at half HP instead of zero.',effect:{passive:'early_morale_check'}},

  // LEVEL 8 — Uncommon
  {id:'war_veteran_read',name:'Veteran Read',level:8,stage:3,type:'passive',desc:'Anticipate the enemy pattern — reveal_intel free once per combat.',effect:{passive:'free_intel_once_combat'}},
  {id:'war_weight_of_arms',name:'Weight of Arms',level:8,stage:3,type:'skill',desc:'Might directly feeds damage — Might modifier adds to damage rolls.',effect:{passive:'might_adds_damage'}},
  {id:'war_iron_advance',name:'Iron Advance',level:8,stage:3,type:'passive',desc:'Move without giving ground — closing distance costs no action when combat begins.',effect:{passive:'free_close_on_init'}},

  // LEVEL 9 — Rare
  {id:'war_crushing_blow',name:'Crushing Blow',level:9,stage:3,type:'skill',desc:'Once per combat: double Might modifier on one attack roll.',effect:{unlock:'crushing_blow_once_combat'}},
  {id:'war_unbreakable',name:'Unbreakable',level:9,stage:3,type:'passive',desc:'Cannot be reduced below 1 HP by a single strike — minimum survival per hit.',effect:{passive:'survive_one_hit_at_1hp'}},
  {id:'war_command_line',name:'Command the Line',level:9,stage:3,type:'skill',desc:'Military command presence — +1 to all party defense when you are at close range.',effect:{passive:'party_def_bonus_close'}},

  // LEVEL 10 — Rare
  {id:'war_roadwarden_authority',name:'Roadwarden Authority',level:10,stage:3,type:'passive',desc:'Recognized enforcement credential — +2 persuasion with Roadwardens, avoid one checkpoint per locality.',effect:{rollBonus:{skill:'persuasion',bonus:2,condition:'faction_roadwarden'}}},
  {id:'war_attrition_mastery',name:'Attrition Mastery',level:10,stage:3,type:'skill',desc:'Sustained combat efficiency — no penalty to attack rolls when fatigued or wounded.',effect:{passive:'ignore_wound_attack_penalty'}},
  {id:'war_stone_ground',name:'Stone Ground',level:10,stage:3,type:'passive',desc:'Position becomes fortification — +3 defense and +1 attack when stationary for 2+ rounds.',effect:{combatBonus:{type:'passive_def',value:3,condition:'stationary_2rounds'}}},

  // LEVEL 11 — Rare
  {id:'war_weapon_seal',name:'Weapon Seal',level:11,stage:3,type:'skill',desc:'Inscribed weapon — once per scene, attack ignores enemy defense bonus.',effect:{unlock:'ignore_defense_once_scene'}},
  {id:'war_iron_company',name:'Iron Company',level:11,stage:3,type:'passive',desc:'Battlefield coordination — companions gain +1 attack on rounds you land a hit.',effect:{passive:'companion_atk_on_hit'}},
  {id:'war_endure_fire',name:'Endure Fire',level:11,stage:4,type:'passive',desc:'Tested under Roadwarden assault doctrine — fire and area damage reduced by 2.',effect:{passive:'fire_damage_minus2'}},

  // LEVEL 12 — Rare
  {id:'war_killing_form',name:'Killing Form',level:12,stage:4,type:'skill',desc:'Optimized attack sequence — once per scene, gain +4 attack on a chosen action.',effect:{unlock:'killing_form_once_scene'}},
  {id:'war_shelter_line',name:'Shelter the Line',level:12,stage:4,type:'passive',desc:'Active guardian — reduce damage to a companion by half once per combat.',effect:{unlock:'shelter_companion_once_combat'}},
  {id:'war_pressure_authority',name:'Pressure Authority',level:12,stage:4,type:'skill',desc:'Commanding presence — enemy morale checks start 1 threshold lower.',effect:{passive:'enemy_morale_dc_minus1'}},

  // LEVEL 13 — Very Rare
  {id:'war_siege_mind',name:'Siege Mind',level:13,stage:4,type:'passive',desc:'Tactical mastery — once per day, choose one enemy ability to suppress for 2 rounds.',effect:{unlock:'suppress_enemy_ability_once_day'}},
  {id:'war_iron_tide',name:'Iron Tide',level:13,stage:4,type:'skill',desc:'Coordinated assault — on a crit, all companions gain +2 attack this round.',effect:{passive:'crit_companion_atk_chain'}},
  {id:'war_veteran_wounds',name:'Veteran Wounds',level:13,stage:4,type:'passive',desc:'Scars that teach — each wound grants +1 attack (max +4).',effect:{combatBonus:{type:'passive_atk',value:'per_wound',max:4}}},

  // LEVEL 14 — Very Rare
  {id:'war_killing_field',name:'Killing Field',level:14,stage:4,type:'skill',desc:'Dominate close range — enemies at close range take -2 to attack rolls against you.',effect:{passive:'enemy_atk_penalty_close'}},
  {id:'war_unconquerable',name:'Unconquerable',level:14,stage:4,type:'passive',desc:'Legendary endurance — recover 4 HP at the start of each combat round if below half HP.',effect:{passive:'regenerate_4hp_per_round_low'}},
  {id:'war_war_road',name:'War Road Mastery',level:14,stage:5,type:'skill',desc:'Experience across all routes — travel encounters grant +2 to first combat roll.',effect:{passive:'travel_encounter_atk_bonus'}},

  // LEVEL 15 — Very Rare
  {id:'war_deathblow',name:'Deathblow',level:15,stage:4,type:'skill',desc:'Once per day: on a successful hit, deal maximum possible damage instead of rolling.',effect:{unlock:'deathblow_once_day'}},
  {id:'war_iron_legend',name:'Iron Legend',level:15,stage:5,type:'passive',desc:'Renown as a weapon — enemies with morale below 99 check at start of combat against you.',effect:{passive:'legend_morale_check'}},
  {id:'war_formation_break',name:'Formation Break',level:15,stage:5,type:'skill',desc:'Tactical disruption — once per scene, remove one enemy from the initiative order for 1 round.',effect:{unlock:'formation_break_once_scene'}},

  // LEVEL 16 — Very Rare
  {id:'war_armored_soul',name:'Armored Soul',level:16,stage:5,type:'passive',desc:'Spiritual fortification — immune to fear and morale effects.',effect:{passive:'immune_fear_morale'}},
  {id:'war_century_command',name:'Century Command',level:16,stage:5,type:'skill',desc:'Lead a field action — once per day, all companions gain +3 attack and +2 defense for 3 rounds.',effect:{unlock:'century_command_once_day'}},
  {id:'war_iron_oath',name:'Iron Oath',level:16,stage:5,type:'passive',desc:'Sworn to see it through — cannot be forcibly fled or shown mercy by enemies.',effect:{passive:'immune_enemy_mercy_flee'}}  ,

  // LEVEL 17 — Legendary
  {id:'war_titan_form',name:'Titan Form',level:17,stage:5,type:'skill',desc:'Physical perfection — Might grants +1 to combat for every 2 points above 1.',effect:{passive:'might_scaling_combat'}},
  {id:'war_wall_of_will',name:'Wall of Will',level:17,stage:5,type:'passive',desc:'Immovable presence — once per day, negate one attack that would kill you outright.',effect:{unlock:'negate_killing_blow_once_day'}},
  {id:'war_shelk_reckoning',name:'Shelk Reckoning',level:17,stage:5,type:'skill',desc:'Experienced in House Shelk territory — +3 attack and +2 defense in Shelkopolis encounters.',effect:{rollBonus:{skill:'combat',bonus:3,condition:'locality_shelkopolis'}}},

  // LEVEL 18 — Legendary
  {id:'war_siege_breaker',name:'Siege Breaker',level:18,stage:5,type:'skill',desc:'End encounters decisively — once per day, an attack deals double damage and applies all push/disarm effects simultaneously.',effect:{unlock:'siege_breaker_once_day'}},
  {id:'war_undying_line',name:'Undying Line',level:18,stage:5,type:'passive',desc:'The line does not break — if you would die, survive at 1 HP once per day.',effect:{unlock:'survive_death_once_day'}},
  {id:'war_iron_presence',name:'Iron Presence',level:18,stage:5,type:'passive',desc:'Commanding field effect — all enemies take -1 attack at the start of each round.',effect:{passive:'enemy_global_atk_minus1'}},

  // LEVEL 19 — Legendary
  {id:'war_war_mastery',name:'War Mastery',level:19,stage:5,type:'skill',desc:'Complete martial expression — combat skill effective value +3 for all tactical purposes.',effect:{skillBonus:{skill:'combat',bonus:3}}},
  {id:'war_legend_of_the_road',name:'Legend of the Road',level:19,stage:5,type:'passive',desc:'All Roadwarden and House Shelk contacts recognize you — open doors, remove warrants, gain safe passage.',effect:{passive:'roadwarden_legend_access'}},
  {id:'war_unbreakable_oath',name:'Unbreakable Oath',level:19,stage:5,type:'passive',desc:'Final resolve — once per run, prevent a total party wipe and continue at 1 HP each.',effect:{unlock:'prevent_tpk_once_run'}},

  // LEVEL 20 — Legendary
  {id:'war_titan_of_the_age',name:'Titan of the Age',level:20,stage:5,type:'passive',desc:'Name known across the Principalities — +5 to combat, Might modifier doubled, enemies below stage 4 flee on sight.',effect:{skillBonus:{skill:'combat',bonus:5}}},
  {id:'war_final_line',name:'Final Line',level:20,stage:5,type:'skill',desc:'You are the line — once per run, fight a full combat round at full HP and full stats regardless of current state.',effect:{unlock:'final_line_once_run'}},
  {id:'war_legacy_of_iron',name:'Legacy of Iron',level:20,stage:5,type:'passive',desc:'Permanent mark on the world — your route history grants +1 to all rolls in localities you have previously visited.',effect:{passive:'route_history_bonus'}}
];

// ─────────────────────────────────────────────────────────────────────────────
// KNIGHT
// Classic Combat — oath, challenge, protection, honored pressure
// ─────────────────────────────────────────────────────────────────────────────
const knight = [
  {id:'kni_oath_mark',name:'Oath Mark',level:1,stage:1,type:'passive',desc:'Sworn to a cause — +1 persuasion when upholding a stated oath.',effect:{rollBonus:{skill:'persuasion',bonus:1,condition:'oath_active'}}},
  {id:'kni_shield_law',name:'Shield Law',level:1,stage:1,type:'skill',desc:'Protection doctrine — defense ability costs no bonus action this round.',effect:{passive:'defend_no_cost'}},
  {id:'kni_challenge_presence',name:'Challenge Presence',level:1,stage:1,type:'passive',desc:'Draw attention by will alone — challenge ability applies without action cost.',effect:{passive:'challenge_free'}},
  {id:'kni_noble_bearing',name:'Noble Bearing',level:2,stage:1,type:'passive',desc:'House Shelk court training — +1 persuasion in noble and court settings.',effect:{rollBonus:{skill:'persuasion',bonus:1,condition:'noble_setting'}}},
  {id:'kni_mounted_form',name:'Mounted Form',level:2,stage:1,type:'skill',desc:'Combat on horseback — +1 attack when mounted.',effect:{rollBonus:{skill:'combat',bonus:1,condition:'mounted'}}},
  {id:'kni_intercede',name:'Intercede',level:2,stage:1,type:'passive',desc:'Step between ally and harm — redirect one attack per combat to yourself at no cost.',effect:{passive:'redirect_one_free'}},
  {id:'kni_honor_pressure',name:'Honor Pressure',level:3,stage:1,type:'skill',desc:'Oath-backed social force — +1 to persuasion when making demands backed by stated honor.',effect:{skillBonus:{skill:'persuasion',bonus:1}}},
  {id:'kni_sworn_guard',name:'Sworn Guard',level:3,stage:1,type:'passive',desc:'Protecting the named — companion defense +2 when you are adjacent.',effect:{passive:'companion_def2_adjacent'}},
  {id:'kni_armored_resolve',name:'Armored Resolve',level:3,stage:1,type:'passive',desc:'Commitment reduces fear — immune to morale effects.',effect:{passive:'immune_morale'}},
  {id:'kni_charge',name:'Charge',level:4,stage:1,type:'skill',desc:'Mounted or rushing assault — +3 attack on the first round if not yet acted.',effect:{rollBonus:{skill:'combat',bonus:3,condition:'round_1_first_action'}}},
  {id:'kni_challenge_lock',name:'Challenge Lock',level:4,stage:1,type:'passive',desc:'Enemy cannot ignore the challenge — target loses -2 attack against non-challenged targets.',effect:{passive:'challenge_target_penalty'}},
  {id:'kni_patrol_read',name:'Patrol Read',level:4,stage:2,type:'skill',desc:'Road patrol instinct — +1 survival on routes within House Shelk territory.',effect:{rollBonus:{skill:'survival',bonus:1,condition:'locality_shelk_territory'}}},
  {id:'kni_oath_bond',name:'Oath Bond',level:5,stage:2,type:'passive',desc:'Oath grants Charm — Charm modifier adds to persuasion rolls made in oath context.',effect:{passive:'charm_full_persuasion_oath'}},
  {id:'kni_shield_wall',name:'Shield Wall',level:5,stage:2,type:'skill',desc:'Coordinated defense — once per scene, grant all allies +3 defense for 1 round.',effect:{unlock:'shield_wall_once_scene'}},
  {id:'kni_war_mount',name:'War Mount',level:5,stage:2,type:'passive',desc:'Horse trained for combat — horse does not flee during encounters.',effect:{passive:'horse_combat_stable'}},
  {id:'kni_court_authority',name:'Court Authority',level:6,stage:2,type:'skill',desc:'Recognized noble title — once per locality, demand a hearing without persuasion roll.',effect:{passive:'demand_hearing_free_once_locality'}},
  {id:'kni_oath_strike_mastery',name:'Oath Strike Mastery',level:6,stage:2,type:'passive',desc:'Oath Strike costs no HP when successful.',effect:{passive:'oath_strike_free_on_hit'}},
  {id:'kni_devotion',name:'Devotion',level:6,stage:2,type:'passive',desc:'Unwavering focus — Wits modifier applies to defense when protecting a named companion.',effect:{passive:'wits_def_protecting_companion'}},
  {id:'kni_shelk_name',name:'Shelk Name Recognition',level:7,stage:2,type:'passive',desc:'Known within House Shelk social network — +2 to social rolls with Shelk-adjacent NPCs.',effect:{rollBonus:{skill:'persuasion',bonus:2,condition:'faction_shelk'}}},
  {id:'kni_shield_slam',name:'Shield Slam',level:7,stage:2,type:'skill',desc:'Weapon-shield combination — push and attack in one action once per scene.',effect:{unlock:'shield_slam_once_scene'}},
  {id:'kni_iron_honor',name:'Iron Honor',level:7,stage:2,type:'passive',desc:'Reputation as a fair fighter — +1 to Show Mercy and de-escalation rolls.',effect:{rollBonus:{skill:'persuasion',bonus:1,condition:'mercy_deescalate'}}},
  {id:'kni_veteran_challenge',name:'Veteran Challenge',level:8,stage:3,type:'skill',desc:'Challenge locks two targets simultaneously.',effect:{passive:'challenge_two_targets'}},
  {id:'kni_castle_doctrine',name:'Castle Doctrine',level:8,stage:3,type:'passive',desc:'Defensive mastery — defense bonuses stack without limit this combat.',effect:{passive:'defense_no_stack_limit'}},
  {id:'kni_auror_light',name:'Aurora Light Devotion',level:8,stage:3,type:'passive',desc:'Aurora Light Cathedral training — +1 lore when handling sacred or blessed objects.',effect:{rollBonus:{skill:'lore',bonus:1,condition:'sacred_object'}}},
  {id:'kni_oath_armor',name:'Oath Armor',level:9,stage:3,type:'passive',desc:'Oath becomes shield — current oath adds its number of days to defense bonus once per combat.',effect:{passive:'oath_day_defense'}},
  {id:'kni_guardian_of_the_line',name:'Guardian of the Line',level:9,stage:3,type:'skill',desc:'Once per scene, reduce all damage to companions to zero for one round.',effect:{unlock:'guardian_line_once_scene'}},
  {id:'kni_shelk_seal',name:'Shelk Seal',level:9,stage:3,type:'passive',desc:'Legitimate House Shelk documentation — bypass one checkpoint per region per session.',effect:{passive:'checkpoint_bypass_once_region'}},
  {id:'kni_smite_mastery',name:'Smite Mastery',level:10,stage:3,type:'skill',desc:'Smite costs 2 HP less (minimum 1) and rolls at +1.',effect:{passive:'smite_cheaper_better'}},
  {id:'kni_protect_the_realm',name:'Protect the Realm',level:10,stage:3,type:'passive',desc:'Civic authority acknowledgment — +2 to all social rolls with Imperial contacts.',effect:{rollBonus:{skill:'persuasion',bonus:2,condition:'faction_imperial'}}},
  {id:'kni_mounted_charge_master',name:'Mounted Charge Mastery',level:10,stage:3,type:'skill',desc:'Horse charge deals bonus damage equal to distance traveled this round.',effect:{passive:'mounted_charge_distance_bonus'}},
  {id:'kni_oath_of_iron',name:'Oath of Iron',level:11,stage:3,type:'passive',desc:'Stated oath cannot be broken by magical compulsion.',effect:{passive:'immune_oath_compulsion'}},
  {id:'kni_honor_guard',name:'Honor Guard',level:11,stage:3,type:'skill',desc:'Once per day, grant a companion full HP recovery and +3 defense for 1 round.',effect:{unlock:'honor_guard_once_day'}},
  {id:'kni_challenge_three',name:'Challenge Three',level:11,stage:4,type:'passive',desc:'Challenge extends to all enemies in close range.',effect:{passive:'challenge_all_close'}},
  {id:'kni_killing_oath',name:'Killing Oath',level:12,stage:4,type:'skill',desc:'Declare a target — +4 attack and +2 damage against named target until combat ends.',effect:{unlock:'killing_oath_target'}},
  {id:'kni_iron_covenant',name:'Iron Covenant',level:12,stage:4,type:'passive',desc:'Legendary authority — House Shelk and allied factions automatically recognize stated oaths.',effect:{passive:'auto_oath_recognition'}},
  {id:'kni_mounted_guardian',name:'Mounted Guardian',level:12,stage:4,type:'skill',desc:'Horse carries defensive aura — mounted companions gain +2 defense.',effect:{passive:'mounted_companion_def'}},
  {id:'kni_legend_knight',name:'Legend Knight',level:13,stage:4,type:'passive',desc:'Name known in all noble houses — open one gate per stage without persuasion.',effect:{passive:'noble_gate_free_once_stage'}},
  {id:'kni_oath_shield',name:'Oath Shield',level:13,stage:4,type:'skill',desc:'Once per day, become immune to all damage for 1 round.',effect:{unlock:'oath_shield_once_day'}},
  {id:'kni_realm_authority',name:'Realm Authority',level:13,stage:4,type:'passive',desc:'Imperial recognition — warrants against you are delayed 1 day before execution.',effect:{passive:'warrant_delay_1day'}},
  {id:'kni_devout_presence',name:'Devout Presence',level:14,stage:4,type:'passive',desc:'Spiritual discipline — Spirit modifier adds to persuasion in sacred locations.',effect:{passive:'spirit_persuasion_sacred'}},
  {id:'kni_final_challenge',name:'Final Challenge',level:14,stage:4,type:'skill',desc:'Once per scene, force all enemies to target only you for 2 rounds.',effect:{unlock:'final_challenge_once_scene'}},
  {id:'kni_armored_soul2',name:'Armored Soul',level:14,stage:5,type:'passive',desc:'Oath makes flesh iron — +5 maximum HP.',effect:{passive:'hp_bonus_5'}},
  {id:'kni_oath_of_the_age',name:'Oath of the Age',level:15,stage:5,type:'skill',desc:'Name and oath recognized across all five stages — +3 to all social rolls.',effect:{skillBonus:{skill:'persuasion',bonus:3}}},
  {id:'kni_eternal_guard',name:'Eternal Guard',level:15,stage:5,type:'passive',desc:'Never truly alone — companions cannot be killed in combats you are present for (survive at 1 HP).',effect:{passive:'companions_survive_1hp'}},
  {id:'kni_castle_wall',name:'Castle Wall',level:15,stage:5,type:'passive',desc:'Living fortification — +4 defense, stackable.',effect:{combatBonus:{type:'passive_def',value:4}}},
  {id:'kni_sovereign_oath',name:'Sovereign Oath',level:16,stage:5,type:'skill',desc:'Once per day, state an oath that functions as a binding legal document in the Principalities.',effect:{unlock:'sovereign_oath_legal_once_day'}},
  {id:'kni_iron_guardian',name:'Iron Guardian',level:16,stage:5,type:'passive',desc:'Guardian of the realm — damage to companions redirected to you at half value.',effect:{passive:'redirect_companion_damage_half'}},
  {id:'kni_shelk_legacy',name:'Shelk Legacy',level:16,stage:5,type:'passive',desc:'Intertwined with House Shelk history — House Shelk aftermath does not reduce your social standing.',effect:{passive:'immune_shelk_aftermath_penalty'}},
  {id:'kni_perfect_guard',name:'Perfect Guard',level:17,stage:5,type:'skill',desc:'Mastery of defense — once per day, negate a killing blow against yourself or a companion.',effect:{unlock:'perfect_guard_negate_killing'}},
  {id:'kni_oath_eternity',name:'Oath of Eternity',level:17,stage:5,type:'passive',desc:'The oath outlasts the body — stated oaths persist after death and bind heirs.',effect:{passive:'oath_post_death_binding'}},
  {id:'kni_legendary_charge',name:'Legendary Charge',level:17,stage:5,type:'skill',desc:'Final mounted assault — once per run, deal triple damage on a charge.',effect:{unlock:'legendary_charge_once_run'}},
  {id:'kni_warden_of_ages',name:'Warden of Ages',level:18,stage:5,type:'passive',desc:'A knight of all stages — +2 to combat and persuasion permanently.',effect:{skillBonus:{skill:'combat',bonus:2}}},
  {id:'kni_eternal_oath',name:'Eternal Oath',level:18,stage:5,type:'skill',desc:'Oath becomes law — factions that witness the oath are bound to non-aggression for 30 days.',effect:{unlock:'faction_bind_oath'}},
  {id:'kni_shield_of_the_realm',name:'Shield of the Realm',level:18,stage:5,type:'passive',desc:'Universally recognized — no hostile faction will attack first without cause.',effect:{passive:'universal_non_aggression'}},
  {id:'kni_champion',name:'Champion',level:19,stage:5,type:'skill',desc:'Formally recognized champion — +4 to combat and persuasion, enemies with morale check automatically.',effect:{skillBonus:{skill:'combat',bonus:4}}},
  {id:'kni_immortal_guard',name:'Immortal Guard',level:19,stage:5,type:'passive',desc:'Transcendent duty — once per run, survive death with 1 HP and full ability usage.',effect:{unlock:'survive_death_full_reset'}},
  {id:'kni_legend_of_shelk',name:'Legend of Shelk',level:19,stage:5,type:'passive',desc:'Name woven into House Shelk history — post-Shelkopolis events treat you as a canonical hero.',effect:{passive:'shelk_canonical_hero'}},
  {id:'kni_eternal_champion',name:'Eternal Champion',level:20,stage:5,type:'passive',desc:'Apex protector — all companions gain +3 attack and +3 defense permanently while in party.',effect:{passive:'companion_permanent_bonus3'}},
  {id:'kni_realm_saved',name:'Realm Saved',level:20,stage:5,type:'skill',desc:'Once per run, end any combat with zero casualties on your side.',effect:{unlock:'zero_casualty_end_once_run'}},
  {id:'kni_final_oath',name:'Final Oath',level:20,stage:5,type:'passive',desc:'Oath fulfilled — +6 to persuasion and +4 to combat permanently.',effect:{skillBonus:{skill:'persuasion',bonus:6}}}
];

// ─────────────────────────────────────────────────────────────────────────────
// RANGER
// Classic Combat — route-reading, precision, terrain mastery, wilderness survival
// ─────────────────────────────────────────────────────────────────────────────
const ranger = [
  {id:'ran_track',name:'Track',level:1,stage:1,type:'skill',desc:'Read ground for passage signs — +1 survival when tracking in wilderness or road environments.',effect:{skillBonus:{skill:'survival',bonus:1}}},
  {id:'ran_clear_shot',name:'Clear Shot',level:1,stage:1,type:'passive',desc:'Patient aim — marked_shot costs no action penalty.',effect:{passive:'marked_shot_free'}},
  {id:'ran_terrain_read',name:'Terrain Read',level:1,stage:1,type:'passive',desc:'Read battlefield terrain before engaging — +1 defense in the first round at a new location.',effect:{combatBonus:{type:'passive_def',value:1,condition:'first_round_new_location'}}},
  {id:'ran_route_sense',name:'Route Sense',level:2,stage:1,type:'skill',desc:'Instinctive direction — travel encounters are detected 1 round before triggering.',effect:{passive:'travel_encounter_early_warning'}},
  {id:'ran_forest_step',name:'Forest Step',level:2,stage:1,type:'passive',desc:'Silent movement — +1 stealth in wilderness locations.',effect:{rollBonus:{skill:'stealth',bonus:1,condition:'wilderness'}}},
  {id:'ran_pinning_expertise',name:'Pinning Expertise',level:2,stage:1,type:'skill',desc:'Pinning shot costs 1 less action to set up.',effect:{passive:'pinning_setup_free'}},
  {id:'ran_hazard_eye',name:'Hazard Eye',level:3,stage:1,type:'passive',desc:'Spot environmental threats before they act — hazard damage reduced by 2.',effect:{passive:'hazard_damage_minus2'}},
  {id:'ran_shelk_route',name:'Shelk Route Knowledge',level:3,stage:1,type:'skill',desc:'Intimate knowledge of House Shelk road systems — +1 survival in Shelk territory.',effect:{rollBonus:{skill:'survival',bonus:1,condition:'shelk_territory'}}},
  {id:'ran_distance_advantage',name:'Distance Advantage',level:3,stage:1,type:'passive',desc:'Preferred range is far — +1 attack at far and very far range.',effect:{rollBonus:{skill:'combat',bonus:1,condition:'distance_far'}}},
  {id:'ran_camp_scout',name:'Camp Scout',level:4,stage:1,type:'skill',desc:'Scout ahead without triggering encounter — scouting prevents 1 encounter per day.',effect:{passive:'scout_prevent_encounter'}},
  {id:'ran_finesse_strike',name:'Finesse Strike',level:4,stage:1,type:'passive',desc:'Finesse feeds precision — Finesse modifier adds to attack rolls at medium and far range.',effect:{passive:'finesse_ranged_attack'}},
  {id:'ran_wilderness_camp',name:'Wilderness Camp',level:4,stage:2,type:'skill',desc:'Rest anywhere safely — camp actions available in wilderness locations.',effect:{passive:'wilderness_camp_actions'}},
  {id:'ran_apex_predator',name:'Apex Predator',level:5,stage:2,type:'passive',desc:'Hunting mindset — +2 attack against creature-type enemies.',effect:{rollBonus:{skill:'combat',bonus:2,condition:'enemy_creature_type'}}},
  {id:'ran_vantage_point',name:'Vantage Point',level:5,stage:2,type:'skill',desc:'Exploit elevation — once per combat, move to vantage for +3 attack at far range.',effect:{unlock:'vantage_point_once_combat'}},
  {id:'ran_route_memory',name:'Route Memory',level:5,stage:2,type:'passive',desc:'Visited routes are mapped — travel time to previously visited localities halved.',effect:{passive:'halve_travel_time_visited'}},
  {id:'ran_evasion',name:'Evasion',level:6,stage:2,type:'skill',desc:'Difficult to pin down — once per scene, evade one attack automatically.',effect:{unlock:'evasion_once_scene'}},
  {id:'ran_night_sight',name:'Night Sight',level:6,stage:2,type:'passive',desc:'Trained in low-light conditions — no penalty at night or in darkness.',effect:{passive:'no_darkness_penalty'}},
  {id:'ran_companion_scout',name:'Companion Scout',level:6,stage:2,type:'skill',desc:'Share scouting report with companions — companions gain +1 to all rolls for 1 round after scout.',effect:{passive:'scout_companion_bonus'}},
  {id:'ran_marked_kill',name:'Marked Kill',level:7,stage:2,type:'passive',desc:'Marked target takes +2 damage on hit.',effect:{passive:'marked_target_damage_bonus'}},
  {id:'ran_survival_expert',name:'Survival Expert',level:7,stage:2,type:'skill',desc:'Environmental mastery — +2 survival in any hazard check.',effect:{skillBonus:{skill:'survival',bonus:2}}},
  {id:'ran_long_range',name:'Long Range',level:7,stage:2,type:'passive',desc:'Extended effective range — attack without penalty at very far range.',effect:{passive:'no_very_far_penalty'}},
  {id:'ran_animal_reading',name:'Animal Reading',level:8,stage:3,type:'skill',desc:'Understand creature behavior — avoid creature ambushes entirely.',effect:{passive:'avoid_creature_ambush'}},
  {id:'ran_precision_aim',name:'Precision Aim',level:8,stage:3,type:'passive',desc:'Patient readiness — +3 attack when stationary for 1 full round.',effect:{rollBonus:{skill:'combat',bonus:3,condition:'player_stationary_1round'}}},
  {id:'ran_route_captain',name:'Route Captain',level:8,stage:3,type:'skill',desc:'Leadership on the road — +1 to companion survival and travel rolls.',effect:{passive:'companion_survival_bonus'}},
  {id:'ran_killing_shot',name:'Killing Shot',level:9,stage:3,type:'skill',desc:'Once per scene, attack ignores enemy defense entirely.',effect:{unlock:'killing_shot_once_scene'}},
  {id:'ran_terrain_master',name:'Terrain Master',level:9,stage:3,type:'passive',desc:'Exploit any ground — environmental hazards grant +2 attack instead of dealing damage.',effect:{passive:'hazard_attack_conversion'}},
  {id:'ran_wolf_pack',name:'Wolf Pack',level:9,stage:3,type:'skill',desc:'Coordinate companions for flanking — companions gain +2 attack when you are at far range.',effect:{passive:'companion_flank_bonus_far'}},
  {id:'ran_finesse_mastery',name:'Finesse Mastery',level:10,stage:3,type:'passive',desc:'Finesse at peak — Finesse modifier doubled for stealth and precision attack checks.',effect:{passive:'finesse_doubled'}},
  {id:'ran_ghost_trail',name:'Ghost Trail',level:10,stage:3,type:'skill',desc:'Leave no trace — travel does not raise local heat.',effect:{passive:'travel_no_heat'}},
  {id:'ran_route_guardian',name:'Route Guardian',level:10,stage:3,type:'passive',desc:'Protect the path — companions take 1 less damage from route encounters.',effect:{passive:'companion_route_protection'}},
  {id:'ran_apex_hunter',name:'Apex Hunter',level:11,stage:3,type:'skill',desc:'Designation — named target in combat takes +3 damage from all your attacks.',effect:{unlock:'apex_hunt_target_plus3'}},
  {id:'ran_silent_kill',name:'Silent Kill',level:11,stage:3,type:'passive',desc:'Assassination from concealment deals max damage.',effect:{passive:'concealed_max_damage'}},
  {id:'ran_patrol_network',name:'Patrol Network',level:11,stage:4,type:'skill',desc:'Know all active patrols — avoid or exploit enforcement presence in any locality.',effect:{passive:'patrol_network_access'}},
  {id:'ran_storm_walker',name:'Storm Walker',level:12,stage:4,type:'passive',desc:'Undeterred by weather — no penalties in rain, fog, or storm conditions.',effect:{passive:'no_weather_penalty'}},
  {id:'ran_predator_form',name:'Predator Form',level:12,stage:4,type:'skill',desc:'Once per day, all attacks this scene crit on 18-20.',effect:{unlock:'expanded_crit_once_day'}},
  {id:'ran_deep_wilderness',name:'Deep Wilderness',level:12,stage:4,type:'passive',desc:'Elemental planet transit training — no penalties in stage 5 elemental localities.',effect:{passive:'no_elemental_penalty'}},
  {id:'ran_immortal_aim',name:'Immortal Aim',level:13,stage:4,type:'skill',desc:'Cannot miss — once per day, one attack automatically hits regardless of defense.',effect:{unlock:'auto_hit_once_day'}},
  {id:'ran_trackers_legend',name:"Tracker's Legend",level:13,stage:4,type:'passive',desc:'Instinctive mastery — survival rolls never fumble.',effect:{passive:'survival_no_fumble'}},
  {id:'ran_forest_commander',name:'Forest Commander',level:13,stage:4,type:'skill',desc:'Command all companions in open terrain — everyone +2 attack and +1 defense.',effect:{passive:'open_terrain_party_bonus'}},
  {id:'ran_killing_ground',name:'Killing Ground',level:14,stage:4,type:'passive',desc:'Chosen terrain becomes a killing field — +4 attack after 2 stationary rounds.',effect:{rollBonus:{skill:'combat',bonus:4,condition:'stationary_2rounds'}}},
  {id:'ran_shadow_of_the_route',name:'Shadow of the Route',level:14,stage:4,type:'skill',desc:'Invisible to patrol systems — once per stage, remove yourself from all wanted lists.',effect:{passive:'clear_wanted_once_stage'}},
  {id:'ran_beast_bond',name:'Beast Bond',level:14,stage:5,type:'passive',desc:'Horse is a combat partner — horse deals 3 damage per round and gains your defense bonus.',effect:{passive:'horse_combat_partner'}},
  {id:'ran_apex_of_the_age',name:'Apex of the Age',level:15,stage:5,type:'skill',desc:'Greatest living hunter — +3 to all combat and survival rolls permanently.',effect:{skillBonus:{skill:'survival',bonus:3}}},
  {id:'ran_veil_walk',name:'Veil Walk',level:15,stage:5,type:'passive',desc:'Move unseen in any terrain — stealth in open terrain without penalty.',effect:{passive:'stealth_open_terrain_free'}},
  {id:'ran_route_of_shadows',name:'Route of Shadows',level:15,stage:5,type:'skill',desc:'Travel the umbral paths — reduce travel time to zero once per day.',effect:{unlock:'zero_travel_time_once_day'}},
  {id:'ran_sovereign_aim',name:'Sovereign Aim',level:16,stage:5,type:'passive',desc:'Legendary precision — critical hits deal triple damage.',effect:{passive:'crit_triple_damage'}},
  {id:'ran_world_walker',name:'World Walker',level:16,stage:5,type:'skill',desc:'Traverse elemental localities without a guide — all stage 5 localities accessible from any node.',effect:{passive:'elemental_direct_access'}},
  {id:'ran_phantom_route',name:'Phantom Route',level:16,stage:5,type:'passive',desc:'Untrackable — travel encounters do not occur when you choose the route.',effect:{passive:'no_travel_encounters'}},
  {id:'ran_killing_apex',name:'Killing Apex',level:17,stage:5,type:'skill',desc:'Once per run, kill any non-boss enemy automatically.',effect:{unlock:'instant_kill_once_run'}},
  {id:'ran_eternal_hunt',name:'Eternal Hunt',level:17,stage:5,type:'passive',desc:'Never stop — once per day, continue combat after defeat with 1 HP.',effect:{unlock:'continue_after_defeat_once_day'}},
  {id:'ran_legend_of_routes',name:'Legend of Routes',level:17,stage:5,type:'skill',desc:'Route mastery — all route hazard rolls auto-succeed.',effect:{passive:'route_hazard_auto_succeed'}},
  {id:'ran_world_apex',name:'World Apex',level:18,stage:5,type:'passive',desc:'Combat supremacy — +5 to attack, crits on 18-20 permanently.',effect:{skillBonus:{skill:'combat',bonus:5}}},
  {id:'ran_ghost_of_the_plains',name:'Ghost of the Plains',level:18,stage:5,type:'skill',desc:'Legendary invisibility — enemies at far range cannot detect you.',effect:{passive:'invisible_at_far'}},
  {id:'ran_eternal_ranger',name:'Eternal Ranger',level:18,stage:5,type:'passive',desc:'Cannot be surprised — enemies never gain surprise attack bonus against you.',effect:{passive:'immune_surprise'}},
  {id:'ran_immortal_hunter',name:'Immortal Hunter',level:19,stage:5,type:'skill',desc:'Legendary status — once per run, call all allies to your position instantly.',effect:{unlock:'recall_allies_once_run'}},
  {id:'ran_finesse_apex',name:'Finesse Apex',level:19,stage:5,type:'passive',desc:'Physical perfection — Finesse modifier tripled for all precision checks.',effect:{passive:'finesse_tripled'}},
  {id:'ran_last_arrow',name:'Last Arrow',level:19,stage:5,type:'skill',desc:'Once per run, attack deals damage equal to target\'s full HP — instantly kills if successful.',effect:{unlock:'last_arrow_once_run'}},
  {id:'ran_legend_of_the_world',name:'Legend of the World',level:20,stage:5,type:'passive',desc:'Name known across all localities including elemental — +5 to survival, no terrain penalties anywhere.',effect:{skillBonus:{skill:'survival',bonus:5}}},
  {id:'ran_perfect_hunt',name:'Perfect Hunt',level:20,stage:5,type:'skill',desc:'Once per run, entire party gains your attack and survival bonuses for 1 combat.',effect:{unlock:'share_bonuses_party_once_run'}},
  {id:'ran_world_ranger',name:'World Ranger',level:20,stage:5,type:'passive',desc:'Ultimate route mastery — travel to any locality in the known world for free once per day.',effect:{passive:'teleport_travel_once_day'}}
];

// ─────────────────────────────────────────────────────────────────────────────
// Helper: build remaining archetypes efficiently using the same 60-entry structure
// Each archetype below follows the same tier pattern.
// ─────────────────────────────────────────────────────────────────────────────

function buildSkills(archetypeId, entries){
  return entries.map((e,i)=>({...e, id:`${archetypeId}_${e.id||'s'+i}`}));
}

// ─────────────────────────────────────────────────────────────────────────────
// PALADIN — sacred resolve, lore, divine support, costly commitment
// ─────────────────────────────────────────────────────────────────────────────
const paladin = buildSkills('pal',[
  {id:'smite_eff',name:'Smite Efficiency',level:1,stage:1,type:'passive',desc:'Smite costs 2 fewer HP.',effect:{passive:'smite_hp_minus2'}},
  {id:'lore_sight',name:'Lore Sight',level:1,stage:1,type:'skill',desc:'+1 to lore on sacred or magical subjects.',effect:{skillBonus:{skill:'lore',bonus:1}}},
  {id:'divine_ward',name:'Divine Ward',level:1,stage:1,type:'passive',desc:'+1 defense when oaths are active.',effect:{combatBonus:{type:'passive_def',value:1,condition:'oath_active'}}},
  {id:'panim_doctrine',name:'Panim Doctrine',level:2,stage:1,type:'skill',desc:'Panim Haven clerical training — +1 persuasion at shrines.',effect:{rollBonus:{skill:'persuasion',bonus:1,condition:'shrine'}}},
  {id:'sacred_endure',name:'Sacred Endurance',level:2,stage:1,type:'passive',desc:'Vigor feeds resilience — Vigor modifier adds to HP maximum.',effect:{passive:'vigor_hp_bonus'}},
  {id:'blessed_armor',name:'Blessed Armor',level:2,stage:1,type:'passive',desc:'+1 defense in localities with active shrines.',effect:{rollBonus:{skill:'combat',bonus:0,condition:'shrine_locality'}}},
  {id:'oracle_lore',name:'Oracle Lore',level:3,stage:1,type:'skill',desc:'+1 lore when investigating supernatural or omen signs.',effect:{rollBonus:{skill:'lore',bonus:1,condition:'omen_investigation'}}},
  {id:'lay_hands',name:'Lay Hands',level:3,stage:1,type:'skill',desc:'Heal a companion for 4 HP once per scene outside combat.',effect:{unlock:'lay_hands_once_scene'}},
  {id:'divine_pressure',name:'Divine Pressure',level:3,stage:1,type:'passive',desc:'Presence is sacred — undead and infernal enemies check morale at start of combat.',effect:{passive:'infernal_morale_check_start'}},
  {id:'channel_commitment',name:'Channel Commitment',level:4,stage:1,type:'skill',desc:'Spend HP to guarantee a lore check once per scene.',effect:{unlock:'hp_for_lore_guarantee'}},
  {id:'spirit_bond',name:'Spirit Bond',level:4,stage:1,type:'passive',desc:'Spirit modifier adds to lore rolls.',effect:{passive:'spirit_full_lore'}},
  {id:'shrine_network',name:'Shrine Network',level:4,stage:2,type:'skill',desc:'Connected to Panim Haven shrine network — safe passage through sacred territories.',effect:{passive:'shrine_safe_passage'}},
  {id:'holy_strike',name:'Holy Strike',level:5,stage:2,type:'skill',desc:'+2 attack against infernal or undead enemies.',effect:{rollBonus:{skill:'combat',bonus:2,condition:'enemy_infernal_undead'}}},
  {id:'divine_focus',name:'Divine Focus',level:5,stage:2,type:'passive',desc:'Lore checks in combat cost no action once per scene.',effect:{passive:'lore_free_once_scene'}},
  {id:'ward_pulse',name:'Ward Pulse',level:5,stage:2,type:'skill',desc:'Once per scene emit a ward — enemies at close range take -2 attack for 1 round.',effect:{unlock:'ward_pulse_once_scene'}},
  {id:'aura_of_resolve',name:'Aura of Resolve',level:6,stage:2,type:'passive',desc:'Companions within close range gain +1 defense.',effect:{passive:'companion_def_aura'}},
  {id:'sacred_knowledge',name:'Sacred Knowledge',level:6,stage:2,type:'skill',desc:'+2 to lore when identifying magical or divine items.',effect:{rollBonus:{skill:'lore',bonus:2,condition:'magical_item'}}},
  {id:'consecrate',name:'Consecrate',level:6,stage:2,type:'skill',desc:'Once per day, make a location spiritually hostile to infernal enemies (+3 damage to all infernal).',effect:{unlock:'consecrate_once_day'}},
  {id:'divine_armor',name:'Divine Armor',level:7,stage:2,type:'passive',desc:'Spirit feeds protection — Spirit modifier adds to defense.',effect:{passive:'spirit_defense_bonus'}},
  {id:'lore_mastery',name:'Lore Mastery',level:7,stage:2,type:'skill',desc:'+1 to all lore rolls permanently.',effect:{skillBonus:{skill:'lore',bonus:1}}},
  {id:'sacred_oath',name:'Sacred Oath',level:7,stage:2,type:'passive',desc:'Oath breaks trigger divine warning — 1 free attack when oath is broken against you.',effect:{passive:'oath_break_free_attack'}},
  {id:'panim_authority',name:'Panim Authority',level:8,stage:3,type:'skill',desc:'Recognized Panim cleric — +2 persuasion in Panim Haven.',effect:{rollBonus:{skill:'persuasion',bonus:2,condition:'locality_panim_haven'}}},
  {id:'divine_intervention',name:'Divine Intervention',level:8,stage:3,type:'passive',desc:'Once per day, reduce damage of one attack to zero.',effect:{unlock:'divine_intervene_once_day'}},
  {id:'lore_weapon',name:'Lore Weapon',level:8,stage:3,type:'skill',desc:'Weapon inscribed with lore — +2 attack against identified enemies.',effect:{rollBonus:{skill:'combat',bonus:2,condition:'enemy_identified'}}},
  {id:'sacred_endure2',name:'Sacred Endurance II',level:9,stage:3,type:'passive',desc:'HP does not fall below half from any single strike.',effect:{passive:'survive_half_hp'}},
  {id:'divine_smite_master',name:'Divine Smite Mastery',level:9,stage:3,type:'skill',desc:'Smite deals +3 additional damage against infernal.',effect:{passive:'smite_infernal_bonus'}},
  {id:'aurora_light_seal',name:'Aurora Light Seal',level:9,stage:3,type:'passive',desc:'Aurora Light Cathedral certification — open all chapel doors without persuasion.',effect:{passive:'chapel_open_free'}},
  {id:'holy_body',name:'Holy Body',level:10,stage:3,type:'passive',desc:'Immune to poison and disease.',effect:{passive:'immune_poison_disease'}},
  {id:'divine_authority',name:'Divine Authority',level:10,stage:3,type:'skill',desc:'Once per scene, make a demand backed by divine law — target must comply or take penalty.',effect:{unlock:'divine_demand_once_scene'}},
  {id:'lore_of_the_rupture',name:'Lore of the Rupture',level:10,stage:3,type:'skill',desc:'+2 lore when dealing with post-rupture magical effects or contamination.',effect:{rollBonus:{skill:'lore',bonus:2,condition:'rupture_magic'}}},
  {id:'eternal_ward',name:'Eternal Ward',level:11,stage:3,type:'passive',desc:'Ward Pulse extends to 2 rounds.',effect:{passive:'ward_pulse_2rounds'}},
  {id:'divine_charge',name:'Divine Charge',level:11,stage:3,type:'skill',desc:'Once per scene, charge with divine force — +5 attack, hit applies lose_action_enemy.',effect:{unlock:'divine_charge_once_scene'}},
  {id:'sacred_presence',name:'Sacred Presence',level:11,stage:4,type:'passive',desc:'Infernal enemies take 2 damage per round from your presence alone.',effect:{passive:'infernal_presence_damage'}},
  {id:'holy_war',name:'Holy War',level:12,stage:4,type:'skill',desc:'Designate an infernal enemy — all attacks against it gain +3.',effect:{unlock:'holy_war_target'}},
  {id:'divine_resilience',name:'Divine Resilience',level:12,stage:4,type:'passive',desc:'+4 maximum HP, recover 2 HP at start of each round.',effect:{passive:'hp_regen_2_per_round'}},
  {id:'lore_of_vonalzo',name:"Lore of Vonalzo's Domain",level:12,stage:4,type:'skill',desc:'Study of infernal house structures — +3 lore against stage 4 infernal encounters.',effect:{rollBonus:{skill:'lore',bonus:3,condition:'stage4_infernal'}}},
  {id:'sacred_apex',name:'Sacred Apex',level:13,stage:4,type:'passive',desc:'Permanent divine connection — Spirit modifier doubled for all rolls.',effect:{passive:'spirit_doubled'}},
  {id:'divine_wrath',name:'Divine Wrath',level:13,stage:4,type:'skill',desc:'Once per day, all attacks this combat deal +5 damage.',effect:{unlock:'divine_wrath_once_day'}},
  {id:'eternal_smite',name:'Eternal Smite',level:13,stage:4,type:'passive',desc:'Smite has no HP cost.',effect:{passive:'smite_free'}},
  {id:'sacred_ground',name:'Sacred Ground',level:14,stage:4,type:'skill',desc:'Consecrate an area — your side takes no damage for 1 round once per scene.',effect:{unlock:'sacred_ground_once_scene'}},
  {id:'divine_legend',name:'Divine Legend',level:14,stage:4,type:'passive',desc:'Name known across all shrines — +3 to persuasion and lore permanently.',effect:{skillBonus:{skill:'persuasion',bonus:3}}},
  {id:'elemental_lore',name:'Elemental Lore',level:14,stage:5,type:'skill',desc:'Knowledge of elemental planetary bodies — +3 lore in stage 5 elemental localities.',effect:{rollBonus:{skill:'lore',bonus:3,condition:'elemental_locality'}}},
  {id:'avatar_of_resolve',name:'Avatar of Resolve',level:15,stage:5,type:'passive',desc:'Divine form — +4 to all combat rolls, immune to fear and infernal compulsion.',effect:{skillBonus:{skill:'combat',bonus:4}}},
  {id:'sacred_resurrection',name:'Sacred Resurrection',level:15,stage:5,type:'skill',desc:'Once per run, restore a fallen companion to full HP.',effect:{unlock:'resurrect_companion_once_run'}},
  {id:'eternal_oath2',name:'Eternal Oath',level:15,stage:5,type:'passive',desc:'Oath survives death — stated oaths remain binding across stages.',effect:{passive:'oath_cross_stage'}},
  {id:'divine_mastery',name:'Divine Mastery',level:16,stage:5,type:'skill',desc:'+3 lore and +2 persuasion permanently.',effect:{skillBonus:{skill:'lore',bonus:3}}},
  {id:'sacred_fire',name:'Sacred Fire',level:16,stage:5,type:'passive',desc:'Consecration radiates — all infernal enemies in close range take 4 damage per round.',effect:{passive:'infernal_aura_4damage'}},
  {id:'avatar_of_the_age',name:'Avatar of the Age',level:16,stage:5,type:'skill',desc:'Once per day, gain immunity to all damage for 2 rounds.',effect:{unlock:'damage_immunity_2rounds'}},
  {id:'divine_apex',name:'Divine Apex',level:17,stage:5,type:'passive',desc:'Spirit at peak — Spirit adds to all skill rolls.',effect:{passive:'spirit_all_rolls'}},
  {id:'eternal_ward2',name:'Eternal Sacred Ward',level:17,stage:5,type:'skill',desc:'Once per run, make all allies immune to infernal damage for 1 combat.',effect:{unlock:'infernal_immunity_party_once_run'}},
  {id:'panim_legacy',name:'Panim Legacy',level:17,stage:5,type:'passive',desc:'Panim Haven shrine network recognizes you as a sacred guardian.',effect:{passive:'panim_sacred_guardian'}},
  {id:'holy_sovereign',name:'Holy Sovereign',level:18,stage:5,type:'skill',desc:'+5 to lore permanently.',effect:{skillBonus:{skill:'lore',bonus:5}}},
  {id:'divine_protection_all',name:'Divine Protection',level:18,stage:5,type:'passive',desc:'Your presence prevents death — companions cannot die in your presence.',effect:{passive:'companions_immortal_in_presence'}},
  {id:'sacred_legend',name:'Sacred Legend',level:18,stage:5,type:'skill',desc:'Once per run, cleanse all corruption from a locality.',effect:{unlock:'cleanse_locality_once_run'}},
  {id:'eternal_divine',name:'Eternal Divine',level:19,stage:5,type:'passive',desc:'+5 combat and +5 lore permanently.',effect:{skillBonus:{skill:'combat',bonus:5}}},
  {id:'sacred_champion',name:'Sacred Champion',level:19,stage:5,type:'skill',desc:'Once per run, any attack deals maximum possible damage and applies all divine effects.',effect:{unlock:'sacred_champion_once_run'}},
  {id:'divine_immortal',name:'Divine Immortal',level:19,stage:5,type:'passive',desc:'Cannot die from infernal sources.',effect:{passive:'immune_infernal_death'}},
  {id:'god_touched',name:'God-Touched',level:20,stage:5,type:'passive',desc:'Peak divine expression — +6 to lore, Spirit modifier tripled.',effect:{skillBonus:{skill:'lore',bonus:6}}},
  {id:'sacred_world',name:'Sacred World',level:20,stage:5,type:'skill',desc:'Once per run, prevent a world-scale infernal event.',effect:{unlock:'prevent_infernal_event_once_run'}},
  {id:'eternal_paladin',name:'Eternal Paladin',level:20,stage:5,type:'passive',desc:'Transcended the mortal limit — +5 to all skills permanently.',effect:{passive:'all_skills_plus5'}}
]);

// ─────────────────────────────────────────────────────────────────────────────
// ARCHER — precision, distance, stealth opening, ammo management
// ─────────────────────────────────────────────────────────────────────────────
const archer = buildSkills('arc',[
  {id:'steady_hand',name:'Steady Hand',level:1,stage:1,type:'passive',desc:'Reliable accuracy — +1 attack when stationary.',effect:{rollBonus:{skill:'combat',bonus:1,condition:'player_stationary'}}},
  {id:'quick_nock',name:'Quick Nock',level:1,stage:1,type:'skill',desc:'Rapid fire preparation — rapid_fire costs no action penalty.',effect:{passive:'rapid_fire_free'}},
  {id:'concealed_shot',name:'Concealed Shot',level:1,stage:1,type:'passive',desc:'Backstab-style opener at range — stealth opener applies at medium and far range.',effect:{passive:'stealth_opener_range'}},
  {id:'distance_pref',name:'Distance Preference',level:2,stage:1,type:'passive',desc:'+2 attack at far and very far range.',effect:{rollBonus:{skill:'combat',bonus:2,condition:'distance_far_vfar'}}},
  {id:'finesse_draw',name:'Finesse Draw',level:2,stage:1,type:'skill',desc:'Finesse modifier adds to all attack rolls.',effect:{passive:'finesse_full_attack'}},
  {id:'pin_mastery',name:'Pinning Mastery',level:2,stage:1,type:'passive',desc:'Pinning shot duration +1 round.',effect:{passive:'pinning_duration_plus1'}},
  {id:'wind_read',name:'Wind Read',level:3,stage:1,type:'skill',desc:'+1 survival when judging environmental conditions for ranged attack.',effect:{rollBonus:{skill:'survival',bonus:1,condition:'ranged_environment'}}},
  {id:'silencer',name:'Silencer',level:3,stage:1,type:'passive',desc:'Silent ammunition — ranged attacks at far range do not break concealment.',effect:{passive:'ranged_no_concealment_break'}},
  {id:'triple_shot',name:'Triple Shot',level:3,stage:1,type:'skill',desc:'Once per scene, attack three targets with one action at -1 each.',effect:{unlock:'triple_shot_once_scene'}},
  {id:'battlefield_read',name:'Battlefield Read',level:4,stage:1,type:'passive',desc:'Wits feeds tactical awareness — Wits modifier adds to first-round attack.',effect:{passive:'wits_first_attack'}},
  {id:'distance_retreat',name:'Distance Retreat',level:4,stage:1,type:'skill',desc:'Fall back without provoking — move to far range at no action cost once per scene.',effect:{unlock:'free_retreat_once_scene'}},
  {id:'supply_run',name:'Supply Run',level:4,stage:2,type:'passive',desc:'Knowledge of Roadwarden supply points — restock once per locality at half price.',effect:{passive:'restock_half_price'}},
  {id:'apex_distance',name:'Apex Distance',level:5,stage:2,type:'passive',desc:'Preferred at very far — +3 attack at very far range.',effect:{rollBonus:{skill:'combat',bonus:3,condition:'distance_very_far'}}},
  {id:'rapid_mastery',name:'Rapid Fire Mastery',level:5,stage:2,type:'skill',desc:'Rapid fire applies extra_action_ally with 1 full round attack companion bonus.',effect:{passive:'rapid_fire_companion_full'}},
  {id:'concealment_mastery',name:'Concealment Mastery',level:5,stage:2,type:'passive',desc:'Enter concealment at the start of any combat as a free action.',effect:{passive:'free_concealment_start'}},
  {id:'arrow_types',name:'Specialist Arrows',level:6,stage:2,type:'skill',desc:'Access to blunt, fire, and signal arrows — each has a unique effect once per scene.',effect:{unlock:'specialist_arrows_once_scene'}},
  {id:'ambush_leader',name:'Ambush Leader',level:6,stage:2,type:'passive',desc:'Coordinate ambush — all allies gain +2 attack in round 1 when you initiate.',effect:{passive:'party_ambush_bonus'}},
  {id:'patience_shot',name:'Patience Shot',level:6,stage:2,type:'skill',desc:'Wait 1 full round to gain +5 attack on next shot.',effect:{unlock:'patience_shot'}},
  {id:'guild_contact',name:'Guildheart Hub Contact',level:7,stage:2,type:'passive',desc:'Guildheart Hub supplier contact — better equipment prices and access.',effect:{passive:'guildheart_discount'}},
  {id:'cover_fire',name:'Cover Fire',level:7,stage:2,type:'skill',desc:'Once per scene, give all companions +2 defense for 1 round through suppressive fire.',effect:{unlock:'cover_fire_once_scene'}},
  {id:'hawk_sight',name:'Hawk Sight',level:7,stage:2,type:'passive',desc:'Wits at maximum — Wits modifier adds to all ranged attack rolls.',effect:{passive:'wits_full_ranged'}},
  {id:'silent_approach',name:'Silent Approach',level:8,stage:3,type:'skill',desc:'+2 stealth when approaching target from outside close range.',effect:{rollBonus:{skill:'stealth',bonus:2,condition:'approaching_far'}}},
  {id:'killing_distance',name:'Killing Distance',level:8,stage:3,type:'passive',desc:'At preferred range, attacks are always considered crits on 19-20.',effect:{passive:'expanded_crit_ranged'}},
  {id:'precision_apex',name:'Precision Apex',level:8,stage:3,type:'skill',desc:'+2 to all attack rolls permanently.',effect:{skillBonus:{skill:'combat',bonus:2}}},
  {id:'marked_execution',name:'Marked Execution',level:9,stage:3,type:'skill',desc:'Once per scene, kill a marked enemy at or below half HP automatically.',effect:{unlock:'marked_execution_half_hp'}},
  {id:'vanishing_shot',name:'Vanishing Shot',level:9,stage:3,type:'passive',desc:'After a hit from concealment, automatically re-enter concealment.',effect:{passive:'auto_reconcealment_on_hit'}},
  {id:'long_patrol',name:'Long Patrol',level:9,stage:3,type:'skill',desc:'Patrol the route perimeter — reveal all travel encounters before they trigger.',effect:{passive:'reveal_travel_encounters'}},
  {id:'eagle_eye',name:'Eagle Eye',level:10,stage:3,type:'passive',desc:'Reveal all enemy stats at combat start for free.',effect:{passive:'free_intel_combat_start'}},
  {id:'volley',name:'Volley',level:10,stage:3,type:'skill',desc:'Once per day, fire into all enemy targets at once — each takes 4 damage.',effect:{unlock:'volley_once_day'}},
  {id:'route_ambush',name:'Route Ambush',level:10,stage:3,type:'passive',desc:'Travel encounters you detect become ambushes — you act first.',effect:{passive:'detected_encounter_first_action'}},
  {id:'death_from_above',name:'Death From Above',level:11,stage:3,type:'skill',desc:'Vantage point shot — once per scene, attack ignores all defense.',effect:{unlock:'vantage_ignore_defense_once_scene'}},
  {id:'stealth_master',name:'Stealth Master',level:11,stage:3,type:'passive',desc:'+2 stealth permanently.',effect:{skillBonus:{skill:'stealth',bonus:2}}},
  {id:'kill_chain',name:'Kill Chain',level:11,stage:4,type:'skill',desc:'Each kill grants +1 to the next attack (max +5).',effect:{passive:'kill_chain_bonus'}},
  {id:'shadow_mark',name:'Shadow Mark',level:12,stage:4,type:'passive',desc:'Marked targets cannot move to far range to escape.',effect:{passive:'marked_no_retreat'}},
  {id:'precision_god',name:'Precision God',level:12,stage:4,type:'skill',desc:'Once per day, all attacks automatically hit.',effect:{unlock:'auto_hit_all_once_day'}},
  {id:'elemental_arrow',name:'Elemental Arrow',level:12,stage:4,type:'passive',desc:'Training with Soreheim arrowsmiths — +3 damage in elemental environments.',effect:{rollBonus:{skill:'combat',bonus:3,condition:'elemental_locality'}}},
  {id:'legend_shot',name:'Legend Shot',level:13,stage:4,type:'skill',desc:'Once per run, fire one arrow that ignores all defenses and kills a non-boss enemy.',effect:{unlock:'legend_shot_once_run'}},
  {id:'infinite_quiver',name:'Infinite Quiver',level:13,stage:4,type:'passive',desc:'Specialist arrows replenish once per scene instead of once per day.',effect:{passive:'arrows_replenish_scene'}},
  {id:'death_angle',name:'Death Angle',level:13,stage:4,type:'skill',desc:'Always find the killing angle — flanking bonus always active regardless of position.',effect:{passive:'flank_always_active'}},
  {id:'apex_stealth',name:'Apex Stealth',level:14,stage:4,type:'passive',desc:'+3 stealth permanently.',effect:{skillBonus:{skill:'stealth',bonus:3}}},
  {id:'world_shot',name:'World Shot',level:14,stage:4,type:'skill',desc:'Once per day, attack an enemy in any adjacent locality (narrative impact only).',effect:{unlock:'world_shot_once_day'}},
  {id:'cosmic_sight',name:'Cosmic Sight',level:14,stage:5,type:'passive',desc:'See through magical concealment — enemy stealth has no effect against you.',effect:{passive:'see_through_stealth'}},
  {id:'deathmark',name:'Deathmark',level:15,stage:5,type:'skill',desc:'Mark kills automatically — each kill marks the next target.',effect:{passive:'auto_chain_mark'}},
  {id:'shadow_legend',name:'Shadow Legend',level:15,stage:5,type:'passive',desc:'Name known among Sheresh and stealth factions — +3 to stealth.',effect:{skillBonus:{skill:'stealth',bonus:3}}},
  {id:'impossible_shot',name:'Impossible Shot',level:15,stage:5,type:'skill',desc:'Once per run, shoot through walls, barriers, or magical wards.',effect:{unlock:'impossible_shot_once_run'}},
  {id:'precision_eternal',name:'Precision Eternal',level:16,stage:5,type:'passive',desc:'Finesse tripled — +5 to all stealth and ranged combat.',effect:{skillBonus:{skill:'combat',bonus:5}}},
  {id:'silent_death',name:'Silent Death',level:16,stage:5,type:'skill',desc:'All kills from concealment trigger no morale check — enemies do not react.',effect:{passive:'concealed_kill_no_morale'}},
  {id:'kill_the_horizon',name:'Kill the Horizon',level:16,stage:5,type:'passive',desc:'No range limit — attacks at any range without penalty.',effect:{passive:'no_range_limit'}},
  {id:'eternal_precision',name:'Eternal Precision',level:17,stage:5,type:'skill',desc:'+5 to combat permanently.',effect:{skillBonus:{skill:'combat',bonus:5}}},
  {id:'shadow_god',name:'Shadow God',level:17,stage:5,type:'passive',desc:'Invisible at will — enter concealment as a free action once per round.',effect:{passive:'free_concealment_per_round'}},
  {id:'apex_hunter2',name:'Apex Hunter II',level:17,stage:5,type:'skill',desc:'Once per run, all attacks auto-crit for 1 combat.',effect:{unlock:'all_crit_once_run_combat'}},
  {id:'world_stealth',name:'World Stealth',level:18,stage:5,type:'passive',desc:'+6 stealth permanently.',effect:{skillBonus:{skill:'stealth',bonus:6}}},
  {id:'death_sentence',name:'Death Sentence',level:18,stage:5,type:'skill',desc:'Once per run, mark an enemy for death — they die at the end of the next round.',effect:{unlock:'death_sentence_once_run'}},
  {id:'eternal_archer',name:'Eternal Archer',level:18,stage:5,type:'passive',desc:'Time stands still for your shots — cannot be hit while in the process of aiming.',effect:{passive:'immune_damage_while_aiming'}},
  {id:'legend_precision',name:'Legend Precision',level:19,stage:5,type:'skill',desc:'+6 to combat permanently.',effect:{skillBonus:{skill:'combat',bonus:6}}},
  {id:'world_champion',name:'World Champion',level:19,stage:5,type:'passive',desc:'All companions gain your stealth modifier as attack bonus.',effect:{passive:'share_stealth_as_attack'}},
  {id:'eternity_of_shots',name:'Eternity of Shots',level:19,stage:5,type:'skill',desc:'Once per run, fire one shot per enemy simultaneously.',effect:{unlock:'simultaneous_all_enemies_once_run'}},
  {id:'world_apex_archer',name:'World Apex Archer',level:20,stage:5,type:'passive',desc:'Peak expression — +6 to stealth and combat permanently.',effect:{skillBonus:{skill:'stealth',bonus:6}}},
  {id:'eternal_quiver',name:'Eternal Quiver',level:20,stage:5,type:'skill',desc:'Limitless — all abilities reload at start of each round.',effect:{passive:'abilities_reload_per_round'}},
  {id:'legend_forever',name:'Legend Forever',level:20,stage:5,type:'passive',desc:'Your name ends conflicts — enemies below boss tier flee on sight.',effect:{passive:'non_boss_flee_on_sight'}}
]);

// ─────────────────────────────────────────────────────────────────────────────
// BERSERKER — controlled aggression, wound fueling, high risk/reward
// ─────────────────────────────────────────────────────────────────────────────
const berserker = buildSkills('ber',[
  {id:'pain_mastery',name:'Pain Mastery',level:1,stage:1,type:'passive',desc:'Wounds fuel power — Might modifier adds +1 per wound (max +3).',effect:{combatBonus:{type:'passive_atk',value:'per_wound',max:3}}},
  {id:'reckless',name:'Reckless Strike',level:1,stage:1,type:'skill',desc:'Sacrifice defense for offense — once per scene, +4 attack and -2 defense this round.',effect:{unlock:'reckless_once_scene'}},
  {id:'fury_channel',name:'Fury Channel',level:1,stage:1,type:'passive',desc:'First strike of combat deals +2 damage.',effect:{passive:'first_strike_plus2'}},
  {id:'iron_gut',name:'Iron Gut',level:2,stage:1,type:'passive',desc:'Vigor feeds survivability — Vigor modifier adds to maximum HP.',effect:{passive:'vigor_max_hp'}},
  {id:'blood_price',name:'Blood Price',level:2,stage:1,type:'skill',desc:'Pay HP for certainty — spend 3 HP to guarantee next attack hits.',effect:{unlock:'blood_price'}},
  {id:'scar_tissue',name:'Scar Tissue',level:2,stage:1,type:'passive',desc:'Wounds deal 1 less damage from the second one onward.',effect:{passive:'wound_damage_reduce_after_first'}},
  {id:'frenzy_step',name:'Frenzy Step',level:3,stage:1,type:'skill',desc:'Charge without provoking — move to close range without triggering reactions.',effect:{passive:'charge_no_reaction'}},
  {id:'shock_entry',name:'Shock Entry',level:3,stage:1,type:'passive',desc:'Opening aggression destabilizes — enemies check morale at combat start.',effect:{passive:'shock_morale_check_start'}},
  {id:'wall_breaker',name:'Wall Breaker',level:3,stage:1,type:'skill',desc:'+2 to combat when breaking through barriers or environmental obstacles.',effect:{rollBonus:{skill:'combat',bonus:2,condition:'breaking_obstacle'}}},
  {id:'battle_trance',name:'Battle Trance',level:4,stage:1,type:'passive',desc:'Cannot be stunned or slowed.',effect:{passive:'immune_stun_slow'}},
  {id:'controlled_fury',name:'Controlled Fury',level:4,stage:1,type:'skill',desc:'+3 attack when HP is below half.',effect:{rollBonus:{skill:'combat',bonus:3,condition:'below_half_hp'}}},
  {id:'soreheim_hardening',name:'Soreheim Hardening',level:4,stage:2,type:'passive',desc:'Soreheim Alliance training — +1 combat in quarry and industrial environments.',effect:{rollBonus:{skill:'combat',bonus:1,condition:'industrial_locality'}}},
  {id:'blood_frenzy',name:'Blood Frenzy',level:5,stage:2,type:'skill',desc:'Each wound you take adds +1 attack this round (max +5).',effect:{passive:'wound_attack_chain'}},
  {id:'mighty_blow',name:'Mighty Blow',level:5,stage:2,type:'passive',desc:'Might modifier doubles on attack rolls when below half HP.',effect:{passive:'might_doubled_low_hp'}},
  {id:'endure_anything',name:'Endure Anything',level:5,stage:2,type:'passive',desc:'Cannot be killed by area effects — always survive at 1 HP.',effect:{passive:'survive_area_at_1hp'}},
  {id:'iron_roar',name:'Iron Roar',level:6,stage:2,type:'skill',desc:'Intimidating roar — once per scene, all enemies take -2 attack for 1 round.',effect:{unlock:'iron_roar_once_scene'}},
  {id:'uncontrolled_power',name:'Uncontrolled Power',level:6,stage:2,type:'passive',desc:'Attacks deal +1 damage for every 5 HP missing.',effect:{passive:'missing_hp_damage_bonus'}},
  {id:'rage_movement',name:'Rage Movement',level:6,stage:2,type:'skill',desc:'Move two range bands in one action when in frenzy state.',effect:{passive:'double_range_move'}},
  {id:'soreheim_pact',name:'Soreheim Pact',level:7,stage:2,type:'skill',desc:'+2 to persuasion with Giant Council and Soreheim Alliance.',effect:{rollBonus:{skill:'persuasion',bonus:2,condition:'faction_soreheim'}}},
  {id:'death_or_glory',name:'Death or Glory',level:7,stage:2,type:'passive',desc:'At 5 HP or below, attack automatically crits on 15-20.',effect:{passive:'low_hp_expanded_crit'}},
  {id:'battle_scream',name:'Battle Scream',level:7,stage:2,type:'skill',desc:'Once per day, enter a battle state — +4 attack and +2 damage for 3 rounds.',effect:{unlock:'battle_scream_once_day'}},
  {id:'pain_threshold',name:'Pain Threshold',level:8,stage:3,type:'passive',desc:'High pain tolerance — ignore wound penalties entirely.',effect:{passive:'ignore_wound_penalties'}},
  {id:'blood_cost',name:'Blood Cost',level:8,stage:3,type:'skill',desc:'Spend up to 8 HP to add that amount as attack bonus.',effect:{unlock:'blood_cost_scaling'}},
  {id:'titan_body',name:'Titan Body',level:8,stage:3,type:'passive',desc:'+5 maximum HP.',effect:{passive:'hp_bonus_5_b'}},
  {id:'unstoppable',name:'Unstoppable',level:9,stage:3,type:'skill',desc:'Once per scene, cannot be stopped, stunned, or slowed for 2 rounds.',effect:{unlock:'unstoppable_once_scene'}},
  {id:'berserker_legacy',name:'Berserker Legacy',level:9,stage:3,type:'passive',desc:'+2 combat permanently.',effect:{skillBonus:{skill:'combat',bonus:2}}},
  {id:'forge_rage',name:'Forge Rage',level:9,stage:3,type:'skill',desc:'Ironhold Quarry training — +2 attack in industrial or quarry environments.',effect:{rollBonus:{skill:'combat',bonus:2,condition:'industrial_locality'}}},
  {id:'titan_strike',name:'Titan Strike',level:10,stage:3,type:'skill',desc:'Once per day, attack deals damage equal to your missing HP.',effect:{unlock:'titan_strike_once_day'}},
  {id:'iron_heart',name:'Iron Heart',level:10,stage:3,type:'passive',desc:'Recover 3 HP at end of each combat round.',effect:{passive:'regen_3_per_round'}},
  {id:'blood_limit',name:'Blood Limit',level:10,stage:3,type:'skill',desc:'Once per scene, ignore all incoming damage for 1 round.',effect:{unlock:'damage_immune_1round_once_scene'}},
  {id:'wound_master',name:'Wound Master',level:11,stage:3,type:'passive',desc:'Wounds no longer reduce max HP — they only add attack bonus.',effect:{passive:'wounds_attack_only'}},
  {id:'battle_god',name:'Battle God',level:11,stage:3,type:'skill',desc:'+3 to combat permanently.',effect:{skillBonus:{skill:'combat',bonus:3}}},
  {id:'soreheim_giant_form',name:'Soreheim Giant Form',level:11,stage:4,type:'passive',desc:'Inspired by Giant Council presence — +2 to Might stat.',effect:{statBonus:{stat:'might',bonus:2}}},
  {id:'death_blossom',name:'Death Blossom',level:12,stage:4,type:'skill',desc:'Once per day, attack all enemies at close range simultaneously.',effect:{unlock:'death_blossom_once_day'}},
  {id:'rage_eternal',name:'Rage Eternal',level:12,stage:4,type:'passive',desc:'Cannot end combat in defeat — survive to 1 HP.',effect:{passive:'survive_combat_at_1hp'}},
  {id:'titan_rage',name:'Titan Rage',level:12,stage:4,type:'skill',desc:'Once per day, +6 attack and +6 damage for 2 rounds.',effect:{unlock:'titan_rage_once_day'}},
  {id:'iron_legend',name:'Iron Legend',level:13,stage:4,type:'passive',desc:'Name known in combat circles — enemies with morale check automatically.',effect:{passive:'all_morale_check'}},
  {id:'blood_apex',name:'Blood Apex',level:13,stage:4,type:'skill',desc:'Might modifier tripled for attack rolls.',effect:{passive:'might_tripled_attack'}},
  {id:'carnage',name:'Carnage',level:13,stage:4,type:'passive',desc:'Each kill heals you for 4 HP.',effect:{passive:'kill_heals_4hp'}},
  {id:'primal_form',name:'Primal Form',level:14,stage:4,type:'skill',desc:'+4 to combat permanently.',effect:{skillBonus:{skill:'combat',bonus:4}}},
  {id:'unstoppable_force',name:'Unstoppable Force',level:14,stage:4,type:'passive',desc:'Cannot be pushed, knocked, or displaced.',effect:{passive:'immune_displacement'}},
  {id:'elemental_rage',name:'Elemental Rage',level:14,stage:5,type:'skill',desc:'Rage connects to elemental force — +4 in elemental localities.',effect:{rollBonus:{skill:'combat',bonus:4,condition:'elemental_locality'}}},
  {id:'apex_berserker',name:'Apex Berserker',level:15,stage:5,type:'passive',desc:'+5 to combat and Might stat.',effect:{skillBonus:{skill:'combat',bonus:5}}},
  {id:'eternal_rage',name:'Eternal Rage',level:15,stage:5,type:'skill',desc:'Once per day, fight in full frenzy state for entire combat.',effect:{unlock:'eternal_rage_once_day'}},
  {id:'world_breaker',name:'World Breaker',level:15,stage:5,type:'passive',desc:'Attacks deal +6 damage permanently.',effect:{passive:'permanent_damage_plus6'}},
  {id:'titan_of_ages',name:'Titan of Ages',level:16,stage:5,type:'skill',desc:'+5 to combat and Vigor stat.',effect:{skillBonus:{skill:'combat',bonus:5}}},
  {id:'blood_immortal',name:'Blood Immortal',level:16,stage:5,type:'passive',desc:'Survive death once per run.',effect:{unlock:'survive_death_once_run'}},
  {id:'pain_feeds_all',name:'Pain Feeds All',level:16,stage:5,type:'skill',desc:'Each wound grants +2 to all stats for that round.',effect:{passive:'wound_all_stat_bonus'}},
  {id:'god_of_war',name:'God of War',level:17,stage:5,type:'passive',desc:'Peak physical power — all stats increase by 1.',effect:{statBonus:{stat:'might',bonus:1}}},
  {id:'primal_apex',name:'Primal Apex',level:17,stage:5,type:'skill',desc:'+6 to combat permanently.',effect:{skillBonus:{skill:'combat',bonus:6}}},
  {id:'immortal_rage',name:'Immortal Rage',level:17,stage:5,type:'passive',desc:'Cannot die while in frenzy state.',effect:{passive:'immortal_in_frenzy'}},
  {id:'legend_of_blood',name:'Legend of Blood',level:18,stage:5,type:'skill',desc:'+7 to combat permanently.',effect:{skillBonus:{skill:'combat',bonus:7}}},
  {id:'eternal_titan',name:'Eternal Titan',level:18,stage:5,type:'passive',desc:'+10 maximum HP.',effect:{passive:'hp_bonus_10'}},
  {id:'death_defied',name:'Death Defied',level:18,stage:5,type:'skill',desc:'Once per run, survive any killing blow and counterattack immediately.',effect:{unlock:'death_defied_once_run'}},
  {id:'world_titan',name:'World Titan',level:19,stage:5,type:'passive',desc:'+8 to combat permanently.',effect:{skillBonus:{skill:'combat',bonus:8}}},
  {id:'primal_world',name:'Primal World',level:19,stage:5,type:'skill',desc:'Once per run, all attacks deal triple damage for 1 round.',effect:{unlock:'triple_damage_round_once_run'}},
  {id:'legend_eternal',name:'Legend Eternal',level:19,stage:5,type:'passive',desc:'Impossible to kill without a boss-tier effort.',effect:{passive:'requires_boss_to_kill'}},
  {id:'apex_of_all_combat',name:'Apex of All Combat',level:20,stage:5,type:'passive',desc:'Peak combat expression — +10 to combat permanently.',effect:{skillBonus:{skill:'combat',bonus:10}}},
  {id:'world_destroyer',name:'World Destroyer',level:20,stage:5,type:'skill',desc:'Once per run, kill all non-boss enemies in combat.',effect:{unlock:'kill_all_nonboss_once_run'}},
  {id:'eternal_berserker',name:'Eternal Berserker',level:20,stage:5,type:'passive',desc:'All wounds heal at combat end. All stats +2.',effect:{statBonus:{stat:'might',bonus:2}}}
]);

// ─────────────────────────────────────────────────────────────────────────────
// Remaining 25 archetypes — same 3-per-level structure, trait-focused entries
// Each uses the buildSkills helper for clean IDs
// ─────────────────────────────────────────────────────────────────────────────

const engineer = buildSkills('eng',[
  {id:'kit_prep',name:'Kit Preparation',level:1,stage:1,type:'skill',desc:'+1 craft when preparing equipment before an action.',effect:{skillBonus:{skill:'craft',bonus:1}}},
  {id:'field_repair',name:'Field Repair',level:1,stage:1,type:'passive',desc:'Repair gear in the field — once per scene, restore 1 damaged equipment function.',effect:{passive:'field_repair_once_scene'}},
  {id:'trap_set',name:'Trap Setting',level:1,stage:1,type:'skill',desc:'Set a simple mechanical trap — enemies triggering it lose_action_enemy for 1 round.',effect:{unlock:'trap_set_once_scene'}},
  {id:'structural_eye',name:'Structural Eye',level:2,stage:1,type:'passive',desc:'Read buildings and defenses — +1 lore when assessing fortifications.',effect:{rollBonus:{skill:'lore',bonus:1,condition:'fortification'}}},
  {id:'quick_assembly',name:'Quick Assembly',level:2,stage:1,type:'skill',desc:'Assemble a device mid-combat — once per scene, create a barrier granting +2 cover defense.',effect:{unlock:'quick_barrier_once_scene'}},
  {id:'ammo_craft',name:'Ammunition Craft',level:2,stage:1,type:'passive',desc:'Craft specialist ammunition between scenes — grants +1 attack for 3 uses.',effect:{passive:'crafted_ammo_bonus'}},
  {id:'mechanical_mind',name:'Mechanical Mind',level:3,stage:1,type:'skill',desc:'+1 craft when working with mechanical or engineered systems.',effect:{skillBonus:{skill:'craft',bonus:1}}},
  {id:'explosive_charge',name:'Explosive Charge',level:3,stage:1,type:'skill',desc:'Once per scene, detonate a charge — area damage 6 to all enemies at close range.',effect:{unlock:'explosive_once_scene'}},
  {id:'ironhold_training',name:'Ironhold Quarry Training',level:3,stage:1,type:'passive',desc:'Industrial experience — +1 survival in industrial or quarry environments.',effect:{rollBonus:{skill:'survival',bonus:1,condition:'industrial_locality'}}},
  {id:'reinforced_cover',name:'Reinforced Cover',level:4,stage:1,type:'passive',desc:'Cover grants +3 defense instead of standard.',effect:{passive:'cover_bonus_plus3'}},
  {id:'system_override',name:'System Override',level:4,stage:1,type:'skill',desc:'Bypass mechanical locks and systems — +2 craft on infiltration-related craft checks.',effect:{rollBonus:{skill:'craft',bonus:2,condition:'infiltration_craft'}}},
  {id:'supply_engineer',name:'Supply Engineering',level:4,stage:2,type:'passive',desc:'Know where to source materials — craft actions cost 1 less gold.',effect:{passive:'craft_gold_minus1'}},
  {id:'fortify_position',name:'Fortify Position',level:5,stage:2,type:'skill',desc:'Turn any location into a defensible position — +2 party defense when stationary.',effect:{passive:'fortify_party_def_stationary'}},
  {id:'wits_engineering',name:'Wits Engineering',level:5,stage:2,type:'passive',desc:'Wits feeds engineering solutions — Wits modifier adds to craft.',effect:{passive:'wits_full_craft'}},
  {id:'siege_work',name:'Siege Work',level:5,stage:2,type:'skill',desc:'Craft a siege device once per locality — reduces enemy defense by 2 for 3 rounds.',effect:{unlock:'siege_work_once_locality'}},
  {id:'veilforged_study',name:'Veilforged Bastion Study',level:6,stage:2,type:'passive',desc:'Anti-magic engineering knowledge — +2 to craft against magical obstacles.',effect:{rollBonus:{skill:'craft',bonus:2,condition:'magical_obstacle'}}},
  {id:'field_fortification',name:'Field Fortification',level:6,stage:2,type:'skill',desc:'Build a cover wall in 1 action — grants full cover to 2 allies for 2 rounds.',effect:{unlock:'field_fort_once_scene'}},
  {id:'precision_craft',name:'Precision Craft',level:6,stage:2,type:'passive',desc:'+2 craft permanently.',effect:{skillBonus:{skill:'craft',bonus:2}}},
  {id:'roaz_engineering',name:'Roaz Engineering Doctrine',level:7,stage:2,type:'skill',desc:'Ithtananalor engineering training — +2 craft and +1 lore in Roaz territory.',effect:{rollBonus:{skill:'craft',bonus:2,condition:'locality_ithtananalor'}}},
  {id:'advanced_traps',name:'Advanced Traps',level:7,stage:2,type:'passive',desc:'Traps affect an area — triggers affect all enemies at close range.',effect:{passive:'trap_area_effect'}},
  {id:'structural_mastery',name:'Structural Mastery',level:7,stage:2,type:'skill',desc:'Destroy or reinforce any structure in 1 action once per scene.',effect:{unlock:'structural_mastery_once_scene'}},
  {id:'explosive_mastery',name:'Explosive Mastery',level:8,stage:3,type:'passive',desc:'Explosive charges deal 10 damage instead of 6.',effect:{passive:'explosive_damage_10'}},
  {id:'craft_legend',name:'Craft Legend',level:8,stage:3,type:'skill',desc:'+3 craft permanently.',effect:{skillBonus:{skill:'craft',bonus:3}}},
  {id:'anti_magic_eng',name:'Anti-Magic Engineering',level:8,stage:3,type:'passive',desc:'Suppress one magical ability per combat.',effect:{unlock:'suppress_magic_once_combat'}},
  {id:'siege_engine',name:'Siege Engine',level:9,stage:3,type:'skill',desc:'Once per day, deploy a siege engine — deals 15 area damage.',effect:{unlock:'siege_engine_once_day'}},
  {id:'structural_immune',name:'Structural Immunity',level:9,stage:3,type:'passive',desc:'Environmental collapses and structural failures deal no damage to you.',effect:{passive:'immune_structural_damage'}},
  {id:'craft_of_iron',name:'Craft of Iron',level:9,stage:3,type:'skill',desc:'Forge a weapon component — +3 to one weapon\'s attack permanently.',effect:{unlock:'forge_weapon_bonus'}},
  {id:'master_builder',name:'Master Builder',level:10,stage:3,type:'passive',desc:'+4 craft permanently.',effect:{skillBonus:{skill:'craft',bonus:4}}},
  {id:'anti_magic_field',name:'Anti-Magic Field',level:10,stage:3,type:'skill',desc:'Deploy a field suppressor — magical abilities disabled in close range for 3 rounds.',effect:{unlock:'anti_magic_field_once_day'}},
  {id:'system_architect',name:'System Architect',level:10,stage:3,type:'passive',desc:'Wits adds to all craft checks.',effect:{passive:'wits_all_craft'}},
  {id:'demolisher',name:'Demolisher',level:11,stage:3,type:'skill',desc:'Once per day, destroy an enemy\'s primary ability through targeted strike.',effect:{unlock:'demolish_ability_once_day'}},
  {id:'forge_mastery',name:'Forge Mastery',level:11,stage:3,type:'passive',desc:'+5 craft permanently.',effect:{skillBonus:{skill:'craft',bonus:5}}},
  {id:'ore_network',name:'Ore Network',level:11,stage:4,type:'skill',desc:'Ironhold Quarry contact — access premium materials reducing gold costs by half.',effect:{passive:'materials_half_cost'}},
  {id:'titan_engine',name:'Titan Engine',level:12,stage:4,type:'passive',desc:'Craft a titan-scale device once per stage — effects scale to boss encounters.',effect:{unlock:'titan_device_once_stage'}},
  {id:'engineering_apex',name:'Engineering Apex',level:12,stage:4,type:'skill',desc:'+5 craft and +2 lore permanently.',effect:{skillBonus:{skill:'lore',bonus:2}}},
  {id:'elemental_engineering',name:'Elemental Engineering',level:12,stage:4,type:'passive',desc:'Engineer devices that work in elemental localities.',effect:{passive:'elemental_devices_work'}},
  {id:'legend_builder',name:'Legend Builder',level:13,stage:4,type:'skill',desc:'+6 craft permanently.',effect:{skillBonus:{skill:'craft',bonus:6}}},
  {id:'unstoppable_construction',name:'Unstoppable Construction',level:13,stage:4,type:'passive',desc:'Build during combat without action cost.',effect:{passive:'build_no_action_cost'}},
  {id:'master_of_systems',name:'Master of Systems',level:13,stage:4,type:'skill',desc:'Override any mechanical or magical system once per day.',effect:{unlock:'system_override_once_day'}},
  {id:'god_engineer',name:'God Engineer',level:14,stage:4,type:'passive',desc:'+7 craft permanently.',effect:{skillBonus:{skill:'craft',bonus:7}}},
  {id:'weapon_forge',name:'Weapon Forge',level:14,stage:4,type:'skill',desc:'Forge a legendary weapon — +5 to attack permanently for any weapon.',effect:{unlock:'forge_legendary_weapon'}},
  {id:'cosmic_engineering',name:'Cosmic Engineering',level:14,stage:5,type:'passive',desc:'Engineer devices powered by elemental planetary force.',effect:{passive:'cosmic_device_power'}},
  {id:'titan_of_craft',name:'Titan of Craft',level:15,stage:5,type:'skill',desc:'+8 craft permanently.',effect:{skillBonus:{skill:'craft',bonus:8}}},
  {id:'structural_god',name:'Structural God',level:15,stage:5,type:'passive',desc:'Any structure you build is indestructible for 1 stage.',effect:{passive:'indestructible_builds'}},
  {id:'siege_legend',name:'Siege Legend',level:15,stage:5,type:'skill',desc:'Once per run, end a siege encounter instantly with a master engineering solution.',effect:{unlock:'end_siege_once_run'}},
  {id:'master_engineer',name:'Master Engineer',level:16,stage:5,type:'passive',desc:'+9 craft permanently.',effect:{skillBonus:{skill:'craft',bonus:9}}},
  {id:'eternal_device',name:'Eternal Device',level:16,stage:5,type:'skill',desc:'Build a device that persists across stages.',effect:{unlock:'permanent_device_build'}},
  {id:'system_god',name:'System God',level:16,stage:5,type:'passive',desc:'No mechanical or magical system can resist you.',effect:{passive:'no_system_resistance'}},
  {id:'legend_craft',name:'Legend Craft',level:17,stage:5,type:'skill',desc:'+10 craft permanently.',effect:{skillBonus:{skill:'craft',bonus:10}}},
  {id:'engine_of_war',name:'Engine of War',level:17,stage:5,type:'passive',desc:'Crafted devices deal triple damage.',effect:{passive:'devices_triple_damage'}},
  {id:'anti_magic_legend',name:'Anti-Magic Legend',level:17,stage:5,type:'skill',desc:'Suppress all magical abilities of all enemies once per day.',effect:{unlock:'suppress_all_magic_once_day'}},
  {id:'apex_engineer',name:'Apex Engineer',level:18,stage:5,type:'passive',desc:'+12 craft permanently.',effect:{skillBonus:{skill:'craft',bonus:12}}},
  {id:'world_engine',name:'World Engine',level:18,stage:5,type:'skill',desc:'Once per run, build a structure that changes a locality permanently.',effect:{unlock:'world_structure_once_run'}},
  {id:'god_craft',name:'God Craft',level:18,stage:5,type:'passive',desc:'Craft actions automatically succeed.',effect:{passive:'craft_auto_succeed'}},
  {id:'eternal_engineer',name:'Eternal Engineer',level:19,stage:5,type:'skill',desc:'All devices persist indefinitely.',effect:{passive:'devices_permanent'}},
  {id:'master_of_all',name:'Master of All Systems',level:19,stage:5,type:'passive',desc:'Wits and Spirit both add to craft.',effect:{passive:'wits_spirit_craft'}},
  {id:'legend_machine',name:'Legend Machine',level:19,stage:5,type:'skill',desc:'Once per run, deploy a device that prevents all enemy abilities for 1 combat.',effect:{unlock:'ability_suppressor_once_run'}},
  {id:'world_architect',name:'World Architect',level:20,stage:5,type:'passive',desc:'Peak engineering — +15 craft, all devices auto-succeed.',effect:{skillBonus:{skill:'craft',bonus:15}}},
  {id:'eternal_construction',name:'Eternal Construction',level:20,stage:5,type:'skill',desc:'Once per run, rebuild any destroyed structure or companion.',effect:{unlock:'rebuild_once_run'}},
  {id:'legend_of_iron',name:'Legend of Iron',level:20,stage:5,type:'passive',desc:'Name synonymous with engineering across the Principalities.',effect:{passive:'engineering_legend_all_access'}}
]);

// ─────────────────────────────────────────────────────────────────────────────
// Condensed builds for remaining 24 archetypes
// Full 60-entry structure maintained — 3 options per level
// ─────────────────────────────────────────────────────────────────────────────

function makeSkillPool(prefix, entries){ return entries; }

const tactician = buildSkills('tac', (() => {
  const e = [];
  const tiers = [
    ['Formation Sense','Coordinate a flanking pass — +1 combat when two allies are present.','skill',{rollBonus:{skill:'combat',bonus:1,condition:'two_allies_present'}}],
    ['Command Read','Read enemy formation — +1 lore against organized opponents.','passive',{rollBonus:{skill:'lore',bonus:1,condition:'organized_enemy'}}],
    ['Discipline Drill','+1 to all survival checks on forced marches.','skill',{rollBonus:{skill:'survival',bonus:1,condition:'forced_march'}}],
    ['Suppress Line','Suppress reduces enemy attack for 2 rounds instead of 1.','passive',{passive:'suppress_2rounds'}],
    ['Rally Point','Designate a rally point — companions return to full defense when retreating to it.','skill',{unlock:'rally_point_once_scene'}],
    ['Order of Battle','All companions gain +1 to their next action after you issue a command.','passive',{passive:'command_companion_bonus'}],
    ['Roaz Military Doctrine','Ithtananalor tactical study — +1 combat and lore in Roaz territory.','skill',{rollBonus:{skill:'lore',bonus:1,condition:'locality_ithtananalor'}}],
    ['Overwatch','Designate one ally for overwatch — they act twice next round.','skill',{unlock:'overwatch_once_scene'}],
    ['Iron Discipline','+1 combat permanently.','passive',{skillBonus:{skill:'combat',bonus:1}}],
    ['Flanking Protocol','Organized flanking — +2 attack when 2+ companions are at close range.','skill',{rollBonus:{skill:'combat',bonus:2,condition:'flanked_2companions'}}],
    ['Wits Command','Wits modifier adds to command-based social rolls.','passive',{passive:'wits_command_social'}],
    ['Route Control','Control route access — reduce travel encounter chance by 1 per stage.','skill',{passive:'reduce_travel_encounter'}],
    ['Press Formation','Coordinate a press — all companions move one band closer free.','skill',{unlock:'press_formation_once_scene'}],
    ['Defensive Protocol','All allies gain +2 defense when you use a defend action.','passive',{passive:'defend_party_bonus'}],
    ['Lore Strategy','+2 lore permanently.','skill',{skillBonus:{skill:'lore',bonus:2}}],
    ['Iron Accord Knowledge','Iron Accord doctrine — +2 persuasion with Roaz military contacts.','passive',{rollBonus:{skill:'persuasion',bonus:2,condition:'faction_roaz_military'}}],
    ['Combat Efficiency','No action penalty for issuing commands while attacking.','skill',{passive:'command_attack_free'}],
    ['Fortress Mind','Immune to morale effects and psychological pressure.','passive',{passive:'immune_morale_psych'}],
    ['Advanced Flank','Flanking bonus increases to +4 with proper coordination.','skill',{rollBonus:{skill:'combat',bonus:4,condition:'flanked_2companions'}}],
    ['Master of Terrain','Exploit terrain features — +3 combat when terrain favors your position.','passive',{rollBonus:{skill:'combat',bonus:3,condition:'terrain_advantage'}}],
    ['Legion Command','Once per day, coordinate all companions for +3 attack and +2 defense for 2 rounds.','skill',{unlock:'legion_command_once_day'}],
    ['Strategic Retreat','Disengage entire party to far range without provoking.','passive',{passive:'party_disengage_free'}],
    ['Field Intelligence','+3 lore permanently.','skill',{skillBonus:{skill:'lore',bonus:3}}],
    ['Coordinate Strike','All companions hit the same target — +5 to companion damage this round.','skill',{unlock:'coordinate_strike_once_scene'}],
    ['Iron Line','Party cannot be broken — companions survive at 1 HP once per combat.','passive',{passive:'party_survive_1hp'}],
    ['Warlord Training','+2 combat permanently.','skill',{skillBonus:{skill:'combat',bonus:2}}],
    ['Perfect Formation','All companions gain +3 attack and defense when formation is intact.','passive',{passive:'formation_bonus3'}],
    ['Advance and Hold','Once per scene, party attacks at full strength and then holds position for free.','skill',{unlock:'advance_hold_once_scene'}],
    ['Tactical Apex','+3 lore and +2 combat permanently.','passive',{skillBonus:{skill:'lore',bonus:3}}],
    ['Grand Strategy','Map the enemy — once per day, reveal all enemy abilities and actions.','skill',{unlock:'grand_strategy_once_day'}],
    ['Command Legend','+4 combat permanently.','passive',{skillBonus:{skill:'combat',bonus:4}}],
    ['Tactical Legend','Companions never take fatal damage while you are alive.','skill',{passive:'companions_no_fatal'}],
    ['Apex Tactician','+5 lore permanently.','passive',{skillBonus:{skill:'lore',bonus:5}}],
    ['Supreme Command','Once per run, take two full turns in a row.','skill',{unlock:'two_turns_once_run'}],
    ['Eternal Formation','Party formation bonuses permanently active.','passive',{passive:'formation_always_active'}],
    ['Iron Marshal','+6 lore and +4 combat permanently.','skill',{skillBonus:{skill:'combat',bonus:4}}],
    ['Legendary Tactician','Enemies always fail their first morale check against you.','passive',{passive:'enemy_first_morale_fail'}],
    ['World Strategy','Once per run, prevent any single battle from happening through superior planning.','skill',{unlock:'prevent_battle_once_run'}],
    ['Eternal Marshal','+7 lore permanently.','passive',{skillBonus:{skill:'lore',bonus:7}}],
    ['Command of Ages','+8 combat permanently.','skill',{skillBonus:{skill:'combat',bonus:8}}],
    ['Legend of Command','+9 lore permanently.','passive',{skillBonus:{skill:'lore',bonus:9}}],
    ['Perfect Strategy','All party members gain your lore modifier as attack bonus.','skill',{passive:'share_lore_as_attack'}],
    ['Warlord Supreme','+10 combat permanently.','passive',{skillBonus:{skill:'combat',bonus:10}}],
    ['Eternal Strategist','+10 lore permanently.','skill',{skillBonus:{skill:'lore',bonus:10}}],
    ['World Tactician','Cannot lose a combat with companions present.','passive',{passive:'no_loss_with_companions'}],
    ['God of Strategy','+12 lore permanently.','skill',{skillBonus:{skill:'lore',bonus:12}}],
    ['Final Order','Once per run, prevent a party wipe through perfect tactical execution.','passive',{unlock:'prevent_tpk_tactics_once_run'}],
    ['Command Eternal','+12 combat permanently.','skill',{skillBonus:{skill:'combat',bonus:12}}],
    ['Legend Eternal II','+15 lore permanently.','passive',{skillBonus:{skill:'lore',bonus:15}}],
    ['Apex of Command','Once per run, all party members fight at peak power for 1 combat.','skill',{unlock:'peak_power_party_once_run'}],
    ['World Marshal','+15 combat permanently.','passive',{skillBonus:{skill:'combat',bonus:15}}],
    ['Eternal Champion II','+5 to all skills permanently.','skill',{passive:'all_skills_plus5_b'}],
    ['God Marshal','+20 lore permanently.','passive',{skillBonus:{skill:'lore',bonus:20}}],
    ['Legend of Strategy','+20 combat permanently.','skill',{skillBonus:{skill:'combat',bonus:20}}],
    ['World Conqueror','Cannot be defeated in any encounter with 2+ companions.','passive',{passive:'invincible_with_two_companions'}],
    ['Apex Marshal','Once per run, issue a command that ends a stage-level conflict.','skill',{unlock:'end_conflict_once_run'}],
    ['Infinite Strategy','+25 lore and +20 combat permanently.','passive',{skillBonus:{skill:'lore',bonus:25}}],
    ['Final Marshal','All companions share your stats for 1 full combat once per run.','skill',{unlock:'share_all_stats_once_run'}],
    ['World Legend','+30 to lore permanently.','passive',{skillBonus:{skill:'lore',bonus:30}}],
    ['Eternal Conqueror','Cannot die while a companion lives.','skill',{passive:'immortal_while_companion_lives'}]
  ];
  const levels = [1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,10,10,10,11,11,11,12,12,12,13,13,13,14,14,14,15,15,15,16,16,16,17,17,17,18,18,18,19,19,19,20,20,20];
  const stages = [1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5];
  return tiers.map((t,i)=>({id:`s${i}`,name:t[0],level:levels[i],stage:stages[i],type:t[1],desc:t[2],effect:t[3]}));
})());

// ─────────────────────────────────────────────────────────────────────────────
// Remaining archetypes use condensed generator pattern
// ─────────────────────────────────────────────────────────────────────────────

function genPool(prefix, identitySkill, secondSkill, flavor){
  const levels=[1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,10,10,10,11,11,11,12,12,12,13,13,13,14,14,14,15,15,15,16,16,16,17,17,17,18,18,18,19,19,19,20,20,20];
  const stages=[1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5];
  const tiers=[0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];
  const bonusVal=[1,0,0,1,0,0,1,0,0,1,0,0,2,0,0,2,0,0,2,0,0,3,0,0,3,0,0,3,0,0,4,0,0,4,0,0,5,0,0,5,0,0,5,0,0,6,0,0,7,0,0,8,0,0,9,0,0,10,0,0];
  return Array.from({length:60},(_, i)=>{
    const t=tiers[i]; const bv=bonusVal[i];
    const isBonus=bv>0 && i%3===0;
    const isUnlock=(i%3===1);
    const isPassive=(i%3===2);
    const tierLabel=['Common','Uncommon','Rare','Very Rare','Legendary'][t];
    return {
      id:`${prefix}_s${i}`,
      name:`${flavor[i%flavor.length]} ${tierLabel}`,
      level:levels[i], stage:stages[i],
      type:isPassive?'passive':isUnlock?'skill':'skill',
      desc:isBonus?`+${bv} to ${identitySkill}.`:isUnlock?`Once per scene: apply ${flavor[i%flavor.length].toLowerCase()} effect.`:`Passive ${flavor[i%flavor.length].toLowerCase()} benefit — ${tierLabel.toLowerCase()} tier advantage.`,
      effect:isBonus?{skillBonus:{skill:identitySkill,bonus:bv}}:isUnlock?{unlock:`${prefix}_ability_${i}`}:{passive:`${prefix}_passive_${i}`}
    };
  });
}

const warden   = buildSkills('war2', genPool('war2','combat','lore',['Custody','Suppression','Iron Authority','Warrant','Enforcement','Capture']));
const warlord  = buildSkills('wrl',  genPool('wrl','combat','persuasion',['Command','Rally','Press','Iron Will','War Road','Force March']));
const death_knight = buildSkills('dk', genPool('dk','combat','lore',['Dark Oath','Relentless','Death Drive','Iron Dread','Void Strike','Terrible Will']));
const wizard   = buildSkills('wiz',  genPool('wiz','lore','craft',['Arcane Formula','Kinetic','Precision Force','Pattern Lock','Channeled Power','Arcane Apex']));
const cleric   = buildSkills('cle',  genPool('cle','persuasion','lore',['Doctrine','Healing Word','Sacred Mandate','Restoration','Divine Presence','Blessed Authority']));
const priest   = buildSkills('pri',  genPool('pri','persuasion','craft',['Ritual','Offering','Sacred Speech','Processional','Shrine Doctrine','Divine Channel']));
const necromancer = buildSkills('nec', genPool('nec','lore','craft',['Death Lore','Extract','Animate','Pale Authority','Death Sight','Bone Knowledge']));
const illusionist = buildSkills('ill', genPool('ill','stealth','lore',['Misdirection','Phantom Step','False Image','Mirror Logic','Concealment Art','Illusion Apex']));
const inquisitor  = buildSkills('inq', genPool('inq','persuasion','lore',['Interrogate','Read Intent','Command Stop','Truth Press','Doctrine Force','Iron Inquisition']));
const elementalist= buildSkills('ele', genPool('ele','craft','lore',['Elemental Channel','Force Shape','Axis Surge','Elemental Press','Storm Form','World Force']));
const alchemist   = buildSkills('alc', genPool('alc','craft','lore',['Compound','Extract','Catalyze','Formula Mastery','Volatile Mix','Alchemical Apex']));
const saint       = buildSkills('sai', genPool('sai','persuasion','lore',['Witness','Mercy','Presence','Sacred Record','Forgiveness','Saintly Authority']));
const oracle      = buildSkills('ora', genPool('ora','lore','persuasion',['Foresee','Omen Read','Dread Sign','Axis Read','Fate Thread','Oracle Apex']));
const healer      = buildSkills('hea', genPool('hea','craft','persuasion',['Field Triage','Wound Close','Remedy','Recovery Protocol','Full Restoration','Healer Legend']));
const rogue       = buildSkills('rog', genPool('rog','stealth','combat',['Quiet Entry','Backstab','Smoke Out','Shadow Step','Vanish','Rogue Apex']));
const assassin    = buildSkills('ass', genPool('ass','stealth','combat',['Precise Strike','Silent Kill','Death Mark','One Action','Target Profile','Assassin Legend']));
const spellthief  = buildSkills('spt', genPool('spt','lore','stealth',['Arcane Theft','Spell Grab','Copy Form','Pattern Steal','Magic Siphon','Spellthief Apex']));
const scout       = buildSkills('sco', genPool('sco','survival','stealth',['Recon','Forward Scout','Hazard Map','Route Read','Advance Report','Scout Legend']));
const thief       = buildSkills('thi', genPool('thi','stealth','craft',['Urban Entry','Pocket Clear','Lock Work','Shadow Move','Extract','Thief Legend']));
const trickster   = buildSkills('tri', genPool('tri','persuasion','stealth',['Social Disruption','False Front','Misdirect','Confidence Game','Crowd Work','Trickster Apex']));
const artificer   = buildSkills('art', genPool('art','craft','stealth',['Seal Deploy','Tool Trap','Device Plant','Clockwork Form','Contraption','Artificer Legend']));
const beastmaster = buildSkills('bst', genPool('bst','survival','stealth',['Animal Read','Pack Leader','Beast Bond','Flank With Pack','Creature Mastery','Beastmaster Apex']));
const bard        = buildSkills('brd', genPool('brd','persuasion','stealth',['Voice Read','Silence Shape','Thread Pull','Song Record','Crowd Channel','Bard Legend']));

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────────────────────────────────────
window.ARCHETYPE_SKILLS_DB = {
  warrior, knight, ranger, paladin, archer, berserker, engineer, tactician,
  warden, warlord, death_knight, wizard, cleric, priest, necromancer, illusionist,
  inquisitor, elementalist, alchemist, saint, oracle, healer, rogue, assassin,
  spellthief, scout, thief, trickster, artificer, beastmaster, bard
};

})();
