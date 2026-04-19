# World Question Answering Guide

This guide explains how to answer repository-grounded worldsetting questions without inventing unsupported canon.

## Primary contract
- `../../01_CANON_GOVERNANCE/world_question_answering_resolution_contract.json`

## Use pattern
1. Resolve the target entity and scope before answering.
2. Route the question into one or more world inspection families.
3. Load the most local packet family first.
4. Pull parent-polity and world-baseline evidence.
5. Apply source hierarchy and truth-layer preference.
6. Return an answer with explicit status, evidence basis, inheritance chain, contradictions considered, unresolved edges, and confidence.

## Broad overview rule
Broad prompts such as “Tell me about this place” should be decomposed into the eleven inspection families defined by the contract, in the required order, rather than answered as a single undifferentiated paragraph.

## Canon safety rule
When evidence is partial, prefer conservative inference and say so explicitly. Do not silently invent specifics.


## Related operator surfaces
- `CANON_SAFE_NPC_INTRO_BUILD_INSTRUCTIONS.md`
- `../../05_RUNTIME_ENGINE/campaign_ingestion/CAMPAIGN_MANAGER_INGESTION_GUIDE.md`
