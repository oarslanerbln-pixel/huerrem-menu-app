const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, '..', 'src', 'data', 'menu.ts');
let code = fs.readFileSync(menuPath, 'utf8');

const newDrinks = `
  // --- High Class Cocktails ---
  {
    id: 'd_hc_1',
    name: { DE: 'Another One Wood Smoke', EN: 'Another One Wood Smoke', TR: 'Another One Wood Smoke' },
    price: 12.90,
    description: { DE: 'Exklusiver Cocktail mit Rauch-Aroma.', EN: 'Exclusive cocktail with wood smoke flavor.', TR: 'Özel tütsülenmiş kokteyl.' },
    imageUrl: '/images/menury_originals/high_class_cocktails__another_one_wood_smoke.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_hc_2',
    name: { DE: 'Cloud Seven Balloon Glass', EN: 'Cloud Seven Balloon Glass', TR: 'Cloud Seven Balloon Glass' },
    price: 13.90,
    description: { DE: 'Ein himmlischer Genuss im Ballonglas.', EN: 'A heavenly delight in a balloon glass.', TR: 'Balon bardakta eşsiz bir lezzet.' },
    imageUrl: '/images/menury_originals/high_class_cocktails__cloud_seven_balloon_glass.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_hc_3',
    name: { DE: 'Funky Passion Bubble Tea', EN: 'Funky Passion Bubble Tea', TR: 'Funky Passion Bubble Tea' },
    price: 11.90,
    description: { DE: 'Fruchtiger Cocktail mit Tapioka-Perlen.', EN: 'Fruity cocktail with tapioca pearls.', TR: 'Tapyoka incili meyveli kokteyl.' },
    imageUrl: '/images/menury_originals/high_class_cocktails__funky_passion_bubble_tea.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_hc_4',
    name: { DE: 'Violet Wood Smoke', EN: 'Violet Wood Smoke', TR: 'Violet Wood Smoke' },
    price: 13.50,
    description: { DE: 'Mystischer lila Cocktail mit Rauch-Effekt.', EN: 'Mystical purple cocktail with smoke effect.', TR: 'Duman efektli mistik mor kokteyl.' },
    imageUrl: '/images/menury_originals/high_class_cocktails__violet_wood_smoke.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  
  // --- Signature Cocktails ---
  {
    id: 'd_sig_1',
    name: { DE: 'Blue Lychee Mosquito', EN: 'Blue Lychee Mosquito', TR: 'Blue Lychee Mosquito' },
    price: 9.40,
    description: { DE: 'Butterfly Pea Tea, frische Lychee, Minze, Rohrzucker, Tonic Water, Limette', EN: 'Butterfly Pea Tea, frische Lychee, Minze, Rohrzucker, Tonic Water, Limette', TR: 'Butterfly Pea Tea, frische Lychee, Minze, Rohrzucker, Tonic Water, Limette' },
    imageUrl: '/images/menury_originals/signature_cocktails__blue_lychee_mosquito.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_2',
    name: { DE: 'Coconut Kiss', EN: 'Coconut Kiss', TR: 'Coconut Kiss' },
    price: 8.90,
    description: { DE: 'Kokoscreme, Sahne, Ananassaft, Kirschsaft, Grenadine', EN: 'Kokoscreme, Sahne, Ananassaft, Kirschsaft, Grenadine', TR: 'Kokoscreme, Sahne, Ananassaft, Kirschsaft, Grenadine' },
    imageUrl: '/images/menury_originals/signature_cocktails__coconut_kiss.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_3',
    name: { DE: 'Dragonfruit Sunset', EN: 'Dragonfruit Sunset', TR: 'Dragonfruit Sunset' },
    price: 9.40,
    description: { DE: 'Eine tropische Farbexplosion im Glas! Super erfrischend und fruchtig-exotisch mit hochwertigem Bio-Drachenfrucht-Pulver und Beeren. Hol dir den Urlaub direkt ins Glas!', EN: 'Eine tropische Farbexplosion im Glas! Super erfrischend und fruchtig-exotisch mit hochwertigem Bio-Drachenfrucht-Pulver und Beeren. Hol dir den Urlaub direkt ins Glas!', TR: 'Eine tropische Farbexplosion im Glas! Super erfrischend und fruchtig-exotisch mit hochwertigem Bio-Drachenfrucht-Pulver und Beeren. Hol dir den Urlaub direkt ins Glas!' },
    imageUrl: '/images/menury_originals/signature_cocktails__dragonfruit_sunset.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_4',
    name: { DE: 'Fancy Love', EN: 'Fancy Love', TR: 'Fancy Love' },
    price: 9.40,
    description: { DE: 'Ananassaft, Mangosirup, Kokoswasser, Limettensaft, Minze, frische Maracuja, Açaibeeren', EN: 'Ananassaft, Mangosirup, Kokoswasser, Limettensaft, Minze, frische Maracuja, Açaibeeren', TR: 'Ananassaft, Mangosirup, Kokoswasser, Limettensaft, Minze, frische Maracuja, Açaibeeren' },
    imageUrl: '/images/menury_originals/signature_cocktails__fancy_love.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_5',
    name: { DE: 'Mosquito', EN: 'Mosquito', TR: 'Mosquito' },
    price: 8.90,
    description: { DE: 'Ginger Ale, frische Minze, Limette, Rohrzucker, Crushed Ice (mit Black28: 10,90 €)', EN: 'Ginger Ale, frische Minze, Limette, Rohrzucker, Crushed Ice (mit Black28: 10,90 €)', TR: 'Ginger Ale, frische Minze, Limette, Rohrzucker, Crushed Ice (mit Black28: 10,90 €)' },
    imageUrl: '/images/menury_originals/signature_cocktails__mosquito.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_6',
    name: { DE: 'Solero', EN: 'Solero', TR: 'Solero' },
    price: 8.90,
    description: { DE: 'Karamellsirup, Vanillesirup, Sahne, Maracujasaft, Mangosaft, Orangensaft', EN: 'Karamellsirup, Vanillesirup, Sahne, Maracujasaft, Mangosaft, Orangensaft', TR: 'Karamellsirup, Vanillesirup, Sahne, Maracujasaft, Mangosaft, Orangensaft' },
    imageUrl: '/images/menury_originals/signature_cocktails__solero.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_7',
    name: { DE: 'Butterfly Pea Flower Tea', EN: 'Butterfly Pea Flower Tea', TR: 'Butterfly Pea Flower Tea' },
    price: 8.90,
    description: { DE: 'Blauer Blütentee trifft auf fruchtiges Wildberry und süßen Honig - ein sanftes, harmonisches Geschmackserlebnis', EN: 'Blauer Blütentee trifft auf fruchtiges Wildberry und süßen Honig - ein sanftes, harmonisches Geschmackserlebnis', TR: 'Blauer Blütentee trifft auf fruchtiges Wildberry und süßen Honig - ein sanftes, harmonisches Geschmackserlebnis' },
    imageUrl: '',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_8',
    name: { DE: 'Beautiful Dream', EN: 'Beautiful Dream', TR: 'Beautiful Dream' },
    price: 9.40,
    description: { DE: 'Erdbeerpüree, Sahne, Kokoscreme, weiße Schokolade, Kirschsaft', EN: 'Erdbeerpüree, Sahne, Kokoscreme, weiße Schokolade, Kirschsaft', TR: 'Erdbeerpüree, Sahne, Kokoscreme, weiße Schokolade, Kirschsaft' },
    imageUrl: '',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  
  // --- SHAKES ---
  {
    id: 'd_shake_1',
    name: { DE: 'Royal Delight', EN: 'Royal Delight', TR: 'Royal Delight' },
    price: 7.90,
    description: { DE: 'Ein königlicher Genuss aus cremigem MaxiKing, Schokolade und Karamell - der Shake für echte Schoko-Liebhaber', EN: 'Ein königlicher Genuss aus cremigem MaxiKing, Schokolade und Karamell - der Shake für echte Schoko-Liebhaber', TR: 'Ein königlicher Genuss aus cremigem MaxiKing, Schokolade und Karamell - der Shake für echte Schoko-Liebhaber' },
    imageUrl: '',
    category: 'drinks',
    subcategory: 'Shakes'
  },
  {
    id: 'd_shake_2',
    name: { DE: 'Midnight Cravings', EN: 'Midnight Cravings', TR: 'Midnight Cravings' },
    price: 7.90,
    description: { DE: 'Der Klassiker mit Oreo-Keksen und einem Hauch Vanille - ein nächtlicher Traum in jedem Schluck', EN: 'Der Klassiker mit Oreo-Keksen und einem Hauch Vanille - ein nächtlicher Traum in jedem Schluck', TR: 'Der Klassiker mit Oreo-Keksen und einem Hauch Vanille - ein nächtlicher Traum in jedem Schluck' },
    imageUrl: '',
    category: 'drinks',
    subcategory: 'Shakes'
  },
  {
    id: 'd_shake_3',
    name: { DE: 'Hazelnut Bliss', EN: 'Hazelnut Bliss', TR: 'Hazelnut Bliss' },
    price: 7.90,
    description: { DE: 'Verwöhnender Haselnuss-Schoko-Traum mit knusprigen Kinder Bueno-Stückchen, der auf der Zunge zergeht', EN: 'Verwöhnender Haselnuss-Schoko-Traum mit knusprigen Kinder Bueno-Stückchen, der auf der Zunge zergeht', TR: 'Verwöhnender Haselnuss-Schoko-Traum mit knusprigen Kinder Bueno-Stückchen, der auf der Zunge zergeht' },
    imageUrl: '',
    category: 'drinks',
    subcategory: 'Shakes'
  },
  {
    id: 'd_shake_4',
    name: { DE: 'Tropical Escape', EN: 'Tropical Escape', TR: 'Tropical Escape' },
    price: 7.90,
    description: { DE: 'Ein tropisches Abenteuer aus Kokos, Schokolade und cremiger Milch - Urlaub im Glas.', EN: 'Ein tropisches Abenteuer aus Kokos, Schokolade und cremiger Milch - Urlaub im Glas.', TR: 'Ein tropisches Abenteuer aus Kokos, Schokolade und cremiger Milch - Urlaub im Glas.' },
    imageUrl: '',
    category: 'drinks',
    subcategory: 'Shakes'
  },
  {
    id: 'd_shake_5',
    name: { DE: 'Banana Boost', EN: 'Banana Boost', TR: 'Banana Boost' },
    price: 7.90,
    description: { DE: 'Power pur! Erdnussbutter trifft auf frische Banane und einen Hauch Zimt - der perfekte Energie-Kick.', EN: 'Power pur! Erdnussbutter trifft auf frische Banane und einen Hauch Zimt - der perfekte Energie-Kick.', TR: 'Power pur! Erdnussbutter trifft auf frische Banane und einen Hauch Zimt - der perfekte Energie-Kick.' },
    imageUrl: '',
    category: 'drinks',
    subcategory: 'Shakes'
  },
`;

code = code.replace(/\];\s*export const allergenLegend/, newDrinks + '\n];\n\nexport const allergenLegend');

// Also update d13 (Mineralwasser)
code = code.replace(
  /(id:\s*'d13',\s*name:\s*\{\s*DE:\s*')Mineralwasser(',\s*EN:\s*')Mineral Water(',\s*TR:\s*')Maden Suyu('\s*\})/,
  "$1Stilles & Mineral Wasser$2Still & Mineral Water$3Stilles & Mineral Wasser$4"
);

// Remove old shakes safely (if they exist)
code = code.replace(/\{\s*id:\s*'d21'[\s\S]*?\},/g, '');
code = code.replace(/\{\s*id:\s*'d22'[\s\S]*?\},/g, '');
code = code.replace(/\{\s*id:\s*'d23'[\s\S]*?\},/g, '');

fs.writeFileSync(menuPath, code);
console.log('Successfully added all missing drinks to menu.ts!');
