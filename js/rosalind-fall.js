// Rosalind's Fall — Return to Shelk boss encounter
// Triggered: Stage 4, Shelkopolis, House Shelk Estate visit, !G.rosalindsfall

(function(){

  // ── NARRATION CONTENT ───────────────────────────────────────────────────────

  const INTRO_PANELS = [
    {
      title: 'The Beauty That Ruins the Room',
      body: `The transformation does not begin with monstrosity. It begins with perfection.

Rosalind turns at the center of the reception chamber. The shift in her is not sudden — it is a slow, deliberate unveiling, like a mask removed from the inside out. Her elven elegance does not collapse into horror. It intensifies. Her face becomes too composed, too flawlessly assembled to belong to any mortal register. Every line of her expression settles into something that was never human expression — command, patience, a poise so complete it reads as cruelty before any cruelty is done.

The horns rise like blasphemous ornament, swept back with aesthetic authority, as if they were always there and merely waiting for the room's permission to show themselves. Her wings unfurl — not with violence, not with brute mutation, but with the slow proprietary grace of something uncovering what it owns. They are enormous. They are beautiful. The silhouette they create above her is the silhouette of something that has never needed to hide.

She carries a barbed infernal whip in one hand. It does not move yet. She holds it with the patient casualness of someone who has not yet decided whether you require it. Her battle dress is short, black, ceremonially fitted — glossy as lacquered leather, aristocratic in its cut, ritualized rather than practical. It heightens her silhouette into something predatory and precise.

The chamber responds to her unveiling before she has spoken.

Shadows leak along the room's edges as if the walls are bleeding slowly inward. Under the nearest rug, dark wetness gathers in spreading patches. The candlelight shifts from illumination to stain — it touches surfaces but does not clean them. Polished wood along the mantlepiece discolors, darkens, begins to pulse with a faint, nauseating sheen. The curtains at the tall windows droop differently than they did moments ago. They hang like damp restraints. The decorative chains along the upper canopy framework rattle faintly, though there is no draft.

Rosalind looks at the room as if the room is remembering something.

She looks at you the same way.`,
      button: 'Continue'
    },
    {
      title: 'The Household Breaks',
      body: `The servants see it before you have time to name what you are seeing.

The first to break is the young attendant near the hearth. She does not scream. She stops blinking. Her hands drop to her sides and her mouth opens without producing sound, as if the act of witnessing Rosalind's unveiled form has consumed the machinery of language entirely. Beside her, a steward takes two sharp steps backward and then drops to his knees — not in reverence, not consciously, but as if his legs have made the decision without consulting the rest of him.

It moves through the room like a wave through standing water.

The chambermaids along the far wall begin to tremble. One claws at the inside of her own forearm with three stiff fingers, not hard enough to wound, hard enough to feel real. Another grips the edge of the side table until her knuckles shine. Two of the older attendants, veterans of long household service, look directly at Rosalind and their faces do something you do not have a word for — not terror alone, not desire alone, not devotion or revulsion but all of them simultaneously, layered into an expression that has no name because human faces were not built to hold it.

Memory is doing something terrible to all of them. Every kindness Rosalind ever performed has become unbearable. Every moment of warmth, every gesture of household consideration, every small grace now reads as predatory design executed in patience. Comfort and violation have become impossible to separate. The household knows this. It cannot un-know it.

Rosalind regards them with something that might be affection.

The walls know, too. Embroidered fabric along the upper panels darkens from within — no smoke, no flame, simply the color draining out and something darker seeping in to replace it. The wallpaper along the grand corridor entrance begins to bulge in slow pulses. Banisters slick over with black seepage that catches the dying candlelight and does not reflect it cleanly. Mirrors film over. In the largest portrait, the painted eyes of the third-generation Shelk patriarch disappear behind a spreading stain that moves like a slow tide across the canvas.

The drapery, the tassels, the waist cords, the bedding ties visible through the open inner door — all of it has begun to feel different. Not decorative. Restraining. As if the estate is learning a new purpose for its ornament.

Rosalind has not moved. She is corrupting the room by being present in it.`,
      button: 'Continue'
    },
    {
      title: 'The House Made Monstrous',
      body: `Then the household staff begin to change.

It is not instantaneous. It is worse than that. It is sequential, visible, and personal. The young attendant near the hearth straightens from her transfixed stillness and her arms lengthen. The steward on his knees lifts his head and his jaw sets in a way that does not match any human expression of devotion. The chambermaids' trembling stills into something rigid, purposeful, and no longer frightened. Domestic roles become claws. Comfort becomes ruin. Records become binding obedience. Courtesy becomes fiendish parody. What was a household is now an apparatus.

The corridors become slaughterways. The reception chamber becomes a kill space.

And through it all, the Shelk family flees.

Lady Isabella herself is the first through the inner door — she does not run, because running would require her legs to agree with each other, and they do not, and she stumbles through the torn carpets and shattered chamber screens at a half-fall, her composure broken in a way you have never seen it broken, her face turned back over her shoulder in an expression of absolute horror at something she cannot stop looking at. Lady Elowen follows behind her, one hand pressed over her eyes and the other reaching blindly for the doorframe, recoiling physically from Rosalind's unveiled silhouette as if proximity alone causes pain. Other Shelk family members pour through the side passage — minor cousins, attending relations, a visiting negotiator — all of them slipping through the black seepage now spreading across the floors, stumbling through infernal residue, unable to fully look away even as they flee, some of them breaking apart at the sight of familiar servants wearing borrowed fiendish shapes over faces they have known for years.

The estate looks like itself and does not. Blackness veins through the plaster. Floorboards split with tar-like shine along their grain. The chandeliers above the main hall drip dark residue onto the marble below, each drop landing with a faintly wet, grotesquely intimate sound. The walls appear not damaged but spiritually liquefied — their surfaces retaining their shapes while the meaning of their shapes has been replaced with something obscene. Chains are everywhere now: hanging from the broken beams, dragged through black seepage, wrapped across banisters, mirrors, screens, carved bedframes, and shattered furniture. Drapes twist and hang like veiling restraints. Fine fabrics cling to surfaces in a soaked, clinging way that has nothing to do with water. Noble ornament sags and drips and shines with black ruin. The estate is trying to become something else.

At the center of the collapsing estate, Vonalzo's Concubine opens her wings, her infernal whip drawing a slow arc through the tainted air, and the battle begins.`,
      button: 'Begin the Battle'
    }
  ];

  const INTERLUDES = [
    {
      id: 'interlude_1',
      title: 'The Chandelier Fall',
      body: `The ceiling comes apart overhead.

Infernal force ripples upward through the chamber in a concussive wave and the great chandelier — iron and crystal, three hundred candles, chain-linked to the ceiling beam above — tears free. It does not fall cleanly. It swings first, chains shrieking, crystal shattering outward in glittering arcs that become blades, before the central beam gives entirely and the whole mass comes down in a cascade of chain, burning oil, broken iron, and screaming glass.

Guards and servants scatter. Two are struck and go down. Black residue has leaked through the ceiling cracks above and now splatters across everything below — marble, silk, skin, the upturned faces of the fallen. The chandelier strikes the floor and bounces, shedding chain and crystal, and the burning oil spreads in a low, sick fire that chars the carpet black and eats the fine tasseling along the dais edge. The remaining chain lengths hang like wet restraints from the broken beam overhead, torn finery dangling among them, everything dripping.

You are directly beneath it.`,
      choices: [
        {label: 'Brace beneath the falling weight', skill: 'survival', displaySkill: 'Vigor'},
        {label: 'Dive through the collapsing light', skill: 'stealth', displaySkill: 'Fitness'},
        {label: 'Smash a path through timber and chain', skill: 'combat', displaySkill: 'Might'}
      ],
      successText: 'You clear the killing arc. When the chandelier settles, you are standing in the only clean space. The position is yours. Advantage secured.',
      failText: 'The weight catches you. Chain, crystal, and burning iron take their toll.',
      failDamage: 8,
      critFailDamage: 14
    },
    {
      id: 'interlude_2',
      title: 'The Corridor Closes',
      body: `The transformed attendants come from the side halls.

They do not charge — they pour, moving with the relentless unhurried pressure of something that has stopped needing to hurry. Lacquered furniture topples in the corridor ahead and behind. The tall display case cracks and falls. Curtains ignite from the spreading oil fire. Doors slam and jam — whether by infernal force or structural damage no longer matters. Broken carts and overturned screens choke the passage. The corridor has become a throat.

Black seepage crawls up the corridor walls and thickens on the floor, each step into it creating a sick adhesive resistance. Chain-linked display rods have pulled free from their fittings and drag across the floor through the slime, their trailing silk scarves and ribbon ties catching on broken furniture, making the passage feel cinched, constricting, as if the corridor itself is trying to bind you in place.

There is a line through this. It is narrowing.`,
      choices: [
        {label: 'Endure the crush and hold the line', skill: 'survival', displaySkill: 'Vigor'},
        {label: 'Slip through the narrowing gap', skill: 'stealth', displaySkill: 'Fitness'},
        {label: 'Break the blockage open', skill: 'combat', displaySkill: 'Might'}
      ],
      successText: 'You force the line. Footing regained. The transformed attendants are slowed and scattered.',
      failText: 'The corridor does not cooperate. You take damage and your spacing worsens.',
      failDamage: 9,
      critFailDamage: 15,
      critFailMinion: true
    },
    {
      id: 'interlude_3',
      title: 'The House Turns Intimate',
      body: `The estate weaponizes its own private history.

Mirrors flash — not reflection, memory. Family portraits open their painted eyes in wrong directions. Letters, seals, and ceremonial documents from the household archive burst from a broken cabinet and begin circling at eye height, their wax seals glowing. Personal garments, the hanging morning wear, the dressing cords, the bed hangings left folded in the open linen closet, all begin moving of their own accord — not violently, intimately, with the suggestion of hands that are not present. Darkness pulses behind every reflective surface, as if the house's private face is being turned outward.

The vanity drapes cling wetly to their frames. The dressing cords slither across the floorboards. Bed hangings from the inner rooms drag themselves around doorframes. Ribbons and hanging chains press themselves against walls in patterns that are not decorative. The room has become psychologically invasive in ways that no combat training addresses. It is fighting you through domestic familiarity. It wants you to remember being safe here.

You cannot afford to remember. You have to keep moving.`,
      choices: [
        {label: 'Stand through the psychic pressure and keep moving', skill: 'survival', displaySkill: 'Vigor'},
        {label: 'Duck and weave through the storm of debris and reflected sightlines', skill: 'stealth', displaySkill: 'Fitness'},
        {label: 'Tear down the choking obstacles and shatter the line of attack', skill: 'combat', displaySkill: 'Might'}
      ],
      successText: 'You push through. Her next action comes slower — you have disrupted her infernal rhythm.',
      failText: 'The house gets inside your head. You take damage. Disorientation lingers.',
      failDamage: 10,
      critFailDamage: 16,
      weakenBoss: true
    },
    {
      id: 'interlude_4',
      title: 'Final Chamber Break',
      body: `The estate tears itself apart.

Masonry shears from the upper wall in sheets. Stained glass from the clerestory explodes inward. A section of balcony rail gives way. Bedposts from the inner chamber split and punch through the doorframe. Carved screens collapse. Heavy fittings that have hung in place for generations drop from the walls and ceiling in a single sustained avalanche of noble material.

Corruption has reached full saturation. The walls are slick with black sludge — not wet in any natural sense but wet in the way that the estate is no longer holding its form. Noble ornament sags like softened wax. Chain lengths whip free from the split beams overhead, vanish beneath the slime, and reemerge slick and black and dragging. The floors are wet with ruin. The stairs are black. The silk runners are soaked. Thresholds are fouled. Everything that was beautiful in this house is now obscene with what saturated it.

It is trying to die around her. She will not let it finish until you are finished first.

At the center of it: Vonalzo's Concubine, wings spread, whip trailing through slime and shattered chain, her infernal poise now edged with ravenous hunger. She is not holding back anymore.

You force through it. You drive through the death of the house itself.`,
      choices: [
        {label: 'Hold through the collapse', skill: 'survival', displaySkill: 'Vigor'},
        {label: 'Break away from the killing arc', skill: 'stealth', displaySkill: 'Fitness'},
        {label: 'Drive through the debris and force the approach', skill: 'combat', displaySkill: 'Might'}
      ],
      successText: 'You force through. Final approach advantage secured. The house is dying. She is next.',
      failText: 'Heavy damage. The final combat begins under desperation pressure.',
      failDamage: 12,
      critFailDamage: 18
    }
  ];

  const CONCLUSION_PANELS = [
    {
      title: 'The Break in Perfection',
      body: `She does not die like a demon.

She dies like something that was made to be looked at, and is now unable to sustain the looking.

The final blow lands and the break begins in her face — not in her body, not in her wings, not in the whip falling from her hand, but in the absolute certainty of her expression. That certainty cracks. The composed poise, the patient grace, the weaponized calm — it fails, and without it, what remains is simply something that is losing. The infernal perfection gutters like a candle when its geometry collapses. Still beautiful. Collapsing. The distinction matters less than you expected.

Her wings falter — not dramatically, not with violence, but with the specific grief of something heavy no longer being held. They fold inward and downward and then simply hang, their span diminished, their terrible magnificence surrendering to gravity and failure. The horns dim. Not extinguished — dimmed, like a fire reduced to ember. The furnace-heat of her eyes cools in a way that is almost worse than her burning, because what remains of her gaze in that cooling is something that looks, briefly, at what it was.

Then that too goes.

Beauty fails. It does not become ordinary. It becomes nothing. And the chamber holds the afterimage of what had been standing in it.`
    },
    {
      title: 'The House Exhales Corruption',
      body: `The darkness does not vanish. It collapses.

The shadows that had been spreading from the walls since her first transformation — that patient, growing contamination of every surface — they do not withdraw cleanly. They fall. They descend from the walls, from the portraits, from the filmed-over mirrors and the veined plaster and the blighted drapery, descend without evaporating, downward rather than outward, losing coherence rather than leaving. The infernal saturation softens into failure. The room grows lighter not because light increases but because darkness stops insisting.

What replaces it is worse in its own way. The sludge is everywhere. Black, wet, thick with ruined matter — it coats the marble stairs, the silk runners, the remaining furniture, the shattered glass, the torn chains draped over the banisters and bedframes and collapsed ornament. It coats the dead. The floors hold it in every crack. Thresholds are fouled with it. The estate has been slimed by the remains of infernal saturation, and no amount of cleaning will fully account for what soaked in.

The transformed servants and attendants fall around the chamber in various states.

And as Vonalzo's Concubine's hold fails, the distortion that overwrote them begins to break apart. Borrowed fiendish shapes collapse from the bodies of the living and the dead alike. The terrible household forms — the service turned claws, the courtesy turned domination, the domestic role turned monstrous parody — they unpeel from the people beneath them. Surviving staff find themselves on the floor in their original uniforms, confused, weeping, some unable to stand. The dead — those the party was forced to cut through to reach the concubine — lie in the sludge in their original human forms. Not demons. Not infernal extensions. Household people. The chambermaids and stewards and clerks they had been before Rosalind's corruption overwrote them.

They look exactly as they would have looked if they had simply died.`
    },
    {
      title: 'The Violated Stillness',
      body: `This is what remains when noble intimacy is destroyed.

The surviving rooms stand emptied and fouled. The grand reception chamber, the corridor, the inner hall — all of them are present but not intact. Their proportions survive. Their purposes do not. The furniture that has not collapsed sits wrong, slightly off-level, as if the ground beneath it has shifted in ways too subtle to measure. Portraits that were not directly corrupted still hang, but the subjects in them look unfamiliar now, or look familiar in ways that are no longer comfortable. The mirrors that can still reflect do so without the quality of reflected light that made them mirrors rather than windows. The estate smells of burning oil and black seepage and something underneath both that has no name in any household record.

The local infernal heart is broken.

Vonalzo's Concubine was the node. She is gone. The corruption will not regenerate here. But Shelkopolis will carry what happened for longer than anyone in it will want to admit. The city already knows something. By morning it will know more. By the end of the week, it will have developed a way of not speaking about it that everyone will understand. The noble polish will remain. The safety underneath it will not. Districts tied to House Shelk will carry this stain — some spaces shuttered, some over-cleaned, some quietly abandoned. Black residue will linger in select places even after the official cleanup concludes.

You leave with proof. The House Shelk infernal heart shard is proof.

You do not leave with comfort. What happened here was not a heroic event inside a house. It was the death of the privacy that made the house itself. What the party fought through was the collapse of noble intimacy, exposed, fouled, and ended in front of witnesses who will spend the rest of their lives trying to describe it without succeeding.

The run continues.

Shelkopolis will not be the same place you arrived in. You were there when it stopped being that place.`,
      button: 'Continue'
    }
  ];

  const SPECIAL_MOMENTS = [
    {label:'Avert your gaze and strike by instinct', tags:['Tactical','Instinct']},
    {label:'Call to a collapsing servant to break the trance', tags:['Tactical','Voice']},
    {label:'Drive for the wings before she rises again', tags:['Tactical','Aggressive']},
    {label:'Use shattered furniture for cover', tags:['Tactical','Cover']},
    {label:'Break the binding clerk-form before it reaches the rear line', tags:['Tactical','Priority']}
  ];

  const DEFEAT_NARRATION = `The run ends in the collapsing estate of House Shelk.

Vonalzo's Concubine stands over what remains and does not look satisfied. She looks patient. She has always been patient. The house seeps and drips and sags around her, and the darkness expands back into all the spaces the party occupied, and the infernal whip arcs slowly through the black air, and the ledger closes here.

There is no rescue from this. There is no one to carry you out of this.

The run is over.`;

  // ── BOSS DEFINITION ─────────────────────────────────────────────────────────

  const ROSALIND_BOSS = {
    id: 'vonalzos_concubine',
    name: "Vonalzo's Concubine",
    tier: 'boss',
    hp: 72,
    maxHp: 72,
    attack: 8,
    defense: 8,
    morale: 99,
    desc: "Infernal perfection weaponized through beauty, shame, intimacy, obedience, dark sensuality, and ritualized domination.",
    loot: {gold: 0, item: 'House Shelk Infernal Heart Shard'}
  };

  const MINIONS = [
    {id:'shattered_chambermaid', name:'Shattered Chambermaid', hp:14, maxHp:14, attack:5, defense:4, desc:'Silk-gloved hands now tear. Her household face has not fully left. It makes her worse.', loot:{gold:0,item:null}},
    {id:'obedient_steward', name:'Obedient Steward', hp:16, maxHp:16, attack:4, defense:5, desc:'He bows before he acts. The bow is the only thing that survives of him.', loot:{gold:0,item:null}},
    {id:'ribbon_clerk', name:'Ribbon Clerk', hp:12, maxHp:12, attack:6, defense:3, desc:'The records she carried became binding chains. She moves through them like water through constraint.', loot:{gold:0,item:null}},
    {id:'house_attendant_hollow', name:'House Attendant Hollow', hp:18, maxHp:18, attack:3, defense:6, desc:'Whatever was inside him has been replaced with complete, hollow service. He does not stop.', loot:{gold:0,item:null}}
  ];

  // ── PHASE THRESHOLDS ─────────────────────────────────────────────────────────
  // Combat phase 1: 72→55, then interlude_1
  // Combat phase 2: 54→37, then interlude_2
  // Combat phase 3: 36→19, then interlude_3
  // Combat phase 4: 18→0, then victory

  const HP_THRESHOLDS = [54, 36, 18]; // drop BELOW these → interlude

  // ── CORE FUNCTIONS ───────────────────────────────────────────────────────────

  function startEncounter(G){
    G.rosalindsEncounter = {
      phase: 'intro_1',
      combatPhase: 1,
      tacticalBoost: 0,
      specialMomentRound: 2, // first special moment at round 2
      bossHpPersist: 72,     // tracks boss HP across phase transitions
      defeated: false
    };
  }

  function getBossHp(G){
    if(G.combatSession && G.combatSession.enemies && G.combatSession.enemies.length){
      return G.combatSession.enemies[0].hp;
    }
    return G.rosalindsEncounter ? G.rosalindsEncounter.bossHpPersist : 72;
  }

  function startBossCombat(G){
    const re = G.rosalindsEncounter;
    const persistHp = re ? re.bossHpPersist : ROSALIND_BOSS.hp;
    G.combatSession = {
      enemyName: ROSALIND_BOSS.name,
      enemyHp: persistHp,
      enemyMaxHp: ROSALIND_BOSS.maxHp,
      enemyAttack: ROSALIND_BOSS.attack,
      enemyDefense: ROSALIND_BOSS.defense,
      enemyMorale: ROSALIND_BOSS.morale,
      tier: 'boss',
      isBoss: true,
      isRosalind: true,
      round: 1,
      log: [`${ROSALIND_BOSS.desc} The infernal whip draws its first arc.`],
      distance: 'medium',
      loot: ROSALIND_BOSS.loot,
      resolved: false,
      tacticalInitialized: false,
      playerInitiated: true,
      stealthOpenerAvailable: false
    };
    if(!G.abilityUsage) G.abilityUsage = {perScene:{},perDay:{}};
    G.abilityUsage.perScene = {};
    G.lastResult = `${ROSALIND_BOSS.desc} The chamber collapses around her. Choose your approach.`;
  }

  function checkPhaseTransition(G){
    if(!G.rosalindsEncounter || G.rosalindsEncounter.phase !== 'combat') return false;
    if(!G.combatSession || G.combatSession.resolved) return false;

    const bossHp = getBossHp(G);
    const combatPhase = G.rosalindsEncounter.combatPhase;

    // Save current boss HP
    if(G.combatSession.enemies && G.combatSession.enemies.length){
      G.rosalindsEncounter.bossHpPersist = G.combatSession.enemies[0].hp;
    }

    // Check if threshold crossed
    if(combatPhase <= 3 && bossHp <= HP_THRESHOLDS[combatPhase - 1]){
      G.rosalindsEncounter.combatPhase++;
      G.rosalindsEncounter.phase = `interlude_${combatPhase}`;
      G.combatSession = null; // pause combat
      return true;
    }
    return false;
  }

  function renderRosalindsPanel(G){
    const el = document.getElementById('choices');
    if(!el) return;

    const re = G.rosalindsEncounter;
    if(!re) return;
    const phase = re.phase;

    // INTRO PANELS
    if(phase.startsWith('intro_')){
      const idx = parseInt(phase.split('_')[1]) - 1;
      const panel = INTRO_PANELS[idx];
      if(!panel) return;

      el.innerHTML = `<div class='rosalindsPanel'>
        <div class='rosalindsPanelTitle'>${panel.title}</div>
        <div class='rosalindsPanelBody'>${panel.body.replace(/\n\n/g,"<br><br>").replace(/\n/g," ")}</div>
        <button class='rosalindsContinueBtn' id='rosalindsNext'>${panel.button}</button>
      </div>`;

      document.getElementById('rosalindsNext').onclick = function(){
        const nextIdx = idx + 1;
        if(nextIdx < INTRO_PANELS.length){
          G.rosalindsEncounter.phase = `intro_${nextIdx + 1}`;
        } else {
          // Start combat
          G.rosalindsEncounter.phase = 'combat';
          startBossCombat(G);
        }
        window._rosalindsRender && window._rosalindsRender();
      };
      return;
    }

    // ENVIRONMENTAL INTERLUDES
    if(phase.startsWith('interlude_')){
      const idx = parseInt(phase.split('_')[1]) - 1;
      const interlude = INTERLUDES[idx];
      if(!interlude) return;

      const dc = 12 + G.rosalindsEncounter.combatPhase; // escalating difficulty

      el.innerHTML = `<div class='rosalindsPanel rosalindsInterlude'>
        <div class='rosalindsInterludeLabel'>Environmental Crisis</div>
        <div class='rosalindsPanelTitle'>${interlude.title}</div>
        <div class='rosalindsPanelBody'>${interlude.body.replace(/\n\n/g,"<br><br>").replace(/\n/g," ")}</div>
        <div class='rosalindsInterludeChoices'>
          ${interlude.choices.map((c,i)=>`<button class='rosalindsInterludeBtn' id='riBtn${i}'>
            <span class='riLabel'>${c.label}</span>
            <span class='riSkill'>${c.displaySkill} (${c.skill})</span>
          </button>`).join('')}
        </div>
      </div>`;

      interlude.choices.forEach((c, i) => {
        document.getElementById(`riBtn${i}`).onclick = function(){
          resolveInterlude(G, interlude, c, dc);
          window._rosalindsRender && window._rosalindsRender();
        };
      });
      return;
    }

    // CONCLUSION PANELS
    if(phase.startsWith('conclusion_')){
      const idx = parseInt(phase.split('_')[1]) - 1;
      const panel = CONCLUSION_PANELS[idx];
      if(!panel) return;

      el.innerHTML = `<div class='rosalindsPanel rosalindsConclude'>
        <div class='rosalindsVictoryLabel'>Victory — The Concubine Falls</div>
        <div class='rosalindsPanelTitle'>${panel.title}</div>
        <div class='rosalindsPanelBody'>${panel.body.replace(/\n\n/g,"<br><br>").replace(/\n/g," ")}</div>
        <button class='rosalindsContinueBtn' id='rosalindsNext'>Continue</button>
      </div>`;

      document.getElementById('rosalindsNext').onclick = function(){
        const nextIdx = idx + 1;
        if(nextIdx < CONCLUSION_PANELS.length){
          G.rosalindsEncounter.phase = `conclusion_${nextIdx + 1}`;
        } else {
          // Encounter complete
          G.rosalindsEncounter.phase = 'complete';
          G.rosalindsfall = true;
          G.shelkDarkened = true;
          G.inventory && G.inventory.unshift({name:'House Shelk Infernal Heart Shard', text:'The crystallized remnant of an infernal node. Evidence that cannot be explained away.', slot:'misc', cost:0});
          G.rosalindsEncounter = null;
          window._rosalindsAddNotice && window._rosalindsAddNotice('Rosalind\'s Fall complete. Shelkopolis will not recover its former tone. The heart shard has been added to your inventory.');
        }
        window._rosalindsRender && window._rosalindsRender();
      };
      return;
    }

    // DEFEAT PANEL
    if(phase === 'defeat'){
      el.innerHTML = `<div class='rosalindsPanel rosalindsDefeat'>
        <div class='rosalindsDefeatLabel'>The Run Ends</div>
        <div class='rosalindsPanelBody'>${DEFEAT_NARRATION.replace(/\n\n/g,"<br><br>").replace(/\n/g," ")}</div>
        <button class='rosalindsContinueBtn' id='rosalindsDefeatEnd'>Return to Start</button>
      </div>`;

      document.getElementById('rosalindsDefeatEnd').onclick = function(){
        if(window.showStart) window.showStart();
        else { G.rosalindsEncounter = null; window._rosalindsRender && window._rosalindsRender(); }
      };
    }
  }

  function resolveInterlude(G, interlude, choice, dc){
    const G_skills = G.skills || {};
    const bonuses = (G_skills[choice.skill] || 0) + Math.floor(G.level / 3);
    const die = 1 + Math.floor(Math.random() * 20);
    const statKey = {survival:'vigor', stealth:'finesse', combat:'might'}[choice.skill];
    const statVal = (G.stats && G.stats[statKey]) || 1;
    const statMod = Math.floor((statVal - 1) / 2);
    const total = die + bonuses + statMod;
    const isCrit = die === 20;
    const isFumble = die === 1;
    const success = isCrit || (total >= dc && !isFumble);

    G.lastRoll = {action: choice.label, skill: choice.skill, total, target: dc, success, die, crit: isCrit, fumble: isFumble};

    if(isCrit){
      // Critical success: full damage avoidance + boss weakened for next round
      G.rosalindsEncounter.tacticalBoost = Math.ceil(G.level * 0.1) + 1;
      G.lastResult = `CRITICAL — ${interlude.successText} Your nerve is absolute. Next round combat boost applied.`;
      window._rosalindsAddNotice && window._rosalindsAddNotice(`Critical interlude success — tactical boost for next round.`);
    } else if(isFumble){
      const dmg = interlude.critFailDamage || interlude.failDamage + 4;
      G.hp = Math.max(0, G.hp - dmg);
      G.lastResult = `FUMBLE — ${interlude.failText} You take ${dmg} damage (HP: ${G.hp}/${G.maxHp}).`;
      if(interlude.critFailMinion){
        // Summon a minion into the next combat session (tracked as flag)
        G.rosalindsEncounter.pendingMinion = true;
      }
      window._rosalindsAddNotice && window._rosalindsAddNotice(`Critical fumble on environmental crisis — ${dmg} damage.`);
    } else if(success){
      G.rosalindsEncounter.tacticalBoost = Math.ceil(G.level * 0.1);
      G.lastResult = interlude.successText + ` Positional advantage for next combat phase.`;
      if(interlude.weakenBoss) G.rosalindsEncounter.bossWeakenedNextPhase = true;
    } else {
      const dmg = interlude.failDamage;
      G.hp = Math.max(0, G.hp - dmg);
      G.lastResult = interlude.failText + ` You take ${dmg} damage (HP: ${G.hp}/${G.maxHp}).`;
    }

    // Check player death
    if(G.hp <= 0){
      G.rosalindsEncounter.phase = 'defeat';
      return;
    }

    // Return to combat
    G.rosalindsEncounter.phase = 'combat';
    startBossCombat(G);

    // Apply interlude outcomes to fresh combat session
    if(G.rosalindsEncounter.tacticalBoost > 0 && G.combatSession){
      G.combatSession.rosalindsBoost = G.rosalindsEncounter.tacticalBoost;
    }
    if(G.rosalindsEncounter.bossWeakenedNextPhase && G.combatSession && G.combatSession.enemies && G.combatSession.enemies.length){
      // Will be applied after initTacticalCombat runs — flag it
      G.combatSession.bossWeakened = true;
      G.rosalindsEncounter.bossWeakenedNextPhase = false;
    }
    if(G.rosalindsEncounter.pendingMinion && G.combatSession){
      G.combatSession.pendingMinionSpawn = true;
      G.rosalindsEncounter.pendingMinion = false;
    }
  }

  function handleRosalindsVictory(G){
    G.combatSession = null;
    G.rosalindsEncounter.phase = 'conclusion_1';
  }

  function handleRosalindsDefeat(G){
    G.combatSession = null;
    G.rosalindsEncounter.phase = 'defeat';
  }

  function injectSpecialMoment(G, baseChoices){
    const re = G.rosalindsEncounter;
    if(!re || re.phase !== 'combat' || !G.combatSession) return baseChoices;

    const round = G.combatSession.round || 1;
    if(round < (re.specialMomentRound || 2)) return baseChoices;

    // Show a special moment every 2 rounds
    if((round % 2) !== 0) return baseChoices;

    const momentIdx = Math.floor(round / 2) % SPECIAL_MOMENTS.length;
    const moment = SPECIAL_MOMENTS[momentIdx];

    const specialChoice = {
      label: moment.label,
      tags: [...moment.tags, 'Special'],
      fn: function(){
        const die = 1 + Math.floor(Math.random() * 20);
        const combatBonus = (G.skills && G.skills.combat) || 0;
        const mightVal = (G.stats && G.stats.might) || 1;
        const mightMod = Math.floor((mightVal - 1) / 2);
        const total = die + combatBonus + mightMod;
        const success = die === 20 || (total >= 13 && die !== 1);

        if(success){
          const boost = Math.max(2, Math.ceil(G.level * 0.1));
          re.tacticalBoost = boost;
          if(G.combatSession) G.combatSession.rosalindsBoost = boost;
          G.lastResult = `Regained nerve. ${moment.label} — you force an opening in her infernal rhythm. +${boost} to next round's combat values.`;
          window._rosalindsAddNotice && window._rosalindsAddNotice(`Special moment succeeded — tactical boost ${boost} applied.`);
        } else {
          G.lastResult = `${moment.label} — the attempt fails to land. The concubine's rhythm does not break.`;
        }
        re.specialMomentRound = round + 2; // next special moment 2 rounds later
        if(window._rosalindsRender) window._rosalindsRender();
      }
    };

    return [specialChoice, ...baseChoices];
  }

  // ── SHELKOPOLIS AFTERMATH NARRATION ─────────────────────────────────────────

  function shelkDarkenedNarrative(G, baseText){
    if(!G.shelkDarkened) return baseText;
    return baseText + `

The city has not recovered and will not. Districts near House Shelk feel stained — some spaces shuttered, some over-cleaned, some abandoned mid-project. Black residue lingers in corners that workers have cleaned three times now. The noble polish remains in Shelkopolis's public face. The sense of safety underneath it does not. People here know something happened. They have all agreed, without discussing it, not to name it precisely. The agreeing shows.`;
  }

  // ── PUBLIC API ───────────────────────────────────────────────────────────────

  window.startRosalindsEncounter = startRosalindsEncounter;
  window.renderRosalindsPanel = renderRosalindsPanel;
  window.checkRosalindsPhase = checkPhaseTransition;
  window.handleRosalindsVictory = handleRosalindsVictory;
  window.handleRosalindsDefeat = handleRosalindsDefeat;
  window.injectRosalindsSpecialMoment = injectSpecialMoment;
  window.shelkDarkenedNarrative = shelkDarkenedNarrative;

  function startRosalindsEncounter(G){ startEncounter(G); }

  // Tactical boost application — called from combat-ui's resolveCombatRound hook
  window.getRosalindsBoost = function(G){
    if(!G.rosalindsEncounter) return 0;
    const boost = G.combatSession && G.combatSession.rosalindsBoost ? G.combatSession.rosalindsBoost : 0;
    if(boost && G.combatSession) G.combatSession.rosalindsBoost = 0; // consume
    return boost;
  };

})();
