const fs = require('fs');

let content = fs.readFileSync('src/data/menu.ts', 'utf8');

// Add group property to MenuItem interface
if (!content.includes('group?: { DE: string; EN: string; TR: string };')) {
  content = content.replace('export interface MenuItem {', 'export interface MenuItem {\n  group?: { DE: string; EN: string; TR: string };');
}

// Convert string to array of lines for easy parsing
let lines = content.split('\n');
let finalLines = [];
let currentId = null;

let insideCocktails = false;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  let idMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
  if (idMatch) {
    currentId = idMatch[1];
  }

  if (line.includes("subcategory: 'Cocktails'")) {
    // We are at the end of a cocktail item, let's inject group before this line
    if (['d18', 'd19', 'd20', 'd21'].includes(currentId)) {
       finalLines.push(`    group: { DE: 'Signature Cocktails', EN: 'Signature Cocktails', TR: 'İmza Kokteyller' },`);
    } else {
       finalLines.push(`    group: { DE: 'High Class Cocktails', EN: 'High Class Cocktails', TR: 'High Class Kokteyller' },`);
    }
  }

  finalLines.push(line);

  // If this is the last cocktail (d22), add the two new ones after it!
  if (line.trim() === '},' && currentId === 'd22' && !content.includes('Cotton Candy Shop')) {
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
    currentId = null; // reset so we don't trigger it again
  }
}

fs.writeFileSync('src/data/menu.ts', finalLines.join('\n'), 'utf8');
console.log('Restored cocktail groups and new items successfully!');
