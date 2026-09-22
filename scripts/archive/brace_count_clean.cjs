const fs = require('fs');

let content = fs.readFileSync('src/data/menu.ts', 'utf8');
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

  // Check if this is the end of the array
  if (depth === 0 && line.trim() === '];') {
    insideArray = false;
    newLines.push(line);
    i++;
    continue;
  }

  // Ignore comments that are outside items
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

  // Count braces
  let openBraces = (line.match(/\{/g) || []).length;
  let closeBraces = (line.match(/\}/g) || []).length;

  if (depth === 0 && openBraces > 0) {
    // Start of a new item
    currentItemLines = [];
    skipItem = false;
  }

  depth += openBraces;
  depth -= closeBraces;

  currentItemLines.push(line);

  if (line.includes("id: 'd23'") || 
      line.includes("id: 'd24'") || 
      line.includes("id: 'd25'") || 
      line.includes("id: 'hh_kombi1'") || 
      line.includes("id: 'hh_kombi2'") || 
      line.includes("id: 'hh_kombi3'") ||
      line.includes("id: 'k1'") ||
      line.includes("id: 'k2'") ||
      line.includes("id: 'k3'") ||
      line.includes("id: 'k4 – Friends'") ||
      line.includes("id: 'k5 – Royal'") ||
      line.includes("id: 'd_fh_4'")
  ) {
    skipItem = true;
  }

  if (depth === 0 && currentItemLines.length > 0) {
    // End of item
    if (!skipItem) {
      newLines.push(...currentItemLines);
    }
    currentItemLines = [];
  }
  
  i++;
}

// Ensure the group fixes are added to high class and signature cocktails
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
  
  if ((line.trim() === '},' || line.trim() === '}') && currentId === 'd_hc_4') {
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

// Clean up dangling commas before the array close
let menuStr = finalLines.join('\n');
menuStr = menuStr.replace(/\},\n+\];/, '}\n];');
fs.writeFileSync('src/data/menu.ts', menuStr, 'utf8');
console.log('Fixed flawlessly part 6!');
