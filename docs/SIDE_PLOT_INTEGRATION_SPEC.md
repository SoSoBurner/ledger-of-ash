# Side-Plot Integration Spec

## Purpose

Side plots are doctrine-driven investigation threads that surface locality-specific pressure without replacing the main campaign. They are reusable content packets loaded into a lightweight runtime registry and surfaced through existing choice generation.

## Core Rule

Every side plot must declare all of the following or it is invalid:

| Field | Required |
|---|---|
| `side_plot_id` | unique slug |
| `primary_doctrine_rung` | one of the canonical rungs |
| `locality` | canonical locality name |
| `human_cost` | one sentence, first person plural perspective |
| `circulation_channel` | how rumors reach the player |
| `clue_families` | at least two |
| `proof_ladder` | all four rungs populated |
| `meaningful_choice_pressures` | at least two |
| `resolution_states` | at least two |
| `main_campaign_tieback` | explicit string |

---

## Doctrine Rungs

Side plots are anchored to the Material Planet doctrine hierarchy. Rungs from lowest to highest:

1. **subsistence** — basic survival, food, shelter, labor access
2. **community** — local reputation, mutual aid, neighbor relations
3. **circulation** — trade, movement, information flow
4. **institution** — civic bodies, guilds, academies, courts
5. **polity** — regional authority, enforcement, charter legitimacy
6. **ideology** — belief systems, sanctioned truth, named factions
7. **succession** — who holds power when the current order fails

Side plots that span two rungs use `primary_doctrine_rung` and `secondary_doctrine_rung`.

---

## Clue Families

Clue families are the _type_ of evidence a player can accumulate. They recur across regions so that players build interpretive fluency:

- `ledger_discrepancy` — numbers don't match official record
- `missing_person` — someone who should be here isn't
- `displaced_labor` — workers rerouted, dismissed, or underpaid
- `route_anomaly` — cargo moving on wrong paths, wrong times
- `document_forgery` — altered permits, false seals, wrong dates
- `testimony_conflict` — two witnesses contradict each other
- `physical_trace` — ash, residue, marks that don't belong
- `institutional_silence` — a body that should have acted, didn't
- `named_npc_gap` — a known NPC who is unreachable or changed
- `rumor_echo` — same story circulating from unrelated sources

Authoring note: each side plot should include at least two clue families so a player can approach from multiple angles.

---

## Proof Ladder

The proof ladder represents the investigation arc. Each rung is a discrete evidence state:

```
first  → player suspects something is wrong
second → player has a specific claim and one witness or document
third  → player can name the actor and the mechanism
fourth → player holds an irrefutable artifact or confession
```

Each rung should be achievable through a different clue family so multiple investigation styles are supported.

---

## Circulation Channels

Rumors enter play through one of these named channels:

- `merchant_corridor` — traders moving between localities
- `labor_circuit` — workers, dockworkers, road gangs
- `clerical_network` — scribes, census runners, tax clerks
- `tavern_drift` — overheard at inns, rest stops
- `guild_whisper` — internal guild members only
- `enforcement_leak` — a guard, constable, or warden talking out of turn
- `institutional_report` — a posted notice or official document the player can read

---

## Resolution States

Every side plot must define at least two resolution states — what can be true at end state depending on player action:

- `suppressed` — the problem continues; player chose not to act or failed to build proof
- `exposed` — the truth circulates; named actor loses legitimacy or is removed
- `redirected` — the human cost shifts locality; problem moves rather than resolves
- `absorbed` — the institution acknowledged the problem and absorbed it; surface normal, root unchanged
- `collapsed` — the local power structure falls; new instability; next-stage pressure increases

---

## Runtime Registry

Side-plot packets are loaded into a global registry at game start:

```js
// In engine.js
const SIDE_PLOT_REGISTRY = {};

function loadSidePlots(packets) {
  for (const p of packets) {
    SIDE_PLOT_REGISTRY[p.side_plot_id] = p;
  }
}

function getActiveSidePlots(locality, stage) {
  return Object.values(SIDE_PLOT_REGISTRY).filter(p =>
    p.locality === locality &&
    p.stage_range.includes(stage)
  );
}
```

Rumors from active side plots are injected as investigation choices. The player does not see a "side plot" menu — they encounter rumors through normal choice flow.

---

## Injection Point

Side-plot rumors surface as additional investigation choices in `currentChoices()` when:

1. Player is in the matching locality
2. Current stage is in `side_plot.stage_range`
3. Side plot has not reached `fourth` proof rung or a terminal resolution state

The injected choice has:
- `text`: first rumor from `rumor_bucket` matching player's current proof rung
- `mechanicTags`: `['investigation']`
- `themeTags`: derived from doctrine rung
- `fn`: advances proof ladder and logs clue family

---

## Authoring Flow

1. Copy `docs/SIDE_PLOT_TEMPLATE.md`
2. Fill all required fields
3. Write as JSON in `content/sideplots/`
4. Validate against the required-field table above
5. Add to `build.py` bundle if surfacing in runtime

---

## Acceptance Criteria

- [ ] Side-plot packets are reusable across sessions
- [ ] Rumors are doctrinal (grounded in a doctrine rung), not filler
- [ ] Clue families recur across at least two different locality packets
- [ ] Schema and validation exist before scale expansion
- [ ] At least 5 example packets shipped in `content/sideplots/`
