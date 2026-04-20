# Doctrine-Locality Guide

## Purpose

Maps the 18 active localities to their dominant doctrine rungs, locality expression, and the human cost patterns that emerge when pressure hits each rung. Use this when authoring side plots or generating investigation content for a specific locality.

---

## Doctrine Rung Summary

| Rung | What it governs |
|---|---|
| subsistence | Food, shelter, basic labor access |
| community | Local reputation, mutual aid, neighbor relations |
| circulation | Trade, movement, information flow |
| institution | Civic bodies, guilds, academies, courts |
| polity | Regional authority, enforcement, charter legitimacy |
| ideology | Belief systems, sanctioned truth, named factions |
| succession | Who holds power when the current order fails |

---

## Locality Expressions

### Panim Haven
- **Dominant rung:** subsistence / community
- **Expression:** A transit shelter locality that has outgrown its own infrastructure. Mutual aid networks are doing institutional work without institutional backing.
- **Pressure pattern:** When subsistence is threatened, community networks fracture first. When community fractures, labor goes underground.
- **Clue families likely:** `displaced_labor`, `missing_person`, `rumor_echo`

### Soreheim Proper
- **Dominant rung:** institution / polity
- **Expression:** A civic hub where guild authority and municipal enforcement share contested jurisdiction. The boundary between them is the source of constant low-grade dispute.
- **Pressure pattern:** Institutional silence is the primary tell. When something goes wrong, neither body claims it.
- **Clue families likely:** `institutional_silence`, `document_forgery`, `testimony_conflict`

### Sunspire Haven
- **Dominant rung:** ideology / institution
- **Expression:** A sanctioned-belief locality where clerical authority sits above civic. Enforcement defers to doctrine interpretation.
- **Pressure pattern:** Dissent circulates through coded language. Rumors carry theological framing even when the content is material.
- **Clue families likely:** `rumor_echo`, `institutional_silence`, `testimony_conflict`

### Shelkopolis
- **Dominant rung:** circulation / institution
- **Expression:** A document-economy city. Everything moves on paper — permits, seals, manifests, ledgers. The city functions smoothly when documents are honest and breaks when they aren't.
- **Pressure pattern:** Forgery cascades. One false document creates two contradictions downstream.
- **Clue families likely:** `ledger_discrepancy`, `document_forgery`, `route_anomaly`

### Fairhaven
- **Dominant rung:** subsistence / circulation
- **Expression:** A mill-and-market settlement where agricultural labor and trade routes meet. When either fails, the other feels it within days.
- **Pressure pattern:** Labor displacement is the leading indicator. Route anomalies follow.
- **Clue families likely:** `displaced_labor`, `route_anomaly`, `physical_trace`

### Mimolot Academy
- **Dominant rung:** ideology / institution
- **Expression:** A knowledge locality. Truth here is curated, and access to primary sources is controlled. What is _known_ publicly and what is _true_ are managed separately.
- **Pressure pattern:** Named-NPC gaps and institutional silence. The scholars who should know something don't appear.
- **Clue families likely:** `named_npc_gap`, `institutional_silence`, `ledger_discrepancy`

### Ithtananalor
- **Dominant rung:** community / subsistence
- **Expression:** A deep-roots locality where kinship and mutual obligation define all exchange. Formal institutions are thin.
- **Pressure pattern:** Missing persons and rumor echoes. When someone disappears, the community talks around it before they talk about it.
- **Clue families likely:** `missing_person`, `rumor_echo`, `testimony_conflict`

### Guildheart Hub
- **Dominant rung:** institution / circulation
- **Expression:** A professional locality defined by guild affiliation. Who you work for determines what you can access, know, and say.
- **Pressure pattern:** Displaced labor with no official explanation. Route anomalies routed through unofficial channels.
- **Clue families likely:** `displaced_labor`, `route_anomaly`, `named_npc_gap`

### Cosmoria
- **Dominant rung:** circulation / polity
- **Expression:** A harbor ring locality. Everything flows through it. Power is about who controls what moves and when.
- **Pressure pattern:** Route anomaly and physical trace. The harbor shows its problems in cargo, not in conversation.
- **Clue families likely:** `route_anomaly`, `physical_trace`, `ledger_discrepancy`

### Aurora Crown Commune
- **Dominant rung:** community / ideology
- **Expression:** A collective-governance locality where shared doctrine and mutual obligation coexist. Dissent is processed communally rather than punished.
- **Pressure pattern:** Rumor echoes and testimony conflict. The community contains disagreement internally before it surfaces.
- **Clue families likely:** `rumor_echo`, `testimony_conflict`, `institutional_silence`

### Glasswake Commune
- **Dominant rung:** subsistence / community
- **Expression:** A survival-adjacent locality. Resources are tight enough that any disruption to supply or labor creates immediate visible hardship.
- **Pressure pattern:** Displaced labor is immediate and visible. Missing persons follow within days.
- **Clue families likely:** `displaced_labor`, `missing_person`, `physical_trace`

### Shirshal
- **Dominant rung:** polity / institution
- **Expression:** A checkpoint locality. Authority is asserted by controlling movement. Enforcement presence is high; institutional legitimacy is contested.
- **Pressure pattern:** Document forgery to move through checkpoints. Enforcement leaks when the forgery is internal.
- **Clue families likely:** `document_forgery`, `testimony_conflict`, `enforcement_leak`

### Harvest Circle
- **Dominant rung:** subsistence / community
- **Expression:** A seasonal-labor locality. Rhythms are agricultural. When the cycle breaks — labor doesn't show, routes divert, surplus disappears — the break is felt personally before it is reported officially.
- **Pressure pattern:** Displaced labor with physical trace. Something changed the pattern of work.
- **Clue families likely:** `displaced_labor`, `physical_trace`, `missing_person`

---

## Doctrine Rung × Stage Mapping

Side plots should be stage-appropriate in terms of which rung is under pressure:

| Stage | Dominant doctrine pressure |
|---|---|
| I | subsistence, community, circulation |
| II | circulation, institution |
| III | institution, polity |
| IV | polity, ideology |
| V | ideology, succession |

A Stage I side plot in Shelkopolis should be about a ledger discrepancy in the circulation layer, not about who controls the charter.

---

## Locality Expression Rules

When writing the `locality_expression` field for a side plot packet:

1. Name the rung explicitly in one clause
2. Name what the player can _observe_ (not feel or infer)
3. Keep it one sentence

Example (Shelkopolis, circulation rung under pressure):
> "Permit counters are backed up three days and the clerks are not meeting anyone's eyes."

Example (Fairhaven, subsistence rung under pressure):
> "The mill is running at night and the workers on shift aren't the regular crew."
