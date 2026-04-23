# Ledger of Ash

A text-based RPG set in the **V33_2** Material Planet canon. You are a capable person
in an unstable world. The eastern route has gone wrong. The city knows.
Your job is to understand what happened and decide what to do about it.

**Current build:** 31 archetypes · 3 backgrounds each · 18 canonical localities · Stage I–II full content · V33_2 canon.

## Play

Run `play.bat` — opens `ledger-of-ash.html` directly in Chrome app mode. No build step required.

No server required. Save system uses localStorage.

## Architecture

The game is a **single-file HTML application**: `ledger-of-ash.html` contains all CSS, core JS, game data, and HTML inline. Content scripts live in `content/` and are loaded via `<script>` tags.

```
ledger-of-ash.html          Single-file game engine (source of truth)
content/                    Stage files, encounter scripts, narrations, NPC data
  stage1_choices_*.js       Per-locality Stage I enriched choices
  stage2_climax.js          Stage II climax encounter (3-phase)
  consequences.js           Choice consequence handlers (~200 CIDs)
  companion_*.js            Companion recruitment scenes
play.bat                    Opens ledger-of-ash.html in Chrome app mode
dist/                       Bundled build output — NOT what play.bat serves
legacy/                     Archived reference — do not edit
```

> Never edit `dist/`. All edits go to `ledger-of-ash.html` or `content/`.

## Game Content

**31 Archetypes** across 4 families:
- Combat: Warrior, Knight, Ranger, Paladin, Archer, Berserker, Warden, Warlord, Death Knight
- Magic: Wizard, Cleric, Priest, Necromancer, Illusionist, Inquisitor, Elementalist, Oracle
- Stealth: Rogue, Assassin, Spellthief, Scout, Thief, Trickster, Beastmaster
- Support: Healer, Artificer, Engineer, Tactician, Alchemist, Saint, Bard

**93 Backgrounds** (3 per archetype) — each tied to a canonical starting locality.

**18 Active Localities:** Shelkopolis, Fairhaven, Panim Haven, Soreheim Proper, Sunspire Haven,
Mimolot Academy, Ithtananalor, Guildheart Hub, Cosmoria, Aurora Crown Commune, Glasswake Commune,
Shirshal, Harvest Circle, and 5 adjacent localities.

**Stage I–V Progression:**
- Stage I: Locality-grounded pressure chains; 4+ actions + Level 5 to advance
- Stage II: Adjacent locality pressure; institutional investigation; Stage II climax encounter
- Stage III–V: In development

**Companion System:** 7 companions (4 recruitable in Stage I, 3 in Stage II). Trust-gated, with injury, departure, and re-recruitment mechanics.

**World Clocks:** Watchfulness, Pressure, Rival, Weather — escalating consequences.

**Save System:** localStorage-based auto-save after every choice.

## Canon Authority

**V33_2** is the hard floor for all canon decisions: settlement names, localities, factions, NPCs,
routes, archetype grounding, magic law, union aesthetics. See `CLAUDE.md` for writer rules.

The Ledger of Ash is never named in player-facing text before mid-Stage 4.

## Deployment

Push to `main` — GitHub Pages serves the game automatically from the repo root.

```
https://sosoburner.github.io/ledger-of-ash/
```
