# Content Authoring Standards — Design Spec
Date: 2026-04-23
Status: Approved

---

## Problem

Ledger of Ash has **838 pre-existing content violations** as of April 2026 — label length over 15 words, question-mark labels, forbidden phrases, and short result text. These are known debt, not new regressions.

Two gaps allow this debt to grow:

1. **No automated gate.** Nothing stops a new violation from entering the codebase. A validator exists (`tests/content/validate-content.js`) but only checks basic label rules and journal categories — it has no result-text rules at all.

2. **No writer-facing guide.** Authors have no reference for what "good" looks like before they write. The only feedback is post-hoc rejection from the validator, which tells them *what* is wrong but not *how* to fix it or why the standard exists.

Both gaps must close together. A validator without a guide produces frustration. A guide without a validator produces drift.

---

## Scope

This is **Subsystem 1** of the Ledger of Ash QA framework. The framework has four subsystems:

| # | Subsystem | Depends on |
|---|-----------|------------|
| 4 | Testing framework (logic + E2E) | — (built first) |
| 3 | Plot continuity system | Subsystem 4 |
| **1** | **Content authoring standards** | Subsystem 4 |
| 2 | Content review pipeline | All three above |

This spec covers Subsystem 1 only. It extends the existing validator, adds a per-file report generator, and produces a writer-facing guide. It does not cover plot continuity (Subsystem 3) or the review pipeline (Subsystem 2).

---

## Approach Decision: C — True Parallel

Three approaches were considered:

**A — Validator-led:** Build all rules first, derive the guide from violations. Writers have no reference until after the gate is built.

**B — Guide-led:** Write the guide first as a human standard, then build validators to enforce it. Content can slip through until validators are built. Guide may describe ideals that are hard to automate.

**C — True parallel (chosen):** Build one standard at a time: guide entry → validator rule → test. Every rule has a human explanation from day one. The guide and the gate always describe the same thing — they can't contradict each other because they're built in the same pass.

**Rationale for C:** The guide and the rules should describe the same thing. Building them in lock-step means zero drift between what the guide says and what the gate enforces. Writers can consult the guide while the gate is being built. Each standard is independently testable and shippable.

---

## Architecture

Three components:

| Component | File | Purpose |
|-----------|------|---------|
| Writer guide | `docs/CONTENT_STANDARDS.md` | Human-readable: what good looks like, with pass/fail pairs and rationale |
| Automated gate | `tests/content/validate-content.js` | Extended with A1–A6 rules; blocks bad content from merging |
| Review reporter | `tests/content/review-content.js` | Per-file report: automated findings + B1–B5 human checklist |

**Build sequence** — one standard per cycle, in order:

1. A1 + guide entry — result word count minimum (≥30 words)
2. A2 + guide entry — result word count range (warn 30–59, fail >120)
3. A3 + guide entry — no summary-register openers
4. A4 + guide entry — rumor source attribution
5. A5 + guide entry — NPC flag timing
6. A6 + guide entry — world clock transparency
7. `review-content.js` — wraps A1–A6, generates B1–B5 checklist
8. B-items — human judgment standards added to `CONTENT_STANDARDS.md`

---

## Automated Rules (A1–A6)

Rules are implemented as **pure, exported functions** in `validate-content.js`, unit-tested in Jest before being wired into the validator. This allows the rule logic to be tested independently and reused by `review-content.js`.

Each function signature:
- Returns `null` on pass
- Returns `{ level: 'fail' | 'warn', msg: string }` on violation

Result text is extracted from `choice.fn.toString()` by matching `addNarration(<title-arg>, '<result>')` patterns. This is a static analysis approach — no fn() execution required.

---

### A1 — Result Text Minimum Length

**Condition:** Result text < 30 words → **FAIL**

**Why:** Under 30 words is a placeholder, not a result. It tells the player what happened without showing it. The minimum is not a target — it's the floor below which the result fails to land in the scene at all.

**Guide language:** "Under 30 words is a placeholder, not a result."

**Pass:** Any result text ≥ 30 words that opens in the scene.

**Fail:** "You find the entry. Someone has already read it." (11 words — verdict without scene)

---

### A2 — Result Text Target Range

**Condition:** 30–59 words → **WARN** (emit word count, suggest expand). >120 words → **FAIL**

**Target range:** 60–90 words

**Why:** At 60 words a result earns its place. At 90 words it's complete. Past 120 words it scrolls — and scrolling breaks immersion. The warn at 30–59 signals the result is short but not broken. The fail at >120 signals the result is a passage, not a game beat.

**Guide language:** "At 60 words a result earns its place. At 90 it's complete. Past 120, it scrolls."

---

### A3 — No Summary-Register Openers

**Condition:** Result text begins (case-insensitive) with any of: `confirms`, `acknowledges`, `indicates`, `the result is`, `you learn that`, `it turns out` → **FAIL**

**Why:** These phrases open with a verdict — they position the player above the scene, not inside it. The dice already resolved; the result text should drop the player into what happens next, not summarize it.

**Guide language:** "Don't open with what happened. Open with where you are."

**Pass:** "The clerk sets the ledger down and does not look at you." (observable action — player is in the scene)

**Fail:** "Confirms the backlog exists and points you toward the third shelf." (procedural summary — player is above the scene)

---

### A4 — Rumor Source Attribution

**Condition:** Any `addJournal(text, 'rumor')` call where `text` contains no capitalized proper noun (NPC name), location reference, or social-role phrase ("a factor", "the clerk", "a wool merchant") → **FAIL**

**Detection:** Extracts rumor text from `fn.toString()` by matching `addJournal('<text>', 'rumor')` patterns. Checks for:
- Proper noun: two adjacent capitalized words (e.g. "Elior Cadrin")
- Location reference: `at/in/near/from the <word>`, or known location words (market, hall, inn, gate, ward, district, square, dock, harbor, wharf)
- Social role: merchant, factor, clerk, warden, innkeeper, stevedore, guildsman, handler, carter, broker, scribe, soldier, captain, lieutenant, marshal, sergeant, courier

**Why:** A rumor without a source is a briefing. Rumors in this game should feel overheard — they have a mouth and a room.

**Guide language:** "A rumor without a source is a briefing. Give it a mouth and a room."

**Pass:** "A stevedore at the south wharf said the cargo was rerouted before the manifest was logged — he saw it moved himself but didn't ask why."

**Fail:** "Word is the shipment was rerouted." (no source, no location, no register)

---

### A5 — NPC First-Encounter Flag Timing

**Condition:** In any `fn()` body, `G.flags.met_<name> = true` appears *after* an `addNarration()` call that contains the NPC's first-name segment → **FAIL**

**Detection:** Parses `fn.toString()` for `G.flags.met_<name> = true` assignments. For each one, scans the source before that position for `addNarration(` calls. If any addNarration call in the earlier source contains the first-name segment of `<name>` (case-insensitive), the timing is wrong.

**Why:** If the met flag is set during the outcome block (after narration), any subsequent check that gates on `G.flags.met_<name>` will see the wrong state on that same turn. Setting the flag before narration ensures correct state throughout the choice resolution.

**Guide language:** "Set the met flag before narration that assumes familiarity, not during the outcome block."

**Fail:**
```js
addNarration('', 'Elior sets the ledger down without looking at you.');
G.flags.met_elior = true; // too late
```

**Pass:**
```js
G.flags.met_elior = true;
addNarration('', 'Elior sets the ledger down without looking at you.');
```

---

### A6 — World Clock Transparency

**Condition:** `G.worldClocks.<key>++` or `+= N` in a `fn()` body without any of the following words in the result text: `attention`, `pressure`, `harder`, `watchful`, `noticed`, `tracked`, `scrutin` → **WARN** (not FAIL)

**Why:** Silent clock increments are invisible tax. The player has no way to know why future DCs are harder. Every clock tick should leave a trace in the scene — not a system message, but a moment that signals the world is paying attention. A6 is a warn, not a fail, because some legitimate increments may have consequence language that doesn't use the exact signal words — human review (B5) catches residual cases.

**Guide language:** "If the clock ticks, the player must feel it. Silent increments are invisible tax."

**Fail:**
```js
G.worldClocks.pressure++;
addNarration('', 'The gate clerk marks your name in the log.');
// no signal that pressure increased
```

**Pass:**
```js
G.worldClocks.pressure++;
addNarration('', 'The gate clerk marks your name in the log. The next time through this checkpoint will be harder — he has your face now.');
```

---

## Human Review Checklist (B1–B5)

Not automated. Requires judgment. Generated as a pre-populated checklist in every review report, with flagged choices pre-identified by heuristic.

| ID | Check |
|----|-------|
| B1 | Scene opening — observable action or sensory detail, not procedural summary or verdict |
| B2 | NPC register and tell — speech matches dossier register; physical tell appears at least once per scene |
| B3 | Rumor source texture — source feels overheard, not labeled (goes beyond A4's mechanical check) |
| B4 | Combat result vividness — body part, weapon behavior, surface, or sound present in combat outcomes |
| B5 | Subtext — NPC wants something they don't say; at least one unsaid layer per named NPC scene |

**B1 vs A3 distinction:** A3 catches specific mechanical openers ("confirms", "it turns out"). B1 catches the broader pattern — any result that positions the player above the scene rather than inside it. A result that opens with a clean declarative ("She was right.") passes A3 but may fail B1.

**B3 vs A4 distinction:** A4 checks for the mechanical presence of attribution (proper noun, location, or role). B3 checks whether the attribution feels *lived in* — whether the source has a voice and a room, not just a label.

---

## Review Report Format

**Invocation:** `node tests/content/review-content.js <content-filename>`
**Output:** `docs/reviews/<filename>-review.md`

```
# Content Review — <filename>
Date: YYYY-MM-DD

> ⛔ BLOCKED — fix automated failures before human review
> (or) ✅ Automated gate passed — proceed to human review

## Automated Gate (Layer A)

### Failures (N)
- FAIL: A1 [choice 12 "The innkeeper…"]: result text too short: 18 words (min 30)
- FAIL: A3 [choice 7 "The ledger…"]: result opens with summary-register phrase: "confirms"

### Warnings (N)
- WARN: A2 [choice 3 "The warden…"]: result text short: 42 words (target 60–90, expand if possible)
- WARN: A6 [choice 19 "The gate…"]: worldClock incremented without consequence signal word

## Human Review Checklist (Layer B)
- [ ] B1 — Scene openings (check all N choices with result text)
- [ ] B2 — NPC register/tell (NPC-flagged choices: 3, 7, 12)
- [ ] B3 — Rumor source texture (rumor choices: 15)
- [ ] B4 — Combat result vividness (combat choices: none)
- [ ] B5 — Subtext (NPC scenes: 3, 7, 12, 19 + N more)

## Decision
Status:
Date:
Notes:
```

**Gate behavior:**
- Any A FAIL → header reads `⛔ BLOCKED — fix automated failures before human review`
- WARNs appear in report but do not block human review
- Console always prints: `<filename>: N FAIL, N WARN — report saved to docs/reviews/<filename>-review.md`
- Exit code 1 on any FAIL; exit code 0 on warn-only or clean

---

## File Structure

```
tests/
  content/
    validate-content.js           ← extended with A1–A6; exports rule functions
    validate-content.rules.test.js ← NEW: Jest unit tests for rule functions
    review-content.js             ← NEW: per-file report generator
docs/
  CONTENT_STANDARDS.md           ← NEW: writer-facing authoring guide
  reviews/                       ← generated review reports (one .md per reviewed file)
```

---

## package.json Scripts

```json
"review:content": "node tests/content/review-content.js"
```

Already in plan: `test:content` runs all three validators including the extended `validate-content.js`.

---

## Baseline Context

- **838 pre-existing violations** as of Apr 2026 — these are known debt. The validator correctly identifies them. They are not regressions and do not need to be fixed before this subsystem ships.
- The validator scans `*_enriched_choices.js` files only. Other content files (narrations, NPC dossiers) are out of scope for Subsystem 1.
- Result text is extracted via `fn.toString()` static analysis — no fn() execution. This means branching results (success path vs fail path) may not both be checked. This is an acceptable limitation; the most common pattern is a single result per branch, and the validator will catch both if they appear as separate `addNarration` calls.

---

## Verification

1. `npx jest tests/content/validate-content.rules.test.js --no-coverage` — all rule unit tests pass
2. `node tests/content/validate-content.js 2>&1 | tail -5` — runs without crash, reports violations + warnings
3. `node tests/content/review-content.js cosmoria_stage2_enriched_choices.js` — generates `docs/reviews/cosmoria_stage2_enriched_choices.js-review.md`
4. Open the report — gate section and B checklist are populated with choice numbers
5. Introduce A3 violation: edit a result to start with "Confirms…", re-run validator → FAIL fires at that choice
6. Introduce A6 violation: add `G.worldClocks.pressure++` to a choice fn without consequence word → WARN fires
7. Fix both violations, re-run — clean
