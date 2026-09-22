const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, 'src', 'data', 'menu.ts');
let code = fs.readFileSync(menuPath, 'utf8');

// 1. Fix Heiße Specials missing subcategory
code = code.replace(/(\s*id:\s*'d_hs_[1-5]',[\s\S]*?category:\s*'drinks',)(\s*tags:)/g, "$1\n    subcategory: 'Heiße Specials',\n$2");

// 2. Add Shakes if not exist
const shakes = `
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

if (!code.includes("id: 'd_shake_1'")) {
  const lastIndex = code.lastIndexOf('];');
  if (lastIndex !== -1) {
    const before = code.substring(0, lastIndex);
    const after = code.substring(lastIndex);
    const beforeFixed = before.replace(/\}\s*$/, '},');
    code = beforeFixed + shakes + after;
  }
}

// 3. Fix water duplicate and name
// Remove completely duplicate 'd15'
code = code.replace(/\{\s*id:\s*'d15'[\s\S]*?\},/g, '');
// Rename d13
code = code.replace(
  /(id:\s*'d13',\s*name:\s*\{\s*DE:\s*')Mineralwasser(',\s*EN:\s*')Mineral Water(',\s*TR:\s*')Maden Suyu('\s*\})/,
  "$1Stilles & Mineral Wasser$2Still & Mineral Water$3Stilles & Mineral Wasser$4"
);

// 4. Update Signature Cocktails (if they are missing the new prices/desc)
const sigUpdates = {
  'd_sig_1': { price: 9.40, desc: 'Butterfly Pea Tea, frische Lychee, Minze, Rohrzucker, Tonic Water, Limette' },
  'd_sig_2': { price: 8.90, desc: 'Kokoscreme, Sahne, Ananassaft, Kirschsaft, Grenadine' },
  'd_sig_3': { price: 9.40, desc: 'Eine tropische Farbexplosion im Glas! Super erfrischend und fruchtig-exotisch mit hochwertigem Bio-Drachenfrucht-Pulver und Beeren. Hol dir den Urlaub direkt ins Glas!' },
  'd_sig_4': { price: 9.40, desc: 'Ananassaft, Mangosirup, Kokoswasser, Limettensaft, Minze, frische Maracuja, Açaibeeren' },
  'd_sig_5': { price: 8.90, desc: 'Ginger Ale, frische Minze, Limette, Rohrzucker, Crushed Ice (mit Black28: 10,90 €)' },
  'd_sig_6': { price: 8.90, desc: 'Karamellsirup, Vanillesirup, Sahne, Maracujasaft, Mangosaft, Orangensaft' }
};

for (const [id, data] of Object.entries(sigUpdates)) {
  const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?price:\\s*)[0-9.]+(,[\\s\\S]*?description:\\s*\\{\\s*DE:\\s*').*?(',\\s*EN:\\s*').*?(',\\s*TR:\\s*').*?('\\s*\\})`, 'g');
  code = code.replace(regex, `$1${data.price.toFixed(2)}$2${data.desc}$3${data.desc}$4${data.desc}$5`);
}

fs.writeFileSync(menuPath, code);
console.log('Successfully completed all fixes!');
