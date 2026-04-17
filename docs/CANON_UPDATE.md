# Ledger of Ash — Canon Update

## Active canon version: V28_8_DnD_World_Repository

> Previous extractions were from V28_4. All locality names, polity identities, faction references, route identity, NPC placement, and archetype/background locality grounding now align to V28_8.

---

## What was extracted from V28_8 (formerly V28_4)

### Settlements used as playable localities (11)
- Shelkopolis (House Shelk capital, Principality of Shelk)
- Fairhaven (town, Principality of Shelk)
- Mimolot Academy (academic settlement, House Mimolot)
- Soreheim Proper (macro-capital, Soreheim Alliance)
- Guildheart Hub (Union successor settlement)
- Panim Haven (metropolis, House Panim)
- Ithtananalor (city, Principality of Roaz)
- Aurora Crown Commune (dome commune, Sheresh Communes)
- Cosmoria (floating metropolis, House Cosmouth)
- Shirshal (magical investigation hub, House Shirsh)
- Sunspire Haven (market town, frontier region)

### Factions used (subset of 33)
- Roadwardens Order
- House Shelk
- House Panim
- The Union
- Shadowhands
- Iron Accord
- Frontier Hammer Companies
- Engineers Consortium
- Miners Assembly
- Artificers Guild
- Agricultural Syndicate
- Communal Ration Allocators
- Containment Research Concord
- Sheresh Dome Stewards
- Magi Magistratus
- Red Hood Guild
- Guild Sanction Board
- Fashion Artisans Collective

### Named NPCs from V28_4 canon
Used in npcData arrays, opening scenes, companion defs, and consequence text:
- Lady Isabella Shelk, Lady Elowen Shelk
- Captain Thalion Windrider (Roadwardens)
- High Priestess Lyara Dawnlight
- Sera Aurorine
- Vera Wren, Kest Vale, Kest Wren
- Toriel Palevow, Marrowen Mercycrypt, Celis Lanthorn
- Captain Darian Roaz, Sir Velden Ironspike
- Warden Sera Whiteglass, Neren Rimebridge, Researcher Toman Iceveil
- Roth Udenine, Lyria Firesoul, Decon Von Reckshem
- Elyra Mossbane, Jorva Helmrune, Kael Emberthrone
- Nira Veilthorn, Veyn Veilthorn, Pela March
- Quillan Quillmark, Vessa Scriptmere, Archivist Luthen Valcrest
- Halv Ledgermere, Sena Ledgermere, Porter Ledgermere
- Tideon Anchorlight, Sevrin Shellmark, Maris Coralwake

### Deities used
- Cysur (Aurora Light Cathedral, Principality of Shelk)
- Eloljaro (Principality of Roaz and environs)
- Vonalzo (dueling and combat, regional)
- Remeny (trade and transit, Union region)
- Twyll (deception, Shadowhands-adjacent)
- Gwybodaeth (knowledge, Mimolot)
- Cyfoes (Sheresh Communes, temporal)

### Routes referenced
Eastern route (unnamed in canon but consistent with Ironroot Crossing corridor), frontier waypoints, Nomdara Whirlpool safe passage.

---

## What is still ignored from V28_4

- Psanan: fully excluded from playable content per spec. Ashforge Citadel, Ashwake Port, Psanan not playable.
- Descent content: Scarlet Descent Gate, Embervale Settlement, underground zones.
- Planet of Ocean, Shade Moon, Planet of Fire (cosmological layers).
- Most wilderness points and legacy ruins.
- Civil rites and calendar systems (present in canon, not yet surfaced in gameplay).
- Most macroregion content (Deep Forest, Eternal Lands, Whispering Dunes).
- Non-playable settlements: Silent Haven, Plume's End, Emberhollow Forge Town, Duneshade Outpost (referenced in text but not playable).

---

## Inference rules applied

1. **Named NPCs not in canon with explicit dialogue:** Given roles consistent with their canon institutional affiliation and settlement context. No invented personality diverging from role.
2. **Unnamed locations referenced in route text:** Not invented as new locations; referenced only as waypoints on canon routes.
3. **Faction motivations:** Derived from canon faction descriptions only. No invented factions.
4. **Eastern route operation:** This is the shared investigation spine. The operation is a fictional game construct, but all parties involved (House Shelk, Roadwardens, Shadowhands, Union) are canon factions acting within their established mandates.
5. **Companion personalities:** Derived from role + locality. Vera Wren's network access = canonical tavern/door warden. Toriel's registry access = canonical street physician. Neren's dome knowledge = canonical commune mediator. Elyra's frontier expertise = canonical guardian.

---

## What was stale and is now removed

- References to "18 scenes / ~60 nodes / 25 archetypes" from early session docs.
- No-apostrophe authoring constraint (was a UI bug precaution, now removed).
- References to V28_3 or earlier versions.
- References to "upcoming Claude API integration" as a near-term feature (now correctly scoped to Phase 2).

---

## Current build numbers

| Metric | Count |
|--------|-------|
| Archetypes | 31 |
| Backgrounds | 93 (3 per archetype: Civic, Frontier, Occult) |
| Starting locality assignments | 93 (all V28_8-canonical via background-locality-map.js) |
| Playable localities | 11 |
| Recruitable companions | 4 (defined in party.js; recruitment flow uses legacy API) |
| Archetype combat abilities | 93 (31 archetypes × 3 abilities each, in combat.js) |
| Stage II background content entries | 31+ archetype families in stage2-backgrounds.js |
