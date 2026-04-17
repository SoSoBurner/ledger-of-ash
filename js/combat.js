
(function(){
  function rand(n){ return Math.floor(Math.random()*n); }
  function archetype(state){ return (window.ARCHETYPES||[]).find(a=>a.id===state.archetype) || {group:'combat',focus:'combat'}; }
  function gearBonus(state, key){
    const eq = state.equipment || {};
    let bonus = 0;
    Object.values(eq).forEach(item=>{ if(item && item.bonus && item.bonus[key]) bonus += item.bonus[key]; });
    return bonus;
  }
  function beginEncounter(state, kind, name, tier){
    const t = kind==='creature' ? (window.BESTIARY[name]||{}) : (window.HAZARDS[name]||{});
    const bias = {easy:-2, standard:0, elite:3, boss:6}[tier] || 0;
    const enemyHp = (kind==='creature' ? (t.hp||12) : 8 + (t.severity||2)*3) + bias + state.stage;
    state.encounter = {kind,name,tier,phase:1,enemyHp,enemyMaxHp:enemyHp,enemyAttack:(t.attack||3)+Math.floor(state.stage/2)+Math.max(0,bias/2),weakness:t.weakness||'timing',text:t.text||'',canRetreat:tier!=='boss'};
    state.lastResult = `${name.replace(/_/g,' ')} becomes immediate. ${state.encounter.text}`;
  }
  function encounterPower(state){
    const a = archetype(state); const focus = a.focus || 'combat';
    const comp = window.companionBonus ? companionBonus(state, focus) : 0;
    const penalty = state.trainingDisadvantage>0 ? -1 : 0;
    return (state.skills.combat||0) + (state.skills[focus]||0) + Math.floor(state.level/2) + comp + penalty;
  }
  function resolveEncounterAction(state, action){
    const e=state.encounter; if(!e) return;
    const a = archetype(state); const focus = a.focus || 'combat';
    const base = encounterPower(state);
    const rolls = {
      attack: base + 2 + gearBonus(state,'attack'),
      ability: base + 3,
      guard: base + 1 + gearBonus(state,'guard'),
      study: base + (state.skills.lore||0) + gearBonus(state,'exploit'),
      exploit: base + 2 + (e.phase>1?2:0) + gearBonus(state,'exploit'),
      background: base + ((state.skills[focus]||0)),
      intimidate: base + (state.skills.persuasion||0),
      bait: base + (state.skills.stealth||0),
      contain: base + (state.skills.craft||0),
      redirect: base + (state.skills.survival||0),
      environment: base + (state.skills.survival||0),
      ritual: base + (state.skills.lore||0) + gearBonus(state,'ritual'),
      command: base + (state.skills.persuasion||0) + gearBonus(state,'command'),
      protect: base + (state.skills.combat||0) + gearBonus(state,'protect'),
      route_cut: base + (state.skills.survival||0),
      split_route: base + (state.skills.stealth||0),
      brace: base + 2 + gearBonus(state,'brace'),
      ward: base + (state.skills.lore||0) + gearBonus(state,'ward'),
      vanish: base + (state.skills.stealth||0) + gearBonus(state,'vanish'),
      fieldkit: base + (state.skills.craft||0) + gearBonus(state,'recovery'),
      companion: base + (state.companions.filter(c=>c.available&&!c.injured).length*2),
      retreat: base + (state.skills.survival||0) + gearBonus(state,'retreat'),
      intercept: base + (state.skills.combat||0) + gearBonus(state,'protect') + gearBonus(state,'guard'),
      focus_cast: base + (state.skills.lore||0) + gearBonus(state,'arcana') + gearBonus(state,'ward'),
      precision_disable: base + (state.skills.stealth||0) + gearBonus(state,'tools') + gearBonus(state,'vanish'),
      rally_line: base + (state.skills.persuasion||0) + gearBonus(state,'coordination') + gearBonus(state,'command')
    };
    const total = (rolls[action]||base) + (rand(20)+1);
    let success = total >= 13 + state.stage + (e.tier==='boss'?4:e.tier==='elite'?2:0);
    if(action==='retreat' && success){ state.lastResult='The line breaks away in usable order.'; state.encounter=null; return; }
    if(success){
      let damage = 3 + Math.floor(total/8);
      if(['exploit','route_cut','split_route','ward','vanish','focus_cast','precision_disable'].includes(action)) damage += 1;
      if(action==='intercept') damage = 2 + Math.floor(total/10);
      if(action==='rally_line') damage = 2 + Math.floor(total/10);
      e.enemyHp -= damage;
      if(action==='fieldkit') state.hp=Math.min(state.maxHp,state.hp+2);
      if(action==='intercept') state.hp=Math.min(state.maxHp,state.hp+1);
      if(action==='focus_cast') state.worldClocks.omens = Math.max(0,(state.worldClocks.omens||0)-1);
      if(action==='precision_disable') state.worldClocks.rival = Math.max(0,(state.worldClocks.rival||0)-1);
      if(action==='rally_line') state.companions.forEach(c=>{ if(c.available && !c.injured) c.trust=(c.trust||1)+1; });
      state.lastResult = `${action.replace(/_/g,' ')} lands. ${e.name.replace(/_/g,' ')} loses ${damage} pressure.`;
    } else {
      const hit = Math.max(1, e.enemyAttack - Math.floor(state.level/5) - (action==='guard'||action==='brace'?1:0));
      state.hp -= hit; state.fatigue += 1;
      state.lastResult = `${action.replace(/_/g,' ')} fails to settle the matter. The counterblow costs ${hit} HP.`;
    }
    e.phase = e.enemyHp <= Math.floor(e.enemyMaxHp/3) ? 3 : e.enemyHp <= Math.floor(e.enemyMaxHp/2) ? 2 : 1;
    if(e.enemyHp<=0){
      state.encounter=null; state.renown += e.tier==='boss'?5:e.tier==='elite'?3:1;
      if(state.telemetry) state.telemetry.wins=(state.telemetry.wins||0)+1;
      state.lastResult=`${e.name.replace(/_/g,' ')} is overcome. The route remembers it.`;
      state.keyMoments.unshift(`Defeated ${e.name.replace(/_/g,' ')}`); state.keyMoments=state.keyMoments.slice(0,20);
    }
  }
  function encounterChoices(state){
    const e=state.encounter; if(!e) return [];
    const a=archetype(state);
    const choices = [
      ['Strike','attack'], ['Use ability','ability'], ['Guard','guard'], ['Study','study'], ['Exploit weakness','exploit'],
      ['Use background leverage','background'], ['Intimidate','intimidate'], ['Contain','contain'], ['Redirect','redirect'], ['Use the environment','environment'], ['Protect the line','protect']
    ];
    if(a.group==='combat') choices.push(['Brace shield and hold','brace'], ['Command the crush','command'], ['Intercept the pressure line','intercept']);
    if(a.group==='magic') choices.push(['Raise a ward','ward'], ['Ritual procedure','ritual'], ['Channel a focused cast','focus_cast']);
    if(a.group==='stealth') choices.push(['Vanish across the line','vanish'], ['Split the route','split_route'], ['Disable the weak joint','precision_disable']);
    if(a.group==='support') choices.push(['Use the field kit','fieldkit'], ['Direct companion pressure','companion'], ['Rally the line','rally_line']);
    const out = choices.map(([label,action])=>({label:`${label}: ${e.name.replace(/_/g,' ')}`,tags:['Encounter'],fn(){resolveEncounterAction(state,action);}}));
    if(state.companions.length && !out.some(o=>/companion/i.test(o.label))) out.push({label:'Call companion support',tags:['Encounter','Companion'],fn(){resolveEncounterAction(state,'companion');}});
    if(e.canRetreat) out.push({label:'Withdraw in good order',tags:['Safe','Encounter'],fn(){resolveEncounterAction(state,'retreat');}});
    return out.slice(0,9);
  }
  window.beginEncounter = beginEncounter;
  window.encounterChoices = encounterChoices;
})();
