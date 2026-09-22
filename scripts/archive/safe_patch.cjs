const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, 'src', 'data', 'menu.ts');
let code = fs.readFileSync(menuPath, 'utf8');

// Fix Heiße Specials
code = code.replace("category: 'drinks',\n    tags: ['creamy', 'spicy']", "category: 'drinks',\n    subcategory: 'Heiße Specials',\n    tags: ['creamy', 'spicy']");
code = code.replace("category: 'drinks',\n    subcategory: 'Heiße Specials',\n\n    tags: ['creamy', 'matcha']", "category: 'drinks',\n    subcategory: 'Heiße Specials',\n    tags: ['creamy', 'matcha']"); // just in case
code = code.replace("category: 'drinks',\n\n    tags: ['creamy', 'matcha']", "category: 'drinks',\n    subcategory: 'Heiße Specials',\n    tags: ['creamy', 'matcha']");
code = code.replace("category: 'drinks',\n    tags: ['creamy', 'matcha']", "category: 'drinks',\n    subcategory: 'Heiße Specials',\n    tags: ['creamy', 'matcha']");

// For d_hs_3, 4, 5 - they might not have tags. Let's do it by ID.
for (let i = 1; i <= 5; i++) {
    const id = `id: 'd_hs_${i}'`;
    const startIndex = code.indexOf(id);
    if (startIndex !== -1) {
        const nextCategoryIndex = code.indexOf("category: 'drinks'", startIndex);
        if (nextCategoryIndex !== -1 && nextCategoryIndex - startIndex < 300) {
            // Check if subcategory already exists
            const objEnd = code.indexOf('},', startIndex);
            const objText = code.substring(startIndex, objEnd);
            if (!objText.includes('subcategory:')) {
                const target = "category: 'drinks',";
                code = code.substring(0, nextCategoryIndex) + 
                       "category: 'drinks',\n    subcategory: 'Heiße Specials'," + 
                       code.substring(nextCategoryIndex + target.length);
            }
        }
    }
}

// 2. Add Shakes and Kombis at the end
const additional = `
  // --- SHAKES ---
  {
    id: 'd_shake_1',
    name: { DE: 'Royal Delight', EN: 'Royal Delight', TR: 'Royal Delight' },
    price: 7.90,
    description: { DE: 'Ein königlicher Genuss aus cremigem MaxiKing, Schokolade und Karamell - der Shake für echte Schoko-Liebhaber', EN: 'Ein königlicher Genuss aus cremigem MaxiKing, Schokolade und Karamell - der Shake für echte Schoko-Liebhaber', TR: 'Ein königlicher Genuss aus cremigem MaxiKing, Schokolade ve Karamell - der Shake für echte Schoko-Liebhaber' },
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

  // --- HAPPY HOUR COMBOS ---
  {
    id: 'hh_kombi1',
    name: { DE: 'Kombi 1', EN: 'Combo 1', TR: 'Kombi 1' },
    price: 18.90,
    description: { DE: 'Classic Pfeife + Tee (Schwarztee, Apfeltee, Früchtetee oder Grüntee). Premium Pfeife: +3€. (Mo-Fr 10:00 - 15:00)', EN: 'Classic Shisha + Tea (Black, Apple, Fruit or Green). Premium Shisha: +3€. (Mo-Fr 10:00 - 15:00)', TR: 'Klasik Nargile + Çay (Siyah, Elma, Meyve veya Yeşil). Premium Nargile: +3€. (Pzt-Cum 10:00 - 15:00)' },
    imageUrl: '',
    category: 'happy_hour',
    subcategory: 'Happy Hour'
  },
  {
    id: 'hh_kombi2',
    name: { DE: 'Kombi 2', EN: 'Combo 2', TR: 'Kombi 2' },
    price: 19.90,
    description: { DE: 'Classic Pfeife + Softdrink / Saft. Premium Pfeife: +3€. (Mo-Fr 10:00 - 15:00)', EN: 'Classic Shisha + Soft drink / Juice. Premium Shisha: +3€. (Mo-Fr 10:00 - 15:00)', TR: 'Klasik Nargile + Meşrubat / Meyve Suyu. Premium Nargile: +3€. (Pzt-Cum 10:00 - 15:00)' },
    imageUrl: '',
    category: 'happy_hour',
    subcategory: 'Happy Hour'
  },
  {
    id: 'hh_kombi3',
    name: { DE: 'Kombi 3', EN: 'Combo 3', TR: 'Kombi 3' },
    price: 21.90,
    description: { DE: 'Classic Pfeife + Milchshake. Premium Pfeife: +3€. (Mo-Fr 10:00 - 15:00)', EN: 'Classic Shisha + Milkshake. Premium Shisha: +3€. (Mo-Fr 10:00 - 15:00)', TR: 'Klasik Nargile + Milkshake. Premium Nargile: +3€. (Pzt-Cum 10:00 - 15:00)' },
    imageUrl: '',
    category: 'happy_hour',
    subcategory: 'Happy Hour'
  }
`;

if (!code.includes("id: 'd_shake_1'")) {
    const splitArr = code.split('\\n];');
    if (splitArr.length > 1) {
       // just in case it doesn't match \n];
    }
    const lastBracketIndex = code.lastIndexOf('];');
    if (lastBracketIndex !== -1) {
        const before = code.substring(0, lastBracketIndex);
        const after = code.substring(lastBracketIndex);
        
        let beforeFixed = before;
        if (!beforeFixed.trim().endsWith(',')) {
            const lastBrace = beforeFixed.lastIndexOf('}');
            beforeFixed = beforeFixed.substring(0, lastBrace + 1) + ',' + beforeFixed.substring(lastBrace + 1);
        }

        code = beforeFixed + '\\n' + additional + '\\n' + after;
    }
}

// 3. Fix water d13 name
code = code.replace(
  /(id:\s*'d13',\s*name:\s*\{\s*DE:\s*')Mineralwasser(',\s*EN:\s*')Mineral Water(',\s*TR:\s*')Maden Suyu('\s*\})/,
  "$1Stilles & Mineral Wasser$2Still & Mineral Water$3Stilles & Mineral Wasser$4"
);

// 4. Update Signature Cocktails (prices and description)
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

// Write the file
fs.writeFileSync(menuPath, code);
console.log('Patch complete.');
