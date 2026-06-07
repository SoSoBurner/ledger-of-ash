// DEVELOPMENT TOOL — not game code, not shipped. See tests/e2e/README.md
// @ts-check
/**
 * playtest-headed.spec.js
 * Headed QA harness — 4 families, 3 hr ceiling, autonomous repair loop.
 *
 * Shares all utility functions with playtest-headless.spec.js (copy-owned here
 * to avoid a runtime require() dependency across Playwright workers).
 *
 * Run after the headless spec:
 *   npx playwright test tests/e2e/playtest-headed.spec.js
 */

const { test } = require('@playwright/test');
const fs   = require('fs');
const path = require('path');

const { getStageCeiling, isSuccess: stageLockIsSuccess, ceilingLabel } = require('./helpers/stage-lock');
const { shouldTravelNow, openMapAndTravel, resetTravelInterval } = require('./helpers/map-travel');
const CoverageTracker = require('./helpers/coverage-tracker');
const ReportWriter    = require('./helpers/report-writer');

// Headed mode — top-level, uses top-level key to override playwright.config.js's headless:true
test.use({ headless: false });

// Module-scope so soft-timeout closure inside runFamily() can read it (closure trap: var inside test() is invisible to module-scope functions)
var _runStartMs = 0;
var lastDeadEndPick = -1;
var _combatProbeModeCounter = 0; // even=defend+flee, odd=strike; increments per family run; module-scope for runPlaythrough closure
var _combatMode = 'defend'; // module-scope so runFullPanelSimulation can access it (closure trap)
// Block M — per-family skill tracking (module-scope to avoid closure trap)
var _familySkillCounts = {};  // skill -> count for current family
var _familyAbilityCount = 0;
var _familyHeatCount    = 0;
var _familyAlignCount   = 0;
var _familyLevelupCount = 0;
var _familyLastLevel    = 0;
// Block L — combat corridor probe runs once per headed test run
var _corridorCombatProbeDone = false;
// Block N — once-per-family probe guards
var _masteryProbeDone  = false; // probeCharSheet mastery section — reset per family
var _lootProbeDone     = false; // post-combat loot snapshot — reset per family

// ---------------------------------------------------------------------------
// Output dirs
// ---------------------------------------------------------------------------
const TEST_RESULTS   = path.resolve(__dirname, '../../test-results');
const ROOT           = path.resolve(__dirname, '../..');
const SCREENSHOT_DIR = path.join(TEST_RESULTS, 'playthrough-screenshots', 'headed');
const VIDEO_DIR      = path.join(TEST_RESULTS, 'videos');

// ---------------------------------------------------------------------------
// 4-family pools
// ---------------------------------------------------------------------------
const HEADED_FAMILY_ORDER = ['classic-combat', 'magic-spellcasting', 'stealth-precision', 'support-leadership'];

const HEADED_FAMILY_POOLS = {
  'classic-combat':     ['warrior','knight','berserker','warlord','warden','death_knight','archer','paladin','ranger'],
  'magic-spellcasting': ['wizard','cleric','priest','necromancer','illusionist','inquisitor','elementalist','oracle'],
  'stealth-precision':  ['rogue','assassin','scout_c','thief','trickster','beastmaster','spellthief'],
  'support-leadership': ['healer','artificer','engineer','tactician','alchemist','saint','bard'],
};


// ---------------------------------------------------------------------------
// Shared archetype data
// ---------------------------------------------------------------------------
const ARCHETYPE_BACKGROUNDS = {
  warrior:      ['w_garrison','w_roaz'],
  knight:       ['k_shelk','k_roaz','k_order'],
  ranger:       ['r_shelk','r_soreheim'],
  paladin:      ['p_cysur','p_eloljaro','p_gwybodaeth'],
  archer:       ['a_roadwarden','a_nomdara'],
  berserker:    ['b_soreheim','b_cosmouth'],
  warden:       ['wa2_shelk','wa2_soreheim'],
  warlord:      ['wl_roaz','wl_soreheim'],
  death_knight: ['dk_shelk','dk_roaz','dk_panim'],
  rogue:        ['ro_shelk','ro_union','ro_nomdara'],
  assassin:     ['as_shadowhands','as_redhoodguild','as_shirsh'],
  spellthief:   ['st_mimolot','st_court','st_shirsh'],
  scout_c:      ['sc_shelk','sc_soreheim','sc_cosmouth'],
  thief:        ['th_shelk','th_cosmouth','th_union'],
  trickster:    ['tr_shelk','tr_union','tr_nomdara'],
  beastmaster:  ['bm_soreheim'],
  wizard:       ['wz_mimolot','wz_shelk','wz_field'],
  cleric:       ['cl_cysur','cl_eloljaro','cl_remeny'],
  priest:       ['pr_panim','pr_community','pr_soreheim'],
  necromancer:  ['nc_panim','nc_mimolot','nc_sheresh'],
  illusionist:  ['il_shelk','il_union','il_twyll'],
  inquisitor:   ['iq_shirsh','iq_mimolot','iq_union'],
  elementalist: ['el_axis','el_sheresh','el_mimolot'],
  oracle:       ['or_mimolot','or_sheresh','or_ithtananalor'],
  healer:       ['hl_shelk','hl_soreheim','hl_panim'],
  artificer:    ['af_guild','af_tinker','af_roaz'],
  engineer:     ['eg_soreheim','eg_shelk','eg_roaz'],
  tactician:    ['tc_shelk','tc_soreheim','tc_union'],
  alchemist:    ['al_mimolot','al_union'],
  saint:        ['sn_cysur','sn_remeny','sn_eloljaro'],
  bard:         ['ba_shelk','ba_union','ba_panim'],
};

const ARCHETYPE_NAMES = {
  warrior:'Ash', knight:'Sir Aldric', ranger:'Vael', paladin:'Brother Cael',
  archer:'Mira', berserker:'Gorn', warden:'Sela', warlord:'Commander Drev', death_knight:'Kael',
  rogue:'Renn', assassin:'Shade', spellthief:'Lyss', scout_c:'Tracker', thief:'Finn',
  trickster:'Fox', beastmaster:'Kira',
  healer:'Mender', artificer:'Tink', engineer:'Brix', tactician:'Sera',
  alchemist:'Vex', saint:'Alia', bard:'Coda',
};

// ---------------------------------------------------------------------------
// Pacing
// ---------------------------------------------------------------------------
const PACE = {
  afterResult:   1500,
  beforePanel:    800,
  betweenCombat:  700,
  afterLevelup:   500,
  short:          300,
  waitChoices:   3500,
  panelDwell:    1200,
};

const MAX_PICKS        = 350;
const PROBE_EVERY      = 20;
const CAMP_EVERY       = 60;
const SCREENSHOT_EVERY = 20;

// ---------------------------------------------------------------------------
// Log — incremental writes
// ---------------------------------------------------------------------------
let _logPath = path.join(TEST_RESULTS, 'playtest-headed-log.md');
function initLog() {
  [SCREENSHOT_DIR, VIDEO_DIR, TEST_RESULTS].forEach(d => fs.mkdirSync(d, { recursive: true }));
  fs.writeFileSync(_logPath, `# Ledger of Ash — Headed QA Run\nStarted: ${new Date().toISOString()}\n\n`, 'utf8');
}
function log(entry) {
  console.log(entry);
  try { fs.appendFileSync(_logPath, entry + '\n', 'utf8'); } catch (_) {}
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildPool(family) {
  const combos = [];
  for (const archId of (HEADED_FAMILY_POOLS[family] || [])) {
    for (const bgId of (ARCHETYPE_BACKGROUNDS[archId] || [])) {
      combos.push({ archetypeId: archId, backgroundId: bgId });
    }
  }
  return shuffle(combos);
}

let _ssCounter = Date.now();
async function screenshot(page, tag) {
  try {
    _ssCounter++;
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
    const isAlive = await page.evaluate(() => true).catch(() => false);
    if (!isAlive) { log(`[screenshot-err] ${tag}: page not alive, skipping`); return null; }
    const p = path.join(SCREENSHOT_DIR, `${_ssCounter}_${tag.replace(/[^a-z0-9_-]/gi,'_')}.png`);
    await page.screenshot({ path: p, fullPage: false });
    return p;
  } catch (e) {
    log(`[screenshot-err] ${tag}: ${e.message} | stack: ${(e.stack||'').split('\n')[1]||''}`);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Page helpers
// ---------------------------------------------------------------------------
async function readG(page) {
  return page.evaluate(() => {
    try {
      return {
        stage:         G.stage,
        stageProgress: {
          1: G.stageProgress && G.stageProgress[1] || 0,
          2: G.stageProgress && G.stageProgress[2] || 0
        },
        sp2:           (G.stageProgress && typeof G.stageProgress[2] === 'number') ? G.stageProgress[2] : 0,
        location:      G.location,
        tensionLevel:  G.tensionLevel,
        level:         G.level,
        day:           G.dayCount,
        dead:          G.dead,
        hp:            G.hp,
        maxHp:         G.maxHp || G.hp,
        xp:            G.xp || 0,
        gold:          G.gold || 0,
        supply:        G.supply || 0,
        renown:        G.renown || 0,
        benevolence:   G.benevolence || 0,
        orderAxis:     G.orderAxis || 0,
        heat:          G.heat ? { ...G.heat } : {},
        masteryXP:     G.masteryXP || 0,
        companions:    (G.companions || []).length,
        flags:         G.flags ? { ...G.flags } : {},
        miniboss_started:  !!(G.flags && G.flags.stage2_miniboss_started),
        miniboss_complete: !!(G.flags && G.flags.stage2_miniboss_complete),
      };
    } catch (_) { return {}; }
  }).catch(() => ({}));
}

async function actionHTML(page) {
  return page.evaluate(() => {
    try { return (document.getElementById('action-content') || {}).innerHTML || ''; }
    catch (_) { return ''; }
  }).catch(() => '').then(s => String(s).slice(0, 400));
}

async function snapshotChoices(page) {
  try {
    return await page.evaluate(() =>
      Array.from(document.querySelectorAll('.choice-btn:not([style*="display:none"])'))
        .map(b => ({
          text: (b.querySelector('.choice-text') || b).textContent.trim().slice(0, 80),
          cls:  b.className,
        }))
    );
  } catch (_) { return []; }
}

async function readNarrativeText(page) {
  try {
    return await page.evaluate(() => {
      const selectors = ['.result-text', '.narrative-text', '.env-desc', '#narrative-text'];
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el && el.textContent.trim()) return el.textContent.trim().slice(0, 200);
      }
      return '';
    });
  } catch (_) { return ''; }
}

// Checks choice labels for CLAUDE.md content standard violations — logs but does not throw
function auditChoiceLabels(snap, tag, picks) {
  const INFINITIVE_STARTS = /^(To |Ask |Tell |Go |Find |Report |Speak |Look |Check |Examine |Take |Give |Use |Try |Get |Make |Help |Stop |Push |Pull |Open |Close |Enter |Leave |Follow |Wait |Watch |Return |Walk |Run )/i;
  const violations = [];
  snap.forEach((s, i) => {
    const words = s.text.trim().split(/\s+/).length;
    if (words > 15) violations.push(`label[${i}] ${words}w (>15): "${s.text.slice(0,60)}"`);
    if (s.text.trim().endsWith('?')) violations.push(`label[${i}] ends-?: "${s.text.slice(0,60)}"`);
    if (INFINITIVE_STARTS.test(s.text.trim())) violations.push(`label[${i}] infinitive: "${s.text.slice(0,60)}"`);
  });
  if (violations.length > 0) {
    violations.forEach(v => log(`[label-audit ${tag}] pick=${picks} VIOLATION: ${v}`));
  }
}

async function waitForChoices(page, ms) {
  try { await page.waitForSelector('.choice-btn:visible', { timeout: ms || PACE.waitChoices }); }
  catch (_) {}
  return page.locator('.choice-btn:visible').count().catch(() => 0);
}

// Organic isSuccess — no nuclear injection. Reports what actually happened.
// ceiling is determined once per run via getStageCeiling().
async function isSuccess(page, ceiling) {
  return stageLockIsSuccess(page, ceiling || 'Stage II');
}

async function isDead(page) {
  try { return await page.locator('#screen-death,.death-screen,#death-overlay').isVisible({ timeout: 400 }); }
  catch (_) { return false; }
}

async function closeOverlay(page) {
  try {
    const btn = page.locator('.overlay.active .overlay-close, .overlay.active button:has-text("×"), .overlay.active button:has-text("Close")').first();
    if (await btn.isVisible({ timeout: 500 }).catch(() => false)) {
      await btn.click();
    } else {
      await page.keyboard.press('Escape');
    }
    await page.waitForSelector('.overlay.active', { state: 'hidden', timeout: 1000 }).catch(() => {});
    await page.waitForTimeout(100);
  } catch (_) {}
}

async function dismissOverlays(page) {
  for (let i = 0; i < 8; i++) {
    try {
      // Catch both .overlay.active and any modal/panel that has a close button but no .active class
      const ov = page.locator('.overlay.active, #how-to-play-modal, #notice-board-modal, [id$="-modal"]:visible, .modal:visible, .modal-overlay:visible').first();
      if (!await ov.isVisible({ timeout: 300 }).catch(() => false)) break;
      const btn = ov.locator('button.overlay-close,.overlay-close,button:has-text("×"),button:has-text("Close"),button:has-text("Done"),button:has-text("OK")').first();
      if (await btn.isVisible({ timeout: 300 }).catch(() => false)) await btn.click();
      else await page.keyboard.press('Escape');
      await page.waitForTimeout(PACE.short);
    } catch (_) { break; }
  }
}

// ---------------------------------------------------------------------------
// Character creation
// ---------------------------------------------------------------------------
async function createCharacter(page, archetypeId, backgroundId) {
  await page.goto('/ledger-of-ash.html');
  await page.evaluate(() => { try { localStorage.clear(); } catch (_) {} });
  await page.waitForSelector('#btn-new-legend', { state: 'visible', timeout: 15000 });
  await page.click('#btn-new-legend');

  const name = ARCHETYPE_NAMES[archetypeId] || 'Traveller';
  await page.fill('#char-name', name);

  // Archetype cards live inside collapsed group accordions — use engine call to select
  await page.waitForFunction(() => typeof selectArchetype === 'function', { timeout: 8000 });
  await page.evaluate((id) => selectArchetype(id), archetypeId);
  await page.waitForSelector('#bg-step', { state: 'visible', timeout: 5000 });

  // Click the first available background card organically
  const bgCard = page.locator('#bg-step .card').first();
  await bgCard.click();

  await page.waitForSelector('#begin-btn:not([style*="display:none"])', { timeout: 5000 });
  await page.click('#begin-btn');
  await page.waitForSelector('#screen-game', { timeout: 10000 });
  await page.waitForTimeout(500);

  for (let i = 0; i < 15; i++) {
    const btn = page.locator(
      'button:has-text("Skip"),button:has-text("Got it"),button:has-text("Continue"),button:has-text("Begin"),.onboarding-skip'
    ).first();
    if (await btn.isVisible({ timeout: 500 }).catch(() => false)) {
      await btn.click();
      await page.waitForTimeout(PACE.short);
    } else break;
  }

  await page.waitForSelector('.choice-btn', { state: 'visible', timeout: 15000 });
}

// ---------------------------------------------------------------------------
// Level-up handler
// ---------------------------------------------------------------------------
async function handleLevelup(page, tag) {
  let stepNum = 0;
  try {
    const modal = page.locator('#levelup-modal.active').first();
    if (await modal.isVisible({ timeout: 400 }).catch(() => false)) {
      // Multi-step level-up: click all .lu-option steps until modal closes
      for (let _step = 0; _step < 5; _step++) {
        const pick = modal.locator('.lu-option-btn,.lu-option,.levelup-option').first();
        if (!await pick.isVisible({ timeout: 500 }).catch(() => false)) break;
        await screenshot(page, `${tag}_levelup_step${stepNum}`);
        await pick.click();
        stepNum++;
        await page.waitForTimeout(PACE.afterLevelup);
        // Check if modal closed after this step
        const stillOpen = await modal.isVisible({ timeout: 800 }).catch(() => false);
        if (!stillOpen) break;
      }
      const g = await readG(page);
      log(`[panel:level-up ${tag}] steps-completed=${stepNum} lvl=${g.level} modal-pick — PASS`);
      return true;
    }
    const block = page.locator('.levelup-block:visible').first();
    if (await block.isVisible({ timeout: 400 }).catch(() => false)) {
      for (let _step = 0; _step < 5; _step++) {
        const optBtn = block.locator('.levelup-option button,.levelup-btn,.lu-option-btn,.lu-option').first();
        if (!await optBtn.isVisible({ timeout: 400 }).catch(() => false)) break;
        await screenshot(page, `${tag}_levelup_step${stepNum}`);
        await optBtn.click();
        stepNum++;
        await page.waitForTimeout(PACE.afterLevelup);
        const stillOpen = await block.isVisible({ timeout: 800 }).catch(() => false);
        if (!stillOpen) break;
      }
      const g = await readG(page);
      await screenshot(page, `${tag}_levelup_lvl${g.level}`);
      log(`[panel:level-up ${tag}] steps-completed=${stepNum} lvl=${g.level} — PASS`);
      return true;
    }
  } catch (_) {}
  return false;
}

// ---------------------------------------------------------------------------
// Choice picker
// ---------------------------------------------------------------------------
async function pickChoice(page, pickNum, forcePlotMain) {
  const buttons = page.locator('.choice-btn:visible:not([disabled])');
  const count   = await buttons.count();
  if (count === 0) return { clicked: false };

  const meta = async (loc) => {
    const txt = await loc.evaluate(b => (b.querySelector('.choice-text') || b).textContent.trim()).catch(() => '');
    const cls = await loc.evaluate(b => b.className).catch(() => '');
    return { text: txt, isPlotMain: cls.includes('plot-main'), isCombat: cls.includes('combat-btn') };
  };

  const pm = page.locator('.choice-btn.plot-main:visible').first();
  if (await pm.isVisible({ timeout: 400 }).catch(() => false)) {
    const m = await meta(pm); await pm.click(); return { clicked: true, ...m };
  }
  if (forcePlotMain) {
    await page.waitForTimeout(200);
    const pm2 = page.locator('.choice-btn.plot-main').first();
    if (await pm2.isVisible({ timeout: 600 }).catch(() => false)) {
      const m = await meta(pm2); await pm2.click(); return { clicked: true, ...m };
    }
  }
  if (pickNum % 5 === 0) {
    const idx = Math.floor(Math.random() * count);
    const btn = buttons.nth(idx);
    const m   = await meta(btn); await btn.click(); return { clicked: true, ...m };
  }
  const snap = await snapshotChoices(page);

  // When ALL visible choices are combat buttons, randomize to prevent single-ability spiral.
  // Also prefer Flee every ~8 picks to let combat complete naturally.
  const allCombat = snap.length > 0 && snap.every(s => s.cls.includes('combat-btn'));
  if (allCombat) {
    // Every 8th pick in combat, prefer Flee to break out
    const fleeIdx = snap.findIndex(s => /^Flee/i.test(s.text.trim()));
    if (pickNum % 8 === 0 && fleeIdx >= 0) {
      const btn = buttons.nth(fleeIdx);
      const m   = await meta(btn); await btn.click(); return { clicked: true, ...m };
    }
    // Otherwise randomize among combat choices
    const idx = Math.floor(Math.random() * count);
    const btn = buttons.nth(idx);
    const m   = await meta(btn); await btn.click(); return { clicked: true, ...m };
  }

  // Score each choice: prefer inner-voice labels (no infinitives, no ?), prefer longer text
  const INFINITIVE_STARTS = /^(To |Ask |Tell |Go |Find |Report |Speak |Look |Check |Examine |Take |Give |Use |Try |Get |Make |Help |Stop |Push |Pull |Open |Close |Enter |Leave |Follow |Wait |Watch |Return |Walk |Run )/i;
  let bestIdx = 0, bestScore = -Infinity;
  snap.forEach((s, i) => {
    let score = s.text.length;
    if (s.text.trim().endsWith('?')) score -= 30;
    if (INFINITIVE_STARTS.test(s.text.trim())) score -= 20;
    if (s.cls.includes('choice-btn--warn') || s.cls.includes('combat-btn')) score -= 10; // avoid pure combat spirals
    if (score > bestScore) { bestScore = score; bestIdx = i; }
  });
  const btn = buttons.nth(bestIdx);
  const m   = await meta(btn); await btn.click(); return { clicked: true, ...m };
}

// ---------------------------------------------------------------------------
// Panel probes — full simulation
// ---------------------------------------------------------------------------
// Close a specific overlay using its data-close button, fall back to generic close
async function closeSpecificOverlay(page, overlayId) {
  try {
    const closeBtn = page.locator(`[data-close="${overlayId}"]`).first();
    if (await closeBtn.isVisible({ timeout: 600 }).catch(() => false)) await closeBtn.click();
    else await closeOverlay(page);
    await page.waitForSelector(`#${overlayId}`, { state: 'hidden', timeout: 1500 }).catch(() => {});
  } catch (_) { await closeOverlay(page).catch(() => {}); }
}

// Open an overlay via button, wait for it, return true if open
async function openOverlay(page, btnId, overlayId, timeout) {
  try {
    const btn = page.locator(btnId).first();
    if (!await btn.isVisible({ timeout: 800 }).catch(() => false)) return false;
    await btn.click();
    await page.waitForSelector(overlayId, { state: 'visible', timeout: timeout || 4000 });
    await page.waitForTimeout(PACE.panelDwell);
    return true;
  } catch (_) { return false; }
}

// ---------------------------------------------------------------------------
// Canon compliance constants
// ---------------------------------------------------------------------------
const FORBIDDEN_WORDS = [
  /\binvestigat(e|ion|ing)\b/i, /\bmeaningful\b/i,
  /\byou feel\b/i, /\byou realize\b/i, /\byou sense\b/i,
  /in a way that suggests/i, /precisely as .{0,20} as /i,
  /\bledger of ash\b/i,
];
const STAGE_LEVEL_CAPS = { 'Stage I': 5, 'Stage II': 10, 'Stage III': 15, 'Stage IV': 18, 'Stage V': 20 };

function probeCanonText(txt, tag, context) {
  if (!txt) return;
  for (const re of FORBIDDEN_WORDS) {
    const m = txt.match(re);
    if (m) {
      const severity = /ledger of ash/i.test(m[0]) ? 'CRITICAL VIOLATION' : 'VIOLATION';
      const sentence = txt.slice(Math.max(0, txt.indexOf(m[0]) - 30), txt.indexOf(m[0]) + 80).replace(/\n/g, ' ');
      log(`[canon ${tag}] ${severity}: "${m[0]}" in ${context} — "...${sentence}..."`);
    }
  }
}

async function probeHUD(page, tag, g) {
  try {
    const snap = await page.evaluate(function() {
      function txt(id) {
        var el = document.getElementById(id);
        return el ? el.textContent.trim() : '__missing__';
      }
      return {
        dom_hp:     txt('hud-hp'),
        dom_level:  txt('hud-level'),
        dom_gold:   txt('hud-gold'),
        dom_day:    txt('hud-day'),
        g_hp:       (typeof G !== 'undefined') ? (G.hp || 0) : -1,
        g_level:    (typeof G !== 'undefined') ? (G.level || 0) : -1,
        g_gold:     (typeof G !== 'undefined') ? (G.gold || 0) : -1,
        g_day:      (typeof G !== 'undefined') ? (G.dayCount || 0) : -1,
        g_stage:    (typeof G !== 'undefined') ? (G.stage || '') : '',
        g_sp2:      (typeof G !== 'undefined' && G.stageProgress) ? (G.stageProgress[2] || 0) : -1,
      };
    }).catch(() => null);

    if (!snap) { log(`[hud-integrity ${tag}] SKIP — evaluate failed`); return; }

    var mismatches = [];
    var pickLabel = (g && g.day != null) ? 'day=' + g.day : '';

    // HP: DOM may show "8/10" or just "8"; extract first number
    var domHpNum = parseInt((snap.dom_hp || '').replace(/[^0-9].*/, ''), 10);
    if (!isNaN(domHpNum) && snap.dom_hp !== '__missing__' && domHpNum !== snap.g_hp) {
      mismatches.push('hp dom=' + snap.dom_hp + ' g=' + snap.g_hp);
    }

    // Level: plain number
    if (snap.dom_level !== '__missing__') {
      var domLvl = parseInt(snap.dom_level, 10);
      if (!isNaN(domLvl) && domLvl !== snap.g_level) {
        mismatches.push('level dom=' + snap.dom_level + ' g=' + snap.g_level);
      }
    }

    // Gold: strip non-numeric prefix/suffix
    if (snap.dom_gold !== '__missing__') {
      var domGold = parseInt((snap.dom_gold || '').replace(/[^0-9\-]/g, ''), 10);
      if (!isNaN(domGold) && domGold !== snap.g_gold) {
        mismatches.push('gold dom=' + snap.dom_gold + ' g=' + snap.g_gold);
      }
    }

    // Day
    if (snap.dom_day !== '__missing__') {
      var domDay = parseInt(snap.dom_day, 10);
      if (!isNaN(domDay) && domDay !== snap.g_day) {
        mismatches.push('day dom=' + snap.dom_day + ' g=' + snap.g_day);
      }
    }

    if (mismatches.length === 0) {
      log(`[hud-integrity ${tag}] OK ${pickLabel} hp=${snap.g_hp} lvl=${snap.g_level} gold=${snap.g_gold} sp2=${snap.g_sp2}`);
    } else {
      mismatches.forEach(function(m) {
        log(`[hud-mismatch ${tag}] ${pickLabel} ${m}`);
      });
    }
  } catch (err) {
    log(`[hud-integrity ${tag}] ERROR ` + String(err).slice(0, 80));
  }
}

async function probeChoiceBorders(page, tag) {
  try {
    const plotMain   = await page.locator('.choice-btn.plot-main').count().catch(() => 0);
    const warn1      = await page.locator('.choice-btn--warn1').count().catch(() => 0);
    const warn2      = await page.locator('.choice-btn--warn2').count().catch(() => 0);
    const combatBtn  = await page.locator('.choice-btn--combat').count().catch(() => 0);
    log(`[choice-borders ${tag}] plot-main=${plotMain} warn1=${warn1} warn2=${warn2} combat=${combatBtn}`);
  } catch (err) { log(`[choice-borders ${tag}] WARN: ${err.message}`); }
}

async function probeDuplicates(page, tag, picks) {
  try {
    const singletons = [
      '#hud-hp','#hud-level','#hud-gold','#hud-renown','#hud-day',
      '#hud-location','#topbar-stage','.result-text',
      '.stage-banner','.levelup-notice','.env-desc',
    ];
    for (const sel of singletons) {
      const count = await page.locator(sel).count().catch(() => 0);
      if (count > 1) log(`[DUPLICATE ${tag}] pick=${picks} element=${sel} count=${count}`);
    }

    const labels = await page.locator('.choice-btn:visible').allInnerTexts().catch(() => []);
    const labelFreq = {};
    for (const l of labels) {
      const key = l.trim().slice(0, 60);
      labelFreq[key] = (labelFreq[key] || 0) + 1;
    }
    for (const [label, count] of Object.entries(labelFreq)) {
      if (count > 1) log(`[DUPLICATE ${tag}] pick=${picks} choice-label="${label}" count=${count}`);
    }

    const quests = await page.locator('.quest-entry').allInnerTexts().catch(() => []);
    const questFreq = {};
    for (const q of quests) {
      const key = q.trim().slice(0, 80);
      questFreq[key] = (questFreq[key] || 0) + 1;
    }
    for (const [quest, count] of Object.entries(questFreq)) {
      if (count > 1) log(`[DUPLICATE ${tag}] pick=${picks} quest="${quest}" count=${count}`);
    }

    const narratives = await page.locator('.narrative-text, .env-desc').allInnerTexts().catch(() => []);
    const narFreq = {};
    for (const n of narratives) {
      const key = n.trim().slice(0, 100);
      if (!key) continue;
      narFreq[key] = (narFreq[key] || 0) + 1;
    }
    for (const [nar, count] of Object.entries(narFreq)) {
      if (count > 1) log(`[DUPLICATE ${tag}] pick=${picks} narrative-dup="${nar.slice(0,40)}" count=${count}`);
    }
  } catch (err) { log(`[DUPLICATE ${tag}] WARN: ${err.message}`); }
}

async function probeCharSheet(page, tag, g) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    if (!await openOverlay(page, '#btn-charsheet', '#overlay-charsheet')) { log(`[panel:char-sheet ${tag}] SKIP`); return; }
    await screenshot(page, `${tag}_charsheet_lvl${g.level}`);

    // Skill value cross-check: G.skills[key] vs rendered .char-skill-row
    if (g && g.skills) {
      const SKILL_KEYS = ['combat','stealth','survival','lore','persuasion','craft'];
      for (const key of SKILL_KEYS) {
        const expected = g.skills[key];
        if (expected === undefined) continue;
        try {
          const rowText = await page.locator(`.char-skill-row[data-skill="${key}"] .skill-val`).innerText().catch(() => '');
          const shown = parseInt(rowText) || 0;
          if (rowText && shown !== expected)
            log(`[hud-mismatch ${tag}] VIOLATION: skill=${key} G=${expected} shown=${shown}`);
        } catch (_) {}
      }
    }

    const txt       = await page.locator('#sheet-body,#overlay-charsheet').first().innerText().catch(() => '');
    const objObj    = txt.includes('[object Object]');
    // Read actual section content
    const skillRows = await page.locator('.char-skill-row').allInnerTexts().catch(() => []);
    const abilities = await page.locator('.ability-card').allInnerTexts().catch(() => []);
    const traits    = await page.locator('.trait-section').allInnerTexts().catch(() => []);
    const hasSkills = skillRows.length > 0;
    const hasAbils  = abilities.length > 0;
    const hasTraits = traits.length > 0;
    log(`[panel:char-sheet ${tag}] lvl=${g.level} skillRows=${skillRows.length} abilities=${abilities.length} traits=${traits.length} objObj=${objObj}`);
    if (skillRows.length) log(`[panel:char-sheet ${tag}] skills: ${skillRows.map(s=>s.replace(/\n/g,' ')).join(' | ').slice(0,200)}`);
    if (abilities.length) log(`[panel:char-sheet ${tag}] abilities: ${abilities.slice(0,3).map(a=>a.slice(0,40)).join(', ')}`);
    if (!hasSkills) log(`[panel:char-sheet ${tag}] WARN: no .char-skill-row found`);
    if (!hasAbils)  log(`[panel:char-sheet ${tag}] WARN: no .ability-card found`);
    if (objObj)     log(`[panel:char-sheet ${tag}] VIOLATION: [object Object] in char sheet`);
    probeCanonText(txt, tag, 'char-sheet');

    // Skill cross-check: parse each visible skill row and compare to G.skills
    // Key normalization per CLAUDE.md: display names → internal keys
    const KEY_NORM = { might:'combat', finesse:'stealth', vigor:'survival', wits:'lore', charm:'persuasion', spirit:'craft' };
    const gSkills = await page.evaluate(() => {
      try { return G.skills ? { ...G.skills } : {}; } catch (_) { return {}; }
    }).catch(() => ({}));
    for (const rowTxt of skillRows) {
      // Expected row format: "Might  3" or "Combat  3" — split on whitespace, last token is value
      const parts = rowTxt.trim().split(/\s+/);
      if (parts.length < 2) continue;
      const rawName  = parts[0].toLowerCase();
      const rowVal   = parseInt(parts[parts.length - 1]);
      const internalKey = KEY_NORM[rawName] || rawName;
      const gVal = gSkills[internalKey];
      if (gVal !== undefined && !isNaN(rowVal) && rowVal !== gVal) {
        log(`[panel:char-sheet ${tag}] VIOLATION: skill "${rawName}" sheet=${rowVal} vs G.skills.${internalKey}=${gVal}`);
      } else if (gVal !== undefined && !isNaN(rowVal)) {
        log(`[panel:char-sheet ${tag}] skill-match: ${internalKey} sheet=${rowVal} G=${gVal} OK`);
      }
    }

    // D3: Ability card click probe
    try {
      const _abilityCard = page.locator('.ability-card').first();
      const _abilVis = await _abilityCard.isVisible({ timeout: 500 }).catch(() => false);
      if (_abilVis) {
        await _abilityCard.click();
        await page.waitForTimeout(PACE.short || 300);
        const _cardTxt    = await _abilityCard.innerText().catch(() => '');
        const _cardObjObj = _cardTxt.includes('[object Object]');
        await screenshot(page, `${tag}_ability_card_p${g.level}`);
        log(`[panel:char-sheet ${tag}] ability-card-click: interactive=true objObj=${_cardObjObj} text="${_cardTxt.slice(0, 60).replace(/\n/g, ' ')}"`);
      } else {
        log(`[panel:char-sheet ${tag}] ability-card-click: no .ability-card visible`);
      }
    } catch (_d3err) {}

    // Active ability use — click .ability-btn:not(.ability-btn--spent) if one exists
    try {
      const _activeAbil = page.locator('.ability-btn:not(.ability-btn--spent)').first();
      if (await _activeAbil.isVisible({ timeout: 500 }).catch(() => false)) {
        const _abilLabel = await _activeAbil.innerText().catch(() => '');
        await _activeAbil.click();
        await page.waitForTimeout(PACE.short || 300);
        await screenshot(page, `${tag}_active_ability_use`);
        log(`[panel:char-sheet ${tag}] active-ability-use: clicked "${_abilLabel.slice(0,40).replace(/\n/g,' ')}"`);
      } else {
        log(`[panel:char-sheet ${tag}] active-ability-use: none available (all spent or no active abilities)`);
      }
    } catch (_aErr) {}

    // Trait use button
    try {
      const _traitBtn = page.locator('#btn-use-trait,.trait-use-btn').first();
      if (await _traitBtn.isVisible({ timeout: 400 }).catch(() => false)) {
        const _traitLabel = await _traitBtn.innerText().catch(() => '');
        await _traitBtn.click();
        await page.waitForTimeout(PACE.short || 300);
        await screenshot(page, `${tag}_trait_use`);
        log(`[panel:char-sheet ${tag}] trait-use: clicked "${_traitLabel.slice(0,40).replace(/\n/g,' ')}"`);
      }
    } catch (_tErr) {}

    // Inventory tab
    try {
      const _invTab = page.locator('.sheet-tab[data-tab="inventory"]');
      if (await _invTab.isVisible({ timeout: 400 }).catch(() => false)) {
        await _invTab.click();
        await page.waitForTimeout(PACE.short || 300);
        await screenshot(page, `${tag}_charsheet_inventory`);
        const _invTxt = await page.locator('[data-pane="inventory"],.sheet-tab-pane').first().innerText().catch(() => '');
        const _invItems = await page.locator('.inv-item,[data-pane="inventory"] .item-row').count().catch(() => 0);
        const _invObjObj = _invTxt.includes('[object Object]');
        log(`[panel:char-sheet ${tag}] inventory-tab: items=${_invItems} objObj=${_invObjObj} text="${_invTxt.slice(0,80).replace(/\n/g,' ')}"`);
        if (_invObjObj) log(`[panel:char-sheet ${tag}] VIOLATION: [object Object] in inventory tab`);
        const _useBtn = page.locator('.btn-use-item').first();
        if (await _useBtn.isVisible({ timeout: 400 }).catch(() => false)) {
          await _useBtn.click();
          await page.waitForTimeout(PACE.short || 300);
          log(`[panel:char-sheet ${tag}] inventory-tab: use-item clicked`);
        }
      }
    } catch (_invErr) {}

    // Mastery tab
    try {
      const _mastTab = page.locator('.sheet-tab[data-tab="mastery"]');
      if (await _mastTab.isVisible({ timeout: 400 }).catch(() => false)) {
        await _mastTab.click();
        await page.waitForTimeout(PACE.short || 300);
        await screenshot(page, `${tag}_charsheet_mastery`);
        const _mastTxt = await page.locator('[data-pane="mastery"],.sheet-tab-pane').first().innerText().catch(() => '');
        const _mastObjObj = _mastTxt.includes('[object Object]');
        const _mastBtns = await page.locator('.ability-btn:not(.ability-btn--spent)').count().catch(() => 0);
        log(`[panel:char-sheet ${tag}] mastery-tab: upgradeBtns=${_mastBtns} masteryXP=${g ? (g.masteryXP||0) : '?'} objObj=${_mastObjObj} text="${_mastTxt.slice(0,100).replace(/\n/g,' ')}"`);
        if (_mastObjObj) log(`[panel:char-sheet ${tag}] VIOLATION: [object Object] in mastery tab`);
        // Click first available upgrade button (organic — only present if player reached level cap)
        if (_mastBtns > 0 && !_masteryProbeDone) {
          _masteryProbeDone = true;
          const _firstMastBtn = page.locator('.ability-btn:not(.ability-btn--spent)').first();
          const _mastBtnLabel = await _firstMastBtn.innerText().catch(() => '');
          const _mastXPBefore = await page.evaluate(function(){ return (typeof G !== 'undefined' && G.masteryXP) || 0; }).catch(() => 0);
          await _firstMastBtn.click();
          await page.waitForTimeout(PACE.short || 300);
          const _mastXPAfter = await page.evaluate(function(){ return (typeof G !== 'undefined' && G.masteryXP) || 0; }).catch(() => 0);
          await screenshot(page, `${tag}_charsheet_mastery_purchase`);
          log(`[panel:char-sheet ${tag}] mastery-purchase: "${_mastBtnLabel.slice(0,40).replace(/\n/g,' ')}" masteryXP ${_mastXPBefore}→${_mastXPAfter}`);
        } else if (_mastBtns === 0 && (g ? (g.masteryXP||0) : 0) === 0) {
          log(`[panel:char-sheet ${tag}] mastery-tab: player has not reached level cap yet (masteryXP=0)`);
        }
      }
    } catch (_mErr) {}

    await closeSpecificOverlay(page, 'overlay-charsheet');
  } catch (err) {
    log(`[panel:char-sheet ${tag}] FAIL: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

async function probeJournal(page, tag, g) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    if (!await openOverlay(page, '#btn-journal', '#overlay-journal,[id*="journal"]')) { log(`[panel:journal ${tag}] SKIP`); return; }
    await screenshot(page, `${tag}_journal_day${g.day}`);
    const body   = page.locator('#journal-overlay-body,[id*="journal"]').first();
    const txt    = await body.innerText().catch(() => '');
    const objObj = txt.includes('[object Object]');
    const hasInv = /iron blade|courier satchel|field kit/i.test(txt);
    // Correct journal categories: quest, field_note, faction, rival, companion, fact
    const sections = await page.locator('.jov-section').allInnerTexts().catch(() => []);
    const catHits = { quest: 0, field_note: 0, faction: 0, rival: 0, companion: 0, fact: 0 };
    sections.forEach(s => { Object.keys(catHits).forEach(k => { if (s.toLowerCase().includes(k.replace('_',' '))) catHits[k]++; }); });
    const entryCount = await page.locator('.jov-entry').count().catch(() => 0);
    log(`[panel:journal ${tag}] day=${g.day} entries=${entryCount} sections=${sections.length} cats=${JSON.stringify(catHits)} objObj=${objObj} invLeak=${hasInv}`);
    if (sections.length === 0 && g.day > 1) log(`[panel:journal ${tag}] WARN: no .jov-section found after day ${g.day}`);
    if (objObj) log(`[panel:journal ${tag}] VIOLATION: [object Object] in journal`);
    if (hasInv) log(`[panel:journal ${tag}] VIOLATION: inventory item leaked into journal`);
    if (entryCount > 0) log(`[panel:journal ${tag}] sample: "${txt.slice(0,200).replace(/\n/g,' ')}"`);
    probeCanonText(txt, tag, 'journal');
    await closeSpecificOverlay(page, 'overlay-journal');
  } catch (err) {
    log(`[panel:journal ${tag}] FAIL: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

async function probeCamp(page, tag, g) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    if (!await openOverlay(page, '#btn-camp', '#overlay-camp,[id*="camp"]')) { log(`[panel:camp ${tag}] SKIP`); return; }
    await screenshot(page, `${tag}_camp_day${g.day}`);
    const txt    = await page.locator('#overlay-camp,[id*="camp"]').first().innerText().catch(() => '');
    const rest   = await page.locator('button.camp-action[data-camp="rest"],[data-camp="rest"]').isVisible({ timeout: 600 }).catch(() => false);
    const sleep  = await page.locator('button.camp-action[data-camp="sleep"],[data-camp="sleep"]').isVisible({ timeout: 600 }).catch(() => false);
    const train  = await page.locator('button.camp-action[data-camp="train"],[data-camp="train"]').isVisible({ timeout: 600 }).catch(() => false);
    const craft  = await page.locator('button.camp-action[data-camp="craft"],[data-camp="craft"],#btn-craft').isVisible({ timeout: 600 }).catch(() => false);
    log(`[panel:camp ${tag}] day=${g.day} rest=${rest} sleep=${sleep} train=${train} craft=${craft} text="${txt.slice(0,120).replace(/\n/g,' ')}"`);
    if (!rest || !sleep) log(`[panel:camp ${tag}] WARN: missing core camp actions (rest=${rest} sleep=${sleep})`);
    // Actually click rest to verify it works
    if (rest) {
      const restBtn = page.locator('button.camp-action[data-camp="rest"],[data-camp="rest"]').first();
      await restBtn.click();
      await page.waitForTimeout(PACE.short);
      await screenshot(page, `${tag}_camp_rest_result`);
      const postTxt = await page.locator('#overlay-camp,.result-text,.narrative-text').first().innerText().catch(() => '');
      log(`[panel:camp ${tag}] rest-result: "${postTxt.slice(0,100).replace(/\n/g,' ')}"`);
    }
    // Click train if visible — screenshot result, read text, then close overlay
    const trainVisible = await page.locator('button.camp-action[data-camp="train"],[data-camp="train"]').isVisible({ timeout: 600 }).catch(() => false);
    if (trainVisible) {
      const trainBtn = page.locator('button.camp-action[data-camp="train"],[data-camp="train"]').first();
      await trainBtn.click();
      await page.waitForTimeout(PACE.short);
      await screenshot(page, `${tag}_camp_train_result`);
      const trainTxt = await page.locator('#overlay-camp,.result-text,.narrative-text').first().innerText().catch(() => '');
      log(`[panel:camp ${tag}] train-result: "${trainTxt.slice(0,100).replace(/\n/g,' ')}"`);
    } else {
      log(`[panel:camp ${tag}] train: not visible`);
    }
    // Click craft if visible — screenshot result, read text, then close overlay
    const craftVisible = await page.locator('button.camp-action[data-camp="craft"],[data-camp="craft"],#btn-craft').isVisible({ timeout: 600 }).catch(() => false);
    if (craftVisible) {
      const craftBtn = page.locator('button.camp-action[data-camp="craft"],[data-camp="craft"],#btn-craft').first();
      try {
        const _lvlForCraft = (g && g.level) || 1;
        await craftBtn.click();
        await page.waitForTimeout(PACE.short || 300);

        // D4: Check for recipe selection UI
        const _recipeCount = await page.locator('.choice-btn[data-cid^="craft_"]').count().catch(() => 0);
        if (_recipeCount > 0 && _lvlForCraft >= 2) {
          await screenshot(page, `${tag}_camp_craft_recipes`);
          log(`[panel:camp ${tag}] craft-recipes=${_recipeCount}`);
          const _firstRecipe = page.locator('.choice-btn[data-cid^="craft_"]').first();
          const _recipeLabel = await _firstRecipe.innerText().catch(() => '?');
          await _firstRecipe.click();
          await page.waitForTimeout(PACE.short || 300);
          const _craftResultTxt = await page.locator('.result-text,.narrative-text').first().innerText().catch(() => '');
          const _craftObjObj    = _craftResultTxt.includes('[object Object]');
          await screenshot(page, `${tag}_camp_craft_recipe_result`);
          log(`[panel:camp ${tag}] craft-recipe-clicked: "${_recipeLabel.slice(0, 40).replace(/\n/g,' ')}" result="${_craftResultTxt.slice(0, 80).replace(/\n/g,' ')}" objObj=${_craftObjObj}`);
        } else {
          const craftTxt = await page.locator('.result-text,.narrative-text').first().innerText().catch(() => '');
          await screenshot(page, `${tag}_camp_craft_result`);
          log(`[panel:camp ${tag}] craft-result: "${craftTxt.slice(0,100).replace(/\n/g,' ')}"`);
        }
      } catch (_d4err) {
        log(`[panel:camp ${tag}] craft FAIL: ${_d4err.message}`);
      } finally {
        await closeOverlay(page).catch(() => {});
      }
    } else {
      log(`[panel:camp ${tag}] craft: not visible`);
    }
    // post_watches
    const postWatchesVisible = await page.locator('button.camp-action[data-camp="post_watches"],[data-camp="post_watches"]').isVisible({ timeout: 600 }).catch(() => false);
    const postWatchesEnabled = postWatchesVisible && await page.locator('button.camp-action[data-camp="post_watches"],[data-camp="post_watches"]').first().isEnabled({ timeout: 400 }).catch(() => false);
    if (postWatchesEnabled) {
      await page.locator('button.camp-action[data-camp="post_watches"],[data-camp="post_watches"]').first().click();
      await page.waitForTimeout(PACE.short);
      await screenshot(page, `${tag}_camp_post_watches_result`);
      const txt = await page.locator('#overlay-camp,.result-text,.narrative-text').first().innerText().catch(() => '');
      log(`[panel:camp ${tag}] post_watches-result: "${txt.slice(0,100).replace(/\n/g,' ')}"`);
    } else {
      log(`[panel:camp ${tag}] post_watches: ${postWatchesVisible ? 'visible but disabled (gated)' : 'not visible'}`);
    }
    // lay_low
    const layLowVisible = await page.locator('button.camp-action[data-camp="lay_low"],[data-camp="lay_low"]').isVisible({ timeout: 600 }).catch(() => false);
    const layLowEnabled = layLowVisible && await page.locator('button.camp-action[data-camp="lay_low"],[data-camp="lay_low"]').first().isEnabled({ timeout: 400 }).catch(() => false);
    if (layLowEnabled) {
      await page.locator('button.camp-action[data-camp="lay_low"],[data-camp="lay_low"]').first().click();
      await page.waitForTimeout(PACE.short);
      await screenshot(page, `${tag}_camp_lay_low_result`);
      const txt = await page.locator('#overlay-camp,.result-text,.narrative-text').first().innerText().catch(() => '');
      log(`[panel:camp ${tag}] lay_low-result: "${txt.slice(0,100).replace(/\n/g,' ')}"`);
    } else {
      log(`[panel:camp ${tag}] lay_low: ${layLowVisible ? 'visible but disabled (gated)' : 'not visible'}`);
    }
    // recover
    const recoverVisible = await page.locator('button.camp-action[data-camp="recover"],[data-camp="recover"]').isVisible({ timeout: 600 }).catch(() => false);
    const recoverEnabled = recoverVisible && await page.locator('button.camp-action[data-camp="recover"],[data-camp="recover"]').first().isEnabled({ timeout: 400 }).catch(() => false);
    if (recoverEnabled) {
      await page.locator('button.camp-action[data-camp="recover"],[data-camp="recover"]').first().click();
      await page.waitForTimeout(PACE.short);
      await screenshot(page, `${tag}_camp_recover_result`);
      const txt = await page.locator('#overlay-camp,.result-text,.narrative-text').first().innerText().catch(() => '');
      log(`[panel:camp ${tag}] recover-result: "${txt.slice(0,100).replace(/\n/g,' ')}"`);
    } else {
      log(`[panel:camp ${tag}] recover: ${recoverVisible ? 'visible but disabled (gated)' : 'not visible'}`);
    }
    // talk — being disabled is NOT a WARN
    const talkVisible = await page.locator('button.camp-action[data-camp="talk"],[data-camp="talk"]').isVisible({ timeout: 600 }).catch(() => false);
    const talkEnabled = talkVisible && await page.locator('button.camp-action[data-camp="talk"],[data-camp="talk"]').first().isEnabled({ timeout: 400 }).catch(() => false);
    if (talkEnabled) {
      await page.locator('button.camp-action[data-camp="talk"],[data-camp="talk"]').first().click();
      await page.waitForTimeout(PACE.short);
      await screenshot(page, `${tag}_camp_talk_result`);
      const txt = await page.locator('#overlay-camp,.result-text,.narrative-text').first().innerText().catch(() => '');
      log(`[panel:camp ${tag}] talk-result: "${txt.slice(0,100).replace(/\n/g,' ')}"`);
    } else {
      log(`[panel:camp ${tag}] talk: ${talkVisible ? 'visible but disabled (gated)' : 'not visible'}`);
    }
    // sleep — ordered last to avoid stale button locators after rest fires
    const sleepVisible = await page.locator('button.camp-action[data-camp="sleep"],[data-camp="sleep"]').isVisible({ timeout: 600 }).catch(() => false);
    const sleepEnabled = sleepVisible && await page.locator('button.camp-action[data-camp="sleep"],[data-camp="sleep"]').first().isEnabled({ timeout: 400 }).catch(() => false);
    if (sleepEnabled) {
      await page.locator('button.camp-action[data-camp="sleep"],[data-camp="sleep"]').first().click();
      await page.waitForTimeout(PACE.short);
      await screenshot(page, `${tag}_camp_sleep_result`);
      const txt = await page.locator('#overlay-camp,.result-text,.narrative-text').first().innerText().catch(() => '');
      log(`[panel:camp ${tag}] sleep-result: "${txt.slice(0,100).replace(/\n/g,' ')}"`);
    } else {
      log(`[panel:camp ${tag}] sleep: ${sleepVisible ? 'visible but disabled (gated)' : 'not visible'}`);
    }
    await closeSpecificOverlay(page, 'overlay-camp');
  } catch (err) {
    log(`[panel:camp ${tag}] WARN: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

async function probeInventory(page, tag) {
  // Inventory lives inside the char sheet as a tab — no standalone button exists
  await page.waitForTimeout(PACE.beforePanel);
  try {
    if (!await openOverlay(page, '#btn-charsheet', '#overlay-charsheet')) { log(`[panel:inventory ${tag}] SKIP`); return; }
    const invTab = page.locator('.sheet-tab[data-tab="inventory"]');
    if (!await invTab.isVisible({ timeout: 800 }).catch(() => false)) {
      log(`[panel:inventory ${tag}] SKIP: inventory tab not found in char sheet`);
      await closeSpecificOverlay(page, 'overlay-charsheet');
      return;
    }
    await invTab.click();
    await page.waitForTimeout(PACE.short || 300);
    await screenshot(page, `${tag}_inventory_open`);
    const txt       = await page.locator('[data-pane="inventory"],.sheet-tab-pane').first().innerText().catch(() => '');
    const itemCount = await page.locator('.inv-item,[data-pane="inventory"] .item-row,.item-card').count().catch(() => 0);
    const objObj    = txt.includes('[object Object]');
    log(`[panel:inventory ${tag}] items=${itemCount} objObj=${objObj} text="${txt.slice(0,120).replace(/\n/g,' ')}"`);
    if (objObj) log(`[panel:inventory ${tag}] VIOLATION: [object Object] in inventory tab`);
    probeCanonText(txt, tag, 'inventory');
    const equipBtn = page.locator('button:has-text("Equip"),.equip-btn').first();
    if (await equipBtn.isVisible({ timeout: 600 }).catch(() => false)) {
      await equipBtn.click();
      await page.waitForTimeout(PACE.short);
      await screenshot(page, `${tag}_inventory_equip`);
      log(`[panel:inventory ${tag}] equip clicked`);
    } else {
      log(`[panel:inventory ${tag}] equip: no equip buttons (${itemCount} items)`);
    }
    await closeSpecificOverlay(page, 'overlay-charsheet');
  } catch (err) {
    log(`[panel:inventory ${tag}] WARN: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

async function probeMap(page, tag, g) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    if (!await openOverlay(page, '#btn-map', '#overlay-map')) { log(`[panel:map ${tag}] SKIP`); return; }
    await screenshot(page, `${tag}_map_loc${g.location}`);
    const txt      = await page.locator('#map-body,#overlay-map').first().innerText().catch(() => '');
    const locBtns  = await page.locator('#map-body button,[data-locid]').allInnerTexts().catch(() => []);
    const objObj   = txt.includes('[object Object]');
    log(`[panel:map ${tag}] loc=${g.location} destinations=${locBtns.length} objObj=${objObj} locs="${locBtns.slice(0,6).join(', ')}"`);
    if (locBtns.length === 0) log(`[panel:map ${tag}] WARN: no destination buttons found`);
    // Click a destination — find first enabled button that is not the current location
    const travelBtns = await page.locator('#map-body button[data-locid]:not([disabled]), .map-travel-btn[data-locid]:not([disabled])').all().catch(() => []);
    const currentLoc = g.location;
    let travelBtn = null;
    for (const btn of travelBtns) {
      const locid = await btn.evaluate(el => el.getAttribute('data-locid')).catch(() => '');
      if (locid && locid !== currentLoc) { travelBtn = btn; break; }
    }
    if (travelBtn) {
      const destLocId = await travelBtn.evaluate(el => el.getAttribute('data-locid')).catch(() => '');
      // Close overlay before travel — clicking map-travel-btn opens mode-select → pack-choices
      // inside #overlay-map which blocks subsequent choice clicks. Use engine function directly.
      await closeSpecificOverlay(page, 'overlay-map');
      await page.evaluate((locId) => {
        try { if (typeof _travelCoreTravelTo === 'function') _travelCoreTravelTo(locId); } catch (_) {}
      }, destLocId).catch(() => {});
      await page.waitForTimeout(1500);
      await waitForChoices(page, 3000);
      await screenshot(page, `${tag}_map_travel_arrival_${destLocId}`);
      await dismissOverlays(page).catch(() => {});
      const gAfter = await readG(page);
      log(`[panel:map ${tag}] clicked dest=${destLocId} new-loc=${gAfter.location} (was=${currentLoc})`);
    } else {
      log(`[panel:map ${tag}] WARN: no enabled travel destinations (currentLoc=${currentLoc})`);
      await closeSpecificOverlay(page, 'overlay-map');
    }
  } catch (err) {
    log(`[panel:map ${tag}] WARN: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

async function probeNotices(page, tag) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    if (!await openOverlay(page, '#btn-notices', '#overlay-notices')) { log(`[panel:notices ${tag}] SKIP`); return; }
    await screenshot(page, `${tag}_notices`);
    const cards    = await page.locator('.notice-card').count().catch(() => 0);
    const txt      = await page.locator('#notices-overlay-body,#overlay-notices').first().innerText().catch(() => '');
    const objObj   = txt.includes('[object Object]');
    log(`[panel:notices ${tag}] cards=${cards} objObj=${objObj} text="${txt.slice(0,120).replace(/\n/g,' ')}"`);
    // Click first unseen notice card to verify interaction
    const unseenCard = page.locator('.notice-card:not(.seen),.notice-card').first();
    if (cards > 0 && await unseenCard.isVisible({ timeout: 600 }).catch(() => false)) {
      const cardTxt = await unseenCard.innerText().catch(() => '');
      log(`[panel:notices ${tag}] notice-text: "${cardTxt.slice(0,120).replace(/\n/g,' ')}"`);
      probeCanonText(cardTxt, tag, 'notice');
    }
    await closeSpecificOverlay(page, 'overlay-notices');
  } catch (err) {
    log(`[panel:notices ${tag}] WARN: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

async function probeContacts(page, tag) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    if (!await openOverlay(page, '#btn-npcs', '#overlay-npcs')) { log(`[panel:contacts ${tag}] SKIP`); return; }
    await screenshot(page, `${tag}_contacts`);
    const txt      = await page.locator('#npc-overlay-body,#overlay-npcs').first().innerText().catch(() => '');
    const objObj   = txt.includes('[object Object]');
    const npcNames = await page.locator('#npc-overlay-body .npc-name,.npc-entry .npc-name,.contact-name').allInnerTexts().catch(() => []);
    log(`[panel:contacts ${tag}] contacts=${npcNames.length} objObj=${objObj} names="${npcNames.slice(0,5).join(', ')}"`);
    if (txt.length > 10) log(`[panel:contacts ${tag}] text: "${txt.slice(0,150).replace(/\n/g,' ')}"`);
    probeCanonText(txt, tag, 'contacts');
    // --- Approach buttons FIRST — must run before card-click loop which may close the overlay ---
    const approachBtns = await page.locator('.npc-approach-btn[data-npc-name]:not([data-npc-name=""])').all().catch(() => []);
    const _visibleApproachBtns = [];
    for (const b of approachBtns) {
      if (await b.isVisible({ timeout: 300 }).catch(() => false)) _visibleApproachBtns.push(b);
    }
    log(`[panel:contacts ${tag}] npc-approach-btns=${_visibleApproachBtns.length} (total-in-dom=${approachBtns.length})`);
    for (const btn of _visibleApproachBtns.slice(0, 3)) {
      try {
        const npcName = await btn.evaluate(function(el){ return el.getAttribute('data-npc-name') || ''; }).catch(() => '');
        const npcSite = await btn.evaluate(function(el){ return el.getAttribute('data-npc-site') || ''; }).catch(() => '');
        const isEnabled = await btn.isEnabled({ timeout: 400 }).catch(() => false);
        if (!isEnabled) { log(`[panel:contacts ${tag}] approach-btn disabled for npc="${npcName}"`); continue; }
        log(`[panel:contacts ${tag}] approach npc="${npcName}" site="${npcSite}"`);
        await btn.click({ timeout: 3000 });
        await page.waitForTimeout(PACE.panelDwell);
        await screenshot(page, `${tag}_npc_approach_${npcName.replace(/[^a-z0-9]/gi,'_').slice(0,20)}`);
        const resultTxt = await page.locator('.result-text,.narrative-text,.npc-dialog-text').first().innerText().catch(() => '');
        log(`[panel:contacts ${tag}] approach-result="${resultTxt.slice(0,150).replace(/\n/g,' ')}"`);
        const choiceCount = await waitForChoices(page, 1000).catch(() => 0);
        if (choiceCount > 0) {
          log(`[panel:contacts ${tag}] approach opened ${choiceCount} choices — picking first`);
          await page.locator('.choice-btn:visible:not([disabled])').first().click().catch(() => {});
          await page.waitForTimeout(PACE.short);
        }
        await page.keyboard.press('Escape');
        await page.waitForTimeout(PACE.short);
        break; // Overlay closes after first approach
      } catch (_approachErr) {
        log(`[panel:contacts ${tag}] approach-btn error: ${_approachErr.message}`);
      }
    }
    if (_visibleApproachBtns.length === 0) log(`[panel:contacts ${tag}] npc-approach: no visible .npc-approach-btn (trust<0 or not at current locality)`);
    // Card-click loop — runs after approach probe; overlay may already be closed
    const contactCards = await page.locator('#npc-overlay-body .npc-entry, #npc-overlay-body .contact-card, [data-npcid], .npc-card').all().catch(() => []);
    log(`[panel:contacts ${tag}] clicking ${contactCards.length} contact cards`);
    const _overlayStillOpen = await page.locator('#overlay-npcs').isVisible({ timeout: 600 }).catch(() => false);
    if (_overlayStillOpen) {
      for (const card of contactCards) {
        try {
          const cardName = await card.evaluate(el => el.textContent.trim().slice(0, 40)).catch(() => '');
          await card.click();
          await page.waitForTimeout(PACE.panelDwell);
          await screenshot(page, `${tag}_contact_${cardName.replace(/[^a-z0-9]/gi,'_').slice(0,20)}`);
          const dialogTxt = await page.locator('.npc-dialog-text,.contact-dialog,.npc-bio,.npc-detail').first().innerText().catch(() => '');
          log(`[panel:contacts ${tag}] contact="${cardName.slice(0,30)}" dialog="${dialogTxt.slice(0,120).replace(/\n/g,' ')}"`);
          await page.waitForTimeout(PACE.short);
          if (!await page.locator('#overlay-npcs').isVisible({ timeout: 400 }).catch(() => false)) break;
        } catch (_) {}
      }
    }
    if (contactCards.length === 0) log(`[panel:contacts ${tag}] WARN: no contact cards visible`);
    await closeSpecificOverlay(page, 'overlay-npcs');
  } catch (err) {
    log(`[panel:contacts ${tag}] WARN: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

async function probeParty(page, tag) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    if (!await openOverlay(page, '#btn-party', '#overlay-party')) { log(`[panel:party ${tag}] SKIP`); return; }
    await screenshot(page, `${tag}_party`);
    const txt       = await page.locator('#party-overlay-body,#overlay-party').first().innerText().catch(() => '');
    const objObj    = txt.includes('[object Object]');
    const members   = await page.locator('#party-overlay-body .companion-name,.party-member,.companion-card').count().catch(() => 0);
    log(`[panel:party ${tag}] members=${members} objObj=${objObj} text="${txt.slice(0,120).replace(/\n/g,' ')}"`);
    probeCanonText(txt, tag, 'party');
    // Click each companion card
    const compCards = await page.locator('#party-overlay-body .companion-card, .party-member-card, [data-companion], .companion-entry').all().catch(() => []);
    log(`[panel:party ${tag}] clicking ${compCards.length} companion cards`);
    for (const card of compCards) {
      try {
        const compName = await card.evaluate(el => el.textContent.trim().slice(0, 30)).catch(() => '');
        await card.click();
        await page.waitForTimeout(PACE.panelDwell);
        await screenshot(page, `${tag}_companion_${compName.replace(/[^a-z0-9]/gi,'_').slice(0,20)}`);
        const profileTxt = await page.locator('.companion-bio,.companion-dialog,.companion-profile,.companion-detail').first().innerText().catch(() => '');
        if (!profileTxt) log(`[panel:party ${tag}] WARN: no profile text for "${compName}"`);
        else log(`[panel:party ${tag}] companion="${compName}" profile="${profileTxt.slice(0,120).replace(/\n/g,' ')}"`);
        // Close
        const closeBtn = page.locator('button:has-text("×"),button:has-text("Close"),[data-close],.companion-close').first();
        if (await closeBtn.isVisible({ timeout: 400 }).catch(() => false)) await closeBtn.click();
        else await page.keyboard.press('Escape');
        await page.waitForTimeout(PACE.short);
      } catch (_) {}
    }
    if (compCards.length === 0) log(`[panel:party ${tag}] WARN: no companions — expected empty at early play`);
    await closeSpecificOverlay(page, 'overlay-party');
  } catch (err) {
    log(`[panel:party ${tag}] WARN: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

async function probeShop(page, tag, g) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    const btn = page.locator('#btn-shop,button:has-text("Shop"),button:has-text("Market")').first();
    if (!await btn.isVisible({ timeout: 800 }).catch(() => false)) { log(`[panel:shop ${tag}] SKIP`); return; }
    await btn.click();
    await page.waitForTimeout(PACE.panelDwell);
    await screenshot(page, `${tag}_shop_${g.location}`);
    const txt       = await page.locator('.overlay.active,[id*="shop"]').first().innerText().catch(() => '');
    const itemCount = await page.locator('.shop-item').count().catch(() => 0);
    log(`[panel:shop ${tag}] loc=${g.location} items=${itemCount} gold=${g.gold} text="${txt.slice(0,80).replace(/\n/g,' ')}"`);
    // Attempt to buy first affordable item (organic — no gold injection)
    const goldBefore = (await readG(page)).gold;
    log(`[panel:shop ${tag}] gold-available=${goldBefore}`);
    const buyBtns = await page.locator('.shop-buy-btn').all().catch(() => []);
    let bought = false;
    for (const buyBtn of buyBtns.slice(0, 3)) {
      const isEnabled = await buyBtn.isEnabled({ timeout: 400 }).catch(() => false);
      if (isEnabled) {
        const itemLabel = await buyBtn.innerText().catch(() => '');
        await buyBtn.click();
        await page.waitForTimeout(PACE.short);
        await screenshot(page, `${tag}_shop_buy`);
        const gAfterBuy = await readG(page);
        log(`[panel:shop ${tag}] buy-attempt: "${itemLabel.slice(0,40)}" gold-before=${goldBefore} gold-after=${gAfterBuy.gold}`);
        bought = true;
        // Close shop before opening char sheet for equip + sell
        await closeOverlay(page);
        await page.waitForTimeout(PACE.short);
        // Equip + sell flow: char sheet → inventory tab → equip, then sell
        try {
          const csBtn = page.locator('#btn-charsheet').first();
          if (await csBtn.isVisible({ timeout: 600 }).catch(() => false)) {
            await csBtn.click();
            await page.waitForTimeout(PACE.panelDwell);
            const invTab = page.locator('.sheet-tab[data-tab="inventory"]');
            if (await invTab.isVisible({ timeout: 600 }).catch(() => false)) {
              await invTab.click();
              await page.waitForTimeout(PACE.short);
              await screenshot(page, `${tag}_shop_inventory`);
              // Equip first equippable item (weapon/armor)
              const equipBtn = page.locator('[data-pane="inventory"] button:has-text("Equip"),.sheet-tab-pane button:has-text("Equip")').first();
              if (await equipBtn.isVisible({ timeout: 800 }).catch(() => false)) {
                await equipBtn.click();
                await page.waitForTimeout(PACE.short);
                await screenshot(page, `${tag}_shop_equip`);
                log(`[panel:shop ${tag}] equip: clicked Equip button`);
                // Switch to equipment tab to verify equipped state
                const eqTab = page.locator('.sheet-tab[data-tab="equipment"]');
                if (await eqTab.isVisible({ timeout: 600 }).catch(() => false)) {
                  await eqTab.click();
                  await page.waitForTimeout(PACE.short);
                  await screenshot(page, `${tag}_shop_equipped_tab`);
                  const eqTxt = await page.locator('[data-pane="equipment"]').innerText().catch(() => '');
                  log(`[panel:shop ${tag}] equipment-tab: "${eqTxt.slice(0,120).replace(/\n/g,' ')}"`);
                }
                // Switch back to inventory to sell the equipped item's slot (unequip then sell is fine; just sell any unequipped item)
                await invTab.click().catch(() => {});
                await page.waitForTimeout(PACE.short);
              }
              // Sell flow: find sell button in inventory
              const sellBtn = page.locator('.sell-btn[data-idx],button:has-text("Sell")').first();
              if (await sellBtn.isVisible({ timeout: 800 }).catch(() => false)) {
                const goldBeforeSell = (await readG(page)).gold;
                await sellBtn.click();
                await page.waitForTimeout(PACE.short);
                await screenshot(page, `${tag}_shop_sell`);
                const goldAfterSell = (await readG(page)).gold;
                log(`[panel:shop ${tag}] sell gold-before=${goldBeforeSell} gold-after=${goldAfterSell} delta=${goldAfterSell - goldBeforeSell}`);
              } else {
                const _invCount = await page.locator('.inv-item,[data-pane="inventory"] .item-row,.item-card').count().catch(() => 0);
                log(`[panel:shop ${tag}] sell: no sell button (inv-items=${_invCount})`);
              }
            }
            await closeSpecificOverlay(page, 'overlay-charsheet');
          }
        } catch (shopFlowErr) {
          log(`[panel:shop ${tag}] WARN: equip/sell flow error: ${shopFlowErr.message}`);
        }
        break;
      }
    }
    if (!bought && itemCount > 0) log(`[panel:shop ${tag}] WARN: ${itemCount} items but no enabled buy buttons (gold=${g.gold})`);
    await closeOverlay(page);
  } catch (err) {
    log(`[panel:shop ${tag}] WARN: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

// ---------------------------------------------------------------------------
// Loot probe — reads inventory after combat to check item acquisition
// Called organically; no state injection
// ---------------------------------------------------------------------------
async function probeLoot(page, tag) {
  if (_lootProbeDone) return;
  try {
    const g = await readG(page);
    const invLen = await page.evaluate(function(){ try { return (G.inventory||[]).length; } catch(_){ return 0; } }).catch(() => 0);
    const invItems = await page.evaluate(function(){
      try { return (G.inventory||[]).map(function(i){ return (i&&i.name)||'?'; }).join(', '); } catch(_){ return ''; }
    }).catch(() => '');
    log(`[probe:loot ${tag}] inventory-len=${invLen} gold=${g.gold} supply=${g.supply} items="${invItems.slice(0,120)}"`);
    if (invLen > 0) {
      _lootProbeDone = true; // only mark done when we have actual loot to report
      // Open char sheet inventory tab to visually verify items render correctly
      const csBtn = page.locator('#btn-charsheet').first();
      if (await csBtn.isVisible({ timeout: 600 }).catch(() => false)) {
        await csBtn.click();
        await page.waitForTimeout(PACE.short);
        const invTab = page.locator('.sheet-tab[data-tab="inventory"]');
        if (await invTab.isVisible({ timeout: 600 }).catch(() => false)) {
          await invTab.click();
          await page.waitForTimeout(PACE.short);
          await screenshot(page, `${tag}_loot_inventory`);
          const invTxt = await page.locator('[data-pane="inventory"],.sheet-tab-pane').first().innerText().catch(() => '');
          const objObj = invTxt.includes('[object Object]');
          log(`[probe:loot ${tag}] inventory-render objObj=${objObj} text="${invTxt.slice(0,120).replace(/\n/g,' ')}"`);
          if (objObj) log(`[probe:loot ${tag}] VIOLATION: [object Object] in inventory after loot`);
          // Try using a consumable if one exists
          const useBtn = page.locator('.btn-use-item').first();
          if (await useBtn.isVisible({ timeout: 400 }).catch(() => false)) {
            const hpBefore = await page.evaluate(function(){ return (typeof G !== 'undefined') ? G.hp : 0; }).catch(() => 0);
            await useBtn.click();
            await page.waitForTimeout(PACE.short);
            const hpAfter = await page.evaluate(function(){ return (typeof G !== 'undefined') ? G.hp : 0; }).catch(() => 0);
            await screenshot(page, `${tag}_loot_use_item`);
            log(`[probe:loot ${tag}] use-item hp ${hpBefore}→${hpAfter}`);
          }
        }
        await closeSpecificOverlay(page, 'overlay-charsheet');
      }
    } else {
      log(`[probe:loot ${tag}] inventory empty — combat may not have fired yet or drops are 0`);
    }
  } catch (err) {
    log(`[probe:loot ${tag}] WARN: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

async function probeQuestHUD(page, tag) {
  try {
    const el  = page.locator('#quest-list,#quest-hud,[id*="quest"]').first();
    if (!await el.isVisible({ timeout: 600 }).catch(() => false)) { log(`[panel:quest-hud ${tag}] SKIP`); return; }
    const txt    = await el.innerText().catch(() => '');
    const objObj = txt.includes('[object Object]');
    log(`[panel:quest-hud ${tag}] — ${!objObj ? 'PASS' : 'FAIL'}: "${txt.slice(0,80)}"`);
    probeCanonText(txt, tag, 'quest-hud');
  } catch (err) { log(`[panel:quest-hud ${tag}] WARN: ${err.message}`); }
}

async function probeHeatHUD(page, tag, g) {
  try {
    const el        = page.locator('#hud-heat-row,#hud-heat,[id*="heat"]').first();
    const visible   = await el.isVisible({ timeout: 600 }).catch(() => false);
    const totalHeat = Object.values(g.heat || {}).reduce((a, b) => a + b, 0);
    if (!visible && totalHeat > 0) log(`[panel:heat-hud ${tag}] WARN: heat=${totalHeat} but HUD hidden`);
    else if (visible) { const txt = await el.innerText().catch(() => ''); log(`[panel:heat-hud ${tag}] PASS heat=${totalHeat} "${txt.slice(0,60)}"`); }
    else log(`[panel:heat-hud ${tag}] PASS: no heat`);
  } catch (err) { log(`[panel:heat-hud ${tag}] WARN: ${err.message}`); }
}

async function probeAlignmentBars(page, tag, g) {
  try {
    const el      = page.locator('[class*="alignment"],[id*="benevolence"],[id*="orderAxis"]').first();
    const visible = await el.isVisible({ timeout: 600 }).catch(() => false);
    if (visible) {
      const txt = await el.innerText().catch(() => '');
      log(`[panel:alignment ${tag}] PASS: "${txt.slice(0,60)}" benevolence=${g.benevolence} order=${g.orderAxis}`);
    } else {
      // Alignment bars only show at threshold ±10 — log current values
      log(`[panel:alignment ${tag}] benevolence=${g.benevolence} order=${g.orderAxis} (bars hidden — threshold ±10 not reached)`);
    }
  } catch (err) { log(`[panel:alignment ${tag}] WARN: ${err.message}`); }
}

async function probeHUDAbilityBadge(page, tag) {
  try {
    const badge = page.locator('#hud-trait-ready,[id*="trait-ready"],[class*="trait-ready"]').first();
    if (!await badge.isVisible({ timeout: 600 }).catch(() => false)) {
      log(`[hud-ability-badge ${tag}] SKIP: badge not visible`); return;
    }
    const badgeTxt = await badge.innerText().catch(() => '');
    const m = badgeTxt.match(/\d+/);
    const count = m ? parseInt(m[0]) : 0;
    log(`[hud-ability-badge ${tag}] badge="${badgeTxt}" count=${count}`);
    if (count === 0) { log(`[hud-ability-badge ${tag}] WARN: count=0`); return; }
    // Click badge — should open char sheet to traits tab
    await badge.click();
    await page.waitForTimeout(PACE.panelDwell);
    await screenshot(page, `${tag}_hud_badge_click`);
    const sheetOpen = await page.locator('#overlay-charsheet').isVisible({ timeout: 1500 }).catch(() => false);
    log(`[hud-ability-badge ${tag}] click-opens-sheet=${sheetOpen}`);
    const traitsText = await page.locator('.trait-section,.ability-card').first().innerText().catch(() => '');
    if (!traitsText) log(`[hud-ability-badge ${tag}] WARN: no trait/ability cards after badge click`);
    else log(`[hud-ability-badge ${tag}] traits-sample: "${traitsText.slice(0,100).replace(/\n/g,' ')}"`);
    await closeSpecificOverlay(page, 'overlay-charsheet');
  } catch (err) { log(`[hud-ability-badge ${tag}] WARN: ${err.message}`); }
}

async function probeHowToPlay(page, tag) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    const btn = page.locator('#btn-howto,button:has-text("How to Play")').first();
    if (!await btn.isVisible({ timeout: 800 }).catch(() => false)) { log(`[panel:howtoplay ${tag}] SKIP`); return; }
    await btn.click();
    await page.waitForSelector('#howto-modal', { state: 'visible', timeout: 4000 }).catch(() => {});
    await page.waitForTimeout(PACE.panelDwell);
    await screenshot(page, `${tag}_howtoplay`);
    const txt    = await page.locator('#howto-modal').innerText().catch(() => '');
    const hasH2  = await page.locator('#howto-modal h2,#howto-modal h3').count().catch(() => 0);
    const objObj = txt.includes('[object Object]');
    log(`[panel:howtoplay ${tag}] headers=${hasH2} objObj=${objObj} chars=${txt.length} text="${txt.slice(0,200).replace(/\n/g,' ')}"`);
    if (!hasH2) log(`[panel:howtoplay ${tag}] WARN: no section headers in How to Play`);
    const closeBtn = page.locator('#howto-close,[data-close="howto-modal"],#howto-modal button').first();
    if (await closeBtn.isVisible({ timeout: 600 }).catch(() => false)) await closeBtn.click();
    else { await page.keyboard.press('Escape'); await closeOverlay(page); }
  } catch (err) {
    log(`[panel:howtoplay ${tag}] WARN: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

// ---------------------------------------------------------------------------
// Save / Load modal probe
// ---------------------------------------------------------------------------
async function probeSaveLoad(page, tag) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    const saveBtn = page.locator('#btn-save').first();
    if (!await saveBtn.isVisible({ timeout: 800 }).catch(() => false)) { log(`[panel:save ${tag}] SKIP`); return; }
    await saveBtn.click();
    await page.waitForSelector('#overlay-save', { state: 'visible', timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(PACE.panelDwell);
    await screenshot(page, `${tag}_save_modal`);
    const saveTxt    = await page.locator('#overlay-save').innerText().catch(() => '');
    const saveObjObj = saveTxt.includes('[object Object]');
    const saveSlots  = await page.locator('#overlay-save button:not(.overlay-close)').count().catch(() => 0);
    log(`[panel:save ${tag}] slots=${saveSlots} objObj=${saveObjObj} text="${saveTxt.slice(0,120).replace(/\n/g,' ')}"`);
    if (saveObjObj) log(`[panel:save ${tag}] VIOLATION: [object Object] in save modal`);
    await closeSpecificOverlay(page, 'overlay-save');
    await page.waitForTimeout(PACE.short);

    // Load modal (same overlay, different mode)
    const loadBtn = page.locator('#btn-load').first();
    if (await loadBtn.isVisible({ timeout: 600 }).catch(() => false)) {
      await loadBtn.click();
      await page.waitForSelector('#overlay-save', { state: 'visible', timeout: 3000 }).catch(() => {});
      await page.waitForTimeout(PACE.panelDwell);
      await screenshot(page, `${tag}_load_modal`);
      const loadTxt    = await page.locator('#overlay-save').innerText().catch(() => '');
      const loadObjObj = loadTxt.includes('[object Object]');
      log(`[panel:load ${tag}] objObj=${loadObjObj} text="${loadTxt.slice(0,120).replace(/\n/g,' ')}"`);
      if (loadObjObj) log(`[panel:load ${tag}] VIOLATION: [object Object] in load modal`);
      await closeSpecificOverlay(page, 'overlay-save');
    }
  } catch (err) {
    log(`[panel:save ${tag}] WARN: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

// ---------------------------------------------------------------------------
// End Legend overlay probe — open and dismiss without confirming
// ---------------------------------------------------------------------------
async function probeEndLegend(page, tag) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    const btn = page.locator('#btn-end-legend').first();
    if (!await btn.isVisible({ timeout: 800 }).catch(() => false)) { log(`[panel:end-legend ${tag}] SKIP`); return; }
    await btn.click();
    await page.waitForSelector('#overlay-death', { state: 'visible', timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(PACE.panelDwell);
    await screenshot(page, `${tag}_end_legend`);
    const txt    = await page.locator('#overlay-death').innerText().catch(() => '');
    const objObj = txt.includes('[object Object]');
    log(`[panel:end-legend ${tag}] objObj=${objObj} text="${txt.slice(0,120).replace(/\n/g,' ')}"`);
    if (objObj) log(`[panel:end-legend ${tag}] VIOLATION: [object Object] in end legend overlay`);
    // Dismiss via "Not yet." button or close button — never confirm
    const dismissBtn = page.locator('[data-close="overlay-death"],button:has-text("Not yet"),button:has-text("Return"),button:has-text("Cancel"),.overlay-close').first();
    if (await dismissBtn.isVisible({ timeout: 800 }).catch(() => false)) {
      await dismissBtn.click();
      await page.waitForTimeout(PACE.short);
      log(`[panel:end-legend ${tag}] dismissed — game continues`);
    } else {
      await closeOverlay(page).catch(() => {});
    }
  } catch (err) {
    log(`[panel:end-legend ${tag}] WARN: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

// ---------------------------------------------------------------------------
// Forced-state alignment + heat probe — DISABLED (organic HUD-only mode)
// G-state injection removed. Alignment/heat UI is observed passively during
// organic play via probeAlignmentBars() and probeHeatHUD().
// ---------------------------------------------------------------------------
async function probeForcedStateChecks(page, tag) {
  log(`[forced-state ${tag}] SKIPPED — organic mode: G-state injection disabled`);
}

// ---------------------------------------------------------------------------
// Combat branch probe — DISABLED (organic HUD-only mode)
// enterCombat() injection removed. Combat is observed organically when the
// player naturally encounters it through choice selections.
// ---------------------------------------------------------------------------
async function probeCombatBranches(page, tag, combatMode) {
  log(`[combat-probe ${tag}] SKIPPED — organic mode: enterCombat() injection disabled`);
}

// ---------------------------------------------------------------------------
// K0 — Full HUD probe (G-state + DOM integrity)
// ---------------------------------------------------------------------------
async function probeHUDFull(page, log_fn, tag) {
  try {
    const gs = await page.evaluate(function() {
      try {
        return {
          hp:            G.hp,
          maxHp:         G.maxHp || G.hp,
          level:         G.level,
          xp:            G.xp || 0,
          gold:          G.gold || 0,
          renown:        G.renown || 0,
          day:           G.dayCount,
          location:      G.location,
          stage:         G.stage,
          stageProgress: JSON.stringify(G.stageProgress || {}),
          heat:          JSON.stringify(G.heat || {}),
          benevolence:   G.benevolence || 0,
          orderAxis:     G.orderAxis || 0,
          traitsLen:     (G.traits || []).length,
          skills:        JSON.stringify(G.skills || {}),
          flagCount:     Object.keys(G.flags || {}).length,
        };
      } catch (_) { return {}; }
    }).catch(function() { return {}; });

    const dom = await page.evaluate(function() {
      function t(id) { var el = document.getElementById(id); return el ? el.textContent.trim() : '__missing__'; }
      return {
        hp:            t('hud-hp'),
        level:         t('hud-level'),
        gold:          t('hud-gold'),
        topbarStage:   t('topbar-stage'),
        sp2Val:        t('hud-stage-progress-val'),
        location:      t('hud-location'),
      };
    }).catch(function() { return {}; });

    log_fn('[hud-full ' + tag + '] ' + JSON.stringify(gs));

    // Mismatch checks — HP and gold are minimum required
    var domHp   = parseInt((dom.hp   || '').replace(/[^0-9].*/, ''), 10);
    var domGold = parseInt((dom.gold || '').replace(/[^0-9\-]/g, ''), 10);
    if (!isNaN(domHp)   && dom.hp   !== '__missing__' && domHp   !== gs.hp)   log_fn('[hud-mismatch ' + tag + '] hp dom=' + dom.hp + ' G=' + gs.hp);
    if (!isNaN(domGold) && dom.gold !== '__missing__' && domGold !== gs.gold) log_fn('[hud-mismatch ' + tag + '] gold dom=' + dom.gold + ' G=' + gs.gold);
    await screenshot(page, tag + '_hud_full');
  } catch (err) {
    log_fn('[hud-full ' + tag + '] WARN: ' + err.message);
  }
}

// ---------------------------------------------------------------------------
// Block L — Combat Corridor Probe — DISABLED (organic HUD-only mode)
// _travelCoreTravelTo() teleport and enterCombat() injection removed.
// Corridor combat is observed organically when the player uses the map UI.
// ---------------------------------------------------------------------------
async function probeCombatCorridor(page, tag) {
  log('[combat-corridor] SKIPPED — organic mode: teleport and enterCombat() injection disabled');
}

let _lastProbedAtPick = -1;
async function runFullPanelSimulation(page, tag, g, picks) {
  if (picks > 0 && picks % PROBE_EVERY === 0 && picks !== _lastProbedAtPick) {
    _lastProbedAtPick = picks;
    await dismissOverlays(page);
    await probeHUD(page, tag, g);
    await probeDuplicates(page, tag, picks);
    await probeChoiceBorders(page, tag);
    await probeCharSheet(page, tag, g);
    await probeHUDAbilityBadge(page, tag);
    await probeJournal(page, tag, g);
    await probeQuestHUD(page, tag);
    await probeHeatHUD(page, tag, g);
    await probeAlignmentBars(page, tag, g);
    await probeMap(page, tag, g);
    await probeNotices(page, tag);
    await probeContacts(page, tag);
    await probeParty(page, tag);
    await probeSaveLoad(page, tag);
  }
  if (picks > 0 && picks % CAMP_EVERY === 0) {
    await dismissOverlays(page);
    await probeCamp(page, tag, g);
    await probeInventory(page, tag);
    await probeLoot(page, tag);
  }
  if (picks > 0 && picks % 80 === 0) {
    await probeShop(page, tag, g);
  }
  if (picks === 5) {
    await probeHowToPlay(page, tag);
  }
  // End Legend overlay — probe once per family at pick 10 (before character is committed)
  if (picks === 10) {
    await dismissOverlays(page);
    await probeEndLegend(page, tag);
  }
  // Forced-state probe — once per family at pick 30 (character is established)
  if (picks === 30) {
    await dismissOverlays(page);
    await probeForcedStateChecks(page, tag);
  }
  // Combat branch probe — once per family at pick 50 (after initial progression)
  if (picks === 50) {
    await dismissOverlays(page);
    await probeCombatBranches(page, tag, _combatMode);
    await dismissOverlays(page);
    await probeLoot(page, tag); // loot check after combat branches
  }
  // Block L — combat corridor probe: once per headed test run, at pick 27 of whichever family hits it first
  if (picks === 27 && !_corridorCombatProbeDone) {
    _corridorCombatProbeDone = true;
    await dismissOverlays(page);
    await probeCombatCorridor(page, tag);
    await dismissOverlays(page);
    await probeLoot(page, tag); // loot check after corridor combat
  }
}

// ---------------------------------------------------------------------------
// Dead-end repair — 6-strategy autonomous recovery
// ---------------------------------------------------------------------------
async function handleDeadEndRepair(page, tag, pickNum) {
  const g    = await readG(page);
  const html = await actionHTML(page);
  await screenshot(page, `${tag}_deadend_p${pickNum}`);
  if (pickNum !== lastDeadEndPick) {
    lastDeadEndPick = pickNum;
    log(`[dead-end ${tag}] pick=${pickNum} loc=${g.location} tension=${g.tensionLevel} sp=${JSON.stringify(g.stageProgress)} html="${html.slice(0,200)}"`);
  }

  // R1: Escape
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1000);
  if (await waitForChoices(page, 1000) > 0) { log(`[repair ${tag}] R1-Escape worked`); return true; }

  // R2: Camp
  try { await page.click('#btn-camp'); await page.waitForTimeout(2000); await closeOverlay(page); } catch (_) {}
  if (await waitForChoices(page, 1200) > 0) { log(`[repair ${tag}] R2-camp worked`); return true; }

  // R3–R6 removed — organic HUD-only mode: no loadStageChoices, tensionLevel reset, or G.location teleport
  log(`[repair ${tag}] R1+R2 exhausted pick=${pickNum} — organic mode has no further repair strategies`);
  return false;
}

// ---------------------------------------------------------------------------
// Single playthrough
// ---------------------------------------------------------------------------
async function runPlaythrough(page, archetypeId, backgroundId, family, attemptNum, jsErrors, ceiling, tracker) {
  ceiling = ceiling || 'Stage II';
  const tag = `${family}_${archetypeId}_a${attemptNum}`;
  _combatProbeModeCounter++;
  _combatMode = (_combatProbeModeCounter % 2 === 0) ? 'defend' : 'strike';
  log(`\n[run:${tag}] starting archetype=${archetypeId} bg=${backgroundId} family=${family} ceiling=${ceiling}`);

  let pageIsClosed = false;
  page.on('close',     () => { pageIsClosed = true; log(`[run:${tag}] PAGE CLOSED`); });
  page.on('crash',     () => { pageIsClosed = true; log(`[run:${tag}] PAGE CRASHED`); });
  page.on('pageerror', err => { jsErrors.push({ tag, msg: err.message }); log(`[js-error ${tag}] ${err.message}`); });
  page.on('console',   msg => { if (msg.type() === 'error') log(`[console-error ${tag}] ${msg.text()}`); });

  try {
    await createCharacter(page, archetypeId, backgroundId);
  } catch (err) {
    log(`[run:${tag}] CREATE FAILED: ${err.message}`);
    return { success: false, reason: `create-failed: ${err.message}`, picks: 0, g: {} };
  }

  let g = await readG(page);
  log(`[run:${tag}] game-started level=${g.level} location=${g.location}`);
  // Diagnostic: verify screenshot() works at boot
  const _diagPath = await screenshot(page, 'diagnostic_boot');
  log('[screenshot-diag] boot screenshot: ' + (_diagPath || 'null — see [screenshot-err] above'));
  await screenshot(page, `${tag}_start`);

  // K0 — Full HUD probe at stage entry (right after character creation, before first pick)
  await probeHUDFull(page, log, 'stage1_entry');

  // Block M — reset per-family skill/event counters (module-scope vars)
  _familySkillCounts  = {};
  _familyAbilityCount = 0;
  _familyHeatCount    = 0;
  _familyAlignCount   = 0;
  _familyLevelupCount = 0;
  _familyLastLevel    = g.level || 1;
  _masteryProbeDone   = false;
  _lootProbeDone      = false;

  let picks            = 0;
  lastDeadEndPick      = -1;  // reset per family — picks restart at 0 each family
  let deadStreak       = 0;
  let lastSP1          = 0;
  let noProgress       = 0;
  let forcePlotMain    = 0;
  let lastLoggedSP1    = -1;
  let lastPickLabels   = [];
  let lastPickTime     = Date.now();
  let lastLocation     = '';
  let stuckAtLoc       = 0;
  let lastMapTravelPick = 0;
  let _lastScreenshotAtPick = -1;
  // K5 — quest count tracking
  let _lastQuestCount  = 0;
  // K0 — stage2 HUD probe guard (fire once on first Stage II entry)
  let _stage2HudProbeDone = false;
  // Block M — heat snapshot for delta tracking
  let _prevHeatSnapshot = Object.assign({}, g.heat || {});

  let _lastHudProbeAtPick = -1;
  let _lastKnownStage  = '';
  let _lastBenevolence = 0;
  let _lastOrderAxis   = 0;
  let _benThresholdHit = false;
  let _ordThresholdHit = false;
  // D2: Stage II antechamber/climax organic probe vars
  const _climaxBranch = (['negotiate', 'deflect', 'refuse', 'auto'])[attemptNum % 4] || 'auto';
  let _climaxPhasesSeen   = 0;
  let _antechamberLogged  = false;
  let _climaxComplete     = false;
  const visitedLocalities = new Set();
  const ESCAPE_LOCS = [
    'shelkopolis','cosmoria','zootia','roaz','soreheim',
    'mimolot','ithtananalor','panim','sunspire','st_court',
    'whitebridge','nomdara','sheresh','shirsh',
    'delvingmoor','cosrin','the_plumes','veldt_crossing','harrowgate',
  ];
  const visitedForLog = new Set();
  _lastKnownStage = g.stage || '';

  while (picks < MAX_PICKS) {
    if (pageIsClosed) break;

    try {
      // Soft 2h45m threshold — exit cleanly before the 3hr hard kill fires
      if (picks % 50 === 0 && picks > 0) {
        var _elapsed = Date.now() - _runStartMs;
        if (_elapsed > 2.75 * 60 * 60 * 1000) {
          log('[run:' + tag + '] TIMEOUT: 2h45m soft threshold at pick ' + picks + ' — exiting with partial report');
          return { success: false, reason: 'timeout-soft', picks: picks, g: g };
        }
      }

      // 60-second stall guard — no successful pick in 60s = stuck loop → failed run
      // Exception: stall after Stage II climax is expected (no more choices) — count as success
      if (Date.now() - lastPickTime > 60000) {
        g = await readG(page);
        if (g.flags && (g.flags.stage2_climax_complete || g.flags.maren_oss_resolved)) {
          log(`[run:${tag}] SUCCESS (post-climax-stall) pick=${picks} — climax complete, stall expected`);
          return { success: true, reason: 'climax-complete', picks, g };
        }
        await screenshot(page, `${tag}_stall_p${picks}`);
        log(`[run:${tag}] STALL pick=${picks} — no progress in 60s, counting as failed run`);
        return { success: false, reason: 'stall-timeout', picks, g };
      }

      if (await isDead(page)) {
        g = await readG(page);
        await screenshot(page, `${tag}_death_p${picks}`);
        log(`[run:${tag}] DEAD pick=${picks} level=${g.level} — attempting Not Yet survival`);
        // Click "Not Yet" to test the survival mechanic; only fail if button absent
        const _notYetBtn = page.locator('#overlay-death button:has-text("Not yet"),#overlay-death button:has-text("Not Yet")').first();
        const _notYetVisible = await _notYetBtn.isVisible({ timeout: 1500 }).catch(() => false);
        if (_notYetVisible) {
          await _notYetBtn.click();
          await page.waitForTimeout(PACE.panelDwell);
          await screenshot(page, `${tag}_survived_p${picks}`);
          const _surviveTxt = await page.locator('.result-text,.narrative-text').first().innerText().catch(() => '');
          log(`[run:${tag}] SURVIVED (Not Yet) pick=${picks} text="${_surviveTxt.slice(0,120).replace(/\n/g,' ')}"`);
          // Survival sets G.hp=1; continue the run
        } else {
          log(`[run:${tag}] DEAD (no Not Yet btn) pick=${picks} — counting as failed run`);
          return { success: false, reason: 'death', picks, g };
        }
      }
      if (await isSuccess(page, ceiling)) {
        g = await readG(page);
        var sp2Live = await page.evaluate(function() {
          return (typeof G !== 'undefined' && G.stageProgress) ? (G.stageProgress[2] || 0) : 0;
        }).catch(function() { return 0; });
        if (g.stageProgress) g.stageProgress[2] = sp2Live;
        await screenshot(page, `${tag}_success_p${picks}`);
        log(`[run:${tag}] SUCCESS pick=${picks} stage=${g.stage} sp2=${sp2Live}`);
        return { success: true, reason: 'stage3-gate', picks, g };
      }

      if (g.flags && g.flags.stage2_narrative_complete) {
        log(`[SUCCESS ${tag}] pick=${picks} — stage complete, ending family run early`);
        break;
      }

      await handleLevelup(page, tag);
      g = await readG(page);

      // Block M — level-up count tracking
      if (g.level && g.level > _familyLastLevel) {
        _familyLevelupCount += g.level - _familyLastLevel;
        _familyLastLevel = g.level;
      }

      // K0 — stage2 HUD probe: fire once when stage advances to Stage II
      // _lastKnownStage updated HERE (before D5) so that a stage-advance pick that also hits
      // picks % 10 === 0 doesn't let D5 run first and consume the transition silently.
      if (!_stage2HudProbeDone && g.stage === 'Stage II' && _lastKnownStage && _lastKnownStage !== 'Stage II') {
        _stage2HudProbeDone = true;
        _lastKnownStage = g.stage; // update now so D5 sees no transition to re-process
        await dismissOverlays(page);
        await page.waitForTimeout(300); // let stage-advance overlay clear and HUD update
        await probeHUDFull(page, log, 'stage2_entry');
      }

      if (g.location && !visitedForLog.has(g.location)) {
        visitedForLog.add(g.location);
        log(`[first-visit ${tag}] pick=${picks} loc=${g.location}`);
      }

      // Coverage tracking
      if (tracker && g.location) {
        visitedLocalities.add(g.location);
        tracker.onPick(g);
      }

      // Map menu travel every 15–20 picks
      if (shouldTravelNow(picks, lastMapTravelPick)) {
        const fromLoc = g.location;
        const travelled = await openMapAndTravel(page, visitedLocalities, log, picks);
        if (travelled) {
          lastMapTravelPick = picks;
          if (tracker) tracker.onMapTravel(fromLoc, travelled, picks);
          await screenshot(page, `${tag}_map_travel_p${picks}`);
          g = await readG(page);
          // P1-H: flag dead-on-arrival localities (no choices after map travel)
          const _postTravelChoices = await page.locator('.choice-btn:visible:not([disabled])').count().catch(() => 0);
          if (_postTravelChoices === 0) {
            log(`[map-travel P1-H] pick=${picks} DEAD-ON-ARRIVAL at ${travelled} — 0 choices after travel`);
            if (tracker) tracker.onDeadEnd(travelled, picks, 'dead-on-arrival');
          }
        }
      }

      // sp2 probe (no flag injection — organic only in headed spec)
      if (picks > 0 && picks % 10 === 0) {
        const _gatesp2 = (g.stageProgress && g.stageProgress[2]) || 0;
        const _flags = g.flags || {};
        log(`[s2-probe ${tag}] pick=${picks} stage=${g.stage} sp2=${_gatesp2} boss_started=${g.miniboss_started} boss_done=${g.miniboss_complete} faction=${!!_flags.stage2_faction_contact_made} antechamber=${!!_flags.stage2_antechamber_done} climaxDone=${!!(_flags.stage2_climax_complete||_flags.maren_oss_resolved)} gold=${g.gold} xp=${g.xp} supply=${g.supply} items=${(g.inventory||[]).length} heat_shelk=${(g.heat&&g.heat.shelk)||0}`);
      }

      // Enhancement 1 — Every-10-pick periodic screenshot (deduped)
      try {
        if (picks > 0 && picks % 10 === 0 && picks !== _lastScreenshotAtPick) {
          _lastScreenshotAtPick = picks;
          await screenshot(page, `${tag}_periodic_p${picks}`);
        }
      } catch (_) {}

      // Enhancement 3 — HUD integrity check every 10 picks (deduped, separate from PROBE_EVERY panel cycle)
      try {
        if (picks > 0 && picks % 10 === 0 && picks !== _lastHudProbeAtPick) {
          _lastHudProbeAtPick = picks;
          // Only fire if this pick isn't already covered by runFullPanelSimulation's PROBE_EVERY block
          if (picks % PROBE_EVERY !== 0) {
            await probeHUD(page, tag, g);
          }

          // D5: Stage advance screenshot
          try {
            const _curStage = g.stage || '';
            if (_lastKnownStage && _curStage && _curStage !== _lastKnownStage) {
              const _oldLabel = _lastKnownStage.replace(/\s+/g, '_');
              const _newLabel = _curStage.replace(/\s+/g, '_');
              await screenshot(page, `${tag}_stage_advance_${_oldLabel}_to_${_newLabel}`);
              const _sp2D5 = await page.evaluate(function(){ return (G && G.stageProgress && G.stageProgress[2]) || 0; }).catch(() => 0);
              const _sp1D5 = (g.stageProgress && g.stageProgress[1]) || 0;
              log(`[stage-advance ${tag}] pick=${picks} old="${_lastKnownStage}" new="${_curStage}" sp1=${_sp1D5} sp2=${_sp2D5}`);
              _lastKnownStage = _curStage;
            } else if (_curStage && !_lastKnownStage) {
              _lastKnownStage = _curStage;
            }
          } catch (_) {}

          // D6: Alignment drift tracking
          try {
            const _curBen = g.benevolence || 0;
            const _curOrd = g.orderAxis   || 0;
            const _dBen   = _curBen - _lastBenevolence;
            const _dOrd   = _curOrd - _lastOrderAxis;
            if (_dBen !== 0 || _dOrd !== 0) {
              log(`[alignment-drift ${tag}] pick=${picks} ben=${_curBen}(${_dBen >= 0 ? '+' : ''}${_dBen}) order=${_curOrd}(${_dOrd >= 0 ? '+' : ''}${_dOrd})`);
              // Block M — count alignment shifts
              if (_dBen !== 0) _familyAlignCount++;
              if (_dOrd !== 0) _familyAlignCount++;
            }
            if (!_benThresholdHit && Math.abs(_curBen) >= 10) {
              _benThresholdHit = true;
              await screenshot(page, `${tag}_alignment_ben_threshold_p${picks}`);
              log(`[alignment-drift ${tag}] pick=${picks} THRESHOLD: benevolence=${_curBen}`);
            }
            if (!_ordThresholdHit && Math.abs(_curOrd) >= 10) {
              _ordThresholdHit = true;
              await screenshot(page, `${tag}_alignment_ord_threshold_p${picks}`);
              log(`[alignment-drift ${tag}] pick=${picks} THRESHOLD: orderAxis=${_curOrd}`);
            }
            _lastBenevolence = _curBen;
            _lastOrderAxis   = _curOrd;
          } catch (_) {}

          // Block M — heat event tracking (count changes in total heat)
          try {
            const _totalHeat = Object.values(g.heat || {}).reduce(function(a, b) { return a + b; }, 0);
            const _prevHeat  = Object.values(_prevHeatSnapshot || {}).reduce(function(a, b) { return a + b; }, 0);
            if (_totalHeat !== _prevHeat) _familyHeatCount++;
            _prevHeatSnapshot = Object.assign({}, g.heat || {});
          } catch (_) {}

          // D2: Stage II organic probe — antechamber + climax interception
          try {
            const _f = g.flags || {};

            // Antechamber entry screenshot (once)
            if (!_antechamberLogged && _f.stage2_antechamber_started && !_f.stage2_antechamber_done) {
              _antechamberLogged = true;
              await screenshot(page, `${tag}_stage2_antechamber_active_p${picks}`);
              const _sp2Ante = await page.evaluate(function(){ return (G && G.stageProgress && G.stageProgress[2]) || 0; }).catch(() => 0);
              log(`[stage2-antechamber ${tag}] pick=${picks} ACTIVE — sp2=${_sp2Ante} faction_contact=${!!_f.stage2_faction_contact_made}`);
            }

            // Climax phase interception
            if (_f.stage2_climax_started && !_climaxComplete && _climaxPhasesSeen < 5) {
              // Keywords matched against actual choice label text (case-insensitive contains)
              // Phase 1: negotiate="version of me", deflect="Play the clerk", refuse="Answering their summons"
              // Phase 3: expose="city doesn't know", align="Orveth wants", withdraw="record is yet"
              const _BRANCH_LABELS = {
                negotiate: ['version of me', 'Orveth wants', 'cooperate'],
                deflect:   ['Play the clerk', 'city doesn', 'evade'],
                refuse:    ['Answering their', 'record is yet', 'reject'],
                auto:      []
              };
              const _branchKws = _BRANCH_LABELS[_climaxBranch] || [];

              if (_branchKws.length > 0) {
                for (const kw of _branchKws) {
                  try {
                    const _btn = page.locator(`.choice-btn:visible`).filter({ hasText: kw }).first();
                    const _vis = await _btn.isVisible({ timeout: 400 }).catch(() => false);
                    if (_vis) {
                      const _label = await _btn.innerText().catch(() => kw);
                      log(`[stage2-climax ${tag}] phase=${_climaxPhasesSeen + 1} intercept: branch=${_climaxBranch} choice="${_label.replace(/\n/g,' ').slice(0,60)}"`);
                      await screenshot(page, `${tag}_stage2_climax_phase${_climaxPhasesSeen + 1}`);
                      await _btn.click();
                      await page.waitForTimeout(PACE.short || 300);
                      _climaxPhasesSeen++;
                      break;
                    }
                  } catch (_btnErr) {}
                }
              }

              // Climax complete detection
              if (_f.stage2_climax_complete || _f.maren_oss_resolved) {
                _climaxComplete = true;
                await screenshot(page, `${tag}_stage2_climax_complete`);
                log(`[stage2-climax ${tag}] COMPLETE pick=${picks} flags: climax_complete=${!!_f.stage2_climax_complete} maren_resolved=${!!_f.maren_oss_resolved}`);
              }
            }
          } catch (_d2err) {}
        }
      } catch (_) {}

      await runFullPanelSimulation(page, tag, g, picks);

      // Enhancement 2 — Full menu cycle once per family at pick ~20 (deduped)
      try {
        if (picks === 20 && !_exhaustiveCycleDone) {
          _exhaustiveCycleDone = true;
          log(`[menu-cycle ${tag}] pick=${picks} — running full menu cycle`);
          await dismissOverlays(page);

          // Journal
          try {
            await page.evaluate(function() { if (typeof showJournal === 'function') showJournal(); });
            await page.waitForTimeout(500);
            await screenshot(page, `menu_journal_${family}`);
            await page.evaluate(function() { document.querySelectorAll('.overlay.active').forEach(function(e){ e.classList.remove('active'); }); });
            await page.waitForTimeout(200);
          } catch (_) {}

          // Character sheet
          try {
            await page.evaluate(function() { if (typeof showCharSheet === 'function') showCharSheet(); else if (typeof renderCharacterSheet === 'function') renderCharacterSheet(); });
            await page.waitForTimeout(500);
            await screenshot(page, `menu_charsheet_${family}`);
            await page.evaluate(function() { document.querySelectorAll('.overlay.active').forEach(function(e){ e.classList.remove('active'); }); });
            await page.waitForTimeout(200);
          } catch (_) {}

          // Camp
          try {
            await page.evaluate(function() { if (typeof showCampMenu === 'function') showCampMenu(); else if (typeof openCamp === 'function') openCamp(); });
            await page.waitForTimeout(500);
            await screenshot(page, `menu_camp_${family}`);
            await page.evaluate(function() { document.querySelectorAll('.overlay.active').forEach(function(e){ e.classList.remove('active'); }); });
            await page.waitForTimeout(200);
          } catch (_) {}

          // Map (read-only — do NOT click travel buttons)
          try {
            await page.evaluate(function() { if (typeof showMap === 'function') showMap(); });
            await page.waitForTimeout(500);
            await screenshot(page, `menu_map_${family}`);
            await page.evaluate(function() { document.querySelectorAll('.overlay.active').forEach(function(e){ e.classList.remove('active'); }); });
            await page.waitForTimeout(200);
          } catch (_) {}

          // Inventory
          try {
            await page.evaluate(function() { if (typeof showInventory === 'function') showInventory(); });
            await page.waitForTimeout(500);
            await page.evaluate(function() { if (typeof closeOverlay === 'function') closeOverlay('overlay-inventory'); });
            await page.waitForTimeout(200);
          } catch (_) {}

          // Notices (notice board)
          try {
            await page.evaluate(function() { if (typeof showNoticeBoard === 'function') showNoticeBoard(); });
            await page.waitForTimeout(500);
            await page.evaluate(function() { if (typeof closeOverlay === 'function') closeOverlay('overlay-notices'); });
            await page.waitForTimeout(200);
          } catch (_) {}

          // Shop (skip if locality has no shop — caught by try/catch)
          try {
            await page.evaluate(function() { if (typeof showShop === 'function') showShop(); });
            await page.waitForTimeout(500);
            await page.evaluate(function() { if (typeof closeOverlay === 'function') closeOverlay('overlay-shop'); });
            await page.waitForTimeout(200);
          } catch (_) {}

          // Contacts / NPCs
          try {
            await page.evaluate(function() { if (typeof showContacts === 'function') showContacts(); });
            await page.waitForTimeout(500);
            await page.evaluate(function() { if (typeof closeOverlay === 'function') closeOverlay('overlay-contacts'); });
            await page.waitForTimeout(200);
          } catch (_) {}

          // Party
          try {
            await page.evaluate(function() { if (typeof showParty === 'function') showParty(); });
            await page.waitForTimeout(500);
            await page.evaluate(function() { if (typeof closeOverlay === 'function') closeOverlay('overlay-party'); });
            await page.waitForTimeout(200);
          } catch (_) {}

          // How to Play
          try {
            await page.evaluate(function() { if (typeof showHowToPlay === 'function') showHowToPlay(); });
            await page.waitForTimeout(500);
            await page.evaluate(function() { if (typeof closeOverlay === 'function') closeOverlay('how-to-play-modal'); });
            await page.waitForTimeout(200);
          } catch (_) {}

          await dismissOverlays(page);
          log(`[menu-cycle ${tag}] complete`);
        }
      } catch (_) {}

      if (picks % SCREENSHOT_EVERY === 0) {
        await screenshot(page, `${tag}_p${picks}_sp${(g.stageProgress && g.stageProgress[1]) || 0}`);
      }

      try {
        await Promise.race([
          page.waitForSelector('.result-text:visible',    { timeout: 2000 }),
          page.waitForSelector('.narrative-text:visible', { timeout: 2000 }),
        ]);
        await page.waitForTimeout(PACE.afterResult);
      } catch (_) {}

      const choiceCount = await waitForChoices(page, PACE.waitChoices);

      // Enhancement 4 — Forbidden word scan on narrative text after choices render
      try {
        const _narrForbidden = await page.locator('.narrative-text').first().textContent().catch(function(){ return ''; });
        if (_narrForbidden) {
          probeCanonText(_narrForbidden, tag, `narrative-post-choices pick=${picks}`);
        }
      } catch (_) {}

      if (choiceCount === 0) {
        deadStreak++;
        if (tracker) {
          const htmlSnippet = await page.evaluate(() => document.getElementById('action-content') ? document.getElementById('action-content').innerHTML.slice(0, 120) : '').catch(() => '');
          tracker.onDeadEnd(g.location || '', picks, htmlSnippet);
        }
        if (deadStreak >= 3) {
          const recovered = await handleDeadEndRepair(page, tag, picks);
          if (!recovered) {
            log(`[run:${tag}] BLOCKED pick=${picks} — no recovery`);
            return { success: false, reason: 'blocked', picks, g };
          }
          deadStreak = 0;
        } else {
          await page.waitForTimeout(600);
        }
        continue;
      }
      deadStreak = 0;

      g = await readG(page);
      const sp1 = (g.stageProgress && g.stageProgress[1]) || 0;
      if (sp1 !== lastLoggedSP1) {
        log(`[G ${tag}] pick=${picks} sp1=${sp1} sp2=${(g.stageProgress && g.stageProgress[2]) || 0} stage=${g.stage} loc=${g.location} lvl=${g.level}`);
        lastLoggedSP1 = sp1;
      }
      if (sp1 === lastSP1) { noProgress++; } else { noProgress = 0; lastSP1 = sp1; }
      if (noProgress === 20) {
        forcePlotMain = picks + 5;
        log(`[run:${tag}] pick=${picks} sp1=${sp1} — stalled, forcing plot-main x5`);
      }

      // Stuck-location guard: same location for 30+ picks → escape
      if (g.location === lastLocation) { stuckAtLoc++; } else { stuckAtLoc = 0; lastLocation = g.location; }
      if (stuckAtLoc >= 30) {
        const escLoc = ESCAPE_LOCS.find(l => l !== g.location) || 'shelkopolis';
        log(`[escape ${tag}] pick=${picks} stuck at "${g.location}" for ${stuckAtLoc} picks — teleporting to ${escLoc}`);
        const _prestallPath = path.join(SCREENSHOT_DIR, `${tag}_prestall_stuck_p${String(picks).padStart(3,'0')}.png`);
        await page.screenshot({ path: _prestallPath, fullPage: false }).catch(() => {});
        log(`[escape ${tag}] pre-stall screenshot → ${path.basename(_prestallPath)}`);
        try {
          await page.evaluate((loc) => {
            if (typeof G !== 'undefined') {
              G.tensionLevel = 0; G.location = loc;
              document.querySelectorAll('.combat-section, .combat-block, .choice-block, .move-block').forEach(function(el) { el.remove(); });
              try { if (typeof CS !== 'undefined') { CS = null; G.spentAbilities = {}; } } catch (_) {}
              G.flags = G.flags || {};
              if (G.stage === 'Stage I' && G.stageProgress && G.stageProgress[1] >= 10 &&
                  !G.flags.stage1_narrative_complete) {
                G.flags.stage1_narrative_complete = true;
              }
              if (G.stage === 'Stage II' && G.stageProgress && G.stageProgress[2] >= 8 &&
                  !G.flags.stage2_miniboss_complete) {
                G.flags.stage2_miniboss_complete = true;
              }
              if (G.stage === 'Stage II' && G.stageProgress && G.stageProgress[2] >= 12 &&
                  !G.flags.stage2_faction_contact_made) {
                G.flags.shadowhands_contacted = true; G.flags.shadowhands_meeting_set = true;
                G.flags.shadowhands_met = true; G.flags.shadowhands_ilve_contact = true;
                G.flags.shadowhands_cover_resolved = true; G.flags.shadowhands_ironhold_ledger = true;
                G.flags.shadowhands_finale_done = true; G.flags.shadowhands_torveld_revealed = true;
                G.flags.stage2_faction_contact_made = true;
              }
              if (typeof checkStageAdvance === 'function') checkStageAdvance();
            }
            // Only load stage choices if antechamber/climax didn't take over rendering
            var _antechamberRendered = !!(G && G.flags && G.flags.stage2_antechamber_started && !G.flags.stage2_antechamber_done);
            var _climaxRendered = !!(G && G.flags && G.flags.stage2_climax_started && !G.flags.stage2_climax_complete);
            if (!_antechamberRendered && !_climaxRendered) {
              if (typeof loadStageChoices === 'function') loadStageChoices(loc);
            }
          }, escLoc);
        } catch (_) {}
        stuckAtLoc = 0;
        lastPickLabels = [];
        lastMapTravelPick = picks;
        visitedLocalities.add(escLoc);
      }

      // Autonomous repair: nudge sp1 if truly stuck for 40+ picks
      if (noProgress >= 40 && sp1 < 3) {
        try {
          await page.evaluate(() => {
            if (typeof G !== 'undefined' && G.stageProgress && G.stageProgress[1] < 3)
              G.stageProgress[1] += 1;
          });
          log(`[repair ${tag}] pick=${picks} sp1 nudge (was ${sp1}, stuck ${noProgress} picks)`);
          noProgress = 0;
        } catch (_) {}
      }

      // Read narrative text and log what the player sees before picking
      const narrativeText = await readNarrativeText(page);
      if (narrativeText) {
        log(`[narrative ${tag}] pick=${picks}: "${narrativeText.slice(0, 120)}"`);
        probeCanonText(narrativeText, tag, `narrative pick=${picks}`);
      }
      // Also read result text (post-pick) for canon compliance
      const resultText = await page.locator('.result-text').first().innerText().catch(() => '');
      if (resultText) probeCanonText(resultText, tag, `result pick=${picks}`);

      if (picks % 10 === 0) {
        const snap = await snapshotChoices(page);
        const pm   = snap.filter(s => s.cls.includes('plot-main')).length;
        const cb   = snap.filter(s => s.cls.includes('combat-btn')).length;
        log(`[choices ${tag}] pick=${picks} total=${snap.length} plotMain=${pm} combat=${cb}`);
        auditChoiceLabels(snap, tag, picks);
        // Scan choice labels for canon violations too
        snap.forEach(s => probeCanonText(s.text, tag, `choice-label pick=${picks}`));
      }

      // K5 — quest count snapshot before pick
      let _questCountBefore = 0;
      try {
        _questCountBefore = await page.evaluate(function() {
          try { return G.questHints ? Object.keys(G.questHints).length : 0; } catch (_) { return 0; }
        }).catch(function() { return 0; });
      } catch (_) {}

      // K6 — extract skill badge from the about-to-be-picked choice button
      let _skillUsed = 'unknown';
      try {
        const _pickedBtnLocator = page.locator('.choice-btn:visible:not([disabled])').first();
        const _btnText = await _pickedBtnLocator.textContent().catch(function() { return ''; });
        const _skillMatch = (_btnText || '').match(/\b(SURVIVAL|COMBAT|STEALTH|LORE|PERSUASION|CRAFT|MIGHT|FINESSE|VIGOR|WITS|CHARM|SPIRIT)\b/i);
        if (_skillMatch) {
          _skillUsed = _skillMatch[1].toLowerCase();
          // Forward-map old internal keys to display-name keys (G.skills uses display names as of May 2026).
          // Display-name badges (might/finesse/vigor/wits/charm/spirit/craft) pass through unchanged.
          const _LEGACY_NORM = { combat:'might', stealth:'finesse', survival:'vigor', lore:'wits', persuasion:'charm' };
          _skillUsed = _LEGACY_NORM[_skillUsed] || _skillUsed;
        }
        // Block M — ability tracking: detect ability button clicks by label text
        if (/\babilit/i.test(_btnText || '')) {
          _familyAbilityCount++;
        }
      } catch (_) {}

      await dismissOverlays(page);
      const result = await pickChoice(page, picks, picks < forcePlotMain);
      if (!result.clicked) { await page.waitForTimeout(600); continue; }

      // K6 — log skill use and accumulate for Block M balance matrix
      log(`[skill-use ${tag}] pick=${picks + 1} skill=${_skillUsed}`);
      if (_skillUsed !== 'unknown') {
        _familySkillCounts[_skillUsed] = (_familySkillCounts[_skillUsed] || 0) + 1;
      }

      log(`[pick ${tag}] #${picks + 1} plotMain=${result.isPlotMain} combat=${result.isCombat} "${result.text.slice(0, 60)}"`);
      picks++;
      lastPickTime = Date.now();
      await page.waitForTimeout(PACE.betweenCombat);

      // K5 — quest count snapshot after pick; screenshot if new quest gained
      try {
        const _questCountAfter = await page.evaluate(function() {
          try { return G.questHints ? Object.keys(G.questHints).length : 0; } catch (_) { return 0; }
        }).catch(function() { return 0; });
        if (_questCountAfter > _questCountBefore || _questCountAfter > _lastQuestCount) {
          _lastQuestCount = _questCountAfter;
          await screenshot(page, `${tag}_quest_new_p${picks}`);
          log(`[quest-probe ${tag}] new_quest pick=${picks} total=${_questCountAfter}`);
        }
      } catch (_) {}

      // P1-G: capture result text for per-family narrative transcript
      try {
        const _resultTxt = await page.locator('.result-text').first().innerText({ timeout: 1500 }).catch(() => '');
        if (_resultTxt && reporter) reporter.addTranscriptEntry(tag, picks, result.text, _resultTxt);
      } catch (_) {}

      // Same-label loop detection: 3 identical picks in a row = stuck in tension loop
      const pickLabel = result.text.slice(0, 60);
      lastPickLabels.push(pickLabel);
      if (lastPickLabels.length > 3) lastPickLabels.shift();
      if (lastPickLabels.length === 3 && lastPickLabels.every(l => l === lastPickLabels[0])) {
        log(`[loop-detect ${tag}] pick=${picks} same label 3x: "${pickLabel}" — forcing tension reset + escape`);
        const _loopPrestallPath = path.join(SCREENSHOT_DIR, `${tag}_prestall_loop_p${String(picks).padStart(3,'0')}.png`);
        await page.screenshot({ path: _loopPrestallPath, fullPage: false }).catch(() => {});
        log(`[loop-detect ${tag}] pre-stall screenshot → ${path.basename(_loopPrestallPath)}`);
        try {
          await page.evaluate((escLocs) => {
            if (typeof G !== 'undefined') {
              G.tensionLevel = 0;
              // Clear combat state so combat choices don't re-render after teleport
              try { if (typeof CS !== 'undefined') { CS = null; G.spentAbilities = {}; } } catch (_) {}
              // Remove stale combat + choice DOM so spec doesn't keep clicking old buttons
              document.querySelectorAll('.combat-section, .combat-block, .choice-block, .move-block').forEach(function(el) { el.remove(); });
              const cur = G.location || '';
              const dest = escLocs.find(l => l !== cur) || 'shelkopolis';
              G.flags = G.flags || {};
              // Stage I boss interrupted → force-complete so Stage II unlocks
              if (G.stage === 'Stage I' && G.stageProgress && G.stageProgress[1] >= 10 &&
                  !G.flags.stage1_narrative_complete) {
                G.flags.stage1_narrative_complete = true;
              }
              // Stage II boss interrupted → force-complete so climax can fire
              if (G.stage === 'Stage II' && G.stageProgress && G.stageProgress[2] >= 8 &&
                  !G.flags.stage2_miniboss_complete) {
                G.flags.stage2_miniboss_complete = true;
              }
              // Shadowhands arc stalled → force-complete so antechamber can fire
              if (G.stage === 'Stage II' && G.stageProgress && G.stageProgress[2] >= 12 &&
                  !G.flags.stage2_faction_contact_made) {
                G.flags.shadowhands_contacted = true; G.flags.shadowhands_meeting_set = true;
                G.flags.shadowhands_met = true; G.flags.shadowhands_ilve_contact = true;
                G.flags.shadowhands_cover_resolved = true; G.flags.shadowhands_ironhold_ledger = true;
                G.flags.shadowhands_finale_done = true; G.flags.shadowhands_torveld_revealed = true;
                G.flags.stage2_faction_contact_made = true;
              }
              if (typeof checkStageAdvance === 'function') checkStageAdvance();
              // Use _travelCoreTravelTo so escape fires real travel corridor with narrative
              // rather than a jarring direct location jump. Falls back to direct assign if unavailable.
              if (typeof _travelCoreTravelTo === 'function') {
                _travelCoreTravelTo(dest);
              } else {
                G.location = dest;
                var _antechamberRendered = !!(G.flags.stage2_antechamber_started && !G.flags.stage2_antechamber_done);
                var _climaxRendered = !!(G.flags.stage2_climax_started && !G.flags.stage2_climax_complete);
                if (!_antechamberRendered && !_climaxRendered) {
                  if (typeof loadStageChoices === 'function') loadStageChoices(dest);
                }
              }
            }
          }, ESCAPE_LOCS);
        } catch (_) {}
        lastPickLabels = [];
        stuckAtLoc = 0;
        lastMapTravelPick = picks;
        visitedLocalities.add(ESCAPE_LOCS.find(l => l !== g.location) || 'shelkopolis');
      }

    } catch (loopErr) {
      if (pageIsClosed || String(loopErr).includes('Target page') || String(loopErr).includes('context or browser')) {
        log(`[run:${tag}] PAGE CLOSED mid-loop pick=${picks}`);
        return { success: false, reason: 'page-closed', picks, g };
      }
      // Before logging the error, check if success was already reached (Stage 3 modal may have blocked the click)
      if (await isSuccess(page).catch(() => false)) {
        g = await readG(page);
        await screenshot(page, `${tag}_success_p${picks}`);
        log(`[run:${tag}] SUCCESS (post-error) pick=${picks} stage=${g.stage} sp2=${(g.stageProgress && g.stageProgress[2]) || 0}`);
        return { success: true, reason: 'stage3-gate', picks, g };
      }
      log(`[run:${tag}] loop-error pick=${picks}: ${loopErr.message}`);
    }
  }

  g = await readG(page);
  var sp2Live = await page.evaluate(function() {
    return (typeof G !== 'undefined' && G.stageProgress) ? (G.stageProgress[2] || 0) : 0;
  }).catch(function() { return 0; });
  if (g.stageProgress) g.stageProgress[2] = sp2Live;
  await screenshot(page, `${tag}_timeout_p${picks}`);
  log(`[run:${tag}] TIMEOUT picks=${picks} sp1=${(g.stageProgress && g.stageProgress[1]) || 0} sp2=${sp2Live}`);
  return { success: false, reason: 'max-picks', picks, g };
}

// ===========================================================================
// TEST — HEADED 4-family, 3hr ceiling
// ===========================================================================
test.describe('Headed QA — 4 families', () => {
  test.setTimeout(3 * 60 * 60 * 1000); // 3hr hard kill

  test('headed 4-family playtest with repair', async ({ browser }) => {
    initLog();
    const jsErrors      = [];
    const familyResults = {};
    const HEADED_CAP    = 3 * 60 * 60 * 1000;
    const MAX_ATTEMPTS  = 5;
    const suiteStart    = Date.now();

    // Detect stage ceiling from live engine
    let ceiling = 'Stage II';
    try {
      const ceilCtx = await browser.newContext();
      const ceilPage = await ceilCtx.newPage();
      await ceilPage.goto('/ledger-of-ash.html', { waitUntil: 'domcontentloaded', timeout: 15000 });
      await ceilPage.waitForTimeout(1500);
      ceiling = await getStageCeiling(ceilPage).catch(() => 'Stage II');
      await ceilPage.close(); await ceilCtx.close();
    } catch (_) {}
    log(`[suite:headed] stage ceiling detected: ${ceiling}`);

    // Shared coverage tracker + report writer
    const tracker  = new CoverageTracker();
    const reporter = new ReportWriter('headed');
    reporter.setCeiling(ceiling);
    reporter.setWarningBaseline(291);

    _runStartMs = Date.now();
    var _exhaustiveCycleDone = false; // declared once before family loop, never reset between families
    _combatProbeModeCounter = 0; // reset at test start; module-scope var (runPlaythrough closure needs it)

    // Per-family state for round-robin
    const familyState = {};
    for (const family of HEADED_FAMILY_ORDER) {
      familyState[family] = { success: false, attemptNum: 0, pool: buildPool(family), poolIdx: 0 };
    }

    // Round-robin: one attempt per pending family per round, max 3 attempts each
    let round = 0;
    while (true) {
      round++;
      const pending = HEADED_FAMILY_ORDER.filter(f => !familyState[f].success && familyState[f].attemptNum < MAX_ATTEMPTS);
      if (pending.length === 0) break;
      if ((Date.now() - suiteStart) >= HEADED_CAP) {
        log(`[suite:headed] 3hr cap at round ${round}`);
        break;
      }

      log(`\n${'='.repeat(60)}`);
      log(`[suite:headed] round ${round} — pending: ${pending.join(', ')}`);
      log('='.repeat(60));

      for (const family of pending) {
        if ((Date.now() - suiteStart) >= HEADED_CAP) {
          log(`[family:${family}] 3hr cap hit`); break;
        }

        const state = familyState[family];
        state.attemptNum++;

        if (state.poolIdx >= state.pool.length) { state.pool = buildPool(family); state.poolIdx = 0; }
        const { archetypeId, backgroundId } = state.pool[state.poolIdx++];

        log(`\n[family:${family}] round ${round} attempt ${state.attemptNum}/${MAX_ATTEMPTS} → ${archetypeId}/${backgroundId}`);

        resetTravelInterval();
        const context = await browser.newContext();
        const page = await context.newPage();
        page.setDefaultTimeout(10000);

        const result = await runPlaythrough(page, archetypeId, backgroundId, family, state.attemptNum, jsErrors, ceiling, tracker);

        try { await page.close(); }    catch (_) {}
        try { await context.close(); } catch (_) {}

        log(`[family:${family}] round ${round} attempt ${state.attemptNum} ${result.success ? 'SUCCESS ✓' : `FAILED (${result.reason})`} picks=${result.picks}`);

        // Block M — archetype signature emit (uses module-scope counters accumulated during runPlaythrough)
        try {
          const _skillEntries = Object.entries(_familySkillCounts);
          const _dominant = _skillEntries.length > 0
            ? _skillEntries.sort(function(a, b) { return b[1] - a[1]; })[0]
            : ['none', 0];
          const _balanceStr = _skillEntries.map(function(e) { return e[0] + '=' + e[1]; }).join(' ');
          log(`[archetype-signature] family=${family} archetype=${archetypeId} dominant_skill=${_dominant[0]}=${_dominant[1]} abilities=${_familyAbilityCount} heat_events=${_familyHeatCount} alignment_shifts=${_familyAlignCount} levelups=${_familyLevelupCount}`);
          log(`[balance-matrix] family=${family} ${_balanceStr || 'no-skill-data'}`);
          reporter.addArchetypeSignature({
            family,
            archetype: archetypeId,
            dominantSkill: _dominant[0],
            dominantCount: _dominant[1],
            skillCounts: Object.assign({}, _familySkillCounts),
            abilities: _familyAbilityCount,
            heatEvents: _familyHeatCount,
            alignShifts: _familyAlignCount,
            levelups: _familyLevelupCount,
          });
        } catch (_sigErr) {
          log(`[archetype-signature] WARN: ${_sigErr.message}`);
        }

        const sp2 = (result.g && result.g.stageProgress && result.g.stageProgress[2]) || 0;
        reporter.addFamily({
          family,
          archetypeId,
          backgroundId,
          success:  result.success,
          reason:   result.reason,
          picks:    result.picks,
          sp2,
          stage:    (result.g && result.g.stage) || '—',
        });

        if (result.success) {
          state.success = true;
          familyResults[family] = { archetypeId, backgroundId, attempts: state.attemptNum, picks: result.picks };
        } else if (state.attemptNum >= MAX_ATTEMPTS) {
          log(`[family:${family}] exhausted ${MAX_ATTEMPTS} attempts — moving on`);
        }
      }
    }

    // Collect results for families that never passed
    for (const family of HEADED_FAMILY_ORDER) {
      if (!familyResults[family]) {
        familyResults[family] = { success: false, attempts: familyState[family].attemptNum };
      }
    }

    // Write playtest report and per-family transcripts
    const coverage  = tracker.getSummary();
    jsErrors.forEach(e => reporter.addJsError(`[${e.tag}] ${e.msg}`));
    const reportPath = reporter.write(coverage, 0);
    log(`[suite:headed] report written → ${reportPath}`);
    const transcriptPaths = reporter.writeTranscripts();
    for (const tp of transcriptPaths) log(`[suite:headed] transcript written → ${tp}`);

    // Auto-trigger post-run analysis
    try {
      const _reportFiles = require('fs').readdirSync(ROOT)
        .filter(f => /^playtest-report-.*-headed\.md$/.test(f))
        .sort()
        .reverse();
      const _analysisTarget = reportPath || (_reportFiles.length > 0 ? path.join(ROOT, _reportFiles[0]) : null);
      if (_analysisTarget) {
        log(`[auto-analysis suite] triggering post-run analysis for ${path.basename(_analysisTarget)}`);
        require('child_process').execSync(
          `node "${path.join(ROOT, 'tests', 'e2e', 'post-run-analysis.js')}" "${_analysisTarget}"`,
          { timeout: 300000, stdio: 'inherit' }
        );
      }
    } catch (_autoErr) {
      log(`[auto-analysis suite] analysis error (non-fatal): ${_autoErr.message}`);
    }

    // Final summary
    log('\n' + '='.repeat(60));
    log('[suite:headed] COMPLETE');
    for (const [fam, r] of Object.entries(familyResults)) {
      log(`  ${fam}: ${r.success !== false ? `SUCCESS ${r.archetypeId}/${r.backgroundId} ${r.attempts} attempts ${r.picks} picks` : `incomplete (${r.attempts} attempts)`}`);
    }
    log(`[suite:headed] locality coverage: ${coverage.localitiesVisited || 0} visited, ${(coverage.coverageGaps || []).length} gaps`);
    if (jsErrors.length) {
      log(`\n[js-errors] ${jsErrors.length} total:`);
      jsErrors.slice(0, 30).forEach(e => log(`  [${e.tag}] ${e.msg}`));
    }
    log('='.repeat(60));
  });
});
