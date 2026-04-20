// ═══════════════════════════════════════════════════════
// LEDGER OF ASH — PARTY & COMPANION SYSTEM
// Persistent companion state, recruit flows, camp talk
// ═══════════════════════════════════════════════════════

// ── COMPANION DEFINITIONS ───────────────────────────────
// Recruitable NPCs. Trust required = 15. At least one per key locality.
const COMPANION_DEFS = {
  // Shelkopolis
  vera_wren: {
    id: 'vera_wren',
    name: 'Vera Wren',
    role: 'Tavern Keeper & Street Informant',
    locality: 'shelkopolis',
    npcId: 'Vera Wren',
    joinScene: {
      text: "Vera sets down the last glass and looks at you squarely. She's been piecing together what you're doing here. 'I know this city better than any Roadwarden. I also know what happened to Wes Brennach — the family came to me first, before the memorial notice went up. If you're serious about this, you could use someone who hears things before they become official.' She waits.",
      choices: [
        { text: "Accept. Her network is exactly what this needs.", outcome: 'join' },
        { text: "Ask what she wants in return.", outcome: 'negotiate' },
        { text: "Tell her it's too dangerous to involve a civilian.", outcome: 'refuse' }
      ]
    },
    refusalScene: "Vera nods once, unsurprised. 'The offer stands if you change your mind.' She goes back to work.",
    leaveConditions: ['morality < -40', 'order < -50', 'vera_trust < 5'],
    leaveScene: "Vera finds you after a long silence. 'I signed up to help find out what happened. I didn't sign up for this.' She leaves her key on the table and walks out.",
    abilities: [
      { type:'passive', trigger:'always', effect:'roll_bonus', skill:'persuasion', locality:'shelkopolis', axisState:null, bonus:1,
        desc:'Shelkopolis street network: +1 persuasion in Shelkopolis. Learn one piece of local intelligence per day for free.' },
      { type:'active', trigger:'once_per_scene', effect:'auto_partial', skill:'persuasion', locality:'shelkopolis', axisState:null, bonus:0,
        desc:'Once per scene: Vera\'s contact confirms or denies any claim about a named Shelkopolis figure. Persuasion check auto-succeeds as partial.' }
    ],
    campLines: [
      "Vera is quiet for a while, then: 'The Brennach family will want to know what we find. Whatever it is.'",
      "'I've been keeping a list of names. People who asked after the eastern shipments before the official notice. Two of them have left the city since.'",
      "She pulls out a folded paper. 'Delivery records from the Rusted Loom. Someone was receiving packages the week before the route closure. I held onto these.'",
    ],
    injuredText: "Vera took a hit she wasn't trained for. She's resting. Her network is still available but she won't be on scene.",
    role_tag: 'informant'
  },

  // Panim Haven
  toriel_palevow: {
    id: 'toriel_palevow',
    name: 'Toriel Palevow',
    role: 'Street Physician & Registry Witness',
    locality: 'panim_haven',
    npcId: 'Toriel Palevow',
    joinScene: {
      text: "Toriel finishes binding the wound, takes his tools back without hurry. 'I've certified three deaths in the last cycle that didn't match what the families described. The registry accepted my reports. That doesn't mean the reports were right — it means no one looked twice.' He meets your eye. 'I'd like someone to look twice. Are you that?'",
      choices: [
        { text: "Tell him you're exactly that, and you need his access to the registry.", outcome: 'join' },
        { text: "Ask what he's seen specifically.", outcome: 'negotiate' },
        { text: "Tell him this investigation doesn't require medical expertise.", outcome: 'refuse' }
      ]
    },
    refusalScene: "Toriel shrugs without offense. 'The offer was practical, not personal. Good luck.'",
    leaveConditions: ['morality < -30', 'G.quests includes registry_corruption_ignored'],
    leaveScene: "'You had the information and chose not to act on it,' Toriel says. 'That's a medical decision too. I can't work with that.' He takes his bag and goes.",
    abilities: [
      { type:'passive', trigger:'always', effect:'roll_bonus', skill:'lore', locality:null, axisState:null, bonus:1,
        desc:'Panim registry access: +1 lore. Can read death records and flag discrepancies without institutional clearance.' },
      { type:'active', trigger:'once_per_scene', effect:'no_roll', skill:'lore', locality:null, axisState:null, bonus:0,
        desc:'Once per scene: field medical assessment. Stabilize any wound, identify cause of injury/death. Lore checks on bodies auto-succeed.' }
    ],
    campLines: [
      "'There's a pattern in the injury types. The missing persons from the eastern route — the ones who came back injured — they all have the same kind of damage. Not accidental. Purposeful.'",
      "'The Panim afterlife registry is a legal record. If someone filed false cause-of-death reports, that's a prosecutable act under Panim civil code. I can testify.'",
      "Toriel is reading his notes by firelight. 'I need to send word to the registry clerk. If she notices what I noticed, she'll be at risk.'",
    ],
    injuredText: "Toriel is treating his own injuries. He won't leave camp but registry access is delayed.",
    role_tag: 'physician'
  },

  // Aurora Crown Commune
  neren_rimebridge: {
    id: 'neren_rimebridge',
    name: 'Neren Rimebridge',
    role: 'Commune Mediator & Dome Operations Liaison',
    locality: 'aurora_crown_commune',
    npcId: 'Neren Rimebridge',
    joinScene: {
      text: "Neren pulls the dome status report down from the operations board and hands it to you without preamble. 'The axis readings in the eastern corridor are not natural variation. Someone is using the inversion window deliberately. I've flagged it three times. The Warden has filed it as under review.' He folds his hands. 'Under review means waiting. I've stopped being willing to wait.'",
      choices: [
        { text: "Ask him to come with you. His technical knowledge is essential.", outcome: 'join' },
        { text: "Ask for the data he's collected instead.", outcome: 'negotiate' },
        { text: "Tell him the investigation is already moving and doesn't need another voice.", outcome: 'refuse' }
      ]
    },
    refusalScene: "Neren nods. 'The data is yours regardless. Come back if that changes.' He pins the readings back to the board.",
    leaveConditions: ['G.axisTick > 60 without acting', 'morality < -20'],
    leaveScene: "'The dome stabilizers are failing and we're investigating politics,' Neren says quietly. 'I have to go back. The commune needs me more than this does.' He leaves at dawn.",
    abilities: [
      { type:'passive', trigger:'always', effect:'roll_bonus', skill:null, locality:null, axisState:'inverted', bonus:2,
        desc:'Axis attunement: +2 to all rolls during axis events. Always know exact axis state and corridor anomaly readings.' },
      { type:'active', trigger:'once_per_day', effect:'no_roll', skill:'lore', locality:null, axisState:null, bonus:0,
        desc:'Once per day: technical analysis of any elemental or structural anomaly. Lore-equivalent finding without requiring a roll.' }
    ],
    campLines: [
      "'The pre-inversion window lasts approximately three hours. Whatever moves through the eastern corridor moves in that window. That's not improvisation — that's someone with dome-level knowledge.'",
      "Neren has been drawing diagrams in the dirt. 'The axis deviation correlates with the cargo timing. I can show you the math if it helps.'",
      "'The containment research team in Glasswake reported the same anomaly two cycles ago. Their report was also filed as under review.' He stares at the fire. 'There's a pattern to what gets buried.'",
    ],
    injuredText: "Neren is dealing with a containment emergency at the dome. He'll rejoin when it's stable.",
    role_tag: 'analyst'
  },

  // Sunspire Haven
  elyra_mossbane: {
    id: 'elyra_mossbane',
    name: 'Elyra Mossbane',
    role: 'Frontier Guardian & Wilderness Expert',
    locality: 'sunspire_haven',
    npcId: 'Elyra Mossbane',
    joinScene: {
      text: "Elyra has been watching the frontier roads for a decade. She doesn't negotiate or preamble. 'I've tracked three groups through the eastern waypoints in the last month. None of them were on any manifest I've seen. Two groups I never saw come back out.' She unsheathes her blade, checks the edge, sheathes it. 'You're the first person who's come through here asking the right questions. I'll come with you if you're actually going to do something.'",
      choices: [
        { text: "She's in. You need someone who knows the frontier terrain.", outcome: 'join' },
        { text: "Ask what she means by 'actually doing something.'", outcome: 'negotiate' },
        { text: "Tell her you work better alone in the field.", outcome: 'refuse' }
      ]
    },
    refusalScene: "Elyra nods once. 'Fair enough. Watch the southern waypoint — something comes through there every three days, regular as a patrol schedule.' She goes back to watching the road.",
    leaveConditions: ['order > 70 and morality < -10'],
    leaveScene: "'You're doing this the wrong way,' Elyra says. 'I'll make sure the frontier is still there when you come back.' She takes the southern route at dusk.",
    abilities: [
      { type:'passive', trigger:'always', effect:'roll_bonus', skill:'survival', locality:null, axisState:null, bonus:1,
        desc:'Frontier navigation: +1 survival. Travel never costs more than 1 axis tick. Automatically identify ambushes and hidden waypoints.' },
      { type:'passive', trigger:'always', effect:'roll_bonus', skill:'stealth', locality:null, axisState:null, bonus:1,
        desc:'+1 stealth in wilderness terrain.' },
      { type:'active', trigger:'once_per_scene', effect:'scout_ahead', skill:'stealth', locality:null, axisState:null, bonus:0,
        desc:'Once per scene: scout ahead. Learn next location\'s threat level, faction presence, and one hidden detail before arriving.' }
    ],
    campLines: [
      "'I mapped the eastern waypoints after the third group went through. There are twelve active crossing points not on any official chart. Someone built them.'",
      "Elyra cleans her blade and says, without looking up: 'The frontier militia knows something's wrong. They're not talking because they don't know who to trust.'",
      "'Two of the people who went through and didn't come back were registered with the Frontier Hammer Companies. That's a protected status. Someone chose to ignore it.'",
    ],
    injuredText: "Elyra is tracking a lead at the southern waypoint. She'll be back by Dawnrise.",
    role_tag: 'scout'
  }
};

// ── COMPANION STATE MANAGEMENT ──────────────────────────
function initCompanions() {
  if (!G.companions) G.companions = {};
}

function getCompanion(id) {
  if (!G.companions) return null;
  return G.companions[id] || null;
}

function hasCompanion(id) {
  return !!(G.companions && G.companions[id] && G.companions[id].status === 'active');
}

function getActiveCompanions() {
  if (!G.companions) return [];
  return Object.values(G.companions).filter(c => c.status === 'active');
}

function canRecruit(npcId) {
  const def = Object.values(COMPANION_DEFS).find(d => d.npcId === npcId);
  if (!def) return false;
  if (hasCompanion(def.id)) return false;
  const trust = G.npcMemory && G.npcMemory[npcId] ? G.npcMemory[npcId].trust : 0;
  return trust >= 15;
}

function showRecruitScene(npcId) {
  const def = Object.values(COMPANION_DEFS).find(d => d.npcId === npcId);
  if (!def) return;

  document.querySelectorAll('.choice-block,.move-block').forEach(b => b.remove());
  addNarration(def.name, def.joinScene.text);

  const choices = def.joinScene.choices.map(c => ({
    text: c.text,
    skill: 'persuasion',
    tag: c.outcome === 'join' ? 'safe' : c.outcome === 'negotiate' ? 'risky' : 'bold',
    align: c.outcome === 'join' ? 'good' : 'neutral',
    cid: '__recruit__' + def.id + '__' + c.outcome
  }));

  setTimeout(() => renderChoices(choices), 300);
}

function resolveRecruitChoice(defId, outcome) {
  const def = COMPANION_DEFS[defId];
  if (!def) return;
  initCompanions();

  if (outcome === 'join' || outcome === 'negotiate') {
    // Join (negotiate leads to same outcome — they still join)
    G.companions[defId] = {
      id: defId,
      name: def.name,
      role: def.role,
      status: 'active',
      trust: G.npcMemory && G.npcMemory[def.npcId] ? G.npcMemory[def.npcId].trust : 15,
      campLineIdx: 0,
      injured: false,
      injuredDay: null,
      joinedDay: G.dayCount || 0,
      locality: def.locality,
      role_tag: def.role_tag
    };

    const joinText = outcome === 'negotiate'
      ? def.name + ' considers for a moment, then nods. They join you.'
      : def.name + ' stands and gathers their things. They are with you now.';

    addNarration('', joinText, 'success');
    addJournal('Companion joined: ' + def.name + ' (' + def.role + ').');
    G.history.push('Recruited ' + def.name + ' at ' + (G.dayCount||0) + '.');
    addWorldNotice('[PARTY] ' + def.name + ' has joined your investigation.');

    if (typeof updateHUD === 'function') updateHUD();
    if (typeof saveGame === 'function') saveGame();

    setTimeout(() => renderChoices([
      { text: 'Continue the investigation together.', skill: 'lore', tag: 'safe', align: 'neutral', cid: 'passive_intel' },
      { text: 'Camp and hear what they know before moving.', skill: 'survival', tag: 'safe', align: 'neutral', cid: '__camp_talk__' }
    ]), 400);

  } else {
    addNarration('', def.refusalScene);
    setTimeout(() => renderChoices([
      { text: 'Continue alone.', skill: 'lore', tag: 'safe', align: 'neutral', cid: 'passive_intel' }
    ]), 300);
  }
}

// Check companion leave conditions
function checkCompanionLeave() {
  if (!G.companions) return;
  Object.values(G.companions).forEach(comp => {
    if (comp.status !== 'active') return;
    const def = COMPANION_DEFS[comp.id];
    if (!def) return;
    def.leaveConditions.forEach(condition => {
      let shouldLeave = false;
      if (condition === 'morality < -40' && (G.morality||0) < -40) shouldLeave = true;
      if (condition === 'morality < -30' && (G.morality||0) < -30) shouldLeave = true;
      if (condition === 'morality < -20' && (G.morality||0) < -20) shouldLeave = true;
      if (condition === 'order < -50' && (G.order||0) < -50) shouldLeave = true;
      if (condition === 'order > 70 and morality < -10' && (G.order||0) > 70 && (G.morality||0) < -10) shouldLeave = true;
      if (shouldLeave) {
        comp.status = 'left';
        addNarration(comp.name, def.leaveScene);
        addJournal(comp.name + ' has left the party.');
        addWorldNotice('[PARTY] ' + comp.name + ' has left your investigation.');
        if (typeof updateHUD === 'function') updateHUD();
      }
    });
  });
}

// ── CAMP TALK ──────────────────────────────────────────
function showCampTalk() {
  const active = getActiveCompanions();
  if (!active.length) {
    addNarration('Camp', 'You are traveling alone. No companions to talk to.');
    renderChoices([{ text: 'Break camp.', skill: 'lore', tag: 'safe', align: 'neutral', cid: 'passive_intel' }]);
    return;
  }

  const lines = [];
  active.forEach(comp => {
    const def = COMPANION_DEFS[comp.id];
    if (!def) return;
    if (comp.injured) {
      lines.push({ name: comp.name, text: def.injuredText, injured: true });
    } else {
      const idx = comp.campLineIdx % def.campLines.length;
      lines.push({ name: comp.name, text: def.campLines[idx], injured: false });
      comp.campLineIdx++;
    }
  });

  let html = '<div style="margin-bottom:12px;color:var(--gold-dim);font-family:Cinzel,serif;font-size:10px;letter-spacing:2px">AROUND THE FIRE</div>';
  lines.forEach(l => {
    html += '<div class="camp-talk-line' + (l.injured ? ' injured' : '') + '">';
    html += '<div class="ct-name">' + l.name + (l.injured ? ' (injured)' : '') + '</div>';
    html += '<div class="ct-text">' + l.text + '</div></div>';
  });

  addNarration('Camp Talk', html);

  // After talk: skills can improve
  const choices = [
    { text: 'Press on. The fire has told you enough.', skill: 'lore', tag: 'safe', align: 'neutral', cid: 'passive_intel' },
    { text: 'Ask them directly about the investigation.', skill: 'persuasion', tag: 'safe', align: 'neutral', cid: 'probe_order_origin' }
  ];

  // Add companion ability choices
  active.forEach(comp => {
    const def = COMPANION_DEFS[comp.id];
    if (!def || comp.injured) return;
    def.abilities.filter(a => a.type === 'active').forEach(ability => {
      choices.push({
        text: '[' + comp.name + '] ' + ability.desc.split(':')[0] + '.',
        skill: 'persuasion', tag: 'safe', align: 'neutral',
        cid: 'passive_intel'  // feeds into normal flow
      });
    });
  });

  setTimeout(() => renderChoices(choices.slice(0, 4)), 300);
}

// ── PARTY HUD + OVERLAY ────────────────────────────────
function updatePartyHUD() {
  const el = document.getElementById('party-hud');
  if (!el) return;
  const active = getActiveCompanions();
  if (!active.length) { el.innerHTML = ''; return; }
  el.innerHTML = '<div class="party-label">Party</div>' +
    active.map(c => {
      const statusClass = c.injured ? 'injured' : 'active';
      return '<div class="party-member ' + statusClass + '">' +
        '<span class="pm-name">' + c.name + '</span>' +
        '<span class="pm-role">' + (COMPANION_DEFS[c.id] ? COMPANION_DEFS[c.id].role_tag : '') + '</span>' +
        (c.injured ? '<span class="pm-status">injured</span>' : '') +
        '</div>';
    }).join('');
}

function showPartyOverlay() {
  const el = document.getElementById('party-overlay-body');
  if (!el) return;
  const active = getActiveCompanions();
  const all = G.companions ? Object.values(G.companions) : [];

  if (!all.length) {
    el.innerHTML = '<div style="color:var(--ink-faint);font-style:italic;font-size:13px">No companions recruited yet. Approach local contacts and build trust to unlock recruit scenes.</div>';
  } else {
    el.innerHTML = all.map(comp => {
      const def = COMPANION_DEFS[comp.id];
      if (!def) return '';
      const statusLabel = comp.status === 'active' ? (comp.injured ? 'Injured' : 'Active') : 'Left the party';
      const statusColor = comp.status === 'active' ? (comp.injured ? 'var(--blood-bright)' : 'var(--jade-bright)') : 'var(--ink-faint)';
      return '<div class="companion-card">' +
        '<div class="companion-name">' + comp.name + '</div>' +
        '<div class="companion-role">' + def.role + '</div>' +
        '<div style="color:' + statusColor + ';font-size:11px;font-family:Cinzel,serif;letter-spacing:1px;margin:4px 0">' + statusLabel + '</div>' +
        '<div class="companion-abilities">' +
          def.abilities.map(a => '<div class="comp-ability"><strong>' + a.type + ':</strong> ' + a.desc + '</div>').join('') +
        '</div>' +
        (comp.status === 'active' && !comp.injured ? '<div style="font-size:11px;color:var(--ink-faint);margin-top:6px">Joined day ' + comp.joinedDay + '</div>' : '') +
        '</div>';
    }).join('');
  }

  showOverlay('overlay-party');
}

// General companion ability resolver — reads structured ability objects, no hardcoding per companion
function resolveCompanionAbilities(companions, skill, location, axisInverted) {
  if (!companions || !companions.length) return 0;
  let bonus = 0;
  companions.forEach(comp => {
    if (comp.injured || comp.available === false) return;
    const def = COMPANION_DEFS[comp.id];
    if (!def) return;
    def.abilities.forEach(ab => {
      if (ab.type !== 'passive' || ab.effect !== 'roll_bonus') return;
      if (ab.skill !== null && ab.skill !== skill) return;
      if (ab.locality && ab.locality !== location) return;
      if (ab.axisState === 'inverted' && !axisInverted) return;
      bonus += ab.bonus || 0;
    });
  });
  return bonus;
}

// Engine interface: engine.js calls window.companionBonus(state, skill)
function companionBonus(state, skill) {
  if (!state) return 0;
  const companions = state.companions || (state.id ? getActiveCompanions() : []);
  return resolveCompanionAbilities(companions, skill, state.location, state.axisInverted);
}

// Internal HUD helper — uses G.companions object keyed by id
function getCompanionRollBonus(skill) {
  const active = getActiveCompanions();
  return resolveCompanionAbilities(active, skill, G.location, G.axisInverted);
}

// ── RECRUIT FLOW ─────────────────────────────────────────
// Called every action in a locality: builds passive trust with local companions
function buildCompanionTrust(state, amount) {
  if(!state || !state.location) return;
  if(!state.companionTrust) state.companionTrust = {};
  const amt = amount || 1;
  Object.keys(COMPANION_DEFS).forEach(id => {
    const def = COMPANION_DEFS[id];
    if(def.locality !== state.location) return;
    if(state.companions && state.companions.some(c=>c.id===id)) return;
    state.companionTrust[id] = Math.min(20, (state.companionTrust[id]||0) + amt);
  });
}

// Returns a recruit choice object if a local companion has enough trust, else null
function recruitChoice(state) {
  if(!state || !state.location) return null;
  if(!state.companionTrust) state.companionTrust = {};
  const TRUST_THRESHOLD = 4;
  for(const [id, def] of Object.entries(COMPANION_DEFS)) {
    if(def.locality !== state.location) continue;
    if(state.companions && state.companions.some(c=>c.id===id)) continue;
    const trust = state.companionTrust[id]||0;
    if(trust < TRUST_THRESHOLD) continue;
    return {
      label: `Speak with ${def.name} — ${def.role}`,
      tags: ['Recruit','Party','Ally'],
      fn() {
        const joined = {
          id, name:def.name, role:def.role,
          trust, available:true, injured:false, joinedDay:state.dayCount
        };
        state.companions.push(joined);
        state.companionTrust[id] = 0;
        if(typeof addJournal==='function') addJournal('companion', `${def.name} joined at ${state.location}.`, `recruit-${id}-${state.dayCount}`);
        if(typeof addNotice==='function') addNotice(`${def.name} joins the party.`);
        if(typeof markMoment==='function') markMoment(`${def.name} recruited`);
        state.lastResult = def.joinScene.text + ' You accept. ' + def.joinScene.choices[0].text;
      }
    };
  }
  return null;
}

window.COMPANION_DEFS = COMPANION_DEFS;
window.companionBonus = companionBonus;
window.recruitChoice = recruitChoice;
window.buildCompanionTrust = buildCompanionTrust;
