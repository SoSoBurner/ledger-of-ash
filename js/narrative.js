
(function(){
  function pick(arr, n){ return arr && arr.length ? arr[n % arr.length] : ''; }
  function classSense(state){
    const a = (window.ARCHETYPES||[]).find(x=>x.id===state.archetype) || {group:'combat'};
    if(a.group==='combat') return 'Bodies, spacing, weight, and the meaning of cover read first.';
    if(a.group==='magic') return 'Ward strain, charged residue, ritual order, and unstable materials rise to the surface first.';
    if(a.group==='stealth') return 'Sightlines, timing gaps, watched corners, and exit paths stand out before anything louder does.';
    return 'Practical weakness, frayed discipline, and who still has enough structure to help become obvious first.';
  }
  function localityNarrative(state, loc, ctx){
    const time = ['dawn','morning','midday','late day','night'][state.timeIndex % 5];
    const greeting = pick(loc.greetings, state.dayCount + state.stage);
    const ritual = pick(loc.rituals, state.dayCount + state.worldClocks.omens);
    const pressure = ctx.pressure || pick(loc.pressures, state.worldClocks.pressure);
    const route = ctx.routeHint ? `The active lane is ${ctx.routeHint.toLowerCase()}, carrying the feel of ${ctx.routeStyle || 'an uncertain route'} and a usable sense of ${ctx.routeRisk || 'risk'}.` : '';
    const hazard = ctx.hazardHint ? `Signs of ${ctx.hazardHint.replace(/_/g,' ')} are plain enough to shape how people place their bodies and their trust.` : '';
    const creature = ctx.creatureHint ? `People keep a wider margin than usual, as though ${ctx.creatureHint.replace(/_/g,' ')} might test the edge of the scene again.` : '';
    const service = ctx.serviceHint ? `${ctx.serviceHint} now matters more than it did a moment ago.` : '';
    const routePressure = ctx.familyHint ? `${ctx.familyHint} is the shape this widening now takes.` : '';
    const destination = ctx.destinationHint ? `${ctx.destinationHint}` : '';
    return `${loc.name} at ${time} holds to ${loc.summary.toLowerCase()} ${route} ${routePressure} The immediate pressure is ${pressure}. ${greeting ? `Locals keep to ${greeting.toLowerCase()}.` : ''} ${ritual ? `A nearby rite follows ${ritual.toLowerCase()}.` : ''} One exchange stays tight and practical, another thins into visible fatigue, and both make the mood readable without anyone turning it into performance. ${hazard} ${creature} ${destination} ${service} ${classSense(state)}`.replace(/\s+/g,' ').trim();
  }
  function resultNarrative(text){
    return text || 'The place settles into a new shape, and the next choice now belongs to that altered space.';
  }
  function lifeOverview(state){
    const arch = (window.ARCHETYPES||[]).find(a=>a.id===state.archetype) || {name:'Adventurer', group:'combat'};
    const bg = ((window.BACKGROUNDS||{})[state.archetype]||[]).find(b=>b.id===state.backgroundId) || {name:'Unknown Hand', theme:'local strain'};
    const loc = (window.KEY_LOCALITIES||{})[state.location] || {name:'Unknown locality', summary:'an uncertain place'};
    return `${state.name}, ${state.age}, ${state.presentation.toLowerCase()}, ${state.lineage}, comes out of ${loc.name} through a life shaped by ${bg.theme}. ${arch.name} is not a title here so much as the way pressure has already taught the body and mind to answer. ${loc.summary} is the world that produced this start.`;
  }
  function legendSummary(legend){
    const pieces = [];
    pieces.push(`${legend.name} of ${legend.originLocalityName}, ${legend.archetypeName} / ${legend.backgroundName}.`);
    if(legend.lifeOverview) pieces.push(legend.lifeOverview);
    if (legend.keyMoments && legend.keyMoments.length) pieces.push(`Key moments: ${legend.keyMoments.slice(0,3).join(' | ')}`);
    if (legend.safeZones && legend.safeZones.length) pieces.push(`Safe zones: ${legend.safeZones.slice(0,3).join(' → ')}`);
    if (legend.routeScoutLog && legend.routeScoutLog.length) pieces.push(`Route memory: ${legend.routeScoutLog.slice(0,2).join(' | ')}`);
    if (legend.companions && legend.companions.length) pieces.push(`Companions: ${legend.companions.join(', ')}`);
    if (legend.finalOutcome) pieces.push(`Outcome: ${legend.finalOutcome}.`);
    if (legend.stage5Dead) pieces.push(`The legend ended in Stage V permadeath.`);
    return pieces.join(' ');
  }
  window.localityNarrative = localityNarrative;
  window.resultNarrative = resultNarrative;
  window.lifeOverviewText = lifeOverview;
  window.legendSummary = legendSummary;
})();
