
(function(){
  const SAVE_KEY = 'loa_upgrade_batch27';
  const XP_PER_LEVEL = [0,0,3,7,12,18,25,33,42,52,63,75,88,102,117,133,150,168,187,207,228];
  let G = null;

  const $ = id=>document.getElementById(id);
  const pick=(arr,n)=>arr&&arr.length?arr[n%arr.length]:'';
  const rand=n=>Math.floor(Math.random()*n);
  const currentStage=l=>(window.STAGES||[]).find(s=>l>=s.levelMin&&l<=s.levelMax)||(window.STAGES||[])[0];
  const getArchetype=id=>(window.ARCHETYPES||[]).find(a=>a.id===id);
  const getBackground=(arch,bgId)=>((window.BACKGROUNDS||{})[arch]||[]).find(b=>b.id===bgId);
  const getLocality=id=>(window.KEY_LOCALITIES||{})[id];
  const routeSignature=()=>window.BACKGROUND_ROUTE_SIGNATURES[G.backgroundId];
  const routeAtlasFor=sig=>(window.ROUTE_ATLAS||{})[sig.stage2Vector]||{style:'unclassified route',risk:'unknown',note:'The road has not yet been stabilized in the atlas.'};
  const destinationStage2Content=dest=>(window.STAGE2_DESTINATION_CONTENT||{})[dest]||[];
  const familyTitleForStage2=sig=>((window.FAMILY_OBJECTIVES||{})[sig.stage2Family]||{}).title||'Adjacent Pressure';
  const storage=()=>{ try{return JSON.parse(localStorage.getItem(SAVE_KEY)||'{}');}catch{return{};} };
  const persist=()=>{ const all=storage(); all[G.passcode]=G; localStorage.setItem(SAVE_KEY, JSON.stringify(all)); };

  // ── NAT 1 / NAT 20 FLAVOR ────────────────────────────────
  const NAT_ONES = {
    combat:[
      'Your battle cry comes out as a question. An Iron Accord enforcer stops to correct your pronunciation. You take 2 damage from the humiliation.',
      'You swing with full conviction and connect with a decorative post that was not the threat. The post does not retaliate. Your target watches with professional concern.',
      'You announce your attack. Out loud. With full detail. A Roadwarden nearby starts writing something down.',
      'You trip on your own footwork and perform an unplanned barrel roll into the open. Your opponent pauses to make sure you are all right before continuing.'
    ],
    stealth:[
      'You sneeze. Once. The entire space reorganizes around that sound. A Shadowhands operative across the room shakes their head slowly and leaves.',
      'You pick the lock with textbook form. It is the wrong door. The correct door was unlocked. Everyone in the adjacent room now has questions.',
      'You step on what you assessed as a loose stone. It is a bell. Specifically, the bell used to signal shift change at the adjacent Roadwarden post.',
      'You conceal yourself behind a curtain. The curtain is entirely decorative lace. Three people see you. Two of them pretend not to. One draws a sketch.'
    ],
    lore:[
      'You cite the relevant treaty with confidence. You cite the wrong year, the wrong signatory, and the wrong polity to a House Mimolot archivist who has the original. They publish a correction. It names you.',
      'You invoke a ward formula that is technically accurate but three centuries obsolete. The local wards respond with mild institutional disgust and nothing else.',
      'You translate the inscription as "passage authorized." It says "condemned structure." The door was fine. You did not need to know this. You know it now.',
      'You recite the wrong precedent in what turns out to be an active Panim Haven mediation proceeding. The registrar writes it down without comment. You are now part of the record.'
    ],
    persuasion:[
      'You mispronounce the Lady Isabella Shelk family name in front of four household staff. They are professionally silent. The silence has texture.',
      'You perform the formal Panim Haven greeting but execute the mourning variant. The room assumes someone died. Condolences begin.',
      'You convince exactly the wrong person. They are enthusiastic. They are currently telling everyone. There is no stopping this.',
      'Your argument is so thorough and so logically airtight that you convince yourself. You now agree with the people you came to oppose. They are delighted.'
    ],
    survival:[
      'You read the route charts with full confidence and begin moving. You are heading directly toward the specific thing the charts were warning about.',
      'You forage what you are certain is edible. A Soreheim frontier botanist nearby clears her throat. You forage something else and do not make eye contact.',
      'You set camp in the safest-looking clearing. It is an Iron Accord enforcement staging area. They return before dawn. They have forms.',
      'Your fire is so expertly concealed that you cannot locate it yourself. It locates other things instead.'
    ],
    craft:[
      'The device assembles correctly. It assembles backwards. It functions perfectly backwards. You choose not to explain this to anyone.',
      'You fix the mechanism. The mechanism, now attentive to the relationship, immediately breaks a secondary component you had not previously noticed.',
      'Your field repair is structurally sound and visually wrong in a way that a passing Guildheart Hub artificer stops to stare at before walking away without speaking.',
      'You apply the solvent to the seal. The solvent works immediately. The seal was not the problem. What the seal was containing was the problem. It is now your problem.'
    ]
  };

  const NAT_TWENTIES = {
    combat:[
      'The strike lands so precisely that your opponent questions their training before the ground does. Three nearby observers immediately request your instruction rates.',
      'You disarm them, catch the weapon, and hand it back as a professional courtesy. They flee out of pure existential confusion.',
      'Your attack form is textbook Iron Accord doctrine, executed better than the Iron Accord executes it. They are professionally offended and professionally defeated.',
      'The blow breaks not just their guard but their entire positional assumption. The fight is over before it becomes a fight.'
    ],
    stealth:[
      'You move through the space so cleanly that a witness will later testify you were never present. They will be correct in every legal sense.',
      'Three separate sentries pass within a foot of your position. One stops, looks directly at the space you occupy, decides their route schedule must be wrong, and moves on.',
      'You learn everything you came for and overhear a second conversation you had no plan to intercept, which answers a question you had not yet thought to ask.',
      'A Shadowhands operative who was working the same space nods once as they depart. It is a professional acknowledgment. You have earned it.'
    ],
    lore:[
      'You locate the exact administrative subsection of a House Mimolot ruling that makes what you need technically sanctioned. The opposition recognizes the citation. They stand down.',
      'The detail you produce is accurate, legally binding, and older than the institution currently opposing you. They knew this. They hoped you did not.',
      'Your analysis identifies not just what happened but the three separate institutional decisions that allowed it. The fourth decision-maker is standing in the room.',
      'The archivist asks to keep a copy of your analysis. You give them the draft. You keep the version with your actual conclusions.'
    ],
    persuasion:[
      'They do not just agree. They apologize. Then they provide documentation you did not know existed.',
      'The contact gives you the information and quietly identifies a second source they had been protecting until this exact conversation.',
      'Your framing is precise enough that the opposing party thanks you for clarifying their position, which is now your position. They seem genuinely relieved.',
      'Word moves before you do. By the time you reach the exit, two additional people are waiting to speak with you. They have already heard. They want in.'
    ],
    survival:[
      'You read the terrain and extrapolate six weeks of recent movement from it. Someone has been using this route on a schedule. You now know the schedule.',
      'The shortcut you identify cuts two days off the route and passes through an unscouted safe zone that has water, cover, and no current occupants.',
      'Your camp setup is so professionally executed that a Soreheim frontier patrol stops to ask who did the perimeter work. You tell them. They write it down.',
      'You find water, overhead cover, and one item left behind by someone who departed in a hurry. The item is useful in a way they did not intend when they dropped it.'
    ],
    craft:[
      'The fix holds. The fix also corrects a secondary failure you had not identified. It will hold for years without further attention.',
      'Your field modification is immediately recognized by a passing Guildheart Hub engineer as a structural improvement over the original design. They ask for the schematic.',
      'The device works better than specified. You do not fully understand why. It does not matter. It works and will continue to work.',
      'You seal it, reinforce it, and engineer a failure margin that accounts for three subsequent people making worse decisions. They will and it will hold anyway.'
    ]
  };

  function critFlavor(skill, isCrit, seed){
    const table = isCrit ? NAT_TWENTIES : NAT_ONES;
    const bucket = table[skill] || table['lore'];
    return bucket[seed % bucket.length];
  }

  function rollD20(skill, bonuses){
    const die = 1 + rand(20);
    const total = die + bonuses;
    const isCrit = die === 20;
    const isFumble = die === 1;
    const seed = (G.dayCount + G.timeIndex + G.worldClocks.pressure) % 4;
    return { die, total, isCrit, isFumble, flavor: (isCrit||isFumble) ? critFlavor(skill, isCrit, seed) : null };
  }

  function defaultState(){
    const defaultBgId = 'warrior_civic';
    const startingLocation = (window.getStartingLocality && window.getStartingLocality(defaultBgId)) || 'shelkopolis';
    return {
      name:'', passcode:'', archetype:'warrior', backgroundId:defaultBgId, level:1, xp:0, renown:0,
      hp:22, maxHp:22, gold:20, stage:1, stageLabel:STAGES[0].label, currentObjective:'', dayCount:1, timeIndex:0,
      age:'24', presentation:'Male', lineage:'Human', lifeOverview:'',
      location:startingLocation, currentSafeZone:'Roadwarden Annex Ward', routeHistory:[], safeZoneHistory:[],
      journalRecords:[], notices:[], legends:[], quests:[], factions:{}, morality:0, order:0,
      skills:{combat:2,survival:1,persuasion:1,lore:1,stealth:1,craft:1}, companions:[], recruitableSeen:{},
      wounds:[], fatigue:0, deathCount:0, stage5Dead:false, rescueLog:[], trainingDisadvantage:0,
      worldClocks:{pressure:0,rival:0,omens:0}, stageProgress:{1:0,2:0,3:0,4:0,5:0},
      routeScoutLog:[], keyMoments:[], currentThreat:null, encounter:null, lastResult:'Your ledger waits for its first truth.',
      buildAudit: window.BUILD_VERIFICATION, familyMilestones:{stage3:0,stage4:0,stage5:0}, familyEdges:[], finalBreak:false,
      telemetry:{turns:0,actions:0,travels:0,scouts:0,encounters:0,wins:0,rescues:0,services:0},
      inventory:[], equipment:{}, serviceLog:[], signals:{}, settlementSecrets:{}, stage2DestinationsSeen:{},
      alignment:{goodEvil:0,lawfulChaotic:0},
      reputation:{byLocality:{},byFaction:{}},
      toneState:{heroism:0,dread:0,order:0,volatility:0},
      legalityState:{civicHeat:0,warrants:[],knownCrimes:[],sanctionedActions:[]},
      confrontationHistory:{directCombats:0,avoidedConflicts:0,stealthKills:0,captures:0,executions:0,stabilizations:0,ritualResolutions:0,escortsCompleted:0},
      woundData:{minor:[],major:[],traumaTags:[]},
      combatSession:null,
      postCombatResolution:null,
      recentOutcomeType:null,
      uiState:{activeLayer:'story'},
      codex:{npcs:{},localities:{},creatures:{},hazards:{},institutions:{}}
    };
  }

  function addJournal(category,text,dedupeKey){ if(dedupeKey && G.journalRecords.some(r=>r.dedupeKey===dedupeKey)) return; G.journalRecords.unshift({day:G.dayCount,locality:G.location,category,text,dedupeKey}); G.journalRecords=G.journalRecords.slice(0,120); }
  function addNotice(text){ G.notices.unshift(`Day ${G.dayCount}: ${text}`); G.notices=G.notices.slice(0,50); }
  function addQuest(id,title,status='Active'){ const q=G.quests.find(q=>q.id===id); if(q){ q.status=status; return; } G.quests.push({id,title,status}); }
  function markMoment(text){ G.keyMoments.unshift(`Day ${G.dayCount}: ${text}`); G.keyMoments=G.keyMoments.slice(0,25); }
  function advanceTime(t=1){ for(let i=0;i<t;i++){ G.timeIndex=(G.timeIndex+1)%5; if(G.timeIndex===0) G.dayCount+=1; G.worldClocks.pressure++; if(G.stage>=2) G.worldClocks.rival++; if(G.stage>=4) G.worldClocks.omens++; if(G.trainingDisadvantage>0) G.trainingDisadvantage--; if(window.buildCompanionTrust) window.buildCompanionTrust(G,1); } }
  function gainXp(n,why=''){ G.xp+=n; while(G.level<20 && G.xp>=XP_PER_LEVEL[G.level+1]){ G.level++; G.maxHp += G.stage>=4?4:3; G.hp=Math.min(G.maxHp,G.hp+4); G.renown+=2; addNotice(`Level ${G.level} reached${why?` — ${why}`:''}.`);} updateStage(); }
  function updateStage(){ const st=currentStage(G.level); G.stage=st.id; G.stageLabel=st.label; }
  function chooseThreat(){ const loc=getLocality(G.location); return {hazard:pick(loc.hazards,G.dayCount+G.stage+G.worldClocks.pressure), creature:pick(loc.creatures,G.dayCount+G.stage+G.worldClocks.rival)}; }
  function setThreat(){ G.currentThreat = chooseThreat(); }
  function currentNamedPlacements(location){ return (window.NPC_PLACEMENTS||{})[location] || []; }
  function buildAuditText(){ const b=window.BUILD_VERIFICATION||{}; return `${b.archetypeCount} archetypes · ${b.backgroundCount} backgrounds · ${b.routeSignatureCount} routes · ${b.localityProjectionCount} localities`; }
  function gearBonus(key){ let bonus=0; Object.values(G.equipment||{}).forEach(item=>{ if(item && item.bonus && item.bonus[key]) bonus += item.bonus[key]; }); return bonus; }
  function currentEdgeBonus(action){ return (G.familyEdges||[]).reduce((sum,e)=>sum + (e.action===action?e.bonus:0), 0); }
  function familyEdgesText(){ return (G.familyEdges||[]).map(e=>`${e.label} (+${e.bonus} ${e.action})`).join(' · ') || 'None'; }
  function updateSignals(){
    const group = getArchetype(G.archetype).group;
    if(group==='combat') G.signals={primary:`Stance ${2+gearBonus('brace')}`,secondary:`Guard ${1+gearBonus('guard')}`,tertiary:`Armor ${Object.keys(G.equipment).length}`};
    else if(group==='magic') G.signals={primary:`Arcana ${G.skills.lore+gearBonus('arcana')}`,secondary:`Ward ${1+gearBonus('ward')}`,tertiary:`Reagents ${G.inventory.filter(i=>/reagent|chalk|focus/i.test(i.name)).length}`};
    else if(group==='stealth') G.signals={primary:`Concealment ${G.skills.stealth+gearBonus('concealment')}`,secondary:`Suspicion ${Math.max(0,G.worldClocks.rival-1)}`,tertiary:`Tools ${G.inventory.filter(i=>/tool|wrap|vial/i.test(i.name)).length}`};
    else G.signals={primary:`Kits ${1+gearBonus('kits')}`,secondary:`Resolve ${1+G.companions.length}`,tertiary:`Coordination ${gearBonus('coordination')}`};
  }
  function maybeUnlockFamilyEdge(stage){ const sig=routeSignature(); const fam=sig[`stage${stage}Family`]; const reward=(window.FAMILY_EDGE_REWARDS||{})[fam] && window.FAMILY_EDGE_REWARDS[fam][`stage${stage}`]; if(!reward)return; const key=`${fam}-stage${stage}`; G.familyEdges=G.familyEdges||[]; if(G.familyEdges.some(e=>e.key===key)) return; G.familyEdges.push({key,family:fam,stage,...reward}); addNotice(`Family edge unlocked: ${reward.label}.`); markMoment(`Unlocked ${reward.label}`); }
  function stage1Objective(){ const bg=getBackground(G.archetype,G.backgroundId); return bg?bg.firstObjective:'Read the locality and find the hidden hand.'; }
  function stage2Objective(){ const sig=routeSignature(); const atlas=routeAtlasFor(sig); const adj=(window.ADJACENCY[G.location]||[]).map(id=>getLocality(id)?.name).filter(Boolean); return `Push beyond ${getLocality(sig.originLocality).name} along ${window.ROUTE_NAMES[sig.stage2Vector]} (${atlas.style}) into ${adj.slice(0,2).join(' and ')||'adjacent ground'} and decide who controls the widening pressure of ${familyTitleForStage2(sig)}.`; }
  function stage3Objective(){ const fam=window.FAMILY_OBJECTIVES[routeSignature().stage3Family]; return `${fam.stage3} Milestones: ${G.familyMilestones.stage3}/3.`; }
  function stage4Objective(){ const fam=window.FAMILY_OBJECTIVES[routeSignature().stage4Family]; return `${fam.stage4} Milestones: ${G.familyMilestones.stage4}/3.`; }
  function stage5Objective(){ const fam=window.FAMILY_OBJECTIVES[routeSignature().stage5Family]; return G.finalBreak?`Final break committed in ${fam.title}. Face the endgame.`:`${fam.stage5} Milestones: ${G.familyMilestones.stage5}/4.`; }
  function setObjective(){ G.currentObjective = G.stage===1?stage1Objective():G.stage===2?stage2Objective():G.stage===3?stage3Objective():G.stage===4?stage4Objective():stage5Objective(); }
  function applySuccess(stage, mode, skill, xp, text){ G.stageProgress[stage]+=1; gainXp(xp, `${mode} pressure`); if(stage>=3){ G.familyMilestones[`stage${stage}`]=(G.familyMilestones[`stage${stage}`]||0)+1; if(G.familyMilestones[`stage${stage}`]===2) maybeUnlockFamilyEdge(stage); } G.lastResult=text; if(stage===5 && G.familyMilestones.stage5>=4 && !G.finalBreak){ G.finalBreak=true; maybeUnlockFamilyEdge(5); addNotice('A final break becomes possible.'); } }
  function objectiveWebChoices(stage){ const verbs=[['Question a person at the center of the pressure','person','persuasion'],['Search the place where the pressure shows physically','place','lore'],['Pull records and compare what should not align','records','lore'],['Work the quiet edge and move unseen','stealth','stealth'],['Force an opening in the line','force','combat'],['Use ritual or procedure to open a blocked answer','ritual','craft'],['Trace the route itself for what it carries','route','survival']]; return verbs.map(([label,mode,skill],i)=>({label,tags:['Objective',mode],fn(){ advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; const comp=window.companionBonus?companionBonus(G,skill):0; const bonuses=(G.skills[skill]||0)+comp+Math.floor(G.level/3)+currentEdgeBonus(mode); const r=rollD20(skill,bonuses); const target=10+stage*2+i%2; const success=r.isCrit||(r.total>=target&&!r.isFumble); G.lastRoll={action:label,skill,total:r.total,target,success,die:r.die,crit:r.isCrit,fumble:r.isFumble}; addJournal('field-note',`${label} in ${getLocality(G.location).name}.`,`${G.backgroundId}-${stage}-${mode}-${G.dayCount}`); if(r.isCrit){ applySuccess(stage,mode,skill,stage*2,r.flavor); addNotice(`Critical success — ${label.toLowerCase()}.`); markMoment(`Critical: ${label}`); } else if(r.isFumble){ G.lastResult=r.flavor; G.worldClocks.rival+=2; G.hp=Math.max(1,G.hp-1); addNotice(`Critical fumble — ${label.toLowerCase()}.`); startThreatEncounter('standard'); } else if(success){ applySuccess(stage,mode,skill,stage,`${label} pays off. The route opens a little wider, and the shape of the pressure becomes harder to hide.`); } else { G.lastResult=`${label} fails to settle the matter. The opposition keeps the initiative.`; G.worldClocks.rival+=1; if(rand(3)===0) startThreatEncounter('standard'); } maybeStageAdvance(); }})); }
  function classIdentityChoice(){ const a=getArchetype(G.archetype); const group=a.group; if(group==='combat') return {label:'Set a hard stance and test the line physically',tags:['Class','Combat'],fn(){ advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; G.skills.combat+=1; gainXp(2,'martial posture'); G.recentOutcomeType='class_combat'; G.lastResult='Weight, footing, and guard tell more truth than anyone intended to show.'; maybeStageAdvance(); }}; if(group==='magic') return {label:'Read residue, wards, and unstable traces',tags:['Class','Magic'],fn(){ advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; G.skills.lore+=1; gainXp(2,'arcane read'); G.recentOutcomeType='class_magic'; G.lastResult='Charged residue and ward strain make the hidden pattern easier to follow.'; maybeStageAdvance(); }}; if(group==='stealth') return {label:'Work the unnoticed angle and read who is watching whom',tags:['Class','Stealth'],fn(){ advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; G.skills.stealth+=1; gainXp(2,'concealment read'); G.recentOutcomeType='class_stealth'; G.lastResult='Sightlines and timing windows expose the pressure without a public clash.'; maybeStageAdvance(); }}; return {label:'Stabilize the weak point before it breaks wider',tags:['Class','Support'],fn(){ advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; G.skills.craft+=1; gainXp(2,'support discipline'); G.recentOutcomeType='class_support'; G.lastResult='Useful hands, clean tools, and practical discipline turn panic into leverage.'; maybeStageAdvance(); }}; }

  function stage2ClassIdentityChoice(){
    const a=getArchetype(G.archetype); const sig=routeSignature();
    if(a.group==='combat') return {label:'Take the lead physically on the widening route',tags:['Class','Adjacent','Combat'],fn(){ advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; G.skills.combat+=1; gainXp(2,'route command'); G.recentOutcomeType='class_combat'; G.lastResult=`The widening route starts answering to visible force, disciplined posture, and the threat of immediate correction.`; G.routeScoutLog.unshift(`${G.location} / ${window.ROUTE_NAMES[sig.stage2Vector]} / martial command`); G.routeScoutLog=G.routeScoutLog.slice(0,20); maybeStageAdvance(); }};
    if(a.group==='magic') return {label:'Read wards, residue, and pressure seams on the widening route',tags:['Class','Adjacent','Magic'],fn(){ advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; G.skills.lore+=1; gainXp(2,'arcane widening'); G.recentOutcomeType='class_magic'; G.lastResult=`The adjacent pressure gives up its magical seams once the route is read as a structure instead of a story.`; G.routeScoutLog.unshift(`${G.location} / ${window.ROUTE_NAMES[sig.stage2Vector]} / ward reading`); G.routeScoutLog=G.routeScoutLog.slice(0,20); maybeStageAdvance(); }};
    if(a.group==='stealth') return {label:'Work the widening edge through timing, concealment, and quiet access',tags:['Class','Adjacent','Stealth'],fn(){ advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; G.skills.stealth+=1; gainXp(2,'covert widening'); G.recentOutcomeType='class_stealth'; G.lastResult=`The adjacent route opens by way of blind corners, bad habits, and people who think nobody is counting them.`; G.routeScoutLog.unshift(`${G.location} / ${window.ROUTE_NAMES[sig.stage2Vector]} / covert edge`); G.routeScoutLog=G.routeScoutLog.slice(0,20); maybeStageAdvance(); }};
    return {label:'Stabilize the widening line before it becomes a regional problem',tags:['Class','Adjacent','Support'],fn(){ advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; G.skills.craft+=1; gainXp(2,'support widening'); G.recentOutcomeType='class_support'; G.lastResult=`The widening pressure becomes manageable once tools, kits, and disciplined help hit the right weak point.`; G.routeScoutLog.unshift(`${G.location} / ${window.ROUTE_NAMES[sig.stage2Vector]} / support triage`); G.routeScoutLog=G.routeScoutLog.slice(0,20); maybeStageAdvance(); }};
  }

  // ── ALIGNMENT & LEGALITY ─────────────────────────────────
  function applyAlignmentShift(moral, civic){
    if(!G.alignment) G.alignment={goodEvil:0,lawfulChaotic:0};
    G.alignment.goodEvil=Math.max(-10,Math.min(10,(G.alignment.goodEvil||0)+moral));
    G.alignment.lawfulChaotic=Math.max(-10,Math.min(10,(G.alignment.lawfulChaotic||0)+civic));
  }
  function applyLegalityShift(delta){
    if(!G.legalityState) G.legalityState={civicHeat:0,warrants:[],knownCrimes:[],sanctionedActions:[]};
    G.legalityState.civicHeat=Math.max(0,(G.legalityState.civicHeat||0)+delta);
    if(G.legalityState.civicHeat>=8 && !G.legalityState.warrants.includes('active_warrant')){ G.legalityState.warrants.push('active_warrant'); addNotice('An active warrant has been issued for your character.'); }
  }
  function recordConfrontation(type){
    if(!G.confrontationHistory) G.confrontationHistory={directCombats:0,avoidedConflicts:0,stealthKills:0,captures:0,executions:0,stabilizations:0,ritualResolutions:0,escortsCompleted:0};
    if(typeof G.confrontationHistory[type]==='number') G.confrontationHistory[type]++;
  }

  // ── CHOICE NORMALIZATION & RISK ──────────────────────────
  function normalizeChoiceProfile(choice){
    const tags=choice.tags||[];
    const skill=choice.skill||(tags.includes('Combat')||tags.includes('Direct')?'combat':tags.includes('Stealth')||tags.includes('Scout')?'stealth':tags.includes('Lore')||tags.includes('Read')?'lore':tags.includes('Craft')||tags.includes('Prep')?'craft':tags.includes('Persuasion')||tags.includes('Service')?'persuasion':'survival');
    const mode=choice.mode||tags[1]||'general';
    return {
      label:choice.label,
      axis:{
        moral:tags.includes('Good')?1:tags.includes('Evil')?-1:0,
        civic:tags.includes('Lawful')?1:tags.includes('Chaotic')?-1:0,
        risk:tags.includes('Risky')?2:tags.includes('Bold')?1:tags.includes('Safe')?-1:0,
        mode
      },
      skill,
      baseDC:10+(G.stage||1)*2,
      combatRouting:(tags.includes('Combat')&&tags.includes('Direct'))||tags.includes('Boss'),
      violence:tags.includes('Combat')||tags.includes('Direct')||tags.includes('Boss'),
      legality:tags.includes('Boss')?'illegal':tags.includes('Chaotic')||tags.includes('Evil')?'questionable':'neutral'
    };
  }
  function computeDynamicRisk(cp){
    const playerSkill=G.skills[cp.skill]||0;
    const compBonus=window.companionBonus?companionBonus(G,cp.skill):0;
    const gearB=gearBonus(cp.skill);
    const edgeB=currentEdgeBonus(cp.axis.mode);
    const effectiveSkill=playerSkill+compBonus+gearB+edgeB;
    const adjustedDC=cp.baseDC-10-Math.floor(G.level/3);
    const delta=effectiveSkill-adjustedDC;
    return {delta,effectiveSkill,tag:delta>=4?'Safe':delta>=1?'Bold':'Risky'};
  }
  function computeDynamicRiskTag(cp){ return computeDynamicRisk(cp).tag; }

  // ── SCENE STATE ─────────────────────────────────────────
  function computeSceneState(){
    const arch=getArchetype(G.archetype)||{group:'combat'};
    const loc=getLocality(G.location)||{name:'Unknown',summary:'',pressures:[],greetings:[],rituals:[]};
    let sig={}, atlas={};
    try{ sig=routeSignature()||{}; atlas=routeAtlasFor(sig)||{}; }catch(e){}
    // Pull Stage I background content for narration
    const bgKey=(G.backgroundId||'').replace(`${G.archetype}_`,'');
    const stage1BgEntry=((window.STAGE1_BACKGROUND_CONTENT||{})[G.archetype]||{})[bgKey]||null;
    return {
      locality:loc,
      archetypeGroup:arch.group,
      archetype:G.archetype,
      backgroundId:G.backgroundId,
      stage1BgEntry,
      activePressure:pick(loc.pressures,G.worldClocks.pressure),
      activeThreat:G.currentThreat,
      namedPlacements:currentNamedPlacements(G.location),
      routeHint:window.ROUTE_NAMES&&sig.stage2Vector?window.ROUTE_NAMES[sig.stage2Vector]:'',
      routeStyle:atlas.style||'',
      routeRisk:atlas.risk||'',
      stage:G.stage,
      stageProgress:G.stageProgress[G.stage]||0,
      dayCount:G.dayCount,
      timeIndex:G.timeIndex,
      serviceLog:G.serviceLog,
      civicHeat:(G.legalityState||{}).civicHeat||0,
      alignment:G.alignment||{goodEvil:0,lawfulChaotic:0},
      confrontationHistory:G.confrontationHistory||{},
      recentOutcomeType:G.recentOutcomeType,
      lastResult:G.lastResult,
      lastChoiceLabel:G.lastChoiceLabel||'',
      companionCount:(G.companions||[]).filter(c=>!c.injured&&c.available!==false).length,
      wounds:G.wounds||[],
      inCombat:!!G.combatSession,
      inPostCombat:!!G.postCombatResolution,
      combatEnemy:G.combatSession?G.combatSession.enemyName:null,
      worldClocks:G.worldClocks||{pressure:0,rival:0,omens:0}
    };
  }

  // ── COMBAT BRIDGE ───────────────────────────────────────
  function mapThreatToEnemyTemplate(threat){
    if(!threat) return 'hostile_debtor';
    const c=(threat.creature||'').toLowerCase();
    const h=(threat.hazard||'').toLowerCase();
    if(c.includes('guard')||h.includes('patrol')) return 'patrol_guard';
    if(c.includes('enforcer')||h.includes('accord')) return 'iron_accord_enforcer';
    if(c.includes('security')||h.includes('security')) return 'private_security';
    if(c.includes('operative')||c.includes('guild')) return 'red_hood_operative';
    if(c.includes('militia')||c.includes('frontier')) return 'frontier_militia';
    if(c.includes('shadow')||c.includes('watcher')) return 'shadowhands_watcher';
    return 'hostile_debtor';
  }

  function startCombatSessionFromEngine(threat, tier){
    const templateKey=mapThreatToEnemyTemplate(threat);
    const template=(window.ENEMY_TEMPLATES||{})[templateKey]||{name:'Unknown Threat',hp:12,maxHp:12,attack:4,defense:5,morale:8,desc:'A threat emerges.',loot:{gold:3,item:null}};
    const tierMod=tier==='elite'?4:tier==='boss'?8:0;
    const arch=getArchetype(G.archetype)||{group:'combat'};
    G.combatSession={
      templateKey,
      enemyName:template.name,
      enemyHp:template.hp+tierMod,
      enemyMaxHp:template.hp+tierMod,
      enemyAttack:template.attack,
      enemyDefense:template.defense,
      enemyMorale:template.morale,
      tier:tier||'standard',
      round:1,
      log:[template.desc+' The confrontation begins.'],
      stealthOpenerAvailable:arch.group==='stealth'&&G.worldClocks.rival<3,
      loot:template.loot||{gold:3,item:null},
      resolved:false
    };
    G.recentOutcomeType='combat_start';
    G.encounter=null;
    G.lastResult=template.desc+' Choose your approach.';
    recordCodex('creatures',templateKey,{text:template.desc,weakness:'see field notes'});
    G.telemetry.encounters++;
  }

  function combatSessionChoices(){
    const cs=G.combatSession;
    if(!cs||cs.resolved) return currentNonCombatChoices();
    const arch=getArchetype(G.archetype)||{group:'combat'};
    const abilities=((window.ARCHETYPE_COMBAT_ABILITIES||{})[G.archetype]||[]).filter(ab=>(G.skills[ab.skillReq]||0)>=ab.minSkill);
    const choices=[];
    choices.push({label:`Press forward — direct attack on ${cs.enemyName}`,tags:['Combat','Direct'],fn(){
      resolveCombatRound('attack',null,cs);
    }});
    abilities.slice(0,2).forEach(ab=>{
      choices.push({label:`${ab.name}: ${ab.effect}`,tags:['Combat','Ability'],fn(){
        resolveCombatRound('ability',ab.id,cs);
      }});
    });
    if(cs.stealthOpenerAvailable){
      choices.push({label:`Exploit timing window — stealth opener before engagement`,tags:['Stealth','Combat','Opener'],fn(){
        cs.stealthOpenerAvailable=false;
        resolveCombatRound('stealth_opener',null,cs);
      }});
    }
    choices.push({label:`Disengage and fall back to the safe zone`,tags:['Retreat','Safe'],fn(){
      G.combatSession=null;
      G.encounter=null;
      G.recentOutcomeType='combat_flee';
      advanceTime(1);
      recordConfrontation('avoidedConflicts');
      G.lastResult=`Distance gained from ${cs.enemyName}. The safe zone holds for now.`;
      setThreat();setObjective();persist();render();
    }});
    return choices;
  }

  function resolveCombatRound(action,abilityId,cs){
    const tierBonus=cs.tier==='elite'?2:cs.tier==='boss'?5:0;
    let attackBonus=0,defenseBonus=0,specialEffect=null;
    if(action==='ability'&&abilityId){
      const ab=((window.ARCHETYPE_COMBAT_ABILITIES||{})[G.archetype]||[]).find(a=>a.id===abilityId);
      if(ab){
        const eff=ab.effect;
        const atk=eff.match(/attack\+(\d+)/); if(atk) attackBonus+=parseInt(atk[1]);
        const def=eff.match(/defense\+(\d+)/); if(def) defenseBonus+=parseInt(def[1]);
        specialEffect=ab.name;
      }
    }
    if(action==='stealth_opener'){ attackBonus+=4; defenseBonus+=2; specialEffect='Stealth Opener'; }
    const skill=action==='stealth_opener'?'stealth':'combat';
    const rAtk=rollD20(skill,(G.skills[skill]||0)+Math.floor(G.level/3)+attackBonus);
    const playerRoll=rAtk.total;
    const enemyDC=10+cs.enemyDefense+tierBonus;
    const playerHit=rAtk.isCrit||(playerRoll>=enemyDC&&!rAtk.isFumble);
    const enemyRoll=1+rand(20)+cs.enemyAttack;
    const playerDC=10+(G.skills.combat||0)+Math.floor(G.level/3)+defenseBonus;
    const enemyHit=enemyRoll>=playerDC&&cs.enemyHp>0&&!rAtk.isCrit;
    const log=[];
    if(rAtk.isCrit){
      const dmg=Math.max(6,rand(8)+rand(8)+Math.floor(G.level/2));
      cs.enemyHp=Math.max(0,cs.enemyHp-dmg);
      log.push(`NAT 20. ${rAtk.flavor}`);
      log.push(`Critical hit for ${dmg} damage. ${cs.enemyName}: ${cs.enemyHp}/${cs.enemyMaxHp} HP.`);
    } else if(rAtk.isFumble){
      const selfDmg=Math.max(1,rand(4));
      G.hp=Math.max(0,G.hp-selfDmg);
      log.push(`NAT 1. ${rAtk.flavor}`);
      log.push(`You take ${selfDmg} from your own fumble. HP: ${G.hp}/${G.maxHp}.`);
    } else if(playerHit){
      const dmg=Math.max(1,rand(8)+Math.floor(G.level/2));
      cs.enemyHp=Math.max(0,cs.enemyHp-dmg);
      log.push(`Attack connects for ${dmg} damage. ${cs.enemyName}: ${cs.enemyHp}/${cs.enemyMaxHp} HP.`);
      if(specialEffect) log.push(`${specialEffect} activates.`);
    } else { log.push(`Attack misses — ${cs.enemyName} holds.`); }
    if(enemyHit){ const dmg=Math.max(1,rand(6)+(cs.tier==='boss'?4:cs.tier==='elite'?2:0)); G.hp=Math.max(0,G.hp-dmg); log.push(`${cs.enemyName} strikes for ${dmg}. Your HP: ${G.hp}/${G.maxHp}.`); }
    else if(cs.enemyHp>0&&!rAtk.isFumble){ log.push(`${cs.enemyName} counterattack misses.`); }
    cs.round++;
    cs.log.unshift(`Round ${cs.round-1}: `+log.join(' '));
    cs.log=cs.log.slice(0,10);
    G.lastRoll={action:action==='stealth_opener'?'Stealth Opener':specialEffect||'Direct Attack',skill,total:playerRoll,target:enemyDC,success:playerHit,die:rAtk.die,crit:rAtk.isCrit,fumble:rAtk.isFumble};
    if(cs.enemyHp<=0){
      G.combatSession=null; G.encounter=null;
      G.telemetry.wins++;
      G.gold+=cs.loot.gold||rand(8)+3;
      recordConfrontation('directCombats');
      markMoment(`Defeated ${cs.enemyName} at ${getLocality(G.location).name}`);
      addNotice(`${cs.enemyName} defeated.`);
      enterPostCombatResolutionEngine(cs);
      G.lastResult=`${cs.enemyName} is down. `+log.join(' ');
    } else if(G.hp<=0){
      G.combatSession=null; G.encounter=null;
      handleDeath();
    } else {
      G.recentOutcomeType='combat_ongoing';
      G.lastResult=log.join(' ')+` Round ${cs.round} begins.`;
    }
    setThreat();setObjective();persist();render();
  }

  function enterPostCombatResolutionEngine(cs){
    G.postCombatResolution={enemyName:cs.enemyName,tier:cs.tier,templateKey:cs.templateKey,loot:cs.loot||{},resolved:false};
    G.recentOutcomeType='combat_victory';
    G.lastResult=`${cs.enemyName} is defeated. How do you resolve this?`;
  }

  function postCombatResolutionChoices(){
    const pcr=G.postCombatResolution;
    if(!pcr||pcr.resolved) return currentNonCombatChoices();
    const loot=pcr.loot||{};
    function finish(outcome,alignMoral,alignCivic,heat,xpAmt,confront,resultText){
      pcr.resolved=true; G.postCombatResolution=null;
      applyAlignmentShift(alignMoral,alignCivic);
      if(heat) applyLegalityShift(heat);
      if(confront) recordConfrontation(confront);
      gainXp(xpAmt,'post-combat');
      if(loot.item){ G.inventory.unshift({name:loot.item,slot:'evidence',bonus:{}}); G.inventory=G.inventory.slice(0,30); }
      G.recentOutcomeType=outcome;
      G.lastResult=resultText;
      setThreat();setObjective();persist();render();
    }
    return [
      {label:`Show mercy — restrain and leave ${pcr.enemyName}`,tags:['Good','Lawful','Resolution'],fn(){
        finish('combat_mercy',1,1,0,2,'captures',`${pcr.enemyName} is restrained. The mercy costs something but does not close doors.`);
      }},
      {label:`Take what is useful and move on`,tags:['Neutral','Resolution'],fn(){
        G.gold+=(loot.gold||0);
        finish('combat_loot',0,0,0,2,null,`${pcr.enemyName} is dealt with. Gold and evidence secured.`);
      }},
      {label:`Interrogate before deciding`,tags:['Lawful','Deliberate','Resolution'],fn(){
        const intel=`Interrogation of ${pcr.enemyName} yields actionable pressure details.`;
        addJournal('intel',intel,`interrogate-${G.dayCount}`);
        finish('combat_interrogate',1,2,0,3,'captures',intel);
      }},
      {label:`Execute ${pcr.enemyName} — eliminate the threat permanently`,tags:['Evil','Chaotic','Resolution'],fn(){
        finish('combat_execute',-2,-1,2,1,'executions',`${pcr.enemyName} is eliminated. The threat will not resurface. The weight of it follows.`);
      }}
    ];
  }

  // ── MORAL/CIVIC AXIS CHOICES ────────────────────────────
  function moralAxisChoice(){
    const seed=(G.dayCount+G.worldClocks.pressure)%3;
    return seed===0 ? moralAxis_EvilChoice() : moralAxis_GoodChoice();
  }
  function civicAxisChoice(){
    const seed=(G.dayCount+G.worldClocks.rival)%3;
    return seed===0 ? civicAxis_ChaoticChoice() : civicAxis_LawfulChoice();
  }
  function moralAxis_GoodChoice(){
    return {label:'Intervene on behalf of someone who cannot manage this alone',tags:['Good','Civic'],fn(){
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      applyAlignmentShift(2,1);
      gainXp(2,'good act');
      G.stageProgress[G.stage]++;
      G.recentOutcomeType='moral_good';
      recordConfrontation('stabilizations');
      G.lastResult='The intervention costs time and attention but opens a door that pressure alone would not.';
      maybeStageAdvance();
    }};
  }
  function moralAxis_EvilChoice(){
    return {label:'Exploit the weakness here for direct advantage',tags:['Evil','Pragmatic'],fn(){
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      applyAlignmentShift(-2,-1);
      applyLegalityShift(1);
      gainXp(1,'exploitation');
      G.gold+=4;
      G.recentOutcomeType='moral_evil';
      G.lastResult='The exploitation yields a short gain and a longer tab.';
      maybeStageAdvance();
    }};
  }
  function civicAxis_LawfulChoice(){
    return {label:'Work through legitimate authority — slower but cleaner',tags:['Lawful','Civic'],fn(){
      advanceTime(2); G.telemetry.turns++; G.telemetry.actions++;
      applyAlignmentShift(1,2);
      applyLegalityShift(-1);
      gainXp(2,'lawful action');
      G.stageProgress[G.stage]++;
      G.recentOutcomeType='civic_lawful';
      G.lastResult='The legitimate path opens more slowly but leaves fewer targets on the back.';
      maybeStageAdvance();
    }};
  }
  function civicAxis_ChaoticChoice(){
    return {label:'Bypass the official line and work the problem directly',tags:['Chaotic','Pragmatic'],fn(){
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      applyAlignmentShift(0,-2);
      applyLegalityShift(2);
      gainXp(2,'direct bypass');
      G.stageProgress[G.stage]++;
      G.recentOutcomeType='civic_chaotic';
      G.lastResult='The bypass works, at least this time. The official channels noticed.';
      maybeStageAdvance();
    }};
  }

  // ── CLASS-DISTINCT INVESTIGATION CHOICES ─────────────────
  function classInvestigationChoices(){
    const group=(getArchetype(G.archetype)||{}).group||'combat';
    const loc=getLocality(G.location)||{name:'here'};
    const seed=(G.dayCount+G.worldClocks.pressure)%4;
    if(group==='combat'){
      const verbs=[
        {label:'Post at the choke point and watch who moves under pressure',skill:'combat',success:'Force read pays off — the pattern becomes visible when someone tests the line.'},
        {label:'Demand access through physical authority — no paperwork',skill:'combat',success:'Direct entry granted. The place had a soft point exactly where you expected.'},
        {label:'Stage a visible confrontation to draw out who responds',skill:'persuasion',success:'The bait works. The wrong person reacts and gives up more than they intended.'},
        {label:'Escort someone through the dangerous section to learn the route',skill:'survival',success:'The escort reveals which sections are watched and which are simply dangerous.'}
      ];
      return verbs.slice(seed%2, seed%2+2).map(v=>({label:v.label,tags:['Class','Combat','Investigation'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
        const bonuses=(G.skills[v.skill]||0)+Math.floor(G.level/3);
        const r=rollD20(v.skill,bonuses); const target=11+G.stage;
        const success=r.isCrit||(r.total>=target&&!r.isFumble);
        G.lastRoll={action:v.label,skill:v.skill,total:r.total,target,success,die:r.die,crit:r.isCrit,fumble:r.isFumble};
        if(r.isCrit){ applySuccess(G.stage,'combat',v.skill,3,r.flavor); addNotice(`Critical: ${v.label.slice(0,40)}.`); }
        else if(r.isFumble){ G.lastResult=r.flavor; G.worldClocks.rival++; addNotice(`Fumble: ${v.label.slice(0,40)}.`); }
        else if(success){ applySuccess(G.stage,'combat',v.skill,2,v.success); }
        else { G.lastResult=`The ${v.skill} approach hits a wall. The line holds.`; G.worldClocks.rival++; }
        G.recentOutcomeType='class_combat'; maybeStageAdvance();
      }}));
    }
    if(group==='magic'){
      const verbs=[
        {label:'Read the ward structure on the nearest institutional threshold',skill:'lore',success:'The ward layer tells a story — someone with academy access placed these very recently.'},
        {label:'Trace arcane residue from the last use of this space',skill:'lore',success:'The residue pattern maps to a specific ritual tradition. The list of practitioners is short.'},
        {label:'Invoke a minor divination to index what the room has recently held',skill:'craft',success:'The divination returns one name and one object. Both are unexpected.'},
        {label:'Identify the break in the local magical infrastructure',skill:'lore',success:'The structural break is deliberate, not decay. Someone wanted this dead zone exactly here.'}
      ];
      return verbs.slice(seed%2, seed%2+2).map(v=>({label:v.label,tags:['Class','Magic','Investigation'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
        const bonuses=(G.skills[v.skill]||0)+Math.floor(G.level/3);
        const r=rollD20(v.skill,bonuses); const target=11+G.stage;
        const success=r.isCrit||(r.total>=target&&!r.isFumble);
        G.lastRoll={action:v.label,skill:v.skill,total:r.total,target,success,die:r.die,crit:r.isCrit,fumble:r.isFumble};
        if(r.isCrit){ applySuccess(G.stage,'magic',v.skill,3,r.flavor); addNotice(`Critical arcane read: ${v.label.slice(0,40)}.`); }
        else if(r.isFumble){ G.lastResult=r.flavor; G.worldClocks.rival++; G.skills.lore=Math.max(0,(G.skills.lore||1)-0); }
        else if(success){ applySuccess(G.stage,'magic',v.skill,2,v.success); G.skills.lore=(G.skills.lore||0)+1; }
        else { G.lastResult=`The magical read returns noise — the ward interference is too dense.`; }
        G.recentOutcomeType='class_magic'; maybeStageAdvance();
      }}));
    }
    if(group==='stealth'){
      const verbs=[
        {label:'Shadow the person who enters that room most often',skill:'stealth',success:'Three days of pattern reveal a contact, a handoff, and a consistent blind spot in the watchers.'},
        {label:'Access the locked archive during the shift change window',skill:'stealth',success:'The archive yields one document that was supposed to be destroyed. It was not.'},
        {label:'Plant a marker and return to read who disturbs it',skill:'survival',success:'The marker is disturbed within hours. The method and direction tell you who and roughly why.'},
        {label:'Follow the money trail through the back market',skill:'persuasion',success:'The back channel opens a transaction record. The buyer is institutional. The record is unofficial.'}
      ];
      return verbs.slice(seed%2, seed%2+2).map(v=>({label:v.label,tags:['Class','Stealth','Investigation'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
        const bonuses=(G.skills[v.skill]||0)+Math.floor(G.level/3);
        const r=rollD20(v.skill,bonuses); const target=11+G.stage;
        const success=r.isCrit||(r.total>=target&&!r.isFumble);
        G.lastRoll={action:v.label,skill:v.skill,total:r.total,target,success,die:r.die,crit:r.isCrit,fumble:r.isFumble};
        if(r.isCrit){ applySuccess(G.stage,'stealth',v.skill,3,r.flavor); addNotice(`Critical covert read.`); }
        else if(r.isFumble){ G.lastResult=r.flavor; applyLegalityShift(1); addNotice(`Fumble — exposure risk.`); }
        else if(success){ applySuccess(G.stage,'stealth',v.skill,2,v.success); G.skills.stealth=(G.skills.stealth||0)+1; }
        else { G.lastResult=`The covert angle collapses — someone is watching the approach.`; G.worldClocks.rival++; }
        G.recentOutcomeType='class_stealth'; maybeStageAdvance();
      }}));
    }
    // support
    const verbs=[
      {label:'Survey who is failing here and what they specifically need',skill:'persuasion',success:'The needs map tells you exactly where the structural failure is originating. It is not where the official report says.'},
      {label:'Stabilize the immediate crisis before the investigation continues',skill:'craft',success:'The triage holds. The people you helped now have a stake in your success and say so.'},
      {label:'Read the logistics record for what it reveals about intent',skill:'lore',success:'The allocation trail shows deliberate withholding. Someone in authority is engineering the scarcity.'},
      {label:'Identify which institution is failing its own mandate here',skill:'lore',success:'The institutional gap is clear. The question now is whether anyone with power wants it filled.'}
    ];
    return verbs.slice(seed%2, seed%2+2).map(v=>({label:v.label,tags:['Class','Support','Investigation'],fn(){
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      const bonuses=(G.skills[v.skill]||0)+Math.floor(G.level/3);
      const r=rollD20(v.skill,bonuses); const target=11+G.stage;
      const success=r.isCrit||(r.total>=target&&!r.isFumble);
      G.lastRoll={action:v.label,skill:v.skill,total:r.total,target,success,die:r.die,crit:r.isCrit,fumble:r.isFumble};
      if(r.isCrit){ applySuccess(G.stage,'support',v.skill,3,r.flavor); addNotice(`Critical support read.`); }
      else if(r.isFumble){ G.lastResult=r.flavor; G.worldClocks.pressure++; }
      else if(success){ applySuccess(G.stage,'support',v.skill,2,v.success); G.skills.craft=(G.skills.craft||0)+1; }
      else { G.lastResult=`The support approach hits a coordination failure. The structure resists.`; }
      G.recentOutcomeType='class_support'; maybeStageAdvance();
    }}));
  }

  // ── STAGE CHOICES ────────────────────────────────────────
  function stage1Choices(){
    const bg=getBackground(G.archetype,G.backgroundId);
    const loc=getLocality(G.location);
    const recruit=window.recruitChoice?window.recruitChoice(G):null;
    const classInvest=classInvestigationChoices();
    const choices=[
      {label:`Observe ${loc.name} through ${bg.theme}`,tags:['Safe'],fn(){ advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; gainXp(1,'careful observation'); G.stageProgress[1]++; addJournal('field-note',`Observed ${loc.name} through ${bg.theme}.`,`${bg.id}-observe`); G.recentOutcomeType='observe'; G.lastResult=`A quieter read of ${loc.name} sharpens the first contradiction.`; maybeStageAdvance(); }},
      classIdentityChoice(),
      ...classInvest,
      ...objectiveWebChoices(1).slice(0,1),
      moralAxisChoice(),
      civicAxisChoice(),
      {label:'Test the current threat directly',tags:['Risky','Encounter'],fn(){ G.telemetry.actions++; startThreatEncounter('standard'); }},
      {label:'Make camp and regroup',tags:['Camp'],fn(){ G.lastResult='The line pulls back into a safer rhythm.'; }}
    ];
    if(recruit) choices.splice(2,0,recruit);
    return choices.slice(0,9);
  }

  function travelTo(dest){ const from=getLocality(G.location); const to=getLocality(dest); G.location=dest; G.currentSafeZone=to.safeZone; G.routeHistory.unshift(`${from.name} → ${to.name}`); G.routeHistory=G.routeHistory.slice(0,25); G.telemetry.travels++; advanceTime(1); addJournal('travel',`Moved from ${from.name} to ${to.name}.`,`${G.backgroundId}-travel-${from.id}-${to.id}-${G.dayCount}`); G.lastResult=`${to.name} takes the run into a more adjacent, less forgiving version of the same pressure.`; recordCodex('localities',dest,{name:to.name,polity:to.polity,economicRole:to.economicRole||'',lawFeel:to.lawFeel||''}); setThreat(); }

  function stage2Choices(){ const sig=routeSignature(); const atlas=routeAtlasFor(sig);
    let bgStage2Content = (window.BACKGROUND_STAGE2_CONTENT||{})[G.backgroundId];
    const familyContent = !bgStage2Content ? (window.STAGE2_FAMILY_CONTENT[sig.stage2Vector]||[]) : [];
    const contentToUse = bgStage2Content || {choices: familyContent};
    const adj=(window.ADJACENCY[G.location]||[]);
    const bgChoices = (contentToUse.choices||[]).map((entry,idx)=>({label:entry.label,tags:['Adjacent',entry.mode,atlas.risk],fn(){ advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; const comp=window.companionBonus?companionBonus(G,entry.skill):0; const bonuses=(G.skills[entry.skill]||0)+comp+Math.floor(G.level/3)+currentEdgeBonus(entry.mode); const r=rollD20(entry.skill,bonuses); const target=12+idx; const success=r.isCrit||(r.total>=target&&!r.isFumble); G.lastRoll={action:entry.label,skill:entry.skill,total:r.total,target,success,die:r.die,crit:r.isCrit,fumble:r.isFumble}; addJournal('adjacent-pressure',`${entry.label} on ${window.ROUTE_NAMES[sig.stage2Vector] || 'the route'}.`,`${G.backgroundId}-stage2-${entry.mode}-${idx}`); if(r.isCrit){ G.routeScoutLog.unshift(`${G.location} / ${window.ROUTE_NAMES[sig.stage2Vector]||'route'} / ${entry.mode}`); G.routeScoutLog=G.routeScoutLog.slice(0,20); applySuccess(2,entry.mode,entry.skill,4,r.flavor); addNotice(`Critical success on adjacent route.`); } else if(r.isFumble){ G.worldClocks.rival+=2; G.lastResult=r.flavor; addNotice(`Critical fumble on route action.`); startThreatEncounter('standard'); } else if(success){ G.routeScoutLog.unshift(`${G.location} / ${window.ROUTE_NAMES[sig.stage2Vector]||'route'} / ${entry.mode}`); G.routeScoutLog=G.routeScoutLog.slice(0,20); applySuccess(2,entry.mode,entry.skill,2,entry.success); } else { G.worldClocks.rival+=1; G.lastResult=entry.fail; if(rand(3)===0) startThreatEncounter('standard'); } maybeStageAdvance(); }}));
    const destinationChoices = adj.flatMap(dest=> destinationStage2Content(dest).slice(0,1).map((entry,idx)=>({label:`${getLocality(dest).name}: ${entry.label}`,tags:['Adjacent','Destination',entry.mode],fn(){ advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; const comp=window.companionBonus?companionBonus(G,entry.skill):0; const bonuses=(G.skills[entry.skill]||0)+comp+Math.floor(G.level/3)+currentEdgeBonus(entry.mode); const r=rollD20(entry.skill,bonuses); const target=13+idx; const success=r.isCrit||(r.total>=target&&!r.isFumble); G.stage2DestinationsSeen[dest]=true; G.lastRoll={action:entry.label,skill:entry.skill,total:r.total,target,success,die:r.die,crit:r.isCrit,fumble:r.isFumble}; addJournal('regional-pressure',`${entry.label} in ${getLocality(dest).name}.`,`${G.backgroundId}-stage2-dest-${dest}-${idx}`); if(r.isCrit){ G.routeScoutLog.unshift(`${G.location} / ${getLocality(dest).name} / ${entry.mode}`); G.routeScoutLog=G.routeScoutLog.slice(0,20); applySuccess(2,entry.mode,entry.skill,4,r.flavor); addNotice(`Critical success in ${getLocality(dest).name}.`); } else if(r.isFumble){ G.worldClocks.rival+=2; G.lastResult=r.flavor; addNotice(`Critical fumble at ${getLocality(dest).name}.`); startThreatEncounter('standard'); } else if(success){ G.routeScoutLog.unshift(`${G.location} / ${getLocality(dest).name} / ${entry.mode}`); G.routeScoutLog=G.routeScoutLog.slice(0,20); applySuccess(2,entry.mode,entry.skill,2,entry.success); G.lastResult=entry.success; } else { G.worldClocks.rival+=1; G.lastResult=entry.fail; if(rand(4)===0) startThreatEncounter('standard'); } maybeStageAdvance(); }})));
    const travel = adj.map(dest=>({label:`Travel to ${getLocality(dest).name}`,tags:['Travel','Adjacent'],fn(){ travelTo(dest); G.stage2DestinationsSeen[dest]=true; }}));
    const scouting = adj.map(dest=>({label:`Scout ${getLocality(dest).name} via ${atlas.style}`,tags:['Travel','Scout',atlas.risk],fn(){ advanceTime(1); G.telemetry.turns++; G.telemetry.scouts++; G.stage2DestinationsSeen[dest]=true; G.routeScoutLog.unshift(`${G.location} → ${dest} (${atlas.risk})`); G.routeScoutLog=G.routeScoutLog.slice(0,20); G.lastResult=`${getLocality(dest).name} comes into view through ${atlas.style}, and the risk reads as ${atlas.risk}.`; }}));
    const classRoute = stage2ClassIdentityChoice();
    return [
      ...bgChoices.slice(0,2),
      ...destinationChoices.slice(0,2),
      ...objectiveWebChoices(2).slice(0,1),
      classRoute,
      ...travel.slice(0,1),
      ...scouting.slice(0,1),
      moralAxis_GoodChoice(),
      civicAxis_ChaoticChoice(),
      {label:'Use the current safe zone for leverage',tags:['Camp','Leverage'],fn(){ advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; gainXp(1,'safe zone leverage'); G.lastResult=`${G.currentSafeZone} provides enough shelter to force one useful concession.`; }},
      {label:'Call on a settlement service before pushing further',tags:['Service','Adjacent'],fn(){ G.lastResult='A return through the current settlement services sharpens the next move.'; }}
    ].slice(0,9);
  }

  function campChoices(state){
    const loc=getLocality(state.location);
    return [
      {label:`Rest at ${state.currentSafeZone} and recover`,tags:['Rest','HP'],fn(){ advanceTime(1); state.hp=Math.min(state.maxHp,state.hp+Math.max(3,Math.floor(state.maxHp*0.3))); state.fatigue=Math.max(0,state.fatigue-1); state.lastResult=`${state.currentSafeZone} steadies the body. The next move starts from a better place.`; addJournal('camp',`Rested at ${state.currentSafeZone}.`,`camp-rest-${state.dayCount}`); }},
      {label:`Review the journal and sharpen the approach`,tags:['Reflect','Lore'],fn(){ advanceTime(1); gainXp(1,'careful reflection'); state.lastResult=`The journal yields one pattern that was not visible in motion.`; addJournal('camp','Reviewed field notes and updated the approach.',`camp-reflect-${state.dayCount}`); }},
      {label:`Scout the immediate area around ${loc.name}`,tags:['Scout','Survival'],fn(){ advanceTime(1); state.telemetry.scouts++; state.skills.survival=(state.skills.survival||0)+1; const t=chooseThreat(); state.currentThreat=t; state.lastResult=`The perimeter of ${loc.name} gives up one useful detail about what is moving and what is holding still.`; }},
      {label:`Maintain equipment and prepare for the next push`,tags:['Craft','Prep'],fn(){ advanceTime(1); state.skills.craft=(state.skills.craft||0)+1; gainXp(1,'field maintenance'); state.lastResult=`Gear is clean, edges are sound, and the next move starts with better tools than the last one.`; }}
    ];
  }

  function beginEncounter(state, kind, name, tier){
    state.encounter={ kind, name:name||'unknown threat', tier:tier||'standard', round:1, started:state.dayCount, hp:kind==='creature'?(window.BESTIARY&&window.BESTIARY[name]?window.BESTIARY[name].hp:12):(window.HAZARDS&&window.HAZARDS[name]?window.HAZARDS[name].severity*4:8), maxHp:kind==='creature'?(window.BESTIARY&&window.BESTIARY[name]?window.BESTIARY[name].hp:12):(window.HAZARDS&&window.HAZARDS[name]?window.HAZARDS[name].severity*4:8) };
    const desc=kind==='creature'?(window.BESTIARY&&window.BESTIARY[name]?window.BESTIARY[name].text:'A threat emerges from the pressure.'):(window.HAZARDS&&window.HAZARDS[name]?window.HAZARDS[name].text:'A hazard breaks into the open.');
    state.lastResult=`${desc} The encounter demands an immediate answer.`;
  }

  function encounterChoices(state){
    const enc=state.encounter;
    if(!enc) return stage1Choices();
    // Route creature encounters to full combat system
    if(enc.kind==='creature'){
      state.encounter=null;
      startCombatSessionFromEngine({creature:enc.name,hazard:null}, enc.tier);
      return combatSessionChoices();
    }
    // Hazard encounters use skill checks
    const tierBonus=enc.tier==='elite'?3:enc.tier==='boss'?6:0;
    function resolve(skill,label,xpAmt,successText,failText){
      const bonuses=(state.skills[skill]||0)+Math.floor(state.level/3)+tierBonus;
      const r=rollD20(skill,bonuses);
      const target=enc.tier==='boss'?18:enc.tier==='elite'?15:12;
      const success=r.isCrit||(r.total>=target&&!r.isFumble);
      G.lastRoll={action:label,skill,total:r.total,target,success,die:r.die,crit:r.isCrit,fumble:r.isFumble};
      if(r.isCrit){ gainXp(xpAmt*2,'critical encounter'); enc.hp=0; state.encounter=null; state.telemetry.wins++; state.gold+=rand(8)+6; state.lastResult=r.flavor+` The hazard collapses completely. (+${xpAmt*2} xp)`; markMoment(`Critical resolve: ${enc.name}`); addNotice(`Critical success against ${enc.name}.`); }
      else if(r.isFumble){ const dmg=Math.max(2,rand(8)+(enc.tier==='boss'?8:enc.tier==='elite'?5:3)); state.hp=Math.max(0,state.hp-dmg); state.lastResult=r.flavor+` You take ${dmg} damage (HP: ${state.hp}/${state.maxHp}).`; enc.round+=2; addNotice(`Critical fumble against ${enc.name}.`); }
      else if(success){ gainXp(xpAmt,'encounter'); enc.hp=Math.max(0,enc.hp-Math.floor(state.level*1.5+5)); if(enc.hp<=0){ state.encounter=null; state.telemetry.wins++; state.gold+=rand(8)+3; state.lastResult=successText+` The hazard is broken. (+${xpAmt} xp, gold gained)`; markMoment(`Resolved ${enc.name} at ${getLocality(state.location).name}`); } else { state.lastResult=successText+` The hazard weakens but holds.`; } }
      else { const dmg=Math.max(1,rand(6)+(enc.tier==='boss'?6:enc.tier==='elite'?4:2)); state.hp=Math.max(0,state.hp-dmg); state.lastResult=failText+` You take ${dmg} damage (HP: ${state.hp}/${state.maxHp}).`; enc.round++; }
    }
    return [
      {label:`Force through the hazard directly`,tags:['Combat','Direct'],fn(){ resolve('combat','direct push',enc.tier==='boss'?4:2,'The hazard breaks under direct force.','The direct approach costs something.'); if(state.hp<=0&&!state.stage5Dead) handleDeath(); else{setThreat();setObjective();persist();render();} }},
      {label:`Find the weakness and work the hazard precisely`,tags:['Stealth','Precise'],fn(){ resolve('stealth','precision approach',enc.tier==='boss'?3:2,'The weak point opens and the hazard unravels.','The precision read fails under pressure.'); if(state.hp<=0&&!state.stage5Dead) handleDeath(); else{setThreat();setObjective();persist();render();} }},
      {label:`Apply knowledge and read the hazard structure`,tags:['Lore','Read'],fn(){ resolve('lore','analytical approach',enc.tier==='boss'?3:2,'The hazard logic becomes legible and the answer follows.','The analytical read produces theory without enough time.'); if(state.hp<=0&&!state.stage5Dead) handleDeath(); else{setThreat();setObjective();persist();render();} }},
      {label:`Withdraw and regroup at the safe zone`,tags:['Retreat','Safe'],fn(){ state.encounter=null; advanceTime(1); state.hp=Math.max(1,state.hp); state.lastResult=`The hazard is left behind. The safe zone holds for now.`; setThreat();setObjective();persist();render(); }}
    ];
  }

  function stage3to5Choices(stage){ const arr=objectiveWebChoices(stage).slice(0,5); if(stage===5 && G.finalBreak){ arr.push({label:'Commit to the final boss confrontation',tags:['Boss','Final'],fn(){ beginEncounter(G,'creature',G.currentThreat.creature,'boss'); }}); arr.push({label:'Commit to the final hazard confrontation',tags:['Boss','Final'],fn(){ beginEncounter(G,'hazard',G.currentThreat.hazard,'boss'); }}); } else { arr.push({label:'Force an elite confrontation now',tags:['Encounter','Elite'],fn(){ startThreatEncounter('elite'); }}); } arr.push({label:'Camp and re-form the line',tags:['Camp'],fn(){ G.lastResult='The camp settles nerves but the wider pressure does not stop moving.'; }}); return arr.slice(0,8); }
  function maybeStageAdvance(){ if(G.stage===1 && G.stageProgress[1]>=4 && G.level>=5){ G.stage=2; updateStage(); addNotice('Stage II begins. Adjacent pressure opens.'); markMoment('Stage II began'); } if(G.stage===2 && G.stageProgress[2]>=4 && G.level>=9){ G.stage=3; updateStage(); addNotice('Stage III begins. The world grows wider and less forgiving.'); markMoment('Stage III began'); } if(G.stage===3 && G.familyMilestones.stage3>=3 && G.level>=13){ G.stage=4; updateStage(); addNotice('Stage IV begins. Your name now changes what institutions dare.'); markMoment('Stage IV began'); } if(G.stage===4 && G.familyMilestones.stage4>=3 && G.level>=17){ G.stage=5; updateStage(); addNotice('Stage V begins. Death is now final.'); markMoment('Stage V began'); } setObjective(); }

  function currentNonCombatChoices(){ if(G.stage===1) return stage1Choices(); if(G.stage===2) return stage2Choices(); if(G.stage===3) return stage3to5Choices(3); if(G.stage===4) return stage3to5Choices(4); return stage3to5Choices(5); }
  function currentChoices(){
    if(G.postCombatResolution&&!G.postCombatResolution.resolved) return postCombatResolutionChoices();
    if(G.combatSession&&!G.combatSession.resolved) return combatSessionChoices();
    if(G.encounter) return encounterChoices(G);
    return currentNonCombatChoices();
  }
  function startThreatEncounter(tier){ const threat=G.currentThreat||chooseThreat(); if(!threat) return; const kind=rand(2)===0?'creature':'hazard'; const name=kind==='creature'?threat.creature:threat.hazard; G.telemetry.encounters++; beginEncounter(G,kind,name,tier||'standard'); }

  function handleDeath(){ G.deathCount+=1; if(G.stage===5){ G.stage5Dead=true; G.lastResult='The final line breaks. This run ends here.'; saveLegend('Permadeath'); persist(); render(); return; } const oldLoc=getLocality(G.location); const rescue=(window.RESCUE_PROFILES||{})[G.location]||{rescuer:'unrecorded rescuers',aftermath:'The cost is real even if the names are not.',safeZone:oldLoc.safeZone}; const next=((window.ADJACENCY[G.location]||[])[0]) || G.location; const nextLoc=getLocality(next); G.location=next; G.currentSafeZone=rescue.safeZone || nextLoc.safeZone; G.safeZoneHistory.unshift(`${G.currentSafeZone} (${nextLoc.name})`); G.safeZoneHistory=G.safeZoneHistory.slice(0,10); G.hp=Math.max(6,Math.floor(G.maxHp*0.4)); G.fatigue+=2; G.gold=Math.max(0,G.gold-3); G.wounds.push(`Near-death at ${oldLoc.name}`); G.wounds=G.wounds.slice(0,6); G.worldClocks.rival+=2; G.worldClocks.pressure+=1; G.telemetry.rescues++; G.companions.forEach(c=>{ if(rand(4)===0){ c.injured=true; c.available=false; c.trust=Math.max(0,(c.trust||1)-1); } }); G.rescueLog.unshift(`Recovered near ${oldLoc.name} by ${rescue.rescuer}; carried to ${G.currentSafeZone}. ${rescue.aftermath}`); G.rescueLog=G.rescueLog.slice(0,10); G.lastResult=`${oldLoc.name} is lost for now. ${rescue.rescuer[0].toUpperCase()+rescue.rescuer.slice(1)} bring the party to ${G.currentSafeZone}. ${rescue.aftermath}`; markMoment(`Rescued after near-death at ${oldLoc.name}`); setThreat(); setObjective(); }

  function saveLegend(finalOutcome){ const bg=getBackground(G.archetype,G.backgroundId); const arch=getArchetype(G.archetype); const loc=getLocality(routeSignature().originLocality); G.legends.unshift({name:G.name, archetypeName:arch.name, backgroundName:bg.name, originLocalityName:loc.name, lifeOverview:G.lifeOverview, keyMoments:[...G.keyMoments], safeZones:[...G.safeZoneHistory], finalOutcome, stage5Dead:G.stage5Dead, familyEdges:[...(G.familyEdges||[])], rescueLog:[...G.rescueLog], routeScoutLog:[...G.routeScoutLog], companions:G.companions.map(c=>c.name), dayCount:G.dayCount, level:G.level}); G.legends=G.legends.slice(0,20); }
  function legendLines(){ return G.legends.map((l,i)=>`<div class='card'><b>${i+1}. ${l.name}</b><div>${legendSummary(l)}</div></div>`).join('')||'<div class="card">No legends recorded yet.</div>'; }
  function journalLines(){ return G.journalRecords.map(r=>`<div class='card'><b>${r.category}</b><div>Day ${r.day} · ${getLocality(r.locality)?.name||r.locality}</div><div>${r.text}</div></div>`).join('')||'<div class="card">No journal records yet.</div>'; }
  function noticeCategory(text){
    if(/warrant|arrested|critical fumble|critical success|permadeath|death|heat/i.test(text)) return 'urgent';
    if(/stage|level|advance|edge unlocked/i.test(text)) return 'stage';
    if(/traveled|recruit|companion|join/i.test(text)) return 'world';
    return 'standard';
  }
  function noticesLines(){
    if(!G.notices||!G.notices.length) return `<div class='noticeBoard'><div class='noticeBoardHeader'>Notice Board</div><div class='noticeClear'>No notices recorded yet.</div></div>`;
    const urgent=[],stage=[],world=[],standard=[];
    G.notices.forEach(n=>{
      const m=n.match(/^Day (\d+): ([\s\S]*)/);
      const day=m?m[1]:''; const text=m?m[2]:n;
      const cat=noticeCategory(text);
      const html=`<div class='noticeItem ${cat}'><span class='noticeDay'>Day ${day}</span>${text}</div>`;
      if(cat==='urgent') urgent.push(html);
      else if(cat==='stage') stage.push(html);
      else if(cat==='world') world.push(html);
      else standard.push(html);
    });
    const sections=[...urgent,...stage,...world,...standard];
    return `<div class='noticeBoard'><div class='noticeBoardHeader'>Notice Board — ${G.notices.length} entries</div><div class='noticeList'>${sections.join('')}</div></div>`;
  }
  function npcsLines(){
    const npcs=currentNamedPlacements(G.location);
    if(!npcs.length) return '<div class="card">No named persons surfaced here yet.</div>';
    return npcs.map(n=>{
      const name=(n.id||'').replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
      const seen=G.codex&&G.codex.npcs&&G.codex.npcs[n.id];
      return `<div class='card'><b>${name}</b><div class='muted'>${n.role} · ${n.office}</div>${seen?`<div style='font-size:11px;color:#7cae73;margin-top:3px'>Previously encountered</div>`:''}</div>`;
    }).join('');
  }

  // ── CODEX SYSTEM ─────────────────────────────────────────
  function recordCodex(type, key, entry){
    if(!G.codex) G.codex={npcs:{},localities:{},creatures:{},hazards:{},institutions:{}};
    if(!G.codex[type]) G.codex[type]={};
    if(!G.codex[type][key]) G.codex[type][key]=entry;
  }
  function codexLines(){
    if(!G.codex) return '<div class="card">Your codex is empty. Encounters, places, and named persons accumulate here.</div>';
    const sections=[];
    const loc=G.codex.localities||{};
    if(Object.keys(loc).length){
      sections.push(`<div class='card'><div class='sectionTitle'>Localities Visited</div>${Object.entries(loc).map(([id,e])=>`<div style='padding:3px 0;border-bottom:1px solid #2a1f0f'><b>${e.name}</b><div style='font-size:11px;color:#8a7a5a'>${e.polity} · ${e.economicRole||''}</div><div style='font-size:11px;color:#6a5a3a;font-style:italic'>${e.lawFeel||''}</div></div>`).join('')}</div>`);
    }
    const npcs=G.codex.npcs||{};
    if(Object.keys(npcs).length){
      sections.push(`<div class='card'><div class='sectionTitle'>Named Persons</div>${Object.entries(npcs).map(([id,e])=>`<div style='padding:3px 0;border-bottom:1px solid #2a1f0f'><b>${e.name}</b><div style='font-size:11px;color:#8a7a5a'>${e.role} · ${e.office}</div><div style='font-size:11px;color:#6a5a3a'>${e.locality}</div></div>`).join('')}</div>`);
    }
    const creatures=G.codex.creatures||{};
    if(Object.keys(creatures).length){
      sections.push(`<div class='card'><div class='sectionTitle'>Bestiary</div>${Object.entries(creatures).map(([id,e])=>`<div style='padding:3px 0;border-bottom:1px solid #2a1f0f'><b>${id.replace(/_/g,' ')}</b><div style='font-size:11px;color:#8a7a5a'>${e.text}</div><div style='font-size:11px;color:#c27f7f'>Weakness: ${e.weakness}</div></div>`).join('')}</div>`);
    }
    const hazards=G.codex.hazards||{};
    if(Object.keys(hazards).length){
      sections.push(`<div class='card'><div class='sectionTitle'>Known Hazards</div>${Object.entries(hazards).map(([id,e])=>`<div style='padding:3px 0;border-bottom:1px solid #2a1f0f'><b>${id.replace(/_/g,' ')}</b><div style='font-size:11px;color:#8a7a5a'>${e.text}</div></div>`).join('')}</div>`);
    }
    if(!sections.length) return '<div class="card">Your codex is empty. Encounters, places, and named persons accumulate here.</div>';
    return sections.join('');
  }
  function campLines(){ return `<div class='campGrid'>${campChoices(G).map((c,i)=>`<button class='choice small' data-camp='${i}'>${c.label}</button>`).join('')}</div>`; }
  function mapLines(){ const sig=routeSignature(); const atlas=routeAtlasFor(sig); const fam=familyTitleForStage2(sig); const top=`<div class='card'><div class='sectionTitle'>Current Vector</div><b>${window.ROUTE_NAMES[sig.stage2Vector]}</b><div>${atlas.style}</div><div>Risk: ${atlas.risk}</div><div>${atlas.note}</div><div><span class='muted'>Family:</span> ${fam}</div></div>`; const adj=(window.ADJACENCY[G.location]||[]).map(dest=>{ const dl=getLocality(dest); const seen=G.stage2DestinationsSeen[dest]?'Seen':'Unseen'; const preview=destinationStage2Content(dest)[0]; return `<div class='card'><b>${dl.name}</b><div>${dl.summary}</div><div><span class='muted'>Status:</span> ${seen}</div><div><span class='muted'>Pressure:</span> ${preview?preview.label:'Adjacent pressure not yet surfaced.'}</div></div>`; }).join(''); return top+(adj||'<div class="card">No adjacent routes surfaced here yet.</div>'); }
  function poiActions(){ const locPois=(window.SETTLEMENT_POIS||{})[G.location]||{}; const group=getArchetype(G.archetype).group; const basePool=(window.SERVICE_ITEM_POOLS||{})[group]||[]; const localPool=((window.LOCALITY_SERVICE_ITEM_OVERRIDES||{})[G.location]||{})[group]||[]; const itemPool=[...localPool,...basePool]; return Object.entries(locPois).map(([key,poi])=>({key,poi,itemPool,action:()=>{ advanceTime(1); G.telemetry.turns++; G.telemetry.services++; if(key==='recovery'){ G.hp=Math.min(G.maxHp,G.hp+5); G.fatigue=Math.max(0,G.fatigue-2); G.lastResult=`${poi.name} steadies the body and lowers immediate strain.`; }
    else if(key==='equipment'){ const item=itemPool[(G.dayCount+G.level)%itemPool.length]; if(G.gold>=item.cost){ G.gold-=item.cost; G.inventory.unshift(item); G.inventory=G.inventory.slice(0,30); G.equipment[item.slot]=item; G.lastResult=`${poi.name} equips ${item.name}. ${item.text}`; } else G.lastResult=`${poi.name} offers what would help, but not at the coin currently on hand.`; }
    else if(key==='info'){ gainXp(1,'settlement information'); addJournal('information', `${poi.name}: ${poi.text}`, `${G.location}-${key}-${G.dayCount}`); G.lastResult=`${poi.name} turns rumor into something more actionable.`; }
    else if(key==='progression'){ const focus=getArchetype(G.archetype).focus; G.skills[focus]=(G.skills[focus]||0)+1; gainXp(1,'local progression'); G.lastResult=`${poi.name} sharpens ${focus} into a more reliable edge.`; }
    else if(key==='flavor'){ G.renown+=1; addJournal('locality', `${poi.name}: ${poi.text}`, `${G.location}-${key}`); G.lastResult=`${poi.name} makes the place feel fully inhabited and harder to mistake for anywhere else.`; }
    else if(key==='secret'){ G.settlementSecrets[G.location]=true; G.gold+=3; addJournal('secret', `${poi.name}: ${poi.text}`, `${G.location}-secret`); G.lastResult=`${poi.name} yields a hidden leverage point and a small practical gain.`; }
    G.serviceLog.unshift(`${poi.name} (${key}) at ${getLocality(G.location).name}`); G.serviceLog=G.serviceLog.slice(0,20); setThreat(); persist(); render(); }})); }
  function servicesLines(){ return poiActions().map((p,i)=>{ const stock=p.key==='equipment'&&p.itemPool.length?`<div class='stockLine'>Stock: ${p.itemPool.slice(0,2).map(x=>x.name).join(', ')}</div>`:''; return `<div class='card'><div class='sectionTitle'>${p.key}</div><div class='poiName'>${p.poi.name}</div><div class='poiText'>${p.poi.text}</div>${stock}<button class='choice small' data-service='${i}'>Use ${p.poi.name}</button></div>`; }).join('')||'<div class="card">No services here yet.</div>'; }

  function sheetLines(){
    const arch=getArchetype(G.archetype), bg=getBackground(G.archetype,G.backgroundId);
    updateSignals();
    const inv=(G.inventory||[]).slice(0,6).map(i=>i.name).join(', ')||'None';
    const eq=Object.entries(G.equipment||{}).map(([slot,item])=>`${slot}: ${item.name}`).join(' · ')||'None';
    const al=G.alignment||{goodEvil:0,lawfulChaotic:0};
    const ls=G.legalityState||{civicHeat:0};
    const ch=G.confrontationHistory||{};
    const alignStr=`Moral ${al.goodEvil>0?'+':''}${al.goodEvil} · Civic ${al.lawfulChaotic>0?'+':''}${al.lawfulChaotic}`;
    const heatStr=ls.civicHeat>0?`<span style='color:#c27f7f'>Civic Heat: ${ls.civicHeat}</span>`:'Clean record';
    const confrontStr=`Combats ${ch.directCombats||0} · Mercy ${ch.captures||0} · Executions ${ch.executions||0}`;
    return `<div class='card'><div class='sectionTitle'>Identity</div><b>${arch.name}</b> · ${bg.name}<br>${G.stageLabel}<br>${buildAuditText()}<br>${G.lifeOverview}</div><div class='card'><div class='sectionTitle'>State</div>Objective: ${G.currentObjective}<br>Companions: ${G.companions.map(c=>c.name).join(', ') || 'None'}<br>Family edges: ${familyEdgesText()}<br>Stage II destinations seen: ${Object.keys(G.stage2DestinationsSeen||{}).length}<br>Rescues: ${G.rescueLog.length} · Legends: ${G.legends.length}<br>Telemetry: ${G.telemetry.actions} actions · ${G.telemetry.encounters} encounters · ${G.telemetry.services} services</div><div class='card'><div class='sectionTitle'>Alignment &amp; Law</div>${alignStr}<br>${heatStr}<br>${confrontStr}</div><div class='card'><div class='sectionTitle'>Readiness</div>${Object.values(G.signals||{}).join(' · ')}</div><div class='card'><div class='sectionTitle'>Equipment</div>${eq}<br><span class='muted'>Inventory:</span> ${inv}</div>`;
  }

  function leftRailLines(){
    const arch=getArchetype(G.archetype)||{name:'?',group:'combat'};
    const bg=getBackground(G.archetype,G.backgroundId)||{name:'?',theme:''};
    const loc=getLocality(G.location)||{name:'?'};
    const hpPct=Math.max(0,Math.min(100,Math.round(G.hp/G.maxHp*100)));
    const skillKeys=['combat','survival','persuasion','lore','stealth','craft'];
    const skillRows=skillKeys.map(k=>`<div class='skillRow'><span class='skillName'>${k}</span><span class='skillVal'>${G.skills[k]||0}</span></div>`).join('');
    updateSignals();
    const sigLines=Object.values(G.signals||{}).map(v=>`<div class='sigLine'>${v}</div>`).join('');
    const compLines=(G.companions&&G.companions.length)?G.companions.map(c=>`<div class='compLine${c.injured?" compInjured":""}'>${c.name||c.id}${c.injured?' (injured)':''}</div>`).join(''):`<div class='compLine' style='color:#5a4a2a;font-style:italic'>No companions</div>`;
    const al=G.alignment||{goodEvil:0,lawfulChaotic:0};
    const ls=G.legalityState||{civicHeat:0};
    const alignLine=`<div class='sigLine'>Moral ${al.goodEvil>0?'+':''}${al.goodEvil} · Civic ${al.lawfulChaotic>0?'+':''}${al.lawfulChaotic}</div>`;
    const heatLine=ls.civicHeat>0?`<div class='sigLine' style='color:#c27f7f'>Heat ${ls.civicHeat}</div>`:'';
    const inCombatLine=G.combatSession?`<div class='sigLine' style='color:#c9a46b;font-weight:bold'>IN COMBAT — ${G.combatSession.enemyName}</div>`:'';
    const postCombatLine=G.postCombatResolution&&!G.postCombatResolution.resolved?`<div class='sigLine' style='color:#7cae73'>RESOLUTION PENDING</div>`:'';
    return `<div class='railCard'><div class='railLabel'>Legend</div><div class='railName'>${G.name||'—'}</div><div class='railSub'>${arch.name} · ${bg.name}</div><div class='railSub'>${loc.name}</div></div><div class='railCard'><div class='railLabel'>Vitals</div><div class='hpBar'><div class='hpFill' style='width:${hpPct}%'></div></div><div class='railSub'>HP ${G.hp}/${G.maxHp} · Lvl ${G.level} · XP ${G.xp}</div><div class='railSub' style='margin-top:3px'>Renown ${G.renown} · Gold ${G.gold}</div><div class='railSub' style='margin-top:3px'>Wounds ${G.wounds.length} · Fatigue ${G.fatigue}</div></div><div class='railCard'><div class='railLabel'>Stage</div><span class='stageTag'>${G.stageLabel}</span><div class='objectiveText'>${G.currentObjective||'—'}</div><div class='progressLine'>Progress: ${G.stageProgress[G.stage]||0} actions</div></div><div class='railCard'><div class='railLabel'>Skills</div>${skillRows}</div><div class='railCard'><div class='railLabel'>Readiness</div>${sigLines}${alignLine}${heatLine}${inCombatLine}${postCombatLine}</div><div class='railCard'><div class='railLabel'>Party</div>${compLines}</div>`;
  }

  function resultCardLines(){
    const r=G.lastRoll;
    const combatLog = G.combatSession && G.combatSession.log ? `<div class='combatLog'>${G.combatSession.log.slice(0,3).map(l=>`<div class='combatLogLine'>${l}</div>`).join('')}</div>` : '';
    const postCombatNote = G.postCombatResolution&&!G.postCombatResolution.resolved ? `<div class='postCombatBanner'>${G.postCombatResolution.enemyName} is defeated — choose a resolution below.</div>` : '';
    if(!r||!r.action) return `<div id='result'>${resultNarrative(G.lastResult)}</div>${combatLog}${postCombatNote}`;
    const icon=r.success?'✓':'✗';
    const cls=r.success?'good':'bad';
    const dieDisplay=r.die?`<span class='dieBadge${r.crit?' dieCrit':r.fumble?' dieFumble':''}'>${r.crit?'★':r.fumble?'☠':'⚄'} ${r.die}</span>`:'';
    const critBadge=r.crit?`<span class='pill critPill'>CRITICAL SUCCESS</span>`:(r.fumble?`<span class='pill fumblePill'>CRITICAL FUMBLE</span>`:'');
    return `<div class='chosenLabel'>You Chose</div><div class='chosenAction'>${r.action}</div><div class='rollRow'>${dieDisplay}<span class='pill ${cls}'>${icon} ${r.total} vs ${r.target}</span><span class='pill warn'>${r.skill}</span>${r.success?`<span class='pill good'>Success</span>`:`<span class='pill bad'>Failure</span>`}${critBadge}</div><div class='resultDivider'></div><div id='result'>${resultNarrative(G.lastResult)}</div>${combatLog}${postCombatNote}`;
  }

  // ── DEDICATED LAYER RENDERERS ────────────────────────────
  function renderWorldLayer(){
    const loc=getLocality(G.location)||{name:'?',summary:'',polity:'',pressures:[],creatures:[],hazards:[]};
    let sig={}, atlas={};
    try{ sig=routeSignature()||{}; atlas=routeAtlasFor(sig)||{}; }catch(e){}
    const pressure=pick(loc.pressures,G.worldClocks.pressure)||'none surfaced';
    const threat=G.currentThreat||{};
    const adj=(window.ADJACENCY[G.location]||[]);
    const clocks=G.worldClocks||{pressure:0,rival:0,omens:0};

    const localityCard=`<div class='card'><div class='sectionTitle'>${loc.name}</div><div>${loc.summary||'An uncertain place.'}</div><div style='margin-top:6px'><span class='muted'>Polity:</span> ${loc.polity||'Independent'}</div><div><span class='muted'>Active pressure:</span> ${pressure}</div><div><span class='muted'>Safe zone:</span> ${G.currentSafeZone||'—'}</div></div>`;

    const clockCard=`<div class='card'><div class='sectionTitle'>World Clocks</div><div>Pressure <b>${clocks.pressure}</b> · Rival <b>${clocks.rival}</b> · Omens <b>${clocks.omens}</b></div>${clocks.rival>4?`<div style='color:#c27f7f;margin-top:4px'>Rival clock elevated — opposing pressure is organizing.</div>`:''}</div>`;

    const threatCard=`<div class='card'><div class='sectionTitle'>Current Threat</div><div>${threat.creature?`Creature: <b>${(threat.creature||'').replace(/_/g,' ')}</b>`:'No creature threat active.'}</div><div>${threat.hazard?`Hazard: <b>${(threat.hazard||'').replace(/_/g,' ')}</b>`:'No hazard active.'}</div>${G.combatSession?`<div style='color:#c9a46b;margin-top:4px'>COMBAT IN PROGRESS — ${G.combatSession.enemyName}</div>`:''}</div>`;

    const routeCard=sig.stage2Vector?`<div class='card'><div class='sectionTitle'>Route Vector</div><b>${window.ROUTE_NAMES&&window.ROUTE_NAMES[sig.stage2Vector]||sig.stage2Vector}</b><div>${atlas.style||''}</div><div>Risk: ${atlas.risk||'unknown'}</div><div style='font-style:italic;margin-top:4px'>${atlas.note||''}</div></div>`:'';

    const adjCards=adj.map(dest=>{ const dl=getLocality(dest)||{name:dest,summary:''}; const seen=G.stage2DestinationsSeen&&G.stage2DestinationsSeen[dest]; return `<div class='card'><div class='sectionTitle'>${dl.name} <span class='muted'>${seen?'· Scouted':''}</span></div><div>${dl.summary||''}</div></div>`; }).join('');

    const npcsCard=currentNamedPlacements(G.location).length?`<div class='card'><div class='sectionTitle'>Named Persons</div>${currentNamedPlacements(G.location).map(n=>`<div><b>${n.id.replace(/_/g,' ')}</b> — ${n.role} · ${n.office}</div>`).join('')}</div>`:'';

    $('mapPanel').innerHTML=localityCard+clockCard+threatCard+routeCard+adjCards+npcsCard;
  }

  function renderIdentityLayer(){
    const arch=getArchetype(G.archetype)||{name:'?',group:'combat',focus:'combat'};
    const bg=getBackground(G.archetype,G.backgroundId)||{name:'?',theme:'',firstObjective:''};
    const loc=getLocality(G.location)||{name:'?'};
    const al=G.alignment||{goodEvil:0,lawfulChaotic:0};
    const ls=G.legalityState||{civicHeat:0,warrants:[],knownCrimes:[]};
    const ch=G.confrontationHistory||{};
    updateSignals();
    const skillKeys=['combat','survival','persuasion','lore','stealth','craft'];
    const skillBars=skillKeys.map(k=>{
      const val=G.skills[k]||0;
      const pct=Math.min(100,val*8);
      return `<div class='skillRow'><span class='skillName'>${k}</span><div class='skillBarTrack'><div class='skillBarFill' style='width:${pct}%'></div></div><span class='skillVal'>${val}</span></div>`;
    }).join('');
    const alignLine=`Moral ${al.goodEvil>0?'+':''}${al.goodEvil} (${al.goodEvil>3?'Good':al.goodEvil<-3?'Evil':'Neutral'}) · Civic ${al.lawfulChaotic>0?'+':''}${al.lawfulChaotic} (${al.lawfulChaotic>3?'Lawful':al.lawfulChaotic<-3?'Chaotic':'Neutral'})`;
    const heatClass=ls.civicHeat>=6?'color:#c27f7f':ls.civicHeat>=3?'color:#d4b67a':'color:#7cae73';
    const woundList=(G.wounds||[]).slice(0,4).map(w=>`<div style='color:#c27f7f;font-size:11px'>· ${w}</div>`).join('')||'<div style="color:#7cae73;font-size:11px">No wounds</div>';

    $('sheetPanel').innerHTML=`
      <div class='card'><div class='sectionTitle'>Legend</div><b>${G.name||'—'}</b> · Age ${G.age} · ${G.presentation} · ${G.lineage}<br><span class='muted'>${arch.name}</span> / <span class='muted'>${bg.name}</span><br><span class='muted'>${loc.name}</span> · ${G.stageLabel}<div style='margin-top:6px;font-style:italic;font-size:12px'>${G.lifeOverview||''}</div></div>
      <div class='card'><div class='sectionTitle'>Skills</div>${skillBars}</div>
      <div class='card'><div class='sectionTitle'>Readiness</div>${Object.values(G.signals||{}).map(v=>`<div class='sigLine'>${v}</div>`).join('')}</div>
      <div class='card'><div class='sectionTitle'>Alignment</div><div>${alignLine}</div><div style='margin-top:4px;${heatClass}'>Civic Heat: ${ls.civicHeat}${ls.warrants&&ls.warrants.length?` · <b>WARRANT ISSUED</b>`:''}</div></div>
      <div class='card'><div class='sectionTitle'>Confrontations</div><div>Combat ${ch.directCombats||0} · Mercy ${ch.captures||0} · Executions ${ch.executions||0}</div><div>Stealth kills ${ch.stealthKills||0} · Stabilizations ${ch.stabilizations||0}</div></div>
      <div class='card'><div class='sectionTitle'>Wounds</div>${woundList}</div>
      <div class='card'><div class='sectionTitle'>Equipment &amp; Inventory</div><div>${Object.entries(G.equipment||{}).map(([s,i])=>`<div><span class='muted'>${s}:</span> ${i.name}</div>`).join('')||'No equipment'}</div><div style='margin-top:4px;color:#8a7a5a'>${(G.inventory||[]).slice(0,6).map(i=>i.name).join(' · ')||'Empty inventory'}</div></div>
      <div class='card'><div class='sectionTitle'>Progress</div><div>XP ${G.xp} · Level ${G.level} · Renown ${G.renown} · Gold ${G.gold}</div><div>Stage progress: ${G.stageProgress[G.stage]||0} actions · Stage II seen: ${Object.keys(G.stage2DestinationsSeen||{}).length} destinations</div><div>Family edges: ${familyEdgesText()}</div></div>`;
  }

  function renderPartyLayer(){
    const compDefs=window.COMPANION_DEFS||{};
    const trust=G.companionTrust||{};
    const active=G.companions||[];

    const activeSection=active.length?active.map(c=>{
      const def=compDefs[c.id]||{};
      const trustVal=trust[c.id]||0;
      const injuredLine=c.injured?`<div style='color:#c27f7f;font-size:11px'>Injured — unavailable</div>`:'';
      return `<div class='card'><div class='sectionTitle'>${c.name||c.id} <span class='muted'>· Active</span></div><div>${def.role||'Companion'}</div><div>Trust: ${trustVal} · Skills: ${def.skills||'—'}</div>${injuredLine}</div>`;
    }).join(''):`<div class='card'><div style='color:#5a4a2a;font-style:italic'>No companions currently active.</div></div>`;

    const recruitSection=Object.entries(compDefs).filter(([id])=>!active.some(c=>c.id===id)).map(([id,def])=>{
      const trustVal=trust[id]||0;
      const bar=Math.min(100,Math.round(trustVal/4*100));
      const inLocality=def.locality===G.location;
      const readyLine=trustVal>=4?`<div style='color:#7cae73;font-size:11px'>Ready to recruit — choose in the action list.</div>`:(inLocality?`<div style='font-size:11px'>Trust ${trustVal}/4 — continue working in ${def.locality_name||def.locality}.</div>`:`<div style='color:#5a4a2a;font-size:11px'>Not in this locality.</div>`);
      return `<div class='card'><div class='sectionTitle'>${def.name} <span class='muted'>· Potential</span></div><div>${def.role||'—'} · ${def.group||''}</div><div style='margin:4px 0'><div style='background:#1a150a;border-radius:3px;height:4px;width:100%'><div style='background:#8a7a5a;height:4px;border-radius:3px;width:${bar}%'></div></div></div>${readyLine}</div>`;
    }).join('')||'<div class="card"><div style="color:#5a4a2a;font-style:italic">No potential companions in data.</div></div>';

    const campSection=`<div class='card'><div class='sectionTitle'>Camp Actions</div><div class='campGrid'>${campChoices(G).map((c,i)=>`<button class='choice small' data-camp='${i}'>${c.label}</button>`).join('')}</div></div>`;

    $('campPanel').innerHTML=`<div style='margin-bottom:8px;font-size:13px;color:#8a7a5a'>Party &amp; Companions</div>${activeSection}${recruitSection}${campSection}`;
  }

  function renderChronicleLayer(){
    const noticesHtml=noticesLines();
    const momentsHtml=G.keyMoments&&G.keyMoments.length?`<div class='card'><div class='sectionTitle'>Key Moments</div>${G.keyMoments.slice(0,8).map(m=>`<div style='font-size:12px;padding:2px 0;border-bottom:1px solid #2a1f0f'>· ${m}</div>`).join('')}</div>`:'';
    const journalHtml=journalLines();
    const legendsHtml=G.legends&&G.legends.length?legendLines():'';
    const rescueHtml=G.rescueLog&&G.rescueLog.length?`<div class='card'><div class='sectionTitle'>Rescue Record</div>${G.rescueLog.slice(0,4).map(r=>`<div style='font-size:12px;padding:2px 0'>${r}</div>`).join('')}</div>`:'';
    $('journalPanel').innerHTML=noticesHtml+momentsHtml+journalHtml+rescueHtml+legendsHtml;
  }

  // ── LAYER SYSTEM ─────────────────────────────────────────
  function setActiveLayer(name){
    if(!G.uiState) G.uiState={activeLayer:'story'};
    G.uiState.activeLayer=name;
    applyLayerToUI(name);
  }
  function applyLayerToUI(layer){
    document.querySelectorAll('.layerBtn').forEach(b=>b.classList.toggle('active',b.dataset.layer===layer));
    if(layer==='world'){
      document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
      const mp=$('mapPanel'); if(mp){ mp.classList.add('active'); renderWorldLayer(); }
    } else if(layer==='identity'){
      document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
      const sp=$('sheetPanel'); if(sp){ sp.classList.add('active'); renderIdentityLayer(); }
    } else if(layer==='party'){
      document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
      const cp=$('campPanel'); if(cp){ cp.classList.add('active'); renderPartyLayer(); [...document.querySelectorAll('[data-camp]')].forEach(btn=>btn.onclick=()=>{ const choice=campChoices(G)[+btn.dataset.camp]; choice.fn(); persist(); render(); }); }
    } else if(layer==='chronicle'){
      document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
      const jp=$('journalPanel'); if(jp){ jp.classList.add('active'); renderChronicleLayer(); }
    }
  }

  function renderChoices(){
    const list=currentChoices();
    $('choices').innerHTML=list.map((c,i)=>{
      const cp=normalizeChoiceProfile(c);
      const risk=computeDynamicRiskTag(cp);
      const riskCls=risk==='Safe'?'good':risk==='Risky'?'bad':'warn';
      const tags=(c.tags||[]).join(' · ');
      const isClass=(c.tags||[]).includes('Class');
      const isEvil=(c.tags||[]).includes('Evil');
      const isGood=(c.tags||[]).includes('Good');
      const isLawful=(c.tags||[]).includes('Lawful');
      const extraCls=(isClass?' classChoice':'')+(isEvil?' evilChoice':'')+(isGood?' goodChoice':'')+(isLawful?' lawfulChoice':'');
      return `<button class='choice${extraCls}' data-choice='${i}'><span>${c.label}</span><small>${tags} · <span class='riskPill riskPill-${riskCls}'>${risk}</span></small></button>`;
    }).join('');
    [...document.querySelectorAll('[data-choice]')].forEach(btn=>btn.onclick=()=>{
      const c=list[+btn.dataset.choice]; G.lastChoiceLabel=c.label; c.fn();
      if(G.hp<=0 && !G.stage5Dead) handleDeath();
      setThreat(); setObjective(); persist(); render();
    });
  }

  function render(){
    updateStage(); setObjective(); updateSignals();
    let sig={}, atlas={};
    try{ sig=routeSignature()||{}; atlas=routeAtlasFor(sig)||{}; }catch(e){}
    const _loc=getLocality(G.location); const _timeLabel=['Dawn','Morning','Midday','Late Day','Night'][G.timeIndex]; const _heatBadge=(G.legalityState&&G.legalityState.civicHeat>0)?`<span style='color:#c27f7f;margin-left:6px'>Heat ${G.legalityState.civicHeat}</span>`:''; const _combatBadge=G.combatSession?`<span style='color:#c9a46b;margin-left:6px'>IN COMBAT</span>`:''; $('header').innerHTML=`<span style='color:var(--accent)'>${_loc.name}</span> · Day ${G.dayCount} · ${_timeLabel} · Lvl ${G.level} · ${G.stageLabel} · ${_loc.polity||''}${_heatBadge}${_combatBadge}`;
    $('leftRail').innerHTML=leftRailLines();
    // Central narrative panel — composeCentralNarrativePanel when game started
    if(window.composeCentralNarrativePanel && G.name){
      const ss=computeSceneState();
      const panelText=window.composeCentralNarrativePanel(ss,G);
      $('narrative').innerHTML=`<div class='narrativeText'>${panelText.replace(/\n\n/g,'</div><div class=\'narrativeText\' style=\'margin-top:10px\'>').replace(/\n/g,' ')}</div>`;
    } else {
      try{
        $('narrative').textContent=localityNarrative(G,getLocality(G.location),{pressure:pick(getLocality(G.location).pressures,G.worldClocks.pressure),routeHint:window.ROUTE_NAMES&&sig.stage2Vector?window.ROUTE_NAMES[sig.stage2Vector]:'',routeStyle:atlas.style||'',routeRisk:atlas.risk||'',hazardHint:G.currentThreat?.hazard,creatureHint:G.currentThreat?.creature,namedHint:currentNamedPlacements(G.location).map(n=>`${n.id.replace(/_/g,' ')} at ${n.office}`).join('; '), serviceHint:(G.serviceLog[0]||''), familyHint:familyTitleForStage2(sig)||'', destinationHint:Object.keys(G.stage2DestinationsSeen||{}).length?`The widening route now carries remembered names like ${Object.keys(G.stage2DestinationsSeen).slice(0,2).map(id=>getLocality(id)?.name||id).join(' and ')}.`:''});
      }catch(e){ $('narrative').textContent='Locality narrative unavailable.'; }
    }
    $('resultCard').innerHTML=resultCardLines();
    $('mapPanel').innerHTML=mapLines();
    $('servicesPanel').innerHTML=servicesLines();
    $('sheetPanel').innerHTML=sheetLines();
    $('journalPanel').innerHTML=journalLines();
    $('noticesPanel').innerHTML=noticesLines();
    $('npcsPanel').innerHTML=npcsLines();
    if($('codexPanel')) $('codexPanel').innerHTML=codexLines();
    $('campPanel').innerHTML=campLines();
    $('legendsPanel').innerHTML=legendLines();
    // Auto-record current locality NPCs to codex on each render
    if(G.name) currentNamedPlacements(G.location).forEach(n=>{ recordCodex('npcs',n.id,{name:(n.id||'').replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase()),role:n.role,office:n.office,locality:getLocality(G.location)?.name||G.location}); });
    renderChoices();
    // Re-apply layer state after render
    if(G.uiState) applyLayerToUI(G.uiState.activeLayer||'story');
    [...document.querySelectorAll('[data-camp]')].forEach(btn=>btn.onclick=()=>{ const choice=campChoices(G)[+btn.dataset.camp]; choice.fn(); persist(); render(); });
    [...document.querySelectorAll('[data-service]')].forEach(btn=>btn.onclick=()=>{ const action=poiActions()[+btn.dataset.service]; action.action(); });
    [...document.querySelectorAll('.layerBtn')].forEach(btn=>btn.onclick=()=>setActiveLayer(btn.dataset.layer));
  }

  function fillSelectors(){ const archSel=$('archSelect'); archSel.innerHTML=window.ARCHETYPES.map(a=>`<option value='${a.id}'>${a.name}</option>`).join(''); $('ageSelect').innerHTML=['18','21','24','28','34','41','53'].map(v=>`<option value='${v}'>Age ${v}</option>`).join(''); $('presentationSelect').innerHTML=['Male','Female','Non-Gendered'].map(v=>`<option value='${v}'>${v}</option>`).join(''); function fillBg(){ const ids=window.BACKGROUNDS[archSel.value]||[]; $('bgSelect').innerHTML=ids.map(b=>`<option value='${b.id}'>${b.name} — ${getLocality(b.originLocality)?.name||b.originLocality}</option>`).join(''); } archSel.onchange=fillBg; fillBg(); }
  function beginNew(){ G=defaultState(); G.name=$('newName').value.trim()||'Nameless'; G.passcode=$('newCode').value.trim() || ('0000'+rand(10000)).slice(-4); G.archetype=$('archSelect').value; G.backgroundId=$('bgSelect').value; G.age=$('ageSelect').value; G.presentation=$('presentationSelect').value; const arch=getArchetype(G.archetype); const bg=getBackground(G.archetype,G.backgroundId); G.location=bg.originLocality; const lineages=(window.LOCALITY_LINEAGES||{})[G.location] || ['Human']; G.lineage=lineages[0]; G.currentSafeZone=bg.firstSafeZone; G.safeZoneHistory=[bg.firstSafeZone]; G.maxHp=20 + (arch.group==='combat'?4:arch.group==='support'?2:0); G.hp=G.maxHp; G.skills[arch.focus]=(G.skills[arch.focus]||0)+1; (window.STARTING_LOADOUT_BY_GROUP[arch.group]||[]).forEach((name,idx)=>G.inventory.push({name,slot:['weapon','kit','belt'][idx]||'kit',bonus:{}})); G.lifeOverview=window.lifeOverviewText?lifeOverviewText(G):`${G.name} starts in ${getLocality(G.location).name}.`; G.codex={npcs:{},localities:{},creatures:{},hazards:{},institutions:{}}; const startLoc=getLocality(G.location); if(startLoc) recordCodex('localities',G.location,{name:startLoc.name,polity:startLoc.polity,economicRole:startLoc.economicRole||'',lawFeel:startLoc.lawFeel||''}); addQuest('stage1', bg.firstObjective, 'Active'); setThreat(); setObjective(); persist(); render(); }
  function loadLegend(){ const code=$('loadCode').value.trim(); const all=storage(); const found=all[code]; if(!found){ alert('Legend not found.'); return; } G=found; if(!G.familyEdges) G.familyEdges=[]; if(!G.telemetry) G.telemetry={turns:0,actions:0,travels:0,scouts:0,encounters:0,wins:0,rescues:0,services:0}; if(!G.inventory) G.inventory=[]; if(!G.equipment) G.equipment={}; if(!G.serviceLog) G.serviceLog=[]; if(!G.alignment) G.alignment={goodEvil:0,lawfulChaotic:0}; if(!G.legalityState) G.legalityState={civicHeat:0,warrants:[],knownCrimes:[],sanctionedActions:[]}; if(!G.confrontationHistory) G.confrontationHistory={directCombats:0,avoidedConflicts:0,stealthKills:0,captures:0,executions:0,stabilizations:0,ritualResolutions:0,escortsCompleted:0}; if(!G.uiState) G.uiState={activeLayer:'story'}; if(!G.codex) G.codex={npcs:{},localities:{},creatures:{},hazards:{},institutions:{}}; render(); }
  window.addEventListener('DOMContentLoaded',()=>{ fillSelectors(); $('beginBtn').onclick=beginNew; $('loadBtn').onclick=loadLegend; G=defaultState(); G.lifeOverview='Create a new legend to enter the world.'; setThreat(); render(); });
})();
