---
> **ARCHIVED — V28_4 SCAFFOLD**
> This file is kept for historical reference only.
> It is not part of the active runtime (V28_8).
> The active runtime uses data.js, background-locality-map.js, stage2-backgrounds.js, and narrative.js instead.
---

// ═══════════════════════════════════════════════════════
// LEDGER OF ASH — WORLD SYSTEMS
// World notices, faction clocks, rival motion, encounter weighting
// TEXT RULE: No apostrophes in string values.
// ═══════════════════════════════════════════════════════

// ── WORLD NOTICES ─────────────────────────────────────
// Notices are posted at settlement notice boards, taverns, and
// Roadwarden posts. They reflect current world state.
const NOTICE_TEMPLATES = {
  // Rival adventurer notices
  rival_active: (name, arch, action) =>
    '[NOTICE] ' + name + ', ' + arch + ': ' + action + '. Posted by local civic authority.',
  rival_renown: (name, renown) =>
    '[KNOWN] ' + name + ' (' + renown + ' renown) has been active in this region.',
  rival_gone: (name) =>
    '[MISSING] ' + name + ' was last seen in this area. No contact in three days.',
  // Eastern operation notices
  route_closed: () =>
    '[ROADWARDEN] Eastern corridor: access restricted pending inspection. No reason given.',
  work_posted: () =>
    '[CONTRACT] Escort work available — eastern route, one day, good pay. Apply at Central Command.',
  memorial_notice: () =>
    '[FAMILY NOTICE] The Brennach family requests information about Wes Brennach, missing since the last supply run.',
  // Faction notices
  house_shelk_notice: () =>
    '[HOUSE SHELK] All parties operating in the Principality corridor are reminded: unauthorized manifest use is a civil violation.',
  union_notice: () =>
    '[THE UNION] Guild Sanction Board audit ongoing. Certified traders: maintain your documentation.',
  // Canon world notices
  axis_warning: () =>
    '[WEATHER ADVISORY] Elementalists report anomalous axis readings in the eastern corridor. Travelers advised to carry standard inversion kit.',
  ironroot_notice: () =>
    '[SOREHEIM ALLIANCE] Ironroot Crossing will undergo maintenance this cycle. Freight delays expected.',
};

// Active world notices — initialized fresh each run, evolve as play advances
function initWorldNotices() {
  G.worldNotices = [
    { id:'route_closed', text: NOTICE_TEMPLATES.route_closed(), seen:false, day:0 },
    { id:'work_posted',  text: NOTICE_TEMPLATES.work_posted(),  seen:false, day:0 },
    { id:'memorial',     text: NOTICE_TEMPLATES.memorial_notice(), seen:false, day:0 },
    { id:'house_shelk',  text: NOTICE_TEMPLATES.house_shelk_notice(), seen:false, day:0 },
    { id:'axis_warning', text: NOTICE_TEMPLATES.axis_warning(), seen:false, day:0 },
  ];
}

function addWorldNotice(text) {
  if (!G.worldNotices) G.worldNotices = [];
  G.worldNotices.unshift({ id:'dyn_'+Date.now(), text, seen:false, day:G.dayCount||0 });
  if (G.worldNotices.length > 20) G.worldNotices.pop();
}

function getVisibleNotices() {
  if (!G.worldNotices) initWorldNotices();
  return G.worldNotices.filter(n => !n.seen);
}

function markNoticeSeen(id) {
  if (!G.worldNotices) return;
  const n = G.worldNotices.find(x => x.id === id);
  if (n) n.seen = true;
}

function showNoticesOverlay() {
  const el = document.getElementById('notices-overlay-body');
  if (!el) return;

  if (!G.worldNotices) initWorldNotices();

  // Add rival notices
  (G.rivalAdventurers || []).forEach(r => {
    const existing = G.worldNotices.find(n => n.id === 'rival_' + r.name.replace(/ /g,'_'));
    if (!existing) {
      const text = r.renown >= 3 ?
        NOTICE_TEMPLATES.rival_renown(r.name, r.renown) :
        NOTICE_TEMPLATES.rival_active(r.name, r.archetype, r.hook);
      G.worldNotices.push({ id:'rival_'+r.name.replace(/ /g,'_'), text, seen:false, day:G.dayCount||0 });
    }
    if (!r.active) {
      const gone = G.worldNotices.find(n => n.id === 'rival_gone_' + r.name.replace(/ /g,'_'));
      if (!gone) G.worldNotices.push({ id:'rival_gone_'+r.name.replace(/ /g,'_'), text: NOTICE_TEMPLATES.rival_gone(r.name), seen:false, day:G.dayCount||0 });
    }
  });

  const unseen = G.worldNotices.filter(n => !n.seen);
  const seen   = G.worldNotices.filter(n => n.seen);

  let html = '';
  if (!G.worldNotices.length) {
    html = '<div style="color:var(--ink-faint);font-style:italic;font-size:13px">The notice board is bare.</div>';
  } else {
    if (unseen.length) {
      html += '<div class="notice-section-label">NEW</div>';
      html += unseen.map(n =>
        '<div class="notice-card unread" data-nid="' + n.id + '">' +
        '<div class="notice-text">' + n.text + '</div>' +
        '<div class="notice-day">Day ' + (n.day||1) + '</div>' +
        '</div>'
      ).join('');
    }
    if (seen.length) {
      html += '<div class="notice-section-label" style="margin-top:14px">PREVIOUS</div>';
      html += seen.slice(0,8).map(n =>
        '<div class="notice-card" data-nid="' + n.id + '">' +
        '<div class="notice-text">' + n.text + '</div>' +
        '<div class="notice-day">Day ' + (n.day||1) + '</div>' +
        '</div>'
      ).join('');
    }
  }

  el.innerHTML = html;
  el.querySelectorAll('.notice-card.unread').forEach(card => {
    card.addEventListener('click', () => {
      markNoticeSeen(card.dataset.nid);
      card.classList.remove('unread');
    });
  });
  showOverlay('overlay-notices');
}

// ── FACTION CLOCKS ────────────────────────────────────
// Background world motion: factions advance their agendas offscreen
const FACTION_CLOCKS = {
  roadwardens: { name:'Roadwardens Order', progress:0, goal:10, action:'eastern_route_investigation', outcome:'The Roadwardens have formally opened an investigation into the eastern corridor.' },
  house_shelk:  { name:'House Shelk', progress:0, goal:12, action:'administrative_review', outcome:'House Shelk internal review quietly reassigns the administrator responsible.' },
  shadowhands:  { name:'Shadowhands', progress:0, goal:8, action:'eastern_operation_breach', outcome:'Shadowhands operatives access the eastern depot records before official investigators.' },
  the_union:    { name:'The Union', progress:0, goal:15, action:'manifest_investigation', outcome:'The Union Guild Sanction Board issues a formal finding on the unauthorized manifests.' },
};

function advanceFactionClocks(ticks) {
  if (!G.factionClocks) G.factionClocks = JSON.parse(JSON.stringify(FACTION_CLOCKS));
  ticks = ticks || 1;
  Object.entries(G.factionClocks).forEach(([fid, clock]) => {
    if (clock.progress >= clock.goal) return; // already resolved
    // Factions advance if player has not acted in this area
    const playerFaction = (G.factions||[]).find(f => f.id === fid);
    const playerRep = playerFaction ? playerFaction.rep : 50;
    // High rep = faction is working WITH you = slower independent progress
    const advanceRate = playerRep > 65 ? 0.3 : playerRep < 35 ? 1.5 : 1.0;
    clock.progress = Math.min(clock.goal, clock.progress + advanceRate * ticks);
    if (clock.progress >= clock.goal && !clock.resolved) {
      clock.resolved = true;
      addWorldNotice('[WORLD EVENT] ' + clock.outcome);
      addJournal('World: ' + clock.outcome);
    }
  });
}

// ── ENCOUNTER WEIGHTING BY ARCHETYPE FAMILY ──────────
function getArchetypeFamily() {
  if (!G.archetype) return 'support';
  const id = G.archetype.id;
  const combat  = ['warrior','knight','ranger','paladin','archer','berserker'];
  const magic   = ['wizard','cleric','priest','necromancer','illusionist','inquisitor','elementalist'];
  const stealth = ['rogue','assassin','spellthief','scout_c','thief','trickster'];
  if (combat.includes(id)) return 'combat';
  if (magic.includes(id)) return 'magic';
  if (stealth.includes(id)) return 'stealth';
  return 'support';
}

// Returns archetype-appropriate weighted encounter choices to append to standard choices
function getArchetypeEncounterOption(cid) {
  const family = getArchetypeFamily();
  const arch = G.archetype ? G.archetype.id : 'warrior';

  if (family === 'combat') {
    return { text:'Use force to resolve this directly.', skill:'combat', tag:'bold', align:'chaotic', cid: cid || 'do_combat_patrol' };
  } else if (family === 'magic') {
    return { text:'Apply your magical knowledge to gain an advantage.', skill:'lore', tag:'risky', align:'neutral', cid: cid || 'study_packet' };
  } else if (family === 'stealth') {
    return { text:'Find the subtle approach others would miss.', skill:'stealth', tag:'risky', align:'chaotic', cid: cid || 'passive_intel' };
  } else {
    return { text:'Apply your specialist skills to this situation.', skill:'craft', tag:'safe', align:'neutral', cid: cid || 'armory_offer' };
  }
}

// Inject archetype encounter option into a choices array
function weightChoicesForArchetype(choices) {
  if (!choices || choices.length >= 4) return choices;
  const family = getArchetypeFamily();
  // Only inject if the family's core skill isn't already well-represented
  const coreSkill = {combat:'combat', magic:'lore', stealth:'stealth', support:'craft'}[family];
  const hasCore = choices.some(c => c.skill === coreSkill);
  if (!hasCore) {
    choices = choices.concat([getArchetypeEncounterOption()]);
  }
  return choices;
}

// Override renderChoices to inject archetype weighting
const _baseRenderChoices = typeof renderChoices !== 'undefined' ? renderChoices : null;
function renderChoicesWeighted(choices) {
  const weighted = weightChoicesForArchetype(choices);
  if (_baseRenderChoices) _baseRenderChoices(weighted);
}
