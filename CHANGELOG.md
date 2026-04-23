# Changelog

## v0.2.0 — 2026-04-22

### Added
- Enriched choice engine: `adaptEnrichedChoice` + `loadStageChoices` serves authored per-locality inner-voice choices instead of generic fallbacks; seen-tracking rotates pool every 4 picks
- Companion recruitment system: 7 companions (4 Stage I, 3 Stage II) with trust gate (≥15), stage flags, and `__recruit__{id}__{outcome}` CID routing; re-recruitment quest support
- Stage 2 climax encounter (`content/stage2_climax.js`): 3-phase narrative (summons → revelation → resolution) with renown-reactive Orveth dialogue and 3 resolution branches
- Archetype-aware NPC branches: Maren Oss and Inquisitor Orveth react to player archetype and renown level
- `buildEnvReactiveLine()`: env-desc second sentence reacts to investigationProgress, renown, and fatigue
- `buildEnvPanelText()`: rotating locality tone descriptor appended even when authored paragraph exists
- Gradient skill progress bar: replaces dot pips; shows numeric value + linear-gradient fill (value/20); both HUD and character sheet render paths updated
- Camp sundown gate: `showCamp()` blocks before Duskcall (timeIndex < 2) with narration feedback
- Notice board badge: clears correctly after viewing notices
- Rest follow-on choices rewritten to inner-voice standard with proper CIDs
- `bard` entry added to `traitChoiceMap`
- `G.flags.maren_oss_resolved` set in `_closeClimax()` — unblocks Stage II companion recruitment
- Character creation: non-active archetype group headers hide on archetype selection; restore on deselect or group switch

### Changed
- 47+ choice labels in `consequences.js` rewritten to inner-voice standard (player thought, not action description)
- 12 remaining "investigation" labels in `consequences.js` replaced with specific alternatives
- Narrative text 19 → 18px; result text 17 → 16px
- `#narrative-scroll` overflow-y: scroll; padding-bottom 100px (fixes result-block clipping)
- Stage 1 result text full rewrite; locality narration fixes across Shelkopolis and Fairhaven
- NPC dossiers and backgrounds narrative quality pass
- Begin button moved into create-header-bar and sized up

### Fixed
- `addJournal` argument order reversed in 3 calls in `stage2_climax.js`; category corrected from 'faction' to 'intelligence'
- `adaptEnrichedChoice` 500ms guard prevents overwriting choices rendered by enriched fn
- `skill:'combat'` badge on passive CIDs corrected to `skill:'survival'`

## v0.1.0 — 2026-04-20

### Added
- Tutorial / onboarding screen (5 pages) shown at new game start
- How-to-play screen accessible from title and in-game menu
- Stage progress bar in HUD
- Fumble locking: main plot choices lock on fumble with backup paths
- Rest limit: 2× per day
- Rival clock: competing investigator with 3 escalating thresholds
- Stage 2 climax encounter (faction confrontation)
- Stage 3 blocker: thank-you screen + Stage II sandbox continuation
- Auto-save after every choice
- Save export as JSON download
- Roll visibility: die face + DC + margin shown before result text
- DC scaling by stage (Stage I: 10/12/14, Stage II: 12/14/16)
- Crit rewards: +XP, +stageProgress on natural 20
- Offline font support (bundled Cinzel + Crimson Pro, no CDN)
- World clock onboarding tooltips (first increment of each clock)
- Character creation mechanic notes on archetype/background cards
- GitHub Pages + itch.io deployment pipeline

### Fixed
- Bold tag was dead code — now derived from domain tags (Combat/Infiltration → bold)
- stageProgress bonus wrote to wrong stage bucket in Stage 2+
- recentOutcomeType mismatch blocked risky/bold bonuses from firing
- Crit background color was jade/green — now correctly ember
- Duplicate CSS token declarations removed (--gold-bright, --blood-bright, etc.)
- notice-card CSS/JS state class mismatch (.seen vs .unread)
- XP gap: universal fallbacks raised from 4–7 XP to 30 XP
- Shelkopolis fumble branches differentiated (5 distinct tonal consequences)
- advanceTime() shim added — was called without guard in all content files
- window.G null guard ordering fixed in handleEnrichedChoice
