/**
 * BARD MID-SPINE — 3-node Stage 1 consequence chain
 *
 * Archetype-specific investigation branch that runs before shared spine
 * convergence. Injected via injectArchetypeMidSpineChoices in engine.js.
 * Gating is handled at the injection site; fn() executes unconditionally.
 *
 * Canon grounding: V28_8. Factions: House Shelk, Roadwardens, The Union,
 * House Panim. Starting localities: shelkopolis, guildheart_hub, panim_haven.
 */

window.BARD_MIDSPINE_NODES = [

  // ── NODE 1 ── Listen for the shape of the silence ─────────────────────────
  // Gate: G.archetype === 'bard' && G.stage === 1 && !G.signals.bardSpine
  {
    label: 'Listen to what the room is not saying — find the shape of the silence',
    tags: ['Bard', 'Investigate', 'Social', 'Voice'],
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      G.signals = G.signals || {};

      const loc = getLocality(G.location);
      const r = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const dc = 10;
      const success = r.isCrit || (r.total >= dc && !r.isFumble);

      G.lastRoll = {
        action: 'Listen for the shape of the silence',
        skill: 'persuasion', total: r.total, target: dc,
        success, die: r.die, crit: r.isCrit, fumble: r.isFumble
      };

      // Locality-specific opening text
      const openings = {
        shelkopolis: 'The story brokers along Verdant Row have gone quiet on one subject. Every market channel, every tavern corner — the same silence, shaped around the same absence. Someone paid for this, or threatened for it.',
        guildheart_hub: 'The trading floor accounts of the eastern manifest are consistent, and consistently wrong. Merchants do not all make the same error. They all tell the same truth — just not the official one.',
        panim_haven: 'The memorial singers are adjusting their cadence around certain names from the closure period. Memorial song does not self-edit. Someone asked them to, or someone frightened them into it.'
      };
      const opening = openings[G.location] ||
        `In ${loc.name}, the public story has a gap where there should be weight. The silence is not natural — it was placed.`;

      if (r.isCrit) {
        G.signals.bardSpine = 'voice_found';
        G.stageProgress[1] = (G.stageProgress[1] || 0) + 2;
        gainXp(10, 'bard mid-spine: voice read (critical)');
        addJournal('field-note',
          `Critical: read the shape of the silence in ${loc.name}. The gap is specific — it has a direction.`,
          `bard-spine-node1-crit-${G.dayCount}`
        );
        addNotice('Voice read: the silence has a specific shape and a specific source.');
        G.lastResult = opening + ' ' + (r.flavor || '') +
          ' The silence has edges. You know which direction to pull.';
        G.recentOutcomeType = 'investigate';
      } else if (success) {
        G.signals.bardSpine = 'voice_found';
        G.stageProgress[1] = (G.stageProgress[1] || 0) + 1;
        gainXp(8, 'bard mid-spine: voice read');
        addJournal('field-note',
          `Read the shape of the silence in ${loc.name}. There is a specific gap in the public record.`,
          `bard-spine-node1-${G.dayCount}`
        );
        G.lastResult = opening + ' You have found the edge of it. There is a thread worth pulling.';
        G.recentOutcomeType = 'investigate';
      } else if (r.isFumble) {
        G.worldClocks.pressure += 2;
        G.lastResult = `The listening goes wrong. Someone notices your attention before you notice them. The silence closes tighter around you.`;
        G.recentOutcomeType = 'setback';
      } else {
        G.worldClocks.pressure++;
        G.lastResult = opening + ' But the room reads you reading it. The silence holds. Try a different register.';
        G.recentOutcomeType = 'setback';
      }

      maybeStageAdvance();
    }
  },

  // ── NODE 2 ── Pull the suppressed thread ──────────────────────────────────
  // Gate: G.signals.bardSpine === 'voice_found'
  {
    label: 'Follow the thread you found — trace who went quiet and why',
    tags: ['Bard', 'Investigate', 'Pressure', 'Voice'],
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      G.signals = G.signals || {};

      const loc = getLocality(G.location);
      const r = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const dc = 12;
      const success = r.isCrit || (r.total >= dc && !r.isFumble);

      G.lastRoll = {
        action: 'Follow the suppressed thread',
        skill: 'persuasion', total: r.total, target: dc,
        success, die: r.die, crit: r.isCrit, fumble: r.isFumble
      };

      const threads = {
        shelkopolis: 'You trace the story broker who stopped talking. The payoff did not come from House Shelk directly — it came through a Roadwarden administrative office, paid in route clearance fees that do not match any posted manifest.',
        guildheart_hub: 'The merchant who filed the contradicting account has gone quiet. Their stall is still open. They are not missing — they were spoken to. The account they filed named a Union transit record that no longer exists in the archive.',
        panim_haven: 'The singer whose cadence changed is still performing at the memorial courts. In private, they tell you the edit was requested by a House Panim administrative clerk, citing a clerical discrepancy in the departure ledger for the closure period convoy.'
      };
      const thread = threads[G.location] ||
        `In ${loc.name}, the suppression traces back to an administrative action — someone with access to records paid or pressured the silence into place.`;

      if (r.isCrit) {
        G.signals.bardSpine = 'thread_pulled';
        G.stageProgress[1] = (G.stageProgress[1] || 0) + 3;
        G.worldClocks.rival = Math.max(0, (G.worldClocks.rival || 0) - 1);
        gainXp(15, 'bard mid-spine: thread pulled (critical)');
        addJournal('field-note',
          `Critical: pulled the suppressed thread in ${loc.name}. The source is administrative. The trail leads to the eastern route.`,
          `bard-spine-node2-crit-${G.dayCount}`
        );
        addNotice('Thread pulled: the suppression traces to a specific administrative action on the eastern route.');
        G.lastResult = thread + ' ' + (r.flavor || '') +
          ' You have the name of the clerk and the date of the record alteration. The rival faction does not yet know you have it.';
        G.recentOutcomeType = 'investigate';
      } else if (success) {
        G.signals.bardSpine = 'thread_pulled';
        G.stageProgress[1] = (G.stageProgress[1] || 0) + 2;
        gainXp(12, 'bard mid-spine: thread pulled');
        addJournal('field-note',
          `Pulled the suppressed thread in ${loc.name}. The silence was administratively placed. There is more to recover.`,
          `bard-spine-node2-${G.dayCount}`
        );
        G.lastResult = thread + ' The thread leads further. One more step before the account itself comes into reach.';
        G.recentOutcomeType = 'investigate';
      } else if (r.isFumble) {
        G.worldClocks.rival += 2;
        G.worldClocks.pressure++;
        G.lastResult = `The thread snaps. The source is warned. The rival faction knows you are following this line and has moved to cut it off.`;
        G.recentOutcomeType = 'setback';
      } else {
        G.worldClocks.rival++;
        G.lastResult = `The thread holds but does not yield. The source goes careful. The rival faction is watching more closely now.`;
        G.recentOutcomeType = 'setback';
      }

      maybeStageAdvance();
    }
  },

  // ── NODE 3 ── Recover the suppressed account ──────────────────────────────
  // Gate: G.signals.bardSpine === 'thread_pulled'
  {
    label: 'Recover the suppressed account — extract what was erased from the record',
    tags: ['Bard', 'Investigate', 'Decisive', 'Voice'],
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      G.signals = G.signals || {};

      const loc = getLocality(G.location);
      const r = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const dc = 14;
      const success = r.isCrit || (r.total >= dc && !r.isFumble);

      G.lastRoll = {
        action: 'Recover the suppressed account',
        skill: 'persuasion', total: r.total, target: dc,
        success, die: r.die, crit: r.isCrit, fumble: r.isFumble
      };

      const recoveries = {
        shelkopolis: 'The story broker gives you the suppressed account. It names a specific cargo on the eastern route — cleared by a Roadwarden administrative seal that has no matching issuance record. The cargo moved. The paperwork was erased after it did.',
        guildheart_hub: 'The merchant's private ledger entry surfaces through a Union archive contact. It names an eastern route manifest discrepancy traced to a Shadowhands transit seal applied to Union-registered freight. The Union does not know the seal was used.',
        panim_haven: 'The decoded memorial song preserves witness accounts in the voices of the convoy dead. A convoy recorded in the official House Panim ledger as never arriving did arrive — and then was recorded as lost. Something was removed from that convoy before the record was altered.'
      };
      const recovery = recoveries[G.location] ||
        `The suppressed account surfaces in ${loc.name}. It names an eastern route action that was administratively erased after the fact.`;

      const noticeTexts = {
        shelkopolis: 'Account recovered: Roadwarden clearance with no issuance record. The eastern route investigation has a named cargo.',
        guildheart_hub: 'Account recovered: Shadowhands seal on Union freight. The eastern route investigation has a named transit actor.',
        panim_haven: 'Account recovered: the convoy that officially never arrived did arrive. The eastern route investigation has a named loss event.'
      };

      if (r.isCrit) {
        G.signals.bardSpine = 'converged';
        G.stageProgress[1] = (G.stageProgress[1] || 0) + 5;
        gainXp(22, 'bard mid-spine: account recovered (critical)');
        addJournal('fact',
          `Critical: recovered the suppressed account in ${loc.name}. The account feeds directly into the eastern route investigation.`,
          `bard-spine-node3-crit-${G.dayCount}`
        );
        markMoment(`Recovered the suppressed account in ${loc.name}`);
        addNotice(noticeTexts[G.location] || 'Suppressed account recovered. The investigation opens onto the eastern route.');
        G.lastResult = recovery + ' ' + (r.flavor || '') +
          ' The account is intact and specific. You are inside the shared spine of the investigation now.';
        G.recentOutcomeType = 'investigate';
      } else if (success) {
        G.signals.bardSpine = 'converged';
        G.stageProgress[1] = (G.stageProgress[1] || 0) + 3;
        gainXp(18, 'bard mid-spine: account recovered');
        addJournal('fact',
          `Recovered the suppressed account in ${loc.name}. The eastern route investigation is now the active pressure.`,
          `bard-spine-node3-${G.dayCount}`
        );
        markMoment(`Recovered the suppressed account in ${loc.name}`);
        addNotice(noticeTexts[G.location] || 'Suppressed account recovered. The eastern route investigation is now active.');
        G.lastResult = recovery + ' The investigation has converged. The eastern route pressure is now the central concern.';
        G.recentOutcomeType = 'investigate';
      } else if (r.isFumble) {
        G.worldClocks.rival += 2;
        G.worldClocks.pressure += 2;
        G.lastResult = `The account is within reach and slips away. The source goes to ground. The rival faction has been alerted that someone is actively recovering the suppressed record.`;
        G.recentOutcomeType = 'setback';
      } else {
        G.worldClocks.pressure++;
        G.worldClocks.rival++;
        G.lastResult = `The account is close. The source is not yet ready. The rival faction is moving to close the window before it opens fully.`;
        G.recentOutcomeType = 'setback';
      }

      maybeStageAdvance();
    }
  }

];
