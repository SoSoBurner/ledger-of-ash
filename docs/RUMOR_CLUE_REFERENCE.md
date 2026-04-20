# Rumor and Clue Reference

## Purpose

This document defines the canonical rumor format, clue family taxonomy, and distortion rules for the V32_2 canon. Use it when authoring side-plot packets or generating rumors via LLM.

---

## Rumor Format

Each rumor is a discrete object with six fields:

```json
{
  "text": "Overheard prose, 1–2 sentences, first or third person, no mechanical jargon",
  "source_class": "merchant | laborer | cleric | enforcer | official | scholar | outcast",
  "confidence": "high | medium | low",
  "distortion": "none | low | medium | high",
  "pull_direction": "Where to follow up — locality, NPC class, or specific site",
  "proof_rung": "first | second | third | fourth"
}
```

### Confidence

`confidence` is the source's own certainty, not the rumor's truth:

- **high** — the source claims direct knowledge or witnessed it
- **medium** — the source heard it from someone specific
- **low** — the source is repeating something ambient, no chain

### Distortion

`distortion` is how far the rumor text has drifted from the underlying fact:

- **none** — the rumor text accurately describes the true state
- **low** — correct in substance, wrong in one detail (wrong name, wrong date)
- **medium** — correct in direction, misleading in scale or actor
- **high** — the surface text points away from the real problem

High-distortion rumors should still point toward an interesting pull direction even if the text is wrong.

---

## Clue Families

Clue families describe the *type* of evidence, not the specific content. They recur across localities so players develop interpretive fluency.

### `ledger_discrepancy`
Numbers in an official record do not match observable reality. Can be: tax rolls vs visible labor force, cargo manifests vs dock quantities, guild registers vs operating practitioners.

### `missing_person`
Someone who should be present in this locality is not, and no official explanation exists. Includes labor absences that are too consistent to be coincidence.

### `displaced_labor`
Workers have been rerouted, replaced, or dismissed at a rate inconsistent with seasonal or business explanations. Often appears alongside `route_anomaly`.

### `route_anomaly`
Cargo or people are moving on paths that don't match stated origin and destination. Includes: cargo arriving early or late, wrong route markers, sealed wagons, night movement without stated reason.

### `document_forgery`
A permit, seal, license, or date on an official document has been altered. Clue format is usually physical (ink inconsistency, wrong seal weight) or testimonial (clerk who didn't sign it).

### `testimony_conflict`
Two sources who should have the same information give contradictory accounts. At least one is lying or was lied to. Does not imply which one.

### `physical_trace`
Ash, residue, marks, or materials that are out of place. Locality-specific — in Shelkopolis this is ink and binding residue; in Cosmoria it is harbor tar and rope burn; in Fairhaven it is mill dust in unusual locations.

### `institutional_silence`
A civic body, guild, court, or enforcement office that should have responded to a known event, and did not. The absence of action is the clue.

### `named_npc_gap`
A known NPC from the locality's NPC_PLACEMENTS is unreachable, has changed behavior, or has been replaced. Players who've interacted with that NPC will notice; newcomers may not.

### `rumor_echo`
The same underlying story is circulating from multiple unrelated source classes. The convergence itself is evidence — something is generating enough fear or confusion to leak across social channels.

---

## Clue Format Notes

Clues are delivered through one of these formats:

| Format | Description |
|---|---|
| `overheard` | Ambient dialogue, NPC speaking to someone else |
| `posted_notice` | A physical document the player reads in-world |
| `physical_evidence` | Something the player observes directly |
| `npc_dialogue` | Direct conversation with an NPC |
| `document` | A record the player is shown or steals |
| `discrepancy_in_records` | Player reads two documents and notices mismatch |

---

## Distortion Chain Rule

When the same underlying fact generates multiple rumors across a locale, distortion should compound as distance increases:

- Source at origin: `distortion: none`
- One-hop (merchant who heard from a clerk): `distortion: low`
- Two-hop (traveler who heard from a merchant): `distortion: medium`
- Street ambient (no traceable chain): `distortion: high`

This means a player who investigates will refine the rumor toward truth as they move up the proof ladder.

---

## Authoring Rules

1. **Rumors are not summaries.** They are overheard fragments. Write in voice, not exposition.
2. **Pull direction is always actionable.** The player should know where to go, even if they don't know what they'll find.
3. **Doctrinal anchor.** Every rumor should be traceable to a doctrine rung. If you can't name which rung the rumor is about, rewrite it.
4. **No mechanical jargon in rumor text.** Do not write "your heat increases" or "this is a risk choice." Rumors are in-world prose.
5. **At least one rumor per proof rung.** A side plot with gaps in the proof ladder leaves players unable to investigate.

---

## Canonical Source Class Voice Guide

| Source class | Speaks like |
|---|---|
| `merchant` | Practical, specific, irritated or opportunistic |
| `laborer` | Direct, tired, suspicious of officials |
| `cleric` | Careful, qualified, occasionally evasive |
| `enforcer` | Clipped, self-protective, doesn't volunteer |
| `official` | Formal surface, evasive about specifics |
| `scholar` | Analytical, pattern-seeking, sometimes aloof |
| `outcast` | Blunt, nothing to lose, often accurate |
