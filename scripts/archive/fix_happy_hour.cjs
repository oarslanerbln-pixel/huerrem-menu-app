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
const d15Regex = /\{\s*id:\s*'d15'[\s\S]*?\},/;
code = code.replace(d15Regex, '');

// 3. Update d13 to "Stilles & Mineral Wasser"
const d13Regex = /(id:\s*'d13',\s*name:\s*\{\s*DE:\s*')Mineralwasser(',\s*EN:\s*')Mineral Water(',\s*TR:\s*')Maden Suyu('\s*\})/;
code = code.replace(d13Regex, "$1Stilles & Mineral Wasser$2Still & Mineral Water$3Stilles & Mineral Wasser$4");

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

code = code.replace(/export const menuData: MenuItem\[\] = \[/, `export const menuData: MenuItem[] = [\n${happyHourItems}`);

// Also fix kombis prices so they don't show 0.00 if someone visits them
code = code.replace(/(id:\s*'k1'[\s\S]*?category:\s*'kombis',\n\s*subcategory:\s*'Hürrem Kombis')/g, "$1,\n    price: 19.90");
code = code.replace(/(id:\s*'k2'[\s\S]*?category:\s*'kombis',\n\s*subcategory:\s*'Hürrem Kombis')/g, "$1,\n    price: 24.90");
code = code.replace(/(id:\s*'k3'[\s\S]*?category:\s*'kombis',\n\s*subcategory:\s*'Hürrem Kombis')/g, "$1,\n    price: 29.90");
code = code.replace(/(id:\s*'k4'[\s\S]*?category:\s*'kombis',\n\s*subcategory:\s*'Hürrem Kombis')/g, "$1,\n    price: 39.90");
code = code.replace(/(id:\s*'k5'[\s\S]*?category:\s*'kombis',\n\s*subcategory:\s*'Hürrem Kombis')/g, "$1,\n    price: 49.90");

fs.writeFileSync(menuPath, code);
console.log('menu.ts updated!');

// Now update Background3D.tsx to accept happy_hour
const bgPath = path.join(__dirname, 'src', 'components', '3D', 'Background3D.tsx');
if (fs.existsSync(bgPath)) {
  let bgCode = fs.readFileSync(bgPath, 'utf8');
  // Add happy_hour back to categoryColors if not present
  if (!bgCode.includes("happy_hour: '#C5A55A'")) {
    bgCode = bgCode.replace(/kombis:\s*'#E0C097',/, "kombis: '#E0C097',\n    happy_hour: '#C5A55A',");
    fs.writeFileSync(bgPath, bgCode);
    console.log('Background3D.tsx updated!');
  }
}
