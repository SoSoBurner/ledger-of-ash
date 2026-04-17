# Ledger of Ash — QA Checklist

## Pre-deploy checks
- [ ] All 75 backgrounds have unique opening scenes
- [ ] All opening scene choice cids resolve to valid consequence nodes
- [ ] All consequence nodes have success AND failure branches
- [ ] No Psanan/Ashforge/Ashwake as starting localities
- [ ] Stage I blocks cross-polity travel
- [ ] Stage II unlocks at Level 6
- [ ] Combat entry shows opportunity before violence
- [ ] Training applies 5-choice disadvantage
- [ ] Level up requires player skill selection (not random)
- [ ] Alignment shifts applied correctly per choice tag
- [ ] Hall of Legends saves wounds, history, faction highlights
- [ ] Save/load roundtrip preserves all G fields
- [ ] Journal overlay shows quests, wounds, inventory, factions, rivals
- [ ] Map shows locked Stage I locations
- [ ] Time advances with each action
- [ ] Rival adventurers progress during play

## Mobile checks
- [ ] Topbar does not overflow on 375px
- [ ] env-panel readable at 375px
- [ ] Narrative scroll works on iOS Safari
- [ ] Overlays scrollable on small screens
- [ ] Choice buttons tappable (min 44px hit target)

## Consequence integrity
- [ ] Failure branches have real effects (damage, faction, gold, etc)
- [ ] XP awarded on meaningful consequences (not generic fallback)
- [ ] NPC memory updated on relevant encounters
- [ ] Alignment shifts consistent with choice tags

## Canon checks
- [ ] No invented routes used in travel
- [ ] Location names match V28_4 settlement list
- [ ] Faction IDs match V28_4 faction list
- [ ] No Psanan locations in Stage I playable content
- [ ] Deity references match V28_4 pantheon
- [ ] NPC names grounded in canon settlement data
