// authority_encounters.js — Per-polity tier-1 authority confrontation entry points
// Populated as window.AUTHORITY_ENCOUNTER_CHOICES[polityKey]
// Each entry is an enriched choice object whose result function calls enterAuthorityConfrontation.
// Loaded by ledger-of-ash.html after other content scripts.

(function () {
  'use strict';

  window.AUTHORITY_ENCOUNTER_CHOICES = window.AUTHORITY_ENCOUNTER_CHOICES || {};

  // ── SHELK — Road Wardens Order ────────────────────────────────────────────
  // Procedural, form-heavy. The warrant number precedes the name.
  window.AUTHORITY_ENCOUNTER_CHOICES['shelk'] = {
    cid: 'authority_shelk_tier1',
    label: 'The Road Warden has a form for this.',
    tags: ['Authority', 'Confrontation'],
    plot: 'side',
    result: function () {
      var polity = 'shelk';
      addNarration('Road Wardens Order',
        'The warden sets his ledger on the gatehouse shelf before he speaks. ' +
        'He reads the warrant number aloud — a long sequence, recited without looking up. ' +
        'Only then does he say your name. The form is already open to the correct page. ' +
        'The other warden stands two paces back, thumbs in his belt, watching your hands.'
      );
      enterAuthorityConfrontation('road_wardens', {
        polity: polity,
        heatLevel: getHeat(polity),
        offense: 'flagged transit record',
        locality: G.location
      });
    }
  };

  // ── ROAZ — Office of Roazian Enforcement ──────────────────────────────────
  // Terse, inspection-focused, anti-magic paranoia. Wand-check before face-check.
  window.AUTHORITY_ENCOUNTER_CHOICES['roaz'] = {
    cid: 'authority_roaz_tier1',
    label: 'The inspector moved for my hands before my face.',
    tags: ['Authority', 'Confrontation'],
    plot: 'side',
    result: function () {
      var polity = 'roaz';
      addNarration('Office of Roazian Enforcement',
        'The inspector does not look at your face first. ' +
        'She looks at your hands — palms, then knuckles — before she speaks a word. ' +
        'A detection wand comes out of her coat pocket, slim and bone-pale. ' +
        'She passes it close without touching you. The reading makes her expression go flat. ' +
        'Her partner blocks the nearest exit without being asked.'
      );
      enterAuthorityConfrontation('roazian_enforcement', {
        polity: polity,
        heatLevel: getHeat(polity),
        offense: 'suspected unlicensed working',
        locality: G.location
      });
    }
  };

  // ── SHIRSH — Magi Magistratus ─────────────────────────────────────────────
  // Forensic, evidentiary. Artifacts handled carefully. Evidence logged before questions.
  window.AUTHORITY_ENCOUNTER_CHOICES['shirsh'] = {
    cid: 'authority_shirsh_tier1',
    label: 'The sealed bag was on the table before I sat down.',
    tags: ['Authority', 'Confrontation'],
    plot: 'side',
    result: function () {
      var polity = 'shirsh';
      addNarration('Magi Magistratus',
        'The magistrate has already set a sealed evidence bag on the table. ' +
        'A reference number is inked on the outside in precise script. ' +
        'She does not open it. She places a second document beside it — a log of movements, ' +
        'cross-referenced by date. She waits for you to sit before she speaks, ' +
        'and when she does her voice stays at the register of someone reading minutes.'
      );
      enterAuthorityConfrontation('magi_magistratus', {
        polity: polity,
        heatLevel: getHeat(polity),
        offense: 'artifact handling irregularity',
        locality: G.location
      });
    }
  };

  // ── MIMOLOT — Book Tariff Office ──────────────────────────────────────────
  // Pedantic. Every text cross-referenced against the exemption register.
  window.AUTHORITY_ENCOUNTER_CHOICES['mimolot'] = {
    cid: 'authority_mimolot_tier1',
    label: 'The exemption register is already open to my entry.',
    tags: ['Authority', 'Confrontation'],
    plot: 'side',
    result: function () {
      var polity = 'mimolot';
      addNarration('Book Tariff Office',
        'The assessor holds your document up against the window light without ceremony. ' +
        'He turns it once, then opens the exemption register to a tabbed page. ' +
        'His finger moves down the column slowly — not because he is slow, ' +
        'but because he wants you to watch. The silence in the tariff hall has a specific texture: ' +
        'the scratch of nibs, the soft knock of stamping blocks, and nothing else.'
      );
      enterAuthorityConfrontation('book_tariff_office', {
        polity: polity,
        heatLevel: getHeat(polity),
        offense: 'unregistered text in transit',
        locality: G.location
      });
    }
  };

  // ── PANIM — Panim Afterlife Registry ──────────────────────────────────────
  // Funerary legitimacy, offering certification, ritual register.
  window.AUTHORITY_ENCOUNTER_CHOICES['panim'] = {
    cid: 'authority_panim_tier1',
    label: 'Three invocations recited before my name is asked.',
    tags: ['Authority', 'Confrontation'],
    plot: 'side',
    result: function () {
      var polity = 'panim';
      addNarration('Panim Afterlife Registry',
        'The registrar recites the three formal invocations before she asks your name. ' +
        'The words are old — not a performance, just procedure. ' +
        'She marks each invocation in a ledger with a stroke of pale ink. ' +
        'When the third is done she looks up. Her desk holds a stack of offering certificates, ' +
        'a ritual register open to a page that already has your arrival date on it.'
      );
      enterAuthorityConfrontation('afterlife_registry', {
        polity: polity,
        heatLevel: getHeat(polity),
        offense: 'uncertified offering or rite',
        locality: G.location
      });
    }
  };

  // ── COSMOUTH — Cosmouth Archives and Treasury ───────────────────────────────
  // Tax records, maritime fiscal legitimacy, cargo disputes.
  window.AUTHORITY_ENCOUNTER_CHOICES['cosmouth'] = {
    cid: 'authority_cosmouth_tier1',
    label: 'The cargo manifest comes out before the question does.',
    tags: ['Authority', 'Confrontation'],
    plot: 'side',
    result: function () {
      var polity = 'cosmouth';
      addNarration('Cosmouth Archives and Treasury',
        'The archivist unrolls a cargo manifest across the counter without preamble. ' +
        'She smooths the edges flat with both palms, then asks for your routing mark. ' +
        'Behind her, shelves of bound ledgers run floor to ceiling, ' +
        'each one spine-labeled in the Archives\' compressed notation. ' +
        'She does not look up the mark herself — she waits for you to point to the line.'
      );
      enterAuthorityConfrontation('cosmouth_archives', {
        polity: polity,
        heatLevel: getHeat(polity),
        offense: 'cargo manifest discrepancy',
        locality: G.location
      });
    }
  };

  // ── ZOOTIA — Harvest Measures Board ──────────────────────────────────────
  // Yields, herd counts, shipment standards. Assessment happens before conversation.
  window.AUTHORITY_ENCOUNTER_CHOICES['zootia'] = {
    cid: 'authority_zootia_tier1',
    label: 'The sample was weighed before I came through the door.',
    tags: ['Authority', 'Confrontation'],
    plot: 'side',
    result: function () {
      var polity = 'zootia';
      addNarration('Harvest Measures Board',
        'The assessor has already weighed the sample. The scale sits to one side, ' +
        'the counterweights still settled in their notches. ' +
        'He writes the figure in a column before he acknowledges you are standing there. ' +
        'The board\'s certified stamp hangs on the wall behind him — ' +
        'a brass plate worn smooth at the center where hands have pressed it flat over the years.'
      );
      enterAuthorityConfrontation('harvest_measures_board', {
        polity: polity,
        heatLevel: getHeat(polity),
        offense: 'yield or shipment standard violation',
        locality: G.location
      });
    }
  };

  // ── UNION — Trade Arbitration Guild ──────────────────────────────────────
  // Contract disputes, merchant claims, procedural. Clause number first.
  window.AUTHORITY_ENCOUNTER_CHOICES['union'] = {
    cid: 'authority_union_tier1',
    label: 'The clause number comes before the dispute does.',
    tags: ['Authority', 'Confrontation'],
    plot: 'side',
    result: function () {
      var polity = 'union';
      addNarration('Trade Arbitration Guild',
        'The arbitrator cites the clause number before she names the dispute. ' +
        'She speaks with the even cadence of someone who has read that clause aloud many times. ' +
        'A guild mark is pressed into the corner of every document on her desk — ' +
        'the same mark on the doorframe, on the chairs, on the ink-stained blotter. ' +
        'She sets a blank arbitration form on the table between you and smooths it once.'
      );
      enterAuthorityConfrontation('trade_arbitration_guild', {
        polity: polity,
        heatLevel: getHeat(polity),
        offense: 'contract or merchant code violation',
        locality: G.location
      });
    }
  };

  // ── SHERESH — Route Warden Compacts ──────────────────────────────────────
  // Crossing approval, escort, route denial. Documentation checked at the light.
  window.AUTHORITY_ENCOUNTER_CHOICES['sheresh'] = {
    cid: 'authority_sheresh_tier1',
    label: 'The compact officer holds my papers to the checkpoint light.',
    tags: ['Authority', 'Confrontation'],
    plot: 'side',
    result: function () {
      var polity = 'sheresh';
      addNarration('Route Warden Compacts',
        'The compact officer takes your crossing documentation without looking at you first. ' +
        'She holds each page up against the checkpoint lamp — the one mounted high so forgeries show. ' +
        'Her expression gives nothing back. The barrier behind her is down; ' +
        'the route beyond it is visible and unreachable. ' +
        'A second officer marks something in a ledger at the far end of the post.'
      );
      enterAuthorityConfrontation('route_warden_compacts', {
        polity: polity,
        heatLevel: getHeat(polity),
        offense: 'crossing documentation irregularity',
        locality: G.location
      });
    }
  };

  // ── SOREHEIM — Giant Council ──────────────────────────────────────────────
  // Physical scale present in narration. Corrective labor is a real consequence.
  window.AUTHORITY_ENCOUNTER_CHOICES['soreheim'] = {
    cid: 'authority_soreheim_tier1',
    label: 'The council convened without sending word.',
    tags: ['Authority', 'Confrontation'],
    plot: 'side',
    result: function () {
      var polity = 'soreheim';
      addNarration('Giant Council',
        'The hill giant\'s shadow covers the far wall before you notice the council has convened. ' +
        'Three of them — seated, which still puts their faces higher than yours standing. ' +
        'The corrective labor schedule is already on the table, a thick document printed in two scripts. ' +
        'The presiding councilor does not raise her voice. She does not need to. ' +
        'The room\'s acoustics carry everything.'
      );
      enterAuthorityConfrontation('giant_council', {
        polity: polity,
        heatLevel: getHeat(polity),
        offense: 'council ordinance breach',
        locality: G.location
      });
    }
  };

  // ── NOMDARA — Bond Registry Ring ─────────────────────────────────────────
  // Mobile, documentary. The seal and bond are everything.
  window.AUTHORITY_ENCOUNTER_CHOICES['nomdara'] = {
    cid: 'authority_nomdara_tier1',
    label: 'The bond clerk has already spread the seal kit.',
    tags: ['Authority', 'Confrontation'],
    plot: 'side',
    result: function () {
      var polity = 'nomdara';
      addNarration('Bond Registry Ring',
        'The bond clerk\'s seal kit is spread across the wagon\'s fold-down table — ' +
        'wax, three stamps, a narrow ledger, and a witness rod laid parallel to the edge. ' +
        'Every transaction here is witnessed; the rod signals that someone else is already watching. ' +
        'The clerk looks up when you stop. She does not greet you. ' +
        'She opens the ledger to the current page and holds her pen ready.'
      );
      enterAuthorityConfrontation('bond_registry_ring', {
        polity: polity,
        heatLevel: getHeat(polity),
        offense: 'bond or seal irregularity',
        locality: G.location
      });
    }
  };

})();
