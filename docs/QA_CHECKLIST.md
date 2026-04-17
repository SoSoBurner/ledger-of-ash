# Ledger of Ash — QA Checklist

> Updated for V28_8 runtime (Batch 27). Previous checklist referenced scenes.js / consequences.js architecture which is now archived in legacy/.

## Pre-deploy: Build

- [ ] `python build.py` runs without error
- [ ] Output is `dist/index.html` (~230 KB)
- [ ] dist/index.html opens in browser without console errors
- [ ] Build reads only active files from `js/` (not legacy/)

## Pre-deploy: Start state

- [ ] Character creation form populates archetype and background selectors
- [ ] Background selector shows locality name per background (e.g., "Civic Hand — Shelkopolis")
- [ ] Each archetype shows correct V28_8 starting localities for its 3 backgrounds
- [ ] Narrative panel populates immediately after "Begin Your Legend"
- [ ] Result panel shows last result text
- [ ] Choices panel shows 6–8 choices on Stage I

## Pre-deploy: Story screen order

- [ ] Location / time / state header appears first
- [ ] Narrative panel (scene text) appears before result
- [ ] Result text appears before choices
- [ ] No panel overrides this order on desktop or mobile

## Pre-deploy: Stage progression

- [ ] Stage I advances after 4+ progress + Level 5
- [ ] Stage II unlocks adjacent locality pressure and route choices
- [ ] Notice board records level-up, stage advance, family edge unlock
- [ ] Death triggers rescue flow (not permadeath) for Stages I–IV
- [ ] Stage V death triggers permadeath and legend save

## Pre-deploy: Locality grounding

- [ ] warrior_civic starts at Shelkopolis
- [ ] death_knight_civic starts at Panim Haven
- [ ] ranger_civic starts at Fairhaven
- [ ] wizard_civic starts at Mimolot Academy
- [ ] berserker_occult starts at Cosmoria
- [ ] Narrative text matches the starting locality (not Shelkopolis for non-Shelk starts)

## Pre-deploy: Services and POIs

- [ ] Services panel shows POIs for the current locality
- [ ] Recovery POI restores HP
- [ ] Equipment POI allows item purchase if gold is sufficient
- [ ] Info POI gains XP and adds journal entry
- [ ] Camp panel shows 4 choices (rest, reflect, scout, maintain)

## Mobile checks (375px)

- [ ] Navigation bar wraps without overflow
- [ ] Narrative panel readable at 375px
- [ ] Choice buttons have adequate tap target
- [ ] Active panel (Sheet/Journal/etc.) scrolls independently
- [ ] Notice board entries are separated visually

## Canon checks (V28_8)

- [ ] No invented locality names appear in header or narrative
- [ ] Locality names match V28_8: Shelkopolis, Panim Haven, Soreheim Proper, Sunspire Haven, Fairhaven, Mimolot Academy, Ithtananalor, Guildheart Hub, Cosmoria, Aurora Crown Commune, Shirshal
- [ ] No Psanan/Ashforge/Ashwake appear as starting localities
- [ ] Polity names in locality data match V28_8 (Principality of Shelk, Principality of Roaz, etc.)
