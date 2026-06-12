// NPC Lookup — Phase 4 (V1.0)
// Tier 1: 3-path access (faction/progress/renown); escalating DC on failure
// Tier 2: skill-gated, always accessible
// Tier 3: service roles, low DC
// Each NPC yields enriched choice objects via buildNPCChoices(locality)

(function () {
  'use strict';

  // ── Constants ──────────────────────────────────────────────────────────────
  var T1 = 1, T2 = 2, T3 = 3;
  var RENOWN_ESTABLISHED = 20;
  var RENOWN_RENOWNED    = 65;

  // ── Helpers ────────────────────────────────────────────────────────────────
  function _rep(factionId) {
    var f = (G.factions || []).find(function (x) { return x.id === factionId; });
    return f ? (f.rep || 0) : 0;
  }

  function _skill(key) { return (G.skills || {})[key] || 0; }

  function _flags() { G.flags = G.flags || {}; return G.flags; }

  function _attempts(npcId) { return _flags()['npc_' + npcId + '_attempts'] || 0; }

  function _dc(base, npcId) { return base + _attempts(npcId) * 2; }

  function _roll20(skillKey, basedc, npcId) {
    var raw   = Math.floor(Math.random() * 20) + 1;
    var total = raw + _skill(skillKey);
    var dc    = _dc(basedc, npcId);
    var success = total >= dc;
    if (!success) _flags()['npc_' + npcId + '_attempts'] = _attempts(npcId) + 1;
    return { success: success, total: total, dc: dc };
  }

  function _archGroup() {
    try {
      var fam = getArchetypeFamily();
      if (fam === 'support') return 'support';
      if (fam === 'magic')   return 'magic';
      if (fam === 'stealth') return 'stealth';
    } catch (e) {}
    return 'combat';
  }

  function _narrate(label, text, tone) {
    if (typeof addNarration === 'function') addNarration(label, text, tone || 'neutral');
  }

  // Returns the path the player qualifies for, or null if none
  function _accessPath(npc) {
    if (npc.tier !== T1) return 'open';
    var g = npc.gates || {};
    if (npc.faction_gate && _rep(npc.faction_gate) >= (g.faction_rep || 25)) return 'faction';
    var prog = (G.stageProgress && G.stageProgress[G.stage || 1]) || 0;
    if (prog >= (g.progress || 8)) return 'progress';
    if ((G.renown || 0) >= (g.renown || RENOWN_ESTABLISHED)) return 'renown';
    return null;
  }

  function canAccessNPC(npcId) {
    var npc = NPC_LOOKUP[npcId];
    if (!npc) return false;
    if (npc.tier >= T2) return true;
    return _accessPath(npc) !== null;
  }

  // Build enriched choices for all NPCs in a given locality
  function buildNPCChoices(locality) {
    var out = [];
    Object.keys(NPC_LOOKUP).forEach(function (id) {
      var npc = NPC_LOOKUP[id];
      if (npc.locality && npc.locality !== locality) return;
      if (!npc.locality) return; // generic roles added separately per locality
      out = out.concat(_choicesForNPC(npc));
    });
    return out;
  }

  // Build enriched choices for a generic role in a specific locality context
  function buildGenericNPCChoices(roleId, locality, localityLabel) {
    var npc = NPC_LOOKUP[roleId];
    if (!npc) return [];
    var copy = Object.assign({}, npc, { locality: locality });
    return _choicesForNPC(copy, localityLabel);
  }

  function _choicesForNPC(npc, localityLabel) {
    var choices = [];
    var accessed = !!_flags()['npc_' + npc.id + '_accessed'];

    // ── First-contact choice (always shown if gate met) ──
    if (!accessed) {
      var path = _accessPath(npc);
      if (npc.tier === T1 && path === null) {
        // Show locked-door hint
        choices.push({
          label: (npc.locked_label || (npc.name + ' does not receive unannounced visitors.')),
          tags: ['npc', 'locked', 'tier1'],
          xpReward: 0,
          fn: function () {
            _narrate(npc.name,
              npc.name + ' is not accessible to an unknown party. Faction standing, evidence of progress, or a notable reputation could change that.',
              'negative');
          }
        });
        return choices;
      }

      var introText = npc.tier === T1
        ? ((npc.intro && npc.intro[path]) || npc.intro_default || ('You meet ' + npc.name + '.'))
        : (npc.intro_default || ('You encounter ' + npc.name + '.'));

      choices.push({
        label: npc.choice_label || ('Approach ' + npc.name + '.'),
        tags: ['npc', 'tier' + npc.tier, 'first_contact'],
        xpReward: npc.tier === T1 ? 3 : npc.tier === T2 ? 2 : 1,
        fn: (function (n, intro) {
          return function () {
            _narrate(n.name, intro, 'neutral');
            _flags()['npc_' + n.id + '_accessed'] = true;
          };
        })(npc, introText)
      });
    }

    // ── Follow-up choices (shown after first contact) ──
    if (accessed && npc.ask_direct) {
      choices.push({
        label: npc.ask_direct_label || npc.ask_direct,
        tags: ['npc', 'tier' + npc.tier, 'direct'],
        xpReward: npc.tier === T1 ? 4 : 2,
        stageProgress: npc.tier === T1 ? 1 : 0,
        fn: (function (n) {
          return function () {
            var r = _roll20(n.skill || 'persuasion', n.dc || 12, n.id);
            var archGroup = _archGroup();
            var successText = (n.success && (n.success[archGroup] || n.success['default']))
              || n.success_default
              || (n.name + ' gives you something to work with.');
            var failText = n.failure || (n.name + ' declines to be useful at this moment.');
            _narrate(n.name, r.success ? successText : failText, r.success ? 'positive' : 'negative');
            if (r.success && n.on_success) n.on_success();
            if (r.success && n.journal_on_success && typeof addJournal === 'function') {
              addJournal(n.journal_on_success, n.journal_category || 'contact_made');
            }
          };
        })(npc)
      });
    }

    if (accessed && npc.ask_indirect) {
      choices.push({
        label: npc.ask_indirect_label || npc.ask_indirect,
        tags: ['npc', 'tier' + npc.tier, 'indirect'],
        xpReward: npc.tier === T1 ? 3 : 2,
        fn: (function (n) {
          return function () {
            var r = _roll20('lore', Math.max(8, (n.dc || 12) - 2), n.id);
            var txt = r.success
              ? (n.success_indirect || n.success_default || 'The oblique angle yields something.')
              : (n.failure_indirect || 'Reading the situation provides nothing you could not have guessed.');
            _narrate(n.name, txt, r.success ? 'positive' : 'neutral');
          };
        })(npc)
      });
    }

    if (accessed && npc.offer_help) {
      choices.push({
        label: npc.offer_help_label || npc.offer_help,
        tags: ['npc', 'tier' + npc.tier, 'offer'],
        xpReward: npc.tier === T1 ? 4 : 2,
        stageProgress: npc.tier === T1 ? 1 : 0,
        fn: (function (n) {
          return function () {
            var r = _roll20('persuasion', (n.dc || 12) + 2, n.id);
            var txt = r.success
              ? (n.help_success || 'They accept the offer, with conditions.')
              : (n.help_failure || 'They have no current need for what you are describing.');
            _narrate(n.name, txt, r.success ? 'positive' : 'neutral');
            if (r.success && n.on_help_success) n.on_help_success();
          };
        })(npc)
      });
    }

    return choices;
  }

  // ── NPC Registry ───────────────────────────────────────────────────────────
  var NPC_LOOKUP = {

    // ════ SHELKOPOLIS ════════════════════════════════════════════════════════

    lady_isabella_shelk: {
      id: 'lady_isabella_shelk',
      name: 'Lady Isabella Shelk',
      polity: 'shelk',
      locality: 'shelkopolis',
      tier: T1,
      faction_gate: 'principality_of_shelk',
      gates: { faction_rep: 25, progress: 8, renown: RENOWN_ESTABLISHED },
      dc: 14,
      skill: 'charm',
      agenda: 'Protect House Shelk standing by resolving obligations that cannot be discharged through the visible administrative record.',
      register: 'Shelkopolis velvet register — precedent before preference, adjacent framing over direct ask, silence used as a question.',
      tell: 'Turns her signet inward against her palm the moment a conversation shifts from ritual to substance — the stone never leaves her hand.',
      choice_label: 'Lady Isabella Shelk will see certain parties. You may be one of them.',
      locked_label: 'House Shelk does not grant audiences to strangers without introduction.',
      intro: {
        faction: 'Lady Isabella Shelk receives you in an antechamber of the estate. She studies you the way she studies every document — for precedent, alignment, and the cost of error. The Shelk name has weight in this room, and she carries it without effort. She does not ask why you have come. She waits to see if you will say something worth hearing.',
        progress: 'Lady Isabella Shelk has heard the questions you have been asking around Shelkopolis. She does not say this openly. She asks about your travels, your business, the names of people you have spoken to — each question precise, each answer filed. It is only several minutes in that you understand she is not making conversation. She is auditing you.',
        renown: 'Your name reached the estate before you did. Lady Isabella Shelk knew to have tea set when you arrived. She watches you with the attention of someone who has read the account and now wants to see whether the person matches it. She finds most reputations smaller than their owners believe.'
      },
      intro_default: 'The estate secretary informs you that Lady Isabella Shelk is not available to unannounced visitors.',
      ask_direct: 'House Shelk has resources I need. Name a price and I\'ll consider it.',
      ask_direct_label: 'House Shelk has resources I need. Name a price.',
      ask_indirect: 'Find the angle that does not expose the full ask.',
      ask_indirect_label: 'Read the room for what the House currently needs.',
      offer_help: 'The House has a problem I may be able to solve. Make it worth my time.',
      offer_help_label: 'Name something the House cannot solve through registered channels.',
      success: {
        default: 'She considers. The house has obligations she cannot discharge through registered channels — she does not name the problem directly, she names a problem adjacent to it, and watches to see whether you understand the gap. You do. The conversation that follows is more useful than the one you came prepared for.',
        support: 'Something in how you present yourself shifts her register. She speaks with fewer pauses. A support-class traveler draws a different kind of attention to house business, and she has decided to say so. She tells you what she cannot tell an enforcer.',
        magic: 'She is careful around arcane matters — the House has investments in regulated institutions. But your particular kind of careful draws hers. She speaks in terms of what the house can provide without entanglement.',
        stealth: 'She does not ask how you learned certain things. She notes that you learned them, and that matters more. She speaks plainly about what the House can offer someone who operates the way you appear to operate.'
      },
      success_default: 'The house has uses for a party that knows when not to ask further.',
      success_indirect: 'The room tells you something the estate secretary did not mention: an ongoing negotiation, a pressure the House has not resolved, a name that appears twice in the decorative records mounted on the outer wall. Small observations. Useful ones.',
      failure: 'Lady Isabella Shelk thanks you for your visit. She has many obligations. Her secretary will see you out. The door closes with the specific softness of someone who has decided not to make a scene of your dismissal.',
      on_success: function () {
        _flags().lady_isabella_shelk_contacted = true;
      },
      journal_on_success: 'Lady Isabella Shelk, Matriarch of House Shelk, opened a line of communication.',
      journal_category: 'contact_made'
    },

    lady_elowen_shelk: {
      id: 'lady_elowen_shelk',
      name: 'Lady Elowen Shelk',
      polity: 'shelk',
      locality: 'shelkopolis',
      tier: T2,
      dc: 12,
      skill: 'charm',
      agenda: 'Learn the unwritten rules of House Shelk fast enough to stop being handed their filtered version of them.',
      register: 'Shelkopolis polished register with the edges still showing — she uses the full House vocabulary but not yet the House cadence.',
      tell: 'Tucks her left cuff twice while she thinks — once out of habit, once because she caught herself doing it the first time.',
      choice_label: 'Lady Elowen Shelk moves through the city without the full weight of the estate behind her.',
      intro_default: 'Lady Elowen Shelk is crossing the merchant quarter when you intercept her — or let her intercept you. She stops, curious rather than guarded. She has her mother\'s attention but not yet her patience for wasting it.',
      ask_direct: 'Ask what she knows about current House tensions.',
      ask_direct_label: 'Ask what concerns her about the current state of the House.',
      ask_indirect: 'Draw her out on what is troubling her about the city lately.',
      ask_indirect_label: 'Read what is troubling her without asking directly.',
      success_default: 'She tells you something her mother would not — not from disloyalty, but from not yet having learned which things are too valuable to share with a stranger. The information is unpolished but genuine.',
      success_indirect: 'She is not guarded about what she notices. The city is doing something she does not like, and the shape of her unease is specific enough to be useful.',
      failure: 'She is pleasant, uncertain, and ultimately unhelpful. Either she does not know what you want, or she has been coached on exactly this situation.'
    },

    captain_thalion_windrider: {
      id: 'captain_thalion_windrider',
      name: 'Captain Thalion Windrider',
      polity: 'shelk',
      locality: 'shelkopolis',
      tier: T2,
      dc: 12,
      skill: 'charm',
      agenda: 'Keep the Roadwarden intelligence picture ahead of the city watch, so route command stays route command and does not become a ministry errand.',
      register: 'Roadwarden manifest register — facts delivered in the order they were logged, speculation kept visibly separate from the record.',
      tell: 'Marks his place in a manifest by pressing a thumbnail indent at the line, never by folding the page — lets him close the book without signaling where he stopped reading.',
      choice_label: 'Windrider reads cargo manifests the way others read faces. Worth the approach.',
      intro_default: 'Captain Thalion Windrider is reviewing a manifest at the market gate when you approach. He does not look up immediately — he finishes the line he is reading. Then he gives you the kind of full attention that is also an assessment.',
      ask_direct: 'Ask what route conditions or recent incidents have drawn his attention.',
      ask_direct_label: 'Ask what the Roadwardens have been tracking lately.',
      ask_indirect: 'Read the manifest he was reviewing for clues about current concerns.',
      ask_indirect_label: 'Note what the manifest he was reviewing contains.',
      success: {
        default: 'He is factual, which is more useful than most. Route intelligence, checkpoint irregularities, a cargo that was flagged but not held. He does not speculate — but the facts he offers are specific enough to speculate from.',
        combat: 'He reads your bearing easily. He speaks to you the way he speaks to his senior wardens — directly, without softening. The same intelligence, delivered without preamble.'
      },
      success_default: 'Route intelligence and recent incident data, presented without editorial.',
      success_indirect: 'The manifest shows two shipments arriving ahead of their scheduled window. That is unusual. He was clearly already aware of it.',
      failure: 'He thanks you for your time. He has a tight schedule. You understand you are no longer in it.',
      on_success: function () { _flags().thalion_windrider_contacted = true; }
    },

    high_priestess_lyara_dawnlight: {
      id: 'high_priestess_lyara_dawnlight',
      name: 'High Priestess Lyara Dawnlight',
      polity: 'shelk',
      locality: 'shelkopolis',
      tier: T2,
      dc: 11,
      skill: 'wits',
      agenda: 'Close the shrine ledger at the end of each observance cycle with no obligation left publicly undischarged — private arrangements do not count against the tally.',
      register: 'Shelkopolis ceremonial register — every exchange framed as a potential offering, personal opinions declined as outside the rite.',
      tell: 'Sets two fingers against the silver clasp at her collar before naming an outstanding petition, as if steadying the seal that authorized the question.',
      choice_label: 'Lyara Dawnlight moves between shrine and estate. Not every path goes through the House.',
      intro_default: 'High Priestess Lyara Dawnlight receives you in the outer hall of the shrine — ceremonial dress in silver and pale gold. She speaks in the measured register of someone who treats every conversation as a potential offering.',
      ask_direct: 'Ask what ritual obligations are outstanding in the current season.',
      ask_direct_label: 'Ask about outstanding ritual obligations in the current season.',
      ask_indirect: 'Read the shrine record for recent unusual petitions.',
      ask_indirect_label: 'Browse the shrine record while she is occupied.',
      success_default: 'She explains the current observance cycle, outstanding petitions, and — unprompted — one obligation that has not been discharged. She treats this as information you needed, not a secret she is betraying.',
      success_indirect: 'The shrine record shows a petition filed and then withdrawn six days ago. The petitioner\'s name is redacted. The category is unusual for this quarter.',
      failure: 'She offers a travel blessing and names the standard offering. She is not unhelpful — she simply did not give you anything beyond the public face of her office.'
    },

    kess_the_crossing: {
      id: 'kess_the_crossing',
      name: 'Kess the Crossing',
      polity: 'shelk',
      locality: 'shelkopolis',
      tier: T2,
      dc: 12,
      skill: 'finesse',
      agenda: 'Extract deniable leverage — provides intel in exchange for favors that give Shadowhands options without fingerprints.',
      register: 'Short-sentence Shelkopolis working register; no faction vocabulary in public speech; pauses before proper names.',
      tell: 'Closes a folio to exactly halfway before looking up — never more, never less.',
      choice_label: 'Kess the Crossing handles Shadowhands intake without ever using the word.',
      intro_default: 'Kess works a folio at a south-dock table that is not the one a clerk would pick. She does not look up when you sit. She finishes the line she was reading, then closes the folio to exactly halfway — no more, no less — before letting the quiet stand long enough that you understand the meeting has already started.',
      ask_direct: 'State what leverage you are offering in exchange for what access.',
      ask_direct_label: 'Name the trade plainly — favor for favor.',
      ask_indirect: 'Read the folio she is holding without asking what it is.',
      ask_indirect_label: 'Read the folio at the table without asking.',
      success_default: 'She names a small favor — a ledger page that needs to disappear and be replaced with a forgery before third watch. If you handle it, she will open a channel into what the Shadowhands are hearing from the south-dock night shift. She does not use the faction name.',
      success_indirect: 'The folio is a freight manifest — three entries coded in a pattern that does not match the port\'s published categories. The pattern repeats across six ports.',
      failure: 'She closes the folio the rest of the way. The table she is sitting at is, she notes, also not a public one. She would prefer to keep it that way.',
      on_success: function () { _flags().kess_the_crossing_contacted = true; },
      journal_on_success: 'Kess the Crossing (Shadowhands intake) opened a channel — favor owed.',
      journal_category: 'contact_made'
    },

    // ════ ITHTANANALOR ═══════════════════════════════════════════════════════

    captain_darian_roaz: {
      id: 'captain_darian_roaz',
      name: 'Captain Darian Roaz',
      polity: 'roaz',
      locality: 'ithtananalor',
      tier: T1,
      faction_gate: 'principality_of_roaz',
      gates: { faction_rep: 25, progress: 8, renown: RENOWN_ESTABLISHED },
      dc: 15,
      skill: 'charm',
      agenda: 'Keep ORE enforcement legally clean end-to-end, so nothing his command touches ever needs to be scrubbed out of the record later.',
      register: 'Roazian enforcement register — clipped, threshold-focused, states limits once and treats repetition as a failure of the listener.',
      tell: 'Reads a document to the bottom of the page before acknowledging whoever is standing in front of him, then sets the page precisely square with the desk edge before speaking.',
      choice_label: 'Captain Darian Roaz commands ORE enforcement in Ithtananalor. Access requires a reason he finds credible.',
      locked_label: 'ORE command does not receive visitors without formal introduction or a registered operational need.',
      intro: {
        faction: 'Captain Darian Roaz reviews your credentials with the attention he gives every document: checking for what is missing, not what is present. The Roazian enforcement seal on your introduction gives him a reason to hear you. He makes clear that is different from a reason to help.',
        progress: 'Word travels in this city — especially to the people whose job is to collect it. Captain Darian Roaz knows you have been asking questions. He has decided to ask his own before you get further. The meeting is brief, formal, and more useful than it looks from the outside.',
        renown: 'Your reputation reached Ithtananalor before you did. That is not automatically a recommendation. Captain Darian Roaz has read your record with the attention he gives anything that could become a problem. He has decided to speak with you before it does.'
      },
      intro_default: 'The ORE intake desk informs you that Captain Darian Roaz processes requests through the standard queue. A form is available.',
      ask_direct: 'Name the specific intelligence or access you need from ORE.',
      ask_direct_label: 'State the specific need from ORE directly.',
      ask_indirect: 'Read the enforcement pattern without naming what you are looking for.',
      ask_indirect_label: 'Read the enforcement situation indirectly.',
      offer_help: 'Offer to handle a problem ORE cannot address through registered channels.',
      offer_help_label: 'Offer to solve a problem ORE cannot solve openly.',
      success: {
        default: 'He does not give you what you asked for. He gives you something adjacent — specific, operational, with clear limits on how it can be used. He states those limits once. He will not repeat them.',
        magic: 'He notes your affiliation before he speaks. Magic complicates his jurisdiction, and he says so plainly. What he offers is narrow but reliable: enforcement intelligence that does not require him to trust you with the full picture.',
        combat: 'He recognizes the professional bearing and adjusts his register. The conversation is shorter and more specific. He respects efficiency enough to offer it.'
      },
      success_default: 'Specific enforcement intelligence with clear operational limits.',
      success_indirect: 'The patrol rotation has a gap at the third checkpoint that does not appear in the public schedule. Whoever planned the gap knew where to put it.',
      failure: 'Captain Darian Roaz thanks you for attending and informs you that the Office of Roazian Enforcement processes requests through the standard intake. A clerk will send a receipt.',
      on_success: function () { _flags().darian_roaz_contacted = true; },
      journal_on_success: 'Captain Darian Roaz of ORE acknowledged the inquiry and provided operational data.',
      journal_category: 'contact_made'
    },

    sir_velden_ironspike: {
      id: 'sir_velden_ironspike',
      name: 'Sir Velden Ironspike',
      polity: 'roaz',
      locality: 'ithtananalor',
      tier: T2,
      dc: 13,
      skill: 'might',
      agenda: 'Trade operational favors with outside parties to move on the problems ORE paperwork refuses to acknowledge.',
      register: 'Roazian foundry register — short sentences, quota vocabulary, treats every exchange as the start of a ledger entry he will have to balance.',
      tell: 'Taps the butt of his pen twice against the corner of the rotation board before writing anything, whether or not the pen has ink.',
      choice_label: 'Sir Velden Ironspike moves between the foundries and the barracks. He knows the operational layer of the city.',
      intro_default: 'Sir Velden Ironspike is reviewing rotation orders at the foundry gate. He does not stop when you approach, but his attention shifts. He has been expecting a conversation like this one.',
      ask_direct: 'Ask what ORE is watching that has not reached a formal report.',
      ask_direct_label: 'Ask what is being watched but not yet written down.',
      ask_indirect: 'Read the rotation orders he is holding for what they reveal.',
      ask_indirect_label: 'Read the rotation orders over his shoulder.',
      success_default: 'He names three recent incidents — contraband routes, identity irregularities, a supply manifest that did not match its declared contents. Operational intelligence, offered with the understanding that you owe him something equivalent in return.',
      success_indirect: 'The rotation orders show a double-staffed shift at the ore registry that is not on the public calendar. Either someone expects trouble, or someone expects an opportunity.',
      failure: 'He reads you as someone who does not need to know. He is polite about it.'
    },

    // ════ PANIM HAVEN ════════════════════════════════════════════════════════

    elior_sepulcher: {
      id: 'elior_sepulcher',
      name: 'Elior Sepulcher',
      polity: 'panim',
      locality: 'panim_haven',
      tier: T3,
      dc: 10,
      skill: 'wits',
      agenda: 'Keep the mediation queue balanced in ritual language, so obligations never aggregate into a petition the shrine cannot discharge.',
      register: 'Panim Haven mediator register — frames every exchange as ritual obligation and balance, names consequences in terms of who stands near the petitioner.',
      tell: 'Aligns each document parallel to the desk edge before setting it down, never stacking — papers lie side by side across the mediation counter like place settings.',
      choice_label: 'Elior Sepulcher frames every dispute as sacred balance. He sees what others miss.',
      intro_default: 'Elior Sepulcher sets every document down before speaking — a habit of full attention, or of appearing to give it. He frames the conversation as ritual almost immediately, not from arrogance but from practice. Everything here is processed through the language of obligation and balance.',
      ask_direct: 'Ask about current outstanding ritual obligations or petitions.',
      ask_direct_label: 'Ask about outstanding obligations in the current cycle.',
      ask_indirect: 'Observe the mediation queue for anomalies.',
      ask_indirect_label: 'Watch the mediation queue without approaching the desk.',
      success_default: 'He names an outstanding obligation that has not been discharged and explains — with ritual precision — what the failure to discharge it may mean for anyone in proximity to the petitioner. He is not frightening you. He is giving you the accurate framing.',
      success_indirect: 'The mediation queue has a petition that was filed six days ago and has not been called. That is unusual. The filing category is more unusual than the delay.',
      failure: 'He explains the standard mediation fee structure and offers a pamphlet on current obligations by category.'
    },

    // ════ SOREHEIM PROPER ════════════════════════════════════════════════════

    mordoth_valinheim: {
      id: 'mordoth_valinheim',
      name: 'Mordoth Valinheim',
      polity: 'soreheim',
      locality: 'soreheim',
      tier: T1,
      faction_gate: 'giant_council',
      gates: { faction_rep: 25, progress: 10, renown: RENOWN_ESTABLISHED },
      dc: 15,
      skill: 'charm',
      agenda: 'Protect the quota system as a living instrument — route around blockages without creating the precedent that the system itself can be bypassed.',
      register: 'Giant Council register — measured cadence, quota vocabulary, answers framed as what the system permits rather than what they prefer.',
      tell: 'Holds three agenda sheets fanned against the desk and advances only the one currently being discussed, sliding the other two back under the blotter without looking.',
      choice_label: 'Mordoth Valinheim decides what the quota permits. Audiences require a credible reason.',
      locked_label: 'Giant Council chambers do not receive unregistered visitors.',
      intro: {
        faction: 'Mordoth Valinheim receives you in the council gallery. The agenda on their desk concerns three other matters before yours. They manage this without appearing to manage it — the simultaneous attention is a skill of the office.',
        progress: 'You have been moving through Soreheim in ways the council notices. Mordoth Valinheim has arranged this meeting to understand what you are doing before it becomes a larger administrative question.',
        renown: 'They know your name from cross-polity records. The meeting is short and factual. They do not invest more than the situation requires, but the situation, they have decided, requires something.'
      },
      intro_default: 'The council clerk informs you that Giant Council chambers do not receive unregistered visitors. A request form is available through the tower registry.',
      ask_direct: 'Name the council resource or tower access you need.',
      ask_direct_label: 'Name what you need from the Giant Council directly.',
      ask_indirect: 'Read the quota distribution board for what it reveals.',
      ask_indirect_label: 'Read the quota distribution for priority signals.',
      offer_help: 'Name a problem the council cannot resolve through internal channels.',
      offer_help_label: 'Offer to handle something the council cannot solve internally.',
      success: {
        default: 'They tell you what is possible within the quota structure — not everything you asked for, but the most useful adjacent thing. Tower clearance, a supply allocation, an introduction to the relevant ministry. The Giant Council does not give favors; it processes requests that fit the system.',
        support: 'They note the service discipline and adjust the conversation. A support-class outside party is occasionally more useful than an internal one for certain categories of problem. They name which category this might be.',
        combat: 'They are accustomed to fighters who want things directly. They provide direct answers: what is possible, what the mechanism is, what it will cost.'
      },
      success_default: 'A specific council resource or access, delivered through the legitimate system.',
      success_indirect: 'The quota distribution shows three towers drawing above their allocation without a corresponding ministry sign-off. Someone approved the overage without going through the standard review.',
      failure: 'Your request does not fit the current administrative category. A form will be generated. Processing time is variable.',
      on_success: function () { _flags().mordoth_valinheim_contacted = true; },
      journal_on_success: 'Mordoth Valinheim of the Giant Council acknowledged the inquiry.',
      journal_category: 'contact_made'
    },

    roth_udenine: {
      id: 'roth_udenine',
      name: 'Roth Udenine',
      polity: 'soreheim',
      locality: 'soreheim',
      tier: T2,
      dc: 12,
      skill: 'charm',
      agenda: 'Clear tower distribution discrepancies before they calcify into ministry disputes that take months to unwind.',
      register: 'Soreheim logistics register — precision over speed, completes the current line before acknowledging anyone, speaks in manifest categories rather than names.',
      tell: 'Finishes the entry he is writing, then lays the pen perfectly parallel to the ruled margin before looking up — the pen aligns with the line, not the page edge.',
      choice_label: 'Roth Udenine logs what moves before anyone names where it went.',
      intro_default: 'Roth Udenine is at his station in the tower base when you approach. He completes the line he is entering before acknowledging you. Precision over speed — a Soreheim value that has become a personal one.',
      ask_direct: 'Ask what distribution irregularities look like from where he sits.',
      ask_direct_label: 'Ask what the distribution irregularities look like from his position.',
      ask_indirect: 'Read the logistics manifest he is working on.',
      ask_indirect_label: 'Read the logistics manifest over his shoulder.',
      success_default: 'He names three discrepancies in the current cycle — not because you asked, but because naming them is the first step toward resolving them, and he has been waiting for someone with clearance to hear it.',
      success_indirect: 'Two items in the manifest are logged twice under different category codes. The second entry is three days newer than the first. Something was reclassified after it moved.',
      failure: 'His manifest does not include the category you are asking about. He suggests the relevant tower ministry.'
    },

    cron_udenine: {
      id: 'cron_udenine',
      name: 'Cron Udenine',
      polity: 'soreheim',
      locality: 'soreheim',
      tier: T2,
      dc: 12,
      skill: 'wits',
      agenda: 'Preserve the Udenine administrative record against informal revision — the archive answers to filing law, not to the current ministry mood.',
      register: 'Soreheim archivist register — prompts for category and date before relationship, treats adjacent files as equally responsive to the question asked.',
      tell: 'Pulls three documents at once and arranges them in the order the request would have logically generated them, never in the order he retrieved them from the shelf.',
      choice_label: 'Cron Udenine treats certainty as something earned late. The archive knows it too.',
      intro_default: 'Cron Udenine is cataloguing at the archive counter when you arrive. He asks what you need before you have finished approaching — he has learned that people who come to archives have specific needs, and the sooner those are named, the sooner you can both get back to work.',
      ask_direct: 'Ask for historical records on a specific production cycle or quota dispute.',
      ask_direct_label: 'Name a specific cycle or dispute to research.',
      ask_indirect: 'Search the archive index for anomalies in the filing pattern.',
      ask_indirect_label: 'Scan the archive index for irregularities.',
      success_default: 'He pulls three documents without being asked for more than the broad category. The second one contains what you needed. The third one recontextualizes the first.',
      success_indirect: 'The archive index has a gap — a date range with no entries. The gap is not marked as classified. It is simply absent.',
      failure: 'The records you are asking about require Giant Council clearance. He can file a review request on your behalf.'
    },

    vorgul_oxtend: {
      id: 'vorgul_oxtend',
      name: 'Vorgul Oxtend',
      polity: 'soreheim',
      locality: 'soreheim',
      tier: T2,
      dc: 13,
      skill: 'might',
      agenda: 'Keep at least three of his forges off the failure list long enough that the floor can absorb the ministries that will not adjust their quotas.',
      register: 'Soreheim production-floor register — quota numbers in preference to names, listens while still reading, assumes the conversation has to earn his attention.',
      tell: 'Scores a short vertical mark at the margin of every batch report he signs off, even when the report is clean — the mark is his, not the form\'s.',
      choice_label: 'Vorgul Oxtend signs every batch report. He knows the cost.',
      intro_default: 'Vorgul Oxtend is checking a batch report at the forge entrance when you find him. He listens while still reading the report. He has not reached his position by giving full attention to conversations that have not yet proven they deserve it.',
      ask_direct: 'Ask what quota demands are creating the most production strain.',
      ask_direct_label: 'Ask which quotas are breaking the production floor.',
      ask_indirect: 'Read the batch report he is checking.',
      ask_indirect_label: 'Read the batch report over his shoulder.',
      success_default: 'He names which ministries are over-demanding and which forges are closest to failure. The information is specific and operational, and comes with an implicit request: that something be done about at least one of the problems he has just named.',
      success_indirect: 'The batch report shows an output number that is too round — no forge hits quota that cleanly. Someone is filling the gap with inventory from somewhere else.',
      failure: 'He finishes the batch report and hands it to someone else. The conversation, apparently, is complete.'
    },

    decon_von_reckshem: {
      id: 'decon_von_reckshem',
      name: 'Decon von Reckshem',
      polity: 'soreheim',
      locality: 'soreheim',
      tier: T2,
      dc: 12,
      skill: 'charm',
      agenda: 'Hold two inter-tower disputes in reserve at all times, so the delegation hall always has usable leverage without needing to generate any.',
      register: 'Soreheim delegation register — unhurried cadence, draws the distinction between courtesy and favor before offering either, names tensions in the plural.',
      tell: 'Turns his cup a quarter-rotation after every sip — the handle ends up at the same compass point whether the cup is full, half, or empty.',
      choice_label: 'Decon von Reckshem keeps two disputes in reserve. Courtesy and favor differ.',
      intro_default: 'Decon von Reckshem receives you in the delegation hall — a space designed for conversations that cannot happen in the tower proper. He is unhurried, which in Soreheim means he has already decided you are worth his time.',
      ask_direct: 'Ask what diplomatic or inter-tower tensions are currently active.',
      ask_direct_label: 'Ask what inter-tower tensions are active right now.',
      ask_indirect: 'Read the delegation board for current access restrictions.',
      ask_indirect_label: 'Scan the delegation board for access restrictions.',
      success_default: 'He names two inter-tower disputes that have not reached the council yet and explains which one is more likely to become useful leverage in the next quarter. He does this as a courtesy, not a favor — the distinction matters to him.',
      success_indirect: 'The delegation board has a closed-session marker on a meeting that would ordinarily be open. The parties listed are not the ones you would expect to be in closed session together.',
      failure: 'He regrets that the current agenda does not accommodate general inquiries. The delegation calendar is available through standard channels.'
    },

    lyria_firesoul: {
      id: 'lyria_firesoul',
      name: 'Lyria Firesoul',
      polity: 'soreheim',
      locality: 'soreheim',
      tier: T2,
      dc: 11,
      skill: 'wits',
      agenda: 'Surface a pattern in the anomaly reports to a party outside the ministry, before someone inside the ministry forecloses on her ability to name it.',
      register: 'Soreheim export-floor register with arcane vocabulary held in reserve — blunt about systems, specific only when she decides the listener can use it.',
      tell: 'Runs a thumb along the margin note of whichever report is in front of her before she answers, as if confirming the annotation is still the one she wrote.',
      choice_label: 'Lyria Firesoul operates at the edge of sanctioned arcane work in the towers.',
      intro_default: 'Lyria Firesoul is reviewing an anomaly report when you approach. She does not look up, but she is aware of you. In Soreheim, unlicensed arcane presence is her problem to manage, and she has become very good at noticing it.',
      ask_direct: 'Ask what the current anomaly reports show.',
      ask_direct_label: 'Ask what the anomaly reports are showing.',
      ask_indirect: 'Read the anomaly report she is reviewing.',
      ask_indirect_label: 'Read the anomaly report she is holding.',
      success: {
        default: 'She walks you through three recent reports without naming the broader pattern — then stops and asks whether you see it. She has been looking for someone outside the ministry to confirm what the reports imply.',
        magic: 'She is immediately more specific with you than she would be with a non-arcane party. She names things she cannot put in the report: what the anomaly looks like from the inside, what it would take to replicate it, and why someone in the towers would want to.'
      },
      success_default: 'Anomaly report data and the pattern it implies, shared with someone she has decided can use it.',
      success_indirect: 'The anomaly report she is reviewing has a handwritten note in the margin that was not there the last time she filed it. Someone added something to the filed record after the fact.',
      failure: 'The anomaly reports are classified to tower clearance. She can note your inquiry for the oversight record.'
    },

    eryndor_bladewright: {
      id: 'eryndor_bladewright',
      name: 'Eryndor Bladewright',
      polity: 'soreheim',
      locality: 'soreheim',
      tier: T2,
      dc: 12,
      skill: 'craft',
      agenda: 'Get three unprocessed inspection complaints into the hands of someone who can act on them without routing back through the ministry that buried the first three.',
      register: 'Soreheim inspector register — will speak while working but will not stop the test, treats incomplete procedure as worse than a bad outcome.',
      tell: 'Completes a blade test fully before speaking — then wipes the test block with the same corner of the same rag, always the lower left corner, always two passes.',
      choice_label: 'Eryndor Bladewright filed the complaints. Nobody processed them. He hasn\'t stopped counting.',
      intro_default: 'Eryndor Bladewright is running a blade test when you find him. He finishes the test — fully, not quickly. He will talk while he works, but he will not stop the test to talk.',
      ask_direct: 'Ask which contract deliveries are behind schedule and why.',
      ask_direct_label: 'Ask which contracts are behind and what is causing it.',
      ask_indirect: 'Read the contract inspection log.',
      ask_indirect_label: 'Scan the contract inspection log while he works.',
      success_default: 'He names two suppliers cutting material quality to hit quota numbers and one ministry accepting inferior output without flagging it. He has filed three complaints. None have been processed. He is telling you this because he has run out of channels.',
      success_indirect: 'The inspection log has a test entry marked as passed that shows values below the minimum threshold. The signature on the approval is not his.',
      failure: 'He finishes the test and logs the result. You were not part of that log.'
    },

    // ════ COSMORIA ═══════════════════════════════════════════════════════════

    cosmoria_archivist: {
      id: 'cosmoria_archivist',
      name: 'Archivist of Cosmoria',
      polity: 'cosmouth',
      locality: 'cosmoria',
      tier: T3,
      dc: 11,
      skill: 'wits',
      agenda: 'Keep the Cosmoria index coherent against the drift of newly added categories — filing law is older than the current customs regime, and she intends for it to outlast the next one.',
      register: 'Cosmouth archive register — finishes the shelf before acknowledging arrival, speaks in categories and adjacencies, treats the index as the primary source.',
      tell: 'Slides the shelving card into a requested file upside down before handing it over — so she can tell at a glance whether the file has been consulted since she reshelved it.',
      choice_label: 'Something about them reads useful. Worth a word.',
      intro_default: 'The archivist is reshelving when you arrive. She completes the shelf before acknowledging you — not rudeness, but order. Everything in this archive has a place, and things out of place cost more than the time it takes to put them right.',
      ask_direct: 'Name the specific record or category you need.',
      ask_direct_label: 'Name the record you are looking for.',
      ask_indirect: 'Browse the index without naming what you are looking for.',
      ask_indirect_label: 'Browse the index without naming your interest.',
      success_default: 'She locates the record in under three minutes. She notes two adjacent files that are related — she does this for every request, because adjacent files are often more useful than the one asked for.',
      success_indirect: 'The index has a category that appears to have been added recently — the filing system around it is older, but the category header is new. Something was given a formal home that did not have one before.',
      failure: 'The record you are asking about is restricted to Cosmouth institutional access. She can submit a review request through the standard channel.'
    },

    cosmoria_ship_captain: {
      id: 'cosmoria_ship_captain',
      name: 'Docking Captain of Cosmoria',
      polity: 'cosmouth',
      locality: 'cosmoria',
      tier: T3,
      dc: 10,
      skill: 'charm',
      agenda: 'Get one of his recent flagged manifests out of the hold-queue and in front of someone willing to actually hold the shipper accountable.',
      register: 'Cosmouth harbor register — first filed first processed, irregularities described in the tense of an ongoing complaint.',
      tell: 'Snaps the stamp twice against the dry pad before the manifest ink pad — a soundcheck he developed when the pad runs dry, which happens often enough that he does it every time now.',
      choice_label: 'Something about them reads useful. Worth a word.',
      intro_default: 'The docking captain is at the registry counter, processing manifests in order — first filed, first processed. You are not first. He will get to you.',
      ask_direct: 'Ask about recent cargo irregularities or flagged manifests.',
      ask_direct_label: 'Ask about flagged manifests from the last few days.',
      ask_indirect: 'Read the docking board for anomalies in the arrival log.',
      ask_indirect_label: 'Check the docking board for arrival irregularities.',
      success_default: 'He names a shipment that did not match its declared manifest and explains what he did with the discrepancy — which was, he notes with some frustration, less than he thought appropriate. The irregularity is still active.',
      success_indirect: 'Two arrivals are logged within the same hour with the same declared cargo type. They arrived from different directions.',
      failure: 'He processes the standard docking inquiry and hands you the current route schedule.'
    },

    // ════ SHIRSHAL ════════════════════════════════════════════════════════════

    shirshal_harbor_factor: {
      id: 'shirshal_harbor_factor',
      name: 'Harbor Factor of Shirshal',
      polity: 'shirsh',
      locality: 'shirshal',
      tier: T2,
      dc: 12,
      skill: 'wits',
      agenda: 'Clear a consignment backlog that has stalled on document chain discrepancies — not because the paperwork is wrong, but because the wrong person signed it.',
      register: 'Shirshal harbor register — formal, information-precise, names the procedural category before the person, treats discretion as a professional standard rather than a preference.',
      tell: 'Aligns the manifest corner with the desk edge before reading it — a half-second adjustment, always the same corner, so the document sits square before the eyes touch it.',
      choice_label: 'Something about them reads useful. Worth a word.',
      intro_default: 'The harbor factor is at the intake counter with three manifests open and a fourth in her hand. She squares the corner of the document against the desk edge before reading it. You have seen people do this once. She has done it every time.',
      ask_direct: 'Ask which consignments are stalled and why the paperwork chain broke.',
      ask_direct_label: 'Ask which consignments are stuck in the intake queue.',
      ask_indirect: 'Scan the intake board for cargo whose clearance date has passed.',
      ask_indirect_label: 'Check the intake board for overdue clearances.',
      success_default: 'She names two consignments sitting outside the normal clearance window — both carrying the same third-party countersignature from a name she says carefully, once, and does not repeat. She says the consignments are not flagged. She says they should have cleared three days ago. She squares the manifest corner again and says she has noted the delay.',
      success_indirect: 'The intake board has a clearance code that does not match any standard Shirshal category. It was added within the last week. Someone created a new processing lane without posting the authority notice.',
      failure: 'She processes the standard inquiry and directs you to the Shirshal port registry, which opens at the second bell.'
    },

    shirshal_ward_registrar: {
      id: 'shirshal_ward_registrar',
      name: 'Ward Registrar of Shirshal',
      polity: 'shirsh',
      locality: 'shirshal',
      tier: T2,
      dc: 13,
      skill: 'wits',
      agenda: 'Maintain the ward fracture registry as a complete record against pressure from the Magi Magistratus office to classify certain incidents as procedural rather than anomalous.',
      register: 'Shirshal Magi Magistratus register — precise categorization, names the regulatory distinction before the fact, withholds inference while giving observation.',
      tell: 'When naming a document category, taps the relevant regulatory index on the shelf behind them with one finger — not consulting it, just locating it, as if the category requires the physical anchor of the rule that defines it.',
      choice_label: 'Something about them reads useful. Worth a word.',
      intro_default: 'The ward registrar is cross-referencing two filing logs at the registry counter — a procedure that should take minutes and appears to be taking considerably longer. He does not look up immediately. He taps the regulatory index on the shelf behind him with one finger and keeps reading.',
      ask_direct: 'Ask what the registry shows for recent ward-fracture incidents.',
      ask_direct_label: 'Ask what the anomaly registry shows for the last month.',
      ask_indirect: 'Read the open registry log on the counter.',
      ask_indirect_label: 'Read the registry log while he works.',
      success_default: 'He names a date range — not a case, a date range — during which three separate ward incidents were filed under a procedural category that does not appear in the standard registry index. He says the category was applied by a duty officer rotation he cannot currently account for. He says this is the accurate description of the record. He does not say what the accurate description implies.',
      success_indirect: 'The registry log has an entry column with no corresponding authority code. The entries in that column are dated across a two-week span. Whatever filed them had access to the registry but not to the standard intake form.',
      failure: 'The registry is maintained under Magi Magistratus access protocol. A formal review request through the oversight desk is the standard mechanism.'
    },

    // ════ SOREHEIM PROPER ════════════════════════════════════════════════════

    soreheim_supply_factor: {
      id: 'soreheim_supply_factor',
      name: 'Supply Factor of Soreheim Proper',
      polity: 'soreheim',
      locality: 'soreheim_proper',
      tier: T2,
      dc: 11,
      skill: 'wits',
      agenda: 'Surface a systematic allocation redirect before the next quarterly audit reveals it in a way that implicates the people who had no part in authorizing it.',
      register: 'Soreheim quota register — specifics before context, allocation numbers before names, presents problems as arithmetic before politics.',
      tell: 'Runs a finger down the allocation column before speaking, landing it on the figure being discussed — a habit from floor work, where pointing at a number meant you owned the conversation about it.',
      choice_label: 'Something about them reads useful. Worth a word.',
      intro_default: 'The supply factor is at the allocation counter running a finger down a column of figures. She stops on one and does not move from it. You have interrupted a calculation she was about to lose track of. She holds the number and looks at you.',
      ask_direct: 'Ask which allocation orders have been redirected in the current quarter.',
      ask_direct_label: 'Ask which allocation orders have been redirected this quarter.',
      ask_indirect: 'Read the allocation queue board for irregularities.',
      ask_indirect_label: 'Check the allocation queue board for anomalies.',
      success_default: 'She names a supply category — transit fuel, specifically — where the allocation queue shows orders being processed in a sequence that does not match the submission dates. The earliest requests are being serviced last. The ones moving to the top have a shared origin marker she has not been able to trace to a current ministry authorization. She puts her finger back on the figure and says: that is what the numbers say. She does not say who she thinks moved them.',
      success_indirect: 'The allocation board shows two queue entries with the same authorization code on different dates. Codes are not reused. One of them was filed after the authorization window it references had already closed.',
      failure: 'She completes the column and notes your inquiry for the quarter log. Allocation reviews go through the standard submission process.'
    },

    soreheim_road_warden: {
      id: 'soreheim_road_warden',
      name: 'Road Warden of Soreheim Proper',
      polity: 'soreheim',
      locality: 'soreheim_proper',
      tier: T2,
      dc: 12,
      skill: 'vigor',
      agenda: 'Get a formal record of the northern route irregularities into the Soreheim patrol log before the current ministry cycle closes and the window for formal notice expires.',
      register: 'Soreheim patrol register — route data before names, reports in the tense of observation rather than conclusion, flags discrepancies as operational concerns before regulatory ones.',
      tell: 'Folds the patrol chart at the same crease each time — a crease that marks the northern segment boundary, the part of the route where the irregularities cluster. The fold is a habit. The location of the fold is not random.',
      choice_label: 'Something about them reads useful. Worth a word.',
      intro_default: 'The road warden is at the patrol post checking a route chart against a transit log. He folds the chart at a crease near the top third — the northern segment — and holds it at that angle while he reads. You have seen this fold before. He has used the same one twice.',
      ask_direct: 'Ask what route irregularities he has been tracking on the northern segment.',
      ask_direct_label: 'Ask what he has been tracking on the northern routes.',
      ask_indirect: 'Read the patrol chart he has been folding at.',
      ask_indirect_label: 'Note what the patrol chart crease reveals about his focus.',
      success_default: 'He names four transit delays on the northern segment in the last eight days — two cargo, two personnel. The cargo delays have paperwork. The paperwork lists the delay cause as route inspection. He has checked the route. No inspection was scheduled. He says he has noted this in the patrol log. He says the patrol log is reviewed at the end of the ministry cycle, which is in eleven days. He folds the chart again at the same crease and does not say what he thinks will happen in eleven days.',
      success_indirect: 'The patrol chart has four transit markers circled in the northern segment — each circled in the same ink, each circled after the route notation was made, not during it. Someone reviewed the chart and marked specific points without documenting the review.',
      failure: 'He handles the standard transit inquiry and notes your passage in the patrol log. Northern route advisories are posted at the warden station if conditions warrant.'
    }

  };

  // ── Named threshold constants (Task 10.1 spec) ────────────────────────────
  var NPC_ACCESS_STANDING_T2 = 10;
  var NPC_ACCESS_STANDING_T3 = 20;
  var NPC_ACCESS_PROGRESS_T2 = 4;
  var NPC_ACCESS_PROGRESS_T3 = 7;
  var NPC_ACCESS_RENOWN_T2   = 3;
  var NPC_ACCESS_RENOWN_T3   = 6;

  // ── Public aliases (Task 10.1 API) ────────────────────────────────────────
  window.NPC_ACCESS_STANDING_T2 = NPC_ACCESS_STANDING_T2;
  window.NPC_ACCESS_STANDING_T3 = NPC_ACCESS_STANDING_T3;
  window.NPC_ACCESS_PROGRESS_T2 = NPC_ACCESS_PROGRESS_T2;
  window.NPC_ACCESS_PROGRESS_T3 = NPC_ACCESS_PROGRESS_T3;
  window.NPC_ACCESS_RENOWN_T2   = NPC_ACCESS_RENOWN_T2;
  window.NPC_ACCESS_RENOWN_T3   = NPC_ACCESS_RENOWN_T3;

  /** getNpcTierData(id) — returns NPC_LOOKUP entry or null */
  window.getNpcTierData = function (id) {
    return NPC_LOOKUP[id] || null;
  };

  /** canAccessNpc(id, G_obj) — lowercase alias matching Task 10.1 spec */
  window.canAccessNpc = function (id, G_obj) {
    var npc = NPC_LOOKUP[id];
    if (!npc) return true; // unknown NPCs always accessible
    // Use the existing gate logic via a temporary G swap if G_obj provided
    if (G_obj) {
      var saved = typeof G !== 'undefined' ? G : null;
      // Call through canAccessNPC which reads the module-scope G
      // For external G_obj, evaluate directly using the spec thresholds
      var tier = npc.tier || 1;
      if (tier <= 1) return true;
      var polity = npc.polity;
      var standing = (G_obj.factions && polity && G_obj.factions[polity] && G_obj.factions[polity].standing) || 0;
      var progress = G_obj.investigationProgress || 0;
      var renown   = G_obj.renown || 0;
      var ts = tier >= 3 ? NPC_ACCESS_STANDING_T3 : NPC_ACCESS_STANDING_T2;
      var tp = tier >= 3 ? NPC_ACCESS_PROGRESS_T3 : NPC_ACCESS_PROGRESS_T2;
      var tr = tier >= 3 ? NPC_ACCESS_RENOWN_T3   : NPC_ACCESS_RENOWN_T2;
      return standing >= ts || progress >= tp || renown >= tr;
    }
    return canAccessNPC(id);
  };

  /** escalateDC(id, G_obj) — +2 DC per prior attempt on this NPC */
  window.escalateDC = function (id, G_obj) {
    var flags = (G_obj && G_obj.flags) || (typeof G !== 'undefined' && G.flags) || {};
    var attempts = flags['npc_' + id + '_attempts'] || 0;
    return attempts * 2;
  };

  // ── Expose ─────────────────────────────────────────────────────────────────
  window.NPC_LOOKUP          = NPC_LOOKUP;
  window.openNPCEncounter    = openNPCEncounter;
  window.canAccessNPC        = canAccessNPC;
  window.buildNPCChoices     = buildNPCChoices;
  window.buildGenericNPCChoices = buildGenericNPCChoices;

  // Legacy helper used in encounter pools
  function openNPCEncounter(npcId) {
    var npc = NPC_LOOKUP[npcId];
    if (!npc) { _narrate('Encounter', 'No record found.', 'negative'); return; }
    // Direct encounter: narrate intro and mark accessed in one step
    var path = _accessPath(npc);
    if (npc.tier === T1 && path === null) {
      _narrate(npc.name, npc.name + ' does not receive unknown parties. Faction standing, case progress, or renown could change that.', 'negative');
      return;
    }
    var intro = (npc.tier === T1 && npc.intro && npc.intro[path])
      || npc.intro_default
      || ('You encounter ' + npc.name + '.');
    _narrate(npc.name, intro, 'neutral');
    _flags()['npc_' + npcId + '_accessed'] = true;
  }

})();
