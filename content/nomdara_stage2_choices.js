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
        G.lastResult = `Lorn glances at your coin pouch — one practiced look, no touch. "Come back when you have more." He pulls his ledger open to the last-used page and picks up his pen.`;
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
        G.lastResult = `Lorn counts the coin with his thumb, drops it into a tin, and sets the ${item.name} on the counter without comment. He wraps it in oiled cloth before sliding it across. (${item.effect}) The transaction is logged in his ledger before you've picked it up.`;
        if (!G.nomdara_last_visit_locality) G.nomdara_last_visit_locality = locality;
        addJournal(`Nomdara: traded for ${item.name} — ${item.effect}`, 'discovery', `nom-trade-${G.dayCount}`);
      } else {
        G.lastResult = `Lorn names the price for the ${item.name} and waits. You count what you have. You are ${item.cost - G.gold} coin short. Lorn puts the item back on the shelf behind him and returns to his work. He does not suggest another item.`;
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
      G.lastResult = `Wren does not lecture. She demonstrates a thing, stops, watches you attempt it, adjusts your grip or your timing without speaking, and moves on. Two hours pass this way. When she dismisses you with a nod, the gap between what you know and what you can do with ${skillGained} is narrower than it was this morning. (+1 ${skillGained})`;
      addJournal(`Nomdara: Wren training — +1 ${skillGained}`, 'discovery', `nom-train-${G.dayCount}`);
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
        G.lastResult = `Sable circles you once, hands clasped at her back. She checks your eyes, your gait, the line of your shoulders. "Nothing I can address that would help you." She pulls her stool back to her workbench and picks up the instrument she'd set aside.`;
        G.recentOutcomeType = 'rest'; return;
      }
      if (!G.gold || G.gold < healingCost) {
        G.lastResult = `Sable states her rate without adjusting her expression. You count your coin twice. It doesn't change. She waits, then folds her hands and looks back at her workbench. The cost is the cost.`;
        G.recentOutcomeType = 'rest'; return;
      }
      G.gold -= healingCost;
      gainXp(40, 'Nomdara wound removal by Sable');
      if (G.wounds.length > 0) {
        const removed = G.wounds.shift();
        G.lastResult = `Sable works in a deliberate order — preparation, treatment, binding, check. She narrates nothing. The ${removed} is addressed and dressed before she steps back. The joint or tissue moves without the catch it had before. She makes a note in her ledger and sets the pen down.`;
        addJournal(`Nomdara: Sable removed wound: ${removed}`, 'discovery', `nom-heal-wound-${G.dayCount}`);
      } else if (G.flags && G.flags.suppression_exposed) {
        G.flags.suppression_exposed = false;
        G.lastResult = `Sable smells your breath and presses two fingers beneath your jaw. "Compound residue," she says. "Three days, minimum exposure." She prepares a flush compound — two parts, mixed in sequence — and has you drink it at the workbench. The grey at the edge of your thinking thins and clears. She watches you for a minute before nodding. "Don't take anything from a stranger for a week."`;
        addJournal('Nomdara: Sable cleared suppression compound exposure', 'discovery', `nom-heal-curse-${G.dayCount}`);
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
        G.lastResult = `Lorn doesn't look up from his ledger. "${infoCost} coin. That's the rate." He keeps writing. The pen scratches on without pause.`;
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
      G.lastResult = `Lorn sets his pen down, folds a small note from memory, and slides it across the counter. He speaks in the same register he uses for prices. "${rumor}" He picks up his pen and resumes writing before you've folded the note away.`;
      if (!G.nomdara_last_visit_locality) {
        G.nomdara_last_visit_locality = n ? n.attached_locality_id : 'unknown';
      }
      addJournal(`Nomdara rumor: ${rumor}`, 'rumor', `nom-intel-${G.dayCount}`);
      G.recentOutcomeType = 'rest'; maybeStageAdvance();
    }
  },

  {
    label: "Leave the Nomdara Caravan — step back onto the road.",
    tags: ['Travel', 'Nomdara'],
    xpReward: 0,
    fn: function() {
      G.lastResult = `You step past the last wagon and the camp noise drops off quickly — not silence, but the muffled version of it that comes through canvas and wheel-wood. The road beyond the Nomdara perimeter is unlit and cooler by several degrees. You walk until the caravan's lantern glow is a single warm smear on the horizon behind you.`;
      if (typeof renderChoices === 'function' && G && G.location) {
        if (typeof generateChoices === 'function') {
          renderChoices(generateChoices());
        }
      }
      G.recentOutcomeType = 'rest';
    }
  }

];

window.NOMDARA_STAGE2_CHOICES = NOMDARA_STAGE2_CHOICES;
