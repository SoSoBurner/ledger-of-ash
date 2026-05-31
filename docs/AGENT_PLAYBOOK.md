# Agent Playbook — Ledger of Ash

Practical reference for dispatching Claude Code agents on this project. Based on proven workflows from May 2026 playtest cycle.

## Agent Types Available

| Type | Best For | Speed | Cost |
|------|----------|-------|------|
| **Explore** | Codebase questions, file discovery, architecture review | Very fast | Free |
| **Haiku** | Mechanical tasks, simple content fixes, syntax validation | Fast | Cheap |
| **Sonnet** | Reviews, complex implementation, multi-file reasoning | Medium | Standard |
| **Opus** | Architecture decisions, deep refactoring, edge case resolution | Slower | Expensive |

## When to Dispatch Agents

**Single-file tasks** — Always dispatch immediately. Example:
- Implement new content in `content/shimmerdin_harbor_stage2.js`
- Fix validator errors in one file
- Rewrite enriched choice function

**Reviews after implementation** — Two-stage mandatory:
1. **Spec reviewer** (Sonnet) → checks COMPLIANCE against requirements
   - Must pass before proceeding to stage 2
   - Fix and re-review if non-compliant
2. **Quality reviewer** (Sonnet) → checks CODE QUALITY
   - Must pass before marking complete
   - Fix and re-review if issues found

**Parallel work** — Safe for 3–4 agents working on DIFFERENT files simultaneously. Never parallelize work on the SAME file (merge conflict risk).

## Content Implementation Checklist

Every enriched choice function must include:

```js
advanceTime(1);
var roll = rollD20(skill);
// ... logic ...
if (roll >= DC) {
  G.stageProgress[2]++;
  maybeStageAdvance();
  gainXp(40);
  G.recentOutcomeType = 'success';
} else {
  maybeStageAdvance();
  gainXp(15);
  G.recentOutcomeType = 'failure';
}
```

**Forbidden in content:**
- `const`, `let`, arrow functions (ES5 only)
- `modGold()` in investigation choices
- Calls to non-existent `G.telemetry`

**Validation workflow:**
```bash
node --check content/[filename].js
node tests/content/validate-content.js 2>&1 | grep [filename]
```

## Common Review False Positives

| Issue | Status | Notes |
|-------|--------|-------|
| Missing `G.telemetry` call | ✓ OK | Property doesn't exist in engine — no bug |
| Missing `G.stageProgress` guard | ✓ OK | Engine initializes it; guard redundant but safe |
| `rollD20(skill)` no 2nd arg | ✓ OK | Second arg optional; single-arg is standard |

## Ledger of Ash Specifics

- **Source file:** `ledger-of-ash.html` — 17,000+ lines, ES5 only
- **Content:** All in `content/` — referenced via `<script>` tags in HTML
- **Never edit:** `dist/`, `js/`, `css/style.css` (dist build output, dead files)
- **Reference data:** `data/reference/V33_2_extracted/` — canon floor, read-only
- **Play:** `play.bat` opens root source in Chrome app mode (`file://` protocol)

## Commit Message Format

```
feat(content): [brief description] — new choice/content addition
fix(content): [brief description] — content bug fix or rebalance
feat(engine): [brief description] — new engine feature/mechanic
fix(engine): [brief description] — engine/HTML bug fix
```

Example: `feat(content): add 12 enriched choices to shimmerdin harbor stage2 progression`

## Parallel Dispatch Summary

**Safe to parallelize:** Independent content files → 1 agent per file
**Unsafe:** Same file touched by 2+ agents → sequential only
**Max concurrent:** 3–4 agents recommended
**Review loop:** Always sequential (spec → quality)
