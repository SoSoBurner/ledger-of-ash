# Canon-Safe Intro Build Instructions for Repository Integration

## Purpose

This file explains how to take the updated NPC and leadership intro material and integrate it into the uploaded world repository without breaking canon, flattening distinctions, or silently retconning existing authority.

This is a **build instruction document**, not a lore replacement. It tells a future builder exactly how to place, label, validate, and preserve the material inside the repository.

---

## Build Objective

Integrate the updated named-NPC intro roster into the repository as a canon-safe operational layer that:

- preserves all corpus-backed names, roles, seats, and institutional relationships already established
- fills only true gaps where the repository leaves important leadership or support roles unnamed
- avoids replacing stronger existing canon with smoother but weaker summary text
- keeps house, principality, institution, and locality distinctions intact
- allows future repo releases to expand these figures without contradiction

Success condition:
The repository can now present a stable, table-usable leadership and notable-NPC intro surface for the Imperial Center, Shelk, Roaz, Mimolot, Shirsh, Cosmouth, Panim, Zootia, The Union, Soreheim Alliance, Sheresh Communes, Psanan, and the Nomdara Caravan.

---

## Canon-Safe Source Hierarchy

When integrating this material, use the following source authority order.

### Tier 1: Narrow named canon already present in repository files
Use any existing repository-supported NPC name, title, seat, settlement, institution, or local placement exactly as given.

Examples already supported in corpus:
- Emperor Alaric Valeon, Empress Maelyra Valeon, Duchess Selendra Valeon, and Lord Chamberlain Vestor Hale in the imperial structure
- Lady Isabella Shelk, Lord Darius Shelk, Lady Rosalind Shelk, Lady Elowen Shelk, Sir Thaddeus Shelk, and Shelkopolis / House of Shelk Estate structures
- Lord Aric Roaz, Commander Halian Roaz, Captain Darian Roaz, and Sir Velden Ironspike
- Lord Auron Cosmouth
- High Priestess Elara Panim
- Guildmaster Selene Starweaver
- Magistrate Helena Shirsh
- Lady Zara Zootia
- the Soreheim Giant Council members Roth Udenine, Cron Udenine, Vorgul Oxtend, Mordoth Valinheim, and Decon Von Reckshem

### Tier 2: Structured polity and institution logic
If a role is not fully named in a location packet but the polity logic is stable, complete the role conservatively using the already-established structure of that realm.

Examples:
- Shelk nobles should remain family members of House Shelk
- Soreheim upper nobility should remain the Giant Council and their recognized strategic officers
- Panim upper authority must remain split between temple hierarchy, funerary administration, and noble-religious imperial figurehead structure
- Mimolot leadership should be expressed as a council under Archmagister Leth Quillfire rather than as a disconnected court
- Shirsh leadership should route through the Magi Magistratus rather than generic noble bureaucracy

### Tier 3: Canon-safe connective completion
Only create a new name when all of the following are true:
- the role is important enough that the repository becomes less usable if it stays blank
- no stronger named canon already occupies the role
- the new figure can be derived from house logic, polity logic, locality logic, or institutional logic
- the addition does not force unsupported deep biography, secret history, or setting-wide consequences

---

## What Must Not Be Changed

Do not do any of the following during integration:

- do not rename existing canon NPCs to make them cleaner or more symmetrical
- do not replace house-specific structures with generic fantasy court labels
- do not merge distinct entities because they seem similar
- do not change seats already tied to named places
- do not move figures out of their established polity sphere without explicit support
- do not convert a locality-linked role into a world-generic one
- do not inflate every important figure into a genius
- do not invent hidden motives, scandals, bloodlines, divine mandates, or secret wars
- do not present newly completed figures as older or stronger canon than they are

---

## Recommended Repository Placement

Create or update repository files using this structure.

```text
repository/
  lore/
    principalities/
      imperial_center/
        imperial_intro_npcs.md
      shelk/
        shelk_intro_npcs.md
      roaz/
        roaz_intro_npcs.md
      mimolot/
        mimolot_intro_npcs.md
      shirsh/
        shirsh_intro_npcs.md
      cosmouth/
        cosmouth_intro_npcs.md
      panim/
        panim_intro_npcs.md
      zootia/
        zootia_intro_npcs.md
      union/
        union_intro_npcs.md
    soreheim_alliance/
      soreheim_intro_npcs.md
    sheresh_communes/
      sheresh_intro_npcs.md
    psanan/
      psanan_intro_npcs.md
    nomdara_caravan/
      nomdara_intro_npcs.md
  indexes/
    npc_index.md
    institution_index.md
    settlement_index.md
  governance/
    canon_completion_log.md
    release_notes/
      V##_canon_safe_npc_intro_integration.md
```

If the repository already has an NPC or locality folder structure, preserve it and insert the material into the closest matching path rather than forcing this exact layout.

---

## Required Data Shape for Each NPC Entry

Each integrated NPC entry should follow the same field order.

```md
## [Full Name]
- Role:
- Seat:
- Polity:
- Institution:
- Voice:
- Language patterns:
- Intelligence profile:
- Canon status:
- Integration note:
```

### Field Rules

**Full Name**
- preserve exact corpus name when canon exists
- for canon-safe completions, use names consistent with polity naming patterns already present

**Role**
- keep narrowly tied to the polity function
- avoid generic labels when a more exact one exists

**Seat**
- use the most specific valid seat already supported
- if the figure is mobile, use the polity sphere only when locality cannot be narrowed further without invention

**Polity**
- required for indexability and cross-repo filtering

**Institution**
- tie the person to a real institution whenever possible

**Voice / Language patterns / Intelligence profile**
- preserve the exact characterization already established in the approved roster unless contradicted by stronger canon
- do not over-expand into biography

**Canon status**
Use one of:
- Canon
- Canon-Corrected
- Canon-Safe Completion

**Integration note**
Briefly state why this entry exists in this form.
Examples:
- “Existing named corpus figure preserved and normalized to repository field order.”
- “Added as canon-safe completion to fill required leadership gap under established polity logic.”

---

## Integration Method by Realm

## 1. Imperial Center of the Principalities

Build this as the top ceremonial and legal authority layer.

Required handling:
- preserve Emperor Alaric Valeon and Empress Maelyra Valeon as the central imperial pair
- keep Duchess Selendra Valeon and Lady Merithe Valeon inside the imperial noble orbit, not detached provincial nobility
- retain administrative officers like High Steward Renwic Vale, Archivist Prelate Thom Caer, Captain Serro Malvein, Tribute Assessor Iven Pell, and Mortuary Marshal Heskar Dune as palace-functional infrastructure rather than regional rulers

Repository effect:
- strengthens imperial intro usability
- clarifies the difference between symbolic rule, court management, records, tribute, security, and mortuary authority

## 2. Shelk

This material must integrate into House Shelk and Shelkopolis as one connected power-and-culture system.

Required handling:
- preserve House Shelk Estate as the noble seat layer
- preserve Shelkopolis as the major civic-cultural seat layer
- keep Lady Isabella Shelk, Lord Darius Shelk, Lady Rosalind Shelk, and Sir Thaddeus Shelk connected to House of Shelk Estate
- keep Lady Elowen Shelk and Sir Edrin Valecrest in Shelkopolis-facing functions
- preserve High Priestess Lyara Dawnlight at Aurora Light Cathedral
- preserve Shelk road, outpost, and field roles as external support functions, not court replacements

Important rule:
Shelk nobles remain House Shelk family members unless stronger canon states otherwise.

## 3. Roaz

Roaz must remain a disciplined enforcement-industrial state.

Required handling:
- keep Lord Aric Roaz at Ithtananalor as ruling authority
- keep Commander Halian Roaz tied to the Iron Accord
- keep Captain Darian Roaz and Sir Velden Ironspike tied to ORE and covert enforcement structure
- preserve Veilforged Bastion as a specialized seat for anti-magic / artificer functions
- retain inquisitorial, engineering, tactical, and covert figures as institutional rather than free-floating personalities

Important rule:
Do not soften Roaz into generic lawful fantasy nobility. Its identity depends on law, control, structure, and contained force.

## 4. Mimolot

Mimolot must read as principality leadership through arcane governance, not as a standard royal court.

Required handling:
- preserve Archmagister Leth Quillfire as head of principality
- preserve Dean Arturon Valegear, Magister Selro Vann, Professor Cael Mirrortine, Ithra Quillmark, and Veyla Inkhand
- build House Mimolot council as a governance body under the Archmagister
- make each additional council figure a functional office tied to academy law, restricted texts, diplomacy, practical magical industry, or field security

Important rule:
Do not create a noble-family court if the corpus points to scholarly governance instead.

## 5. Shirsh

Shirsh must remain investigation-heavy and institutionally watchful.

Required handling:
- preserve Magistrate Helena Shirsh as principal civic authority at Shirshal
- keep Lady Varessa and Lord Thaevor tied to Crystal Grove and Mystique Haven respectively
- preserve Sira Doveshade, Nima Glass-Law, Talan Vey, Seln Archive, Pell Rookglass, Risha Veilthorn, and Hel Brenn as Magi Magistratus-facing structure
- populate the Magi Magistratus as the actual leadership body of Shirsh’s enforcement logic

Important rule:
Do not replace Shirsh’s investigative apparatus with generic mage-police abstraction.

## 6. Cosmouth

Cosmouth should remain maritime, trade-centered, and socially fluid.

Required handling:
- preserve Lord Auron Cosmouth at Cosmoria
- keep the core supporting figures port-facing, tide-aware, and trade or cultural in function
- avoid turning Cosmouth into another land-court polity

## 7. Panim

Panim’s upper structure must remain split and layered.

Required handling:
- preserve High Priestess Elara Panim
- preserve funerary authority through Ossarch Veyn Halcyon
- preserve sacred medicine through Orel Vaunt
- preserve Seraphine of the Quiet Pyre as oath-force and grave moral authority
- include the emperor’s brother as the main noble-religious imperial figurehead rather than replacing temple hierarchy

Important rule:
Do not collapse Panim into “the church rules everything.” The corpus indicates divided upper authority.

## 8. Zootia

Zootia should remain materially grounded.

Required handling:
- preserve Lady Zara Zootia as productive estate authority
- keep its secondary figures practical, agricultural, and land-facing rather than excessively courtly

## 9. The Union

The Union must remain institutional and transactional.

Required handling:
- preserve Guildmaster Selene Starweaver as top authority
- keep supporting figures tied to fraud, leverage, negotiation, and guild politics
- do not convert The Union into a noble house

## 10. Soreheim Alliance

Soreheim nobility must remain the Giant Council.

Required handling:
- preserve Roth Udenine, Cron Udenine, Vorgul Oxtend, Mordoth Valinheim, and Decon Von Reckshem as upper authority
- keep Brakka Stonewake, Decran Moltglass, Gorath Steelclad, Hrolf Ashsight, and Varric Icevein tied to functional locations like Titan Towers, Duneshade Outpost, and Ashforge Quarry
- do not invent a separate aristocratic layer over the Giant Council

## 11. Sheresh Communes

Keep this realm practical, environmental, and containment-aware.

Required handling:
- preserve domeway, commune, and steward structures
- do not convert Sheresh into a principality clone

## 12. Psanan

Keep it matriarchal, volcanic, and forcefully civic.

Required handling:
- preserve Citadel-centered authority
- keep secondary figures tied to heat control, ritual responsibility, descent risk, and forged survival

## 13. Nomdara Caravan

Keep Nomdara mobile.

Required handling:
- never over-fix Nomdara leadership to a static settlement
- use caravan, route, and moving-seat language

---

## Naming Rules for New Canon-Safe Completions

When a name must be created, follow these rules:

- match the sound and naming density of the surrounding polity
- reuse house surnames only where family logic supports it
- use occupational or institutional surnames where that pattern already exists in the corpus
- avoid comedic, modern, or obviously imported naming styles
- avoid duplicating major canon surnames unless family connection is intended
- do not create names that imply unsupported race or bloodline twists

Good completion behavior:
- **Provost Mirel Thandor** for a Mimolot academic office
- **Archivist Superior Naliah Voss** for a restricted text authority
- **Prince-Prelate Cassian Valeon** for an imperial-religious Panim figurehead

Bad completion behavior:
- giving every missing person the ruler’s surname
- adding excessive apostrophes or stylized fantasy clutter
- inventing secret dynasties to justify names

---

## Required Crosslink Updates

After integrating entries, update these repo systems.

### NPC index
Add each NPC with:
- full name
- polity
- seat
- institution
- file path
- canon status

### Institution index
Ensure these institutions point to their leadership:
- Emperor’s Castle
- House of Shelk Estate
- Aurora Light Cathedral
- ORE
- Iron Accord
- House Mimolot Council
- Magi Magistratus
- Guildheart Hub
- Giant Council
- Panim upper authority structures

### Settlement index
Every seat must resolve to a valid settlement, site, or sphere already supported by the repository.

---

## Validation Checklist

Before release, run this checklist.

### Canon safety
- [ ] No existing canon name was overwritten by a weaker completion
- [ ] No polity structure was flattened into generic fantasy governance
- [ ] No seat was moved without support
- [ ] No new deep biography or secret canon was invented

### Structural integrity
- [ ] Every major realm in the intro roster has a stable leadership layer
- [ ] Every NPC has a role and seat
- [ ] Institutions resolve cleanly to locations
- [ ] Mobile groups remain mobile in structure

### Style integrity
- [ ] Voice and intelligence lines remain concise and operational
- [ ] Entries are not bloated into story paragraphs
- [ ] Political, religious, investigative, military, and economic functions remain distinct

### Repository usability
- [ ] NPC index updated
- [ ] Institution index updated
- [ ] Settlement index updated
- [ ] Release note added
- [ ] Canon completion log records which entries are completions rather than prior canon

---

## Required Canon Completion Log Format

When a new name was added rather than preserved from direct corpus naming, log it like this:

```md
## [Full Name]
- Canon status: Canon-Safe Completion
- Added in release: V##_?
- Reason added: Required to complete leadership / institutional intro surface
- Derived from: [house logic / institution logic / polity logic / locality logic]
- Notes: Does not override any stronger prior named canon
```

This prevents future releases from mistaking connective completions for older direct-source canon.

---

## Recommended Release Note Language

```md
# V##_ Canon-Safe NPC Intro Integration

This release integrates named leadership and institutional intro figures across the Imperial Center, Shelk, Roaz, Mimolot, Shirsh, Cosmouth, Panim, Zootia, The Union, Soreheim Alliance, Sheresh Communes, Psanan, and the Nomdara Caravan.

Highlights:
- preserved corpus-backed names, seats, and roles
- completed missing leadership gaps conservatively
- normalized intro NPC formatting for repository use
- clarified council and institution leadership where polity logic required it
- added completion logging to prevent silent canon drift
```

---

## Final Build Rule

When uncertain, do **less**.

The correct canon-safe move is not the most exciting addition. It is the smallest, strongest addition that makes the repository more operational without weakening continuity.

If a role can remain narrow, keep it narrow.
If a name is already supported, preserve it exactly.
If a gap must be filled, fill it in the shape the polity already implies.
If two sources conflict, preserve the stronger one and log the unresolved edge instead of smoothing it away.
