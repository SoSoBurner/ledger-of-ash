#!/usr/bin/env node
// DEVELOPMENT TOOL — post-run second-pass skills synthesizer. Not game code, not shipped.
'use strict';
/**
 * post-run-skills-pass.js — Second-pass game-design skills synthesis
 *
 * Reads the completed analysis .md file produced by post-run-analysis.js,
 * calls the Claude API with 4 skill-pass prompts (balance, economy, fun, overall),
 * and writes a prioritized improvement plan to docs/superpowers/plans/.
 *
 * Usage:
 *   node tests/e2e/post-run-skills-pass.js <analysis-md-path>
 *
 * Spawned automatically by post-run-analysis.js after domain 13 completes.
 */

const fs   = require('fs');
const path = require('path');

const ROOT      = path.join(__dirname, '..', '..');
const PLANS_DIR = path.join(ROOT, 'docs', 'superpowers', 'plans');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function stamp(d) {
  d = d || new Date();
  const Y  = d.getFullYear();
  const M  = String(d.getMonth() + 1).padStart(2, '0');
  const D  = String(d.getDate()).padStart(2, '0');
  return `${Y}-${M}-${D}`;
}

function readSafe(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch (_) { return ''; }
}

/** Extract a named ## section from an analysis .md string. */
function extractSection(md, sectionName) {
  const re = new RegExp(`##\\s+${sectionName}[\\s\\S]*?(?=\\n##\\s|$)`, 'i');
  const m  = md.match(re);
  return m ? m[0].slice(0, 4000) : '';
}

// ---------------------------------------------------------------------------
// Claude API call (SDK primary, execSync CLI fallback)
// ---------------------------------------------------------------------------
async function callClaude(systemPrompt, userPrompt) {
  let Anthropic;
  try { Anthropic = require('@anthropic-ai/sdk'); } catch (_) {}

  if (Anthropic && process.env.ANTHROPIC_API_KEY) {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const msg = await client.messages.create({
      model:      'claude-sonnet-4-6',
      max_tokens: 2048,
      system:     systemPrompt,
      messages:   [{ role: 'user', content: [{ type: 'text', text: userPrompt }] }],
    });
    return msg.content[0].type === 'text' ? msg.content[0].text : '[no text response]';
  }

  // CLI fallback
  const { execSync } = require('child_process');
  const tmpFile = path.join(ROOT, 'tests', 'test-results', '_skills_pass_prompt.txt');
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
    return `[skills-pass failed: ${String(err.message).slice(0, 200)}]`;
  }
}

// ---------------------------------------------------------------------------
// Four skill-pass prompts
// ---------------------------------------------------------------------------
const SYSTEM = 'You are a game design consultant specializing in text-RPGs. ' +
  'Ledger of Ash is a vanilla ES5 browser game with stage-based progression, ' +
  'SP2 advancement, DC-based rolls, faction heat, and a 5-stage arc (V1.0 ships Stages 1-2). ' +
  'Be specific and actionable. Format findings as [P0/P1/P2] — description.';

async function balancePass(md) {
  const section = [
    extractSection(md, 'Combat'),
    extractSection(md, 'Balance'),
    extractSection(md, 'Economy'),
  ].join('\n\n').slice(0, 6000);

  return callClaude(
    SYSTEM,
    [
      '# Balance Review — game-design:balance-review pass',
      '',
      'Analyze the following combat/balance/economy findings from a recent playtest:',
      '',
      section || '(no combat/balance/economy section found in analysis)',
      '',
      'Provide balance recommendations covering:',
      '- DC hit rates per stage (are they too punishing or trivially easy?)',
      '- Combat frequency (too frequent / too sparse / pacing)',
      '- XP flow and level cap enforcement',
      '- Death causes (spikes vs attrition)',
      '- Gold / supply drain (sustainable or death-spiral?)',
      '',
      'Format as [P0/P1/P2] — recommendation. Be specific.',
    ].join('\n')
  );
}

async function economyPass(md) {
  const section = [
    extractSection(md, 'Economy'),
    extractSection(md, 'Resources'),
  ].join('\n\n').slice(0, 6000);

  return callClaude(
    SYSTEM,
    [
      '# Economy Review — game-design:economy-review pass',
      '',
      'Analyze the following economy/resource findings from a recent playtest:',
      '',
      section || '(no economy section found in analysis)',
      '',
      'Provide economy recommendations covering:',
      '- Gold acquisition vs spend rate',
      '- Supply drain vs replenishment',
      '- Shop availability and pricing',
      '- Negative balance violations (are players going broke?)',
      '- Resource sinks and reward loops',
      '',
      'Format as [P0/P1/P2] — recommendation. Be specific.',
    ].join('\n')
  );
}

async function funPass(md) {
  const section = [
    extractSection(md, 'Polish'),
    extractSection(md, 'UX'),
    extractSection(md, 'Tutorial'),
    extractSection(md, 'Onboarding'),
    extractSection(md, 'Voice'),
  ].join('\n\n').slice(0, 6000);

  return callClaude(
    SYSTEM,
    [
      '# Fun & Engagement Review — game-design:fun-review pass',
      '',
      'Analyze the following polish/UX/tutorial findings from a recent playtest:',
      '',
      section || '(no polish/UX/tutorial section found in analysis)',
      '',
      'Provide fun and engagement recommendations covering:',
      '- First-10-picks onboarding clarity',
      '- Moment-to-moment choice satisfaction',
      '- UI friction points (clicks, overlays, HUD readability)',
      '- Narrative voice consistency',
      '- Player agency feel (does success feel earned?)',
      '',
      'Format as [P0/P1/P2] — recommendation. Be specific.',
    ].join('\n')
  );
}

async function overallPlanPass(balanceResult, economyResult, funResult, md) {
  const codeAudit   = extractSection(md, 'Code Audit').slice(0, 2000);
  const progression = extractSection(md, 'Progression').slice(0, 2000);

  return callClaude(
    SYSTEM,
    [
      '# Overall Post-Playtest Improvement Plan',
      '',
      'Synthesize the following specialist reviews into a single prioritized improvement plan for Ledger of Ash.',
      '',
      '## Balance Review',
      balanceResult.slice(0, 2000),
      '',
      '## Economy Review',
      economyResult.slice(0, 2000),
      '',
      '## Fun & Engagement Review',
      funResult.slice(0, 2000),
      '',
      '## Stage Progression Findings',
      progression || '(none)',
      '',
      '## Code Audit Findings',
      codeAudit || '(none)',
      '',
      'Produce a prioritized task list in this format:',
      '### Tasks (prioritized)',
      '- [ ] **[P0]** Task description — *why: root cause / player impact*',
      '- [ ] **[P1]** Task description — *why: root cause / player impact*',
      '- [ ] **[P2]** Task description — *why: nice to have*',
      '',
      'Group by: P0 first, then P1, then P2.',
      'Do not repeat tasks across sections — merge duplicates into one line.',
      'End with a one-paragraph executive summary titled "## Executive Summary".',
    ].join('\n')
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const analysisPath = process.argv[2];
  if (!analysisPath || !fs.existsSync(analysisPath)) {
    console.error('[post-run-skills-pass] no analysis file provided or file not found:', analysisPath);
    process.exit(1);
  }

  console.log(`[post-run-skills-pass] reading analysis: ${path.basename(analysisPath)}`);
  const md = readSafe(analysisPath);
  if (!md) {
    console.error('[post-run-skills-pass] analysis file is empty');
    process.exit(1);
  }

  // Run 4 passes (sequentially to avoid rate-limit bursts)
  console.log('[post-run-skills-pass] balance pass...');
  const balanceResult  = await balancePass(md).catch(e => `[balance-error: ${e.message}]`);

  console.log('[post-run-skills-pass] economy pass...');
  const economyResult  = await economyPass(md).catch(e => `[economy-error: ${e.message}]`);

  console.log('[post-run-skills-pass] fun/engagement pass...');
  const funResult      = await funPass(md).catch(e => `[fun-error: ${e.message}]`);

  console.log('[post-run-skills-pass] overall plan synthesis...');
  const overallResult  = await overallPlanPass(balanceResult, economyResult, funResult, md)
    .catch(e => `[overall-error: ${e.message}]`);

  // ---------------------------------------------------------------------------
  // Write plan file
  // ---------------------------------------------------------------------------
  const now      = new Date();
  const dateStamp = stamp(now);
  const planName  = `${dateStamp}-post-playtest-plan.md`;
  const planPath  = path.join(PLANS_DIR, planName);

  // Extract a short goal from the overall result (first non-empty line after ##)
  const goalMatch = overallResult.match(/##\s+Executive Summary[\s\S]*?\n([^\n#]{10,200})/);
  const autoGoal  = goalMatch ? goalMatch[1].trim() : 'Resolve all P0 blockers and improve Stage II coverage.';

  const planContent = [
    '# Ledger of Ash — Post-Playtest Improvement Plan',
    '',
    '> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.',
    '',
    `**Goal:** ${autoGoal}`,
    '**Architecture:** Stage-based text-RPG; all game logic in ledger-of-ash.html + content/*.js; no bundler.',
    '**Tech Stack:** Vanilla ES5 JS (ledger-of-ash.html, content/*.js), Playwright E2E, Node.js validators',
    '',
    `**Generated:** ${now.toISOString()}`,
    `**Source analysis:** ${path.basename(analysisPath)}`,
    '',
    '---',
    '',
    '## Tasks (prioritized by playtest findings)',
    '',
    overallResult,
    '',
    '---',
    '',
    '## Balance Review (detail)',
    '',
    balanceResult,
    '',
    '## Economy Review (detail)',
    '',
    economyResult,
    '',
    '## Fun & Engagement Review (detail)',
    '',
    funResult,
    '',
    '---',
    `*Generated by post-run-skills-pass.js from ${path.basename(analysisPath)}*`,
  ].join('\n');

  fs.mkdirSync(PLANS_DIR, { recursive: true });
  fs.writeFileSync(planPath, planContent, 'utf8');
  console.log(`[post-run-skills-pass] plan written → ${planPath}`);
}

main().catch(function(err) {
  console.error('[post-run-skills-pass] fatal:', err);
  process.exit(1);
});
