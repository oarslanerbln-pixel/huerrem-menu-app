const fs = require('fs');
let content = fs.readFileSync('src/data/menu.ts', 'utf8');

// 1. Better approach to removing d23, d24, d25
const removeIds = ['d23', 'd24', 'd25'];
removeIds.forEach(id => {
  const matchStr = `  {\n    id: '${id}',`;
  const startIdx = content.indexOf(matchStr);
  if (startIdx !== -1) {
    const endStr = `\n  },`;
    let endIdx = content.indexOf(endStr, startIdx);
    // Find the ACTUAL closing brace of the item by checking if the endStr has another property after it or just the next item.
    // A safer way is to just use a custom logic or search for "  }," at the start of a line.
    
    // Let's use substring for better parsing
    let searchArea = content.substring(startIdx);
    let closeIdx = searchArea.search(/\n  \},/);
    if (closeIdx !== -1) {
      content = content.substring(0, startIdx) + searchArea.substring(closeIdx + 5);
    }
  }
});

// 2. Add group to hc and sig
for (let i = 1; i <= 4; i++) {
  let idMatch = new RegExp(`id: 'd_hc_${i}'[\\s\\S]*?subcategory: 'Cocktails'`);
  content = content.replace(idMatch, (match) => match.replace(`subcategory: 'Cocktails'`, `group: { DE: 'High Class Cocktails', EN: 'High Class Cocktails', TR: 'High Class Kokteyller' },\n    subcategory: 'Cocktails'`));
}

for (let i = 1; i <= 6; i++) {
  let idMatch = new RegExp(`id: 'd_sig_${i}'[\\s\\S]*?subcategory: 'Cocktails'`);
  content = content.replace(idMatch, (match) => match.replace(`subcategory: 'Cocktails'`, `group: { DE: 'Signature Cocktails', EN: 'Signature Cocktails', TR: 'İmza Kokteyller' },\n    subcategory: 'Cocktails'`));
}

// 3. Insert new ones after d_hc_4
const dhc4Str = `  {\n    id: 'd_hc_4',`;
const d4Start = content.indexOf(dhc4Str);
if (d4Start !== -1) {
  const searchArea = content.substring(d4Start);
  let closeIdx = searchArea.search(/\n  \},/);
  if (closeIdx !== -1) {
    const exactEndPos = d4Start + closeIdx + 5;
    
    let insertion = `
  {
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
  },`;
    
    content = content.substring(0, exactEndPos - 1) + insertion + content.substring(exactEndPos - 1);
  }
}

fs.writeFileSync('src/data/menu.ts', content, 'utf8');
console.log('Fixed properly');
