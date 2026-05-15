// @ts-check
/**
 * full-playthrough.spec.js
 * 3-archetype QA harness: Warrior → Thief → Healer
 * Runs Stage 1 → Stage 2, stops at Stage 3 gate, death, or 300 picks.
 * Uses only real UI clicks — no page.evaluate() DOM manipulation.
 */

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const SCREENSHOT_DIR = path.resolve(__dirname, '../../test-results/playthrough-screenshots');
const LOG_PATH = path.resolve(__dirname, '../../test-results/full-playthrough-log.md');
const MAX_PICKS = 300;
const PROBE_EVERY = 15;  // panel probe interval (picks)
const CAMP_EVERY  = 45;  // camp probe interval (picks)

const ARCHETYPES = [
  { name: 'Ash',    group: 'combat',  id: 'warrior', label: 'warrior' },
  { name: 'Rogue',  group: 'stealth', id: 'thief',   label: 'thief'   },
  { name: 'Mender', group: 'support', id: 'healer',  label: 'healer'  },
];

// Pacing (ms)
const PACE = {
  afterResult:   1500,
  beforePanel:    800,
  betweenCombat:  700,
  afterLevelup:   500,
  short:          300,
};

// ---------------------------------------------------------------------------
// Shared log
// ---------------------------------------------------------------------------
const bugLog = [];
let screenshotCounter = Date.now();

function log(entry) {
  bugLog.push(entry);
  console.log(entry);
}

async function screenshot(page, run, name) {
  try {
    screenshotCounter++;
    const safeName = name.replace(/[^a-z0-9_-]/gi, '_');
    const p = path.join(SCREENSHOT_DIR, `${screenshotCounter}_${run}_${safeName}.png`);
    await page.screenshot({ path: p, fullPage: false });
    return p;
  } catch (_) { return null; }
}

// ---------------------------------------------------------------------------
// Page helpers
// ---------------------------------------------------------------------------

/** Close any open overlay using real clicks in priority order. */
async function closeOverlay(page) {
  const closers = [
    'button.overlay-close',
    '.overlay-close',
    '[data-close]',
    'button:has-text("Close")',
    'button:has-text("×")',
  ];
  for (const sel of closers) {
    try {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 400 })) {
        await el.click();
        await page.waitForTimeout(PACE.short);
        return true;
      }
    } catch (_) {}
  }
  // Escape as last resort
  try {
    await page.keyboard.press('Escape');
    await page.waitForTimeout(PACE.short);
    return true;
  } catch (_) {}
  return false;
}

/** Read G state from the page (read-only evaluate — not DOM manipulation). */
async function readG(page) {
  return page.evaluate(() => {
    try {
      return {
        stage:         G.stage,
        stageProgress: G.stageProgress ? { ...G.stageProgress } : {},
        location:      G.location,
        tensionLevel:  G.tensionLevel,
        level:         G.level,
        day:           G.day,
        dead:          G.dead,
      };
    } catch (_) { return {}; }
  }).catch(() => ({}));
}

/** Read innerHTML of #action-content (capped at 500 chars). */
async function actionInnerHTML(page) {
  return page.evaluate(() => {
    try {
      return (document.querySelector('#action-content') || {}).innerHTML || '';
    } catch (_) { return ''; }
  }).catch(() => '').then(s => String(s).slice(0, 500));
}

/** Check Stage 3 gate condition. */
async function isAtStage3Gate(page) {
  return page.evaluate(() => {
    try {
      if (typeof G === 'undefined') return false;
      const sp2 = (G.stageProgress && G.stageProgress[2]) || 0;
      const climaxDone = !!(G.flags && (G.flags.stage2_climax_complete || G.flags.maren_oss_resolved));
      return (climaxDone && sp2 >= 12) || G.stage === 'Stage III';
    } catch (_) { return false; }
  }).catch(() => false);
}

/** Detect death screen. */
async function isDead(page) {
  try {
    return await page.locator('#screen-death, .death-screen, #death-overlay').isVisible({ timeout: 400 });
  } catch (_) { return false; }
}

// ---------------------------------------------------------------------------
// Character creation
// ---------------------------------------------------------------------------
async function createCharacter(page, { name, group, id }) {
  await page.goto('/ledger-of-ash.html');
  await page.evaluate(() => { try { localStorage.clear(); } catch (_) {} });
  await page.waitForSelector('#btn-new-legend', { state: 'visible', timeout: 15000 });
  await page.click('#btn-new-legend');

  await page.fill('#char-name', name);

  // Expand archetype group header
  await page.click(`.group-header[data-group-id="${group}"]`);
  await page.waitForTimeout(PACE.short);

  // Select archetype card
  const card = page.locator(`#archetype-grid .card[data-id="${id}"]`).first();
  await card.waitFor({ state: 'visible', timeout: 4000 });
  await card.click();

  // Select first background
  await page.waitForSelector('#bg-step', { state: 'visible', timeout: 5000 });
  const firstBg = page.locator('#background-grid .card').first();
  await firstBg.waitFor({ state: 'visible', timeout: 4000 });
  await firstBg.click();

  // Begin
  await page.waitForSelector('#begin-btn:not([style*="display:none"])', { timeout: 5000 });
  await page.click('#begin-btn');
  await page.waitForSelector('#screen-game', { timeout: 10000 });
  await page.waitForTimeout(500);

  // Dismiss onboarding (real clicks only — no JS force-close)
  for (let i = 0; i < 15; i++) {
    const btn = page.locator(
      'button:has-text("Skip"), button:has-text("Got it"), button:has-text("Continue"), button:has-text("Begin"), .onboarding-skip'
    ).first();
    if (await btn.isVisible({ timeout: 500 }).catch(() => false)) {
      await btn.click();
      await page.waitForTimeout(PACE.short);
    } else {
      break;
    }
  }

  await page.waitForSelector('.choice-btn', { state: 'visible', timeout: 15000 });
}

// ---------------------------------------------------------------------------
// Level-up handler (inline .levelup-block — NOT a modal)
// ---------------------------------------------------------------------------
async function handleLevelup(page, run) {
  try {
    const block = page.locator('.levelup-block:visible').first();
    if (await block.isVisible({ timeout: 400 })) {
      const optBtn = block.locator('.levelup-option button').first();
      if (await optBtn.isVisible({ timeout: 400 })) {
        await optBtn.click();
        await page.waitForTimeout(PACE.afterLevelup);
        const g = await readG(page);
        await screenshot(page, run, `levelup_lvl${g.level}`);
        log(`[panel:level-up run:${run}] lvl=${g.level} — PASS: clicked skill option`);
        return true;
      }
    }
  } catch (_) {}
  return false;
}

// ---------------------------------------------------------------------------
// Choice picker
// ---------------------------------------------------------------------------
/**
 * Pick a choice button with priority:
 *   1) Any .choice-btn.plot-main (always)
 *   2) When forcePlotMain: try harder for plot-main
 *   3) Every 5th pick: random
 *   4) Otherwise: longest label text
 */
async function pickChoice(page, pickNum, forcePlotMain) {
  const buttons = page.locator('.choice-btn:visible');
  const count = await buttons.count();
  if (count === 0) return false;

  // Priority 1: plot-main visible
  const plotMain = page.locator('.choice-btn.plot-main:visible').first();
  if (await plotMain.isVisible({ timeout: 400 }).catch(() => false)) {
    await plotMain.click();
    return true;
  }

  // Priority 2: force mode — wait a beat and retry plot-main
  if (forcePlotMain) {
    await page.waitForTimeout(200);
    const anyPlot = page.locator('.choice-btn.plot-main').first();
    if (await anyPlot.isVisible({ timeout: 600 }).catch(() => false)) {
      await anyPlot.click();
      return true;
    }
  }

  // Priority 3: random every 5th pick
  if (pickNum % 5 === 0) {
    const idx = Math.floor(Math.random() * count);
    await buttons.nth(idx).click();
    return true;
  }

  // Priority 4: longest label
  let bestIdx = 0;
  let bestLen = -1;
  for (let i = 0; i < count; i++) {
    try {
      const txt = (await buttons.nth(i).innerText()) || '';
      if (txt.length > bestLen) { bestLen = txt.length; bestIdx = i; }
    } catch (_) {}
  }
  await buttons.nth(bestIdx).click();
  return true;
}

// ---------------------------------------------------------------------------
// Panel probes
// ---------------------------------------------------------------------------
async function probeCharSheet(page, run, g) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    await page.click('#btn-charsheet');
    await page.waitForSelector('#overlay-charsheet', { state: 'visible', timeout: 4000 });
    await screenshot(page, run, `charsheet_lvl${g.level}_day${g.day}`);

    // Check traits section visible
    const traitsVisible = await page.locator(
      '#overlay-charsheet .traits, #overlay-charsheet [class*="trait"]'
    ).first().isVisible({ timeout: 1000 }).catch(() => false);

    // Check stat display names (Might/Finesse/etc)
    const sheetText = await page.locator('#overlay-charsheet').innerText().catch(() => '');
    const hasDisplayNames = /Might|Finesse|Vigor|Wits|Charm|Spirit/i.test(sheetText);

    // Check XP denominator at level 1
    let xpOk = true;
    if (g.level === 1) {
      xpOk = /120/.test(sheetText);
    }

    // Try mastery tab
    const masteryTab = page.locator('#overlay-charsheet button:has-text("Mastery")').first();
    if (await masteryTab.isVisible({ timeout: 600 }).catch(() => false)) {
      await masteryTab.click();
      await page.waitForTimeout(PACE.short);
      await screenshot(page, run, `mastery_lvl${g.level}`);
    }

    const status = (traitsVisible && hasDisplayNames && xpOk) ? 'PASS' : 'WARN';
    log(`[panel:char-sheet run:${run}] lvl=${g.level} day=${g.day} — ${status}: traits=${traitsVisible} displayNames=${hasDisplayNames} xpDenom=${xpOk}`);
    await closeOverlay(page);
  } catch (err) {
    log(`[panel:char-sheet run:${run}] lvl=${g.level} — FAIL: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

async function probeJournal(page, run, g) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    await page.click('#btn-journal');
    await page.waitForSelector(
      '#overlay-journal, #journal-overlay, [id*="journal"]',
      { state: 'visible', timeout: 4000 }
    );
    await screenshot(page, run, `journal_day${g.day}`);

    const journalText = await page.locator('[id*="journal"]').first().innerText().catch(() => '');
    const hasObjectObject = journalText.includes('[object Object]');
    const entryCount = (journalText.match(/\n/g) || []).length;

    const status = hasObjectObject ? 'FAIL' : 'PASS';
    log(`[panel:journal run:${run}] lvl=${g.level} day=${g.day} — ${status}: entries~${entryCount} objectObject=${hasObjectObject}`);
    await closeOverlay(page);
  } catch (err) {
    log(`[panel:journal run:${run}] lvl=${g.level} — FAIL: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

async function probeCamp(page, run, g) {
  await page.waitForTimeout(PACE.beforePanel);
  try {
    await page.click('#btn-camp');
    await page.waitForSelector(
      '#overlay-camp, #camp-overlay, [id*="camp"]',
      { state: 'visible', timeout: 4000 }
    );
    await screenshot(page, run, `camp_day${g.day}`);
    log(`[panel:camp run:${run}] lvl=${g.level} day=${g.day} — PASS: camp opened`);
    await closeOverlay(page);
  } catch (err) {
    log(`[panel:camp run:${run}] lvl=${g.level} — WARN: ${err.message}`);
    await closeOverlay(page).catch(() => {});
  }
}

/** Check for naturally-appearing shop panel and probe it. */
async function checkShopNatural(page, run, g) {
  try {
    const shopDisplay = page.locator('#shop-gold-display');
    if (await shopDisplay.isVisible({ timeout: 200 })) {
      await screenshot(page, run, `shop_day${g.day}`);
      const shopText = await page.locator('#shop-panel, [id*="shop"]').first().innerText().catch(() => '');
      const hasItems = shopText.length > 10;
      log(`[panel:shop run:${run}] day=${g.day} location=${g.location} — ${hasItems ? 'PASS' : 'WARN'}: items listed=${hasItems}`);
      const closeBtn = page.locator('#btn-shop-close').first();
      if (await closeBtn.isVisible({ timeout: 600 }).catch(() => false)) {
        await closeBtn.click();
        await page.waitForTimeout(PACE.short);
      } else {
        await closeOverlay(page);
      }
    }
  } catch (_) {}
}

// ---------------------------------------------------------------------------
// Dead-end detection & recovery
// ---------------------------------------------------------------------------
async function handleDeadEnd(page, run, pickNum) {
  const g = await readG(page);
  const html = await actionInnerHTML(page);
  await screenshot(page, run, `deadend_pick${pickNum}`);
  log(
    `[dead-end run:${run}] pick=${pickNum} location=${g.location} ` +
    `tensionLevel=${g.tensionLevel} stageProgress=${JSON.stringify(g.stageProgress)} ` +
    `— innerHTML: "${html.slice(0, 200)}"`
  );

  // Recovery attempt 1: Escape
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1000);
  if ((await page.locator('.choice-btn:visible').count()) > 0) return true;

  // Recovery attempt 2: Camp
  try {
    await page.click('#btn-camp');
    await page.waitForTimeout(2000);
    await closeOverlay(page);
  } catch (_) {}
  if ((await page.locator('.choice-btn:visible').count()) > 0) return true;

  return false;
}

// ---------------------------------------------------------------------------
// Main playthrough loop
// ---------------------------------------------------------------------------
async function runPlaythrough(page, archetype, jsErrors) {
  const run = archetype.label;
  log(`[run:${run}] starting archetype=${archetype.id} name=${archetype.name}`);

  await createCharacter(page, archetype);
  let g = await readG(page);
  log(`[run:${run}] game-started day=${g.day} level=${g.level}`);
  await screenshot(page, run, 'game_start');

  let picks = 0;
  let deadEndStreak = 0;
  let lastSP1 = 0;
  let noProgressSince = 0;
  let forcePlotMainUntil = 0;

  while (picks < MAX_PICKS) {
    // ── Terminal state checks ──────────────────────────────────────────────
    if (await isDead(page)) {
      g = await readG(page);
      await screenshot(page, run, `death_pick${picks}`);
      log(`[run:${run}] DEAD at pick=${picks} level=${g.level} stage=${g.stage}`);
      break;
    }
    if (await isAtStage3Gate(page)) {
      g = await readG(page);
      log(`[run:${run}] STAGE3-GATE at pick=${picks} level=${g.level} sp2=${g.stageProgress[2]}`);
      break;
    }

    // ── Level-up inline block ──────────────────────────────────────────────
    await handleLevelup(page, run);

    // ── Natural shop detection ─────────────────────────────────────────────
    g = await readG(page);
    await checkShopNatural(page, run, g);

    // ── Panel probes on schedule ───────────────────────────────────────────
    if (picks > 0 && picks % PROBE_EVERY === 0) {
      await probeCharSheet(page, run, g);
      await probeJournal(page, run, g);
    }
    if (picks > 0 && picks % CAMP_EVERY === 0) {
      await probeCamp(page, run, g);
    }

    // ── Wait for result/narrative text to settle ───────────────────────────
    try {
      await Promise.race([
        page.waitForSelector('.result-text:visible',    { timeout: 2000 }),
        page.waitForSelector('.narrative-text:visible', { timeout: 2000 }),
      ]);
      await page.waitForTimeout(PACE.afterResult);
    } catch (_) {
      // No result text yet — proceed
    }

    // ── Dead-end detection ─────────────────────────────────────────────────
    const choiceCount = await page.locator('.choice-btn:visible').count();
    if (choiceCount === 0) {
      deadEndStreak++;
      if (deadEndStreak >= 3) {
        const recovered = await handleDeadEnd(page, run, picks);
        if (!recovered) {
          log(`[run:${run}] BLOCKED at pick=${picks} — no recovery possible`);
          break;
        }
        deadEndStreak = 0;
      } else {
        await page.waitForTimeout(600);
      }
      continue;
    }
    deadEndStreak = 0;

    // ── Stage progress tracking → force plot-main on stall ─────────────────
    const sp1 = (g.stageProgress && g.stageProgress[1]) || 0;
    if (sp1 === lastSP1) {
      noProgressSince++;
    } else {
      noProgressSince = 0;
      lastSP1 = sp1;
    }
    if (noProgressSince === 20) {
      forcePlotMainUntil = picks + 5;
      log(`[run:${run}] pick=${picks} sp1=${sp1} — stalled 20 picks, forcing plot-main for next 5`);
    }
    const forcePlotMain = picks < forcePlotMainUntil;

    // ── Pick ───────────────────────────────────────────────────────────────
    const picked = await pickChoice(page, picks, forcePlotMain);
    if (!picked) {
      await page.waitForTimeout(600);
      continue;
    }
    picks++;
    await page.waitForTimeout(PACE.betweenCombat);
  }

  // ── Final summary ──────────────────────────────────────────────────────
  g = await readG(page);
  await screenshot(page, run, 'run_end');
  log(
    `[run:${run}] DONE picks=${picks} level=${g.level} stage=${g.stage} ` +
    `stageProgress1=${g.stageProgress[1]} stageProgress2=${g.stageProgress[2]}`
  );

  for (const e of jsErrors.filter(e => e.run === run)) {
    log(`[js-error run:${run}] ${e.msg}`);
  }
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------
test.describe.serial('3-Archetype QA Harness', () => {
  test.setTimeout(3 * 60 * 60 * 1000); // 3 hours

  /** Shared JS error bucket across all runs. */
  const jsErrors = [];

  test.beforeAll(async () => {
    if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
    const logDir = path.dirname(LOG_PATH);
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
  });

  test.afterAll(async () => {
    fs.writeFileSync(LOG_PATH, bugLog.join('\n') + '\n', 'utf8');
    console.log(`\nFull log written to: ${LOG_PATH}`);
  });

  for (const archetype of ARCHETYPES) {
    test(`Playthrough: ${archetype.label}`, async ({ page }) => {
      page.on('pageerror', err => {
        const entry = { run: archetype.label, msg: err.message };
        jsErrors.push(entry);
        log(`[js-error run:${archetype.label}] ${err.message}`);
      });
      page.on('console', msg => {
        if (msg.type() === 'error') {
          log(`[console-error run:${archetype.label}] ${msg.text()}`);
        }
      });

      await runPlaythrough(page, archetype, jsErrors);
    });
  }
});
