const fs = require('fs');
let content = fs.readFileSync('src/data/menu.ts', 'utf8');

const startIndex = content.indexOf(`  {
    id: 'd_hc_4',`);

const endIndex = content.indexOf(`    subcategory: 'Cocktails'\n  },`, startIndex) + `    subcategory: 'Cocktails'\n  },`.length;

const newBlock = `  {
    id: 'd_hc_4',
    name: { DE: 'Violet Wood Smoke', EN: 'Violet Wood Smoke', TR: 'Violet Wood Smoke' },
    price: 13.50,
    description: { DE: 'Mystischer lila Cocktail mit Rauch-Effekt.', EN: 'Mystical purple cocktail with smoke effect.', TR: 'Duman efektli mistik mor kokteyl.' },
    imageUrl: '/images/menury_originals/high_class_cocktails__violet_wood_smoke.webp',
    category: 'drinks',
    group: { DE: 'High Class Cocktails', EN: 'High Class Cocktails', TR: 'High Class Kokteyller' },
    subcategory: 'Cocktails'
  },
  {
    id: 'd_hc_5',
    name: { DE: 'Cotton Candy Shop', EN: 'Cotton Candy Shop', TR: 'Cotton Candy Shop' },
    price: 11.90,
    description: { DE: 'Bananensaft, Kokoscreme, Sahne.', EN: 'Banana juice, coconut cream, whipped cream.', TR: 'Muz suyu, hindistan cevizi kremasÄ±, krema.' },
    imageUrl: '/images/menury_originals/high_class_cocktails__cotton_candy_shop.webp',
    category: 'drinks',
    group: { DE: 'High Class Cocktails', EN: 'High Class Cocktails', TR: 'High Class Kokteyller' },
    subcategory: 'Cocktails'
  },
  {
    id: 'd_hc_6',
    name: { DE: 'Dreamy Breeze (Bubble-Tea)', EN: 'Dreamy Breeze (Bubble-Tea)', TR: 'Dreamy Breeze (Bubble-Tea)' },
    price: 11.90,
    description: { DE: 'Ube-Flavour, brauner Zuckersirup, Kokosmilch, Blaubeerperlen, Heavy Cream. Ein cremiger, exotischer Genuss mit Ã¼berraschendem Look.', EN: 'Ube flavor, brown sugar syrup, coconut milk, blueberry pearls, heavy cream.', TR: 'Ube aromasÄ±, esmer ÅŸeker ÅŸurubu, hindistan cevizi sÃ¼tÃ¼, yaban mersini incileri, krema.' },
    imageUrl: '/images/menury_originals/high_class_cocktails__dreamy_breeze.webp',
    allergens: ['G'],
    category: 'drinks',
    group: { DE: 'High Class Cocktails', EN: 'High Class Cocktails', TR: 'High Class Kokteyller' },
    subcategory: 'Cocktails'
  },`;

content = content.substring(0, startIndex) + newBlock + content.substring(endIndex);
fs.writeFileSync('src/data/menu.ts', content, 'utf8');
console.log('Fixed completely!');
