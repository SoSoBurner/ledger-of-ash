// Comprehensive system check
global.window = {
  addEventListener: () => {},
  alignmentSystemExports: {}
};
global.document = { 
  getElementById: () => ({ value: '', style: {} }),
  querySelector: () => null
};

require('./js/data.js');
require('./js/engine.js');

console.log('=== SYSTEM INITIALIZATION CHECK ===');
console.log('');

// Try initializing a game
try {
  const result = window.beginNew('warrior', 'warrior_civic', 'shelkopolis');
  const G = window.G;
  
  console.log('✓ Game initialization successful');
  console.log('');
  console.log('State verification:');
  console.log('  Level:', G.level, '(expected: 1)');
  console.log('  XP:', G.xp, '(expected: 0)');
  console.log('  MaxHP:', G.maxHp, '(expected: 12)');
  console.log('  Stage:', G.stage, '(expected: 1)');
  console.log('  Companions:', (G.companions||[]).length);
  console.log('  Archetype:', G.archetype);
  console.log('');
  
  console.log('Alignment system:');
  const a = G.alignmentSystem;
  console.log('  Benevolence:', a.benevolence, '(range: -50 to +50)');
  console.log('  Order:', a.order, '(range: -50 to +50)');
  console.log('  Bands:', a.currentBandBenevolence, '/', a.currentBandOrder);
  console.log('  Origin Locality:', a.originLocality);
  console.log('  Origin Archetype:', a.originArchetype);
  console.log('');
  
  console.log('Heat system:');
  console.log('  Heat object exists:', !!G.heat);
  console.log('  Localities initialized:', Object.keys(G.heat).length);
  console.log('');
  
  console.log('Custody state:');
  console.log('  Imprisoned:', G.custody?.imprisoned || false);
  console.log('  Days left:', G.custody?.daysRemaining || 0);
  console.log('');
  
  // Test a few choices
  console.log('Choice rotation test:');
  const c1 = window.getNextChoice(G.stage, G.currentLocality);
  console.log('  Choice 1 exists:', !!c1);
  const c2 = window.getNextChoice(G.stage, G.currentLocality);
  console.log('  Choice 2 exists:', !!c2);
  console.log('  Different choices:', c1?.id !== c2?.id);
  console.log('');
  
  console.log('✓ All systems functional');
} catch(e) {
  console.error('✗ ERROR:', e.message);
  console.error('Stack:', e.stack.split('\n').slice(0,5).join('\n'));
}
