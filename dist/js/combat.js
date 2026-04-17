
function archetypeAttackSkill() {
  const a = ARCHETYPES[G.archetype];
  return a.focus;
}

function encounterBias(tier) {
  return { easy:-1, standard:0, elite:2, boss:5 }[tier] || 0;
}

function stageReadinessDelta() {
  if (typeof STAGE_BALANCE_TARGETS === 'undefined' || !STAGE_BALANCE_TARGETS[G.stage]) return 0;
  const target = STAGE_BALANCE_TARGETS[G.stage];
  const avg = typeof averageSkill === 'function' ? averageSkill() : 1;
  const partyReady = (G.companions || []).filter(c => c.available && !c.injured).length;
  const skillDelta = avg - target.expectedSkill;
  const partyDelta = partyReady - target.expectedParty;
  return Math.round((skillDelta * 0.6) + (partyDelta * 0.8));
}
function stageThreatBias() {
  const base = (typeof STAGE_BALANCE_TARGETS !== 'undefined' && STAGE_BALANCE_TARGETS[G.stage]) ? STAGE_BALANCE_TARGETS[G.stage].threatBias : Math.max(0, G.stage - 2);
  const delta = stageReadinessDelta();
  if (delta >= 3) return base + 1;
  if (delta <= -3) return Math.max(0, base - 1);
  return base;
}

function encounterTemplate(kind, name) {
  return (kind === 'creature' ? BESTIARY[name] : HAZARDS[name]) || { hp:12, attack:4, severity:2, text:'The threat is real even if the file support has not fully caught up yet.', weakness:'timing', moves:['rush'] };
}

function beginEncounter(kind, name, tier='standard') {
  const template = encounterTemplate(kind, name);
  const baseHp = kind === 'creature' ? (template.hp || 12) : 8 + (template.severity || 1) * 2;
  const bias = encounterBias(tier) + stageThreatBias();
  if (typeof stageMetric === 'function') stageMetric('stageEncounters',1);
  G.encounter = {
    kind,
    name,
    tier,
    phase: 1,
    enemyHp: baseHp + bias * 2,
    enemyMaxHp: baseHp + bias * 2,
    enemyAttack: ((kind === 'creature' ? template.attack : 2 + (template.severity || 1)) || 4) + Math.max(0, G.stage - 1) + Math.max(0, (template.pack || 1) - 1),
    enemyIntent: template.intent || (kind === 'creature' ? 'rush' : 'cascade'),
    enemyMoves: template.moves || ['rush'],
    enemyText: template.text || '',
    weakness: template.weakness || 'timing',
    pack: template.pack || 1,
    guard: false,
    studied: false,
    backgroundEdgeUsed: false,
    rounds: 0,
    canRetreat: tier !== 'boss'
  };
  G.lastResult = kind === 'creature'
    ? `${name} comes fully into range. ${template.text || 'The threat stops being rumor and becomes immediate.'}`
    : `${name} becomes immediate. ${template.text || 'The problem stops being theoretical and starts demanding action.'}`;
}

function endEncounter(result) {
  G.encounter = null;
  if (result === 'win') setThreat();
}

function encounterPower() {
  const main = (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('combat') : G.skills.combat) + Math.ceil(G.level / 2);
  const off = typeof effectiveSkillValue === 'function' ? effectiveSkillValue(archetypeAttackSkill()) : (G.skills[archetypeAttackSkill()] || 0);
  const party = G.companions.filter(c => c.available && !c.injured).length;
  const familyEdge = typeof familyRewardBonus === 'function' ? familyRewardBonus('exploit') : 0;
  return main + off + party + familyEdge;
}

function encounterChoices() {
  const e = G.encounter;
  const opts = [];
  opts.push({ label:`Strike at ${e.name}`, tags:['Bold','Risky'], fn:() => resolveEncounterAction('attack') });
  opts.push({ label:`Use ${ARCHETYPES[G.archetype].ability}`, tags:['Bold'], fn:() => resolveEncounterAction('ability') });
  opts.push({ label:'Guard and read the pressure', tags:['Safe'], fn:() => resolveEncounterAction('guard') });
  if (!e.studied) opts.push({ label:'Study the pressure and exploit the pattern', tags:['Safe'], fn:() => resolveEncounterAction('study') });
  opts.push({ label:'Exploit the revealed weakness', tags:['Bold'], fn:() => resolveEncounterAction('exploit') });
  opts.push({ label:`Use ${getBackground(G.archetype, G.backgroundId).name} leverage`, tags:['Safe'], fn:() => resolveEncounterAction('background') });
  if (e.kind === 'creature' && (G.skills.persuasion + Math.floor(G.renown/5)) >= 3) opts.push({ label:'Intimidate and break their nerve', tags:['Bold'], fn:() => resolveEncounterAction('intimidate') });
  if (e.kind === 'creature' && e.pack > 1) opts.push({ label:'Break their formation before numbers matter', tags:['Bold'], fn:() => resolveEncounterAction('formation') });
  if (e.kind === 'creature') opts.push({ label:'Bait the threat into worse ground', tags:['Risky'], fn:() => resolveEncounterAction('bait') });
  if (e.kind === 'hazard') opts.push({ label:'Contain and stabilize the hazard', tags:['Safe'], fn:() => resolveEncounterAction('contain') });
  if (e.kind === 'hazard') opts.push({ label:'Redirect the hazard into a sacrificial line', tags:['Bold'], fn:() => resolveEncounterAction('redirect') });
  if (e.kind === 'hazard') opts.push({ label:'Seal the breach before spread outruns you', tags:['Safe'], fn:() => resolveEncounterAction('seal') });
  opts.push({ label:'Use the environment against the pressure', tags:['Risky'], fn:() => resolveEncounterAction('environment') });
  opts.push({ label:'Invoke ritual procedure against the threat', tags:['Safe'], fn:() => resolveEncounterAction('ritual') });
  opts.push({ label:'Command the field before it commands you', tags:['Bold'], fn:() => resolveEncounterAction('command') });
  opts.push({ label:'Protect the weakest line first', tags:['Safe'], fn:() => resolveEncounterAction('protect') });
  if (G.companions.length) opts.push({ label:'Call companion support', tags:['Safe'], fn:() => resolveEncounterAction('companion') });
  if (e.canRetreat) opts.push({ label:'Withdraw in good order', tags:['Safe'], fn:() => resolveEncounterAction('retreat') });
  return opts.slice(0, G.stage >= 4 ? 11 : 9);
}

function encounterPhaseShift(e) {
  if (e.phase === 1 && e.enemyHp <= Math.floor(e.enemyMaxHp / 2)) {
    e.phase = 2;
    e.enemyAttack += 1;
    const move = e.enemyMoves[(e.rounds + G.dayCount) % e.enemyMoves.length];
    G.lastResult = `${e.name} shifts pace. ${move[0].toUpperCase()+move.slice(1)} becomes more obvious now that the first exchange has broken open its habits.`;
  } else if (e.phase === 2 && e.tier === 'boss' && e.enemyHp <= Math.floor(e.enemyMaxHp / 4)) {
    e.phase = 3;
    e.enemyAttack += 2;
    G.lastResult = `${e.name} enters a final phase. The pressure stops feeling containable by ordinary timing alone.`;
  }
}

function resolveEncounterAction(action) {
  const e = G.encounter;
  e.rounds += 1;
  let attackValue = encounterPower();
  let text = '';
  if (action === 'ability') {
    attackValue += 3;
    text = `${ARCHETYPES[G.archetype].ability} lands with the confidence of practiced identity rather than guesswork.`;
  } else if (action === 'guard') {
    e.guard = true;
    attackValue += 1;
    text = 'The moment is not seized, but it is read well enough to blunt what comes next.';
  } else if (action === 'companion') {
    attackValue += 2 + G.companions.length;
    const c = G.companions[0];
    if (c) c.trust += 1;
    text = c ? `${c.name} folds practical support into the exchange before the pressure can settle cleanly.` : 'Support arrives from the party at the right instant.';
  } else if (action === 'retreat') {
    advanceTime(1);
    G.fatigue += 1;
    G.worldClocks.rival += 1;
    if (typeof stageMetric === 'function') stageMetric('encounterRetreats',1);
    G.lastResult = `Withdrawal costs time, face, and initiative, but the run survives to choose its next ground.`;
    addJournal('encounter', `Withdrew from ${e.name}.`, `retreat-${G.dayCount}-${e.name}`);
    endEncounter('retreat');
    return;
  } else if (action === 'study') {
    e.studied = true;
    attackValue += (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('lore') : G.skills.lore) + 1 + (typeof familyRewardBonus === 'function' ? familyRewardBonus('study') : 0);
    text = `The pressure gives away its rhythm once enough of it is watched without blinking first. ${e.name} is weakest against ${e.weakness}.`;
  } else if (action === 'exploit') {
    attackValue += e.studied ? 4 : 1;
    if (typeof familyRewardBonus === 'function') attackValue += familyRewardBonus('exploit');
    text = `The line is pressed where ${e.name} is weakest: ${e.weakness}.`;
  } else if (action === 'background') {
    if (!e.backgroundEdgeUsed) {
      e.backgroundEdgeUsed = true;
      attackValue += 3;
      text = `${getBackground(G.archetype, G.backgroundId).theme} becomes an advantage instead of backstory.`;
    } else {
      attackValue += 1;
      text = 'The old habits of your background still help, but not with the same surprise.';
    }
  } else if (action === 'intimidate') {
    attackValue += Math.max(2, (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('persuasion') : G.skills.persuasion) + Math.floor(G.renown/4));
    if (typeof familyRewardBonus === 'function') attackValue += familyRewardBonus('intimidate');
    text = 'Renown, posture, and visible readiness do some of the work before force fully lands.';
  } else if (action === 'formation') {
    attackValue += (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('combat') : G.skills.combat) + 2;
    if (typeof familyRewardBonus === 'function') attackValue += familyRewardBonus('formation');
    e.enemyAttack = Math.max(1, e.enemyAttack - 1);
    text = 'The larger body of threats loses some of its advantage once its line is broken apart and forced to answer as individuals.';
  } else if (action === 'bait') {
    attackValue += G.skills.stealth + 2;
    text = 'The threat is drawn into worse footing and shorter options than it expected.';
  } else if (action === 'contain') {
    attackValue += (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('craft') : G.skills.craft) + (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('lore') : G.skills.lore);
    if (typeof familyRewardBonus === 'function') attackValue += familyRewardBonus('contain');
    text = 'Containment, improvisation, and practiced caution narrow the hazard into something survivable.';
  } else if (action === 'redirect') {
    attackValue += (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('craft') : G.skills.craft) + 2;
    if (typeof familyRewardBonus === 'function') attackValue += familyRewardBonus('redirect');
    G.fatigue += 1;
    text = 'The hazard is pushed into a line where loss is still possible, but no longer total.';
  } else if (action === 'seal') {
    attackValue += (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('craft') : G.skills.craft) + (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('lore') : G.skills.lore) + 1;
    if (typeof familyRewardBonus === 'function') attackValue += familyRewardBonus('seal');
    text = 'Fast sealing work turns spread into a narrower, more governable problem.';
  } else if (action === 'environment') {
    attackValue += 2;
    G.fatigue += 1;
    text = 'The surrounding ground, structure, or crowd is forced to take a side in the exchange.';
  } else if (action === 'ritual') {
    attackValue += (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('lore') : G.skills.lore) + Math.max(1, (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('craft') : G.skills.craft));
    if (typeof familyRewardBonus === 'function') attackValue += familyRewardBonus('ritual');
    text = 'Ritual knowledge, practiced forms, and remembered limits turn procedure into a weapon against collapse.';
  } else if (action === 'command') {
    attackValue += Math.max(2, (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('persuasion') : G.skills.persuasion) + Math.floor(G.renown/6));
    if (typeof familyRewardBonus === 'function') attackValue += familyRewardBonus('command');
    text = 'Voice, timing, and force of will impose order on a field that wanted panic instead.';
  } else if (action === 'protect') {
    const protectEdge = typeof familyRewardBonus === 'function' ? familyRewardBonus('protect') : 0;
    attackValue += 1 + protectEdge;
    G.hp = Math.min(G.maxHp, G.hp + 1 + protectEdge);
    text = 'The exchange bends around a protective choice that keeps the line from breaking all at once.';
  } else {
    text = e.kind === 'creature' ? 'The confrontation turns physical with no room for pretense.' : 'Mitigation becomes a fight against unfolding circumstance.';
  }

  const defense = 7 + G.stage + encounterBias(e.tier) + Math.max(0, e.pack - 1) + (e.kind === 'hazard' ? 1 : 0) + (e.phase > 1 ? 1 : 0);
  const damage = Math.max(1, attackValue - defense + Math.ceil(Math.random() * 3));
  e.enemyHp -= damage;
  encounterPhaseShift(e);

  if (e.enemyHp <= 0) {
    advanceTime(1);
    gainXp(e.tier === 'boss' ? 8 : e.tier === 'elite' ? 5 : 3, `${e.name} resolved`);
    G.renown += e.tier === 'boss' ? 6 : e.tier === 'elite' ? 3 : 1;
    if (typeof stageMetric === 'function') { stageMetric('encounterWins',1); if (e.kind === 'hazard') stageMetric('hazardWins',1); else stageMetric('creatureWins',1); }
    addJournal('encounter', `Defeated ${e.name}.`, `win-${G.stage}-${e.name}`);
    markMoment(`Defeated ${e.name} (${e.kind}, ${e.tier})`);
    markMoment(`Resolved ${e.name}`);
    const title = e.tier === 'boss' ? 'A final pressure breaks.' : e.tier === 'elite' ? 'A dangerous pressure gives way.' : 'The threat breaks.';
    G.lastResult = `${title} ${text} ${e.name} breaks before the pressure you now bring to bear.`;
    if (e.tier === 'boss' && G.stage === 5 && e.kind === 'creature') finishLegend(G.pendingLegendOutcome || 'success', e.name);
    if (e.tier === 'boss' && G.stage === 5 && e.kind === 'hazard') finishLegend(G.pendingLegendOutcome || 'containment', e.name);
    endEncounter('win');
    return;
  }

  const move = e.enemyMoves[(e.rounds + G.dayCount + e.phase) % e.enemyMoves.length];
  const incoming = Math.max(1, e.enemyAttack - (e.guard ? 2 : 0));
  e.guard = false;
  G.hp -= incoming;
  G.fatigue += 1;
  if (G.hp <= 0) {
    if (e.tier === 'boss' && G.stage === 5) {
      G.stage5Dead = true;
      finishLegend('failure', e.name);
      G.encounter = null;
      return;
    }
    handleDeath(`${e.kind} encounter with ${e.name}`);
    G.encounter = null;
    return;
  }
  addJournal('encounter', `${e.name} phase ${e.phase} answered with ${move}.`, `phase-${G.dayCount}-${e.name}-${e.phase}-${move}`);
  if (e.phase === 2 && e.rounds === 2) { markMoment(`${e.name} revealed a second-phase pattern`); }
  G.lastResult = `${text} ${e.name} answers with ${move}. You take ${incoming} damage while the exchange remains unresolved.`;
}

// ----- Batch 17 combat tangibility: family-authored encounter pressure -----
function encounterTemplate(kind, name) {
  const base = (kind === 'creature' ? BESTIARY[name] : HAZARDS[name]) || { hp:12, attack:4, severity:2, text:'The threat is real even if the file support has not fully caught up yet.', weakness:'timing', moves:['rush'] };
  const family = (typeof activeThreatFamily === 'function') ? activeThreatFamily() : null;
  const profile = family && typeof getFamilyThreatProfile === 'function' ? getFamilyThreatProfile(G.stage, family) : null;
  if (!profile) return base;
  return {
    ...base,
    text: `${base.text} ${profile.note}`.trim(),
    moves: base.moves || (kind === 'creature' ? ['rush','flank'] : ['cascade','spread']),
    weakness: base.weakness || (kind === 'creature' ? 'coordination' : 'control')
  };
}

function beginEncounter(kind, name, tier='standard') {
  const template = encounterTemplate(kind, name);
  const baseHp = kind === 'creature' ? (template.hp || 12) : 8 + (template.severity || 1) * 2;
  const bias = encounterBias(tier) + stageThreatBias();
  if (typeof stageMetric === 'function') stageMetric('stageEncounters',1);
  G.encounter = {
    kind,
    name,
    tier,
    phase: 1,
    enemyHp: baseHp + bias * 2,
    enemyMaxHp: baseHp + bias * 2,
    enemyAttack: ((kind === 'creature' ? template.attack : 2 + (template.severity || 1)) || 4) + Math.max(0, G.stage - 1) + Math.max(0, (template.pack || 1) - 1),
    enemyIntent: template.intent || (kind === 'creature' ? 'rush' : 'cascade'),
    enemyMoves: template.moves || ['rush'],
    enemyText: template.text || '',
    weakness: template.weakness || 'timing',
    pack: template.pack || 1,
    guard: false,
    studied: false,
    backgroundEdgeUsed: false,
    rounds: 0,
    canRetreat: tier !== 'boss',
    family: (typeof activeThreatFamily === 'function') ? activeThreatFamily() : null
  };
  G.lastResult = kind === 'creature'
    ? `${name} comes fully into range. ${template.text || 'The threat stops being rumor and becomes immediate.'}`
    : `${name} becomes immediate. ${template.text || 'The problem stops being theoretical and starts demanding action.'}`;
}

function encounterChoices() {
  const e = G.encounter;
  const opts = [];
  opts.push({ label:`Strike at ${e.name}`, tags:['Bold','Risky'], fn:() => resolveEncounterAction('attack') });
  opts.push({ label:`Use ${ARCHETYPES[G.archetype].ability}`, tags:['Bold'], fn:() => resolveEncounterAction('ability') });
  opts.push({ label:'Guard and read the pressure', tags:['Safe'], fn:() => resolveEncounterAction('guard') });
  if (!e.studied) opts.push({ label:'Study the pressure and exploit the pattern', tags:['Safe'], fn:() => resolveEncounterAction('study') });
  opts.push({ label:'Exploit the revealed weakness', tags:['Bold'], fn:() => resolveEncounterAction('exploit') });
  opts.push({ label:`Use ${getBackground(G.archetype, G.backgroundId).name} leverage`, tags:['Safe'], fn:() => resolveEncounterAction('background') });
  if (e.kind === 'creature' && (G.skills.persuasion + Math.floor(G.renown/5)) >= 3) opts.push({ label:'Intimidate and break their nerve', tags:['Bold'], fn:() => resolveEncounterAction('intimidate') });
  if (e.kind === 'creature' && e.pack > 1) opts.push({ label:'Break their formation before numbers matter', tags:['Bold'], fn:() => resolveEncounterAction('formation') });
  if (e.kind === 'creature') opts.push({ label:'Bait the threat into worse ground', tags:['Risky'], fn:() => resolveEncounterAction('bait') });
  if (e.kind === 'hazard') opts.push({ label:'Contain and stabilize the hazard', tags:['Safe'], fn:() => resolveEncounterAction('contain') });
  if (e.kind === 'hazard') opts.push({ label:'Redirect the hazard into a sacrificial line', tags:['Bold'], fn:() => resolveEncounterAction('redirect') });
  if (e.kind === 'hazard') opts.push({ label:'Seal the breach before spread outruns you', tags:['Safe'], fn:() => resolveEncounterAction('seal') });
  opts.push({ label:'Use the environment against the pressure', tags:['Risky'], fn:() => resolveEncounterAction('environment') });
  opts.push({ label:'Invoke ritual procedure against the threat', tags:['Safe'], fn:() => resolveEncounterAction('ritual') });
  opts.push({ label:'Command the field before it commands you', tags:['Bold'], fn:() => resolveEncounterAction('command') });
  opts.push({ label:'Protect the weakest line first', tags:['Safe'], fn:() => resolveEncounterAction('protect') });
  if (e.kind === 'hazard') opts.push({ label:'Split the route and bleed off the pressure', tags:['Safe'], fn:() => resolveEncounterAction('splitlane') });
  if (e.kind === 'creature') opts.push({ label:'Exploit route knowledge to cut the line away from it', tags:['Risky'], fn:() => resolveEncounterAction('routecut') });
  if (G.companions.length) opts.push({ label:'Call companion support', tags:['Safe'], fn:() => resolveEncounterAction('companion') });
  if (e.canRetreat) opts.push({ label:'Withdraw in good order', tags:['Safe'], fn:() => resolveEncounterAction('retreat') });
  return opts.slice(0, G.stage >= 4 ? 12 : 10);
}

function resolveEncounterAction(action) {
  const e = G.encounter;
  e.rounds += 1;
  let attackValue = encounterPower();
  let text = '';
  if (action === 'ability') {
    attackValue += 3;
    text = `${ARCHETYPES[G.archetype].ability} lands with the confidence of practiced identity rather than guesswork.`;
  } else if (action === 'guard') {
    e.guard = true;
    attackValue += 1;
    text = 'The moment is not seized, but it is read well enough to blunt what comes next.';
  } else if (action === 'companion') {
    attackValue += 2 + G.companions.length;
    const c = G.companions[0];
    if (c) c.trust += 1;
    text = c ? `${c.name} folds practical support into the exchange before the pressure can settle cleanly.` : 'Support arrives from the party at the right instant.';
  } else if (action === 'retreat') {
    advanceTime(1); G.fatigue += 1; G.worldClocks.rival += 1;
    if (typeof stageMetric === 'function') stageMetric('encounterRetreats',1);
    G.lastResult = `Withdrawal costs time, face, and initiative, but the run survives to choose its next ground.`;
    addJournal('encounter', `Withdrew from ${e.name}.`, `retreat-${G.dayCount}-${e.name}`); endEncounter('retreat'); return;
  } else if (action === 'study') {
    e.studied = true; attackValue += G.skills.lore + 1;
    text = `The pressure gives away its rhythm once enough of it is watched without blinking first. ${e.name} is weakest against ${e.weakness}.`;
  } else if (action === 'exploit') {
    attackValue += e.studied ? 4 : 1;
    if (typeof familyRewardBonus === 'function') attackValue += familyRewardBonus('exploit'); text = `The line is pressed where ${e.name} is weakest: ${e.weakness}.`;
  } else if (action === 'background') {
    if (!e.backgroundEdgeUsed) { e.backgroundEdgeUsed = true; attackValue += 3; text = `${getBackground(G.archetype, G.backgroundId).theme} becomes an advantage instead of backstory.`; }
    else { attackValue += 1; text = 'The old habits of your background still help, but not with the same surprise.'; }
  } else if (action === 'intimidate') {
    attackValue += Math.max(2, (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('persuasion') : G.skills.persuasion) + Math.floor(G.renown/4));
    if (typeof familyRewardBonus === 'function') attackValue += familyRewardBonus('intimidate'); text = 'Renown, posture, and visible readiness do some of the work before force fully lands.';
  } else if (action === 'formation') {
    attackValue += (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('combat') : G.skills.combat) + 2;
    if (typeof familyRewardBonus === 'function') attackValue += familyRewardBonus('formation'); e.enemyAttack = Math.max(1, e.enemyAttack - 1); text = 'The larger body of threats loses some of its advantage once its line is broken apart and forced to answer as individuals.';
  } else if (action === 'bait') {
    attackValue += G.skills.stealth + 2; text = 'The threat is drawn into worse footing and shorter options than it expected.';
  } else if (action === 'contain') {
    attackValue += (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('craft') : G.skills.craft) + (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('lore') : G.skills.lore);
    if (typeof familyRewardBonus === 'function') attackValue += familyRewardBonus('contain'); text = 'Containment, improvisation, and practiced caution narrow the hazard into something survivable.';
  } else if (action === 'redirect') {
    attackValue += (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('craft') : G.skills.craft) + 2;
    if (typeof familyRewardBonus === 'function') attackValue += familyRewardBonus('redirect'); G.fatigue += 1; text = 'The hazard is pushed into a line where loss is still possible, but no longer total.';
  } else if (action === 'seal') {
    attackValue += (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('craft') : G.skills.craft) + (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('lore') : G.skills.lore) + 1;
    if (typeof familyRewardBonus === 'function') attackValue += familyRewardBonus('seal'); text = 'Fast sealing work turns spread into a narrower, more governable problem.';
  } else if (action === 'environment') {
    attackValue += 2; G.fatigue += 1; text = 'The surrounding ground, structure, or crowd is forced to take a side in the exchange.';
  } else if (action === 'ritual') {
    attackValue += (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('lore') : G.skills.lore) + Math.max(1, (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('craft') : G.skills.craft));
    if (typeof familyRewardBonus === 'function') attackValue += familyRewardBonus('ritual'); text = 'Ritual knowledge, practiced forms, and remembered limits turn procedure into a weapon against collapse.';
  } else if (action === 'command') {
    attackValue += Math.max(2, (typeof effectiveSkillValue === 'function' ? effectiveSkillValue('persuasion') : G.skills.persuasion) + Math.floor(G.renown/6));
    if (typeof familyRewardBonus === 'function') attackValue += familyRewardBonus('command'); text = 'Voice, timing, and force of will impose order on a field that wanted panic instead.';
  } else if (action === 'protect') {
    attackValue += 1; G.hp = Math.min(G.maxHp, G.hp + 1); text = 'The exchange bends around a protective choice that keeps the line from breaking all at once.';
  } else if (action === 'splitlane') {
    attackValue += G.skills.survival + G.skills.craft; G.fatigue += 1; text = 'The lane is split and the pressure loses the clean line it needed to become disaster.';
  } else if (action === 'routecut') {
    attackValue += G.skills.survival + G.skills.stealth; text = 'Route knowledge turns the field against the threat before it can settle fully into its advantage.';
  } else {
    text = e.kind === 'creature' ? 'The confrontation turns physical with no room for pretense.' : 'Mitigation becomes a fight against unfolding circumstance.';
  }

  const defense = 7 + G.stage + encounterBias(e.tier) + Math.max(0, e.pack - 1) + (e.kind === 'hazard' ? 1 : 0) + (e.phase > 1 ? 1 : 0);
  const damage = Math.max(1, attackValue - defense + Math.ceil(Math.random() * 3));
  e.enemyHp -= damage;
  encounterPhaseShift(e);

  if (e.enemyHp <= 0) {
    advanceTime(1); gainXp(e.tier === 'boss' ? 8 : e.tier === 'elite' ? 5 : 3, `${e.name} resolved`); G.renown += e.tier === 'boss' ? 6 : e.tier === 'elite' ? 3 : 1;
    if (typeof stageMetric === 'function') { stageMetric('encounterWins',1); if (e.kind === 'hazard') stageMetric('hazardWins',1); else stageMetric('creatureWins',1); }
    addJournal('encounter', `Defeated ${e.name}${e.family ? ' during ' + e.family.replace(/_/g,' ') : ''}.`, `win-${G.stage}-${e.name}-${e.family||'local'}`);
    markMoment(`Defeated ${e.name} (${e.kind}, ${e.tier})`);
    const title = e.tier === 'boss' ? 'A final pressure breaks.' : e.tier === 'elite' ? 'A dangerous pressure gives way.' : 'The threat breaks.';
    G.lastResult = `${title} ${text} ${e.name} breaks before the pressure you now bring to bear.`;
    if (e.tier === 'boss' && G.stage === 5 && e.kind === 'creature') finishLegend(G.pendingLegendOutcome || 'success', e.name);
    if (e.tier === 'boss' && G.stage === 5 && e.kind === 'hazard') finishLegend(G.pendingLegendOutcome || 'containment', e.name);
    endEncounter('win'); return;
  }

  const move = e.enemyMoves[(e.rounds + G.dayCount + e.phase) % e.enemyMoves.length];
  const incoming = Math.max(1, e.enemyAttack - (e.guard ? 2 : 0));
  e.guard = false; G.hp -= incoming; G.fatigue += 1;
  if (G.hp <= 0) {
    if (e.tier === 'boss' && G.stage === 5) { G.stage5Dead = true; finishLegend('failure', e.name); G.encounter = null; return; }
    handleDeath(`${e.kind} encounter with ${e.name}`); G.encounter = null; return;
  }
  addJournal('encounter', `${e.name} phase ${e.phase} answered with ${move}.`, `phase-${G.dayCount}-${e.name}-${e.phase}-${move}`);
  if (e.phase === 2 && e.rounds === 2) { markMoment(`${e.name} revealed a second-phase pattern`); }
  G.lastResult = `${text} ${e.name} answers with ${move}. You take ${incoming} damage while the exchange remains unresolved.`;
}


// ----- Batch 18 tangible progress: richer boss behavior hooks -----
const __batch17BeginEncounter = beginEncounter;
function beginEncounter(kind, name, tier='standard') {
  __batch17BeginEncounter(kind, name, tier);
  if (G && G.encounter && G.encounter.tier === 'boss' && typeof getBossBehavior === 'function') {
    const boss = getBossBehavior(name);
    G.encounter.bossBehavior = boss;
    G.encounter.enemyMoves = [...new Set([...(G.encounter.enemyMoves || []), ...(boss.moves || [])])];
    G.lastResult = `${G.lastResult} ${boss.opening}`.trim();
  }
}

const __batch17EncounterPhaseShift = encounterPhaseShift;
function encounterPhaseShift(e) {
  const oldPhase = e.phase;
  __batch17EncounterPhaseShift(e);
  if (e.tier === 'boss' && typeof getBossBehavior === 'function') {
    const boss = getBossBehavior(e.name);
    if (oldPhase < 2 && e.phase === 2 && boss.phase2) {
      G.lastResult = `${G.lastResult} ${boss.phase2}`.trim();
    }
    if (oldPhase < 3 && e.phase === 3 && boss.phase3) {
      G.lastResult = `${G.lastResult} ${boss.phase3}`.trim();
    }
  }
}
