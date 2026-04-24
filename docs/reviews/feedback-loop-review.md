# Feedback Loop Review — Ledger of Ash
**Date:** 2026-04-23  
**Scope:** Last 24-hour changes  
**Skill:** game-design:feedback-loop-review

---

## Loop Inventory (24-hour changes)

| Loop | Type | Visibility |
|------|------|------------|
| stageProgress accumulation/drain | Mixed (positive + negative) | Partial |
| Watchfulness → Complication | Negative (dampening) | Partial |
| Soreheim social → shopCreditBoost | Positive (hard cap) | Hidden → Partial |
| Boss seed → boss trigger | Milestone-gated positive | Full / Partial |
| Stage 2 flag → Stage 3 DC modifier | Carry-forward positive | **Hidden** |
| Item acquisition → skill bonus → DC roll | Positive (stat cap) | Full |

---

## Loop Diagnostics

### stageProgress accumulation/drain
Correct pairing: positive loop (confronting rivals advances progress) + negative loop (avoiding rivals penalized by clock). **Problem:** negative loop has no floor above zero and no recovery redirect. Clock penalties just subtract. At low stageProgress + high clock frequency, the boss threshold (8 for Stage II) may become permanently unreachable. `Math.max(0,...)` floor prevents going negative but doesn't prevent stalling below the trigger threshold.

### Watchfulness → Complication
Clean negative loop structure. At watchfulness 3: 15% complication rate. At watchfulness 6: 60%. At watchfulness 9: effectively certain.  
**Critical gap: no drain mechanic.** One-way ratchet. Over a Stage II playthrough, watchfulness accumulates until nearly every arrival triggers a complication — with no recourse. The rival clock simultaneously *rewards* aggression (stageProgress gains) while watchfulness *punishes* it. Mixed signal: should I confront rivals or not? That question shouldn't be confusing.

### Soreheim sorePlotCredits
Well-structured positive loop. Hard cap (30 credits, max boost 6) + per-shop once-per-day guard prevent farming. **One issue:** currently hidden. Player sees prices change but not the formula. Should be deliberate: surfacing at minimum a social register flavor line would convert invisible mechanics to legible investment.

### Boss seed → boss trigger
Correct milestone design. Seed telegraphs the confrontation; threshold ensures mid-arc timing. **Interaction risk:** stageProgress can drop after seed is seen (clock penalty). Player could be knocked below threshold 8 with no HUD signal they've been pushed back.

### Stage 2 → Stage 3 DC modifier
Most elegant design addition: `stage2_climax_inquisitor_contact` drops mediate DC from 15 to 12. Prior investment has mechanical weight. **Fully hidden at point of impact.** Player won't know why the path feels easier/harder. One line of narration at Stage III mediate choice acknowledging the contact would convert hidden assistance into earned payoff.

### Item acquisition loop
Standard positive RPG equipment loop. Hard stat cap at 10 prevents runaway. Fully visible. No issues. ✅

---

## The Compounding Risk: Rival Clock + Watchfulness

Both new negative loops fire in Stage II+ on the same behavior:
- **Rival clock** punishes *inaction* (not confronting → stageProgress drain)
- **Watchfulness** punishes *action* (confronting publicly → complications)

Together: a squeeze. Penalized for caution AND boldness. No clearly signaled middle path. Without a visible drain mechanic, watchfulness is not a feedback loop — it's a one-way accumulator that eventually guarantees complications regardless of behavior.

---

## Two Highest-Leverage Changes

1. **Add a watchfulness drain mechanic.** Minimal implementation: `campAction('lay_low')` reduces watchfulness 1–2 at cost of a day. Converts one-way ratchet into an actual negative loop. Frame as "going quiet" not punishment — the dampening opens a door (safety) rather than just closing one (heat).

2. **Surface the Stage 2 → Stage 3 DC modifier at point of use.** One narration line at Stage III mediate acknowledging the inquisitor contact. Converts hidden positive loop into legible carry-forward reward. Signals to players that faction investment across stages has mechanical weight.
