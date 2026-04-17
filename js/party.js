
(function(){
  function currentCompanionCandidate(state){ return window.COMPANION_CANDIDATES[state.location] || null; }
  function recruitChoice(state){
    const c = currentCompanionCandidate(state); if(!c) return null;
    if(state.companions.some(x=>x.id===c.id)) return null;
    const trust = state.recruitableSeen[c.id] || 0;
    return {
      label: trust >= 2 ? `Ask ${c.name} to join the road` : `Build trust with ${c.name}`,
      tags:['Safe','Companion'],
      fn(){
        if(trust >= 2){
          state.companions.push({id:c.id,name:c.name,bonus:c.bonus,trust:2,injured:false,available:true});
          state.lastResult = `${c.name} joins the road and begins shaping ${c.bonus} pressure with the rest of the party.`;
        } else {
          state.recruitableSeen[c.id] = trust + 1;
          state.lastResult = `${c.name} does not commit yet, but the exchange shifts future trust.`;
        }
      }
    };
  }
  function companionBonus(state, skill){ return state.companions.filter(c=>c.available && !c.injured && c.bonus===skill).length; }
  function campChoices(state){
    const arr = [
      {label:'Rest and bind wounds',tags:['Safe','Camp'],fn(){ state.hp=Math.min(state.maxHp,state.hp+4); state.fatigue=Math.max(0,state.fatigue-1); state.lastResult='Rest turns the edge back into something usable.'; }},
      {label:'Review the route and next pressure',tags:['Camp','Route'],fn(){ state.routeScoutLog.unshift(`Reviewed route pressure at ${state.currentSafeZone}`); state.routeScoutLog=state.routeScoutLog.slice(0,20); state.lastResult='The route is re-read in quiet detail until the next opening becomes clearer.'; }},
      {label:'Train under pressure',tags:['Risky','Camp'],fn(){ state.trainingDisadvantage=5; state.lastResult='Training sharpens the line, but leaves the next few turns more exposed.'; }}
    ];
    if(state.companions.length){
      arr.push({label:'Speak with the party',tags:['Camp','Companion'],fn(){ state.companions.forEach(c=>{ if(!c.injured) c.trust=(c.trust||1)+1; }); state.lastResult='Camp talk turns strain into usable trust and sharper expectations.'; }});
      if(state.companions.some(c=>c.injured)) arr.push({label:'Treat injured companions',tags:['Camp','Recovery'],fn(){ state.companions.forEach(c=>{ if(c.injured){ c.injured=false; c.available=true; }}); state.lastResult='Field care returns injured companions to the line.'; }});
    }
    return arr;
  }
  window.recruitChoice = recruitChoice;
  window.companionBonus = companionBonus;
  window.campChoices = campChoices;
})();
