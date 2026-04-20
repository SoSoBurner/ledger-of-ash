// ═══════════════════════════════════════════════════════
// LEDGER OF ASH — COMBAT SYSTEM v1
// Full TTRPG multi-round combat with archetype abilities
// TEXT RULE: No apostrophes in string values.
// ═══════════════════════════════════════════════════════

// ── ENEMY TEMPLATES ─────────────────────────────────────
const ENEMY_TEMPLATES = {
  patrol_guard:{
    name:'Roadwarden Patrol Guard', hp:18, maxHp:18,
    attack:4, defense:6, morale:10,
    desc:'Armored and disciplined. Follows procedure until procedure fails.',
    loot:{gold:8, item:'Patrol Report (evidence)'},
    fleeThreshold:0.3,
    abilities:[{name:'Formation Block', effect:'defense+2 if allies present'}]
  },
  private_security:{
    name:'Private Security Agent', hp:14, maxHp:14,
    attack:5, defense:5, morale:8,
    desc:'Well paid and poorly motivated. Fights until it is no longer worth it.',
    loot:{gold:12, item:'Sealed House Crest (evidence)'},
    fleeThreshold:0.4,
    abilities:[{name:'Paid Aggression', effect:'first attack+2'}]
  },
  iron_accord_enforcer:{
    name:'Iron Accord Enforcer', hp:20, maxHp:20,
    attack:6, defense:7, morale:14,
    desc:'Roazian law and stone. Does not negotiate. Does not retreat easily.',
    loot:{gold:6, item:'Iron Accord Papers (access)'},
    fleeThreshold:0.2,
    abilities:[{name:'Iron Stance', effect:'cannot be pushed back'}]
  },
  red_hood_operative:{
    name:'Red Hood Guild Operative', hp:12, maxHp:12,
    attack:7, defense:4, morale:7,
    desc:'Fast, experienced, professionally pragmatic.',
    loot:{gold:20, item:'Contract Fragment (intel)'},
    fleeThreshold:0.5,
    abilities:[{name:'Dirty Strike', effect:'on hit 50% chance target loses next action'}]
  },
  frontier_militia:{
    name:'Frontier Hammer Militia', hp:22, maxHp:22,
    attack:5, defense:5, morale:12,
    desc:'Built for brutal terrain work. Hits harder when cornered.',
    loot:{gold:5, item:'Frontier Survey Map'},
    fleeThreshold:0.25,
    abilities:[{name:'Hammer Down', effect:'attack+3 when below half HP'}]
  },
  shadowhands_watcher:{
    name:'Shadowhands Watcher', hp:10, maxHp:10,
    attack:6, defense:6, morale:6,
    desc:'Prefers not to be seen at all. Fights only when exposure is inevitable.',
    loot:{gold:15, item:'Shadowhands Drop Key'},
    fleeThreshold:0.6,
    abilities:[{name:'Vanish', effect:'may disengage without attack of opportunity'}]
  },
  hostile_debtor:{
    name:'Desperate Debtor', hp:8, maxHp:8,
    attack:3, defense:2, morale:4,
    desc:'Nothing to lose. Dangerous for exactly that reason.',
    loot:{gold:2, item:null},
    fleeThreshold:0.1,
    abilities:[]
  }
};

// ── ABILITY EFFECT TYPES ─────────────────────────────────
// effects[] — machine-readable ability mechanics
//   { type, value, duration, target, condition }
// types: atk_bonus, def_self, def_ally, enemy_atk_penalty,
//   enemy_def_penalty, push_enemy, lose_action_enemy,
//   extra_action_ally, heal_self, heal_ally, dot_enemy,
//   hp_cost, instant_kill, morale_check, area_damage,
//   copy_enemy_ability, redirect_attack, cover,
//   condition_apply, condition_clear, concealed,
//   passive_atk, passive_def, passive_immune, reveal_intel
// req: null | { state, ally_attacked, target_hp_pct,
//               player_unseen, player_initiated,
//               target_not_acted, axis_event, witnesses }

// ── ARCHETYPE COMBAT ABILITIES ───────────────────────────
const ARCHETYPE_COMBAT_ABILITIES = {
  warrior:[
    {id:'shield_press', name:'Shield Press', cost:'action',
     flavor:'Drive shield into enemy with controlled force.',
     effect:'push enemy back, gain +2 defense this round', skillReq:'combat', minSkill:2,
     effects:[{type:'push_enemy',value:1},{type:'def_self',value:2,duration:1}], req:null},
    {id:'battle_cry',   name:'Battle Cry',   cost:'bonus',
     flavor:'A roar that steadies allied nerve.',
     effect:'all allies gain +1 attack this round', skillReq:'persuasion', minSkill:1,
     effects:[{type:'def_ally',value:1,duration:1}], req:null},
    {id:'disarm',       name:'Disarm',       cost:'action',
     flavor:'Strike the weapon hand, not the body.',
     effect:'enemy loses attack next round on success', skillReq:'combat', minSkill:3,
     effects:[{type:'lose_action_enemy',value:1,duration:1}], req:null}
  ],
  knight:[
    {id:'challenge',    name:'Challenge',    cost:'action',
     flavor:'Fix the enemy attention on you alone.',
     effect:'enemy must target you this round. You gain +1 defense vs their attacks.', skillReq:'persuasion', minSkill:2,
     effects:[{type:'enemy_redirect',value:1},{type:'def_self',value:1,duration:1}], req:null},
    {id:'oath_strike',  name:'Oath Strike',  cost:'action',
     flavor:'The oath demands this blow.',
     effect:'+4 attack vs enemies who have attacked an ally', skillReq:'combat', minSkill:2,
     effects:[{type:'atk_bonus',value:4}], req:{ally_attacked:true}},
    {id:'parry',        name:'Parry',        cost:'reaction',
     flavor:'Read the angle and turn it aside.',
     effect:'negate one attack this round', skillReq:'combat', minSkill:3,
     effects:[{type:'def_self',value:20,duration:1}], req:null}
  ],
  ranger:[
    {id:'marked_shot',  name:'Marked Shot',  cost:'action',
     flavor:'Still feet, clear eye, clean release.',
     effect:'+3 attack if you did not move this round', skillReq:'combat', minSkill:2,
     effects:[{type:'atk_bonus',value:3}], req:{state:'player_stationary'}},
    {id:'set_trap',     name:'Set Trap',     cost:'bonus',
     flavor:'Plant the hazard before they reach you.',
     effect:'enemy disadvantage next round', skillReq:'survival', minSkill:2,
     effects:[{type:'enemy_atk_penalty',value:2,duration:1}], req:null},
    {id:'withdraw',     name:'Withdraw',     cost:'action',
     flavor:'A clean disengage that invites pursuit on your terms.',
     effect:'disengage safely, force enemy to expose flank', skillReq:'stealth', minSkill:1,
     effects:[{type:'concealed',value:1},{type:'enemy_def_penalty',value:1,duration:1}], req:null}
  ],
  paladin:[
    {id:'smite',        name:'Smite',        cost:'action',
     flavor:'Costly commitment. The blow carries weight beyond steel.',
     effect:'+5 attack vs unjust targets. Costs 3 HP.', skillReq:'combat', minSkill:3,
     effects:[{type:'hp_cost',value:3},{type:'atk_bonus',value:5}], req:null},
    {id:'lay_on_hands', name:'Lay On Hands', cost:'action',
     flavor:'Steady pressure, focused will, real result.',
     effect:'restore 1d8+persuasion HP to self or ally', skillReq:'persuasion', minSkill:1,
     effects:[{type:'heal_ally',value:'1d8+persuasion',target:'any'}], req:null},
    {id:'divine_ward',  name:'Divine Ward',  cost:'bonus',
     flavor:'Place yourself between the blow and the faithful.',
     effect:'ally gains +3 defense this round', skillReq:'lore', minSkill:2,
     effects:[{type:'def_ally',value:3,duration:1}], req:null}
  ],
  archer:[
    {id:'cover_shot',   name:'Cover Shot',   cost:'action',
     flavor:'Fire from behind the edge. Economy of risk.',
     effect:'attack while behind cover. Defense+3 this round.', skillReq:'stealth', minSkill:1,
     effects:[{type:'atk_bonus',value:0},{type:'def_self',value:3,duration:1}], req:null},
    {id:'pinning_shot', name:'Pinning Shot', cost:'action',
     flavor:'Not to wound — to anchor.',
     effect:'enemy cannot advance this round', skillReq:'combat', minSkill:2,
     effects:[{type:'push_enemy',value:-1},{type:'lose_action_enemy',value:1,duration:1,subtype:'advance'}], req:null},
    {id:'rapid_fire',   name:'Rapid Fire',   cost:'action',
     flavor:'Speed costs precision. Acceptable trade.',
     effect:'two attacks at -2 each', skillReq:'combat', minSkill:3,
     effects:[{type:'atk_bonus',value:-2},{type:'extra_action_ally',value:1,target:'self'}], req:null}
  ],
  berserker:[
    {id:'rage_surge',   name:'Rage Surge',   cost:'bonus',
     flavor:'Spend blood to spend harder.',
     effect:'spend 4 HP for +4 attack and +2 damage', skillReq:'combat', minSkill:2,
     effects:[{type:'hp_cost',value:4},{type:'atk_bonus',value:4},{type:'def_self',value:-2,duration:1}], req:null},
    {id:'cleave',       name:'Cleave',       cost:'action',
     flavor:'One arc, every target in reach.',
     effect:'attack all adjacent enemies', skillReq:'combat', minSkill:3,
     effects:[{type:'area_damage',value:1,target:'all_enemies'}], req:null},
    {id:'pain_feed',    name:'Pain Feed',    cost:'passive',
     flavor:'Each wound makes the next blow cleaner.',
     effect:'gain +1 attack for each wound you carry', skillReq:'survival', minSkill:1,
     effects:[{type:'passive_atk',value:'per_wound'}], req:null}
  ],
  wizard:[
    {id:'force_push',   name:'Force Push',   cost:'action',
     flavor:'Directed kinetic burst. Clean and impersonal.',
     effect:'ranged attack. Enemy pushed back and disoriented (-2 next round)', skillReq:'lore', minSkill:2,
     effects:[{type:'push_enemy',value:1},{type:'enemy_atk_penalty',value:2,duration:1}], req:null},
    {id:'arcane_shield',name:'Arcane Shield',cost:'bonus',
     flavor:'Spend reserve to stop what cannot be dodged.',
     effect:'+3 defense vs one attack. Costs 2 HP.', skillReq:'lore', minSkill:1,
     effects:[{type:'hp_cost',value:2},{type:'def_self',value:3,duration:1}], req:null},
    {id:'identify_weakness',name:'Identify Weakness',cost:'bonus',
     flavor:'Read the structure before you strike it.',
     effect:'learn enemy ability. +2 attack for rest of combat.', skillReq:'lore', minSkill:3,
     effects:[{type:'reveal_intel',value:'enemy_ability'},{type:'atk_bonus',value:2,duration:'combat'}], req:null}
  ],
  cleric:[
    {id:'sacred_strike',name:'Sacred Strike',cost:'action',
     flavor:'Doctrine made physical.',
     effect:'+3 attack vs undead or those who broke oaths', skillReq:'combat', minSkill:2,
     effects:[{type:'atk_bonus',value:3,condition:'enemy_undead_or_oathbreaker'}], req:null},
    {id:'blessing',     name:'Blessing',     cost:'bonus',
     flavor:'The word costs nothing. The result does not.',
     effect:'ally +2 to all rolls this round', skillReq:'persuasion', minSkill:1,
     effects:[{type:'def_ally',value:2,duration:1}], req:null},
    {id:'turn_hostile', name:'Turn Hostile', cost:'action',
     flavor:'Doctrinal pressure on the morally unstable.',
     effect:'force fearful or weak-willed enemies to retreat', skillReq:'lore', minSkill:2,
     effects:[{type:'morale_check',value:'flee',target:'all_enemies'}], req:null}
  ],
  priest:[
    {id:'ward_off',     name:'Ward Off',     cost:'action',
     flavor:'Public ritual has battlefield application.',
     effect:'+2 defense for allies in melee. Persuasion check.', skillReq:'persuasion', minSkill:2,
     effects:[{type:'def_ally',value:2,duration:1}], req:null},
    {id:'censure',      name:'Censure',      cost:'action',
     flavor:'Named and condemned. The effect is real.',
     effect:'enemy morale check. On fail, they hesitate.', skillReq:'persuasion', minSkill:2,
     effects:[{type:'morale_check',value:'hesitate'}], req:null},
    {id:'communal_aid', name:'Communal Aid', cost:'bonus',
     flavor:'Direct transfer. No ceremony required.',
     effect:'restore 4 HP to an ally', skillReq:'persuasion', minSkill:1,
     effects:[{type:'heal_ally',value:4,target:'any'}], req:null}
  ],
  necromancer:[
    {id:'drain_will',   name:'Drain Will',   cost:'action',
     flavor:'Extract the animating force. Leave the shell.',
     effect:'enemy -2 to all rolls this round. Lore check.', skillReq:'lore', minSkill:3,
     effects:[{type:'enemy_atk_penalty',value:2,duration:1},{type:'enemy_def_penalty',value:2,duration:1}], req:null},
    {id:'death_sight',  name:'Death Sight',  cost:'passive',
     flavor:'You have seen past this threshold. Fear has no grip here.',
     effect:'immune to fear effects from undead', skillReq:'lore', minSkill:1,
     effects:[{type:'passive_immune',value:'fear'}], req:null},
    {id:'decay_touch',  name:'Decay Touch',  cost:'action',
     flavor:'Not a killing blow. A rotting one.',
     effect:'melee attack: +0 damage but wounding. Enemy -1 per round.', skillReq:'combat', minSkill:2,
     effects:[{type:'dot_enemy',value:1,duration:3}], req:null}
  ],
  illusionist:[
    {id:'phantom_double',name:'Phantom Double',cost:'action',
     flavor:'Give the eye something to chase.',
     effect:'50% chance enemy attacks illusion this round', skillReq:'stealth', minSkill:2,
     effects:[{type:'def_self',value:10,duration:1,subtype:'evade_chance'}], req:null},
    {id:'fear_image',   name:'Fear Image',   cost:'action',
     flavor:'Show them the thing they carry.',
     effect:'morale check. Low morale enemies flee.', skillReq:'persuasion', minSkill:2,
     effects:[{type:'morale_check',value:'flee'}], req:null},
    {id:'blind_spot',   name:'Blind Spot',   cost:'bonus',
     flavor:'Vanish into the gap between their attention.',
     effect:'enemy cannot detect you next round if you disengage', skillReq:'stealth', minSkill:1,
     effects:[{type:'concealed',value:1}], req:null}
  ],
  inquisitor:[
    {id:'interrogate_combat',name:'Interrogate',cost:'action',
     flavor:'The question has teeth here too.',
     effect:'demand surrender. On success enemy surrenders. On fail, combat bonus +2.', skillReq:'persuasion', minSkill:3,
     effects:[{type:'morale_check',value:'surrender'},{type:'atk_bonus',value:2,condition:'on_fail',duration:'combat'}], req:null},
    {id:'read_intent',  name:'Read Intent',  cost:'passive',
     flavor:'Every telegraphed attack is a text you have read before.',
     effect:'+1 defense at start of each combat round', skillReq:'lore', minSkill:1,
     effects:[{type:'passive_def',value:1}], req:null},
    {id:'command_stop', name:'Command Stop', cost:'action',
     flavor:'Authority expressed as physical pressure.',
     effect:'one enemy must stop advancing. Lore check vs morale.', skillReq:'lore', minSkill:2,
     effects:[{type:'lose_action_enemy',value:1,duration:1,subtype:'advance'}], req:null}
  ],
  elementalist:[
    {id:'axis_surge',   name:'Axis Surge',   cost:'action',
     flavor:'Use the inversion rather than fight it.',
     effect:'+4 attack during axis events. Normal: +2 attack', skillReq:'lore', minSkill:2,
     effects:[{type:'atk_bonus',value:4,condition:'axis_event'},{type:'atk_bonus',value:2,condition:'default'}], req:null},
    {id:'force_field',  name:'Force Field',  cost:'bonus',
     flavor:'Shape the axis pressure outward.',
     effect:'+2 defense this round. Costs 2 HP.', skillReq:'survival', minSkill:1,
     effects:[{type:'hp_cost',value:2},{type:'def_self',value:2,duration:1}], req:null},
    {id:'elemental_shock',name:'Elemental Shock',cost:'action',
     flavor:'The arc does not distinguish between them.',
     effect:'area attack. All enemies -1 next round.', skillReq:'lore', minSkill:3,
     effects:[{type:'area_damage',value:'1d4',target:'all_enemies'},{type:'enemy_atk_penalty',value:1,duration:1,target:'all_enemies'}], req:null}
  ],
  rogue:[
    {id:'backstab',     name:'Backstab',     cost:'action',
     flavor:'Position acquired. Strike committed.',
     effect:'+4 attack from concealment or flanking', skillReq:'stealth', minSkill:2,
     effects:[{type:'atk_bonus',value:4}], req:{state:'player_concealed'}},
    {id:'smoke_out',    name:'Smoke Out',    cost:'bonus',
     flavor:'Break their attention and move before it reforms.',
     effect:'create diversion. Enemy loses next action.', skillReq:'stealth', minSkill:1,
     effects:[{type:'lose_action_enemy',value:1,duration:1}], req:null},
    {id:'pickpocket_fight',name:'Lift Item',  cost:'action',
     flavor:'The objective was never to wound.',
     effect:'steal one item or weapon component during combat', skillReq:'stealth', minSkill:3,
     effects:[{type:'condition_apply',value:'disarmed',target:'enemy',duration:1}], req:null}
  ],
  assassin:[
    {id:'precise_strike',name:'Precise Strike',cost:'action',
     flavor:'First action, last action. One deliberate thing.',
     effect:'+3 attack if target has not acted yet this round', skillReq:'stealth', minSkill:2,
     effects:[{type:'atk_bonus',value:3}], req:{target_not_acted:true}},
    {id:'poison_blade',  name:'Poison Blade', cost:'bonus',
     flavor:'The work continues after the blow.',
     effect:'next hit adds ongoing 1 HP/round for 3 rounds', skillReq:'craft', minSkill:2,
     effects:[{type:'dot_enemy',value:1,duration:3}], req:null},
    {id:'silent_kill',   name:'Silent Kill',  cost:'action',
     flavor:'Unseen approach. No margin for error.',
     effect:'instant kill if target below 30% HP and you are unseen', skillReq:'stealth', minSkill:4,
     effects:[{type:'instant_kill',value:1}], req:{target_hp_pct:0.3,player_unseen:true}}
  ],
  spellthief:[
    {id:'steal_technique',name:'Steal Technique',cost:'action',
     flavor:'Read the structure as they use it. Replicate it.',
     effect:'copy one enemy ability for use this combat', skillReq:'stealth', minSkill:3,
     effects:[{type:'copy_enemy_ability',value:1}], req:null},
    {id:'arcane_disruption',name:'Arcane Disruption',cost:'action',
     flavor:'Collapse the pattern before it resolves.',
     effect:'enemy caster cannot use abilities next round', skillReq:'lore', minSkill:2,
     effects:[{type:'lose_action_enemy',value:1,duration:1,subtype:'abilities'}], req:null},
    {id:'redirect',       name:'Redirect',     cost:'reaction',
     flavor:'Accept the force. Give it a new address.',
     effect:'redirect one magical effect to different target', skillReq:'lore', minSkill:3,
     effects:[{type:'redirect_attack',value:1}], req:null}
  ],
  scout:[
    {id:'ambush_prep',  name:'Ambush Prep',  cost:'bonus',
     flavor:'The first strike was prepared before they arrived.',
     effect:'+3 attack if combat initiated by you', skillReq:'stealth', minSkill:2,
     effects:[{type:'atk_bonus',value:3}], req:{state:'player_initiated'}},
    {id:'flank_call',   name:'Flank Call',   cost:'bonus',
     flavor:'Name the weakness. Everyone benefits.',
     effect:'identify weak point. All attacks gain +1 for 2 rounds.', skillReq:'survival', minSkill:1,
     effects:[{type:'atk_bonus',value:1,duration:2,target:'all_allies'}], req:null},
    {id:'cover_break',  name:'Cover Break',  cost:'action',
     flavor:'Remove the advantage. Force them into the open.',
     effect:'deny enemy use of cover this round', skillReq:'stealth', minSkill:2,
     effects:[{type:'enemy_def_penalty',value:3,duration:1}], req:null}
  ],
  thief:[
    {id:'misdirect',    name:'Misdirect',    cost:'action',
     flavor:'The hand they see is not the hand that moves.',
     effect:'enemy attacks wrong target this round', skillReq:'stealth', minSkill:2,
     effects:[{type:'redirect_attack',value:1,target:'away_from_player'}], req:null},
    {id:'quick_hands',  name:'Quick Hands',  cost:'bonus',
     flavor:'The weapon leaves the hand before they realize.',
     effect:'disarm or trip enemy as bonus action', skillReq:'craft', minSkill:2,
     effects:[{type:'condition_apply',value:'disarmed',target:'enemy',duration:1}], req:null},
    {id:'vanishing_act',name:'Vanishing Act',cost:'action',
     flavor:'The space where you were is empty.',
     effect:'disengage and become hidden if cover is available', skillReq:'stealth', minSkill:3,
     effects:[{type:'concealed',value:1},{type:'push_enemy',value:1}], req:null}
  ],
  trickster:[
    {id:'mock',         name:'Mock',         cost:'bonus',
     flavor:'Peel the composure off. Watch the decision-making collapse.',
     effect:'enemy morale -2. They must target you this round.', skillReq:'persuasion', minSkill:2,
     effects:[{type:'enemy_atk_penalty',value:2,duration:1},{type:'enemy_redirect',value:1}], req:null},
    {id:'bait_and_switch',name:'Bait and Switch',cost:'action',
     flavor:'Commit to the wrong position. Invite the strike. Be elsewhere.',
     effect:'force enemy to attack position you just left', skillReq:'persuasion', minSkill:2,
     effects:[{type:'def_self',value:20,duration:1,subtype:'evade_redirect'}], req:null},
    {id:'crowd_favor',  name:'Crowd Favor',  cost:'action',
     flavor:'Witnesses change the calculation.',
     effect:'if witnesses present, enemy cannot make violent move without renown cost', skillReq:'persuasion', minSkill:3,
     effects:[{type:'morale_check',value:'hesitate'}], req:{witnesses:true}}
  ],
  healer:[
    {id:'field_triage', name:'Field Triage', cost:'action',
     flavor:'Controlled hands, fast assessment, immediate effect.',
     effect:'restore 1d8+2 HP to self or ally. Can stabilize dying.', skillReq:'lore', minSkill:1,
     effects:[{type:'heal_ally',value:'1d8+2',target:'any'}], req:null},
    {id:'pain_block',   name:'Pain Block',   cost:'bonus',
     flavor:'Interrupt the signal. Buy the round.',
     effect:'ally ignores wound penalties this round', skillReq:'craft', minSkill:2,
     effects:[{type:'condition_clear',value:'wound_penalty',target:'any',duration:1}], req:null},
    {id:'expose_wound', name:'Expose Wound', cost:'action',
     flavor:'Clinical targeting. Not cruelty — efficiency.',
     effect:'enemy -2 defense by targeting existing injury', skillReq:'lore', minSkill:3,
     effects:[{type:'enemy_def_penalty',value:2,duration:1}], req:null}
  ],
  artificer:[
    {id:'deploy_device',name:'Deploy Device',cost:'action',
     flavor:'Improvised mechanism. Reliable enough.',
     effect:'improvised mechanism. Effect varies (trap, distraction, shield)', skillReq:'craft', minSkill:2,
     effects:[{type:'lose_action_enemy',value:1,duration:1},{type:'def_self',value:2,duration:1}], req:null},
    {id:'structural_blow',name:'Structural Blow',cost:'action',
     flavor:'Target the joins. Degrade the protection.',
     effect:'+3 attack vs armored enemies. Degrades their protection.', skillReq:'craft', minSkill:2,
     effects:[{type:'atk_bonus',value:3},{type:'enemy_def_penalty',value:1,duration:'combat'}], req:null},
    {id:'emergency_repair',name:'Emergency Repair',cost:'bonus',
     flavor:'Salvage what is available. It is enough.',
     effect:'restore 4 HP using available materials', skillReq:'craft', minSkill:1,
     effects:[{type:'heal_self',value:4}], req:null}
  ],
  engineer:[
    {id:'terrain_use',  name:'Terrain Use',  cost:'bonus',
     flavor:'The environment was always a tool.',
     effect:'+2 defense by using environment intelligently', skillReq:'craft', minSkill:1,
     effects:[{type:'def_self',value:2,duration:1}], req:null},
    {id:'collapse_structure',name:'Collapse',cost:'action',
     flavor:'Controlled demolition. Uncontrolled consequences.',
     effect:'structural damage to area. All in range take 1d6 damage.', skillReq:'craft', minSkill:3,
     effects:[{type:'area_damage',value:'1d6',target:'all_enemies'}], req:null},
    {id:'fortify_position',name:'Fortify',   cost:'action',
     flavor:'Convert the ground into a position.',
     effect:'create cover. Allies gain +2 defense for 2 rounds.', skillReq:'craft', minSkill:2,
     effects:[{type:'cover',value:2,duration:2,target:'all_allies'}], req:null}
  ],
  tactician:[
    {id:'coordinate',   name:'Coordinate',   cost:'bonus',
     flavor:'The sequence was always there. Name it.',
     effect:'one ally may take an extra action this round', skillReq:'lore', minSkill:2,
     effects:[{type:'extra_action_ally',value:1}], req:null},
    {id:'suppress',     name:'Suppress',     cost:'action',
     flavor:'Contain the advance. Define the edge.',
     effect:'enemy cannot advance and loses 1 action', skillReq:'lore', minSkill:2,
     effects:[{type:'lose_action_enemy',value:1,duration:1},{type:'push_enemy',value:-1}], req:null},
    {id:'battle_plan',  name:'Battle Plan',  cost:'action',
     flavor:'Spend a round to own the next one.',
     effect:'set up: next round all allies +2 attack and defense', skillReq:'lore', minSkill:3,
     effects:[{type:'atk_bonus',value:2,duration:1,target:'all_allies',delay:1},{type:'def_ally',value:2,duration:1,delay:1}], req:null}
  ],
  alchemist:[
    {id:'throw_compound',name:'Throw Compound',cost:'action',
     flavor:'The effect depends on what is in the vial.',
     effect:'area effect: 1d6 damage or condition (acid/sleep/blind)', skillReq:'craft', minSkill:2,
     effects:[{type:'area_damage',value:'1d6',target:'all_enemies'},{type:'condition_apply',value:'acid',target:'all_enemies',duration:2}], req:null},
    {id:'antidote_burst',name:'Antidote Burst',cost:'bonus',
     flavor:'Counteragent applied directly. Immediate clearance.',
     effect:'self or ally clears one condition immediately', skillReq:'craft', minSkill:1,
     effects:[{type:'condition_clear',value:'any',target:'any'}], req:null},
    {id:'volatile_mix',  name:'Volatile Mix',  cost:'action',
     flavor:'High yield. Marginal safety. Worth it.',
     effect:'+4 damage but 1-in-6 chance of self-splash', skillReq:'craft', minSkill:3,
     effects:[{type:'atk_bonus',value:4},{type:'dot_enemy',value:2,duration:2},{type:'self_splash_risk',value:0.167}], req:null}
  ],
  saint:[
    {id:'presence',     name:'Presence',     cost:'passive',
     flavor:'The cost of attacking you is visible to them.',
     effect:'hostile non-fanatics must succeed morale check to attack you', skillReq:'persuasion', minSkill:3,
     effects:[{type:'passive_immune',value:'casual_attack'}], req:null},
    {id:'appeal',       name:'Appeal',       cost:'action',
     flavor:'Name the alternative. Give them the chance.',
     effect:'demand enemy surrender. Common enemies: high success rate.', skillReq:'persuasion', minSkill:2,
     effects:[{type:'morale_check',value:'surrender'}], req:null},
    {id:'sanctified_ground',name:'Sanctified Ground',cost:'action',
     flavor:'Claim the space. The effect is immediate.',
     effect:'enemies in area -2 morale, allies +2 defense', skillReq:'lore', minSkill:2,
     effects:[{type:'enemy_atk_penalty',value:2,duration:2,target:'all_enemies'},{type:'def_ally',value:2,duration:2}], req:null}
  ],
  bard:[
    {id:'bd_distraction',name:'Distraction',  cost:'bonus',
     flavor:'Fracture the focus before the blow.',
     effect:'enemy loses focus — -2 to their next action', skillReq:'persuasion', minSkill:2,
     effects:[{type:'enemy_atk_penalty',value:2,duration:1}], req:null},
    {id:'bd_rally_cry',  name:'Rally Cry',    cost:'action',
     flavor:'The voice does something the steel cannot.',
     effect:'all allies gain +1 to their next action this round', skillReq:'persuasion', minSkill:3,
     effects:[{type:'def_ally',value:1,duration:1}], req:null},
    {id:'bd_taunt',      name:'Taunt',        cost:'bonus',
     flavor:'Redirect the aggression. Absorb it on your terms.',
     effect:'enemy must target you this round. You gain +1 defense.', skillReq:'persuasion', minSkill:2,
     effects:[{type:'enemy_redirect',value:1},{type:'def_self',value:1,duration:1}], req:null}
  ],
  oracle:[
    {id:'or_foresee',   name:'Foresee Attack',cost:'passive',
     flavor:'The movement was decided before they executed it.',
     effect:'+1 defense at start of each combat round', skillReq:'lore', minSkill:2,
     effects:[{type:'passive_def',value:1}], req:null},
    {id:'or_predicted', name:'Predicted Move', cost:'action',
     flavor:'Name the thing before it happens. Then respond to the thing.',
     effect:'declare enemy action before they act. If correct, auto-succeed your counter.', skillReq:'lore', minSkill:3,
     effects:[{type:'def_self',value:20,duration:1,subtype:'predicted_counter'}], req:null},
    {id:'or_outcome',   name:'See the Outcome',cost:'bonus',
     flavor:'The better path is visible from here.',
     effect:'learn whether attacking or defending will produce better results this round. No roll.', skillReq:'lore', minSkill:2,
     effects:[{type:'reveal_intel',value:'optimal_action'}], req:null}
  ],
  warden:[
    {id:'wd_cover',     name:'Cover Ally',   cost:'reaction',
     flavor:'Interpose yourself. Accept the redistribution.',
     effect:'negate one attack that would hit an ally. Take half the damage instead.', skillReq:'combat', minSkill:2,
     effects:[{type:'def_ally',value:20,duration:1,subtype:'intercept'}], req:null},
    {id:'wd_push_back', name:'Push Back',    cost:'action',
     flavor:'Custody includes containment.',
     effect:'force enemy back two positions. They cannot advance next round.', skillReq:'combat', minSkill:3,
     effects:[{type:'push_enemy',value:2},{type:'lose_action_enemy',value:1,duration:1,subtype:'advance'}], req:null},
    {id:'wd_fortify',   name:'Fortify Position',cost:'action',
     flavor:'Hold the line. Make it cost them.',
     effect:'all allies in current position gain +3 defense for 2 rounds', skillReq:'survival', minSkill:2,
     effects:[{type:'cover',value:3,duration:2,target:'all_allies'}], req:null}
  ],
  warlord:[
    {id:'wl_coordinate_w',name:'Coordinate', cost:'bonus',
     flavor:'The sequence was always there. Execute it.',
     effect:'one ally takes an extra action this round', skillReq:'lore', minSkill:2,
     effects:[{type:'extra_action_ally',value:1}], req:null},
    {id:'wl_press',     name:'Press the Advantage',cost:'action',
     flavor:'Every success is an opening if you move fast enough.',
     effect:'after any success this round, immediate follow-up attack at +2', skillReq:'combat', minSkill:3,
     effects:[{type:'atk_bonus',value:2,condition:'on_success'}], req:null},
    {id:'wl_suppress_w',name:'Suppress',     cost:'action',
     flavor:'Fix them. Control the tempo.',
     effect:'enemy cannot advance and loses one action next round', skillReq:'lore', minSkill:2,
     effects:[{type:'lose_action_enemy',value:1,duration:1},{type:'push_enemy',value:-1}], req:null}
  ],
  death_knight:[
    {id:'dk_relentless',name:'Relentless',   cost:'passive',
     flavor:'The oath does not permit interruption.',
     effect:'cannot be stunned or stopped by non-lethal effects. Always act on your turn.', skillReq:'combat', minSkill:3,
     effects:[{type:'passive_immune',value:'stun'},{type:'passive_immune',value:'slow'}], req:null},
    {id:'dk_intimidate',name:'Intimidate',   cost:'bonus',
     flavor:'The intention is visible. The nerve breaks.',
     effect:'enemy morale -3. Low-morale enemies must check before continuing.', skillReq:'combat', minSkill:2,
     effects:[{type:'enemy_atk_penalty',value:3,duration:1},{type:'morale_check',value:'hesitate',condition:'low_morale'}], req:null},
    {id:'dk_oath_strike_dk',name:'Oath Strike',cost:'action',
     flavor:'The declared target. The full weight of the commitment.',
     effect:'+4 attack against the target of your declared objective', skillReq:'combat', minSkill:3,
     effects:[{type:'atk_bonus',value:4}], req:null}
  ],
  beastmaster:[
    {id:'bm_flank',     name:'Flanking Read',cost:'passive',
     flavor:'You read terrain and position before the exchange begins.',
     effect:'always know enemy position relative to you. Cannot be flanked or surprised.', skillReq:'stealth', minSkill:2,
     effects:[{type:'passive_immune',value:'flank'},{type:'passive_immune',value:'surprise'}], req:null},
    {id:'bm_terrain_adv',name:'Terrain Advantage',cost:'bonus',
     flavor:'Exterior ground is familiar ground.',
     effect:'+2 to all rolls when fighting in wilderness or exterior terrain', skillReq:'survival', minSkill:2,
     effects:[{type:'atk_bonus',value:2,condition:'exterior_terrain'},{type:'def_self',value:2,condition:'exterior_terrain',duration:1}], req:null},
    {id:'bm_tracking_shot',name:'Tracking Strike',cost:'action',
     flavor:'A full round of reading resolves into a single clean action.',
     effect:'+3 attack — you have been reading this target for at least one round', skillReq:'stealth', minSkill:3,
     effects:[{type:'atk_bonus',value:3}], req:{state:'player_observed_target'}}
  ]
};

// ── COMBAT STATE ─────────────────────────────────────────
let CS = null; // active combat session

function startCombat(enemyTemplateId, context) {
  const tpl = ENEMY_TEMPLATES[enemyTemplateId];
  if (!tpl) return;
  const entryBonus = (context && context.entryBonus) ? context.entryBonus : 0;
  CS = {
    enemy: Object.assign({}, tpl, { id: enemyTemplateId }),
    round: 1,
    entryBonus: entryBonus,
    playerActed: false,
    context: context || {},
    log: []
  };
  document.querySelectorAll('.choice-block,.move-block,.levelup-block').forEach(b => b.remove());
  renderCombatRound();
}

function renderCombatRound() {
  if (!CS) return;
  const archId = G.archetype || 'warrior';
  const abilities = ARCHETYPE_COMBAT_ABILITIES[archId] || [];
  const usableAbilities = abilities.filter(a => {
    const sk = G.skills[a.skillReq] || 0;
    return sk >= a.minSkill;
  });

  const pct = CS.enemy.hp / CS.enemy.maxHp;
  const ePct = Math.round(pct * 100);
  const eStatus = pct > 0.6 ? 'Active' : pct > 0.3 ? 'Wounded' : 'Critical';

  let html = '<div class="combat-header">' +
    '<div class="combat-title">&#x2694; COMBAT &#x2014; Round ' + CS.round + '</div>' +
    '<div class="combat-enemy">' +
      '<div class="enemy-name">' + CS.enemy.name + '</div>' +
      '<div class="enemy-desc">' + CS.enemy.desc + '</div>' +
      '<div class="enemy-hp-row">' +
        '<div class="enemy-hp-bar"><div class="enemy-hp-fill" style="width:' + ePct + '%"></div></div>' +
        '<span class="enemy-status ' + (pct < 0.3 ? 'danger' : '') + '">' + eStatus + '</span>' +
      '</div>' +
    '</div>' +
    '</div>';

  // Show d20 roll info
  html += '<div class="combat-actions"><div class="choice-label">Choose your action:</div><div class="choices">';

  // Base attacks
  html += '<button class="choice-btn combat-btn" data-action="attack">' +
    '<span class="choice-text">Strike — direct attack</span>' +
    '<span class="choice-meta"><span class="choice-skill">combat</span><span class="choice-tag bold">attack</span></span>' +
    '</button>';

  // Defend
  html += '<button class="choice-btn combat-btn" data-action="defend">' +
    '<span class="choice-text">Defend — focus on protection this round</span>' +
    '<span class="choice-meta"><span class="choice-skill">survival</span><span class="choice-tag safe">defense</span></span>' +
    '</button>';

  // Archetype abilities
  usableAbilities.slice(0,2).forEach(ab => {
    html += '<button class="choice-btn combat-btn" data-action="ability" data-ability="' + ab.id + '">' +
      '<span class="choice-text">' + ab.name + ' — ' + ab.effect + '</span>' +
      '<span class="choice-meta"><span class="choice-skill">' + ab.skillReq + '</span><span class="choice-tag risky">ability</span></span>' +
      '</button>';
  });

  // Attempt to flee
  html += '<button class="choice-btn combat-btn" data-action="flee">' +
    '<span class="choice-text">Flee — break from combat</span>' +
    '<span class="choice-meta"><span class="choice-skill">survival</span><span class="choice-tag risky">risky</span></span>' +
    '</button>';

  html += '</div></div>';

  const el = document.getElementById('narrative-content');
  const block = document.createElement('div');
  block.className = 'scene-block combat-block';
  block.innerHTML = html;
  block.querySelectorAll('.combat-btn').forEach(btn => {
    btn.addEventListener('click', () => resolveCombatAction(btn.dataset.action, btn.dataset.ability));
  });
  el.appendChild(block);
  scrollNarrative();
}

function resolveCombatAction(action, abilityId) {
  document.querySelectorAll('.combat-block').forEach(b => b.remove());
  const archId = G.archetype || 'warrior';
  const combatSkill = G.skills.combat || 0;
  const survSkill = G.skills.survival || 0;
  const traitCombatBonus = 0;

  let resultText = '';
  let playerDamage = 0;
  let enemyDamage = 0;
  let isVictory = false;
  let isFled = false;
  let resultType = 'success';

  const d20 = () => Math.floor(Math.random() * 20) + 1;

  if (action === 'attack') {
    const roll = d20();
    const total = roll + combatSkill + traitCombatBonus + (G._traitBonus && G._traitBonus.skill === 'combat' ? G._traitBonus.bonus : 0);
    if (G._traitBonus && G._traitBonus.skill === 'combat') G._traitBonus = null;
    const hit = total >= CS.enemy.defense + 5;
    const baseDmg = hit ? Math.floor(Math.random() * 6) + combatSkill + 1 : 0;

    // Enemy counter-attack
    const eRoll = d20();
    const eHit = eRoll + CS.enemy.attack >= (combatSkill + survSkill + 8);
    enemyDamage = eHit ? Math.floor(Math.random() * 4) + CS.enemy.attack - 3 : 0;
    enemyDamage = Math.max(0, enemyDamage);

    resultText = '<strong>d20 roll: ' + roll + '</strong> + combat ' + combatSkill + (traitCombatBonus ? ' + trait ' + traitCombatBonus : '') + ' = <strong>' + total + '</strong><br>';

    if (hit) {
      CS.enemy.hp = Math.max(0, CS.enemy.hp - baseDmg);
      playerDamage = baseDmg;
      resultText += 'Your strike connects. <em>' + CS.enemy.name + '</em> takes ' + baseDmg + ' damage.';
      resultType = 'success';
    } else {
      resultText += 'Your strike is deflected. ' + CS.enemy.name + ' holds their ground.';
      resultType = 'failure';
    }

    if (enemyDamage > 0) {
      resultText += '<br>The enemy retaliates — you take ' + enemyDamage + ' damage.';
      applyWound(enemyDamage, 'from ' + CS.enemy.name);
    }

  } else if (action === 'defend') {
    const roll = d20();
    const total = roll + survSkill;
    const defended = total >= 10;
    // Enemy still attacks but reduced
    const eRoll = d20();
    const eBase = Math.floor(Math.random() * 4) + CS.enemy.attack - 3;
    enemyDamage = defended ? Math.max(0, Math.floor(eBase * 0.4)) : Math.max(0, eBase);

    resultText = '<strong>d20 roll: ' + roll + '</strong> + survival ' + survSkill + ' = <strong>' + total + '</strong><br>';
    resultText += defended ? 'You take a defensive stance. ' : 'Your guard is pushed.';
    if (enemyDamage > 0) {
      resultText += ' You take ' + enemyDamage + ' damage.';
      applyWound(enemyDamage, 'from ' + CS.enemy.name);
    } else {
      resultText += ' You absorb the assault unscathed.';
    }
    resultType = defended ? 'success' : 'partial';

  } else if (action === 'ability' && abilityId) {
    const allAbilities = ARCHETYPE_COMBAT_ABILITIES[archId] || [];
    const ab = allAbilities.find(a => a.id === abilityId);
    if (ab) {
      const sk = G.skills[ab.skillReq] || 0;
      const roll = d20();
      const total = roll + sk;
      const success = total >= 10;

      resultText = '<strong>' + ab.name + '</strong>: d20 roll ' + roll + ' + ' + ab.skillReq + ' ' + sk + ' = ' + total + '<br>';

      if (success) {
        // Apply ability effects
        if (ab.id === 'lay_on_hands' || ab.id === 'communal_aid' || ab.id === 'field_triage' || ab.id === 'emergency_repair') {
          const healed = Math.floor(Math.random() * 8) + (G.skills.persuasion || G.skills.craft || 1);
          G.hp = Math.min(G.maxHp, G.hp + healed);
          resultText += 'You restore ' + healed + ' HP. ' + ab.effect;
          updateHUD();
        } else if (ab.id === 'rage_surge' || ab.id === 'smite') {
          const costHp = ab.id === 'rage_surge' ? 4 : 3;
          G.hp = Math.max(1, G.hp - costHp);
          const bonusDmg = Math.floor(Math.random() * 6) + (ab.id === 'rage_surge' ? 4 : 5);
          CS.enemy.hp = Math.max(0, CS.enemy.hp - bonusDmg);
          resultText += 'Cost ' + costHp + ' HP. Deal ' + bonusDmg + ' bonus damage. ' + ab.effect;
          updateHUD();
        } else {
          // Generic ability success — deal moderate damage + effect
          const bonusDmg = Math.floor(Math.random() * 4) + sk;
          CS.enemy.hp = Math.max(0, CS.enemy.hp - bonusDmg);
          resultText += 'Success. ' + ab.effect + '. Enemy takes ' + bonusDmg + ' damage.';
        }
        resultType = 'success';
      } else {
        // Enemy counter
        const eRoll = d20();
        enemyDamage = Math.max(0, Math.floor(Math.random() * 4) + CS.enemy.attack - 3);
        resultText += 'The ability misfires. The enemy exploits the opening. You take ' + enemyDamage + ' damage.';
        applyWound(enemyDamage, 'from ' + CS.enemy.name);
        resultType = 'failure';
      }
    }

  } else if (action === 'flee') {
    const roll = d20();
    const total = roll + survSkill;
    const success = total >= 12;

    resultText = '<strong>d20 roll: ' + roll + '</strong> + survival ' + survSkill + ' = <strong>' + total + '</strong><br>';

    if (success) {
      resultText += 'You break from the fight. The ' + CS.enemy.name + ' does not pursue.';
      isFled = true;
      resultType = 'partial';
      // Fleeing costs renown and alignment
      G.renown = Math.max(0, G.renown - 1);
      shiftAlignment(-3, -3);
    } else {
      // Takes a hit while fleeing
      enemyDamage = Math.floor(Math.random() * 6) + 2;
      applyWound(enemyDamage, 'attack of opportunity from ' + CS.enemy.name);
      resultText += 'You are struck as you attempt to break. You take ' + enemyDamage + ' damage and barely escape.';
      isFled = true;
      resultType = 'failure';
    }
  }

  CS.log.push({ round: CS.round, action, result: resultType });
  addNarration('Round ' + CS.round, resultText, resultType);

  // Check enemy flee
  const eFleePct = CS.enemy.hp / CS.enemy.maxHp;
  if (!isFled && CS.enemy.hp <= 0) {
    isVictory = true;
    endCombat(true);
    return;
  }
  if (!isFled && eFleePct <= CS.enemy.fleeThreshold) {
    const eFlee = d20() <= 10;
    if (eFlee) {
      addNarration('', '<em>' + CS.enemy.name + ' breaks and retreats. The fight is over.</em>', 'success');
      endCombat(true);
      return;
    }
  }

  if (isFled) {
    endCombat(false);
    return;
  }

  CS.round++;
  setTimeout(() => renderCombatRound(), 500);
}

function applyWound(damage, source) {
  if (damage <= 0) return;
  G.hp = Math.max(0, G.hp - damage);
  // Track wounds
  if (!G.wounds) G.wounds = [];
  if (damage >= 5) {
    G.wounds.push({ desc: source, severity: damage >= 8 ? 'severe' : 'minor', round: CS ? CS.round : 0 });
    if (damage >= 8) {
      if (!G.fatigue) G.fatigue = 0;
      G.fatigue = Math.min(10, G.fatigue + 2);
    }
  }
  if (G.hp <= 0) {
    G.hp = 1;
    G.recoveryState = 'critical';
    addNarration('', '<em style="color:var(--blood-bright)">You are critically wounded. You need immediate recovery.</em>');
  }
  updateHUD();
}

function endCombat(victory) {
  const enemy = CS.enemy;
  CS = null;

  if (victory) {
    const xpGain = Math.min(8, Math.floor(Math.random() * 4) + 4);
    const goldGain = enemy.loot ? enemy.loot.gold : 0;
    gainXP(xpGain);
    modGold(goldGain);
    G.renown = (G.renown || 0) + 1;

    let victText = 'You have defeated the <strong>' + enemy.name + '</strong>. ';
    if (goldGain) victText += '+' + goldGain + ' gold.';
    if (enemy.loot && enemy.loot.item) {
      if (!G.inventory) G.inventory = [];
      G.inventory.push({ name: enemy.loot.item, type: 'evidence', equipped: false });
      victText += ' Found: ' + enemy.loot.item + '.';
    }
    addNarration('Combat Over', victText, 'success');
    addJournal('Defeated ' + enemy.name + ' in ' + (CS ? CS.round : 'unknown') + ' rounds. Renown +1.');
    shiftAlignment(-5, 0); // violence costs morality slightly
    saveGame(); updateHUD();

    setTimeout(() => renderChoices([
      { text:'Search the area for more information.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel' },
      { text:'Take what you need and move before anyone arrives.', skill:'stealth', tag:'risky', align:'chaotic', cid:'east_road' },
      { text:'Report what happened to the local authority.', skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact' }
    ]), 400);
  } else {
    addNarration('', 'You are out of the fight. Rest and recover before pressing further.', 'failure');
    saveGame();
    setTimeout(() => renderChoices([
      { text:'Make camp immediately.', skill:'survival', tag:'safe', align:'neutral', cid:'rest_recover' },
      { text:'Find a healer in the settlement.', skill:'persuasion', tag:'safe', align:'neutral', cid:'shrine_service' },
      { text:'Push forward despite the wounds.', skill:'combat', tag:'bold', align:'chaotic', cid:'passive_intel' }
    ]), 400);
  }
}

// Called from consequence nodes with: { type:'combat', enemy:'patrol_guard', context:{...} }
function triggerCombatEncounter(enemyId, context) {
  // Show combat entry opportunity first (TTRPG-consistent)
  document.querySelectorAll('.choice-block,.move-block').forEach(b => b.remove());
  const tpl = ENEMY_TEMPLATES[enemyId];
  if (!tpl) return;

  addNarration('', '<em style="color:var(--blood-bright)">A confrontation is imminent. <strong>' + tpl.name + '</strong> moves to intercept. ' + tpl.desc + '</em>');

  setTimeout(() => renderChoices([
    { text:'Stand your ground. This is a fight.', skill:'combat', tag:'bold', align:'chaotic',
      cid:'__combat__' + enemyId },
    { text:'Try to talk your way through before it comes to blows.', skill:'persuasion', tag:'risky', align:'lawful',
      cid:'garrison_contact' },
    { text:'Look for a way around before committing.', skill:'stealth', tag:'risky', align:'neutral',
      cid:'passive_intel' }
  ]), 300);
}

// Export ENEMY_TEMPLATES for engine.js
window.ENEMY_TEMPLATES = ENEMY_TEMPLATES;
