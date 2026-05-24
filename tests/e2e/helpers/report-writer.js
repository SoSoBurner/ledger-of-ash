'use strict';
/**
 * report-writer.js — Structured markdown report generator
 *
 * Writes test-results/playtest-report-{YYYYMMDD-HHmm}-{mode}.md after each run.
 *
 * Usage:
 *   const ReportWriter = require('./helpers/report-writer');
 *   const rw = new ReportWriter('headed');
 *   rw.addFamily(familyResult);
 *   rw.setCeiling(ceiling);
 *   rw.setWarningBaseline(291);
 *   rw.write(coverageSummary);  // → returns written file path
 */

const fs   = require('fs');
const path = require('path');

const TEST_RESULTS = path.join(__dirname, '..', '..', 'test-results');

class ReportWriter {
  constructor(mode) {
    this._mode     = mode || 'headless';
    this._ceiling  = 'Stage II';
    this._families = [];
    this._warnBaseline = 291;
    this._jsErrors = [];
    this._startTime = new Date();
    this._transcripts = {};  // family → [{pick, choice, result}]
  }

  setCeiling(ceiling)          { this._ceiling = ceiling; }
  setWarningBaseline(n)        { this._warnBaseline = n; }
  addFamily(result)            { this._families.push(result); }
  addJsError(err)              { this._jsErrors.push(err); }

  addTranscriptEntry(family, pick, choiceText, resultText) {
    if (!this._transcripts[family]) this._transcripts[family] = [];
    this._transcripts[family].push({ pick, choice: (choiceText || '').slice(0, 200), result: (resultText || '').slice(0, 400) });
  }

  writeTranscripts() {
    const stamp = _stamp(this._startTime);
    const written = [];
    for (const family of Object.keys(this._transcripts)) {
      const entries = this._transcripts[family];
      if (!entries || !entries.length) continue;
      const filename = `playtest-transcript-${stamp}-${family}.md`;
      const outPath  = path.join(TEST_RESULTS, filename);
      const lines = [`# Narrative Transcript — ${family} — ${stamp}`, ''];
      for (const e of entries) {
        lines.push(`## Pick ${e.pick}`);
        lines.push(`**Choice:** ${e.choice}`);
        if (e.result) { lines.push(''); lines.push(`> ${e.result.replace(/\n/g, '\n> ')}`); }
        lines.push('');
      }
      fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
      written.push(outPath);
    }
    return written;
  }

  /**
   * Writes the report to disk.
   * @param {object} coverage — from CoverageTracker.getSummary()
   * @param {number} warnCount — current validator warning count
   * @returns {string} — written file path
   */
  write(coverage, warnCount) {
    coverage   = coverage   || {};
    warnCount  = warnCount  || 0;

    const stamp    = _stamp(this._startTime);
    const filename = `playtest-report-${stamp}-${this._mode}.md`;
    const outPath  = path.join(TEST_RESULTS, filename);
    const passed   = this._families.filter(f => f.success).length;
    const total    = this._families.length;
    const newWarns = Math.max(0, warnCount - this._warnBaseline);

    const lines = [];

    lines.push(`# Playtest Report — ${stamp} (${this._mode})`);
    lines.push(`**Generated:** ${new Date().toISOString()}`);
    lines.push('');
    lines.push('## Run Summary');
    lines.push(`| Item | Value |`);
    lines.push(`|---|---|`);
    lines.push(`| Stage ceiling | ${this._ceiling} |`);
    lines.push(`| Families passed | ${passed}/${total} |`);
    lines.push(`| Mode | ${this._mode} |`);
    lines.push(`| Nuclear gate fires | ${coverage.nuclearGateFired || 0} |`);
    lines.push(`| Total picks across all families | ${coverage.totalPicks || 0} |`);
    lines.push(`| Localities visited | ${coverage.localitiesVisited || 0} |`);
    lines.push(`| Map travels executed | ${(coverage.mapTravels || []).length} |`);
    lines.push(`| Dead-ends encountered | ${(coverage.deadEnds || []).length} |`);
    lines.push(`| JS errors logged | ${this._jsErrors.length} |`);
    lines.push(`| Validator warnings (new above baseline) | ${newWarns} |`);
    lines.push('');

    lines.push('## Family Results');
    lines.push('| Family | Archetype | BG | Result | Picks | Final sp2 | Stage |');
    lines.push('|---|---|---|---|---|---|---|');
    for (const f of this._families) {
      const res = f.success ? '✅ SUCCESS' : `❌ ${f.reason || 'failed'}`;
      lines.push(`| ${f.family} | ${f.archetypeId || '—'} | ${f.backgroundId || '—'} | ${res} | ${f.picks || 0} | ${f.sp2 || 0} | ${f.stage || '—'} |`);
    }
    lines.push('');

    lines.push('## Stage Gate Status');
    lines.push('| Gate | Status |');
    lines.push('|---|---|');
    lines.push(`| canAdvanceToStage3 | ${this._ceiling === 'Stage II' ? '**false** (hardcoded — Stage III not built)' : 'true'} |`);
    lines.push(`| canAdvanceToStage4 | ${['Stage II','Stage III'].includes(this._ceiling) ? 'false' : 'true'} |`);
    lines.push(`| canAdvanceToStage5 | ${this._ceiling !== 'Stage V' ? 'false' : 'true'} |`);
    lines.push('');

    lines.push('## Locality Coverage Map');
    lines.push('| Locality | Visits | First Visit Pick | sp2 Contributed | Dead-ends | Map Travels |');
    lines.push('|---|---|---|---|---|---|');
    for (const row of (coverage.localityRows || [])) {
      const gap = row.sp2Contributed === 0 ? ' ⚠️' : '';
      lines.push(`| ${row.locId}${gap} | ${row.visits} | ${row.firstVisitPick} | ${row.sp2Contributed} | ${row.deadEnds} | ${row.mapTravels} |`);
    }
    if ((coverage.unvisited || []).length) {
      lines.push('');
      lines.push(`**Unvisited this run:** ${coverage.unvisited.join(', ')}`);
    }
    lines.push('');

    if ((coverage.coverageGaps || []).length) {
      lines.push('## ⚠️ Coverage Gaps (localities visited with 0 sp2 contribution)');
      for (const loc of coverage.coverageGaps) {
        lines.push(`- \`${loc}\` — visited but no sp2-advancing choices triggered`);
      }
      lines.push('');
    }

    if ((coverage.zeroSp2Stage2Localities || []).length) {
      lines.push('## [stage2-coverage-gaps] zero-sp2-locs');
      lines.push(`\`\`\`\n${coverage.zeroSp2Stage2Localities.join(', ')}\n\`\`\``);
      lines.push('');
    }

    if ((coverage.deadEnds || []).length) {
      lines.push('## Dead-ends Log');
      lines.push('| Pick | Locality | HTML Snippet |');
      lines.push('|---|---|---|');
      for (const d of coverage.deadEnds) {
        lines.push(`| ${d.pick} | ${d.loc} | \`${(d.htmlSnippet || '').replace(/\|/g, '/')} \` |`);
      }
      lines.push('');
    }

    if ((coverage.mapTravels || []).length) {
      lines.push('## Map Travels Log');
      lines.push('| Pick | From | To |');
      lines.push('|---|---|---|');
      for (const t of coverage.mapTravels) {
        lines.push(`| ${t.pick} | ${t.fromLoc} | ${t.toLoc} |`);
      }
      lines.push('');
    }

    if (this._jsErrors.length) {
      lines.push('## JS Errors Logged');
      for (const e of this._jsErrors) {
        lines.push(`- \`${e}\``);
      }
      lines.push('');
    }

    lines.push('## Warnings');
    lines.push(`Baseline: ${this._warnBaseline} | Current: ${warnCount} | **New above baseline: ${newWarns}**`);
    if (newWarns > 0) {
      lines.push('');
      lines.push('> ⚠️ New warnings detected above baseline. Run `node tests/content/validate-content.js` for details.');
    }
    lines.push('');

    lines.push('---');
    lines.push('*Generated by Ledger of Ash Playtest Harness v2*');

    fs.mkdirSync(TEST_RESULTS, { recursive: true });
    fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
    return outPath;
  }
}

function _stamp(date) {
  const d = date || new Date();
  const YY = d.getFullYear();
  const MM = String(d.getMonth() + 1).padStart(2, '0');
  const DD = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${YY}${MM}${DD}-${hh}${mm}`;
}

module.exports = ReportWriter;
