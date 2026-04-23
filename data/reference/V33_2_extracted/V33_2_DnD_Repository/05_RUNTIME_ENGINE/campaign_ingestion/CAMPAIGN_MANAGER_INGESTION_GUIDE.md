# Campaign Manager Ingestion Guide

This file describes how spreadsheet or worksheet style campaign-manager material is integrated into the repository.

## Authority boundary
- Source workbook content is runtime support only.
- It does not override baseline canon, corrected canon, or registered reconciliation logic.
- Session-specific names, goals, encounter notes, and tactical state belong to campaign runtime layers.

## Current imported campaign
- Campaign: House Shelk vs the Union
- Session loaded: 1
- Plot point: Prologue
- Runtime location: Shelkopolis, House Shelk, Principalities
- Weather signal: Thunder Storms
- Day of year: 30

## Reusable field families extracted from the source
- campaign identity
- session identity
- party roster and initiative
- runtime environment and weather
- locality and point-of-interest selection
- current goal and unresolved pressure tracking
- notable NPC presence
- faction relations and encounter hooks
- local law, religion, culture, quirks, and rumor prompts
- downtime tasks and event notes

## Deployment rule
When a future campaign-manager worksheet is ingested, normalize it into:
1. `05_RUNTIME_ENGINE/registries/campaigns.json`
2. `05_RUNTIME_ENGINE/registries/sessions.json`
3. `05_RUNTIME_ENGINE/ledgers/` logs if the material records events
4. `PLAY/CURRENT_CAMPAIGN_PACKETS/` if the material supports immediate table use
5. `11_REFERENCE_VIEWS/current_release/` only for GM-facing operator summaries
