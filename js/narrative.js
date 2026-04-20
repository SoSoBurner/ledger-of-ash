
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
    const seed = ((gs.dayCount||0) + (gs.timeIndex||0) + (gs.worldClocks&&gs.worldClocks.pressure||0)) % 4;

    // Time-of-day impression
    let openLine;
    if(ss.stage === 1 && ss.stage1BgEntry && ss.stage1BgEntry.narrative){
      openLine = ss.stage1BgEntry.narrative;
    } else {
      const opens = [
        `${loc.name||'This place'} at ${time}. ${loc.summary||'An uncertain locality.'}`,
        `The ${time} settles into ${loc.name||'this place'} — ${(loc.summary||'').toLowerCase()}`,
        `${loc.name||'This place'} keeps its shape into ${time}: ${(loc.summary||'').toLowerCase()}`,
        `At ${time}, ${loc.name||'this place'} holds to what it is — ${(loc.summary||'').toLowerCase()}`
      ];
      openLine = opens[seed];
    }

    // Visible movement habits — pressure bends how people hold the space
    let movementLine = '';
    if(pressure){
      const movements = [
        `The weight of ${pressure} shows in how people move — thresholds are held deliberately and paths chosen with care.`,
        `${cap(pressure)} is the running pressure here. It shows in posture and in the space people leave between themselves.`,
        `People have adapted to ${pressure}. The adaptation is in how long they pause before entering a space.`,
        `Under ${pressure}, movement is quieter and more intentional than the usual pace of this place.`
      ];
      movementLine = movements[seed % movements.length];
    }

    // Greeting / shared-space behavior as observable scene detail
    let greetingLine = '';
    const greetArr = loc.greetings || [];
    if(greetArr.length){
      const g = greetArr[((gs.dayCount||0) + (gs.stage||1)) % greetArr.length];
      const greetings = [
        `The expected register here runs to ${g.toLowerCase()}. That habit is visible in how exchanges open.`,
        `Exchanges tend to open around ${g.toLowerCase()} — the expected social surface, observed by most.`,
        `${cap(g)} is the working approach, and most people follow it without thought.`,
        `The shared-space habit: ${g.toLowerCase()}. Compliance and deviation are both readable.`
      ];
      greetingLine = greetings[seed % greetings.length];
    }

    // Visible devotional or observance act
    let ritualLine = '';
    const ritArr = loc.rituals || [];
    if(ritArr.length){
      const r = ritArr[((gs.dayCount||0) + (gs.worldClocks&&gs.worldClocks.omens||0)) % ritArr.length];
      const rituals = [
        `${cap(r)} are visible nearby, performed without particular ceremony.`,
        `The nearby practice of ${r.toLowerCase()} sits at the surface of the space.`,
        `${cap(r)} — present and close enough to read.`,
        `Someone close is keeping ${r.toLowerCase()}, unhurried and uninterrupted.`
      ];
      ritualLine = rituals[seed % rituals.length];
    }

    // Stage I contradiction hint
    let contradictionLine = '';
    if(ss.stage === 1 && ss.stage1BgEntry && ss.stage1BgEntry.contradiction && (ss.stageProgress||0) === 0){
      contradictionLine = `The first thing that does not add up: ${ss.stage1BgEntry.contradiction}.`;
    }

    return [openLine, movementLine, greetingLine, ritualLine, contradictionLine].filter(Boolean).join(' ');
  }

  function composeImmediateResponseLayer(ss, gs){
    const last = gs.lastResult || '';
    if(!last || last === 'Your ledger waits for its first truth.' || last === 'Create a new legend to enter the world.') return '';
    const t = ss.recentOutcomeType;
    const seed = ((gs.dayCount||0) + (gs.timeIndex||0)) % 3;

    if(t === 'combat_start'){
      return [
        `A confrontation forces itself into the foreground — the space narrows to what is immediately in front.`,
        `The distance collapsed faster than expected. A confrontation is now the only available path.`,
        `The confrontation opened before any of the quieter alternatives could settle.`
      ][seed];
    }
    if(t === 'combat_ongoing'){
      return `The fight continues. Round ${gs.combatSession?gs.combatSession.round:'—'} — position and tempo are the only currencies right now.`;
    }
    if(t === 'combat_victory'){
      return [
        `The confrontation resolved. The space holds a different weight now — quieter in the way that follows something that cannot be undone.`,
        `The threat is down. What remains is the accounting: what was spent, what was changed, what is now owed.`,
        `It ended. The ground is the same and the ledger is longer.`
      ][seed];
    }
    if(t === 'combat_flee'){
      return [
        `Distance gained. The threat did not follow — or chose not to, which is its own kind of statement.`,
        `The withdrawal worked. Nothing gained except continued movement, which is not nothing.`,
        `Retreat completed. The calculation that made it necessary has not changed.`
      ][seed];
    }
    if(t === 'combat_mercy'){
      return [
        `The merciful choice leaves its own mark on how the space reads — both on you and on what was spared.`,
        `Mercy was the choice. It cost something and left something. Both sides of that are true at once.`,
        `The person is alive because of a decision that could have gone the other way. That distinction matters here.`
      ][seed];
    }
    if(t === 'combat_execute'){
      return [
        `The execution closes one door and opens a longer account. The space absorbs it the way spaces absorb irreversible things.`,
        `It is done. The door is shut and the record is longer.`,
        `The choice was made. What follows from it will follow from it regardless of whether you watch.`
      ][seed];
    }
    if(t === 'combat_interrogate'){
      return [
        `Interrogation yields something the record did not show — information extracted from a situation that was already violent.`,
        `The questioning produced results. The means are part of the ledger now whether or not the results justify them.`,
        `What was learned could not have been learned another way, which is the usual justification for methods like this.`
      ][seed];
    }
    if(t === 'combat_loot'){
      return `The threat is handled and the useful items are secured. The scene is cleaner than it was.`;
    }
    if(t === 'moral_good'){
      return [
        `The intervention left a mark on this place and on the ledger — the kind that does not wash off quickly.`,
        `What was done here was the right thing, which is rarer than it should be and costs more than it used to.`,
        `The action is in the record now. So is its shape.`
      ][seed];
    }
    if(t === 'moral_evil'){
      return [
        `The gain is real. The tab is longer than it looks, and it will be presented at a time of someone else's choosing.`,
        `It worked. What it cost has not fully surfaced yet.`,
        `The action landed. The full weight of it will arrive later, as it always does.`
      ][seed];
    }
    if(t === 'civic_lawful'){
      return [
        `The legitimate path cost time and patience, which is the honest price of working through official channels.`,
        `The authorized route worked. It was slower and more visible than the alternatives.`,
        `Official process ran its course. The outcome is cleaner for having followed the form.`
      ][seed];
    }
    if(t === 'civic_chaotic'){
      return [
        `The bypass worked, at least this time. The official channels noted the deviation and adjusted their posture accordingly.`,
        `The shortcut landed. Unofficial paths have their own accounting and theirs is not yet settled.`,
        `It worked outside the approved route. That is in the record somewhere, in a language not yet visible.`
      ][seed];
    }
    if(t === 'observe'){
      return [
        `A quieter read begins to surface what the usual view misses — details that announce themselves only to the patient.`,
        `Observation produced something. The picture is wider than it was before the patience was paid.`,
        `The careful look found what the fast look cannot. What was found does not yet have a full shape.`
      ][seed];
    }
    if(t === 'class_combat'){
      return [
        `Martial discipline surfaces something the investigative path would have missed — weight and position open questions that words close off.`,
        `The physical read landed. Force has its own epistemology and it produced a result here.`,
        `The hard approach worked. The answers it yields are different from the answers softer methods produce.`
      ][seed];
    }
    if(t === 'class_magic'){
      return [
        `Arcane attention reveals layered pressures beneath the presenting surface — residue and ward strain legible to the trained read.`,
        `The magical analysis produced something the physical read could not. Layers visible only to those who know what to look for.`,
        `The arcane surface opened. What it showed was not what the mundane picture suggested.`
      ][seed];
    }
    if(t === 'class_stealth'){
      return [
        `The unobserved angle opens a different kind of picture — what people do when they believe no one is reading.`,
        `The quiet approach produced a different class of information. What the unseen see is different from what the seen are allowed to show.`,
        `The margin of the scene is where the true pattern sits. The concealed read found something the open approach would have foreclosed.`
      ][seed];
    }
    if(t === 'class_support'){
      return [
        `Practical engagement shifts who is available and what they will say — the useful kind of intervention that clears what is in the way.`,
        `The stabilizing action changed the available picture. People who were closed are slightly less closed now.`,
        `The help landed where it was needed. That has consequences for what comes next, most of them favorable.`
      ][seed];
    }
    return last;
  }

  function composePressureLayer(ss, gs){
    const parts = [];
    const threat = ss.activeThreat;
    if(threat){
      if(threat.creature) parts.push(`${cap((threat.creature||'').replace(/_/g,' '))} has been sighted in this area.`);
      if(threat.hazard) parts.push(`${cap((threat.hazard||'').replace(/_/g,' '))} creates a secondary complication.`);
    }
    return parts.join(' ');
  }

  function composeStateStrip(ss, gs){
    const items = [];
    const loc = ss.locality || {};
    const heat = ss.localityHeat || 0;
    const as = ss.alignmentSystem || {};
    const clocks = gs.worldClocks || {};

    if(loc.lawFeel) items.push({text: loc.lawFeel, cls: 'law'});

    if(heat > 0){
      const cls = heat >= 8 ? 'heat-hot' : heat >= 4 ? 'heat-warm' : '';
      items.push({text: `Heat +${heat}`, cls});
    } else if(heat < 0){
      items.push({text: `Trust ${heat}`, cls: 'heat-cool'});
    }

    const warrantActive = heat >= 8 || (gs.legalityState && gs.legalityState.warrants && gs.legalityState.warrants.length);
    if(warrantActive) items.push({text: 'WARRANT ISSUED', cls: 'warrant'});

    if(as.currentBandBenevolence && as.currentBandBenevolence !== 'center'){
      const label = as.currentBandBenevolence.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
      items.push({text: label, cls: 'align'});
    }
    if(as.currentBandOrder && as.currentBandOrder !== 'center'){
      const label = as.currentBandOrder.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
      items.push({text: label, cls: 'align'});
    }

    if(gs.enforcementState) items.push({text: gs.enforcementState.level==='arrest'?'ARREST ATTEMPT':'Authority Attention', cls: 'warrant'});
    if(ss.inCombat) items.push({text: `Combat — ${ss.combatEnemy||'unknown'}`, cls: 'combat'});
    if(ss.inPostCombat) items.push({text: 'Resolution pending', cls: 'combat'});

    if(clocks.rival > 4) items.push({text: `Rival ${clocks.rival}`, cls: 'heat-warm'});

    const companions = (gs.companions||[]).filter(c=>!c.injured&&c.available!==false).length;
    if(companions > 0) items.push({text: `${companions} companion${companions>1?'s':''}`, cls: ''});

    const wounds = (gs.wounds||[]).length;
    if(wounds >= 2) items.push({text: `${wounds} wounds`, cls: 'wound'});

    return items;
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
  window.composeStateStrip = composeStateStrip;
})();
