// ═══════════════════════════════════════════════════════
// COMBAT UI SYSTEM v2
// Dynamic Tactical Combat with Archetype Abilities & Multi-Opponent Targeting
// ═══════════════════════════════════════════════════════

(function(){

  const RANGE_BRACKETS = {
    close: { feet: '0-10', debuffMelee: 0, debuffRanged: 0.3, debuffMagic: 0.2 },
    medium: { feet: '11-30', debuffMelee: Infinity, debuffRanged: 0, debuffMagic: 0 },
    far: { feet: '31-100', debuffMelee: Infinity, debuffRanged: 0, debuffMagic: 0 },
    very_far: { feet: '100+', debuffMelee: Infinity, debuffRanged: 0.3, debuffMagic: 0.4 }
  };

  // Archetype combat abilities
  const ARCHETYPE_ABILITIES = {
    // Combat group
    warrior: ['Power Strike', 'Shield Bash', 'Rally Allies', 'Desperate Defense'],
    knight: ['Smite', 'Consecrated Ground', 'Protect Ally', 'Holy Resilience'],
    ranger: ['Multishot', 'Tracking Shot', 'Pack Tactics', 'Evasion'],
    paladin: ['Righteous Judgment', 'Divine Shield', 'Healing Light', 'Smite Evil'],
    archer: ['Precision Shot', 'Ricochet', 'Pin Down', 'Acrobatic Evasion'],
    berserker: ['Raging Charge', 'Whirlwind', 'Intimidate', 'Savage Defense'],
    warden: ['Fortress Stance', 'Lock Down', 'Protective Seal', 'Stand Firm'],
    warlord: ['Tactical Command', 'Rally Troops', 'Flank Maneuver', 'Morale Surge'],
    death_knight: ['Unholy Strike', 'Death Pact', 'Life Drain', 'Undead Resilience'],
    
    // Magic group
    wizard: ['Fireball', 'Frost Nova', 'Arcane Bolt', 'Spell Shield'],
    cleric: ['Holy Blast', 'Healing Word', 'Divine Protection', 'Smite Undead'],
    priest: ['Prayer of Healing', 'Holy Fire', 'Sanctify Ground', 'Group Blessing'],
    necromancer: ['Curse', 'Lifedrain', 'Undead Minion', 'Death Spore'],
    illusionist: ['Phantom Strike', 'Mirror Image', 'Confusion', 'Invisibility'],
    inquisitor: ['Interrogate', 'Divine Judgment', 'Zealous Strike', 'Purge Darkness'],
    elementalist: ['Chain Lightning', 'Stone Wall', 'Earthquake', 'Cyclone'],
    oracle: ['Glimpse Future', 'Destiny Strike', 'Predestined Healing', 'Fateful Vision'],
    
    // Stealth group
    rogue: ['Backstab', 'Evasion', 'Pickpocket', 'Shadow Step'],
    assassin: ['Assassination', 'Poison Strike', 'Silent Kill', 'Shadow Clones'],
    spellthief: ['Spell Steal', 'Arcane Disruption', 'Stolen Power', 'Mana Drain'],
    scout: ['Precise Shot', 'Taunt', 'Disengage', 'Quick Maneuver'],
    thief: ['Quick Escape', 'Sleight of Hand', 'Parkour', 'Distract'],
    trickster: ['Misdirection', 'Prank', 'Clever Trick', 'Vanish'],
    beastmaster: ['Call Beast', 'Pack Attack', 'Primal Roar', 'Feral Instinct'],
    
    // Support group
    healer: ['Heal All', 'Protective Blessing', 'Resurrection', 'Holy Aura'],
    artificer: ['Create Device', 'Repair Ally', 'Deploy Trap', 'Empower Weapon'],
    engineer: ['Construct', 'Reinforce', 'Sabotage', 'Build Fortification'],
    tactician: ['Flanking', 'Coordinate Strike', 'Strategic Retreat', 'Synergy Bonus'],
    alchemist: ['Throw Potion', 'Poison Cloud', 'Antidote', 'Alchemical Boost'],
    saint: ['Miracle', 'Redeem', 'Heal Wounds', 'Divine Intervention'],
    bard: ['Inspire', 'Debuff Song', 'Entertain', 'Harmonize Party']
  };

  function initCombatDistance(combatSession) {
    if (!combatSession.distance) {
      combatSession.distance = 'medium';
      combatSession.enemies = combatSession.enemies || [{
        id: 'primary',
        name: combatSession.enemyName || 'Enemy',
        hp: combatSession.enemyHp || 12,
        maxHp: combatSession.enemyMaxHp || 12
      }];
      combatSession.primaryTarget = combatSession.primaryTarget || 'primary';
    }
  }

  function renderCombatUI(gameState, combatSession) {
    if (!gameState || !combatSession) return;
    
    initCombatDistance(combatSession);
    
    const choicesDiv = document.getElementById('choices');
    if (!choicesDiv) return;

    choicesDiv.innerHTML = '';
    
    const combatUI = document.createElement('div');
    combatUI.className = 'combatUI';
    combatUI.innerHTML = `
      <div class='combatHeader'>
        <div class='combatTitle'>⚔ TACTICAL COMBAT ⚔</div>
        <div class='combatStats'>
          <span class='stat'>Your HP: ${gameState.hp}/${gameState.maxHp}</span>
          <span class='stat'>DISTANCE: <strong>${combatSession.distance.toUpperCase()}</strong> (${RANGE_BRACKETS[combatSession.distance].feet} ft)</span>
          <span class='stat'>Round ${combatSession.round || 1}</span>
        </div>
      </div>
      
      <div class='targetSelection'>
        <div class='targetLabel'>SELECT TARGET:</div>
        <div id='targetButtons' class='targetButtonsContainer'></div>
      </div>

      <div class='combatActionsPanel'>
        <div id='tacticalChoices' class='tacticalChoicesList'></div>
      </div>
      
      <div class='combatOptions'>
        <button id='fleeBtn' class='tacticalOption flee'>🏃 Flee / Retreat</button>
        <button id='mercyBtn' class='tacticalOption mercy'>🙏 Show Mercy</button>
      </div>
    `;
    
    choicesDiv.appendChild(combatUI);

    // Render target selection buttons
    const targetContainer = document.getElementById('targetButtons');
    if (combatSession.enemies && combatSession.enemies.length > 0) {
      combatSession.enemies.forEach(enemy => {
        const btn = document.createElement('button');
        btn.className = `targetButton ${enemy.id === combatSession.primaryTarget ? 'selected' : ''}`;
        btn.innerHTML = `<div>${enemy.name}</div><small>HP: ${enemy.hp}/${enemy.maxHp}</small>`;
        btn.onclick = () => {
          combatSession.primaryTarget = enemy.id;
          window.renderCombatUI(gameState, combatSession);
        };
        targetContainer.appendChild(btn);
      });
    }

    // Render tactical choices
    const choicesList = document.getElementById('tacticalChoices');
    if (window.combatSessionChoices) {
      const choices = window.combatSessionChoices();
      choices.slice(0, 5).forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.className = 'tacticalChoice';
        btn.innerHTML = `<strong>${choice.label}</strong><br><small>${(choice.tags || []).join(' | ')}</small>`;
        btn.onclick = () => {
          choice.fn();
          window.persist?.();
          window.render?.();
        };
        choicesList.appendChild(btn);
      });
    }

    // Flee button
    const fleeBtn = document.getElementById('fleeBtn');
    if (fleeBtn) {
      fleeBtn.onclick = () => {
        combatSession.resolved = true;
        gameState.lastResult = 'Combat disengaged — retreated to safety.';
        window.renderChoices?.();
        window.render?.();
      };
    }

    // Mercy button
    const mercyBtn = document.getElementById('mercyBtn');
    if (mercyBtn) {
      mercyBtn.onclick = () => {
        combatSession.resolved = true;
        gameState.lastResult = 'Chose mercy over violence. The opponent stands down.';
        window.renderChoices?.();
        window.render?.();
      };
    }
  }

  // Build dynamic tactical choices based on archetype and combat situation
  function buildTacticalChoices(gameState, combatSession) {
    const choices = [];
    const arch = (window.ARCHETYPES || []).find(a => a.id === gameState.archetype) || {};
    const abilities = ARCHETYPE_ABILITIES[arch.id] || [];
    
    // Archetype ability (primary action)
    if (abilities.length > 0) {
      const ability = abilities[gameState.dayCount % abilities.length];
      choices.push({
        label: `Use ${ability} — unleash archetype power`,
        tags: ['Ability', 'Primary', arch.group],
        fn: () => {
          gameState.lastResult = `${ability} connects! The attack is effective.`;
          combatSession.round = (combatSession.round || 0) + 1;
          window.renderCombatUI?.(gameState, combatSession);
        }
      });
    }

    // Range manipulation
    const distances = ['close', 'medium', 'far', 'very_far'];
    const currentIdx = distances.indexOf(combatSession.distance);
    
    if (currentIdx > 0) {
      choices.push({
        label: `Close distance to ${distances[currentIdx - 1].toUpperCase()}`,
        tags: ['Positioning', 'Movement'],
        fn: () => {
          combatSession.distance = distances[currentIdx - 1];
          gameState.lastResult = `Moved to ${distances[currentIdx - 1]} range for advantage.`;
          window.renderCombatUI?.(gameState, combatSession);
        }
      });
    }
    
    if (currentIdx < distances.length - 1) {
      choices.push({
        label: `Increase distance to ${distances[currentIdx + 1].toUpperCase()}`,
        tags: ['Positioning', 'Movement'],
        fn: () => {
          combatSession.distance = distances[currentIdx + 1];
          gameState.lastResult = `Repositioned to ${distances[currentIdx + 1]} range.`;
          window.renderCombatUI?.(gameState, combatSession);
        }
      });
    }

    // Tactical maneuver
    choices.push({
      label: `Execute tactical maneuver — attack with advantage`,
      tags: ['Tactical', 'Attack'],
      fn: () => {
        const r = Math.floor(Math.random() * 20) + 1 + (gameState.skills?.combat || 0);
        const success = r > 12;
        gameState.lastResult = success ? 
          `Perfect execution! The tactical maneuver lands decisively.` :
          `The maneuver partially connects but lacks full impact.`;
        combatSession.round = (combatSession.round || 0) + 1;
        window.renderCombatUI?.(gameState, combatSession);
      }
    });

    // Companion support (if companions exist)
    if (gameState.companions && gameState.companions.length > 0) {
      const availableComps = gameState.companions.filter(c => !c.injured);
      if (availableComps.length > 0) {
        choices.push({
          label: `Call for companion support — coordinate attack`,
          tags: ['Coordination', 'Support'],
          fn: () => {
            gameState.lastResult = `Companions respond! Coordinated attack increases effectiveness.`;
            combatSession.round = (combatSession.round || 0) + 1;
            window.renderCombatUI?.(gameState, combatSession);
          }
        });
      }
    }

    return choices;
  }

  window.renderCombatUI = renderCombatUI;
  window.buildTacticalChoices = buildTacticalChoices;
  window.ARCHETYPE_ABILITIES = ARCHETYPE_ABILITIES;
  window.initCombatDistance = initCombatDistance;
})();
