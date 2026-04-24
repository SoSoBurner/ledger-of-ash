'use strict';
// Rule 2: G.flags.met_<name> = true must be set BEFORE addNarration that names the NPC.
// Reuses the A5 implementation from validate-content.js (single source of truth).

const { checkNpcFlagTiming } = require('../../content/validate-content');

module.exports = { checkNpcFlagTiming };
