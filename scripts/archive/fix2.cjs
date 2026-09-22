const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, 'src', 'data', 'menu.ts');
let code = fs.readFileSync(menuPath, 'utf8');

// 1. Add happy_hour back to MenuCategory
code = code.replace(
  /export type MenuCategory = 'shisha' \| 'drinks' \| 'food' \| 'kombis';/,
  "export type MenuCategory = 'shisha' | 'drinks' | 'food' | 'kombis' | 'happy_hour';"
);

// 2. Remove duplicate water (d15)
// Let's find the exact block for d15
const d15BlockStart = code.indexOf(`id: 'd15'`);
if (d15BlockStart !== -1) {
  const blockStart = code.lastIndexOf('{', d15BlockStart);
  let blockEnd = code.indexOf('},', blockStart);
  if (blockEnd !== -1) {
    code = code.substring(0, blockStart) + code.substring(blockEnd + 2);
  }
}

// 3. Update d13 to "Stilles & Mineral Wasser"
const d13BlockStart = code.indexOf(`id: 'd13'`);
if (d13BlockStart !== -1) {
  code = code.replace(
    /(id:\s*'d13',\s*name:\s*\{\s*DE:\s*')Mineralwasser(',\s*EN:\s*')Mineral Water(',\s*TR:\s*')Maden Suyu('\s*\})/,
    "$1Stilles & Mineral Wasser$2Still & Mineral Water$3Stilles & Mineral Wasser$4"
  );
}

// 4. Add Happy Hour items to menuData
const happyHourItems = `  // --- Happy Hour ---
  {
    id: 'hh1',
    name: { DE: 'SHISHA + SOFTDRINK 13, 16, C', EN: 'SHISHA + SOFTDRINK 13, 16, C', TR: 'SHISHA + SOFTDRINK 13, 16, C' },
    price: 13.90,
    description: { 
      DE: 'Shisha + Softdrink Nachwahl\\nMontag-Freitag 14:00 - 19:00 Uhr', 
      EN: 'Shisha + Softdrink of choice\\nMonday-Friday 14:00 - 19:00', 
      TR: 'Nargile + Seçmeli Meşrubat\\nPazartesi-Cuma 14:00 - 19:00' 
    },
    imageUrl: '',
    category: 'happy_hour'
  },
  {
    id: 'hh2',
    name: { DE: "PASTA, BURGER, SALAT, BOWL'S", EN: "PASTA, BURGER, SALAD, BOWL'S", TR: "MAKARNA, BURGER, SALATA, BOWL'S" },
    price: 9.90,
    description: { 
      DE: 'Montag-Freitag | 16:00-19:00 Uhr\\nGenieße unsere Happy Hour und wähle dein Lieblingsgericht aus den Kategorien Pasta, Burger, Salat oder Bowl. Ausgenommen: Beef & Broccoli Penne sowie Beef Balance Bowl.', 
      EN: 'Monday-Friday | 16:00-19:00\\nEnjoy our Happy Hour and choose your favorite dish from the categories Pasta, Burger, Salad or Bowl. Excluded: Beef & Broccoli Penne and Beef Balance Bowl.', 
      TR: 'Pazartesi-Cuma | 16:00-19:00\\nHappy Hour keyfini çıkarın ve Makarna, Burger, Salata veya Kase kategorilerinden en sevdiğiniz yemeği seçin. Hariç: Beef & Broccoli Penne ve Beef Balance Bowl.' 
    },
    imageUrl: '',
    category: 'happy_hour'
  },
`;

if (!code.includes("id: 'hh1'")) {
  code = code.replace(/export const menuData: MenuItem\[\] = \[/, `export const menuData: MenuItem[] = [\n${happyHourItems}`);
}

// Fix kombis prices
code = code.replace(/(id:\s*'k1'[\s\S]*?category:\s*'kombis',\n\s*subcategory:\s*'Hürrem Kombis')/g, "$1,\n    price: 19.90");
code = code.replace(/(id:\s*'k2'[\s\S]*?category:\s*'kombis',\n\s*subcategory:\s*'Hürrem Kombis')/g, "$1,\n    price: 24.90");
code = code.replace(/(id:\s*'k3'[\s\S]*?category:\s*'kombis',\n\s*subcategory:\s*'Hürrem Kombis')/g, "$1,\n    price: 29.90");
code = code.replace(/(id:\s*'k4'[\s\S]*?category:\s*'kombis',\n\s*subcategory:\s*'Hürrem Kombis')/g, "$1,\n    price: 39.90");
code = code.replace(/(id:\s*'k5'[\s\S]*?category:\s*'kombis',\n\s*subcategory:\s*'Hürrem Kombis')/g, "$1,\n    price: 49.90");

fs.writeFileSync(menuPath, code);
console.log('menu.ts updated safely!');
