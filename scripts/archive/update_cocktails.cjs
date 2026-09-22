const fs = require('fs');
let content = fs.readFileSync('src/data/menu.ts', 'utf8');

content = content.replace(/\s*\{\s*id: 'd23'[\s\S]*?\},?/, '');
content = content.replace(/\s*\{\s*id: 'd24'[\s\S]*?\},?/, '');
content = content.replace(/\s*\{\s*id: 'd25'[\s\S]*?\},?/, '');

for (let i = 1; i <= 4; i++) {
  let idMatch = new RegExp(`id: 'd_hc_${i}'[\\s\\S]*?subcategory: 'Cocktails'`);
  content = content.replace(idMatch, (match) => match.replace(`subcategory: 'Cocktails'`, `group: { DE: 'High Class Cocktails', EN: 'High Class Cocktails', TR: 'High Class Kokteyller' },\n    subcategory: 'Cocktails'`));
}

for (let i = 1; i <= 6; i++) {
  let idMatch = new RegExp(`id: 'd_sig_${i}'[\\s\\S]*?subcategory: 'Cocktails'`);
  content = content.replace(idMatch, (match) => match.replace(`subcategory: 'Cocktails'`, `group: { DE: 'Signature Cocktails', EN: 'Signature Cocktails', TR: 'İmza Kokteyller' },\n    subcategory: 'Cocktails'`));
}

let dhc4End = content.indexOf(`id: 'd_hc_4'`);
let nextBrace = content.indexOf(`},`, dhc4End) + 2;
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

content = content.slice(0, nextBrace) + insertion + content.slice(nextBrace);

fs.writeFileSync('src/data/menu.ts', content, 'utf8');
console.log('Done');
