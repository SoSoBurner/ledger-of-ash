# Side-Plot Template

Copy this file, rename it to your side plot slug, and fill every field. Required fields are marked **(required)**.

---

## Header

```json
{
  "side_plot_id": "(required) unique-slug-no-spaces",
  "title": "(required) Human-readable title",
  "stage_range": ["I"],
  "locality": "(required) Canonical locality name from KEY_LOCALITIES",
  "district_or_site": "Optional — specific district, market, dock, ward within the locality",
  "primary_doctrine_rung": "(required) subsistence | community | circulation | institution | polity | ideology | succession",
  "secondary_doctrine_rung": "Optional — second rung if plot spans two",
  "locality_expression": "(required) One sentence: what this locality looks like when this rung is under pressure"
}
```

---

## Actors

```json
{
  "npc_classes": ["(required) at least two — merchant | laborer | cleric | enforcer | official | scholar | outcast | named_npc"],
  "human_cost": "(required) One sentence from the ground-level perspective. Who is actually hurt and how.",
  "circulation_channel": "(required) merchant_corridor | labor_circuit | clerical_network | tavern_drift | guild_whisper | enforcement_leak | institutional_report"
}
```

---

## Evidence Layer

```json
{
  "clue_families": ["(required) at least two from: ledger_discrepancy | missing_person | displaced_labor | route_anomaly | document_forgery | testimony_conflict | physical_trace | institutional_silence | named_npc_gap | rumor_echo"],
  "clue_formats": ["(optional) formats those clues take: overheard | posted notice | physical evidence | NPC dialogue | document | discrepancy in records"],
  "proof_ladder": {
    "first":  "(required) What the player first suspects — vague, one sentence",
    "second": "(required) What the player now has — specific claim + one witness or document",
    "third":  "(required) What the player can now name — actor + mechanism",
    "fourth": "(required) What the player holds — irrefutable artifact, confession, or witnessed act"
  }
}
```

---

## Rumor Bucket

```json
{
  "rumor_bucket": [
    {
      "text": "(required) Rumor text as overheard prose, 1–2 sentences",
      "source_class": "merchant | laborer | cleric | enforcer | official | outcast",
      "confidence": "high | medium | low",
      "distortion": "none | low | medium | high",
      "pull_direction": "Where should the player go to follow this up?",
      "proof_rung": "first | second | third | fourth"
    }
  ]
}
```

At least one rumor per proof rung is recommended. The `first` rung rumor is what surfaces in investigation choice flow before the player has begun investigating.

---

## Campaign Connections

```json
{
  "rosalind_relevance": "Optional — how Rosalind (named NPC) connects to this plot if at all",
  "criminal_relevance": "Optional — how the eastern route / criminal thread connects",
  "meaningful_choice_pressures": [
    "(required) at least two — each a one-sentence description of a moral/mechanical fork the player faces"
  ],
  "resolution_states": [
    {
      "state": "(required) suppressed | exposed | redirected | absorbed | collapsed",
      "condition": "What must be true for this state to occur",
      "consequence": "One sentence: what changes in the locality or campaign"
    }
  ],
  "main_campaign_tieback": "(required) How resolving or ignoring this plot affects the main campaign pressure",
  "next_stage_hook": "Optional — what this seeds for the next stage",
  "combat_or_hazard_pressure": "Optional — any combat or hazard pressure the side plot introduces"
}
```

---

## Memorial Tags

```json
{
  "memorial_tags": ["Optional — tags that survive to the legend on permadeath: e.g. 'exposed the Shelk ledger fraud'"]
}
```

---

## Authoring Checklist

- [ ] `side_plot_id` is unique
- [ ] `locality` matches a canonical `KEY_LOCALITIES` entry
- [ ] `primary_doctrine_rung` is one of the seven canonical rungs
- [ ] `human_cost` is ground-level, not institutional
- [ ] At least two `clue_families`
- [ ] All four `proof_ladder` rungs populated
- [ ] At least one rumor per proof rung in `rumor_bucket`
- [ ] At least two `meaningful_choice_pressures`
- [ ] At least two `resolution_states`
- [ ] `main_campaign_tieback` is explicit
