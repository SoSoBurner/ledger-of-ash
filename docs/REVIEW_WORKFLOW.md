# Content Review Workflow — Ledger of Ash

This document describes the pipeline for reviewing and accepting new content into the game. Every new or substantially revised enriched choices file goes through this pipeline before it is considered complete.

The pipeline produces a documented decision: **APPROVED**, **APPROVED-WITH-NOTES**, or **REVISE**.

---

## Step 1 — Automated Gate (non-negotiable prerequisite)

Run:
```
npm run test:content
npm run test:continuity
```

If either command exits with errors, the content goes back to the author for fixes. Do not proceed to Step 2 until both commands pass.

The automated gate is not a first pass. It is a prerequisite. Content with outstanding FAIL violations is not reviewed — it is returned.

**WARNs do not block.** They appear in the review report and are noted in the narrative audit, but they do not prevent human review.

---

## Step 2 — Content Review Report

Run:
```
npm run review:content content/<filename>
```

This generates `docs/reviews/<filename>-review.md` with:
- Layer A automated findings (A1–A6 violations and warnings with choice numbers)
- Layer B human checklist (B1–B5 items pre-populated with flagged choice numbers)

Open the report. Read the Layer A findings. Then proceed to Step 3.

---

## Step 3 — Narrative Audit (human or AI session)

Work through the Layer B checklist in the review report. For each item, record a pass/revise call with a specific line citation.

**B1 — Scene openings.** Does the result text open with an observable action, sensory detail, or physical setting? If it opens with a verdict or procedural summary, revise.

**B2 — NPC register and tell.** For any named NPC in dialogue: does their register match their dossier? Does their physical tell appear at least once? Cross-check against `data/reference/V33_2_extracted/V33_2_DnD_Repository/02_CANON_BASELINE/named_npcs/`.

**B3 — Rumor source texture.** Does the rumor feel overheard — a specific voice in a specific place — or does it read as a briefing with a label attached?

**B4 — Combat result vividness.** Any press/defend outcome must include at least one physical specific: body, weapon, surface, or sound. Flag generic outcome language.

**B5 — Subtext.** Every named NPC scene must have one layer of something unsaid. If every NPC line can be taken at face value, the scene needs a layer.

Append findings to the review report under a `## Narrative Audit Notes` section.

---

## Step 4 — Revision (if needed)

Author revises flagged items. After revision:
- Re-run Step 1 to confirm automated rules still pass.
- Re-run Step 2 to update the report.
- No full re-audit required unless major structural changes were made.

---

## Step 5 — Approval Notation

Reviewer appends the decision block to the review report:

```markdown
## Decision
Status: APPROVED / APPROVED-WITH-NOTES / REVISE
Date: YYYY-MM-DD
Notes: [any carry-forward items for future passes]
```

Commit the review report alongside the content file.

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run test:content` | A1–A6 gate across all enriched choice files |
| `npm run test:continuity` | Rules 1–5 continuity check across all content |
| `npm run review:content content/<file>` | Per-file report with Layer A findings + Layer B checklist |
| `npm test` | Jest logic unit tests |
| `npm run test:all` | All of the above in sequence |

---

## Content Standards Reference

See `docs/CONTENT_STANDARDS.md` for:
- A1–A6 automated rule definitions with pass/fail examples
- B1–B5 human review standards with pass/fail examples
- What each rule catches and why it exists
