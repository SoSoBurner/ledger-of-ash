
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

    const seed = (state.dayCount + state.timeIndex + state.worldClocks.pressure) % 4;

    const opens = [
      `${loc.name} at ${time}. ${loc.summary}`,
      `The ${time} settles into ${loc.name} — ${loc.summary.toLowerCase()}`,
      `${loc.name} keeps its shape into ${time}: ${loc.summary.toLowerCase()}`,
      `At ${time}, ${loc.name} holds to what it is — ${loc.summary.toLowerCase()}`
    ];

    const pressures = [
      `${cap(pressure)} runs underneath the surface and has changed how people move through this space.`,
      `The running strain here is ${pressure}. It shows in how thresholds are held and how people time their movements.`,
      `${cap(pressure)} has altered the usual patterns — caution is more deliberate than it was.`,
      `The current weight is ${pressure}. Locals have adapted, but the adaptation is visible.`
    ];

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

  // ── CENTRAL NARRATIVE PANEL ──────────────────────────────

  function composeLocalityLayer(ss, gs){
    const loc = ss.locality || {};
    const time = ['dawn','morning','midday','late day','night'][(gs.timeIndex||0) % 5];
    const pressure = ss.activePressure || '';
    // Stage I: open with background-specific narrative if available
    let openLine;
    if(ss.stage === 1 && ss.stage1BgEntry && ss.stage1BgEntry.narrative){
      openLine = ss.stage1BgEntry.narrative;
    } else {
      const seed = ((gs.dayCount||0) + (gs.timeIndex||0) + (gs.worldClocks&&gs.worldClocks.pressure||0)) % 4;
      const opens = [
        `${loc.name||'This place'} at ${time}. ${loc.summary||'An uncertain locality.'}`,
        `The ${time} settles into ${loc.name||'this place'} — ${(loc.summary||'').toLowerCase()}`,
        `${loc.name||'This place'} keeps its shape into ${time}: ${(loc.summary||'').toLowerCase()}`,
        `At ${time}, ${loc.name||'this place'} holds to what it is — ${(loc.summary||'').toLowerCase()}`
      ];
      openLine = opens[seed];
    }
    const pressureLine = pressure ? `${cap(pressure)} shapes how people move and where they pause.` : '';
    // Law feel line — surfaces canonical law identity of the locality
    const lawLine = loc.lawFeel ? `The operating law here: ${loc.lawFeel.charAt(0).toLowerCase()}${loc.lawFeel.slice(1)}.` : '';
    // Stage I contradiction hint
    let contradictionLine = '';
    if(ss.stage === 1 && ss.stage1BgEntry && ss.stage1BgEntry.contradiction && (ss.stageProgress||0) === 0){
      contradictionLine = `The first thing that does not add up: ${ss.stage1BgEntry.contradiction}.`;
    }
    return [openLine, pressureLine, lawLine, contradictionLine].filter(Boolean).join(' ');
  }

  function composeImmediateResponseLayer(ss, gs){
    const last = gs.lastResult || '';
    if(!last || last === 'Your ledger waits for its first truth.' || last === 'Create a new legend to enter the world.') return '';
    const t = ss.recentOutcomeType;
    const choice = ss.lastChoiceLabel ? `After: ${ss.lastChoiceLabel}.` : '';
    if(t === 'combat_start') return `${choice} A confrontation forces itself into the foreground.`.trim();
    if(t === 'combat_ongoing') return `${choice} The fight continues. Round ${gs.combatSession?gs.combatSession.round:'—'}.`.trim();
    if(t === 'combat_victory') return `${choice} The confrontation resolved. The space holds a different weight now.`.trim();
    if(t === 'combat_flee') return `${choice} Distance gained. The threat did not follow, or chose not to.`.trim();
    if(t === 'combat_mercy') return `${choice} The merciful choice leaves its own mark on how the space reads.`.trim();
    if(t === 'combat_execute') return `${choice} The execution closes one door and opens a longer account.`.trim();
    if(t === 'combat_interrogate') return `${choice} Interrogation yields something the record did not show.`.trim();
    if(t === 'combat_loot') return `${choice} Dealt with efficiently. Gold and evidence secured.`.trim();
    if(t === 'moral_good') return `${choice} The intervention left a mark on the place and on the ledger.`.trim();
    if(t === 'moral_evil') return `${choice} The gain is real. The tab is longer than it looks.`.trim();
    if(t === 'civic_lawful') return `${choice} The legitimate path cost time but cost less else.`.trim();
    if(t === 'civic_chaotic') return `${choice} The bypass worked, at least this time. The official channels are watching.`.trim();
    if(t === 'observe') return `${choice} A quieter read begins to surface what the usual view misses.`.trim();
    if(t === 'class_combat') return `${choice} Martial discipline surfaces something the investigative path would have missed.`.trim();
    if(t === 'class_magic') return `${choice} Arcane attention reveals layered pressures beneath the presenting surface.`.trim();
    if(t === 'class_stealth') return `${choice} The unobserved angle opens a different kind of picture.`.trim();
    if(t === 'class_support') return `${choice} Practical engagement shifts who is available and what they will say.`.trim();
    return last;
  }

  function composePressureLayer(ss, gs){
    const parts = [];
    const threat = ss.activeThreat;
    if(threat){
      if(threat.creature) parts.push(`${cap((threat.creature||'').replace(/_/g,' '))} has been sighted in this area.`);
      if(threat.hazard) parts.push(`${cap((threat.hazard||'').replace(/_/g,' '))} creates a secondary complication.`);
    }
    const heat = ss.civicHeat || 0;
    if(heat >= 3) parts.push(`Civic authority heat is elevated — ${heat} units registered.`);
    if(heat >= 6) parts.push(`Warrants may be issued at this level of exposure.`);
    if(gs.worldClocks && gs.worldClocks.rival > 4) parts.push(`The rival clock has run long. Opposing pressure is coherent and organized now.`);
    if(ss.inCombat) parts.push(`A confrontation is in progress.`);
    if(ss.inPostCombat) parts.push(`The immediate threat is down. A resolution is required.`);
    return parts.join(' ');
  }

  function composeArchetypePerceptionLayer(ss, gs){
    const group = ss.archetypeGroup || 'combat';
    const seed = ((gs.dayCount||0) + (gs.timeIndex||0)) % 4;

    if(group === 'combat'){
      const lines = [
        `Bodies and spacing read first — two guards on the left flank, one threshold that has not been properly held.`,
        `The terrain tells the engagement story before anyone fires. Weight, cover, and the nearest reload point.`,
        `Force distribution is uneven. The near formation has a gap a direct push would exploit.`,
        `Guard discipline is visible at a glance. The strong side holds; the weak side hesitates.`
      ];
      return lines[seed];
    }
    if(group === 'magic'){
      const lines = [
        `Ward strain on the near threshold — old layering, not fresh. The residue around the central post suggests recent ritual interference.`,
        `Charged residue pools near the south face. Whoever was here last left in a hurry or did not care about the trace.`,
        `The unstable material cluster near the intake is a problem waiting to become an event. Someone is managing it badly.`,
        `Ritual order is disrupted in this space. The breaks are recent and deliberate, not natural decay.`
      ];
      return lines[seed];
    }
    if(group === 'stealth'){
      const lines = [
        `Three sightline gaps, one timing window of about forty seconds near the east passage. Two watchers, both routine.`,
        `The watched corners are obvious. The corner that is not watched is the one that matters.`,
        `Timing runs on a predictable cycle. The gap is consistent enough to use, but just barely.`,
        `Exit paths: two clear, one contested. Sightline overlap covers the main route. The secondary is slower but clean.`
      ];
      return lines[seed];
    }
    const lines = [
      `Three people here are running on empty. One looks like they have not eaten in a day. Practical weakness is everywhere.`,
      `The frayed discipline shows in how tools are handled and how orders are not followed. Someone useful is still trying.`,
      `Resources are distributed badly. Half the available help is pointed at the wrong problem.`,
      `The infrastructure is holding but not by much. One useful intervention now would change the whole downstream shape.`
    ];
    return lines[seed];
  }

  function composeOpportunityLayer(ss, gs){
    const parts = [];
    if(ss.namedPlacements && ss.namedPlacements.length){
      const npc = ss.namedPlacements[0];
      parts.push(`${cap((npc.id||'').replace(/_/g,' '))} is present — ${npc.role||'role unspecified'}.`);
    }
    if(ss.stage >= 2 && ss.routeHint){
      parts.push(`The ${ss.routeHint} route runs through here and carries more than it shows.`);
    }
    // Companion trust hint — show when close to recruitable
    if(gs.companionTrust && window.COMPANION_DEFS){
      for(const [id, def] of Object.entries(window.COMPANION_DEFS)){
        if(def.locality !== (ss.locality&&ss.locality.id)) continue;
        if(gs.companions && gs.companions.some(c=>c.id===id)) continue;
        const trust = gs.companionTrust[id]||0;
        if(trust >= 2 && trust < 4) parts.push(`${def.name} has taken notice of your work here.`);
        if(trust >= 4) parts.push(`${def.name} is ready to speak with you directly.`);
        break;
      }
    }
    // Party status
    if(ss.companionCount > 0){
      parts.push(`${ss.companionCount} companion${ss.companionCount>1?'s':''} active.`);
    }
    // Wound pressure
    if(ss.wounds && ss.wounds.length >= 2){
      parts.push(`Wound accumulation (${ss.wounds.length}) is affecting operational capacity.`);
    }
    return parts.join(' ');
  }

  function finalizePanelText(layers){
    return layers.filter(l=>l && l.trim()).join('\n\n').replace(/[ \t]+\n/g,'\n').trim();
  }

  function composeCentralNarrativePanel(sceneState, gameState){
    const layers = [
      composeLocalityLayer(sceneState, gameState),
      composePressureLayer(sceneState, gameState),
      composeArchetypePerceptionLayer(sceneState, gameState),
      composeImmediateResponseLayer(sceneState, gameState),
      composeOpportunityLayer(sceneState, gameState)
    ];
    return finalizePanelText(layers);
  }

  window.localityNarrative = localityNarrative;
  window.resultNarrative = resultNarrative;
  window.lifeOverviewText = lifeOverview;
  window.legendSummary = legendSummary;
  window.composeCentralNarrativePanel = composeCentralNarrativePanel;
})();
