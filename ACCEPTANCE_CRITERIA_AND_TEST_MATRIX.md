# ACCEPTANCE CRITERIA AND TEST MATRIX

## Purpose
This document defines the pass/fail checks for the repo-truth reconciliation and Stage I–II cleanup pass.

A change is not complete because it compiles.
A change is complete only when the runtime, docs, build pipeline, hierarchy, and classification truth all pass the checks below.

---

## Global release gate
The pass succeeds only if all of the following become true at the same time:
- active canon truth is V28_8
- README and docs reflect the active runtime rather than the stale scaffold
- shell imports and build.py inputs agree
- CSS authority is singular
- stale file classification is explicit and enforced
- central narration panel is first-class
- Notice Board is readable on desktop and mobile
- Stage II coverage claims are honest
- party-system claims do not exceed actual wiring

If any one of those remains false, the pass does **not** pass.

---

## A. README truth alignment

| ID | Pass condition | Failure signal | Test method |
|---|---|---|---|
| A1 | README declares V28_8 as active repo truth | README still says V28_4 | Inspect `README.md` |
| A2 | README count claims match active runtime counts | README still claims 25/75/85/11/4 or any other stale shape | Compare README to computed runtime counts |
| A3 | README names the active runtime core correctly | README still centers `world-data.js`, `scenes.js`, `consequences.js` as live runtime | Inspect runtime description section |
| A4 | README distinguishes active runtime from archived scaffold | README blurs active and stale file classes | Inspect file structure / architecture section |

---

## B. Canon version truth alignment

| ID | Pass condition | Failure signal | Test method |
|---|---|---|---|
| B1 | Active root/docs/runtime surfaces use V28_8 | Any active root/doc/runtime file still labels V28_4 as current canon | Grep active repo surfaces for `V28_4` |
| B2 | Historical V28_4 material is archived or clearly labeled historical | stale V28_4 surfaces still look current | Inspect archive labeling |

---

## C. Build.py alignment with actual shell imports

| ID | Pass condition | Failure signal | Test method |
|---|---|---|---|
| C1 | `build.py` source list equals actual `index.html` import list | build reads files the shell does not import | Compare build inputs to shell imports |
| C2 | build output contains only active runtime code | dist artifact silently includes stale scaffold code | grep built output for archived identifiers |
| C3 | build succeeds offline from live modular shell | build depends on stale placeholders or dead paths | run build locally |

---

## D. Shell import truth

| ID | Pass condition | Failure signal | Test method |
|---|---|---|---|
| D1 | `index.html` imports only intentionally active files | stale parallel files remain in shell load path without reconciliation | inspect script tags |
| D2 | any retained helper import is justified and documented | ambiguous helper remains loaded without active use or contract | inspect comments/docs/runtime contract |

---

## E. CSS path truth

| ID | Pass condition | Failure signal | Test method |
|---|---|---|---|
| E1 | one stylesheet authority exists | inline CSS and `css/style.css` both pose as live source | inspect shell/build strategy |
| E2 | build honors that exact authority | build still reads dead CSS path | inspect build + dist output |

---

## F. Stale file classification

| ID | Pass condition | Failure signal | Test method |
|---|---|---|---|
| F1 | every evaluated requested file is classified | files still sit in ambiguity | inspect classification docs |
| F2 | stale scaffold files are moved, archived, or clearly marked inactive | stale files remain in live root as if current | inspect repo tree |
| F3 | active docs distinguish active runtime, stale parallel, and archive classes | docs collapse these buckets together | inspect docs |

---

## G. Stale file relocation / removal safety

| ID | Pass condition | Failure signal | Test method |
|---|---|---|---|
| G1 | archiving/removing stale files does not break the live shell | active runtime fails after cleanup | run shell after cleanup |
| G2 | build still succeeds after stale scaffold exclusion | build breaks because it was secretly depending on archived files | run build after cleanup |

---

## H. Narration panel placement

| ID | Pass condition | Failure signal | Test method |
|---|---|---|---|
| H1 | narration is the first full-width scene-text block below header | narration appears below result or choices | inspect DOM/render order |
| H2 | narration remains inline on the Story screen | narration is moved to modal/side recap/auxiliary surface | inspect layout |
| H3 | narration repaints changed state rather than repeating generic locality text | only tiny or generic variations appear after meaningful actions | perform repeated actions and compare text |

---

## I. Notice Board readability

| ID | Pass condition | Failure signal | Test method |
|---|---|---|---|
| I1 | notice entries remain clearly separated | notice text becomes one merged block | open board after multiple notices |
| I2 | long notice text wraps without overflow | clipping, overlap, horizontal scroll, or truncation | test long entries desktop/mobile |
| I3 | section labels remain distinct | section labels visually blend into notice body | inspect desktop/mobile |
| I4 | repeated use remains stable | layout degrades after many days / repeated openings | advance time and reopen board repeatedly |

---

## J. Mobile hierarchy

| ID | Pass condition | Failure signal | Test method |
|---|---|---|---|
| J1 | mobile preserves header → narration → action/roll/result → choices | mobile flattens into equal-weight stack | test narrow portrait widths |
| J2 | narration remains the first major text block on mobile | result or transcript-like content appears first | repeated action test on portrait layout |
| J3 | notices and result text remain tap-safe and readable | text clips, overlap, or becomes hard to scroll | mobile interaction test |

---

## K. Stage progression readability

| ID | Pass condition | Failure signal | Test method |
|---|---|---|---|
| K1 | Stage I objective and Stage II widening are understandable | progression reads as opaque or generic | fresh-run Stage I and Stage II playtest |
| K2 | stage gates feel like real phase changes in copy and UI | stage advancement feels numerically invisible | compare pre/post stage transitions |

---

## L. Party-system claim accuracy

| ID | Pass condition | Failure signal | Test method |
|---|---|---|---|
| L1 | docs only claim party features that are actually wired | README/docs still overstate companion behavior | inspect docs + runtime behavior |
| L2 | retained party hooks match active engine expectations | engine still expects missing globals or incompatible state shape | runtime smoke test |

---

## M. Stage II fallback visibility

| ID | Pass condition | Failure signal | Test method |
|---|---|---|---|
| M1 | repo docs state whether Stage II is bespoke, fallback, or mixed | docs still imply 93 bespoke branches if not true | inspect docs |
| M2 | coverage summary is reproducible from active sources | no one can tell which backgrounds are bespoke vs fallback | run coverage check |

---

## N. Runtime count accuracy

| ID | Pass condition | Failure signal | Test method |
|---|---|---|---|
| N1 | archetype count matches runtime | docs/build/README disagree | compute from active runtime |
| N2 | background count matches runtime | docs/build/README disagree | compute from active runtime |
| N3 | active locality count is documented truthfully | docs overclaim or underclaim without context | compute from active runtime |
| N4 | Stage II bespoke/fallback counts are documented truthfully | docs overclaim uniform bespoke coverage | compute from active sources |

---

## O. Contributor-facing doc truth

| ID | Pass condition | Failure signal | Test method |
|---|---|---|---|
| O1 | contributor-facing docs now describe the active runtime | contributors are still pointed toward stale scaffold files | inspect root/docs guidance |
| O2 | old batch/audit docs are archived or clearly historical | stale docs still look current | inspect docs tree |

---

## P. Stage I locality/background/runtime alignment

| ID | Pass condition | Failure signal | Test method |
|---|---|---|---|
| P1 | start-locality authority is singular or explicitly synchronized | data.js and background map still disagree | run mapping diff |
| P2 | Stage I locality grounding follows active runtime truth | runtime still leaks wrong-polity staging through stale logic | fresh starts across multiple localities |
| P3 | Stage I docs do not overclaim bespoke authored starts if runtime is mixed procedural | docs still imply fully bespoke 93-start authored matrix | inspect docs and compare to `data.js` |

---

## Release gate
The implementation passes only when every section above passes.

The build does **not** pass if even one of the following remains true:
- README still points contributors to V28_4 truth
- build.py and shell imports still disagree
- CSS authority is still split
- stale scaffold files still pose as live runtime sources
- narration panel is not first-class
- Notice Board is still unstable on mobile
- Stage II bespoke/fallback truth is still inflated
- contributor-facing docs still reflect the stale scaffold rather than the active runtime
