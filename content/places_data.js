// content/places_data.js — shop and tavern data per locality
// V33_2 named establishments take priority; fallbacks are authored to match locality identity.
// No V33_2 locality packet contains named shop/tavern strings — all names authored to canon identity.
// Canon rule: rumor text must never reveal main quest conclusions prematurely.

window.PLACES_DATA = {

  shelkopolis: {
    shops: [{
      id: 'shelk_supply',
      name: 'Silkweaver\'s Dry Goods',
      type: 'trade',
      desc: 'Rations, lantern oil, and rope. The counter woman writes everything down.',
      items: [
        { id: 'rations_3', name: 'Three Days\' Rations', desc: 'Dried meal packs. Keeps for two weeks.', cost: 6, effect: { type: 'item', id: 'rations_3', name: 'Three Days\' Rations' } },
        { id: 'lantern_oil', name: 'Lantern Oil (flask)', desc: 'One flask, eight hours.', cost: 4, effect: { type: 'item', id: 'lantern_oil', name: 'Lantern Oil' } },
        { id: 'rope_30', name: 'Rope (30 ft)', desc: 'Braided hemp. Tested weight.', cost: 8, effect: { type: 'item', id: 'rope_30', name: 'Rope (30 ft)' } },
        { id: 'blank_journal', name: 'Blank Journal', desc: 'Sewn binding. Sixty pages.', cost: 12, effect: { type: 'item', id: 'blank_journal', name: 'Blank Journal' } }
      ]
    }],
    tavern: {
      id: 'shelk_redletter',
      name: 'The Red Letter Inn',
      desc: 'Low ceilings, long benches, and a proprietor who keeps her own records.',
      restCost: 4,
      rumors: [
        { id: 'shelk_r1', text: 'The garrison rotation changed twice in a month. Nobody posts a new schedule without a reason.', minProgress: 0 },
        { id: 'shelk_r2', text: 'A factor from the eastern procurement bureau was here three nights running. He stopped coming after the ward failures started.', minProgress: 2 },
        { id: 'shelk_r3', text: 'Marta charges the same as she always has. The ledger she keeps under the counter is a different matter.', minProgress: 0 },
        { id: 'shelk_r4', text: 'The chapel letters stopped for two days last week. The priest said it was a courier delay. The couriers said nothing.', minProgress: 4 },
        { id: 'shelk_r5', text: 'Someone at the ward office has been pulling names from the resident rolls. Not writing them down — just reading and replacing the book.', minProgress: 3 }
      ]
    }
  },

  fairhaven: {
    shops: [{
      id: 'fairhaven_harbor_supply',
      name: 'The Harbor Provisioner',
      type: 'harbor',
      desc: 'Rope, canvas, dockside tools. A second window sells transit papers.',
      items: [
        { id: 'rations_3', name: 'Three Days\' Rations', desc: 'Dried meal packs.', cost: 5, effect: { type: 'item', id: 'rations_3', name: 'Three Days\' Rations' } },
        { id: 'transit_chit', name: 'Transit Chit', desc: 'One-use passage document for a coastal route.', cost: 15, effect: { type: 'item', id: 'transit_chit', name: 'Transit Chit' } },
        { id: 'calming_compound', name: 'Calming Compound (dose)', desc: 'The compound that circulates at the harbor. Sedating effect. Use with intent.', cost: 3, effect: { type: 'item', id: 'calming_compound', name: 'Calming Compound' } },
        { id: 'waterproof_pouch', name: 'Waterproof Pouch', desc: 'Oilcloth lined. Keeps documents dry.', cost: 6, effect: { type: 'item', id: 'waterproof_pouch', name: 'Waterproof Pouch' } }
      ]
    }],
    tavern: {
      id: 'fairhaven_brokerage',
      name: 'The Brokerage Hearth',
      desc: 'Where the harbor factors drink. The noise is useful cover.',
      restCost: 5,
      rumors: [
        { id: 'fh_r1', text: 'The compound price dropped again. Third time this season. That doesn\'t happen without someone controlling supply.', minProgress: 0 },
        { id: 'fh_r2', text: 'A broker named Tessard lost three agreements in a row. All to the same goods type. He\'s not surprised, which is the interesting part.', minProgress: 1 },
        { id: 'fh_r3', text: 'The garrison was halved after the doctrine revision. They said it was efficiency. The locals said nothing, which is not the same as agreeing.', minProgress: 2 },
        { id: 'fh_r4', text: 'Children in the south quarter have been listless for two months. The physicians use the word "dietary" and stop there.', minProgress: 3 },
        { id: 'fh_r5', text: 'The shrine observance words changed. The ritual is the same but the time given to it is shorter. Elders notice. Elders do not complain out loud.', minProgress: 1 }
      ]
    }
  },

  guildheart: {
    shops: [{
      id: 'guildheart_certification',
      name: 'The Registry Desk',
      type: 'trade',
      desc: 'Bonded paper, guild seals, and arbitration prepayments. The clerk never looks up.',
      items: [
        { id: 'guild_cert', name: 'Guild Certification Document', desc: 'Stamped and logged. Accepted at Union-controlled checkpoints.', cost: 20, effect: { type: 'item', id: 'guild_cert', name: 'Guild Certification Document' } },
        { id: 'arbitration_fee', name: 'Arbitration Fee Prepayment', desc: 'Buys a hearing slot within five days. Non-refundable.', cost: 25, effect: { type: 'item', id: 'arbitration_fee', name: 'Arbitration Fee Prepayment' } },
        { id: 'courier_token', name: 'Courier Token', desc: 'One-use priority dispatch through Union freight lanes.', cost: 10, effect: { type: 'item', id: 'courier_token', name: 'Courier Token' } },
        { id: 'iron_seal_wax', name: 'Iron Seal Wax', desc: 'Standard bonding compound. Required for most freight documents.', cost: 5, effect: { type: 'item', id: 'iron_seal_wax', name: 'Iron Seal Wax' } }
      ]
    }],
    tavern: {
      id: 'guildheart_weighhouse',
      name: 'The Weighhouse Tap',
      desc: 'Low tables, long arguments, and a barkeep who remembers every deal struck here.',
      restCost: 5,
      rumors: [
        { id: 'gh_r1', text: 'The Sanction Board added three names to the restricted-hearing list this week. Nobody I know. That\'s how these things start.', minProgress: 0 },
        { id: 'gh_r2', text: 'A freight house on the south lane closed without posting dissolution papers. The registry says they\'re still active.', minProgress: 1 },
        { id: 'gh_r3', text: 'Someone filed a tariff exemption claim on goods that don\'t exist on any manifest. It passed. Someone senior signed it.', minProgress: 2 },
        { id: 'gh_r4', text: 'The arbitration queue moved faster than it should last month. You\'d think that was good. The brokers don\'t think that\'s good.', minProgress: 3 },
        { id: 'gh_r5', text: 'I heard the warehouse block on Ledger Row had a full inventory count overnight. No notice. Nobody authorized it.', minProgress: 2 }
      ]
    }
  },

  soreheim: {
    shops: [{
      id: 'soreheim_toolworks',
      name: 'Tower Base Provisioner',
      type: 'labor',
      desc: 'Heavy tools, harness fittings, and repair vouchers. Everything stamped with a quota seal.',
      items: [
        { id: 'quality_tools', name: 'Quality Artisan Tools', desc: 'Alliance-graded. Meets forge and workshop standards.', cost: 15, effect: { type: 'item', id: 'quality_tools', name: 'Quality Artisan Tools' } },
        { id: 'repair_voucher', name: 'Equipment Repair Voucher', desc: 'Redeemable at any registered tower-base workshop.', cost: 12, effect: { type: 'item', id: 'repair_voucher', name: 'Equipment Repair Voucher' } },
        { id: 'safety_gloves', name: 'Heat Safety Gloves', desc: 'Treated leather. Required near magma-adjacent workstations.', cost: 8, effect: { type: 'item', id: 'safety_gloves', name: 'Heat Safety Gloves' } },
        { id: 'draft_harness', name: 'Draft Horse Harness', desc: 'Full rig. Carries alliance freight stamp.', cost: 20, effect: { type: 'item', id: 'draft_harness', name: 'Draft Horse Harness' } }
      ]
    }],
    tavern: {
      id: 'soreheim_ashroom',
      name: 'The Ashroom',
      desc: 'Workers drink fast here. The ceiling is low because the tower is right above it.',
      restCost: 3,
      rumors: [
        { id: 'sor_r1', text: 'Quota went up on the third tier. Nobody announced it. The foremen just handed out new tally sheets.', minProgress: 0 },
        { id: 'sor_r2', text: 'Three people on the extraction crew didn\'t report for rotation. The tower tribunal says they transferred. Nobody transfered voluntarily in six months.', minProgress: 1 },
        { id: 'sor_r3', text: 'The refinery got a new overseer. She doesn\'t eat with the crew. She doesn\'t eat where any of us can see her, actually.', minProgress: 2 },
        { id: 'sor_r4', text: 'There\'s ore moving through the lower bridge at night. Not logged. Not the usual type. Whatever they\'re refining, it\'s not for domestic production.', minProgress: 3 },
        { id: 'sor_r5', text: 'The tribunal moved its hearings indoors last season. They used to hold them in the public yard. That was the point — that they were public.', minProgress: 2 }
      ]
    }
  },

  soreheim_proper: {
    name: "Soreheim Proper",
    description: "Continental capital. The Titan Towers visible from the deep-water berths on the western coast.",
    // places[]: travel routing metadata only — not rendered in the Places overlay UI.
    // type:'harbor' signals boat departure availability; checked by travel routing code.
    places: [
      {
        name: "Soreheim Western Docks",
        description: "Deep-water berths. Cross-continental departures to the Principalities. Passage documents checked twice.",
        type: "harbor"
      }
    ]
  },

  sunspire: {
    shops: [{
      id: 'sunspire_waystation',
      name: 'Syndicate Waystation Goods',
      type: 'frontier',
      desc: 'Route maps, preserved provisions, and signal equipment for convoy runs.',
      items: [
        { id: 'route_maps', name: 'Route Maps (regional)', desc: 'Syndicate-verified. Covers three road segments from Sunspire Haven.', cost: 8, effect: { type: 'item', id: 'route_maps', name: 'Route Maps' } },
        { id: 'preserved_provisions', name: 'Preserved Provisions (5 days)', desc: 'Salt-cured and wax-sealed. Suitable for long hauls.', cost: 7, effect: { type: 'item', id: 'preserved_provisions', name: 'Preserved Provisions' } },
        { id: 'signal_lantern', name: 'Signal Lantern', desc: 'Colored glass panels. Convoy standard.', cost: 14, effect: { type: 'item', id: 'signal_lantern', name: 'Signal Lantern' } },
        { id: 'local_almanac', name: 'Local Almanac', desc: 'Seasonal routes, water sources, and known hazards. Last updated this year.', cost: 10, effect: { type: 'item', id: 'local_almanac', name: 'Local Almanac' } }
      ]
    }],
    tavern: {
      id: 'sunspire_grainhall',
      name: 'The Grain Hall Common',
      desc: 'A converted storage shed with long tables. Smells like malt and old rope.',
      restCost: 4,
      rumors: [
        { id: 'sun_r1', text: 'The east syndicate convoy didn\'t arrive this week. No notice, no replacement. The market steward is pretending this is normal.', minProgress: 0 },
        { id: 'sun_r2', text: 'A patron-family sold their water rights for something that\'s not money. Nobody knows what they took in exchange. The family won\'t say.', minProgress: 1 },
        { id: 'sun_r3', text: 'The route through the lower pass was closed for three days. They reopened it without saying why it closed.', minProgress: 2 },
        { id: 'sun_r4', text: 'The harvest rite this season had fewer families. Nobody was told not to come. They just didn\'t.', minProgress: 1 },
        { id: 'sun_r5', text: 'Someone is buying up labor contracts at above-rate. That\'s not charity. That\'s preparation.', minProgress: 3 }
      ]
    }
  },

  mimolot: {
    shops: [{
      id: 'mimolot_scriptorium',
      name: 'The Tariff Scriptorium',
      type: 'academic',
      desc: 'Licensed texts, reading instruments, and certified ink. Everything has a tax seal.',
      items: [
        { id: 'reference_texts', name: 'Reference Texts (bound)', desc: 'House Mimolot certified. Required for certain advanced study tracks.', cost: 18, effect: { type: 'item', id: 'reference_texts', name: 'Reference Texts' } },
        { id: 'ink_vellum', name: 'Ink and Vellum Set', desc: 'Academy grade. Required for inscription coursework.', cost: 9, effect: { type: 'item', id: 'ink_vellum', name: 'Ink and Vellum Set' } },
        { id: 'classification_keys', name: 'Classification Keys', desc: 'Taxonomic cross-reference index for magical phenomena. Third edition.', cost: 22, effect: { type: 'item', id: 'classification_keys', name: 'Classification Keys' } },
        { id: 'reading_lens', name: 'Lens for Close Reading', desc: 'Ground glass. Certified for archival use.', cost: 16, effect: { type: 'item', id: 'reading_lens', name: 'Lens for Close Reading' } }
      ]
    }],
    tavern: {
      id: 'mimolot_inkwell',
      name: 'The Inkwell House',
      desc: 'Students and tutors share benches. Arguments start over citations.',
      restCost: 5,
      rumors: [
        { id: 'mim_r1', text: 'The archive closed the third-floor stacks to students last month. The posted reason is restoration. It\'s been three weeks and nobody has seen a restorer.', minProgress: 0 },
        { id: 'mim_r2', text: 'A knowledge tariff exemption request for a specific class of text was denied twice. The third time it simply wasn\'t filed. The subject doesn\'t come up anymore.', minProgress: 1 },
        { id: 'mim_r3', text: 'Two tutors were reassigned from the upper seminar track this term. The students they were teaching were moved to a different building.', minProgress: 2 },
        { id: 'mim_r4', text: 'Something in the third vault failed its containment audit. They didn\'t announce a failure. They announced a "precautionary review." Those are different things.', minProgress: 3 },
        { id: 'mim_r5', text: 'A study group that was meeting weekly stopped scheduling rooms. Nobody formally disbanded. They just stopped appearing.', minProgress: 2 }
      ]
    }
  },

  ithtananalor: {
    places: [
      {
        name: "Roaz Offshore Anchorage",
        description: "Tender service from offshore anchorage. No dock facilities — cargo and passengers transferred by lighter.",
        type: "harbor"
      }
    ],
    shops: [{
      id: 'ithtan_clearance',
      name: 'The Roazian Document Office',
      type: 'trade',
      desc: 'Transit papers, clearance seals, and correspondence pouches. No goods without papers.',
      items: [
        { id: 'roaz_transit_doc', name: 'Roaz Transit Documents', desc: 'Required for movement through Roazian checkpoints. Three-day validity.', cost: 18, effect: { type: 'item', id: 'roaz_transit_doc', name: 'Roaz Transit Documents' } },
        { id: 'border_clearance', name: 'Border Goods Clearance', desc: 'Covers one load of undeclared goods through a single checkpoint.', cost: 12, effect: { type: 'item', id: 'border_clearance', name: 'Border Goods Clearance' } },
        { id: 'language_primer', name: 'Language Primer (Roazian)', desc: 'Basic vocabulary and common legal phrases. Tribunal-approved edition.', cost: 8, effect: { type: 'item', id: 'language_primer', name: 'Language Primer' } },
        { id: 'sealed_correspondence', name: 'Sealed Correspondence Pouch', desc: 'Iron-latched. Tamper-evident wax seal. Recognized by Roazian clerks.', cost: 6, effect: { type: 'item', id: 'sealed_correspondence', name: 'Sealed Correspondence Pouch' } }
      ]
    }],
    tavern: {
      id: 'ithtan_irongate',
      name: 'The Iron Gate Common',
      desc: 'Attached to a waystation near the enforcement quarter. Loud, functional, watched.',
      restCost: 4,
      rumors: [
        { id: 'ith_r1', text: 'The checkpoint on the west approach added a second inspection team last week. Nobody from the Office said why. You just wait twice as long now.', minProgress: 0 },
        { id: 'ith_r2', text: 'A shipment of ore was redirected three times before it reached the foundry. Every redirect had a different authorization seal. None of them matched the originating order.', minProgress: 1 },
        { id: 'ith_r3', text: 'The tribunal held a sealed session last month. The record exists but it\'s not in the public index. Someone knows what was decided. Nobody here does.', minProgress: 2 },
        { id: 'ith_r4', text: 'A labor crew from the prison system was moved to a new work site. The site isn\'t on any map I\'ve seen. The foreman just says it\'s a new extraction zone.', minProgress: 3 },
        { id: 'ith_r5', text: 'Roazian enforcement has been doing identity checks on travelers who aren\'t going anywhere near the checkpoints. Just walking through the market. Just standing there.', minProgress: 2 }
      ]
    }
  },

  panim: {
    shops: [{
      id: 'panim_ritual_goods',
      name: 'The Offering House',
      type: 'harbor',
      desc: 'Ritual goods, pilgrim supplies, and mediation tokens. The smell of incense never leaves.',
      items: [
        { id: 'ritual_offering', name: 'Ritual Offering Bundle', desc: 'Pre-assembled. Accepted at any Panim shrine.', cost: 10, effect: { type: 'item', id: 'ritual_offering', name: 'Ritual Offering Bundle' } },
        { id: 'coastal_charts', name: 'Coastal Charts', desc: 'Pilgrimage routes along the shore. Shrine waypoints marked.', cost: 15, effect: { type: 'item', id: 'coastal_charts', name: 'Coastal Charts' } },
        { id: 'net_repair_kit', name: 'Net Repair Kit', desc: 'Thread, weights, and needles. For working the harbor.', cost: 8, effect: { type: 'item', id: 'net_repair_kit', name: 'Net Repair Kit' } },
        { id: 'salt_provisions', name: 'Salt Provisions (3 days)', desc: 'Preserved fish and grain. Harbor standard.', cost: 5, effect: { type: 'item', id: 'salt_provisions', name: 'Salt Provisions' } }
      ]
    }],
    tavern: {
      id: 'panim_vigil',
      name: 'The Vigil Room',
      desc: 'Quieter than most. People come here between rites and don\'t want conversation.',
      restCost: 3,
      rumors: [
        { id: 'pan_r1', text: 'The mediation price went up again. It\'s not the clerics setting it. Someone above them is.', minProgress: 0 },
        { id: 'pan_r2', text: 'A family came for a standard rite and was told the record they needed didn\'t exist. The record was filed twenty years ago. Three people witnessed it.', minProgress: 1 },
        { id: 'pan_r3', text: 'The harbor fishers say the catch pattern changed two seasons back. Not drought. Something in the water changed its behavior.', minProgress: 2 },
        { id: 'pan_r4', text: 'The shrine elder in the south precinct retired without a successor announcement. That\'s not how succession works here. Someone made that decision quietly.', minProgress: 3 },
        { id: 'pan_r5', text: 'Pilgrims who came for the autumn rite said the words were different this year. Not wrong — different. Nobody told them in advance.', minProgress: 1 }
      ]
    }
  },

  shirshal: {
    places: [
      {
        name: "Shirshal Port Quarter",
        description: "The sea-entry point for Shirsh territory. Vessel registration required. Passage documents validated on arrival.",
        type: "harbor"
      }
    ],
    shops: [{
      id: 'shirshal_permits',
      name: 'The Compliance Counter',
      type: 'frontier',
      desc: 'House Shirsh permits, cold-weather gear, and plain provisions. All purchases logged.',
      items: [
        { id: 'shirsh_permit', name: 'House Shirsh Movement Permit', desc: 'Required for travel through restricted zones. Logged at issuance.', cost: 20, effect: { type: 'item', id: 'shirsh_permit', name: 'House Shirsh Movement Permit' } },
        { id: 'frontier_rations', name: 'Frontier Rations (4 days)', desc: 'High-calorie pack. Designed for extended cold-weather travel.', cost: 6, effect: { type: 'item', id: 'frontier_rations', name: 'Frontier Rations' } },
        { id: 'cold_weather_gear', name: 'Cold-Weather Gear', desc: 'Layered oilskin and wool. Certified for Magi Magistratus field work conditions.', cost: 16, effect: { type: 'item', id: 'cold_weather_gear', name: 'Cold-Weather Gear' } },
        { id: 'defensive_blade', name: 'Defensive Blade', desc: 'Short, legal for non-enforcer carry. Stamped with compliance seal.', cost: 25, effect: { type: 'item', id: 'defensive_blade', name: 'Defensive Blade' } }
      ]
    }],
    tavern: {
      id: 'shirshal_casework',
      name: 'The Casework Tap',
      desc: 'Where the lower-tier arcane staff drink. No one states their business directly.',
      restCost: 3,
      rumors: [
        { id: 'shir_r1', text: 'The Magi Magistratus opened three new case files this month. None of them are listed under standard categories. The clerks use a code.', minProgress: 0 },
        { id: 'shir_r2', text: 'A specialist from the upper tier was reassigned to fieldwork. She\'s been at a desk for nine years. Whatever they\'re sending her to look at, it\'s not routine.', minProgress: 1 },
        { id: 'shir_r3', text: 'The celestial study period was shortened this cycle. They used that time for something else. The results aren\'t posted.', minProgress: 2 },
        { id: 'shir_r4', text: 'A containment record was amended after the fact. The original entry and the amendment both exist but they contradict each other on the date.', minProgress: 3 },
        { id: 'shir_r5', text: 'Three researchers asked for extended access to restricted materials. Two got approvals. One got transferred the next morning.', minProgress: 2 }
      ]
    }
  },

  aurora_crown_commune: {
    shops: [{
      id: 'aurora_dome_goods',
      name: 'The Ration Court Exchange',
      type: 'trade',
      desc: 'Commune-pooled goods, shared tools, and dome-rated gear. Everything here belongs to someone first.',
      items: [
        { id: 'commune_goods', name: 'Commune Goods Bundle', desc: 'Standard ration supplement. Surplus pooled from dome families.', cost: 8, effect: { type: 'item', id: 'commune_goods', name: 'Commune Goods Bundle' } },
        { id: 'mutual_aid_voucher', name: 'Mutual-Aid Voucher', desc: 'Redeemable for labor assistance or supply from any dome steward station.', cost: 5, effect: { type: 'item', id: 'mutual_aid_voucher', name: 'Mutual-Aid Voucher' } },
        { id: 'shared_tools_token', name: 'Shared Tools Token', desc: 'Grants access to the communal workshop for one week.', cost: 12, effect: { type: 'item', id: 'shared_tools_token', name: 'Shared Tools Token' } },
        { id: 'woven_cloth', name: 'Woven Dome Cloth', desc: 'Thermal-treated weave. Commune production. Not available outside the dome.', cost: 9, effect: { type: 'item', id: 'woven_cloth', name: 'Woven Dome Cloth' } }
      ]
    }],
    tavern: {
      id: 'aurora_warmroom',
      name: 'The Warmroom',
      desc: 'Heated communal hall repurposed for meals and quiet gathering after maintenance shifts.',
      restCost: 3,
      rumors: [
        { id: 'aur_r1', text: 'The dome stewards counted rations twice this week. They didn\'t say there was a shortage. They just counted again.', minProgress: 0 },
        { id: 'aur_r2', text: 'A repair rotation was marked complete but the section it covered still shows amber on the status board. Someone signed off early.', minProgress: 1 },
        { id: 'aur_r3', text: 'The Containment Research Concord sent someone to review the commune records. They\'re still here. They\'ve been here three weeks.', minProgress: 2 },
        { id: 'aur_r4', text: 'Two families asked to move their labor obligations to a different dome section. Both requests were denied without reason. That hasn\'t happened before.', minProgress: 3 },
        { id: 'aur_r5', text: 'The aurora study team stopped posting their daily observations. They said the data was inconclusive. They\'ve never called data inconclusive before.', minProgress: 2 }
      ]
    }
  },

  glasswake_commune: {
    shops: [{
      id: 'glasswake_tools',
      name: 'The Equipment Lockup',
      type: 'frontier',
      desc: 'Testing instruments, field tools, and sealed provisions. Sign out everything you take.',
      items: [
        { id: 'agricultural_tools', name: 'Agricultural Tools Set', desc: 'Adapted for polar soil. Certified for commune field use.', cost: 12, effect: { type: 'item', id: 'agricultural_tools', name: 'Agricultural Tools Set' } },
        { id: 'seed_packets', name: 'Cold-Adapted Seed Packets', desc: 'Calibrated for short grow cycles. Commune-tested strains.', cost: 8, effect: { type: 'item', id: 'seed_packets', name: 'Cold-Adapted Seed Packets' } },
        { id: 'soil_amendments', name: 'Soil Amendment Mix', desc: 'Mineral blend for polar cultivation. Reduces frost damage.', cost: 6, effect: { type: 'item', id: 'soil_amendments', name: 'Soil Amendment Mix' } },
        { id: 'harvest_almanac', name: 'Harvest Almanac (polar edition)', desc: 'Seasonal windows, yield records, and warning thresholds. Current year.', cost: 10, effect: { type: 'item', id: 'harvest_almanac', name: 'Harvest Almanac' } }
      ]
    }],
    tavern: {
      id: 'glasswake_wardroom',
      name: 'The Wardroom',
      desc: 'Small, close, and warm. Researchers and wardens eat here at the same table.',
      restCost: 3,
      rumors: [
        { id: 'gw_r1', text: 'Exposure readings in the east trench went up for four days and then went back to baseline. Nobody logged it as an incident. Someone erased the provisional entry.', minProgress: 0 },
        { id: 'gw_r2', text: 'A researcher asked to cross-reference two sets of data. One set was marked restricted. That set has been restricted for eight months. Before that it wasn\'t.', minProgress: 1 },
        { id: 'gw_r3', text: 'The quarantine chamber had a visitor last week who wasn\'t on the access list. The containment wardens were told not to log it.', minProgress: 2 },
        { id: 'gw_r4', text: 'Three harvest test plots failed their contamination scans. The plots are being relabeled as dormant rather than compromised. The difference matters.', minProgress: 3 },
        { id: 'gw_r5', text: 'An instrument calibration request was denied. Not delayed — denied. The instrument was reading something the technicians said was impossible.', minProgress: 2 }
      ]
    }
  },

  cosmoria: {
    places: [
      {
        name: "Cosmoria Harbor Ring",
        description: "The city's working edge. Cargo cranes, manifest inspectors, departure tickets for the inland sea routes.",
        type: "harbor"
      }
    ],
    shops: [{
      id: 'cosmoria_manifest',
      name: 'The Shipwright\'s Counter',
      type: 'harbor',
      desc: 'Cargo seals, tide tables, and dockworker tools. Adjacent to the main archive entrance.',
      items: [
        { id: 'shipping_manifests', name: 'Shipping Manifests (blank)', desc: 'Pre-stamped with Cosmouth harbor seal. Required for all registered cargo movement.', cost: 15, effect: { type: 'item', id: 'shipping_manifests', name: 'Shipping Manifests' } },
        { id: 'dockworker_tools', name: 'Dockworker Tools', desc: 'Hook, mallet, and splice set. Standard harbor issue.', cost: 10, effect: { type: 'item', id: 'dockworker_tools', name: 'Dockworker Tools' } },
        { id: 'cargo_seal', name: 'Cargo Seal (Cosmouth certified)', desc: 'Wax stamp with authenticating thread. One-use.', cost: 8, effect: { type: 'item', id: 'cargo_seal', name: 'Cargo Seal' } },
        { id: 'tide_tables', name: 'Tide Tables (seasonal)', desc: 'Current charts for the floating city anchorages. Updated monthly.', cost: 6, effect: { type: 'item', id: 'tide_tables', name: 'Tide Tables' } }
      ]
    }],
    tavern: {
      id: 'cosmoria_anchorage',
      name: 'The Anchorage Bar',
      desc: 'Below the archive promenade. Mariners and scholars share the same uncomfortable stools.',
      restCost: 4,
      rumors: [
        { id: 'cos_r1', text: 'Three cargo arrivals this month had their manifests cleared faster than the standard processing window. Someone in the archive office is expediting certain shipments.', minProgress: 0 },
        { id: 'cos_r2', text: 'A shipwright in the lower yard was reassigned to archive maintenance. She\'s been building hulls for twenty years. She doesn\'t know what they want her to guard.', minProgress: 1 },
        { id: 'cos_r3', text: 'The tax clerks started a new cross-reference audit. It only covers a specific type of cargo and a specific six-month window. That\'s a narrow window.', minProgress: 2 },
        { id: 'cos_r4', text: 'Something in the deep archive was moved. Not removed — moved. The record says it\'s still there. The location in that record is now a restricted section.', minProgress: 3 },
        { id: 'cos_r5', text: 'Two ships came in without lodging arrival notices. The harbor authority cleared them anyway. The clearance paperwork was backdated.', minProgress: 2 }
      ]
    }
  },

  'nomdara_caravan': {
    shops: [{
      id: 'nomdara_stock',
      name: 'Caravan Stock',
      type: 'trade',
      desc: 'Traveling goods. What they carry depends on where they\'ve been.',
      items: [
        {
          id: 'nomdara_provisions',
          name: 'Caravan Provisions',
          desc: 'Three days of travel rations. Keeps in any weather.',
          cost: 8,
          type: 'consumable',
          effect: { type: 'item', id: 'nomdara_provisions', name: 'Caravan Provisions' }
        },
        {
          id: 'nomdara_cure',
          name: 'Caravan Remedy',
          desc: 'Brewed in the wagon. Two uses. Each restores 5 HP.',
          cost: 14,
          type: 'consumable',
          effect: { type: 'item', id: 'nomdara_cure', name: 'Caravan Remedy', healAmount: 5, uses: 2 }
        },
        {
          id: 'nomdara_almanac',
          name: 'Route Almanac',
          desc: 'Way-stops and water sources annotated by the caravan master. Wits +1 on unfamiliar roads.',
          cost: 20,
          effect: { type: 'item', id: 'nomdara_almanac', name: 'Route Almanac', skillBonus: 'wits', bonus: 1 }
        },
        {
          id: 'nomdara_blade',
          name: 'Compact Blade',
          desc: 'Caravan defense stock. Balanced for the road. Might +1.',
          cost: 22,
          effect: { type: 'item', id: 'nomdara_blade', name: 'Compact Blade', skillBonus: 'might', bonus: 1 }
        }
      ]
    }]
  }

};
