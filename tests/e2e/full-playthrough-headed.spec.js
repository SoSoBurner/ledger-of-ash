// @ts-check
/**
 * full-playthrough-headed.spec.js
 * Headed QA harness — 4 families, 8 hr ceiling, autonomous repair loop.
 *
 * Shares all utility functions with full-playthrough.spec.js (copy-owned here
 * to avoid a runtime require() dependency across Playwright workers).
 *
 * Run after the headless spec:
 *   npx playwright test tests/e2e/full-playthrough-headed.spec.js
 */

const { test } = require('@playwright/test');
const fs   = require('fs');
const path = require('path');

// Headed mode — top-level, uses top-level key to override playwright.config.js's headless:true
test.use({ headless: false });

// ---------------------------------------------------------------------------
// Output dirs
// ---------------------------------------------------------------------------
const TEST_RESULTS   = path.resolve(__dirname, '../../test-results');
const SCREENSHOT_DIR = path.join(TEST_RESULTS, 'playthrough-screenshots');
const VIDEO_DIR      = path.join(TEST_RESULTS, 'videos');

// ---------------------------------------------------------------------------
// 4-family pools
// ---------------------------------------------------------------------------
const HEADED_FAMILY_ORDER = ['classic-combat', 'magic-spellcasting', 'stealth-precision', 'support-leadership'];

const HEADED_FAMILY_POOLS = {
  'classic-combat':     ['warrior','knight','berserker','warlord','warden','death_knight','archer'],
  'magic-spellcasting': ['paladin','spellthief','ranger'],
  'stealth-precision':  ['rogue','assassin','scout_c','thief','trickster','beastmaster'],
  'support-leadership': ['healer','artificer','engineer','tactician','alchemist','saint','bard'],
};

// Fixed first attempt per family
const HEADED_FIRST_ATTEMPT = {
  'classic-combat':     { archetypeId: 'warrior', backgroundId: 'w_garrison' },
  'magic-spellcasting': { archetypeId: 'paladin', backgroundId: 'p_cysur'    },
  'stealth-precision':  { archetypeId: 'rogue',   backgroundId: 'ro_shelk'   },
  'support-leadership': { archetypeId: 'healer',  backgroundId: 'hl_shelk'   },
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
let _logPath = path.join(TEST_RESULTS, 'full-playthrough-log-headed.md');
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
        location:      G.location,
        tensionLevel:  G.tensionLevel,
        level:         G.level,
        day:           G.dayCount,
        dead:          G.dead,
        hp:            G.hp,
        heat:          G.heat ? { ...G.heat } : {},
        masteryXP:     G.masteryXP || 0,
        companions:    (G.companions || []).length,
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

async function isSuccess(page) {
  return page.evaluate(() => {
    try {
      if (typeof G === 'undefined') return false;
      const sp2        = (G.stageProgress && G.stageProgress[2]) || 0;
      const climaxDone = !!(G.flags && (G.flags.stage2_climax_complete || G.flags.maren_oss_resolved));
      return G.stage === 'Stage III' || (climaxDone && sp2 >= 18);
    } catch (_) { return false; }
  }).catch(() => false);
}

async function isDead(page) {
  try { return await page.locator('#screen-death,.death-screen,#death-overlay').isVisible({ timeout: 400 }); }
  catch (_) { return false; }
}

async function closeOverlay(page) {
  try {
    await page.evaluate(() => {
      document.querySelectorAll('.overlay.active').forEach(el => el.classList.remove('active'));
    });
    // Wait for overlays to fully hide (CSS transition) before returning
    await page.waitForSelector('.overlay.active', { state: 'hidden', timeout: 1000 }).catch(() => {});
    await page.waitForTimeout(100);
  } catch (_) {}
}

async function dismissOverlays(page) {
  for (let i = 0; i < 8; i++) {
    try {
      // Catch both .overlay.active and any modal/panel that has a close button but no .active class
      const ov = page.locator('.overlay.active, #how-to-play-modal, #notice-board-modal, [id$="-modal"]:visible, .modal:visible').first();
      if (!await ov.isVisible({ timeout: 300 }).catch(() => false)) break;
      const btn = ov.locator('button.overlay-close,.overlay-close,button:has-text("×"),button:has-text("Close"),button:has-text("Done"),button:has-text("OK")').first();
      if (await btn.isVisible({ timeout: 300 }).catch(() => false)) await btn.click();
      else await page.keyboard.press('Escape');
      await page.waitForTimeout(PACE.short);
    } catch (_) { break; }
  }
  // Fallback: remove active class from any remaining overlays
  await page.evaluate(() => {
    document.querySelectorAll('.overlay.active').forEach(el => el.classList.remove('active'));
  }).catch(() => {});
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
  try {
    const modal = page.locator('#levelup-modal.active').first();
    if (await modal.isVisible({ timeout: 400 }).catch(() => false)) {
      const pick = modal.locator('.lu-option').first();
      if (await pick.isVisible({ timeout: 500 }).catch(() => false)) {
        await pick.click();
        await page.waitForTimeout(PACE.afterLevelup);
        const g = await readG(page);
        log(`[panel:level-up ${tag}] lvl=${g.level} modal-pick — PASS`);
        return true;
      }
    }
    const block = page.locator('.levelup-block:visible').first();
    if (await block.isVisible({ timeout: 400 }).catch(() => false)) {
      const optBtn = block.locator('.levelup-option button,.levelup-btn').first();
      if (await optBtn.isVisible({ timeout: 400 }).catch(() => false)) {
        await optBtn.click();
        await page.waitForTimeout(PACE.afterLevelup);
        const g = await readG(page);
        await screenshot(page, `${tag}_levelup_lvl${g.level}`);
        log(`[panel:level-up ${tag}] lvl=${g.level} — PASS`);
        return true;
      }
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

async function probeCharSheet(page, tag, g) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    if (!await openOverlay(page, '#btn-charsheet', '#overlay-charsheet')) { log(`[panel:char-sheet ${tag}] SKIP`); return; }
    await screenshot(page, `${tag}_charsheet_lvl${g.level}`);
    const txt     = await page.locator('#sheet-body,#overlay-charsheet').first().innerText().catch(() => '');
    const skills  = /Might|Finesse|Vigor|Wits|Charm|Spirit/i.test(txt);
    const traits  = /Abilities|Traits|Active|Passive/i.test(txt);
    const hasNums = /\d/.test(txt);
    const objObj  = txt.includes('[object Object]');
    // Log all visible text for review
    log(`[panel:char-sheet ${tag}] lvl=${g.level} skills=${skills} traits=${traits} nums=${hasNums} objObj=${objObj} text="${txt.slice(0,120).replace(/\n/g,' ')}"`);
    if (objObj) log(`[panel:char-sheet ${tag}] VIOLATION: [object Object] in char sheet`);
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
    const txt     = await page.locator('#journal-overlay-body,[id*="journal"]').first().innerText().catch(() => '');
    const objObj  = txt.includes('[object Object]');
    const hasInv  = /iron blade|courier satchel|field kit/i.test(txt);
    // Check for journal categories in text
    const hasCats = /evidence|intelligence|rumor|discovery|complication/i.test(txt);
    log(`[panel:journal ${tag}] day=${g.day} objObj=${objObj} invLeak=${hasInv} categories=${hasCats} text="${txt.slice(0,120).replace(/\n/g,' ')}"`);
    if (objObj)  log(`[panel:journal ${tag}] VIOLATION: [object Object] in journal`);
    if (hasInv)  log(`[panel:journal ${tag}] VIOLATION: inventory item leaked into journal`);
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
    const txt     = await page.locator('#overlay-camp,[id*="camp"]').first().innerText().catch(() => '');
    // Check all camp action buttons exist
    const rest    = await page.locator('[data-camp="rest"]').isVisible({ timeout: 600 }).catch(() => false);
    const sleep   = await page.locator('[data-camp="sleep"]').isVisible({ timeout: 600 }).catch(() => false);
    const train   = await page.locator('[data-camp="train"]').isVisible({ timeout: 600 }).catch(() => false);
    const craft   = await page.locator('[data-camp="craft"],#btn-craft').isVisible({ timeout: 600 }).catch(() => false);
    const recover = /Recover|Rest|Sleep/i.test(txt);
    const act     = /Act|Train|Craft/i.test(txt);
    log(`[panel:camp ${tag}] day=${g.day} rest=${rest} sleep=${sleep} train=${train} craft=${craft} recover=${recover} act=${act}`);
    if (!rest || !sleep) log(`[panel:camp ${tag}] WARN: missing core camp actions`);
    // Screenshot full camp text for review
    log(`[panel:camp ${tag}] text="${txt.slice(0,150).replace(/\n/g,' ')}"`);
    await closeSpecificOverlay(page, 'overlay-camp');
  } catch (err) {
    log(`[panel:camp ${tag}] WARN: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

async function probeInventory(page, tag) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    const btn = page.locator('#btn-inventory,button:has-text("Inventory")').first();
    if (!await btn.isVisible({ timeout: 800 }).catch(() => false)) { log(`[panel:inventory ${tag}] SKIP`); return; }
    await btn.click();
    await page.waitForTimeout(PACE.panelDwell);
    await screenshot(page, `${tag}_inventory_open`);
    const txt = await page.locator('.overlay.active,[id*="inventory"]').first().innerText().catch(() => '');
    log(`[panel:inventory ${tag}] chars=${txt.length} text="${txt.slice(0,120).replace(/\n/g,' ')}"`);
    // Try to equip the first available item
    const equipBtn = page.locator('button:has-text("Equip"),button:has-text("equip"),.equip-btn').first();
    if (await equipBtn.isVisible({ timeout: 800 }).catch(() => false)) {
      await equipBtn.click();
      await page.waitForTimeout(PACE.short);
      await screenshot(page, `${tag}_inventory_equip`);
      log(`[panel:inventory ${tag}] equip-attempt: clicked first equip button`);
    } else {
      log(`[panel:inventory ${tag}] equip: no equip buttons visible`);
    }
    await closeOverlay(page);
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
    const hasLocs  = await page.locator('#map-body button,[data-locid]').count().catch(() => 0);
    const objObj   = txt.includes('[object Object]');
    log(`[panel:map ${tag}] loc=${g.location} locButtons=${hasLocs} objObj=${objObj} text="${txt.slice(0,80).replace(/\n/g,' ')}"`);
    await closeSpecificOverlay(page, 'overlay-map');
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
    const txt    = await page.locator('#notices-overlay-body,#overlay-notices').first().innerText().catch(() => '');
    const objObj = txt.includes('[object Object]');
    log(`[panel:notices ${tag}] objObj=${objObj} chars=${txt.length} text="${txt.slice(0,100).replace(/\n/g,' ')}"`);
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
    const txt    = await page.locator('#npc-overlay-body,#overlay-npcs').first().innerText().catch(() => '');
    const objObj = txt.includes('[object Object]');
    log(`[panel:contacts ${tag}] objObj=${objObj} chars=${txt.length} text="${txt.slice(0,100).replace(/\n/g,' ')}"`);
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
    const txt    = await page.locator('#party-overlay-body,#overlay-party').first().innerText().catch(() => '');
    const objObj = txt.includes('[object Object]');
    log(`[panel:party ${tag}] objObj=${objObj} chars=${txt.length} text="${txt.slice(0,100).replace(/\n/g,' ')}"`);
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
    const txt = await page.locator('.overlay.active,[id*="shop"]').first().innerText().catch(() => '');
    log(`[panel:shop ${tag}] loc=${g.location} chars=${txt.length} text="${txt.slice(0,80).replace(/\n/g,' ')}"`);
    await closeOverlay(page);
  } catch (err) {
    log(`[panel:shop ${tag}] WARN: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

async function probeQuestHUD(page, tag) {
  try {
    const el  = page.locator('#quest-hud,#hud-quest,[id*="quest"]').first();
    if (!await el.isVisible({ timeout: 600 }).catch(() => false)) { log(`[panel:quest-hud ${tag}] SKIP`); return; }
    const txt = await el.innerText().catch(() => '');
    const objObj = txt.includes('[object Object]');
    log(`[panel:quest-hud ${tag}] — ${!objObj ? 'PASS' : 'FAIL'}: "${txt.slice(0,80)}"`);
  } catch (err) { log(`[panel:quest-hud ${tag}] WARN: ${err.message}`); }
}

async function probeHeatHUD(page, tag, g) {
  try {
    const el         = page.locator('#heat-hud,#hud-heat,[id*="heat"]').first();
    const visible    = await el.isVisible({ timeout: 600 }).catch(() => false);
    const totalHeat  = Object.values(g.heat || {}).reduce((a, b) => a + b, 0);
    if (!visible && totalHeat > 0) log(`[panel:heat-hud ${tag}] WARN: heat=${totalHeat} but HUD hidden`);
    else if (visible) { const txt = await el.innerText().catch(() => ''); log(`[panel:heat-hud ${tag}] PASS heat=${totalHeat} "${txt.slice(0,60)}"`); }
    else log(`[panel:heat-hud ${tag}] PASS: no heat`);
  } catch (err) { log(`[panel:heat-hud ${tag}] WARN: ${err.message}`); }
}

async function probeAlignmentBars(page, tag) {
  try {
    const el      = page.locator('[class*="alignment"],[id*="benevolence"]').first();
    const visible = await el.isVisible({ timeout: 600 }).catch(() => false);
    if (visible) {
      const txt = await el.innerText().catch(() => '');
      log(`[panel:alignment ${tag}] PASS: "${txt.slice(0,60)}"`);
    } else {
      log(`[panel:alignment ${tag}] SKIP`);
    }
  } catch (err) { log(`[panel:alignment ${tag}] WARN: ${err.message}`); }
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
    const txt      = await page.locator('#howto-modal').innerText().catch(() => '');
    const hasH2    = await page.locator('#howto-modal h2,#howto-modal h3').count().catch(() => 0);
    const objObj   = txt.includes('[object Object]');
    log(`[panel:howtoplay ${tag}] headers=${hasH2} objObj=${objObj} text="${txt.slice(0,120).replace(/\n/g,' ')}"`);
    const closeBtn = page.locator('#howto-close,[data-close="howto-modal"],#howto-modal button').first();
    if (await closeBtn.isVisible({ timeout: 600 }).catch(() => false)) await closeBtn.click();
    else { await page.keyboard.press('Escape'); await closeOverlay(page); }
  } catch (err) {
    log(`[panel:howtoplay ${tag}] WARN: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

let _lastProbedAtPick = -1;
async function runFullPanelSimulation(page, tag, g, picks) {
  if (picks > 0 && picks % PROBE_EVERY === 0 && picks !== _lastProbedAtPick) {
    _lastProbedAtPick = picks;
    await dismissOverlays(page);
    await probeCharSheet(page, tag, g);
    await probeJournal(page, tag, g);
    await probeQuestHUD(page, tag);
    await probeHeatHUD(page, tag, g);
    await probeAlignmentBars(page, tag);
    await probeMap(page, tag, g);
    await probeNotices(page, tag);
    await probeContacts(page, tag);
    await probeParty(page, tag);
  }
  if (picks > 0 && picks % CAMP_EVERY === 0) {
    await dismissOverlays(page);
    await probeCamp(page, tag, g);
    await probeInventory(page, tag);
  }
  if (picks > 0 && picks % 80 === 0) {
    await probeShop(page, tag, g);
  }
  if (picks === 5) {
    await probeHowToPlay(page, tag);
  }
}

// ---------------------------------------------------------------------------
// Dead-end repair — 6-strategy autonomous recovery
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

  // R4: Blank-panel guard inject
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

  // R5: Tension/combat dead end — reset tensionLevel and clear CS
  try {
    await page.evaluate(() => {
      if (typeof G !== 'undefined') {
        G.tensionLevel = 0;
        try { if (typeof CS !== 'undefined') { CS = null; G.spentAbilities = {}; } } catch (_) {}
        if (typeof loadStageChoices === 'function' && G.location)
          loadStageChoices(G.location);
      }
    });
    await page.waitForTimeout(1500);
  } catch (_) {}
  if (await waitForChoices(page, 1200) > 0) { log(`[repair ${tag}] R5-tension-reset worked`); return true; }

  // R6: Navigate to a random Stage 1 locality
  try {
    await page.evaluate(() => {
      if (typeof G === 'undefined') return;
      const pool = window.STAGE_LOCALITY_POOL && window.STAGE_LOCALITY_POOL[1];
      const locs = pool ? Object.keys(pool) : ['shelkopolis'];
      G.location = locs[Math.floor(Math.random() * locs.length)];
      if (typeof loadStageChoices === 'function') loadStageChoices(G.location);
    });
    await page.waitForTimeout(1500);
  } catch (_) {}
  if (await waitForChoices(page, 1200) > 0) { log(`[repair ${tag}] R6-location-change worked`); return true; }

  log(`[repair ${tag}] ALL strategies exhausted pick=${pickNum}`);
  return false;
}

// ---------------------------------------------------------------------------
// Single playthrough
// ---------------------------------------------------------------------------
async function runPlaythrough(page, archetypeId, backgroundId, family, attemptNum, jsErrors) {
  const tag = `${family}_${archetypeId}_a${attemptNum}`;
  log(`\n[run:${tag}] starting archetype=${archetypeId} bg=${backgroundId} family=${family}`);

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

  let picks         = 0;
  let deadStreak    = 0;
  let lastSP1       = 0;
  let noProgress    = 0;
  let forcePlotMain = 0;
  let lastLoggedSP1 = -1;
  let lastPickLabels = [];
  let lastPickTime   = Date.now();
  let lastLocation   = '';
  let stuckAtLoc     = 0;
  const ESCAPE_LOCS  = ['shelkopolis','cosmouth','zootia','roaz','soreheim'];

  while (picks < MAX_PICKS) {
    if (pageIsClosed) break;

    try {
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
      if (await isSuccess(page)) {
        g = await readG(page);
        await screenshot(page, `${tag}_success_p${picks}`);
        log(`[run:${tag}] SUCCESS pick=${picks} stage=${g.stage} sp2=${(g.stageProgress && g.stageProgress[2]) || 0}`);
        return { success: true, reason: 'stage3-gate', picks, g };
      }

      await handleLevelup(page, tag);
      g = await readG(page);

      await runFullPanelSimulation(page, tag, g, picks);

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

      if (choiceCount === 0) {
        deadStreak++;
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
        try {
          await page.evaluate((loc) => {
            if (typeof G !== 'undefined') { G.tensionLevel = 0; G.location = loc; }
            if (typeof _travelCoreTravelTo === 'function') _travelCoreTravelTo(loc);
            else if (typeof loadStageChoices === 'function') loadStageChoices();
          }, escLoc);
        } catch (_) {}
        stuckAtLoc = 0;
        lastPickLabels = [];
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
      if (narrativeText) log(`[narrative ${tag}] pick=${picks}: "${narrativeText.slice(0, 120)}"`);

      if (picks % 10 === 0) {
        const snap = await snapshotChoices(page);
        const pm   = snap.filter(s => s.cls.includes('plot-main')).length;
        const cb   = snap.filter(s => s.cls.includes('combat-btn')).length;
        log(`[choices ${tag}] pick=${picks} total=${snap.length} plotMain=${pm} combat=${cb}`);
        auditChoiceLabels(snap, tag, picks);
      }

      await dismissOverlays(page);
      const result = await pickChoice(page, picks, picks < forcePlotMain);
      if (!result.clicked) { await page.waitForTimeout(600); continue; }
      log(`[pick ${tag}] #${picks + 1} plotMain=${result.isPlotMain} combat=${result.isCombat} "${result.text.slice(0, 60)}"`);
      picks++;
      lastPickTime = Date.now();
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
              // Clear combat state so combat choices don't re-render after teleport
              try { if (typeof CS !== 'undefined') { CS = null; G.spentAbilities = {}; } } catch (_) {}
              const cur = G.location || '';
              const dest = escLocs.find(l => l !== cur) || 'shelkopolis';
              G.location = dest;
              if (typeof _travelCoreTravelTo === 'function') _travelCoreTravelTo(dest);
              else if (typeof loadStageChoices === 'function') loadStageChoices();
            }
          }, ESCAPE_LOCS);
        } catch (_) {}
        lastPickLabels = [];
        stuckAtLoc = 0;
      }

    } catch (loopErr) {
      if (pageIsClosed || String(loopErr).includes('Target page') || String(loopErr).includes('context or browser')) {
        log(`[run:${tag}] PAGE CLOSED mid-loop pick=${picks}`);
        return { success: false, reason: 'page-closed', picks, g };
      }
      log(`[run:${tag}] loop-error pick=${picks}: ${loopErr.message}`);
    }
  }

  g = await readG(page);
  await screenshot(page, `${tag}_timeout_p${picks}`);
  log(`[run:${tag}] TIMEOUT picks=${picks} sp1=${(g.stageProgress && g.stageProgress[1]) || 0} sp2=${(g.stageProgress && g.stageProgress[2]) || 0}`);
  return { success: false, reason: 'max-picks', picks, g };
}

// ===========================================================================
// TEST — HEADED 4-family, 8hr ceiling
// ===========================================================================
test.describe('Headed QA — 4 families', () => {
  test.setTimeout(8.5 * 60 * 60 * 1000);

  test('headed 4-family playtest with repair', async ({ browser }) => {
    initLog();
    const jsErrors      = [];
    const familyResults = {};
    const HEADED_CAP    = 8 * 60 * 60 * 1000;
    const suiteStart    = Date.now();

    for (const family of HEADED_FAMILY_ORDER) {
      if ((Date.now() - suiteStart) >= HEADED_CAP) {
        log(`[suite:headed] 8hr cap — stopping before family:${family}`);
        break;
      }

      log(`\n${'='.repeat(60)}`);
      log(`[family:${family}] starting (headed)`);
      log('='.repeat(60));

      let success    = false;
      let attemptNum = 0;
      let pool       = buildPool(family);
      let poolIdx    = 0;

      while (!success) {
        if ((Date.now() - suiteStart) >= HEADED_CAP) {
          log(`[family:${family}] ceiling hit mid-family`);
          break;
        }

        attemptNum++;
        let archetypeId, backgroundId;
        if (attemptNum === 1 && HEADED_FIRST_ATTEMPT[family]) {
          ({ archetypeId, backgroundId } = HEADED_FIRST_ATTEMPT[family]);
        } else {
          if (poolIdx >= pool.length) { pool = buildPool(family); poolIdx = 0; }
          ({ archetypeId, backgroundId } = pool[poolIdx++]);
        }

        log(`[family:${family}] attempt ${attemptNum} → ${archetypeId}/${backgroundId}`);

        const videoDir = path.join(VIDEO_DIR, `${family}_a${attemptNum}_${archetypeId}`);
        fs.mkdirSync(videoDir, { recursive: true });
        const context = await browser.newContext({
          recordVideo: { dir: videoDir, size: { width: 1280, height: 720 } },
        });
        const page = await context.newPage();
        page.setDefaultTimeout(10000); // prevent evaluate/locator from hanging indefinitely

        const result = await runPlaythrough(page, archetypeId, backgroundId, family, attemptNum, jsErrors);

        try { await page.close(); }    catch (_) {}
        try { await context.close(); } catch (_) {}

        log(`[family:${family}] attempt ${attemptNum} ${result.success ? 'SUCCESS ✓' : `FAILED (${result.reason})`} picks=${result.picks}`);

        if (result.success) {
          success = true;
          familyResults[family] = { archetypeId, backgroundId, attempts: attemptNum, picks: result.picks };
        }
      }

      if (!familyResults[family]) {
        familyResults[family] = { success: false, attempts: attemptNum };
      }
    }

    // Final summary
    log('\n' + '='.repeat(60));
    log('[suite:headed] COMPLETE');
    for (const [fam, r] of Object.entries(familyResults)) {
      log(`  ${fam}: ${r.success !== false ? `SUCCESS ${r.archetypeId}/${r.backgroundId} ${r.attempts} attempts ${r.picks} picks` : `incomplete (${r.attempts} attempts)`}`);
    }
    if (jsErrors.length) {
      log(`\n[js-errors] ${jsErrors.length} total:`);
      jsErrors.slice(0, 30).forEach(e => log(`  [${e.tag}] ${e.msg}`));
    }
    log('='.repeat(60));
  });
});
