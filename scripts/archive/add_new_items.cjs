const fs = require('fs');

let code = fs.readFileSync('src/data/menu.ts', 'utf8');

// Update existing
code = code.replace(/(name:\s*\{\s*DE:\s*'Goldenes Hähnchenschnitzel'[\s\S]*?imageUrl:\s*)['"][^'"]*['"]/, "$1'/images/menury_originals/hauptgerichte__goldenes_haehnchenschnitzel.webp'");
code = code.replace(/(name:\s*\{\s*DE:\s*'Grillspieß Oriental'[\s\S]*?imageUrl:\s*)['"][^'"]*['"]/, "$1'/images/menury_originals/hauptgerichte__grillspiess_oriental.webp'");
code = code.replace(/(name:\s*\{\s*DE:\s*'Türkische Grillköfte'[\s\S]*?imageUrl:\s*)['"][^'"]*['"]/, "$1'/images/menury_originals/hauptgerichte__tuerkische_grillkoefte.webp'");

// Add new Teas
const newItems = `
  {
    id: 'd_kt_1',
    name: { DE: 'Bio-Lindenblütentee mit Honig', EN: 'Organic Linden Blossom Tea with Honey', TR: 'Ballı Organik Ihlamur Çayı' },
    price: 4.50,
    description: { DE: 'Bio-Lindenblütentee mit Honig', EN: 'Organic Linden Blossom Tea with Honey', TR: 'Ballı Organik Ihlamur Çayı' },
    imageUrl: '/images/menury_originals/kraeuter_und_bluetentees__bio_lindenblueten_tee_mit_honig.webp',
    category: 'drinks',
    subcategory: 'Kräuter- & Blütentees'
  },
  {
    id: 'd_kt_2',
    name: { DE: 'Frischer Minztee mit Honig', EN: 'Fresh Mint Tea with Honey', TR: 'Ballı Taze Nane Çayı' },
    price: 4.50,
    description: { DE: 'Frischer Minztee mit Honig', EN: 'Fresh Mint Tea with Honey', TR: 'Ballı Taze Nane Çayı' },
    imageUrl: '/images/menury_originals/kraeuter_und_bluetentees__frischer_minztee_mit_honig.webp',
    category: 'drinks',
    subcategory: 'Kräuter- & Blütentees'
  },
  {
    id: 'd_kt_3',
    name: { DE: 'Hürrem Tee', EN: 'Hürrem Tea', TR: 'Hürrem Çayı' },
    price: 4.90,
    description: { DE: 'Hausgemachter Hürrem Kräutertee', EN: 'Homemade Hürrem Herbal Tea', TR: 'Ev Yapımı Hürrem Bitki Çayı' },
    imageUrl: '/images/menury_originals/kraeuter_und_bluetentees__huerrem_tee.webp',
    category: 'drinks',
    subcategory: 'Kräuter- & Blütentees'
  },
  {
    id: 'd_kt_4',
    name: { DE: 'Ingwer-Minze-Tee mit Honig', EN: 'Ginger Mint Tea with Honey', TR: 'Ballı Zencefil Nane Çayı' },
    price: 4.50,
    description: { DE: 'Ingwer-Minze-Tee mit Honig', EN: 'Ginger Mint Tea with Honey', TR: 'Ballı Zencefil Nane Çayı' },
    imageUrl: '/images/menury_originals/kraeuter_und_bluetentees__ingwer_minze_tee_mit_honig.webp',
    category: 'drinks',
    subcategory: 'Kräuter- & Blütentees'
  },
  {
    id: 'd_kt_5',
    name: { DE: 'Ingwer-Tee mit Honig', EN: 'Ginger Tea with Honey', TR: 'Ballı Zencefil Çayı' },
    price: 4.50,
    description: { DE: 'Ingwer-Tee mit Honig', EN: 'Ginger Tea with Honey', TR: 'Ballı Zencefil Çayı' },
    imageUrl: '/images/menury_originals/kraeuter_und_bluetentees__ingwer_tee_mit_honig.webp',
    category: 'drinks',
    subcategory: 'Kräuter- & Blütentees'
  },
  {
    id: 'f_pas_4',
    name: { DE: 'Seafood Penne', EN: 'Seafood Penne', TR: 'Deniz Mahsullü Penne' },
    price: 15.90,
    description: { DE: 'Penne mit frischen Meeresfrüchten', EN: 'Penne with fresh seafood', TR: 'Taze deniz mahsullü penne' },
    imageUrl: '/images/menury_originals/pasta_gerichte__seafood_penne.webp',
    category: 'food',
    subcategory: 'Pasta Gerichte'
  },
`;

// Insert the new items at the end of the menuData array
const endMarker = ']';
const lastIndex = code.lastIndexOf(endMarker);
if (lastIndex !== -1) {
  // Before the closing bracket
  // we find the last '},' or '}' and add a comma if necessary
  code = code.substring(0, lastIndex) + newItems + code.substring(lastIndex);
}

fs.writeFileSync('src/data/menu.ts', code);
console.log('Successfully updated menu items');
