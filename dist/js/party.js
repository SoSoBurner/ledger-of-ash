function recruitFlow(comp) {
  const key = `companion-${comp.id}`;
  G.recruitableSeen[comp.id] = true;
  if (G.companions.some(c => c.id === comp.id)) { G.lastResult = `${comp.name} is already traveling close enough to read the room before you do.`; return; }
  G.companions.push({ id:comp.id, name:comp.name, role:comp.role, trust:1, available:true, injured:false, joinedDay:G.dayCount, bondMoments:0, favors:0 });
  addJournal('companion', `${comp.name} joined as ${comp.role}.`, key);
  gainXp(1, 'companion gained');
  G.lastResult = `${comp.name} agrees to stay close. The route stops feeling solitary in a practical, immediate way.`;
}
function useCompanionEdge() {
  if (!G.companions.length) { G.lastResult = 'No companion stands close enough to change this moment.'; return; }
  const c = G.companions[0]; c.trust += 1;
  const role = c.role.toLowerCase();
  c.bondMoments += 1;
  if (role.includes('scout') || role.includes('runner')) G.skills.survival += 1;
  else if (role.includes('archiv') || role.includes('copy') || role.includes('analyst')) G.skills.lore += 1;
  else if (role.includes('broker') || role.includes('courier')) G.skills.persuasion += 1;
  else G.skills.combat += 1;
  gainXp(2, 'companion advice');
  G.lastResult = `${c.name} cuts through the noise with advice shaped by the same pressure now closing around you. The party no longer feels ornamental; it changes what the next choice can become.`;
}
function campBody() {
  const companions = G.companions.length ? G.companions.map(c => `• ${c.name} — ${c.role} — trust ${c.trust}${c.injured ? ' — injured' : ''} — bond ${c.bondMoments||0}`).join('\n') : 'No companions yet.';
  return `The fire is low and the route still works its will outside the immediate light.\n\nCompanions:\n${companions}\n\nRest restores some strength. Companion talk deepens trust. Preparation steadies the next push but does not halt world motion.\n\nCurrent safe zone: ${G.currentSafeZone || 'none marked'}\nRoute pressure: ${G.currentThreat ? G.currentThreat.hazard + ' / ' + G.currentThreat.creature : 'unclear'}`;
}
function openCamp() {
  openOverlay('Make Camp', campBody());
  advanceTime(1);
  G.hp = Math.min(G.maxHp, G.hp + 4 + G.companions.length);
  G.fatigue = Math.max(0, G.fatigue - 1);
  G.lastResult = 'Camp restores enough strength to keep the run moving, but the world does not pause while you breathe. Companion bonds become easier to read here than on the open route.';
}
