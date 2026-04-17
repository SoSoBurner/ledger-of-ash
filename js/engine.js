// ═══════════════════════════════════════════════════════
// LEDGER OF ASH — ENGINE v3
// TEXT RULE: No apostrophes in string values. Full words only.
// ═══════════════════════════════════════════════════════

// ── STATE ──────────────────────────────────────────────
let G = {
  name:'', archetype:null, background:null,
  level:1, xp:0, renown:0,
  hp:20, maxHp:20, gold:20,
  skills:{combat:0,survival:0,persuasion:0,lore:0,stealth:0,craft:0},
  traits:[], location:'shelkopolis',
  timeIndex:0, dayCount:0, axisTick:0, axisInverted:false,
  stage:'Stage I', stageLabel:'Grass Roots',
  morality:0, order:0,
  factions:[], quests:[], journal:[], journalRecords:[], history:[],
  inventory:[], equipped:{weapon:null, armor:null, tool:null},
  wounds:[], fatigue:0, recoveryState:'stable',
  npcMemory:{}, // { npcId: { trust, seen, lastNote } }
  trainingDisadvantage:0, // counts down — next N choices suffer -2
  dead:false, passcode:'',
  rivalAdventurers:[],
  schemaVersion:3
};

let _pendingChoices = [];
let _awaitingLevelUp = false;

// ── STRING SAFETY ──────────────────────────────────────
// Content strings may contain apostrophes. When building innerHTML,
// apostrophes in JS single-quoted strings are fine since they're assigned
// to a variable before innerHTML insertion. No escaping needed.
// The old no-apostrophe constraint is removed. Write naturally.
// If passing raw string literals with apostrophes to innerHTML attrs,
// use safeAttr(). For body content it's never needed.
function safeAttr(s) {
  return String(s).replace(/'/g, '&#39;').replace(/"/g, '&quot;');
}


// ── SCREEN ─────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

// ── TIME ────────────────────────────────────────────────
const TIME_NAMES = ['Dawnrise','Midlight','Duskcall','Nightwatch'];
const TIME_FLAVORS = [
  'The city stirs. Bread smoke and boot-leather.',
  'Full light and full noise. Everyone is visible.',


  'The day unwinds. Lanterns are being lit.',
  'The settlement breathes differently in the dark.'
];
// ── RENOWNED TITLES ─────────────────────────────────────
const RENOWNED_TITLES = [
  {min:0,   max:2,  label:'Unknown'},
  {min:3,   max:5,  label:'Noticed'},
  {min:6,   max:9,  label:'Recognized'},
  {min:10,  max:14, label:'Known'},
  {min:15,  max:19, label:'Respected'},
  {min:20,  max:29, label:'Established'},
  {min:30,  max:44, label:'Notable'},
  {min:45,  max:64, label:'Prominent'},
  {min:65,  max:89, label:'Renowned'},
  {min:90,  max:119,label:'Celebrated'},
  {min:120, max:999,label:'Legendary'},
];

function getRenownedTitle() {
  const r = G.renown || 0;
  const t = RENOWNED_TITLES.find(t => r >= t.min && r <= t.max);
  return t ? t.label : 'Unknown';
}

function advanceTime(ticks) {
  ticks = ticks || 1;
  G.timeIndex = (G.timeIndex + ticks) % 4;
  if (G.timeIndex === 0) G.dayCount = (G.dayCount || 0) + 1;
  updateHUD();
}

// ── PASSCODE FLOW ────────────────────────────────────────
function enterPasscode() {
  const code = (document.getElementById('title-passcode').value || '').trim();
  if (!code || !/^[0-9]{4}$/.test(code)) { showToast('Enter a 4-digit passcode.'); return; }
  const legends = getLegendsByCode(code);
  if (!legends.length) { document.getElementById('title-code-error').style.display = 'block'; return; }
  if (legends.length === 1) { loadAndStart(legends[0].name, code); return; }
  const listEl = document.getElementById('title-legend-list');
  listEl.style.display = 'block';
  listEl.innerHTML = '<div style="font-size:11px;color:var(--ink-faint);margin-bottom:8px;font-family:Cinzel,serif;letter-spacing:2px;text-transform:uppercase">Select your legend:</div>' +
    legends.map(l => '<button class="title-legend-pick" data-name="' + l.name + '"><strong style="color:var(--gold-bright)">' + l.name + '</strong> &middot; ' + l.archetype + ' &middot; Level ' + l.level + '</button>').join('');
  listEl.querySelectorAll('.title-legend-pick').forEach(btn => btn.addEventListener('click', () => loadAndStart(btn.dataset.name, code)));
}

function loadAndStart(name, code) {
  if (loadGame(name, code)) {
    showScreen('screen-game');
    updateHUD(); updateJournalHUD(); updateEnvironmentPanel();
    const loc = WORLD_LOCATIONS[G.location];
    addNarration('', '<em>You return to the ledger. ' + TIME_FLAVORS[G.timeIndex] + '</em>');
    renderChoices([
      { text:'Continue your work.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel' },
      { text:'Check what has changed since you were last here.', skill:'survival', tag:'safe', align:'neutral', cid:'market_intel' }
    ]);
  }
}

function getLegendsByCode(code) {
  const out = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('loa_save_') && k.endsWith('_' + code)) {
        try { const d = JSON.parse(localStorage.getItem(k)); if (d && d.name) out.push({ key:k, name:d.name, level:d.level||1, archetype:d.archetype?d.archetype.name:'Unknown' }); } catch(e) {}
      }
    }
  } catch(e) {}
  return out;
}

function getAllLegends() {
  const out = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('loa_save_')) {
        try { const d = JSON.parse(localStorage.getItem(k)); if (d && d.name) out.push({ key:k, name:d.name, level:d.level||1, archetype:d.archetype?d.archetype.name:'Unknown', location:d.location||'shelkopolis', stage:d.stage||'Stage I' }); } catch(e) {}
      }
    }
  } catch(e) {}
  return out;
}

// ── CHARACTER CREATION ──────────────────────────────────
function initCreate() {
  G = { name:'', archetype:null, background:null, level:1, xp:0, renown:0, hp:20, maxHp:20, gold:20,
        skills:{combat:0,survival:0,persuasion:0,lore:0,stealth:0,craft:0},
        traits:[], location:'shelkopolis', timeIndex:0, dayCount:0, axisTick:0, axisInverted:false,
        stage:'Stage I', stageLabel:'Grass Roots', morality:0, order:0,
        factions:[], quests:[], journal:[], journalRecords:[], history:[],
        inventory:[], equipped:{weapon:null,armor:null,tool:null},
        wounds:[], fatigue:0, recoveryState:'stable',
        npcMemory:{}, trainingDisadvantage:0,
        unlockedAbilities:[], unlockedCombatAbilities:[],
        companions:{}, tutorialFlags:{},
        dead:false, passcode:'', rivalAdventurers:[], schemaVersion:5 };
  _awaitingLevelUp = false;

  const ag = document.getElementById('archetype-grid');
  ag.innerHTML = '';
  CLASS_GROUPS.forEach(group => {
    const header = document.createElement('div');
    header.className = 'group-header';
    header.textContent = group.name;
    ag.appendChild(header);
    const row = document.createElement('div');
    row.className = 'card-grid';
    group.classes.forEach(cid => {
      const a = ARCHETYPES.find(x => x.id === cid);
      if (!a) return;
      const d = document.createElement('div');
      d.className = 'card'; d.dataset.id = a.id;
      d.innerHTML = '<div class="card-name">' + a.name + '</div><div class="card-tag">' + a.tag + '</div>' +
        '<div class="card-desc" style="margin-top:8px">' + a.desc + '</div>' +
        '<div class="card-trait" style="margin-top:8px">&#x2736; ' + a.trait + '</div>';
      d.addEventListener('click', () => selectArchetype(a.id));
      row.appendChild(d);
    });
    ag.appendChild(row);
  });
  document.getElementById('bg-step').style.display = 'none';
  document.getElementById('create-narrative').classList.remove('visible');
  document.getElementById('begin-btn').style.display = 'none';
  G._createStatBoost = null;

  // Populate stat boost grid
  const sbg = document.getElementById('stat-boost-grid');
  if (sbg) {
    const skills = ['combat','survival','persuasion','lore','stealth','craft'];
    sbg.innerHTML = '';
    skills.forEach(sk => {
      const btn = document.createElement('div');
      btn.className = 'card';
      btn.dataset.skill = sk;
      btn.style.textAlign = 'center';
      btn.innerHTML = '<div class="card-name">' + sk + '</div><div class="card-tag">+1 starting</div>';
      btn.addEventListener('click', () => {
        document.querySelectorAll('#stat-boost-grid .card').forEach(c => c.classList.remove('selected'));
        btn.classList.add('selected');
        G._createStatBoost = sk;
        document.getElementById('stat-boost-step').style.display = 'block';
        checkBeginReady();
      });
      sbg.appendChild(btn);
    });
    document.getElementById('stat-boost-step').style.display = 'block';
  }
}

function selectArchetype(id) {
  document.querySelectorAll('#archetype-grid .card').forEach(c => c.classList.toggle('selected', c.dataset.id === id));
  G.archetype = ARCHETYPES.find(a => a.id === id);
  document.getElementById('bg-step').style.display = 'block';
  const bg = document.getElementById('background-grid');
  bg.innerHTML = '';
  (BACKGROUNDS[id] || []).forEach(b => {
    const d = document.createElement('div');
    d.className = 'card'; d.dataset.id = b.id;
    d.innerHTML = '<div class="card-name">' + b.name + '</div><div class="card-tag">' + b.region + '</div>' +
      '<div class="card-desc" style="margin-top:8px">' + b.desc + '</div>' +
      '<div class="card-trait" style="margin-top:8px">&#x2736; ' + b.bonus + '</div>';
    d.addEventListener('click', () => selectBackground(b.id, id));
    bg.appendChild(d);
  });
  G.background = null;
  document.getElementById('begin-btn').style.display = 'none';
  updateCreateNarrative();
}

function selectBackground(bgId, archId) {
  document.querySelectorAll('#background-grid .card').forEach(c => c.classList.toggle('selected', c.dataset.id === bgId));
  G.background = (BACKGROUNDS[archId] || []).find(b => b.id === bgId);
  updateCreateNarrative();
  checkBeginReady();
}

function updateCreateNarrative() {
  const name = document.getElementById('char-name').value.trim();
  const nc = document.getElementById('create-narrative');
  if (!G.archetype) { nc.classList.remove('visible'); return; }
  let html = '<strong>' + (name||'You') + '</strong> &mdash; ' + G.archetype.archDesc;
  if (G.background) {
    html += '<br><br><em>' + G.background.opening + '</em>';
    html += '<br><br>You begin in <strong>' + G.background.region + '</strong>.';
    html += '<br><span style="color:var(--gold-dim);font-size:12px;font-family:Cinzel,serif;letter-spacing:1px">Starting bonus: ' + G.background.bonus + '</span>';
  } else {
    html += '<br><br>Choose your origin below.';
  }
  nc.innerHTML = html;
  nc.classList.add('visible');
  checkBeginReady();
}

function checkBeginReady() {
  const name = document.getElementById('char-name').value.trim();
  const code = (document.getElementById('char-passcode')||{value:''}).value.trim();
  document.getElementById('begin-btn').style.display = (name && /^[0-9]{4}$/.test(code) && G.archetype && G.background) ? 'inline-flex' : 'none';
}

function beginLegend() {
  const name = document.getElementById('char-name').value.trim();
  const code = (document.getElementById('char-passcode')||{value:''}).value.trim();
  if (!name) { showToast('Enter your name first.'); return; }
  if (!/^[0-9]{4}$/.test(code)) { showToast('Enter a 4-digit passcode.'); return; }
  if (!G.archetype || !G.background) { showToast('Choose class and background.'); return; }
  G.name = name; G.passcode = code;
  G.skills = Object.assign({}, G.archetype.skills);
  G.maxHp = G.archetype.hp; G.hp = G.maxHp;
  G.gold = G.archetype.startGold;
  G.traits = [{ name:G.archetype.trait, desc:G.archetype.traitDesc, used:false }];
  G.location = BG_LOCATION_MAP[G.background.region] || 'shelkopolis';
  G.history.push('Born as ' + G.name + ', ' + G.archetype.name + ' of ' + G.background.region + '.');
  G.history.push(G.background.opening);
  G.factions = FACTIONS_BASE.map(f => ({ id:f.id, name:f.name, rep:f.rep }));
  (G.background.factionMods || []).forEach(m => modFaction(m.id, m.n || 0));
  // Starting inventory
  G.inventory = [{ name:G.background.bonus, type:'background_bonus', equipped:false }];
  // Seed rival adventurers
  G.rivalAdventurers = generateRivals();
  if (typeof initWorldNotices === 'function') initWorldNotices();
  if (typeof initFactionClocks === 'function') G.factionClocks = null;
  saveGame();
  showScreen('screen-game');
  updateHUD(); updateEnvironmentPanel();
  startOpeningScene();
}

// ── RIVAL ADVENTURERS ────────────────────────────────────
const RIVAL_NAMES = ['Sena Ledgermere','Tavian Silkgate','Rhodra Boltmere','Corin Bloomcrest','Veyra Boltmere','Elandra Velvetmere','Jorva Helmrune','Nira Veilthorn'];
const RIVAL_CLASSES = ['Rogue','Warrior','Wizard','Cleric','Scout','Inquisitor','Ranger','Assassin'];
const RIVAL_HOOKS = ['pursuing the same eastern investigation','working for House Shelk','operating on behalf of the Guild Sanction Board','following a personal vendetta','seeking the same target'];

function generateRivals() {
  return [0,1,2].map(i => ({
    name: RIVAL_NAMES[i],
    archetype: RIVAL_CLASSES[i],
    hook: RIVAL_HOOKS[i % RIVAL_HOOKS.length],
    renown: Math.floor(Math.random() * 3),
    active: true,
    lastSeen: 'Not encountered'
  }));
}

function advanceRivals() {
  if (!G.rivalAdventurers) return;

  // When a rival resolves, post a world notice and journal entry
  G.rivalAdventurers.forEach(r => {
    if (r._resolved) return; // already processed
    if (!r.active) {
      r._resolved = true;
      // Add notice about their departure
      if (typeof addWorldNotice === 'function') {
        if (r.renown >= 5) {
          addWorldNotice('[KNOWN] ' + r.name + ' (' + r.archetype + ') has left the region. Renown ' + r.renown + '. Their work is complete.');
        } else {
          addWorldNotice('[MISSING] ' + r.name + ', ' + r.archetype + ', was last seen in this area. No contact in three days.');
        }
      }
      // If rival beat you to the investigation, add consequence
      if (r.renown >= 5 && r.hook.includes('same eastern investigation')) {
        addJournal('Rival ' + r.name + ' completed the eastern investigation before you. Their findings are now in Roadwarden hands.');
        modFaction('roadwardens', 5); // they got the credit
      }
    }
  });
  G.rivalAdventurers.forEach(r => {
    if (r._resolved || !r.active) return;
    // Each major choice advances rivals
    const roll = Math.floor(Math.random() * 10);
    if (roll >= 8) {
      r.renown++;
      if (r.renown >= 5) { r.active = false; r.lastSeen = 'Completed their work and moved on.'; }
    } else if (roll === 0) {
      r.active = false;
      r.lastSeen = 'Disappeared. Reason unknown.';
    }
  });
}

// ── OPENING SCENE ───────────────────────────────────────
function startOpeningScene() {
  clearNarrative();
  const scene = OPENING_SCENES[G.background.id];
  if (!scene) {
    const loc = WORLD_LOCATIONS[G.location];
    addNarration('', (loc ? loc.desc : '') + ' You arrive.');
    setTimeout(() => renderChoices([
      { text:'Find the nearest inn and take stock.', skill:'persuasion', tag:'safe', align:'neutral', cid:'inn_arrival' },
      { text:'Walk the main road and read the settlement.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel' }
    ]), 300);
    return;
  }
  addNarration('', scene.text);
  setTimeout(() => renderChoices(scene.choices), 300);
}

// ── ENVIRONMENT PANEL ────────────────────────────────────

// ── DYNAMIC SCENE DECORATOR ───────────────────────────
// Composes locality base + time-of-day + pressure + notices into env panel text
function getScenePressureDescriptor() {
  if (!G.factionClocks) return '';
  const clocks = G.factionClocks;
  const roadProg = clocks.roadwardens ? clocks.roadwardens.progress / clocks.roadwardens.goal : 0;
  const shelkProg = clocks.house_shelk ? clocks.house_shelk.progress / clocks.house_shelk.goal : 0;
  const shadowProg = clocks.shadowhands ? clocks.shadowhands.progress / clocks.shadowhands.goal : 0;

  const pressures = [];
  if (roadProg > 0.7) pressures.push('Roadwarden checkpoints are running double shifts. People are being asked for papers at the gate.');
  else if (roadProg > 0.4) pressures.push('Roadwarden patrols are heavier than usual. Something has them moving.');
  if (shelkProg > 0.7) pressures.push('House Shelk administrative offices have closed early three days running.');
  else if (shelkProg > 0.4) pressures.push('A House Shelk courier was seen at the depot twice today.');
  if (shadowProg > 0.6) pressures.push('The drop sites have been cleaned. Shadowhands are moving.');

  // Rival pressure
  const activeRivals = (G.rivalAdventurers||[]).filter(r => r.active && r.renown >= 3);
  if (activeRivals.length > 0) pressures.push(activeRivals[0].name + ' has been asking questions in this area.');

  return pressures.length ? pressures[0] : '';
}

function getLocalityToneDescriptor(locId) {
  const tones = {
    shelkopolis: ['The city smells of pressed flowers and anxious money.', 'Roadwarden notices cover the same wall space as fashion broadsheets.', 'Everyone here is presenting something. The question is what they are hiding under it.'],
    fairhaven:   ['The road into Fairhaven is older than the house that built the route.', 'Market smells: hay, bread, something chemical from the eastern approach.', 'The Roadwarden post is understaffed. Has been for a week.'],
    panim:       ['Panim smells of embalming oil and cooked grain. Both are civic necessities.', 'The afterlife registry clock above the entrance runs thirty seconds slow. It always has.', 'Three memorial notices since morning. The families do not look like they were expecting this.'],
    soreheim:    ['The Giant Council hall looms over everything else the way a fact looms over an argument.', 'Soreheim smells of stone dust and managed cold.', 'The allocation board has been updated since yesterday. The numbers are smaller.'],
    guildheart:  ['Guildheart Hub smells of paper and handled coin.', 'Neutral territory is a concept everyone here maintains by agreement. The agreement is showing strain.', 'Three arbitration sessions scheduled this morning. Only one is on the public calendar.'],
    aurora:      ['The dome hums at a frequency you feel before you hear.', 'Outside the dome the sky is wrong in a way that precise instruments can measure.', 'The dome temperature dropped half a degree overnight. Neren says it is within tolerance.'],
    cosmoria:    ['The floating city adjusts itself constantly. The motion is so slow you only notice when you stop.', 'Cosmouth smells of salt and old rope and something chemical underneath.', 'The harbor logs from the last three days have a gap in them.'],
    shirshal:    ['Shirshal smells of stone corridors and the particular dryness of preserved documents.', 'The evidence vaults are on a forty-eight-hour access log. Yours will be noted.', 'A Magi Magistratus hearing is in session. The door is closed. The room is quiet.'],
    mimolot:     ['The academy is having one of its quiet days. That is not the same as an inactive day.', 'Mimolot smells of lamp oil and the particular tension of people pretending not to be watching each other.', 'A tariff dispute is being resolved in the archive anteroom. Loudly.'],
    sunspire:    ['Sunspire Haven smells of road dust and something that should not be in the air this far from the dome.', 'The frontier is visible from here. Not comfortable. But honest.', 'The Frontier Company office has a new notice up. The handwriting is different from last week.'],
    ithtananalor:['Ithtananalor smells of enforcement and controlled industry.', 'The Iron Accord checkpoint moved overnight. No announcement was made.', 'Office of Roazian Enforcement is running at full staff today. That is not the baseline.'],
  };
  const options = tones[locId] || ['The settlement holds its business close.'];
  return options[Math.floor((G.dayCount||0) % options.length)];
}

function buildEnvPanelText() {
  const loc = WORLD_LOCATIONS[G.location];
  if (!loc) return '';
  const base = getLocalityToneDescriptor(G.location);
  const pressure = getScenePressureDescriptor();
  const timeFlav = TIME_FLAVORS[G.timeIndex||0];
  const axis = G.axisInverted ? 'The axis is inverted. Seasonal logic does not apply.' : '';
  const wound = (G.wounds||[]).filter(w=>!w.healed).length > 0 ? 'You are carrying wounds. Every action costs more.' : '';
  const parts = [base, timeFlav, pressure, axis, wound].filter(Boolean);
  return parts.join(' ');
}

function updateEnvironmentPanel() {
  const loc = WORLD_LOCATIONS[G.location];
  if (!loc) return;
  const el = document.getElementById('env-panel');
  if (!el) return;
  const timeStr = TIME_NAMES[G.timeIndex || 0];
  const timeFlavor = TIME_FLAVORS[G.timeIndex || 0];
  const axisStr = G.axisInverted ? '&#x26A0; Axis Inverted' : 'Axis Stable';
  el.innerHTML =
    '<div class="env-location">' + loc.name + '</div>' +
    '<div class="env-region">' + loc.region + '</div>' +
    '<div class="env-desc">' + buildEnvPanelText() + '</div>' +
    '<div class="env-status">' +
      '<span class="env-pill">' + timeStr + ' &middot; Day ' + (G.dayCount||1) + '</span>' +
      '<span class="env-pill' + (G.axisInverted ? ' inverted' : '') + '">' + axisStr + '</span>' +
      (G.wounds && G.wounds.length ? '<span class="env-pill danger">Wounded</span>' : '') +
      (G.trainingDisadvantage > 0 ? '<span class="env-pill warn">Training fatigue (' + G.trainingDisadvantage + ')</span>' : '') +
    '</div>';

  const locBtns = document.getElementById('local-locations');
  if (locBtns) {
    if (loc.sites && loc.sites.length) {
      locBtns.innerHTML = '<div style="font-size:10px;color:var(--ink-faint);margin-bottom:6px;font-family:Cinzel,serif;letter-spacing:1px">LOCAL SITES</div>' +
        loc.sites.map(site => '<button class="loc-site-btn" data-site="' + site + '">' + site + '</button>').join('');
      locBtns.querySelectorAll('.loc-site-btn').forEach(btn => btn.addEventListener('click', () => visitSite(btn.dataset.site)));
    } else {
      locBtns.innerHTML = '';
    }
  }
}

function visitSite(site) {
  advanceTime(1);
  const hour = G.timeIndex || 0; // 0=Dawnrise,1=Midlight,2=Duskcall,3=Nightwatch
  const isNight = hour === 3;
  const isDawn = hour === 0;
  // Check time restrictions
  const closedAtNight = /archive|library|tariff|registry|academy|council|guild sanction|consortium|enforcement/i.test(site);
  const closedAtDawn = /tavern|inn|fountain|plough|stag|banner/i.test(site);
  if (isNight && closedAtNight) {
    addNarration(site, site + ' is closed at Nightwatch. Official locations keep daylight hours.');
    renderChoices([
      {text:'Find somewhere to rest until morning.', skill:'survival', tag:'safe', align:'neutral', cid:'rest_recover'},
      {text:'Look for a tavern still serving.', skill:'persuasion', tag:'safe', align:'neutral', cid:'inn_arrival'}
    ]);
    return;
  }
  if (isDawn && closedAtDawn) {
    addNarration(site, site + ' has not opened yet at Dawnrise. The staff is still setting up.');
    renderChoices([
      {text:'Wait until Midlight when it opens.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'},
      {text:'Find the early-morning market instead.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel'}
    ]);
    return;
  }
  const isTavern = /inn|fountain|plough|tavern|banner|stag/i.test(site);
  const isMarket = /market|row|square|exchange|emporium|threads/i.test(site);
  const isShrine = /shrine|cathedral|temple|chapel|sanctuary|silkweaver/i.test(site);
  const isGuard = /command|barracks|garrison|warden|enforcement|accord|post/i.test(site);
  const isWorkshop = /workshop|forge|armory|guild|starlit|blooming|iron ward/i.test(site);
  const isArchive = /archive|library|vault|registry|tariff|records|gilded/i.test(site);
  const isAllocation = /allocation|ration|council|assembly|hall/i.test(site);

  let choices = [];
  if (isTavern) choices = [
    { text:'Sit at the bar. Listen for what the settlement knows.', skill:'lore', tag:'safe', align:'neutral', cid:'inn_arrival' },
    { text:'Buy a round for the table. Make yourself visible.', skill:'persuasion', tag:'safe', align:'lawful', cid:'passive_intel' },
    { text:'Find a corner and watch who comes and goes.', skill:'stealth', tag:'safe', align:'neutral', cid:'passive_intel' }
  ];
  else if (isMarket) choices = [
    { text:'Browse the stalls. Listen to what the traders are saying.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel' },
    { text:'Look for someone moving goods that should not be here.', skill:'stealth', tag:'risky', align:'neutral', cid:'ironspool_intel' },
    { text:'Ask a merchant directly about the eastern route situation.', skill:'persuasion', tag:'risky', align:'neutral', cid:'probe_order_origin' }
  ];
  else if (isShrine) choices = [
    { text:'Make an offering and speak with the shrine attendant.', skill:'persuasion', tag:'safe', align:'lawful', cid:'shrine_contact' },
    { text:'Study who is here and what they are asking for.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel' },
    { text:'Ask the deity for guidance on the operation.', skill:'persuasion', tag:'risky', align:'lawful', cid:'shrine_service' }
  ];
  else if (isGuard) choices = [
    { text:'Request a meeting with the duty officer.', skill:'persuasion', tag:'safe', align:'lawful', cid:'garrison_contact' },
    { text:'Check the public notice board.', skill:'lore', tag:'safe', align:'neutral', cid:'read_notices' },
    { text:'Ask about contract work available.', skill:'combat', tag:'safe', align:'neutral', cid:'find_work' }
  ];
  else if (isWorkshop) choices = [
    { text:'Offer your skills to whoever runs this space.', skill:'craft', tag:'safe', align:'neutral', cid:'armory_offer' },
    { text:'Assess the current work quality. Who is commissioning?', skill:'craft', tag:'safe', align:'neutral', cid:'workshop_survey' },
    { text:'Ask about unusual recent orders.', skill:'lore', tag:'risky', align:'neutral', cid:'probe_order_origin' }
  ];
  else if (isArchive) choices = [
    { text:'Request transit records and supply manifests.', skill:'lore', tag:'safe', align:'lawful', cid:'gilded_archives' },
    { text:'Look for anything tied to the eastern route closure.', skill:'lore', tag:'risky', align:'neutral', cid:'study_packet' },
    { text:'Approach the archivist about a restricted document.', skill:'persuasion', tag:'risky', align:'chaotic', cid:'tariff_contact' }
  ];
  else if (isAllocation) choices = [
    { text:'Observe the distribution process. Look for irregularities.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel' },
    { text:'Speak to workers about what has changed recently.', skill:'persuasion', tag:'safe', align:'neutral', cid:'trace_missing_persons' },
    { text:'Ask to see the current allocation ledger.', skill:'persuasion', tag:'risky', align:'lawful', cid:'trade_registry' }
  ];
  else choices = [
    { text:'Look the place over carefully.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel' },
    { text:'Speak to whoever is present.', skill:'persuasion', tag:'safe', align:'neutral', cid:'inn_arrival' },
    { text:'Look for something useful.', skill:'craft', tag:'safe', align:'neutral', cid:'find_work' }
  ];

  addNarration(site, 'You make your way to <strong>' + site + '</strong>. ' + TIME_FLAVORS[G.timeIndex]);
  renderChoices(choices);
}

// ── NARRATIVE ENGINE ─────────────────────────────────────
function clearNarrative() { document.getElementById('narrative-content').innerHTML = ''; }

function addNarration(label, html, resultType) {
  const el = document.getElementById('narrative-content');
  const block = document.createElement('div');
  block.className = 'scene-block';
  let inner = '';
  if (label) inner += '<div class="scene-location">' + label + '</div>';
  if (resultType) {
    const icon = resultType === 'success' ? '&#x2713; Success' : resultType === 'failure' ? '&#x2717; Failure' : '~ Partial';
    inner += '<div class="result-block ' + resultType + '"><div class="result-tag ' + resultType + '">' + icon + '</div><div class="result-text">' + html + '</div></div>';
  } else {
    inner += '<div class="narrative-text">' + html + '</div>';
  }
  block.innerHTML = inner;
  el.appendChild(block);
  scrollNarrative();
}

function renderChoices(choices) {
  _pendingChoices = choices;
  const el = document.getElementById('narrative-content');
  const block = document.createElement('div');
  block.className = 'scene-block choice-block';
  const disadv = G.trainingDisadvantage > 0;
  let html = '<div class="choice-label">What do you do?' + (disadv ? ' <span style="color:var(--gold-dim);font-size:10px">[Training fatigue: -2 to rolls, ' + G.trainingDisadvantage + ' left]</span>' : '') + '</div><div class="choices">';

  choices.forEach((c, i) => {
    const alignSymbol = {lawful:'&#x2696;', chaotic:'&#x2605;', good:'&#x2665;', evil:'&#x2620;'}[c.align] || '';
    html += '<button class="choice-btn" data-idx="' + i + '">' +
      '<span class="choice-text">' + c.text + '</span>' +
      '<span class="choice-meta">' +
      (c.skill ? '<span class="choice-skill">' + c.skill + '</span>' : '') +
      (c.tag ? '<span class="choice-tag ' + c.tag + '">' + c.tag + '</span>' : '') +
      (c.align && c.align !== 'neutral' ? '<span class="choice-align ' + c.align + '">' + alignSymbol + ' ' + c.align + '</span>' : '') +
      '</span></button>';
  });
  html += '</div>';

  // Trait use button
  if (G.archetype && G.traits && G.traits[0] && !G.traits[0].used) {
    html += '<div class="trait-use-area"><button class="trait-use-btn" id="btn-use-trait">&#x2736; Use Trait: ' + G.archetype.trait + '</button></div>';
  }

  block.innerHTML = html;
  block.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => handleChoice(_pendingChoices[parseInt(btn.dataset.idx, 10)]));
  });
  const tb = block.querySelector('#btn-use-trait');
  if (tb) tb.addEventListener('click', useTrait);
  el.appendChild(block);
  scrollNarrative();
}

function scrollNarrative() {
  const ns = document.getElementById('narrative-scroll');
  if (ns) setTimeout(() => ns.scrollTo({ top: ns.scrollHeight, behavior:'smooth' }), 100);
}

// ── TRAIT ACTIVATION ──────────────────────────────────────
function useTrait() {
  if (!G.archetype || !G.traits[0] || G.traits[0].used) return;
  G.traits[0].used = true;
  document.querySelectorAll('.choice-block,.move-block').forEach(b => b.remove());
  const t = G.traits[0];
  const arch = G.archetype.id;
  addNarration('Trait: ' + t.name, '<em>' + t.desc + '</em>');

  const traitChoiceMap = {
    warrior:  { bonus:{skill:'combat',n:3}, choices:[
      {text:'Force a direct confrontation with whoever is blocking progress.',skill:'combat',tag:'bold',align:'chaotic',cid:'do_combat_patrol'},
      {text:'Demonstrate combat capability to earn access.',skill:'combat',tag:'risky',align:'neutral',cid:'find_work'},
      {text:'Use the threat of violence to extract information.',skill:'persuasion',tag:'risky',align:'evil',cid:'probe_order_origin'}]},
    knight:   { bonus:{skill:'combat',n:3}, choices:[
      {text:'Challenge the obstacle formally in the name of your house.',skill:'persuasion',tag:'bold',align:'lawful',cid:'house_shelk_meeting'},
      {text:'Demand truth from a lying official.',skill:'persuasion',tag:'risky',align:'lawful',cid:'garrison_contact'},
      {text:'Put yourself between a threatened NPC and their danger.',skill:'combat',tag:'bold',align:'good',cid:'confront_coth'}]},
    ranger:   { bonus:{skill:'survival',n:3}, choices:[
      {text:'Track the operation through terrain the patrols avoid.',skill:'survival',tag:'bold',align:'neutral',cid:'east_road'},
      {text:'Scout the depot from a concealed position before acting.',skill:'stealth',tag:'safe',align:'neutral',cid:'passive_intel'},
      {text:'Find an alternate route through terrain no one else knows.',skill:'survival',tag:'risky',align:'chaotic',cid:'alternate_route'}]},
    paladin:  { bonus:{skill:'combat',n:3}, choices:[
      {text:'Invoke your deity mandate to compel truthful testimony.',skill:'persuasion',tag:'bold',align:'lawful',cid:'find_roadwarden'},
      {text:'Lay hands on an injured worker from the eastern route.',skill:'lore',tag:'safe',align:'good',cid:'trace_missing_persons'},
      {text:'Confront the administrator directly in the name of Eloljaro.',skill:'combat',tag:'bold',align:'lawful',cid:'confront_coth'}]},
    archer:   { bonus:{skill:'stealth',n:3}, choices:[
      {text:'Take an elevated position and observe the target undetected.',skill:'stealth',tag:'bold',align:'neutral',cid:'passive_intel'},
      {text:'Cover an approach for someone else entering the depot.',skill:'combat',tag:'risky',align:'neutral',cid:'document_depot'},
      {text:'Pin down a fleeing suspect before they can warn anyone.',skill:'combat',tag:'bold',align:'chaotic',cid:'do_combat_patrol'}]},
    berserker:{ bonus:{skill:'combat',n:4}, choices:[
      {text:'Attack the obstacle directly and force the outcome.',skill:'combat',tag:'bold',align:'chaotic',cid:'do_combat_patrol'},
      {text:'Use your reputation to intimidate the operator into talking.',skill:'persuasion',tag:'risky',align:'evil',cid:'confront_coth'},
      {text:'Enter the fight for information. Pain is data.',skill:'combat',tag:'bold',align:'chaotic',cid:'fight_for_access'}]},
    wizard:   { bonus:{skill:'lore',n:3}, choices:[
      {text:'Analyze the manifests for magical encoding.',skill:'lore',tag:'bold',align:'neutral',cid:'study_packet'},
      {text:'Identify a hidden signature on the modified equipment.',skill:'lore',tag:'risky',align:'neutral',cid:'document_depot'},
      {text:'Use arcane knowledge to expose the administrator.',skill:'lore',tag:'bold',align:'lawful',cid:'probe_order_origin'}]},
    cleric:   { bonus:{skill:'persuasion',n:3}, choices:[
      {text:'Invoke divine authority to compel a confession.',skill:'persuasion',tag:'bold',align:'lawful',cid:'find_roadwarden'},
      {text:'Offer healing and shelter to an injured witness.',skill:'persuasion',tag:'safe',align:'good',cid:'shrine_service'},
      {text:'Rally the families who lost someone to the operation.',skill:'persuasion',tag:'risky',align:'good',cid:'trace_missing_persons'}]},
    priest:   { bonus:{skill:'persuasion',n:3}, choices:[
      {text:'Use congregational knowledge to identify the key actor.',skill:'persuasion',tag:'bold',align:'lawful',cid:'probe_order_origin'},
      {text:'Speak to the settlement about what the eastern route took from them.',skill:'persuasion',tag:'safe',align:'good',cid:'trace_missing_persons'},
      {text:'Request a private meeting through shrine channels.',skill:'persuasion',tag:'risky',align:'neutral',cid:'shrine_contact'}]},
    necromancer:{bonus:{skill:'lore',n:3}, choices:[
      {text:'Read the death registry for patterns connecting the victims.',skill:'lore',tag:'bold',align:'neutral',cid:'panim_contact'},
      {text:'Identify the residue of the operation through what it left behind.',skill:'lore',tag:'risky',align:'neutral',cid:'document_depot'},
      {text:'Use the threat of your knowledge to compel information.',skill:'persuasion',tag:'risky',align:'evil',cid:'probe_order_origin'}]},
    illusionist:{bonus:{skill:'persuasion',n:3}, choices:[
      {text:'Impersonate a Shelk operations official to enter the records.',skill:'persuasion',tag:'bold',align:'chaotic',cid:'house_shelk_meeting'},
      {text:'Create a false lead that draws the operation into the open.',skill:'persuasion',tag:'risky',align:'evil',cid:'passive_intel'},
      {text:'Convince a key witness they already gave you everything.',skill:'persuasion',tag:'risky',align:'chaotic',cid:'probe_order_origin'}]},
    inquisitor:{bonus:{skill:'lore',n:3}, choices:[
      {text:'Formally interrogate the cart driver under investigator credentials.',skill:'lore',tag:'bold',align:'lawful',cid:'find_cart_driver'},
      {text:'Present evidence to the Roadwardens and compel a response.',skill:'lore',tag:'safe',align:'lawful',cid:'find_roadwarden'},
      {text:'Use your mandate to summon Coth for questioning.',skill:'persuasion',tag:'bold',align:'lawful',cid:'confront_coth'}]},
    elementalist:{bonus:{skill:'survival',n:3}, choices:[
      {text:'Read the axis anomaly to predict where the operation is heading.',skill:'lore',tag:'bold',align:'neutral',cid:'east_road'},
      {text:'Use elemental attunement to identify the compound in the cargo.',skill:'lore',tag:'risky',align:'neutral',cid:'document_depot'},
      {text:'Trigger a controlled elemental event to expose the depot.',skill:'combat',tag:'bold',align:'chaotic',cid:'fight_for_access'}]},
    rogue:    { bonus:{skill:'stealth',n:3}, choices:[
      {text:'Infiltrate the sealed depot records office tonight.',skill:'stealth',tag:'bold',align:'chaotic',cid:'depot_logs'},
      {text:'Follow the cart driver without being seen.',skill:'stealth',tag:'risky',align:'neutral',cid:'find_cart_driver'},
      {text:'Lift the administrative order directly from Coth.',skill:'stealth',tag:'risky',align:'evil',cid:'trace_directive'}]},
    assassin: { bonus:{skill:'stealth',n:4}, choices:[
      {text:'Eliminate the cart driver before he can be moved.',skill:'stealth',tag:'bold',align:'evil',cid:'do_combat_patrol'},
      {text:'Enter the sealed section of the depot before dawn.',skill:'stealth',tag:'risky',align:'chaotic',cid:'depot_logs'},
      {text:'Follow the administration chain to the source.',skill:'stealth',tag:'bold',align:'neutral',cid:'find_note_sender'}]},
    spellthief:{bonus:{skill:'stealth',n:3}, choices:[
      {text:'Copy the magical technique used on the modified equipment.',skill:'lore',tag:'bold',align:'chaotic',cid:'document_depot'},
      {text:'Intercept a message being sent from the operation.',skill:'stealth',tag:'risky',align:'neutral',cid:'check_drop'},
      {text:'Steal the key evidence from the archive before anyone files it.',skill:'stealth',tag:'risky',align:'evil',cid:'gilded_archives'}]},
    scout_c:  { bonus:{skill:'survival',n:3}, choices:[
      {text:'Scout the eastern route end to find what changed.',skill:'survival',tag:'bold',align:'neutral',cid:'east_road'},
      {text:'Map the freight lane before entering.',skill:'stealth',tag:'safe',align:'neutral',cid:'ironspool_intel'},
      {text:'Identify the dominant faction presence before committing.',skill:'lore',tag:'safe',align:'neutral',cid:'passive_intel'}]},
    thief:    { bonus:{skill:'stealth',n:3}, choices:[
      {text:'Value and lift what the operation left exposed.',skill:'stealth',tag:'bold',align:'evil',cid:'investigate_stalls'},
      {text:'Identify who is profiting from the scarcity.',skill:'lore',tag:'risky',align:'neutral',cid:'probe_order_origin'},
      {text:'Access the freight lane through the shadow economy.',skill:'stealth',tag:'risky',align:'chaotic',cid:'ironspool_intel'}]},
    trickster:{ bonus:{skill:'persuasion',n:3}, choices:[
      {text:'Pose as a trade inspector to access the operation records.',skill:'persuasion',tag:'bold',align:'chaotic',cid:'house_shelk_meeting'},
      {text:'Introduce yourself to all parties and see who bids first.',skill:'persuasion',tag:'risky',align:'chaotic',cid:'passive_intel'},
      {text:'Plant a false rumor that causes the operation to act.',skill:'persuasion',tag:'bold',align:'evil',cid:'find_broadsheet'}]},
    healer:   { bonus:{skill:'lore',n:2}, choices:[
      {text:'Treat the eastern route injured and ask what happened.',skill:'persuasion',tag:'safe',align:'good',cid:'trace_missing_persons'},
      {text:'Use medical knowledge to identify the injury cause.',skill:'lore',tag:'safe',align:'neutral',cid:'probe_order_origin'},
      {text:'Offer medical services to the Roadwardens for access.',skill:'persuasion',tag:'risky',align:'lawful',cid:'garrison_contact'}]},
    artificer:{ bonus:{skill:'craft',n:3}, choices:[
      {text:'Examine the depot modification directly.',skill:'craft',tag:'bold',align:'neutral',cid:'document_depot'},
      {text:'Reverse-engineer the false manifest format.',skill:'craft',tag:'risky',align:'neutral',cid:'study_packet'},
      {text:'Make the Roadwardens an offer they cannot match.',skill:'craft',tag:'safe',align:'lawful',cid:'armory_offer'}]},
    engineer: { bonus:{skill:'craft',n:3}, choices:[
      {text:'Assess the structural modification and trace who built it.',skill:'craft',tag:'bold',align:'neutral',cid:'bridge_survey'},
      {text:'Use engineering knowledge to find the weak point.',skill:'craft',tag:'risky',align:'neutral',cid:'document_depot'},
      {text:'Offer fortification work to gain trust and access.',skill:'craft',tag:'safe',align:'lawful',cid:'armory_offer'}]},
    tactician:{ bonus:{skill:'lore',n:3}, choices:[
      {text:'Map the complete operation and present it to the Roadwardens.',skill:'lore',tag:'bold',align:'lawful',cid:'report_findings'},
      {text:'Identify the single weakest node in the operation.',skill:'lore',tag:'risky',align:'neutral',cid:'probe_order_origin'},
      {text:'Reposition yourself to control the outcome before others move.',skill:'lore',tag:'bold',align:'chaotic',cid:'trace_directive'}]},
    alchemist:{ bonus:{skill:'craft',n:3}, choices:[
      {text:'Analyze the compound in the modified eastern cargo.',skill:'craft',tag:'bold',align:'neutral',cid:'east_road'},
      {text:'Create a reagent to reveal hidden markings on the manifests.',skill:'craft',tag:'risky',align:'neutral',cid:'study_packet'},
      {text:'Sell the compound analysis to the highest bidder.',skill:'persuasion',tag:'risky',align:'evil',cid:'sell_intel'}]},
    saint:    { bonus:{skill:'persuasion',n:3}, choices:[
      {text:'Appeal to the settlement directly in the name of your deity.',skill:'persuasion',tag:'bold',align:'lawful',cid:'trace_missing_persons'},
      {text:'Stand between the injured workers and whoever threatens them.',skill:'combat',tag:'bold',align:'good',cid:'confront_coth'},
      {text:'Make the operator understand what their choices have cost others.',skill:'persuasion',tag:'risky',align:'good',cid:'probe_order_origin'}]}
  };

  const entry = traitChoiceMap[arch] || { bonus:{skill:'lore',n:1}, choices:[{text:'Apply your expertise.',skill:'lore',tag:'safe',align:'neutral',cid:'passive_intel'}] };
  G._traitBonus = entry.bonus;
  addNarration('', '+' + entry.bonus.n + ' to ' + entry.bonus.skill + ' on your next action.');
  saveGame(); updateHUD();
  setTimeout(() => renderChoices(entry.choices), 300);
}

// ── CHOICE RESOLUTION ─────────────────────────────────────
function handleChoice(choice) {
  // Route legacy combat cids through enterCombat
  const legacyCombatCids = ['do_combat_patrol','confront_coth','take_private_contract'];
  if (legacyCombatCids.includes(choice.cid)) {
    const enemyMap = {do_combat_patrol:'patrol_guard', confront_coth:'house_shelk_operative', take_private_contract:'hired_muscle'};
    document.querySelectorAll('.choice-block,.move-block').forEach(b=>b.remove());
    if (typeof enterCombat === 'function') enterCombat(enemyMap[choice.cid]||'patrol_guard', {});
    return;
  }
  // Check for combat entry trigger
  if (choice.cid && choice.cid.startsWith('__combat_')) {
    const parts = choice.cid.split('__');
    // parts: ['', 'combat', mode, enemyKey, (abilityId)?]
    const mode = parts[2];
    const enemyKey = parts[3] || 'patrol_guard';
    const abilityId = parts[4] || null;
    document.querySelectorAll('.choice-block,.move-block').forEach(b=>b.remove());
    resolveCombatEntry(mode, enemyKey, abilityId);
    return;
  }
  // Check for recruit trigger
  if (choice.cid && choice.cid.startsWith('__recruit__')) {
    const parts = choice.cid.split('__');
    const defId = parts[2]; const outcome = parts[3];
    document.querySelectorAll('.choice-block,.move-block').forEach(b => b.remove());
    if (typeof resolveRecruitChoice === 'function') resolveRecruitChoice(defId, outcome);
    return;
  }
  // Check for camp talk trigger
  if (choice.cid === '__camp_talk__') {
    document.querySelectorAll('.choice-block,.move-block').forEach(b => b.remove());
    if (typeof showCampTalk === 'function') showCampTalk();
    return;
  }
  // Check for shop trigger
  if (choice.cid === '__shop__') {
    document.querySelectorAll('.choice-block,.move-block').forEach(b => b.remove());
    addNarration('', '<em>You chose: ' + choice.text + '</em>');
    showShop();
    return;
  }
  // Check for combat trigger
  if (choice.cid && choice.cid.startsWith('__combat__')) {
    const enemyId = choice.cid.replace('__combat__','');
    document.querySelectorAll('.choice-block,.move-block').forEach(b => b.remove());
    addNarration('', '<em>You chose: ' + choice.text + '</em>');
    if (typeof startCombat === 'function') startCombat(enemyId, {});
    return;
  }

  document.querySelectorAll('.choice-block,.move-block').forEach(b => b.remove());
  addNarration('', '<em style="color:var(--ink-faint);font-size:13px">You chose: ' + choice.text + '</em>');

  const skillVal = G.skills[choice.skill] || 0;
  const traitBonus = getTraitBonus(choice.skill);
  const oneTime = (G._traitBonus && (G._traitBonus.skill === choice.skill || G._traitBonus.skill === 'any')) ? G._traitBonus.n : 0;
  if (oneTime) G._traitBonus = null;

  // Training disadvantage
  const disadvantage = G.trainingDisadvantage > 0 ? -2 : 0;
  if (G.trainingDisadvantage > 0) G.trainingDisadvantage--;

  // Equipment bonuses
  const eqBonus = getEquipmentBonus(choice.skill);
  // Companion bonuses
  const compBonus = (typeof getCompanionRollBonus === 'function') ? getCompanionRollBonus(choice.skill) : 0;

  const roll = Math.floor(Math.random() * 20) + 1;
  const total = roll + skillVal + traitBonus + oneTime + disadvantage + eqBonus + compBonus;
  const diff = choice.tag === 'safe' ? 7 : choice.tag === 'risky' ? 12 : 15;
  const success = total >= diff;
  const partial = !success && total >= diff - 4;

  // Roll display
  let rollDisplay = 'd20: ' + roll;
  if (skillVal) rollDisplay += ' + ' + choice.skill + ' ' + skillVal;
  if (traitBonus) rollDisplay += ' + trait ' + traitBonus;
  if (oneTime) rollDisplay += ' + ability ' + oneTime;
  if (disadvantage) rollDisplay += ' ' + disadvantage + ' (training fatigue)';
  if (eqBonus) rollDisplay += ' + gear ' + eqBonus;
  if (compBonus) rollDisplay += ' + companion ' + compBonus;
  rollDisplay += ' = <strong>' + total + '</strong> vs ' + diff;

  addNarration('', '<span style="font-size:11px;color:var(--ink-faint);font-family:Cinzel,serif">' + rollDisplay + '</span>');

  // Alignment
  const alignShifts = {lawful:[0,5], chaotic:[0,-5], good:[8,0], evil:[-8,0]};
  const shift = alignShifts[choice.align];
  if (shift) shiftAlignment(shift[0], shift[1]);

  advanceTime(1);
  advanceRivals();
  if (typeof advanceFactionClocks === 'function') advanceFactionClocks(1);
  if (typeof checkCompanionLeave === 'function') checkCompanionLeave();

  const loading = document.createElement('div');
  loading.className = 'scene-block loading-block';
  loading.innerHTML = '<div class="spinner"></div><span>The world turns...</span>';
  document.getElementById('narrative-content').appendChild(loading);
  scrollNarrative();

  setTimeout(() => { loading.remove(); resolveConsequence(choice.cid, success, partial); }, 600);
}

function getTraitBonus(skill) {
  if (!G.archetype) return 0;
  const id = G.archetype.id;
  if ((id==='warrior'||id==='knight'||id==='paladin'||id==='berserker') && skill==='combat') return 2;
  if (id==='ranger' && skill==='survival') return 2;
  if (id==='archer' && skill==='stealth') return 1;
  if ((id==='wizard'||id==='necromancer') && skill==='lore') return 2;
  if ((id==='cleric'||id==='priest'||id==='saint') && skill==='persuasion') return 2;
  if (id==='illusionist' && skill==='stealth') return 2;
  if (id==='inquisitor' && skill==='lore') return 1;
  if (id==='elementalist' && skill==='survival') return 2;
  if ((id==='rogue'||id==='scout_c') && skill==='stealth') return 2;
  if ((id==='assassin'||id==='spellthief'||id==='thief') && skill==='stealth') return 2;
  if (id==='trickster' && skill==='persuasion') return 2;
  if ((id==='artificer'||id==='engineer'||id==='alchemist') && skill==='craft') return 2;
  if (id==='tactician' && skill==='lore') return 2;
  if (id==='healer' && skill==='lore') return 1;
  return 0;
}

function getEquipmentBonus(skill) {
  let bonus = 0;
  if (G.equipped && G.equipped.weapon && G.equipped.weapon.skillBonus === skill) bonus += G.equipped.weapon.bonus || 0;
  if (G.equipped && G.equipped.armor && G.equipped.armor.skillBonus === skill) bonus += G.equipped.armor.bonus || 0;
  if (G.equipped && G.equipped.tool && G.equipped.tool.skillBonus === skill) bonus += G.equipped.tool.bonus || 0;
  return bonus;
}

function resolveConsequence(cid, success, partial) {
  const entry = C[cid];
  if (!entry) {
    if (success) { addNarration('', 'The action finds purchase.', 'success'); gainXP(3); }
    else { addNarration('', 'The approach fails. The situation is unchanged but you are noticed.', 'failure'); modHP(-1); }
    renderChoices([
      { text:'Try a different approach.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel' },
      { text:'Ask around for better information first.', skill:'persuasion', tag:'safe', align:'neutral', cid:'market_intel' }
    ]);
    return;
  }
  const res = success ? entry.success : (partial && entry.partial ? entry.partial : entry.failure);
  const rtype = success ? 'success' : partial ? 'partial' : 'failure';
  addNarration('', res.text, rtype);
  (res.effects || []).forEach(fx => applyEffect(fx));
  if (res.xp) gainXP(res.xp);
  saveGame(); updateHUD();
  if (!_awaitingLevelUp && res.next) setTimeout(() => renderChoices(res.next), 400);
}

function applyEffect(fx) {
  switch (fx.type) {
    case 'journal':   addJournal(fx.msg); break;
    case 'quest':     addQuest(fx.msg); break;
    case 'gold':      modGold(fx.n); break;
    case 'faction':   modFaction(fx.id, fx.n); break;
    case 'damage':    modHP(-Math.abs(fx.n)); break;
    case 'heal':      G.hp = Math.min(G.maxHp, G.hp + Math.floor(G.maxHp * (fx.pct || 0.2))); updateHUD(); break;
    case 'tick':      tickAxis(fx.n || 1); break;
    case 'renown':    G.renown = Math.max(0, (G.renown||0) + fx.n); updateHUD(); break;
    case 'morality':  shiftAlignment(fx.n, 0); break;
    case 'order':     shiftAlignment(0, fx.n); break;
    case 'combat':    if (typeof triggerCombatEncounter === 'function') triggerCombatEncounter(fx.enemy, fx.context||{}); break;
    case 'npcmem':    updateNPCMemory(fx.npc, fx.change); break;
    case 'additem':   addToInventory(fx.item); break;
    case 'history':   G.history.push(fx.msg); break;
    case 'stage2':    checkStage2Unlock(); break;
  }
}

// ── NPC MEMORY ───────────────────────────────────────────
function updateNPCMemory(npcId, change) {
  if (!G.npcMemory) G.npcMemory = {};
  if (!G.npcMemory[npcId]) G.npcMemory[npcId] = { trust:0, seen:0, lastNote:'' };
  const npc = G.npcMemory[npcId];
  npc.seen++;
  if (change && change.trust) npc.trust += change.trust;
  if (change && change.note) npc.lastNote = change.note;
}

function getNPCTrust(npcId) {
  if (!G.npcMemory || !G.npcMemory[npcId]) return 0;
  return G.npcMemory[npcId].trust || 0;
}

// ── INVENTORY ────────────────────────────────────────────
function addToInventory(item) {
  if (!G.inventory) G.inventory = [];
  G.inventory.push(Object.assign({ equipped:false }, item));
  showToast('Acquired: ' + item.name);
}

function equipItem(idx) {
  if (!G.inventory || !G.inventory[idx]) return;
  const item = G.inventory[idx];
  const slot = item.type === 'weapon' ? 'weapon' : item.type === 'armor' ? 'armor' : 'tool';
  // Unequip previous
  if (G.equipped[slot]) {
    const prev = G.inventory.find(i => i.name === G.equipped[slot].name);
    if (prev) prev.equipped = false;
  }
  item.equipped = true;
  G.equipped[slot] = item;
  saveGame(); updateHUD();
  showToast('Equipped: ' + item.name);
}

// ── WOUNDS AND RECOVERY ───────────────────────────────────
function updateRecoveryState() {
  const pct = G.hp / G.maxHp;
  const woundCount = (G.wounds || []).filter(w => !w.healed).length;
  if (pct >= 0.8 && woundCount === 0) G.recoveryState = 'stable';
  else if (pct >= 0.5) G.recoveryState = 'recovering';
  else if (pct >= 0.3) G.recoveryState = woundCount > 0 ? 'untreated' : 'recovering';
  else if (pct > 0.1) G.recoveryState = woundCount > 1 ? 'worsening' : 'untreated';
  else G.recoveryState = 'critical';
}

// ── HP ────────────────────────────────────────────────────
function modHP(n) {
  G.hp = Math.max(0, Math.min(G.maxHp, G.hp + n));
  if (n < 0 && G.hp <= 2) {
    G.hp = 2;
    G.recoveryState = 'critical';
    addNarration('', '<em style="color:var(--blood-bright)">You are critically wounded. Rest before you collapse.</em>');
  }
  updateRecoveryState();
  updateHUD();
}

// ── XP AND LEVEL UP ──────────────────────────────────────
function gainXP(n) {
  n = Math.min(n, 8);
  G.xp = (G.xp || 0) + n;
  checkLevelUp();
}

function checkLevelUp() {
  const needed = G.level * 60;
  if (G.xp >= needed && G.level < 20 && !_awaitingLevelUp) {
    _awaitingLevelUp = true;
    G.xp -= needed;
    G.level++;
    G.maxHp = Math.floor(G.maxHp * 1.1);
    G.hp = Math.min(G.maxHp, G.hp + 2);
    checkStageAdvance();
    updateHUD();
    showLevelUpScreen();
  }
}

function checkStageAdvance() {
  if (G.level === 6 && G.stage === 'Stage I') {
    G.stage = 'Stage II'; G.stageLabel = 'Local Inter-Polity';
    addNarration('', '<em style="color:var(--gold-bright)">&#x2014; STAGE II UNLOCKED &#x2014; The world widens. You may now travel beyond your origin polity where routes support it.</em>');
    addJournal('Advanced to Stage II: Local Inter-Polity. New regions accessible.');
    G.history.push('Completed Stage I. Entered the wider world at Level 6.');
    updateHUD();
  } else if (G.level === 11 && G.stage === 'Stage II') {
    G.stage = 'Stage III'; G.stageLabel = 'Greater Inter-Polity';
    addNarration('', '<em style="color:var(--gold-bright)">&#x2014; STAGE III &#x2014; Your name reaches across polity lines.</em>');
    addJournal('Advanced to Stage III: Greater Inter-Polity.');
    G.history.push('Completed Stage II. Name known across the Material Planet at Level 11.');
  } else if (G.level === 16 && G.stage === 'Stage III') {
    G.stage = 'Stage IV'; G.stageLabel = 'International';
    addNarration('', '<em style="color:var(--gold-bright)">&#x2014; STAGE IV &#x2014; International consequence. What you do now echoes.</em>');
    addJournal('Advanced to Stage IV: International.');
    G.history.push('Reached Stage IV at Level 16. Your name crosses borders.');
  } else if (G.level === 19 && G.stage === 'Stage IV') {
    G.stage = 'Stage V'; G.stageLabel = 'International to Cosmic';
    addNarration('', '<em style="color:var(--gold-bright)">&#x2014; STAGE V &#x2014; The axis responds to what you do. The world is watching.</em>');
    addJournal('Advanced to Stage V: International to Cosmic. The investigation has become something larger.');
    G.history.push('Reached Stage V at Level 19. The axis itself is in motion.');
    addWorldNotice('[STAGE V] The axis anomaly has escalated to international consequence. Roadwarden Order formally requests all parties with evidence to come forward.');
    // Stage V quest spines
    addQuest('Stage V: Identify who authorized the original axis exploitation operation.');
    addQuest('Stage V: Determine what the cargo was — and whether it can be recovered or must be destroyed.');
    addQuest('Stage V: Prevent the next inversion window from being used again.');
  }
}

function showLevelUpScreen() {
  document.querySelectorAll('.choice-block,.move-block,.levelup-block').forEach(b => b.remove());
  const archId = G.archetype ? G.archetype.id : 'warrior';
  const tree = (typeof ARCHETYPE_ABILITY_TREES !== 'undefined' && ARCHETYPE_ABILITY_TREES[archId]) || [];
  const combatAbs = (typeof ARCHETYPE_COMBAT_ABILITIES !== 'undefined' && ARCHETYPE_COMBAT_ABILITIES[archId]) || [];

  // Build 5 options: mix of skills and archetype abilities
  const allOptions = [];

  // Skills (always available if not maxed)
  ['combat','survival','persuasion','lore','stealth','craft'].forEach(sk => {
    const cur = G.skills[sk] || 0;
    if (cur < 5) {
      allOptions.push({
        kind:'skill', sk,
        label: sk.charAt(0).toUpperCase() + sk.slice(1) + ' +1',
        detail: 'Improve ' + sk + ' from ' + cur + ' to ' + (cur+1) + '/5',
        locked: false,
        tag: 'skill'
      });
    }
  });

  // Archetype passive/active abilities unlocked at this level
  const unlockedAbils = tree.filter(ab => {
    const levelOk = ab.unlockLevel <= G.level;
    const skillOk = (G.skills[ab.skillReq.skill] || 0) >= ab.skillReq.min;
    const notOwned = !(G.unlockedAbilities || []).includes(ab.id);
    return levelOk && skillOk && notOwned;
  });

  unlockedAbils.forEach(ab => {
    allOptions.push({
      kind: 'ability', ab,
      label: ab.name + (ab.type === 'passive' ? ' (Passive)' : ' (Active)'),
      detail: ab.gameEffect,
      locked: false,
      tag: ab.type
    });
  });

  // Combat abilities
  const unlockedCombat = combatAbs.filter(ab => {
    const skillOk = (G.skills[ab.skillReq] || 0) >= ab.minSkill;
    const notOwned = !(G.unlockedCombatAbilities || []).includes(ab.id);
    return skillOk && notOwned;
  });
  unlockedCombat.forEach(ab => {
    allOptions.push({
      kind: 'combat_ability', ab,
      label: ab.name + ' (Combat)',
      detail: ab.effect + (ab.cost ? ' [' + ab.cost + ']' : ''),
      locked: false,
      tag: 'combat'
    });
  });

  // Show up to 5 options, prioritizing abilities over basic skills if available
  const prioritized = [
    ...allOptions.filter(o => o.kind !== 'skill'),  // abilities first
    ...allOptions.filter(o => o.kind === 'skill'),  // skills after
  ].slice(0, 5);

  // If fewer than 2 options (very late game), show all skills
  if (prioritized.length < 2) {
    ['combat','survival','persuasion','lore','stealth','craft'].forEach(sk => {
      const cur = G.skills[sk] || 0;
      if (cur < 5 && !prioritized.find(o => o.kind==='skill' && o.sk===sk)) {
        prioritized.push({ kind:'skill', sk, label:sk+' +1', detail:cur+'/5 → '+(cur+1)+'/5', locked:false, tag:'skill' });
      }
    });
  }

  const title = prioritized.length === 0 ?
    'Your skills and abilities are at their peak for your current level.' :
    'Choose one advancement:';

  addNarration('', '<em class="level-up-msg">&#x2014; LEVEL ' + G.level + ' REACHED &#x2014;</em><br><span style="color:var(--gold-dim);font-size:13px">' + getRenownedTitle() + ' &middot; ' + (G.stageLabel||G.stage) + '</span>');

  const el = document.getElementById('narrative-content');
  const block = document.createElement('div');
  block.className = 'scene-block levelup-block';

  let html = '<div class="lu-title">' + title + '</div>';

  if (prioritized.length === 0) {
    html += '<button class="btn btn-ghost btn-sm" id="btn-lu-close" style="margin-top:12px">Continue</button>';
  } else {
    html += '<div class="lu-options">';
    prioritized.forEach((opt, i) => {
      const tagClass = opt.tag === 'passive' ? 'jade' : opt.tag === 'active' ? 'gold' : opt.tag === 'combat' ? 'blood' : 'neutral';
      html += '<button class="lu-option-btn" data-lu-idx="' + i + '">' +
        '<div class="lu-opt-label">' + opt.label + '</div>' +
        '<div class="lu-opt-detail">' + opt.detail + '</div>' +
        '<div class="lu-opt-tag lu-tag-' + tagClass + '">' + opt.tag + '</div>' +
        '</button>';
    });
    html += '</div>';
    html += '<div style="margin-top:8px;font-size:11px;color:var(--ink-faint);font-family:Cinzel,serif;letter-spacing:1px">SELECT ONE ADVANCEMENT</div>';
  }

  block.innerHTML = html;
  el.appendChild(block);

  if (prioritized.length === 0) {
    block.querySelector('#btn-lu-close').addEventListener('click', () => {
      block.remove(); _awaitingLevelUp = false;
      saveGame(); updateHUD();
      renderChoices([{text:'Continue.',skill:'lore',tag:'safe',align:'neutral',cid:'passive_intel'}]);
    });
  } else {
    block.querySelectorAll('.lu-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.luIdx, 10);
        const opt = prioritized[idx];
        applyLevelUpChoice(opt);
        block.remove();
        _awaitingLevelUp = false;
        saveGame(); updateHUD();
        const desc = opt.kind === 'skill' ? opt.sk + ' improved to ' + G.skills[opt.sk] + '/5.' :
                     opt.kind === 'ability' ? 'Learned: ' + opt.ab.name + '. ' + opt.ab.gameEffect :
                     'Learned combat ability: ' + opt.ab.name + '.';
        addNarration('Level ' + G.level, desc, 'success');
        addJournal('Level ' + G.level + ': ' + desc);
        G.history.push('Level ' + G.level + ' — ' + desc);
        renderChoices([
          {text:'Continue the investigation.',skill:'lore',tag:'safe',align:'neutral',cid:'passive_intel'},
          {text:'Apply your new capabilities.',skill:opt.kind==='skill'?opt.sk:'combat',tag:'safe',align:'neutral',cid:'market_intel'}
        ]);
      });
    });
  }
  scrollNarrative();
}

function applyLevelUpChoice(opt) {
  if (opt.kind === 'skill') {
    if ((G.skills[opt.sk]||0) < 5) G.skills[opt.sk]++;
  } else if (opt.kind === 'ability') {
    if (!G.unlockedAbilities) G.unlockedAbilities = [];
    G.unlockedAbilities.push(opt.ab.id);
    // Apply passive effects immediately
    applyPassiveAbility(opt.ab);
  } else if (opt.kind === 'combat_ability') {
    if (!G.unlockedCombatAbilities) G.unlockedCombatAbilities = [];
    G.unlockedCombatAbilities.push(opt.ab.id);
  }
}

function applyPassiveAbility(ab) {
  // Apply permanent stat changes from passive abilities
  const effect = ab.gameEffect || '';
  if (effect.includes('Max HP +')) {
    const m = effect.match(/Max HP \+(\d+)/);
    if (m) { G.maxHp += parseInt(m[1]); G.hp = Math.min(G.maxHp, G.hp + parseInt(m[1])); }
  }
  if (effect.includes('Permanent +1 to')) {
    const m = effect.match(/Permanent \+1 to (\w+)/i);
    if (m && G.skills[m[1].toLowerCase()] !== undefined) {
      if (G.skills[m[1].toLowerCase()] < 5) G.skills[m[1].toLowerCase()]++;
    }
  }
  if (effect.includes('Craft +2 permanently')) {
    if ((G.skills.craft||0) < 5) G.skills.craft++;
  }
  if (effect.includes('Lore gains +2')) {
    // Handled by getTraitBonus at roll time
  }
}

function getLevelUpSkillCount() {
  if (G.level <= 2) return 2;
  if (G.level <= 5) return 3;
  if (G.level <= 10) return 4;
  return 5;
}

// ── STAGE 2 ───────────────────────────────────────────────
function checkStage2Unlock() {
  if (G.level >= 6 && G.stage === 'Stage I') checkStageAdvance();
}

// ── ALIGNMENT ────────────────────────────────────────────
function shiftAlignment(morChange, ordChange) {
  G.morality = Math.max(-100, Math.min(100, (G.morality||0) + morChange));
  G.order    = Math.max(-100, Math.min(100, (G.order||0) + ordChange));
  updateAlignmentHUD();
}

function getAlignmentLabel() {
  const m = G.morality||0, o = G.order||0;
  const mor = m>30?'Good':m<-30?'Evil':'Neutral';
  const ord = o>30?'Lawful':o<-30?'Chaotic':'Neutral';
  if (mor==='Neutral' && ord==='Neutral') return 'True Neutral';
  return ord + ' ' + mor;
}

// ── MECHANICS ────────────────────────────────────────────
function modGold(n) { G.gold = Math.max(0, G.gold + n); updateHUD(); }
function modFaction(id, n) {
  const f = (G.factions||[]).find(x => x.id===id);
  if (f) f.rep = Math.max(0, Math.min(100, f.rep + n));
  updateFactionHUD();
}
function tickAxis(n) {
  n = n||1; G.axisTick = (G.axisTick||0)+n;
  if (G.axisTick >= 73) {
    G.axisTick -= 73; G.axisInverted = !G.axisInverted;
    addNarration('', '<em style="color:var(--blood-bright)">The axis inverts. The sky tilts wrong. Seasons shift without warning.</em>');
    showToast('Axis Inverted.'); updateEnvironmentPanel();
  }
  updateHUD();
}
function addJournal(text, category, dedupeKey) {
  if (!G.journal) G.journal = [];
  if (!G.journalRecords) G.journalRecords = [];
  category = category || 'field_note';
  dedupeKey = dedupeKey || text.slice(0, 40);

  // Dedupe
  const existing = G.journalRecords.find(e => e.dedupeKey === dedupeKey);
  if (existing) {
    existing.text = text; existing.day = G.dayCount||0; existing.updated = true;
    G.journal = G.journalRecords.slice(0,30).map(e => e.text);
    updateJournalHUD(); return;
  }

  G.journalRecords.unshift({
    id: 'j_'+Date.now(), category, dedupeKey,
    locality: G.location, day: G.dayCount||0, text, severity:'normal'
  });
  if (G.journalRecords.length > 60) G.journalRecords.pop();
  G.journal = G.journalRecords.slice(0,30).map(e => e.text);
  updateJournalHUD();
}
function addQuest(text) {
  if (!G.quests) G.quests = [];
  if (!G.quests.includes(text)) {
    G.quests.push(text); updateQuestHUD();
    showToast('Quest: ' + text.slice(0,40) + (text.length>40?'...':''));
  }
}

// ── TRAVEL ───────────────────────────────────────────────
function travelTo(locId) {
  const loc = WORLD_LOCATIONS[locId];
  if (!loc) return;
  const cur = WORLD_LOCATIONS[G.location];
  if ((G.stage === 'Stage I') && cur && loc.region !== cur.region) {
    addNarration('', '<em style="color:var(--gold-dim)">Stage I confines you to ' + cur.region + '. Reach Level 6 to journey beyond.</em>');
    return;
  }
  G.location = locId;
  tickAxis(Math.floor(Math.random() * 3) + 1);
  advanceTime(2);
  addNarration(loc.name, '<strong>' + loc.name + '</strong>. ' + loc.desc);
  G.history.push('Traveled to ' + loc.name + '.');
  updateHUD(); updateEnvironmentPanel(); saveGame();
  setTimeout(() => renderChoices([
    { text:'Find the local inn and ask what people know.', skill:'persuasion', tag:'safe', align:'neutral', cid:'inn_arrival' },
    { text:'Walk the settlement and read it.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel' },
    { text:'Seek the local authority.', skill:'persuasion', tag:'bold', align:'lawful', cid:'garrison_contact' }
  ]), 300);
}


// ── RECOVERY SERVICES ─────────────────────────────────────
function seekProfessionalCare() {
  const loc = WORLD_LOCATIONS[G.location];
  const healerNPC = loc && loc.npcData ? loc.npcData.find(n => /physician|healer|medic/i.test(n.role)) : null;
  const cost = Math.max(5, (G.wounds||[]).filter(w=>!w.healed).length * 8);

  if (!healerNPC) {
    addNarration('Recovery', 'No professional healer found in this settlement. Try a larger settlement or make camp.');
    renderChoices([{text:'Make camp and rest.', skill:'survival', tag:'safe', align:'neutral', cid:'rest_recover'}]);
    return;
  }

  addNarration('Recovery — ' + healerNPC.name, healerNPC.name + ' (' + healerNPC.role + ') examines your condition. Professional care will cost ' + cost + ' gold.');

  const choices = [];
  if (G.gold >= cost) {
    choices.push({text:'Pay for treatment. (' + cost + ' gold)', skill:'persuasion', tag:'safe', align:'lawful', cid:'shrine_service'});
  }
  choices.push({text:'Ask for partial treatment you can afford.', skill:'persuasion', tag:'risky', align:'neutral', cid:'shrine_contact'});
  if ((G.skills.persuasion||0) >= 3) {
    choices.push({text:'Offer your skills in exchange for treatment.', skill:'persuasion', tag:'risky', align:'good', cid:'shrine_service'});
  }
  choices.push({text:'Decline and manage your own recovery.', skill:'survival', tag:'safe', align:'neutral', cid:'rest_recover'});

  renderChoices(choices);
}

// ── CAMP ─────────────────────────────────────────────────
function campAction(type) {
  closeOverlay('overlay-camp');
  if (typeof maybeShowTutorial === 'function') maybeShowTutorial('first_camp');
  if (type === 'rest') {
    const healed = Math.floor(G.maxHp * 0.45);
    G.hp = Math.min(G.maxHp, G.hp + healed);
    tickAxis(1); advanceTime(2);
    if (G.traits && G.traits[0]) G.traits[0].used = false;
    // Reduce fatigue
    G.fatigue = Math.max(0, (G.fatigue||0) - 1);
    updateRecoveryState();
    addNarration('Camp', 'You rest. +' + healed + ' HP. Trait refreshed. Fatigue reduced.', 'success');
    addJournal('Rested at camp. Recovered HP. Trait refreshed.');
    updateHUD(); saveGame();
    setTimeout(() => renderChoices([
      { text:'Continue the investigation.', skill:'lore', tag:'safe', align:'neutral', cid:'market_intel' },
      { text:'Move forward along the eastern route.', skill:'survival', tag:'bold', align:'neutral', cid:'east_road' }
    ]), 300);
  } else if (type === 'talk') {
    if (typeof showCampTalk === 'function') {
      showCampTalk();
    } else {
      addNarration('Camp', 'You rest alone with your thoughts.');
      setTimeout(() => renderChoices([{text:'Break camp.',skill:'lore',tag:'safe',align:'neutral',cid:'passive_intel'}]), 300);
    }
  } else if (type === 'train') {
    showTrainingMenu();
  } else if (type === 'recover') {
    closeOverlay('overlay-camp');
    seekProfessionalCare();
  } else if (type === 'craft') {
    if (G.level < 2) {
      addNarration('Camp', 'Crafting unlocks at Level 2.');
      setTimeout(() => renderChoices([{text:'Break camp.',skill:'lore',tag:'safe',align:'neutral',cid:'passive_intel'}]), 300);
    } else if (G.gold < 5) {
      addNarration('Camp', 'You need at least 5 gold in materials to craft.');
      setTimeout(() => renderChoices([{text:'Break camp.',skill:'lore',tag:'safe',align:'neutral',cid:'passive_intel'}]), 300);
    } else {
      tickAxis(1); modGold(-5);
      const craftRoll = Math.floor(Math.random() * 20) + 1 + (G.skills.craft||0);
      if (craftRoll >= 10) {
        addToInventory({ name:'Crafted Supplies', type:'tool', skillBonus:'craft', bonus:1, equipped:false });
        addNarration('Camp', 'You craft useful supplies. A tool that gives +1 craft added to inventory.', 'success');
      } else {
        addNarration('Camp', 'The materials are used up but the result is not quite right. Nothing gained.', 'failure');
      }
      saveGame(); updateHUD();
      setTimeout(() => renderChoices([{text:'Break camp.',skill:'lore',tag:'safe',align:'neutral',cid:'passive_intel'}]), 300);
    }
  }
}

function showTrainingMenu() {
  closeOverlay('overlay-camp');
  document.querySelectorAll('.choice-block,.move-block').forEach(b => b.remove());
  // Training costs 1 tick and applies 5-choice disadvantage
  tickAxis(1);
  const skills = Object.entries(G.skills||{}).filter(([,v]) => v < 5);
  if (!skills.length) {
    addNarration('Training', 'All skills at maximum. Nothing left to train.');
    renderChoices([{text:'Break camp.',skill:'lore',tag:'safe',align:'neutral',cid:'passive_intel'}]);
    return;
  }
  const el = document.getElementById('narrative-content');
  const block = document.createElement('div');
  block.className = 'scene-block choice-block';
  let html = '<div class="choice-label">Train which skill? (Costs 1 axis tick &middot; Next 5 choices: -2 disadvantage)</div><div class="choices">';
  skills.forEach(([sk, val]) => {
    html += '<button class="choice-btn train-btn" data-skill="' + sk + '">' +
      '<span class="choice-text">Train <strong>' + sk + '</strong> (' + val + '/5)</span>' +
      '<span class="choice-meta"><span class="choice-tag safe">train</span></span></button>';
  });
  html += '</div><div style="margin-top:8px"><button class="btn btn-ghost btn-sm" id="btn-cancel-train">Cancel</button></div>';
  block.innerHTML = html;
  block.querySelectorAll('.train-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sk = btn.dataset.skill;
      G.skills[sk]++;
      G.trainingDisadvantage = 5;
      block.remove();
      addNarration('Training', 'Trained <strong>' + sk + '</strong> to ' + G.skills[sk] + '/5. Next 5 choices suffer -2 (training fatigue).', 'success');
      addJournal('Trained ' + sk + ' to ' + G.skills[sk] + '. Training fatigue applied for 5 choices.');
      updateHUD(); saveGame();
      renderChoices([{text:'Break camp.',skill:'lore',tag:'safe',align:'neutral',cid:'passive_intel'}]);
    });
  });
  block.querySelector('#btn-cancel-train').addEventListener('click', () => { block.remove(); showCamp(); });
  el.appendChild(block);
  scrollNarrative();
}

// ── MAP ───────────────────────────────────────────────────
function showMap() {
  if (typeof maybeShowTutorial === 'function') maybeShowTutorial('first_map');
  const mapBody = document.getElementById('map-body');
  if (!mapBody) return;
  const cur = WORLD_LOCATIONS[G.location];
  const curRegion = cur ? cur.region : '';
  const locs = Object.values(WORLD_LOCATIONS);
  const stage1Locs = locs.filter(l => l.region === curRegion);
  const stage2Locs = G.stage !== 'Stage I' ? locs.filter(l => l.region !== curRegion) : [];

  mapBody.innerHTML =
    '<div style="color:var(--ink-dim);font-size:13px;margin-bottom:16px">' +
    (G.stage === 'Stage I' ?
      'Stage I restricts travel to <strong>' + curRegion + '</strong>. Reach Level 6 to cross polity lines.' :
      'Stage II unlocked. Canon-supported routes connect the polities below.') +
    '</div>' +
    '<div class="map-locations">' +
    stage1Locs.concat(stage2Locs).map(l => {
      const isCur = l.id === G.location;
      const locked = G.stage === 'Stage I' && l.region !== curRegion;
      return '<div class="map-loc' + (isCur?' current':'') + (locked?' locked':'') + '">' +
        '<div class="map-loc-name">' + l.name + (isCur?' &#x2605;':'') + (locked?' &#x1F512;':'') + '</div>' +
        '<div class="map-loc-region">' + l.region + '</div>' +
        '<div class="map-loc-desc">' + l.desc + '</div>' +
        (isCur ? '<span style="color:var(--gold-dim);font-size:10px;font-family:Cinzel,serif">CURRENT</span>' :
         locked ? '<span style="color:var(--ink-faint);font-size:10px">Unlocks at Stage II</span>' :
         '<button class="btn btn-ghost btn-xs map-travel-btn" data-locid="' + l.id + '">Travel here</button>') +
        '</div>';
    }).join('') +
    '</div>';
  mapBody.querySelectorAll('.map-travel-btn').forEach(btn => {
    btn.addEventListener('click', () => { closeOverlay('overlay-map'); travelTo(btn.dataset.locid); });
  });
  showOverlay('overlay-map');
}


// ── LOCAL NPC MENU ────────────────────────────────────────
function showNPCMenu() {
  if (typeof maybeShowTutorial === 'function') maybeShowTutorial('first_npc');
  const loc = WORLD_LOCATIONS[G.location];
  if (!loc) return;
  const loreSkill = G.skills.lore || 0;
  const npcs = loc.npcData || [];
  const visible = npcs.filter(n => loreSkill >= (n.skillReq || 0));
  const hidden  = npcs.filter(n => loreSkill < (n.skillReq || 0));
  const trust = (npc) => (G.npcMemory && G.npcMemory[npc.name]) ? G.npcMemory[npc.name].trust : 0;

  let html = '<div style="margin-bottom:12px;color:var(--ink-dim);font-size:13px">' + loc.name + ' — ' + visible.length + ' of ' + npcs.length + ' contacts visible (Lore: ' + loreSkill + ')</div>';

  if (!visible.length) {
    html += '<div style="color:var(--ink-faint);font-style:italic;font-size:13px">No contacts visible at your current lore level. Spend time gathering information to learn who operates here.</div>';
  }

  visible.forEach(npc => {
    const t = trust(npc);
    const tLabel = t >= 10 ? 'Trusted' : t >= 3 ? 'Acquainted' : t < -3 ? 'Hostile' : 'Unknown';
    const tColor = t >= 10 ? 'var(--jade-bright)' : t < -3 ? 'var(--blood-bright)' : 'var(--ink-faint)';
    const seen = G.npcMemory && G.npcMemory[npc.name] ? G.npcMemory[npc.name].seen : 0;

    html += '<div class="npc-card" data-npc="' + npc.name + '">' +
      '<div class="npc-name">' + npc.name + '</div>' +
      '<div class="npc-role">' + npc.role + ' &middot; ' + npc.site + '</div>' +
      '<div class="npc-note">' + npc.note + '</div>' +
      '<div class="npc-meta">' +
        '<span style="color:' + tColor + '">' + tLabel + (seen ? ' (seen ' + seen + 'x)' : '') + '</span>' +
        (t >= 0 ? '<button class="btn btn-ghost btn-xs npc-approach-btn" data-npc-name="' + npc.name + '" data-npc-site="' + npc.site + '">Approach</button>' : '') +
      '</div>' +
      '</div>';
  });

  if (hidden.length) {
    html += '<div class="npc-hidden">+ ' + hidden.length + ' contact' + (hidden.length>1?'s':'') + ' require higher Lore to identify</div>';
  }

  const nb = document.getElementById('npc-overlay-body');
  if (nb) {
    nb.innerHTML = html;
    nb.querySelectorAll('.npc-approach-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        closeOverlay('overlay-npcs');
        approachNPC(btn.dataset.npcName, btn.dataset.npcSite);
      });
    });
  }
  showOverlay('overlay-npcs');
}

function approachNPC(npcName, site) {
  const loc = WORLD_LOCATIONS[G.location];
  if (!loc) return;
  const npc = (loc.npcData || []).find(n => n.name === npcName);
  if (!npc) return;

  const trust = (G.npcMemory && G.npcMemory[npcName]) ? G.npcMemory[npcName].trust : 0;
  const seen  = (G.npcMemory && G.npcMemory[npcName]) ? G.npcMemory[npcName].seen : 0;
  advanceTime(1);
  updateNPCMemory(npcName, {trust:0, note:'approached in ' + (loc ? loc.name : G.location)});

  const intro = seen > 0 ? npcName + ' recognizes you.' : 'You approach ' + npcName + ' at ' + site + '.';
  const trustNote = trust >= 10 ? ' They speak freely.' : trust < -3 ? ' They are cold.' : '';
  addNarration(npcName, intro + trustNote + ' ' + npc.note);

  // Generate context-appropriate NPC choices
  const persuasion = G.skills.persuasion || 0;
  const choices = [];

  // Always available: ask about the local situation
  choices.push({
    text:'Ask what they know about the current situation in ' + (loc ? loc.name : 'the area') + '.',
    skill:'persuasion', tag:'safe', align:'neutral', cid:'passive_intel'
  });

  // Trust-gated: ask directly about the investigation
  if (trust >= 3 || persuasion >= 3) {
    choices.push({
      text:'Ask them directly about the eastern route operation.',
      skill:'persuasion', tag:'risky', align:'neutral', cid:'probe_order_origin'
    });
  }

  // Role-specific choices
  if (/physician|medic|healer/i.test(npc.role)) {
    choices.push({
      text:'Ask for medical treatment. (-5 gold)',
      skill:'persuasion', tag:'safe', align:'lawful', cid:'shrine_service'
    });
  } else if (/archivist|curator|keeper|clerk/i.test(npc.role)) {
    choices.push({
      text:'Request access to their records.',
      skill:'lore', tag:'risky', align:'lawful', cid:'gilded_archives'
    });
  } else if (/tavern|innkeeper/i.test(npc.role)) {
    choices.push({
      text:'Buy information along with a drink.',
      skill:'persuasion', tag:'safe', align:'neutral', cid:'inn_arrival'
    });
  } else if (/commander|captain|sergeant|marshal/i.test(npc.role)) {
    choices.push({
      text:'State your purpose and request cooperation.',
      skill:'persuasion', tag:'bold', align:'lawful', cid:'garrison_contact'
    });
  }

  // High trust: recruit or deepened cooperation
  if (trust >= 15 && typeof canRecruit === 'function' && canRecruit(npcName)) {
    choices.push({
      text: 'Ask them to join you directly. You need someone like this.',
      skill: 'persuasion', tag: 'bold', align: 'good',
      cid: '__recruit__' + (Object.values(COMPANION_DEFS||{}).find(d=>d.npcId===npcName)||{id:'unknown'}).id + '__join'
    });
  } else if (trust >= 15) {
    choices.push({
      text: 'Propose they assist your investigation directly.',
      skill: 'persuasion', tag: 'risky', align: 'lawful', cid: 'report_findings'
    });
  }

  setTimeout(() => renderChoices(choices.slice(0, 4)), 300);
}

// ── JOURNAL OVERLAY ────────────────────────────────────────
function showJournal() {
  if (typeof maybeShowTutorial === 'function') maybeShowTutorial('first_journal');
  const jb = document.getElementById('journal-overlay-body');
  if (!jb) return;

  const records = G.journalRecords || [];
  const byCategory = {
    quest:       records.filter(e => e.category === 'quest'),
    field_note:  records.filter(e => e.category === 'field_note'),
    faction:     records.filter(e => e.category === 'faction'),
    rival:       records.filter(e => e.category === 'rival'),
    companion:   records.filter(e => e.category === 'companion'),
    fact:        records.filter(e => e.category === 'fact'),
  };

  const catSection = (title, entries) => {
    if (!entries.length) return '';
    return '<div class="jov-section"><div class="jov-title">' + title + '</div>' +
      entries.slice(0,8).map(e =>
        '<div class="jov-entry' + (e.updated ? ' updated' : '') + '">' +
        (e.locality && WORLD_LOCATIONS[e.locality] ? '<span style="font-size:9px;color:var(--gold-dim);font-family:Cinzel,serif;letter-spacing:1px">' + WORLD_LOCATIONS[e.locality].name + ' &middot; Day ' + e.day + '</span><br>' : '') +
        e.text + '</div>'
      ).join('') + '</div>';
  };

  // Build rich journal content
  const factionRows = (G.factions||[])
    .sort((a,b) => Math.abs(b.rep-50) - Math.abs(a.rep-50))
    .slice(0,8)
    .map(f => {
      const bar = Math.round(f.rep);
      const cls = f.rep>65?'positive':f.rep<35?'negative':'neutral';
      return '<div class="jov-faction"><span class="jov-fname">' + f.name + '</span>' +
        '<div class="faction-rep"><div class="faction-fill ' + cls + '" style="width:' + bar + '%"></div></div>' +
        '<span class="jov-frep">' + bar + '</span></div>';
    }).join('');

  const questRows = (G.quests||[]).map(q => '<div class="jov-quest">&#x25B6; ' + q + '</div>').join('') ||
    '<div style="color:var(--ink-faint);font-style:italic;font-size:13px">No active quests.</div>';

  const loreRows = (G.journal||[]).slice(0,20).map(j => '<div class="jov-entry">' + j + '</div>').join('') ||
    '<div style="color:var(--ink-faint);font-style:italic;font-size:13px">Your ledger is empty.</div>';

  const woundRows = (G.wounds||[]).filter(w=>!w.healed).map(w =>
    '<div class="jov-wound">' + w.desc + ' (' + w.severity + ')</div>'
  ).join('') || '<div style="color:var(--ink-faint);font-size:13px">No active wounds.</div>';

  const rivalRows = (G.rivalAdventurers||[]).map(r =>
    '<div class="jov-rival"><strong>' + r.name + '</strong> (' + r.archetype + ') &mdash; ' + r.hook + '<br>' +
    '<span style="color:var(--gold-dim);font-size:11px">Renown ' + r.renown + ' &middot; ' + (r.active ? 'Active' : r.lastSeen) + '</span></div>'
  ).join('') || '<div style="color:var(--ink-faint);font-size:13px">No known rivals yet.</div>';

  const invRows = (G.inventory||[]).map((item,i) =>
    '<div class="jov-item">' + item.name + ' <span style="color:var(--ink-faint);font-size:11px">(' + item.type + ')</span>' +
    (!item.equipped && item.skillBonus ?
      '<button class="btn btn-ghost btn-xs" style="margin-left:8px" onclick="equipItem(' + i + ');showJournal()">Equip</button>' : '') +
    (item.equipped ? ' <span style="color:var(--jade-bright);font-size:10px;font-family:Cinzel,serif">EQUIPPED</span>' : '') +
    '</div>'
  ).join('') || '<div style="color:var(--ink-faint);font-size:13px">Nothing in inventory.</div>';

  jb.innerHTML =
    '<div class="jov-section"><div class="jov-title">&#x25A0; Quests</div>' + questRows + '</div>' +
    '<div class="jov-section"><div class="jov-title">&#x25A0; Wounds &amp; Recovery</div>' +
    '<div class="jov-entry">State: <strong>' + (G.recoveryState||'stable') + '</strong> &middot; Fatigue: ' + (G.fatigue||0) + '/10</div>' +
    woundRows + '</div>' +
    '<div class="jov-section"><div class="jov-title">&#x25A0; Inventory</div>' + invRows + '</div>' +
    '<div class="jov-section"><div class="jov-title">&#x25A0; Faction Relations</div>' + factionRows + '</div>' +
    '<div class="jov-section"><div class="jov-title">&#x25A0; Rival Adventurers</div>' + rivalRows + '</div>' +
    '<div class="jov-section"><div class="jov-title">&#x25A0; Journal Entries</div>' + loreRows + '</div>';

  showOverlay('overlay-journal');
}

// ── CHARACTER SHEET ────────────────────────────────────────
function showCharSheet() {
  setText('sheet-title', G.name || 'Character');
  const needed = G.level * 60;
  const sb = document.getElementById('sheet-body');

  const woundRows = (G.wounds||[]).filter(w=>!w.healed).map(w =>
    '<div class="char-stat-row"><span class="char-stat-key">' + w.severity + '</span><span class="char-stat-val">' + w.desc + '</span></div>'
  ).join('') || '<div class="char-stat-row"><span style="color:var(--ink-faint);font-size:12px">No active wounds.</span></div>';

  const histRows = (G.history||[]).map(h => '<div class="history-entry">' + h + '</div>').join('');

  sb.innerHTML =
    '<div class="char-sheet-grid">' +
    '<div><div class="char-section-title">Identity</div>' +
    row('Name',G.name) + row('Class',G.archetype?G.archetype.name:'&#x2014;') +
    row('Background',G.background?G.background.name:'&#x2014;') +
    row('Origin',G.background?G.background.region:'&#x2014;') +
    row('Level',G.level + ' &mdash; ' + (G.stageLabel||G.stage)) +
    row('Renown', (G.renown||0) + ' — ' + getRenownedTitle()) + row('XP',G.xp+' / '+needed) +
    row('Alignment',getAlignmentLabel()) +
    '</div>' +
    '<div><div class="char-section-title">Vitals</div>' +
    row('HP',G.hp+' / '+G.maxHp) +
    row('Status',G.recoveryState||'stable') +
    row('Fatigue',((G.fatigue||0)+'/10')) +
    row('Gold',G.gold) +
    row('Axis',(G.axisInverted?'Inverted':'Normal')+' (Tick '+(G.axisTick||0)+')') +
    row('Time',TIME_NAMES[G.timeIndex||0]+' &middot; Day '+(G.dayCount||1)) +
    row('Location',WORLD_LOCATIONS[G.location]?WORLD_LOCATIONS[G.location].name:G.location) +
    '</div></div>' +

    '<div style="margin-top:20px"><div class="char-section-title">Skills</div>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">' +
    Object.entries(G.skills||{}).map(([k,v]) => {
      let dots=''; for(let i=0;i<5;i++) dots+='<div class="char-dot'+(i<v?' filled':'')+'"></div>';
      return '<div class="char-skill-row"><span class="char-skill-name">'+cap(k)+'</span><div class="char-skill-dots">'+dots+'</div></div>';
    }).join('') + '</div></div>' +

    '<div style="margin-top:20px"><div class="char-section-title">Trait</div>' +
    (G.traits||[]).map(t =>
      '<div style="margin-bottom:10px"><span class="trait-pill'+(t.used?' used':'')+'">'+t.name+(t.used?' (used)':'')+'</span>' +
      '<div style="font-size:12px;color:var(--ink-faint);margin-top:4px">'+t.desc+'</div></div>'
    ).join('') + '</div>' +
    (function(){
      const archId = G.archetype ? G.archetype.id : null;
      if (!archId) return '';
      const passiveAbs = [];
      if (typeof ARCHETYPE_ABILITY_TREES !== 'undefined') {
        const tree = ARCHETYPE_ABILITY_TREES[archId] || [];
        (G.unlockedAbilities||[]).forEach(id => { const a=tree.find(x=>x.id===id); if(a) passiveAbs.push(a); });
      }
      if (typeof ARCHETYPE_COMBAT_ABILITIES !== 'undefined') {
        const cabs = ARCHETYPE_COMBAT_ABILITIES[archId] || [];
        (G.unlockedCombatAbilities||[]).forEach(id => { const a=cabs.find(x=>x.id===id); if(a) passiveAbs.push({name:a.name,type:'combat',gameEffect:a.effect}); });
      }
      if (!passiveAbs.length) return '';
      return '<div style="margin-top:16px"><div class="char-section-title">Unlocked Abilities</div>' +
        passiveAbs.map(a => '<div class="ability-card"><div class="ability-card-name">'+a.name+'</div><div class="ability-card-type">'+a.type+'</div><div class="ability-card-effect">'+a.gameEffect+'</div></div>').join('') + '</div>';
    })() +

    '<div style="margin-top:20px"><div class="char-section-title">Alignment</div>' +
    '<div style="display:flex;gap:16px;margin-top:8px;flex-wrap:wrap">' +
    '<div style="flex:1;min-width:100px">' +
    '<div style="font-size:10px;color:var(--gold-dim);margin-bottom:4px;font-family:Cinzel,serif;letter-spacing:2px">MORALITY</div>' +
    '<div class="align-bar"><div class="align-fill morality" style="width:'+((G.morality||0)+100)/2+'%"></div></div>' +
    '<div style="display:flex;justify-content:space-between;font-size:9px;color:var(--ink-faint);margin-top:2px"><span>Evil</span><span>Good</span></div></div>' +
    '<div style="flex:1;min-width:100px">' +
    '<div style="font-size:10px;color:var(--gold-dim);margin-bottom:4px;font-family:Cinzel,serif;letter-spacing:2px">ORDER</div>' +
    '<div class="align-bar"><div class="align-fill order" style="width:'+((G.order||0)+100)/2+'%"></div></div>' +
    '<div style="display:flex;justify-content:space-between;font-size:9px;color:var(--ink-faint);margin-top:2px"><span>Chaotic</span><span>Lawful</span></div></div>' +
    '</div></div>' +

    '<div style="margin-top:20px"><div class="char-section-title">Wounds</div>' + woundRows + '</div>' +

    '<div style="margin-top:20px"><div class="char-section-title">History</div>' + histRows + '</div>';

  showOverlay('overlay-charsheet');
}

function row(k,v) { return '<div class="char-stat-row"><span class="char-stat-key">'+k+'</span><span class="char-stat-val">'+v+'</span></div>'; }
function cap(s) { return s.charAt(0).toUpperCase()+s.slice(1); }


function updateNoticesBadge() {
  const btn = document.getElementById('btn-notices');
  if (!btn) return;
  const unseen = (G.worldNotices||[]).filter(n=>!n.seen).length;
  btn.textContent = unseen > 0 ? 'Notices (' + unseen + ')' : 'Notices';
  btn.style.color = unseen > 0 ? 'var(--gold-bright)' : '';
}


// ── INVENTORY SHOPPING ─────────────────────────────────
const SHOP_INVENTORY = {
  shelkopolis:[
    {id:'basic_sword',name:'Roadwarden Blade',desc:'Standard issue. Reliable in a fight.',cost:18,type:'weapon',skillBonus:'combat',bonus:1,site:'Ironspool Ward'},
    {id:'lore_tome',name:'Principalities Almanac',desc:'Trade routes, faction rosters, settlement notes. Lore +1 for one scene.',cost:12,type:'tool',skillBonus:'lore',bonus:1,site:'Gilded Archives of Lore'},
    {id:'road_kit',name:'Road Kit',desc:'Bandages, rations, fire-steel. Survival +1 for one journey.',cost:8,type:'tool',skillBonus:'survival',bonus:1,site:'Verdant Row District'},
    {id:'lock_tools',name:'Locksmith Tools',desc:'Quality. Craft +1 on locks and security.',cost:15,type:'tool',skillBonus:'craft',bonus:1,site:'Ironspool Ward'},
    {id:'shelk_papers',name:'Shelk Transit Papers',desc:'Genuine. One checkpoint clears automatically.',cost:20,type:'tool',skillBonus:'persuasion',bonus:1,site:'House of Shelk Estate'},
  ],
  fairhaven:[
    {id:'farmers_blade',name:'Harvest Blade',desc:'Sturdy. Combat +1 in rural terrain.',cost:10,type:'weapon',skillBonus:'combat',bonus:1,site:'Fairhaven Market'},
    {id:'route_map',name:'Eastern Route Map',desc:'Hand-drawn. Shows waypoints the official charts omit.',cost:14,type:'tool',skillBonus:'survival',bonus:1,site:'Fairhaven Market'},
    {id:'healing_herbs',name:'Healing Herbs',desc:'Three uses. Each restores 4 HP.',cost:9,type:'consumable',skillBonus:'survival',bonus:0,site:'Fairhaven Market'},
  ],
  soreheim:[
    {id:'giant_wrench',name:'Engineering Wrench',desc:'Giant-forged. Craft +2 on mechanisms and structures.',cost:25,type:'tool',skillBonus:'craft',bonus:2,site:'Engineers Consortium Office'},
    {id:'allocation_pass',name:'Allocation Pass',desc:'Legitimate. Clears Soreheim checkpoints.',cost:30,type:'tool',skillBonus:'persuasion',bonus:1,site:'Allocation Hall'},
    {id:'frontier_armor',name:'Frontier Plate',desc:'Worn but solid. Defense +1 in all combat.',cost:35,type:'armor',skillBonus:'survival',bonus:1,site:'Workers Barracks'},
  ],
  guildheart:[
    {id:'union_seal',name:'Union Merchant Seal',desc:'Legitimate documentation. Trade interactions gain +1.',cost:22,type:'tool',skillBonus:'persuasion',bonus:1,site:'Neutral Counting House'},
    {id:'manifest_blank',name:'Blank Manifest',desc:'Official Union format. Stealth +1 when moving goods.',cost:18,type:'tool',skillBonus:'stealth',bonus:1,site:'Freight Exchange'},
  ],
  panim:[
    {id:'registry_excerpt',name:'Registry Excerpt',desc:'A certified copy of a death record. Evidence.',cost:15,type:'tool',skillBonus:'lore',bonus:1,site:'Panim Afterlife Registry'},
    {id:'grief_kit',name:'Grief Mediation Kit',desc:'Practical tools for the work. Persuasion +1 with bereaved.',cost:10,type:'tool',skillBonus:'persuasion',bonus:1,site:'Grief Mediation Office'},
  ],
  ithtananalor:[
    {id:'iron_accord_pass',name:'Iron Accord Pass',desc:'Checkpoint clearance in Roaz territory.',cost:28,type:'tool',skillBonus:'persuasion',bonus:1,site:'Iron Accord Offices'},
    {id:'quarry_blade',name:'Quarry Pick-Blade',desc:'Extraction work tool, effective weapon. Combat +1.',cost:12,type:'weapon',skillBonus:'combat',bonus:1,site:'Ironhold Quarry Gate'},
  ],
  aurora:[
    {id:'dome_kit',name:'Dome Survival Kit',desc:'Axis inversion protection for one event.',cost:20,type:'tool',skillBonus:'survival',bonus:2,site:'Dome Operations Center'},
    {id:'research_notes',name:'Research Concord Notes',desc:'Containment data. Lore +1 on containment-related rolls.',cost:25,type:'tool',skillBonus:'lore',bonus:1,site:'Research Concord Station'},
  ],
  cosmoria:[
    {id:'maritime_charts',name:'Maritime Charts',desc:'Cosmouth coastal routes. Survival +1 at sea.',cost:16,type:'tool',skillBonus:'survival',bonus:1,site:'Cosmouth Harbor'},
    {id:'cosmouth_blade',name:'Cosmouth Cutlass',desc:'Lightweight, reliable. Combat +1.',cost:20,type:'weapon',skillBonus:'combat',bonus:1,site:'Shipwright Yards'},
  ],
  shirshal:[
    {id:'law_brief',name:'Shirsh Legal Brief',desc:'Certified. Persuasion +1 in formal proceedings.',cost:18,type:'tool',skillBonus:'persuasion',bonus:1,site:'Law Archive'},
    {id:'evidence_kit',name:'Evidence Collection Kit',desc:'Lore +1 when gathering or presenting evidence.',cost:14,type:'tool',skillBonus:'lore',bonus:1,site:'Shirsh Evidence Vaults'},
  ],
  mimolot:[
    {id:'tariff_license',name:'Mimolot Tariff License',desc:'Archive access without sponsorship.',cost:30,type:'tool',skillBonus:'lore',bonus:1,site:'Book Tariff Office'},
    {id:'scholarly_notes',name:'Scholarly Research Notes',desc:'Lore +1 on magic-related rolls.',cost:20,type:'tool',skillBonus:'lore',bonus:1,site:'Scholar Residences'},
  ],
  sunspire:[
    {id:'frontier_kit',name:'Frontier Survival Kit',desc:'Axis event protection. Survival +2 in wilderness.',cost:22,type:'tool',skillBonus:'survival',bonus:2,site:'Frontier Company Office'},
    {id:'compliance_papers',name:'Arcane Compliance Papers',desc:'Clears magical checkpoints.',cost:25,type:'tool',skillBonus:'lore',bonus:1,site:'Arcane Compliance Post'},
  ],
};

function showShop() {
  if (typeof maybeShowTutorial === 'function') maybeShowTutorial('first_shop');
  const locId = G.location;
  const items = SHOP_INVENTORY[locId] || [];
  const loc = WORLD_LOCATIONS[locId];

  if (!items.length) {
    addNarration('', 'No goods of consequence are available for purchase here.');
    renderChoices([{text:'Continue.',skill:'lore',tag:'safe',align:'neutral',cid:'passive_intel'}]);
    return;
  }

  document.querySelectorAll('.choice-block,.move-block').forEach(b => b.remove());
  const el = document.getElementById('narrative-content');
  const block = document.createElement('div');
  block.className = 'scene-block';

  let html = '<div class="jov-title">Goods available in ' + (loc?loc.name:locId) + '</div>';
  html += '<div style="font-size:12px;color:var(--ink-faint);margin-bottom:12px">Your gold: <strong style="color:var(--gold)">' + G.gold + '</strong></div>';

  items.forEach((item, i) => {
    const canAfford = G.gold >= item.cost;
    const alreadyOwned = (G.inventory||[]).find(inv => inv.id === item.id);
    html += '<div class="shop-item">' +
      '<div class="shop-item-info">' +
        '<div class="shop-item-name">' + item.name + '</div>' +
        '<div class="shop-item-desc">' + item.desc + ' &middot; ' + item.site + '</div>' +
      '</div>' +
      '<div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0">' +
        '<div class="shop-item-cost">' + item.cost + 'g</div>' +
        (!alreadyOwned && canAfford ?
          '<button class="btn btn-ghost btn-xs shop-buy-btn" data-shop-idx="' + i + '">Buy</button>' :
          alreadyOwned ? '<span style="font-size:10px;color:var(--jade-bright);font-family:Cinzel,serif">OWNED</span>' :
          '<span style="font-size:10px;color:var(--blood);font-family:Cinzel,serif">NO GOLD</span>'
        ) +
      '</div></div>';
  });

  html += '<div style="margin-top:12px"><button class="btn btn-ghost btn-sm" id="btn-shop-close">Done shopping</button></div>';
  block.innerHTML = html;

  block.querySelectorAll('.shop-buy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = items[parseInt(btn.dataset.shopIdx, 10)];
      if (G.gold < item.cost) { showToast('Not enough gold.'); return; }
      modGold(-item.cost);
      addToInventory(Object.assign({}, item, { equipped:false }));
      // Refresh the shop display
      btn.closest('.shop-item').querySelector('.shop-buy-btn').replaceWith(
        Object.assign(document.createElement('span'), {
          style:'font-size:10px;color:var(--jade-bright);font-family:Cinzel,serif',
          textContent:'OWNED'
        })
      );
      block.querySelector('.shop-item-info + div > .shop-item-cost').previousSibling;
      // Update gold display
      const goldEl = block.querySelector('[style*="margin-bottom:12px"] strong');
      if (goldEl) goldEl.textContent = G.gold;
      showToast('Purchased: ' + item.name);
    });
  });

  const closeBtn = block.querySelector('#btn-shop-close');
  if (closeBtn) closeBtn.addEventListener('click', () => {
    block.remove();
    renderChoices([{text:'Continue.',skill:'lore',tag:'safe',align:'neutral',cid:'passive_intel'}]);
  });

  el.appendChild(block);
  scrollNarrative();
}


// ── SAVE SCHEMA MIGRATION ────────────────────────────────
function migrateState(loaded) {
  const v = loaded.schemaVersion || 1;
  // v1 -> v2: add alignment fields
  if (v < 2) {
    loaded.morality = loaded.morality || 0;
    loaded.order = loaded.order || 0;
  }
  // v2 -> v3: add wounds, fatigue, NPC memory, inventory, rivals
  if (v < 3) {
    loaded.wounds = loaded.wounds || [];
    loaded.fatigue = loaded.fatigue || 0;
    loaded.recoveryState = loaded.recoveryState || 'stable';
    loaded.npcMemory = loaded.npcMemory || {};
    loaded.trainingDisadvantage = loaded.trainingDisadvantage || 0;
    loaded.inventory = loaded.inventory || [];
    loaded.equipped = loaded.equipped || {weapon:null,armor:null,tool:null};
    loaded.rivalAdventurers = loaded.rivalAdventurers || [];
    loaded.dayCount = loaded.dayCount || 0;
    loaded.worldNotices = loaded.worldNotices || null;
  }
  // v3 -> v4: add ability tracking
  if (v < 4) {
    loaded.unlockedAbilities = loaded.unlockedAbilities || [];
    loaded.unlockedCombatAbilities = loaded.unlockedCombatAbilities || [];
    loaded.factionClocks = loaded.factionClocks || null;
    loaded.stageLabel = loaded.stageLabel || 'Grass Roots';
  }
  // v4 -> v5: add companion state and journal records
  if (v < 5) {
    loaded.companions = loaded.companions || {};
    loaded.tutorialFlags = loaded.tutorialFlags || {};
    loaded.journalRecords = loaded.journalRecords || [];
    // Migrate existing journal strings to typed records
    if (loaded.journal && loaded.journal.length && !loaded.journalRecords.length) {
      loaded.journalRecords = loaded.journal.map((text, i) => ({
        id: 'jmig_'+i, category: 'field_note', dedupeKey: text.slice(0,40),
        locality: loaded.location||'shelkopolis', day: i, text, severity: 'normal'
      }));
    }
  }
  loaded.schemaVersion = 5;
  return loaded;
}

// ── TUTORIAL CALLOUTS ─────────────────────────────────────
const TUTORIAL_FLAGS = {
  first_choice: false,
  first_combat: false,
  first_levelup: false,
  first_camp: false,
  first_journal: false,
  first_npc: false,
  first_shop: false,
  first_map: false,
};

function showTutorial(flag, message) {
  if (!G.tutorialFlags) G.tutorialFlags = {};
  if (G.tutorialFlags[flag]) return; // already shown
  G.tutorialFlags[flag] = true;

  const el = document.getElementById('narrative-content');
  const callout = document.createElement('div');
  callout.className = 'scene-block';
  callout.innerHTML = '<div class="tutorial-callout">' + message +
    '<button class="tutorial-callout-close" data-tc-id="' + flag + '">&#x00D7;</button>' +
    '</div>';
  callout.querySelector('.tutorial-callout-close').addEventListener('click', () => callout.remove());
  el.insertBefore(callout, el.firstChild);
  saveGame();
}

function maybeShowTutorial(event) {
  if (!G.tutorialFlags) G.tutorialFlags = {};
  const msgs = {
    first_choice: '<strong>Making choices:</strong> Each choice uses a skill and a tag. <em>Safe</em> checks are easier. <em>Bold</em> and <em>Risky</em> need higher rolls. Your <strong>d20 roll + skill level</strong> determines the outcome.',
    first_levelup: '<strong>Level up:</strong> Choose one advancement — a skill increase or an archetype ability. <em>Passive</em> abilities apply automatically. <em>Active</em> abilities must be triggered from the sheet.',
    first_camp: '<strong>Camp:</strong> Rest restores HP and refreshes your trait. Train costs an axis tick and improves one skill — but leaves you fatigued for 5 choices. Seek Care finds a healer NPC nearby.',
    first_journal: '<strong>Journal:</strong> The Ledger tracks your quests, wounds, inventory, faction relations, rival adventurers, and all journal entries. Open it from the topbar.',
    first_npc: '<strong>NPCs:</strong> Local contacts are gated by your Lore skill. Higher Lore reveals more contacts. Approach them to open conversation. Trust increases with repeated contact.',
    first_map: '<strong>Map:</strong> In Stage I, you are restricted to your origin polity. At Level 6, Stage II opens cross-polity travel. Travel advances the axis and time of day.',
    first_combat: '<strong>Combat:</strong> You enter combat only when you choose to or are forced into it. You can always attempt to talk, flee, or find another approach before fighting.',
    first_shop: '<strong>Shopping:</strong> Each location has goods available from local sites. Gold is limited — spend it on what your archetype actually uses.',
  };
  if (msgs[event] && !G.tutorialFlags[event]) {
    showTutorial(event, msgs[event]);
  }
}

// ── HALL OF LEGENDS ───────────────────────────────────────
function showHallOfLegends() {
  const legends = JSON.parse(localStorage.getItem('loa_legends')||'[]');
  const hb = document.getElementById('hall-body');
  hb.innerHTML = !legends.length ? '<p style="color:var(--ink-faint);font-style:italic">No legends recorded yet. When a legend ends, its story lives here.</p>' :
    legends.map(l =>
      '<div class="legend-entry">' +
      '<div class="legend-name">' + l.name + '</div>' +
      '<div class="legend-meta">' + l.archetype + ' &#x2014; ' + l.background + '</div>' +
      '<div class="legend-meta">Origin: ' + (l.origin||'Unknown') + '</div>' +
      '<div class="legend-meta">Level ' + l.level + ' &middot; ' + (l.stageLabel||l.stage||'Stage I') + ' &middot; ' + l.alignment + ' &middot; Renown ' + l.renown + '</div>' +
      '<div class="legend-meta" style="color:var(--ink-faint)">' + l.date + '</div>' +
      '<div style="margin-top:8px;font-size:13px;color:var(--ink-dim);font-style:italic;line-height:1.5">' + (l.significance||'') + '</div>' +
      (l.factionHighlight ? '<div style="font-size:12px;color:var(--gold-dim);margin-top:4px">' + l.factionHighlight + '</div>' : '') +
      (l.allies ? '<div style="font-size:12px;color:var(--jade-bright);margin-top:2px">' + l.allies + '</div>' : '') +
      (l.lostAllies ? '<div style="font-size:12px;color:var(--blood);margin-top:2px">' + l.lostAllies + '</div>' : '') +
      (l.woundSummary ? '<div style="font-size:12px;color:var(--blood-bright);margin-top:2px">' + l.woundSummary + '</div>' : '') +
      (l.rivalOutcome ? '<div style="font-size:12px;color:var(--ink-faint);margin-top:2px">' + l.rivalOutcome + '</div>' : '') +
      '<div style="font-size:11px;color:var(--ink-faint);margin-top:2px">' + (l.quests||'') + '</div>' +
      (l.historyLines && l.historyLines.length ?
        '<div style="margin-top:10px;border-top:1px solid var(--border);padding-top:8px">' + l.historyLines.map(h => '<div class="history-entry">' + h + '</div>').join('') + '</div>' : '') +
      '</div>'
    ).join('');
  showOverlay('overlay-hall');
}

// ── HUD ──────────────────────────────────────────────────
function updateHUD() {
  setText('hud-name',    G.name||'&#x2014;');
  setText('hud-class',   G.archetype?G.archetype.name:'&#x2014;');
  setText('hud-level',   G.level);
  setText('hud-renown',  (G.renown||0) + ' — ' + getRenownedTitle());
  setText('hud-hp',      G.hp+' / '+G.maxHp);
  setText('hud-gold',    G.gold);
  setText('hud-axis',    G.axisInverted?'Inverted':'Normal');
  setText('hud-tick',    G.axisTick||0);
  setText('hud-location',WORLD_LOCATIONS[G.location]?WORLD_LOCATIONS[G.location].name:G.location);
  setText('hud-time',    TIME_NAMES[G.timeIndex||0]);
  setText('topbar-stage',G.stage||(G.stageLabel?G.stageLabel:'Stage I'));

  const pct = G.hp/G.maxHp;
  const statusEl = document.getElementById('hud-status');
  if (statusEl) {
    const state = G.recoveryState||'stable';
    statusEl.textContent = pct>0.6 ? cap(state) : pct>0.3 ? 'Injured' : 'Critical';
    statusEl.className = 'stat-val '+(pct>0.6?'good':pct>0.3?'':'danger');
  }
  const bar = document.getElementById('hud-hpbar');
  if (bar) { bar.style.width=(pct*100)+'%'; bar.classList.toggle('low',pct<0.3); }

  const sk = document.getElementById('hud-skills');
  if (sk) {
    sk.innerHTML = '';
    Object.entries(G.skills||{}).forEach(([k,v]) => {
      const r = document.createElement('div'); r.className='skill-item';
      let dots=''; for(let i=0;i<5;i++) dots+='<div class="dot'+(i<v?' filled':'')+'"></div>';
      r.innerHTML='<span class="skill-name">'+k+'</span><div class="skill-dots">'+dots+'</div>';
      sk.appendChild(r);
    });
  }
  updateAlignmentHUD(); updateFactionHUD(); updateQuestHUD(); updateEnvironmentPanel();
  if (typeof updateNoticesBadge === 'function') updateNoticesBadge();
  if (typeof updatePartyHUD === 'function') updatePartyHUD();
}

function updateAlignmentHUD() {
  const el = document.getElementById('hud-alignment');
  if (!el) return;
  el.textContent = getAlignmentLabel();
  const m=G.morality||0, o=G.order||0;
  el.className='align-label '+(m>30?'good':m<-30?'evil':'')+' '+(o>30?'lawful':o<-30?'chaotic':'');
}

function updateFactionHUD() {
  const el = document.getElementById('faction-list'); if (!el) return;
  const sorted = [...(G.factions||[])].sort((a,b)=>Math.abs(b.rep-50)-Math.abs(a.rep-50)).slice(0,5);
  el.innerHTML = sorted.map(f =>
    '<div class="faction-item"><div class="faction-name">'+f.name+'</div>' +
    '<div class="faction-rep"><div class="faction-fill '+(f.rep>60?'positive':f.rep<35?'negative':'neutral')+'" style="width:'+f.rep+'%"></div></div></div>'
  ).join('');
}

function updateQuestHUD() {
  const el = document.getElementById('quest-list'); if (!el) return;
  el.innerHTML = (G.quests||[]).length ?
    (G.quests||[]).slice(-4).map(q=>'<div class="quest-item">'+q+'</div>').join('') :
    '<div style="color:var(--ink-faint);font-size:12px;font-style:normal">No active quests.</div>';
}

function updateJournalHUD() {
  const el = document.getElementById('journal-list'); if (!el) return;
  el.innerHTML = (G.journal||[]).slice(0,6).map(j=>'<div class="journal-entry">'+j+'</div>').join('') ||
    '<div class="journal-entry">Your ledger awaits its first entry.</div>';
}

function setText(id,val) { const el=document.getElementById(id); if(el) el.innerHTML=String(val); }

// ── OVERLAYS ─────────────────────────────────────────────
function showOverlay(id) { document.getElementById(id)?.classList.add('active'); }
function closeOverlay(id) { document.getElementById(id)?.classList.remove('active'); }
function showCamp() { showOverlay('overlay-camp'); }

function confirmDeath() { showOverlay('overlay-death'); }
function endLegend() {
  const legends = JSON.parse(localStorage.getItem('loa_legends')||'[]');
  const topFaction = (G.factions||[]).sort((a,b)=>b.rep-a.rep)[0];
  const topNegFaction = (G.factions||[]).sort((a,b)=>a.rep-b.rep)[0];
  const allies = G.companions ? Object.values(G.companions).filter(c=>c.status==='active').map(c=>c.name) : [];
  const lostAllies = G.companions ? Object.values(G.companions).filter(c=>c.status==='left').map(c=>c.name) : [];
  const activeRivals = (G.rivalAdventurers||[]).filter(r=>r.active);
  const completedRivals = (G.rivalAdventurers||[]).filter(r=>!r.active);
  const questsFailed = (G.journalRecords||[]).filter(e=>e.category==='quest'&&e.text.includes('failed')).length;
  const questsCompleted = (G.quests||[]).length;
  const woundsCarried = (G.wounds||[]).filter(w=>!w.healed);
  const majChoices = (G.history||[]).filter(h=>h.length>30).slice(-8);

  // Determine why this run mattered
  let significance = '';
  if (G.renown >= 65) significance = 'A legend of the Material Planet, known across polity lines.';
  else if (G.renown >= 20) significance = 'Respected within the region. What you found will be remembered.';
  else if ((G.quests||[]).length >= 3) significance = 'The investigation moved forward. Not far enough, but forward.';
  else significance = 'Brief. But you were here, and you looked.';

  legends.push({
    name:G.name, archetype:G.archetype?G.archetype.name:'Unknown',
    background:G.background?G.background.name:'Unknown',
    level:G.level, renown:G.renown, stage:G.stage, stageLabel:G.stageLabel,
    alignment:getAlignmentLabel(), date:new Date().toLocaleDateString(),
    origin: G.background ? G.background.region : 'Unknown origin',
    factionHighlight: topFaction&&topFaction.rep>65 ? 'Allied with '+topFaction.name :
                      topNegFaction&&topNegFaction.rep<25 ? 'Opposed by '+topNegFaction.name : '',
    woundSummary: woundsCarried.length > 0 ? 'Carried ' + woundsCarried.length + ' wound' + (woundsCarried.length>1?'s':'') + ': ' + woundsCarried.map(w=>w.severity).join(', ') + '.' : 'No lasting wounds.',
    allies: allies.length ? 'Traveled with: ' + allies.join(', ') + '.' : '',
    lostAllies: lostAllies.length ? 'Lost: ' + lostAllies.join(', ') + '.' : '',
    rivalOutcome: activeRivals.length ? activeRivals.length + ' rival' + (activeRivals.length>1?'s':'')+' still active at end.' :
                  completedRivals.length ? 'All rivals resolved.' : '',
    quests: questsCompleted + ' quest' + (questsCompleted!==1?'s':'') + ' active at end.',
    significance,
    historyLines: majChoices
  });
  localStorage.setItem('loa_legends', JSON.stringify(legends));
  const k = saveKey();
  if (k) localStorage.removeItem(k);
  closeOverlay('overlay-death');
  showScreen('screen-title');
}

// ── SAVE / LOAD ──────────────────────────────────────────
function saveKey() {
  if (!G.name||!G.passcode) return null;
  return 'loa_save_' + G.name.toLowerCase().replace(/\s+/g,'_') + '_' + G.passcode;
}
function saveGame() {
  const k = saveKey(); if (!k) return;
  try { localStorage.setItem(k, JSON.stringify(G)); } catch(e) {}
}
function loadGame(name, code) {
  const k = 'loa_save_' + name.toLowerCase().replace(/\s+/g,'_') + '_' + code;
  try {
    const s = localStorage.getItem(k);
    if (s) {
      let d;
      try { d = JSON.parse(s); } catch(e) { showToast('Save data corrupted. Starting fresh.'); return false; }
      if (!d || typeof d !== 'object') { showToast('Save format invalid.'); return false; }
      d = migrateState(d);
      Object.assign(G, d);
      return true;
    }
  } catch(e) { showToast('Could not load save: ' + e.message); }
  return false;
}

// ── TOAST ────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

function checkSave() { /* deprecated */ }// ── COMBAT ENTRY — FIRST-CLASS ENCOUNTER SETUP ────────
function enterCombat(enemyKey, context) {
  context = context || {};
  const enemy = ENEMY_TEMPLATES[enemyKey];
  if (!enemy) { startCombat(enemyKey, context); return; }

  const intentPool = {
    patrol_guard: ['The guard draws their weapon and takes a defensive stance. They are waiting for you to decide.','Standard patrol posture. They have backup nearby and they know it.'],
    depot_worker: ['Not trained for this. They are more afraid than aggressive.','Cornered. That makes them unpredictable.'],
    shadowhand_op: ['This person knows what they are doing. They are assessing you the same way you are assessing them.','Operational. No wasted movement.'],
    iron_accord_soldier: ['Disciplined and patient. They have institutional backing and they know it.','Following orders. They believe in what they are doing.'],
    house_shelk_operative: ['Well-resourced and professional. This is not improvised.','They are protecting something specific.'],
    roadwarden_officer: ['This is a Roadwarden officer. Make this non-hostile if possible.','Official capacity. Going violent here has significant consequences.'],
    hired_muscle: ['Hired. Which means this is about money, not principle.','They will take an exit if you give them one.']
  };
  const pool = intentPool[enemyKey] || ['They have decided this is a confrontation.'];
  const intent = pool[Math.floor(Math.random() * pool.length)];

  const archId = G.archetype ? G.archetype.id : null;
  const archCombatAbs = archId && ARCHETYPE_COMBAT_ABILITIES && ARCHETYPE_COMBAT_ABILITIES[archId]
    ? (ARCHETYPE_COMBAT_ABILITIES[archId] || []).filter(ab => (G.unlockedCombatAbilities||[]).includes(ab.id))
    : [];

  const companions = typeof getActiveCompanions === 'function' ? getActiveCompanions() : [];
  const compLine = companions.length ? companions.map(c => c.name + ' is with you.').join(' ') : '';
  const woundCount = (G.wounds||[]).filter(w=>!w.healed).length;
  const woundLine = woundCount > 0 ? '<div style="color:var(--blood-bright);font-size:12px;margin-top:6px">' + woundCount + ' unhealed wound' + (woundCount>1?'s':'') + ' — you are not at full capacity.</div>' : '';

  const html = '<div class="combat-entry"><div class="combat-location">' + enemy.name + '</div><div class="combat-intent">' + intent + '</div>' + (compLine ? '<div class="combat-companions">' + compLine + '</div>' : '') + woundLine + '<div class="combat-actions-label">HOW DO YOU RESPOND</div></div>';

  addNarration('Combat', html);
  addJournal('Entered combat with ' + enemy.name + '.', 'field_note', 'combat_entry_' + enemyKey + '_' + (G.dayCount||0));

  const choices = [
    {text:'Press forward. Take the initiative.', skill:'combat', tag:'bold', align:'chaotic', cid:'__combat_press__'+enemyKey},
    {text:'Defend and read them. Let them come to you.', skill:'combat', tag:'safe', align:'neutral', cid:'__combat_defend__'+enemyKey},
    {text:'Try to talk this down before it escalates.', skill:'persuasion', tag:'risky', align:'lawful', cid:'__combat_talk__'+enemyKey},
    {text:'Retreat now. This fight is not worth the cost.', skill:'stealth', tag:'safe', align:'chaotic', cid:'__combat_retreat__'}
  ];
  if (archCombatAbs.length > 0) {
    const ab = archCombatAbs[0];
    choices.splice(1, 0, {text:'[' + ab.name + '] ' + ab.effect.split('.')[0] + '.', skill:ab.skillReq||'combat', tag:'bold', align:'neutral', cid:'__combat_ability__'+enemyKey+'__'+ab.id});
  }
  setTimeout(() => renderChoices(choices.slice(0,5)), 300);
}

function resolveCombatEntry(mode, enemyKey, abilityId) {
  document.querySelectorAll('.choice-block,.move-block').forEach(b=>b.remove());
  if (mode === 'retreat') {
    addNarration('', 'You extract yourself. They let you go — or you move too quickly for them to follow.');
    G.morality = Math.max(-100, (G.morality||0) - 2);
    setTimeout(() => renderChoices([{text:'Regroup and find another approach.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'}]), 300);
    return;
  }
  if (mode === 'talk') {
    const roll = Math.floor(Math.random()*20)+1;
    const persuasion = G.skills ? (G.skills.persuasion||0) : 0;
    const compBonus = typeof getCompanionRollBonus === 'function' ? getCompanionRollBonus('persuasion') : 0;
    const total = roll + persuasion + compBonus;
    const diff = enemyKey === 'hired_muscle' ? 10 : enemyKey === 'roadwarden_officer' ? 8 : 13;
    const success = total >= diff;
    addNarration('', '<div class="roll-result ' + (success?'success':'failure') + '">d20: ' + roll + ' + persuasion ' + persuasion + (compBonus?' + companion '+compBonus:'') + ' = <strong>' + total + '</strong> vs ' + diff + ' — ' + (success ? '<span style="color:var(--jade-bright)">De-escalated</span>' : '<span style="color:var(--blood-bright)">Refused</span>') + '</div>' + (success ? 'They stand down. You have one question while they are still willing.' : 'They are not interested in talking.'));
    if (success) {
      G.renown = (G.renown||0) + 1; G.morality = Math.min(100, (G.morality||0) + 5);
      setTimeout(() => renderChoices([{text:'Ask who sent them.', skill:'persuasion', tag:'risky', align:'neutral', cid:'probe_order_origin'},{text:'Ask what they were told to do.', skill:'lore', tag:'safe', align:'neutral', cid:'trace_directive'},{text:'Let them leave.', skill:'lore', tag:'safe', align:'good', cid:'passive_intel'}]), 300);
    } else { setTimeout(() => startCombat(enemyKey, {}), 400); }
    return;
  }
  const initBonus = mode === 'press' ? 3 : mode === 'ability' ? 4 : 0;
  const initPenalty = mode === 'defend' ? -1 : 0;
  startCombat(enemyKey, {entryBonus: initBonus + initPenalty, abilityId: abilityId});
}


