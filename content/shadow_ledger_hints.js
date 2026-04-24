var SHADOW_LEDGER_HINTS = (function() {

  var HINTS = [
    { id: 'hint_permit_seals', text: 'A merchant at the transit post turns his permit over twice before saying anything. The grain of the paper is wrong — he shows you the edge. The signature is genuine; the seal is not. "Twice-Sealed," he says. "Someone knows both sides of the approval chain."', clock: 'pressure', threshold: 2 },
    { id: 'hint_sel_stone', text: 'At the Guildheart Hub, a woman refills her cup and watches the room before she says the name. Sel Stone. She does not write it down. "He knows who moves things through channels that don\'t exist. Red Hood Guild, maybe. Maybe older than that." She does not bring it up again.', clock: 'watchfulness', threshold: 3 },
    { id: 'hint_transit_workers', text: 'Three transit workers share a fire at the harbor staging ground. Six unpaid weeks — they mention it the way people mention weather, without expecting it to change. Their work orders name a company with no entry in the permit rolls. Twice-Sealed Transit.', clock: 'pressure', threshold: 4 }
  ];

  function checkAndFire() {
    
    if (!G || !G.worldClocks) return;
    HINTS.forEach(function(hint) {
      if (!G.flags['hint_fired_' + hint.id] && (G.worldClocks[hint.clock] || 0) >= hint.threshold) {
        G.flags['hint_fired_' + hint.id] = true;
        if (typeof addNarration === 'function') addNarration('Rumor', hint.text);
        addJournal(hint.text, 'rumor');
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
