const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, 'src/data/menu.ts');
let content = fs.readFileSync(menuPath, 'utf8');

// Fix Happy Hour
const happyHourRegex = /\{\s*id:\s*'[^']+',[\s\S]*?subcategory:\s*'Happy Hour',?\s*\},?\s*/g;
content = content.replace(happyHourRegex, '');

const newItems = `
  {
    id: 'hh_shisha_softdrink',
    name: {
      DE: 'Shisha + Softdrink',
      EN: 'Shisha + Softdrink',
      TR: 'Nargile + Meşrubat',
    },
    description: {
      DE: 'Mo-Fr 14:00 - 19:00 Uhr',
      EN: 'Mon-Fri 14:00 - 19:00',
      TR: 'Pzt-Cum 14:00 - 19:00',
    },
    price: 13.90,
    category: 'happy_hour',
    subcategory: 'Happy Hour',
  },
  {
    id: 'hh_food',
    name: {
      DE: 'Pasta, Burger, Salat, Bowl\\'s',
      EN: 'Pasta, Burger, Salad, Bowls',
      TR: 'Makarna, Burger, Salata, Bowl',
    },
    description: {
      DE: 'Mo-Fr 16:00 - 19:00 Uhr (Außer Beef & Broccoli Penne und Beef Balance Bowl)',
      EN: 'Mon-Fri 16:00 - 19:00 (Except Beef & Broccoli Penne and Beef Balance Bowl)',
      TR: 'Pzt-Cum 16:00 - 19:00 (Beef & Broccoli Penne ve Beef Balance Bowl hariç)',
    },
    price: 9.90,
    category: 'happy_hour',
    subcategory: 'Happy Hour',
  },
  {
    id: 'c_butterfly_pea',
    name: { DE: 'Butterfly Pea Flower Tea', EN: 'Butterfly Pea Flower Tea', TR: 'Butterfly Pea Flower Tea' },
    price: 8.90,
    category: 'drinks',
    subcategory: 'Cocktails',
    badge: 'Signature',
  },
  {
    id: 'c_beautiful_dream',
    name: { DE: 'Beautiful Dream', EN: 'Beautiful Dream', TR: 'Beautiful Dream' },
    price: 9.40,
    category: 'drinks',
    subcategory: 'Cocktails',
    badge: 'Signature',
  },
  {
    id: 'c_dreamy_breeze',
    name: { DE: 'Dreamy Breeze (Bubble-Tea)', EN: 'Dreamy Breeze (Bubble-Tea)', TR: 'Dreamy Breeze (Bubble-Tea)' },
    price: 10.90,
    category: 'drinks',
    subcategory: 'Cocktails',
    badge: 'High-Class',
  },
`;

content = content.replace(/\];\s*\/\/\s*Quiz Questions mapped for tags/, newItems + '\n];\n\n// Quiz Questions mapped for tags');


// Remove duplicates in Cocktails
let seenCocktails = new Set();
// actually it's easier to replace items individually by matching their DE name.
const cocktailNames = [
  "Another One Wood Smoke",
  "Cloud Seven Balloon Glass",
  "Funky Passion Bubble Tea",
  "Violet Wood Smoke",
  "Blue Lychee Mosquito",
  "Coconut Kiss",
  "Dragonfruit Sunset",
  "Fancy Love",
  "Mosquito",
  "Solero"
];

for (let name of cocktailNames) {
    // Find all occurrences of this cocktail
    let regex = new RegExp(`\\{\\s*id:\\s*'[^']+',\\s*name:\\s*\\{\\s*DE:\\s*'${name}'[\\s\\S]*?subcategory:\\s*'Cocktails'[\\s\\S]*?\\},?\\s*`, 'g');
    let matches = content.match(regex);
    if (matches && matches.length > 1) {
        console.log(`Found duplicate for ${name} (${matches.length} copies)`);
        // Replace all but the first one
        let firstOccurence = matches[0];
        let replacementRegex = new RegExp(`\\{\\s*id:\\s*'[^']+',\\s*name:\\s*\\{\\s*DE:\\s*'${name}'[\\s\\S]*?subcategory:\\s*'Cocktails'[\\s\\S]*?\\},?\\s*`, 'g');
        let counter = 0;
        content = content.replace(replacementRegex, (match) => {
            counter++;
            return counter === 1 ? match : '';
        });
    }
}

fs.writeFileSync(menuPath, content, 'utf8');
console.log("Cleaned up duplicates and fixed Happy hour.");
