#!/usr/bin/env node
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

const fs           = require('fs');
const path         = require('path');
const { execSync } = require('child_process');

const ROOT           = path.join(__dirname, '..', '..');
const TEST_RESULTS   = path.join(ROOT, 'test-results');
const SCREENSHOTS    = path.join(TEST_RESULTS, 'playthrough-screenshots');
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
// Build analysis context
// ---------------------------------------------------------------------------
function buildContext(reportPath, ssDir, logPath) {
  const report = readSafe(reportPath);
  const log    = readSafe(logPath);
  const shots  = listScreenshots(ssDir || SCREENSHOTS);

  // Extract key sections from log for focused analysis
  const violations = (log.match(/VIOLATION[^\n]*/g) || []).slice(0, 50);
  const jsErrors   = (log.match(/\[js-error[^\n]*/g) || []).slice(0, 30);
  const deadEnds   = (log.match(/\[dead-end[^\n]*/g) || []).slice(0, 30);
  const probes     = (log.match(/\[s2-probe[^\n]*/g) || []).slice(0, 20);
  const successes  = (log.match(/\[run:[^\]]+\] SUCCESS[^\n]*/g) || []);
  const failures   = (log.match(/\[run:[^\]]+\] (?:FAILED|DEAD|STALL|BLOCKED)[^\n]*/g) || []);

  return {
    report,
    logExcerpt: [
      '## VIOLATIONS', ...violations,
      '## JS ERRORS',  ...jsErrors,
      '## DEAD ENDS',  ...deadEnds,
      '## S2 PROBES',  ...probes,
      '## SUCCESSES',  ...successes,
      '## FAILURES',   ...failures,
    ].join('\n'),
    screenshots: shots,
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
];

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

  try {
    const result = execSync(
      'claude -p -',
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
async function analyzeWithSDK(domain, ctx) {
  let Anthropic;
  try { Anthropic = require('@anthropic-ai/sdk'); } catch (_) { return null; }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const systemPrompt = `You are a focused game QA analyst for "Ledger of Ash", a text-RPG browser game. Report only findings supported by the data provided. Be specific and actionable. Format findings as [P0/P1/P2] — description.`;

  const userContent = [
    `## Domain: ${domain.label}`,
    `Focus: ${domain.focus}`,
    ``,
    `## Playtest Report`,
    ctx.report.slice(0, 10000),
    ``,
    `## Log Excerpts`,
    ctx.logExcerpt.slice(0, 8000),
    ``,
    `## Screenshots Captured (${ctx.screenshots.length} total)`,
    ctx.screenshots.slice(0, 50).join('\n'),
  ].join('\n');

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 2048,
    system: systemPrompt,
    messages: [{ role: 'user', content: userContent }],
  });

  return msg.content[0].type === 'text' ? msg.content[0].text : '[no text response]';
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

  // Check if Anthropic SDK is available for API calls
  let useSDK = false;
  try { require('@anthropic-ai/sdk'); useSDK = !!process.env.ANTHROPIC_API_KEY; } catch (_) {}
  console.log(`[post-run-analysis] mode: ${useSDK ? 'Anthropic SDK' : 'claude CLI'}`);

  // Run all domains (sequentially to avoid rate limits / process conflicts)
  const findings = {};
  for (const domain of DOMAINS) {
    console.log(`[post-run-analysis] analyzing: ${domain.label}...`);
    if (useSDK) {
      findings[domain.id] = await analyzeWithSDK(domain, ctx).catch(e => `[sdk-error: ${e.message}]`);
    } else {
      findings[domain.id] = analyzeWithCLI(domain, ctx);
    }
  }

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
    if (domain.skills.length) {
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
}

main().catch(err => { console.error('[post-run-analysis] fatal:', err); process.exit(1); });
