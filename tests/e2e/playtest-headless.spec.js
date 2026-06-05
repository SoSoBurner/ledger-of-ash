// DEVELOPMENT TOOL — not game code, not shipped. See tests/e2e/README.md
// @ts-check
/**
 * playtest-headless.spec.js
 * Two-mode QA harness for Ledger of Ash
 *
 * TEST 1 — Headless (1 hr cap):
 *   4 families (classic-combat / magic-spellcasting / stealth-precision / support-leadership). Random archetype+bg per attempt.
 *   Hard-kills after 60 min and reports whatever was found.
 *
 * TEST 2 — Headed (8 hr ceiling, autonomous repair):
 *   4 families: classic-combat / magic-spellcasting / stealth-precision / support-leadership.
 *   Fixed deterministic first attempt per family, then random retry from same family pool.
 *   Full human-player simulation: every menu/overlay exercised on schedule.
 *   Autonomous repair loop: dead ends, stalled progress, and known JS failures are
 *   recovered at runtime. No user input needed for up to 8 hours.
 */

const { test, expect } = require('@playwright/test');
const fs   = require('fs');
const path = require('path');

const { getStageCeiling, isSuccess: stageLockIsSuccess, ceilingLabel } = require('./helpers/stage-lock');
const { shouldTravelNow, openMapAndTravel } = require('./helpers/map-travel');
const CoverageTracker = require('./helpers/coverage-tracker');
const ReportWriter    = require('./helpers/report-writer');

// ---------------------------------------------------------------------------
// Output dirs
// ---------------------------------------------------------------------------
const TEST_RESULTS    = path.resolve(__dirname, '../../test-results');
const SCREENSHOT_DIR  = path.join(TEST_RESULTS, 'playthrough-screenshots', 'headless');
const VIDEO_DIR       = path.join(TEST_RESULTS, 'videos');
const LOG_PATH        = path.join(TEST_RESULTS, 'playtest-headless-log.md');

// ---------------------------------------------------------------------------
// 4-family pools (headless) — matches character creation screen categories
// ---------------------------------------------------------------------------
const HEADLESS_FAMILY_ORDER = ['classic-combat', 'magic-spellcasting', 'stealth-precision', 'support-leadership'];

const HEADLESS_FAMILY_POOLS = {
  'classic-combat':     ['warrior','knight','berserker','warlord','warden','death_knight','archer','paladin','ranger'],
  'magic-spellcasting': ['wizard','cleric','priest','necromancer','illusionist','inquisitor','elementalist','oracle'],
  'stealth-precision':  ['rogue','assassin','scout_c','thief','trickster','beastmaster','spellthief'],
  'support-leadership': ['healer','artificer','engineer','tactician','alchemist','saint','bard'],
};

// ---------------------------------------------------------------------------
// 4-family pools (headed)
// ---------------------------------------------------------------------------
const HEADED_FAMILY_ORDER = ['classic-combat', 'magic-spellcasting', 'stealth-precision', 'support-leadership'];

const HEADED_FAMILY_POOLS = {
  'classic-combat':       ['warrior','knight','berserker','warlord','warden','death_knight','archer','paladin','ranger'],
  'magic-spellcasting':   ['wizard','cleric','priest','necromancer','illusionist','inquisitor','elementalist','oracle'],
  'stealth-precision':    ['rogue','assassin','scout_c','thief','trickster','beastmaster','spellthief'],
  'support-leadership':   ['healer','artificer','engineer','tactician','alchemist','saint','bard'],
};

// Fixed first attempt per headed family — most canonical/stable archetype+bg
const HEADED_FIRST_ATTEMPT = {
  'classic-combat':     { archetypeId: 'warrior',  backgroundId: 'w_garrison' },
  'magic-spellcasting': { archetypeId: 'wizard',   backgroundId: 'wz_shelk'   },
  'stealth-precision':  { archetypeId: 'rogue',    backgroundId: 'ro_shelk'   },
  'support-leadership': { archetypeId: 'healer',   backgroundId: 'hl_shelk'   },
};

// ---------------------------------------------------------------------------
// Shared archetype data
// ---------------------------------------------------------------------------
const ARCHETYPE_BACKGROUNDS = {
  warrior:      ['w_garrison','w_roaz','w_frontier'],
  knight:       ['k_shelk','k_roaz','k_order'],
  ranger:       ['r_shelk','r_soreheim','r_sheresh'],
  paladin:      ['p_cysur','p_eloljaro','p_gwybodaeth'],
  archer:       ['a_roadwarden','a_frontier','a_nomdara'],
  berserker:    ['b_soreheim','b_frontier','b_cosmouth'],
  warden:       ['wa2_aurora','wa2_shelk','wa2_soreheim'],
  warlord:      ['wl_frontier','wl_roaz','wl_soreheim'],
  death_knight: ['dk_shelk','dk_roaz','dk_panim'],
  rogue:        ['ro_shelk','ro_union','ro_nomdara'],
  assassin:     ['as_shadowhands','as_redhoodguild','as_shirsh'],
  spellthief:   ['st_mimolot','st_court','st_shirsh'],
  scout_c:      ['sc_shelk','sc_soreheim','sc_cosmouth'],
  thief:        ['th_shelk','th_cosmouth','th_union'],
  trickster:    ['tr_shelk','tr_union','tr_nomdara'],
  beastmaster:  ['bm_frontier','bm_soreheim','bm_sheresh'],
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
  alchemist:    ['al_mimolot','al_sheresh','al_union'],
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
  afterResult:      0,  // no reading delay — headless, DOM just needs to settle
  beforePanel:      0,
  betweenCombat:    0,
  afterLevelup:    50,  // tiny settle for level-up DOM
  short:            0,
  waitChoices:   1500,  // real wait — choices must actually render
  panelDwell:       0,
};

const MAX_PICKS         = 350;
const PROBE_EVERY       = 50;   // less frequent in headless — speed over coverage
const CAMP_EVERY        = 100;
const SCREENSHOT_EVERY  = 50;

// ---------------------------------------------------------------------------
// Log — written incrementally so kills don't lose data
// ---------------------------------------------------------------------------
let _logPath = LOG_PATH;
function initLog(runLabel) {
  [SCREENSHOT_DIR, VIDEO_DIR, TEST_RESULTS].forEach(d => fs.mkdirSync(d, { recursive: true }));
  _logPath = path.join(TEST_RESULTS, `playtest-headless-log.md`);
  fs.writeFileSync(_logPath, `# Ledger of Ash — QA Run (${runLabel})\nStarted: ${new Date().toISOString()}\n\n`, 'utf8');
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

function buildPool(family, pools) {
  const combos = [];
  for (const archId of (pools[family] || [])) {
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
    const p = path.join(SCREENSHOT_DIR, `${_ssCounter}_${tag.replace(/[^a-z0-9_-]/gi,'_')}.png`);
    await page.screenshot({ path: p, fullPage: false });
    return p;
  } catch (_) { return null; }
}

// ---------------------------------------------------------------------------
// Page helpers
// ---------------------------------------------------------------------------
async function readG(page) {
  return page.evaluate(() => {
    try {
      return {
        stage:         G.stage,
        stageProgress: G.stageProgress ? { ...G.stageProgress } : {},
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
        skills:        G.skills ? { ...G.skills } : {},
        traits:        G.traits ? [...G.traits] : [],
        outcome:       G.outcome,
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

async function waitForChoices(page, ms) {
  try { await page.waitForSelector('.choice-btn:visible', { timeout: ms || PACE.waitChoices }); }
  catch (_) {}
  return page.locator('.choice-btn:visible').count().catch(() => 0);
}

// isSuccess uses dynamic ceiling from stage-lock helper.
// headless: quick-win = exiting Stage I (organic only). Headed: organic only (see headed spec).
async function isSuccess(page, ceiling, headless, sp2, localitiesCount) {
  if (headless) {
    const stageOk = await page.evaluate((c) => {
      try {
        if (typeof G === 'undefined') return false;
        if (c === 'Stage II') return G.stage !== 'Stage I';
        if (c === 'Stage III') return G.stage === 'Stage III' || G.stage === 'Stage IV' || G.stage === 'Stage V';
        if (c === 'Stage IV') return G.stage === 'Stage IV' || G.stage === 'Stage V';
        return G.stage === 'Stage V';
      } catch (_) { return false; }
    }, ceiling).catch(() => false);
    if (!stageOk) return false;
    // H5: Stage II strict threshold — sp2 >= 12 + 3 localities visited
    if (ceiling === 'Stage II') {
      if ((sp2 || 0) < 12 || (localitiesCount || 0) < 3) return false;
    }
    return true;
  }
  return stageLockIsSuccess(page, ceiling);
}

async function isDead(page) {
  try { return await page.locator('#screen-death,.death-screen,#death-overlay').isVisible({ timeout: 400 }); }
  catch (_) { return false; }
}

// ---------------------------------------------------------------------------
// Overlay management
// ---------------------------------------------------------------------------
async function closeOverlay(page) {
  try {
    await page.evaluate(() => {
      document.querySelectorAll('.overlay.active').forEach(el => el.classList.remove('active'));
    });
    await page.waitForTimeout(200);
  } catch (_) {}
}

async function dismissOverlays(page) {
  // DOM-level cleanup first: remove any id="...-modal" overlay divs and .modal-overlay (Stage III blocked modal)
  await page.evaluate(() => {
    document.querySelectorAll('[id$="-modal"]').forEach(function(el) {
      if (el && el.parentNode) el.parentNode.removeChild(el);
    });
    document.querySelectorAll('.modal-overlay').forEach(function(el) {
      if (el && el.parentNode) el.parentNode.removeChild(el);
    });
    document.querySelectorAll('.overlay.active').forEach(function(el) {
      el.classList.remove('active');
    });
  }).catch(() => {});

  for (let i = 0; i < 5; i++) {
    try {
      const ov = page.locator('.overlay.active, [id$="-modal"]:visible, .modal:visible, .modal-overlay:visible').first();
      if (!await ov.isVisible({ timeout: 300 }).catch(() => false)) break;
      const btn = ov.locator('button.overlay-close,.overlay-close,button:has-text("×"),button:has-text("Close"),button:has-text("Cancel")').first();
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

  await page.waitForFunction(() => typeof selectArchetype === 'function', { timeout: 8000 });
  await page.evaluate((id) => selectArchetype(id), archetypeId);
  await page.waitForSelector('#bg-step', { state: 'visible', timeout: 5000 });
  await page.evaluate(({ bgId, archId }) => selectBackground(bgId, archId), { bgId: backgroundId, archId: archetypeId });

  await page.waitForSelector('#begin-btn:not([style*="display:none"])', { timeout: 5000 });
  await page.click('#begin-btn');
  await page.waitForSelector('#screen-game', { timeout: 10000 });
  await page.waitForTimeout(500);

  // Dismiss onboarding
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
  let handled = false;
  // Level-up has 3 sequential steps: stat → trait → ability.
  // Loop up to 5 times so all steps are resolved in one handleLevelup call.
  for (let step = 0; step < 5; step++) {
    try {
      const block = page.locator('.levelup-block:visible,.level-up-block:visible,#levelup-modal.active').first();
      if (!await block.isVisible({ timeout: 400 }).catch(() => false)) break;

      // Primary: .lu-option-btn is the actual class used by stat/trait/ability step buttons
      const pickBtn = block.locator('.lu-option-btn:not([disabled])').first();
      if (await pickBtn.isVisible({ timeout: 500 }).catch(() => false)) {
        await pickBtn.click();
        await page.waitForTimeout(PACE.afterLevelup);
        handled = true;
        const g = await readG(page);
        log(`[panel:level-up ${tag}] step=${step + 1} lvl=${g.level} — PASS`);
        continue;
      }
      // Fallback: legacy selectors for older rendering paths
      const optBtn = block.locator('.lu-option:not([disabled]),.levelup-option button,.levelup-btn').first();
      if (await optBtn.isVisible({ timeout: 400 }).catch(() => false)) {
        await optBtn.click();
        await page.waitForTimeout(PACE.afterLevelup);
        handled = true;
        const g = await readG(page);
        log(`[panel:level-up ${tag}] step=${step + 1} lvl=${g.level} fallback — PASS`);
        continue;
      }
      break;
    } catch (_) { break; }
  }
  return handled;
}

// ---------------------------------------------------------------------------
// Choice picker
// ---------------------------------------------------------------------------
async function pickChoice(page, pickNum, forcePlotMain) {
  // :not([disabled]) required — travel mode overlay buttons and maxed stat buttons
  // are .choice-btn:visible but disabled; clicking them times out waiting for actionability
  const buttons = page.locator('.choice-btn:visible:not([disabled])');
  const count   = await buttons.count();
  if (count === 0) return { clicked: false };

  const meta = async (loc) => {
    const txt = await loc.evaluate(b => (b.querySelector('.choice-text') || b).textContent.trim()).catch(() => '');
    const cls = await loc.evaluate(b => b.className).catch(() => '');
    const tag = await loc.evaluate(b => { const t = b.querySelector('.choice-tag'); return t ? t.textContent.trim() : ''; }).catch(() => '');
    return { text: txt, isPlotMain: cls.includes('plot-main'), isCombat: cls.includes('combat-btn'), tag };
  };

  // 1) plot-main always first
  const pm = page.locator('.choice-btn.plot-main:visible').first();
  if (await pm.isVisible({ timeout: 400 }).catch(() => false)) {
    const m = await meta(pm);
    await pm.click();
    return { clicked: true, ...m };
  }

  if (forcePlotMain) {
    await page.waitForTimeout(200);
    const pm2 = page.locator('.choice-btn.plot-main').first();
    if (await pm2.isVisible({ timeout: 600 }).catch(() => false)) {
      const m = await meta(pm2);
      await pm2.click();
      return { clicked: true, ...m };
    }
  }

  // 2) random every 3rd pick
  if (pickNum % 3 === 0) {
    const idx = Math.floor(Math.random() * count);
    const btn = buttons.nth(idx);
    const m   = await meta(btn);
    await btn.click();
    return { clicked: true, ...m };
  }

  // 3) longest label
  const snap = await snapshotChoices(page);
  let bestIdx = 0, bestLen = -1;
  snap.forEach((s, i) => { if (s.text.length > bestLen) { bestLen = s.text.length; bestIdx = i; } });
  const btn = buttons.nth(bestIdx);
  const m   = await meta(btn);
  await btn.click();
  return { clicked: true, ...m };
}

// ---------------------------------------------------------------------------
// Panel probes — basic (headless + headed)
// ---------------------------------------------------------------------------
async function probeCharSheet(page, tag, g) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    await page.click('#btn-charsheet');
    await page.waitForSelector('#overlay-charsheet', { state: 'visible', timeout: 4000 });
    await page.waitForTimeout(PACE.panelDwell);
    await screenshot(page, `${tag}_charsheet_lvl${g.level}`);

    const sheetText = await page.locator('#overlay-charsheet').innerText().catch(() => '');
    const traits    = await page.locator('#overlay-charsheet .traits,[class*="trait"]').first().isVisible({ timeout: 1000 }).catch(() => false);
    const names     = /Might|Finesse|Vigor|Wits|Charm|Spirit/i.test(sheetText);
    const xpOk      = g.level !== 1 || /120/.test(sheetText);
    const objObj    = sheetText.includes('[object Object]');

    log(`[panel:char-sheet ${tag}] lvl=${g.level} — ${(traits && names && xpOk && !objObj) ? 'PASS' : 'WARN'}: traits=${traits} names=${names} xp=${xpOk} objObj=${objObj}`);
    await closeOverlay(page);
  } catch (err) {
    log(`[panel:char-sheet ${tag}] FAIL: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

async function probeJournal(page, tag, g) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    await page.click('#btn-journal');
    await page.waitForSelector('#overlay-journal,[id*="journal"]', { state: 'visible', timeout: 4000 });
    await page.waitForTimeout(PACE.panelDwell);
    await screenshot(page, `${tag}_journal_day${g.day}`);

    const txt    = await page.locator('[id*="journal"]').first().innerText().catch(() => '');
    const objObj = txt.includes('[object Object]');
    const hasInv = /iron blade|courier satchel|field kit/i.test(txt);
    log(`[panel:journal ${tag}] day=${g.day} — ${(!objObj && !hasInv) ? 'PASS' : 'FAIL'}: objObj=${objObj} inventoryLeak=${hasInv}`);
    await closeOverlay(page);
  } catch (err) {
    log(`[panel:journal ${tag}] FAIL: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

async function probeCamp(page, tag, g) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    await page.click('#btn-camp');
    await page.waitForSelector('#overlay-camp,[id*="camp"]', { state: 'visible', timeout: 4000 });
    await page.waitForTimeout(PACE.panelDwell);
    await screenshot(page, `${tag}_camp_day${g.day}`);
    log(`[panel:camp ${tag}] day=${g.day} — PASS`);
    await closeOverlay(page);
  } catch (err) {
    log(`[panel:camp ${tag}] WARN: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

// ---------------------------------------------------------------------------
// Panel probes — headed only (full simulation)
// ---------------------------------------------------------------------------
async function probeInventory(page, tag) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    const invBtn = page.locator('#btn-inventory,button:has-text("Inventory"),.hud-btn[title*="nventor"]').first();
    if (!await invBtn.isVisible({ timeout: 800 }).catch(() => false)) {
      log(`[panel:inventory ${tag}] SKIP: button not found`);
      return;
    }
    await invBtn.click();
    await page.waitForTimeout(PACE.panelDwell);
    await screenshot(page, `${tag}_inventory`);
    const txt = await page.locator('.overlay.active,[id*="inventory"],[id*="Inventory"]').first().innerText().catch(() => '');
    log(`[panel:inventory ${tag}] — ${txt ? 'PASS' : 'WARN'}: chars=${txt.length}`);
    await closeOverlay(page);
  } catch (err) {
    log(`[panel:inventory ${tag}] WARN: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

async function probeShop(page, tag, g) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    const shopBtn = page.locator('#btn-shop,button:has-text("Shop"),button:has-text("Market"),.hud-btn[title*="hop"]').first();
    if (!await shopBtn.isVisible({ timeout: 800 }).catch(() => false)) {
      log(`[panel:shop ${tag}] SKIP: button not found`);
      return;
    }
    await shopBtn.click();
    await page.waitForTimeout(PACE.panelDwell);
    await screenshot(page, `${tag}_shop_${g.location}`);
    const txt = await page.locator('.overlay.active,[id*="shop"],[id*="Shop"]').first().innerText().catch(() => '');
    const hasItems = txt.length > 20;
    log(`[panel:shop ${tag}] loc=${g.location} — ${hasItems ? 'PASS' : 'WARN'}: chars=${txt.length}`);
    await closeOverlay(page);
  } catch (err) {
    log(`[panel:shop ${tag}] WARN: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

async function probeQuestHUD(page, tag) {
  try {
    const questEl = page.locator('#quest-hud,#hud-quest,[id*="quest"]').first();
    if (!await questEl.isVisible({ timeout: 600 }).catch(() => false)) {
      log(`[panel:quest-hud ${tag}] SKIP: element not visible`);
      return;
    }
    const txt    = await questEl.innerText().catch(() => '');
    const objObj = txt.includes('[object Object]');
    log(`[panel:quest-hud ${tag}] — ${!objObj ? 'PASS' : 'FAIL'}: objObj=${objObj} text="${txt.slice(0,60)}"`);
  } catch (err) {
    log(`[panel:quest-hud ${tag}] WARN: ${err.message}`);
  }
}

async function probeHeatHUD(page, tag, g) {
  try {
    const heatEl = page.locator('#heat-hud,#hud-heat,[id*="heat"],[class*="heat"]').first();
    const visible = await heatEl.isVisible({ timeout: 600 }).catch(() => false);
    const totalHeat = Object.values(g.heat || {}).reduce((a, b) => a + b, 0);
    if (!visible && totalHeat > 0) {
      log(`[panel:heat-hud ${tag}] WARN: heat=${totalHeat} but HUD not visible`);
    } else if (visible) {
      const txt = await heatEl.innerText().catch(() => '');
      log(`[panel:heat-hud ${tag}] — PASS: visible heat=${totalHeat} "${txt.slice(0,40)}"`);
    } else {
      log(`[panel:heat-hud ${tag}] — PASS: no heat, HUD hidden`);
    }
  } catch (err) {
    log(`[panel:heat-hud ${tag}] WARN: ${err.message}`);
  }
}

async function probeAlignmentBars(page, tag) {
  try {
    const alignEl = page.locator('[id*="alignment"],[class*="alignment"],[id*="benevolence"],[class*="benevolence"]').first();
    const visible = await alignEl.isVisible({ timeout: 600 }).catch(() => false);
    log(`[panel:alignment ${tag}] — ${visible ? 'PASS: bars visible' : 'SKIP: not rendered yet'}`);
  } catch (err) {
    log(`[panel:alignment ${tag}] WARN: ${err.message}`);
  }
}

async function probeHowToPlay(page, tag) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    const btn = page.locator('button:has-text("How to Play"),button:has-text("HOW TO PLAY"),#btn-howto').first();
    if (!await btn.isVisible({ timeout: 800 }).catch(() => false)) {
      log(`[panel:howtoplay ${tag}] SKIP: button not found`);
      return;
    }
    await btn.click();
    await page.waitForTimeout(PACE.panelDwell);
    await screenshot(page, `${tag}_howtoplay`);
    log(`[panel:howtoplay ${tag}] — PASS`);
    await page.keyboard.press('Escape');
    await closeOverlay(page);
  } catch (err) {
    log(`[panel:howtoplay ${tag}] WARN: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

// ---------------------------------------------------------------------------
// Dead-end recovery — standard (headless)
// ---------------------------------------------------------------------------
async function handleDeadEnd(page, tag, pickNum) {
  const g    = await readG(page);
  const html = await actionHTML(page);
  await screenshot(page, `${tag}_deadend_p${pickNum}`);
  log(`[dead-end ${tag}] pick=${pickNum} loc=${g.location} tension=${g.tensionLevel} sp=${JSON.stringify(g.stageProgress)} html="${html.slice(0,200)}"`);

  await page.keyboard.press('Escape');
  await page.waitForTimeout(1000);
  if (await waitForChoices(page, 1000) > 0) { log(`[recovery ${tag}] Escape worked`); return true; }

  try { await page.click('#btn-camp'); await page.waitForTimeout(2000); await closeOverlay(page); } catch (_) {}
  if (await waitForChoices(page, 1000) > 0) { log(`[recovery ${tag}] camp worked`); return true; }

  try {
    await page.evaluate(() => {
      if (typeof loadStageChoices === 'function' && typeof G !== 'undefined' && G.location)
        loadStageChoices(G.location);
    });
    await page.waitForTimeout(1500);
  } catch (_) {}
  if (await waitForChoices(page, 1000) > 0) { log(`[recovery ${tag}] loadStageChoices worked`); return true; }

  return false;
}

// ---------------------------------------------------------------------------
// Dead-end recovery — repair mode (headed, more aggressive)
// ---------------------------------------------------------------------------
async function handleDeadEndRepair(page, tag, pickNum) {
  const g    = await readG(page);
  const html = await actionHTML(page);
  await screenshot(page, `${tag}_deadend_p${pickNum}`);
  log(`[dead-end ${tag}] pick=${pickNum} loc=${g.location} tension=${g.tensionLevel} sp=${JSON.stringify(g.stageProgress)} html="${html.slice(0,200)}"`);

  // R1: Escape
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1000);
  if (await waitForChoices(page, 1000) > 0) { log(`[repair ${tag}] R1-Escape worked`); return true; }

  // R2: Camp
  try { await page.click('#btn-camp'); await page.waitForTimeout(2000); await closeOverlay(page); } catch (_) {}
  if (await waitForChoices(page, 1200) > 0) { log(`[repair ${tag}] R2-camp worked`); return true; }

  // R3: loadStageChoices
  try {
    await page.evaluate(() => {
      if (typeof loadStageChoices === 'function' && typeof G !== 'undefined' && G.location)
        loadStageChoices(G.location);
    });
    await page.waitForTimeout(1500);
  } catch (_) {}
  if (await waitForChoices(page, 1200) > 0) { log(`[repair ${tag}] R3-loadStageChoices worked`); return true; }

  // R4: Runtime patch — blank-panel guard inject
  try {
    await page.evaluate(() => {
      const panel = document.getElementById('action-content');
      if (panel && !panel.querySelector('.choice-btn,.levelup-block,.move-block')) {
        if (typeof loadStageChoices === 'function' && typeof G !== 'undefined' && G.location)
          loadStageChoices(G.location);
      }
    });
    await page.waitForTimeout(2000);
  } catch (_) {}
  if (await waitForChoices(page, 1200) > 0) { log(`[repair ${tag}] R4-blank-panel-inject worked`); return true; }

  // R5: If tension combat dead end, patch patrol_guard fallback at runtime
  try {
    await page.evaluate(() => {
      if (typeof G !== 'undefined' && G.tensionLevel >= 2) {
        G.tensionLevel = 0;
        if (typeof loadStageChoices === 'function' && G.location)
          loadStageChoices(G.location);
      }
    });
    await page.waitForTimeout(1500);
  } catch (_) {}
  if (await waitForChoices(page, 1200) > 0) { log(`[repair ${tag}] R5-tension-reset worked`); return true; }

  // R6: Navigate to a new location via G if possible
  try {
    await page.evaluate(() => {
      if (typeof G === 'undefined') return;
      const locs = Object.keys(window.STAGE_LOCALITY_POOL && window.STAGE_LOCALITY_POOL[1] || {});
      if (locs.length > 0) {
        G.location = locs[Math.floor(Math.random() * locs.length)];
        if (typeof loadStageChoices === 'function') loadStageChoices(G.location);
      }
    });
    await page.waitForTimeout(1500);
  } catch (_) {}
  if (await waitForChoices(page, 1200) > 0) { log(`[repair ${tag}] R6-location-change worked`); return true; }

  log(`[repair ${tag}] ALL recovery strategies exhausted pick=${pickNum}`);
  return false;
}

// ---------------------------------------------------------------------------
// Full panel simulation schedule (headed only)
// Each probe category runs on its own cadence
// ---------------------------------------------------------------------------
async function runFullPanelSimulation(page, tag, g, pickNum) {
  // Char sheet + journal every PROBE_EVERY picks
  if (pickNum > 0 && pickNum % PROBE_EVERY === 0) {
    await probeCharSheet(page, tag, g);
    await probeJournal(page, tag, g);
    await probeQuestHUD(page, tag);
    await probeHeatHUD(page, tag, g);
    await probeAlignmentBars(page, tag);
  }
  // Camp + inventory every CAMP_EVERY picks
  if (pickNum > 0 && pickNum % CAMP_EVERY === 0) {
    await probeCamp(page, tag, g);
    await probeInventory(page, tag);
  }
  // Shop every 80 picks
  if (pickNum > 0 && pickNum % 80 === 0) {
    await probeShop(page, tag, g);
  }
  // How-to-play once at pick 5
  if (pickNum === 5) {
    await probeHowToPlay(page, tag);
  }
}

// Module-level so runPlaythrough (defined here) can read it; assigned in test body at start
var _runStartMs = 0;

// ---------------------------------------------------------------------------
// Single playthrough — mode: 'headless' | 'headed'
// ---------------------------------------------------------------------------
async function runPlaythrough(page, archetypeId, backgroundId, family, attemptNum, jsErrors, mode, ceiling, tracker) {
  const tag      = `${family}_${archetypeId}_a${attemptNum}`;
  const isHeaded = mode === 'headed';
  ceiling = ceiling || 'Stage II';
  tracker = tracker || new CoverageTracker();
  _runStartMs = Date.now(); // reset per-attempt so 55-min soft threshold is per-run, not per-suite
  log(`\n[run:${tag}] starting archetype=${archetypeId} bg=${backgroundId} family=${family} mode=${mode}`);

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
  await screenshot(page, `${tag}_start`);

  let picks              = 0;
  let deadStreak         = 0;
  let lastSP1            = 0;
  let noProgress         = 0;
  let forcePlotMain      = 0;
  let lastLoggedSP1      = -1;
  let lastPickLabels     = [];
  let lastPickTime       = Date.now();
  let lastLocation       = '';
  let stuckAtLoc         = 0;
  let lastMapTravelPick  = 0;
  let lastCharSheetPick  = -1;
  let lastCampPick       = -1;
  const visitedLocalities = new Set();
  const ESCAPE_LOCS  = [
    'shelkopolis','cosmoria','zootia','roaz','soreheim',
    'mimolot','ithtananalor','panim','sunspire','st_court',
    'whitebridge','nomdara','sheresh','shirsh',
    'delvingmoor','cosrin','the_plumes','veldt_crossing','harrowgate',
  ];

  var _lastSp1Check = 0;
  var _sp1Reached15AtPick = -1;
  var _bossWatchEmitted   = false;
  var _headlessLastStage = '';
  var _lastLoggedSP2 = -1;
  var _lastSp2AtTriage        = -1;
  var _sp2FrozenCount         = 0;
  var _lastStage2EnrichedPick = 0;
  const capViolations = [];
  while (picks < MAX_PICKS) {
    if (pageIsClosed) break;

    try {
      // Soft 55-min threshold — exit cleanly before the 62-min hard kill fires
      if (picks % 25 === 0 && picks > 0) {
        // TRIAGE 1: empty panel while alive
        var _triageCount = await page.locator('.choice-btn:visible:not([disabled])').count().catch(function() { return 0; });
        if (_triageCount === 0 && !g.dead) {
          log('[TRIAGE_STALL ' + tag + '] pick=' + picks + ' — empty panel, G.dead=false');
          try { await page.evaluate(function() { if (typeof loadStageChoices === 'function') loadStageChoices(); }); } catch(_e) {}
        }
        // TRIAGE 2: sp1 frozen for 25 picks
        var _sp1Now = (g.stageProgress && g.stageProgress[1]) || 0;
        if (_sp1Now === _lastSp1Check) {
          log('[TRIAGE_PROGRESSION_BLOCKED ' + tag + '] pick=' + picks + ' — sp1=' + _sp1Now + ' frozen');
        }
        _lastSp1Check = _sp1Now;

        // TRIAGE 3: boss-fire watch — flag if sp1 reached 15 but boss hasn't started in 35 picks
        var _sp1ForBoss = (g.stageProgress && g.stageProgress[1]) || 0;
        if (_sp1ForBoss >= 15 && _sp1Reached15AtPick === -1) {
          _sp1Reached15AtPick = picks;
        }
        if (_sp1Reached15AtPick !== -1 && !_bossWatchEmitted) {
          var _bossLag = picks - _sp1Reached15AtPick;
          if (_bossLag >= 35 && !(g.flags && g.flags.stage1_boss_started) && g.stage === 'Stage I') {
            log('[TRIAGE_BOSS_NOT_FIRING ' + tag + '] pick=' + picks + ' sp1=' + _sp1ForBoss + ' lag=' + _bossLag + ' picks since sp1=15');
            _bossWatchEmitted = true;
          }
        }

        // TRIAGE 4: Stage I→II flag chain validation
        if (_headlessLastStage === 'Stage I' && g.stage === 'Stage II') {
          var _f = g.flags || {};
          var _mainbossOk   = !!_f.stage1_mainboss_complete;
          var _narrativeOk  = !!_f.stage1_narrative_complete;
          var _sp1AtAdvance = (g.stageProgress && g.stageProgress[1]) || 0;
          var _sp2AtAdvance = 0;
          try { _sp2AtAdvance = await page.evaluate(function(){ return (G && G.stageProgress && G.stageProgress[2]) || 0; }); } catch(_e) {}
          if (_mainbossOk && _narrativeOk) {
            log('[stage-advance:I→II ' + tag + '] pick=' + picks + ' sp1=' + _sp1AtAdvance + ' sp2=' + _sp2AtAdvance + ' flags: mainboss_complete=true narrative_complete=true');
          } else {
            log('[TRIAGE_STAGE_ADVANCE_BAD_FLAGS ' + tag + '] pick=' + picks + ' mainboss_complete=' + _mainbossOk + ' narrative_complete=' + _narrativeOk);
          }
        }
        if (g.stage) _headlessLastStage = g.stage;

        // TRIAGE 5+6: Stage II sp2 stall + enriched-choice absence detection
        if (g.stage !== 'Stage I') {
          var _sp2Triage = 0;
          try { _sp2Triage = await page.evaluate(function(){ return (G && G.stageProgress && G.stageProgress[2]) || 0; }); } catch(_e) {}
          if (_sp2Triage === _lastSp2AtTriage) {
            _sp2FrozenCount++;
            if (_sp2FrozenCount >= 3) { // 3 cycles = 75 picks
              log('[TRIAGE_PROGRESSION_BLOCKED_SP2 ' + tag + '] pick=' + picks + ' sp2=' + _sp2Triage + ' frozen for ' + (_sp2FrozenCount * 25) + ' picks');
            }
          } else {
            _sp2FrozenCount = 0;
          }
          _lastSp2AtTriage = _sp2Triage;

          // TRIAGE 6: No Stage II enriched choices appearing
          var _enrichedCount = 0;
          try { _enrichedCount = await page.locator('.choice-btn[data-cid^="stage2_"]').count(); } catch(_e2) {}
          if (_enrichedCount > 0) {
            _lastStage2EnrichedPick = picks;
          } else if (_lastStage2EnrichedPick > 0 && (picks - _lastStage2EnrichedPick) >= 75) {
            log('[TRIAGE_STAGE_II_NO_ENRICHED_CHOICES ' + tag + '] pick=' + picks + ' loc=' + g.location + ' — no Stage II choices in 75 picks');
            _lastStage2EnrichedPick = picks; // reset to avoid spam
          }
        }

        var _elapsed = Date.now() - _runStartMs;
        if (_elapsed > 55 * 60 * 1000) {
          log('[run:' + tag + '] TIMEOUT: 55min soft threshold at pick ' + picks + ' — exiting with partial report');
          return { success: false, reason: 'timeout-soft', picks: picks, g: g };
        }
      }

      // 60-second stall guard — no successful pick in 60s = stuck loop → failed run
      if (Date.now() - lastPickTime > 60000) {
        g = await readG(page);
        await screenshot(page, `${tag}_stall_p${picks}`);
        log(`[run:${tag}] STALL pick=${picks} — no progress in 60s, counting as failed run`);
        return { success: false, reason: 'stall-timeout', picks, g };
      }

      if (await isDead(page)) {
        g = await readG(page);
        await screenshot(page, `${tag}_death_p${picks}`);
        log(`[run:${tag}] DEAD pick=${picks} level=${g.level}`);
        return { success: false, reason: 'death', picks, g };
      }
      const _sp2ForSuccess = await page.evaluate(function(){ try{ return G.stageProgress[2]||0; } catch(_){return 0;} }).catch(()=>0);
      // H5: log thin Stage II (reached Stage II but sp2 too low)
      if (!isHeaded) {
        const _stageForH5 = await page.evaluate(function(){ try{ return G.stage||''; } catch(_){ return ''; } }).catch(()=>'');
        if (_stageForH5 !== 'Stage I' && _sp2ForSuccess < 12) {
          log('[TRIAGE_THIN_STAGE_II ' + tag + '] pick=' + picks + ' sp2=' + _sp2ForSuccess + ' locs=' + visitedLocalities.size + ' — in Stage II but below sp2=12, continuing');
        }
      }
      if (await isSuccess(page, ceiling, !isHeaded, _sp2ForSuccess, visitedLocalities.size)) {
        g = await readG(page);
        await screenshot(page, `${tag}_success_p${picks}`);
        const sp2Final = (g.stageProgress && g.stageProgress[2]) || 0;
        log(`[run:${tag}] SUCCESS pick=${picks} stage=${g.stage} sp2=${sp2Final}`);
        tracker.onPick(g);
        if (g.location) visitedLocalities.add(g.location);
        return { success: true, reason: 'ceiling-reached', picks, g, sp2: sp2Final, stage: g.stage };
      }

      await handleLevelup(page, tag);

      g = await readG(page);

      // Panel probes
      if (isHeaded) {
        await runFullPanelSimulation(page, tag, g, picks);
      } else {
        if (picks > 0 && picks % PROBE_EVERY === 0 && picks !== lastCharSheetPick) {
          lastCharSheetPick = picks;
          await probeCharSheet(page, tag, g);
          await probeJournal(page, tag, g);
        }
        if (picks > 0 && picks % CAMP_EVERY === 0 && picks !== lastCampPick) {
          lastCampPick = picks;
          await probeCamp(page, tag, g);
        }
      }

      if (picks % SCREENSHOT_EVERY === 0) {
        await screenshot(page, `${tag}_p${picks}_sp${(g.stageProgress && g.stageProgress[1]) || 0}`);
      }

      // Wait for result text to settle
      try {
        await Promise.race([
          page.waitForSelector('.result-text:visible',    { timeout: 2000 }),
          page.waitForSelector('.narrative-text:visible', { timeout: 2000 }),
        ]);
        await page.waitForTimeout(PACE.afterResult);
      } catch (_) {}

      const choiceCount = await waitForChoices(page, PACE.waitChoices);

      // Cap enforcement: log violations (> 8 choices in panel); hard assert runs outside loop to avoid stalling
      // Exclude: .combat-btn (attack/defend/flee combat actions), .combat-lv3 (G1 escalation), .combat-flip-btn (tension flip)
      if (choiceCount > 0 && !g.dead) {
        const visibleNonDisabled = await page.locator('#action-content .choice-btn:not([disabled]):not(.combat-lv3):not(.combat-flip-btn):not(.combat-btn)').count().catch(() => 0);
        if (visibleNonDisabled > 8) {
          log('[CAP_VIOLATION ' + tag + '] pick=' + picks + ' loc=' + (g.location || '?') + ' count=' + visibleNonDisabled);
          capViolations.push({ pick: picks, loc: g.location || '?', count: visibleNonDisabled });
        }
      }

      // Map travel every 15-20 picks (tests map UI + spreads locality coverage)
      if (shouldTravelNow(picks, lastMapTravelPick)) {
        const fromLoc = g.location || '';
        const travelledTo = await openMapAndTravel(page, visitedLocalities, log, picks);
        if (travelledTo) {
          tracker.onMapTravel(fromLoc, travelledTo, picks);
          lastMapTravelPick = picks;
          await page.waitForTimeout(PACE.short);
          g = await readG(page);
          tracker.onPick(g);
          if (g.location) visitedLocalities.add(g.location);
        }
      }

      // Dead-end detection
      if (choiceCount === 0) {
        deadStreak++;
        if (deadStreak >= 3) {
          tracker.onDeadEnd(g.location || 'unknown', picks, '');
          const recovered = isHeaded
            ? await handleDeadEndRepair(page, tag, picks)
            : await handleDeadEnd(page, tag, picks);
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

      // stageProgress tracking + coverage
      g = await readG(page);
      tracker.onPick(g);
      if (g.location) visitedLocalities.add(g.location);

      const sp1 = (g.stageProgress && g.stageProgress[1]) || 0;
      if (sp1 !== lastLoggedSP1) {
        const _heatShelk = (g.heat && g.heat.shelk) || 0;
        log(`[G ${tag}] pick=${picks} sp1=${sp1} sp2=${(g.stageProgress && g.stageProgress[2]) || 0} stage=${g.stage} loc=${g.location} lvl=${g.level} heat_shelk=${_heatShelk} ben=${g.benevolence || 0} order=${g.orderAxis || 0}`);
        lastLoggedSP1 = sp1;
      }
      // H3: Stage II G2-snapshot — fires when sp2 changes (sp1 frozen in Stage II)
      if (g.stage !== 'Stage I') {
        var _sp2Live = 0;
        try { _sp2Live = await page.evaluate(function(){ return (G && G.stageProgress && G.stageProgress[2]) || 0; }); } catch(_e) {}
        if (_sp2Live !== _lastLoggedSP2) {
          var _f2 = g.flags || {};
          // Determine active faction arc — four arcs: collegium, shadowhands, wardens, redhood
          var _arc = 'none';
          if (_f2.stage2_collegium_contact)               _arc = 'collegium';
          else if (_f2.shadowhands_contacted || _f2.shadowhands_contact || _f2.stage2_faction_shadowhands_contacted) _arc = 'shadowhands';
          else if (_f2.stage2_wardens_contact)            _arc = 'wardens';
          else if (_f2.red_hood_contact)                  _arc = 'redhood';
          log('[G2 ' + tag + '] pick=' + picks + ' sp2=' + _sp2Live + ' arc=' + _arc
            + ' faction_contact=' + !!_f2.stage2_faction_contact_made
            + ' miniboss=' + !!_f2.stage2_miniboss_complete
            + ' antechamber=' + !!_f2.stage2_antechamber_done
            + ' climax_started=' + !!_f2.stage2_climax_started
            + ' climax_done=' + !!(_f2.stage2_climax_complete || _f2.maren_oss_resolved));
          _lastLoggedSP2 = _sp2Live;
        }
      }
      if (sp1 === lastSP1) { noProgress++; } else { noProgress = 0; lastSP1 = sp1; }
      if (noProgress === 20) {
        forcePlotMain = picks + 5;
        log(`[run:${tag}] pick=${picks} sp1=${sp1} — stalled, forcing plot-main x5`);
      }

      // Stuck-location guard: same location for 30+ picks with no sp progress → escape
      if (g.location === lastLocation) { stuckAtLoc++; } else { stuckAtLoc = 0; lastLocation = g.location; }
      if (stuckAtLoc >= 30) {
        const escLoc = ESCAPE_LOCS.find(l => l !== g.location) || 'shelkopolis';
        log(`[escape ${tag}] pick=${picks} stuck at "${g.location}" for ${stuckAtLoc} picks — teleporting to ${escLoc}`);
        try {
          await page.evaluate((loc) => {
            if (typeof G !== 'undefined') {
              G.tensionLevel = 0;
              G.location = loc;
            }
            if (typeof _travelCoreTravelTo === 'function') _travelCoreTravelTo(loc);
            else if (typeof loadStageChoices === 'function') loadStageChoices();
          }, escLoc);
          await page.waitForTimeout(400); // Let corridor encounter setTimeout(300ms) fire + DOM settle
        } catch (_) {}
        stuckAtLoc = 0;
        lastPickLabels = [];
        lastMapTravelPick = picks;
        visitedLocalities.add(escLoc);
      }


      // Choice slate every 10 picks
      if (picks % 10 === 0) {
        const snap = await snapshotChoices(page);
        const pm   = snap.filter(s => s.cls.includes('plot-main')).length;
        const cb   = snap.filter(s => s.cls.includes('combat-btn')).length;
        log(`[choices ${tag}] pick=${picks} total=${snap.length} plotMain=${pm} combat=${cb}`);
      }

      const inCombat = await page.locator('.choice-btn.combat-btn:visible').count().then(n => n > 0).catch(() => false);
      if (inCombat) log(`[combat ${tag}] pick=${picks} — combat UI active`);

      await dismissOverlays(page);

      const result = await pickChoice(page, picks, picks < forcePlotMain);
      if (!result.clicked) { await page.waitForTimeout(600); continue; }
      log(`[pick ${tag}] #${picks + 1} plotMain=${result.isPlotMain} combat=${result.isCombat} "${result.text.slice(0, 60)}"`);
      picks++;
      lastPickTime = Date.now();
      const _econ = await page.evaluate(function() {
        try {
          return { xp: G.xp || 0, gold: G.gold || 0,
            sp1: (G.stageProgress && G.stageProgress[1]) || 0,
            sp2: (G.stageProgress && G.stageProgress[2]) || 0,
            level: G.level || 1, stage: G.stage || 'Stage I' };
        } catch(e) { return {}; }
      }).catch(function() { return {}; });
      if (_econ.xp !== undefined) {
        console.log('[pick ' + picks + '] xp=' + _econ.xp + ' gold=' + _econ.gold +
          ' sp1=' + _econ.sp1 + ' sp2=' + _econ.sp2 + ' L' + _econ.level + ' ' + _econ.stage);
      }
      await page.waitForTimeout(PACE.betweenCombat);

      // Same-label loop detection: 3 identical picks in a row = stuck in tension loop
      const pickLabel = result.text.slice(0, 60);
      lastPickLabels.push(pickLabel);
      if (lastPickLabels.length > 3) lastPickLabels.shift();
      if (lastPickLabels.length === 3 && lastPickLabels.every(l => l === lastPickLabels[0])) {
        log(`[loop-detect ${tag}] pick=${picks} same label 3x: "${pickLabel}" — forcing tension reset + escape`);
        try {
          await page.evaluate((escLocs) => {
            if (typeof G !== 'undefined') {
              G.tensionLevel = 0;
              const cur = G.location || '';
              const dest = escLocs.find(l => l !== cur) || 'shelkopolis';
              G.location = dest;
              if (typeof _travelCoreTravelTo === 'function') _travelCoreTravelTo(dest);
              else if (typeof loadStageChoices === 'function') loadStageChoices();
            }
          }, ESCAPE_LOCS);
          await page.waitForTimeout(400); // Let corridor encounter setTimeout(300ms) fire + DOM settle
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
      log(`[run:${tag}] loop-error pick=${picks}: ${loopErr.message}`);
    }
  }

  // Hard cap assert after run — violations logged above; assert here so test suite reports failures
  if (capViolations.length) {
    log('[CAP_SUMMARY ' + tag + '] ' + capViolations.length + ' cap violation(s): ' + JSON.stringify(capViolations.slice(0, 5)));
  }
  expect(capViolations.length, 'Choice panel exceeded 8 — see CAP_VIOLATION log lines').toBe(0);

  g = await readG(page);
  await screenshot(page, `${tag}_timeout_p${picks}`);
  log(`[run:${tag}] TIMEOUT picks=${picks} sp1=${(g.stageProgress && g.stageProgress[1]) || 0} sp2=${(g.stageProgress && g.stageProgress[2]) || 0}`);
  return { success: false, reason: 'max-picks', picks, g };
}

// ---------------------------------------------------------------------------
// Helper: run a family loop and return { success, familyResult }
// ---------------------------------------------------------------------------
async function runFamily(browser, family, pools, jsErrors, mode, firstAttemptOverride, familyCeiling, ceiling, tracker) {
  const START = Date.now();
  let success    = false;
  let attemptNum = 0;
  let pool       = buildPool(family, pools);
  let poolIdx    = 0;
  let result;

  while (!success) {
    if (familyCeiling && (Date.now() - START) > familyCeiling) {
      log(`[family:${family}] CEILING HIT — stopping after ${Math.round((Date.now()-START)/60000)} min`);
      return { success: false, attempts: attemptNum, reason: 'ceiling' };
    }

    attemptNum++;
    let archetypeId, backgroundId;
    if (attemptNum === 1 && firstAttemptOverride) {
      ({ archetypeId, backgroundId } = firstAttemptOverride);
    } else {
      if (poolIdx >= pool.length) { pool = buildPool(family, pools); poolIdx = 0; }
      ({ archetypeId, backgroundId } = pool[poolIdx++]);
    }

    log(`[family:${family}] attempt ${attemptNum} → ${archetypeId}/${backgroundId}`);

    const videoRunDir = path.join(VIDEO_DIR, `${family}_a${attemptNum}_${archetypeId}`);
    fs.mkdirSync(videoRunDir, { recursive: true });
    const context = await browser.newContext({
      recordVideo: { dir: videoRunDir, size: { width: 1280, height: 720 } },
    });
    const page = await context.newPage();
    page.setDefaultTimeout(10000); // prevent evaluate/locator from hanging indefinitely

    result = await runPlaythrough(page, archetypeId, backgroundId, family, attemptNum, jsErrors, mode, ceiling, tracker);

    try { await page.close(); }    catch (_) {}
    try { await context.close(); } catch (_) {}

    log(`[family:${family}] attempt ${attemptNum} ${result.success ? 'SUCCESS ✓' : `FAILED (${result.reason})`} picks=${result.picks}`);

    if (result && result.reason === 'timeout-soft') {
      log('[family:' + family + '] timeout-soft received — ending family, no retry');
      break;
    }

    if (result.success) {
      success = true;
      return { success: true, archetypeId, backgroundId, attempts: attemptNum, picks: result.picks, sp2: result.sp2, stage: result.stage };
    }
  }

  return { success: false, attempts: attemptNum };
}

// ===========================================================================
// TEST 1 — HEADLESS (4 families, 1 hour hard cap)
// Dynamic stage ceiling — automatically scales when Stage III content is built.
// Organic progression only — no sp1/sp2 injection. Coverage tracked per run.
// ===========================================================================
test.describe('Headless QA — 4 families', () => {
  test.setTimeout(62 * 60 * 1000); // 62 min outer ceiling

  test('headless 4-family playtest', async ({ browser }) => {
    initLog('headless');
    const jsErrors      = [];
    const familyResults = {};
    const HEADLESS_CAP  = 60 * 60 * 1000; // 1 hour
    const suiteStart    = Date.now();
    const tracker       = new CoverageTracker();
    const reporter      = new ReportWriter('headless');

    // Detect current stage ceiling once (e.g. 'Stage II' while canAdvanceToStage3=false)
    let ceiling = 'Stage II';
    try {
      const tmpCtx  = await browser.newContext();
      const tmpPage = await tmpCtx.newPage();
      await tmpPage.goto('/ledger-of-ash.html');
      await tmpPage.waitForFunction(() => typeof canAdvanceToStage3 === 'function', { timeout: 10000 }).catch(() => {});
      ceiling = await getStageCeiling(tmpPage);
      await tmpCtx.close();
    } catch (_) {}
    log(`[suite:headless] Stage ceiling detected: ${ceilingLabel(ceiling)}`);
    reporter.setCeiling(ceiling);

    for (const family of HEADLESS_FAMILY_ORDER) {
      if ((Date.now() - suiteStart) >= HEADLESS_CAP) {
        log(`[suite:headless] 1hr cap reached — stopping before family:${family}`);
        break;
      }

      log(`\n${'='.repeat(60)}`);
      log(`[family:${family}] starting (headless)`);
      log('='.repeat(60));

      const remaining = HEADLESS_CAP - (Date.now() - suiteStart);
      const familyCap = Math.min(remaining, Math.floor(HEADLESS_CAP / 4));
      const r = await runFamily(browser, family, HEADLESS_FAMILY_POOLS, jsErrors, 'headless', null, familyCap, ceiling, tracker);
      familyResults[family] = r;
      reporter.addFamily({ family, ...r });
      if (r.success) {
        log(`[family:${family}] DONE after ${r.attempts} attempt(s) — ${r.archetypeId}/${r.backgroundId} ${r.picks} picks`);
      }
    }

    // Second pass: retry failed families once
    const failedFamilies = Object.entries(familyResults).filter(([, r]) => !r.success).map(([fam]) => fam);
    if (failedFamilies.length > 0) {
      log(`[headless] ${failedFamilies.length} famil${failedFamilies.length === 1 ? 'y' : 'ies'} failed — re-running: ${failedFamilies.join(', ')}`);
      for (const family of failedFamilies) {
        if ((Date.now() - suiteStart) >= HEADLESS_CAP) {
          log(`[suite:headless] 1hr cap reached — stopping retry for family:${family}`);
          break;
        }
        const retryTag = `${family}_retry`;
        log(`\n${'='.repeat(60)}`);
        log(`[family:${retryTag}] re-running (headless retry)`);
        log('='.repeat(60));
        const remaining = HEADLESS_CAP - (Date.now() - suiteStart);
        const retryCap = Math.min(remaining, Math.floor(HEADLESS_CAP / 4));
        const r = await runFamily(browser, family, HEADLESS_FAMILY_POOLS, jsErrors, 'headless', null, retryCap, ceiling, tracker);
        familyResults[retryTag] = r;
        reporter.addFamily({ family: retryTag, ...r });
        if (r.success) {
          log(`[family:${retryTag}] DONE after ${r.attempts} attempt(s) — ${r.archetypeId}/${r.backgroundId} ${r.picks} picks`);
        }
      }
    }

    // Summary
    log('\n' + '='.repeat(60));
    log(`[suite:headless] COMPLETE — ceiling=${ceiling} (1hr cap or all 4 families done)`);
    for (const [fam, r] of Object.entries(familyResults)) {
      log(`  ${fam}: ${r.success ? `SUCCESS ${r.archetypeId}/${r.backgroundId} ${r.attempts} attempts ${r.picks} picks` : `incomplete (${r.attempts} attempts)`}`);
    }
    if (jsErrors.length) {
      log(`\n[js-errors] ${jsErrors.length} total:`);
      jsErrors.slice(0, 20).forEach(e => log(`  [${e.tag}] ${e.msg}`));
    }

    // Coverage summary
    const coverage = tracker.getSummary();
    log(`[coverage] localities visited: ${coverage.localitiesVisited} | dead-ends: ${coverage.deadEnds.length} | map travels: ${coverage.mapTravels.length}`);
    if (coverage.coverageGaps.length) {
      log(`[coverage-gaps] localities visited with 0 sp2: ${coverage.coverageGaps.join(', ')}`);
    }

    // Wire pageerror events into reporter so JS errors appear in the report
    jsErrors.forEach(e => reporter.addJsError(`[${e.tag}] ${e.msg}`));

    // Write structured report
    try {
      const reportPath = reporter.write(coverage, 291); // 291 = known warning baseline
      log(`[report] written: ${reportPath}`);
    } catch (e) { log(`[report] write failed: ${e.message}`); }

    log('='.repeat(60));
  });
});

// TEST 2 (headed) lives in playtest-headed.spec.js
