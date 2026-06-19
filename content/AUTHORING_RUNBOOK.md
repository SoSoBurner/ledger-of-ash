# Content Authoring Runbook — Locality Sweeps

Read **in this order** before authoring or revising any locality's content. Skipping a step is the #1 cause of canon drift (V1.0 retro finding: authored content that contradicts the quickstart card, references NPCs that don't exist, or duplicates a rumor already listed in the table kit).

All paths are relative to `data/reference/V34_2_extracted/V34_2_World_Repository/`.

## The 6-Step Canon Read Order

| # | Source | Path | Why this step |
|---|--------|------|---------------|
| 1 | **Quickstart card** | `canon/11_REFERENCE_VIEWS/current_release/locality_quickstart_cards/<locality>.md` | One-page identity: dominant infrastructure, who runs it, the one thing it's known for. Sets the sensory anchor for narration's first line (per `content/CLAUDE.md` "Locality narrations" rule). |
| 2 | **Locality packet** | `canon/03_WORLD_OPERATIONAL_ENGINE/locality_engine/locality_packets/<locality>.json` | Structured canon: pressures, factions present, magic law variant, polity ownership, route exits. Drives which authority shows up under what heat. |
| 3 | **Arrival kit** | `canon/12_TABLE_KITS/arrival_kits/<locality>.md` | First-arrival scene seeds — the sensory beats and NPC tells reserved for the player's first entry. Use these for `LOCALITY_NARRATIONS[locId]` and the first `safe` choice's success text. |
| 4 | **Text RPG packet** | `canon/03_WORLD_OPERATIONAL_ENGINE/locality_engine/text_rpg_packets/<locality>.md` | Narrative flavor bundle: dialect, idioms, environment details, NPC voice samples. Source for the register a choice label sits in. (Note: 10 Stage 1 localities lack a text_rpg_packet — fall back to quickstart + arrival kit + voice-guide cross-reference.) |
| 5 | **Named NPCs** | `canon/02_CANON_BASELINE/named_npcs/<npc_slug>.json` | Per-NPC: agenda, register, tell (the three required-before-dialogue facts in `content/CLAUDE.md` NPC Model). Cross-check `canon/02_CANON_BASELINE/interface_role_instances/` for which polity role they fill. |
| 6 | **Travel complications** | `canon/12_TABLE_KITS/travel_complications/<route_slug>.md` | If the locality is a route endpoint, the complication file specifies authored flavor for that approach. Don't invent route flavor when canon already has it. |

## After Authoring — Validate

Run these in order. Each is non-destructive.

```
node scripts/build_wired_manifest.js     # surfaces orphan/missing localities
npm run test:content                     # choice standards, flag rules, HTML wiring
node tests/content/validate-content.js   # forbidden words, label length, journal args
```

`build_wired_manifest` will exit non-zero if your new file is an "orphan" (no canon packet) — that's almost always a filename typo (e.g. `district_stage1...` when canon uses `districts`).

## Known Sourcing Gaps

These four localities lack a quickstart card. Use the locality packet + arrival kit + text RPG packet as substitute reference:

- Districts (use Aurora Heights / Cindervow / Canal Thorn district packets)
- Plumes End Outpost
- Sheresh
- Nomdara (transit-only; zero canon NPCs)

## Comparing Canon Revisions

When a new V## ships:

```
node scripts/diff_canon.js               # default: V33_2 baseline vs V34_2 canon
node scripts/diff_canon.js <oldVDir> <newVDir> --subtree=02_CANON_BASELINE/named_npcs
```

Read the [CHANGED] list before re-authoring against an updated NPC profile — a TELL or AGENDA shift propagates to every locality scene that NPC appears in.
