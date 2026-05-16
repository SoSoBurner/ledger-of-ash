'use strict';
/**
 * coverage-tracker.js — Per-run locality coverage tracking
 *
 * Tracks which localities were visited, how much sp2 each contributed,
 * dead-ends per location, and map menu interactions.
 *
 * Usage:
 *   const CoverageTracker = require('./helpers/coverage-tracker');
 *   const tracker = new CoverageTracker();
 *   tracker.onPick(g);              // call after every pick
 *   tracker.onDeadEnd(loc, pick);   // call when dead-end detected
 *   tracker.onMapTravel(fromLoc, toLoc, pick); // call when map travel happens
 *   const summary = tracker.getSummary();
 */

// All 22 Stage I localities + Stage II localities known to exist
const ALL_LOCALITIES = [
  'shelkopolis','cosmouth','soreheim','guildheart','glasswake_commune',
  'craftspire','ironhold_quarry','unity_square','aurora_crown_commune',
  'harvest_circle','plumes_end_outpost','sunspire_haven','cosmoria',
  'districts','fairhaven','guildheart_hub','ithtananalor','mimolot_academy',
  'nomdara','panim_haven','shirshal','whitebridge_commune',
  'roaz','sheresh','cysur','remeny','eloljaro','gwybodaeth','panim','soreheim_proper',
];

class CoverageTracker {
  constructor() {
    this._localities = {};   // locId → { visits, sp2Start, sp2End, deadEnds, mapTravels }
    this._currentLoc = null;
    this._currentSp2 = 0;
    this._deadEnds = [];
    this._mapTravels = [];
    this._pickCount = 0;
    this._nuclearGateFired = 0;
  }

  /** Call after every pick with the current G snapshot */
  onPick(g) {
    this._pickCount++;
    const loc = g.location || 'unknown';
    const sp2 = (g.stageProgress && g.stageProgress[2]) || 0;

    if (!this._localities[loc]) {
      this._localities[loc] = {
        visits: 0, firstVisitPick: this._pickCount,
        sp2OnArrival: sp2, sp2OnDeparture: sp2,
        deadEnds: 0, mapTravels: 0,
      };
    }

    // Arrival at a new locality
    if (loc !== this._currentLoc) {
      if (this._currentLoc && this._localities[this._currentLoc]) {
        this._localities[this._currentLoc].sp2OnDeparture = this._currentSp2;
      }
      this._localities[loc].visits++;
      this._localities[loc].sp2OnArrival = sp2;
      this._currentLoc = loc;
    }

    this._localities[loc].sp2OnDeparture = sp2;
    this._currentSp2 = sp2;
  }

  /** Call when dead-end detected */
  onDeadEnd(loc, pick, html) {
    this._deadEnds.push({ loc, pick, htmlSnippet: (html || '').slice(0, 120) });
    if (this._localities[loc]) this._localities[loc].deadEnds++;
  }

  /** Call when map travel is initiated */
  onMapTravel(fromLoc, toLoc, pick) {
    this._mapTravels.push({ fromLoc, toLoc, pick });
    if (this._localities[fromLoc]) this._localities[fromLoc].mapTravels++;
  }

  /** Call when nuclear gate fires (headless only) */
  onNuclearGate(pick, sp2) {
    this._nuclearGateFired++;
  }

  /**
   * Returns structured coverage summary.
   */
  getSummary() {
    const visited = Object.keys(this._localities);
    const gaps = [];  // localities visited with 0 sp2 contribution

    const localityRows = visited.map(locId => {
      const d = this._localities[locId];
      const sp2Contributed = d.sp2OnDeparture - d.sp2OnArrival;
      if (sp2Contributed <= 0 && d.visits > 0) gaps.push(locId);
      return {
        locId,
        visits: d.visits,
        firstVisitPick: d.firstVisitPick,
        sp2Contributed: Math.max(0, sp2Contributed),
        deadEnds: d.deadEnds,
        mapTravels: d.mapTravels,
      };
    });

    const unvisited = ALL_LOCALITIES.filter(l => !this._localities[l]);

    return {
      totalPicks: this._pickCount,
      localitiesVisited: visited.length,
      localityRows,
      coverageGaps: gaps,
      unvisited,
      deadEnds: this._deadEnds,
      mapTravels: this._mapTravels,
      nuclearGateFired: this._nuclearGateFired,
    };
  }
}

module.exports = CoverageTracker;
