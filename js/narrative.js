
(function(){
  function pick(arr, n){ return arr && arr.length ? arr[n % arr.length] : ''; }
  function cap(s){ return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

  // ── SCENE DATA LOOKUP ────────────────────────────────────
  function sceneData(localityId){
    return (window.LOCALITY_SCENE_DATA || {})[localityId] || null;
  }

  // ── LOCALITY NARRATIVE (legacy path, used as fallback) ──
  function localityNarrative(state, loc, ctx){
    const time = ['dawn','morning','midday','late day','night'][state.timeIndex % 5];
    const greeting = pick(loc.greetings, state.dayCount + state.stage);
    const ritual = pick(loc.rituals, state.dayCount + state.worldClocks.omens);
    const seed = (state.dayCount + state.timeIndex + state.worldClocks.pressure) % 4;
    const opens = [
      `${loc.name} at ${time}. ${loc.summary}`,
      `The ${time} settles into ${loc.name} — ${loc.summary.toLowerCase()}`,
      `${loc.name} keeps its shape into ${time}: ${loc.summary.toLowerCase()}`,
      `At ${time}, ${loc.name} holds to what it is — ${loc.summary.toLowerCase()}`
    ];
    const greetingLines = [
      `The usual approach here runs through ${greeting}.`,
      `${cap(greeting)} marks how people signal intent in this space.`,
      `Exchanges tend to open with ${greeting}.`,
      `The expected register is ${greeting}.`
    ];
    const ritualLines = [
      `${cap(ritual)} are visible nearby, performed without particular ceremony.`,
      `The nearby practice of ${ritual.toLowerCase()} sits at the surface of the space.`,
      `${cap(ritual)} — present and close enough to read.`,
      `Someone close is keeping ${ritual.toLowerCase()}, unhurried and uninterrupted.`
    ];
    const parts = [
      opens[seed],
      greeting ? greetingLines[seed] : '',
      ritual ? ritualLines[seed] : ''
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
    if(legend.keyMoments && legend.keyMoments.length) pieces.push(`Key moments: ${legend.keyMoments.slice(0,3).join(' | ')}`);
    if(legend.safeZones && legend.safeZones.length) pieces.push(`Safe zones: ${legend.safeZones.slice(0,3).join(' → ')}`);
    if(legend.routeScoutLog && legend.routeScoutLog.length) pieces.push(`Route memory: ${legend.routeScoutLog.slice(0,2).join(' | ')}`);
    if(legend.companions && legend.companions.length) pieces.push(`Companions: ${legend.companions.join(', ')}`);
    if(legend.finalOutcome) pieces.push(`Outcome: ${legend.finalOutcome}.`);
    if(legend.stage5Dead) pieces.push(`The legend ended in Stage V permadeath.`);
    return pieces.join(' ');
  }

  // ── CENTRAL NARRATIVE PANEL ──────────────────────────────

  function composeLocalityLayer(ss, gs){
    const loc = ss.locality || {};
    const time = ['dawn','morning','midday','late day','night'][(gs.timeIndex||0) % 5];
    const seed = ((gs.dayCount||0) + (gs.timeIndex||0) + (gs.worldClocks&&gs.worldClocks.pressure||0)) % 4;
    const sd = sceneData(loc.id);

    // Stage I background narrative opening — kept if present
    if(ss.stage === 1 && ss.stage1BgEntry && ss.stage1BgEntry.narrative && (ss.stageProgress||0) === 0){
      return ss.stage1BgEntry.narrative;
    }

    // ── PARAGRAPH ONE: time-of-day opening + sensory sweep ──
    let opening = '';
    if(sd && sd.sensory){
      const timeDesc = {
        dawn: 'The light is still low',
        morning: 'The morning is well underway',
        midday: 'The midday weight is full on the space',
        'late day': 'The afternoon is in decline',
        night: 'The night has settled'
      }[time] || `It is ${time}`;

      const sightArr = sd.sensory.sight || [];
      const soundArr = sd.sensory.sound || [];
      const smellArr = sd.sensory.smell || [];

      const sight1 = sightArr[seed % sightArr.length] || '';
      const sight2 = sightArr[(seed + 1) % sightArr.length] || '';
      const sound1 = soundArr[seed % soundArr.length] || '';
      const smell1 = smellArr[seed % smellArr.length] || '';

      const sensoryParts = [
        sight1 && `${cap(sight1)}`,
        sight2 && sight2 !== sight1 && `${sight2}`,
        sound1 && `The sound here is ${sound1}`,
        smell1 && `${cap(smell1)} is in the air`
      ].filter(Boolean);

      opening = `${timeDesc} in ${loc.name||'this place'}. ${sensoryParts.slice(0, 3).join('. ')}.`;
    } else {
      const opens = [
        `${loc.name||'This place'} at ${time}. ${loc.summary||'An uncertain locality.'}`,
        `The ${time} settles into ${loc.name||'this place'} — ${(loc.summary||'').toLowerCase()}`,
        `${loc.name||'This place'} keeps its shape into ${time}: ${(loc.summary||'').toLowerCase()}`,
        `At ${time}, ${loc.name||'this place'} holds to what it is — ${(loc.summary||'').toLowerCase()}`
      ];
      opening = opens[seed];
    }

    // ── MOVEMENT + GREETING ──
    let movementGreeting = '';
    if(sd){
      const movArr = sd.movement || [];
      const mov = movArr[seed % movArr.length] || '';
      const greetArr = sd.greetings || loc.greetings || [];
      const greet = greetArr[((gs.dayCount||0) + (gs.stage||1)) % greetArr.length] || '';
      const movLine = mov ? cap(mov) + '.' : '';
      const greetLine = greet ? `The working acknowledgement here is ${greet.toLowerCase()}.` : '';
      movementGreeting = [movLine, greetLine].filter(Boolean).join(' ');
    } else {
      const greetArr = loc.greetings || [];
      if(greetArr.length){
        const g = greetArr[((gs.dayCount||0) + (gs.stage||1)) % greetArr.length];
        const greetings = [
          `The expected register here runs to ${g.toLowerCase()}.`,
          `Exchanges tend to open around ${g.toLowerCase()}.`,
          `${cap(g)} is the working approach.`,
          `The shared-space habit: ${g.toLowerCase()}.`
        ];
        movementGreeting = greetings[seed % greetings.length];
      }
    }

    // ── RITUAL / DEVOTIONAL ──
    let ritualLine = '';
    if(sd){
      const ritArr = sd.rituals || loc.rituals || [];
      const rit = ritArr[((gs.dayCount||0) + (gs.worldClocks&&gs.worldClocks.omens||0)) % ritArr.length] || '';
      if(rit) ritualLine = `${cap(rit)}.`;
    } else {
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
    }

    // ── MICRO-INTERACTION ──
    let microLine = '';
    if(sd && sd.microInteractions){
      // Choose tone from heat and rival clock
      const heat = ss.localityHeat || 0;
      const rival = (gs.worldClocks && gs.worldClocks.rival) || 0;
      let tone = 'warm';
      if(heat >= 6 || rival >= 6) tone = 'cautious';
      else if(heat >= 3 || rival >= 3) tone = 'fatigued';
      else if(((gs.dayCount||0) + seed) % 5 === 0) tone = 'humorous';
      const interactions = sd.microInteractions[tone] || sd.microInteractions.warm || [];
      if(interactions.length) microLine = interactions[seed % interactions.length];
    }

    // ── PARAGRAPH ONE assembly ──
    const para1Parts = [opening, movementGreeting, ritualLine].filter(Boolean);
    const para1 = para1Parts.join(' ');

    // ── PARAGRAPH TWO: micro-interaction + archetype notice ──
    const archetypeNotice = composeArchetypeNotice(ss, gs, sd, seed);
    const para2Parts = [microLine, archetypeNotice].filter(Boolean);
    const para2 = para2Parts.join(' ');

    return [para1, para2].filter(Boolean).join('\n\n');
  }

  function composeArchetypeNotice(ss, gs, sd, seed){
    const group = ss.archetypeGroup || 'combat';
    if(sd && sd.archetypeNotices){
      const notices = sd.archetypeNotices[group] || [];
      if(notices.length) return notices[seed % notices.length];
    }
    // Fallback if no scene data
    const fallbacks = {
      combat:[
        'The broad-shouldered ones leave space without asking for it.',
        'Weight and cover read before names do.',
        'The formation has a gap that only someone looking for it would find.'
      ],
      magic:[
        'The marks around the lintel have been touched too often to stay crisp.',
        'Residue near the central post suggests recent ritual interference.',
        'The charged material in the corner is being managed badly.'
      ],
      stealth:[
        'Awnings, stacked crates, and a bend in the passage break the view in useful places.',
        'The watcher in the corner has a blind side that faces the secondary exit.',
        'The timing gap is short but consistent.'
      ],
      support:[
        'The patched handles, reused cloth, and guarded supplies show where strain is being carried.',
        'Three people here are running on empty. It is visible in how they hold tools.',
        'The useful intervention is obvious. No one has made it yet.'
      ]
    };
    const arr = fallbacks[group] || fallbacks.combat;
    return arr[seed % arr.length];
  }

  // Pressure layer is now empty — data lives in state strip only
  function composePressureLayer(ss, gs){ return ''; }

  // Archetype perception is folded into composeLocalityLayer
  function composeArchetypePerceptionLayer(ss, gs){ return ''; }

  // Immediate response moves to event line — returns empty string for prose panel
  function composeImmediateResponseLayer(ss, gs){ return ''; }

  // Opportunity layer moves to state strip / UI — returns empty string for prose panel
  function composeOpportunityLayer(ss, gs){ return ''; }

  // ── EVENT LINE ───────────────────────────────────────────
  // Short UI outcome line, separate from the prose panel.
  function composeEventLine(ss, gs){
    const last = gs.lastResult || '';
    if(!last || last === 'Your ledger waits for its first truth.' || last === 'Create a new legend to enter the world.') return '';
    const t = ss.recentOutcomeType;
    const seed = ((gs.dayCount||0) + (gs.timeIndex||0)) % 3;

    if(t === 'combat_start') return ['Confrontation — the distance collapsed before any quieter path could form.','A fight opened. The alternatives are closed for now.','The confrontation is underway.'][seed];
    if(t === 'combat_ongoing') return `Combat — round ${gs.combatSession?gs.combatSession.round:'—'}.`;
    if(t === 'combat_victory') return ['Threat down. The space holds a different weight.','The confrontation resolved. The ledger is longer.','It ended.'][seed];
    if(t === 'combat_flee') return ['Distance gained. The threat chose not to follow — or couldn\'t.','Withdrawal successful.','Retreat completed.'][seed];
    if(t === 'combat_mercy') return ['Mercy given. Both sides of that will matter.','The person is alive because of a deliberate choice.','Mercy was the resolution.'][seed];
    if(t === 'combat_execute') return ['Execution. The door is closed.','Done. The record is longer.','Irreversible.'][seed];
    if(t === 'combat_interrogate') return ['Interrogation produced results. The means are on the ledger.','Information extracted.','What was learned couldn\'t have been learned another way.'][seed];
    if(t === 'combat_loot') return 'Threat handled. Useful items secured.';
    if(t === 'moral_good') return ['The right action. Rarer than it should be and more costly.','Marked the ledger well.','The shape of it will hold.'][seed];
    if(t === 'moral_evil') return ['The gain is real. The tab is longer than it looks.','It worked. The cost hasn\'t fully surfaced yet.','Landed. The weight will arrive later.'][seed];
    if(t === 'civic_lawful') return ['Legitimate path. Slower and more visible — that is the honest price.','Official process ran its course.','Authorized route. The outcome is cleaner.'][seed];
    if(t === 'civic_chaotic') return ['Bypass worked. Unofficial paths have their own accounting.','The shortcut landed.','Outside the approved route. Noted somewhere.'][seed];
    if(t === 'observe') return ['Observation produced something the fast look couldn\'t.','The careful read found what patience finds.','The picture is wider.'][seed];
    if(t === 'class_combat') return ['Martial read produced results.','Force has its own epistemology.','The hard approach worked.'][seed];
    if(t === 'class_magic') return ['Arcane analysis found what the physical read missed.','The magical surface opened.','Layers visible only to the trained read.'][seed];
    if(t === 'class_stealth') return ['Unobserved position produced a different class of information.','The quiet approach found something the open one would have closed.','The margin of the scene is where the pattern sits.'][seed];
    if(t === 'class_support') return ['Practical engagement shifted who is available.','The stabilizing action changed the picture.','The help landed where it was needed.'][seed];

    // Fallback: truncate lastResult for event line
    const short = last.length > 100 ? last.slice(0, 97) + '…' : last;
    return short;
  }

  // ── STATE STRIP ──────────────────────────────────────────
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

  function finalizePanelText(layers){
    return layers.filter(l=>l && l.trim()).join('\n\n').replace(/[ \t]+\n/g,'\n').trim();
  }

  // Prose panel: locality layer only (archetype notice is embedded within it)
  function composeCentralNarrativePanel(sceneState, gameState){
    const layer = composeLocalityLayer(sceneState, gameState);
    return finalizePanelText([layer]);
  }

  window.localityNarrative = localityNarrative;
  window.resultNarrative = resultNarrative;
  window.lifeOverviewText = lifeOverview;
  window.legendSummary = legendSummary;
  window.composeCentralNarrativePanel = composeCentralNarrativePanel;
  window.composeStateStrip = composeStateStrip;
  window.composeEventLine = composeEventLine;
})();
