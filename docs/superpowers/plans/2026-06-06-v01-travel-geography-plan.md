# V0.1 Travel, Geography & World Fidelity Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all travel system blockers, add canonical geography fidelity, and restore Soreheim Proper's thematic identity for V0.1 release.
**Architecture:** Single-file game (`ledger-of-ash.html`), content in `content/travel_corridors.js`, reference data in `data/reference/V33_2_extracted/`.
**Tech Stack:** Vanilla ES5 JS, no bundler. All changes to HTML file or content/ JS files.

---

## Already Fixed (Do NOT Re-Implement)

| Done | Commit | What |
|------|--------|------|
| ✅ | `28bfe895` | `sunspire` alias added to all 3 `_LOC_ALIAS` tables — fixes `?` travel days |
| ✅ | `48ad3d99` | `corridor_encounters_enabled` in defaults; `G.pace` in `startTravel`; alias norm in `_travelCoreTravelTo`; travel test `G.day→G.dayCount` |
| ✅ | `fe2f9a65` | Stage III gate modal wired + `closest()` escape fix |

---

## Playtest Protocol — Current State (2026-06-06)

### Headless Run (20260605-2324)
- 4/4 families ✅ — classic-combat/paladin, magic/wizard, stealth/trickster, support/engineer
- 0 dead-ends · 10 localities · 21 map travels · 13.2 min
- Coverage gaps (0 sp2): shelkopolis/fairhaven/guildheart visited in Stage II — expected

### Headed Run (20260605-2242, previous)
- 4/4 families ✅ — 342 total picks, 0 dead-ends, 0 JS errors, 0 new warnings
- `day=undefined` in map travel log = spec artifact (readG race), not engine bug
- Panel audit: `WARN: no .ability-card found` on all families (pre-existing display issue)
- Char-sheet skill mismatch probe = spec ordering issue, not game bug

### Active Headed Run (bigiznkhi — still running)
- classic-combat warden/a2 in Stage I — ongoing

### Playtest Blind Spots Identified
- Spec calls `_travelCoreTravelTo` directly — bypasses modal UI, `G.travelMode`, day advancement
- No assertion on `G.dayCount` after travel
- No assertion on corridor encounters firing
- → Flag for post-V0.1 spec improvement (gated by Playtest Change Gate)

---

## V0.1 Blocker Assessment

| System | Status | Notes |
|--------|--------|-------|
| Boss events (S1 + S2) | ✅ FINE | `shouldTrigger`/`checkTrigger` correctly wired; dual advancement paths |
| Combat | ✅ FINE | Null guards, CS init, death flow all correct |
| Bestiary | ⚠️ DEGRADED | Boss enemies use inline `ENEMY_TEMPLATES`, not `bestiary_lookup.js` — data architecture only, not gameplay |
| Travel encounters | ✅ FINE | One combat call, validated enemy keys |
| Travel days `?` | ✅ FIXED | `sunspire` alias — commit `28bfe895` |
| Corridor encounters disabled | ✅ FIXED | `corridor_encounters_enabled` in defaults — commit `48ad3d99` |
| Pace ignored by `startTravel` | ✅ FIXED | `G.pace` — commit `48ad3d99` |
| Stage III gate button | ✅ FIXED | Modal wired + selector fix — commit `fe2f9a65` |
| Soreheim Proper thematic identity | ❌ MISSING | No Titan Tower content, wrong thematic tone |
| Sea biome encounter weights | ❌ MISSING | `sea` biome has no weight in `BIOME_ENCOUNTER_WEIGHTS` |
| Cosmoria → Panim sea route | ❌ MISSING | No coastal route coded |

---

## World Geography Reference (V33_2 Canon)

### Coordinate System (V28_8 scale)
```
WEST                                                    EAST
Soreheim Proper (X=205)  ....  Fairhaven (X=1296)  ..  Shelkopolis (X=1470)
                               [Edict Ocean North]      Panim Haven (X=1670)
                                                        Cosmoria (X=1740, SE coast)
```

### Key Relationships
- **Cosmoria** is the **easternmost** major settlement — southeast of Shelkopolis, south-southeast of Panim (not southwest)
- **Soreheim Proper** is ~1,265 X-units west of Shelkopolis — a different continental scale from any Principalities journey
- **Union** (Guildheart Hub) sits between Fairhaven and Shelkopolis
- **Cosmoria → Shelkopolis**: 19.8 ship-days (coded in `locality_travel_network.json`)
- **Soreheim → Fairhaven**: 285 foot-days / 171 horse-days — correctly coded as `mountain` biome (continental friction model, not literal mountain)
- **Edict Ocean**: Northern frozen sea, under Sheresh governance; not crossable in V0.1 scope
- **Eternal Lands**: Maritime hub within Soreheim Alliance; sea route 21 days — correctly coded as `sea` biome

### Soreheim Proper — Canonical Identity
> "Multiple colossal Titan Towers rise across volcanic industry, bridged by heat-hazed logistics and treaty traffic."

**Tower architecture:**
- Volcanic stone, quarried from same source, fitted without mortar — no two towers identical
- Tower-bases: magma forges (production core)
- Mid-levels: workshops, arsenals, administrative floors
- Upper crowns: governance chambers, observatories, foreign delegations
- Staging platforms at "twice the height of any Principalities building"
- Connected by bridges (implied by "bridged by heat-hazed logistics")
- Life is NOT only inside towers — Eternal Lands is the rural labor belt outside

**Source:** `data/reference/V33_2_extracted/.../locality_packets/soreheim_proper.json` + `text_rpg_packets/soreheim_proper_text_rpg_packet.md`

---

## Stream A — Travel & Geography Fixes (V0.1 Scope)

### Task A1: Add `sea` Biome to `BIOME_ENCOUNTER_WEIGHTS`

**File:** `content/travel_corridors.js`

**Context:** `sea` and `coastal` biomes are assigned to routes (Cosmoria↔Brineland, Soreheim↔Eternal Lands) but have no weight in `BIOME_ENCOUNTER_WEIGHTS`. This means sea-route encounters get weight 0 regardless of route length — no encounters on any sea crossing.

- [ ] **Step 1: Find `BIOME_ENCOUNTER_WEIGHTS`**
  ```bash
  grep -n "BIOME_ENCOUNTER_WEIGHTS\|sea.*extra\|coastal.*extra" content/travel_corridors.js | head -20
  ```

- [ ] **Step 2: Add weights for `sea` and `coastal`**
  In `BIOME_ENCOUNTER_WEIGHTS`, add after the existing entries:
  ```js
  sea:      { short_extra: 0, medium_extra: 0.5, long_extra: 1.5 },
  coastal:  { short_extra: 0, medium_extra: 0,   long_extra: 0.5 },
  ```
  (Coastal was missing or set to 0 — sea routes are more dangerous than coastal)

- [ ] **Step 3: Verify**
  ```bash
  node tests/content/validate-content.js 2>&1 | tail -5
  ```

- [ ] **Step 4: Commit**
  ```bash
  git add content/travel_corridors.js
  git commit -m "fix(content): add sea/coastal biome weights to BIOME_ENCOUNTER_WEIGHTS"
  ```

---

### Task A2: Add Cosmoria ↔ Panim Haven Sea Route

**File:** `content/travel_corridors.js`

**Context:** Cosmoria is a nearshore floating city. Panim Haven (X=1670, Y=456) is the closest major polity to Cosmoria (X=1740, Y=700). No direct sea route exists between them. Distance ~190 miles → ~8 boat-days. This is the only canonical route gap that is a player-visible omission (players in Cosmoria should be able to reach Panim by sea).

- [ ] **Step 1: Find route insertion point**
  ```bash
  grep -n "cosmoria\|panim_haven" content/travel_corridors.js | head -20
  ```

- [ ] **Step 2: Add route entry**
  In `TRAVEL_ROUTES`, after the existing Cosmoria entries:
  ```js
  'cosmoria|panim_haven': { tier:'medium', biome:'coastal', foot:0, horse:0, cart:0, boat:8.0 },
  'panim_haven|cosmoria': { tier:'medium', biome:'coastal', foot:0, horse:0, cart:0, boat:8.0 },
  ```

- [ ] **Step 3: Add to `locality_travel_network.json`**
  In `data/reference/07_WORLD_GRAPH/locality_travel_network.json`, add the edge:
  ```json
  { "from": "cosmoria", "to": "panim_haven", "distance": 190, "ship_days": 8.0, "corridor": "cosmoria_panim_coast" }
  ```

- [ ] **Step 4: Add corridor narration**
  In `CORRIDOR_NARRATIONS` (travel_corridors.js), add:
  ```js
  cosmoria_panim_coast: [
    'The coastal shipping lane from Cosmoria to Panim runs close to shore. Fishing vessels and merchant galleys share the water.',
    'The passage north from Cosmoria follows the Cosmouth shoreline. The floating city grows smaller behind you as Panim\'s towers emerge ahead.',
    'Three days into the coastal passage, the Cosmouth headlands give way to the broader Panim estuary approach.'
  ],
  ```

- [ ] **Step 5: Verify + Commit**
  ```bash
  node tests/content/validate-content.js 2>&1 | tail -5
  git add content/travel_corridors.js data/reference/07_WORLD_GRAPH/locality_travel_network.json
  git commit -m "feat(content): add cosmoria<->panim_haven coastal sea route (8 boat-days)"
  ```

---

### Task A3: Fix Soreheim Proper Arrival Narration — Titan Tower Identity

**File:** `content/locality_narrations.js` (or equivalent locality narration for `soreheim_proper`)

**Context:** Soreheim Proper's canonical identity is volcanic industrial towers, not generic city. The current narration (if any) likely doesn't convey Titan Towers, magma forges, volcanic industry, or the bridge-connected tower structure.

- [ ] **Step 1: Find current Soreheim narration**
  ```bash
  grep -n "soreheim_proper\|soreheim" content/locality_narrations.js | head -20
  grep -n "soreheim_proper\|Titan Tower\|magma" content/locality_narrations.js | head -10
  ```

- [ ] **Step 2: Write canonical arrival narration**
  Replace or add `soreheim_proper` narration:
  ```js
  soreheim_proper: 'The Titan Towers are visible long before you arrive. They rise from the volcanic plateau in clusters — not uniform, each quarried from the same dark stone but built to different purposes and different heights. The approach roads are packed aggregate, designed for loaded cargo haulers. Staging platforms project from the lower tower faces at twice the height of any Principalities building. Between the towers, overhead bridges carry logistics traffic through heat haze. The air tastes of sulfur and hot metal. This is not a city that grew — it was constructed to specification and expanded under quota.',
  ```

- [ ] **Step 3: Verify + Commit**
  ```bash
  node tests/content/validate-content.js 2>&1 | tail -5
  git add content/locality_narrations.js
  git commit -m "fix(content): soreheim_proper arrival narration — Titan Towers, volcanic industry, canonical identity"
  ```

---

### Task A4: Add Soreheim Proper Enriched Choices — Tower-Themed

**File:** `content/soreheim_stage1_enriched_choices.js` (create if not exists) or the existing soreheim stage file.

**Context:** Soreheim's choices should reflect vertical tower society — allocation systems, quota compliance, tower hierarchy, forge work. If current choices treat it as a generic city, they break the thematic identity.

- [ ] **Step 1: Find existing Soreheim choices**
  ```bash
  ls content/ | grep soreheim
  grep -rn "soreheim_proper" content/ | grep -v test | head -20
  ```

- [ ] **Step 2: Audit existing choices**
  Read the soreheim stage file. Count how many choices reference:
  - Titan Towers / tower interiors
  - Magma forges / volcanic industry
  - Allocation Hall / quota system
  - Bridge logistics
  - Tower governance tiers

- [ ] **Step 3: Add 3 tower-themed choices**
  Add to the enriched choices pool for soreheim_proper:
  ```js
  {
    label: 'The allocation clerk stamps your transit permit. Tower Twelve, sub-floor nine. You have until the third bell.',
    tags: ['Investigation', 'Soreheim'],
    plot: 'main',
    fn: function() {
      G.investigationProgress++;
      G.stageProgress[1] = (G.stageProgress[1]||0) + 1;
      addNarration('Allocation Hall', 'Sub-floor nine of Tower Twelve is a processing hub — rows of clerks, quota ledgers stacked to the ceiling, the smell of hot stone from the forge levels below. The permit system is tighter than anything in the Principalities. Everything moves through here.');
      addJournal('Soreheim Allocation Hall: sub-floor nine, Tower Twelve. Permit system is vertically integrated — each tower floor has its own quota authority.', 'field_note');
    }
  },
  {
    label: 'The bridge between Tower Seven and Tower Nine sways under freight haulers. A foreman waves you across.',
    tags: ['Travel', 'Soreheim'],
    fn: function() {
      addNarration('Tower Bridge', 'The bridge is wide enough for two cargo sleds side by side, cables thick as your arm. Below, the volcanic plain stretches to the horizon — extraction zones, blasted clean in horizontal layers. The towers cast long shadows. Everything here is built to a scale that makes ordinary architecture feel provisional.');
    }
  },
  {
    label: 'The magma forge on tower-base level three is operating at full quota. The heat is noticeable from the entry stairs.',
    tags: ['Craft', 'Soreheim'],
    fn: function() {
      G.stageProgress[1] = (G.stageProgress[1]||0) + 1;
      addNarration('Forgeheart Level Three', 'The forge crew works in rotation — ten minutes on, ten off, face shields down. The stone around the forge ports has been replaced twice since the tower was built. Output crates move on conveyor rollers to the staging platform.');
      addJournal('Tower forge operations: rotation-based crews, face shield protocol. Output staged to exterior platforms for crane transfer.', 'field_note');
    }
  },
  ```

- [ ] **Step 4: Verify + Commit**
  ```bash
  node tests/content/validate-content.js 2>&1 | tail -5
  git add content/
  git commit -m "feat(content): soreheim_proper tower-themed enriched choices — Titan Towers, forge, allocation hall"
  ```

---

## Stream B — Playtest Spec Travel Assertions (Post-V0.1 Gate)

**⛔ GATED by Playtest Change Gate — do not implement without explicit user approval.**

These are the spec blind spots identified in the travel audit:

1. After `_travelCoreTravelTo`, assert `gAfter.day > g.day` (day count advanced)
2. After travel, log whether `G.travelMode` is set (currently unlogged)  
3. Add `[map-travel] WARN: dayCount did not advance` log if days didn't change
4. Add `[corridor] WARN: no encounter fired` probe after first travel per run

---

## Stream C — Bestiary Architecture (Post-V0.1, Non-Blocking)

The boss enemy objects (Stage 1 and Stage 2) are defined inline in `content/stage1_boss.js` and `content/stage2_boss.js`, not in `data/bestiary_lookup.js`. This is a data consistency issue only — gameplay is unaffected. Post-V0.1 cleanup:
1. Move boss enemy stat blocks into `bestiary_lookup.js` under `BESTIARY.bosses`
2. Add try-catch around `pendingVictoryCallback` execution (line 4921 in HTML)

---

## Execution Order

| Wave | Tasks | Status |
|------|-------|--------|
| 0 | Fixes already committed (aliases, encounters, gate) | ✅ Done |
| 1 | A1 — sea biome weights | Ready |
| 2 | A2 — Cosmoria↔Panim route | Ready |
| 3 | A3 — Soreheim arrival narration | Ready |
| 4 | A4 — Soreheim tower choices | Ready (need Step 1 audit first) |
| 5 | Validators + headless + headed | Verification |

---

## Verification Checklist

```bash
# Validators
node tests/content/validate-content.js 2>&1 | tail -5  # 0 errors
node tests/content/validate-flags.js 2>&1 | tail -3
node tests/content/validate-structure.js 2>&1 | tail -3

# Logic tests
npx jest --passWithNoTests 2>&1 | tail -5  # 597/597

# Headless
npx playwright test tests/e2e/playtest-headless.spec.js --reporter=line  # 4/4

# Headed
npx playwright test tests/e2e/playtest-headed.spec.js --reporter=line  # 4/4
```

**V0.1 Ship Criteria:**
- 0 validator errors
- 4/4 headless, 4/4 headed
- Soreheim arrival narration reads as volcanic/tower (not generic city)
- Cosmoria→Panim route visible in map overlay with correct days
- Sea routes show days (not `?`) for Cosmoria↔Brineland and Soreheim↔Eternal Lands

---

## Notes on What Was NOT Fixed (Out of Scope for V0.1)

- **Edict Ocean crossing routes** — canon places it under Sheresh; no V0.1 localities there
- **Seasonal route availability** — axial flip disruption, winter Edict closure
- **South Swirling Sea routes** — no playable localities in that zone
- **Sub-biome specialization** (`sea_tempest`, `volcanic_industrial`) — over-engineered for V0.1
- **Psanan volcanic encounter biome** — narration exists, no playable route node
- **Cosmoria direction relative to Panim** — user noted it as SW; V33_2 says SE; the map overlay reflects actual game coordinate data, not a bug
