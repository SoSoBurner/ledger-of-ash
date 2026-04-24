# Polish Review — Ledger of Ash
**Date:** 2026-04-23  
**Scope:** Entire game, Stage 1 & 2 release  
**Skill:** game-design:polish-review

---

## Identity Constraint Audit

**Practical constraint:** Two fonts (Cinzel + Crimson Pro), both @font-face embedded. No audio. Text-only visual surface.  
**Conceptual constraint:** "Make suppression feel institutional." Guild marks everywhere. Proceduralism over outcomes. Absence as presence.

Viable pairing. Practical constraint strict enough for automatic consistency decisions. Conceptual constraint specific enough to evaluate individual choices against.

---

## Typography

**Three-tier system is the strongest polish element in the game.**

| Tier | Font | Fit |
|------|------|-----|
| A — Cinzel | Display serif | Guild authority, UI chrome. Stone/inscription associations align with institutional world. ✅ |
| B — System UI | Sans-serif stack | Small labels, hints, journal tags. Neutral information carrier. ✅ |
| B+ — Crimson Pro 300 | Text serif, non-italic | Long-form reading. Weight-300 gives breathing room. ✅ |
| C — Crimson Pro italic | Atmosphere accent | <25 words: death screen, camp intro, HUD flavor. Correct pop deployment. ✅ |

**Structural risk:** Cinzel is designed for 2–7 word labels. Choice labels run up to 15 words. At 15 words, letterform spacing compresses readability. Choice labels are the most gameplay-critical text in the game. Consider a hard cap of 8–10 words on Cinzel-rendered choice labels.

**Pattern-pop in typography:** Tier C italic is correct pop — breaks from Tier B+ reading mode at emotional beats. ✅

---

## Audio

No audio system. Clean constraint decision, not a gap. Correct for browser file:// text RPG (dependency/reliability issues).

**Implication:** The entire emotional carrier function falls on typography and prose. Tier C italic is doing the job audio would do for emotional register shifts. This is a fragile solution — if prose quality is inconsistent, there is no audio layer to compensate. Weak prose in a tense moment is the weak moment, undiluted.

**Practical implication:** The forbidden-words list, 60–90 word result cap, and "scene not summary" standard are audio design work. Must be applied without exception.

---

## Visual Identity and Color

**The gap in the polish system:** Typography has documented enforcement rules with specific font names, weights, px sizes. **The color system has no equivalent documentation.**

CSS custom properties exist in `:root` but there is no documented color identity system with named roles, enforcement rules, or accent color limits. This is the most significant polish risk — the typography layer has intention and craft; the color layer may be accumulating ad hoc decisions across 534 KB of enriched choices.

**What a correct system looks like for this theme:**
- Dark neutral base (bureaucratic weight, institutional opacity)
- One gold/amber accent (guild marks, reward, authority)
- One danger accent (threat, watchfulness, hostile encounter)
- One discovery accent (evidence, journal entries, unlocked content)

Three accent roles derived from the conceptual constraint. Any other color = intentional deviation, not accident.

---

## Pattern-Pop-Subversion at Encounter Level

**Confirmed correct pops:**
- Death screen: Tier C italic ✅
- Camp intro: Tier C italic ✅

**Likely missing pops:**
- **Boss encounter chrome** — Does Dravn Pell's confrontation look different from a Soreheim merchant interaction? If identical visual chrome, the pattern cannot pop at its most important moment.
- **Stage transitions** — Does Stage 1→2 advancement change the visual surface? Stage transitions are the scope reveal moments. Without visual acknowledgment, the shift is mechanical but not felt.
- **Complication firing** — When watchfulness triggers a complication, does anything in the chrome signal consequence vs. routine encounter?

---

## In-World vs. UI Text Consistency

**Correct:** Locality narrations open with infrastructure-specific sensory detail. Forbidden word list enforced. Content type standards (result text 60–90 words, choice labels <15 words, inner voice not action description) function as prose consistency rules.

**Risk:** Journal category strings. Six valid categories, arg order critical (text first, category second). If categories applied inconsistently across Stage 1 content, journal visual coherence degrades.

---

## Consistency vs. Quality Assessment

| Layer | Consistency | Quality | Assessment |
|-------|------------|---------|------------|
| Typography | ✅ Documented with enforcement | High | Strongest element |
| Prose register | ✅ Content standards + forbidden words | Variable | Quality is the risk |
| Color | ❌ No documented system | Unknown | Biggest gap |
| Audio | ✅ Clean absence | N/A | Correct |
| Encounter visual differentiation | ❌ Boss likely undifferentiated | Low | Pattern-pop failure |

---

## Two Highest-Leverage Changes

1. **Document and enforce a color identity system** — Write a five-line rule in CLAUDE.md: base surface, three accent roles, specific hex values, prohibition on anything outside those four. Brings the color layer to the same consistency standard as typography. One session, permanent enforcement mechanism.

2. **Differentiate visual chrome for boss and climax encounters** — One CSS class applied by `enterCombat()` for narrative encounters specifically (border-color shift to danger accent, or container width change). Player doesn't need to be told it's a boss. They need a visual shift their pattern-trained eye reads as: *something is different here.* Currently, if Dravn Pell looks like a merchant, the visual system fails its most important test.
