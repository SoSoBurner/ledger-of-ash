// living_narration.js — Living Narration Panel data
// LIVING_VARIANTS: per-locality anchor text, indexed by outcome state
// [0] = neutral/partial, [1] = success/crit, [2] = complication/fumble
// window.LIVING_VARIANTS = { 'shelkopolis': ['...', '...', '...'], ... };
window.LIVING_VARIANTS = window.LIVING_VARIANTS || {};

// LOCALITY_ANCHORS: single fallback anchor string per locality
// Used when LIVING_VARIANTS has no entry for the current locality
// window.LOCALITY_ANCHORS = { 'shelkopolis': '...', ... };
window.LOCALITY_ANCHORS = window.LOCALITY_ANCHORS || {};

// STATE_SUFFIXES: appended to the anchor based on current game state priority
// Keyed by stage tier ('s1' / 's2'), then priority key, then array of 4 rotating variants
// window.STATE_SUFFIXES = { s1: { neutral: ['...','...','...','...'], success: [...], ... }, s2: { ... } };
window.STATE_SUFFIXES = window.STATE_SUFFIXES || {};
