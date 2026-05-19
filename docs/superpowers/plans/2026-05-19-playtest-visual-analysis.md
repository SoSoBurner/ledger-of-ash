# Playtest Visual Analysis Upgrades — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the Ledger of Ash playtest pipeline so screenshots are visually analyzed by Claude, HUD/G-state mismatches are caught at runtime, and UI duplication bugs are detected both statically and at runtime.

**Architecture:** Three existing files extended — no new files. Image delivery uses `claude -p --input-format stream-json` (existing CC OAuth, no API key) with SDK fallback. Runtime probes added to the headed spec. Static lint added to validate-structure.js.

**Tech Stack:** Node.js (CommonJS), Playwright, `claude` CLI stream-json, `@anthropic-ai/sdk` (optional fallback), existing test infrastructure.

**Spec:** `docs/superpowers/specs/2026-05-19-playtest-visual-analysis-design.md`

---

## File Map

| File | Change type |
|------|------------|
| `tests/e2e/post-run-analysis.js` | Add screenshot selection, image delivery, 2 new domains, updated log parser |
| `tests/e2e/playtest-headed.spec.js` | Add `probeDuplicates()`, extend `probeHUD()` |
| `tests/content/validate-structure.js` | Add `warn()`, `checkDuplicateIds()`, `checkInnerHTMLAccumulation()` |

---

## Task 1: validate-structure.js — warn() + duplicate ID check

**Files:**
- Modify: `tests/content/validate-structure.js`

- [ ] **Step 1: Read current file**

Read `tests/content/validate-structure.js` lines 1–132 to understand current `fail()` pattern and `run()` function.

- [ ] **Step 2: Add warn() and checkDuplicateIds()**

After the `fail()` function definition (after line ~20), insert:

```js
let warnings = 0;
function warn(msg) {
  console.warn(`  WARN: ${msg}`);
  warnings++;
}

// ─── No duplicate id= attributes in ledger-of-ash.html ───────────────────────

function checkDuplicateIds() {
  const src = readFile(HTML_PATH);
  const freq = {};
  // Match id="..." or id='...' — skip commented lines
  const lines = src.split('\n');
  for (const line of lines) {
    const trimmed = line.trimStart();
    if (trimmed.startsWith('//') || trimmed.startsWith('*')) continue;
    const re = /\bid=["']([^"']+)["']/g;
    let m;
    while ((m = re.exec(line)) !== null) {
      const id = m[1];
      freq[id] = (freq[id] || 0) + 1;
    }
  }
  for (const [id, count] of Object.entries(freq)) {
    if (count > 1) fail(`ledger-of-ash.html: duplicate id="${id}" appears ${count} times`);
  }
}
```

- [ ] **Step 3: Add checkInnerHTMLAccumulation()**

After `checkDuplicateIds()`, insert:

```js
// ─── innerHTML += on render containers may accumulate across re-renders ───────

function checkInnerHTMLAccumulation() {
  const src = readFile(HTML_PATH);
  const lines = src.split('\n');
  // Containers whose innerHTML should be replaced, not appended
  const CONTAINERS = [
    '#action-content', '#story-output', '.env-desc',
    '.result-text', '.narrative-text', '#quest-list', '#journal-overlay-body',
  ];
  const accRe = /innerHTML\s*\+=/;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!accRe.test(line)) continue;
    const lineNo = i + 1;
    const isContainer = CONTAINERS.some(sel => line.includes(sel.replace('#', '').replace('.', '')));
    if (isContainer) {
      warn(`ledger-of-ash.html:${lineNo}: innerHTML += on known render container — may accumulate across re-renders`);
    }
  }
}
```

- [ ] **Step 4: Add both checks to run()**

In the `run()` function, after `checkAddJournalCategories()`:

```js
  checkDuplicateIds();
  checkInnerHTMLAccumulation();
```

Also update the final summary to include warnings:

```js
  if (errors > 0) {
    console.error(`\n${errors} violation(s) found.`);
    process.exit(1);
  } else {
    if (warnings > 0) console.warn(`\n${warnings} warning(s).`);
    console.log('All structure checks passed.');
  }
```

- [ ] **Step 5: Run validator and verify**

```bash
cd C:\Users\CEO\ledger-of-ash
node tests/content/validate-structure.js
```

Expected: `All structure checks passed.` (possibly with WARN lines, no FAIL). If duplicate IDs are found, they must be fixed before proceeding.

- [ ] **Step 6: Commit**

```bash
git add tests/content/validate-structure.js
git commit -m "feat: validate-structure — duplicate ID check and innerHTML accumulation lint"
```

---

## Task 2: post-run-analysis.js — screenshot selection + curated paths

**Files:**
- Modify: `tests/e2e/post-run-analysis.js`

- [ ] **Step 1: Read current file**

Read `tests/e2e/post-run-analysis.js` lines 1–92 (helpers + buildContext).

- [ ] **Step 2: Add selectCuratedScreenshots() after listScreenshots()**

Insert after the existing `listScreenshots()` function:

```js
// ---------------------------------------------------------------------------
// Select ~20 curated screenshots: milestones + one per 50-pick interval
// ---------------------------------------------------------------------------
const MILESTONE_KEYWORDS = [
  'char_creation','first_result','combat','levelup','level_up',
  'stage_unlock','camp','climax','death','success','failure','stall',
];

function selectCuratedScreenshots(allShots) {
  const milestones = allShots.filter(f =>
    MILESTONE_KEYWORDS.some(kw => f.toLowerCase().includes(kw))
  );

  // One shot per 50-pick band: p000–p049, p050–p099, etc.
  const periodicBands = {};
  for (const f of allShots) {
    const m = f.match(/_p(\d{3})\./);
    if (!m) continue;
    const band = Math.floor(parseInt(m[1]) / 50) * 50;
    if (!periodicBands[band]) periodicBands[band] = f;
  }
  const periodic = Object.values(periodicBands);

  // Merge, deduplicate, cap at 20
  const seen = new Set();
  const result = [];
  for (const f of [...milestones, ...periodic]) {
    if (!seen.has(f) && result.length < 20) { seen.add(f); result.push(f); }
  }
  return result;
}
```

- [ ] **Step 3: Update buildContext() to include curated set**

In `buildContext()`, after `const shots = listScreenshots(ssDir || SCREENSHOTS);`, add:

```js
  const curatedShots = selectCuratedScreenshots(shots);
```

And in the returned object, add:

```js
    curatedShots,
    ssDir: ssDir || SCREENSHOTS,
```

- [ ] **Step 4: Update log parser to capture new log entries**

In `buildContext()`, after the existing `const probes = ...` line, add:

```js
  const hudMismatches = (log.match(/\[hud-mismatch[^\n]*/g) || []).slice(0, 30);
  const duplicates    = (log.match(/\[DUPLICATE[^\n]*/g)    || []).slice(0, 30);
```

In `logExcerpt` array, add new sections:

```js
      '## HUD MISMATCHES', ...hudMismatches,
      '## DOM DUPLICATES', ...duplicates,
```

- [ ] **Step 5: Verify buildContext returns correctly by reading it back**

Read the modified `buildContext` function to confirm `curatedShots` and the new log sections are present.

- [ ] **Step 6: Commit**

```bash
git add tests/e2e/post-run-analysis.js
git commit -m "feat: post-run-analysis — screenshot selection + extended log parser"
```

---

## Task 3: post-run-analysis.js — image delivery (analyzeWithImages)

**Files:**
- Modify: `tests/e2e/post-run-analysis.js`

- [ ] **Step 1: Read current analyzeWithCLI and analyzeWithSDK**

Read lines 170–248 to understand current CLI and SDK paths before modifying.

- [ ] **Step 2: Add buildStreamJsonInput()**

Insert before `analyzeWithCLI()`:

```js
// ---------------------------------------------------------------------------
// Build a stream-json input file for claude -p --input-format stream-json
// Embeds base64 images alongside the analysis prompt.
// ---------------------------------------------------------------------------
function buildStreamJsonInput(domain, ctx, imagePaths) {
  const systemText = [
    `You are a focused game QA analyst for "Ledger of Ash", a text-RPG browser game.`,
    `Report only findings supported by the data provided. Be specific and actionable.`,
    `Format findings as [P0/P1/P2] — description.`,
    `Domain: ${domain.label}. Focus: ${domain.focus}`,
  ].join(' ');

  const analysisText = [
    `## Playtest Report`,
    ctx.report.slice(0, 8000),
    ``,
    `## Log Excerpts`,
    ctx.logExcerpt.slice(0, 6000),
    ``,
    `## Instructions`,
    `- Report findings as P0 (critical), P1 (important), P2 (nice to have)`,
    `- Be specific: quote the exact text, log line, or describe what you see in a screenshot`,
    `- Do NOT invent issues not supported by the data above`,
    `- Format each finding as: [P0/P1/P2] [location if known] — description`,
    `- End with: "N issues found (X P0, Y P1, Z P2)"`,
  ].join('\n');

  const content = [{ type: 'text', text: systemText }];

  // Add image blocks (skip files > 2MB)
  for (const imgPath of imagePaths) {
    try {
      const stat = fs.statSync(imgPath);
      if (stat.size > 2 * 1024 * 1024) {
        console.warn(`[post-run-analysis] skip oversized image: ${path.basename(imgPath)}`);
        continue;
      }
      const ext = path.extname(imgPath).toLowerCase();
      const mediaType = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';
      const data = fs.readFileSync(imgPath).toString('base64');
      content.push({ type: 'image', source: { type: 'base64', media_type: mediaType, data } });
    } catch (e) {
      console.warn(`[post-run-analysis] skip unreadable image: ${path.basename(imgPath)}: ${e.message}`);
    }
  }

  content.push({ type: 'text', text: analysisText });

  // Stream-json format: one JSON object per line
  return JSON.stringify({ role: 'user', content }) + '\n';
}
```

- [ ] **Step 3: Add analyzeWithImages()**

Insert after `buildStreamJsonInput()`:

```js
// ---------------------------------------------------------------------------
// Image-aware analysis: CLI stream-json primary, SDK fallback, text-only final
// ---------------------------------------------------------------------------
function analyzeWithImages(domain, ctx, imagePaths) {
  // If no images available, fall through to text-only CLI path
  if (!imagePaths || imagePaths.length === 0) {
    return analyzeWithCLI(domain, ctx);
  }

  const tmpFile = path.join(TEST_RESULTS, `_analysis_stream_${domain.id}.jsonl`);
  try {
    fs.writeFileSync(tmpFile, buildStreamJsonInput(domain, ctx, imagePaths), 'utf8');
    const result = execSync(
      `claude -p --input-format stream-json < "${tmpFile}"`,
      { encoding: 'utf8', timeout: 180000, shell: true }
    );
    fs.unlinkSync(tmpFile);
    return result.trim();
  } catch (err) {
    try { fs.unlinkSync(tmpFile); } catch (_) {}

    // Fallback 1: Anthropic SDK (if key present)
    let Anthropic;
    try { Anthropic = require('@anthropic-ai/sdk'); } catch (_) {}
    if (Anthropic && process.env.ANTHROPIC_API_KEY) {
      console.warn(`[post-run-analysis] stream-json failed for ${domain.id}, trying SDK`);
      // SDK fallback is synchronous wrapper — run via analyzeWithSDK which is async
      // Return a sentinel; main() handles the async SDK call separately
      return null; // signals main() to use async SDK path
    }

    // Fallback 2: text-only CLI
    console.warn(`[post-run-analysis] image analysis failed for ${domain.id}, falling back to text-only`);
    return analyzeWithCLI(domain, ctx);
  }
}
```

- [ ] **Step 4: Update main() to use analyzeWithImages**

In `main()`, replace the domain analysis loop:

```js
  // Run all domains
  const findings = {};
  for (const domain of DOMAINS) {
    console.log(`[post-run-analysis] analyzing: ${domain.label}...`);
    const curatedPaths = ctx.curatedShots.map(f => path.join(ctx.ssDir, f));

    // Try image-aware path first
    const syncResult = analyzeWithImages(domain, ctx, curatedPaths);
    if (syncResult !== null) {
      findings[domain.id] = syncResult;
    } else {
      // syncResult === null means SDK fallback needed (async)
      findings[domain.id] = await analyzeWithSDK(domain, ctx, curatedPaths)
        .catch(e => `[sdk-error: ${e.message}]`);
    }
  }
```

- [ ] **Step 5: Update analyzeWithSDK to accept optional imagePaths**

Modify the `analyzeWithSDK` signature and user content to include image blocks when provided:

```js
async function analyzeWithSDK(domain, ctx, imagePaths) {
  let Anthropic;
  try { Anthropic = require('@anthropic-ai/sdk'); } catch (_) { return null; }
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const systemPrompt = `You are a focused game QA analyst for "Ledger of Ash", a text-RPG browser game. Report only findings supported by the data provided. Be specific and actionable. Format findings as [P0/P1/P2] — description.`;

  const content = [];

  // Add images if provided
  if (imagePaths && imagePaths.length > 0) {
    for (const imgPath of imagePaths) {
      try {
        const stat = fs.statSync(imgPath);
        if (stat.size > 2 * 1024 * 1024) continue;
        const ext = path.extname(imgPath).toLowerCase();
        const mediaType = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';
        const data = fs.readFileSync(imgPath).toString('base64');
        content.push({ type: 'image', source: { type: 'base64', media_type: mediaType, data } });
      } catch (_) {}
    }
  }

  const textContent = [
    `## Domain: ${domain.label}`,
    `Focus: ${domain.focus}`,
    ``,
    `## Playtest Report`,
    ctx.report.slice(0, 10000),
    ``,
    `## Log Excerpts`,
    ctx.logExcerpt.slice(0, 8000),
  ].join('\n');

  content.push({ type: 'text', text: textContent });

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2048,
    system: systemPrompt,
    messages: [{ role: 'user', content }],
  });

  return msg.content[0].type === 'text' ? msg.content[0].text : '[no text response]';
}
```

- [ ] **Step 6: Run analysis against latest report to verify**

```bash
cd C:\Users\CEO\ledger-of-ash
node tests/e2e/post-run-analysis.js
```

Expected: script runs to completion, produces `test-results/playtest-analysis-*.md` with `Screenshots analyzed: N` header showing a non-zero curated count. No crash on image loading.

- [ ] **Step 7: Commit**

```bash
git add tests/e2e/post-run-analysis.js
git commit -m "feat: post-run-analysis — image delivery via CLI stream-json + SDK fallback + 12-domain analysis"
```

---

## Task 4: post-run-analysis.js — new domains (hud_integrity, ui_duplication)

**Files:**
- Modify: `tests/e2e/post-run-analysis.js`

- [ ] **Step 1: Read current DOMAINS array**

Read the `DOMAINS` array (lines 97–168) to find the correct insertion point.

- [ ] **Step 2: Append two new domains to DOMAINS array**

After the last existing domain object (tutorial), add:

```js
  {
    id: 'hud_integrity',
    label: 'HUD / G-State Cross-Reference',
    focus: 'Verify that HP, XP, level, gold, stage label, location name, sp1/sp2 progress, '
         + 'skill values (combat/stealth/survival/lore/persuasion/craft), faction heat rows, '
         + 'and alignment bars shown on screen match the G-state values recorded in the log '
         + 'at the same pick number. Flag any [hud-integrity] VIOLATION or [hud-mismatch] '
         + 'log entries. In screenshots, identify HUD fields that appear blank, incorrect, '
         + 'cut off, or showing a value that contradicts the log. Emit mismatches as [P0].',
    logHeavy: true,
  },
  {
    id: 'ui_duplication',
    label: 'UI Duplication / Double-Render Audit',
    focus: 'Identify DOM elements that render more than once when they should appear once: '
         + '#hud-hp, .result-text, .stage-banner, .levelup-notice, .env-desc. '
         + 'Flag duplicate choice labels in the action panel (same text appearing twice). '
         + 'Flag duplicate quest entries. Scan [DUPLICATE] log entries and report each as '
         + 'a finding. In screenshots, look for any text, stat value, button label, or UI '
         + 'element that appears visibly doubled or stacked. Emit as [P0] if a singleton '
         + 'is duplicated, [P1] if a choice label or quest entry repeats.',
    logHeavy: true,
  },
```

- [ ] **Step 3: Run analysis again and verify new domains appear in output**

```bash
cd C:\Users\CEO\ledger-of-ash
node tests/e2e/post-run-analysis.js
```

Expected: `test-results/playtest-analysis-*.md` now contains `## HUD / G-State Cross-Reference` and `## UI Duplication / Double-Render Audit` sections.

- [ ] **Step 4: Commit**

```bash
git add tests/e2e/post-run-analysis.js
git commit -m "feat: post-run-analysis — add hud_integrity and ui_duplication analysis domains"
```

---

## Task 5: playtest-headed.spec.js — probeDuplicates()

**Files:**
- Modify: `tests/e2e/playtest-headed.spec.js`

- [ ] **Step 1: Read probeHUD and surrounding context**

Read lines 442–500 to see the full `probeHUD` function and understand where to insert the new helper.

- [ ] **Step 2: Add probeDuplicates() after probeChoiceBorders()**

Read to find `probeChoiceBorders` end line (~490), then insert:

```js
async function probeDuplicates(page, tag, picks) {
  try {
    // Singleton elements that must appear at most once
    const singletons = [
      '#hud-hp','#hud-level','#hud-gold','#hud-renown','#hud-day',
      '#hud-location','#topbar-stage','.result-text',
      '.stage-banner','.levelup-notice','.env-desc',
    ];
    for (const sel of singletons) {
      const count = await page.locator(sel).count().catch(() => 0);
      if (count > 1) log(`[DUPLICATE ${tag}] pick=${picks} element=${sel} count=${count}`);
    }

    // Duplicate choice labels in the active panel
    const labels = await page.locator('.choice-btn:visible').allInnerTexts().catch(() => []);
    const labelFreq = {};
    for (const l of labels) {
      const key = l.trim().slice(0, 60);
      labelFreq[key] = (labelFreq[key] || 0) + 1;
    }
    for (const [label, count] of Object.entries(labelFreq)) {
      if (count > 1) log(`[DUPLICATE ${tag}] pick=${picks} choice-label="${label}" count=${count}`);
    }

    // Duplicate quest entries
    const quests = await page.locator('.quest-entry').allInnerTexts().catch(() => []);
    const questFreq = {};
    for (const q of quests) {
      const key = q.trim().slice(0, 80);
      questFreq[key] = (questFreq[key] || 0) + 1;
    }
    for (const [quest, count] of Object.entries(questFreq)) {
      if (count > 1) log(`[DUPLICATE ${tag}] pick=${picks} quest="${quest}" count=${count}`);
    }

    // Duplicate narrative text containers
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
```

- [ ] **Step 3: Call probeDuplicates in the main pick loop**

Find the line in the main pick loop where `probeHUD` is called (currently called every `PROBE_EVERY` picks, around line 1226). Directly after that call, add:

```js
        await probeDuplicates(page, tag, picks);
```

- [ ] **Step 4: Verify the spec still passes jest**

```bash
cd C:\Users\CEO\ledger-of-ash
npx jest
```

Expected: 398/398 passing.

- [ ] **Step 5: Commit**

```bash
git add tests/e2e/playtest-headed.spec.js
git commit -m "feat: playtest-headed — probeDuplicates() probe every 20 picks, logs [DUPLICATE ...] entries"
```

---

## Task 6: playtest-headed.spec.js — extend probeHUD with full G-state cross-check

**Files:**
- Modify: `tests/e2e/playtest-headed.spec.js`

- [ ] **Step 1: Read probeHUD and probeCharSheet in full**

Read lines 442–560 to see the complete `probeHUD` and `probeCharSheet` functions.

- [ ] **Step 2: Extend probeHUD with gold, heat, and alignment checks**

Inside `probeHUD()`, after the existing `if (g.supply < 0)` line, add:

```js
    // Gold DOM vs G check
    const hudGoldNum = parseInt(hudGold.replace(/[^0-9]/g, '')) || 0;
    if (g.gold !== undefined && hudGoldNum !== 0 && hudGoldNum !== g.gold)
      log(`[hud-mismatch ${tag}] VIOLATION: gold G=${g.gold} shown=${hudGoldNum}`);

    // Heat row check — read rendered polity heat pips
    try {
      const heatRow = await page.locator('#hud-heat-row').innerText().catch(() => '');
      if (heatRow && g.heat) {
        // Heat row format: "Shelk: 3  Roaz: 0  ..." — basic presence check
        const polities = Object.keys(g.heat || {});
        for (const pol of polities) {
          if ((g.heat[pol] || 0) > 0 && !heatRow.toLowerCase().includes(pol.toLowerCase())) {
            log(`[hud-mismatch ${tag}] WARN: polity=${pol} has heat=${g.heat[pol]} but not visible in heat row`);
          }
        }
      }
    } catch (_) {}

    // Alignment bar check — only when threshold ±10 met
    try {
      const ben = g.benevolence || 0;
      const ord = g.orderAxis || 0;
      if (Math.abs(ben) >= 10) {
        const barVisible = await page.locator('.alignment-bar, [class*="alignment"]').count().catch(() => 0);
        if (barVisible === 0)
          log(`[hud-mismatch ${tag}] WARN: benevolence=${ben} (>= threshold) but alignment bar not visible`);
      }
      if (Math.abs(ord) >= 10) {
        const barVisible = await page.locator('.order-bar, [class*="order-axis"]').count().catch(() => 0);
        if (barVisible === 0)
          log(`[hud-mismatch ${tag}] WARN: orderAxis=${ord} (>= threshold) but order bar not visible`);
      }
    } catch (_) {}
```

- [ ] **Step 3: Extend probeCharSheet with skill value cross-check**

Inside `probeCharSheet()`, after the existing screenshot call (line ~496), add:

```js
    // Skill value cross-check: G.skills[key] vs rendered .char-skill-row
    if (g && g.skills) {
      const SKILL_KEYS = ['combat','stealth','survival','lore','persuasion','craft'];
      for (const key of SKILL_KEYS) {
        const expected = g.skills[key];
        if (expected === undefined) continue;
        try {
          // Char sheet renders each skill in a row; try data-skill attribute or sequential match
          const rowText = await page.locator(`.char-skill-row[data-skill="${key}"] .skill-val`).innerText().catch(() => '');
          const shown = parseInt(rowText) || 0;
          if (rowText && shown !== expected)
            log(`[hud-mismatch ${tag}] VIOLATION: skill=${key} G=${expected} shown=${shown}`);
        } catch (_) {}
      }
    }
```

- [ ] **Step 4: Run jest to confirm no regressions**

```bash
cd C:\Users\CEO\ledger-of-ash
npx jest
```

Expected: 398/398 passing.

- [ ] **Step 5: Run content validator**

```bash
node tests/content/validate-content.js
```

Expected: All checks passed.

- [ ] **Step 6: Commit**

```bash
git add tests/e2e/playtest-headed.spec.js
git commit -m "feat: playtest-headed — extend probeHUD with gold/heat/alignment cross-check and skill cross-check in probeCharSheet"
```

---

## Task 7: Protocol doc update + final verification

**Files:**
- Modify: `docs/PLAYTEST_PROTOCOL.md`

- [ ] **Step 1: Add new capabilities to Step 3 description in PLAYTEST_PROTOCOL.md**

In Step 3 (Headed run), after the existing "HUD integrity check every 20 picks via probeHUD()" bullet, add:

```markdown
- Duplicate DOM probe every 20 picks via probeDuplicates(): singleton elements, duplicate choice labels, quest entries, narrative text — logged as [DUPLICATE ...]
- Extended HUD cross-reference: gold, faction heat row, alignment bars, skill values (char sheet) — logged as [hud-mismatch ...]
```

In Step 4 (All-skills analysis), update the domain count:

```markdown
`node tests/e2e/post-run-analysis.js` — runs all 12 domains (adds hud_integrity and ui_duplication to prior 10)
```

In Step 0 (Validators), add to the run command:

```markdown
Also runs render integrity checks: duplicate HTML id= attributes (fail) and innerHTML += accumulation on render containers (warn).
```

- [ ] **Step 2: Run full validator suite one final time**

```bash
cd C:\Users\CEO\ledger-of-ash
node tests/content/validate-content.js && node tests/content/validate-flags.js && node tests/content/validate-structure.js
```

Expected: All checks passed (all three validators).

- [ ] **Step 3: Run jest**

```bash
npx jest
```

Expected: 398/398 passing.

- [ ] **Step 4: Commit**

```bash
git add docs/PLAYTEST_PROTOCOL.md
git commit -m "docs: update Playtest Protocol — document visual analysis, HUD cross-reference, and duplication probe"
```

---

## Verification Checklist

- [ ] `node tests/content/validate-structure.js` — passes, no duplicate IDs, any innerHTML += listed as WARN only
- [ ] `npx jest` — 398/398 passing
- [ ] `node tests/e2e/post-run-analysis.js` — produces analysis .md containing `## HUD / G-State Cross-Reference` and `## UI Duplication / Double-Render Audit` sections with non-empty content
- [ ] Analysis .md header shows `Screenshots analyzed: N` where N > 0
- [ ] After a headed spec run: `playtest-headed-log.md` contains at least one `[hud-integrity ...]` line (normal operation log, not a violation)
- [ ] `docs/superpowers/specs/2026-05-19-playtest-visual-analysis-design.md` committed
- [ ] `docs/superpowers/plans/2026-05-19-playtest-visual-analysis.md` committed
