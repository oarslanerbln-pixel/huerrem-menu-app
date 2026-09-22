const fs = require('fs');

let content = fs.readFileSync('src/data/menu.ts', 'utf8');
const lines = content.split('\n');

let newLines = [];
let i = 0;
let skipItem = false;
let currentItemLines = [];

while (i < lines.length) {
  let line = lines[i];
  
  if (line.includes('  {') || (line.trim() === '{' && lines[i+1] && lines[i+1].includes('id:'))) {
    currentItemLines = [line];
    skipItem = false;
    i++;
    continue;
  }
  
  if (currentItemLines.length > 0) {
    currentItemLines.push(line);
    
    if (line.includes("id: 'd23'") || 
        line.includes("id: 'd24'") || 
        line.includes("id: 'd25'") || 
        line.includes("id: 'k1'") || 
        line.includes("id: 'k2'") || 
        line.includes("id: 'k3'") || 
        line.includes("id: 'k4 – Friends'") || 
        line.includes("id: 'k5 – Royal'") || 
        line.includes("id: 'hh_kombi1'") || 
        line.includes("id: 'hh_kombi2'") || 
        line.includes("id: 'hh_kombi3'") || 
        line.includes("Cremige Kombination aus frischen Mangostücken, Joghurt, Zucker und Milch - tropisch und samtig.") ||
        line.includes("Cremige Kombination aus frischen Mangostückchen, Joghurt, Zucker und Milch - tropisch und samtig.")) {
      skipItem = true;
    }
    
    if (line.trim() === '},' || (line.trim() === '}' && i === lines.length - 3)) {
      if (!skipItem) {
        newLines.push(...currentItemLines);
      }
      currentItemLines = [];
    }
  } else {
    if (!line.includes('--- HAPPY HOUR COMBOS ---') && !line.includes('--- Kombis ---')) {
      newLines.push(line);
    }
  }
  i++;
}

let finalLines = [];
let currentId = null;

for (let j = 0; j < newLines.length; j++) {
  let line = newLines[j];
  
  let idMatch = line.match(/id:\s*'([^']+)'/);
  if (idMatch) {
    currentId = idMatch[1];
  }
  
  if (line.includes("subcategory: 'Cocktails'") && currentId) {
    if (currentId.startsWith('d_hc_')) {
      finalLines.push(`    group: { DE: 'High Class Cocktails', EN: 'High Class Cocktails', TR: 'High Class Kokteyller' },`);
    } else if (currentId.startsWith('d_sig_')) {
      finalLines.push(`    group: { DE: 'Signature Cocktails', EN: 'Signature Cocktails', TR: 'İmza Kokteyller' },`);
    }
  }

  finalLines.push(line);
  
  if (line.trim() === '},' && currentId === 'd_hc_4') {
    finalLines.push(`  {
    id: 'd_hc_5',
    name: { DE: 'Cotton Candy Shop', EN: 'Cotton Candy Shop', TR: 'Cotton Candy Shop' },
    price: 11.90,
    description: { DE: 'Bananensaft, Kokoscreme, Sahne.', EN: 'Banana juice, coconut cream, whipped cream.', TR: 'Muz suyu, hindistan cevizi kreması, krema.' },
    imageUrl: '/images/menury_originals/high_class_cocktails__cotton_candy_shop.webp',
    category: 'drinks',
    group: { DE: 'High Class Cocktails', EN: 'High Class Cocktails', TR: 'High Class Kokteyller' },
    subcategory: 'Cocktails'
  },
  {
    id: 'd_hc_6',
    name: { DE: 'Dreamy Breeze (Bubble-Tea)', EN: 'Dreamy Breeze (Bubble-Tea)', TR: 'Dreamy Breeze (Bubble-Tea)' },
    price: 11.90,
    description: { DE: 'Ube-Flavour, brauner Zuckersirup, Kokosmilch, Blaubeerperlen, Heavy Cream. Ein cremiger, exotischer Genuss mit überraschendem Look.', EN: 'Ube flavor, brown sugar syrup, coconut milk, blueberry pearls, heavy cream.', TR: 'Ube aroması, esmer şeker şurubu, hindistan cevizi sütü, yaban mersini incileri, krema.' },
    imageUrl: '/images/menury_originals/high_class_cocktails__dreamy_breeze.webp',
    allergens: ['G'],
    category: 'drinks',
    group: { DE: 'High Class Cocktails', EN: 'High Class Cocktails', TR: 'High Class Kokteyller' },
    subcategory: 'Cocktails'
  },`);
  }
}

let finalStr = finalLines.join('\n').replace(/\n\s*\n\s*\n/g, '\n\n');
finalStr = finalStr.replace(/\},\n+\];/, '}\n];');

fs.writeFileSync('src/data/menu.ts', finalStr, 'utf8');
console.log('Cleaned up completely!');
