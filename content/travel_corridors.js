// travel_corridors.js — Road encounter layer for Ledger of Ash
// Loaded via <script src="content/travel_corridors.js"></script> before </body>

(function() {
  'use strict';

  // ---------------------------------------------------------------------------
  // MACROREGION LOCALITY MAP
  // Used to determine which macroregion narration to show based on from/to IDs
  // ---------------------------------------------------------------------------
  var LOCALITY_MACROREGION = {
    shelkopolis:    'principalities',
    fairhaven:      'principalities',
    shirshal:       'principalities',
    panim_haven:    'principalities',
    mimolot:        'principalities',
    guildheart_hub: 'principalities',
    cosmouth:       'principalities',
    ithtananalor:   'principalities',
    sunspire_haven: 'soreheim',
    soreheim_proper:'soreheim',
    quarry_flats:   'soreheim',
    aurora_crown:   'sheresh',
    sheresh:        'sheresh',
    psanan:         'psanan',
    forge_coast:    'psanan'
  };

  // ---------------------------------------------------------------------------
  // MACROREGION_NARRATIONS
  // One narration per macroregion. Show as ambient route flavor before encounter.
  // ---------------------------------------------------------------------------
  window.MACROREGION_NARRATIONS = {
    principalities: [
      'The road is wide enough for two carts side by side, cobbled in the old House Shelk pattern — square-cut stone laid flat, edges mortared. Roadwarden posts appear at every league marker: a green-and-grey painted post, a sealed dispatch box at its base, and a warden\'s name chalked on the board above. Someone has erased the last name and not replaced it.',
      'The Principalities road runs straight between hedgerows trimmed to guild standard height. A checkpoint barrier — striped in House Shelk grey — sits across the road ahead. The warden\'s post is occupied; a pair of boots protrude from under the barrier arm, the warden lying on his back, staring up at something in the sky above the road.',
      'Mile-markers on this stretch are double-stamped: the Roadwardens seal first, then a second impression in red — the Guild Council transit authorization mark. Both marks are required for commercial transit. The road itself is in good repair, drainage channels clear, the verge cut back. Someone maintains this route whether travelers use it or not.'
    ],
    soreheim: [
      'The road surface changes where Soreheim territory begins: packed aggregate over compacted earth, designed for the weight of loaded cargo haulers. Quota signs appear on both sides — white boards with black numerals, updated in grease pencil. The current extraction figure has been circled twice. The previous figure has been scratched through.',
      'Giant-scale construction flanks the road on the eastern approach: timber staging platforms at twice the height of any Principalities building, crossbeam cranes left overnight with loads still attached. A Quota Authority notice board at the road edge carries three active advisories. Two are standard transit-zone warnings. The third is a handwritten addendum: INCIDENT REPORTING REQUIRED — ALL PARTIES.',
      'The road cuts through a worked hillside, the face blasted clean in horizontal layers that show the rock strata. Dust has settled across the road surface in a continuous grey film — not from today\'s work, from weeks of it. A water trough at the roadside is full. The engineer\'s marker beside it reads: REFILL DAILY — QUOTA OBLIGATION 14.'
    ],
    sheresh: [
      'The cold arrives before the dome is visible. The road surface shifts from mud to frozen rut to hard-packed ice in the space of a few hundred meters, and then the dome-light appears on the horizon — a pale blue luminescence sitting above the treeline like a second, smaller sun that does not move. The path marker ahead has been driven deep into frozen ground. Someone has wrapped the post with insulating cord.',
      'Ice-locked paths branch away from the main road at intervals, each one sealed with a Sheresh Dome Stewards notice: ROUTE SUSPENDED — AXIS CONDITIONS. The main road is passable but narrow where the ice has crept from the verge. Dome-light is close enough now to cast faint shadows behind the road markers. Everything ahead is very quiet.',
      'The dome is visible to the northeast, its glow steady and cold against a grey sky. The road here passes through a waystation that has been locked from the outside — padlock on the hasp, shutters barred. A chalk message on the door reads: STEWARDS NOTIFIED — DO NOT FORCE. The water barrel beside the station is frozen solid.'
    ],
    psanan: [
      'The volcanic haze thickens as the road descends toward the coast. Ash sits in the road\'s drainage channels like grey sand, light enough to lift with a breath. The forgeheat comes from below rather than above — the rock underfoot holds warmth long after dark. Directional markers on this stretch are cast iron rather than painted wood: the painted ones didn\'t last.',
      'The road surface is lava-composite: laid in dark irregular slabs that retain the forge heat through the night. Ash has settled into the gaps and been tamped there deliberately as caulking. The smell is sulfur and hot stone and, underneath both, something organic — the dark soil where farming happens in the ash belt between eruption zones.',
      'A Guild transit post marks the boundary of the active ash zone: a squat iron-roofed structure with ventilation slots rather than windows. The notice board outside carries advisories in three languages. The Psanan-script entry at the top is longest. The translation below it, in Common, reads simply: CONDITIONS CHANGED — CONFIRM ROUTE BEFORE PROCEEDING.'
    ]
  };

  // ---------------------------------------------------------------------------
  // CORRIDOR_ENCOUNTERS
  // Keyed by route tier: short / medium / long
  // Each tier has 3–4 authored scenes.
  // ---------------------------------------------------------------------------
  window.CORRIDOR_ENCOUNTERS = {

    short: [
      {
        id: 'ce_short_warden_check',
        title: 'Roadwarden Checkpoint',
        text: 'A Roadwarden steps from the post shelter as you approach, one hand raised. She is young for the posting — her grey cloak still has its original hem rather than the field-patched look of a long-route warden. She checks the transit board mounted on the barrier arm without looking at you, running a finger down columns of names. Her finger stops. She looks up.',
        choices: [
          { text: 'My papers are in order. She already knows that.', skill: 'lore', tag: 'safe', align: 'neutral', cid: 'corridor_warden_papers' },
          { text: 'Something about her pause does not fit a standard check.', skill: 'persuasion', tag: 'risky', align: 'neutral', cid: 'corridor_warden_probe' },
          { text: 'Step aside from the road before she finishes reading.', skill: 'stealth', tag: 'risky', align: 'neutral', cid: 'corridor_warden_evade' }
        ]
      },
      {
        id: 'ce_short_fellow_traveler',
        title: 'Fellow Traveler',
        text: 'A man moving in the same direction as you has fallen into step a few paces back — not close enough to be obvious about it, not far enough to be coincidental. He carries a Guild-stamped cargo satchel and a walking staff with a notched handle. When you slow, he slows. When the road bends, he takes the inside line the same way you do. He has not spoken.',
        choices: [
          { text: 'He is moving cargo. Let him move it.', skill: 'survival', tag: 'safe', align: 'neutral', cid: 'corridor_traveler_ignore' },
          { text: 'Turn and give him room to pass or explain.', skill: 'persuasion', tag: 'safe', align: 'neutral', cid: 'corridor_traveler_confront' }
        ]
      },
      {
        id: 'ce_short_cart_stopped',
        title: 'Stopped Cart',
        text: 'A freight cart is stopped in the road, wheel off. The carter is sitting on the verge with his boots off, not working on the wheel — just sitting. The horse is tied to a post and eating grass from the verge. Three crates are stacked beside the road, each sealed with a Roadwarden inspection mark from three days ago. The carter looks up when your shadow crosses him.',
        choices: [
          { text: 'What is in those crates matters more than the wheel.', skill: 'lore', tag: 'risky', align: 'neutral', cid: 'corridor_cart_inspect' },
          { text: 'Help with the wheel and keep moving.', skill: 'survival', tag: 'safe', align: 'neutral', cid: 'corridor_cart_help' }
        ]
      },
      {
        id: 'ce_short_milestone_marked',
        title: 'Marked Milestone',
        text: 'The league marker at the roadside has been tampered with — the Roadwarden seal is intact, but someone has scratched a secondary mark into the stone below it: a narrow vertical line bisected by two short horizontals. It is not a House Shelk symbol or a Guild mark. The scratch is recent; the stone dust has not dispersed. The same mark appears on the next post fifty meters up the road.',
        choices: [
          { text: 'Copy the mark into notes. Someone is using these posts.', skill: 'lore', tag: 'safe', align: 'neutral', cid: 'corridor_milestone_copy' },
          { text: 'Leave it. Route markers are not my concern.', skill: 'survival', tag: 'safe', align: 'neutral', cid: 'corridor_milestone_pass' }
        ]
      }
    ],

    medium: [
      {
        id: 'ce_medium_quota_patrol',
        title: 'Quota Authority Patrol',
        text: 'A three-person Quota Authority patrol is working the road in the opposite direction, stopping every traveler and checking cargo manifests against a ledger one of them carries. They are not Roadwardens — their tabards are grey with a yellow number-stamp rather than the Roadwarden green-and-grey. The one with the ledger is noting something after each stop. The travelers they check do not stop to talk about it afterward.',
        choices: [
          { text: 'My cargo is personal goods. That classification has limits they may test.', skill: 'lore', tag: 'risky', align: 'neutral', cid: 'corridor_quota_declare' },
          { text: 'Step off the road and let the patrol pass before joining it.', skill: 'stealth', tag: 'risky', align: 'neutral', cid: 'corridor_quota_avoid' },
          { text: 'Walk through the check directly. Resistance is the signal they look for.', skill: 'persuasion', tag: 'safe', align: 'neutral', cid: 'corridor_quota_through' }
        ]
      },
      {
        id: 'ce_medium_roadwarden_incident',
        title: 'Incident on the Road',
        text: 'Two Roadwardens are standing over a man face-down in the road, hands bound behind him with cord. A third warden is writing in a field ledger. The bound man\'s coat has been turned inside out and laid beside him — the lining has been cut open. A Roadwarden cargo bag sits open nearby, its contents spread across the road surface in a grid pattern. One warden notices you and watches without speaking.',
        choices: [
          { text: 'This is a Roadwarden proceeding. Walk around it at the verge.', skill: 'survival', tag: 'safe', align: 'neutral', cid: 'corridor_incident_bypass' },
          { text: 'A lining cut open means they were looking for something specific.', skill: 'lore', tag: 'risky', align: 'neutral', cid: 'corridor_incident_read' }
        ]
      },
      {
        id: 'ce_medium_night_camp',
        title: 'Campfire Off-Road',
        text: 'Thirty meters off the road through a gap in the hedgerow, a fire is burning in a stone ring. Two figures sit with their backs to the road. A third is standing at the road edge watching traffic pass — watching you pass. He has no pack visible. His hands are at his sides. The fire ring looks permanent: built with laid stone, not gathered.',
        choices: [
          { text: 'A permanent fire ring off a major route means regular use.', skill: 'lore', tag: 'risky', align: 'neutral', cid: 'corridor_camp_approach' },
          { text: 'Their watcher is noting faces. Give him nothing to work with.', skill: 'stealth', tag: 'risky', align: 'neutral', cid: 'corridor_camp_evade' },
          { text: 'Keep the road. Campfires are not my business tonight.', skill: 'survival', tag: 'safe', align: 'neutral', cid: 'corridor_camp_ignore' }
        ]
      },
      {
        id: 'ce_medium_guild_seal_broken',
        title: 'Broken Guild Seal',
        text: 'A cargo crate sits at the roadside with a broken Guild transit seal — the wax intact but the cord cut cleanly through. Whatever was inside has been removed: the packing material remains, shaped to a rectangular object roughly the size of a document case. The crate carries a manifest tag from a Shelkopolis outfitter, departure dated four days ago. There is no carter, no cart, no other cargo.',
        choices: [
          { text: 'The packing shape and the seal type belong together in my notes.', skill: 'lore', tag: 'safe', align: 'neutral', cid: 'corridor_seal_examine' },
          { text: 'Sitting near stolen Guild cargo on an open road is a problem I do not need.', skill: 'survival', tag: 'safe', align: 'neutral', cid: 'corridor_seal_leave' }
        ]
      }
    ],

    long: [
      {
        id: 'ce_long_ambush_approach',
        title: 'Road Ahead Blocked',
        text: 'Three figures have positioned themselves across the road at a narrow point where hedgerows press close on both sides. They are not Roadwardens. Two have staffs; one has a hand on a belt knife but has not drawn it. Behind you, a fourth figure has stepped onto the road from the hedgerow gap. They are positioned well — someone who knows this stretch. The one with the knife speaks first: you are carrying something they want. He does not say what.',
        choices: [
          { text: 'The positioning means they have done this before. Make the cost too high.', skill: 'combat', tag: 'bold', align: 'neutral', cid: 'corridor_ambush_fight' },
          { text: 'They said what they want. They have not said they know what it is.', skill: 'persuasion', tag: 'risky', align: 'neutral', cid: 'corridor_ambush_talk' },
          { text: 'The hedgerow on the right is thinner. The position is not as tight as it looks.', skill: 'stealth', tag: 'risky', align: 'neutral', cid: 'corridor_ambush_break' }
        ]
      },
      {
        id: 'ce_long_courier_down',
        title: 'Courier on the Ground',
        text: 'A Roadwarden courier is sitting against a milestone, one leg extended, the other drawn up. Her dispatch bag is still sealed and still on her shoulder. The injury is to her ankle — she has wrapped it with cord from her pack. Her horse is nowhere visible. When she sees you, her hand moves to the bag strap, not to any weapon, and she watches your face before she says anything.',
        choices: [
          { text: 'She is protecting the bag, not herself. The bag is what matters here.', skill: 'lore', tag: 'risky', align: 'neutral', cid: 'corridor_courier_bag' },
          { text: 'Help with the ankle. The bag is her problem to manage.', skill: 'survival', tag: 'safe', align: 'neutral', cid: 'corridor_courier_help' },
          { text: 'A sealed dispatch bag and no horse on a long route means she was intercepted once already.', skill: 'persuasion', tag: 'risky', align: 'neutral', cid: 'corridor_courier_ask' }
        ]
      },
      {
        id: 'ce_long_crossroads_authority',
        title: 'Crossroads Authority',
        text: 'The crossroads has a permanent Roadwarden post and a second structure beside it: a grey fieldstone building with the Guild Council transit seal above the door and a notice board three panels wide. A senior warden — the shoulder-bar indicates route commander rank — is standing outside with a list. She is checking names against it as travelers pass. Behind her, through the open door, two more wardens are visible at a table with cargo manifests spread open.',
        choices: [
          { text: 'Route commander rank at a crossroads check means an active directive, not routine work.', skill: 'lore', tag: 'risky', align: 'neutral', cid: 'corridor_crossroads_read' },
          { text: 'Cross at the standard pace. A hesitation is what they are watching for.', skill: 'persuasion', tag: 'safe', align: 'neutral', cid: 'corridor_crossroads_through' },
          { text: 'The secondary road to the east adds half a day. It is not on her list.', skill: 'survival', tag: 'risky', align: 'neutral', cid: 'corridor_crossroads_detour' }
        ]
      },
      {
        id: 'ce_long_significant_find',
        title: 'Something Left on the Road',
        text: 'A document case lies open in the middle of the road — not dropped and kicked aside, but placed, centered between the wheel ruts, as though someone wanted it found. The case is Guild-stamped with a Shelkopolis origin mark. Inside is a single folded document. The paper has a Roadwarden header, but the text below has been struck through in red ink — every line, systematically, with the same hand. A name at the bottom remains legible.',
        choices: [
          { text: 'The case was placed. Someone knew this route would bring the right traveler past it.', skill: 'lore', tag: 'bold', align: 'neutral', cid: 'corridor_find_take' },
          { text: 'Placed evidence is someone\'s trap or someone\'s message. Neither option is comfortable.', skill: 'survival', tag: 'risky', align: 'neutral', cid: 'corridor_find_read_only' }
        ]
      }
    ]
  };

  // ---------------------------------------------------------------------------
  // OPERATIONAL_ANCHORS
  // Real waypoints where the player can pause mid-journey
  // ---------------------------------------------------------------------------
  window.OPERATIONAL_ANCHORS = [
    {
      id: 'anchor_fairhaven_east',
      locality: 'fairhaven',
      name: 'Fairhaven East Waystation',
      desc: 'A Roadwarden waystation at the eastern edge of Fairhaven territory. Stone-built, single room, fire laid but not lit. The dispatch board has four notices pinned to it; two are this week\'s. Water is clean. The door bolt works from inside.',
      choices: [
        { text: 'Rest here. The road will still be there at first light.', skill: 'survival', tag: 'safe', align: 'neutral', cid: 'anchor_make_camp' },
        { text: 'Read the dispatch board before pushing on.', skill: 'lore', tag: 'safe', align: 'neutral', cid: 'anchor_push_on' }
      ]
    },
    {
      id: 'anchor_soreheim_border',
      locality: 'sunspire_haven',
      name: 'Soreheim Border Allocation Post',
      desc: 'A Giant Council allocation post at the Soreheim boundary marker. Staffed during quota hours; currently empty. A grease-pencil transit log on the counter shows twelve crossings today. The stove is warm. Someone left a canteen.',
      choices: [
        { text: 'An empty quota post and a warm stove. Make use of both.', skill: 'survival', tag: 'safe', align: 'neutral', cid: 'anchor_make_camp' },
        { text: 'The transit log has names. Cross the boundary now and stay out of it.', skill: 'stealth', tag: 'risky', align: 'neutral', cid: 'anchor_push_on' }
      ]
    },
    {
      id: 'anchor_sheresh_perimeter',
      locality: 'aurora_crown',
      name: 'Dome Perimeter Rest Stop',
      desc: 'A Dome Stewards-maintained rest point at the Sheresh perimeter. The dome-light is close enough here to read by without a lamp. Insulated sleeping rolls are stored in a locked rack — key on a hook above the door, available to travelers. The cold through the walls is steady, not cutting.',
      choices: [
        { text: 'Dome-light does not stop. Sleep is possible if the cold is manageable.', skill: 'survival', tag: 'safe', align: 'neutral', cid: 'anchor_make_camp' },
        { text: 'The dome perimeter is monitored. Better to arrive in full daylight.', skill: 'lore', tag: 'safe', align: 'neutral', cid: 'anchor_push_on' }
      ]
    },
    {
      id: 'anchor_psanan_ash_road',
      locality: 'psanan',
      name: 'Ash Road Iron Station',
      desc: 'A cast-iron waystation on the Psanan ash road. Ventilation slots along the roof keep the air inside cleaner than outside. The forge heat from below keeps it warm without fire. A route advisory board carries one current notice, updated in grease pencil: ASH LEVEL — ELEVATED EAST.',
      choices: [
        { text: 'The forge heat and the clean air are reasons enough to stop.', skill: 'survival', tag: 'safe', align: 'neutral', cid: 'anchor_make_camp' },
        { text: 'Elevated ash east means the timing matters. Move now.', skill: 'lore', tag: 'risky', align: 'neutral', cid: 'anchor_push_on' }
      ]
    }
  ];

  // ---------------------------------------------------------------------------
  // Helper: resolve macroregion from locality IDs
  // ---------------------------------------------------------------------------
  function resolveMacroregion(fromId, toId) {
    var from = LOCALITY_MACROREGION[fromId] || 'principalities';
    var to   = LOCALITY_MACROREGION[toId]   || 'principalities';
    // If crossing regions, prefer destination region
    return to || from;
  }

  // ---------------------------------------------------------------------------
  // Helper: pick N unique random items from array
  // ---------------------------------------------------------------------------
  function pickRandom(arr, n) {
    var copy = arr.slice();
    var result = [];
    n = Math.min(n, copy.length);
    for (var i = 0; i < n; i++) {
      var idx = Math.floor(Math.random() * copy.length);
      result.push(copy.splice(idx, 1)[0]);
    }
    return result;
  }

  // ---------------------------------------------------------------------------
  // TRAVEL_CORRIDOR — main controller
  // ---------------------------------------------------------------------------
  window.TRAVEL_CORRIDOR = {

    triggerEncounters: function(routeTier, fromId, toId) {
      // Gate: corridor encounters require authored result text before going live
      if (!window.G || !window.G.flags || !window.G.flags.corridor_encounters_enabled) {
        if (typeof loadStageChoices === 'function') loadStageChoices(toId || fromId);
        return;
      }

      var tier = routeTier || 'short';
      var from = fromId || '';
      var to   = toId   || '';

      // Determine encounter count by tier
      var encounterCount = tier === 'long' ? 3 : (tier === 'medium' ? 2 : 1);

      // Pick encounters for this tier
      var pool = window.CORRIDOR_ENCOUNTERS[tier] || window.CORRIDOR_ENCOUNTERS['short'];
      var selected = pickRandom(pool, encounterCount);

      // Store remaining encounters for chaining
      if (window.G && window.G.flags) {
        window.G.flags._corridor_encounters_remaining = selected.length - 1;
        window.G.flags._corridor_encounters_queue     = selected.slice(1).map(function(e){ return e.id; });
        window.G.flags._corridor_from                 = from;
        window.G.flags._corridor_to                   = to;
        window.G.flags._corridor_tier                 = tier;
      }

      // Show macroregion narration
      var region = resolveMacroregion(from, to);
      var narrations = window.MACROREGION_NARRATIONS[region] || window.MACROREGION_NARRATIONS['principalities'];
      var narText = narrations[Math.floor(Math.random() * narrations.length)];
      if (typeof addNarration === 'function') {
        addNarration('On the Road', narText);
      }

      // Render first encounter
      var first = selected[0];
      if (!first) return;
      if (typeof addNarration === 'function') {
        addNarration(first.title, first.text);
      }
      if (typeof renderChoices === 'function') {
        setTimeout(function() {
          renderChoices(first.choices);
        }, 300);
      }
    },

    // Called after a corridor choice resolves, to chain to the next encounter
    nextEncounter: function() {
      if (!window.G || !window.G.flags) return;
      var remaining = window.G.flags._corridor_encounters_remaining || 0;
      if (remaining <= 0) return;

      var queue = window.G.flags._corridor_encounters_queue || [];
      if (!queue.length) return;

      var nextId = queue.shift();
      window.G.flags._corridor_encounters_queue     = queue;
      window.G.flags._corridor_encounters_remaining = remaining - 1;

      var tier = window.G.flags._corridor_tier || 'short';
      var allTiers = [].concat(
        window.CORRIDOR_ENCOUNTERS.short || [],
        window.CORRIDOR_ENCOUNTERS.medium || [],
        window.CORRIDOR_ENCOUNTERS.long || []
      );
      var encounter = null;
      for (var i = 0; i < allTiers.length; i++) {
        if (allTiers[i].id === nextId) { encounter = allTiers[i]; break; }
      }
      if (!encounter) return;

      if (typeof addNarration === 'function') {
        addNarration(encounter.title, encounter.text);
      }
      if (typeof renderChoices === 'function') {
        setTimeout(function() {
          renderChoices(encounter.choices);
        }, 300);
      }
    }
  };

  // ---------------------------------------------------------------------------
  // Wire the hook — override _travelStartEncounter
  // ---------------------------------------------------------------------------
  window._travelStartEncounter = function(type, fromId, toId) {
    var tier = type || 'short';
    window.TRAVEL_CORRIDOR.triggerEncounters(tier, fromId || '', toId || '');
  };

})();
