const fs = require('fs');
let content = fs.readFileSync('src/data/menu.ts', 'utf-8');

const updates = [
  { id: 'd1', name: 'Golden Mango Macchiatto', price: 7.50, allergens: ['G', 'A'], additives: [] },
  { id: 'd2', name: 'Iced Strawberry Velvet', price: 7.50, allergens: ['G', 'A'], additives: ['9'] },
  { id: 'd6', name: 'Iced Latte', price: 6.90, allergens: ['G'], additives: [] },
  { id: 'd_sig_2', price: 8.90, allergens: ['G'], additives: [] },
  { id: 'd_sig_6', price: 8.90, allergens: ['G'], additives: [] },
  { id: 'd_sig_8', price: 9.40, allergens: ['G'], additives: [] },
  { id: 'd_hc_4', price: 10.90, allergens: ['G', 'C'], additives: [] },
  { id: 'd_new_cocktail_2', price: 10.90, allergens: ['G'], additives: [] },
  { id: 'd_hc_1', price: 10.90, allergens: ['G', 'C'], additives: [] },
  { id: 'd_hc_2', price: 10.90, allergens: ['G'], additives: [] },
  { id: 'd_fh_4', name: 'Softy Gold', price: 6.90, allergens: ['G'], additives: [] },
  { id: 'd_fh_6', name: 'Berry Yakult Peach Limo', price: 7.40, allergens: ['G'], additives: [] },
  { id: 'd_fh_8', name: 'Rosé', price: 7.40, allergens: ['G'], additives: [] },
  { id: 'd17', name: 'Schweppes Wild Berry', price: 3.60, allergens: [], additives: ['1', '2', '3'] },
  { id: 'd18', name: 'Rixdorfer Fassbrause', price: 4.20, allergens: [], additives: ['1', '2', '3'] },
  { id: 'd19', name: 'Club-Mate', price: 4.60, allergens: [], additives: ['1', '2'] },
  { id: 'd20', price: 4.60, allergens: [], additives: ['1', '2', '3'] },
  { id: 'd_sd_moloko', price: 4.60, allergens: [], additives: ['1', '2', '3', '13'] },
  { id: 'd_sm_1', price: 7.90, allergens: ['H'], additives: [] },
  { id: 'd_sm_2', price: 7.90, allergens: ['H'], additives: [] },
  { id: 'd_sm_3', price: 7.90, allergens: ['H'], additives: [] },
  { id: 'd_sm_4', price: 7.90, allergens: [], additives: [] },
  { id: 'd_sm_5', price: 7.90, allergens: ['H'], additives: [] },
  { id: 'd_shake_1', price: 7.90, allergens: ['G', 'H', 'A'], additives: [] },
  { id: 'd_shake_2', price: 7.90, allergens: ['G', 'H', 'A'], additives: [] },
  { id: 'd_shake_3', price: 7.90, allergens: ['G', 'H', 'A'], additives: [] },
  { id: 'd_shake_4', price: 7.90, allergens: ['G', 'H'], additives: [] },
  { id: 'd_shake_5', price: 7.90, allergens: ['G', 'H'], additives: [] },
];

for (const update of updates) {
  // Find the block for the item
  const regex = new RegExp(`(id:\\s*'${update.id}',[\\s\\S]*?\\})`);
  let match = content.match(regex);
  if (!match) {
    console.log('Could not find', update.id);
    continue;
  }
  
  let block = match[0];
  let originalBlock = block;
  
  // Update name if provided
  if (update.name) {
    // Replaces name: { DE: '...' ... }
    block = block.replace(/name:\s*\{\s*DE:\s*'[^']+',\s*EN:\s*'[^']+',\s*TR:\s*'[^']+',\s*FR:\s*'[^']+',\s*ES:\s*'[^']+',\s*RU:\s*'[^']+'\s*\}/g, 
      `name: { DE: '${update.name}', EN: '${update.name}', TR: '${update.name}', FR: '${update.name}', ES: '${update.name}', RU: '${update.name}' }`);
    
    // Also simple string name if not localized: name: '...'
    block = block.replace(/name:\s*'[^']+'/g, `name: { DE: '${update.name}', EN: '${update.name}', TR: '${update.name}', FR: '${update.name}', ES: '${update.name}', RU: '${update.name}' }`);
  }
  
  // Update price
  block = block.replace(/price:\s*[\d.]+/, `price: ${update.price.toFixed(2)}`);
  
  // Remove existing allergens / additives
  block = block.replace(/allergens:\s*\[.*?\],?\s*/g, '');
  block = block.replace(/additives:\s*\[.*?\],?\s*/g, '');
  
  // Add them back before category or imageUrl
  let injections = [];
  if (update.allergens && update.allergens.length > 0) {
    injections.push(`allergens: [${update.allergens.map(a => `'${a}'`).join(', ')}]`);
  }
  if (update.additives && update.additives.length > 0) {
    injections.push(`additives: [${update.additives.map(a => `'${a}'`).join(', ')}]`);
  }
  
  if (injections.length > 0) {
    block = block.replace(/(category:\s*['"][^'"]+['"],?)/, `${injections.join(',\n    ')},\n    $1`);
  }
  
  content = content.replace(originalBlock, block);
}

fs.writeFileSync('src/data/menu.ts', content);
console.log('Updated menu.ts');
