// Stage I Boss Encounters
// Mini-boss: Roadwarden Lieutenant Perrin Gleam — triggers at stageProgress[1] >= 8
// Main boss: Marshal Sera Ironveil — triggers at stageProgress[1] >= 15

var STAGE1_BOSS_NPC_MINIBOSS = 'roadwarden_lieutenant_perrin_gleam';
var STAGE1_BOSS_NPC_MAIN = 'marshal_sera_ironveil';

// Build-up seed choices — inject into enriched choice pool when stageProgress[1] >= 3
window.STAGE1_MINIBOSS_SEED_CHOICES = [
  {
    id: 'stage1_boss_seed_1',
    text: 'The same warden has been at two different checkpoints this week.',
    tag: 'risky',
    skill: 'lore',
    dc: 12,
    locality: null,
    stageMin: 'Stage I',
    onSuccess: function() {
      G.flags.stage1_miniboss_seeded_1 = true;
      addNarration('A Pattern at the Gates', 'The lieutenant is lean, road-worn, and positioned slightly wrong — not watching the gate traffic but scanning the faces behind it. His coat bears House Shelk markings but the insignia has been re-stitched recently, the thread still bright against the faded cloth. He notes you noting him. His hand drops to his belt, then rises again without touching anything. He moves on. The checkpoint log on the post beside him has your arrival time written twice.');
      addJournal('A roadwarden lieutenant has appeared at multiple checkpoints. His insignia was recently altered. He clocked my arrival.', 'intelligence');
    },
    onFail: function() {
      addNarration('', 'The warden passes without incident. The checkpoint clears. If there was something off about the timing, it does not surface until later.');
    }
  },
  {
    id: 'stage1_boss_seed_2',
    text: 'Someone has been asking the innkeeper questions about my movements.',
    tag: 'risky',
    skill: 'survival',
    dc: 12,
    locality: null,
    stageMin: 'Stage I',
    onSuccess: function() {
      G.flags.stage1_miniboss_seeded_2 = true;
      addNarration('Secondhand Pressure', 'The innkeeper does not quite meet your eye when she slides the key across the counter. "A warden came by," she says, voice flat. "Road registry check. They do them." She sets a cloth down and wipes something off the wood that is not there. The registry book is still open on the shelf behind her — your page, with a small fold at the corner that was not there yesterday. Whoever read it handled it carefully. Professionally.');
      addJournal('A roadwarden lieutenant has been checking lodging registries for my movements. Deliberate, not routine.', 'evidence');
    },
    onFail: function() {
      addNarration('', 'The innkeeper seems distracted. Whatever questions were asked, the answers stay behind her eyes.');
    }
  }
];

// Mini-boss encounter — triggers at stageProgress[1] >= 8, at least 1 seed seen
function triggerStage1MiniBoss() {
  if (!G || G.flags.stage1_miniboss_complete) return;

  addNarration('Roadwarden Lieutenant Perrin Gleam', 'He is waiting at the end of the alley, not blocking it — standing just off the line of foot traffic, arms loose, close enough that stepping around him would be deliberate. His road-coat is dry despite the weather. He watched you come in from the south gate and he did not follow you; he arrived here first. His thumb finds the edge of his belt-buckle and runs along it, back and forth, without pressure. "You have been busy," he says. The road behind you has emptied.');

  var choices = [
    {
      text: 'He is running out of time on something. Push that thread.',
      tag: 'risky',
      skill: 'persuasion',
      action: function() {
        var roll = rollD20('persuasion');
        var dc = 13 + Math.floor(((G.level||1)-1)/2);
        if (roll.total >= dc) {
          addNarration('', 'The buckle-tracing stops. You name the pressure directly — the re-stitched insignia, the doubled registry entries, the debt or promise or fear that is driving a roadwarden lieutenant to do something a roadwarden lieutenant should not be doing. His jaw tightens. Then loosens. He does not deny it. He tells you the name of who sent him, which is more than he intended, and steps back. The alley opens. He turns and walks north without looking back.');
          addJournal('Gleam confirmed he was dispatched by someone above his station to track my movements. He named the authority behind it before he left.', 'intelligence');
          G.flags.stage1_miniboss_talked = true;
          G.flags.stage1_miniboss_complete = true;
          G.stageProgress[1] = (G.stageProgress[1]||0) + 2;
          setTimeout(function() { resolveArrival(G.location); }, 1200);
        } else {
          addNarration('', 'His expression closes off. The buckle-tracing stops, but not because you reached him — because you overplayed it. He straightens and draws the baton from his coat ring. "That is not how this goes."');
          setTimeout(function() { _stage1MiniBossFight(); }, 800);
        }
      }
    },
    {
      text: 'He will not walk away from this without a cost.',
      tag: 'bold',
      skill: 'combat',
      action: function() { _stage1MiniBossFight(); }
    },
    {
      text: 'The alley has a second exit and he has not sealed it yet.',
      tag: 'risky',
      skill: 'stealth',
      action: function() {
        var roll = rollD20('stealth');
        var dc = 12 + Math.floor(((G.level||1)-1)/2);
        if (roll.total >= dc) {
          addNarration('', 'You move before he has finished his sentence. The second exit is a low arch into a cooper\'s yard; you are through it and across the yard and into the lane behind before he clears the alley mouth. When you look back from the far end of the street, he is standing at the arch. He does not chase. He marks something in a small book with a silver-capped pencil. He already has what he needed — your face, confirmed.');
          G.flags.stage1_miniboss_fled = true;
          G.flags.stage1_miniboss_complete = true;
          setTimeout(function() { resolveArrival(G.location); }, 1000);
        } else {
          addNarration('', 'He anticipated the second exit. He is already there, baton in hand, blocking the arch. "I know all the yards in this district," he says. There is no pleasure in it.');
          setTimeout(function() { _stage1MiniBossFight(); }, 800);
        }
      }
    }
  ];

  setTimeout(function() { renderChoices(choices); }, 600);
}

function _stage1MiniBossFight() {
  var miniBossEnemy = {
    id: STAGE1_BOSS_NPC_MINIBOSS,
    name: 'Roadwarden Lt. Perrin Gleam',
    hp: 35, maxHp: 35,
    attack: 7, defense: 8,
    morale: 100,
    desc: 'Gleam fights economically — baton and a short blade, no wasted movement. He uses corners and the narrow space deliberately, minimizing your angles.',
    loot: [{name: 'Silver Registry Pencil', type: 'tool', effect: {lore: 1}, desc: 'A roadwarden\'s marking tool. Someone\'s initials are scratched off the clip end.'}],
    noRetreat: true,
    onDefeat: function() {
      G.flags.stage1_miniboss_defeated = true;
      G.flags.stage1_miniboss_complete = true;
      G.stageProgress[1] = (G.stageProgress[1]||0) + 3;
      addJournal('Gleam was operating under orders from above — a House Shelk seal on the dispatch he carried. Someone with ORE access was running him.', 'evidence');
    }
  };
  enterCombat(STAGE1_BOSS_NPC_MINIBOSS, { customEnemy: miniBossEnemy, noRetreat: true });
}

// Main boss encounter — triggers at stageProgress[1] >= 15, miniboss complete
function triggerStage1MainBoss() {
  if (!G || G.flags.stage1_mainboss_complete) return;

  addNarration('Marshal Sera Ironveil', 'The Intake Hall at the Iron Ledger Ward is not busy but it feels full — the presence of procedural weight, every surface marked, every shelf ordered. Marshal Sera Ironveil is at the central desk when you arrive, and she looks up once and back down before you have reached the rail. Her inspection lamp sits on the corner of the desk at a precise angle. Her silver-scale insignia has not been polished recently but the leather beneath it has been. She sets her pen parallel to the desk edge before she speaks. When she speaks, she does not raise her voice and she does not look up from the page. "Close the door behind you. There is no window in this interview."');

  var setupChoices = [
    {
      text: 'Everything here is already in her files. Read what she has read.',
      tag: 'safe',
      skill: 'lore',
      action: function() {
        var roll = rollD20('lore');
        if (roll.total >= 10) {
          addNarration('', 'The desk tells you what the room means. The document she set squarely at the corner when you walked in is a detainment notice, unsigned. The lamp is angled toward the chair across from her, not toward her own work. The shelf behind her has a gap where a file should be — a file she pulled before you arrived. She has been preparing for this longer than you have.');
          G.flags.stage1_mainboss_assessed = true;
          setTimeout(function() { _stage1MainBossPhase2(); }, 800);
        } else {
          addNarration('', 'The room gives back nothing useful fast enough. She has already looked up. "Sit down," she says. The lamp moves fractionally toward you.');
          setTimeout(function() { _stage1MainBossPhase2(); }, 800);
        }
      }
    },
    {
      text: 'The detainment notice needs a signature. She has not signed it yet.',
      tag: 'risky',
      skill: 'combat',
      action: function() {
        addNarration('', 'You move before the pleasantries. The notice is off the desk and in your coat in the time it takes her to stand. She stands without urgency. "That document is already in registry," she says. "Removing it changes nothing. It also confirms everything I was not certain of." Her lamp swings on its hook as she comes around the desk. The disadvantage is yours now.');
        setTimeout(function() { _stage1MainBossCombat(true); }, 800);
      }
    }
  ];

  setTimeout(function() { renderChoices(setupChoices); }, 600);
}

function _stage1MainBossPhase2() {
  addNarration('', 'She sets the pen down parallel to the desk edge — a reset she does before every sentence that carries weight. "You have been disrupting something that was already disrupted before you arrived. The question I have is whether you are a symptom or a cause." She opens the pulled file and turns it to face you without looking at your reaction. Your name is at the top. Below it, four weeks of movements, lodge registries, checkpoint records, and a red notation beside the Iron Ledger Ward entry: Tier 1 review pending. "This escalates today. Unless you give me a reason to hold the flag." Her index finger has come to rest on the red notation — not pointing at it, covering it, as if she does not want to read the word again. The lamp angle has not changed. She does not need you to be guilty — she needs the file to close.');
  setTimeout(function() { _stage1MainBossCombat(false); }, 1000);
}

function _stage1MainBossCombat(aggressive) {
  var bossEnemy = {
    id: STAGE1_BOSS_NPC_MAIN,
    name: 'Marshal Sera Ironveil',
    hp: aggressive ? 40 : 45,
    maxHp: aggressive ? 40 : 45,
    attack: 9, defense: 10,
    morale: 100,
    desc: 'Ironveil fights with the lamp and a short enforcement blade. She uses the desk as terrain and forces you into the narrow intake lane. At half health she calls for the ward lock — the room seals and she fights without retreat pressure.',
    loot: [{name: 'ORE Intake Seal', type: 'tool', effect: {lore: 2}, desc: 'The silver intake-marshal seal. Carries ORE authority in the Iron Ledger Ward.'}],
    noRetreat: true,
    hpThreshold: 0.5,
    onPhaseChange: function() {
      addNarration('', 'She drives the lamp into its wall bracket and the room flares bright. "Ward lock." Her voice carries no alarm in it — procedure, not panic. The blade clears the scabbard and she comes forward without hesitation.');
      if (typeof CS !== 'undefined' && CS && CS.enemy) {
        CS.enemy.attack = (CS.enemy.attack || 9) + 2;
      }
    },
    onDefeat: function() {
      G.flags.stage1_mainboss_defeated = true;
      G.flags.stage1_mainboss_complete = true;
      G.flags.stage1_narrative_complete = true;
      G.stageProgress[1] = Math.max(G.stageProgress[1]||0, 18);
      G.renown = (G.renown||0) + 10;
      addJournal('The pulled file contained records of forged permits traced through three different localities — all routed through ORE intake. Ironveil knew the pattern and was managing it, not stopping it.', 'evidence');
      setTimeout(function() { _stage1MainBossResolution(); }, 1200);
    }
  };
  enterCombat(STAGE1_BOSS_NPC_MAIN, { customEnemy: bossEnemy, noRetreat: true });
}

function _stage1MainBossResolution() {
  addNarration('After the Hall', 'The lamp is still burning — still angled at the chair across from the desk, not at the work surface. She positioned it for an interview that is now over. The intake desk is undisturbed except for the file, which is still open to your name. Three other files are visible beneath it in the pulled stack — different names, same red notation. Tier 1 review pending, in the same hand, dated weeks apart. The detainment notice on the floor has no signature. She never intended to sign it. The ward lock will hold for another few minutes before the automatic release cycles. The room smells of hot lamp oil and wax.');

  var resChoices = [
    {
      text: 'Those files go with me. All of them.',
      tag: 'safe',
      skill: 'lore',
      action: function() {
        addNarration('', 'You pull the stack and run a fast count: four files besides your own, each with the red notation, each covering a different locality and a different set of movements. The dates span eight months. Someone was running a long review. The files go inside your coat. The desk looks orderly when you are done with it — absent, but orderly.');
        addJournal('Secured four ORE intake files: each bearing a Tier 1 review notation in the same hand across eight months. This is a coordinated pattern, not individual enforcement.', 'evidence');
        G.stageProgress[1] = Math.max(G.stageProgress[1]||0, 20);
        setTimeout(function() { resolveArrival(G.location); }, 1000);
      }
    },
    {
      text: 'Leave no trace that the files were touched.',
      tag: 'risky',
      skill: 'stealth',
      action: function() {
        var roll = rollD20('stealth');
        if (roll.total >= 12) {
          addNarration('', 'You read the files without moving them. The dates, names, and notations are committed to memory. The stack goes back in the order it came. The ward lock cycles and releases and you are at the door before the latch finishes turning. The hall outside is empty. You leave nothing in the room that was not there when you arrived.');
          addJournal('Memorized four ORE intake files — same Tier 1 notation, same handwriting, spanning eight months and three localities. Left the hall clean.', 'intelligence');
        } else {
          addNarration('', 'You read what you can before the lock releases. Three of the four files, partial dates — enough to confirm the shape of it but not the names. The door opens before you finish the fourth. You move.');
          addJournal('Partial read on intake files before exit — confirmed a multi-locality pattern in the Tier 1 reviews, but missed the fourth name.', 'intelligence');
        }
        G.stageProgress[1] = Math.max(G.stageProgress[1]||0, 20);
        setTimeout(function() { resolveArrival(G.location); }, 1000);
      }
    },
    {
      text: 'Someone outside this hall should know the files exist.',
      tag: 'risky',
      skill: 'persuasion',
      action: function() {
        addNarration('', 'You pull the topmost file — your own — and leave the others. Your name goes back in the stack facing outward where the next intake clerk will see it. On the desk you place a single line on intake-form paper: Four files. Same notation. Ask who made them. You do not sign it. The ward lock releases. In the hall, a clerk is already heading for the door. They will find the room. They will find the note. What they do with it is theirs to decide.');
        addJournal('Left a marker in the intake hall pointing toward the file stack. A clerk or registry warden will find it. The choice of what to do with it is no longer only mine.', 'complication');
        G.stageProgress[1] = Math.max(G.stageProgress[1]||0, 20);
        setTimeout(function() { resolveArrival(G.location); }, 1000);
      }
    }
  ];

  setTimeout(function() { renderChoices(resChoices); }, 600);
}

// Trigger check — call from checkStageAdvance or locality arrival
function checkStage1BossTriggered() {
  if (!G || G.stage !== 'Stage I') return;
  if (!G.flags.stage1_miniboss_complete &&
      (G.stageProgress[1]||0) >= 8 &&
      (G.flags.stage1_miniboss_seeded_1 || G.flags.stage1_miniboss_seeded_2)) {
    setTimeout(triggerStage1MiniBoss, 500);
    return;
  }
  if (!G.flags.stage1_mainboss_complete &&
      G.flags.stage1_miniboss_complete &&
      (G.stageProgress[1]||0) >= 15) {
    setTimeout(triggerStage1MainBoss, 500);
  }
}

window.STAGE1_BOSS_MODULE = {
  triggerMiniBoss: triggerStage1MiniBoss,
  triggerMainBoss: triggerStage1MainBoss,
  checkTrigger: checkStage1BossTriggered,
  seedChoices: window.STAGE1_MINIBOSS_SEED_CHOICES
};
