// @ts-check
/**
 * p0-smoke.spec.js — P0 verification smoke spec
 *
 * Verifies three P0 features landed in the post-V1.0 sprint:
 *   Stream A — loadGame() legacy 4-digit code error toasts (showToast on missing/corrupt legacy save).
 *   Stream B — Supply tier decay every 3 days via degradeSupplyTier() + .camp-supply-banner.
 *   Stream C — 6 new tutorials: first_supply_tier, first_save_load, first_travel_mode,
 *              first_combat_retreat, first_ability_activate, first_camp_detail.
 *
 * Coverage: 10 archetypes spanning all 4 families returned by getArchetypeFamily():
 *   combat  (4): warrior, knight, ranger, paladin
 *   magic   (2): wizard, cleric
 *   stealth (2): rogue, scout_c
 *   support (2): healer, bard
 *
 * Engine-function-only injection rule:
 *   - Reading G via page.evaluate(() => G.x) is allowed.
 *   - Setting G via page.evaluate(() => G.x = ...) is BANNED.
 *   - Calling engine functions (advanceTime, enterCombat, loadGame, activateAbilityFromSheet)
 *     via page.evaluate is allowed — these have the same side-effects as in-game triggers
 *     and the spec uses them only where the organic UI path costs >10x the per-archetype
 *     budget (e.g., 18 rest-cycles to reach day 9 for supply decay).
 */

const { test, expect } = require('@playwright/test');

test.use({ headless: true });

const ARCHETYPES = [
  // family: combat
  { id: 'warrior',  bg: 'w_garrison', family: 'combat'  },
  { id: 'knight',   bg: 'k_shelk',    family: 'combat'  },
  { id: 'ranger',   bg: 'r_shelk',    family: 'combat'  },
  { id: 'paladin',  bg: 'p_cysur',    family: 'combat'  },
  // family: magic
  { id: 'wizard',   bg: 'wz_shelk',   family: 'magic'   },
  { id: 'cleric',   bg: 'cl_cysur',   family: 'magic'   },
  // family: stealth
  { id: 'rogue',    bg: 'ro_shelk',   family: 'stealth' },
  { id: 'scout_c',  bg: 'sc_shelk',   family: 'stealth' },
  // family: support
  { id: 'healer',   bg: 'hl_shelk',   family: 'support' },
  { id: 'bard',     bg: 'ba_shelk',   family: 'support' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
async function createCharacter(page, archetypeId, backgroundId) {
  await page.goto('/ledger-of-ash.html');
  await page.evaluate(() => { try { localStorage.clear(); } catch (_) {} });
  await page.waitForSelector('#btn-new-legend', { state: 'visible', timeout: 15000 });
  await page.click('#btn-new-legend');

  await page.fill('#char-name', 'Smoke');
  await page.waitForFunction(() => typeof selectArchetype === 'function', { timeout: 8000 });
  await page.evaluate((id) => selectArchetype(id), archetypeId);
  await page.waitForSelector('#bg-step', { state: 'visible', timeout: 5000 });
  await page.evaluate(({ bgId, archId }) => selectBackground(bgId, archId), { bgId: backgroundId, archId: archetypeId });

  await page.waitForSelector('#begin-btn:not([style*="display:none"])', { timeout: 5000 });
  await page.click('#begin-btn');
  await page.waitForSelector('#screen-game', { timeout: 10000 });

  // The onboarding modal opens via setTimeout(showOnboarding, 400) after #screen-game
  // becomes visible (ledger-of-ash.html:11153). Wait for it explicitly, then click
  // #onboarding-skip (id is stable; the click handler invokes _closeOnboarding).
  const onboardingAppeared = await page
    .waitForSelector('#onboarding-modal.active', { state: 'visible', timeout: 3000 })
    .then(() => true)
    .catch(() => false);
  if (onboardingAppeared) {
    await page.click('#onboarding-skip').catch(() => {});
    await page
      .waitForSelector('#onboarding-modal:not(.active)', { timeout: 3000 })
      .catch(() => {});
  }

  // Catch-all for any other transient overlays (Got it / Continue confirmations).
  for (let i = 0; i < 6; i++) {
    const btn = page.locator(
      'button:has-text("Got it"),button:has-text("Continue"),.onboarding-skip'
    ).first();
    if (await btn.isVisible({ timeout: 250 }).catch(() => false)) {
      await btn.click().catch(() => {});
    } else break;
  }

  // Confirm we have the engine loaded and at least one choice rendered
  await page.waitForSelector('.choice-btn', { state: 'visible', timeout: 15000 });
}

async function closeAnyOverlay(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.overlay.active').forEach(el => el.classList.remove('active'));
  }).catch(() => {});
}

async function tutorialFlag(page, flag) {
  return page.evaluate((f) => !!(G && G.tutorialFlags && G.tutorialFlags[f]), flag).catch(() => false);
}

/** Click first visible .tutorial-callout-close to dismiss any open callouts. */
async function dismissTutorials(page) {
  for (let i = 0; i < 6; i++) {
    const btn = page.locator('.tutorial-callout-close:visible').first();
    if (!(await btn.isVisible({ timeout: 200 }).catch(() => false))) break;
    await btn.click().catch(() => {});
  }
}

/** Pick the first visible non-disabled choice button. */
async function pickFirstChoice(page) {
  const btn = page.locator('.choice-btn:visible:not([disabled])').first();
  if (!(await btn.isVisible({ timeout: 1500 }).catch(() => false))) return false;
  await btn.click().catch(() => {});
  // Give the engine a moment to render the result + next choice batch
  await page.waitForSelector('.choice-btn:visible:not([disabled])', { timeout: 5000 }).catch(() => {});
  return true;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
test.describe('P0 smoke — loadGame toast + supply decay + 6 tutorials', () => {

  for (const a of ARCHETYPES) {
    test(`${a.family}/${a.id}: 3 P0 surfaces`, async ({ page }) => {
      // Per-archetype hard cap. Stall guard below trims earlier if a single step hangs.
      test.setTimeout(180 * 1000);

      const consoleErrors = [];
      page.on('console', m => {
        if (m.type() !== 'error') return;
        const txt = m.text();
        // Known baseline noise (per tests/CLAUDE.md):
        //   - 13 content files ship with UTF-8 BOM, producing 2 "Invalid or unexpected token"
        //     parse errors at page load on every run. Non-blocking; game plays through.
        if (/Invalid or unexpected token/.test(txt)) return;
        // Engine swallows enriched-choice errors and logs '[enriched]' — these are baseline noise too.
        if (/^\[enriched\]/.test(txt)) return;
        consoleErrors.push(txt);
      });

      // ── 1) Create character ────────────────────────────────
      await createCharacter(page, a.id, a.bg);

      // Confirm family matches engine classification (sanity check for the harness, not the game)
      const engineFamily = await page.evaluate(() => {
        try { return getArchetypeFamily(); } catch (_) { return null; }
      });
      expect(engineFamily, `archetype ${a.id} family mismatch`).toBe(a.family);

      // Pick one organic choice (warms engine, advances time a tick)
      await pickFirstChoice(page);
      await dismissTutorials(page);

      // ── 2) Stream C: first_save_load tutorial via showSaveModal ───────────
      await page.evaluate(() => { try { showSaveModal('save'); } catch (_) {} });
      await page.waitForSelector('#overlay-save.active', { timeout: 5000 });
      // The tutorial inserts a .tutorial-callout into #narrative-content (NOT the modal)
      const sawSaveLoadTutorial = await tutorialFlag(page, 'first_save_load');
      expect(sawSaveLoadTutorial, 'first_save_load tutorial flag should be set after showSaveModal').toBe(true);

      // Save to slot 1 — click the slot card directly (organic UI path)
      const slot1 = page.locator('.save-slot-card[data-slot="loa_slot_1"]').first();
      await slot1.waitFor({ state: 'visible', timeout: 4000 });
      await slot1.click();
      // Toast "Saved to Slot 1." appears
      await page.waitForFunction(
        () => /Saved to/.test((document.getElementById('toast') || {}).textContent || ''),
        null, { timeout: 4000 }
      ).catch(() => {});

      await closeAnyOverlay(page);
      await dismissTutorials(page);

      // ── 3) Stream B: .camp-supply-banner present on camp screen ───────────
      await page.evaluate(() => { try { showCamp(); showOverlay('overlay-camp'); } catch (_) {} });
      await page.waitForSelector('#overlay-camp.active', { timeout: 5000 });
      const banner = page.locator('#overlay-camp .camp-supply-banner');
      await expect(banner, 'camp-supply-banner should render on camp screen').toBeVisible({ timeout: 5000 });
      const initialBannerText = (await banner.textContent({ timeout: 2000 }) || '').trim();
      expect(initialBannerText.length, 'banner text non-empty').toBeGreaterThan(0);
      // Default supplyTier is 'light' — banner reads "Supplies light — last leg."
      expect(initialBannerText.toLowerCase()).toMatch(/light|medium|plentiful|scarce|starving/);

      // ── 4) Stream C: first_camp_detail tutorial via sleep camp-action ─────
      // sleep is gated by timeIndex >= 2; flip it by calling advanceTime (engine fn, not state-set)
      await page.evaluate(() => { try { advanceTime(2); showCamp(); } catch (_) {} });
      const sleepBtn = page.locator('button.camp-action[data-camp="sleep"]:visible').first();
      const sleepVisible = await sleepBtn.isVisible({ timeout: 2000 }).catch(() => false);
      if (sleepVisible) {
        await sleepBtn.click().catch(() => {});
      } else {
        // Fallback: invoke campAction directly with a qualifying type (engine function, not state-set).
        // post_watches/lay_low/campout/sleep all gate first_camp_detail.
        await page.evaluate(() => { try { campAction('sleep'); } catch (_) {} });
      }
      // Wait for the tutorial to register
      await page.waitForFunction(
        () => !!(G && G.tutorialFlags && G.tutorialFlags.first_camp_detail),
        null, { timeout: 5000 }
      ).catch(() => {});
      const sawCampDetail = await tutorialFlag(page, 'first_camp_detail');
      expect(sawCampDetail, 'first_camp_detail tutorial flag should be set after qualifying campAction').toBe(true);

      await closeAnyOverlay(page);
      await dismissTutorials(page);

      // ── 5) Stream C: first_travel_mode tutorial via doJourneyStart ────────
      // doJourneyStart fires the tutorial; pick any reachable destination from current location.
      // The engine validates route — we use a known cross-route from default Shelkopolis area.
      await page.evaluate(() => {
        try {
          // Find any locId from TRAVEL_ROUTES keyed off the player's current location
          var here = G.location || 'shelkopolis';
          var routes = window.TRAVEL_ROUTES || {};
          var dest = null;
          for (var key in routes) {
            var parts = key.split('|');
            if (parts[0] === here) { dest = parts[1]; break; }
            if (parts[1] === here) { dest = parts[0]; break; }
          }
          if (!dest) dest = 'cosmoria';
          doJourneyStart(dest);
        } catch (_) {}
      });
      // doJourneyStart calls maybeShowTutorial('first_travel_mode') synchronously before renderChoices
      await page.waitForFunction(
        () => !!(G && G.tutorialFlags && G.tutorialFlags.first_travel_mode),
        null, { timeout: 5000 }
      ).catch(() => {});
      const sawTravelMode = await tutorialFlag(page, 'first_travel_mode');
      expect(sawTravelMode, 'first_travel_mode tutorial flag should be set after doJourneyStart').toBe(true);
      await dismissTutorials(page);

      // ── 6) Stream C: first_combat_retreat tutorial via startCombat ────────
      // The retreat tutorial fires inside renderCombatRound (ledger-of-ash.html:4836),
      // which early-returns on `if (!CS)`. CS is initialized by startCombat (not enterCombat).
      // Call startCombat directly — same effect as the player clicking Press in the entry UI.
      await page.evaluate(() => { try { startCombat('patrol_guard', {}); } catch (_) {} });
      await page.waitForFunction(
        () => !!(G && G.tutorialFlags && G.tutorialFlags.first_combat_retreat),
        null, { timeout: 5000 }
      ).catch(() => {});
      const sawCombatRetreat = await tutorialFlag(page, 'first_combat_retreat');
      expect(sawCombatRetreat, 'first_combat_retreat tutorial flag should be set after startCombat').toBe(true);

      // End combat to leave the encounter UI in a defined state
      await page.evaluate(() => {
        try {
          if (typeof endCombat === 'function') endCombat({ outcome: 'flee' });
          else G.inCombat = false;
        } catch (_) {}
      });
      await dismissTutorials(page);

      // ── 7) Stream C: first_ability_activate tutorial via activateAbilityFromSheet ──
      // At level 1, no actives are available (starter ability seeds at level 2, most actives
      // gate at levelMin>=4). Invoke the engine entry directly with any ability id —
      // activateAbilityFromSheet's first line fires the tutorial unconditionally.
      await page.evaluate(() => { try { activateAbilityFromSheet('__p0_smoke_probe__'); } catch (_) {} });
      const sawAbilityActivate = await tutorialFlag(page, 'first_ability_activate');
      expect(sawAbilityActivate, 'first_ability_activate tutorial flag should be set after activateAbilityFromSheet').toBe(true);

      // ── 8) Stream B: supply tier decay across 9 days ──────────────────────
      // Drive 36 × advanceTime(1) = 9 day-boundary crossings = 3 decay events.
      // advanceTime(2) was wrong: from an odd starting timeIndex it alternates ti=1↔3
      // and never lands on 0, so the day-boundary check `if (G.timeIndex === 0)` never fires.
      // advanceTime(1) walks all 4 slots, guaranteeing day-boundary crossings regardless
      // of starting phase. Run the loop in a single page.evaluate so any thrown error
      // surfaces (avoids 36 silent try/catch suppressions across separate eval contexts).
      const SUPPLY_ORDER = ['starving','scarce','light','medium','plentiful'];

      const decayDiag = await page.evaluate(() => {
        const before = {
          tier: (typeof G !== 'undefined' ? G.supplyTier : null),
          day:  (typeof G !== 'undefined' ? (G.dayCount || 0) : 0),
          ti:   (typeof G !== 'undefined' ? (G.timeIndex || 0) : 0)
        };
        let err = null;
        for (let i = 0; i < 36; i++) {
          try { advanceTime(1); }
          catch (e) { err = (e && e.message) || String(e); break; }
        }
        const after = {
          tier: (typeof G !== 'undefined' ? G.supplyTier : null),
          day:  (typeof G !== 'undefined' ? (G.dayCount || 0) : 0),
          ti:   (typeof G !== 'undefined' ? (G.timeIndex || 0) : 0)
        };
        return { before, after, err };
      });

      if (decayDiag.err) {
        console.log(`[${a.family}/${a.id}] advanceTime error:`, decayDiag.err);
      }

      const beforeDecay = decayDiag.before;
      const afterDecay  = decayDiag.after;

      // Day should have advanced by at least 8 (9 expected, allow 1 slack for partial first day)
      expect(afterDecay.day - beforeDecay.day, 'day count should advance by ~9').toBeGreaterThanOrEqual(8);

      // Tier should have moved down at least 2 steps. From 'light' (idx 2) → 'starving' (idx 0)
      // across 3 decay events. From 'plentiful' (idx 4) → 'light' (idx 2). Either way: ≥2 steps down.
      const beforeIdx = SUPPLY_ORDER.indexOf(beforeDecay.tier);
      const afterIdx  = SUPPLY_ORDER.indexOf(afterDecay.tier);
      expect(beforeIdx, `beforeDecay tier "${beforeDecay.tier}" should be a valid SUPPLY_TIER_ORDER value`).toBeGreaterThanOrEqual(0);
      expect(afterIdx,  `afterDecay tier "${afterDecay.tier}" should be a valid SUPPLY_TIER_ORDER value`).toBeGreaterThanOrEqual(0);
      expect(beforeIdx - afterIdx, `supply tier should decay at least 2 steps over 9 days (was ${beforeDecay.tier} → ${afterDecay.tier})`).toBeGreaterThanOrEqual(2);

      // Stream C: first_supply_tier tutorial should have fired during decay
      const sawSupplyTier = await tutorialFlag(page, 'first_supply_tier');
      expect(sawSupplyTier, 'first_supply_tier tutorial flag should be set after first decay').toBe(true);

      // ── 9) Stream B: camp-supply-banner reflects new tier after decay ─────
      await page.evaluate(() => { try { showCamp(); showOverlay('overlay-camp'); } catch (_) {} });
      await page.waitForSelector('#overlay-camp.active', { timeout: 4000 });
      const bannerAfter = page.locator('#overlay-camp .camp-supply-banner');
      await expect(bannerAfter).toBeVisible({ timeout: 4000 });
      const afterBannerText = (await bannerAfter.textContent({ timeout: 2000 }) || '').trim().toLowerCase();
      // The banner should reflect the post-decay tier (case-insensitive substring check)
      expect(afterBannerText, `banner should mention current tier "${afterDecay.tier}"`).toContain(afterDecay.tier);
      await closeAnyOverlay(page);

      // ── 10) Stream A: loadGame legacy bad-code toast ──────────────────────
      // No legacy save matching this name+code → bare-return path → 'Legacy save not found...' toast.
      await page.evaluate(() => {
        try {
          // Clear any prior toast so the next showToast is observable
          var t = document.getElementById('toast');
          if (t) { t.textContent = ''; t.classList.remove('show'); }
          loadGame('NoSuchSaveName_p0smoke', '0000');
        } catch (_) {}
      });
      await page.waitForFunction(
        () => /Legacy save not found/i.test((document.getElementById('toast') || {}).textContent || ''),
        null, { timeout: 5000 }
      );
      const toastText = await page.evaluate(() => (document.getElementById('toast') || {}).textContent || '');
      expect(toastText, 'legacy bad-code path should show the "Legacy save not found" toast').toMatch(/Legacy save not found/i);

      // ── Final assertion: no unexpected console errors ─────────────────────
      // Allow some non-fatal log spam; just assert we didn't trigger anything new.
      if (consoleErrors.length) {
        console.log(`[${a.family}/${a.id}] console errors observed (${consoleErrors.length}):`);
        consoleErrors.slice(0, 5).forEach(e => console.log('  ' + e.slice(0, 200)));
      }
      expect(consoleErrors, 'no unexpected console errors during P0 smoke walk').toEqual([]);
    });
  }
});
