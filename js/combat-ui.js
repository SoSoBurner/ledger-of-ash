// ═══════════════════════════════════════════════════════
// COMBAT UI SYSTEM v1
// Tactical UI, Range/Distance System, Targeting
// ═══════════════════════════════════════════════════════

(function(){

  const RANGE_BRACKETS = {
    close: { feet: '0-10', debuffMelee: 0, debuffRanged: 0.3, debuffMagic: 0.2 },
    medium: { feet: '11-30', debuffMelee: Infinity, debuffRanged: 0, debuffMagic: 0 },
    far: { feet: '31-100', debuffMelee: Infinity, debuffRanged: 0, debuffMagic: 0 },
    very_far: { feet: '100+', debuffMelee: Infinity, debuffRanged: 0.3, debuffMagic: 0.4 }
  };

  const WEAPON_TYPES = {
    melee: { name: 'Melee', ranges: ['close'] },
    ranged: { name: 'Ranged', ranges: ['medium', 'far'] },
    magic: { name: 'Magic', ranges: ['medium', 'far'] }
  };

  // Initialize combat distance on session start
  function initCombatDistance(combatSession) {
    if (!combatSession.distance) {
      combatSession.distance = 'medium';
      combatSession.enemyDistance = 'medium';
      combatSession.activeTargets = {}; // { partyMemberId: enemyId }
    }
  }

  // Determine weapon type from game state
  function getEquippedWeaponType(gameState) {
    const equippedWeapon = gameState.equippedWeapon || 'melee';
    return WEAPON_TYPES[equippedWeapon] || WEAPON_TYPES.melee;
  }

  // Calculate debuff based on distance and weapon
  function calculateRangeDebuff(distance, weaponType) {
    const bracket = RANGE_BRACKETS[distance] || RANGE_BRACKETS.medium;
    
    if (weaponType === 'melee') return bracket.debuffMelee;
    if (weaponType === 'ranged') return bracket.debuffRanged;
    if (weaponType === 'magic') return bracket.debuffMagic;
    return 0;
  }

  // Check if weapon can be used at distance
  function canUseWeapon(distance, weaponType) {
    const ranges = WEAPON_TYPES[weaponType]?.ranges || [];
    if (ranges.includes(Infinity)) return false; // Melee at non-close = unusable
    return ranges.includes(distance);
  }

  // Render combat UI (tactical buttons, distance info, targeting)
  function renderCombatUI(gameState, combatSession) {
    if (!gameState || !combatSession) return;
    
    initCombatDistance(combatSession);
    
    const choicesDiv = document.getElementById('choices');
    if (!choicesDiv) return;

    choicesDiv.innerHTML = '';
    
    // Create combat UI container
    const combatUI = document.createElement('div');
    combatUI.className = 'combatUI';
    combatUI.innerHTML = `
      <div class='combatHeader'>
        <div class='combatTitle'>TACTICAL ENGAGEMENT</div>
        <div class='distanceInfo'>
          <span class='distanceLabel'>DISTANCE:</span>
          <span class='distanceValue'>${combatSession.distance.toUpperCase()} (${RANGE_BRACKETS[combatSession.distance].feet} ft)</span>
        </div>
      </div>
      
      <div class='enemyTargeting'>
        <div class='targetingLabel'>SELECT TARGET:</div>
        <div class='enemyList' id='enemyList'>
          <!-- Enemies rendered here -->
        </div>
      </div>

      <div class='combatActions'>
        <div class='actionCategory'>
          <div class='actionCategoryTitle'>ACTIONS</div>
          <div id='actionButtons' class='actionButtons'></div>
        </div>
        
        <div class='actionCategory'>
          <div class='actionCategoryTitle'>MOVEMENT</div>
          <div id='movementButtons' class='actionButtons'></div>
        </div>
        
        <div class='actionCategory'>
          <div class='actionCategoryTitle'>TACTICAL OPTIONS</div>
          <div id='tacticalButtons' class='actionButtons'></div>
        </div>
      </div>
    `;
    
    choicesDiv.appendChild(combatUI);

    // Render enemies as clickable targets
    const enemyList = document.getElementById('enemyList');
    if (combatSession.enemies && combatSession.enemies.length > 0) {
      combatSession.enemies.forEach((enemy, idx) => {
        const enemyCard = document.createElement('button');
        enemyCard.className = `enemyTarget ${combatSession.primaryTarget === idx ? 'selected' : ''}`;
        enemyCard.innerHTML = `
          <div class='enemyName'>${enemy.name}</div>
          <div class='enemyStats'>HP: ${enemy.hp}/${enemy.maxHp}</div>
        `;
        enemyCard.onclick = () => {
          combatSession.primaryTarget = idx;
          renderCombatUI(gameState, combatSession);
        };
        enemyList.appendChild(enemyCard);
      });
    }

    // Render action buttons
    renderCombatActions(gameState, combatSession);
    renderMovementActions(gameState, combatSession);
    renderTacticalOptions(gameState, combatSession);
  }

  function renderCombatActions(gameState, combatSession) {
    const actionDiv = document.getElementById('actionButtons');
    const weaponType = getEquippedWeaponType(gameState);
    const canAttack = canUseWeapon(combatSession.distance, weaponType);
    const debuff = calculateRangeDebuff(combatSession.distance, weaponType);

    const actions = [];

    // Primary attack
    if (canAttack) {
      const debuffStr = debuff > 0 ? ` (-${Math.floor(debuff * 100)}%)` : '';
      actions.push({
        label: `Attack with ${weaponType.name}${debuffStr}`,
        cls: 'primary',
        fn: () => {
          gameState.lastResult = `Attacked with ${weaponType.name}.`;
          combatSession.round = (combatSession.round || 0) + 1;
          window.renderChoices();
          window.render();
        }
      });
    } else {
      actions.push({
        label: `${weaponType.name} unusable at this distance`,
        cls: 'disabled',
        fn: () => {}
      });
    }

    renderButtonGroup(actionDiv, actions);
  }

  function renderMovementActions(gameState, combatSession) {
    const movementDiv = document.getElementById('movementButtons');
    const movements = [];

    const currentDist = combatSession.distance;
    const distances = ['close', 'medium', 'far', 'very_far'];
    const currentIdx = distances.indexOf(currentDist);

    // Move closer
    if (currentIdx > 0) {
      const nextDist = distances[currentIdx - 1];
      movements.push({
        label: `Advance to ${nextDist.toUpperCase()}`,
        cls: 'movement',
        fn: () => {
          combatSession.distance = nextDist;
          gameState.lastResult = `Advanced to ${nextDist} range.`;
          renderCombatUI(gameState, combatSession);
          window.render();
        }
      });
    }

    // Move farther
    if (currentIdx < distances.length - 1) {
      const nextDist = distances[currentIdx + 1];
      movements.push({
        label: `Retreat to ${nextDist.toUpperCase()}`,
        cls: 'movement',
        fn: () => {
          combatSession.distance = nextDist;
          gameState.lastResult = `Retreated to ${nextDist} range.`;
          renderCombatUI(gameState, combatSession);
          window.render();
        }
      });
    }

    if (movements.length === 0) {
      movements.push({
        label: 'No movement available',
        cls: 'disabled',
        fn: () => {}
      });
    }

    renderButtonGroup(movementDiv, movements);
  }

  function renderTacticalOptions(gameState, combatSession) {
    const tacticalDiv = document.getElementById('tacticalButtons');
    const options = [];

    // Flee option
    options.push({
      label: 'Attempt to Flee',
      cls: 'tactical flee',
      fn: () => {
        gameState.lastResult = 'Fled from combat.';
        combatSession.resolved = true;
        window.renderChoices();
        window.render();
      }
    });

    // Mercy option
    options.push({
      label: 'Show Mercy',
      cls: 'tactical mercy',
      fn: () => {
        gameState.lastResult = 'Chose mercy over violence.';
        combatSession.resolved = true;
        window.renderChoices();
        window.render();
      }
    });

    renderButtonGroup(tacticalDiv, options);
  }

  function renderButtonGroup(container, buttons) {
    container.innerHTML = '';
    buttons.forEach(btn => {
      const button = document.createElement('button');
      button.className = `actionButton ${btn.cls}`;
      button.textContent = btn.label;
      button.disabled = btn.cls === 'disabled';
      button.onclick = btn.fn;
      container.appendChild(button);
    });
  }

  window.renderCombatUI = renderCombatUI;
  window.initCombatDistance = initCombatDistance;
  window.calculateRangeDebuff = calculateRangeDebuff;
  window.canUseWeapon = canUseWeapon;
})();
