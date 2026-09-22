const fs = require('fs');
let content = fs.readFileSync('src/data/menu.ts', 'utf8');

// Add group property to MenuItem interface if not exists
if (!content.includes('group?: { DE: string; EN: string; TR: string };')) {
  content = content.replace('export interface MenuItem {', 'export interface MenuItem {\n  group?: { DE: string; EN: string; TR: string };');
}

let lines = content.split(/\r?\n/);
let newLines = [];
let skipDepth = 0;
let skipping = false;
let currentId = null;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  if (!skipping) {
    let idMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
    if (idMatch) {
      currentId = idMatch[1];
      
      // Items to remove (Mango Lassi, Virgin Mojito, Passion Fruit, Kombis)
      if (['d23', 'd24', 'd25', 'hh_kombi1', 'hh_kombi2', 'hh_kombi3'].includes(currentId)) {
        skipping = true;
        skipDepth = 1;
        // Pop the preceding '{'
        while (newLines.length > 0) {
          let lastLine = newLines.pop();
          if (lastLine.includes('{')) break;
        }
        continue;
      }
    }
  }
  
  if (skipping) {
    skipDepth += (line.match(/\{/g) || []).length;
    skipDepth -= (line.match(/\}/g) || []).length;
    if (skipDepth === 0) {
      skipping = false;
    }
    continue;
  }
  
  // Ignore old combo comments just in case
  if (line.includes('// --- HAPPY HOUR COMBOS ---') || line.includes('// --- Kombis ---')) {
    continue;
  }
  
  // Inject group logic into cocktails
  if (line.includes("subcategory: 'Cocktails'")) {
    if (['d18', 'd19', 'd20', 'd21'].includes(currentId)) {
       newLines.push(`    group: { DE: 'Signature Cocktails', EN: 'Signature Cocktails', TR: 'İmza Kokteyller' },`);
    } else {
       newLines.push(`    group: { DE: 'High Class Cocktails', EN: 'High Class Cocktails', TR: 'High Class Kokteyller' },`);
    }
  }
  
  newLines.push(line);
}

let finalStr = newLines.join('\n');

// Add Bubble Tea
let bubbleTeaItems = `
  {
    id: 'd_new_cocktail_1',
    name: { DE: 'Cotton Candy Shop', EN: 'Cotton Candy Shop', TR: 'Cotton Candy Shop' },
    price: 9.90,
    description: { DE: 'Zuckerwatte, Granatapfel, Bubble-Tea, Sprite', EN: 'Cotton candy, pomegranate, bubble tea, Sprite', TR: 'Pamuk Şeker, nar, bubble tea, Sprite' },
    imageUrl: '/images/menury_originals/high_class_cocktails__cotton_candy_shop.webp',
    category: 'drinks',
    group: { DE: 'High Class Cocktails', EN: 'High Class Cocktails', TR: 'High Class Kokteyller' },
    subcategory: 'Cocktails'
  },
  {
    id: 'd_new_cocktail_2',
    name: { DE: 'Dreamy Breeze', EN: 'Dreamy Breeze', TR: 'Dreamy Breeze' },
    price: 9.90,
    description: { DE: 'Zuckerwatte, Granatapfel, Bubble-Tea, Sprite', EN: 'Cotton candy, pomegranate, bubble tea, Sprite', TR: 'Pamuk Şeker, nar, bubble tea, Sprite' },
    imageUrl: '/images/menury_originals/high_class_cocktails__dreamy_breeze.webp',
    category: 'drinks',
    group: { DE: 'High Class Cocktails', EN: 'High Class Cocktails', TR: 'High Class Kokteyller' },
    subcategory: 'Cocktails'
  }`;

// Add Happy Hour
let happyHourItem = `
  {
    id: 'hh_angebot_1',
    name: { DE: 'Happy Hour Angebote', EN: 'Happy Hour Offers', TR: 'Happy Hour Fırsatları' },
    price: 0,
    description: { DE: 'Täglich wechselnde Angebote - frage unser Personal!', EN: 'Daily changing offers - ask our staff!', TR: 'Günlük değişen fırsatlar - personelimize sorunuz!' },
    imageUrl: '',
    category: 'happy_hour',
    subcategory: 'Happy Hour'
  }`;

// Inject Bubble tea before the end of the array, or before shakes
if (finalStr.includes('// --- SHAKES ---')) {
    finalStr = finalStr.replace('// --- SHAKES ---', bubbleTeaItems + ',\n  // --- SHAKES ---');
}

// Inject happy hour exactly before the end of the array (handling CRLF/LF gracefully)
finalStr = finalStr.replace(/];\r?\n\r?\nexport const allergenLegend/, happyHourItem + '\n];\n\nexport const allergenLegend');

fs.writeFileSync('src/data/menu.ts', finalStr, 'utf8');
console.log('Successfully fully cleaned and updated menu.ts!');
