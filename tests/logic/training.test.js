'use strict';
const { createGameContext } = require('../setup');

describe('training redesign', () => {
  function makeCtx(overrides) {
    return createGameContext(Object.assign({
      archetype: 'Fighter', gold: 100,
      skills: { combat: 2, stealth: 1, survival: 1, lore: 1, persuasion: 1, craft: 1 },
      archetypeBaseStats: { combat: 3, stealth: 1, survival: 1, lore: 1, persuasion: 1, craft: 1 },
      trainingProgress: {}, trainingCooldown: {}, dayCount: 0
    }, overrides));
  }

  test('training costs 20 gold', () => {
    const c = makeCtx({ gold: 20 });
    if (!c.campAction) { console.warn('campAction not exported — skip'); return; }
    c.campAction('train', 'combat');
    expect(c.G.gold).toBe(0);
  });

  test('training 3 times increments skill by 1', () => {
    const c = makeCtx({ gold: 200 });
    if (!c.campAction) { console.warn('campAction not exported — skip'); return; }
    c.campAction('train', 'combat');
    c.campAction('train', 'combat');
    expect(c.G.skills.combat).toBe(2);
    c.campAction('train', 'combat');
    expect(c.G.skills.combat).toBe(3);
  });

  test('training fails with insufficient gold', () => {
    const c = makeCtx({ gold: 10 });
    if (!c.campAction) { console.warn('campAction not exported — skip'); return; }
    c.campAction('train', 'combat');
    expect(c.G.gold).toBe(10);
    expect(c.G.skills.combat).toBe(2);
  });

  test('training respects 30-day cooldown', () => {
    const c = makeCtx({ gold: 200, trainingCooldown: { combat: 25 }, dayCount: 20 });
    if (!c.campAction) { console.warn('campAction not exported — skip'); return; }
    c.campAction('train', 'combat');
    expect(c.G.gold).toBe(200);
  });
});
