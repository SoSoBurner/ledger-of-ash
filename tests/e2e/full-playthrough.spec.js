// @ts-check
/**
 * full-playthrough.spec.js
 * Autonomous 3-family QA harness: combat / stealth / support
 *
 * Runs until ONE archetype from each family reaches the Stage 3 gate
 * (full Stage 1 + Stage 2 completion). Retries with a different random
 * archetype+background from the same family on every failure — no human
 * steps between retries. Records video of every run.
 */

const { test } = require('@playwright/test');
const fs   = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Output directories
// ---------------------------------------------------------------------------
const TEST_RESULTS  = path.resolve(__dirname, '../../test-results');
const SCREENSHOT_DIR = path.join(TEST_RESULTS, 'playthrough-screenshots');
const VIDEO_DIR      = path.join(TEST_RESULTS, 'videos');
const LOG_PATH       = path.join(TEST_RESULTS, 'full-playthrough-log.md');

// ---------------------------------------------------------------------------
// Archetype pools — one entry per family, randomised on each attempt
// ---------------------------------------------------------------------------
const FAMILY_ORDER = ['combat', 'stealth', 'support'];

const FAMILY_POOLS = {
  combat:  ['warrior','knight','ranger','paladin','archer','berserker','warden','warlord','death_knight'],
  stealth: ['rogue','assassin','spellthief','scout_c','thief','trickster','beastmaster'],
  support: ['healer','artificer','engineer','tactician','alchemist','saint','bard'],
};

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

// Human-readable name for log
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
};

const MAX_PICKS    = 350;
const PROBE_EVERY  = 20;
const CAMP_EVERY   = 60;
const SCREENSHOT_EVERY = 20;

// ---------------------------------------------------------------------------
// Log
// ---------------------------------------------------------------------------
const bugLog = [];
let ssCounter = Date.now();

function log(entry) {
  bugLog.push(entry);
  console.log(entry);
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Build a shuffled pool of all {archetypeId, backgroundId} combos for a family. */
function buildPool(family) {
  const combos = [];
  for (const archId of FAMILY_POOLS[family]) {
    const bgs = ARCHETYPE_BACKGROUNDS[archId] || [];
    for (const bgId of bgs) {
      combos.push({ archetypeId: archId, backgroundId: bgId });
    }
  }
  return shuffle(combos);
}

async function screenshot(page, tag) {
  try {
    ssCounter++;
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
    const p = path.join(SCREENSHOT_DIR, `${ssCounter}_${tag.replace(/[^a-z0-9_-]/gi,'_')}.png`);
    await page.screenshot({ path: p, fullPage: false });
    return p;
  } catch (_) { return null; }
}

// ---------------------------------------------------------------------------
// Page read helpers
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

/** Strict success: Stage 3 gate reached (full Stage 2 cleared). */
async function isSuccess(page) {
  return page.evaluate(() => {
    try {
      if (typeof G === 'undefined') return false;
      const sp2 = (G.stageProgress && G.stageProgress[2]) || 0;
      const climaxDone = !!(G.flags && (G.flags.stage2_climax_complete || G.flags.maren_oss_resolved));
      return G.stage === 'Stage III' || (climaxDone && sp2 >= 12);
    } catch (_) { return false; }
  }).catch(() => false);
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
  for (let i = 0; i < 5; i++) {
    try {
      const ov = page.locator('.overlay.active').first();
      if (!await ov.isVisible({ timeout: 300 }).catch(() => false)) break;
      const btn = ov.locator('button.overlay-close,.overlay-close,button:has-text("×"),button:has-text("Close")').first();
      if (await btn.isVisible({ timeout: 300 }).catch(() => false)) await btn.click();
      else await page.keyboard.press('Escape');
      await page.waitForTimeout(PACE.short);
    } catch (_) { break; }
  }
}

// ---------------------------------------------------------------------------
// Character creation
// ---------------------------------------------------------------------------
async function createCharacter(page, archetypeId, backgroundId, family) {
  await page.goto('/ledger-of-ash.html');
  await page.evaluate(() => { try { localStorage.clear(); } catch (_) {} });
  await page.waitForSelector('#btn-new-legend', { state: 'visible', timeout: 15000 });
  await page.click('#btn-new-legend');

  // Name
  const name = ARCHETYPE_NAMES[archetypeId] || 'Traveller';
  await page.fill('#char-name', name);

  // Call game functions directly — card rows are collapsed (display:none) so DOM clicks are unreliable
  await page.waitForFunction(() => typeof selectArchetype === 'function', { timeout: 8000 });
  await page.evaluate((id) => selectArchetype(id), archetypeId);
  await page.waitForSelector('#bg-step', { state: 'visible', timeout: 5000 });
  await page.evaluate(({bgId, archId}) => selectBackground(bgId, archId), {bgId: backgroundId, archId: archetypeId});

  // Begin
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
  try {
    const block = page.locator('.levelup-block:visible').first();
    if (await block.isVisible({ timeout: 400 })) {
      const optBtn = block.locator('.levelup-option button').first();
      if (await optBtn.isVisible({ timeout: 400 })) {
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
// Choice picker — returns { clicked, text, isPlotMain, isCombat, tag }
// ---------------------------------------------------------------------------
async function pickChoice(page, pickNum, forcePlotMain) {
  const buttons = page.locator('.choice-btn:visible');
  const count   = await buttons.count();
  if (count === 0) return { clicked: false };

  const meta = async (loc) => {
    const txt = await loc.evaluate(b => (b.querySelector('.choice-text')||b).textContent.trim()).catch(() => '');
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

  // 2) force mode — retry plot-main briefly
  if (forcePlotMain) {
    await page.waitForTimeout(200);
    const pm2 = page.locator('.choice-btn.plot-main').first();
    if (await pm2.isVisible({ timeout: 600 }).catch(() => false)) {
      const m = await meta(pm2);
      await pm2.click();
      return { clicked: true, ...m };
    }
  }

  // 3) random every 5th pick
  if (pickNum % 5 === 0) {
    const idx = Math.floor(Math.random() * count);
    const btn = buttons.nth(idx);
    const m   = await meta(btn);
    await btn.click();
    return { clicked: true, ...m };
  }

  // 4) longest label
  const snap = await snapshotChoices(page);
  let bestIdx = 0, bestLen = -1;
  snap.forEach((s, i) => { if (s.text.length > bestLen) { bestLen = s.text.length; bestIdx = i; } });
  const btn = buttons.nth(bestIdx);
  const m   = await meta(btn);
  await btn.click();
  return { clicked: true, ...m };
}

// ---------------------------------------------------------------------------
// Panel probes
// ---------------------------------------------------------------------------
async function probeCharSheet(page, tag, g) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    await page.click('#btn-charsheet');
    await page.waitForSelector('#overlay-charsheet', { state: 'visible', timeout: 4000 });
    await screenshot(page, `${tag}_charsheet_lvl${g.level}`);

    const sheetText = await page.locator('#overlay-charsheet').innerText().catch(() => '');
    const traits    = await page.locator('#overlay-charsheet .traits,[class*="trait"]').first().isVisible({ timeout: 1000 }).catch(() => false);
    const names     = /Might|Finesse|Vigor|Wits|Charm|Spirit/i.test(sheetText);
    const xpOk      = g.level !== 1 || /120/.test(sheetText);

    // Mastery sub-tab
    const mastTab = page.locator('#overlay-charsheet button:has-text("Mastery")').first();
    if (await mastTab.isVisible({ timeout: 600 }).catch(() => false)) {
      await mastTab.click();
      await page.waitForTimeout(PACE.short);
      await screenshot(page, `${tag}_mastery_lvl${g.level}`);
    }

    log(`[panel:char-sheet ${tag}] lvl=${g.level} — ${(traits&&names&&xpOk)?'PASS':'WARN'}: traits=${traits} names=${names} xp=${xpOk}`);
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
    await screenshot(page, `${tag}_journal_day${g.day}`);

    const txt = await page.locator('[id*="journal"]').first().innerText().catch(() => '');
    const bad = txt.includes('[object Object]');
    log(`[panel:journal ${tag}] — ${bad?'FAIL':'PASS'}: objectObject=${bad}`);
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
    await screenshot(page, `${tag}_camp_day${g.day}`);
    log(`[panel:camp ${tag}] day=${g.day} — PASS`);
    await closeOverlay(page);
  } catch (err) {
    log(`[panel:camp ${tag}] WARN: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

// ---------------------------------------------------------------------------
// Dead-end recovery
// ---------------------------------------------------------------------------
async function handleDeadEnd(page, tag, pickNum) {
  const g    = await readG(page);
  const html = await actionHTML(page);
  await screenshot(page, `${tag}_deadend_p${pickNum}`);
  log(`[dead-end ${tag}] pick=${pickNum} loc=${g.location} tension=${g.tensionLevel} sp=${JSON.stringify(g.stageProgress)} html="${html.slice(0,200)}"`);

  // Recovery 1: Escape
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1000);
  if (await waitForChoices(page, 1000) > 0) { log(`[recovery ${tag}] Escape worked`); return true; }

  // Recovery 2: Camp
  try { await page.click('#btn-camp'); await page.waitForTimeout(2000); await closeOverlay(page); } catch (_) {}
  if (await waitForChoices(page, 1000) > 0) { log(`[recovery ${tag}] camp worked`); return true; }

  // Recovery 3: loadStageChoices
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
// Single playthrough — returns { success, reason, picks, g }
// ---------------------------------------------------------------------------
async function runPlaythrough(page, archetypeId, backgroundId, family, attemptNum, jsErrors) {
  const tag = `${family}_${archetypeId}_a${attemptNum}`;
  log(`\n[run:${tag}] starting archetype=${archetypeId} bg=${backgroundId} family=${family}`);

  let pageIsClosed = false;
  page.on('close', () => { pageIsClosed = true; log(`[run:${tag}] PAGE CLOSED`); });
  page.on('crash', () => { pageIsClosed = true; log(`[run:${tag}] PAGE CRASHED`); });
  page.on('pageerror', err => {
    jsErrors.push({ tag, msg: err.message });
    log(`[js-error ${tag}] ${err.message}`);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') log(`[console-error ${tag}] ${msg.text()}`);
  });

  try {
    await createCharacter(page, archetypeId, backgroundId, family);
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

  while (picks < MAX_PICKS) {
    if (pageIsClosed) break;

    try {
      // Terminal checks
      if (await isDead(page)) {
        g = await readG(page);
        await screenshot(page, `${tag}_death_p${picks}`);
        log(`[run:${tag}] DEAD pick=${picks} level=${g.level}`);
        return { success: false, reason: 'death', picks, g };
      }
      if (await isSuccess(page)) {
        g = await readG(page);
        await screenshot(page, `${tag}_success_p${picks}`);
        log(`[run:${tag}] SUCCESS pick=${picks} stage=${g.stage} sp2=${(g.stageProgress&&g.stageProgress[2])||0}`);
        return { success: true, reason: 'stage3-gate', picks, g };
      }

      // Level-up
      await handleLevelup(page, tag);

      // Read state
      g = await readG(page);

      // Panel probes
      if (picks > 0 && picks % PROBE_EVERY === 0) {
        await probeCharSheet(page, tag, g);
        await probeJournal(page, tag, g);
      }
      if (picks > 0 && picks % CAMP_EVERY === 0) {
        await probeCamp(page, tag, g);
      }

      // Periodic screenshot
      if (picks % SCREENSHOT_EVERY === 0) {
        await screenshot(page, `${tag}_p${picks}_sp${(g.stageProgress&&g.stageProgress[1])||0}`);
      }

      // Wait for result text to settle
      try {
        await Promise.race([
          page.waitForSelector('.result-text:visible',    { timeout: 2000 }),
          page.waitForSelector('.narrative-text:visible', { timeout: 2000 }),
        ]);
        await page.waitForTimeout(PACE.afterResult);
      } catch (_) {}

      // Wait for choices
      const choiceCount = await waitForChoices(page, PACE.waitChoices);

      // Dead-end detection
      if (choiceCount === 0) {
        deadStreak++;
        if (deadStreak >= 3) {
          const recovered = await handleDeadEnd(page, tag, picks);
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

      // stageProgress tracking
      g = await readG(page);
      const sp1 = (g.stageProgress && g.stageProgress[1]) || 0;
      if (sp1 !== lastLoggedSP1) {
        log(`[G ${tag}] pick=${picks} sp1=${sp1} sp2=${(g.stageProgress&&g.stageProgress[2])||0} stage=${g.stage} loc=${g.location} tension=${g.tensionLevel} lvl=${g.level}`);
        lastLoggedSP1 = sp1;
      }
      if (sp1 === lastSP1) { noProgress++; } else { noProgress = 0; lastSP1 = sp1; }
      if (noProgress === 20) {
        forcePlotMain = picks + 5;
        log(`[run:${tag}] pick=${picks} sp1=${sp1} — stalled, forcing plot-main x5`);
      }

      // Choice slate every 10 picks
      if (picks % 10 === 0) {
        const snap = await snapshotChoices(page);
        const pm   = snap.filter(s => s.cls.includes('plot-main')).length;
        const cb   = snap.filter(s => s.cls.includes('combat-btn')).length;
        log(`[choices ${tag}] pick=${picks} total=${snap.length} plotMain=${pm} combat=${cb} labels=${snap.map(s=>'"'+s.text.slice(0,25)+'"').join(', ')}`);
      }

      // Combat mode flag
      const inCombat = await page.locator('.choice-btn.combat-btn:visible').count().then(n=>n>0).catch(()=>false);
      if (inCombat) log(`[combat ${tag}] pick=${picks} — combat UI active`);

      // Dismiss overlays
      await dismissOverlays(page);

      // Pick
      const result = await pickChoice(page, picks, picks < forcePlotMain);
      if (!result.clicked) { await page.waitForTimeout(600); continue; }
      log(`[pick ${tag}] #${picks+1} plotMain=${result.isPlotMain} combat=${result.isCombat} tag=${result.tag} "${result.text.slice(0,60)}"`);
      picks++;
      await page.waitForTimeout(PACE.betweenCombat);

    } catch (loopErr) {
      if (pageIsClosed || String(loopErr).includes('Target page') || String(loopErr).includes('context or browser')) {
        log(`[run:${tag}] PAGE CLOSED mid-loop pick=${picks}`);
        return { success: false, reason: 'page-closed', picks, g };
      }
      log(`[run:${tag}] loop-error pick=${picks}: ${loopErr.message}`);
    }
  }

  // Reached MAX_PICKS without success
  g = await readG(page);
  await screenshot(page, `${tag}_timeout_p${picks}`);
  log(`[run:${tag}] TIMEOUT picks=${picks} sp1=${(g.stageProgress&&g.stageProgress[1])||0} sp2=${(g.stageProgress&&g.stageProgress[2])||0}`);
  return { success: false, reason: 'max-picks', picks, g };
}

// ---------------------------------------------------------------------------
// Test suite — single autonomous test, loops until all 3 families succeed
// ---------------------------------------------------------------------------
test.describe('Autonomous QA Harness', () => {
  test.setTimeout(12 * 60 * 60 * 1000); // 12 hours ceiling

  test.beforeAll(() => {
    [SCREENSHOT_DIR, VIDEO_DIR, TEST_RESULTS].forEach(d => fs.mkdirSync(d, { recursive: true }));
    fs.writeFileSync(LOG_PATH, `# Ledger of Ash — Autonomous QA Run\nStarted: ${new Date().toISOString()}\n\n`, 'utf8');
  });

  test.afterAll(() => {
    fs.appendFileSync(LOG_PATH, '\n---\nRun complete: ' + new Date().toISOString() + '\n', 'utf8');
    console.log(`\nLog: ${LOG_PATH}`);
  });

  test('3-family autonomous playtest', async ({ browser }) => {
    const jsErrors = [];
    const familyResults = {};

    for (const family of FAMILY_ORDER) {
      log(`\n${'='.repeat(60)}`);
      log(`[family:${family}] starting — need Stage 3 gate`);
      log('='.repeat(60));

      let success     = false;
      let attemptNum  = 0;
      let pool        = buildPool(family);
      let poolIdx     = 0;

      while (!success) {
        attemptNum++;
        if (poolIdx >= pool.length) {
          log(`[family:${family}] pool exhausted — reshuffling for next round`);
          pool    = buildPool(family);
          poolIdx = 0;
        }
        const { archetypeId, backgroundId } = pool[poolIdx++];
        log(`[family:${family}] attempt ${attemptNum} → ${archetypeId}/${backgroundId}`);

        // Create browser context with video recording
        const videoRunDir = path.join(VIDEO_DIR, `${family}_a${attemptNum}_${archetypeId}`);
        fs.mkdirSync(videoRunDir, { recursive: true });
        const context = await browser.newContext({
          recordVideo: { dir: videoRunDir, size: { width: 1280, height: 720 } },
        });
        const page = await context.newPage();

        // Run
        const result = await runPlaythrough(page, archetypeId, backgroundId, family, attemptNum, jsErrors);

        // Save video
        try { await page.close(); } catch (_) {}
        try { await context.close(); } catch (_) {}

        // Log attempt summary
        log(`\n[family:${family}] attempt ${attemptNum} ${result.success ? 'SUCCESS ✓' : `FAILED (${result.reason})`} picks=${result.picks} sp1=${(result.g&&result.g.stageProgress&&result.g.stageProgress[1])||0} sp2=${(result.g&&result.g.stageProgress&&result.g.stageProgress[2])||0}`);
        fs.appendFileSync(LOG_PATH, bugLog[bugLog.length - 1] + '\n', 'utf8');

        if (result.success) {
          success = true;
          familyResults[family] = { archetypeId, backgroundId, attempts: attemptNum, picks: result.picks };
        }
      }

      log(`[family:${family}] DONE after ${familyResults[family].attempts} attempt(s) — won with ${familyResults[family].archetypeId}/${familyResults[family].backgroundId}`);
    }

    // Final suite summary
    log('\n' + '='.repeat(60));
    log('[suite] ALL 3 FAMILIES SUCCEEDED');
    for (const family of FAMILY_ORDER) {
      const r = familyResults[family];
      log(`  ${family}: ${r.archetypeId}/${r.backgroundId} in ${r.attempts} attempt(s), ${r.picks} picks`);
    }
    log('='.repeat(60));

    // Write full log
    fs.writeFileSync(LOG_PATH, bugLog.join('\n') + '\n', 'utf8');
  });
});
