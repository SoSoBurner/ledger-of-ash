/**
 * NOMDARA STAGE 2 CHOICES
 * Four service trees: rare item trade, esoteric training, wound/curse removal, information purchase
 * Uses NOMDARA_OVERLAY.plot_adjacent_rumors and world_color_rumors
 */

const NOMDARA_STAGE2_CHOICES = [

  {
    label: "Trade with Lorn — rare items in the caravan stock, priced in hard coin. 'Prices are not negotiable. Barter is.'",
    tags: ['Trade', 'Nomdara'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.gold || G.gold < 15) {
        G.lastResult = `Lorn reviews your coin pouch. "Not enough." He turns back to his ledger.`;
        G.recentOutcomeType = 'rest'; return;
      }
      const n = window.NOMDARA_OVERLAY;
      const locality = n ? n.attached_locality_id : 'unknown';
      const roll = Math.floor(Math.random() * 4);
      const items = [
        { name: 'resonance chalk', effect: 'glyph detection, 3 uses', cost: 15 },
        { name: 'ash-silver vial', effect: 'suppression compound antidote component', cost: 20 },
        { name: 'sealed route map', effect: 'reveals one hidden northern route', cost: 25 },
        { name: 'Nomdara road token', effect: '+1 persuasion in any caravan settlement', cost: 12 }
      ];
      const item = items[roll];
      if (G.gold >= item.cost) {
        G.gold -= item.cost;
        if (!G.inventory) G.inventory = [];
        G.inventory.push({ name: item.name, effect: item.effect, source: 'nomdara_lorn' });
        gainXp(30, 'Nomdara rare item trade');
        G.lastResult = `Lorn counts the coin without looking up. The ${item.name} is placed on the counter. (${item.effect})`;
        if (!G.nomdara_last_visit_locality) G.nomdara_last_visit_locality = locality;
        addJournal('trade', `Nomdara: traded for ${item.name} — ${item.effect}`, `nom-trade-${G.dayCount}`);
      } else {
        G.lastResult = `Lorn names the price for the ${item.name}. You are ${item.cost - G.gold} coin short. He does not offer alternatives.`;
      }
      G.recentOutcomeType = 'rest'; maybeStageAdvance();
    }
  },

  {
    label: "Train with Wren — esoteric knowledge in exchange for time. 'She reads ash and distance the same way.'",
    tags: ['Training', 'Nomdara'],
    xpReward: 55,
    fn: function() {
      advanceTime(2); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(55, 'Nomdara esoteric training with Wren');
      if (!G.skills) G.skills = { combat:0, survival:0, persuasion:0, lore:0, stealth:0, craft:0 };
      if (!G.nomdara_last_visit_locality) {
        const n = window.NOMDARA_OVERLAY;
        G.nomdara_last_visit_locality = n ? n.attached_locality_id : 'unknown';
      }
      const roll = Math.floor(Math.random() * 6);
      const skillKeys = ['lore', 'survival', 'craft', 'stealth', 'persuasion', 'combat'];
      const chosenSkill = skillKeys[roll];
      const archGroup = G.archetype && G.archetype.group ? G.archetype.group : null;
      let skillGained = chosenSkill;
      if (archGroup === 'magic') skillGained = 'lore';
      else if (archGroup === 'combat') skillGained = 'combat';
      else if (archGroup === 'stealth') skillGained = 'stealth';
      else if (archGroup === 'support') skillGained = 'persuasion';
      G.skills[skillGained] = (G.skills[skillGained] || 0) + 1;
      G.lastResult = `Wren teaches through motion and silence. When she finishes, something in your ${skillGained} practice has shifted. (+1 ${skillGained})`;
      addJournal('training', `Nomdara: Wren training — +1 ${skillGained}`, `nom-train-${G.dayCount}`);
      G.recentOutcomeType = 'rest'; maybeStageAdvance();
    }
  },

  {
    label: "Speak to Sable about wound or curse removal — 'She does not explain the route. She finds it.'",
    tags: ['Healing', 'Nomdara'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.wounds) G.wounds = [];
      if (!G.nomdara_last_visit_locality) {
        const n = window.NOMDARA_OVERLAY;
        G.nomdara_last_visit_locality = n ? n.attached_locality_id : 'unknown';
      }
      const healingCost = 18;
      if (G.wounds.length === 0 && (!G.flags || !G.flags.suppression_exposed)) {
        G.lastResult = `Sable looks you over without touching anything. "Nothing to remove that would serve you." She returns to her records.`;
        G.recentOutcomeType = 'rest'; return;
      }
      if (!G.gold || G.gold < healingCost) {
        G.lastResult = `Sable names the cost without inflection. You do not have ${healingCost} coin.`;
        G.recentOutcomeType = 'rest'; return;
      }
      G.gold -= healingCost;
      gainXp(40, 'Nomdara wound removal by Sable');
      if (G.wounds.length > 0) {
        const removed = G.wounds.shift();
        G.lastResult = `Sable works without narration. The ${removed} is gone. You feel the absence of it more than the removal.`;
        addJournal('healing', `Nomdara: Sable removed wound: ${removed}`, `nom-heal-wound-${G.dayCount}`);
      } else if (G.flags && G.flags.suppression_exposed) {
        G.flags.suppression_exposed = false;
        G.lastResult = `Sable identifies the compound residue in your system and addresses it without comment. The suppression fog lifts.`;
        addJournal('healing', 'Nomdara: Sable cleared suppression compound exposure', `nom-heal-curse-${G.dayCount}`);
      }
      G.recentOutcomeType = 'rest'; maybeStageAdvance();
    }
  },

  {
    label: "Purchase information from Lorn — the caravan sees everything passing through every road. The price is coin and discretion.",
    tags: ['Information', 'Nomdara'],
    xpReward: 35,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      const infoCost = 10;
      if (!G.gold || G.gold < infoCost) {
        G.lastResult = `Lorn shakes his head once. "${infoCost} coin for a rumor. Standard rate."`;
        G.recentOutcomeType = 'rest'; return;
      }
      G.gold -= infoCost;
      gainXp(35, 'Nomdara information purchase from Lorn');
      const n = window.NOMDARA_OVERLAY;
      const plotRumors = n && n.plot_adjacent_rumors ? n.plot_adjacent_rumors : [
        "The staging location's second cache has not moved in three weeks. Someone is waiting for a signal.",
        "The Collegium liaison assigned to Aurora Crown has been recalled. A replacement has not arrived.",
        "Tazren Coilspire's case file has been copied and sent to an address in Soreheim. Someone fears it.",
        "The Glasswake research back-channel is being monitored. The watcher does not know what to do with what they see.",
        "A courier who knows the bridge transfer schedule has gone silent. Their employer is looking for them."
      ];
      const worldRumors = n && n.world_color_rumors ? n.world_color_rumors : [
        "The glasswake mites have been migrating north. Something is disturbing their feeding grounds.",
        "A Shirshal compliance officer married into the Coilspire family last season. The family has not spoken of it.",
        "House Cosmouth's maritime archive has been recataloguing decommissioned vessels for the past year. Archivists are tired.",
        "The Harvest Circle commune elders argue every season about whether the Patron of Forests holds too much influence.",
        "The Nomdara caravan once wintered in a settlement that no longer exists. Sable never names it.",
        "An airship that ran the Cosmoria-Shelkopolis lane three years ago never returned from its last flight. No explanation was given.",
        "The Iron Ledger Ward's night watchmen are paid significantly more than day watchmen. They are not told why."
      ];
      const usePlot = Math.random() < 0.5;
      const pool = usePlot ? plotRumors : worldRumors;
      const rumor = pool[Math.floor(Math.random() * pool.length)];
      G.lastResult = `Lorn slides a folded note across the counter without touching your hand. ${rumor}`;
      if (!G.nomdara_last_visit_locality) {
        G.nomdara_last_visit_locality = n ? n.attached_locality_id : 'unknown';
      }
      addJournal('information', `Nomdara rumor: ${rumor}`, `nom-intel-${G.dayCount}`);
      G.recentOutcomeType = 'rest'; maybeStageAdvance();
    }
  },

  {
    label: "Leave the Nomdara Caravan — step back onto the road.",
    tags: ['Travel', 'Nomdara'],
    xpReward: 0,
    fn: function() {
      G.lastResult = `You leave the caravan. The lanterns behind you diminish but do not go out.`;
      if (typeof renderChoices === 'function' && window.G && G.location) {
        if (typeof generateChoices === 'function') {
          renderChoices(generateChoices());
        }
      }
      G.recentOutcomeType = 'rest';
    }
  }

];
