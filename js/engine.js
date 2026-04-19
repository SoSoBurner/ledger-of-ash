
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
  function advanceTime(t=1){ for(let i=0;i<t;i++){ G.timeIndex=(G.timeIndex+1)%5; if(G.timeIndex===0) G.dayCount+=1; G.worldClocks.pressure++; if(G.stage>=2) G.worldClocks.rival++; if(G.stage>=4) G.worldClocks.omens++; if(G.trainingDisadvantage>0) G.trainingDisadvantage--; if(window.buildCompanionTrust) window.buildCompanionTrust(G,1); if(G.stage>=2 && G.worldClocks.rival===5) addNotice('Rival clock at 5 — opposing pressure has become organized and directed toward you specifically.'); if(G.stage>=2 && G.worldClocks.rival===10) addNotice('Rival clock at 10 — a coordinated opposing force is now actively moving against you.'); if(G.worldClocks.pressure===8) addNotice('Pressure clock at 8 — locality strain is reaching visible crisis levels.'); if(G.stage>=3 && G.worldClocks.rival===15) addNotice('Rival clock at 15 — a named adversary is now closing distance with institutional support.'); } }
  function gainXp(n,why=''){ G.xp+=n; while(G.level<20 && G.xp>=XP_PER_LEVEL[G.level+1]){ G.level++; G.maxHp += G.stage>=4?4:3; G.hp=Math.min(G.maxHp,G.hp+4); G.renown+=2; G.pendingSkillSelection=true; addNotice(`Level ${G.level} reached${why?` — ${why}`:''}.`);} updateStage(); }
  function updateStage(){ const st=currentStage(G.level); G.stage=st.id; G.stageLabel=st.label; }
  function chooseThreat(){ const loc=getLocality(G.location); return {hazard:pick(loc.hazards,G.dayCount+G.stage+G.worldClocks.pressure), creature:pick(loc.creatures,G.dayCount+G.stage+G.worldClocks.rival)}; }
  function setThreat(){ G.currentThreat = chooseThreat(); }
  function currentNamedPlacements(location){ 
    // Filter legendary and notable NPCs (except Lady Rosalind Shelk) based on stage
    const list = (window.NPC_PLACEMENTS||{})[location] || [];
    const stage = (G && typeof G.stage !== 'undefined') ? G.stage : 0;
    return list.filter(npc => {
      const id = npc.id || npc.npc_id || npc;
      if(id === 'lady_rosalind_shelk') return true;
      const isLegendary = window.LEGENDARY_NPCS && window.LEGENDARY_NPCS.includes(id);
      const isNotable = window.NOTABLE_NPCS && window.NOTABLE_NPCS.includes(id);
      if(stage < 4){
        return !(isLegendary || isNotable);
      } else {
        // Stage 4 & 5: interactions with legendary/notable NPCs only occur half the time,
        // otherwise they are represented as rumors. This approximates story-supported appearances.
        if(!(isLegendary || isNotable)) return true;
        return rand(2)===0;
      }
    }); 
  }
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
  function localMagicContext(){ const ms=window.MAGIC_SYSTEM||[]; const entry=ms.find(m=>m.localities&&m.localities.includes(G.location)); return entry||{identity:'arcane detection and ward reading',expressions:['residue reading','ward strain analysis'],socialReading:'',localities:[]}; }
  function classIdentityChoice(){
    const a=getArchetype(G.archetype); const group=a.group;
    const hooks=(window.LOCALITY_HOOKS||{})[G.location]||{};
    const sb=(hooks.suspiciousBehavior||[])[0]||'who controls the exits';
    const mc=localMagicContext();
    const expr=mc.expressions[0]||'residue and ward traces';
    const COMBAT_VARIANTS={
      warrior:{label:'Press the line — hold your weight and force the confrontation forward',result:'The disciplined stance reads the space correctly. Weight, footing, and held position tell more truth than anyone intended to show.'},
      knight:{label:'Challenge and interpose — draw focus to yourself, protect the approach',result:'Presence and deliberate position shift how the space is read. The challenge registers before any strike is needed.'},
      ranger:{label:'Establish range and read the threat from a controlled distance before engaging',result:'Controlled distance. Sightlines managed. Engagement ground chosen first. The confrontation starts on your terms.'},
      berserker:{label:'Commit fully — drive harder into the confrontation than the situation expects',result:'Full commitment changes the calculus. The threat was not prepared for that much impact that fast.'},
      paladin:{label:'Interpose — hold the line for someone who cannot hold it themselves',result:'The deliberate intervention changes what the space is doing. The protected position holds.'},
      archer:{label:'Hold spacing and force engagement on your terms from cover',result:'Distance maintained. Target identified. Cover exploited. The angle was yours before the exchange opened.'},
      duelist:{label:'Wait for the precise opening — one clean read of the timing, one committed move',result:'Patience opens the gap. A single move closes what brute force would have lengthened into something neither side could control.'},
      warden:{label:'Cover the exposed position — interpose between the threat and the weak point',result:'The cover holds. The threat makes contact with the shield instead of what it was aimed at.'},
      warlord:{label:'Identify the line weakness and press before the formation can reset',result:'The gap was open for exactly one move. You took it before the formation knew it existed.'},
      death_knight:{label:'Press relentlessly — refuse to give ground until the confrontation is finished',result:'Relentless forward pressure does not allow the opponent time to reset or reframe. The confrontation ends because you did not allow it to continue.'},
      beastmaster:{label:'Read the terrain advantage and engage from the better position',result:'Terrain understanding turns the space into a second weapon. The engagement proceeds the way you set it up.'}
    };
    const MAGIC_VARIANTS={
      wizard:{label:'Apply arcane analysis — read the local magical signature for structural pattern',result:'Residue and ward traces surface the hidden structure. The arcane read gives leverage the untrained cannot access.'},
      cleric:{label:'Channel doctrinal authority — apply sacred discipline to the scene',result:'Sacred practice creates a consequence field the opposition did not anticipate and cannot easily counter.'},
      priest:{label:'Invoke communal ward practice — read the doctrinal pressure in this space',result:'The ward invocation surfaces the underlying mechanism. Doctrine-based reading is slower but more accurate than raw analysis.'},
      necromancer:{label:'Read the decay signature — what has departed leaves traces that speak clearly',result:'The residue record here is legible. What was hidden in departure is now readable in what remains.'},
      elementalist:{label:'Attune to the local axis — read the elemental seam that runs through this space',result:'The elemental seam responds to the attunement. Local instability makes the read sharper than stable conditions would allow.'},
      illusionist:{label:'Layer a perception shift — make the space harder for observers to read correctly',result:'The interference is subtle enough that careful observers are misreading the signals. You control what the space appears to show them.'},
      inquisitor:{label:'Apply interrogation doctrine — read intent before anyone acts on it',result:'Behavioral tells and institutional pressure patterns surface faster than they can be concealed. The read is authoritative.'},
      saint:{label:'Assert moral presence — create a field of consequence the opposition must navigate around',result:'Sacred authority without violence is still authority. The opposition must recalculate around what you represent here.'},
      oracle:{label:'Read the probable outcomes — position for what is already determined before it is visible',result:'The causal chain becomes legible three moves ahead. You are already in position before the decision is made.'}
    };
    const STEALTH_VARIANTS={
      rogue:{label:`Work the gap — read ${sb} and locate the unguarded angle`,result:'The blind corner holds the gap. The unguarded angle stays open long enough. The read was accurate.'},
      assassin:{label:'Hold position until the precise moment — patience over impulse',result:'The window opens when the target does not know it has. One move. Committed. Clean.'},
      scout:{label:'Establish the perimeter read — learn what is moving and where before committing',result:'Terrain, timing, and patrol pattern read in one quiet pass. You know the shape of the space before anyone knows you are in it.'},
      thief:{label:`Redirect attention first — watch ${sb}, then move while the focus is elsewhere`,result:'Attention is redirected before you act. The move completes before the misdirection resolves.'},
      spellthief:{label:'Read the magical pattern in the space — identify what can be intercepted or redirected',result:'The ward pattern here has a rhythm. Understanding it is the first step to redirecting it toward your purpose.'},
      trickster:{label:'Create surface confusion — the real move happens while they read the wrong signal',result:'The distraction holds attention exactly as long as needed. The real action was already complete before anyone looked at the right place.'},
      bard:{label:'Establish social position — the read comes through how people react to your presence here',result:'Room orientation shifts. The social position you occupy is the one that sees the most without being visible itself.'}
    };
    if(group==='combat'){
      const v=COMBAT_VARIANTS[G.archetype];
      return {label:v?v.label:'Set a hard stance and test the line physically',tags:['Class','Combat'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; G.skills.combat+=1; gainXp(2,'martial posture'); G.recentOutcomeType='class_combat';
        G.lastResult=v?v.result:'Weight, footing, and guard tell more truth than anyone intended to show.'; maybeStageAdvance();
      }};
    }
    if(group==='magic'){
      const v=MAGIC_VARIANTS[G.archetype];
      return {label:v?v.label:`Apply ${mc.identity} — read the local magical pattern`,tags:['Class','Magic'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; G.skills.lore+=1; gainXp(2,'arcane read'); G.recentOutcomeType='class_magic';
        G.lastResult=v?v.result:`${expr.charAt(0).toUpperCase()+expr.slice(1)} surface the hidden pattern. ${mc.socialReading||'Charged residue and ward strain make the structure easier to follow.'}`.trim(); maybeStageAdvance();
      }};
    }
    if(group==='stealth'){
      const v=STEALTH_VARIANTS[G.archetype];
      return {label:v?v.label:`Work the unnoticed angle — observe ${sb}`,tags:['Class','Stealth'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; G.skills.stealth+=1; gainXp(2,'concealment read'); G.recentOutcomeType='class_stealth';
        G.lastResult=v?v.result:'Sightlines and timing windows expose the pressure without a public clash. The unnoticed position holds.'; maybeStageAdvance();
      }};
    }
    const SUPPORT_VARIANTS={healer:'Field-assess the most critical need — stabilize before the investigation continues',artificer:'Deploy a practical solution — the mechanism addresses the structural gap directly',engineer:'Read the structural failure and determine what is load-bearing before acting',tactician:'Map the coordination gap — identify who is failing their mandate and why',alchemist:'Analyze what is in the space — compounds, residues, and contaminations read before they are touched'};
    return {label:SUPPORT_VARIANTS[G.archetype]||'Stabilize the weak point before it breaks wider',tags:['Class','Support'],fn(){
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; G.skills.craft+=1; gainXp(2,'support discipline'); G.recentOutcomeType='class_support';
      G.lastResult='Useful hands, clean tools, and practical discipline turn panic into leverage. The weak point holds.'; maybeStageAdvance();
    }};
  }

  function stage2ClassIdentityChoice(){
    const a=getArchetype(G.archetype); const sig=routeSignature();
    const mc=localMagicContext();
    const expr=mc.expressions[1]||mc.expressions[0]||'ward reading';
    const routeName=window.ROUTE_NAMES&&window.ROUTE_NAMES[sig.stage2Vector]||'the widening route';
    const S2_COMBAT={
      warrior:{label:`Command the line on ${routeName} — hold position and force the route to answer`,result:`The widening route starts answering to weight and held position. Discipline in the lead changes how every subsequent choice reads.`},
      knight:{label:`Assert protective authority on ${routeName} — challenge what threatens the approach`,result:`The challenge positions the party ahead of the threat. The route widens because the opposition must address you first.`},
      ranger:{label:`Hold distance and read the widening route from a controlled position`,result:`Controlled range on the widening route means you see what is moving before it can set its approach. The route opens on better terms.`},
      berserker:{label:`Drive into the widening route — more committed force than the opposition expects`,result:`The widening route is not accustomed to that much forward pressure. Commitment creates the opening that caution would not.`},
      paladin:{label:`Interpose on the widening route — hold the protected line as the stakes rise`,result:`The protected position on the widening route creates a different political reality. Institutions notice when the line is held cleanly.`},
      archer:{label:`Establish a ranged read on the widening route — cover the approach from a held position`,result:`The route's threat profile reads differently from a held ranged position. What the opposition planned to hide in the advance is now visible.`},
      duelist:{label:`Read the widening route for its timing windows — one precise intervention on the right pressure`,result:`The widening route has exactly two moments that matter. You identified them both before committing to either.`}
    };
    const S2_MAGIC={
      wizard:{label:`Apply systematic arcane analysis to the widening route — ${expr}`,result:`The adjacent pressure gives up its magical seams once the route is read as a structured system. The analysis changes what is visible about the stakes.`},
      cleric:{label:`Apply doctrinal authority to the widening route — read what the sacred record says about this pressure`,result:`The doctrinal record here is not widely known. What it says about the widening pressure changes how the route should be approached.`},
      necromancer:{label:`Read the decay record on the widening route — residue from prior failures speaks`,result:`The widening route carries residue from prior passages. The decay trace identifies who has moved through this pressure and what they lost.`},
      elementalist:{label:`Read the elemental seam on the widening route — ${expr}`,result:`The elemental seam on the widening route is responsive. The read surfaces the structural pressure that official reports are not recording.`},
      illusionist:{label:`Shift the perception of the widening route — make the opposition read the situation incorrectly`,result:`The interference on the widening route holds long enough for the actual position to shift. What they see is not what is there.`}
    };
    const S2_STEALTH={
      rogue:{label:`Work the unguarded edge of the widening route — the gap that nobody is watching`,result:`The widening route opens through the angle nobody thought to cover. The gap stays open long enough for the whole picture to come through.`},
      assassin:{label:`Hold position on the widening route until the precise window — no early commitment`,result:`The widening route has one clean window for surgical action. It opens and closes faster than noise could ever exploit it.`},
      scout:{label:`Read the full perimeter of the widening route before committing to any position`,result:`A full perimeter read before commitment means the route's threat landscape is mapped before the opposition knows you are reading it.`},
      thief:{label:`Work misdirection on the widening route — redirect attention before using the access`,result:`The misdirection on the widening route holds long enough. The access was already secured before anyone checked the right door.`}
    };
    function makeChoice(variants, group, skill, xpLabel, outcomeType, fallbackLabel, fallbackResult){
      const v=variants[G.archetype];
      return {label:v?v.label:fallbackLabel,tags:['Class','Adjacent',group==='combat'?'Combat':group==='magic'?'Magic':'Stealth'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; G.skills[skill]+=1; gainXp(2,xpLabel);
        G.recentOutcomeType=outcomeType; G.lastResult=v?v.result:fallbackResult;
        G.routeScoutLog.unshift(`${G.location} / ${routeName} / ${a.id}`); G.routeScoutLog=G.routeScoutLog.slice(0,20); maybeStageAdvance();
      }};
    }
    if(a.group==='combat') return makeChoice(S2_COMBAT,'combat','combat','route command','class_combat',`Take the lead physically on ${routeName}`,`The widening route starts answering to visible force, disciplined posture, and the threat of immediate correction.`);
    if(a.group==='magic') return makeChoice(S2_MAGIC,'magic','lore','arcane widening','class_magic',`Read wards and pressure seams on ${routeName} — ${expr}`,`The adjacent pressure gives up its magical seams once the route is read as a structure. ${mc.socialReading||''}`.trim());
    if(a.group==='stealth') return makeChoice(S2_STEALTH,'stealth','stealth','covert widening','class_stealth',`Work the widening edge through timing, concealment, and quiet access`,`The adjacent route opens by way of blind corners, bad habits, and people who think nobody is counting them.`);
    return {label:'Stabilize the widening line before it becomes a regional problem',tags:['Class','Adjacent','Support'],fn(){
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; G.skills.craft+=1; gainXp(2,'support widening');
      G.recentOutcomeType='class_support'; G.lastResult=`The widening pressure becomes manageable once tools, kits, and disciplined support hit the right weak point.`;
      G.routeScoutLog.unshift(`${G.location} / ${routeName} / support triage`); G.routeScoutLog=G.routeScoutLog.slice(0,20); maybeStageAdvance();
    }};
  }

  // ── ALIGNMENT & LEGALITY ─────────────────────────────────
  function checkCompanionLeaveConditions(){
    if(!G.companions||!G.companions.length) return;
    const compDefs=window.COMPANION_DEFS||{};
    const leaving=[];
    G.companions=G.companions.filter(comp=>{
      const def=compDefs[comp.id];
      if(!def) return true;
      const evilAligned=(G.alignment&&G.alignment.goodEvil<=-7);
      const chaoticAligned=(G.alignment&&G.alignment.lawfulChaotic<=-7);
      const highHeat=(G.legalityState&&G.legalityState.civicHeat>=8);
      const driftedTrust=(comp.trust||0)<1 && G.dayCount>12 && (comp.joinedDay||0)<G.dayCount-6;
      const conds=def.leaveConditions||[];
      let leave=false;
      if(evilAligned && conds.some(c=>c.includes('morality'))) leave=true;
      if(chaoticAligned && conds.some(c=>c.includes('order'))) leave=true;
      if(highHeat && conds.some(c=>c.includes('heat')||c.includes('legal')||c.includes('order'))) leave=true;
      if(driftedTrust && G.dayCount>15) leave=true;
      if(leave){ leaving.push({comp,def}); return false; }
      return true;
    });
    leaving.forEach(({comp,def},i)=>{
      addNotice(`${comp.name} has left the party.`);
      addJournal('companion',def.leaveScene||`${comp.name} departs without explanation.`,`leave-${comp.id}-${G.dayCount}`);
      markMoment(`${comp.name} left the party`);
      if(i===0) G.lastResult=(def.leaveScene||`${comp.name} departs. The reasons are their own, and the road is emptier for it.`);
    });
  }

  function applyAlignmentShift(moral, civic){
    if(!G.alignment) G.alignment={goodEvil:0,lawfulChaotic:0};
    G.alignment.goodEvil=Math.max(-10,Math.min(10,(G.alignment.goodEvil||0)+moral));
    G.alignment.lawfulChaotic=Math.max(-10,Math.min(10,(G.alignment.lawfulChaotic||0)+civic));
    checkCompanionLeaveConditions();
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
    const enemySurprised=rand(4)===0; // 25% chance enemy surprises player
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
      surprise:enemySurprised?'enemy':null,
      loot:template.loot||{gold:3,item:null},
      resolved:false
    };
    G.recentOutcomeType='combat_start';
    G.encounter=null;
    if(enemySurprised){
      const dmg=Math.max(2,rand(4)+1);
      G.hp=Math.max(1,G.hp-dmg);
      G.lastResult=template.desc+` The ${template.name} catches you off-guard! You take ${dmg} damage before responding. Choose your counter.`;
    } else {
      G.lastResult=template.desc+' Choose your approach.';
    }
    recordCodex('creatures',templateKey,{text:template.desc,weakness:'see field notes'});
    G.telemetry.encounters++;
  }

  function combatSessionChoices(){
    const cs=G.combatSession;
    if(!cs||cs.resolved) return currentNonCombatChoices();
    const arch=getArchetype(G.archetype)||{group:'combat'};
    const group=arch.group||'combat';
    const abilities=((window.ARCHETYPE_COMBAT_ABILITIES||{})[G.archetype]||[]).filter(ab=>(G.skills[ab.skillReq]||0)>=ab.minSkill);
    const choices=[];
    // Primary attack — phrased by archetype group
    const primaryLabels={
      combat:`Press the line — direct assault on ${cs.enemyName}`,
      magic:`Cast — channel force into ${cs.enemyName}`,
      stealth:`Strike from the unseen angle — exploit the gap`,
      support:`Coordinate the confrontation — direct action against ${cs.enemyName}`
    };
    choices.push({label:primaryLabels[group]||primaryLabels.combat,tags:['Combat','Direct'],fn(){
      resolveCombatRound('attack',null,cs);
    }});
    // Magic resource tension: slot tracking
    if(group==='magic'){
      if(!cs.spellSlots) cs.spellSlots=3+Math.floor(G.level/4);
      if(cs.spellSlots>0){
        choices.push({label:`Spend a spell slot — amplified magical assault (${cs.spellSlots} slots left)`,tags:['Magic','Resource'],fn(){
          cs.spellSlots--;
          resolveCombatRound('spell_slot',null,cs);
        }});
      } else {
        choices.push({label:`Spell slots exhausted — improvise a raw magical burst`,tags:['Magic','Desperate'],fn(){
          resolveCombatRound('spell_raw',null,cs);
        }});
      }
    }
    // Stealth: bypass option
    if(group==='stealth'){
      choices.push({label:`Read the engagement — look for a bypass or escape route`,tags:['Stealth','Read'],fn(){
        advanceTime(1); G.skills.stealth=(G.skills.stealth||0)+1;
        const bypassRoll=rollD20('stealth',(G.skills.stealth||0)+Math.floor(G.level/3));
        const success=bypassRoll.isCrit||(bypassRoll.total>=12&&!bypassRoll.isFumble);
        if(success){
          cs.stealthOpenerAvailable=true;
          G.lastResult=`A sightline gap opens. Timing window available — the next strike can come from concealment. Round ${cs.round}.`;
        } else {
          G.lastResult=`The engagement does not give a clean angle. ${cs.enemyName} is too aware. Round ${cs.round}.`;
        }
        setThreat();setObjective();persist();render();
      }});
    }
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
      G.combatSession=null; G.encounter=null;
      G.recentOutcomeType='combat_flee'; advanceTime(1);
      recordConfrontation('avoidedConflicts');
      G.lastResult=`Distance gained from ${cs.enemyName}. The safe zone holds for now.`;
      setThreat();setObjective();persist();render();
    }});
    return choices.slice(0,6);
  }

  function resolveCombatRound(action,abilityId,cs){
    const arch=getArchetype(G.archetype)||{group:'combat'};
    const group=arch.group||'combat';
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
    if(action==='spell_slot'){ attackBonus+=3; specialEffect='Spell Slot'; }
    if(action==='spell_raw'){ attackBonus+=1; defenseBonus-=1; specialEffect='Raw Burst'; }
    const skill=action==='stealth_opener'?'stealth':(group==='magic'&&action!=='attack')?'lore':'combat';
    const compAtk=window.companionBonus?window.companionBonus(G,skill):0;
    const rAtk=rollD20(skill,(G.skills[skill]||0)+Math.floor(G.level/3)+attackBonus+compAtk);
    const playerRoll=rAtk.total;
    const enemyDC=10+cs.enemyDefense+tierBonus;
    const playerHit=rAtk.isCrit||(playerRoll>=enemyDC&&!rAtk.isFumble);
    const enemyRoll=1+rand(20)+cs.enemyAttack;
    const playerDC=10+(G.skills.combat||0)+Math.floor(G.level/3)+defenseBonus;
    const enemyHit=enemyRoll>=playerDC&&cs.enemyHp>0&&!rAtk.isCrit;
    // Archetype-specific hit/miss text
    const hitText={
      combat:`The blow lands with purpose — ${cs.enemyName} takes the weight of it.`,
      magic:`The force connects — ${cs.enemyName} is driven back by the arc.`,
      stealth:`The strike finds the gap — ${cs.enemyName} did not see it coming.`,
      support:`The opening is made — ${cs.enemyName} is exposed to the action.`
    };
    const missText={
      combat:`The line holds — ${cs.enemyName} absorbs the push and answers.`,
      magic:`The casting falls short — the arc disperses before it reaches.`,
      stealth:`The angle closes before the strike can land — ${cs.enemyName} shifts.`,
      support:`The coordination fails — ${cs.enemyName} resets before the opening opens.`
    };
    const log=[];
    if(rAtk.isCrit){
      const dmg=Math.max(6,rand(8)+rand(8)+Math.floor(G.level/2));
      cs.enemyHp=Math.max(0,cs.enemyHp-dmg);
      log.push(`NAT 20. ${rAtk.flavor}`);
      log.push(`Critical — ${dmg} damage. ${cs.enemyName}: ${cs.enemyHp}/${cs.enemyMaxHp} HP.`);
    } else if(rAtk.isFumble){
      const selfDmg=Math.max(1,rand(4));
      G.hp=Math.max(0,G.hp-selfDmg);
      log.push(`NAT 1. ${rAtk.flavor}`);
      log.push(`You take ${selfDmg} from your own fumble. HP: ${G.hp}/${G.maxHp}.`);
    } else if(playerHit){
      const dmg=Math.max(1,rand(8)+Math.floor(G.level/2));
      cs.enemyHp=Math.max(0,cs.enemyHp-dmg);
      log.push(`${hitText[group]||hitText.combat} ${dmg} damage. ${cs.enemyName}: ${cs.enemyHp}/${cs.enemyMaxHp} HP.`);
      if(specialEffect) log.push(`${specialEffect} activates.`);
    } else { log.push(missText[group]||missText.combat); }
    if(enemyHit){ const dmg=Math.max(1,rand(6)+(cs.tier==='boss'?4:cs.tier==='elite'?2:0)); G.hp=Math.max(0,G.hp-dmg); log.push(`${cs.enemyName} answers for ${dmg}. Your HP: ${G.hp}/${G.maxHp}.`); }
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
    const hooks=(window.LOCALITY_HOOKS||{})[G.location]||{};
    const firstContact=hooks.firstContact||null;
    const settlementService={label:firstContact?`Approach ${firstContact} — ${loc.name} services and information`:`Use ${loc.name} services — recover, resupply, or learn`,tags:['Service','Settlement'],fn(){
      advanceTime(1); G.telemetry.turns++; G.telemetry.services++;
      const seed=(G.dayCount+G.worldClocks.pressure)%4;
      const services=[
        `${loc.name}: a local contact names a name that connects two things that should not connect. The shape of the first thread becomes visible.`,
        `Supplies restocked at ${loc.safeZone||loc.name}. Equipment is in better shape. HP recovered: ${Math.min(G.maxHp-G.hp,4)} restored.`,
        `The ${loc.name} notice board surfaces a route warning and a faction move that changes the read on the current pressure.`,
        `A settlement contact in ${loc.name} offers a debt-favor that may matter later. Logged in the journal.`
      ];
      if(seed===1) G.hp=Math.min(G.maxHp,G.hp+4);
      G.lastResult=services[seed];
      addJournal('service',`Used settlement services in ${loc.name}.`,`service-${G.location}-${G.dayCount}`);
      G.recentOutcomeType='observe';
      G.stageProgress[1]++;
      maybeStageAdvance();
    }};
    // Named NPC approach — one interactable NPC per action cycle
    const npcs=currentNamedPlacements(G.location);
    const npc=npcs.length?npcs[G.dayCount%npcs.length]:null;
    const npcApproach=npc?{label:`Approach ${(npc.id||'').replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase())} — ${npc.role}`,tags:['NPC','Persuasion','Observe'],fn(){
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      const r=rollD20('persuasion',(G.skills.persuasion||0)+Math.floor(G.level/3));
      const target=11+G.stage;
      const success=r.isCrit||(r.total>=target&&!r.isFumble);
      G.lastRoll={action:`Approach ${(npc.id||'').replace(/_/g,' ')}`,skill:'persuasion',total:r.total,target,success,die:r.die,crit:r.isCrit,fumble:r.isFumble};
      recordCodex('npcs',npc.id,{name:(npc.id||'').replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase()),role:npc.role,office:npc.office,locality:loc.name});
      if(r.isCrit){ applySuccess(1,'person','persuasion',3,r.flavor); addNotice(`Critical: ${(npc.id||'').replace(/_/g,' ')} gives up something unexpected.`); }
      else if(r.isFumble){ G.lastResult=r.flavor; G.worldClocks.rival++; addNotice(`Fumble: ${(npc.id||'').replace(/_/g,' ')} is now suspicious of your interest.`); }
      else if(success){ applySuccess(1,'person','persuasion',2,`${(npc.id||'').replace(/_/g,' ')} at ${npc.office} provides one piece of actionable intelligence. The approach gives it a specific angle the official record does not show.`); addJournal('npc-contact',`Spoke with ${(npc.id||'').replace(/_/g,' ')} at ${npc.office}.`,`npc-${npc.id}-${G.dayCount}`); }
      else { G.lastResult=`${(npc.id||'').replace(/_/g,' ')} is not available or not willing. The approach did not land.`; G.worldClocks.pressure++; }
      G.recentOutcomeType='observe'; maybeStageAdvance();
    }}:null;
    const rumors=(window.LOCALITY_RUMORS||{})[G.location]||[];
    const rumor=pick(rumors,(G.dayCount+G.worldClocks.pressure)%Math.max(1,rumors.length));
    const sceneStarters=hooks.sceneStarters||[];
    const sceneStarter=pick(sceneStarters,G.dayCount%Math.max(1,sceneStarters.length));
    const rumorChoice=rumor?{label:`Listen for street rumors in ${loc.name}`,tags:['Safe','Persuasion','Observe'],fn(){
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(1,'street intelligence');
      addJournal('information',`Street rumor in ${loc.name}: ${rumor}`,`rumor-${G.location}-${G.dayCount}`);
      G.recentOutcomeType='observe';
      G.lastResult=`${rumor} The contact cannot be traced but the direction is now sharper.`;
      G.stageProgress[1]++;
      maybeStageAdvance();
    }}:null;
    const sceneChoice=sceneStarter?{label:`Enter the situation — ${sceneStarter}`,tags:['Observe','Persuasion'],fn(){
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      const r=rollD20('persuasion',(G.skills.persuasion||0)+Math.floor(G.level/3));
      const target=10+G.stage;
      const success=r.isCrit||(r.total>=target&&!r.isFumble);
      G.lastRoll={action:sceneStarter,skill:'persuasion',total:r.total,target,success,die:r.die,crit:r.isCrit,fumble:r.isFumble};
      if(success){ applySuccess(1,'person','persuasion',2,`The scene — ${sceneStarter} — gives way to something useful. The approach lands on the right person at the right moment.`); addJournal('field-note',`Engaged scene: ${sceneStarter} in ${loc.name}.`,`scene-${G.location}-${G.dayCount}`); }
      else { G.lastResult=`The scene closes before it can be read properly. ${sceneStarter} — nothing actionable came of it.`; G.worldClocks.pressure++; }
      G.recentOutcomeType='observe'; maybeStageAdvance();
    }}:null;
    const arch=getArchetype(G.archetype)||{};
    const combatArchetypes=['warrior','knight','ranger','paladin','archer','berserker','warden','warlord','death_knight'];
    const magicArchetypes=['wizard','cleric','priest','necromancer','illusionist','inquisitor','elementalist','oracle'];
    const stealthArchetypes=['rogue','assassin','spellthief','scout','thief','trickster','beastmaster'];
    const supportArchetypes=['healer','artificer','engineer','tactician','alchemist','saint','bard'];
    
    const choices=[
      {label:`Observe ${loc.name} through ${bg.theme}`,tags:['Safe','Observation'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; gainXp(1,'careful observation'); G.stageProgress[1]++;
        addJournal('field-note',`Observed ${loc.name} through ${bg.theme}.`,`${bg.id}-observe`); G.recentOutcomeType='observe';
        const sopHint=hooks.senseOfPlace?hooks.senseOfPlace.split('.')[0]+'.':'';
        G.lastResult=`${sopHint} A quieter read of ${loc.name} sharpens the first contradiction. The background of ${bg.theme} gives the observation a specific angle the place does not expect.`.trim();
        maybeStageAdvance();
      }},
      classIdentityChoice(),
      ...classInvest,
      settlementService,
      ...objectiveWebChoices(1).slice(0,2),
      moralAxisChoice(),
      civicAxisChoice(),
      {label:'Test the current threat directly',tags:['Risky','CreatureCombat'],fn(){ G.telemetry.actions++; startThreatEncounter('standard'); }},
      {label:'Make camp and recover',tags:['Camp','Rest'],fn(){
        advanceTime(1); G.telemetry.turns++;
        const healed=Math.max(3,Math.floor(G.maxHp*0.25));
        G.hp=Math.min(G.maxHp,G.hp+healed);
        G.fatigue=Math.max(0,G.fatigue-1);
        addJournal('camp',`Rested at ${G.currentSafeZone} in ${loc.name}.`,`camp-${G.dayCount}`);
        G.recentOutcomeType='observe';
        G.lastResult=`${G.currentSafeZone} provides enough shelter to recover before the next move. HP +${healed} (${G.hp}/${G.maxHp}). Party status reviewed and readiness restored.`;
        checkCompanionLeaveConditions();
      }},
      // Class-specific investigation options (4 additional paths)
      combatArchetypes.includes(arch.id)?{label:`Assess ${loc.name} for martial weaknesses — combat readiness review`,tags:['Class','Combat','Investigation'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; gainXp(1,'tactical assessment'); G.stageProgress[1]++;
        G.recentOutcomeType='investigate'; addJournal('investigation',`Combat assessment in ${loc.name}.`,`combat-assess-${G.dayCount}`);
        G.lastResult=`The choke points, sightlines, and defensive positions of ${loc.name} become legible. If force is needed, the angle is now sharper. The first confrontation here would not be entirely unprepared.`;
        maybeStageAdvance();
      }}:null,
      magicArchetypes.includes(arch.id)?{label:`Read the arcane signature of ${loc.name} — ward and seal inventory`,tags:['Class','Magic','Investigation'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; gainXp(1,'arcane reading'); G.stageProgress[1]++;
        G.recentOutcomeType='investigate'; addJournal('investigation',`Arcane inventory in ${loc.name}.`,`magic-read-${G.dayCount}`);
        G.lastResult=`The ward lines, seal placements, and arcane infrastructure of ${loc.name} reveal themselves. The magical pressure is mapped. Any future spell work here would answer to what you now understand.`;
        maybeStageAdvance();
      }}:null,
      stealthArchetypes.includes(arch.id)?{label:`Map the blind angles and entry routes — stealth infrastructure`,tags:['Class','Stealth','Investigation'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; gainXp(1,'covert mapping'); G.stageProgress[1]++;
        G.recentOutcomeType='investigate'; addJournal('investigation',`Stealth routes in ${loc.name}.`,`stealth-map-${G.dayCount}`);
        G.lastResult=`The shadows, sight-lines, and unguarded passages of ${loc.name} become clear. Three routes are now visible that were not obvious before. Discretion, if needed, has a foundation here.`;
        maybeStageAdvance();
      }}:null,
      supportArchetypes.includes(arch.id)?{label:`Document supply lines and support infrastructure — leverage points`,tags:['Class','Support','Investigation'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; gainXp(1,'infrastructure analysis'); G.stageProgress[1]++;
        G.recentOutcomeType='investigate'; addJournal('investigation',`Supply chain in ${loc.name}.`,`support-assess-${G.dayCount}`);
        G.lastResult=`The medical facilities, supply caches, and support networks of ${loc.name} are now documented. Leverage points, recovery resources, and crisis responses are now legible. The place is no longer a mystery.`;
        maybeStageAdvance();
      }}:null,
      // Background-specific situation options
      hooks.backgroundSpecificEvent?{label:`Engage the situation — ${hooks.backgroundSpecificEvent}`,tags:['Background','Specific'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; 
        const r=rollD20(bg.primarySkill||'persuasion',(G.skills[bg.primarySkill||'persuasion']||0)+Math.floor(G.level/3));
        const success=r.isCrit||(r.total>=11&&!r.isFumble);
        if(r.isCrit){ applySuccess(1,'person',bg.primarySkill||'persuasion',2,r.flavor); G.stageProgress[1]++; addJournal('background-event',`Critical engagement: ${hooks.backgroundSpecificEvent}`,`bg-event-crit-${G.dayCount}`); }
        else if(r.isFumble){ G.lastResult=r.flavor; G.worldClocks.rival++; }
        else if(success){ applySuccess(1,'person',bg.primarySkill||'persuasion',1,`${hooks.backgroundSpecificEvent} — the approach connects with something that matters. One line of thread is now visible.`); G.stageProgress[1]++; addJournal('background-event',`Engaged: ${hooks.backgroundSpecificEvent}`,`bg-event-success-${G.dayCount}`); }
        else { G.lastResult=`${hooks.backgroundSpecificEvent} does not resolve as hoped. The moment passes.`; }
        G.recentOutcomeType='observe'; maybeStageAdvance();
      }}:null,
      // Moral and faction branch choices
      {label:'Choose a faction to ally with provisionally — gather support',tags:['Faction','Commitment'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; gainXp(1,'faction contact');
        const factions=(window.LOCALITY_FACTIONS||{})[G.location]||[];
        if(factions.length){
          const faction=factions[G.dayCount%factions.length];
          G.factionAllies[faction]=(G.factionAllies[faction]||0)+1;
          addJournal('faction',`Made preliminary contact with ${faction} in ${loc.name}.`,`faction-${faction}-${G.dayCount}`);
          G.lastResult=`The overture to ${faction} is heard. It is not binding, but it is noted. The first thread of institutional response is now active.`;
        } else {
          G.lastResult=`The locality has no clear institutional factions to approach. The pressure here is less organized than expected.`;
        }
        G.stageProgress[1]++;
        G.recentOutcomeType='observe'; maybeStageAdvance();
      }},
      {label:'Investigate the contradiction between official and street narratives',tags:['Investigation','Contradiction'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; gainXp(1,'narrative analysis'); G.stageProgress[1]++;
        const official=hooks.officialLine||`the official story of ${loc.name}`;
        const street=hooks.streetNarrative||`what the street says about itself`;
        G.lastResult=`The contradiction between ${official} and what the street actually knows is now clear. The gap is wide enough to move through. The pressure originates in that gap.`;
        addJournal('contradiction',`Found the gap between official and street narrative in ${loc.name}.`,`contradiction-${G.dayCount}`);
        G.recentOutcomeType='investigate'; maybeStageAdvance();
      }},
      {label:'Test the legal structure — how far can you push before response comes?',tags:['Risk','Legal'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; 
        const r=rollD20('persuasion',(G.skills.persuasion||0)+Math.floor(G.level/3));
        const success=r.isCrit||(r.total>=12&&!r.isFumble);
        if(r.isCrit){ applySuccess(1,'person','persuasion',2,r.flavor); G.legalityMax=Math.max(G.legalityMax||3,5); G.stageProgress[1]++; addNotice('Critical: Legal boundaries mapped.'); }
        else if(success){ applySuccess(1,'person','persuasion',1,'The legal boundaries of this place are now readable. There is room to maneuver.'); G.legalityMax=Math.max(G.legalityMax||2,4); G.stageProgress[1]++; }
        else { G.lastResult=`The legal boundaries of ${loc.name} are tighter than expected. The immediate response was swift. Adjust expectations.`; G.worldClocks.pressure++; applyLegalityShift(1); }
        G.recentOutcomeType='investigate'; maybeStageAdvance();
      }}
    ];
    if(sceneChoice) choices.splice(1,0,sceneChoice);
    if(rumorChoice) choices.splice(2,0,rumorChoice);
    if(npcApproach) choices.splice(4,0,npcApproach);
    if(recruit) choices.splice(3,0,recruit);
    return choices.filter(c=>c!==null).slice(0,32);
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
    const arch=getArchetype(G.archetype)||{};
    const rivalResponse=[
      {label:'Make a show of force against the rival faction',tags:['Rival','Confrontation','Risky'],fn(){ advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; const r=rollD20('combat',(G.skills.combat||0)+Math.floor(G.level/3)); const success=r.isCrit||(r.total>=13&&!r.isFumble); if(r.isCrit){ G.worldClocks.rival=Math.max(0,G.worldClocks.rival-2); G.lastResult=r.flavor+` The rival faction backs down — at least for now. The pressure eases.`; addNotice('Critical rival confrontation success.'); } else if(success){ G.worldClocks.rival=Math.max(0,G.worldClocks.rival-1); G.lastResult=`The show of force holds. The rival faction is slowed but not stopped.`; } else { G.worldClocks.rival+=2; G.lastResult=`The confrontation escalates. The rival faction sees this as declaration. Expect faster responses now.`; startThreatEncounter('standard'); } maybeStageAdvance(); }},
      {label:'Meet with rival faction intermediaries to negotiate terms',tags:['Rival','Negotiation','Persuasion'],fn(){ advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; const r=rollD20('persuasion',(G.skills.persuasion||0)+Math.floor(G.level/3)); const success=r.isCrit||(r.total>=12&&!r.isFumble); if(r.isCrit){ G.worldClocks.rival=Math.max(0,G.worldClocks.rival-3); G.rivalNegotiation=true; G.lastResult=r.flavor+` A temporary understanding forms. The rivalry does not vanish but it transforms into something negotiable.`; addNotice('Critical negotiation — truce established.'); } else if(success){ G.worldClocks.rival=Math.max(0,G.worldClocks.rival-1); G.lastResult=`The negotiation finds one point of common ground. It is not peace but it is not escalation.`; } else { G.worldClocks.rival++; G.lastResult=`The intermediaries listen but commit to nothing. The rivalry continues.`; } maybeStageAdvance(); }}
    ];
    return [
      ...bgChoices.slice(0,2),
      ...destinationChoices.slice(0,2),
      ...objectiveWebChoices(2).slice(0,2),
      classRoute,
      ...travel.slice(0,1),
      ...scouting.slice(0,1),
      moralAxis_GoodChoice(),
      civicAxis_ChaoticChoice(),
      {label:'Use the current safe zone for leverage',tags:['Camp','Rest','Leverage'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; G.telemetry.services++;
        const healed=Math.max(2,Math.floor(G.maxHp*0.2));
        G.hp=Math.min(G.maxHp,G.hp+healed);
        G.fatigue=Math.max(0,G.fatigue-1);
        gainXp(1,'safe zone rest');
        addJournal('camp',`Rested at ${G.currentSafeZone} between route pushes.`,`safe-zone-${G.dayCount}`);
        G.recentOutcomeType='observe';
        G.lastResult=`${G.currentSafeZone} is used for recovery before the next push. HP +${healed} (${G.hp}/${G.maxHp}). The route holds position while the body stabilizes.`;
        checkCompanionLeaveConditions();
      }},
      {label:'Call on a settlement service before pushing further',tags:['Service','Adjacent'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.services++;
        const locPois=(window.SETTLEMENT_POIS||{})[G.location]||{};
        const infoPoi=locPois.info;
        if(infoPoi){
          gainXp(1,'settlement intelligence');
          addJournal('information',`${infoPoi.name}: ${infoPoi.text}`,`${G.location}-info-s2-${G.dayCount}`);
          G.lastResult=`${infoPoi.name} surfaces something actionable before the route push continues. The intelligence is narrow but the direction it points is not.`;
        } else {
          gainXp(1,'settlement contact');
          G.lastResult=`The settlement provides what support it can before the route opens again.`;
        }
        G.serviceLog.unshift(`Settlement intelligence at ${getLocality(G.location).name}`);
        G.serviceLog=G.serviceLog.slice(0,20);
        G.recentOutcomeType='observe';
      }},
      // Stage 2 rival handling
      G.worldClocks.rival>=3?rivalResponse[0]:null,
      G.worldClocks.rival>=4?rivalResponse[1]:null,
      // Route intelligence branching
      {label:'Analyze the route pattern for hidden vulnerabilities',tags:['Route','Analysis','Stealth'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; gainXp(1,'route analysis');
        G.lastResult=`The route pattern is legible now. There are three pressure points where institutional response is weakest. The vulnerability is subtle but solid.`;
        G.stageProgress[2]++;
        addJournal('route-intel',`Identified route vulnerabilities near ${getLocality(G.location).name}.`,`route-vuln-${G.dayCount}`);
        maybeStageAdvance();
      }},
      // Destination choice branching
      adj.length>0?{label:`Travel directly to the highest-risk destination and confront it immediately`,tags:['Travel','Risk','Confrontation'],fn(){
        const riskDest=adj[Math.floor(Math.random()*adj.length)];
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
        const r=rollD20('combat',(G.skills.combat||0)+Math.floor(G.level/3));
        const success=r.isCrit||(r.total>=13&&!r.isFumble);
        if(r.isCrit){ applySuccess(2,'combat','combat',3,r.flavor); travelTo(riskDest); G.stage2DestinationsSeen[riskDest]=true; G.stageProgress[2]++; addNotice('Critical confrontation at destination.'); }
        else if(success){ applySuccess(2,'combat','combat',2,`The high-risk destination is engaged directly. The confrontation is sharp and the outcome is clear.`); travelTo(riskDest); G.stage2DestinationsSeen[riskDest]=true; G.stageProgress[2]++; }
        else { G.lastResult=`The direct approach at ${getLocality(riskDest).name} does not hold. The destination is more resistant than expected.`; G.worldClocks.rival++; startThreatEncounter('standard'); }
        maybeStageAdvance();
      }}:null,
      // Faction pressure choices for Stage 2
      {label:'Report findings to the primary faction — build institutional alliance',tags:['Faction','Alliance','Report'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; gainXp(1,'faction leverage');
        const primaryFaction=(window.CAMPAIGN_FACTIONS||[])[0]||'primary faction';
        G.factionAllies[primaryFaction]=(G.factionAllies[primaryFaction]||0)+2;
        G.lastResult=`The findings reach the institutional level. ${primaryFaction} now sees you as a regional variable, not a local actor. The institutional response shifts.`;
        G.stageProgress[2]++;
        addJournal('faction-report',`Reported findings to ${primaryFaction}.`,`faction-report-${G.dayCount}`);
        maybeStageAdvance();
      }},
      {label:'Investigate what the institutions are hiding about the real pressure source',tags:['Investigation','Institutional','Risk'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; 
        const r=rollD20('lore',(G.skills.lore||0)+Math.floor(G.level/3));
        const success=r.isCrit||(r.total>=13&&!r.isFumble);
        if(r.isCrit){ applySuccess(2,'lore','lore',3,r.flavor); G.stageProgress[2]++; G.hiddenThruthFound=true; addNotice('Critical discovery — hidden truth revealed.'); }
        else if(success){ G.stageProgress[2]++; G.lastResult=`The institutional obfuscation is now clear. Something bigger is being hidden. The real pressure is not what is being shown.`; }
        else { G.worldClocks.pressure++; G.lastResult=`The investigation touches something institutional that does not want to be touched. The pressure response is immediate and severe.`; startThreatEncounter('standard'); }
        maybeStageAdvance();
      }}
    ].filter(c=>c!==null).slice(0,42);
  }

  function campChoices(state){
    const loc=getLocality(state.location);
    const choices=[
      {label:`Rest at ${state.currentSafeZone} and recover`,tags:['Rest','HP'],fn(){ advanceTime(1); state.hp=Math.min(state.maxHp,state.hp+Math.max(3,Math.floor(state.maxHp*0.3))); state.fatigue=Math.max(0,state.fatigue-1); state.lastResult=`${state.currentSafeZone} steadies the body. HP: ${Math.min(state.maxHp,state.hp)} / ${state.maxHp}. The next move starts from a better place.`; addJournal('camp',`Rested at ${state.currentSafeZone}.`,`camp-rest-${state.dayCount}`); }},
      {label:`Review the field notes and sharpen the approach`,tags:['Reflect','Lore'],fn(){
        advanceTime(1); gainXp(1,'careful reflection');
        const hks=(window.LOCALITY_HOOKS||{})[state.location]||{};
        const dl=hks.dailyLife||'';
        const cs=(hks.conflictSurfaces||[])[0]||'';
        let reflectResult='The journal yields one pattern that was not visible in motion.';
        if(dl) reflectResult=`Reading the field notes against the local rhythm — ${dl.split('.')[0].toLowerCase()} — one thing does not fit the pattern. The contradiction was there the whole time.`;
        if(cs) reflectResult+=` The surface tension around ${cs} is the most legible angle.`;
        state.lastResult=reflectResult;
        addJournal('camp','Reviewed field notes and updated the approach.',`camp-reflect-${state.dayCount}`);
      }},
      {label:`Scout the immediate area around ${loc.name}`,tags:['Scout','Survival'],fn(){ advanceTime(1); state.telemetry.scouts++; state.skills.survival=(state.skills.survival||0)+1; const t=chooseThreat(); state.currentThreat=t; state.lastResult=`The perimeter of ${loc.name} gives up one useful detail about what is moving and what is holding still.`; }},
      {label:`Maintain equipment and prepare for the next push`,tags:['Craft','Prep'],fn(){ advanceTime(1); state.skills.craft=(state.skills.craft||0)+1; gainXp(1,'field maintenance'); state.lastResult=`Gear is clean, edges are sound, and the next move starts with better tools than the last one.`; }}
    ];
    // Companion camp talk — surface one line per active companion
    if(state.companions && state.companions.length){
      const compDefs=window.COMPANION_DEFS||{};
      choices.push({label:'Speak with the party around the fire',tags:['Camp','Party'],fn(){
        advanceTime(1);
        const underPressure=state.worldClocks.rival>=5||state.hp<state.maxHp*0.4||state.wounds.length>=2;
        const hks=(window.LOCALITY_HOOKS||{})[state.location]||{};
        const lines=state.companions.filter(c=>!c.injured && c.available!==false).map(c=>{
          const def=compDefs[c.id];
          if(!def||!def.campLines) return `${c.name} sits quietly.`;
          const idx=(c.campLineIdx||0)%def.campLines.length;
          c.campLineIdx=(c.campLineIdx||0)+1;
          return `${c.name}: "${def.campLines[idx]}"`;
        });
        const injuredLines=state.companions.filter(c=>c.injured||c.available===false).map(c=>{
          const def=compDefs[c.id];
          return `${c.name}: ${def&&def.injuredText ? def.injuredText : 'Injured — resting.'}`;
        });
        let baseResult=[...lines,...injuredLines].join(' — ') || 'The fire burns low. Nothing needs to be said tonight.';
        if(underPressure){
          const tensionSuffix=state.wounds.length>=2?` The wounds are visible. Nobody says anything directly about what comes next, but nobody pretends the odds are the same as they were.`:state.worldClocks.rival>=5?` The rival clock moving at ${state.worldClocks.rival} is not something you can hide around a fire. Everyone has been reading the same signs.`:` Nobody is performing confidence tonight. The fire helps. It does not solve anything.`;
          baseResult+=tensionSuffix;
        } else if(hks.senseOfPlace){
          baseResult+=` ${hks.senseOfPlace.split('.')[0]}. The camp holds its own quiet against that backdrop.`;
        }
        state.lastResult=baseResult;
        addJournal('camp','Spoke with companions around the fire.',`camp-talk-${state.dayCount}`);
        state.companions.forEach(c=>{ if(!c.injured) c.trust=(c.trust||0)+1; });
        markMoment(`Camp talk at ${loc.name}`);
        checkCompanionLeaveConditions();
      }});
      // Injured companion recovery — field tending
      const injuredComps=state.companions.filter(c=>c.injured||c.available===false);
      if(injuredComps.length){
        const comp=injuredComps[0];
        choices.push({label:`Tend to ${comp.name} — field recovery`,tags:['Camp','Recovery','Craft'],fn(){
          advanceTime(1);
          const r=rollD20('craft',(state.skills.craft||0)+Math.floor(state.level/3));
          const healed=r.isCrit||(r.total>=10&&!r.isFumble);
          if(healed){
            comp.injured=false; comp.available=true;
            state.hp=Math.min(state.maxHp,state.hp+2);
            state.lastResult=`${comp.name} is stabilized and mobile again. Field recovery held. The party is whole.`;
            addJournal('camp',`${comp.name} recovered from injury at ${loc.name}.`,`recovery-${comp.id}-${state.dayCount}`);
            addNotice(`${comp.name} has recovered from injury.`);
          } else if(r.isFumble){
            state.lastResult=`${r.flavor} The attempt to help ${comp.name} goes badly. They are no worse physically, but the intervention cost time and confidence.`;
          } else {
            state.lastResult=`${comp.name}'s condition is improving but they are not ready to move. Another rest may complete it.`;
          }
        }});
      }
    }
    return choices;
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
      {label:`Force through the hazard directly`,tags:['Direct','Power'],fn(){ resolve('combat','direct push',enc.tier==='boss'?4:2,'The hazard breaks under direct force.','The direct approach costs something.'); if(state.hp<=0&&!state.stage5Dead) handleDeath(); else{setThreat();setObjective();persist();render();} }},
      {label:`Find the weakness and work the hazard precisely`,tags:['Precision','Careful'],fn(){ resolve('stealth','precision approach',enc.tier==='boss'?3:2,'The weak point opens and the hazard unravels.','The precision read fails under pressure.'); if(state.hp<=0&&!state.stage5Dead) handleDeath(); else{setThreat();setObjective();persist();render();} }},
      {label:`Apply knowledge and read the hazard structure`,tags:['Lore','Read'],fn(){ resolve('lore','analytical approach',enc.tier==='boss'?3:2,'The hazard logic becomes legible and the answer follows.','The analytical read produces theory without enough time.'); if(state.hp<=0&&!state.stage5Dead) handleDeath(); else{setThreat();setObjective();persist();render();} }},
      {label:`Withdraw and regroup at the safe zone`,tags:['Retreat','Safe'],fn(){ state.encounter=null; advanceTime(1); state.hp=Math.max(1,state.hp); state.lastResult=`The hazard is left behind. The safe zone holds for now.`; setThreat();setObjective();persist();render(); }}
    ];
  }

  function stage3to5Choices(stage){ 
    const arch=getArchetype(G.archetype)||{}; 
    const isStealthArchetype=['rogue','assassin','spellthief','scout','thief','trickster','beastmaster','illusionist','archer'].includes(arch.id);
    const arr=objectiveWebChoices(stage).slice(0,5); 
    
    // Institution-specific branching paths for Stage 3+
    const institutionChoice={label:'Pursue the institutional angle — investigate formal channels',tags:['Institutional','Investigation','Politics'],fn(){
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; 
      const r=rollD20('lore',(G.skills.lore||0)+Math.floor(G.level/3));
      const success=r.isCrit||(r.total>=14&&!r.isFumble);
      if(r.isCrit){ applySuccess(stage,'lore','lore',4,r.flavor); G.stageProgress[stage]++; G.institutionalLead=true; addNotice('Critical institutional discovery.'); }
      else if(success){ G.stageProgress[stage]++; G.lastResult=`The formal channels reveal a clear institutional responsibility. The pressure originates in deliberate policy.`; }
      else { G.worldClocks.pressure++; G.lastResult=`The institutional inquiry is noticed. Resources move against you now.`; startThreatEncounter('standard'); }
      maybeStageAdvance();
    }};
    
    // Rival confrontation path
    const rivalChoice={label:'Confront the rival faction directly — attempt final negotiation or combat',tags:['Rival','Final','Confrontation'],fn(){
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      const r=rollD20('persuasion',(G.skills.persuasion||0)+Math.floor(G.level/3));
      const success=r.isCrit||(r.total>=15&&!r.isFumble);
      if(r.isCrit){ G.worldClocks.rival=0; G.rivalResolved=true; G.stageProgress[stage]++; G.lastResult=r.flavor+` The rival faction stands down. The institutional pressure shifts.`; addNotice('Rival faction eliminated.'); }
      else if(success){ G.worldClocks.rival=Math.max(0,G.worldClocks.rival-2); G.stageProgress[stage]++; G.lastResult=`The confrontation holds. The rival faction is damaged and will not pursue aggressively.`; }
      else { G.worldClocks.rival+=3; G.lastResult=`The confrontation escalates to active hostility. The rival faction commits all remaining resources.`; startThreatEncounter('standard'); }
      maybeStageAdvance();
    }};
    
    // Moral reckoning choices
    const mercyChoice=stage===5?{label:'Offer mercy to the final pressure source — redemption path',tags:['Moral','Mercy','Final'],fn(){
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; G.stageProgress[stage]++;
      G.endingPath='mercy'; G.lastResult=`The choice to offer mercy echoes through the institution. Not everyone accepts it, but the pressure recedes. The campaign closes with the question left open.`;
      addJournal('ending','Chose mercy over final confrontation.',`ending-mercy-${G.dayCount}`);
      maybeStageAdvance();
    }}:{label:`Attempt a merciful intervention in the ${stage===3?'local':'regional'} pressure dynamics`,tags:['Moral','Mercy','Resolution'],fn(){
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; G.stageProgress[stage]++;
      G.lastResult=`The merciful path yields unexpected results. Institutional actors respond with caution — not hostility. The pressure does not vanish but it transforms.`;
      addJournal('mercy-intervention',`Attempted merciful intervention at stage ${stage}.`,`mercy-${G.dayCount}`);
      maybeStageAdvance();
    }};
    
    // Add institutional choices
    arr.push(institutionChoice);
    arr.push(rivalChoice);
    arr.push(mercyChoice);
    
    // Stage-specific options
    if(stage===3){
      arr.push({label:'Expand the grassroots network into three adjacent regions',tags:['Expansion','Regional','Strategy'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; G.stageProgress[3]++;
        G.networkExpanded=true; G.lastResult=`The network spreads across three adjacent regions. What started local is now structurally regional.`;
        addJournal('network','Expanded grassroots network to three regions.',`network-expansion-${G.dayCount}`);
        maybeStageAdvance();
      }});
      arr.push({label:'Consolidate knowledge from all visited localities — create integrated map',tags:['Knowledge','Consolidation','Research'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; G.stageProgress[3]++;
        const locCount=Object.keys(G.stage2DestinationsSeen||{}).length;
        G.lastResult=`The knowledge from ${locCount} localities integrates into one coherent picture. The pressure pattern is now fully visible at the regional scale.`;
        addJournal('analysis','Integrated all locality knowledge.',`integration-${G.dayCount}`);
        maybeStageAdvance();
      }});
    }
    else if(stage===4){
      arr.push({label:'Infiltrate a key institutional facility — high-risk intelligence operation',tags:['Infiltration','Risk','Intelligence'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; 
        const r=rollD20('stealth',(G.skills.stealth||0)+Math.floor(G.level/3));
        const success=r.isCrit||(r.total>=15&&!r.isFumble);
        if(r.isCrit){ applySuccess(4,'stealth','stealth',4,r.flavor); G.stageProgress[4]+=2; G.lastResult=`The infiltration succeeds beyond expectation. The facility's core intelligence is now accessible.`; addNotice('Critical infiltration — complete success.'); }
        else if(success){ applySuccess(4,'stealth','stealth',2,`The infiltration succeeds. Critical documents and communications are now visible.`); G.stageProgress[4]++; }
        else { G.lastResult=`The infiltration is discovered. Alarms sound. This facility now knows you by name.`; startThreatEncounter('standard'); }
        maybeStageAdvance();
      }});
      arr.push({label:'Orchestrate a national-scale pressure response — mobilize all resources',tags:['Mobilization','National','Strategy'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; G.stageProgress[4]++;
        G.nationalMobilization=true; G.lastResult=`All resources are mobilized for one final push. The institutional response will be complete or this fails entirely.`;
        addJournal('strategy','Mobilized all resources for national response.',`mobilization-${G.dayCount}`);
        maybeStageAdvance();
      }});
    }
    else if(stage===5){
      // Stage 5 gets special handling with more combat encounters
      arr.push({label:'Commit to the final institutional confrontation',tags:['CreatureCombat','Boss','Final','Institutional'],fn(){ beginEncounter(G,'creature',G.currentThreat.creature,'boss'); }});
      arr.push({label:'Trigger the climactic hazard that anchors the entire pressure system',tags:['Boss','Final','Hazard'],fn(){ beginEncounter(G,'hazard',G.currentThreat.hazard,'boss'); }});
      arr.push({label:'Execute a coordinated three-pronged attack on institutional strongpoints',tags:['CreatureCombat','Multi-Target','Elite','Final'],fn(){ G.multiTargetCombat=true; startCreatureEncounter('elite'); }});
      arr.push({label:'Unleash a devastating strike on the rival faction leadership',tags:['CreatureCombat','Elite','Rival','Final'],fn(){ startCreatureEncounter('elite'); }});
      if(isStealthArchetype){
        arr.push({label:'Set an assassination trap for the final institutional head',tags:['Assassination','Elite','Final'],fn(){ startSurpriseAttack('assassination'); }});
        arr.push({label:'Execute a precision strike on the pressure source core',tags:['Assassination','Surgical','Final'],fn(){ startSurpriseAttack('ambush'); }});
      }
      // Additional Stage 5 moral/resolution choices
      arr.push({label:'Attempt one final negotiation with institutional authority before violence',tags:['Negotiation','Persuasion','Final'],fn(){
        advanceTime(1); G.telemetry.turns++; G.telemetry.actions++; 
        const r=rollD20('persuasion',(G.skills.persuasion||0)+Math.floor(G.level/3)+3);
        const success=r.isCrit||(r.total>=16&&!r.isFumble);
        if(r.isCrit){ G.endingPath='negotiated'; G.stageProgress[5]++; G.lastResult=r.flavor+` A path to resolution without total violence becomes visible. The institutional pressure transforms.`; addNotice('Critical negotiation — peaceful resolution possible.'); }
        else if(success){ G.stageProgress[5]++; G.lastResult=`The negotiation opens a crack. It is not acceptance but it is not war.`; }
        else { G.lastResult=`The institutional authority refuses negotiation. The final path is now violence only.`; startThreatEncounter('standard'); }
        maybeStageAdvance();
      }});
    }
    
    return arr.slice(0,stage===5?22:stage===4?16:16).concat((stage===5?[
      {label:'Prepare defenses against multiple incoming institutional strike teams',tags:['CreatureCombat','Defense','Multi-Enemy','Tactical'],fn(){ startCreatureEncounter('elite'); }},
      {label:'Attempt to disrupt the institutional command structure mid-strike',tags:['CreatureCombat','Sabotage','Tactical'],fn(){ startCreatureEncounter('elite'); }},
      {label:'Coordinate a counter-offensive with all gathered allies',tags:['CreatureCombat','Coordination','Allied','Tactical'],fn(){ startCreatureEncounter('elite'); }},
      {label:'Fall back to prepared strongpoint and force the final confrontation on better ground',tags:['CreatureCombat','Position','Tactical'],fn(){ startCreatureEncounter('elite'); }},
      {label:'Launch a surprise assault on the institutional decision-makers directly',tags:['CreatureCombat','Strike','Tactical','Assassination'],fn(){ startCreatureEncounter('elite'); }},
      {label:'Establish a siege on the institutional center — force surrender through attrition',tags:['CreatureCombat','Siege','Tactical','Strategy'],fn(){ startCreatureEncounter('elite'); }},
      {label:'Execute emergency evacuation and defensive fortification of the power base',tags:['CreatureCombat','Defense','Tactical'],fn(){ startCreatureEncounter('elite'); }},
      {label:'Summon or activate final institutional ally resources for coordinated strike',tags:['CreatureCombat','Allied','Tactical'],fn(){ startCreatureEncounter('elite'); }},
      {label:'Make a psychological break with institutional authority — declare total independence',tags:['CreatureCombat','Rupture','Tactical','Declaration'],fn(){ startCreatureEncounter('elite'); }},
      {label:'Activate the failsafe mechanism that destabilizes the entire institutional system',tags:['CreatureCombat','Destabilize','Nuclear','Tactical'],fn(){ startCreatureEncounter('elite'); }},
      {label:'Coordinate with covert allies for simultaneous institutional takedowns nationwide',tags:['CreatureCombat','Coordinated','National','Tactical'],fn(){ startCreatureEncounter('elite'); }},
      {label:'Execute final mercy option — spare the institution but cripple its core authority',tags:['Mercy','CreatureCombat','Tactical','Resolution'],fn(){ startCreatureEncounter('elite'); }}
    ]:[]).slice(0,12)).filter(c=>c!==null); 
  }
  function maybeStageAdvance(){
    if(G.stage===1 && G.stageProgress[1]>=4 && G.level>=5){
      G.stage=2; updateStage();
      const sig=routeSignature(); const originLoc=getLocality(sig.originLocality)||getLocality(G.location);
      const adj=(window.ADJACENCY[G.location]||[]).map(id=>getLocality(id)?.name).filter(Boolean).slice(0,2).join(' and ');
      G.lastResult=`The grassroots work in ${originLoc.name} has uncovered the shape of something wider. The pressure does not stop at the locality boundary — it extends into ${adj||'the adjacent region'}. Stage II: what was local is now regional, and the choices carry further consequence.`;
      addNotice('Stage II unlocked. The route opens into adjacent terrain. New choices reflect wider stakes.');
      markMoment(`Stage II entered — pressure widening from ${originLoc.name}`);
      addJournal('stage','Stage I work complete. The adjacent route opens and the pressure reveals its regional shape.',`stage2-unlock-${G.dayCount}`);
    }
    if(G.stage===2 && G.stageProgress[2]>=4 && G.level>=9){
      G.stage=3; updateStage();
      const sig2=routeSignature(); const originLoc2=getLocality(sig2.originLocality)||getLocality(G.location);
      const routeName2=window.ROUTE_NAMES&&sig2.stage2Vector?window.ROUTE_NAMES[sig2.stage2Vector]:'the widening route';
      const fam2=familyTitleForStage2(sig2);
      const destCount=Object.keys(G.stage2DestinationsSeen||{}).length;
      G.lastResult=`The regional work is done. ${originLoc2.name} is no longer the edge of the problem — it is its recognized center, and the recognition travels. ${routeName2} has carried names and pressures outward into ${destCount>0?`${destCount} adjacent localities that now register this run as a regional variable`:'territory that has registered the weight of this work'}. The faction pressure of ${fam2} no longer sees a local actor. Stage III: the stakes are national. The route does not widen from here — it deepens into systems that answer to institutional authority, and those institutions have already heard your name.`;
      addNotice('Stage III begins. The regional widening is complete. National-scale pressure and institution-level opposition are now active.');
      markMoment(`Stage III entered — national stakes open from ${originLoc2.name}`);
      addJournal('stage',`Stage II route work resolved. ${routeName2} pressure widened across region. National consequences now active.`,`stage3-unlock-${G.dayCount}`);
      checkCompanionLeaveConditions();
    }
    if(G.stage===3 && G.familyMilestones.stage3>=3 && G.level>=13){ G.stage=4; updateStage(); addNotice('Stage IV begins. Your name now changes what institutions dare.'); markMoment('Stage IV began'); }
    if(G.stage===4 && G.familyMilestones.stage4>=3 && G.level>=17){ G.stage=5; updateStage(); addNotice('Stage V begins. Death is now final.'); markMoment('Stage V began'); }
    setObjective();
  }

  function currentNonCombatChoices(){ if(G.stage===1) return stage1Choices(); if(G.stage===2) return stage2Choices(); if(G.stage===3) return stage3to5Choices(3); if(G.stage===4) return stage3to5Choices(4); return stage3to5Choices(5); }
  function currentChoices(){
    if(G.postCombatResolution&&!G.postCombatResolution.resolved) return postCombatResolutionChoices();
    if(G.combatSession&&!G.combatSession.resolved) return combatSessionChoices();
    if(G.encounter) return encounterChoices(G);
    return currentNonCombatChoices();
  }
  function startThreatEncounter(tier){ const threat=G.currentThreat||chooseThreat(); if(!threat) return; const kind=rand(2)===0?'creature':'hazard'; const name=kind==='creature'?threat.creature:threat.hazard; G.telemetry.encounters++; beginEncounter(G,kind,name,tier||'standard'); }

  function startCreatureEncounter(tier){ const threat=G.currentThreat||chooseThreat(); if(!threat) return; const name=threat.creature; G.telemetry.encounters++; beginEncounter(G,'creature',name,tier||'standard'); }

  function startSurpriseAttack(attackType){ const threat=G.currentThreat||chooseThreat(); if(!threat) return; const name=threat.creature; G.telemetry.encounters++; beginEncounter(G,'creature',name,'standard'); if(G.combatSession) G.combatSession.surprise=attackType; }

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
    const formulaDisplay = r.die && r.total ? `<span class='pill formula'>${r.die} + ${r.total-r.die} = ${r.total}</span>` : '';
    return `<div class='chosenLabel'>You Chose</div><div class='chosenAction'>${r.action}</div><div class='rollRow'>${dieDisplay}<span class='pill ${cls}'>${icon} ${r.total} vs ${r.target}</span><span class='pill warn'>${r.skill}</span>${r.success?`<span class='pill good'>Success</span>`:`<span class='pill bad'>Failure</span>`}${critBadge}${formulaDisplay}</div><div class='resultDivider'></div><div id='result'>${resultNarrative(G.lastResult)}</div>${combatLog}${postCombatNote}`;
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
    const activeQuests=(G.quests||[]).filter(q=>q.status==='Active');
    const questsHtml=activeQuests.length?`<div class='card'><div class='sectionTitle'>Active Threads</div>${activeQuests.map(q=>`<div style='font-size:12px;padding:3px 0;border-bottom:1px solid #2a1f0f;color:#c9b99b'>· ${q.title}</div>`).join('')}</div>`:'';
    const momentsHtml=G.keyMoments&&G.keyMoments.length?`<div class='card'><div class='sectionTitle'>Key Moments</div>${G.keyMoments.slice(0,8).map(m=>`<div style='font-size:12px;padding:2px 0;border-bottom:1px solid #2a1f0f'>· ${m}</div>`).join('')}</div>`:'';
    const journalHtml=journalLines();
    const legendsHtml=G.legends&&G.legends.length?legendLines():'';
    const rescueHtml=G.rescueLog&&G.rescueLog.length?`<div class='card'><div class='sectionTitle'>Rescue Record</div>${G.rescueLog.slice(0,4).map(r=>`<div style='font-size:12px;padding:2px 0'>${r}</div>`).join('')}</div>`:'';
    $('journalPanel').innerHTML=questsHtml+noticesHtml+momentsHtml+journalHtml+rescueHtml+legendsHtml;
  }

  // ── STORY PANEL ──────────────────────────────────────────
  function renderStoryPanel(){
    const loc=getLocality(G.location)||{name:'?',summary:'',pressures:[],creatures:[],hazards:[]};
    const hooks=(window.LOCALITY_HOOKS||{})[G.location]||{};
    const rumors=(window.LOCALITY_RUMORS||{})[G.location]||[];
    const activeQuests=(G.quests||[]).filter(q=>q.status==='Active');
    const thread=activeQuests[0]||null;
    const threat=G.currentThreat||{};
    const latestNotice=G.notices&&G.notices[0]||null;
    const clocks=G.worldClocks||{pressure:0,rival:0,omens:0};
    const pressure=pick(loc.pressures,clocks.pressure)||'none surfaced';

    const sop=hooks.senseOfPlace||loc.summary||'An uncertain place.';
    const locCard=`<div class='card'><div class='sectionTitle'>${loc.name}</div><div style='font-size:13px;line-height:1.5'>${sop}</div>${G.currentSafeZone?`<div style='margin-top:5px;font-size:11px;color:#8a7a5a'>Safe zone: ${G.currentSafeZone}</div>`:''}</div>`;

    const threadCard=thread?`<div class='card'><div class='sectionTitle'>Active Thread</div><div style='font-size:13px;color:#c9b99b;line-height:1.5'>${thread.title}</div></div>`:'';

    const cs=(hooks.conflictSurfaces||[]).slice(0,2);
    const pressureCard=`<div class='card'><div class='sectionTitle'>Active Pressure</div><div style='font-size:12px;color:#c9b99b'>${pressure}</div>${cs.length?`<div style='margin-top:4px;font-size:11px;color:#7a6a4a'>${cs.join(' · ')}</div>`:''}<div style='margin-top:4px;font-size:11px;color:#5a4a2a'>Pressure ${clocks.pressure} · Rival ${clocks.rival}</div></div>`;

    const threatCard=(threat.creature||threat.hazard)?`<div class='card'><div class='sectionTitle'>Threat</div>${threat.creature?`<div style='font-size:12px'>Creature: <b>${(threat.creature||'').replace(/_/g,' ')}</b></div>`:''}${threat.hazard?`<div style='font-size:12px'>Hazard: <b>${(threat.hazard||'').replace(/_/g,' ')}</b></div>`:''}</div>`:'';

    const noticeCard=latestNotice?`<div class='card'><div class='sectionTitle'>Latest Notice</div><div style='font-size:12px;color:#c9b99b;line-height:1.5'>${latestNotice}</div></div>`:'';

    const rumorCard=rumors.length?`<div class='card'><div class='sectionTitle'>Street Rumor</div><div style='font-size:12px;color:#c9b99b;font-style:italic;line-height:1.5'>${pick(rumors,clocks.pressure+G.dayCount)}</div></div>`:'';

    $('storyPanel').innerHTML=locCard+threadCard+pressureCard+threatCard+noticeCard+rumorCard;
  }

  // ── ARCH PREVIEW ─────────────────────────────────────────
  function updateArchPreview(){
    const archSel=$('archSelect'); const bgSel=$('bgSelect'); const el=$('archPreview');
    if(!archSel||!bgSel||!el) return;
    const arch=getArchetype(archSel.value);
    const bg=(window.BACKGROUNDS[archSel.value]||[]).find(b=>b.id===bgSel.value);
    if(!arch||!bg){ el.textContent='Select an archetype and background to preview your starting identity.'; return; }
    const loc=getLocality(bg.originLocality);
    el.innerHTML=`<b>${arch.name}</b> <em>/ ${bg.name}</em><div style='margin-top:5px;font-size:11px;color:#7a6a4a'>${arch.desc||''}</div>${bg.theme?`<div style='margin-top:4px;font-size:11px'>Theme: ${bg.theme}</div>`:''}<div style='margin-top:3px;font-size:11px;color:#8a7a5a'>${loc?`Origin: ${loc.name}`:''}${bg.firstObjective?` · ${bg.firstObjective}`:''}</div>`;
  }

  // ── LAYER SYSTEM ─────────────────────────────────────────
  function setActiveLayer(name){
    if(!G.uiState) G.uiState={activeLayer:'story'};
    G.uiState.activeLayer=name;
    applyLayerToUI(name);
  }
  function applyLayerToUI(layer){
    document.querySelectorAll('.layerBtn').forEach(b=>b.classList.toggle('active',b.dataset.layer===layer));
    if(layer==='story'){
      document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
      const sp=$('storyPanel'); if(sp){ sp.classList.add('active'); renderStoryPanel(); }
    } else if(layer==='world'){
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

  function renderLevelUpModal(){
    const skillKeys=['combat','survival','persuasion','lore','stealth','craft'];
    const skillBtns=skillKeys.map(skill=>`<button class='choice' data-skill='${skill}'><span>Increase ${skill} by 1</span><small>Current: ${G.skills[skill]||0}</small></button>`).join('');
    $('choices').innerHTML=`<div style='padding:12px 0;border-bottom:2px solid #6a5a2a;margin-bottom:12px;color:#d4b67a;font-weight:bold'>⭐ Level ${G.level} Reached!</div><div style='font-size:13px;color:#c9b99b;margin-bottom:14px'>Choose one skill to increase:</div>${skillBtns}`;
    [...document.querySelectorAll('[data-skill]')].forEach(btn=>btn.onclick=()=>{
      const skill=btn.dataset.skill;
      G.skills[skill]=(G.skills[skill]||0)+1;
      G.pendingSkillSelection=false;
      G.lastResult=`Skill improved: ${skill} is now ${G.skills[skill]}.`;
      persist(); render();
    });
  }

  function renderChoices(){
    if(G.pendingSkillSelection){
      renderLevelUpModal();
      return;
    }
    if(G.combatSession && !G.combatSession.resolved){
      renderCombatUI(G, G.combatSession);
      return;
    }
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
      const isCombat=(c.tags||[]).includes('CreatureCombat')||((c.tags||[]).includes('Assassination'));
      const extraCls=(isClass?' classChoice':'')+(isEvil?' evilChoice':'')+(isGood?' goodChoice':'')+(isLawful?' lawfulChoice':'')+(isCombat?' combatChoice':'');
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
    $('servicesPanel').innerHTML=servicesLines();
    $('noticesPanel').innerHTML=noticesLines();
    $('npcsPanel').innerHTML=npcsLines();
    if($('codexPanel')) $('codexPanel').innerHTML=codexLines();
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

  function fillSelectors(){
    const archSel=$('archSelect');
    archSel.innerHTML=window.ARCHETYPES.map(a=>`<option value='${a.id}'>${a.name}</option>`).join('');
    $('ageSelect').innerHTML=['18','21','24','28','34','41','53'].map(v=>`<option value='${v}'>Age ${v}</option>`).join('');
    $('presentationSelect').innerHTML=['Male','Female','Non-Gendered'].map(v=>`<option value='${v}'>${v}</option>`).join('');
    function fillLineage(){
      const bgSel=$('bgSelect'); if(!bgSel) return;
      const bgId=bgSel.value; const archId=archSel.value;
      const bg=(window.BACKGROUNDS[archId]||[]).find(b=>b.id===bgId);
      const loc=bg?bg.originLocality:'shelkopolis';
      const lineages=(window.LOCALITY_LINEAGES||{})[loc]||['Human'];
      const linSel=$('lineageSelect'); if(!linSel) return;
      linSel.innerHTML=lineages.map(l=>`<option value='${l}'>${l}</option>`).join('');
    }
    function fillBg(){
      const ids=window.BACKGROUNDS[archSel.value]||[];
      $('bgSelect').innerHTML=ids.map(b=>{
        const loc=getLocality(b.originLocality);
        const locName=loc?loc.name:b.originLocality;
        return `<option value='${b.id}'>${b.name} — ${locName}</option>`;
      }).join('');
      fillLineage();
      updateArchPreview();
    }
    archSel.onchange=fillBg;
    $('bgSelect').onchange=()=>{ fillLineage(); updateArchPreview(); };
    fillBg();
  }
  function beginNew(){
    G=defaultState();
    G.name=$('newName').value.trim()||'Nameless';
    G.passcode=$('newCode').value.trim() || ('0000'+rand(10000)).slice(-4);
    G.archetype=$('archSelect').value;
    G.backgroundId=$('bgSelect').value;
    G.age=$('ageSelect').value;
    G.presentation=$('presentationSelect').value;
    const arch=getArchetype(G.archetype);
    const bg=getBackground(G.archetype,G.backgroundId);
    G.location=bg.originLocality;
    const lineages=(window.LOCALITY_LINEAGES||{})[G.location] || ['Human'];
    const linSel=$('lineageSelect');
    G.lineage=(linSel&&linSel.value&&lineages.includes(linSel.value))?linSel.value:lineages[0];
    G.currentSafeZone=bg.firstSafeZone;
    G.safeZoneHistory=[bg.firstSafeZone];
    G.maxHp=20 + (arch.group==='combat'?4:arch.group==='support'?2:0);
    G.hp=G.maxHp;
    G.skills[arch.focus]=(G.skills[arch.focus]||0)+1;
    (window.STARTING_LOADOUT_BY_GROUP[arch.group]||[]).forEach((name,idx)=>G.inventory.push({name,slot:['weapon','kit','belt'][idx]||'kit',bonus:{}}));
    G.lifeOverview=window.lifeOverviewText?lifeOverviewText(G):`${G.name} starts in ${getLocality(G.location).name}.`;
    G.codex={npcs:{},localities:{},creatures:{},hazards:{},institutions:{}};
    const startLoc=getLocality(G.location);
    if(startLoc) recordCodex('localities',G.location,{name:startLoc.name,polity:startLoc.polity,economicRole:startLoc.economicRole||'',lawFeel:startLoc.lawFeel||''});
    addQuest('stage1', bg.firstObjective, 'Active');
    // Opening identity narrative — grounding this run in place, background, and archetype
    const archOpenings={
      combat:`${arch.name} is not a role ${G.name} chose so much as the shape pressure took when it tested the body enough times. The hands know what they are for.`,
      magic:`${arch.name} is the name for what happens when the world's underlying pattern stops being invisible. ${G.name} learned to see it before learning what to do with the sight.`,
      stealth:`${arch.name} is the long practice of being in a place without the place knowing it. ${G.name} learned early that being seen is a choice, and not always the useful one.`,
      support:`${arch.name} is the discipline of keeping the useful parts moving. ${G.name} understands that structure is what lets anything else be possible.`
    };
    const archOpen=(archOpenings[arch.group]||archOpenings.support);
    G.lastResult=`${startLoc.name}. ${bg.theme ? `A life shaped by ${bg.theme} ends here and something else begins.` : ''} ${archOpen} The first objective: ${bg.firstObjective||'read the locality and find the hidden hand.'}`;
    addJournal('origin',`${G.name} begins in ${startLoc.name}. ${arch.name} / ${bg.name}. Origin: ${bg.theme||'local pressure'}.`,`origin-${G.name}-${G.location}`);
    markMoment(`${G.name} — ${arch.name} / ${bg.name} — enters ${startLoc.name}`);
    setThreat(); setObjective(); persist(); render();
    const ss=$('startScreen'); if(ss) ss.style.display='none';
    const gs=$('gameSection'); if(gs) gs.classList.add('active');
    const nr=$('newRunBtn'); if(nr) nr.style.display='';
  }
  function loadLegend(){ const code=$('loadCode').value.trim(); const all=storage(); const found=all[code]; if(!found){ alert('Legend not found.'); return; } G=found; if(!G.familyEdges) G.familyEdges=[]; if(!G.telemetry) G.telemetry={turns:0,actions:0,travels:0,scouts:0,encounters:0,wins:0,rescues:0,services:0}; if(!G.inventory) G.inventory=[]; if(!G.equipment) G.equipment={}; if(!G.serviceLog) G.serviceLog=[]; if(!G.alignment) G.alignment={goodEvil:0,lawfulChaotic:0}; if(!G.legalityState) G.legalityState={civicHeat:0,warrants:[],knownCrimes:[],sanctionedActions:[]}; if(!G.confrontationHistory) G.confrontationHistory={directCombats:0,avoidedConflicts:0,stealthKills:0,captures:0,executions:0,stabilizations:0,ritualResolutions:0,escortsCompleted:0}; if(!G.uiState) G.uiState={activeLayer:'story'}; if(!G.codex) G.codex={npcs:{},localities:{},creatures:{},hazards:{},institutions:{}}; render(); const ss=$('startScreen'); if(ss) ss.style.display='none'; const gs=$('gameSection'); if(gs) gs.classList.add('active'); const nr=$('newRunBtn'); if(nr) nr.style.display=''; }
  // Define lists of legendary and notable NPCs for gating logic.
  window.LEGENDARY_NPCS = [ 'archmagister_leth_quillfire', 'coral_jack_neris', 'dame_orsella_roaz', 'dean_arturon_valegear', 'forge_voice_malzara', 'general_maer_rovik', 'ilyra_foamveil', 'kordr_vulkhand', 'marshal_builder_korrin_wex', 'matron_heshka_emberreign', 'mother_eliane_threadmercy', 'old_marrow_jex', 'orem_lantern_step', 'ossarch_veyn_halcyon', 'pashko_many_routes', 'saint_edris_of_the_unblinking_record', 'saint_physician_orel_vaunt', 'ser_caldrin_vey', 'seraphine_of_the_quiet_pyre', 'tessa_grainmark', 'the_ash_red_widow', 'vael_snowtrace', 'vatra_sul', 'vaud_serrik', 'veyla_inkhand' ];
  window.NOTABLE_NPCS = [ 'archivist_temeris_quillward', 'brakka_stonewake', 'captain_darian_roaz', 'captain_thalion_windrider', 'commander_halian_roaz', 'cron_udenine', 'daska_veilrun', 'decran_moltglass', 'descent_captain_orrik_lavabound', 'eron_wardflame', 'examiner_prelate_sira_doveshade', 'gorath_steelclad', 'harl_veymask', 'hel_brenn', 'hest_rookbraid', 'high_priestess_lyara_dawnlight', 'high_tide_priest_coren_mirthwake', 'hrolf_ashsight', 'ithra_quillmark', 'lady_elowen_shelk', 'lady_isabella_shelk', 'lord_darius_shelk', 'magister_selro_vann', 'magistrate_zethraxis_coilspire', 'marshal_sera_ironveil', 'matriarch_ashvara_citadel', 'measurer_seln_archive', 'mediator_selka_var', 'mercy_examiner_talan_vey', 'mordoth_valinheim', 'mother_saar_vulkrel', 'niv_brinegrin', 'orien_warderose', 'pell_rookglass', 'professor_cael_mirrortine', 'quen_larkstamp', 'registrar_confessor_othan_mire', 'rema_three_lantern', 'rime_rimebridge', 'risha_veilthorn', 'roth_udenine', 'sir_edrin_valecrest', 'sir_thaddeus_shelk', 'sir_velden_ironspike', 'strategos_nima_glass_law', 'talar_icepulse', 'vara_chitslip', 'varric_icevein', 'vessa_cindermaw', 'vorgul_oxtend', 'warden_pellor_grainhand' ];
  window.addEventListener('DOMContentLoaded',()=>{ fillSelectors(); $('beginBtn').onclick=beginNew; $('loadBtn').onclick=loadLegend; G=defaultState(); G.lifeOverview='Create a new legend to enter the world.'; setThreat(); render(); });
})();
