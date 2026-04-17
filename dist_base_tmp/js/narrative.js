function pick(arr, idx) { return arr[(idx || 0) % arr.length]; }

function localityNarrative(state, locality, opts = {}) {
  const timeName = TIME_NAMES[state.timeIndex % TIME_NAMES.length];
  const timeFlavor = {
    Dawnrise: 'First labor and prayer arrive before full warmth or certainty settles into the lanes.',
    Midlight: 'The place shows its working face without apology and without much pause.',
    Duskcall: 'Lanterns, bells, and tired voices change the shape of ordinary order.',
    Nightwatch: 'Habit grows stricter under reduced light, and whatever does not belong stands out faster.'
  }[timeName];
  const pressure = opts.pressure || pick(locality.pressure, state.dayCount + state.timeIndex);
  const greet = pick(locality.greetings, state.dayCount + state.timeIndex);
  const ritual = pick(locality.rituals, state.dayCount + 1);
  const local1 = locality.locals[0] || 'workers';
  const local2 = locality.locals[1] || 'clerks';
  const local3 = locality.locals[2] || 'watchers';
  const socialBeats = [
    `${local1[0].toUpperCase()+local1.slice(1)} keep their voices low while ${local2} answer with clipped impatience near a working threshold. A few steps away, ${local3} let relief show openly when a smaller problem is contained before it spreads.`,
    `${local1[0].toUpperCase()+local1.slice(1)} move with fast practiced restraint while ${local2} trade a sharper edge of irritation over counting, rank, or delay. Nearby, ${local3} fall quiet the moment procedure reasserts itself.`,
    `${local1[0].toUpperCase()+local1.slice(1)} show a contained weariness that never quite becomes collapse, while ${local2} answer one another with brisk formality. At the edge of the lane, ${local3} slip into a smaller, almost private warmth once the immediate pressure passes.`
  ];
  const routeHint = opts.routeHint ? `Route talk keeps circling ${opts.routeHint}, and people measure distance to it like it could become the whole day.` : '';
  const atlasHint = opts.routeAtlas ? `People describe the line in practical terms: ${opts.routeAtlas}.` : '';
  const hazardHint = opts.hazardHint ? `Visible signs point toward ${opts.hazardHint}; local work and prayer both bend around it.` : '';
  const creatureHint = opts.creatureHint ? `People are reading the area as though ${opts.creatureHint} could show again, and small habits tighten in response.` : '';
  const namedHint = opts.namedHint ? `Names still matter here: ${opts.namedHint}. The way locals angle their voices around those names says almost as much as any formal notice.` : '';
  const faithLine = `${locality.faith[0].toUpperCase() + locality.faith.slice(1)}`;
  return `${locality.approach} ${locality.inside} ${timeFlavor}

${greet}. ${ritual}. ${faithLine}

${pick(socialBeats, state.dayCount + state.timeIndex)}

Power shows through ${locality.power.join(', ')}, while ordinary life leans on ${locality.economy.join(', ')}. Pressure gathers around ${pressure}. ${routeHint} ${atlasHint} ${hazardHint} ${creatureHint} ${namedHint}`.trim();
}


function rescueNarrative(state, locality, rescueSource, consequences) {
  return `${locality.name} reads differently after the near loss. The surrounding order now carries the rescue inside it: shortened patience, practical voices, and the quiet speed of people who have already decided that survival must come before explanation.

${rescueSource} handled the recovery, and the move into ${locality.safeZone} makes the cost plain. The route does not rewind; it resumes from the rescue with changed timing, changed witnesses, and changed expectations. ${consequences}`;
}

function legendSummary(legend) {
  const base = `${legend.name} — ${legend.class} / ${legend.background}\n${legend.summary}\nDay ${legend.day} · Renown ${legend.renown}`;
  const party = `Companions: ${legend.companions.join(', ') || 'None'}`;
  const rescues = `Rescues: ${legend.rescues.join(' | ') || 'None recorded'}`;
  const confront = `Confrontations: ${legend.confrontations.join(' | ') || 'None recorded'}`;
  const scars = `Scars: ${legend.scars.join(', ') || 'None recorded'}`;
  const routes = `Routes: ${legend.routes.join(', ') || 'No long routes recorded'}`;
  const key = `Key moments: ${legend.keyMoments.join(' | ') || 'No major moments stored'}`;
  const metrics = `Balance telemetry: ${legend.metricsSummary || 'Not recorded'}`;
  return `${base}\n${party}\n${scars}\n${routes}\n${key}\n${metrics}`;
}


function routeAtlasNote(routeId) {
  if (typeof ROUTE_ATLAS === 'undefined' || !routeId || !ROUTE_ATLAS[routeId]) return '';
  const r = ROUTE_ATLAS[routeId];
  return `${r.style}; ${r.note}`;
}

// ----- Batch 17 narrative/legend tangibility -----
function localityNarrative(state, locality, opts = {}) {
  const timeName = TIME_NAMES[state.timeIndex % TIME_NAMES.length];
  const timeFlavor = {
    Dawnrise: 'First labor and prayer arrive before full warmth or certainty settles into the lanes.',
    Midlight: 'The place shows its working face without apology and without much pause.',
    Duskcall: 'Lanterns, bells, and tired voices change the shape of ordinary order.',
    Nightwatch: 'Habit grows stricter under reduced light, and whatever does not belong stands out faster.'
  }[timeName];
  const pressure = opts.pressure || pick(locality.pressure, state.dayCount + state.timeIndex);
  const greet = pick(locality.greetings, state.dayCount + state.timeIndex);
  const ritual = pick(locality.rituals, state.dayCount + 1);
  const local1 = locality.locals[0] || 'workers';
  const local2 = locality.locals[1] || 'clerks';
  const local3 = locality.locals[2] || 'watchers';
  const socialBeats = [
    `${local1[0].toUpperCase()+local1.slice(1)} keep their voices low while ${local2} answer with clipped impatience near a working threshold. A few steps away, ${local3} let relief show openly when a smaller problem is contained before it spreads.`,
    `${local1[0].toUpperCase()+local1.slice(1)} move with fast practiced restraint while ${local2} trade a sharper edge of irritation over counting, rank, or delay. Nearby, ${local3} fall quiet the moment procedure reasserts itself.`,
    `${local1[0].toUpperCase()+local1.slice(1)} show a contained weariness that never quite becomes collapse, while ${local2} answer one another with brisk formality. At the edge of the lane, ${local3} slip into a smaller, almost private warmth once the immediate pressure passes.`
  ];
  const routeHint = opts.routeHint ? `Route talk keeps circling ${opts.routeHint}, and people measure distance to it like it could become the whole day.` : '';
  const atlasHint = opts.routeAtlas ? `People describe the line in practical terms: ${opts.routeAtlas}.` : '';
  const hazardHint = opts.hazardHint ? `Visible signs point toward ${opts.hazardHint}; local work and prayer both bend around it.` : '';
  const creatureHint = opts.creatureHint ? `People are reading the area as though ${opts.creatureHint} could show again, and small habits tighten in response.` : '';
  const familyHint = opts.familyNote ? `${opts.familyNote}` : '';
  const namedHint = opts.namedHint ? `Names still matter here: ${opts.namedHint}. The way locals angle their voices around those names says almost as much as any formal notice.` : '';
  const faithLine = `${locality.faith[0].toUpperCase() + locality.faith.slice(1)}`;
  return `${locality.approach} ${locality.inside} ${timeFlavor}

${greet}. ${ritual}. ${faithLine}

${pick(socialBeats, state.dayCount + state.timeIndex)}

Power shows through ${locality.power.join(', ')}, while ordinary life leans on ${locality.economy.join(', ')}. Pressure gathers around ${pressure}. ${routeHint} ${atlasHint} ${hazardHint} ${creatureHint} ${familyHint} ${namedHint}`.trim();
}

function legendSummary(legend) {
  const base = `${legend.name} — ${legend.class} / ${legend.background}\n${legend.summary}\nDay ${legend.day} · Renown ${legend.renown} · ${legend.tier || 'Unranked legend'}`;
  const party = `Companions: ${legend.companions.join(', ') || 'None'}`;
  const rescues = `Rescues: ${legend.rescues.join(' | ') || 'None recorded'}`;
  const confront = `Confrontations: ${legend.confrontations.join(' | ') || 'None recorded'}`;
  const scars = `Scars: ${legend.scars.join(', ') || 'None recorded'}`;
  const routes = `Routes: ${legend.routes.join(', ') || 'No long routes recorded'}`;
  const key = `Key moments: ${legend.keyMoments.join(' | ') || 'No major moments stored'}`;
  const metrics = `Balance telemetry: ${legend.metricsSummary || 'Not recorded'}`;
  const safezones = `Safe zones: ${(legend.safeZoneHistory || []).join(' | ') || 'No safe-zone history stored'}`;
  const scouts = `Route scouts: ${(legend.routeScoutLog || []).join(' | ') || 'No scouting history stored'}`;
  return `${base}\n${party}\n${scars}\n${routes}\n${rescues}\n${confront}\n${safezones}\n${scouts}\n${key}\n${metrics}`;
}


// ----- Batch 18 tangible progress: family milestone legend summaries -----
const __batch17LegendSummary = legendSummary;
function legendSummary(legend) {
  const base = __batch17LegendSummary(legend);
  const milestones = legend.milestones && legend.milestones.length ? `Milestones: ${legend.milestones.join(' | ')}` : 'Milestones: none recorded';
  const finalActs = legend.finalActs && legend.finalActs.length ? `Final acts: ${legend.finalActs.join(' | ')}` : 'Final acts: none recorded';
  return `${base}\n${milestones}\n${finalActs}`;
}
