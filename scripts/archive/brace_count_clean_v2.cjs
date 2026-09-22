const fs = require('fs');

let content = fs.readFileSync('src/data/menu.ts', 'utf8');

// Ensure MenuItem has group property
if (!content.includes('group?: { DE: string; EN: string; TR: string };')) {
  content = content.replace('export interface MenuItem {', 'export interface MenuItem {\n  group?: { DE: string; EN: string; TR: string };');
}

const lines = content.split('\n');
let newLines = [];
let i = 0;

let insideArray = false;
let currentItemLines = [];
let depth = 0;
let skipItem = false;

while (i < lines.length) {
  let line = lines[i];

  if (!insideArray) {
    newLines.push(line);
    if (line.includes('export const menuData: MenuItem[] = [')) {
      insideArray = true;
    }
    i++;
    continue;
  }

  if (depth === 0 && line.trim() === '];') {
    insideArray = false;
    newLines.push(line);
    i++;
    continue;
  }

  if (depth === 0 && line.trim().startsWith('//')) {
    if (!line.includes('HAPPY HOUR COMBOS') && !line.includes('--- Kombis ---')) {
      newLines.push(line);
    }
    i++;
    continue;
  }
  
  if (depth === 0 && line.trim() === '') {
    newLines.push(line);
    i++;
    continue;
  }

  let openBraces = (line.match(/\{/g) || []).length;
  let closeBraces = (line.match(/\}/g) || []).length;

  if (depth === 0 && openBraces > 0) {
    currentItemLines = [];
    skipItem = false;
  }

  depth += openBraces;
  depth -= closeBraces;

  currentItemLines.push(line);

  // Use regex to match ID accurately regardless of quotes
  if (line.match(/id:\s*['"](d23|d24|d25|hh_kombi1|hh_kombi2|hh_kombi3|k1|k2|k3|k4.*|k5.*|d_fh_4)['"]/)) {
    skipItem = true;
  }

  if (depth === 0 && currentItemLines.length > 0) {
    if (!skipItem) {
      newLines.push(...currentItemLines);
    }
    currentItemLines = [];
  }
  
  i++;
}

let finalLines = [];
let currentId = null;

for (let j = 0; j < newLines.length; j++) {
  let line = newLines[j];
  
  let idMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
  if (idMatch) {
    currentId = idMatch[1];
  }
  
  // Idempotent group addition
  if (line.includes("subcategory: 'Cocktails'") && currentId && !newLines.slice(j-5, j).some(l => l.includes('group: {'))) {
    if (currentId.startsWith('d_hc_')) {
      finalLines.push(`    group: { DE: 'High Class Cocktails', EN: 'High Class Cocktails', TR: 'High Class Kokteyller' },`);
    } else if (currentId.startsWith('d_sig_')) {
      finalLines.push(`    group: { DE: 'Signature Cocktails', EN: 'Signature Cocktails', TR: 'İmza Kokteyller' },`);
    }
  }

  finalLines.push(line);
  
  if ((line.trim() === '},' || line.trim() === '}') && currentId === 'd_hc_4' && !newLines.some(l => l.includes("id: 'd_hc_5'"))) {
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

let menuStr = finalLines.join('\n');
menuStr = menuStr.replace(/\},\n+\];/, '}\n];');
fs.writeFileSync('src/data/menu.ts', menuStr, 'utf8');
console.log('Fixed flawlessly part 7!');
