
(function(){
  function pick(arr, n){ return arr && arr.length ? arr[n % arr.length] : ''; }

  function classSense(state){
    const a = (window.ARCHETYPES||[]).find(x=>x.id===state.archetype) || {group:'combat'};
    if(a.group==='combat') return 'Bodies, spacing, weight, and the meaning of cover read first.';
    if(a.group==='magic') return 'Ward strain, charged residue, ritual order, and unstable materials rise to the surface first.';
    if(a.group==='stealth') return 'Sightlines, timing gaps, watched corners, and exit paths stand out before anything louder does.';
    return 'Practical weakness, frayed discipline, and who still has enough structure to help become obvious first.';
  }

  function cap(s){ return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

  function localityNarrative(state, loc, ctx){
    const time = ['dawn','morning','midday','late day','night'][state.timeIndex % 5];
    const pressure = ctx.pressure || pick(loc.pressures, state.worldClocks.pressure);
    const greeting = pick(loc.greetings, state.dayCount + state.stage);
    const ritual = pick(loc.rituals, state.dayCount + state.worldClocks.omens);

    // Seed varies with time and pressure clock so text shifts after each action
    const seed = (state.dayCount + state.timeIndex + state.worldClocks.pressure) % 4;

    // Opening: situate in place and time — four rotations
    const opens = [
      `${loc.name} at ${time}. ${loc.summary}`,
      `The ${time} settles into ${loc.name} — ${loc.summary.toLowerCase()}`,
      `${loc.name} keeps its shape into ${time}: ${loc.summary.toLowerCase()}`,
      `At ${time}, ${loc.name} holds to what it is — ${loc.summary.toLowerCase()}`
    ];

    // Pressure: woven as scene texture, not a label
    const pressures = [
      `${cap(pressure)} runs underneath the surface and has changed how people move through this space.`,
      `The running strain here is ${pressure}. It shows in how thresholds are held and how people time their movements.`,
      `${cap(pressure)} has altered the usual patterns — caution is more deliberate than it was.`,
      `The current weight is ${pressure}. Locals have adapted, but the adaptation is visible.`
    ];

    // Social texture: greeting + ritual woven as observation
    const greetingLines = [
      `The usual approach here runs through ${greeting}.`,
      `${cap(greeting)} mark how people signal intent in this space.`,
      `Exchanges tend to open with ${greeting}.`,
      `The expected register is ${greeting}.`
    ];
    const ritualLines = [
      `${cap(ritual)} are present and close to the surface.`,
      `The nearby practice of ${ritual} sits visible to anyone reading the scene.`,
      `${cap(ritual)} mark what this place keeps near.`,
      `Someone close by is keeping ${ritual}.`
    ];

    // Route and pressure chain hints
    const details = [];
    if(ctx.routeHint) details.push(`The ${ctx.routeHint.toLowerCase()} runs ${ctx.routeStyle||'uncertain'} through here — the risk reads as ${ctx.routeRisk||'unclear'}.`);
    if(ctx.familyHint && state.stage >= 2) details.push(`${ctx.familyHint} is the shape the widening pressure takes.`);
    if(ctx.hazardHint) details.push(`Signs of ${ctx.hazardHint.replace(/_/g,' ')} are legible in how people hold themselves.`);
    if(ctx.creatureHint) details.push(`The margin people keep from the edges suggests ${ctx.creatureHint.replace(/_/g,' ')} has not entirely cleared.`);
    if(ctx.destinationHint) details.push(ctx.destinationHint);
    if(ctx.serviceHint) details.push(`${ctx.serviceHint} carries more weight than it did before.`);

    const parts = [
      opens[seed],
      pressures[seed],
      greeting ? greetingLines[seed] : '',
      ritual ? ritualLines[seed] : '',
      ...details,
      classSense(state)
    ];

    return parts.filter(Boolean).join(' ').replace(/\s+/g,' ').trim();
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
