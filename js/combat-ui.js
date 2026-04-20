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
        template: combatSession.enemyTemplate || 'standard',
        attack: combatSession.enemyAttack || 4,
        defense: combatSession.enemyDefense || 5,
        loot: combatSession.loot || { gold: 5, item: null }
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
    if (!combatSession.turnOrder || combatSession.turnOrder.length === 0) {
      combatSession.resolved = true;
      combatSession.victory = true;
      return null;
    }
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
      // Reset per-round state
      combatSession.playerDefending = false;
      combatSession.playerDefenseBonus = 0;
      combatSession.playerMoved = false;
      combatSession.pendingCopyBonus = 0;
    }

    // Clean up dead enemies
    combatSession.enemies = (combatSession.enemies || []).filter(e => e.hp > 0);
    
    // Update turn order to remove dead enemies
    const oldLength = combatSession.turnOrder.length;
    combatSession.turnOrder = combatSession.turnOrder.filter(t => {
      if (t.actor === 'enemy') {
        return combatSession.enemies.some(e => e.id === t.enemyId);
      }
      return true;
    });
    const newLength = combatSession.turnOrder.length;

    // If turn order shrunk, adjust currentTurnIdx
    if (newLength < oldLength && combatSession.currentTurnIdx >= newLength && newLength > 0) {
      combatSession.currentTurnIdx = combatSession.currentTurnIdx % newLength;
    }

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

    const activeStatusEffects = (combatSession.statusEffects || []).filter(se => se.duration > 0);
    combatUI.innerHTML = `
      <div class='combatHeader'>
        <div class='combatTitle'>⚔ TACTICAL COMBAT - Round ${combatSession.round} ⚔</div>
        <div class='combatStats'>
          <span class='stat'>Your HP: ${gameState.hp}/${gameState.maxHp}</span>
          <span class='stat'>DISTANCE: ${(combatSession.distance||'medium').toUpperCase()}</span>
          ${combatSession.playerDefending ? '<span class=\'stat defending\'>DEFENDING</span>' : ''}
        </div>
        ${activeStatusEffects.length ? `<div class='combatStatusEffects'>${activeStatusEffects.map(se=>`<span class='statusBadge'>${se.type}(${se.duration}r)</span>`).join(' ')}</div>` : ''}
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

  // Check whether a combat ability's context requirements are met
  function abilityReqMet(req, gameState, combatSession) {
    if (!req) return true;
    if (req.state === 'player_concealed' && !combatSession.playerConcealed) return false;
    if (req.state === 'player_stationary' && combatSession.playerMoved) return false;
    if (req.state === 'player_observed_target' && combatSession.playerConcealed) return false;
    if (req.ally_attacked && !combatSession.allyAttacked) return false;
    if (req.player_initiated && !combatSession.playerInitiated) return false;
    if (req.player_unseen && !combatSession.playerConcealed) return false;
    if (req.target_not_acted && (combatSession.round || 1) > 1) return false;
    if (req.witnesses === false && (gameState.companions || []).filter(c => !c.injured && c.available !== false).length > 0) return false;
    if (req.axis_event && !gameState.axisInverted) return false;
    if (req.target_hp_pct) {
      const target = (combatSession.enemies || [])[0];
      if (!target || (target.hp / target.maxHp) > req.target_hp_pct) return false;
    }
    return true;
  }

  // Check usage limit for an ability
  function abilityUsed(ab, gameState) {
    const usage = gameState.abilityUsage || { perScene: {}, perDay: {} };
    if (ab.cost === 'once_per_scene' || ab.cost === 'reaction') return !!usage.perScene[ab.id];
    if (ab.cost === 'once_per_day') return !!usage.perDay[ab.id];
    return false;
  }

  // Apply structured effects for a combat ability
  function applyAbilityEffects(ab, gameState, combatSession) {
    combatSession.log = combatSession.log || [];
    if (!ab.effects || !ab.effects.length) return;

    const target = (combatSession.enemies || [])[0];
    const log = [];

    ab.effects.forEach(eff => {
      if (eff.type === 'atk_bonus') {
        // Handled in resolveCombatRound via abilityId
      } else if (eff.type === 'def_self') {
        combatSession.playerDefending = true;
        combatSession.playerDefenseBonus = (combatSession.playerDefenseBonus || 0) + eff.value;
        log.push(`Defense +${eff.value} this round.`);
      } else if (eff.type === 'hp_cost') {
        gameState.hp = Math.max(1, gameState.hp - eff.value);
        log.push(`${eff.value} HP committed.`);
      } else if (eff.type === 'heal_self') {
        const amt = typeof eff.value === 'number' ? eff.value : 4;
        gameState.hp = Math.min(gameState.maxHp, gameState.hp + amt);
        log.push(`Recovered ${amt} HP.`);
      } else if (eff.type === 'enemy_atk_penalty' && target) {
        combatSession.enemyAttack = Math.max(0, (combatSession.enemyAttack || 0) - eff.value);
        log.push(`${target.name} attack reduced by ${eff.value}.`);
      } else if (eff.type === 'enemy_def_penalty' && target) {
        combatSession.enemyDefense = Math.max(0, (combatSession.enemyDefense || 0) - eff.value);
        log.push(`${target.name} defense reduced by ${eff.value}.`);
      } else if (eff.type === 'push_enemy') {
        const dists = ['close', 'medium', 'far'];
        const idx = dists.indexOf(combatSession.distance || 'close');
        if (idx < dists.length - 1) combatSession.distance = dists[idx + 1];
        log.push(`${target ? target.name : 'Enemy'} pushed back.`);
      } else if (eff.type === 'concealed') {
        combatSession.playerConcealed = true;
        log.push('You slip into concealment.');
      } else if (eff.type === 'area_damage' && target) {
        const dmg = Math.floor(Math.random() * 6) + 2;
        target.hp = Math.max(0, target.hp - dmg);
        log.push(`Area effect: ${dmg} damage to ${target.name}.`);
      } else if (eff.type === 'dot_enemy' && target) {
        combatSession.statusEffects = combatSession.statusEffects || [];
        combatSession.statusEffects.push({ type: 'dot', target: target.id, value: eff.value || 2, duration: eff.duration || 3 });
        log.push(`${target.name} is now taking ongoing damage.`);
      } else if (eff.type === 'morale_check') {
        const roll = Math.floor(Math.random() * 20) + 1;
        if (roll <= 10 && target) {
          combatSession.resolved = true;
          combatSession.fled = true;
          log.push(`${target.name} fails the morale check and breaks.`);
        } else {
          log.push('Morale check: target holds.');
        }
      } else if (eff.type === 'def_ally') {
        combatSession.playerDefenseBonus = (combatSession.playerDefenseBonus || 0) + eff.value;
        log.push(`Formation defense +${eff.value} this round.`);
      } else if (eff.type === 'extra_action_ally') {
        combatSession.pendingCompanionDamage = (combatSession.pendingCompanionDamage || 0) + (eff.value || 3);
        log.push(`Companion readied for support strike (+${eff.value || 3} damage next hit).`);
      } else if (eff.type === 'heal_ally') {
        const rawVal = eff.value || 4;
        const healAmt = typeof rawVal === 'number' ? rawVal : parseInt(rawVal) || 4;
        gameState.hp = Math.min(gameState.maxHp, gameState.hp + healAmt);
        log.push(`Healed ${healAmt} HP.`);
      } else if (eff.type === 'enemy_redirect') {
        log.push(`${target ? target.name : 'Enemy'} forced to focus attack on you.`);
      } else if (eff.type === 'condition_apply') {
        combatSession.statusEffects = combatSession.statusEffects || [];
        combatSession.statusEffects.push({ type: eff.condition || 'weakened', value: eff.value || 1, duration: eff.duration || 2, target: target ? target.id : 'primary' });
        log.push(`${target ? target.name : 'Enemy'} condition applied: ${eff.condition || 'weakened'}.`);
      } else if (eff.type === 'condition_clear') {
        if (combatSession.statusEffects) {
          const before = combatSession.statusEffects.length;
          combatSession.statusEffects = combatSession.statusEffects.filter(se => se.type !== (eff.condition || ''));
          const cleared = before - combatSession.statusEffects.length;
          log.push(cleared > 0 ? `Condition cleared.` : `No matching condition to clear.`);
        }
      } else if (eff.type === 'reveal_intel') {
        if (target) log.push(`Intel: ${target.name} — attack ${target.attack || '?'}, defense ${target.defense || '?'}, HP ${target.hp}/${target.maxHp}.`);
        combatSession.enemyIntelRevealed = true;
      } else if (eff.type === 'instant_kill') {
        if (target && target.hp / target.maxHp <= 0.25) {
          target.hp = 0;
          log.push(`${target.name} is finished.`);
        } else {
          log.push(`Instant kill: target not vulnerable (requires ≤25% HP).`);
        }
      } else if (eff.type === 'cover') {
        combatSession.playerDefenseBonus = (combatSession.playerDefenseBonus || 0) + (eff.value || 3);
        log.push(`Cover position: defense +${eff.value || 3} this round.`);
      } else if (eff.type === 'copy_enemy_ability') {
        if (target) {
          const copyBonus = Math.floor((target.attack || 3) / 2);
          combatSession.pendingCopyBonus = copyBonus;
          log.push(`Copied enemy technique: +${copyBonus} attack next round.`);
        }
      } else if (eff.type === 'redirect_attack') {
        combatSession.playerDefenseBonus = (combatSession.playerDefenseBonus || 0) + (eff.value || 4);
        log.push(`Attack redirected. Defense +${eff.value || 4} this round.`);
      } else if (eff.type === 'self_splash_risk') {
        const risk = Math.floor(Math.random() * 20) + 1;
        if (risk <= 5) {
          const selfHit = Math.floor(Math.random() * 4) + 1;
          gameState.hp = Math.max(0, gameState.hp - selfHit);
          log.push(`Splash risk triggered — you take ${selfHit} damage.`);
        } else {
          log.push(`Splash avoided.`);
        }
      }
    });

    if (log.length) combatSession.log.unshift(`${ab.name}: ${log.join(' ')}`);
  }

  // Build tactical choices for player action
  function buildTacticalChoices(gameState, combatSession) {
    const choices = [];

    // Apply per-round status effects (dot damage to enemies)
    if (combatSession.statusEffects && combatSession.statusEffects.length) {
      combatSession.statusEffects = combatSession.statusEffects.filter(se => se.duration > 0);
      combatSession.statusEffects.forEach(se => {
        if (se.type === 'dot') {
          const enemy = (combatSession.enemies || []).find(e => e.id === se.target);
          if (enemy) {
            enemy.hp = Math.max(0, enemy.hp - (se.value || 2));
            combatSession.log.unshift(`${enemy.name} takes ${se.value} ongoing damage. (${--se.duration} rounds left)`);
          }
        }
      });
    }

    // ── Archetype abilities ──────────────────────────────────
    const archetypeId = gameState.archetype;
    const archetypeAbilities = (window.ARCHETYPE_COMBAT_ABILITIES || {})[archetypeId] || [];
    const abilitySlots = [];

    archetypeAbilities.forEach(ab => {
      if (ab.cost === 'passive') return;
      if (abilitySlots.length >= 4) return;

      const skillVal = gameState.skills ? (gameState.skills[ab.skillReq] || 0) : 0;
      if (skillVal < (ab.minSkill || 0)) return;

      if (!abilityReqMet(ab.req, gameState, combatSession)) return;

      const used = abilityUsed(ab, gameState);
      const isReaction = ab.cost === 'reaction';
      const costLabel = isReaction ? 'reaction' : ab.cost === 'once_per_scene' ? 'scene' : ab.cost === 'once_per_day' ? 'day' : 'action';

      abilitySlots.push({
        label: `${ab.name} [${costLabel}]${used ? ' — used' : ''}`,
        tags: [ab.skillReq || 'combat', isReaction ? 'Reaction' : 'Active', ...(used ? ['Spent'] : ['Ready'])],
        disabled: used,
        fn: () => {
          if (used) return;
          combatSession.log = combatSession.log || [];
          if (ab.flavor) combatSession.log.unshift(ab.flavor);
          // Non-attack effects applied immediately; attack-affecting effects go to engine
          const hasAttackEffect = ab.effects && ab.effects.some(e => ['atk_bonus','hp_cost','heal_self','enemy_atk_penalty','enemy_def_penalty'].includes(e.type));
          if (!hasAttackEffect) applyAbilityEffects(ab, gameState, combatSession);
          if (window.resolveCombatRound) {
            window.resolveCombatRound('ability', ab.id, gameState.combatSession || combatSession);
          }
        }
      });
    });

    choices.push(...abilitySlots);

    // ── Standard actions ─────────────────────────────────────
    choices.push({
      label: 'Attack',
      tags: ['Attack', 'Direct'],
      fn: () => {
        if (window.resolveCombatRound) {
          window.resolveCombatRound('attack', null, gameState.combatSession || combatSession);
        } else {
          const target = (combatSession.enemies || [])[0];
          if (!target) return;
          const roll = Math.floor(Math.random() * 20) + 1 + (gameState.skills?.combat || 0);
          if (roll >= 10 + (target.defense || 2)) {
            const dmg = Math.max(1, Math.floor(Math.random() * 8) + 2);
            target.hp = Math.max(0, target.hp - dmg);
            combatSession.log.unshift(`You hit ${target.name} for ${dmg} damage.`);
          } else {
            combatSession.log.unshift('Attack misses.');
          }
        }
      }
    });

    // Apply pending companion/copy bonuses from previous round
    if (combatSession.pendingCompanionDamage) {
      const target = (combatSession.enemies || [])[0];
      if (target) {
        target.hp = Math.max(0, target.hp - combatSession.pendingCompanionDamage);
        combatSession.log.unshift(`Companion support strikes — ${combatSession.pendingCompanionDamage} damage to ${target.name}.`);
      }
      combatSession.pendingCompanionDamage = 0;
    }
    if (combatSession.pendingCopyBonus) {
      combatSession.log.unshift(`Copied technique active: +${combatSession.pendingCopyBonus} attack this round.`);
    }

    // Movement
    const distances = ['close', 'medium', 'far'];
    const currentIdx = distances.indexOf(combatSession.distance || 'medium');
    if (currentIdx > 0) {
      choices.push({
        label: `Close distance — ${distances[currentIdx - 1].toUpperCase()}`,
        tags: ['Movement', 'Positioning'],
        fn: () => {
          combatSession.distance = distances[currentIdx - 1];
          combatSession.playerMoved = true;
          combatSession.log.unshift(`Closed to ${distances[currentIdx - 1]} range.`);
        }
      });
    }
    if (currentIdx < distances.length - 1) {
      choices.push({
        label: `Fall back — ${distances[currentIdx + 1].toUpperCase()}`,
        tags: ['Movement', 'Evasion'],
        fn: () => {
          combatSession.distance = distances[currentIdx + 1];
          combatSession.playerMoved = true;
          combatSession.log.unshift(`Fell back to ${distances[currentIdx + 1]} range.`);
        }
      });
    }

    choices.push({
      label: 'Defend and brace',
      tags: ['Defense', 'Stance'],
      fn: () => {
        combatSession.playerDefending = true;
        combatSession.playerDefenseBonus = (combatSession.playerDefenseBonus || 0) + 2;
        combatSession.log.unshift('Defensive stance: +2 defense this round.');
      }
    });

    if (gameState.companions && gameState.companions.filter(c => !c.injured && c.available !== false).length > 0) {
      choices.push({
        label: 'Companion support',
        tags: ['Support', 'Coordination'],
        fn: () => {
          const dmg = Math.floor(Math.random() * 4) + 2;
          const target = (combatSession.enemies || [])[0];
          if (target) {
            target.hp = Math.max(0, target.hp - dmg);
            combatSession.log.unshift(`Companion strikes — ${dmg} damage to ${target.name}.`);
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
