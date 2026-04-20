// ═══════════════════════════════════════════════════════
// COMBAT UI SYSTEM v3 - TURN-BASED TACTICAL COMBAT
// Full turn-based system with initiative, enemy AI, death mechanics
// ═══════════════════════════════════════════════════════

(function(){

  const RANGE_BRACKETS = {
    close: { feet: '0-10', debuffMelee: 0, debuffRanged: 0.3, debuffMagic: 0.2 },
    medium: { feet: '11-30', debuffMelee: Infinity, debuffRanged: 0, debuffMagic: 0 },
    far: { feet: '31-100', debuffMelee: Infinity, debuffRanged: 0, debuffMagic: 0 },
    very_far: { feet: '100+', debuffMelee: Infinity, debuffRanged: 0.3, debuffMagic: 0.4 }
  };

  // Initialize tactical combat session with proper turn order
  function initTacticalCombat(gameState, combatSession) {
    if (combatSession.tacticalInitialized) return;
    
    // Initialize enemies array if not present
    if (!combatSession.enemies || combatSession.enemies.length === 0) {
      combatSession.enemies = [{
        id: 'primary',
        name: combatSession.enemyName || 'Enemy',
        hp: combatSession.enemyHp || 12,
        maxHp: combatSession.enemyMaxHp || 12,
        template: combatSession.enemyTemplate || 'standard'
      }];
    }

    // Calculate initiative and build turn order
    combatSession.round = 1;
    combatSession.turnOrder = [];
    combatSession.currentTurnIdx = 0;

    // Player party always acts as one actor
    const playerInit = 10 + (gameState.skills?.combat || 0) + Math.floor(Math.random() * 6);
    combatSession.turnOrder.push({
      actor: 'player',
      initiative: playerInit,
      faction: 'player'
    });

    // Build enemy turn order (all enemies act in one round per enemy)
    combatSession.enemies.forEach((enemy, idx) => {
      const isBoss = combatSession.isBoss || (enemy.template && enemy.template.includes('boss'));
      const isLaw = combatSession.isLaw || combatSession.enemyTemplate === 'law_enforcement';
      
      // Bosses and law enforcement always get initiative bonus and go first
      const enemyInit = isBoss || isLaw ? 20 : 8 + Math.floor(Math.random() * 8);
      
      combatSession.turnOrder.push({
        actor: 'enemy',
        enemyId: enemy.id,
        initiative: enemyInit,
        faction: 'enemy'
      });
    });

    // Sort by initiative (high to low) - ties go to initiator
    if (!combatSession.playerInitiated) {
      combatSession.turnOrder.sort((a, b) => b.initiative - a.initiative);
    } else {
      // Player-forced engagement: player always first
      const playerIdx = combatSession.turnOrder.findIndex(t => t.actor === 'player');
      const playerTurn = combatSession.turnOrder.splice(playerIdx, 1)[0];
      combatSession.turnOrder.unshift(playerTurn);
    }

    combatSession.tacticalInitialized = true;
  }

  // Get the current actor's turn info
  function getCurrentActor(combatSession) {
    if (!combatSession.turnOrder || combatSession.turnOrder.length === 0) return null;
    return combatSession.turnOrder[combatSession.currentTurnIdx % combatSession.turnOrder.length];
  }

  // Advance to next actor in turn order
  function nextTurn(combatSession) {
    if (!combatSession.turnOrder) return;
    
    combatSession.currentTurnIdx++;
    
    // Complete round check
    if (combatSession.currentTurnIdx >= combatSession.turnOrder.length) {
      combatSession.currentTurnIdx = 0;
      combatSession.round = (combatSession.round || 0) + 1;
    }

    // Clean up dead enemies
    combatSession.enemies = (combatSession.enemies || []).filter(e => e.hp > 0);
    
    // Update turn order to remove dead enemies
    combatSession.turnOrder = combatSession.turnOrder.filter(t => {
      if (t.actor === 'enemy') {
        return combatSession.enemies.some(e => e.id === t.enemyId);
      }
      return true;
    });

    // Victory check
    if (combatSession.enemies.length === 0) {
      combatSession.resolved = true;
      combatSession.victory = true;
      return;
    }
  }

  // Execute enemy AI action
  function executeEnemyTurn(gameState, combatSession, enemyId) {
    const enemy = combatSession.enemies.find(e => e.id === enemyId);
    if (!enemy) return;

    // Simple AI: attack if close, move if far
    if (combatSession.distance === 'medium' || combatSession.distance === 'far') {
      // Move closer
      const distances = ['close', 'medium', 'far', 'very_far'];
      const currentIdx = distances.indexOf(combatSession.distance);
      if (currentIdx > 0) {
        combatSession.distance = distances[currentIdx - 1];
        const log = `${enemy.name} closes distance to ${distances[currentIdx - 1]}!`;
        combatSession.log = combatSession.log || [];
        combatSession.log.unshift(log);
      }
    } else {
      // Attack
      const roll = Math.floor(Math.random() * 20) + 1 + (enemy.attack || 3);
      const playerDefense = 10 + (gameState.skills?.combat || 0);
      
      if (roll >= playerDefense) {
        const damage = Math.max(1, Math.floor(Math.random() * 6) + 1);
        gameState.hp = Math.max(0, gameState.hp - damage);
        const log = `${enemy.name} hits! You take ${damage} damage.`;
        combatSession.log = combatSession.log || [];
        combatSession.log.unshift(log);

        if (gameState.hp <= 0) {
          combatSession.resolved = true;
          combatSession.playerDefeated = true;
        }
      } else {
        const log = `${enemy.name} attacks but misses!`;
        combatSession.log = combatSession.log || [];
        combatSession.log.unshift(log);
      }
    }
  }

  // Render the tactical combat UI
  function renderCombatUI(gameState, combatSession) {
    if (!gameState || !combatSession) return;
    
    initTacticalCombat(gameState, combatSession);
    
    const choicesDiv = document.getElementById('choices');
    if (!choicesDiv) return;

    choicesDiv.innerHTML = '';
    
    const combatUI = document.createElement('div');
    combatUI.className = 'combatUI';

    // Determine if it's player turn or enemy turn
    const currentActor = getCurrentActor(combatSession);
    const isPlayerTurn = currentActor && currentActor.actor === 'player';

    // Auto-execute enemy turns
    if (!isPlayerTurn && currentActor) {
      executeEnemyTurn(gameState, combatSession, currentActor.enemyId);
      // Render again after enemy action
      setTimeout(() => {
        if (!combatSession.resolved) {
          nextTurn(combatSession);
          if (!combatSession.resolved) {
            renderCombatUI(gameState, combatSession);
          } else {
            resolveCombat(gameState, combatSession);
          }
        } else {
          resolveCombat(gameState, combatSession);
        }
      }, 1000);
      
      combatUI.innerHTML = `
        <div class='combatHeader'>
          <div class='combatTitle'>⚔ TACTICAL COMBAT - Round ${combatSession.round} ⚔</div>
          <div class='combatStats'>
            <span class='stat'>Your HP: ${gameState.hp}/${gameState.maxHp}</span>
            <span class='stat'>DISTANCE: ${combatSession.distance.toUpperCase()}</span>
          </div>
        </div>
        <div class='combatLog'>
          <div class='combatLogEntry'>${currentActor.name || 'Enemy'} takes their turn...</div>
          ${(combatSession.log || []).map(l => `<div class='combatLogEntry'>${l}</div>`).join('')}
        </div>
      `;
      choicesDiv.appendChild(combatUI);
      return;
    }

    combatUI.innerHTML = `
      <div class='combatHeader'>
        <div class='combatTitle'>⚔ TACTICAL COMBAT - Round ${combatSession.round} ⚔</div>
        <div class='combatStats'>
          <span class='stat'>Your HP: ${gameState.hp}/${gameState.maxHp}</span>
          <span class='stat'>DISTANCE: ${combatSession.distance.toUpperCase()}</span>
        </div>
      </div>

      <div class='enemyStatus'>
        <div class='statusLabel'>ENEMIES:</div>
        ${(combatSession.enemies || []).map(e => `
          <div class='enemyLine'>
            <span>${e.name}</span>
            <span class='hp'>HP: ${e.hp}/${e.maxHp}</span>
          </div>
        `).join('')}
      </div>

      <div class='combatActions'>
        <div class='actionsLabel'>YOUR TURN - CHOOSE ACTION:</div>
        <div id='tacticalChoices' class='tacticalChoicesList'></div>
      </div>

      <div class='combatOptions'>
        <button id='fleeBtn' class='tacticalOption flee'>🏃 Retreat from Combat</button>
        <button id='mercyBtn' class='tacticalOption mercy'>🙏 Attempt Mercy</button>
      </div>

      ${combatSession.log ? `
        <div class='combatLog'>
          <div class='logLabel'>COMBAT LOG:</div>
          ${combatSession.log.slice(0, 3).map(l => `<div class='logEntry'>${l}</div>`).join('')}
        </div>
      ` : ''}
    `;
    
    choicesDiv.appendChild(combatUI);

    // Render tactical choices
    const choicesList = document.getElementById('tacticalChoices');
    if (window.buildTacticalChoices) {
      const choices = window.buildTacticalChoices(gameState, combatSession);
      choices.slice(0, 6).forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.className = 'tacticalChoice';
        btn.innerHTML = `<strong>${choice.label}</strong>`;
        if (choice.tags) {
          btn.innerHTML += `<br><small>${choice.tags.join(' | ')}</small>`;
        }
        btn.onclick = () => {
          if (choice.fn) {
            choice.fn();
            // Apply enemy action and re-render
            if (!combatSession.resolved) {
              setTimeout(() => {
                nextTurn(combatSession);
                if (!combatSession.resolved) {
                  renderCombatUI(gameState, combatSession);
                } else {
                  resolveCombat(gameState, combatSession);
                }
              }, 500);
            }
          }
        };
        choicesList.appendChild(btn);
      });
    }

    // Flee button
    const fleeBtn = document.getElementById('fleeBtn');
    if (fleeBtn) {
      fleeBtn.onclick = () => {
        combatSession.resolved = true;
        combatSession.fled = true;
        resolveCombat(gameState, combatSession);
      };
    }

    // Mercy button
    const mercyBtn = document.getElementById('mercyBtn');
    if (mercyBtn) {
      mercyBtn.onclick = () => {
        combatSession.resolved = true;
        combatSession.mercy = true;
        resolveCombat(gameState, combatSession);
      };
    }
  }

  // Resolve combat and return to choice panel
  function resolveCombat(gameState, combatSession) {
    if (combatSession.victory) {
      const totalLoot = (combatSession.enemies || []).reduce((sum, e) => sum + (e.loot?.gold || 5), 0);
      gameState.gold = (gameState.gold || 0) + totalLoot;
      gameState.lastResult = `Victory! Combat resolved. You earned ${totalLoot} gold.`;
      combatSession.log = combatSession.log || [];
      combatSession.log.unshift('COMBAT WON!');
    } else if (combatSession.playerDefeated) {
      gameState.lastResult = 'Defeat. You were overcome. The world darkens...';
      combatSession.log = combatSession.log || [];
      combatSession.log.unshift('COMBAT LOST!');
    } else if (combatSession.fled) {
      gameState.worldClocks.pressure = (gameState.worldClocks.pressure || 0) + 1;
      gameState.lastResult = 'You retreated from combat. Pressure increases slightly.';
      combatSession.log = combatSession.log || [];
      combatSession.log.unshift('Fled from combat.');
    } else if (combatSession.mercy) {
      gameState.lastResult = 'You offered mercy. The opponent stood down.';
      combatSession.log = combatSession.log || [];
      combatSession.log.unshift('Combat ended with mercy.');
    }

    // Clear combat session and restore normal choices
    gameState.combatSession = null;
    gameState.encounter = null;

    // Return to choice panel
    if (window.renderChoices) {
      window.renderChoices();
    }
    if (window.render) {
      window.render();
    }
  }

  // Build tactical choices for player action
  function buildTacticalChoices(gameState, combatSession) {
    const choices = [];

    // Attack action
    choices.push({
      label: 'Attack the enemy',
      tags: ['Attack', 'Melee'],
      fn: () => {
        const enemies = combatSession.enemies || [];
        if (enemies.length === 0) return;

        const target = enemies[0];
        const roll = Math.floor(Math.random() * 20) + 1 + (gameState.skills?.combat || 0);
        const targetDefense = 10 + (target.defense || 2);

        if (roll >= targetDefense) {
          const damage = Math.max(1, Math.floor(Math.random() * 8) + 2 + Math.floor((gameState.skills?.combat || 0) / 2));
          target.hp = Math.max(0, target.hp - damage);
          const log = `You hit ${target.name} for ${damage} damage!`;
          combatSession.log = combatSession.log || [];
          combatSession.log.unshift(log);
        } else {
          const log = `Your attack misses!`;
          combatSession.log = combatSession.log || [];
          combatSession.log.unshift(log);
        }
      }
    });

    // Close distance action
    const distances = ['close', 'medium', 'far', 'very_far'];
    const currentIdx = distances.indexOf(combatSession.distance || 'medium');
    if (currentIdx > 0) {
      choices.push({
        label: `Close to ${distances[currentIdx - 1].toUpperCase()}`,
        tags: ['Movement', 'Positioning'],
        fn: () => {
          combatSession.distance = distances[currentIdx - 1];
          const log = `You move closer to ${distances[currentIdx - 1]} range.`;
          combatSession.log = combatSession.log || [];
          combatSession.log.unshift(log);
        }
      });
    }

    // Increase distance action
    if (currentIdx < distances.length - 1) {
      choices.push({
        label: `Retreat to ${distances[currentIdx + 1].toUpperCase()}`,
        tags: ['Movement', 'Evasion'],
        fn: () => {
          combatSession.distance = distances[currentIdx + 1];
          const log = `You fall back to ${distances[currentIdx + 1]} range.`;
          combatSession.log = combatSession.log || [];
          combatSession.log.unshift(log);
        }
      });
    }

    // Defend action
    choices.push({
      label: 'Defend and brace for impact',
      tags: ['Defense', 'Protect'],
      fn: () => {
        combatSession.playerDefending = true;
        const log = 'You take a defensive stance!';
        combatSession.log = combatSession.log || [];
        combatSession.log.unshift(log);
      }
    });

    // Companion support (if available)
    if (gameState.companions && gameState.companions.filter(c => !c.injured).length > 0) {
      choices.push({
        label: 'Call on companion support',
        tags: ['Support', 'Coordination'],
        fn: () => {
          const damage = Math.floor(Math.random() * 4) + 2;
          const target = (combatSession.enemies || [])[0];
          if (target) {
            target.hp = Math.max(0, target.hp - damage);
            const log = `Companion strikes! ${damage} damage to ${target.name}.`;
            combatSession.log = combatSession.log || [];
            combatSession.log.unshift(log);
          }
        }
      });
    }

    return choices;
  }

  window.renderCombatUI = renderCombatUI;
  window.buildTacticalChoices = buildTacticalChoices;
  window.initTacticalCombat = initTacticalCombat;
  window.nextTurn = nextTurn;
})();
