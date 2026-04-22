var SHADOW_LEDGER_HINTS = (function() {

  var HINTS = [
    { id: 'hint_permit_seals', text: 'A merchant at the transit post mentions suspicious permit seals — the watermark is wrong, but the signature is genuine. "Twice-Sealed, they call the forgeries. Someone knows both sides of the approval chain."', clock: 'pressure', threshold: 2 },
    { id: 'hint_sel_stone', text: 'A contact at the Guildheart Hub mentions a name — Sel Stone — with the careful tone of someone passing on information they weren\'t supposed to have. "He knows who moves things through channels that don\'t exist. Red Hood Guild, maybe. Maybe older than that."', clock: 'watchfulness', threshold: 3 },
    { id: 'hint_transit_workers', text: 'Three transit workers at the harbor have not been paid in six weeks. Their work orders reference a company that does not appear in the official permit registry. The company name: Twice-Sealed Transit.', clock: 'pressure', threshold: 4 }
  ];

  function checkAndFire() {
    var G = window.G;
    if (!G || !G.worldClocks) return;
    HINTS.forEach(function(hint) {
      if (!G.flags['hint_fired_' + hint.id] && (G.worldClocks[hint.clock] || 0) >= hint.threshold) {
        G.flags['hint_fired_' + hint.id] = true;
        if (typeof addNarration === 'function') addNarration('Rumor', hint.text);
        window.addJournal('investigation', hint.text);
        if (hint.id === 'hint_sel_stone') {
          G.flags.sel_stone_known = true;
          if (!G.discoveredNPCs) G.discoveredNPCs = {};
          G.discoveredNPCs['sel_stone'] = { name: 'Sel Stone', status: 'rumor', notes: 'Red Hood Guild connection. Knows unofficial transit channels.' };
        }
      }
    });
  }

  return { checkAndFire: checkAndFire };
})();

window.SHADOW_LEDGER_HINTS = SHADOW_LEDGER_HINTS;
