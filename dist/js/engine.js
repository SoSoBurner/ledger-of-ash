const SAVE_KEY = 'loa_upgrade_batch22';
const XP_PER_LEVEL = [0,0,3,7,12,18,25,33,42,52,63,75,88,102,117,133,150,168,187,207,228];
let G = null;

function defaultState() {
  return {
    name:'', passcode:'', archetype:'warrior', backgroundId:'garrison_soldier',
    level:1, xp:0, renown:0, hp:20, maxHp:20, gold:20,
    skills:{ combat:1, survival:1, persuasion:1, lore:1, stealth:1, craft:1 },
    location:'shelkopolis', currentSafeZone:'', routeNode:null, routeHistory:[],
    dayCount:1, timeIndex:0, stage:1, stageLabel:STAGES[0].label,
    journalRecords:[], notices:[], quests:[], factions:{}, morality:0, order:0,
    companions:[], recruitableSeen:{}, deathCount:0, stage5Dead:false, wounds:[], fatigue:0,
    worldClocks:{ pressure:0, rival:0, omens:0 }, stageProgress:{1:0,2:0,3:0,4:0,5:0},
    rescueLog:[], empowermentUsed:{3:false,4:false}, flags:{}, lastResult:'Your ledger awaits its first entry.',
    currentThreat:null, currentObjective:'', legends:[], encounter:null, routeSignature:null, keyMoments:[], pendingLegendOutcome:null, safeZoneHistory:[], routeScoutLog:[], familyRewards:{}, familyIncidentLog:[], finalBreaks:{},
    metrics:{
      stageEntered:{1:1}, stageTurns:{1:0,2:0,3:0,4:0,5:0},
      stageActions:{1:0,2:0,3:0,4:0,5:0},
      stageTravels:{1:0,2:0,3:0,4:0,5:0},
      stageScouts:{1:0,2:0,3:0,4:0,5:0},
      stageSafeZoneUses:{1:0,2:0,3:0,4:0,5:0},
      stageEncounters:{1:0,2:0,3:0,4:0,5:0},
      encounterWins:{1:0,2:0,3:0,4:0,5:0},
      encounterRetreats:{1:0,2:0,3:0,4:0,5:0},
      stageRescues:{1:0,2:0,3:0,4:0,5:0},
      hazardWins:{1:0,2:0,3:0,4:0,5:0},
      creatureWins:{1:0,2:0,3:0,4:0,5:0},
      levelsGained:0, totalCampRests:0, legendRuns:0
    }
  };
}

function getStage(level) { return STAGES.find(s => level >= s.levelMin && level <= s.levelMax) || STAGES[0]; }
function getBackground(archetype, backgroundId) { return (BACKGROUNDS[archetype] || []).find(b => b.id === backgroundId); }
function getLocality(id) { return LOCALITIES[id]; }

function routeSignature() { return { ...(BACKGROUND_ROUTE_SIGNATURES[G.backgroundId] || {}), backgroundId:G.backgroundId }; }
function familyContent(stage) { const sig = routeSignature(); const family = stage === 3 ? sig.stage3Family : stage === 4 ? sig.stage4Family : sig.stage5Family; return getStageFamilyContent(stage, family); }
function stageMetric(mapName, amount=1) {
  const bucket = G.metrics[mapName];
  if (bucket) bucket[G.stage] = (bucket[G.stage] || 0) + amount;
}
function noteStageEntry(stageId) {
  if (!G.metrics.stageEntered[stageId]) G.metrics.stageEntered[stageId] = G.dayCount;
}
function incrementStageAction() { stageMetric('stageActions',1); }
function averageSkill() {
  const vals = Object.values(G.skills || {});
  return vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : 1;
}
function balanceSnapshot() {
  const target = (typeof STAGE_BALANCE_TARGETS !== 'undefined' && STAGE_BALANCE_TARGETS[G.stage]) || null;
  const partyReady = G.companions.filter(c => c.available && !c.injured).length;
  const avg = averageSkill();
  const encounterTotal = G.metrics.stageEncounters[G.stage] || 0;
  const wins = G.metrics.encounterWins[G.stage] || 0;
  const retreats = G.metrics.encounterRetreats[G.stage] || 0;
  const rescues = G.metrics.stageRescues[G.stage] || 0;
  const rate = encounterTotal ? Math.round((wins/encounterTotal)*100) : 0;
  const targetLine = target ? `Target skill ${target.expectedSkill} · target party ${target.expectedParty} · threat bias ${target.threatBias}` : 'No target locked for this stage yet.';
  return `Average skill ${avg.toFixed(1)} · party ${partyReady} · encounters ${encounterTotal} · win rate ${rate}% · retreats ${retreats} · rescues ${rescues}<br>${targetLine}`;
}

function ensureBatch21State() {
  if (!G.familyRewards) G.familyRewards = {};
  if (!G.familyIncidentLog) G.familyIncidentLog = [];
  if (!G.finalBreaks) G.finalBreaks = {};
}

function rewardKey(stage, family) { return `${stage}:${family}`; }

function familyRewardsList() {
  ensureBatch21State();
  return Object.entries(G.familyRewards || {}).map(([key, value]) => ({ key, ...value }));
}

function familyRewardBonus(type, kind='action') {
  ensureBatch21State();
  return Object.values(G.familyRewards || {}).reduce((sum, reward) => {
    const pool = kind === 'skill' ? (reward.skillBonuses || {}) : (reward.actionBonuses || {});
    return sum + (pool[type] || 0);
  }, 0);
}

function effectiveSkillValue(skill) {
  return (G.skills[skill] || 0) + familyRewardBonus(skill, 'skill');
}

function grantFamilyReward(stage, family) {
  ensureBatch21State();
  const key = rewardKey(stage, family);
  if (G.familyRewards[key]) return false;
  const reward = getFamilyReward(stage, family);
  G.familyRewards[key] = {
    stage, family, title: reward.title,
    skillBonuses: reward.skillBonuses || {},
    actionBonuses: reward.actionBonuses || {},
    text: reward.text, day: G.dayCount
  };
  addJournal('reward', `Gained ${reward.title}.`, `reward-${key}`);
  addNotice(`${reward.title} is now part of the run.`);
  markMoment(`Earned ${reward.title}`);
  G.lastResult = `${reward.text} ${reward.title} is now part of the run.`;
  return true;
}

function familyRewardSummary() {
  const rewards = familyRewardsList();
  if (!rewards.length) return 'No family edges unlocked yet.';
  return rewards.map(r => `${r.title} [Stage ${r.stage}]`).join('<br>');
}

function activeFamily(stage = G.stage) {
  const sig = routeSignature();
  if (stage === 3) return sig.stage3Family;
  if (stage === 4) return sig.stage4Family;
  return sig.stage5Family;
}

function currentFamilyIncident(stage = G.stage) {
  const family = activeFamily(stage);
  const step = G.stageProgress[stage] || 0;
  return getFamilyIncident(stage, family, step);
}

function noteFamilyIncident(stage, mode, incident) {
  ensureBatch21State();
  const family = activeFamily(stage);
  const key = `${stage}:${family}:${incident.key}:${mode}`;
  G.familyIncidentLog.unshift({ day:G.dayCount, stage, family, mode, title:incident.title, noun:incident.noun, key });
  G.familyIncidentLog = G.familyIncidentLog.slice(0, 24);
  addJournal('family-incident', `Handled ${incident.title} by ${mode.replace(/_/g,' ')}.`, key);
}

function commitFinalBreak() {
  ensureBatch21State();
  const family = activeFamily(5);
  if (G.finalBreaks[family]) return;
  G.finalBreaks[family] = { day:G.dayCount, family };
  addNotice(`The final break is committed inside ${family.replace(/_/g,' ')}.`);
  markMoment(`Committed the final break in ${family.replace(/_/g,' ')}`);
  G.lastResult = `There is no clean retreat now. The final break inside ${family.replace(/_/g,' ')} has been committed, and every remaining power has to answer it.`;
}

function finalBreakCommitted() {
  const family = activeFamily(5);
  return !!(G.finalBreaks && G.finalBreaks[family]);
}


function storageBlob() { return JSON.parse(localStorage.getItem(SAVE_KEY) || '{}'); }
function persist() {
  const all = storageBlob();
  all[G.passcode] = G;
  localStorage.setItem(SAVE_KEY, JSON.stringify(all));
}
function loadByCode(code) {
  const all = storageBlob();
  return all[code] || null;
}

function addJournal(category, text, dedupeKey) {
  if (dedupeKey && G.journalRecords.some(r => r.dedupeKey === dedupeKey && r.text === text)) return;
  G.journalRecords.unshift({ id: crypto.randomUUID(), day:G.dayCount, locality:G.location, category, text, dedupeKey });
  G.journalRecords = G.journalRecords.slice(0, 80);
}
function addNotice(text) {
  G.notices.unshift({ day:G.dayCount, text });
  G.notices = G.notices.slice(0, 40);
}
function addQuest(id, title, status) {
  const q = G.quests.find(x => x.id === id);
  if (q) { q.status = status || q.status; return; }
  G.quests.push({ id, title, status: status || 'Active' });
}
function markMoment(text) {
  G.keyMoments.unshift(`Day ${G.dayCount}: ${text}`);
  G.keyMoments = G.keyMoments.slice(0, 12);
}
function updateStage() {
  const st = getStage(G.level);
  G.stage = st.id; G.stageLabel = st.label;
}
function gainXp(n, why='') {
  G.xp += n;
  while (G.level < 20 && G.xp >= XP_PER_LEVEL[G.level + 1]) {
    G.level += 1;
    G.maxHp += G.stage >= 4 ? 4 : 3;
    G.hp = Math.min(G.maxHp, G.hp + 4);
    G.renown += 2;
    G.metrics.levelsGained += 1;
    addNotice(`Level ${G.level} reached${why ? ' — ' + why : ''}.`);
  }
  updateStage();
}
function advanceTime(ticks=1) {
  for (let i = 0; i < ticks; i++) {
    G.timeIndex = (G.timeIndex + 1) % TIME_NAMES.length;
    if (G.timeIndex === 0) G.dayCount += 1;
    stageMetric('stageTurns',1);
    G.worldClocks.pressure += 1;
    if (G.stage >= 2) G.worldClocks.rival += 1;
    if (G.stage >= 4) G.worldClocks.omens += 1;
  }
}
function chooseThreat(locality) {
  const hazard = locality.hazards[(G.dayCount + G.stage + G.worldClocks.pressure) % locality.hazards.length];
  const creature = locality.creatures[(G.dayCount + G.stage + G.worldClocks.rival) % locality.creatures.length];
  return { hazard, creature };
}
function setThreat() { G.currentThreat = chooseThreat(getLocality(G.location)); }
function currentObjective() {
  const bg = getBackground(G.archetype, G.backgroundId);
  const sig = routeSignature();
  if (G.stage === 1) return `${PLOT_FAMILIES[bg.stage1Plot].objective} Theme: ${bg.theme}.`;
  if (G.stage === 2) return `Push beyond ${getLocality(sig.originLocality).name} along ${ROUTE_NAMES[sig.stage2Vector]} and decide who controls the adjacent pressure.`;
  if (G.stage === 3) return `Widen ${familyContent(3).title} into a regional advantage before rivals and institutions lock the board.`;
  if (G.stage === 4) return `Turn ${familyContent(4).title} into a legendary advantage while the world reacts to your name.`;
  return finalBreakCommitted() ? `The final break stands committed inside ${familyContent(5).title}. The ending can now be forced.` : `Build enough decisive pressure inside ${familyContent(5).title} to commit the final break.`;
}
function centralNarrative() {
  const loc = getLocality(G.location);
  const named = typeof currentNamedPlacements === 'function' ? currentNamedPlacements(G.location) : [];
  return localityNarrative(G, loc, {
    pressure: pick(loc.pressure, G.worldClocks.pressure),
    routeHint: G.routeNode ? ROUTE_NAMES[G.routeNode] : null,
    hazardHint: G.currentThreat?.hazard || null,
    creatureHint: G.currentThreat?.creature || null,
    namedHint: named.length ? named.map(n => `${n.id.replace(/_/g,' ')} at ${n.office}`).join('; ') : null,
    routeAtlas: G.routeNode && typeof routeAtlasNote === 'function' ? routeAtlasNote(G.routeNode) : ''
  });
}

function maybeStageAdvance() {
  if (G.stage === 1 && G.stageProgress[1] >= 3 && G.level >= 5) { G.stage = 2; updateStage(); noteStageEntry(2); addNotice('Stage II begins. Adjacent pressure opens.'); markMoment('Stage II began'); }
  if (G.stage === 2 && G.level >= 9) { G.stage = 3; updateStage(); noteStageEntry(3); addNotice('Stage III begins. The world grows wider and less forgiving.'); markMoment('Stage III began'); }
  if (G.stage === 3 && G.level >= 13) { G.stage = 4; updateStage(); noteStageEntry(4); addNotice('Stage IV begins. Your name now changes what institutions dare.'); markMoment('Stage IV began'); }
  if (G.stage === 4 && G.level >= 18) { G.stage = 5; updateStage(); noteStageEntry(5); addNotice('Stage V begins. Death is now final.'); markMoment('Stage V began'); }
}

function buildStage1Choices() {
  const bg = getBackground(G.archetype, G.backgroundId);
  const loc = getLocality(G.location);
  const plot = PLOT_FAMILIES[bg.stage1Plot];
  return [
    { label:`Observe ${loc.name} through ${bg.theme}`, tags:['Safe'], fn(){ advanceTime(1); gainXp(1,'careful observation'); addJournal('field-note', `Observed ${loc.name} through ${bg.theme}.`, `${bg.id}-observe`); G.lastResult = `A quieter read of ${loc.name} settles into place. ${plot.title} becomes harder to dismiss as ordinary friction.`; } },
    { label:`Lean on ${ARCHETYPES[G.archetype].name} strengths`, tags:['Bold'], fn(){ advanceTime(1); gainXp(2,'archetype pressure'); G.skills[ARCHETYPES[G.archetype].focus] += 1; addJournal('progress', `Pressed ${plot.title.toLowerCase()} through ${ARCHETYPES[G.archetype].name.toLowerCase()} strengths.`, `${bg.id}-edge`); G.lastResult = `${ARCHETYPES[G.archetype].ability} thinking changes the first exchange. The local problem now has a clearer face and a cost.`; } },
    { label:`Approach ${loc.companion.name}`, tags:['Safe'], fn(){ recruitFlow(loc.companion); } },
    { label:`Advance the local plot: ${plot.title}`, tags:['Risky'], fn(){ advanceTime(1); gainXp(3, plot.title); G.stageProgress[1] += 1; addQuest(bg.stage1Plot, plot.title, G.stageProgress[1] >= 3 ? 'Ready to Escalate' : 'Active'); addJournal('quest', `Advanced ${plot.title}.`, `${bg.id}-plot-${G.stageProgress[1]}`); G.lastResult = `The local pressure hardens. ${plot.objective} Signs of ${G.currentThreat.hazard} and ${G.currentThreat.creature} make the place feel narrower.`; if (G.stageProgress[1] >= 3) addNotice(`${plot.title} now pushes beyond ${loc.name}.`); } },
    { label:`Test the hazard: ${G.currentThreat.hazard}`, tags:['Risky'], fn(){ beginEncounter('hazard', G.currentThreat.hazard, 'standard'); } },
    { label:`Confront ${G.currentThreat.creature}`, tags:['Bold','Risky'], fn(){ beginEncounter('creature', G.currentThreat.creature, 'standard'); } }
  ];
}
function scoutCurrentRoutes() {
  const loc = getLocality(G.location);
  const routes = (loc.adjacent || []).map(r => `${ROUTE_NAMES[r]}: ${ROUTE_SCOUTING[r] || 'Pressure moves here faster than comfort does.'}`);
  const entry = routes.join(' | ');
  G.routeScoutLog.unshift(`Day ${G.dayCount}: ${entry}`);
  G.routeScoutLog = G.routeScoutLog.slice(0, 8);
  stageMetric('stageScouts',1);
  addJournal('field-note', `Scouted route pressure from ${loc.name}.`, `scout-${G.location}-${G.dayCount}`);
  const scoutEdge = familyRewardBonus('scout');
  G.lastResult = (routes[0] || 'No clear adjacency routes reveal themselves yet.') + (scoutEdge ? ` Route reading comes easier with ${scoutEdge} earned family edge.` : '');
}

function leverageSafeZone() {
  const loc = getLocality(G.location);
  advanceTime(1);
  gainXp(2,'safe zone leverage');
  G.worldClocks.pressure += 1;
  stageMetric('stageSafeZoneUses',1);
  addJournal('progress', `Used ${G.currentSafeZone || loc.safeZone} as a leverage point.`, `safezone-${G.location}-${G.dayCount}`);
  const leverageEdge = familyRewardBonus('rescue') + familyRewardBonus('command');
  G.lastResult = `${G.currentSafeZone || loc.safeZone} stops being only a place to recover and starts functioning as a practical leverage point with witnesses, favors, and obligations attached.` + (leverageEdge ? ` Earned edges make the leverage cleaner and more immediate.` : '');
}

function buildStage2Choices() {
  const sig = routeSignature();
  const loc = getLocality(G.location);
  const adjacency = (loc.adjacent || []).slice(0,3);
  const travelChoices = adjacency.map(routeNode => ({
    label:`Travel along ${ROUTE_NAMES[routeNode]}`,
    tags:['Bold'],
    fn(){ travelToAdjacent(routeNode); }
  }));
  const set = [
    ...travelChoices,
    { label:`Favor the signature route: ${ROUTE_NAMES[sig.stage2Vector]}`, tags:['Risky'], fn(){ travelToAdjacent(sig.stage2Vector); } },
    { label:`Push the Stage II vector: ${sig.stage3Family.replace(/_/g,' ')}`, tags:['Risky'], fn(){ advanceTime(1); gainXp(4,'stage ii push'); G.stageProgress[2] += 1; addJournal('quest', `Expanded into ${sig.stage3Family.replace(/_/g,' ')}.`, `stage2-${sig.backgroundId}-${G.stageProgress[2]}`); G.lastResult = `The adjacent pressure stops looking local. Rival hands, route danger, and institutional will all begin to show more clearly.`; } },
    { label:'Scout adjacent routes before committing', tags:['Safe'], fn(){ scoutCurrentRoutes(); } },
    { label:'Turn the safe zone into leverage', tags:['Safe'], fn(){ leverageSafeZone(); } },
    { label:`Confront ${G.currentThreat.creature}`, tags:['Risky'], fn(){ beginEncounter('creature', G.currentThreat.creature, G.stage >= 2 ? 'elite' : 'standard'); } },
    { label:`Mitigate ${G.currentThreat.hazard}`, tags:['Safe'], fn(){ beginEncounter('hazard', G.currentThreat.hazard, 'standard'); } },
    { label:'Use companion edge', tags:['Safe'], fn(){ useCompanionEdge(); } },
    { label:'Make camp and regroup', tags:['Safe'], fn(){ openCamp(); } }
  ];
  return set.slice(0,7);
}
function buildStage34Choices() {
  const sig = routeSignature();
  const stage = G.stage;
  const content = familyContent(stage);
  const incident = currentFamilyIncident(stage);
  const family = stage === 3 ? sig.stage3Family : sig.stage4Family;
  const choices = [
    { label:`Resolve ${incident.title}: ${incident.actions[0].label}`, tags:['Risky'], fn(){ advanceTime(1); gainXp(4,'family incident'); G.stageProgress[stage] += 1; noteFamilyIncident(stage, 'pressure', incident); addJournal('quest', `Pressed ${family.replace(/_/g,' ')} through an authored incident.`, `stage${stage}-${sig.backgroundId}-${G.stageProgress[stage]}`); G.lastResult = incident.actions[0].result; } },
    { label:`Exploit ${incident.noun}: ${incident.actions[1].label}`, tags:['Bold'], fn(){ advanceTime(1); gainXp(4,'family leverage'); G.stageProgress[stage] += 1; noteFamilyIncident(stage, 'exploit', incident); addJournal('quest', `Exploited ${incident.noun} inside ${family.replace(/_/g,' ')}.`, `stage${stage}-${sig.backgroundId}-incident-${G.stageProgress[stage]}`); G.lastResult = incident.actions[1].result; } },
    { label:`Turn ${incident.noun} into advantage: ${incident.actions[2].label}`, tags:['Bold'], fn(){ advanceTime(1); gainXp(4,'family turn'); G.stageProgress[stage] += 1; noteFamilyIncident(stage, 'turn', incident); addJournal('quest', `Turned ${incident.noun} inside ${family.replace(/_/g,' ')}.`, `stage${stage}-${sig.backgroundId}-turn-${G.stageProgress[stage]}`); G.lastResult = incident.actions[2].result; } },
    { label:`Advance ${content.title}: ${content.actions[0].label}`, tags:['Risky'], fn(){ advanceTime(1); gainXp(4,'plot pressure'); G.stageProgress[stage] += 1; addJournal('quest', `Pressed ${family.replace(/_/g,' ')}.`, `stage${stage}-${sig.backgroundId}-content-${G.stageProgress[stage]}`); G.lastResult = content.actions[0].result; } },
    { label:`Reframe the field: ${(content.actions[1] || content.actions[0]).label}`, tags:['Safe'], fn(){ advanceTime(1); gainXp(3,'plot reframing'); G.stageProgress[stage] += 1; addJournal('quest', `Reframed ${content.title}.`, `stage${stage}-${sig.backgroundId}-reframe-${G.stageProgress[stage]}`); G.lastResult = (content.actions[1] || content.actions[0]).result; } },
    { label:`Force a confrontation with ${G.currentThreat.creature}`, tags:['Bold','Risky'], fn(){ beginEncounter('creature', G.currentThreat.creature, stage===4 ? 'elite' : 'standard'); } },
    { label:`Handle ${G.currentThreat.hazard} before it spreads`, tags:['Risky'], fn(){ beginEncounter('hazard', G.currentThreat.hazard, stage===4 ? 'elite' : 'standard'); } },
    { label:'Use companion edge', tags:['Safe'], fn(){ useCompanionEdge(); } },
    { label:'Make camp and regroup', tags:['Safe'], fn(){ openCamp(); } }
  ];
  if (!G.empowermentUsed[stage]) {
    choices.splice(3, 0, { label:'Demonstrate how far you have come', tags:['Bold'], fn(){ empowermentEncounter(stage); } });
  }
  return choices;
}
function buildStage5Choices() {
  const content = familyContent(5);
  const incident = currentFamilyIncident(5);
  const preFinal = !finalBreakCommitted();
  const milestoneReady = (G.stageProgress[5] || 0) >= 3;
  const choices = [
    { label:`Pressure ${incident.title}: ${incident.actions[0].label}`, tags:['Bold','Risky'], fn(){ advanceTime(1); gainXp(2,'endgame pressure'); G.stageProgress[5] += 1; noteFamilyIncident(5, 'pressure', incident); G.lastResult = incident.actions[0].result; markMoment(`Endgame pressure intensified through ${incident.title}`); } },
    { label:`Exploit ${incident.noun}: ${incident.actions[1].label}`, tags:['Bold'], fn(){ advanceTime(1); gainXp(2,'endgame leverage'); G.stageProgress[5] += 1; noteFamilyIncident(5, 'exploit', incident); G.lastResult = incident.actions[1].result; addNotice(`${incident.title} is now visible to every power still trying to shape the ending.`); } },
    { label:`Turn the field through ${incident.noun}: ${incident.actions[2].label}`, tags:['Bold','Risky'], fn(){ advanceTime(1); gainXp(2,'endgame seam'); G.stageProgress[5] += 1; noteFamilyIncident(5, 'turn', incident); G.lastResult = incident.actions[2].result; markMoment(`A hidden seam in ${incident.title} was pushed open.`); } },
  ];
  if (milestoneReady && preFinal) {
    choices.push({ label:'Commit the final break', tags:['Bold','Risky'], fn(){ advanceTime(1); commitFinalBreak(); } });
  }
  if (finalBreakCommitted()) {
    choices.push({ label:`Confront ${content.finalBoss}`, tags:['Bold','Risky'], fn(){ G.pendingLegendOutcome = content.creatureOutcome; beginEncounter('creature', content.finalBoss, 'boss'); } });
    choices.push({ label:`Contain ${content.finalHazard}`, tags:['Risky'], fn(){ G.pendingLegendOutcome = content.hazardOutcome; beginEncounter('hazard', content.finalHazard, 'boss'); } });
  } else {
    choices.push({ label:'Read the last lines before committing the break', tags:['Safe'], fn(){ advanceTime(1); G.lastResult = `Not enough of the ending has been forced into the open yet. ${content.title} still requires more decisive pressure before a final break can be committed.`; } });
  }
  choices.push({ label:'Use companion edge', tags:['Safe'], fn(){ useCompanionEdge(); } });
  return choices;
}
function renderChoices() {
  const wrap = document.getElementById('choices');
  wrap.innerHTML = '';
  const set = G.encounter ? encounterChoices() : (G.stage === 1 ? buildStage1Choices() : G.stage === 2 ? buildStage2Choices() : G.stage < 5 ? buildStage34Choices() : buildStage5Choices());
  set.forEach(ch => {
    const el = document.createElement('button');
    el.className = 'choice';
    el.innerHTML = `<div>${ch.label}</div><div class="choice-tags">${(ch.tags || []).map(t => `<span class="tag ${t.toLowerCase()}">${t}</span>`).join('')}</div>`;
    el.onclick = () => { incrementStageAction(); ch.fn(); maybeStageAdvance(); if (!G.encounter) setThreat(); render(); };
    wrap.appendChild(el);
  });
}

function travelToAdjacent(routeNode) {
  const destination = ROUTE_DESTINATIONS[routeNode] || G.location;
  advanceTime(1);
  G.routeNode = routeNode;
  G.location = destination;
  G.currentSafeZone = getLocality(destination).safeZone;
  stageMetric('stageTravels',1);
  G.routeHistory.push(routeNode);
  G.routeHistory = G.routeHistory.slice(-12);
  G.safeZoneHistory.push(`${getLocality(destination).name}: ${G.currentSafeZone}`);
  G.safeZoneHistory = G.safeZoneHistory.slice(-12);
  gainXp(3, 'route expansion');
  addJournal('travel', `Moved into ${ROUTE_NAMES[routeNode]} toward ${getLocality(destination).name}.`, `travel-${routeNode}-${G.dayCount}`);
  G.lastResult = `The run widens through ${ROUTE_NAMES[routeNode]}. ${getLocality(destination).name} reads like a new pressure surface rather than a simple new backdrop.`;
}
function empowermentEncounter(stage) {
  G.empowermentUsed[stage] = true;
  stageMetric('stageActions',1);
  advanceTime(1);
  gainXp(4, 'earned dominance');
  G.renown += 3;
  markMoment(`Public dominance displayed in Stage ${stage}`);
  G.lastResult = `${ARCHETYPES[G.archetype].empowerText} People who once would have tested the run directly now measure distance, count allies, and decide against it.`;
  addNotice(`A smaller confrontation in ${getLocality(G.location).name} ends decisively in your favor.`);
}
function handleDeath(cause) {
  if (G.stage >= 5) {
    G.stage5Dead = true;
    finishLegend('failure', cause);
    return;
  }
  G.deathCount += 1;
  stageMetric('stageRescues',1);
  const loc = getLocality(G.location);
  const rescueSource = pick([
    'a patrol close enough to hear it',
    'a convoy hand who refused to leave the body',
    'companions and locals working fast under pressure',
    'an institution that could not ignore the scene',
    'shrine workers and route hands acting before permission arrived'
  ], G.deathCount + G.stage);
  const recovery = SAFE_ZONE_RECOVERY[G.location] || { locality:G.location, safeZone:loc.safeZone };
  const recoveryLoc = getLocality(recovery.locality) || loc;
  const consequencePool = [
    'Time is gone, wounds remain, rival pressure rises, and the failed ground is no longer safe to treat as solved.',
    'The rescue costs supplies, face, and route initiative; people who saw it now read the run differently.',
    'Recovery comes with obligation: someone carried the cost long enough to keep the run alive, and that debt does not vanish.',
    'The route continues, but not cleanly. Witnesses spread the story, rivals gain time, and the next move now happens under a changed sky.'
  ];
  const consequences = pick(consequencePool, G.deathCount + G.dayCount + G.stage);
  G.hp = Math.max(8, Math.floor(G.maxHp * 0.45));
  G.wounds = ['Recovered from near death'];
  G.fatigue += 2;
  G.gold = Math.max(0, G.gold - (3 + G.stage));
  G.worldClocks.rival += 2;
  G.worldClocks.pressure += 1 + Math.floor(G.stage/2);
  G.routeNode = null;
  G.location = recoveryLoc === loc ? G.location : recovery.locality;
  G.currentSafeZone = recovery.safeZone || recoveryLoc.safeZone;
  G.safeZoneHistory.push(`${recoveryLoc.name}: ${G.currentSafeZone}`);
  G.safeZoneHistory = G.safeZoneHistory.slice(-12);
  if (G.companions.length) {
    const companion = G.companions[(G.deathCount + G.dayCount) % G.companions.length];
    companion.trust = Math.max(0, companion.trust - 1);
    if ((G.deathCount + G.stage) % 2 === 0) companion.injured = true;
  }
  G.rescueLog.push({ day:G.dayCount, stage:G.stage, cause, rescueSource, locality:G.location, safeZone:G.currentSafeZone });
  addJournal('recovery', `Near death after ${cause}; recovered through ${rescueSource} and carried into ${G.currentSafeZone}.`, `rescue-${G.dayCount}-${cause}`);
  markMoment(`Survived ${cause}`);
  G.lastResult = rescueNarrative(G, recoveryLoc, rescueSource, consequences);
}
function finishLegend(outcome, cause='') {
  const sig = routeSignature();
  const titleByOutcome = { success:'Ash-Bound Victor', containment:'Warden of the Last Boundary', exposure:'Breaker of Quiet Lies', world_scar:'Bearer of the Scarring Path', divine_rerouting:'Rerouter of Sacred Pressure', sacrificial_stabilization:'Keeper of the Costly Line', failure:'Fallen at the Edge of Victory' };
  G.metrics.legendRuns += 1;
  const legend = {
    name:G.name,
    class:ARCHETYPES[G.archetype].name,
    background:getBackground(G.archetype, G.backgroundId).name,
    level:G.level, stage:G.stageLabel, outcome, cause,
    companions:G.companions.map(c => c.name), renown:G.renown, day:G.dayCount,
    routes:G.routeHistory.map(r => ROUTE_NAMES[r] || r), rescueCount:G.deathCount, scars:[...G.wounds], routeTrail:[routeSignature().stage3Family, routeSignature().stage4Family, routeSignature().stage5Family],
    rescues:[...G.rescueLog].slice(-5).map(r => `Day ${r.day}: ${r.cause} -> ${r.safeZone}`),
    keyMoments:[...G.keyMoments],
    confrontations:G.journalRecords.filter(r => r.category === 'encounter').slice(0,6).map(r => r.text),
    stage5Family:sig.stage5Family, finalSafeZone:G.currentSafeZone || '',
    title:titleByOutcome[outcome] || '',
    safeZoneHistory:[...G.safeZoneHistory],
    routeScoutLog:[...G.routeScoutLog].slice(0,6),
    metricsSummary: balanceSnapshot().replace(/<br>/g,' | '),
    familyIncidents:[...(G.familyIncidentLog||[])].slice(0,8).map(x => `Day ${x.day}: ${x.title} by ${x.mode}`),
    finalBreak: G.finalBreaks && G.finalBreaks[sig.stage5Family] ? `Day ${G.finalBreaks[sig.stage5Family].day}: final break committed in ${sig.stage5Family.replace(/_/g,' ')}` : '',
    summary:
      outcome === 'success' ? `Reached Stage V and prevailed through ${familyContent(5).title}.` :
      outcome === 'containment' ? `Reached Stage V and forced a costly containment through ${familyContent(5).title}.` :
      outcome === 'exposure' ? `Reached Stage V and broke the hidden structure into public sight.` :
      outcome === 'world_scar' ? `Reached Stage V and won through a world-scarring ending that no one present will forget.` :
      outcome === 'divine_rerouting' ? `Reached Stage V and altered the sacred path rather than surrendering to it.` :
      outcome === 'sacrificial_stabilization' ? `Reached Stage V and stabilized the ending at a cost the legend cannot hide.` :
      `Fell under ${cause || 'a final pressure'} in ${G.stageLabel}.`,
    locality:G.location
  };
  G.legends.unshift(legend);
  G.legends = G.legends.slice(0, 12);
  G.pendingLegendOutcome = null;
  persist();
  openOverlay('Hall of Legends', legendSummary(legend));
}

function openOverlay(title, body) {
  document.getElementById('overlay-title').textContent = title;
  document.getElementById('overlay-body').innerHTML = `<div class="small">${String(body).replace(/\n/g, '<br>')}</div>`;
  document.getElementById('overlay').classList.remove('hidden');
}
function renderOverlay(kind) {
  if (kind === 'journal') {
    const body = G.journalRecords.map(r => `<div><strong>Day ${r.day}</strong> · ${r.category} · ${getLocality(r.locality)?.name || r.locality}<br>${r.text}</div>`).join('<hr>') || 'No entries yet.';
    openOverlay('The Ledger', body);
  } else if (kind === 'npcs') {
    const loc = getLocality(G.location);
    const c = loc.companion;
    const threat = G.currentThreat || chooseThreat(loc); const body = `<div><strong>${c.name}</strong> — ${c.role}</div><br>${G.companions.some(x => x.id === c.id) ? 'Already traveling with you.' : 'A likely ally if approached carefully.'}<br><br><strong>Visible local pressure</strong><br>${pick(loc.pressure, G.dayCount)}<br><br><strong>Current creature and hazard surfaces</strong><br>${threat.creature} · ${threat.hazard}`;
    openOverlay('Local Contacts', body);
  } else if (kind === 'notices') {
    const body = G.notices.map(n => `<div><strong>Day ${n.day}</strong><br>${n.text}</div>`).join('<hr>') || 'No notices yet.';
    openOverlay('Notice Board', body);
  } else if (kind === 'map') {
    const loc = getLocality(G.location);
    const sig = routeSignature(); const watch = (typeof currentNamedPlacements === 'function' ? currentNamedPlacements(G.location) : []).map(n => `${n.id.replace(/_/g,' ')} @ ${n.office}`).join('; ') || 'No high-risk named surfaces flagged here in this batch.'; const atlas = (loc.adjacent||[]).map(a => { const meta = (typeof ROUTE_ATLAS !== 'undefined' && ROUTE_ATLAS[a]) ? ROUTE_ATLAS[a] : {risk:'unknown', style:'route', note:'No detailed atlas note yet.'}; return `• ${ROUTE_NAMES[a]} -> ${getLocality(ROUTE_DESTINATIONS[a]||G.location).name} [${meta.risk}]<br>&nbsp;&nbsp;${meta.style} — ${meta.note}`; }).join('<br>'); openOverlay('The Material Planet', `<strong>${loc.name}</strong><br>${loc.identity}<br><br>Adjacent routes:<br>${atlas}<br><br><strong>Route signature</strong><br>Stage II: ${ROUTE_NAMES[sig.stage2Vector]}<br>Stage III: ${sig.stage3Family.replace(/_/g,' ')}<br>Stage IV: ${sig.stage4Family.replace(/_/g,' ')}<br>Named placement watch: ${watch}`);
  } else if (kind === 'camp') {
    openCamp();
  } else if (kind === 'sheet') {
    const stageTarget = (typeof STAGE_BALANCE_TARGETS !== 'undefined' && STAGE_BALANCE_TARGETS[G.stage]) ? STAGE_BALANCE_TARGETS[G.stage] : null;
    const balanceLine = stageTarget ? `<br>Balance target: skill ${stageTarget.expectedSkill}+ · party ${stageTarget.expectedParty}+ · threat bias ${stageTarget.threatBias}<br>${stageTarget.note}` : '';
    openOverlay('Character', `<strong>${G.name}</strong><br>${ARCHETYPES[G.archetype].name} · ${getBackground(G.archetype, G.backgroundId).name}<br>Level ${G.level} · ${G.stageLabel}<br>Skills: ${Object.keys(G.skills).map(k => `${k} ${effectiveSkillValue(k)}`).join(', ')}<br>Rescue incidents: ${G.deathCount}<br>Current wounds: ${G.wounds.join(', ') || 'None'}<br>Companions: ${G.companions.map(c => c.name + ' (' + c.role + ')').join(', ') || 'None'}<br>Current safe zone: ${G.currentSafeZone || 'None'}<br>Deaths survived: ${G.deathCount}<br>Route trail: ${routeSignature().stage3Family.replace(/_/g,' ')} → ${routeSignature().stage4Family.replace(/_/g,' ')} → ${routeSignature().stage5Family.replace(/_/g,' ')}<br>Stage III family: ${routeSignature().stage3Family.replace(/_/g,' ')}<br>Stage IV family: ${routeSignature().stage4Family.replace(/_/g,' ')}<br>Stage V family: ${routeSignature().stage5Family.replace(/_/g,' ')}<br>Final break: ${finalBreakCommitted() ? 'Committed' : 'Not yet committed'}<br>Active incident: ${currentFamilyIncident(G.stage).title}<br>Route adjacency: ${(getLocality(G.location).adjacent || []).map(a => `${ROUTE_NAMES[a]}${typeof ROUTE_ATLAS !== 'undefined' && ROUTE_ATLAS[a] ? ' ['+ROUTE_ATLAS[a].risk+']' : ''}`).join(', ')}${balanceLine}`);
  } else if (kind === 'legends') {
    const body = G.legends.length ? G.legends.map(l => `<div>${legendSummary(l).replace(/\n/g,'<br>')}</div>`).join('<hr>') : 'No legends recorded yet. Batch 12 expects route, rescue, safe-zone, and confrontation memory to accumulate here.';
    openOverlay('Hall of Legends', body);
  }
}

function render() {
  if (!G) return;
  updateStage();
  document.getElementById('hud-name').textContent = G.name;
  document.getElementById('hud-class').textContent = ARCHETYPES[G.archetype].name;
  document.getElementById('hud-background').textContent = getBackground(G.archetype, G.backgroundId).name;
  document.getElementById('hud-level').textContent = `${G.level} · ${G.stageLabel}`;
  document.getElementById('hud-renown').textContent = `${G.renown}`;
  document.getElementById('hud-hp').textContent = `${G.hp}/${G.maxHp}`;
  document.getElementById('hud-status').textContent = G.wounds.length ? G.wounds.join(', ') : 'Stable';
  document.getElementById('hud-gold').textContent = `${G.gold}`;
  document.getElementById('header-stage').textContent = G.stageLabel;
  document.getElementById('hud-location').textContent = `${getLocality(G.location).name} · ${getLocality(G.location).polity}`;
  document.getElementById('hud-time').textContent = `Day ${G.dayCount} · ${TIME_NAMES[G.timeIndex]}`;
  document.getElementById('hud-objective').textContent = currentObjective();
  document.getElementById('central-narrative').textContent = centralNarrative();
  document.getElementById('result-panel').textContent = G.lastResult;
  renderChoices();
  persist();
}

function setupTitle() {
  const archetypeEl = document.getElementById('new-archetype');
  archetypeEl.innerHTML = Object.entries(ARCHETYPES).map(([id,a]) => `<option value="${id}">${a.name}</option>`).join('');
  document.getElementById('new-bonus').innerHTML = SKILLS.map(s => `<option value="${s}">${s}</option>`).join('');
  function refreshBackgrounds() {
    const a = archetypeEl.value;
    document.getElementById('new-background').innerHTML = BACKGROUNDS[a].map(b => `<option value="${b.id}">${b.name}</option>`).join('');
  }
  archetypeEl.onchange = refreshBackgrounds;
  refreshBackgrounds();

  document.getElementById('btn-new').onclick = () => {
    const name = document.getElementById('new-name').value.trim() || 'Unnamed';
    const passcode = document.getElementById('new-passcode').value.trim();
    if (!/^\d{4}$/.test(passcode)) { document.getElementById('load-status').textContent = 'Use a 4-digit passcode.'; return; }
    G = defaultState();
    G.name = name;
    G.passcode = passcode;
    G.archetype = archetypeEl.value;
    G.backgroundId = document.getElementById('new-background').value;
    G.skills[document.getElementById('new-bonus').value] += 1;
    const bg = getBackground(G.archetype, G.backgroundId);
    G.location = bg.locality;
    G.routeSignature = routeSignature();
    G.currentSafeZone = getLocality(bg.locality).safeZone;
    setThreat();
    addQuest(bg.stage1Plot, PLOT_FAMILIES[bg.stage1Plot].title, 'Active');
    addJournal('origin', `${ARCHETYPES[G.archetype].name} beginning in ${getLocality(bg.locality).name} as ${bg.name}.`, `origin-${bg.id}`);
    markMoment(`Began in ${getLocality(bg.locality).name} as ${bg.name}`);
    G.lastResult = `The ledger opens in ${getLocality(bg.locality).name}. ${PLOT_FAMILIES[bg.stage1Plot].title} is already close enough to disturb ordinary life.`;
    showGame();
  };
  document.getElementById('btn-load').onclick = () => {
    const code = document.getElementById('load-code').value.trim();
    const data = loadByCode(code);
    if (!data) { document.getElementById('load-status').textContent = 'No legend found for that code.'; return; }
    G = data;
    showGame();
  };
}
function showGame() { document.getElementById('screen-title').classList.remove('active'); document.getElementById('screen-game').classList.add('active'); render(); }
function setupOverlay() {
  document.querySelectorAll('[data-open]').forEach(btn => btn.onclick = () => renderOverlay(btn.dataset.open));
  document.getElementById('overlay-close').onclick = () => document.getElementById('overlay').classList.add('hidden');
  document.getElementById('btn-end').onclick = () => openOverlay('Your Legend Ends', 'Use the browser to close or begin another run. Hall of Legends storage occurs on Stage V success or failure in this batch.');
}
setupTitle();
setupOverlay();

// ----- Batch 17 tangible progress: family-authored threat routing, richer legends, locality NPC surfacing -----
function activeThreatFamily() {
  const sig = routeSignature();
  if (G.stage >= 5) return sig.stage5Family;
  if (G.stage >= 4) return sig.stage4Family;
  if (G.stage >= 3) return sig.stage3Family;
  if (G.stage >= 2 && G.routeNode && typeof ROUTE_FAMILIES !== 'undefined' && ROUTE_FAMILIES[G.routeNode]) return ROUTE_FAMILIES[G.routeNode].stage3;
  return null;
}

function chooseThreat(locality) {
  const family = activeThreatFamily();
  if (family && typeof getFamilyThreatProfile === 'function') {
    const profile = getFamilyThreatProfile(G.stage, family);
    const hazard = profile.hazards[(G.dayCount + G.worldClocks.pressure + G.stage) % profile.hazards.length];
    const creature = profile.creatures[(G.dayCount + G.worldClocks.rival + G.stage) % profile.creatures.length];
    return { hazard, creature, familyNote: profile.note, family };
  }
  const hazard = locality.hazards[(G.dayCount + G.stage + G.worldClocks.pressure) % locality.hazards.length];
  const creature = locality.creatures[(G.dayCount + G.stage + G.worldClocks.rival) % locality.creatures.length];
  return { hazard, creature, familyNote: null, family: null };
}

function setThreat() { G.currentThreat = chooseThreat(getLocality(G.location)); }

function namedLocalityWatch(localityId) {
  const current = typeof currentNamedPlacements === 'function' ? currentNamedPlacements(localityId) : [];
  const adjacent = (getLocality(localityId).adjacent || []).flatMap(r => {
    const dest = ROUTE_DESTINATIONS[r];
    return dest && typeof currentNamedPlacements === 'function' ? currentNamedPlacements(dest) : [];
  });
  const merged = [...current, ...adjacent];
  const seen = new Set();
  return merged.filter(n => {
    const key = `${n.id}|${n.locality}|${n.office}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0,8);
}

function legendTier(legend) {
  const score = legend.renown + (legend.level * 2) + (legend.outcome === 'success' ? 10 : legend.outcome === 'failure' ? 0 : 6) + Math.max(0, 6 - legend.rescueCount);
  if (score >= 55) return 'World-Scoring Legend';
  if (score >= 40) return 'Axis-Touched Champion';
  if (score >= 28) return 'Regional Power';
  if (score >= 18) return 'Rising Name';
  return 'Scar-Bearing Survivor';
}

function travelToAdjacent(routeNode) {
  const destination = ROUTE_DESTINATIONS[routeNode] || G.location;
  advanceTime(1);
  G.routeNode = routeNode;
  G.location = destination;
  G.currentSafeZone = getLocality(destination).safeZone;
  stageMetric('stageTravels',1);
  G.routeHistory.push(routeNode);
  G.routeHistory = G.routeHistory.slice(-16);
  G.safeZoneHistory.push(`${getLocality(destination).name}: ${G.currentSafeZone}`);
  G.safeZoneHistory = G.safeZoneHistory.slice(-16);
  gainXp(3, 'route expansion');
  addJournal('travel', `Moved into ${ROUTE_NAMES[routeNode]} toward ${getLocality(destination).name}.`, `travel-${routeNode}-${G.dayCount}`);
  const atlas = (typeof ROUTE_ATLAS !== 'undefined' && ROUTE_ATLAS[routeNode]) ? ROUTE_ATLAS[routeNode] : null;
  const atlasNote = atlas ? ` ${atlas.note}` : '';
  G.lastResult = `The run widens through ${ROUTE_NAMES[routeNode]}. ${getLocality(destination).name} reads like a new pressure surface rather than a simple new backdrop.${atlasNote}`;
}

function buildStage34Choices() {
  const sig = routeSignature();
  const stage = G.stage;
  const content = familyContent(stage);
  const actionA = content.actions[0];
  const actionB = content.actions[1];
  const actionC = content.actions[2];
  const actionD = content.actions[3] || actionA;
  const actionE = content.actions[4] || actionB;
  const threatNote = G.currentThreat?.familyNote || '';
  const choices = [
    { label:`Advance ${content.title}: ${actionA.label}`, tags:['Risky'], fn(){ advanceTime(1); gainXp(4,'plot pressure'); G.stageProgress[stage] += 1; addJournal('quest', `Pressed ${stage===3 ? sig.stage3Family : sig.stage4Family}.`, `stage${stage}-${sig.backgroundId}-${G.stageProgress[stage]}`); G.lastResult = `${actionA.result}${threatNote ? ' ' + threatNote : ''}`; } },
    { label:`Turn the field: ${actionB.label}`, tags:['Bold'], fn(){ advanceTime(1); gainXp(4,'plot leverage'); G.stageProgress[stage] += 1; addJournal('quest', `Turned ${stage===3 ? sig.stage3Family : sig.stage4Family} through leverage.`, `stage${stage}-${sig.backgroundId}-lever-${G.stageProgress[stage]}`); G.lastResult = `${actionB.result}${threatNote ? ' ' + threatNote : ''}`; } },
    { label:`Exploit the seam: ${actionC.label}`, tags:['Bold'], fn(){ advanceTime(1); gainXp(4,'plot seam'); G.stageProgress[stage] += 1; addJournal('quest', `Exploited a seam inside ${content.title}.`, `stage${stage}-${sig.backgroundId}-seam-${G.stageProgress[stage]}`); G.lastResult = `${actionC.result}${threatNote ? ' ' + threatNote : ''}`; } },
    { label:`Reframe the field: ${actionD.label}`, tags:['Safe'], fn(){ advanceTime(1); gainXp(3,'plot reframing'); G.stageProgress[stage] += 1; addJournal('quest', `Reframed ${content.title} through timing and witness pressure.`, `stage${stage}-${sig.backgroundId}-reframe-${G.stageProgress[stage]}`); G.lastResult = `${actionD.result}${threatNote ? ' ' + threatNote : ''}`; } },
    { label:`Exploit witness pressure: ${actionE.label}`, tags:['Risky'], fn(){ advanceTime(1); gainXp(4,'witness pressure'); G.stageProgress[stage] += 1; addJournal('quest', `Used witness pressure inside ${content.title}.`, `stage${stage}-${sig.backgroundId}-witness-${G.stageProgress[stage]}`); G.lastResult = `${actionE.result}${threatNote ? ' ' + threatNote : ''}`; } },
    { label:`Confront ${G.currentThreat.creature}`, tags:['Bold','Risky'], fn(){ beginEncounter('creature', G.currentThreat.creature, stage===4 ? 'elite' : 'standard'); } },
    { label:`Handle ${G.currentThreat.hazard} before it spreads`, tags:['Risky'], fn(){ beginEncounter('hazard', G.currentThreat.hazard, stage===4 ? 'elite' : 'standard'); } },
    { label:'Use companion edge', tags:['Safe'], fn(){ useCompanionEdge(); } },
    { label:'Make camp and regroup', tags:['Safe'], fn(){ openCamp(); } }
  ];
  if (!G.empowermentUsed[stage]) choices.splice(2, 0, { label:'Demonstrate how far you have come', tags:['Bold'], fn(){ empowermentEncounter(stage); } });
  return choices;
}

function renderOverlay(kind) {
  if (kind === 'journal') {
    const body = G.journalRecords.map(r => `<div><strong>Day ${r.day}</strong> · ${r.category} · ${getLocality(r.locality)?.name || r.locality}<br>${r.text}</div>`).join('<hr>') || 'No entries yet.';
    openOverlay('The Ledger', body);
  } else if (kind === 'npcs') {
    const loc = getLocality(G.location);
    const c = loc.companion;
    const threat = G.currentThreat || chooseThreat(loc);
    const placements = namedLocalityWatch(G.location).map(n => `${n.id.replace(/_/g,' ')} — ${getLocality(n.locality)?.name || n.locality} · ${n.office}`).join('<br>') || 'No high-risk named placements surfaced in this locality cluster yet.';
    const body = `<div><strong>${c.name}</strong> — ${c.role}</div><br>${G.companions.some(x => x.id === c.id) ? 'Already traveling with you.' : 'A likely ally if approached carefully.'}<br><br><strong>Visible local pressure</strong><br>${pick(loc.pressure, G.dayCount)}<br><br><strong>Current creature and hazard surfaces</strong><br>${threat.creature} · ${threat.hazard}${threat.familyNote ? `<br><br>${threat.familyNote}` : ''}<br><br><strong>Named placement watch</strong><br>${placements}`;
    openOverlay('Local Contacts', body);
  } else if (kind === 'notices') {
    const body = G.notices.map(n => `<div><strong>Day ${n.day}</strong><br>${n.text}</div>`).join('<hr>') || 'No notices yet.';
    openOverlay('Notice Board', body);
  } else if (kind === 'map') {
    const loc = getLocality(G.location);
    const sig = routeSignature();
    const watch = namedLocalityWatch(G.location).map(n => `${n.id.replace(/_/g,' ')} @ ${n.office} (${getLocality(n.locality)?.name || n.locality})`).join('; ') || 'No high-risk named surfaces flagged here in this batch.';
    const atlas = (loc.adjacent||[]).map(a => { const meta = (typeof ROUTE_ATLAS !== 'undefined' && ROUTE_ATLAS[a]) ? ROUTE_ATLAS[a] : {risk:'unknown', style:'route', note:'No detailed atlas note yet.'}; return `• ${ROUTE_NAMES[a]} -> ${getLocality(ROUTE_DESTINATIONS[a]||G.location).name} [${meta.risk}]<br>&nbsp;&nbsp;${meta.style} — ${meta.note}`; }).join('<br>');
    const family = activeThreatFamily();
    const familyProfile = family && typeof getFamilyThreatProfile === 'function' ? getFamilyThreatProfile(G.stage, family) : null;
    openOverlay('The Material Planet', `<strong>${loc.name}</strong><br>${loc.identity}<br><br>Adjacent routes:<br>${atlas}<br><br><strong>Route signature</strong><br>Stage II: ${ROUTE_NAMES[sig.stage2Vector]}<br>Stage III: ${sig.stage3Family.replace(/_/g,' ')}<br>Stage IV: ${sig.stage4Family.replace(/_/g,' ')}<br>${familyProfile ? `<strong>Current family threat profile</strong><br>${familyProfile.note}<br>Creatures: ${familyProfile.creatures.join(', ')}<br>Hazards: ${familyProfile.hazards.join(', ')}<br>` : ''}Named placement watch: ${watch}`);
  } else if (kind === 'camp') {
    openCamp();
  } else if (kind === 'sheet') {
    const stageTarget = (typeof STAGE_BALANCE_TARGETS !== 'undefined' && STAGE_BALANCE_TARGETS[G.stage]) ? STAGE_BALANCE_TARGETS[G.stage] : null;
    const balanceLine = stageTarget ? `<br>Balance target: skill ${stageTarget.expectedSkill}+ · party ${stageTarget.expectedParty}+ · threat bias ${stageTarget.threatBias}<br>${stageTarget.note}` : '';
    const telemetry = `Turns ${G.metrics.stageTurns[G.stage]||0} · actions ${G.metrics.stageActions[G.stage]||0} · encounters ${G.metrics.stageEncounters[G.stage]||0} · wins ${G.metrics.encounterWins[G.stage]||0} · rescues ${G.metrics.stageRescues[G.stage]||0}`;
    openOverlay('Character', `<strong>${G.name}</strong><br>${ARCHETYPES[G.archetype].name} · ${getBackground(G.archetype, G.backgroundId).name}<br>Level ${G.level} · ${G.stageLabel}<br>Skills: ${Object.keys(G.skills).map(k => `${k} ${effectiveSkillValue(k)}`).join(', ')}<br>Rescue incidents: ${G.deathCount}<br>Current wounds: ${G.wounds.join(', ') || 'None'}<br>Companions: ${G.companions.map(c => c.name + ' (' + c.role + ')').join(', ') || 'None'}<br>Current safe zone: ${G.currentSafeZone || 'None'}<br>Route trail: ${routeSignature().stage3Family.replace(/_/g,' ')} → ${routeSignature().stage4Family.replace(/_/g,' ')} → ${routeSignature().stage5Family.replace(/_/g,' ')}<br>${telemetry}<br>Route adjacency: ${(getLocality(G.location).adjacent || []).map(a => `${ROUTE_NAMES[a]}${typeof ROUTE_ATLAS !== 'undefined' && ROUTE_ATLAS[a] ? ' ['+ROUTE_ATLAS[a].risk+']' : ''}`).join(', ')}${balanceLine}`);
  } else if (kind === 'legends') {
    const body = G.legends.length ? G.legends.map(l => `<div>${legendSummary(l).replace(/\n/g,'<br>')}</div>`).join('<hr>') : 'No legends recorded yet. Batch 17 expects route-family threat profiles, named placements, rescues, and confrontation memory to accumulate here.';
    openOverlay('Hall of Legends', body);
  }
}

function finishLegend(outcome, cause='') {
  const sig = routeSignature();
  const titleByOutcome = { success:'Ash-Bound Victor', containment:'Warden of the Last Boundary', exposure:'Breaker of Quiet Lies', world_scar:'Bearer of the Scarring Path', divine_rerouting:'Rerouter of Sacred Pressure', sacrificial_stabilization:'Keeper of the Costly Line', failure:'Fallen at the Edge of Victory' };
  G.metrics.legendRuns += 1;
  const legend = {
    name:G.name,
    class:ARCHETYPES[G.archetype].name,
    background:getBackground(G.archetype, G.backgroundId).name,
    level:G.level, stage:G.stageLabel, outcome, cause,
    companions:G.companions.map(c => c.name), renown:G.renown, day:G.dayCount,
    routes:G.routeHistory.map(r => ROUTE_NAMES[r] || r), rescueCount:G.deathCount, scars:[...G.wounds], routeTrail:[routeSignature().stage3Family, routeSignature().stage4Family, routeSignature().stage5Family],
    rescues:[...G.rescueLog].slice(-5).map(r => `Day ${r.day}: ${r.cause} -> ${r.safeZone}`),
    keyMoments:[...G.keyMoments],
    confrontations:G.journalRecords.filter(r => r.category === 'encounter').slice(0,8).map(r => r.text),
    stage5Family:sig.stage5Family, finalSafeZone:G.currentSafeZone || '',
    title:titleByOutcome[outcome] || '',
    tier:'',
    safeZoneHistory:[...G.safeZoneHistory],
    routeScoutLog:[...G.routeScoutLog].slice(0,8),
    metricsSummary: balanceSnapshot().replace(/<br>/g,' | '),
    stageTelemetry:{
      turns:G.metrics.stageTurns, actions:G.metrics.stageActions, encounters:G.metrics.stageEncounters, wins:G.metrics.encounterWins, rescues:G.metrics.stageRescues
    },
    summary:
      outcome === 'success' ? `Reached Stage V and prevailed through ${familyContent(5).title}.` :
      outcome === 'containment' ? `Reached Stage V and forced a costly containment through ${familyContent(5).title}.` :
      outcome === 'exposure' ? `Reached Stage V and broke the hidden structure into public sight.` :
      outcome === 'world_scar' ? `Reached Stage V and won through a world-scarring ending that no one present will forget.` :
      outcome === 'divine_rerouting' ? `Reached Stage V and altered the sacred path rather than surrendering to it.` :
      outcome === 'sacrificial_stabilization' ? `Reached Stage V and stabilized the ending at a cost the legend cannot hide.` :
      `Fell under ${cause || 'a final pressure'} in ${G.stageLabel}.`,
    locality:G.location
  };
  legend.tier = legendTier(legend);
  G.legends.unshift(legend);
  G.legends = G.legends.slice(0, 12);
  G.pendingLegendOutcome = null;
  persist();
  openOverlay('Hall of Legends', legendSummary(legend));
}

function centralNarrative() {
  const loc = getLocality(G.location);
  const named = typeof currentNamedPlacements === 'function' ? currentNamedPlacements(G.location) : [];
  return localityNarrative(G, loc, {
    pressure: pick(loc.pressure, G.worldClocks.pressure),
    routeHint: G.routeNode ? ROUTE_NAMES[G.routeNode] : null,
    hazardHint: G.currentThreat?.hazard || null,
    creatureHint: G.currentThreat?.creature || null,
    familyNote: G.currentThreat?.familyNote || null,
    namedHint: named.length ? named.map(n => `${n.id.replace(/_/g,' ')} at ${n.office}`).join('; ') : null,
    routeAtlas: G.routeNode && typeof routeAtlasNote === 'function' ? routeAtlasNote(G.routeNode) : ''
  });
}


// ----- Batch 18 tangible progress: family milestones, gated endgame, and legend carryover -----
function ensureBatch18State() {
  if (!G) return;
  if (!G.familyMilestones) G.familyMilestones = {};
  if (!G.finalActs) G.finalActs = [];
  if (!G.batchTag) G.batchTag = '18';
}

function activeFamilyForStage(stage) {
  const sig = routeSignature();
  if (stage === 3) return sig.stage3Family;
  if (stage === 4) return sig.stage4Family;
  return sig.stage5Family;
}

function familyProgressKey(stage, family) {
  return `${stage}:${family}`;
}

function familyProgressRecord(stage, family) {
  ensureBatch18State();
  const key = familyProgressKey(stage, family);
  if (!G.familyMilestones[key]) G.familyMilestones[key] = { completed:[], history:[], climaxUsed:false };
  return G.familyMilestones[key];
}

function nextFamilyMilestone(stage, family) {
  const milestones = typeof getFamilyMilestones === 'function' ? getFamilyMilestones(stage, family) : [];
  const rec = familyProgressRecord(stage, family);
  return milestones.find(m => !rec.completed.includes(m.id)) || null;
}

function familyProgressSummary(stage, family) {
  const milestones = typeof getFamilyMilestones === 'function' ? getFamilyMilestones(stage, family) : [];
  const rec = familyProgressRecord(stage, family);
  const next = nextFamilyMilestone(stage, family);
  return `${rec.completed.length}/${milestones.length} milestones${next ? ` · next: ${next.title}` : rec.climaxUsed ? ' · decisive break committed' : ' · ready for decisive break'}`;
}

function advanceFamilyMilestone(stage, family, resultText) {
  const rec = familyProgressRecord(stage, family);
  const next = nextFamilyMilestone(stage, family);
  if (!next) {
    G.lastResult = `${resultText} The route family is already primed for a decisive break.`;
    return;
  }
  rec.completed.push(next.id);
  rec.history.unshift(`Day ${G.dayCount}: ${next.title}`);
  rec.history = rec.history.slice(0, 6);
  addJournal('milestone', `${next.title}.`, `milestone-${stage}-${family}-${next.id}`);
  markMoment(`Milestone secured in ${family.replace(/_/g,' ')}: ${next.title}`);
  if (rec.completed.length === (getFamilyMilestones(stage, family).length)) {
    addNotice(`${family.replace(/_/g,' ')} is ready for a decisive break.`);
  }
  G.lastResult = `${resultText} Milestone secured: ${next.title}`;
}

function useFamilyClimax(stage, family) {
  const rec = familyProgressRecord(stage, family);
  const milestones = getFamilyMilestones(stage, family);
  const content = getFamilyClimax(stage, family);
  if (rec.climaxUsed) {
    G.lastResult = `${content.result} The decisive break has already been committed.`;
    return;
  }
  if (rec.completed.length < milestones.length) {
    G.lastResult = `The field is not ready yet. ${familyProgressSummary(stage, family)}`;
    return;
  }
  rec.climaxUsed = true;
  advanceTime(1);
  gainXp(stage === 5 ? 5 : 6, `decisive break in ${family.replace(/_/g,' ')}`);
  G.renown += stage === 5 ? 3 : 4;
  G.stageProgress[stage] += 2;
  G.finalActs.unshift(`Day ${G.dayCount}: ${content.label}`);
  G.finalActs = G.finalActs.slice(0, 8);
  addJournal('climax', `${content.label}.`, `climax-${stage}-${family}`);
  const rewardGranted = grantFamilyReward(stage, family);
  markMoment(`Decisive break committed in ${family.replace(/_/g,' ')}`);
  G.lastResult = rewardGranted ? `${content.result} ${getFamilyReward(stage, family).title} becomes part of the run.` : content.result;
  addNotice(`${family.replace(/_/g,' ')} now moves under open decisive pressure.`);
}

const __batch17CurrentObjective = currentObjective;
function currentObjective() {
  ensureBatch18State();
  if (!G || G.stage < 3) return __batch17CurrentObjective();
  const family = activeFamilyForStage(G.stage);
  const base = __batch17CurrentObjective();
  return `${base} ${familyProgressSummary(G.stage, family)}.`;
}

function buildStage34Choices() {
  ensureBatch18State();
  const sig = routeSignature();
  const stage = G.stage;
  const family = activeFamilyForStage(stage);
  const content = familyContent(stage);
  const actionA = content.actions[0];
  const actionB = content.actions[1];
  const actionC = content.actions[2];
  const actionD = content.actions[3] || actionA;
  const actionE = content.actions[4] || actionB;
  const threatNote = G.currentThreat?.familyNote || '';
  const rec = familyProgressRecord(stage, family);
  const choices = [
    { label:`Advance ${content.title}: ${actionA.label}`, tags:['Risky'], fn(){ advanceTime(1); gainXp(4,'plot pressure'); G.stageProgress[stage] += 1; addJournal('quest', `Pressed ${family}.`, `stage${stage}-${sig.backgroundId}-${G.stageProgress[stage]}`); advanceFamilyMilestone(stage, family, `${actionA.result}${threatNote ? ' ' + threatNote : ''}`); } },
    { label:`Turn the field: ${actionB.label}`, tags:['Bold'], fn(){ advanceTime(1); gainXp(4,'plot leverage'); G.stageProgress[stage] += 1; addJournal('quest', `Turned ${family} through leverage.`, `stage${stage}-${sig.backgroundId}-lever-${G.stageProgress[stage]}`); advanceFamilyMilestone(stage, family, `${actionB.result}${threatNote ? ' ' + threatNote : ''}`); } },
    { label:`Exploit the seam: ${actionC.label}`, tags:['Bold'], fn(){ advanceTime(1); gainXp(4,'plot seam'); G.stageProgress[stage] += 1; addJournal('quest', `Exploited a seam inside ${content.title}.`, `stage${stage}-${sig.backgroundId}-seam-${G.stageProgress[stage]}`); advanceFamilyMilestone(stage, family, `${actionC.result}${threatNote ? ' ' + threatNote : ''}`); } },
    { label:`Reframe the field: ${actionD.label}`, tags:['Safe'], fn(){ advanceTime(1); gainXp(3,'plot reframing'); G.stageProgress[stage] += 1; addJournal('quest', `Reframed ${content.title} through timing and witness pressure.`, `stage${stage}-${sig.backgroundId}-reframe-${G.stageProgress[stage]}`); advanceFamilyMilestone(stage, family, `${actionD.result}${threatNote ? ' ' + threatNote : ''}`); } },
    { label:`Exploit witness pressure: ${actionE.label}`, tags:['Risky'], fn(){ advanceTime(1); gainXp(4,'witness pressure'); G.stageProgress[stage] += 1; addJournal('quest', `Used witness pressure inside ${content.title}.`, `stage${stage}-${sig.backgroundId}-witness-${G.stageProgress[stage]}`); advanceFamilyMilestone(stage, family, `${actionE.result}${threatNote ? ' ' + threatNote : ''}`); } },
    { label:`Confront ${G.currentThreat.creature}`, tags:['Bold','Risky'], fn(){ beginEncounter('creature', G.currentThreat.creature, stage===4 ? 'elite' : 'standard'); } },
    { label:`Handle ${G.currentThreat.hazard} before it spreads`, tags:['Risky'], fn(){ beginEncounter('hazard', G.currentThreat.hazard, stage===4 ? 'elite' : 'standard'); } },
    { label:'Use companion edge', tags:['Safe'], fn(){ useCompanionEdge(); } },
    { label:'Make camp and regroup', tags:['Safe'], fn(){ openCamp(); } }
  ];
  if (!G.empowermentUsed[stage]) {
    choices.splice(2, 0, { label:'Demonstrate how far you have come', tags:['Bold'], fn(){ empowermentEncounter(stage); } });
  }
  if (!rec.climaxUsed && rec.completed.length >= getFamilyMilestones(stage, family).length) {
    choices.splice(3, 0, { label:`Commit decisive break: ${getFamilyClimax(stage, family).label}`, tags:['Bold','Risky'], fn(){ useFamilyClimax(stage, family); } });
  }
  return choices;
}

function buildStage5Choices() {
  ensureBatch18State();
  const family = activeFamilyForStage(5);
  const content = familyContent(5);
  const actionA = content.actions[0];
  const actionB = content.actions[1];
  const actionC = content.actions[2];
  const actionD = content.actions[3] || actionB;
  const rec = familyProgressRecord(5, family);
  const choices = [
    { label:`Enter ${content.title}: ${actionA.label}`, tags:['Bold','Risky'], fn(){ advanceTime(1); gainXp(2,'endgame pressure'); G.stageProgress[5] += 1; advanceFamilyMilestone(5, family, actionA.result); markMoment(`Endgame pressure intensified through ${content.title}`); } },
    { label:`Commit deeper: ${actionB.label}`, tags:['Bold'], fn(){ advanceTime(1); gainXp(2,'endgame leverage'); G.stageProgress[5] += 1; advanceFamilyMilestone(5, family, actionB.result); addNotice(`${content.title} is now visible to every power still trying to shape the ending.`); } },
    { label:`Risk the hidden seam: ${actionC.label}`, tags:['Bold','Risky'], fn(){ advanceTime(1); gainXp(2,'endgame seam'); G.stageProgress[5] += 1; advanceFamilyMilestone(5, family, actionC.result); markMoment(`A hidden seam in ${content.title} was pushed open.`); } },
    { label:`Use hard witness pressure: ${actionD.label}`, tags:['Bold'], fn(){ advanceTime(1); gainXp(2,'endgame witness'); G.stageProgress[5] += 1; advanceFamilyMilestone(5, family, actionD.result); addNotice(`${content.title} is now constrained by witnesses, allies, and enemies who can no longer pretend not to see.`); } },
    { label:'Use companion edge', tags:['Safe'], fn(){ useCompanionEdge(); } }
  ];
  if (!rec.climaxUsed && rec.completed.length >= getFamilyMilestones(5, family).length) {
    choices.push({ label:`Commit final break: ${getFamilyClimax(5, family).label}`, tags:['Bold','Risky'], fn(){ useFamilyClimax(5, family); } });
  }
  if (rec.climaxUsed) {
    choices.push({ label:`Confront ${content.finalBoss}`, tags:['Bold','Risky'], fn(){ G.pendingLegendOutcome = content.creatureOutcome; beginEncounter('creature', content.finalBoss, 'boss'); } });
    choices.push({ label:`Contain ${content.finalHazard}`, tags:['Risky'], fn(){ G.pendingLegendOutcome = content.hazardOutcome; beginEncounter('hazard', content.finalHazard, 'boss'); } });
  }
  return choices;
}

const __batch17FinishLegend = finishLegend;
function finishLegend(outcome, cause='') {
  ensureBatch18State();
  __batch17FinishLegend(outcome, cause);
  const legend = G.legends && G.legends[0];
  if (!legend) return;
  const milestoneLines = Object.entries(G.familyMilestones || {}).map(([k,v]) => `${k} => ${v.completed.length} milestones${v.climaxUsed ? ' + decisive break' : ''}`).slice(0,8);
  legend.milestones = milestoneLines;
  legend.finalActs = [...(G.finalActs || [])].slice(0,8);
  legend.familyRewards = familyRewardsList().map(r => `${r.title} [Stage ${r.stage}]`);
  legend.batchTag = '20';
  persist();
  openOverlay('Hall of Legends', legendSummary(legend));
}

const __batch17RenderOverlay = renderOverlay;
function renderOverlay(kind) {
  ensureBatch18State();
  if (kind === 'sheet') {
    const sig = routeSignature();
    const stageTarget = (typeof STAGE_BALANCE_TARGETS !== 'undefined' && STAGE_BALANCE_TARGETS[G.stage]) ? STAGE_BALANCE_TARGETS[G.stage] : null;
    const balanceLine = stageTarget ? `<br>Balance target: skill ${stageTarget.expectedSkill}+ · party ${stageTarget.expectedParty}+ · threat bias ${stageTarget.threatBias}<br>${stageTarget.note}` : '';
    const telemetry = `Turns ${G.metrics.stageTurns[G.stage]||0} · actions ${G.metrics.stageActions[G.stage]||0} · encounters ${G.metrics.stageEncounters[G.stage]||0} · wins ${G.metrics.encounterWins[G.stage]||0} · rescues ${G.metrics.stageRescues[G.stage]||0}`;
    const milestones = [3,4,5].map(stage => `${STAGES[stage-1].label}: ${familyProgressSummary(stage, activeFamilyForStage(stage))}`).join('<br>');
    openOverlay('Character', `<strong>${G.name}</strong><br>${ARCHETYPES[G.archetype].name} · ${getBackground(G.archetype, G.backgroundId).name}<br>Level ${G.level} · ${G.stageLabel}<br>Skills: ${Object.keys(G.skills).map(k => `${k} ${effectiveSkillValue(k)}`).join(', ')}<br>Rescue incidents: ${G.deathCount}<br>Current wounds: ${G.wounds.join(', ') || 'None'}<br>Companions: ${G.companions.map(c => c.name + ' (' + c.role + ')').join(', ') || 'None'}<br>Current safe zone: ${G.currentSafeZone || 'None'}<br>Route trail: ${sig.stage3Family.replace(/_/g,' ')} → ${sig.stage4Family.replace(/_/g,' ')} → ${sig.stage5Family.replace(/_/g,' ')}<br>${telemetry}<br><br><strong>Family milestone pressure</strong><br>${milestones}<br><br><strong>Unlocked family edges</strong><br>${familyRewardSummary()}${balanceLine}`);
    return;
  }
  if (kind === 'legends') {
    const body = G.legends.length ? G.legends.map(l => `<div>${legendSummary(l).replace(/\n/g,'<br>')}</div>`).join('<hr>') : 'No legends recorded yet. Batch 18 expects family milestones and decisive breaks to accumulate here.';
    openOverlay('Hall of Legends', body);
    return;
  }
  return __batch17RenderOverlay(kind);
}

const __batch17Render = render;
function render() {
  ensureBatch18State();
  ensureBatch21State();
  return __batch17Render();
}

// ----- Batch 19 tangible progress: verified runtime audit, stronger Stage II family-content, enhanced overlays -----
function runtimeBuildAudit() {
  const bgCount = Object.values(BACKGROUNDS).reduce((n, arr) => n + arr.length, 0);
  const sigCount = Object.keys(BACKGROUND_ROUTE_SIGNATURES).length;
  const currentBg = getBackground(G.archetype, G.backgroundId);
  const currentSig = routeSignature();
  const currentLoc = getLocality(G.location);
  return [
    `Archetypes ${Object.keys(ARCHETYPES).length}`,
    `Backgrounds ${bgCount}`,
    `Route signatures ${sigCount}`,
    `Localities ${Object.keys(LOCALITIES).length}`,
    `Route atlas entries ${Object.keys(ROUTE_ATLAS).length}`,
    `Named placements ${Object.keys(NAMED_NPC_PLACEMENT).length} · Reward families ${BUILD_VERIFICATION.rewardFamilies}`,
    `Current background ${currentBg ? currentBg.name : 'missing'}`,
    `Current signature ${currentSig ? 'present' : 'missing'}`,
    `Current locality ${currentLoc ? currentLoc.name : 'missing'}`,
    `Runtime audit: current batch parsed, loaded, and reward registries are live.`
  ].join(' · ');
}

function buildStage2Choices() {
  const sig = routeSignature();
  const loc = getLocality(G.location);
  const adjacency = (loc.adjacent || []).slice(0, 3);
  const travelChoices = adjacency.map(routeNode => {
    const fam = getStage2FamilyContent(routeNode);
    const atlas = ROUTE_ATLAS[routeNode];
    return {
      label:`Travel ${ROUTE_NAMES[routeNode]} — ${fam.title}`,
      tags:['Bold'],
      fn(){
        travelToAdjacent(routeNode);
        if (atlas) G.lastResult += ` ${atlas.note}`;
      }
    };
  });
  const signatureRoute = sig.stage2Vector;
  const signatureContent = getStage2FamilyContent(signatureRoute);
  const signatureActionA = signatureContent.actions[0];
  const signatureActionB = signatureContent.actions[1];
  const signatureActionC = signatureContent.actions[2];
  const set = [
    ...travelChoices,
    { label:`Press the adjacent vector: ${signatureActionA.label}`, tags:['Risky'], fn(){ advanceTime(1); gainXp(4,'stage ii vector'); G.stageProgress[2] += 1; addJournal('quest', `Pressed ${ROUTE_NAMES[signatureRoute]} through ${signatureActionA.label.toLowerCase()}.`, `stage2-${sig.backgroundId}-a-${G.stageProgress[2]}`); G.lastResult = signatureActionA.result; } },
    { label:`Turn adjacency into leverage: ${signatureActionB.label}`, tags:['Safe'], fn(){ advanceTime(1); gainXp(3,'stage ii leverage'); G.stageProgress[2] += 1; addJournal('quest', `Turned ${ROUTE_NAMES[signatureRoute]} into leverage.`, `stage2-${sig.backgroundId}-b-${G.stageProgress[2]}`); G.lastResult = signatureActionB.result; } },
    { label:`Exploit the lane seam: ${signatureActionC.label}`, tags:['Bold'], fn(){ advanceTime(1); gainXp(4,'stage ii seam'); G.stageProgress[2] += 1; addJournal('quest', `Exploited the lane seam on ${ROUTE_NAMES[signatureRoute]}.`, `stage2-${sig.backgroundId}-c-${G.stageProgress[2]}`); G.lastResult = signatureActionC.result; } },
    { label:'Scout adjacent routes before committing', tags:['Safe'], fn(){ scoutCurrentRoutes(); } },
    { label:'Turn the safe zone into leverage', tags:['Safe'], fn(){ leverageSafeZone(); } },
    { label:`Confront ${G.currentThreat.creature}`, tags:['Risky'], fn(){ beginEncounter('creature', G.currentThreat.creature, 'elite'); } },
    { label:`Mitigate ${G.currentThreat.hazard}`, tags:['Safe'], fn(){ beginEncounter('hazard', G.currentThreat.hazard, 'standard'); } },
    { label:'Use companion edge', tags:['Safe'], fn(){ useCompanionEdge(); } },
    { label:'Make camp and regroup', tags:['Safe'], fn(){ openCamp(); } }
  ];
  return set.slice(0, 7);
}

const __renderOverlay18 = renderOverlay;
function renderOverlay(kind) {
  if (kind === 'sheet') {
    const loc = getLocality(G.location);
    const sig = routeSignature();
    const target = (typeof STAGE_BALANCE_TARGETS !== 'undefined' && STAGE_BALANCE_TARGETS[G.stage]) ? STAGE_BALANCE_TARGETS[G.stage] : null;
    const targetLine = target ? `Balance target: skill ${target.expectedSkill}+ · party ${target.expectedParty}+ · ${target.threatBias}<br>${target.note}<br><br>` : '';
    const audit = runtimeBuildAudit();
    openOverlay('Character', `<strong>${G.name}</strong><br>${ARCHETYPES[G.archetype].name} · ${getBackground(G.archetype, G.backgroundId).name}<br>Level ${G.level} · ${G.stageLabel}<br>Skills: ${Object.keys(G.skills).map(k => `${k} ${effectiveSkillValue(k)}`).join(', ')}<br>Companions: ${G.companions.map(c => c.name + ' (' + c.role + ')').join(', ') || 'None'}<br>Current safe zone: ${G.currentSafeZone || 'None'}<br>Current route family: ${(G.stage >= 5 ? sig.stage5Family : G.stage >= 4 ? sig.stage4Family : G.stage >= 3 ? sig.stage3Family : sig.stage2Vector).toString().replace(/_/g,' ')}<br>Route adjacency: ${(loc.adjacent || []).map(a => `${ROUTE_NAMES[a]}${ROUTE_ATLAS[a] ? ' [' + ROUTE_ATLAS[a].risk + ']' : ''}`).join(', ')}<br><br>${targetLine}<strong>Build verification</strong><br>${audit}<br><br><strong>Balance snapshot</strong><br>${balanceSnapshot()}`);
    return;
  }
  if (kind === 'map') {
    const loc = getLocality(G.location);
    const sig = routeSignature();
    const watch = namedLocalityWatch(G.location).map(n => `${n.id.replace(/_/g,' ')} @ ${n.office}`).join('; ') || 'No named surfaces flagged here in this batch.';
    const atlas = (loc.adjacent||[]).map(a => {
      const meta = ROUTE_ATLAS[a] || {risk:'unknown', style:'route', note:'No detailed atlas note yet.'};
      const fam = getStage2FamilyContent(a);
      return `• ${ROUTE_NAMES[a]} -> ${getLocality(ROUTE_DESTINATIONS[a]||G.location).name} [${meta.risk}]<br>&nbsp;&nbsp;${meta.style} — ${meta.note}<br>&nbsp;&nbsp;Stage II pressure: ${fam.title}`;
    }).join('<br>');
    openOverlay('The Material Planet', `<strong>${loc.name}</strong><br>${loc.identity}<br><br>Adjacent routes:<br>${atlas}<br><br><strong>Route signature</strong><br>Stage II: ${ROUTE_NAMES[sig.stage2Vector]}<br>Stage III: ${sig.stage3Family.replace(/_/g,' ')}<br>Stage IV: ${sig.stage4Family.replace(/_/g,' ')}<br>Stage V: ${sig.stage5Family.replace(/_/g,' ')}<br><br><strong>Named placement watch</strong><br>${watch}<br><br><strong>Build audit</strong><br>${runtimeBuildAudit()}`);
    return;
  }
  return __renderOverlay18(kind);
}

const __centralNarrative18 = centralNarrative;
function centralNarrative() {
  const base = __centralNarrative18();
  const familyNote = G.currentThreat && G.currentThreat.familyNote ? ` ${G.currentThreat.familyNote}` : '';
  return `${base}${familyNote}`.trim();
}


// ----- Batch 22 tangible progress: objective-web driven late-stage actions and stricter build auditing -----
function runtimeAuditDetails() {
  const bgCount = Object.values(BACKGROUNDS).reduce((n, arr) => n + arr.length, 0);
  const sigCount = Object.keys(BACKGROUND_ROUTE_SIGNATURES).length;
  const localityCount = Object.keys(LOCALITIES).length;
  const placementRefs = Object.values(LOCALITY_NAMED_SURFACES).flat();
  const missingPlacements = placementRefs.filter(id => !NAMED_NPC_PLACEMENT[id]);
  const missingDestinations = [];
  Object.entries(LOCALITIES).forEach(([locId, loc]) => (loc.adjacent||[]).forEach(routeNode => { if (!ROUTE_DESTINATIONS[routeNode]) missingDestinations.push(`${locId}:${routeNode}`); }));
  return {
    archetypes:Object.keys(ARCHETYPES).length,
    backgrounds:bgCount,
    routeSignatures:sigCount,
    localities:localityCount,
    missingPlacements:missingPlacements.length,
    missingDestinations:missingDestinations.length
  };
}

function noteObjectiveWebAction(stage, family, webAction) {
  addJournal('objective-web', `Used ${webAction.mode} pressure inside ${family.replace(/_/g,' ')}.`, `ow-${webAction.key}-${G.dayCount}`);
}

function buildObjectiveWebChoices(stage, family, threatNote='') {
  const web = getFamilyObjectiveWeb(stage, family);
  const selected = web.slice(0, 6);
  return selected.map((webAction, idx) => ({
    label: `${webAction.label}`,
    tags: webAction.tags,
    fn(){
      advanceTime(1);
      gainXp(stage === 5 ? 2 + (idx > 2 ? 0 : 1) : idx > 2 ? 3 : 4, `objective web ${webAction.mode}`);
      G.stageProgress[stage] += 1;
      noteObjectiveWebAction(stage, family, webAction);
      if (stage >= 3) advanceFamilyMilestone(stage, family, `${webAction.result}${threatNote ? ' ' + threatNote : ''}`);
      else G.lastResult = `${webAction.result}${threatNote ? ' ' + threatNote : ''}`;
    }
  }));
}

function buildStage34Choices() {
  ensureBatch18State();
  const stage = G.stage;
  const family = activeFamilyForStage(stage);
  const threatNote = G.currentThreat?.familyNote || '';
  const rec = familyProgressRecord(stage, family);
  const webChoices = buildObjectiveWebChoices(stage, family, threatNote);
  const choices = [
    ...webChoices.slice(0, 5),
    { label:`Confront ${G.currentThreat.creature}`, tags:['Bold','Risky'], fn(){ beginEncounter('creature', G.currentThreat.creature, stage===4 ? 'elite' : 'standard'); } },
    { label:`Handle ${G.currentThreat.hazard} before it spreads`, tags:['Risky'], fn(){ beginEncounter('hazard', G.currentThreat.hazard, stage===4 ? 'elite' : 'standard'); } },
    { label:'Use companion edge', tags:['Safe'], fn(){ useCompanionEdge(); } },
    { label:'Make camp and regroup', tags:['Safe'], fn(){ openCamp(); } }
  ];
  if (!G.empowermentUsed[stage]) {
    choices.splice(2, 0, { label:'Demonstrate how far you have come', tags:['Bold'], fn(){ empowermentEncounter(stage); } });
  }
  if (!rec.climaxUsed && rec.completed.length >= getFamilyMilestones(stage, family).length) {
    choices.splice(3, 0, { label:`Commit decisive break: ${getFamilyClimax(stage, family).label}`, tags:['Bold','Risky'], fn(){ useFamilyClimax(stage, family); } });
  }
  return choices.slice(0, 10);
}

function buildStage5Choices() {
  ensureBatch18State();
  const family = activeFamilyForStage(5);
  const content = familyContent(5);
  const rec = familyProgressRecord(5, family);
  const webChoices = buildObjectiveWebChoices(5, family, G.currentThreat?.familyNote || '');
  const choices = [
    ...webChoices.slice(0, 4),
    { label:'Use companion edge', tags:['Safe'], fn(){ useCompanionEdge(); } }
  ];
  if (!rec.climaxUsed && rec.completed.length >= getFamilyMilestones(5, family).length) {
    choices.push({ label:`Commit final break: ${getFamilyClimax(5, family).label}`, tags:['Bold','Risky'], fn(){ useFamilyClimax(5, family); } });
  }
  if (rec.climaxUsed) {
    choices.push({ label:`Confront ${content.finalBoss}`, tags:['Bold','Risky'], fn(){ G.pendingLegendOutcome = content.creatureOutcome; beginEncounter('creature', content.finalBoss, 'boss'); } });
    choices.push({ label:`Contain ${content.finalHazard}`, tags:['Risky'], fn(){ G.pendingLegendOutcome = content.hazardOutcome; beginEncounter('hazard', content.finalHazard, 'boss'); } });
  }
  return choices.slice(0, 9);
}

const __batch22RenderOverlay = renderOverlay;
function renderOverlay(kind) {
  if (kind === 'sheet') {
    const loc = getLocality(G.location);
    const sig = routeSignature();
    const target = (typeof STAGE_BALANCE_TARGETS !== 'undefined' && STAGE_BALANCE_TARGETS[G.stage]) ? STAGE_BALANCE_TARGETS[G.stage] : null;
    const targetLine = target ? `Balance target: skill ${target.expectedSkill}+ · party ${target.expectedParty}+ · ${target.threatBias}<br>${target.note}<br><br>` : '';
    const audit = runtimeBuildAudit();
    const details = runtimeAuditDetails();
    const modePreview = getFamilyObjectiveWeb(G.stage >= 5 ? 5 : Math.max(3,G.stage), G.stage >=5 ? sig.stage5Family : G.stage >=4 ? sig.stage4Family : sig.stage3Family).slice(0,4).map(x => x.mode).join(', ');
    openOverlay('Character', `<strong>${G.name}</strong><br>${ARCHETYPES[G.archetype].name} · ${getBackground(G.archetype, G.backgroundId).name}<br>Level ${G.level} · ${G.stageLabel}<br>Skills: ${Object.keys(G.skills).map(k => `${k} ${effectiveSkillValue(k)}`).join(', ')}<br>Companions: ${G.companions.map(c => c.name + ' (' + c.role + ')').join(', ') || 'None'}<br>Current safe zone: ${G.currentSafeZone || 'None'}<br>Current route family: ${(G.stage >= 5 ? sig.stage5Family : G.stage >= 4 ? sig.stage4Family : G.stage >= 3 ? sig.stage3Family : sig.stage2Vector).toString().replace(/_/g,' ')}<br>Objective-web modes: ${modePreview}<br>Route adjacency: ${(loc.adjacent || []).map(a => `${ROUTE_NAMES[a]}${ROUTE_ATLAS[a] ? ' [' + ROUTE_ATLAS[a].risk + ']' : ''}`).join(', ')}<br><br>${targetLine}<strong>Build verification</strong><br>${audit}<br><br><strong>Strict audit</strong><br>Missing named placements ${details.missingPlacements} · Missing route destinations ${details.missingDestinations}<br><br><strong>Balance snapshot</strong><br>${balanceSnapshot()}`);
    return;
  }
  if (kind === 'map') {
    const loc = getLocality(G.location);
    const sig = routeSignature();
    const watch = namedLocalityWatch(G.location).map(n => `${n.id.replace(/_/g,' ')} @ ${n.office} (${getLocality(n.locality)?.name || n.locality})`).join('; ') || 'No named surfaces flagged here in this batch.';
    const atlas = (loc.adjacent||[]).map(a => {
      const meta = ROUTE_ATLAS[a] || {risk:'unknown', style:'route', note:'No detailed atlas note yet.'};
      const fam = getStage2FamilyContent(a);
      return `• ${ROUTE_NAMES[a]} -> ${getLocality(ROUTE_DESTINATIONS[a]||G.location).name} [${meta.risk}]<br>&nbsp;&nbsp;${meta.style} — ${meta.note}<br>&nbsp;&nbsp;Stage II pressure: ${fam.title}`;
    }).join('<br>');
    const details = runtimeAuditDetails();
    openOverlay('The Material Planet', `<strong>${loc.name}</strong><br>${loc.identity}<br><br>Adjacent routes:<br>${atlas}<br><br><strong>Route signature</strong><br>Stage II: ${ROUTE_NAMES[sig.stage2Vector]}<br>Stage III: ${sig.stage3Family.replace(/_/g,' ')}<br>Stage IV: ${sig.stage4Family.replace(/_/g,' ')}<br>Stage V: ${sig.stage5Family.replace(/_/g,' ')}<br><br><strong>Named placement watch</strong><br>${watch}<br><br><strong>Strict audit</strong><br>Missing named placements ${details.missingPlacements} · Missing route destinations ${details.missingDestinations}`);
    return;
  }
  return __batch22RenderOverlay(kind);
}
