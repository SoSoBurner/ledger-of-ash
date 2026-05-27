#!/usr/bin/env node
// DEVELOPMENT TOOL — post-run AI analysis harness. Not game code, not shipped.
'use strict';
/**
 * post-run-analysis.js — Post-playtest analysis script
 *
 * Reads the latest headed playtest report + log, dispatches parallel analysis
 * via Claude API (or claude CLI fallback), writes findings + fix plan.
 *
 * Usage:
 *   node tests/e2e/post-run-analysis.js [report-file] [screenshot-dir]
 *
 * Outputs:
 *   test-results/playtest-analysis-{YYYYMMDD-HHmm}.md
 *   docs/superpowers/plans/playtest-plan-{YYYYMMDD-HHmm}.md
 */

const fs             = require('fs');
const path           = require('path');
const { execSync }   = require('child_process');
const { spawn }      = require('child_process');

const ROOT           = path.join(__dirname, '..', '..');
const TEST_RESULTS   = path.join(ROOT, 'tests', 'test-results');
const SCREENSHOTS    = path.join(TEST_RESULTS, 'playthrough-screenshots', 'headed');
const PLANS_DIR      = path.join(ROOT, 'docs', 'superpowers', 'plans');
const LOG_FILE       = path.join(TEST_RESULTS, 'playtest-headed-log.md');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function stamp(d) {
  d = d || new Date();
  const Y  = d.getFullYear();
  const M  = String(d.getMonth() + 1).padStart(2, '0');
  const D  = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${Y}${M}${D}-${hh}${mm}`;
}

function findLatestReport(dir, arg) {
  if (arg && fs.existsSync(arg)) return arg;
  const files = fs.readdirSync(dir)
    .filter(f => f.startsWith('playtest-report-') && f.endsWith('-headed.md'))
    .map(f => ({ f, mtime: fs.statSync(path.join(dir, f)).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime);
  return files.length ? path.join(dir, files[0].f) : null;
}

function readSafe(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch (_) { return ''; }
}

function listScreenshots(dir) {
  try {
    return fs.readdirSync(dir)
      .filter(f => /\.(png|jpg|jpeg)$/i.test(f))
      .map(f => ({ name: f, mtime: fs.statSync(path.join(dir, f)).mtimeMs }))
      .sort((a, b) => a.mtime - b.mtime)
      .map(x => x.name);
  } catch (_) { return []; }
}

// ---------------------------------------------------------------------------
// Select ~20 curated screenshots: milestones + one per 50-pick interval
// ---------------------------------------------------------------------------
const MILESTONE_KEYWORDS = [
  'char_creation','first_result','combat','levelup','level_up',
  'stage_unlock','camp','climax','death','success','failure','stall',
  'prestall',
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

// ---------------------------------------------------------------------------
// Build analysis context
// ---------------------------------------------------------------------------
function buildContext(reportPath, ssDir, logPath) {
  const report = readSafe(reportPath);
  const log    = readSafe(logPath);
  const shots  = listScreenshots(ssDir || SCREENSHOTS);
  const curatedShots = selectCuratedScreenshots(shots);

  // Extract key sections from log for focused analysis
  const violations    = (log.match(/VIOLATION[^\n]*/g) || []).slice(0, 50);
  const jsErrors      = (log.match(/\[js-error[^\n]*/g) || []).slice(0, 30);
  const deadEnds      = (log.match(/\[dead-end[^\n]*/g) || []).slice(0, 30);
  const probes        = (log.match(/\[s2-probe[^\n]*/g) || []).slice(0, 20);
  const successes     = (log.match(/\[run:[^\]]+\] SUCCESS[^\n]*/g) || []);
  const failures      = (log.match(/\[run:[^\]]+\] (?:FAILED|DEAD|STALL|BLOCKED)[^\n]*/g) || []);
  const hudMismatches = (log.match(/\[hud-mismatch[^\n]*/g) || []).slice(0, 30);
  const duplicates    = (log.match(/\[DUPLICATE[^\n]*/g)    || []).slice(0, 30);

  return {
    report,
    logExcerpt: [
      '## VIOLATIONS', ...violations,
      '## JS ERRORS',  ...jsErrors,
      '## DEAD ENDS',  ...deadEnds,
      '## S2 PROBES',  ...probes,
      '## SUCCESSES',  ...successes,
      '## FAILURES',   ...failures,
      '## HUD MISMATCHES', ...hudMismatches,
      '## DOM DUPLICATES', ...duplicates,
    ].join('\n'),
    screenshots: shots,
    curatedShots,
    ssDir: ssDir || SCREENSHOTS,
    reportPath,
  };
}

// ---------------------------------------------------------------------------
// Analysis domains
// ---------------------------------------------------------------------------
const DOMAINS = [
  {
    id: 'engine',
    label: 'Engine / Logic Bugs',
    focus: 'JavaScript errors, silent failures, swallowed exceptions, undefined behaviour, dead-end patterns, stall-timeout causes',
    skills: ['silent-failure-hunter', 'code-reviewer'],
    logHeavy: true,
  },
  {
    id: 'progression',
    label: 'Stage Progression / sp2 Flow',
    focus: 'sp2 advancement rate, stage gate fires, localities with 0 sp2 contribution, coverage gaps, what choices are actually advancing sp2',
    skills: ['game-design:feedback-loop-review'],
    logHeavy: true,
  },
  {
    id: 'content',
    label: 'Content / Narrative Quality',
    focus: 'choice label quality (inner voice / ≤15 words / no infinitives), result text length and scene quality, canon compliance (no "investigation", no "meaningful", no "Ledger of Ash" in Stage 1-2), NPC names vs V33_2 canon',
    skills: ['line-editor', 'continuity-auditor', 'narration-surface-scanner'],
    logHeavy: true,
  },
  {
    id: 'combat',
    label: 'Combat / Balance',
    focus: 'combat frequency, DC hit rates, death causes, XP flow, level cap enforcement, encounters feeling fair vs punishing',
    skills: ['game-design:balance-review', 'game-design:mechanics-review'],
    logHeavy: true,
  },
  {
    id: 'economy',
    label: 'Economy / Resources',
    focus: 'gold/supply flow, shop availability, negative balance violations, supply drain rate, resource sinks',
    skills: ['game-design:economy-review'],
    logHeavy: true,
  },
  {
    id: 'coverage',
    label: 'Locality Coverage',
    focus: 'which localities were visited, which were never visited, coverage gaps (visited with 0 sp2), map travel effectiveness, dead-end hotspots',
    skills: ['continuity-auditor'],
    logHeavy: false,
  },
  {
    id: 'polish',
    label: 'Polish / UX',
    focus: 'UI consistency, HUD integrity (HP/XP/gold vs G state), typography, color role violations, choice border color misuse, missing UI elements, overall feel',
    skills: ['game-design:polish-review', 'game-design:fun-review'],
    logHeavy: false,
  },
  {
    id: 'humanizer',
    label: 'Voice and Register Audit',
    focus: 'AI-prose patterns in result text and NPC dialogue: "highlighting", "underscoring", "contributing to", "you realize", "you feel", "you sense". Flag any found — these must be stripped or rewritten.',
    skills: ['humanizer', 'line-editor'],
    logHeavy: false,
  },
  {
    id: 'branch_drift',
    label: 'Branch Drift Audit',
    focus: 'Repeated phrasing across choices in the same locality, option-set imbalance (safe choices outnumber bold 4:1+), result text that drifts from the locality voice register.',
    skills: ['branch-drift-auditor'],
    logHeavy: false,
  },
  {
    id: 'tutorial',
    label: 'Tutorial and Onboarding Review',
    focus: 'How to Play text, onboarding copy, tooltip strings, first-10-picks experience. Does the game explain the Universal Roll Rule? Is the faction contact hint visible when sp2>=10?',
    skills: ['game-design:tutorial-review'],
    logHeavy: false,
  },
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
    model: 'claude-opus-4-7',
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
    model: 'claude-opus-4-7',
  },
];

// ---------------------------------------------------------------------------
// Build a stream-json input file for: claude -p --input-format stream-json
// Embeds base64 images alongside the analysis prompt.
// ---------------------------------------------------------------------------
function buildStreamJsonInput(domain, ctx, imagePaths) {
  const systemText = [
    `You are a focused game QA analyst for "Ledger of Ash", a text-RPG browser game.`,
    `Report only findings supported by the data provided. Be specific and actionable.`,
    `Format findings as [P0/P1/P2] — description.`,
    `Domain: ${domain.label}. Focus: ${domain.focus}`,
  ].join(' ');

  const logExcerptStr = Array.isArray(ctx.logExcerpt) ? ctx.logExcerpt.join('\n') : ctx.logExcerpt;

  const analysisText = [
    `## Playtest Report`,
    ctx.report.slice(0, 8000),
    ``,
    `## Log Excerpts`,
    logExcerptStr.slice(0, 6000),
    ``,
    `## Instructions`,
    `- Report findings as P0 (critical), P1 (important), P2 (nice to have)`,
    `- Be specific: quote the exact text, log line, or describe what you see in a screenshot`,
    `- Do NOT invent issues not supported by the data above`,
    `- Format each finding as: [P0/P1/P2] [location if known] — description`,
    `- End with: "N issues found (X P0, Y P1, Z P2)"`,
  ].join('\n');

  const content = [{ type: 'text', text: systemText }];

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
  return JSON.stringify({ role: 'user', content }) + '\n';
}

// ---------------------------------------------------------------------------
// Image-aware analysis: CLI stream-json primary, SDK fallback, text-only final
// ---------------------------------------------------------------------------
function analyzeWithImages(domain, ctx, imagePaths) {
  if (!imagePaths || imagePaths.length === 0) {
    return analyzeWithCLI(domain, ctx);
  }

  const jsonlContent = buildStreamJsonInput(domain, ctx, imagePaths);
  try {
    const modelFlag = domain.model ? `--model ${domain.model}` : '--model claude-haiku-4-5-20251001';
    const raw = execSync(
      `claude -p --input-format stream-json --output-format stream-json ${modelFlag}`,
      {
        input: jsonlContent,
        encoding: 'utf8',
        timeout: 180000,
        maxBuffer: 10 * 1024 * 1024,
      }
    );
    // Parse stream-json output: extract text_delta events
    const textParts = [];
    for (const line of raw.split('\n')) {
      if (!line.trim()) continue;
      try {
        const obj = JSON.parse(line);
        if (obj.type === 'content_block_delta' && obj.delta && obj.delta.type === 'text_delta') {
          textParts.push(obj.delta.text);
        }
      } catch (_) {}
    }
    const extracted = textParts.join('').trim();
    return extracted || raw.trim();
  } catch (err) {
    let Anthropic;
    try { Anthropic = require('@anthropic-ai/sdk'); } catch (_) {}
    if (Anthropic && process.env.ANTHROPIC_API_KEY) {
      console.warn(`[post-run-analysis] stream-json failed for ${domain.id}, trying SDK`);
      return null; // signals main() to use async SDK path
    }

    console.warn(`[post-run-analysis] image analysis failed for ${domain.id}, falling back to text-only`);
    return analyzeWithCLI(domain, ctx);
  }
}

// ---------------------------------------------------------------------------
// Call Claude CLI for each domain
// ---------------------------------------------------------------------------
function analyzeWithCLI(domain, ctx) {
  const prompt = [
    `You are performing a focused playtest analysis for the game "Ledger of Ash" (a text-RPG browser game).`,
    ``,
    `## Your Analysis Domain: ${domain.label}`,
    `Focus exclusively on: ${domain.focus}`,
    ``,
    `## Playtest Report`,
    ctx.report.slice(0, 8000),
    ``,
    `## Log Excerpts`,
    ctx.logExcerpt.slice(0, 6000),
    ``,
    `## Screenshot List (${ctx.screenshots.length} screenshots captured)`,
    ctx.screenshots.slice(0, 40).join('\n'),
    ``,
    `## Instructions`,
    `- Report findings as P0 (critical — blocks release), P1 (important — fix before next build), P2 (nice to have)`,
    `- Be specific: quote the exact text, log line, or screenshot name where you saw the issue`,
    `- Do NOT invent issues not supported by the data above`,
    `- Format each finding as: [P0/P1/P2] [file/location if known] — description`,
    `- End with a one-line summary: "N issues found (X P0, Y P1, Z P2)"`,
  ].join('\n');

  // Write prompt to temp file to avoid shell escaping issues
  const tmpFile = path.join(TEST_RESULTS, `_analysis_prompt_${domain.id}.txt`);
  fs.writeFileSync(tmpFile, prompt, 'utf8');

  const modelFlag = domain.model ? `--model ${domain.model}` : '--model claude-haiku-4-5-20251001';
  try {
    const result = execSync(
      `claude -p ${modelFlag} -`,
      { input: fs.readFileSync(tmpFile, 'utf8'), encoding: 'utf8', timeout: 120000 }
    );
    fs.unlinkSync(tmpFile);
    return result.trim();
  } catch (err) {
    try { fs.unlinkSync(tmpFile); } catch (_) {}
    return `[analysis failed: ${String(err.message).slice(0, 200)}]`;
  }
}

// ---------------------------------------------------------------------------
// Anthropic SDK path (if available)
// ---------------------------------------------------------------------------
async function analyzeWithSDK(domain, ctx, imagePaths) {
  let Anthropic;
  try { Anthropic = require('@anthropic-ai/sdk'); } catch (_) { return null; }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const systemPrompt = `You are a focused game QA analyst for "Ledger of Ash", a text-RPG browser game. Report only findings supported by the data provided. Be specific and actionable. Format findings as [P0/P1/P2] — description.`;

  const logExcerptStr = Array.isArray(ctx.logExcerpt) ? ctx.logExcerpt.join('\n') : ctx.logExcerpt;

  const textContent = [
    `## Domain: ${domain.label}`,
    `Focus: ${domain.focus}`,
    ``,
    `## Playtest Report`,
    ctx.report.slice(0, 10000),
    ``,
    `## Log Excerpts`,
    logExcerptStr.slice(0, 8000),
    ``,
    `## Screenshots Captured (${ctx.screenshots.length} total)`,
    ctx.screenshots.slice(0, 50).join('\n'),
  ].join('\n');

  const content = [];

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

  content.push({ type: 'text', text: textContent });

  const msg = await client.messages.create({
    model: domain.model || 'claude-haiku-4-5-20251001',
    max_tokens: 2048,
    system: systemPrompt,
    messages: [{ role: 'user', content }],
  });

  return msg.content[0].type === 'text' ? msg.content[0].text : '[no text response]';
}

// ---------------------------------------------------------------------------
// Domain 13 — Static Code Audit
// ---------------------------------------------------------------------------
function runCodeAudit() {
  const gameRoot   = path.resolve(__dirname, '..', '..');
  const htmlPath   = path.join(gameRoot, 'ledger-of-ash.html');
  const contentDir = path.join(gameRoot, 'content');

  const findings = [];

  // 1. Scan ledger-of-ash.html for TODOs, FIXME, and stub return-false
  let htmlContent = '';
  try { htmlContent = fs.readFileSync(htmlPath, 'utf8'); } catch (e) {
    findings.push(`[ERROR] Could not read ledger-of-ash.html: ${e.message}`);
  }
  // Known intentional stubs — skip these lines in all HTML scan loops
  const KNOWN_STUBS = ['canAdvanceToStage3', 'canAdvanceToStage4', 'canAdvanceToStage5', 'STAGE2_BOSS_MODULE'];

  if (htmlContent) {
    const htmlLines = htmlContent.split('\n');
    htmlLines.forEach(function(line, i) {
      // Skip known intentional stubs before appending to findings
      if (KNOWN_STUBS.some(function(stub) { return line.includes(stub); })) return;
      if (/TODO|FIXME/.test(line)) {
        findings.push(`[TODO] ledger-of-ash.html:${i + 1} — ${line.trim()}`);
      }
      // return false; that isn't already commented out
      const commentIdx = line.indexOf('//');
      const retIdx     = line.indexOf('return false;');
      if (retIdx !== -1 && (commentIdx === -1 || retIdx < commentIdx)) {
        findings.push(`[STUB] ledger-of-ash.html:${i + 1} — ${line.trim()}`);
      }
    });

    // Empty function bodies: function name() {}
    const emptyFnRe = /function\s+\w+\s*\([^)]*\)\s*\{\s*\}/g;
    let m;
    while ((m = emptyFnRe.exec(htmlContent)) !== null) {
      const lineNo = htmlContent.slice(0, m.index).split('\n').length;
      findings.push(`[EMPTY-FN] ledger-of-ash.html:${lineNo} — ${m[0].slice(0, 80)}`);
    }
  }

  // 2. Scan content/*.js
  let contentFiles = [];
  try {
    contentFiles = fs.readdirSync(contentDir)
      .filter(function(f) {
        try { return fs.statSync(path.join(contentDir, f)).isFile() && f.endsWith('.js'); }
        catch (_) { return false; }
      });
  } catch (e) {
    findings.push(`[ERROR] Could not read content/: ${e.message}`);
  }

  for (const fname of contentFiles) {
    const fpath = path.join(contentDir, fname);
    let content = '';
    try { content = fs.readFileSync(fpath, 'utf8'); } catch (e) { continue; }

    // Choices with stageProgress but no maybeStageAdvance or failResult nearby
    // Line-by-line scan: window of ±8 lines around each stageProgress occurrence
    const lines = content.split('\n');
    for (var i = 0; i < lines.length; i++) {
      if (/stageProgress/.test(lines[i])) {
        var windowLines = lines.slice(Math.max(0, i - 8), Math.min(lines.length, i + 8)).join('\n');
        if (!windowLines.includes('maybeStageAdvance')) {
          findings.push(`[UNWIRED] ${fname}:${i + 1} — stageProgress without maybeStageAdvance nearby`);
        }
        if (!windowLines.includes('failResult')) {
          findings.push(`[MISSING-FAILRESULT] ${fname}:${i + 1} — stageProgress without failResult nearby`);
        }
      }
    }

    // G.flags.X = ... set in content files, never read in html
    const flagSetRe = /G\.flags\.(\w+)\s*=/g;
    let fm;
    while ((fm = flagSetRe.exec(content)) !== null) {
      const flag = fm[1];
      if (htmlContent && !htmlContent.includes(`G.flags.${flag}`)) {
        findings.push(`[ORPHANED-FLAG] ${fname} — G.flags.${flag} set but never read in ledger-of-ash.html`);
      }
    }
  }

  // 3. Specific checks on stage2_climax.js and stage2_antechamber.js
  const specialFiles = ['stage2_climax.js', 'stage2_antechamber.js'];
  for (const sf of specialFiles) {
    const sfPath = path.join(contentDir, sf);
    try {
      const sfContent = fs.readFileSync(sfPath, 'utf8');
      if (/TODO|FIXME/.test(sfContent)) {
        findings.push(`[TODO] content/${sf} — contains TODO/FIXME markers`);
      }
      if (/return false;/.test(sfContent)) {
        findings.push(`[STUB] content/${sf} — contains return false; (possible unfinished stub)`);
      }
      if (/\{\s*\}/.test(sfContent)) {
        findings.push(`[INCOMPLETE] content/${sf} — contains empty block {}`);
      }
    } catch (_) { /* file may not exist yet — skip */ }
  }

  return findings.slice(0, 50); // cap at 50
}

async function domain13_codeAudit(ctx) {
  const findings = runCodeAudit();

  const findingsSummary = findings.length > 0
    ? findings.map(function(f) { return `- ${f}`; }).join('\n')
    : 'No critical orphaned/unwired features found.';

  const systemPrompt = [
    'You are a game engine code auditor for Ledger of Ash, a text-RPG browser game (vanilla ES5 JS, ~16K lines).',
    'Analyze the static code findings and identify which represent genuine orphaned/unfinished features vs intentional stubs.',
    'The engine has a known intentional stub: canAdvanceToStage3() returns false (V1.0 scope freeze — not a bug).',
    'STAGE2_BOSS_MODULE exports checkTrigger (not shouldTrigger) — this is intentional, not a bug.',
  ].join(' ');

  const userPrompt = [
    'Static analysis findings from Ledger of Ash source files:',
    '',
    findingsSummary,
    '',
    'For each finding:',
    '1. Classify: BUG (broken at runtime) | STUB (intentionally unfinished) | ORPHANED (dead code) | INCOMPLETE (wired but empty)',
    '2. Priority: P0 (breaks gameplay) | P1 (missing feature) | P2 (technical debt)',
    '3. Recommended action',
    '',
    'Format output as a markdown checklist:',
    '## Code Audit Findings',
    '- [ ] [P0-BUG] ...',
    '- [ ] [P1-STUB] ...',
    '',
    'End with a "## Summary" section estimating total dev hours for all P0+P1 items.',
  ].join('\n');

  // Try Anthropic SDK first, fall back to CLI
  let Anthropic;
  try { Anthropic = require('@anthropic-ai/sdk'); } catch (_) {}

  if (Anthropic && process.env.ANTHROPIC_API_KEY) {
    try {
      const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      const msg = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 2048,
        system: systemPrompt,
        messages: [{ role: 'user', content: [{ type: 'text', text: userPrompt }] }],
      });
      return msg.content[0].type === 'text' ? msg.content[0].text : '[no text response]';
    } catch (e) {
      console.warn(`[post-run-analysis] domain13 SDK error: ${e.message}, falling back to CLI`);
    }
  }

  // CLI fallback
  const tmpFile = path.join(TEST_RESULTS, '_analysis_prompt_code_audit.txt');
  const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;
  fs.writeFileSync(tmpFile, fullPrompt, 'utf8');
  try {
    const result = execSync(
      'claude -p --model claude-sonnet-4-6 -',
      { input: fs.readFileSync(tmpFile, 'utf8'), encoding: 'utf8', timeout: 120000 }
    );
    try { fs.unlinkSync(tmpFile); } catch (_) {}
    return result.trim();
  } catch (err) {
    try { fs.unlinkSync(tmpFile); } catch (_) {}
    return `[code-audit failed: ${String(err.message).slice(0, 200)}]`;
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const reportArg = process.argv[2];
  const ssArg     = process.argv[3];
  const now       = new Date();
  const ts        = stamp(now);

  console.log('[post-run-analysis] starting...');

  const reportPath = findLatestReport(TEST_RESULTS, reportArg);
  if (!reportPath) {
    console.error('[post-run-analysis] no headed report found in', TEST_RESULTS);
    process.exit(1);
  }
  console.log(`[post-run-analysis] report: ${path.basename(reportPath)}`);

  const ctx = buildContext(reportPath, ssArg, LOG_FILE);
  console.log(`[post-run-analysis] ${ctx.screenshots.length} screenshots found`);

  // Run all domains (sequentially to avoid rate limits / process conflicts)
  const findings = {};
  for (const domain of DOMAINS) {
    console.log(`[post-run-analysis] analyzing: ${domain.label}...`);
    const curatedPaths = (ctx.curatedShots || []).map(f => path.join(ctx.ssDir || SCREENSHOTS, f));

    const syncResult = analyzeWithImages(domain, ctx, curatedPaths);
    if (syncResult !== null) {
      findings[domain.id] = syncResult;
    } else {
      findings[domain.id] = await analyzeWithSDK(domain, ctx, curatedPaths)
        .catch(e => `[sdk-error: ${e.message}]`);
    }
  }

  // Domain 13 — Static Code Audit (no screenshots needed, separate async path)
  console.log('[post-run-analysis] analyzing: Code Audit (static)...');
  findings['code_audit'] = await domain13_codeAudit(ctx)
    .catch(e => `[code-audit-error: ${e.message}]`);

  // ---------------------------------------------------------------------------
  // Build findings report
  // ---------------------------------------------------------------------------
  const analysisLines = [
    `# Playtest Analysis — ${ts}`,
    `**Source report:** ${path.basename(reportPath)}`,
    `**Generated:** ${now.toISOString()}`,
    `**Screenshots analyzed:** ${ctx.screenshots.length}`,
    '',
  ];

  let allP0 = [], allP1 = [], allP2 = [];

  for (const domain of DOMAINS) {
    const text = findings[domain.id] || '[no findings]';
    analysisLines.push(`## ${domain.label}`);
    if (domain.skills && domain.skills.length) {
      analysisLines.push(`*Skills: ${domain.skills.join(', ')}*`);
    }
    analysisLines.push('');
    analysisLines.push(text);
    analysisLines.push('');

    // Extract P0/P1/P2 lines for plan
    const p0 = (text.match(/\[P0\][^\n]*/g) || []);
    const p1 = (text.match(/\[P1\][^\n]*/g) || []);
    const p2 = (text.match(/\[P2\][^\n]*/g) || []);
    allP0 = allP0.concat(p0.map(l => `- ${domain.label}: ${l}`));
    allP1 = allP1.concat(p1.map(l => `- ${domain.label}: ${l}`));
    allP2 = allP2.concat(p2.map(l => `- ${domain.label}: ${l}`));
  }

  // Append Code Audit section
  {
    const text = findings['code_audit'] || '[no findings]';
    analysisLines.push('## Code Audit');
    analysisLines.push('');
    analysisLines.push(text);
    analysisLines.push('');

    const p0 = (text.match(/\[P0\][^\n]*/g) || []);
    const p1 = (text.match(/\[P1\][^\n]*/g) || []);
    const p2 = (text.match(/\[P2\][^\n]*/g) || []);
    allP0 = allP0.concat(p0.map(l => `- Code Audit: ${l}`));
    allP1 = allP1.concat(p1.map(l => `- Code Audit: ${l}`));
    allP2 = allP2.concat(p2.map(l => `- Code Audit: ${l}`));
  }

  // Write analysis report
  fs.mkdirSync(TEST_RESULTS, { recursive: true });
  const analysisPath = path.join(TEST_RESULTS, `playtest-analysis-${ts}.md`);
  fs.writeFileSync(analysisPath, analysisLines.join('\n'), 'utf8');
  console.log(`[post-run-analysis] analysis → ${analysisPath}`);

  // ---------------------------------------------------------------------------
  // Build fix plan
  // ---------------------------------------------------------------------------
  const planLines = [
    `# Playtest Fix Plan — ${ts}`,
    `**Source:** ${path.basename(reportPath)}`,
    `**Generated:** ${now.toISOString()}`,
    '',
    '## P0 — Critical (fix before any build)',
    allP0.length ? allP0.join('\n') : '- None detected',
    '',
    '## P1 — Important (fix in next session)',
    allP1.length ? allP1.join('\n') : '- None detected',
    '',
    '## P2 — Nice to have (backlog)',
    allP2.length ? allP2.join('\n') : '- None detected',
    '',
    '---',
    `*Generated by post-run-analysis.js from ${path.basename(reportPath)}*`,
  ];

  fs.mkdirSync(PLANS_DIR, { recursive: true });
  const planPath = path.join(PLANS_DIR, `playtest-plan-${ts}.md`);
  fs.writeFileSync(planPath, planLines.join('\n'), 'utf8');
  console.log(`[post-run-analysis] fix plan → ${planPath}`);

  console.log(`[post-run-analysis] done. P0=${allP0.length} P1=${allP1.length} P2=${allP2.length}`);

  // ---------------------------------------------------------------------------
  // Spawn second-pass skills script (non-blocking)
  // ---------------------------------------------------------------------------
  const skillsPassScript = path.resolve(__dirname, 'post-run-skills-pass.js');
  if (fs.existsSync(skillsPassScript)) {
    console.log(`[post-run-analysis] spawning skills pass → post-run-skills-pass.js`);
    spawn('node', [skillsPassScript, analysisPath], {
      detached: true,
      stdio:    'ignore',
    }).unref();
  }
}

main().catch(err => { console.error('[post-run-analysis] fatal:', err); process.exit(1); });
