# LLM Side-Plot Deploy Prompt

## Purpose

Use this prompt when asking an LLM (Claude or otherwise) to generate a new side-plot packet. Copy the block below, fill the bracketed fields, and paste as a user message.

---

## Generation Prompt

```
You are authoring a side-plot packet for Ledger of Ash, a text-based RPG set in V32_2 Material Planet canon.

## Task
Generate one complete side-plot packet as a JSON object that conforms to the schema below.

## Context
- Locality: [LOCALITY NAME]
- Stage range: [I / II / III / IV / V — pick one or two adjacent stages]
- Primary doctrine rung: [subsistence | community | circulation | institution | polity | ideology | succession]
- Secondary doctrine rung (optional): [rung or null]
- The eastern route has gone wrong. The city knows. The player is a capable person trying to understand what happened.

## Required fields
Every field marked (required) must be populated. Do not skip any.

## Locality expression rule
The `locality_expression` must name:
1. Which rung is under pressure (by name)
2. What the player can observe (not infer)
in one sentence.

## Rumor rules
- Write rumor text as overheard prose — 1–2 sentences in voice, no mechanical jargon
- Include at least one rumor per proof rung (first, second, third, fourth)
- Pull direction must be actionable (a place, a person type, or a specific site)
- Use the source class voice guide: merchants are practical and irritated, laborers are direct and tired, clerks are careful and evasive, enforcers don't volunteer, outcasts are blunt

## Clue family rule
Include at least two different clue families from:
ledger_discrepancy | missing_person | displaced_labor | route_anomaly | document_forgery | testimony_conflict | physical_trace | institutional_silence | named_npc_gap | rumor_echo

## Resolution states rule
Include at least two resolution states from:
suppressed | exposed | redirected | absorbed | collapsed
Each must have: state, condition (what must be true), consequence (one sentence: what changes)

## Meaningful choice pressures rule
Write at least two, each a one-sentence moral or mechanical fork the player faces during investigation.

## Schema

{
  "side_plot_id": "unique-slug",
  "title": "Human-readable title",
  "stage_range": ["I"],
  "locality": "[LOCALITY]",
  "district_or_site": "",
  "primary_doctrine_rung": "",
  "secondary_doctrine_rung": null,
  "locality_expression": "",
  "npc_classes": [],
  "human_cost": "",
  "circulation_channel": "",
  "clue_families": [],
  "clue_formats": [],
  "proof_ladder": {
    "first": "",
    "second": "",
    "third": "",
    "fourth": ""
  },
  "rumor_bucket": [
    {
      "text": "",
      "source_class": "",
      "confidence": "",
      "distortion": "",
      "pull_direction": "",
      "proof_rung": ""
    }
  ],
  "rosalind_relevance": "",
  "criminal_relevance": "",
  "meaningful_choice_pressures": [],
  "resolution_states": [
    {
      "state": "",
      "condition": "",
      "consequence": ""
    }
  ],
  "main_campaign_tieback": "",
  "next_stage_hook": "",
  "combat_or_hazard_pressure": "",
  "memorial_tags": []
}

Generate only the JSON. No preamble, no explanation.
```

---

## Post-Generation Validation

After receiving the generated JSON, verify:

- [ ] `side_plot_id` does not duplicate an existing packet in `content/sideplots/`
- [ ] `locality` matches a canonical `KEY_LOCALITIES` name exactly
- [ ] `primary_doctrine_rung` is one of the seven canonical rungs
- [ ] At least two entries in `clue_families`
- [ ] All four proof ladder rungs are non-empty strings
- [ ] At least one rumor with `proof_rung: "first"` exists
- [ ] At least two entries in `meaningful_choice_pressures`
- [ ] At least two entries in `resolution_states`
- [ ] `main_campaign_tieback` is a non-empty string

If any check fails, regenerate or patch manually before adding to `content/sideplots/`.

---

## Locality Name Reference

Canonical locality names (must match exactly):

- Panim Haven
- Soreheim Proper
- Sunspire Haven
- Shelkopolis
- Fairhaven
- Mimolot Academy
- Ithtananalor
- Guildheart Hub
- Cosmoria
- Aurora Crown Commune
- Glasswake Commune
- Shirshal
- Harvest Circle

---

## Scale Rule

Do not generate all-region coverage in one pass. Generate one locality at a time. Validate and load each packet before generating the next. This prevents the content layer from outrunning the runtime's ability to surface it.
