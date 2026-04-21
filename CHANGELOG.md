# Changelog

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
